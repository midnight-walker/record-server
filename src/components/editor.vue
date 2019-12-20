<template>
    <div>
        <div ref="editor" style="text-align:left"></div>
    </div>
</template>

<script>
    import E from 'wangeditor'
    export default {
        props:['text'],
        name: 'editor',
        data () {
            return {
                editorContent: ''
            }
        },
        methods: {
            getContent: function () {
                return this.editorContent;
            }
        },
        mounted() {
            let editor = new E(this.$refs.editor);
            editor.customConfig.onchange = (html) => {
                this.editorContent = html
            };
            editor.create();
            editor.txt.html(this.text || "");
        }
    }
</script>

<style scoped>
</style>