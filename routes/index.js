module.exports = function(app, book, memberInfo, rentInfo) {
  
  var alert = require('alert');

  //main.ejs 를 / 로 가져온다.
  // / 말고 다른 이름으로 해줘도 된다.
  app.get('/', function (req, res) {
    res.render('login.ejs'); //main 만 적어도 됨.
  });
  // req : submit 으로 받아오는 모든 값들
  // res : 뭔가 액션을 하려고할 때 쓴다.
  
  // submit 으로 받아오는 모든 데이터를 어떻게 처리할지 여기다가 다 적어준다.
  // /api/books 라는 이름으로 보여준다.
  app.post('/api/books', function (req, res) {
    res.render('');
  });

  app.post('/loginCheck', function (req, res) {
  //err: 에러, result: 결과값
  
    memberInfo.find({ id: req.body.userId, password: req.body.userPw }, function(err, result) {
      if(err) {
        return res.status(500).json({error: err});
      } else if(result.length === 0) {
        //result 의 개수값을 length를 말한다. 그니까 전체의 개수를 말함.
        //입력한 값의 길이가 아니라
        alert("다시 입력해주세요.");
      } else {
        res.render('main');
      }
    });

  });
  
  app.post('/signup', function (req, res) {
    res.render('signUp');
  });
 

  app.post('/signupCheck', function (req, res) {

    memberInfo.find({ id: req.body.userId }, function(err, result){
      if(result.length === 0) {
        var newMemberInfo = new memberInfo();
        newMemberInfo.name = req.body.userName;
        newMemberInfo.id = req.body.userId;
        newMemberInfo.password = req.body.userPw;
        newMemberInfo.phone = req.body.userPhone;
        newMemberInfo.email = req.body.userEmail;
        
        newMemberInfo.save(function(err) {
          if(err) {
            console.error(err);
            // res.json({ result: 0 }); //에러가 있으면 0
            return;
          }
          // res.json({ result: 1 });
          res.redirect('/');
        });
        
      } else {
        alert("이미 가입된 id 입니다. 다시 입력해주세요.");
        // console.log( "value " + req.body.userId, result.length )
      }
    });
  });

  app.get('/memberinfo', function (req, res) {
    memberInfo.find(function(err, result) {
      res.render("memberinfo",{memberinfo:result});
    })
  })

  app.get('/enrollbook', function (req, res) {
    res.render("enrollbook")
  })


  app.get('/enrollbookCheck', function (req, res) {
    var books = new book();
    
    if(req.params.id = "enrollBtn")
    {
      books.title = req.query.bookname;
      books.author = req.query.authorname;
        
      books.save(function(err) {
        if(err) {
          console.error(err);
          // res.json({ result: 0 }); //에러가 있으면 0
          return;
        }
        // res.json({ result: 1 });
        alert("책 등록 완료!");
      });
    } 

  })

  app.get('/showbook', function (req, res) {
    book.find(function(err, result) {
      res.render("bookitem",{booklist:result})
    })

  })

  app.get('/main', function (req, res) {
    res.render("main");

  })

  app.get('/search', function (req, res) {

    var opt = req.query.searchopt;
    
    if(opt === "book_name")
    {
      book.find({ title: req.query.keyword }, function(err, result) {
        if(err) {
          return res.status(500).json({error: err});
        } else if(result.length === 0) {
          //result 의 개수값을 length를 말한다. 그니까 전체의 개수를 말함.
          //입력한 값의 길이가 아니라
          alert("책이 없어요");
        } else {  
            res.render("bookitem",{booklist:result})    
        }
      });
    }
    else
    {
      book.find({ author: req.query.keyword }, function(err, result) {
        if(err) {
          return res.status(500).json({error: err});
        } else if(result.length === 0) {
          //result 의 개수값을 length를 말한다. 그니까 전체의 개수를 말함.
          //입력한 값의 길이가 아니라
          alert("책이 없어요");
        } else {  
            res.render("bookitem",{booklist:result})    
        }
      });
    }

  })


  app.get('/delete', function (req, res) {
    res.render("delete");
  })


  app.get('/deletelist', function (req, res) {

    var opt = req.query.deleteopt;
    
    if(opt === "user_name")
    {
      memberInfo.deleteMany({ name: req.query.keyword }, function(err) {
        if(err) {
          console.log(err);
          return res.status(500).json({error: err});
        } 
        else
        {
            memberInfo.find(function(err, result) {
            res.render("memberinfo",{memberinfo:result});
          })
        }
        
      });
    }
    else
    {
      memberInfo.deleteMany({ id: req.query.keyword }, function(err) {
        if(err) {
          console.log(err);
          return res.status(500).json({error: err});
        }
        else
        {
            memberInfo.find(function(err, result) {
            res.render("memberinfo",{memberinfo:result});
          })
        }

      });
    }

  })

};





