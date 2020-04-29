const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://cking09:cookiecat@cluster0-ugo96.mongodb.net/test?retryWrites=true&w=majority";
var http = require('http');
var fs = require('fs');
var dataArray = [];
var jsonInfo = [];
function main() {
  	MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db){
		if(err) { 
			console.log ("Error: " + err); return; 
		}
  
	    var dbo = db.db("companies");
		var collection = dbo.collection('companies');
		

		fs.readFile('companies.csv', 'utf8', function(err, data) {
			dataArray = data.split('\r\n');
			for(var i=1; i < dataArray.length - 1; i++){
				var thisCompany = dataArray[i].split(',');
				var newData = {"name": thisCompany[0], "ticker": thisCompany[1]};
				// console.log(newData);
				jsonInfo.push(newData);

			}
			
			collection.insertMany(jsonInfo, function(err, res) {
			    if (err) { 
			    	console.log ("Error: " + err); return; 
				}
		    	console.log("new document inserted");
			});
			
			console.log("Success!");
			// db.close();
		
			
		});

	 
	});
}

main();