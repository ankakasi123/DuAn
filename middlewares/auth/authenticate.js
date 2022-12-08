const jwt = require("jsonwebtoken");

// token bước 2
const authenticate = (req, res, next) => {
  const token = req.header("token");
  try {
    const decode = jwt.verify(token, "key-quen-mat-khau");
    if (decode) {
      req.user = decode;// bóc tách user cho thằng sau authorize.js
      return next();
    } else {
      res.status(401).send("Bạn Chưa Đăng Nhập");
    }
  } catch (error) {
    res.status(401).send("Bạn Chưa Đăng Nhập");
  }
};

module.exports = {
  authenticate,
};
