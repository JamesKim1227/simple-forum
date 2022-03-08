'use strict '

import Sequelize from 'sequelize';

import { User } from '../model/user.js';
import { Forum } from '../model/forum.js';
import { sequelize } from '../connection.js';


const FORUM_ORDER = {
  order: [['createdAt', 'DESC']],
};

export async function getAll() {
  return Forum.findAll({
    attributes: [
      'id',
      'subject',
      'content',
      'createdAt',
      'updatedAt',
      'userId',
      [Sequelize.Sequelize.col('user.username'), 'username'],
    ],
    include: {
      model: User,
      attributes: [ ],
    },
    FORUM_ORDER,
  })
  .catch((e) => {
    console.error(e);
  });
}

export async function getAllByUserName(username) {
  return Forum.findAll({
    attributes: [
      'id',
      'subject',
      'content',
      'createdAt',
      'updatedAt',
      'userId',
      [Sequelize.Sequelize.col('user.username'), 'username'],
    ],
    include: {
      model: User,
      where: { username },
      attributes: [ ],
    },
    FORUM_ORDER,
  })
  .catch((e) => {
    console.error(e);
  });
}

export async function getById(id) {
  return Forum.findOne({
    attributes: [
      'id',
      'subject',
      'content',
      'createdAt',
      'updatedAt',
      'userId',
      [Sequelize.Sequelize.col('user.username'), 'username'],
    ],
    where: { id },
    include: {
      model: User,
      attributes: [ ],
    },
    FORUM_ORDER,
  })
  .catch((e) => {
    console.error(e);
  });;
}

export async function create(subject, content, userId) {
  return sequelize.transaction((t) => {
    return Forum.create({ subject, content, userId }, { transaction: t})
  })
  .then(async (result) => {
    return getById(result.dataValues.id);
  })
  .catch((e) => {
    console.error(e);
  });
}

export async function update(id, subject, content) {
  return sequelize.transaction((t) => {
    return Forum.findByPk(id)
      .then((forum) => {
        if (!forum) return null;

        forum.subject = subject;
        forum.content = content;
        return forum.save({ transaction: t });
      });
  })
  .catch((e) => {
    console.error(e);
  });;
}

export async function remove(id) {
  return sequelize.transaction((t) => {
    return Forum.findByPk(id)
      .then((forum) => {
        if (!forum) return null;

        return forum.destroy({ transaction: t });
      });
  })
  .catch((e) => {
    console.error(e);
  });;
}