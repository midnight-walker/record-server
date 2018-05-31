<template>
    <layout :nav-active="nav">
        这尼玛
    </layout>
</template>
<style>
</style>
<style scoped>
</style>
<script>
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
                renderData: window.renderData
            }
        },
        components: {
        },
        methods: {
        }
    }

</script>
