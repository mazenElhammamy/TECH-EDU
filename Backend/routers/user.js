const { Router } = require('express')
const userRouter = Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const saltRounds = 10;
const { generate } = require('../helpers/token');
const Project = require('../models/Project');
const Intake = require('../models/intake')
const formidable = require('formidable');
const utils = require('../utils/utils')

userRouter.post('/register', async (req, res, next) => {
  try {
    const { body } = req;
    const salt = await bcrypt.genSalt(saltRounds)
    const hashedPassword = await bcrypt.hash(body.password, salt)
    body.password = hashedPassword;
    const user = new User(body);
    await user.save()
    res.status(201).json({ status: "successful registeration" })
    return
  } catch (err) {
    res.status(400).json({ status: "registeration failed chech your inputs", error: err })
    return
  }
})
///////////////////////////////////////////////////////////////////////////
userRouter.post('/login', async (req, res, next) => {
  try {
    const { body } = req;
    const user = await User.findOne({ email: body.email })
    if (user) {
      const match = await bcrypt.compare(body.password, user.password)
      if (match) {
        const token = await generate(user._id)
        const respose = {
          user,
          token,
          status: 'loggedIn'
        }
        res.status(200).json(respose)
        return
      } else { // password not match
        res.status(400).json({ status: 'password is incorrect' })
        return
      }
    } else { // email not match
      res.status(400).json({ status: 'The email address or password is incorrect ' })
      return
    }
  }
  catch (err) {
    res.status(500).json({ status: 'error, try again' })
    return
  }
})
//////////////////////////////////////////////////////////////////////
userRouter.post('/getUserProjects', async (req, res, next) => {
  try {
    const email = req.body.email
    const user = await User.findOne({ email: email })
    const projects = await Project.find({ _id: { $in: user.projectsId } })
    res.status(200).json({ status: "done", projects: projects })
    return

  } catch (err) {
    res.status(400).json({ status: "failed to get projects", error: err })
    return
  }
})
////////////////////////////////////////////////////////////////////////
userRouter.post('/projectDetails', async (req, res, next) => {
  try {
    const projectDetails = await Project.findOne({ projectName: req.body.projectName });
   
   
    console.log(projectDetails)
    res.status(200).json({ status: 'done', projectDetails: projectDetails });
  } catch (err) {
    res.status(400).json({ status: ' failed to get projects', error: err });
  }
});
/////////////////////////////////////////////////////////////////////////
userRouter.post('/projectsByTrack', async (req, res, next) => {
  try {
    console.log( req.body.trackName )
    const projectsByTrack = await Project.find( {trackName: req.body.trackName,intakeNumber: req.body.intakeNumber  });
    console.log("projectsByTrack", projectsByTrack)
    res.status(200).json({ status: 'done', projectsByTrack: projectsByTrack });
  } catch (err) {
    res.status(400).json({ status: ' failed to get projects', error: err });
  }
});
//////////////////////////////////////////////////////////////////
userRouter.post('/getProjectOwnerProfile', async (req, res, next) => {
  try {
    const obj = await User.findById(req.body.userId);
    const user = {
      email: obj.email,
      firstname: obj.firstname,
      lastname: obj.lastname,
      photo: obj.photo,
      github: obj.github,
      facebook: obj.facebook,
      linkedIn: obj.linkedIn,
    }
    res.status(200).json({ status: 'done', user: user });
  } catch (err) {
    res.status(400).json({ status: ' failed to get project owner', error: err });
  }
});

//////////////////////////////////////////////////////////////////////////

userRouter.put('/editProject', async (req, res, next) => {
  try {
    var form = new formidable.IncomingForm();
    form.parse(req, async function (err, fields, files) {
      const project = {
        _id: fields._id,
        projectName: fields.projectName,
        trackName:fields.trackName,
        intakeNumber:fields.intakeNumber,
        description: fields.description,
        github: fields.github,
        userId: fields.userId,
        photo: fields.photo,
      };
      if (err) {
        res.status(400).json({ status: 'error while uploading photo', error: err })
        return;
      } else if (files.file) {
        const callback = async (photoName) => {
          project.photo = photoName;
          const updatedProject = await new Project(project)
          await Project.updateOne({ _id: updatedProject._id }, updatedProject)
          res.status(200).json({ status: 'successeful update', project: updatedProject });
          return;
        }
        utils.uploadPhoto(files.file, callback, res);
      } else {
        const updatedProject = await new Project(project)
        await Project.updateOne({ _id: updatedProject._id }, updatedProject)
        res.status(200).json({ status: 'successeful update', project: updatedProject });
        return;
      }

    });
  } catch (error) {
    res.status(500).json({ status: 'Failed to update user data' })
    return
  }
});

//////////////////////////////////////////////////////////////////////////

userRouter.get('/getAllUsers', async (req, res, next) => {
  try {
    const users = await User.find()
    res.status(200).json({ status: 'done', users: users })
    return


  } catch (error) {
    res.status(500).json({ status: 'Failed to grt users data' })
    return
  }
});

//////////////////////////////////////////////////////////
userRouter.post('/addIntake', async (req, res, next) => {
  try {
    const { body } = req;
    const intake = new Intake(body);
    await intake.save()
    res.status(201).json({ status: "successful itake adding" })
    return
  } catch (err) {
    res.status(400).json({ status: "failed to add itake", error: err })
    return
  }


});
//////////////////////////////////////////////////////////////////
userRouter.get('/getAllIntakes', async (req, res, next) => {
  try {
    const intakes = await Intake.find()
    res.status(200).json({ status: 'done', intakes: intakes })
    return
  } catch (err) {
    res.status(400).json({ status: "failed to get itakes", error: err })
    return
  }
});

module.exports = userRouter




