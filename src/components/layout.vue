<template>
    <div class="layout">
        <el-row type="flex">
            <el-col span="24">
                <side-nav :active-key="navActive.side"></side-nav>
                <div class="layout-content">
                    <slot></slot>
                </div>
                <slot name="footer">
                    <p class="layout-copy">&copy; 客岚网络</p>
                </slot>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import sideNav from './sidebar.vue'
    export default {
        props: ["navActive"],
        components: {
            sideNav: sideNav
        }
    }
</script>
