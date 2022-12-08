const authorize = (arrType) => (req, res, next) => {
  const { user } = req;// nhận từ authenticate.js
  if (arrType.findIndex((ele) => ele === user.type) > -1) {// arrType là ["ADMIN", "SUPER_ADMIN"]
    next();
  } else {
    res.status(403).send("Bạn đã đăng nhập , nhưng không có quyền");
  }
};

module.exports = {
  authorize,
};
