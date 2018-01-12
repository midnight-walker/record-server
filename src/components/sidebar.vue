<template>
    <div class="side-bar">
        <el-menu
                :default-active="activeKey"
                class="el-menu-vertical"
                @select="handleSelect"
                text-color="#fff"
                unique-opened="true"
                width="208px">
            <template v-for="(cate1,idx1) in nav">
                <template v-if="cate1.list.length===1">
                    <el-menu-item :index="idx1" @click="handleClick(cate1.list[0])">
                        <i :class="'nav-icon icon-'+cate1.prop"></i>
                        <a href="javascript:">
                            {{cate1.list[0].name}}
                        </a>
                    </el-menu-item>
                </template>
                <template v-else>
                    <el-submenu :index="idx1">
                        <template slot="title">
                            <i :class="'nav-icon icon-'+cate1.prop"></i>
                            {{cate1.name}}
                        </template>
                        <template v-for="(cate2,idx2) in cate1.list">
                            <el-menu-item :index="idx1+'-'+idx2" @click="handleClick(cate2)">
                                <a href="javascript:">{{cate2.name}}</a>
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
            </template>
        </el-menu>
    </div>
</template>
<style lang="less" type="text/less">
    a {
        color: inherit;
        text-decoration: none;
    }

    .side-bar {
        flex: 1;
        background-color: #0d7ce3;
        .nav-icon {
            font-size: 24px;
            position: relative;
            top: 3px;
        }
        .icon-forms {
            font-size: 16px;
            margin-left: 2px;
            margin-right: 5px;
            top: 1px;
        }
        .el-menu{
            background: none;
            .el-menu-item:focus, .el-menu-item:hover,.el-submenu__title:hover,.el-submenu .el-menu-item:hover{
                background: #2e98fa;
            }
        }
        .el-menu-item i,.el-submenu__title i{
            color:#fff;
        }
    }
</style>
<script type="text/ecmascript-6">
    let nav = require('../resource').nav;

    export default {
        props: ["activeKey"],
        data() {
            return {
                nav
            }
        },
        computed: {
            openNames() {
                return [this.activeKey.replace(/-.*/g, '')]
            }
        },
        mounted() {
        },
        methods: {
            handleClick(item) {
                let url = item.id !== 'index' ? '/' + item.id : '/';
                window.location.href = url;
            }
        }
    }
</script>
