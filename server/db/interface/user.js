'use strict'

import { User } from '../model/user.js';
import { sequelize } from '../connection.js';


export async function getByUserName(username) {
  return User.findOne({ where: { username } })
    .catch((e) => {
      console.error(e);
    });;
}

export async function findById(id) {
  return User.findByPk(id)
    .catch((e) => {
      console.error(e);
    });;
}

export async function create(username, password, email) {
  return sequelize.transaction((t) => {
    return User.create({ username, password, email }, { transaction: t })
      .then((result) => result.dataValues.id);
  })
  .catch((e) => {
    console.error(e);
  });;
}

export async function update(userId, password, email) {
  return sequelize.transaction((t) => {
    return User.findByPk(userId)
      .then((user) => {
        if (!user) return null;

        user.password = password;
        user.email = email;
        return user.save({ transaction: t });
      });
  })
  .catch((e) => {
    console.error(e);
  });;
}

export async function remove(userId) {
  return sequelize.transaction((t) => {
    return User.findByPk(userId)
      .then((user) => {
        if (!user) return null;
        return user.destroy({ transaction: t });
      });
  })
  .catch((e) => {
    console.error(e);
  });;
}