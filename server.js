const express = require('express');
const app = express();
const port = 5500;

app.listen(port, () => {
  console.log(`Chat app listening at http://localhost:${port}`);
});

const Sequelize = require('sequelize');
const sequelize = new Sequelize('chatapp', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

const Message = sequelize.define('message', {
  text: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

Message.sync({ force: true }).then(() => {
  console.log('Message table created successfully.');
});

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.post('/message', (req, res) => {
    Message.create({ text: req.body.text }).then((message) => {
      console.log('Message created successfully:', message.text);
      res.status(201).json({ message });
    });
  });

  app.get('/messages', (req, res) => {
    Message.findAll({ order: [['createdAt', 'DESC']], limit: 100 }).then((messages) => {
      res.status(200).json({ messages });
    });
  });
  