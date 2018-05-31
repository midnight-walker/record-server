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
        <edit-dialog :form="form" :region-list="regionList" :station-list="stationList" :dialog-visible="dialogVisible" :operator-type="operatorType" @closeDialog="closeDialog"></edit-dialog>
        <el-table
                :data="tableData"
                border
                style="width: 100%">
            <el-table-column
                    prop="operator"
                    label="操作人员">
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
                    <span>{{ getRegion(scope.row.stationId) }}</span>
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
                    prop="workGroup"
                    label="施工作业单位名称">
            </el-table-column>


            <el-table-column
                    prop="fcXianyan"
                    label="伐除对象-显眼枯死松树">
            </el-table-column>

            <el-table-column
                    prop="fcXixiao"
                    label="伐除对象-细小枯死松树">
            </el-table-column>

            <el-table-column
                    prop="fcGaodudayuwu"
                    label="伐除对象-高度5厘米以上的树桩">
            </el-table-column>

            <el-table-column
                    prop="fcChanzhe"
                    label="伐除对象-藤蔓或活树连着枯死树">
            </el-table-column>

            <el-table-column
                    prop="fcFugai"
                    label="伐除对象-藤蔓覆盖的枯死松树">
            </el-table-column>

            <el-table-column
                    prop="fcFengzhe"
                    label="伐除对象-风折风倒的枯死松树">
            </el-table-column>

            <el-table-column
                    prop="fcHuoshao"
                    label="伐除对象-火烧、雷击枯死松树">
            </el-table-column>

            <el-table-column
                    prop="fcXuanya"
                    label="伐除对象-悬崖边枯死松树">
            </el-table-column>

            <el-table-column
                    prop="fcXuangua"
                    label="伐除对象-悬挂或地面的松树梢头">
            </el-table-column>

            <el-table-column
                    prop="fcHuoshukuzhi"
                    label="伐除对象-活松树上枯死树枝">
            </el-table-column>

            <el-table-column
                    prop="fcTotal"
                    label="伐除对象-伐除小计">
            </el-table-column>

            <el-table-column
                    prop="jcFcFengzhe"
                    label="集材对象-风折风倒的枯死松树">
            </el-table-column>

            <el-table-column
                    prop="jcFcSongshu"
                    label="集材对象-松树">
            </el-table-column>

            <el-table-column
                    prop="jcFcSongmu"
                    label="集材对象-松木段">
            </el-table-column>

            <el-table-column
                    prop="jcFcSongzhi"
                    label="集材对象-地上粗1厘米以上松枝">
            </el-table-column>

            <el-table-column
                    prop="jcFcShaotou"
                    label="集材对象-松树梢头">
            </el-table-column>

            <el-table-column
                    prop="jcFcTotal"
                    label="集材对象-伐除小计">
            </el-table-column>

            <el-table-column
                    prop="jcYcCaogai"
                    label="集材对象-用草覆盖">
            </el-table-column>

            <el-table-column
                    prop="jcYcKuye"
                    label="集材对象-用枯枝落叶覆盖">
            </el-table-column>

            <el-table-column
                    prop="jcYcTurang"
                    label="集材对象-用土壤覆盖">
            </el-table-column>

            <el-table-column
                    prop="jcYcDigou"
                    label="集材对象-隐藏于地沟">
            </el-table-column>

            <el-table-column
                    prop="jcYcDongxue"
                    label="集材对象-洞穴中的松材">
            </el-table-column>

            <el-table-column
                    prop="jcYcTotal"
                    label="集材对象-隐藏小计">
            </el-table-column>

            <el-table-column
                    prop="fsSongzhi"
                    label="焚烧对象-未完全炭化的松枝">
            </el-table-column>

            <el-table-column
                    prop="fsSongmu"
                    label="焚烧对象-未完全炭化的松木">
            </el-table-column>

            <el-table-column
                    prop="fsSongcai"
                    label="焚烧对象-未点火的松材堆">
            </el-table-column>

            <el-table-column
                    prop="fzFazhuang"
                    label="伐桩高度5厘米以下">
            </el-table-column>

            <el-table-column
                    prop="fzBopi"
                    label="伐桩剥皮">
            </el-table-column>

            <el-table-column
                    prop="fzJiahao"
                    label="在横断面上砍“+字”口">
            </el-table-column>

            <el-table-column
                    prop="fzTouyao"
                    label="投药">
            </el-table-column>

            <el-table-column
                    prop="fzShuliao"
                    label="覆盖塑料布">
            </el-table-column>

            <el-table-column
                    prop="fzNitu"
                    label="覆盖泥土厚度2厘以上">
            </el-table-column>

            <el-table-column
                    prop="fzTotal"
                    label="伐桩小计">
            </el-table-column>

            <el-table-column
                    prop="fzNumber"
                    label="伐桩个数">
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
                    sidebar: "3-2",
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
                    })
                ]).then(res => {
                    if(res[0].success && res[1].success){
                        this.$set(this, 'regionList', res[0].data);
                        this.$set(this, 'stationList', res[1].data);
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
                    url: '/api/scxcSupervisor',
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
