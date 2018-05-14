var express = require('express');
var mongoose = require('mongoose');
var body_parser = require('body-parser');
var jwt = require('jsonwebtoken');
var db = require('../models/db');
var router = express.Router();

router
    .get('/', function (req, res) {
        /////lista todas las cajas activas//////
        db.cashFlowOffices.find({active:true}, function (err, cajas) {
        if (err) return res.status(400).send(err);

        })
    })
    .get('/allActive', function (req, res) {
        /////lista todas las cajas activas//////
        db.cashFlowOffices.find({active:true}, function (err, cajas) {
        if (err) return res.status(400).send(err);
            return res.status(200).send(cajas);
        })
    })


    .get('/current/:id',function(req,res){
        db.users.findOne({_id:req.params.id},function(err,user){
            // if(err)return res.status(400).send(err);
            console.log(user);
            db.cashFlowOffices.findOne({offices:user.offices,active:true,state:-1},function(err,cajaSucursal){

                if(err)return res.status(400).send(err);
                return res.status(200).send(cajaSucursal);
            })
        })
    })

    .post('/addDetail',function(req,res){

        let cashOffice=req.body;

        console.log(cashOffice);
        let detailSucursal={
            cashFlowUsers:cashOffice.cashFlowUser,
            dateCloseCash:cashOffice.dateCloseCash,

        };
        var cashOfficeUser=cashOffice.userOfCash;

        db.users.findOne({_id:cashOfficeUser},function(err,user){
            console.log(user);
            var returnedUser=user;
            db.cashFlowOffices.findOne({active:true,offices:returnedUser.offices},function(err,cashFlowOffice){
                console.log(cashFlowOffice);
                db.cashFlowUsers.findOne({_id:cashOffice.cashFlowUser},function(err,cashUser){


                    cashFlowOffice.amount+=cashUser.amount_delivered;
                    console.log(cashFlowOffice);
                    cashFlowOffice.details.push(detailSucursal),function(err,detail){
                        console.log('11111111');
                        if(err)return res.status(401).send(err)
                    }
                    console.log('222222');

                    cashFlowOffice.save(function(err,cajaSuc){
                        console.log('33333');

                        if(err)return res.status(400).send(err);

                        console.log('444444');

                        res.status(200).send(cajaSuc);
                    })
                })
                

            })
        })
    })
    .get('/close/:id',function(req,res){
        db.cashFlowOffices.findOne({_id:req.params.id},function(err,cashOffice){

            if(err)return res.status(400).send(err);

            cashOffice.state=0;
            cashOffice.save(function(err,cash){
                if(err)return res.status(400).send(err);
                return res.status(200).send(cash);

            });

        })
    })
    .post('/new', function (req, res) {
        var office=req.body;
        // console.log(req.body);
        // console.log("asdfasdfadfhasgdfl")
        let cashOffice=new db.cashFlowOffices(req.body);
        cashOffice.users=office.user;
        cashOffice.date_start=new Date();
        db.users.findOne({_id:office.user},function(err,user){
            if(err)return res.status(400).send(err);
            console.log(user);
            cashOffice.offices=user.offices;
            console.log(cashOffice);

            cashOffice.state=-1;
            cashOffice.active=true;
            cashOffice.amount=0;
            cashOffice.amount_delivered=0;
            console.log(cashOffice)
            cashOffice.save(function(err,newCashOffice){
                if(err)return res.status(400).send(err);
                return res.status(200).send(newCashOffice);


        })

        });
        
        console.log(cashOffice);
       
      
     })
    


;



module.exports = router;
