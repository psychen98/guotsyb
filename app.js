var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fileUpload = require('express-fileupload');
var fs = require('fs');

var db = require('./db');


var indexRouter = require('./routes/index');


var app = express();

//视图引擎设置
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//路由
app.use('/', indexRouter);

//文件上传
app.use(fileUpload());

app.post('/upload', function (req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }


  var sampleFile = req.files.sampleFile;
  // console.log(typeof (sampleFile));
  // console.log(sampleFile, sampleFile.length);
  if (!sampleFile.length) {
    var uploadPath = __dirname + '\\public\\uploads\\';
    if (!fs.existsSync(uploadPath.toString())) {
      fs.mkdirSync(uploadPath);
    }
    uploadPath = uploadPath + sampleFile.name;
    sampleFile.mv(uploadPath, function (err) {
      if (err)
        return res.status(500).send(err);
      var url = 'uploads' + '/' + sampleFile.name;
      db.get('files').push({
        filename: sampleFile.name.substring(0, sampleFile.name.indexOf('.')),
        url: url,
        lv1: req.body.lv1,
        lv2: req.body.lv2,
        lv3: req.body.lv3,
        size: sampleFile.size,
        date: new Date().toLocaleDateString(),
        id: -new Date()
      }).write();
      res.send('<h1>上传成功</h1>');
    });
  } else {


    for (let i = 0; i < sampleFile.length; i++) {
      var uploadPath = __dirname + '\\public\\uploads\\';

      if (!fs.existsSync(uploadPath.toString())) {
        fs.mkdirSync(uploadPath);
      }
      uploadPath = uploadPath + sampleFile[i].name;

      sampleFile[i].mv(uploadPath, function (err) {
        if (err)
          return res.status(500).send(err);
        var url = 'uploads' + '/' + sampleFile[i].name;
        db.get('files').push({
          filename: sampleFile[i].name.substring(0, sampleFile[i].name.indexOf('.')),
          url: url,
          lv1: req.body.lv1,
          lv2: req.body.lv2,
          lv3: req.body.lv3,
          size: sampleFile[i].size,
          date: new Date().toLocaleDateString(),
          id: -new Date()
        }).write();
      });
      if (i == (sampleFile.length - 1)) { res.send('上传成功'); }
    }
  }


});

// 错误处理
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
