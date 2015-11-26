var mongoose = require('mongoose');

var Schema = mongoose.Schema;


//Create a plant schema
var plantSchema = new Schema({
       name: {type:String, required:true, index:{unique:true}},
       type: {type:String, required:true},
    eatable: {type:String, required:true},
       body: {type:String, required:true}
});
module.exports = mongoose.model('Plants', plantSchema);
