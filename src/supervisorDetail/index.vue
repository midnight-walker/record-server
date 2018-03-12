<template>
    <layout class="body-content" :nav-active="nav">
        <el-row class="tool-bar">
            <el-button type="primary" icon="plus" @click="handleAdd">添加记录</el-button>
        </el-row>
        <edit-dialog :form="form" :recordTypeList="recordTypeList" :projectList="projectList" :supervisorList="supervisorList" :dialog-visible="dialogVisible" :operator-type="operatorType" @closeDialog="closeDialog"></edit-dialog>
        <el-table
                :data="tableData"
                border
                style="width: 100%">
            <el-table-column
                    prop="member.name"
                    label="操作人员">
            </el-table-column>
            <el-table-column
                    prop="projectId"
                    label="所属项目">
                <template slot-scope="scope">
                    <span>{{ getProject(scope.row.supervisorId) }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="supervisorId"
                    label="所属监理点">
                <template slot-scope="scope">
                    <span>{{ getSupervisor(scope.row.supervisorId) }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="recordTypeId"
                    label="记录类型">
                <template slot-scope="scope">
                    <span>{{ getRecordType(scope.row.recordTypeId) }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="quantity"
                    label="数量">
            </el-table-column>
            <el-table-column
                    prop="description"
                    label="描述">
            </el-table-column>
            <el-table-column
                    prop="supervisorId"
                    label="是否关联">
            </el-table-column>

            <el-table-column
                    prop="status"
                    label="状态">
            </el-table-column>
            <el-table-column
                    prop="reason"
                    label="原因">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="200">
                <template slot-scope="scope">
                    <el-button class="control" @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button class="control" @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
                    <el-button class="control" @click="handleDetail(scope.row)" type="text" size="small">详情</el-button>
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
                    sidebar: "3-0",
                },
                tableData: [],
                query: {
                    total: 0,
                    regionId: 0,
                    stationId:0,
                    page: 1,
                    pageSize: 20
                },
                dialogVisible: false,
                operatorType: true,
                form: newForm(),
                recordTypeList: [],
                projectList: [],
                supervisorList:[]
            }
        },
        components: {
            editDialog
        },
        mounted() {
            this.getBaseInfo();
        },
        computed:{
            regionSearchList(){
                return defaultList().concat(this.regionList);
            },
            stationSearchList(){
                let list=this.stationList;
                if(this.query.regionId){
                    list=this.stationList.filter(item=>item.regionId===this.query.regionId);
                }
                return defaultList().concat(list);
            }
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
                this.$confirm('此操作将永久删除该条记录, 是否继续?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.$ajax({
                        method: 'DELETE',
                        url: '/api/supervisorDetail/' + row.id
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
            handleDetail(row){
                console.log(1);
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
                        url: '/api/recordType',
                        params: {}
                    }),
                    this.$ajax({
                        method: 'GET',
                        url: '/api/project',
                        params: {}
                    }),
                    this.$ajax({
                        method: 'GET',
                        url: '/api/supervisor',
                        params: {}
                    })
                ]).then(res => {
                    if(res[0].success && res[1].success && res[2].success){
                        this.$set(this, 'recordTypeList', res[0].data);
                        this.$set(this, 'projectList', res[1].data);
                        this.$set(this, 'supervisorList', res[2].data);
                        this.getList();
                    }

                })
            },
            getRegion(id) {
                let region = this.regionList.find(item => item.id === id);
                return region ? region.name : '';
            },
            changeRegion(){
                this.query.stationId=0;
                this.getList();
            },
            changeStation(){
                this.getList();
            },
            getList() {
                this.$ajax({
                    method: 'GET',
                    url: '/api/supervisorDetail',
                    params: this.query
                }).then(res => {
                    this.$set(this, 'tableData', res.data);
                    this.query.total = res.total;
                })
            },
            getDate(date) {
                return moment(date).format('YYYY-MM-DD');
            },
            getRecordType(id){
                let record=this.recordTypeList.find(item=>item.id===id);
                return record?record.name:'';
            },
            getProject(supervisorId){
                let supervisor=this.supervisorList.find(item=>item.id===supervisorId);
                let project=this.projectList.find(item=>item.id===supervisor.projectId);
                return project?project.name:'';
            },
            getSupervisor(id){
                let supervisor=this.supervisorList.find(item=>item.id===id);
                return supervisor?supervisor.placeName:'';
            }
        }
    }

</script>
