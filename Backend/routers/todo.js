const { Router } = require('express');
const todoRouter = Router()
const User = require('../models/user')
const Project = require('../models/Project')
const bcrypt = require('bcrypt')
const saltRounds = 10;
const formidable = require('formidable');
const detect = require('detect-file-type');
const { v4: uuidv4 } = require("uuid");
const path = require('path');
var mv = require('mv');
const utils = require('../utils/utils')


///////////////////////////////////////////////////////////////////////
todoRouter.get('/profilesetting', async (req, res, next) => {
  try {
    if (req.userId) {
      const user = await User.findById(req.userId)
      const obj = {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        photo: user.photo,
        projectsId: user.projectsId,
        facebook: user.facebook,
        github: user.github,
        linkedIn: user.linkedIn,
        admin:user.admin
      }
      res.status(200).json({ status: 'success', user: obj });
      return
    }
    // request doesnot have user id (token not correct)
    res.status(401).json({ status: 'User not authorized' });
    return

  } catch (error) {
    res.status(500).json({ status: 'User not authorized' })
    return

  }

})
///////////////////////////////////////////////////////////////////////////
todoRouter.put('/uploadUserPhoto', async (req, res, next) => {
  try {
    if (req.userId) {
      const user = await User.findById(req.userId)
      const obj = {
        _id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        photo: user.photo,
        projectsId: user.projectsId,
        facebook: user.facebook,
        github: user.github,
        linkedIn: user.linkedIn,
        
      };
      var form = new formidable.IncomingForm();
      form.parse(req, function (err, fields, files) {
        if (err) {
          res.status(400).json({ status: 'error while uploading photo', error: err })
          return;
        } else {
          detect.fromFile(files.file.path, (err, result) => {
            const photoName = uuidv4() + "." + result.ext
            const allowedImageTypes = ["jpg", "jpeg", "png"]
            if (!allowedImageTypes.includes(result.ext)) {
              res.status(400).json({ status: 'Image not allowed' })
              return
            }
            const olldPath = files.file.path
            const newPath = path.join(__dirname, "..", "..", "Frontend", "public", 'uploadedPhotos', photoName)
            mv(olldPath, newPath, async (err) => {
              if (err) {
                res.status(400).json({ status: 'error while uploading photo', error: err })
                return;
              } else {
                obj.photo = photoName;
                const updatedUser = await new User(obj)
                await User.update({ _id: updatedUser._id }, updatedUser)
                res.status(200).json({ status: 'successeful update photo', user: updatedUser });
                return
              }
            })
          })
        }
      });
      return
    } else {
      res.status(401).json({ status: 'User not authorized' });
      return
    }
  }
  catch (error) {
    res.status(500).json({ status: 'Failed to update user data' })
    return
  }
})



////////////////////////////////////////////////////////////////////////////

todoRouter.put('/update', async (req, res, next) => {
  try {
    if (req.userId) {
      const user = await User.findById(req.userId)
      const { body } = req;
      const obj = {
        _id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        photo: user.photo,
        projectsId: user.projectsId,
        facebook: user.facebook,
        github: user.github,
        linkedIn: user.linkedIn,
       
      };
      if (body.newPassword && body.password) {
        const match = await bcrypt.compare(body.password, user.password)
        if (match) {
          const salt = await bcrypt.genSalt(saltRounds)
          const newHashedPassword = await bcrypt.hash(body.newPassword, salt)
          obj.password = newHashedPassword
        } else {
          res.status(400).json({ status: 'the old password is not correct' });
          return;
        }
      }
      obj.firstname = body.firstname;
      obj.lastname = body.lastname;
      obj.facebook = body.facebook;
      obj.github = body.github;
      obj.linkedIn = body.linkedIn;
      obj.email = body.email;
      const updatedUser = await new User(obj)
      await User.update({ _id: updatedUser._id }, updatedUser)
      res.status(200).json({ status: 'successeful update', updatedUser });
      return
    }
    res.status(401).json({ status: 'User not authorized' });
    return
  } catch (error) {
    res.status(500).json({ status: 'Failed to update user data' })
    return
  }

})
///////////
todoRouter.post('/deleteProject', async (req, res, next) => {
  try {
    if (req.userId) {
      console.log(req.body)
      const projectId = req.body.projectId
      await Project.findOneAndDelete({ _id: projectId });
      const user = await User.findById(req.userId);
      user.projectsId.forEach(function (id, index) {
        if (id == projectId ) {
          user.projectsId.splice(index, 1);
        }
      });
      await User.update({ _id: user._id }, user)
      res.status(200).json({ status: 'done' ,user:user});
      return
    }
    res.status(401).json({ status: 'User not authorized' });
    return;

  } catch (err) {
    res.status(400).json({ status: ' failed to delete project', error: err });
    return
  }
});

////////////////////


/////////////////////////////
todoRouter.post('/addProject', async (req, res, next) => {
  try {
    if (req.userId) {
      var form = new formidable.IncomingForm();
      form.parse(req, async function (err, fields, files) {
        const project = fields;
        console.log(project.intakeNumber)
        if (err) {
          res.status(400).json({ status: 'error while saving project', error: err })
          return;
        } else if (files.file) {
          const callback = async (photoName) => {
            project.photo = photoName;
            project.userId = req.userId;
            const user = await utils.saveProject(project, req.userId);
            res.status(200).json({ status: 'successeful update', user: user });
            return;
          }
          utils.uploadPhoto(files.file, callback, res);
        } else { // no file
          project.userId = req.userId;
          const user = await utils.saveProject(project, req.userId);
          res.status(200).json({ status: 'successeful update', user: user });
          return;
        }
      });
    } else {
      res.status(401).json({ status: 'User not authorized' });
      return
    }
  }
  catch (error) {
    res.status(500).json({ status: 'add project to user failed ', error: err })
    return
  }
})



module.exports = todoRouter