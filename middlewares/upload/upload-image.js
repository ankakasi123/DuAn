// import  upload file
const multer = require("multer");
// import mkdirp
const mkdirp = require("mkdirp")

const uploadImage = (type) => {
  // tạo thư mục đường dẫn
  const urlMkdirp = `./public/images/${type}`;
  const made = mkdirp.sync(urlMkdirp);
    // upload ảnh vào public
  const storage = multer.diskStorage({
    // diskStorage là một {}
    destination: function (req, file, cb) {
      // destination là đường dẫn lưu ở đâu req, file, callBackfuncion
      cb(null, `./public/images/${type}`);  // đang chạy ở file server nên ./public ( test ở playground test-cb.js)
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "_" + file.originalname);  // Date.now() thêm giây cho k bị trùng tên file && file.originalname đặt tên file và đuôi file giống file gốc
    },
  });

    // upload ảnh
  const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
      const extensionImageList = [".png", ".jpg"];
      const extension = file.originalname.slice(-4);
      const check = extensionImageList.includes(extension); // 4 chữ cuối file có bằng extensionImageList .png hay k
      if (check) {
        cb(null, true);
      } else {
        cb(new Error(`Không thể up file ${extension}`));
      }
    },
  });// fileFilter đuôi được phép upload

  return upload.single(type);
};

module.exports = {
  uploadImage,
};
