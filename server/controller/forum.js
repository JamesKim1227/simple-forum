'use strict'

import * as forumData from '../data/forum.js ';

export async function getForums(req, res, next) {
  const userName = req.query.username;
  const forums = await (
    userName
    ? forumData.getAllByUserName(userName) 
    : forumData.getAll()
  );

  res.status(200).json(forums);
}

export async function getForumbyId(req, res, next) {
  const id = req.params.id;
  const forum = await forumData.getById(id);

  if (forum) {
    res.status(200).send(forum);
  } else {
    res.status(404).json({ message: `The Forum id(${id}) is NOT found !!!`});
  }
}

export async function createForum(req, res, next) {
  const { subject, content, name } = req.body;
  const forum = await forumData.create(subject, content, name);
  res.status(201).json(forum);
}

export async function updateForum(req, res, next) {
  const id = req.params.id;
  const { subject, content } = req.body;
  const forum = await forumData.update(id, subject, content);

  if (forum) {
    res.status(200).json(forum);
  } else {
    res.status(404).json({ message: `The Forum id(${id}) is NOT found !!!`});
  }
}

export async function removeForum(req, res, next) {
  const id = req.params.id;
  const result = await forumData.remove(id);

  if (result) {
    res.sendStatus(204);
  } else {
    res.status(404).json({ message: `The Forum id(${id}) is NOT found !!!`});
  }
}