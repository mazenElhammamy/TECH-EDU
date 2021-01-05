"use strict";

var _require = require('express'),
    Router = _require.Router;

var userRouter = Router();

var User = require('../models/user');

var bcrypt = require('bcrypt');

var saltRounds = 10;

var _require2 = require('../helpers/token'),
    generate = _require2.generate;

var Project = require('../models/Project');

userRouter.post('/register', function _callee(req, res, next) {
  var body, salt, hashedPassword, user;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          body = req.body;
          _context.next = 4;
          return regeneratorRuntime.awrap(bcrypt.genSalt(saltRounds));

        case 4:
          salt = _context.sent;
          _context.next = 7;
          return regeneratorRuntime.awrap(bcrypt.hash(body.password, salt));

        case 7:
          hashedPassword = _context.sent;
          body.password = hashedPassword;
          user = new User(body);
          _context.next = 12;
          return regeneratorRuntime.awrap(user.save());

        case 12:
          res.status(201).json({
            status: "successful registeration"
          });
          return _context.abrupt("return");

        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](0);
          res.status(400).json({
            status: "registeration failed chech your inputs",
            error: _context.t0
          });
          return _context.abrupt("return");

        case 20:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 16]]);
}); ///////////////////////////////////////////////////////////////////////////

userRouter.post('/login', function _callee2(req, res, next) {
  var body, user, match, token, respose;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          body = req.body;
          _context2.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            email: body.email
          }));

        case 4:
          user = _context2.sent;

          if (!user) {
            _context2.next = 22;
            break;
          }

          _context2.next = 8;
          return regeneratorRuntime.awrap(bcrypt.compare(body.password, user.password));

        case 8:
          match = _context2.sent;

          if (!match) {
            _context2.next = 18;
            break;
          }

          _context2.next = 12;
          return regeneratorRuntime.awrap(generate(user._id));

        case 12:
          token = _context2.sent;
          respose = {
            user: user,
            token: token,
            status: 'loggedIn'
          };
          res.status(200).json(respose);
          return _context2.abrupt("return");

        case 18:
          // password not match
          res.status(400).json({
            status: 'password is incorrect'
          });
          return _context2.abrupt("return");

        case 20:
          _context2.next = 24;
          break;

        case 22:
          // email not match
          res.status(400).json({
            status: 'The email address or password is incorrect '
          });
          return _context2.abrupt("return");

        case 24:
          _context2.next = 30;
          break;

        case 26:
          _context2.prev = 26;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json({
            status: 'error, try again'
          });
          return _context2.abrupt("return");

        case 30:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 26]]);
}); //////////////////////////////////////////////////////////////////////

userRouter.post('/getUserProjects', function _callee3(req, res, next) {
  var email, user, projects;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          email = req.body.email;
          _context3.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 4:
          user = _context3.sent;
          _context3.next = 7;
          return regeneratorRuntime.awrap(Project.find({
            _id: {
              $in: user.projectsId
            }
          }));

        case 7:
          projects = _context3.sent;
          console.log("projects", projects);
          res.status(200).json({
            status: "done",
            projects: projects
          });
          return _context3.abrupt("return");

        case 13:
          _context3.prev = 13;
          _context3.t0 = _context3["catch"](0);
          res.status(400).json({
            status: "failed to get projects",
            error: _context3.t0
          });
          return _context3.abrupt("return");

        case 17:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 13]]);
}); ////////////////////////////////////////////////////////////////////////

userRouter.post('/projectDetails', function _callee4(req, res, next) {
  var projectDetails;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(Project.findOne({
            projectName: req.body.projectName
          }));

        case 3:
          projectDetails = _context4.sent;
          res.status(200).json({
            status: 'done',
            projectDetails: projectDetails
          });
          _context4.next = 10;
          break;

        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          res.status(400).json({
            status: ' failed to get projects',
            error: _context4.t0
          });

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); /////////////////////////////////////////////////////////////////////////

userRouter.post('/projectsByCategory', function _callee5(req, res, next) {
  var projectsByCategory;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(Project.find({
            categoryName: req.body.categoryName
          }));

        case 3:
          projectsByCategory = _context5.sent;
          res.status(200).json({
            status: 'done',
            projectsByCategory: projectsByCategory
          });
          _context5.next = 10;
          break;

        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](0);
          res.status(400).json({
            status: ' failed to get projects',
            error: _context5.t0
          });

        case 10:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); //////////////////////////////////////////////////////////////////

userRouter.post('/getProjectOwnerProfile', function _callee6(req, res, next) {
  var obj, user;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          console.log("ay 7aga");
          _context6.next = 4;
          return regeneratorRuntime.awrap(User.findById(req.body.userId));

        case 4:
          obj = _context6.sent;
          user = {
            email: obj.email,
            firstname: obj.firstname,
            lastname: obj.lastname,
            photo: obj.photo,
            github: obj.github,
            facebook: obj.facebook,
            linkedIn: obj.linkedIn
          };
          console.log(user);
          res.status(200).json({
            status: 'done',
            user: user
          });
          _context6.next = 13;
          break;

        case 10:
          _context6.prev = 10;
          _context6.t0 = _context6["catch"](0);
          res.status(400).json({
            status: ' failed to get project owner',
            error: _context6.t0
          });

        case 13:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 10]]);
}); ////////////////////////////
//////////////////////////////////////////////////////////////////////////

userRouter.post('/deleteProject'), function _callee7(req, res, next) {
  var body;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          try {
            body = req.body.body;
            console.log("dooooooooooooon");
            res.status(200).json({
              status: 'done'
            });
          } catch (err) {
            console.log(err);
            res.status(400).json({
              status: ' failed to get projects',
              error: err
            });
          }

        case 1:
        case "end":
          return _context7.stop();
      }
    }
  });
};
module.exports = userRouter;