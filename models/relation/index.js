/**
 * Created by tqj <2482366539@qq.com> on 2018/1/22.
 */
module.exports=(
    {
        supervisorDetail,
        supervisor,
        member,
        user,
        recordType
    }
)=>{
    supervisorDetail.belongsTo(user,{foreignKey: "operator"});
    supervisorDetail.belongsTo(member,{foreignKey: "memberId"});
    supervisorDetail.belongsTo(supervisor,{foreignKey: "supervisorId"});
    supervisorDetail.belongsToMany(recordType,{through: "supervisor_detail_types"});
    recordType.belongsToMany(supervisorDetail,{through: "supervisor_detail_types"});
    //user.hasMany(supervisorDetail)
}