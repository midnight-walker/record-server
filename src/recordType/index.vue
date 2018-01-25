<template>
    <layout class="body-content" :nav-active="nav">
        <el-row class="tool-bar">
            <el-button type="primary" icon="plus" @click="handleAdd">添加记录类型</el-button>
        </el-row>
        <edit-dialog :form="form" :typeList="typeList" :dialog-visible="dialogVisible" :operator-type="operatorType"
                     @closeDialog="closeDialog"></edit-dialog>
        <el-table
                :data="tableData"
                border
                style="width: 100%">
            <el-table-column
                    label="父级类型"
                    width="120">
                <template slot-scope="scope">
                    <span>{{ getParentName(scope.row.pid) }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="记录类型名">
            </el-table-column>
            <el-table-column
                    prop="score"
                    label="扣分数">
            </el-table-column>
            <el-table-column
                    prop="level"
                    label="类型等级">
            </el-table-column>
            <el-table-column
                    prop="description"
                    label="描述">
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
                name:'无'
            }
        ]
    }
    export default {
        metaInfo() {
            return {
                title: '记录类型'
            }
        },
        data() {
            return {
                nav: {
                    sidebar: "2-2",
                },
                tableData: [],
                query: {
                    total: 0,
                    page: 1,
                    pageSize: 20
                },
                dialogVisible: false,
                operatorType: true,
                typeList:[],
                form: {}
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
                this.form = newForm();
                this.dialogVisible = true;
            },
            handleEdit(row) {
                this.form = newForm(row);
                this.dialogVisible = true;
            },
            closeDialog(refresh) {
                this.dialogVisible = false;
                refresh && this.getBaseInfo();
            },
            handleDelete(row) {
                this.$confirm('此操作将永久删除该记录类型, 是否继续?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.$ajax({
                        method: 'DELETE',
                        url: '/api/recordType/' + row.id
                    }).then(res => {
                        this.$message.success('删除成功！');
                        this.getBaseInfo();
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
                this.getBaseInfo();
            },
            changePageSize(e) {
                this.query.pageSize = e;
                this.getBaseInfo();
            },
            getBaseInfo() {
                this.$ajax({
                    method: 'GET',
                    url: '/api/recordType',
                    params: {}
                }).then(res => {
                    this.$set(this, 'typeList', defaultList().concat(res.data));
                    this.getList();
                })
            },
            getList() {
                this.$ajax({
                    method: 'GET',
                    url: '/api/recordType',
                    params: this.query
                }).then(res => {
                    this.$set(this, 'tableData', res.data);
                    this.query.total = res.total;
                })
            },
            getDate(date) {
                return moment(date).format('YYYY-MM-DD');
            },
            getParentName(pid){
                let type=this.typeList.find(item=>item.id===pid);
                return type?type.name:'';
            }
        }
    }

</script>
