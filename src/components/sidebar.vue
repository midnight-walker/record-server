<template>
    <el-menu default-active="2" class="side-nav el-menu-vertical-demo" @open="handleOpen" @close="handleClose" theme="dark">
        <el-submenu index="1">
            <template slot="title">系统设置</template>
            <el-menu-item-group title="用户设置">
                <el-menu-item index="1-1">前台用户</el-menu-item>
                <el-menu-item index="1-2">后台用户</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="业务管理">
                <el-menu-item index="1-3">区县信息</el-menu-item>
                <el-menu-item index="1-4">林场信息</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="2">导航二</el-menu-item>
        <el-menu-item index="3">导航三</el-menu-item>
    </el-menu>
</template>
<style scoped>
    a{
        color: inherit;
        text-decoration: none;
    }
    .side-nav{
        width: 200px;
        float: left;
        height: 100%;
    }
</style>
<script>
    export default {
        props: ["activeKey"],
        computed: {
            openNames () {
                return [this.activeKey.replace(/-.*/g, '')]
            }
        }
    }
</script>
