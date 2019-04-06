const Sequelize = require('sequelize');
const sequelize = new Sequelize(`postgres://postgres:root@localhost:5432/chat-db`);

class Room extends Sequelize.Model {}

Room.init({
  name: Sequelize.STRING,
}, { sequelize });

sequelize.sync();

module.exports = {
    Room
}