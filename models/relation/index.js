/**
 * Created by tqj <2482366539@qq.com> on 2018/1/22.
 */
module.exports=(
    {
        monitor,
        monitorDetail,
        monitorDetailDescription,
        monitorStep,
        supervisorDetail,
        supervisor,
        member,
        user,
        recordType
    }
)=>{
    monitorDetail.belongsTo(monitor,{foreignKey: "monitorId"});
    monitorDetail.belongsTo(member,{foreignKey: "memberId"});
    monitorDetail.hasMany(monitorDetailDescription,{foreignKey:'monitorDetailId', targetKey:'id'});
    monitorDetailDescription.belongsTo(monitorStep,{foreignKey: "monitorStepId"});
    monitorDetailDescription.belongsTo(monitorDetail,{foreignKey: "monitorDetailId"});
    supervisorDetail.belongsTo(user,{foreignKey: "operator"});
    supervisorDetail.belongsTo(member,{foreignKey: "memberId"});
    supervisorDetail.belongsTo(supervisor,{foreignKey: "supervisorId"});
    supervisorDetail.belongsToMany(recordType,{through: "supervisor_detail_types"});
    recordType.belongsToMany(supervisorDetail,{through: "supervisor_detail_types"});
    //user.hasMany(supervisorDetail)
}