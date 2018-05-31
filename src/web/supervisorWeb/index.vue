<template>
    <layout :nav-active="nav">
        <div class="supervisor-web-content">
            <div class="user-basic-info">
                <el-card class="box-card pannel-box">
                    <h2>监理点基本信息</h2>
                    <el-row>
                        <el-col :span="8">区县：{{supervisor.region}}</el-col>
                        <el-col :span="8">乡镇：{{supervisor.station}}</el-col>
                        <el-col :span="8">村：{{supervisor.village}}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">社：{{supervisor.group}}</el-col>
                        <el-col :span="8">小班号：{{supervisor.smallClass}}</el-col>
                        <el-col :span="8">小地名：{{supervisor.placeName}}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">面积（亩）：{{supervisor.smallClassArea}}</el-col>
                        <el-col :span="8">树种组成：{{supervisor.treeCompose}}</el-col>
                        <el-col :span="8">防治对象名称：{{supervisor.targetName}}</el-col>
                    </el-row>
                </el-card>
            </div>
            <div class="data-statistics">
                <el-row :gutter="10">
                    <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                        <staticPanel icon="icon-date" :num="time" type="primary" text="监理时间"/>
                    </el-col>
                    <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                        <staticPanel icon="icon-row-add" :num="detailList.length" type="primary" text="记录总数"/>
                    </el-col>
                    <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                        <staticPanel icon="icon-yixuan" :num="normalList.length" type="success" text="正常记录"/>
                    </el-col>
                    <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                        <staticPanel icon="icon-warn" :num="errorList.length" type="danger" text="异常记录"/>
                    </el-col>
                </el-row>
            </div>

            <div class="grid-content bg-purple">
                <el-card class="box-card pannel-box">
                    <div slot="header" class="clearfix">
                        <span>记录详情</span>
                    </div>
                    <div class="box-body">
                        <el-row>
                            <el-col>
                                <el-carousel @change="changeCarousel" interval="60000" height="480px">
                                    <el-carousel-item v-for="item in detailList" :key="item.id">
                                        <el-row>
                                            <img style="max-width:700px;height: 480px;float:left;margin-right: 20px" :src="item.picture" />
                                            <el-col :span="8" class="detail-box" style="overflow: hidden">
                                                <el-row>
                                                    记录类型：<span :style="item.isError?'color:red':'color:green'">{{item.record_types[0].name}}</span>
                                                </el-row>
                                                <el-row>
                                                    描述：<span>{{item.description}}</span>
                                                </el-row>
                                                <el-row>
                                                    上传人：<span>{{item.member.name}}</span>
                                                </el-row>
                                                <el-row>
                                                    联系电话：<span>{{item.member.phone}}</span>
                                                </el-row>
                                                <el-row>
                                                    保存时间：<span>{{item.saveTime}}</span>
                                                </el-row>
                                                <el-row>
                                                    上传时间：<span>{{item.createTime}}</span>
                                                </el-row>
                                            </el-col>
                                        </el-row>
                                    </el-carousel-item>
                                </el-carousel>
                            </el-col>
                            <!--<el-col :span="8">
                                <div id="map-container" style="height: 480px;width:100%"></div>
                            </el-col>-->
                        </el-row>

                    </div>
                </el-card>
            </div>

        </div>
    </layout>
</template>
<style lang="less" type="text/less">
    .supervisor-web-content {
        .user-basic-info {
            h2 {
                font-size: 16px;
                padding-bottom: 30px;
                color: #0d7ce3;
                text-align: center;
            }
            .el-col {
                line-height: 25px;
            }
        }
        .detail-box{
            .el-row{
                line-height: 40px;
            }
        }
        .data-statistics {
            margin: 20px 0;
        }

        .el-carousel__button{
            background: #000;
        }
        .el-carousel__indicator.is-active button{
            background: red;
        }
    }
</style>
<style lang="less" type="text/less" scoped>
</style>
<script>
    import staticPanel from '../../components/staticPanel.vue'

    export default {
        metaInfo() {
            return {
                title: '我的桌面'
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
                time: '',
                carouselIndex:0
            }
        },
        mounted() {
            this.getBaseInfo();
        },
        components: {
            staticPanel
        },
        methods: {
            getBaseInfo() {
                let id = window.renderData.id;
                Promise.all([
                    this.$ajax({
                        method: 'GET',
                        url: '/api/supervisor',
                        params: {
                            id
                        }
                    }),
                    this.$ajax({
                        method: 'GET',
                        url: '/api/supervisorDetail',
                        params: {
                            supervisorId: id
                        }
                    })
                ])
                    .then(res => {
                        let d0 = res[0].data, d1 = res[1].data;
                        if (res[0].success && res[1].success && d0[0]) {
                            this.supervisor = d0[0];
                            this.$set(this, 'detailList', d1);
                            let group = _.groupBy(d1, (item) => {
                                let type = item.record_types[0].type,result = type === 0 ? 0 : 1;
                                item.isError=result;
                                item.createTime=moment(item.createdAt,'x').format('YYYY-MM-DD HH:mm:ss');
                                item.saveTime=moment(item.savedAt,'x').format('YYYY-MM-DD HH:mm:ss');
                                return result;
                            });
                            this.$set(this, 'normalList', group[0]||[]);
                            this.$set(this, 'errorList', group[1]||[]);
                            let last = d1[d1.length - 1];
                            if (last && last.createdAt) {
                                this.time = moment(last.createdAt, 'x').format('YYYY-MM-DD');
                            }
                            //this.createMap();
                        }
                    })
            },
            changeCarousel(i){
                this.carouselIndex=i;
            },
            /*createMap(){
                let map = new AMap.Map('map-container',{
                    resizeEnable: true,
                    zoom: 14,
                    center: [this.detailList[0].longitude,this.detailList[0].latitude]
                });

                let marker=this.detailList.map(item=>{
                    return new AMap.Marker({
                        position: [item.longitude,item.latitude],
                        title: item.record_types[0].name,
                        map
                    });
                });
            }*/
        }
    }

</script>
