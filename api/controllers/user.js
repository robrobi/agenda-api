var Repository = require('../../repository/repository');
var repo = new Repository();
var User = repo.models.User;
var util = require('util');

function getAllUsers(req, res) {
  User.findAll({
      order: [['last', 'ASC']]
  })
    .then(function(users) {
      res.status(200).json(users);
    })
    .catch(function(err) {
      res.status(500).json({
        message: err.message,
      });
    })
}

function getUser(req, res) {
  User.findOne({
    where: {
      id: req.swagger.params.id.value,
    }
  })
    .then(function(users) {
      res.status(200).json(users);
    })
    .catch(function(err) {
      res.status(500).json({
        message: err.message,
      });
    })
}

function deleteUser(req, res) {
    User.destroy({
      where: {
        id: req.swagger.params.id.value,
      },
      returning: true
  })
  .then(function(success) {
    if (success) {
        res.status(200).json({ id: req.swagger.params.id.value });
    } else {
        res.status(500).json({
          message: "No matching user was found to delete",
        });
    }
  })
  .catch(function(err) {
    res.status(500).json({
      message: err.message,
    });
  })
}

function createUser(req, res) {
    var formValues = req.swagger.params;
    User.build({
        gender: formValues.gender.value,
        title: formValues.title.value,
        first: formValues.first.value,
        last: formValues.last.value,
        email: formValues.email.value,
        username: formValues.first.value + formValues.last.value + generateRandomNumber(),
        phone: formValues.phone.value,
        cell: formValues.cell.value,
        picture: util.format('https://randomuser.me/api/portraits/%s/%s.jpg', formValues.gender.value, generateRandomNumber()),
        registered: Date.now(),
        dob: Date.now()
    })
    .save()
    .then(function(user) {
        res.status(200).json(user);
    })
    .catch(function(err) {
        res.status(500).json({
            message: err.message,
        });
    })
}

function generateRandomNumber() {
    return Math.floor(Math.random()*(99)+1);
}

module.exports = {
  getAllUsers: getAllUsers,
  getUser: getUser,
  deleteUser: deleteUser,
  createUser: createUser,
};
