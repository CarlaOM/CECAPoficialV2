var express = require('express');
var mongoose = require('mongoose');
var body_parser = require('body-parser');
var jwt = require('jsonwebtoken');
var db = require('../models/db');
var router = express.Router();

router
   .get('/', function (req, res) {
      db.cajaUsuario.find({}, function (err, cajaUsuario) {
         if (err) return res.status(400).send(err);

         return res.status(200).send(cajaUsuario);
      });
   })

  
//    .post('/', function (req, res) {
//     var cartera = new db.cajaUsuario(req.body);
//     var d = new Date();
//     // if ((event.date_start == undefined || event.date_start < d) ||event.description == '' || event.total == '' || event.program == '') return res.status(400).send();
//     db.cajaUsuario.find({}, function (err, persons) {
//        if (err) return res.status(400).send(err);
//        saveCartera(cartera);
//     });
//     function saveCartera(cartera) {
      
//        event.save(function (err, event) {
//           if (err) return res.status(400).send(err);

//           return res.status(201).send(event);
//        });
//     }



.get('/persons/:_id', function (req, res) {
    
    
    db.cajaUsuario.findOne({_id: req.params._id},function(err,cartera){
        if(err)return res.status().send(err);
        if(cartera==null)return res.status(404).send();
        // console.log(cartera);
       getPersonas(cartera);
       
        
    }

    );

    function getPersonas(cartera){
        // let carteraObj=moongose.Types.ObjectId(cartera);
        db.persons.find({cajaUsuario:cartera},function(err,persons){
            if(err)return res.status(400).send(err);
            // console.log(persons);
            if (persons == null) return res.status(404).send();
            
           return res.status(200).send(persons);
        });
    }
    
 })
.get('/otro/:id', function (req, res) {
    db.cajaUsuario.findOne({user: req.params.id},function(err,cartera){
        if(err)return res.status().send(err);
        if(cartera==null)return res.status(404).send();
      //   console.log('hola desde get cartera user');
      //   console.log(cartera); 
       // getPersonas(cartera);
       return res.status(200).send(cartera);
    });

   
 })
 .get('/:id', function (req, res) {
    db.cajaUsuario.findOne({ _id: req.params.id }, function (err, cartera) {
       if (err) return res.status(400).send(err);
       if (cartera == null) return res.status(404).send();

       return res.status(200).send(cartera);
    });
 })

//  .post('/register', function (req, res, next) {
//     var role_id;
//     db.roles.findOne({ name: 'Admin' }, function (err, role) {
//        if (err) return res.status(400).send(err);
//        if (role == null) return res.sendStatus(404);
//        role_id = role._id;
//        validating();
//     })
//     function validating() {
//        db.users.findOne({ _id: req.body._id, rol: role_id }, function (err, user) {
//           if (err) return console.log(err);
//           if (user == null) return res.sendStatus(404);
//           console.log(user);
//           next();
          
          
//        });
//     }
//  })

.put('/:id', function (req, res) {
    db.cajaUsuario.findOne({ _id: req.params.id }, function (err, cartera) {
       if (err) return res.status(400).send(err);
       if (cartera == null) return res.status(404).send();

       for (i in req.body) {
          cartera[i] = req.body[i];
         //  console.log(cartera[i]);  
       }
       cartera.save(function (err, cartera) {
          if (err) return res.status(400).send(err);

          return res.status(200).send(cartera);
       });
    });
 })
 .post('/register', function (req, res) {
    var cartera=new db.cajaUsuario(req.body);
   //  console.log(cartera);
    if(cartera.name=='')return res.status(400)
    cartera.save(function(err,cartera){

        if(err) return console.log(err);

        res.status(200).send(cartera);
    })
  
 });

 
 





//function PUT
//  .put('/:id', function (req, res) {
//     console.log(req.body);
//     db.cajaUsuario.find({user: req.params.id},function(err,cartera){
//         if(err)return res.status().send(err);
//         if(cartera==null)return res.status(404).send();
//         console.log(cartera);
//        // getPersonas(cartera);
//     });
// });
module.exports = router;
