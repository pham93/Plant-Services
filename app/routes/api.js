var configs = require('../../config');
var Plants  = require('../models/plantSchema')

// All api routes go here!
module.exports = function(app, express){
    var apiRouter = express.Router();
    apiRouter.get('/', function(req, res){
        res.json({message:'API PAGE'}); 
    });
    apiRouter.route('/plants')
        .post(function(req, res){
            var newPlant = new Plants();
            newPlant.name     = req.body.name;
            newPlant.type     = req.body.type;
            newPlant.eatable = req.body.eatable;
            newPlant.body    = req.body.body;
            newPlant.save(function(err){
                if(err){
                    if(err.code == 11000)
                        return res.json({success: false, message:'Duplicate error!'});
                    else
                        return res.send(err);
                }
                res.json({message: 'Plant is created'});
            });
        })
        .get(function(req, res){
            Plants.find(function(err, plants){
                if(err) res.send(err);
                res.json(plants);
            });
        });
    return apiRouter;
}
