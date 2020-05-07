
// var lv1s = new Object();
// lv1s['网站首页'] = new Array('重要消息', '通知通报', '国铁快讯', '党政文化', '生产保障', '精益管理', '工艺质量管理', '营销项目管理');
// lv1s['管理标准'] = new Array('管理制度', '管理流程', '模板下载');
// lv1s['人力资源'] = new Array('上级文件', '业务流程', '员工培训', '表格下载');
// lv1s['财务管理'] = new Array('全面预算', '成本管理', '资产管理');
// lv1s['科研管理'] = new Array('实施规则', '认证报告', '认证证书', '产品标识代码');
// lv1s['市场区域管理'] = new Array('区域动态', '市场信息');
// lv1s['设施安全'] = new Array('工作简报', '整改通知', '安全教育');
// lv1s['会议纪要'] = new Array('经营管理', '营销项目管理', '市场区域管理', '工艺质量', '生产保障', '技术开发服务');

// var lv2s = new Object();
// lv2s['管理制度'] = new Array('1','2');
// lv2s['生产保障'] = new Array('业务书','生产计划','采购计划','完工统计');  
// lv2s['精益管理'] = new Array('计划推进','经验交流','持续改善');
// lv2s['工艺质量管理'] = new Array('信息简报','体系建设','工艺改进','整改通知');
// lv2s['营销项目管理'] = new Array('营销计划','项目计划','服务维保','项目管理');      
var lv1s, lv2s;
window.onload = function () {
    var xhr = '';
    if (window.XMLHttpRequest) {
        xhr = new window.XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHttp');
    }
    xhr.open('GET', '/getconfig', false);
    xhr.send(null);

    var aaa = strToJson(xhr.responseText);

    lv1s = aaa.lv1s;
    lv2s = aaa.lv2s;

}

function set_lv2(lv1, lv2, lv3) {
    var lv1v, lv2v;
    var i, ii;

    lv1v = lv1.value;
    lv2v = lv2.value;

    lv2.length = 1;
    lv3.length = 1;

    if (lv1v == '0') return;
    if (typeof (lv1s[lv1v]) == 'undefined') return;

    for (i = 0; i < lv1s[lv1v].length; i++) {
        ii = i + 1;
        lv2.options[ii] = new Option();
        lv2.options[ii].text = lv1s[lv1v][i];
        lv2.options[ii].value = lv1s[lv1v][i];
    }


}
function set_lv3(lv2, lv3) {
    var lv2v, lv3v;
    var i, ii;

    lv2v = lv2.value;
    lv3v = lv3.value;

    lv3.length = 1;

    if (lv2v == '0') return;
    if (typeof (lv2s[lv2v]) == 'undefined') return;

    for (i = 0; i < lv2s[lv2v].length; i++) {

        ii = i + 1;
        lv3.options[ii] = new Option();
        lv3.options[ii].text = lv2s[lv2v][i];
        lv3.options[ii].value = lv2s[lv2v][i];
    }

}

function check() {
    var lv1 = document.getElementById('lv1'),
        lv2 = document.getElementById('lv2');

    if (lv1.value == 0 | lv2.value == 0) {
        alert('请选择一二级菜单');
        return false;
    }
}

function search(arr, dst) {
    var i = arr.length;
    while (i -= 1) {
        if (arr[i] == dst) {
            return i;
        }
    }
    return false;
}

function strToJson(str){
    var json = eval('('+str+')');
    return json;
}