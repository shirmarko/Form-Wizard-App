const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InputSchma = new Schema({
  fieldName: {
    type: String,
    required: [true, "name of the field is required"]
  },
  fieldInput: {
    type: Object,
    required: [true, "name of the field is required"]
  }
});

//create one submission schema & model
const submissionSchema = new Schema({
  userInputs: [InputSchma]
});

//create one field schema & model
const FieldSchema = new Schema({
  fieldName: {
    type: String,
    required: [true, "name of the field is required"]
  },
  fieldType: {
    type: String,
    required: [true, "type of the field is required"]
  },
  fieldLabel: {
    type: String,
    required: [true, "label of the field is required"]
  }
});

//create forms schema & model
const FormsSchema = new Schema({
  formName: {
    type: String,
    required: [true, "Name field is required"]
  },
  fields: [FieldSchema],
  submissions: [submissionSchema]
});

const Form = mongoose.model("form", FormsSchema);
module.exports = Form;
