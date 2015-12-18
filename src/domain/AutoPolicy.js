/**
 * Represents the resource for the Auto Policy
 */
var MongoClient = require('mongodb').MongoClient;

module.exports = {
	url : "PROVIDE THE MONGOLAB URL HERE",
	autopolicy : null,
	initialize : function(){
		return new PolicyMaster();
	},
	allPolicies : function(callback){
			MongoClient.connect(this.url, function(err, db) {
  			if(err == null){
  				console.log("Connected correctly to server.");
  				var collection = db.collection('autopolicy');
  				collection.find().toArray(function(e,results){
  					//console.log("Fetched all="+JSON.stringify(results));
  					
  					callback(results);
  				});  				
  			} else {
  				callback('{"error":"error"}');
  			}
		});
	},
	
	policy : function(id, callback){
			MongoClient.connect(this.url, function(err, db) {
  			if(err == null){
  				console.log("Connected correctly to server.");
  				var collection = db.collection('autopolicy');
  				collection.find({'customer_id':id}).toArray(function(e,results){
  					//console.log("Fetched all="+JSON.stringify(results));
  					if(results.length == 0) callback({});
  					else callback(results[0]);
  				});  				
  			} else {
  				callback('{"error":"error"}');
  			}
		});
	}
};