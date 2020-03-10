const { Router } = require('express');
const router = Router();
const Comment = require('../models/comment');
const path = require('path');
const idHandler = require('./lastId');

router.post('/', async (req, res) => {

     let imageName = Math.floor(Math.random() * 1000000000000);
     let imageSalt = Math.floor(Math.random() * 1000000000000);

     try {
          if(!req.files) {
               imageName = "";
          } else {
               let bannerImage = req.files.bannerImage;
               imageName = imageName + "_" + imageSalt + ".jpg";
               bannerImage.mv(path.join(__dirname, '../../static/commentImages/'+imageName));
               imageName = path.join(__dirname, '../../static/commentImages/'+imageName);
          }
     } catch {

     }

     const { user_id , post_id } = req.body;

     if( user_id && post_id ) {
        let id = idHandler.getLastId("comments");
        const newComment = new Comment({ comment_id : id ,  ...req.body , image_url : imageName });
        setLastID();
        newComment.save();
        res.json(newComment);
     } else {
          let errMessage = { status:"failed", message:"user_id and post_id are required" }
          errMessage = JSON.stringify(errMessage);

          res.json(errMessage);
     }
});

router.get("/", ( req, res ) => {
    const { comment_id } = req.body;
    if(comment_id) {
        getComment = new Comment();
        getComment.find({ comment_id : comment_id });
        res.json(getComment);
    }
});

function setLastID() {
    idHandler.setLastId("comments");
}

module.exports = router;