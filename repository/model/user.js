var Sequelize = require('sequelize');

module.exports = {
  id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
  },
  gender: Sequelize.STRING,
  title: Sequelize.STRING,
  first: Sequelize.STRING,
  last: Sequelize.STRING,
  email: Sequelize.STRING,
  username: Sequelize.STRING,
  phone: Sequelize.STRING,
  cell: Sequelize.STRING,
  picture: Sequelize.STRING,
  registered: Sequelize.BIGINT(32),
  dob: Sequelize.BIGINT(32),
};
