const { Op } = require("sequelize"); // search
const { User, sequelize } = require("../models");
const bcrypt = require("bcryptjs"); // mã hóa pass
const jwt = require("jsonwebtoken"); // mã token
const gravatarUrl = require("gravatar-url");
const CryptoJS = require("crypto-js");
const crypto = require("crypto");

//đăng kí
const register = async (req, res) => {
  const { name, email, password, numberPhone } = req.body;
  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (user) {
      res
        .status(500)
        .send({ message: `Đã có tài khoản đăng kí email: ${email}` });
      return;
    } else {
      // tạo avatar mặc định
      const avatarUrl = gravatarUrl(email);
      // tạo ra một chuỗi ngẫu nhiên
      const salt = bcrypt.genSaltSync(10);
      // mã hóa salt + password
      const hashPassword = bcrypt.hashSync(password, salt);
      const newUser = await User.create({
        name,
        email,
        password: hashPassword,
        numberPhone,
        avatar: avatarUrl,
      });
      res
        .status(200)
        .send({
          message: `Đăng Kí Thành Công tài khoản với email: ${email}`,
          newUser,
        });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// đăng nhập
const login = async (req, res) => {
  const { email, password } = req.body;
  const avatarUrl = gravatarUrl(email);
  // b1 : tìm ra user đang đăng nhập dựa trên trên email
  const user = await User.findOne({
    where: {
      email,
    },
  });
  if (user) {
    const { id, numberPhone, price, vip, chiSo } = user;
    // b2 : kiểm mật khẩu có đúng hay không
    const isAuth = bcrypt.compareSync(password, user.password);
    if (isAuth) {
      const token = jwt.sign(
        { id: user.id, name: user.name, email: user.email, numberPhone: user.numberPhone, type: user.type, price: user.price, vip: user.vip, chiSo: user.chiSo, },
        "key-quen-mat-khau",
        { expiresIn: 60 * 60 * 2 }
      ); // cái cần mã hóa , key quên mật khẩu , expiresIn thời gian đăng nhập lại 1h
      res.status(200).send({
        message: "Đăng Nhập Thành Công ! ",
        id,
        token,
        avatarUrl,
        numberPhone,
        price,
        vip,
        chiSo,
      });
    } else {
      res.status(500).send({ message: "Tài khoản hoặc mật khẩu không đúng" });
    }
  } else {
    res.status(404).send({ message: "Không tìm thấy email phù hợp" });
  }
};

//  upload avatar
const uploadAvatar = async (req, res) => {
  const { file } = req; // {file} = req lấy đường dẫn của hình lấy path trong postman
  const urlImage = `http://localhost:3000/${file.path}`;
  const { user } = req;
  const userFound = await User.findOne({
    email: user.email,
  });
  userFound.avatar = urlImage; // userFound là người dùng findOne
  await userFound.save();
  res.send(userFound);
};

// //upload price
// const updatePrice = async (req, res) => {
//   const { id } = req.params;
//   const { price, vip, chiSo } = req.body;
//   try {
//     const detailUser = await User.findOne({
//       where: { id },
//     });
//     detailUser.price = price;
//     detailUser.vip = vip;
//     detailUser.chiSo = chiSo;
//     await detailUser.save();
//     res.status(200).send(detailUser);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };



// xóa user
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.destroy({
      where: {
        id,
      },
    });
    res.status(200).send(`Xóa thành công user có id là: ${id}`);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Lấy toàn bộ danh sách user
const loginGetAll = async (req, res) => {
  try {
    const user = await User.findAll();
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

// 1 user
const userOne = async (req, res) => {
  const { user } = req;
  const email = user.email
    try {
      const userLogin = await User.findOne({
        where: {
          email
        }
      });
      // let { id, name, email, numberPhone, price, vip, chiSo } = user;
      // let id = user.id
      
      res.status(200).send({id: userLogin.id, name: userLogin.name, email: userLogin.email, numberPhone: userLogin.numberPhone, type: userLogin.type, price: userLogin.price, vip: userLogin.vip, chiSo: userLogin.chiSo, });
    } catch (error) {
      res.status(500).send(error);
    }
};
//upload Thông tin user
const updatePrice = async (req, res) => {
  const {user} = req
  const email = user.email
  const { price, vip, chiSo } = req.body;
  try {
    const detailUser = await User.findOne({
      where: { email },
    });
    detailUser.price = price;
    detailUser.vip = vip;
    detailUser.chiSo = chiSo;
    await detailUser.save();
    res.status(200).send(detailUser);
  } catch (error) {
    res.status(500).send(error);
  }
};


// Đổi thông tin user
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, type, numberPhone, price, vip, chiSo } = req.body;
  try {
    const detailUser = await User.findOne({
      where: { id },
    });
    detailUser.name = name;
    detailUser.email = email;
    detailUser.type = type;
    detailUser.numberPhone = numberPhone;
    detailUser.price = price;
    detailUser.vip = vip;
    detailUser.chiSo = chiSo;
    await detailUser.save();

    res.status(200).send(detailUser);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  register,
  login,
  uploadAvatar,
  deleteUser,
  loginGetAll,
  updateUser,
  updatePrice,
  userOne,
};
