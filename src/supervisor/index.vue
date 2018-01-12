<template>
    <layout class="body-content" :nav-active="nav">
        <el-row class="search-bar">
            所属区县：
            <el-select @change="changeRegion" v-model="query.regionId" placeholder="">
                <el-option
                        v-for="region in regionSearchList"
                        :key="region.id"
                        :label="region.name"
                        :value="region.id"
                ></el-option>
            </el-select>
            所属林场：
            <el-select @change="changeStation" v-model="query.stationId" placeholder="">
                <el-option
                        v-for="station in stationSearchList"
                        :key="station.id"
                        :label="station.name"
                        :value="station.id"
                ></el-option>
            </el-select>
        </el-row>
        <el-row class="tool-bar">
            <el-button type="primary" icon="plus" @click="handleAdd">添加业务记录</el-button>
        </el-row>
        <edit-dialog :form="form" :region-list="regionList" :station-list="stationList" :workGroupList="workGroupList" :projectList="projectList" :dialog-visible="dialogVisible" :operator-type="operatorType" @closeDialog="closeDialog"></edit-dialog>
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
                    prop="regionId"
                    label="区县">
                <template slot-scope="scope">
                    <span>{{ getRegion(scope.row.regionId) }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="stationId"
                    label="林场">
                <template slot-scope="scope">
                    <span>{{ getStation(scope.row.stationId) }}</span>
                </template>
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
                    label="时间"
                    width="120">
                <template slot-scope="scope">
                    <span>{{ getDate(scope.row.time) }}</span>
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
                    sidebar: "3-1",
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
                regionList: [],
                stationList: [],
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
                this.$confirm('此操作将永久删除该条监理记录, 是否继续?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.$ajax({
                        method: 'DELETE',
                        url: '/api/scxcSupervisor/' + row.id
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
                        url: '/api/region',
                        params: {}
                    }),
                    this.$ajax({
                        method: 'GET',
                        url: '/api/station',
                        params: {}
                    }),
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
                    if(res[0].success && res[1].success && res[2].success && res[3].success){
                        this.$set(this, 'regionList', res[0].data);
                        this.$set(this, 'stationList', res[1].data);
                        this.$set(this, 'workGroupList', res[2].data);
                        this.$set(this, 'projectList', res[3].data);
                        this.getList();
                    }

                })
            },
            getRegion(id) {
                let region = this.regionList.find(item => item.id === id);
                return region ? region.name : '';
            },
            getStation(id) {
                let station = this.stationList.find(item => item.id === id);
                return station ? station.name : '';
            },
            getWorkGroup(id) {
                let workGroup = this.workGroupList.find(item => item.id === id);
                return workGroup ? workGroup.name : '';
            },
            getProject(id){
                let project = this.projectList.find(item => item.id === id);
                return project ? project.name : '';
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
                    url: '/api/supervisor',
                    params: this.query
                }).then(res => {
                    this.$set(this, 'tableData', res.data);
                    this.query.total = res.total;
                })
            },
            getDate(date) {
                return moment(date).format('YYYY-MM-DD');
            }
        }
    }

</script>
