'use strict';
const bcrypt = require("bcryptjs"); // mã hóa pass
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert(
     "users",
     [
       {
         name: "An",
         email: "ankakasi111@gmail.com",
         password: bcrypt.hashSync("zxczxc123", bcrypt.genSaltSync(10)),
         numberPhone: "0364700478",
         avatar: "https://lh6.googleusercontent.com/X7JYEBXkxFMLWlXgsipqGbOYN6j9Lh_83FdKL-WPAtVKZsNnwrEE-VJVR83IXO73jgq4NrVuwPER2JVgkuyIpFMDMLzN3kbY1uHnD2_5enIx52yB-0IWf_VIfgFcpQBb4Yp3-an0",
         type: "ADMIN",
         price: 0,
         vip: 0,
         chiSo: 0,
         createdAt: "2022-11-08 12:08:46",
         updatedAt: "2022-11-08 12:08:46"
       },
       {
         name: "Mỹ",
         email: "ankakasi112@gmail.com",
         password: bcrypt.hashSync("zxczxc123", bcrypt.genSaltSync(10)),
         numberPhone: "0347453146",
         avatar: "https://lh6.googleusercontent.com/X7JYEBXkxFMLWlXgsipqGbOYN6j9Lh_83FdKL-WPAtVKZsNnwrEE-VJVR83IXO73jgq4NrVuwPER2JVgkuyIpFMDMLzN3kbY1uHnD2_5enIx52yB-0IWf_VIfgFcpQBb4Yp3-an0",
         type: "ADMIN",
         price: 1000000,
         vip: 10,
         chiSo: 10,
         createdAt: "2022-11-08 9:08:46",
         updatedAt: "2022-11-08 9:08:46"
       },
     ],
     {}
   );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('users', null, {});
  }
};
