<template>
    <layout :nav-active="nav">
        <el-button @click="getFiles">获取项目信息</el-button>
        <el-collapse v-if="projectList.length" v-model="activeNames" @change="handleChange">
            <el-collapse-item v-for="(project,index) in projectList" :title="project.Name" name="index">

            </el-collapse-item>
        </el-collapse>
    </layout>
</template>
<style>
</style>
<style scoped>
</style>
<script>
    import io from 'socket.io-client';
    import ovSocket from '../../components/script/ovSocket';
    export default{
        metaInfo(){
            return {
                title: '我的桌面'
            }
        },
        data () {
            return {
                nav: {
                    header: "1",
                },
                socket:{},
                renderData: window.renderData,
                ParentID:undefined,
                projectList:[],
                activeNames:[],
            }
        },
        mounted(){
            ovSocket.init({callback:this.onMessage});
        },
        components: {
        },
        methods: {
            getFiles(){
                ovSocket.getFiles();
            },
            onMessage(data){
                console.log(data);
                if(!this.ParentID){
                    let list=data.msg.ObjList;
                    if(!list || !list.length){ return }
                    let projectList=list.filter(item=>item.Name.startsWith('监理小班-'));
                    projectList.forEach(item=>{
                        let arr=item.Name.split('-');
                        item.regionName=arr[1];
                        item.year=arr[2];
                        item.smallCLass=[];
                    });
                    this.projectList=projectList;
                }
            },
            handleChange(){
                ovSocket.getObjList();
            }
        }
    }

</script>
