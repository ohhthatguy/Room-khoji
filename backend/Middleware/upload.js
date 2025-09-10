const multer = require('multer')

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, "images/profile/")
//     },
//     filename: (req, file, cb) => {
//       cb(null, Date.now() + "-" + file.originalname)
//     },
//   })


// const upload = multer({storage: storage})
// module.exports = upload



const storage = multer.memoryStorage();
const upload = multer({ storage });
module.exports = upload;