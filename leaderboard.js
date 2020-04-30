const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://cking09:cookiecat@cluster0-ugo96.mongodb.net/test?retryWrites=true&w=majority";
var http = require('http');
var fs = require('fs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

var dataArray = [];
var jsonInfo = [];

app.use(express.static('public')); 
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/leaderboard', (req, res) => {

	MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db){
		if(err) { 
			console.log ("Error: " + err); return; 
		}

	    var dbo = db.db("leaders");
		var collection = dbo.collection('leaders');
		var leadersJSON = collection.find({},{"_id":false}).sort({score : -1}).limit(4);
		const object = {"name":"tina"}
		console.log(leadersJSON);
		res.json(object);
	});
});

const port = 8080;

app.listen(port, () => {
  console.log(`Server running on port${port}`);
});


