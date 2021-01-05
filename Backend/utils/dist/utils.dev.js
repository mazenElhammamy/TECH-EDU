"use strict";

var User = require('../models/user');

var Project = require('../models/Project');

var detect = require('detect-file-type');

var _require = require("uuid"),
    uuidv4 = _require.v4;

var path = require('path');

var mv = require('mv');

function saveProject(project, userId) {
  var newProject, user;
  return regeneratorRuntime.async(function saveProject$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          newProject = new Project(project);
          _context.next = 3;
          return regeneratorRuntime.awrap(newProject.save());

        case 3:
          _context.next = 5;
          return regeneratorRuntime.awrap(User.findByIdAndUpdate({
            _id: userId
          }, {
            $push: {
              projectsId: newProject._id
            }
          }, {
            "new": true,
            useFindAndModify: false
          }));

        case 5:
          user = _context.sent;
          return _context.abrupt("return", user);

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
}

function uploadPhoto(file, callback, res) {
  return regeneratorRuntime.async(function uploadPhoto$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          detect.fromFile(file.path, function (err, result) {
            var photoName = uuidv4() + "." + result.ext;
            var allowedImageTypes = ["jpg", "jpeg", "png"];

            if (!allowedImageTypes.includes(result.ext)) {
              res.status(400).json({
                status: 'Image not allowed'
              });
              return;
            }

            var oldPath = file.path;
            var newPath = path.join(__dirname, "..", "..", "Frontend", "public", 'uploadedPhotos', photoName);
            mv(oldPath, newPath, function (err) {
              if (err) {
                res.status(400).json({
                  status: 'error while uploading photo',
                  error: err
                });
                return;
              } else {
                callback(photoName);
                return;
              }
            });
          });

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
}

module.exports = {
  saveProject: saveProject,
  uploadPhoto: uploadPhoto
};