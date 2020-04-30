const MongoClient = require('mongodb').MongoClient;
const urlm = "mongodb+srv://cking09:cookiecat@cluster0-ugo96.mongodb.net/test?retryWrites=true&w=majority";

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const qs = require('querystring');
const url = require('url');
const cors = require('cors');

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};

app.use(allowCrossDomain);
app.use(express.static('public')); 
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors()); 
// app.use(allowCrossDomain);
console.log("uses work");
app.post('/', (req, res) => {
	  // res.send(`Chosen type is:${req.body.info}.`);
	MongoClient.connect(urlm, { useUnifiedTopology: true }, function(err, db) {
	    if(err) { console.log("Connection err: " + err); return; }
	  
	    var dbo = db.db("leaders");
		var coll = dbo.collection('leaders');
		console.log(req.url);
		var qobj = url.parse(req.url, true).query;
		// var query = qs.parse(qobj);
  //   	console.log(JSON.stringify(query));
		var newData = {"name": qobj.name, 
					  "score": Number(qobj.score)};
		coll.insertOne(newData, function(err, res) {
		    if (err) { 
		    	console.log ("Error: " + err); return; 
			}
	    	console.log("new document inserted " + " " + qobj.name + " " + qobj.score);
		});
		// coll.findOne({"ticker":req.body.info}, function (err, result){
		// if (err) throw err;
	 //    res.send(result);
	 //    db.close();
		// });

	});  //end connect
	
});

app.get('/', (req, res) => {

	MongoClient.connect(urlm, { useUnifiedTopology: true }, function(err, db){
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
console.log("This is working");
// export default app;
port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server running on port${port}`);
});




