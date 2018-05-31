<template>
    <layout class="body-content" :nav-active="nav">
        <el-row class="search-bar">
            所属区县：
            <el-select @change="getList" v-model="query.regionId"  placeholder="">
                <el-option
                        v-for="region in regionSearchList"
                        :key="region.id"
                        :label="region.name"
                        :value="region.id"
                ></el-option>
            </el-select>
        </el-row>
        <el-row class="tool-bar">
            <el-button type="primary" icon="plus" @click="handleAdd">添加林场</el-button>
        </el-row>
        <edit-dialog :form="form" :region-list="regionList" :dialog-visible="dialogVisible" :operator-type="operatorType" @closeDialog="closeDialog"></edit-dialog>
        <el-table
                :data="tableData"
                border
                style="width: 100%">
            <el-table-column
                    prop="name"
                    label="林场名">
            </el-table-column>
            <el-table-column
                    prop="code"
                    label="所属区县">
                <template slot-scope="scope">
                    <span>{{ getRegion(scope.row.regionId) }}</span>
                </template>
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
    let defaultList=()=>{
        return [
            {
                id:0,
                name:'全部'
            }
        ]
    }
    export default {
        metaInfo(){
            return {
                title: '林场'
            }
        },
        data() {
            return {
                nav: {
                    sidebar: "1-2",
                },
                tableData: [],
                query: {
                    total: 0,
                    regionId : 0,
                    page: 1,
                    pageSize: 20
                },
                dialogVisible: false,
                operatorType: true,
                form:newForm(),
                regionList:[],
                regionSearchList:defaultList()
            }
        },
        components: {
            editDialog
        },
        mounted() {
            this.getBaseInfo();
        },
        methods: {
            handleAdd() {
                this.form=newForm();
                this.dialogVisible=true;
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
                this.$confirm('此操作将永久删除该林场, 是否继续?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.$ajax({
                        method: 'DELETE',
                        url: '/api/station/' + row.id
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
            getBaseInfo(){
                this.$ajax({
                    method: 'GET',
                    url: '/api/region',
                    params: {}
                }).then(res => {
                    this.$set(this, 'regionList', res.data);
                    this.$set(this, 'regionSearchList', defaultList().concat(res.data));
                    this.getList();
                })
            },
            getRegion(id){
                let region = this.regionList.find(item=>item.id===id);
                return region?region.name:'';
            },
            getList() {
                this.$ajax({
                    method: 'GET',
                    url: '/api/station',
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
