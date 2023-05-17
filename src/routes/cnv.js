const express = require("express");
const router = express.Router();
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, next) {
      next(null, 'base-files');
  },
  filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '.ifc');
  }
})

const upload = multer({
  storage: storage
});

// Importing the controllers
const {
  descriptionGET,
  IfcToLbdGET,
  IfcToLbdPOST,
} = require("../controllers/ifcToLbd");

// Assigning a controller to the "/cnv/" URI
router.get("/", descriptionGET);

// Assigning controllers to the "/op/IFCtoGLTF" URI
router.get("/IFCtoLBD", IfcToLbdGET);
router.post("/IFCtoLBD", upload.single('ifcFile'), IfcToLbdPOST);

module.exports = router;
