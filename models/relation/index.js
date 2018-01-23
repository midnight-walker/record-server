/**
 * Created by tqj <2482366539@qq.com> on 2018/1/22.
 */
module.exports=(
    {
        supervisorDetail,
        supervisor,
        user,
        recordType
    }
)=>{
    supervisorDetail.belongsTo(user,{foreignKey: "operator"});
    supervisorDetail.belongsTo(supervisor,{foreignKey: "supervisorId"});
    supervisorDetail.belongsTo(recordType,{foreignKey: "recordTypeId"});
    //user.hasMany(supervisorDetail)
}