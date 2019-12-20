<template>
    <layout class="body-content" :nav-active="nav">
        <el-row class="tool-bar">
            <el-button type="primary" icon="plus" @click="handleAdd">添加监理员</el-button>
        </el-row>
        <edit-dialog :form="form" :dialog-visible="dialogVisible" :operator-type="operatorType" @closeDialog="closeDialog"></edit-dialog>
        <el-table
                :data="tableData"
                border
                style="width: 100%">
            <el-table-column
                    prop="name"
                    label="监理员姓名">
            </el-table-column>
            <el-table-column
                    prop="wxname"
                    label="微信名">
            </el-table-column>
            <el-table-column
                    prop="phone"
                    label="电话">
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
    export default {
        metaInfo(){
            return {
                title: '监理员'
            }
        },
        data() {
            return {
                nav: {
                    sidebar: "1-0",
                },
                tableData: [],
                query: {
                    total: 0,
                    page: 1,
                    pageSize: 20
                },
                dialogVisible: false,
                operatorType: true,
                form:newForm()
            }
        },
        components: {
            editDialog
        },
        mounted() {
            this.getList();
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
                this.$confirm('此操作将永久删除该监理员, 是否继续?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.$ajax({
                        method: 'DELETE',
                        url: '/api/members/' + row.id
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
                    url: '/api/members',
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
