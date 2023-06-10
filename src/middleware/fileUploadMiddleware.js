import multer from 'multer';
import fs from 'fs';
import {PATHS} from "../constants.js";

if (!fs.existsSync(PATHS.storage)){
  fs.mkdirSync(PATHS.storage);
}

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, PATHS.storage);
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
  }
});

const fileUploadMiddleware = multer({storage: storage});
export default fileUploadMiddleware.single('image');


