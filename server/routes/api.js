const express = require("express");
const router = express.Router();
const Forms = require("../models/forms");

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
