const User = require('../models/user')
const Project = require('../models/Project')
const detect = require('detect-file-type');
const { v4: uuidv4 } = require("uuid");
const path = require('path');
var mv = require('mv');

async function saveProject(project, userId){
    const newProject = new Project(project);
    await newProject.save();
    const user = await User.findByIdAndUpdate({ _id: userId }, { $push: { projectsId: newProject._id } }, { new: true, useFindAndModify:false })
    return user;
}

async function uploadPhoto(file, callback, res){
    detect.fromFile(file.path, (err, result) => {
        const photoName = uuidv4() + "." + result.ext
        const allowedImageTypes = ["jpg","jpeg","png"]
        if (!allowedImageTypes.includes(result.ext)) {
          res.status(400).json({ status: 'Image not allowed' })
          return
        }
        const oldPath = file.path
        const newPath = path.join(__dirname, "..", "..", "Frontend", "public", 'uploadedPhotos', photoName)
        mv(oldPath, newPath, (err) => {
          if (err) {
             res.status(400).json({ status: 'error while uploading photo', error: err })
             return             
          } else {
              callback(photoName);
              return;
          }
        });
      });

}
module.exports ={
    saveProject,
    uploadPhoto,
}