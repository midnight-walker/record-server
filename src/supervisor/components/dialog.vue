<template>
    <el-dialog :title="operatorType == 'add' ? '新增林场': '编辑林场'" :visible.sync="dialogVisible" :before-close="cancel">
        <el-form :model="form" ref="form" :rules="rules" label-width="120px">
            <el-form-item label="所属项目" prop="projectId">
                <el-select v-model="form.projectId"  placeholder="请选择所属项目">
                    <el-option
                            v-for="project in projectList"
                            :key="project.id"
                            :label="project.name"
                            :value="project.id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="区县" prop="region">
                <el-input v-model="form.region"></el-input>
            </el-form-item>
            <el-form-item label="乡镇" prop="station">
                <el-input v-model="form.station"></el-input>
            </el-form-item>

            <el-form-item label="村（管护站）名" prop="village">
                <el-input v-model="form.village"></el-input>
            </el-form-item>

            <el-form-item label="（社、林班）号" prop="group">
                <el-input v-model="form.group"></el-input>
            </el-form-item>

            <el-form-item label="小班号" prop="smallClass">
                <el-input v-model="form.smallClass"></el-input>
            </el-form-item>

            <el-form-item label="小地名" prop="placeName">
                <el-input v-model="form.placeName"></el-input>
            </el-form-item>

            <el-form-item label="小班面积（亩）" prop="smallClassArea">
                <el-input v-model="form.smallClassArea"></el-input>
            </el-form-item>

            <el-form-item label="树种组成" prop="treeCompose">
                <el-input v-model="form.treeCompose"></el-input>
            </el-form-item>

            <el-form-item label="防治对象名称" prop="targetName">
                <el-input v-model="form.targetName"></el-input>
            </el-form-item>

            <el-form-item label="开始时间" prop="time">
                <el-date-picker
                        v-model="form.startTime"
                        type="date"
                        placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间" prop="time">
                <el-date-picker
                        v-model="form.endTime"
                        type="date"
                        placeholder="选择日期">
                </el-date-picker>
            </el-form-item>

            <el-form-item label="施工作业单位" prop="workGroupId">
                <el-select v-model="form.workGroupId"  placeholder="请选择施工作业单位">
                    <el-option
                            v-for="workGroup in workGroupList"
                            :key="workGroup.id"
                            :label="workGroup.name"
                            :value="workGroup.id"
                    ></el-option>
                </el-select>
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
        props: ['dialogVisible','operatorType','form','workGroupList','projectList'],
        data() {
            return {
                rules: {
                    projectId:  [{ required: true, message: '请选择所属项目', trigger: 'change' }],
                    region:  [{ required: true, message: '请填写所属区县', trigger: 'blur' }],
                    station:  [{ required: true, message: '请填写所属乡镇', trigger: 'blur' }],
                    village:  [{ required: true, message: '请填写村（管护站）名', trigger: 'blur' }],
                    group:  [{ required: true, message: '请填写（社、林班）号', trigger: 'blur' }],
                    smallClass:  [{ required: true, message: '请填写小班号', trigger: 'blur' }],
                    placeName:  [{ required: true, message: '请填写小班号', trigger: 'blur' }],
                    smallClassArea:  [{ required: true, message: '请填写小班面积（亩）', trigger: 'blur' }],
                    treeCompose:  [{ required: true, message: '请填写树种组成', trigger: 'blur' }],
                    targetName:  [{ required: true, message: '请填写防治对象名称', trigger: 'blur' }],

                }
            }
        },
        methods: {
            save(){
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.form.time=moment(this.form.time).format('x');
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
                    url: '/api/supervisor',
                    data: this.form
                }).then(res => {
                    this.$message.success('新增成功');
                    this.cancel(true);
                })
            },
            requestUpdate(id){
                this.$ajax({
                    method: 'PATCH',
                    url: '/api/supervisor/'+id,
                    data: this.form
                }).then(res => {
                    this.$message.success('修改成功');
                    this.cancel(true);
                })
            },
            cancel(refresh){
                this.$emit("closeDialog",refresh===true);
            },
        },
        components: {
        }
    }
</script>
