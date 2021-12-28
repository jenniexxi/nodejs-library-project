var mongoose = require('mongoose');
var schema = mongoose.Schema; //Schema는 mongoose 안에 있는거 가져온거

//new : 새로운걸 정리한다고 새로운 Schema 정의
var bookSchema = new schema({
    title: String,
    author: String,
    enroll_date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('book', bookSchema);
//bookSchema 라는 것을 정의했잖아
//이거를 book 이라는 거에 넣겠다는 거지
//mongodb에 몽구즈를 활용행서 우리가 정의한 bookSchema를 book 이라는 거로 쓰겠다 이 모델에서
