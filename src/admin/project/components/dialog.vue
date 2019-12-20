<template>
    <el-dialog width="80%" :title="operatorType == 'add' ? '新增项目': '编辑项目'" :visible.sync="dialogVisible" :before-close="cancel">
        <el-form :model="form" ref="form" :rules="rules" label-width="350px">
            <el-form-item label="项目名" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="文件夹名" prop="description">
                <el-input v-model="form.description"></el-input>
            </el-form-item>
            <el-form-item label="评分标准">
                <editor ref="standard" :text="form.standard"></editor>
            </el-form-item>
            <!--<el-form-item label="整改通知书">
                <editor ref="notice" :text="form.notice"></editor>
            </el-form-item>-->

            <!--<el-tabs v-if="recordTypeData" type="border-card">
                <el-tab-pane :label="item.name" v-for="(item,index) in recordTypeData">
                    <el-form-item v-for="recordType in item.children" :label="recordType.name">
                        <el-input v-model="recordType.score"></el-input>
                    </el-form-item>
                </el-tab-pane>
            </el-tabs>-->
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="save" type="primary">保存</el-button>
            <el-button @click="cancel">取消</el-button>
        </div>
    </el-dialog>
</template>
<style lang="less" type="text/less" scoped>

</style>
<script type="text/ecmascript-6">
    import editor from '../../../components/editor.vue';
    export default {
        props: ['dialogVisible','operatorType','form','recordTypeData'],
        data() {
            return {
                rules: {
                    name:  [{ required: true, message: '请输入项目名', trigger: 'blur' }],
                    description:  [{ required: true, message: '请输入项目描述', trigger: 'blur' }]
                }
            }
        },
        methods: {
            /*getRecordTypeList() {
                let result=[];
                if(this.recordTypeData && this.recordTypeData.length){
                    let data=Object.assign({},this.recordTypeData);
                    data.forEach(item=>{
                        if(item.children && item.children.length){
                            item.children.forEach(i=>{
                                result.push(i);
                            })
                        }
                    })
                }
                return result;
            },*/
            save(){
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        if(!this.form.id){
                            this.requestSave();
                        }else{
                            this.requestUpdate(this.form.id);
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            requestSave(){
                //let recordTypeData=this.getRecordTypeList();

                let standard=this.$refs.standard.getContent();
                let data=Object.assign({},this.form,{standard});
                this.$ajax({
                    method: 'POST',
                    url: '/api/project',
                    data
                }).then(res => {
                    this.$message.success('新增成功');
                    this.cancel(true);
                })
            },
            requestUpdate(id){
                let standard=this.$refs.standard.getContent();
                let data=Object.assign({},this.form,{standard});
                this.$ajax({
                    method: 'PATCH',
                    url: '/api/project/'+id,
                    data
                }).then(res => {
                    this.$message.success('修改成功');
                    this.cancel(true);
                })
            },
            cancel(refresh){
                this.$emit("closeDialog",refresh===true);
            }
        },
        components: {
            editor
        }
    }
</script>
