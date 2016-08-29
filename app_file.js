var express = require('express');
var fs = require('fs');
var multer = require('multer');
var _storage = multer.diskStorage({
  destination: function (req, file, cb) {
  	// if(파일의 형식이 이미지면 )
    cb(null, 'uploads/');
    // else if(파일의 형식이 텍스트면)
    // 처럼 multer의 diskStorage 조건을 컨트롤 할 수 있다. 
  },
  filename: function (req, file, cb) {
  	// if(만약 이미 파일이 존재한다면 )
    cb(null, file.originalname);
    // else if(만약 없다면 )
  }
});

var upload = multer({ storage: _storage });
var bodyParser = require('body-parser');


var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/user', express.static('uploads'));
app.locals.pretty = true;
app.set('views', './views_file');
app.set('view engine', 'jade');

app.get('/upload', function(req, res){
	res.render('upload');
});

app.post('/upload',upload.single('userfile'), function(req, res){
	console.log(req.file);
	res.send('Uploaded : ' + req.file.filename);
});


app.get('/topic/new', function(req, res){
	fs.readdir('data', function(err, files){
		if(err){
			console.log(err);
			res.status(500).send("Internal Server Error");
		}
		res.render('new', {topics:files});
	});
});

app.get(['/topic', '/topic/:id'] , function(req, res){
	fs.readdir('data', function(err, files){
		if(err){
			console.log(err);
			res.status(500).send("Internal Server Error");
		}
		var id = req.params.id;
		if(id){ // id값이 있을때 
			fs.readFile('data/'+id, 'utf8', function(err, data){
				if(err){
					console.log(err);
					res.status(500).send("Internal Server Error");
				}
				res.render('view', {title:id, topics:files, description:data});
			});
		}else{	// id값이 있을때 
			res.render('view', {topics:files, title:"welcome", description:"hello JavaScript"});
		}
	});
});





app.post('/topic', function(req, res){
	var title = req.body.title;
	var description = req.body.description;
	fs.writeFile('./data/'+title, description, function(err){
		if(err){
			console.log(err);
			res.status(500).send("Internal Server Error");
		}
		// res.send("hello")
		res.redirect('/topic/'+title);
	});
});

app.listen(3000, function(){
	console.log('Connected, 3000 port!!');
});

