const express = require("express");
const router = express.Router();
const Forms = require("../models/forms");
const axios = require("axios");

const clientID = "675b21a693ede89510cb";
const clientSecret = "b12e80c332a5cf3a2b53d6b5c3db23f8b1767e5d";

// for getting the
router.get("/home:code", (req, res) => {
  // The req.query object has the query params that were sent to this route.
  const requestToken = req.query.code;
  //pass the code to githab
  axios({
    method: "post",
    url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
    // for JSON
    headers: {
      accept: "application/json"
    }
  }).then(response => {
    //get the token
    const accessToken = response.data.access_token;
    console.log(accessToken);
    // redirect the user to the home page, along with the access token
    res.redirect(`/home.html?access_token=${accessToken}`);
    //use the accessToken
  });
});

//get a list of forms from the db
router.get("/forms", function(req, res, next) {
  Forms.find({}).then(function(forms) {
    res.send(forms);
  });
});

//get {name,fields, submissions} of the form by form-id
router.get("/forms/:id", function(req, res, next) {
  Forms.findById({ _id: req.params.id }).then(function(form) {
    res.send({
      formName: form.formName,
      fields: form.fields,
      submissions: form.submissions
    });
  });
});

//add a new form to the db
router.post("/forms", function(req, res, next) {
  console.log(req);
  Forms.create(req.body)
    .then(function(form) {
      res.send(form);
    })
    .catch(next);
});

//update a form in the db
//example: req.body = { submissions: new-submissions} -- here update just the submissions of the form
router.put("/forms/:id", function(req, res, next) {
  Forms.findByIdAndUpdate({ _id: req.params.id }, req.body)
    .then(function() {
      Forms.findOne({ _id: req.params.id }).then(function(form) {
        res.send(form);
      });
    })
    .catch(next);
});

//delete a form from the db
router.delete("/forms/:id", function(req, res, next) {
  Forms.findByIdAndDelete({ _id: req.params.id }).then(function(form) {
    res.send(form);
  });
});

module.exports = router;
