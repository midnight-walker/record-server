<template>
    <layout class="body-content" :nav-active="nav">
        <el-row class="search-bar">
            所属项目：
            <el-select @change="changeProject" v-model="query.projectId" placeholder="">
                <el-option
                        v-for="project in projectList"
                        :key="project.id"
                        :label="project.name"
                        :value="project.id"
                ></el-option>
            </el-select>
            <el-button type="primary" icon="plus" @click="handleImport">导入监理点</el-button>
            <el-button type="primary" icon="plus" @click="handleExport">导出监理计划表</el-button>
        </el-row>
        <el-row class="tool-bar">
            <el-button type="primary" icon="plus" @click="handleAdd">添加记录点</el-button>
        </el-row>
        <edit-dialog :form="form" :workGroupList="workGroupList" :projectList="projectList" :dialog-visible="dialogVisible" :operator-type="operatorType" @closeDialog="closeDialog"></edit-dialog>
        <el-table
                :data="tableData"
                border
                style="width: 100%">
            <el-table-column
                    prop="projectId"
                    label="所属项目">
                <template slot-scope="scope">
                    <span>{{ getProject(scope.row.projectId) }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="region"
                    label="区县">
            </el-table-column>
            <el-table-column
                    prop="station"
                    label="林场">
            </el-table-column>
            <el-table-column
                    prop="village"
                    label="村（管护站）名">
            </el-table-column>
            <el-table-column
                    prop="group"
                    label="（社、林班）号">
            </el-table-column>
            <el-table-column
                    prop="smallClass"
                    label="小班号">
            </el-table-column>
            <el-table-column
                    prop="placeName"
                    label="小地名">
            </el-table-column>
            <el-table-column
                    prop="smallClassArea"
                    label="小班面积（亩）">
            </el-table-column>
            <el-table-column
                    prop="treeCompose"
                    label="树种组成">
            </el-table-column>
            <el-table-column
                    prop="targetName"
                    label="防治对象名称">
            </el-table-column>
            <el-table-column
                    label="开始时间"
                    width="120">
                <template slot-scope="scope">
                    <span>{{ getDate(scope.row.startTime) }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="结束时间"
                    width="120">
                <template slot-scope="scope">
                    <span>{{ getDate(scope.row.endTime) }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="workGroupId"
                    label="施工作业单位">
                <template slot-scope="scope">
                    <span>{{ getWorkGroup(scope.row.workGroupId) }}</span>
                </template>
            </el-table-column>

            <el-table-column
                    fixed="right"
                    label="操作"
                    width="200">
                <template slot-scope="scope">
                    <el-button class="control" @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button class="control" @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination
                background
                @size-change="changePageSize"
                @current-change="changePage"
                :current-page="query.page"
                :page-sizes="[10,50,100, 200]"
                :page-size="query.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="query.total">
        </el-pagination>
    </layout>
</template>
<style lang="less" type="text/less">
    .body-content {
        .search-bar {
            margin-bottom: 20px;
        }
        .tool-bar {
            margin-bottom: 20px;
        }
        .el-pagination {
            text-align: right;
            margin-top: 20px;
        }
        .control.el-button {
            padding: 0;
        }
    }

</style>
<script>
    import editDialog from './components/dialog.vue';
    import newForm from './components/newForm';

    let defaultList = () => {
        return [
            {
                id: 0,
                name: '全部'
            }
        ]
    }
    export default {
        metaInfo() {
            return {
                title: '松材线虫监理'
            }
        },
        data() {
            return {
                nav: {
                    sidebar: "3-1",
                },
                tableData: [],
                query: {
                    total: 0,
                    page: 1,
                    pageSize: 10
                },
                dialogVisible: false,
                operatorType: true,
                form: newForm(),
                workGroupList: [],
                projectList:[],
            }
        },
        components: {
            editDialog
        },
        mounted() {
            this.getBaseInfo();
        },
        computed:{
        },
        methods: {
            handleAdd() {
                this.form = newForm();
                this.dialogVisible = true;
            },
            handleEdit(row) {
                this.form = newForm(row);
                this.dialogVisible = true;
            },
            closeDialog(refresh) {
                this.dialogVisible = false;
                refresh && this.getList();
            },
            handleDelete(row) {
                this.$confirm('此操作将永久删除该条监理记录, 是否继续?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.$ajax({
                        method: 'DELETE',
                        url: '/api/supervisor/' + row.id
                    }).then(res => {
                        this.$message.success('删除成功！');
                        this.getList();
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            changePage(e) {
                this.query.page = e;
                this.getList();
            },
            changePageSize(e) {
                this.query.pageSize = e;
                this.getList();
            },
            getBaseInfo() {
                Promise.all([
                    this.$ajax({
                        method: 'GET',
                        url: '/api/workGroup',
                        params: {}
                    }),
                    this.$ajax({
                        method: 'GET',
                        url: '/api/project',
                        params: {}
                    })
                ]).then(res => {
                    if(res[0].success && res[1].success){
                        this.$set(this, 'workGroupList', res[0].data);
                        this.$set(this, 'projectList', res[1].data);
                        this.getList();
                    }

                })
            },
            getWorkGroup(id) {
                let workGroup = this.workGroupList.find(item => item.id === id);
                return workGroup ? workGroup.name : '';
            },
            getProject(id){
                let project = this.projectList.find(item => item.id === id);
                return project ? project.name : '';
            },
            changeProject(){
                this.getList();
            },
            getList() {
                this.$ajax({
                    method: 'GET',
                    url: '/api/supervisor',
                    params: this.query
                }).then(res => {
                    this.$set(this, 'tableData', res.data);
                    this.query.total = res.total;
                })
            },
            getDate(date) {
                if(!date){
                    return '';
                }
                return moment(date).format('YYYY-MM-DD');
            },
            handleImport(){
                if(!this.query.projectId){
                    this.$message.error('选择要导入的项目！');
                    return;
                }
                let input = $("<input type='file'/>");
                input.trigger('click');
                input.off('change').on('change', this.handleFile);
            },
            handleFile(e){
                let files = e.target.files;
                let file = files[0];
                if(!file) return;
                this.isLoading=true;
                let name = file.name;
                if(typeof name!=='string'||!~name.indexOf('.xls')){
                    this.$message.error('文件格式错误');
                    return;
                }
                let result=[];
                let reader = new FileReader();
                let isOK = true;
                reader.onload = (e)=> {
                    let data = e.target.result;
                    let wb;
                    try{
                        wb = XLSX.read(data, { type: "binary" });
                    }catch (e){
                        this.$message.error('文件格式错误');
                        return;
                    }
                    let result=[];
                    wb.SheetNames.forEach((name,idx)=>{
                        let data=this.getExcelData(wb.Sheets[name]);
                        console.log(data);
                        if(data && data.length){
                            result=result.concat(data);
                        }
                    });
                    this.$ajax({
                        method: 'post',
                        url: '/api/supervisor/import',
                        data: {
                            result
                        }
                    }).then(res=>{
                        this.$message.error('导入成功！');
                    })
                };
                reader.readAsBinaryString(file);
            },
            getExcelData(data){
                function getVal(cell){
                    return (cell && typeof cell==='object')?cell.v:'';
                }
                let result=[],idx=0;
                let i=2,item;
                if(getVal(data['A1']).indexOf('区县')<0){
                    return;
                }
                let now=+new Date();
                while (true){
                    let A=getVal(data['A'+i]);
                    if(A==='' || i>=10000){
                        break;
                    }
                    let item={
                        region:getVal(data['A'+i]),
                        station:getVal(data['B'+i]),
                        village:getVal(data['C'+i]),
                        group:getVal(data['D'+i]),
                        smallClass:getVal(data['E'+i]),
                        placeName:getVal(data['F'+i]),
                        smallClassArea:getVal(data['G'+i]),
                        treeCompose:getVal(data['H'+i]),
                        targetName:getVal(data['I'+i]),
                        projectId:this.query.projectId,
                        createdAt:now,
                        updatedAt:now,
                    };
                    result.push(item);
                    i++;
                }
                return result;
            },
            handleExport(){
                if(!this.query.projectId){
                    this.$message.error('选择要导出的项目！');
                    return;
                }
                window.location.href='/api/supervisor/export?projectId='+this.query.projectId;
            }
        }
    }

</script>
