const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://cking09:cookiecat@cluster0-ugo96.mongodb.net/test?retryWrites=true&w=majority";
var http = require('http');
var fs = require('fs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
var dataArray = [];
var jsonInfo = [];

app.use(express.static('public')); 
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors()); 

app.get('/', (req, res) => {

	MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db){
		if(err) { 
			console.log ("Error: " + err); return; 
		}

	    var dbo = db.db("leaders");
		var collection = dbo.collection('leaders');
		console.log("before find");
		collection.find({},{"_id":false}).sort({score : -1}).limit(4).toArray(function(err, result){
		// collection.find({}).toArray(function(err, result){

		// collection.findOne({"name":"alex"}, function(err, result){
			if(err) { 
				console.log ("Error: " + err); return; 
			}
			console.log("leaders json: " + JSON.stringify(result[1]));

			res.json(result);

		});
		// const object = {"name":"tina"}
		// console.log("leaders json: " + leadersJSON);
		// res.send(JSON.json(leadersJSON));
	});
});

port = process.env.PORT || 80 
app.listen(port, () => {
  console.log(`Server running on port${port}`);
});


