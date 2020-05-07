var express = require('express');
var router = express.Router();
var config = require('../config');
var db = require('../db');


var navList = config.navList;
var list = config.List;
var lv1s = config.lv1s;
var lv2s = config.lv2s;

router.get('/', function (req, res, next) {
  var indexlist = new Array();
  var lv3s = new Array();
  var lv3List = new Array();
  for (var i = 0; i < list[0].length; i++) {
    indexlist[i] = db.get('files').filter({ lv1: '网站首页', lv2: list[0][i] }).sortBy('id').value();

    lv3s[i] = lv2s[list[0][i]];
    lv3List[i] = new Array();
    if (lv3s[i] != undefined) {

      for (var p = 0; p < lv3s[i].length; p++) {
        lv3List[i][p] = new Array();
        for (var q = 0; q < indexlist[i].length; q++) {

          if (indexlist[i][q].lv3 == lv3s[i][p]) {

            lv3List[i][p].push(indexlist[i][q]);
          }
        }
      }
    }
  }

  res.render('index', { navList, list, indexlist ,lv3s,lv3List});
});

router.get('/list', function (req, res, next) {
  var lv1 = req.query.lv1;
  var lv2 = req.query.lv2;

  // lv3List是有三级菜单时的文件列表
  var lv3List = new Array();
  var fileList = db.get('files').filter({ lv1: navList[lv1], lv2: list[lv1][lv2] }).sortBy('id').value();

  var lv3s = lv2s[list[lv1][lv2]];

  if(lv1>=2){
    lv3s = undefined;
  }

  //存在三级菜单
  if (lv3s != undefined ) {
    var i, j;
    for (i = 0; i < lv3s.length; i++) {
      lv3List[i] = new Array();
      for (j = 0; j < fileList.length; j++) {

        if (fileList[j].lv3 == lv3s[i]) {

          lv3List[i].push(fileList[j]);
        }
      }
    }
  }
  res.render('list', { lv1, lv2, lv3s, navList, list, fileList, lv3List });
})

router.get('/admin', function (req, res, next) {
  res.render('admin', { navList });
});

router.get('/getconfig', function (req, res, next) {
  res.send({
    lv1s: lv1s,
    lv2s: lv2s
  });
});

module.exports = router;

function mkdirsSync(dirname) {
  if (fs.existsSync(dirname)) {
    return true;
  } else {
    if (mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname);
      return true;
    }
  }
}
