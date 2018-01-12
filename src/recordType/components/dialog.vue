<template>
    <el-dialog :title="operatorType == 'add' ? '新增记录类型': '编辑记录类型'" :visible.sync="dialogVisible" :before-close="cancel">
        <el-form :model="form" ref="form" :rules="rules" label-width="120px">
            <el-form-item label="记录类型名" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="所属父级" prop="pid">
                <el-select @change="changeParent" v-model="form.pid">
                    <el-option
                            v-for="type in typeList.filter(item=>!item.pid)"
                            :key="type.id"
                            :label="type.name"
                            :value="type.id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="描述" prop="description">
                <el-input v-model="form.description"></el-input>
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
        props: ['dialogVisible','operatorType','form','typeList'],
        data() {
            return {
                rules: {
                    name:  [{ required: true, message: '请输入用户名', trigger: 'blur' }]
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
                    url: '/api/recordType',
                    data: this.form
                }).then(res => {
                    this.$message.success('新增成功');
                    this.cancel(true);
                })
            },
            requestUpdate(id){
                this.$ajax({
                    method: 'PATCH',
                    url: '/api/recordType/'+id,
                    data: this.form
                }).then(res => {
                    this.$message.success('修改成功');
                    this.cancel(true);
                })
            },
            cancel(refresh){
                this.$emit("closeDialog",refresh===true);
            },
            changeParent(e){
                this.form.level=e===0?1:2;
            }
        },
        components: {
        }
    }
</script>
