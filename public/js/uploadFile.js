const express = require('express');
const multer = require('multer');
const path = require('path');

// Setting up multer to handle file uploads
const storage = multer.diskStorage({
  destination: './upload/images',
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 9000000 },
});

module.exports = upload;