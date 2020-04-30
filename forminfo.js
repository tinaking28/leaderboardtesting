const MongoClient = require('mongodb').MongoClient;
const urlm = "mongodb+srv://cking09:cookiecat@cluster0-ugo96.mongodb.net/test?retryWrites=true&w=majority";

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const qs = require('querystring');
const url = require('url');
const cors = require('cors');

app.use(express.static('public')); 
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors()); 

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
					  "score": qobj.score};
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

port = process.env.PORT || 80 
app.listen(port, () => {
  console.log(`Server running on port${port}`);
});

