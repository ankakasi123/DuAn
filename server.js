const express = require("express");
const path = require("path");
const { sequelize } = require("./models");
const { rootRouter } = require("./routers");
const Fingerprint = require("express-fingerprint");
//
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./config/swagger.json');


const app = express();

const cors = require('cors')
const port = process.env.POST || 4567
//cài đặt Fingerprint
app.use(Fingerprint());

// cài ứng dụng sử dụng kiểu json
app.use(express.json());

// cài static file
const publicPathDirectory = path.join(__dirname, "./public");
app.use("/public", express.static(publicPathDirectory));
app.get("/", (req,res)=>{
  res.send("hello world!")   
})
// cors add all request
app.use(cors());
// dùng router
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/v1", rootRouter);






// lắng nghe sự kiện kết nối
app.listen(port, async () => {
  console.log(`App listening on http://localhost:${port}`);
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
