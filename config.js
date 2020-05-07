const navList = ['网站首页', '管理标准', '人力资源', '财务管理', '科研管理', '市场区域管理', '设施安全', '会议纪要'];


var lv1s = new Object();
lv1s['网站首页'] = new Array('重要消息', '通知通报', '国铁快讯', '党政文化', '生产保障', '精益管理', '工艺质量管理', '营销项目管理');
lv1s['管理标准'] = new Array('管理制度', '管理流程', '模板下载');
lv1s['人力资源'] = new Array('上级文件', '业务流程', '员工培训', '表格下载');
lv1s['财务管理'] = new Array('全面预算', '成本管理', '资产管理');
lv1s['科研管理'] = new Array('实施规则', '认证报告', '认证证书', '产品标识代码');
lv1s['市场区域管理'] = new Array('区域动态', '市场信息');
lv1s['设施安全'] = new Array('工作简报', '整改通知', '安全教育');
lv1s['会议纪要'] = new Array('经营管理', '营销项目管理', '市场区域管理', '工艺质量', '生产保障', '技术开发服务');

var lv2s = new Object();
lv2s['管理制度'] = new Array('管理1','管理2','管理3');
lv2s['生产保障'] = new Array('业务书','生产计划','采购计划','完工统计');  
lv2s['精益管理'] = new Array('计划推进','经验交流','持续改善');
lv2s['工艺质量管理'] = new Array('信息简报','体系建设','工艺改进','整改通知');
lv2s['营销项目管理'] = new Array('营销计划','项目计划','服务维保','项目管理');   


var List = new Array();
for(var i=0;i<navList.length;i++){
    List[i] = new Array();
    List[i] = lv1s[navList[i]];
}


module.exports = {
    navList: navList,
    List: List,
    lv1s:lv1s,
    lv2s:lv2s
};
