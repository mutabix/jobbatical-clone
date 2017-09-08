'use strict';


require('dotenv').config();


const Job = require('../models/jobModel'),
    User = require('../models/userModel'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;



module.exports = {
    showHome: showHome,

    showExplore: showExplore,

    showSignUp: showSignUp,

    showLogin: showLogin,

    showJobForm: showJobForm,
    
    addNewJob: addNewJob

}


/**
 * display the home page 
 */
function showHome(req, res) {
    Job.find( {} ).sort( {_id: -1} ).limit(6).exec( (err, featuredJobs) => {
        if (err){
            console.error(err);
        } else if(!featuredJobs){
            res.send('error! Unable to connect to database');
        } else {
            // if usern
            let user = req.user ? req.user.local.firstName : '';
            res.render('pages/home', { 
                featuredJobs: featuredJobs,
                user: user
            });
        }
    });
}



function showExplore(req, res){
    Job.find((err, jobs) => {
        if (err) {
        console.error(err);
        } else {
            res.json(jobs);
        }
    });
}


function showSignUp(req, res){
    let user = '';
    
    res.render('pages/signup', { 
        message: req.flash('signupMessage'),
        user: user 
    });
}


function showLogin(req, res){
    let user = '';

    res.render('pages/login', { 
        message: req.flash('loginMessage'),
        user: user
    });   
}


function showJobForm(req, res){
    res.render('pages/job-form', {
        user: req.user.local.firstName 
    });
}



function addNewJob(req, res){
    let job = new Job(req.body);
    job.save(err => {
        if (err) console.error(err);
        else { 
            res.render('pages/job-success', {
                user: req.user.local.firstName
            });
        }
    });
}