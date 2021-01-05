"use strict";

var _require = require('express'),
    Router = _require.Router;

var todoRouter = Router();

var User = require('../models/user');

var Project = require('../models/Project');

var bcrypt = require('bcrypt');

var saltRounds = 10;

var formidable = require('formidable');

var detect = require('detect-file-type');

var _require2 = require("uuid"),
    uuidv4 = _require2.v4;

var path = require('path');

var _require3 = require('path'),
    dirname = _require3.dirname;

var mv = require('mv');

var utils = require('../utils/utils'); ///////////////////////////////////////////////////////////////////////


todoRouter.get('/profilesetting', function _callee(req, res, next) {
  var user, obj;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;

          if (!req.userId) {
            _context.next = 8;
            break;
          }

          _context.next = 4;
          return regeneratorRuntime.awrap(User.findById(req.userId));

        case 4:
          user = _context.sent;
          obj = {
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            photo: user.photo,
            projectsId: user.projectsId,
            facebook: user.facebook,
            github: user.github,
            linkedIn: user.linkedIn
          };
          res.status(200).json({
            status: 'success',
            user: obj
          });
          return _context.abrupt("return");

        case 8:
          // request doesnot have user id (token not correct)
          res.status(401).json({
            status: 'User not authorized'
          });
          return _context.abrupt("return");

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            status: 'User not authorized'
          });
          return _context.abrupt("return");

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 12]]);
}); ///////////////////////////////////////////////////////////////////////////

todoRouter.put('/uploadUserPhoto', function _callee3(req, res, next) {
  var user, obj, form;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;

          if (!req.userId) {
            _context3.next = 11;
            break;
          }

          _context3.next = 4;
          return regeneratorRuntime.awrap(User.findById(req.userId));

        case 4:
          user = _context3.sent;
          obj = {
            _id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            photo: user.photo,
            projectsId: user.projectsId,
            facebook: user.facebook,
            github: user.github,
            linkedIn: user.linkedIn,
            password: user.password
          };
          form = new formidable.IncomingForm();
          form.parse(req, function (err, fields, files) {
            if (err) {
              res.status(400).json({
                status: 'error while uploading photo',
                error: err
              });
              return;
            } else {
              detect.fromFile(files.file.path, function (err, result) {
                var photoName = uuidv4() + "." + result.ext;
                var allowedImageTypes = ["jpg", "jpeg", "png"];

                if (!allowedImageTypes.includes(result.ext)) {
                  res.status(400).json({
                    status: 'Image not allowed'
                  });
                  return;
                }

                var olldPath = files.file.path;
                var newPath = path.join(__dirname, "..", "..", "Frontend", "public", 'uploadedPhotos', photoName);
                mv(olldPath, newPath, function _callee2(err) {
                  var updatedUser;
                  return regeneratorRuntime.async(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          if (!err) {
                            _context2.next = 5;
                            break;
                          }

                          res.status(400).json({
                            status: 'error while uploading photo',
                            error: err
                          });
                          return _context2.abrupt("return");

                        case 5:
                          obj.photo = photoName;
                          _context2.next = 8;
                          return regeneratorRuntime.awrap(new User(obj));

                        case 8:
                          updatedUser = _context2.sent;
                          _context2.next = 11;
                          return regeneratorRuntime.awrap(User.update({
                            _id: updatedUser._id
                          }, updatedUser));

                        case 11:
                          res.status(200).json({
                            status: 'successeful update photo',
                            user: updatedUser
                          });
                          return _context2.abrupt("return");

                        case 13:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  });
                });
              });
            }
          });
          return _context3.abrupt("return");

        case 11:
          res.status(401).json({
            status: 'User not authorized'
          });
          return _context3.abrupt("return");

        case 13:
          _context3.next = 19;
          break;

        case 15:
          _context3.prev = 15;
          _context3.t0 = _context3["catch"](0);
          res.status(500).json({
            status: 'Failed to update user data'
          });
          return _context3.abrupt("return");

        case 19:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 15]]);
}); ////////////////////////////////////////////////////////////////////////////

todoRouter.put('/update', function _callee4(req, res, next) {
  var user, body, obj, match, salt, newHashedPassword, updatedUser;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;

          if (!req.userId) {
            _context4.next = 36;
            break;
          }

          _context4.next = 4;
          return regeneratorRuntime.awrap(User.findById(req.userId));

        case 4:
          user = _context4.sent;
          body = req.body;
          obj = {
            _id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            photo: user.photo,
            projectsId: user.projectsId,
            facebook: user.facebook,
            github: user.github,
            linkedIn: user.linkedIn,
            password: user.password
          };

          if (!(body.newPassword && body.password)) {
            _context4.next = 23;
            break;
          }

          _context4.next = 10;
          return regeneratorRuntime.awrap(bcrypt.compare(body.password, user.password));

        case 10:
          match = _context4.sent;

          if (!match) {
            _context4.next = 21;
            break;
          }

          _context4.next = 14;
          return regeneratorRuntime.awrap(bcrypt.genSalt(saltRounds));

        case 14:
          salt = _context4.sent;
          _context4.next = 17;
          return regeneratorRuntime.awrap(bcrypt.hash(body.newPassword, salt));

        case 17:
          newHashedPassword = _context4.sent;
          obj.password = newHashedPassword;
          _context4.next = 23;
          break;

        case 21:
          res.status(400).json({
            status: 'the old password is not correct'
          });
          return _context4.abrupt("return");

        case 23:
          obj.firstname = body.firstname;
          obj.lastname = body.lastname;
          obj.facebook = body.facebook;
          obj.github = body.github;
          obj.linkedIn = body.linkedIn;
          obj.email = body.email;
          _context4.next = 31;
          return regeneratorRuntime.awrap(new User(obj));

        case 31:
          updatedUser = _context4.sent;
          _context4.next = 34;
          return regeneratorRuntime.awrap(User.update({
            _id: updatedUser._id
          }, updatedUser));

        case 34:
          res.status(200).json({
            status: 'successeful update',
            updatedUser: updatedUser
          });
          return _context4.abrupt("return");

        case 36:
          // request doesnot have user id (token not correct)
          res.status(401).json({
            status: 'User not authorized'
          });
          return _context4.abrupt("return");

        case 40:
          _context4.prev = 40;
          _context4.t0 = _context4["catch"](0);
          res.status(500).json({
            status: 'Failed to update user data'
          });
          return _context4.abrupt("return");

        case 44:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 40]]);
}); ///////////

