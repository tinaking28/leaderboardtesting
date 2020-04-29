const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://cking09:cookiecat@cluster0-ugo96.mongodb.net/test?retryWrites=true&w=majority";

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true })); 

app.post('/example', (req, res) => {
	if(req.body.filter == "ticker" ){
		  // res.send(`Chosen type is:${req.body.info}.`);
		MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
		    if(err) { console.log("Connection err: " + err); return; }
		  
		    var dbo = db.db("leaders");
			var coll = dbo.collection('leaders');
			var newData = {"name": req.body.theName, 
						  "score": req.body.possible_scores[req.body.round -2]};
			coll.insertOne(newData, function(err, res) {
			    if (err) { 
			    	console.log ("Error: " + err); return; 
				}
		    	console.log("new document inserted");
			});
			// coll.findOne({"ticker":req.body.info}, function (err, result){
			// if (err) throw err;
		 //    res.send(result);
		 //    db.close();
			// });

		});  //end connect
	}else{
		MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
		    if(err) { console.log("Connection err: " + err); return; }
		  
		    var dbo = db.db("companies");
			var coll = dbo.collection('companies');
			
			coll.findOne({"name":req.body.info}, function (err, result){
			if (err) throw err;
		    res.send(result);
		    db.close();
			});

		});

	}
});

const port = 8080;

app.listen(port, () => {
  console.log(`Server running on port${port}`);
});

