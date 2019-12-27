<template>
    <layout class="body-content" :nav-active="nav">
        <el-row class="tool-bar">
            <el-button type="primary" icon="plus" @click="handleAdd">添加项目</el-button>
        </el-row>
        <edit-dialog :recordTypeData="recordTypeData" :form="form" :dialog-visible="dialogVisible" :operator-type="operatorType" @closeDialog="closeDialog"></edit-dialog>
        <el-dialog width="80%" title="生成小班" :visible.sync="smallClassDialogVisible">
            共{{smallClassList.length}}个小班
            <div v-for="(value, key, index) in smallClassGroup">
                {{ key }} 共 {{ value.length }} 个
            </div>
            <el-button @click="importSmallClass">确定生成</el-button>
            <el-table
                v-if="false"
                :data="smallClassList"
                border
            >
                <el-table-column
                        prop="region"
                        label="区县">
                </el-table-column>
                <el-table-column
                        prop="station"
                        label="乡（林场)">
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
            </el-table>
        </el-dialog>
        <el-table
                :data="tableData"
                border
                style="width: 100%">
            <el-table-column
                    prop="name"
                    label="项目名">
            </el-table-column>
            <el-table-column
                    prop="description"
                    label="文件夹名">
            </el-table-column>
            <el-table-column
                    label="创建日期"
                    width="120">
                <template slot-scope="scope">
                    <span>{{ getDate(scope.row.createdAt) }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="400">
                <template slot-scope="scope">
                    <el-button class="control" @click="getSmallClass(scope.row)" type="text" size="small">获取小班</el-button>
                    <el-button class="control" @click="getProjectExcel(scope.row)" type="text" size="small">获取评分表</el-button>
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
                :page-sizes="[20,50,100, 200]"
                :page-size="query.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="query.total">
        </el-pagination>


    </layout>
</template>
<style lang="less" type="text/less">
    .body-content {
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
    import io from 'socket.io-client';
    import ovSocket from '../../components/script/ovSocket';
    import editDialog from './components/dialog.vue';
    import newForm from './components/newForm';
    import editor from '../../components/editor.vue';

    import downExcel from '../../components/script/xlsx';
    import baseExcel from '../../components/script/base';
    import excelHelper from './excelHelper';
    export default {
        metaInfo(){
            return {
                title: '项目'
            }
        },
        data() {
            return {
                nav: {
                    sidebar: "2-0",
                },
                tableData: [],
                query: {
                    total: 0,
                    page: 1,
                    pageSize: 20
                },
                dialogVisible: false,
                operatorType: true,
                form:{},
                recordTypeData:[],
                smallClassList:[],
                smallClassGroup:[],
                smallClassCursor:0,
                selectProjectId:0,
                selectRegion:"",
                smallClassDialogVisible:false,
            }
        },
        components: {
            editDialog,
            editor
        },
        mounted() {
            this.getList();
            ovSocket.init({callback:this.onMessage});
        },
        methods: {
            getSmallClassDetail(){
                ovSocket.getSmallClassDetail(this.smallClassList[this.smallClassCursor].ObjID);
                this.smallClassCursor++;
            },
            getSmallClassEnd(){
                console.log(this.smallClassList);
                this.smallClassGroup=_.groupBy(this.smallClassList,'station');
                this.smallClassDialogVisible=true;

            },
            onMessage(data){
                console.log(data);
                if(data.cmdid===20101){
                    let name=data.msg.ObjItems[0].Object.Name,detail=data.msg.ObjItems[0].Object.Comment,detailObj={},obj=this.smallClassList[this.smallClassCursor-1],str=name.split('_');
                    obj.queryName=name;
                    obj.station=str[0];
                    obj.village=str[1];
                    obj.group=str[2];
                    obj.smallClass=str[3];
                    obj.region=this.selectRegion.split('20')[0];
                    obj.projectId=this.selectProjectId;


                    try{
                        detail='{'+detail+'}';
                        detailObj=JSON.parse(detail.replace(/\r\n/g,","));
                        console.log(detailObj);
                        obj.region=detailObj['县'];
                        obj.placeName=detailObj['小地名'];
                        obj.smallClassArea=detailObj['面积'];
                    }catch (e){

                    }

                    if(this.smallClassCursor < this.smallClassList.length){
                        this.getSmallClassDetail();
                    }else{
                        this.getSmallClassEnd();
                    }

                }
                if(data.cmdid===20107){
                    console.log(data.msg.ObjType);
                    if(data.msg.ObjType===13){
                        if(data.msg.ListID && data.msg.ListID.length){
                            this.smallClassList=data.msg.ListID;
                            this.smallClassCursor=0;
                            this.getSmallClassDetail();
                        }else{
                            alert("未找到对应小班文件");
                        }
                    }else{
                        if(data.msg.ListID && data.msg.ListID.length){
                            ovSocket.searchObj({ParentID:data.msg.ListID[0].ObjID,ObjType:13});
                        }else{
                            alert("未找到对应文件夹");
                        }
                    }
                }

            },
            getSmallClass(row){
                this.selectRegion=row.name;
                this.selectProjectId=row.id;
                ovSocket.searchObj({SrhTxt:row.description});
            },
            handleAdd() {
                this.getRecordType(0).then(res=>{
                    console.log(res);
                    this.form=newForm();
                    this.recordTypeData=res;
                    this.dialogVisible=true;
                })
            },
            handleEdit(row) {
                this.form=newForm(row);
                this.dialogVisible=true;
            },
            closeDialog(refresh){
                this.dialogVisible=false;
                refresh && this.getList();
            },
            handleDelete(row) {
                this.$confirm('此操作将永久删除该项目, 是否继续?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.$ajax({
                        method: 'DELETE',
                        url: '/api/project/' + row.id
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
            changePageSize(e){
                this.query.pageSize=e;
                this.getList();
            },
            getList() {
                this.$ajax({
                    method: 'GET',
                    url: '/api/project',
                    params: this.query
                }).then(res => {
                    this.$set(this, 'tableData', res.data);
                    this.query.total = res.total;
                })
            },
            getDate(date) {
                return moment(date).format('YYYY-MM-DD');
            },
            getRecordType(projectId){
                return new Promise((resolve,reject)=>{
                    Promise.all([
                        this.$ajax({
                            method: 'GET',
                            url: '/api/getLv1RecordType'
                        }),
                        this.$ajax({
                            method: 'GET',
                            url: '/api/getRecordTypeById',
                            params: {
                                projectId
                            }
                        }),
                    ]).then(res=>{
                        let data=_.groupBy(res[1].data,'pid');
                        let result=res[0].data.map(item=>{
                            item.children=data[item.id];
                            return item;
                        });
                        resolve(result);
                    })
                })
            },
            importSmallClass(){
                this.$ajax({
                    method: 'post',
                    url: '/api/supervisor/import',
                    data: {
                        result:this.smallClassList,
                        projectId:this.selectProjectId
                    }
                }).then(res=>{
                    this.$message.success('导入成功！');
                })
            },
            getProjectExcel(row){
                this.$ajax({
                    method: 'GET',
                    url: '/api/supervisor',
                    params: {
                        projectId:row.id
                    }
                }).then(res => {
                    let groupData=_.groupBy(res.data, 'station'),result=[],title=row.name+"松材线虫病除治质量监理乡镇小班评分结果一览表";
                    for(let key in groupData){
                        result.push(groupData[key]);
                    }
                    console.log(result);
                    downExcel.downloadExl(excelHelper.totalData(result,title),title);
                })

            }
        }
    }

</script>
