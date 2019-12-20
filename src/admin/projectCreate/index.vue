<template>
    <layout class="create-project-content" :nav-active="nav">

    </layout>
</template>
<style lang="less" type="text/less">

</style>
<script>
    export default {
        metaInfo(){
            return {
                title: '创建项目'
            }
        },
        data() {
            return {
                nav: {
                    sidebar: "2-0",
                },
                form:{}
            }
        },
        components: {
        },
        mounted() {
        },
        methods: {
            getList() {
                this.$ajax({
                    method: 'GET',
                    url: '/api/project',
                    params: {

                    }
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
