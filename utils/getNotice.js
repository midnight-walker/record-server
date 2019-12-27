/**
 * Created by tqj <2482366539@qq.com> on 2019/12/23.
 */
module.exports=(tpl,supervisor)=>{
    console.log(JSON.stringify(supervisor));
    let time=supervisor.startTime.split('-')
    tpl=tpl.replace(/\$\{year\}/g,time[0]);
    tpl=tpl.replace(/\$\{month\}/g,time[1]);
    tpl=tpl.replace(/\$\{day\}/g,time[2]);
    tpl=tpl.replace(/\$\{region\}/g,supervisor.region);
    tpl=tpl.replace(/\$\{station\}/g,supervisor.station);
    tpl=tpl.replace(/\$\{village\}/g,supervisor.village);
    tpl=tpl.replace(/\$\{group\}/g,supervisor.group);
    tpl=tpl.replace(/\$\{smallClass\}/g,supervisor.smallClass);
    tpl=tpl.replace(/\$\{workGroup\}/g,supervisor.work_group.name);
    tpl=tpl.replace(/\$\{member\}/g,supervisor.member.name);
    tpl=tpl.replace(/\$\{phone\}/g,supervisor.member.phone);
    tpl=tpl.replace(/\$\{score\}/g,100-supervisor.workQuality);
    tpl=tpl.replace(/\$\{qualified\}/g,supervisor.workQuality<90?"不":"");
    let questionList=""
    supervisor.supervisor_simple_details.forEach((item,index)=>{
        questionList+=`<p>${index+1}.${item.recordTypeName} 扣${item.score}分</p>`;
    });
    tpl=tpl.replace(/\$\{questionList\}/g,questionList);
    return tpl;
}