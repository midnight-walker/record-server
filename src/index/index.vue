<template>
    <layout :nav-active="nav">
        <p>{{ renderData }}</p>
        <p>{{ customData }}aaa</p>
    </layout>
</template>

<script>
    export default {
        metaInfo(){
            return {
                title: `页面标题`
            }
        },
        data () {
            return {
                nav: {
                    header: "1",
                    sidebar: "1-2"
                },
                renderData: window.renderData,
                customData: 'Rendered by Vue!'
            }
        }
    }
</script>
