/**
 * Represents the resource for the Auto Policy
 */
var MongoClient = require('mongodb').MongoClient;

module.exports = {
	url :"PROVIDE MONGOLAB URL",
	policy : null,
	initialize : function(){
		return new PolicyMaster();
	},
	
	allCustomer : function(callback){
		
		MongoClient.connect(this.url, function(err, db) {
  			if(err == null){
  				console.log("Connected correctly to server.");
  				var collection = db.collection('policymaster');
  				collection.find().toArray(function(e,results){
  					//console.log("Fetched all="+JSON.stringify(results));
  					callback(results);
  				});
  				
  			} else {
  				callback('{"error":"error"}');
  			}
		});
	},
	
	customer : function(id, callback){
		MongoClient.connect(this.url, function(err, db) {
  			if(err == null){
  				console.log("Connected correctly to server.");
  				var collection = db.collection('policymaster');
  				// console.log("id")
  				// console.log(id)
  				collection.find({'customer_id':id}).toArray(function(e,results){
  					console.log("Fetched cusomer="+JSON.stringify(results));
  					
  					callback(results[0]);
  				});
  				
  			} else {
  				callback('{"error":"error"}');
  			}
		});
	}
};