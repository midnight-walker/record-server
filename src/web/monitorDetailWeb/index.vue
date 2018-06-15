<template>
    <layout :nav-active="nav">
        <div class="monitor-detail-web-content">

            <el-row>
                <el-col :span="8">
                    <span>区县:</span><el-input v-model="query.region" placeholder="请输入区县"></el-input>
                </el-col>
                <el-col :span="8">
                    <span>乡镇（林场）:</span><el-input v-model="query.station" placeholder="请输入乡镇（林场）"></el-input>
                </el-col>
                <el-col :span="8">
                   <span>村（林班）:</span><el-input v-model="query.village" placeholder="请输入村（林班）"></el-input>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="8">
                    <span>小班:</span><el-input v-model="query.smallClass" placeholder="请输入小班"></el-input>
                </el-col>
                <el-col :span="8">
                    <span>小地名:</span><el-input v-model="query.placeName" placeholder="请输入小地名"></el-input>
                </el-col>
                <el-col :span="8">
                    <el-button @click="getList">查询</el-button>
                    <el-button @click="getExcel">导出</el-button>
                </el-col>
            </el-row>

            <el-table
                    :data="tableData"
                    border
                    style="width: 100%;margin-top: 20px;">
                <el-table-column
                        label="区县">
                    <template slot-scope="scope">
                        <span>{{scope.row.monitor.region}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="乡镇（林场）">
                    <template slot-scope="scope">
                        <span>{{ scope.row.monitor.station }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="村（林班）">
                    <template slot-scope="scope">
                        <span>{{ scope.row.monitor.village }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="社">
                    <template slot-scope="scope">
                        <span>{{ scope.row.monitor.group }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="小班">
                    <template slot-scope="scope">
                        <span>{{ scope.row.monitor.smallClass }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="小班面积">
                    <template slot-scope="scope">
                        <span>{{ scope.row.monitor.smallClassArea }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="小地名">
                    <template slot-scope="scope">
                        <span>{{ scope.row.monitor.placeName }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="signNumber"
                        label="人工编号">
                </el-table-column>
                <el-table-column
                        label="挂放时间">
                    <template slot-scope="scope">
                        <span>{{ scope.row.monitor.placeName }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="longitude"
                        width="150px"
                        label="东经">
                </el-table-column>
                <el-table-column
                        prop="latitude"
                        width="150px"
                        label="北纬">
                </el-table-column>
                <el-table-column
                        prop="altitude"
                        label="海拔(米)">
                </el-table-column>
                <el-table-column
                        prop="slopePosition"
                        label="坡位">
                </el-table-column>
                <el-table-column
                        prop="slopeDirection"
                        label="坡向">
                </el-table-column>
                <el-table-column
                        label="树种组成">
                    <template slot-scope="scope">
                        <span>{{ scope.row.monitor.treeCompose }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="treeHeight"
                        label="平均树高(米)">
                </el-table-column>
                <el-table-column
                        prop="treeRadius"
                        label="平均胸径（cm）">
                </el-table-column>
                <el-table-column
                        label="林′密°（株/亩）">
                    <template slot-scope="scope">
                        <span>{{ scope.row.monitor.treeDensity }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="郁闭°">
                    <template slot-scope="scope">
                        <span>{{ scope.row.monitor.crownDensity }}</span>
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
        </div>
    </layout>
</template>
<style lang="less" type="text/less">
    .monitor-detail-web-content {
        .el-col{
            padding: 5px;
            .el-input{
                width: 200px;
            }
            span{
                width: 100px;
                display: inline-block;
            }
            .el-button{
                width: 145px;
            }
        }
    }
</style>
<style lang="less" type="text/less" scoped>
</style>
<script>


    export default {
        metaInfo() {
            return {
                title: '诱捕器'
            }
        },
        data() {
            return {
                nav: {
                    header: "1",
                },
                renderData: window.renderData,
                supervisor: {},
                detailList: [],
                normalList: [],
                errorList: [],
                tableData:[],
                query: {
                    total: 0,
                    region: '',
                    station: '',
                    village:'',
                    smallClass:'',
                    placeName:'',
                    page: 1,
                    pageSize: 20
                },
                time: '',
                carouselIndex:0
            }
        },
        mounted() {
            this.getList();
        },
        components: {
        },
        methods: {
            changePage(e) {
                this.query.page = e;
                this.getList();
            },
            changePageSize(e) {
                this.query.pageSize = e;
                this.getList();
            },
            getList(){
                this.$ajax({
                    method: 'GET',
                    url: '/api/monitorDetail',
                    params: this.query
                }).then(res => {
                    this.$set(this, 'tableData', res.data);
                    this.query.total = res.total;
                })
            },
            getExcel(){
                let ext='',arr=[];
                let {region,station,village,smallClass,placeName}=this.query;
                region && arr.push({
                   name:"region",
                   value:region
                });
                station && arr.push({
                    name:"station",
                    value:station
                });
                village && arr.push({
                    name:"village",
                    value:village
                });
                smallClass && arr.push({
                    name:"smallClass",
                    value:smallClass
                });
                placeName && arr.push({
                    name:"placeName",
                    value:placeName
                });
                arr.forEach((item,index)=>{
                    let first=index===0?'?':'&';
                    ext+=first+item.name+'='+item.value
                });
                window.location.href='/api/monitorDetail/export'+ext;
            }
        }
    }

</script>
