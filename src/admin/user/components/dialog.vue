<template>
    <el-dialog :title="operatorType == 'add' ? '新增用户': '编辑用户'" :visible.sync="dialogVisible" :before-close="cancel">
        <el-form :model="form" ref="form" :rules="rules" label-width="120px">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item label="微信名" prop="wxname">
                <el-input v-model="form.wxname"></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="phone">
                <el-input v-model="form.phone"></el-input>
            </el-form-item>
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
    export default {
        props: ['dialogVisible','operatorType','form'],
        data() {
            return {
                rules: {
                    username:  [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
                    wxname:  [{ required: true, message: '请输入微信名', trigger: 'blur' }],
                    phone: [{ required: true, message: '请输入联系电话', trigger: 'blur' }]
                }
            }
        },
        methods: {
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
                this.$ajax({
                    method: 'POST',
                    url: '/api/users',
                    data: this.form
                }).then(res => {
                    this.$message.success('新增成功');
                    this.cancel(true);
                })
            },
            requestUpdate(id){
                this.$ajax({
                    method: 'PATCH',
                    url: '/api/users/'+id,
                    data: this.form
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
        }
    }
</script>
