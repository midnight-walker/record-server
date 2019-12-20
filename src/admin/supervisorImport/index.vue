<template>
    <layout class="body-content" :nav-active="nav">

    </layout>
</template>
<style lang="less" type="text/less">
</style>
<script>

    export default {
        metaInfo() {
            return {
                title: '监理记录导入'
            }
        },
        data() {
            return {
                nav: {
                    sidebar: "3-2",
                },
            }
        },
        components: {
        },
        mounted() {
            this.getBaseInfo();
        },
        computed:{
        },
        methods: {
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
                        //this.getList();
                    }

                })
            },
        }
    }

</script>
