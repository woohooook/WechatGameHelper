const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

var app = express();
var mongodbUrl = 'mongodb://localhost:27017';

app.use(bodyParser.json());

app.use(bodyParser.urlencoded());

app.post('/', function(req, res){				
	console.log('-----------------------------------------------------------');
	console.log('[问题]：' + req.body.data.quiz);
	// console.log(req.body);
	MongoClient.connect(mongodbUrl, function(e, db){
		if(e)
			console.error(e);
		var tnwz = db.db('tnwz');
		var quizzes = tnwz.collection('quizzes');
		quizzes.find({'quiz':req.body.data.quiz}).toArray((e, data) => {
			if(e)
				console.error(e);
			if(data[0].options){
				// console.log(data);
				console.log('[答案]：' + data[0].options[data[0].answer - 1]);
			}
			else{
				console.log('没有找到答案！');
			}
		});
	});
	res.send('Success!');
	res.end();
});

app.listen(3000);

console.log('Listening at port 3000... ... ');
