<template>
    <el-dialog :title="operatorType == 'add' ? '新增林场': '编辑林场'" :visible.sync="dialogVisible" :before-close="cancel">
        <el-form :model="form" ref="form" :rules="rules" label-width="120px">

            <el-form-item label="操作人员" prop="operator">
                <el-input v-model="form.operator"></el-input>
            </el-form-item>

            <el-form-item label="所属监理点" prop="supervisorId">
                <el-select v-model="form.supervisorId"  placeholder="请选择所属监理点">
                    <el-option
                            v-for="supervisor in supervisorList"
                            :key="supervisor.id"
                            :label="supervisor.placeName"
                            :value="supervisor.id"
                    ></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="所属记录类型" prop="recordTypeId">
                <el-select v-model="form.recordTypeId"  placeholder="请选择所属记录类型">
                    <el-option
                            v-for="type in recordTypeList.filter(item=>item.pid)"
                            :key="type.id"
                            :label="type.name"
                            :value="type.id"
                    ></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="数量" prop="quantity">
                <el-input v-model="form.quantity"></el-input>
            </el-form-item>


            <el-form-item label="图片地址" prop="picture">
                <el-input v-model="form.picture"></el-input>
            </el-form-item>

            <el-form-item label="经度" prop="longitude">
                <el-input v-model="form.longitude"></el-input>
            </el-form-item>

            <el-form-item label="纬度" prop="latitude">
                <el-input v-model="form.latitude"></el-input>
            </el-form-item>

            <el-form-item label="描述" prop="description">
                <el-input v-model="form.description"></el-input>
            </el-form-item>

            <el-form-item label="状态" prop="status">
                <el-input v-model="form.status"></el-input>
            </el-form-item>

            <el-form-item label="原因" prop="reason">
                <el-input v-model="form.reason"></el-input>
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
        props: ['dialogVisible','operatorType','form','recordTypeList','projectList','supervisorList'],
        data() {
            return {
                rules: {
                    recordTypeId:  [{ required: true, message: '请选择所属记录类型', trigger: 'change' }],
                    supervisorId:  [{ required: true, message: '请选择所属监理点', trigger: 'change' }],
                    quantity:  [{ required: true, message: '请填写数量', trigger: 'blur' }],
                    picture:  [{ required: true, message: '请填写图片地址', trigger: 'blur' }],
                    longitude:  [{ required: true, message: '请填写经度', trigger: 'blur' }],
                    latitude:  [{ required: true, message: '请填写纬度', trigger: 'blur' }],
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
                    url: '/api/supervisorDetail',
                    data: this.form
                }).then(res => {
                    this.$message.success('新增成功');
                    this.cancel(true);
                })
            },
            requestUpdate(id){
                this.$ajax({
                    method: 'PATCH',
                    url: '/api/supervisorDetail/'+id,
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
