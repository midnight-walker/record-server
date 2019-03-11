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
            <el-button type="primary" icon="plus" @click="handleImport">导出单次监理汇总</el-button>
            <el-button type="primary" icon="plus" @click="titleDialogVisible=true">导出统计数据</el-button>
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
                    prop="visitTime"
                    label="监理时间">
                <template slot-scope="scope">
                    {{scope.row.visitTime}}
                </template>
            </el-table-column>
            <el-table-column
                    prop="visited"
                    label="除治完成">
            </el-table-column>
            <el-table-column
                    prop="score"
                    label="扣分合计">
            </el-table-column>
        </el-table>

        <el-dialog title="导入数据错误" :visible.sync="dialogVisible" width="900px">
            <p v-for="error in errorList">{{error}}</p>
        </el-dialog>

        <el-dialog title="开始生成一览表" :visible.sync="titleDialogVisible">
            <el-form :model="titleForm" label-width="120px">
                <el-form-item label="标题" prop="name">
                    <el-input v-model="titleForm.name"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="handleImportTotal" type="primary">开始导入</el-button>
                <el-button @click="titleDialogVisible=false">取消</el-button>
            </div>
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
    import baseExcel from '../../components/script/base';
    import excelHelper from './excelHelper';
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
                titleDialogVisible:false,
                titleForm:{
                    name:''
                },
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
                        res[0].data.forEach(item=>{
                            item.score=0;
                            item.visited="否";
                            item.visitTime="";
                        });
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
                                let score=item.score || recordType.score;
                                supervisor.score=_.round(supervisor.score+score*item.quantity, 2);
                                supervisor.visitTime=moment(item.savedAt,'YYYY-M-D').format('YYYY年M月D日');
                                supervisor.visited="是";
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
                        console.log(this.tableData);
                        let conf=excelHelper.transferData(this.tableData);
                        console.log(conf);
                        let wb = {
                            SheetNames: ['sheet1'],
                            Sheets: {
                                'sheet1': baseExcel.createExcel(conf)
                            }
                        };
                        downExcel.downloadExl(wb);
                        //downExcel.downloadExl(excelHelper.transfer(result));
                        /*window.setTimeout(()=>{
                            downExcel.downloadExl(XLSX.utils.table_to_book(document.getElementById('scoreData')))
                        },500)*/
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
            getSingleData(data){
                function getVal(cell) {
                    return (cell && typeof cell === 'object') ? cell.v : '';
                }

                let result = [], idx = 0;
                let i = 2;
                while (true) {
                    let item={};
                    let A = getVal(data['A' + i]);
                    if (A === '' || i >= 10000) {
                        break;
                    }
                    item.supervisorId = getVal(data['A' + i]);
                    item.region = getVal(data['B' + i]);
                    item.station = getVal(data['C' + i]);
                    item.village = getVal(data['D' + i]);
                    item.group = getVal(data['E' + i]);
                    item.smallClass = getVal(data['F' + i]);
                    item.placeName = getVal(data['G' + i]);
                    item.smallClassArea = getVal(data['H' + i]);
                    item.visitTime = getVal(data['I' + i]);
                    item.visited = getVal(data['J' + i]);
                    item.score = getVal(data['K' + i]);


                    result.push(item);
                    i++;
                }
                return result;
            },

            handleImportTotal() {
                if (!this.query.projectId) {
                    this.$message.error('选择要导入的项目！');
                    return;
                }
                let input = $("<input type='file'/>");
                input.trigger('click');
                input.off('change').on('change', this.handleTotalFile);
            },
            handleTotalFile(e){
                let files = e.target.files;
                let file = files[0];
                if(!file) return;
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
                        let data=this.getSingleData(wb.Sheets[name]);
                        let groupedData=_.groupBy(data,'station');
                        let arr = [];
                        for (let key in groupedData) {
                            let o = {};
                            arr.push(groupedData[key])
                        }
                        if(data && data.length){
                            result=result.concat([arr]);
                        }
                    });
                    this.titleDialogVisible=false;
                    downExcel.downloadExl(excelHelper.totalData(result,this.titleForm.name),this.titleForm.name);
                };
                reader.readAsBinaryString(file);
            }
        }
    }

</script>