todoRouter.post('/deleteProject', function _callee5(req, res, next) {
  var projectId, user;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          console.log("ay 7agazzzzzzzzz");

          if (!req.userId) {
            _context5.next = 17;
            break;
          }

          console.log(req.body);
          projectId = req.body.projectId;
          _context5.next = 7;
          return regeneratorRuntime.awrap(Project.findOneAndDelete({
            _id: projectId
          }));

        case 7:
          _context5.next = 9;
          return regeneratorRuntime.awrap(User.findById(req.userId));

        case 9:
          user = _context5.sent;
          console.log("before", user);
          user.projectsId.forEach(function (id, index) {
            if (id == projectId) {
              user.projectsId.splice(index, 1);
            }
          });
          console.log("after", user);
          _context5.next = 15;
          return regeneratorRuntime.awrap(User.update({
            _id: user._id
          }, user));

        case 15:
          res.status(200).json({
            status: 'done',
            user: user
          });
          return _context5.abrupt("return");

        case 17:
          res.status(401).json({
            status: 'User not authorized'
          });
          return _context5.abrupt("return");

        case 21:
          _context5.prev = 21;
          _context5.t0 = _context5["catch"](0);
          console.log(_context5.t0);
          res.status(400).json({
            status: ' failed to delete project',
            error: _context5.t0
          });
          return _context5.abrupt("return");

        case 26:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 21]]);
}); ////////////////////
// todoRouter.delete('/deleteProject'), async(req, res, next) => {
//   console.log("deleteeeeeeeeeeee")
//   try {
//     if (req.userId) {
//       // const {body} = req.body;
//       // await Project.findOneAndDelete({_id:body.projectId});
//       // const user = await User.findById(req.userId);
//       // console.log("before",user)
//       // user.projectsId.forEach(function(projectId, index){
//       //   if(projectId == body.projectId){
//       //     user.projectsId.splice(index,1);
//       //   }
//       // });
//       // console.log("after",user)
//       // await User.update({ _id: user._id }, user)
//        res.status(200).json({ status: 'successeful delete'});
//        return;
//     }
//     res.status(401).json({ status: 'User not authorized' });
//     return;
//   }catch (error) {
//     res.status(500).json({ status: 'delete project to user failed ', error: err })
//     return
//   }
// }
/////////////////////////////

todoRouter.post('/addProject', function _callee7(req, res, next) {
  var form;
  return regeneratorRuntime.async(function _callee7$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;

          if (!req.userId) {
            _context8.next = 6;
            break;
          }

          form = new formidable.IncomingForm();
          form.parse(req, function _callee6(err, fields, files) {
            var project, callback, user;
            return regeneratorRuntime.async(function _callee6$(_context7) {
              while (1) {
                switch (_context7.prev = _context7.next) {
                  case 0:
                    project = fields;

                    if (!err) {
                      _context7.next = 6;
                      break;
                    }

                    res.status(400).json({
                      status: 'error while saving project',
                      error: err
                    });
                    return _context7.abrupt("return");

                  case 6:
                    if (!files.file) {
                      _context7.next = 11;
                      break;
                    }

                    callback = function callback(photoName) {
                      var user;
                      return regeneratorRuntime.async(function callback$(_context6) {
                        while (1) {
                          switch (_context6.prev = _context6.next) {
                            case 0:
                              project.photo = photoName;
                              project.userId = req.userId;
                              _context6.next = 4;
                              return regeneratorRuntime.awrap(utils.saveProject(project, req.userId));

                            case 4:
                              user = _context6.sent;
                              res.status(200).json({
                                status: 'successeful update',
                                user: user
                              });
                              return _context6.abrupt("return");

                            case 7:
                            case "end":
                              return _context6.stop();
                          }
                        }
                      });
                    };

                    utils.uploadPhoto(files.file, callback, res);
                    _context7.next = 18;
                    break;

                  case 11:
                    // no file
                    project.userId = req.userId;
                    _context7.next = 14;
                    return regeneratorRuntime.awrap(utils.saveProject(project, req.userId));

                  case 14:
                    user = _context7.sent;
                    console.log("userrrrrrrrrrrrr", user);
                    res.status(200).json({
                      status: 'successeful update',
                      user: user
                    });
                    return _context7.abrupt("return");

                  case 18:
                  case "end":
                    return _context7.stop();
                }
              }
            });
          });
          _context8.next = 8;
          break;

        case 6:
          res.status(401).json({
            status: 'User not authorized'
          });
          return _context8.abrupt("return");

        case 8:
          _context8.next = 14;
          break;

        case 10:
          _context8.prev = 10;
          _context8.t0 = _context8["catch"](0);
          res.status(500).json({
            status: 'add project to user failed ',
            error: err
          });
          return _context8.abrupt("return");

        case 14:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 10]]);
});
module.exports = todoRouter;