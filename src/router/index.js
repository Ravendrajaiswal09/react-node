
import express from 'express';
import Ninja from '../models/ninja'

const router = express.Router();

router.get('/ninjas', function(req, res, next){
/*     Ninja.find({}).then(function(ninja){
        res.send(ninja);
    }) */
 console.log(parseFloat(req.query.lng), parseFloat(req.query.lat))
    Ninja.aggregate([
        {
            $geoNear: {
                near: {
                    type: 'Point',
                    coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]
                },
                distanceField: "dist.calculated",
                maxDistance: 100000,
                spherical: true
            }
        }
    ]).then(function(ninjas){
        res.send(ninjas);
    }).catch(next);
});

router.post('/ninjas', function(req, res, next){
    Ninja.create(req.body).then(function(ninja){
        res.send(ninja);
    }).catch(next)
})
router.put('/ninjas/:id', function(req, res, next){
    Ninja.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
        Ninja.findOne({_id: req.params.id}).then(function(ninja){
        res.send(ninja)
        })
    })
})
router.delete('/ninjas/:id', function(req, res, next){
    Ninja.findByIdAndRemove({_id: req.params.id}).then(function(ninja){
        res.send(ninja)
    })
})


module.exports = router;