"use strict";

var mongoose = require('mongoose');

var Project = mongoose.model('Project', {
  projectName: {
    type: String,
    required: true
  },
  categoryName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  github: {
    type: String
  },
  photo: {
    type: String
  },
  userId: {
    type: String,
    required: true
  }
});
module.exports = Project;