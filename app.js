var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.locals.pretty = true;
app.set('view engine', 'jade');
app.set('views', './views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/template', function(req, res){
	res.render('temp', {time : Date(), _title : 'Jade'} );
});

app.get('/', function(req, res){
	res.send("hello world");
});




app.get('/form', function(req, res){
	res.render("form");
});

app.get('/form_receiver', function(req, res){
	var title = req.query.title;
	var discription = req.query.discription;
	res.send(title + ',' + discription);
});


app.post('/form_receiver', function(req, res){
	var title = req.body.title;
	var discription = req.body.discription;
	res.send(title + ',' + discription);
});

app.get('/topic', function(req, res){
	var topics = [
		'Javascript is....',
		'Nodejs is....',
		'Express is....',
	];
	var output = `
	<a href="/topic?id=0">Javascript</a><br>
	<a href="/topic?id=1">nodejs</a><br>
	<a href="/topic?id=2">Express</a><br>
	<div>${topics[req.params.id]}</div>
	`
	res.send(output);
});

app.get('/dynamic', function(req, res){
	var lis = '';
	for(var i=0; i< 5; i++){
		lis = lis + '<li>coding</li>';
	}
	var time = Date();
	var output = `
	<!DOCTYPE html>
		<html lang="en">
			<head>
				<meta charset="UTF-8">
				<title>	</title>
			</head>
			<body>
				Hello Dynamic!
				<ul>
				${lis}
				</ul>
				${time}
			</body>
		</html>`;
	res.send(output);
});

app.get('/route', function(req, res){
	res.send("hello route, <img src='/gnb.png'>");
});

app.get('/login', function(req, res){
	res.send("login plz");
});

app.get('/form', function(req, res){
	res.send("form plz");
});

app.listen(3000, function(){
	console.log("Conneted 3000 port!");
});