<template>
    <el-dialog :title="operatorType == 'add' ? '新增林场': '编辑林场'" :visible.sync="dialogVisible" :before-close="cancel">
        <el-form :model="form" ref="form" :rules="rules" label-width="120px">
            <el-form-item label="所属区县" prop="regionId">
                <el-select v-model="form.regionId"  placeholder="请选择所属区县">
                    <el-option
                            v-for="region in regionList"
                            :key="region.id"
                            :label="region.name"
                            :value="region.id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="所属林场" prop="regionId">
                <el-select v-model="form.regionId"  placeholder="请选择所属林场">
                    <el-option
                            v-for="station in stationList"
                            :key="station.id"
                            :label="station.name"
                            :value="station.id"
                    ></el-option>
                </el-select>
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

            <el-form-item label="placeName" prop="小地名">
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

            <el-form-item label="时间" prop="time">
                <el-input v-model="form.time"></el-input>
            </el-form-item>

            <el-form-item label="施工作业单位名称" prop="workGroup">
                <el-input v-model="form.workGroup"></el-input>
            </el-form-item>

            <el-form-item label="伐除对象-显眼枯死松树" prop="fcXianyan">
                <el-input v-model="form.fcXianyan"></el-input>
            </el-form-item>

            <el-form-item label="伐除对象-细小枯死松树" prop="fcXixiao">
                <el-input v-model="form.fcXixiao"></el-input>
            </el-form-item>

            <el-form-item label="伐除对象-高度5厘米以上的树桩" prop="fcGaodudayuwu">
                <el-input v-model="form.fcGaodudayuwu"></el-input>
            </el-form-item>

            <el-form-item label="伐除对象-藤蔓或活树连着枯死树" prop="fcChanzhe">
                <el-input v-model="form.fcChanzhe"></el-input>
            </el-form-item>

            <el-form-item label="伐除对象-藤蔓覆盖的枯死松树" prop="fcFugai">
                <el-input v-model="form.fcFugai"></el-input>
            </el-form-item>

            <el-form-item label="伐除对象-风折风倒的枯死松树" prop="fcFengzhe">
                <el-input v-model="form.fcFengzhe"></el-input>
            </el-form-item>

            <el-form-item label="伐除对象-火烧、雷击枯死松树" prop="fcHuoshao">
                <el-input v-model="form.fcHuoshao"></el-input>
            </el-form-item>

            <el-form-item label="伐除对象-悬崖边枯死松树" prop="fcXuanya">
                <el-input v-model="form.fcXuanya"></el-input>
            </el-form-item>

            <el-form-item label="伐除对象-悬挂或地面的松树梢头" prop="fcXuangua">
                <el-input v-model="form.fcXuangua"></el-input>
            </el-form-item>

            <el-form-item label="伐除对象-活松树上枯死树枝" prop="fcHuoshukuzhi">
                <el-input v-model="form.fcHuoshukuzhi"></el-input>
            </el-form-item>

            <el-form-item label="伐除对象-伐除小计" prop="fcTotal">
                <el-input v-model="form.fcTotal"></el-input>
            </el-form-item>

            <el-form-item label="集材对象-风折风倒的枯死松树" prop="jcFcFengzhe">
                <el-input v-model="form.jcFcFengzhe"></el-input>
            </el-form-item>

            <el-form-item label="集材对象-松树" prop="jcFcSongshu">
                <el-input v-model="form.jcFcSongshu"></el-input>
            </el-form-item>

            <el-form-item label="集材对象-松木段" prop="jcFcSongmu">
                <el-input v-model="form.jcFcSongmu"></el-input>
            </el-form-item>

            <el-form-item label="集材对象-地上粗1厘米以上松枝" prop="jcFcSongzhi">
                <el-input v-model="form.jcFcSongzhi"></el-input>
            </el-form-item>

            <el-form-item label="集材对象-松树梢头" prop="jcFcShaotou">
                <el-input v-model="form.jcFcShaotou"></el-input>
            </el-form-item>

            <el-form-item label="集材对象-伐除小计" prop="jcFcTotal">
                <el-input v-model="form.jcFcTotal"></el-input>
            </el-form-item>

            <el-form-item label="集材对象-用草覆盖" prop="jcYcCaogai">
                <el-input v-model="form.jcYcCaogai"></el-input>
            </el-form-item>

            <el-form-item label="集材对象-用枯枝落叶覆盖" prop="jcYcKuye">
                <el-input v-model="form.jcYcKuye"></el-input>
            </el-form-item>

            <el-form-item label="集材对象-用土壤覆盖" prop="jcYcTurang">
                <el-input v-model="form.jcYcTurang"></el-input>
            </el-form-item>

            <el-form-item label="集材对象-用藤蔓覆盖的松材" prop="jcYcTengman">
                <el-input v-model="form.jcYcTengman"></el-input>
            </el-form-item>

            <el-form-item label="集材对象-隐藏于地沟" prop="jcYcDigou">
                <el-input v-model="form.jcYcDigou"></el-input>
            </el-form-item>

            <el-form-item label="集材对象-洞穴中的松材" prop="jcYcDongxue">
                <el-input v-model="form.jcYcDongxue"></el-input>
            </el-form-item>

            <el-form-item label="集材对象-隐藏小计" prop="jcYcTotal">
                <el-input v-model="form.jcYcTotal"></el-input>
            </el-form-item>

            <el-form-item label="焚烧对象-未完全炭化的松枝" prop="fsSongzhi">
                <el-input v-model="form.fsSongzhi"></el-input>
            </el-form-item>

            <el-form-item label="焚烧对象-未完全炭化的松木" prop="fsSongmu">
                <el-input v-model="form.fsSongmu"></el-input>
            </el-form-item>

            <el-form-item label="焚烧对象-未点火的松材堆" prop="fsSongcai">
                <el-input v-model="form.fsSongcai"></el-input>
            </el-form-item>

            <el-form-item label="伐桩高度5厘米以下" prop="fzFazhuang">
                <el-input v-model="form.fzFazhuang"></el-input>
            </el-form-item>

            <el-form-item label="伐桩剥皮" prop="fzBopi">
                <el-input v-model="form.fzBopi"></el-input>
            </el-form-item>

            <el-form-item label="在横断面上砍“+字”口" prop="fzJiahao">
                <el-input v-model="form.fzJiahao"></el-input>
            </el-form-item>

            <el-form-item label="投药" prop="fzTouyao">
                <el-input v-model="form.fzTouyao"></el-input>
            </el-form-item>

            <el-form-item label="覆盖塑料布" prop="fzShuliao">
                <el-input v-model="form.fsSongcai"></el-input>
            </el-form-item>

            <el-form-item label="覆盖泥土厚度2厘以上" prop="fzNitu">
                <el-input v-model="form.fzNitu"></el-input>
            </el-form-item>

            <el-form-item label="伐桩小计" prop="fzTotal">
                <el-input v-model="form.fzTotal"></el-input>
            </el-form-item>

            <el-form-item label="伐桩个数" prop="fzNumber">
                <el-input v-model="form.fzNumber"></el-input>
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
        props: ['dialogVisible','operatorType','form','regionList'],
        data() {
            return {
                rules: {
                    regionId:  [{ required: true, message: '请选择所属区县', trigger: 'change' }],
                    name:  [{ required: true, message: '请输入林场名', trigger: 'blur' }]
                }
            }
        },
        methods: {
            save(){
                console.log(this.regionList);
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
                    url: '/api/station',
                    data: this.form
                }).then(res => {
                    this.$message.success('新增成功');
                    this.cancel(true);
                })
            },
            requestUpdate(id){
                this.$ajax({
                    method: 'PATCH',
                    url: '/api/station/'+id,
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
