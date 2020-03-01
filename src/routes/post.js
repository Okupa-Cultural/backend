const { Router } = require('express');
const router = Router();
const Post = require('../models/post');
const path = require('path');
const idHandler = require('./lastId');

router.post('/', async (req, res) => {

     let imageName = Math.floor(Math.random() * 1000000000000);
     let imageSalt = Math.floor(Math.random() * 1000000000000);

     try {
          if(!req.files) {
               imageName='';
          } else {
               let bannerImage = req.files.bannerImage;
               imageName = imageName + "_" + imageSalt + ".jpg";
               bannerImage.mv(path.join(__dirname, '../../static/postImages/'+imageName))
          }
     } catch {

     }

     const { user_id } = req.body;

     if(user_id) {
          const newPost = new Post({ ...req.body , post_image_url: path.join(__dirname, '../../static/postImages/'+imageName)});
          newPost.save();
          res.json(newPost);
     } else {
          let errMessage = { status:"failed", message:"user_id is required" }
          errMessage = JSON.stringify(errMessage);

          res.json(errMessage);
     }
});

router.post('/setId', (req, res) => {
     idHandler.setLastId("posts");
     res.send("done");
});

module.exports = router;