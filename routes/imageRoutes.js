const express = require("express");
const router = express.Router();
var AWS = require('aws-sdk');


const getUrls = (imageObjects) => {
  const imagesUrls = []
  const baseUrl = "https://bcmagallery.s3-ap-southeast-2.amazonaws.com/"
  imageObjects.forEach((image) => {
    const url = baseUrl + image.Key
    // console.log(url)
    imagesUrls.push(url)
  })
  return imagesUrls
}

let s3credentials = new AWS.S3({
  accessKeyId: process.env.AWSAccessKeyId,
  secretAccessKey: process.env.AWSSecretKey
});

router.get('/get-objects', (req, res) => {
  let params = {
    Bucket: 'bcmagallery',
    Delimiter: ''
    // for the key you should use string concatenation to create a unique filename key
  }
  s3credentials.listObjects(params, (err, data) => {
    if (err) {
      console.log(err)
    } else {
      console.log(data.Contents)
      const urls = getUrls(data.Contents)
      console.log(urls)
      res.send({
        imageUrls: urls
      })
    }
  })
})

module.exports = router;