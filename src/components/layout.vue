<template>
    <div class="layout">
        <el-row type="flex" class="layout-cont">
            <transition name="sidebar-collapse" enter-active-class="animated fadeInLeft"
                        leave-active-class="animated fadeOutLeft">
                <div class="sidebar" v-show="!isCollapse">
                    <div class="system-info">
                        <div><i class=""></i></div>
                        <p class="vision"><i class=""></i></p>
                    </div>
                    <side-nav :active-key="navActive.sidebar"></side-nav>
                    <div class="layout-copy">
                    </div>
                </div>
            </transition>
            <a class="sidebar-btn" @click="collapse"><i :class="isCollapse ? 'el-icon-arrow-right':'el-icon-arrow-left'"></i></a>
            <el-col class="layout-col" span="24">
                <top-bar></top-bar>
                <div class="layout-main">
                    <slot></slot>
                </div>
                <slot name="footer">
                </slot>
            </el-col>
        </el-row>
        <div class="print-mask"></div>
    </div>
</template>

<style lang="less" type="text/less">
    .layout {
        position: relative;
        height: 100%;
        flex-direction: row;
        overflow: hidden;
    }

    .layout-content {
        min-height: 200px;
        border-radius: 4px;
    }

    .layout-sidebar {
        background: #464c5b;
    }

    .layout-header {
        height: 60px;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
    }

    .layout-cont {
        height: 100%;
        flex-direction: row;
    }

    .sidebar {
        display: flex;
        flex-direction: column;
        width: 210px;
        height: 100%;
        background-color: #0d7ce3;
        overflow-y: auto;
        overflow-x: hidden;
        &::-webkit-scrollbar {
            width: 10px;
        }
        /* 滚动槽 */
        &::-webkit-scrollbar-track {
            -webkit-box-shadow: inset 0 0 5px rgba(13, 124, 227, 0.3);
            border-radius: 10px;
        }
        /* 滚动条滑块 */
        &::-webkit-scrollbar-thumb {
            border-radius: 10px;
            background: rgba(91, 166, 236, 0.8);
            -webkit-box-shadow: none;
        }
    }

    .sidebar-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 114px;
        width: 20px;
        position: absolute;
        left: 207px;
        top: 20px;
        background: url(./img/sidebar.png) no-repeat center;
        background-size: 143%;
        border: 0;
        z-index: 1;
        color: #fff;
        font-size: 12px;
        cursor: pointer;
    }

    .sidebar-btn-collapse {
        left: -2px;
    }

    .layout-col {
        display: flex;
        flex-direction: column;
        background: #fff;
        flex: 1;
        height: 100%;
        overflow-y: auto;
    }

    .layout-main {
        padding: 20px;
        min-width: 1000px;
        flex: 1;
        font-size: 13px;
    }

    .print-mask {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #fff;
        z-index: -1;
    }

    .system-info {
        width: 200px;
        box-sizing: border-box;
        padding-left: 24px;
        padding-top: 10px;
        padding-bottom: 50px;
        background-color: #0d7ce3;
        .icon-logo{
            margin-left: -5px;
            font-size: 107px;
            color: #fff;
        }

        .vision {
            margin-top: -25px;
            font-size: 12px;
            color: #fff;
            font-family: "Microsoft YaHei";
            .icon-saas{
                margin-right: 2px;
                font-size: 20px;
                vertical-align: middle;
                color: #fff;
            }
            span{
                font-weight: bold;
            }
        }
    }

    .layout-copy {
        width: 200px;
        box-sizing: border-box;
        text-align: left;
        padding: 20px 18px;
        line-height: 20px;
        font-size: 12px;
        color: #8cb9e2;
        background-color: #0d7ce3;
        flex-shrink: 0;
    }

    .vision-num {
        margin-left: 7px;
        display: inline-block;
        width: 22px;
        height: 11px;
        line-height: 11px;
        border-radius: 5.5px;
        font-size: 12px;
        text-align: center;
        font-weight: normal;
        background-color: #fff;
        color: #258cec;
        font-family: Arial;

        span {
            display: block;
            font-weight: bold;
            transform: scale(0.8);
        }
    }

    .system-content {
        padding: 20px;
    }

    .tab {
        margin-bottom: 15px;
        &:after {
            content: '';
            display: block;
            width: 0;
            height: 0;
            clear: both;
        }
    }

    .wrapper {
        float: right;
        position: relative;

        input {
            position: absolute;
            overflow: hidden;
            width: 60px;
            height: 32px;
            right: 29px;
            opacity: 0;
            z-index: -1;
        }

        .import-dialog .el-dialog {
            width: 350px;
        }

    }

</style>

<script type="text/ecmascript-6">
    import topBar from './topbar.vue'
    import sideNav from './sidebar.vue'

    export default {
        props: ["navActive"],
        data() {
            return {
                isCollapse: false
            }
        },
        components: {
            topBar: topBar,
            sideNav: sideNav
        },
        mounted() {
        },
        methods: {
            collapse() {
                this.isCollapse = !this.isCollapse;
                let btn = $(".sidebar-btn");
                if (this.isCollapse) {
                    btn.addClass("sidebar-btn-collapse");
                } else {
                    btn.removeClass("sidebar-btn-collapse");
                }
            }
        }
    }
</script>
