var express = require('express'); //express 기본 설정, express 는 내장 모듈
var app = express(); //express()는 위에서 이미 가져온거임
var mongoose = require('mongoose');
var bodyParser = require('body-parser');


var db = mongoose.connection; //mongoose랑 db연결
db.on('error', console.error);
db.once('open', function() {
    console.log('Connected to mongooed server');
});

mongoose.connect('mongodb://localhost/mongodb_tutorial');

var book = require('./models/book');
var memberInfo = require('./models/memberInfo');
var rentInfo = require('./models/rentInfo');

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
//view engine 를 ejs 방식으로 하겠다.
//app . 으로 나오는 모든 것들은 ejs 확장자로 인식하겠다는 설정

var router = require('./routes')(app, book, memberInfo, rentInfo);
//폴더이름만 쓸 경우 폴더명만 써도 ex) ('./routes') 만 써도 index.js 를 찾아온다
//app, book 을 가져오는 이유는 index.js 에서 가져가 쓰니까

var port = process.env.PORT || 8080;
var server = app.listen(port, function() {
    {
        console.log("Express server has started on port : " + port);
    }
});

