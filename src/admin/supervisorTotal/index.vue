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
            <el-button type="primary" icon="plus" @click="handleImport">导入监理记录表</el-button>
            <el-button type="primary" icon="plus" @click="handleExport">导出统计数据</el-button>
        </el-row>
        <el-table
                :data="tableData"
                id="scoreData"
                border
                style="width: 100%">
            <el-table-column
                    prop="id"
                    label="监理点编号">
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
                    prop="score"
                    label="扣分合计">
            </el-table-column>
        </el-table>

        <el-dialog title="导入数据错误" :visible.sync="dialogVisible" width="900px">
            <p v-for="error in errorList">{{error}}</p>
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
    import downExcel from '../../components/script/xlsx';
    export default {
        metaInfo() {
            return {
                title: '监理统计'
            }
        },
        data() {
            return {
                nav: {
                    sidebar: "3-3",
                },
                tableData: [],
                recordTypeData:[],
                dialogVisible:false,
                errorList:[],
                query: {
                },
                projectList: [],
            }
        },
        mounted() {
            this.getBaseInfo();
        },
        computed: {},
        methods: {
            getBaseInfo() {
                this.$ajax({
                    method: 'GET',
                    url: '/api/project',
                    params: {}
                }).then(res => {
                    if (res.success) {
                        this.$set(this, 'projectList', res.data);
                        //this.getList();
                    }
                })
            },
            changeProject() {
                this.getList();
            },
            getList() {
                Promise.all([
                    this.$ajax({
                        method: 'GET',
                        url: '/api/supervisorAll',
                        params: this.query
                    }),
                    this.$ajax({
                        method: 'GET',
                        url: '/api/recordTypeAll',
                        params: this.query
                    })
                ]).then(res => {
                    if(res[0].success && res[1].success){
                        res[0].data.forEach(item=>item.score=0);
                        this.$set(this, 'tableData', res[0].data);
                        this.$set(this, 'recordTypeData', res[1].data);
                    }
                });
            },
            getDate(date) {
                if (!date) {
                    return '';
                }
                return moment(date).format('YYYY-MM-DD');
            },
            handleImport() {
                if (!this.query.projectId) {
                    this.$message.error('选择要导入的项目！');
                    return;
                }
                let input = $("<input type='file'/>");
                input.trigger('click');
                input.off('change').on('change', this.handleFile);
            },
            handleFile(e) {
                let files = e.target.files;
                let file = files[0];
                if (!file) return;
                this.isLoading = true;
                let name = file.name;
                if (typeof name !== 'string' || !~name.indexOf('.xls')) {
                    this.$message.error('文件格式错误');
                    return;
                }
                let result = [];
                let reader = new FileReader();
                let isOK = true;
                reader.onload = (e) => {
                    let data = e.target.result;
                    let wb;
                    try {
                        wb = XLSX.read(data, {type: "binary"});
                        let js = XLSX.utils.sheet_to_json(wb.Sheets.Sheet1, {header:1, raw:true});
                    } catch (e) {
                        this.$message.error('文件格式错误');
                        return;
                    }
                    let result = [];
                    if(!wb.SheetNames[0]){
                        return;
                    }
                    result = this.getExcelData(wb.Sheets[wb.SheetNames[0]]);

                    if(this.errorList.length){
                        this.dialogVisible=true;
                        return;
                    }

                    result.forEach(item=>{
                        let recordType=this.recordTypeData.find(recordType=>recordType.id==item.recordTypeId);
                        if(recordType){
                            let supervisor=this.tableData.find(supervisor=>supervisor.id==item.supervisorId)

                            if(supervisor){
                                supervisor.score+=_.round(recordType.score*item.quantity, 2);;
                                console.log(supervisor.score);
                            }else{
                                this.errorList.push('第'+item.index+'行有错误：监理编号:'+item.supervisorId+'不存在！');
                                console.log(item);
                            }
                        }else{
                            console.log(item);
                        }
                    });

                    if(this.errorList.length){
                        this.dialogVisible=true;
                    }else{
                        window.setTimeout(()=>{
                            downExcel.downloadExl(XLSX.utils.table_to_book(document.getElementById('scoreData')))
                        },500)
                    }

                };
                reader.readAsBinaryString(file);
            },
            getExcelData(data) {
                function getVal(cell) {
                    return (cell && typeof cell === 'object') ? cell.v : '';
                }
                function checkId(id) {
                    return id && parseInt(id)>0;
                }

                let result = [], idx = 0;
                this.errorList=[];
                let i = 2, item;
                if (getVal(data['H1']).indexOf('Comment') < 0) {
                    return;
                }
                let now = +new Date();
                while (true) {
                    let A = getVal(data['A' + i]);
                    if (A === '' || i >= 10000) {
                        break;
                    }
                    let item = getVal(data['H' + i]);
                    let exp=/{[\S\s]*}/gi;
                    try{
                        let str=item.match(exp)[0];
                        let obj=JSON.parse(str);
                        if(checkId(obj.supervisorId) && checkId(obj.recordTypeId) && checkId(obj.quantity)){
                            obj.index=i;
                            result.push(obj);
                        }else{
                            this.errorList.push('第'+i+'行数据有误！');
                        }
                    }catch (e){

                    }
                    i++;
                }
                return result;
            },
            handleExport() {
                if (!this.query.projectId) {
                    this.$message.error('选择要导出的项目！');
                    return;
                }
            }
        }
    }

</script>
