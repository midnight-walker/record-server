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
            查询名：
            <el-input style="width: 200px;" @blur="getList" v-model="query.queryName"></el-input>
            状态：
            <el-select @change="getList" v-model="query.step" placeholder="">
                <el-option
                        v-for="state in stateList"
                        :key="state.id"
                        :label="state.name"
                        :value="state.id"
                ></el-option>
            </el-select>
            <!--<el-button type="primary" icon="plus" @click="handleImport">导入监理点</el-button>
            <el-button type="primary" icon="plus" @click="handleExport">导出监理计划表</el-button>-->
        </el-row>
        <el-row class="tool-bar">
            <!--<el-button type="primary" icon="plus" @click="handleAdd">添加记录点</el-button>-->
            监理员：<el-select style="width: 100px" filterable v-model="selectMemberId"  placeholder="请选择监理员">
            <el-option
                    v-for="member in memberList"
                    :key="member.id"
                    :label="member.name"
                    :value="member.id"
            ></el-option>
        </el-select>
            除治队：<el-select style="width: 100px" filterable v-model="selectWorkGroupId"  placeholder="请选择监理员">
            <el-option
                    v-for="workGroup in workGroupList"
                    :key="workGroup.id"
                    :label="workGroup.name"
                    :value="workGroup.id"
            ></el-option>
        </el-select>
            <el-button type="primary" style="margin-left: 10px;" @click="handleSetMember">批量设置</el-button>
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
                    prop="queryName"
                    label="查询名">
            </el-table-column>
            <el-table-column
                    prop="member.name"
                    label="监理员">
            </el-table-column>
            <el-table-column
                    prop="work_group.name"
                    label="除治队">
            </el-table-column>
            <el-table-column
                label="监理状态">
                <template slot-scope="scope">
                    <span>{{ getStep(scope.row.step) }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="workQuality"
                    label="监理得分">
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
                    prop="treeCompose"
                    label="树种组成">
            </el-table-column>

            <el-table-column
                    fixed="right"
                    label="操作"
                    width="200">
                <template slot-scope="scope">
                    <el-button v-if="scope.row.step<2" class="control" @click="handleCount(scope.row)" type="text" size="small">生成记录</el-button>
                    <el-button v-if="scope.row.step>0" class="control" @click="viewCount(scope.row)" type="text" size="small">查看记录</el-button>
                    <el-button v-if="scope.row.step===3" class="control" @click="endSupervisor(scope.row)" type="text" size="small">验收通过</el-button>
                    <el-button class="control" @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
                    <!--<el-button class="control" @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>-->
                </template>
            </el-table-column>
        </el-table>

        <el-pagination
                background
                @size-change="changePageSize"
                @current-change="changePage"
                :current-page="query.page"
                :page-sizes="[10,20,50,100, 200]"
                :page-size="query.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="query.total">
        </el-pagination>

        <el-dialog width="80%" title="生成监理记录" :visible.sync="supervisorSimpleDetailDialogVisible">
            共{{ovSupervisorList.length}}条记录
            监理员：<el-select style="width: 100px" filterable v-model="selectMemberId"  placeholder="请选择监理员">
                <el-option
                        v-for="member in memberList"
                        :key="member.id"
                        :label="member.name"
                        :value="member.id"
                ></el-option>
            </el-select>
            除治队：<el-select style="width: 100px" filterable v-model="selectWorkGroupId"  placeholder="请选择监理员">
                <el-option
                        v-for="workGroup in workGroupList"
                        :key="workGroup.id"
                        :label="workGroup.name"
                        :value="workGroup.id"
                ></el-option>
            </el-select>
            <el-button style="margin-left: 20px;" @click="importSupervisorSimpleDetail">确定生成</el-button>
            <el-table
                    style="margin-top: 20px;"
                    :data="ovSupervisorList"
                    border
                    show-summary
            >
                <el-table-column
                        prop="recordTypeName"
                        label="危害类型">
                </el-table-column>
                <el-table-column
                        prop="score"
                        label="扣分数">
                </el-table-column>
            </el-table>
        </el-dialog>

        <el-dialog width="80%" title="查看监理记录" :visible.sync="supervisorViewDialogVisible">
            <el-table
                    style="margin-top: 20px;"
                    :data="supervisorSimpleDetailList"
                    border
            >
                <el-table-column
                        prop="recordTypeName"
                        label="危害类型">
                </el-table-column>
                <el-table-column
                        prop="score"
                        label="扣分数">
                </el-table-column>
            </el-table>
        </el-dialog>
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
    import ovSocket from '../../components/script/ovSocket';

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
                    sidebar: "3-0",
                },
                tableData: [],
                query: {
                    total: 0,
                    page: 1,
                    pageSize: 20,
                    step:-1
                },
                dialogVisible: false,
                operatorType: true,
                form: newForm(),
                workGroupList: [],
                memberList:[],
                projectList:[],
                recordTypeList:[],
                selectMemberId:"",
                selectWorkGroupId:"",
                selectId:0,
                ovSupervisorList:[],
                ovSupervisorCursor:0,
                supervisorSimpleDetailDialogVisible:false,
                supervisorViewDialogVisible:false,
                supervisorSimpleDetailList:[],
                stateList:[
                    {
                        id:-1,
                        name:"全部"
                    },
                    {
                        id:0,
                        name:"未开始"
                    },
                    {
                        id:1,
                        name:"待确认"
                    },
                    {
                        id:2,
                        name:"整改中"
                    },
                    {
                        id:3,
                        name:"待验收"
                    },
                    {
                        id:4,
                        name:"已验收"
                    }
                ]
            }
        },
        components: {
            editDialog
        },
        mounted() {
            this.getBaseInfo();
            ovSocket.init({callback:this.onMessage});
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
                    }),
                    this.$ajax({
                        method: 'GET',
                        url: '/api/getRecordTypeById',
                        params: {
                            projectId:0
                        }
                    }),
                    this.$ajax({
                        method: 'GET',
                        url: '/api/members/list',
                        params: {}
                    }),
                ]).then(res => {
                    if(res[0].success && res[1].success){
                        this.$set(this, 'workGroupList', res[0].data);
                        this.$set(this, 'projectList', res[1].data);
                        this.$set(this, 'recordTypeList', res[2].data);
                        this.$set(this, 'memberList', res[3].data);
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
            getStep(step){
                let steps=["未开始","待确认","整改中","待验收","已验收"];
                return steps[step];
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
            },
            handleCount(row){
                this.selectMemberId=row.memberId;
                this.selectWorkGroupId=row.workGroupId;
                this.selectId=row.id;
                this.selectProjectId=row.projectId;
                ovSocket.searchObj({SrhTxt:row.queryName,ObjType:7});
            },
            viewCount(row){
                let list=row.supervisor_simple_details;
                if(list && list.length){
                    this.supervisorSimpleDetailList=row.supervisor_simple_details;
                    this.supervisorViewDialogVisible=true;
                }else{
                    this.$message.error("当前小班无监理数据，请导入");
                }
            },
            onMessage(data){
                console.log(data);
                if(data.cmdid===20107){
                    console.log(data.msg.ObjType);
                    if(data.msg.ObjType===7){
                        if(data.msg.ListID && data.msg.ListID.length){
                            this.ovSupervisorList=data.msg.ListID;
                            this.ovSupervisorCursor=0;
                            this.getOvSupervisorDetail();
                        }else{
                            alert("未找到对应小班文件");
                        }
                    }
                }
                if(data.cmdid===20101){
                    let detail=data.msg.ObjItems[0].Object.Comment+'',detailObj={},obj=this.ovSupervisorList[this.ovSupervisorCursor-1],typeName="未知",score=0;
                    let str=detail.split('-');
                    obj.projectId=this.selectProjectId;
                    obj.supervisorId=this.selectId;
                    let record=this.recordTypeList.find(item=>item.id==str[0]);
                    if(record){
                        obj.recordTypeName=record.name;
                        obj.recordTypeId=record.id;
                        score=parseInt(str[1]);
                        if(score>-1){
                            obj.score=score;
                        }else{
                            obj.score=record.score;
                        }

                    }else{
                        obj.typeName=typeName;
                        obj.score=score;
                    }



                    if(this.ovSupervisorCursor < this.ovSupervisorList.length){
                        this.getOvSupervisorDetail();
                    }else{
                        this.getOvSupervisorEnd();
                    }

                }
            },
            getOvSupervisorDetail(){
                ovSocket.getOvSupervisorDetail(this.ovSupervisorList[this.ovSupervisorCursor].ObjID);
                this.ovSupervisorCursor++;
            },
            getOvSupervisorEnd(){
                console.log(this.ovSupervisorList);
                this.supervisorSimpleDetailDialogVisible=true;
            },
            importSupervisorSimpleDetail(){
                let simpleDetails=this.ovSupervisorList.filter(item=>item.score>0);
                let workQuality=this.ovSupervisorList.reduce((p,curr)=>{
                    return p-curr.score;
                },100);
                if(simpleDetails && simpleDetails.length){
                    this.$ajax({
                        method: 'post',
                        url: '/api/importSupervisorSimpleDetail',
                        data: {
                            simpleDetails,
                            workQuality,
                            workGroupId:this.selectWorkGroupId,
                            memberId:this.selectMemberId,
                            supervisorId:this.selectId,
                            startTime:moment().format('YYYY-MM-DD')
                        }
                    }).then(res=>{
                        this.$message.success('导入成功！');
                        this.supervisorSimpleDetailDialogVisible=false;
                        this.getList();
                    })
                }else{
                    this.$message.error('没有可导入的数据')
                }
            },
            handleSetMember(){
                if(!this.selectWorkGroupId || !this.selectMemberId){
                    this.$message.error("请先选择需要批量设置的监理员和除治队");
                    return;
                }
                this.$ajax({
                    method: 'POST',
                    url: '/api/setSupervisorMember',
                    data: {
                        ...this.query,
                        workGroupId:this.selectWorkGroupId,
                        memberId:this.selectMemberId
                    }
                }).then(res => {
                    this.$message.success("设置成功")
                })
            },
            endSupervisor(row){
                this.$ajax({
                    method: 'POST',
                    url: '/api/updateSupervisorStep',
                    data: {
                        id:row.id,
                        workGroupId:row.workGroupId,
                        memberId:row.memberId,
                        step:row.step
                    }
                }).then(res => {
                    this.$message.success("更新成功");
                    this.getList();
                })
            }
        }
    }

</script>
