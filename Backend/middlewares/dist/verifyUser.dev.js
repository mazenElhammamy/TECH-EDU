"use strict";

var token = require('../helpers/token');

var verifyUser = function verifyUser(req, res, next) {
  var authorization, payload;
  return regeneratorRuntime.async(function verifyUser$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          authorization = req.headers.authorization;

          if (!authorization) {
            _context.next = 15;
            break;
          }

          _context.prev = 2;
          _context.next = 5;
          return regeneratorRuntime.awrap(token.verify(authorization));

        case 5:
          payload = _context.sent;
          // payload ={userId, time}
          req.userId = payload.userId; // token is correct and add userId to request

          next();
          return _context.abrupt("return");

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](2);
          // if token not correct
          next();
          return _context.abrupt("return");

        case 15:
          next(new Error('not verified'));

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 11]]);
};

module.exports = verifyUser;