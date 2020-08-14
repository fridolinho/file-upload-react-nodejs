var express = require('express');
var app = express();
const cloudinary = require('cloudinary').v2;
var multer = require('multer')
var cors = require('cors');

app.use(cors())

require('dotenv').config();

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET 
});

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname )
  }
})

var upload = multer({ storage: storage }).single('file')

app.post('/upload',function(req, res) {
     
    upload(req, res,  async function (err) {
      if (err instanceof multer.MulterError) {
          return res.status(500).json(err)
      } else if (err) {
          return res.status(500).json(err)
      }

      try {
        const { secure_url } = await cloudinary.uploader.upload(req.file.path, {resource_type: 'raw'});
        console.log('url', secure_url);
        return res.status(200).send({
          status: 200,
          url: secure_url,
        })
      } catch (error) {
        console.log(error);
      }
    })

});

app.listen(8000, function() {

    console.log('App running on port 8000');

});