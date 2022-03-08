'use strict'

import * as forumInterface from '../db/interface/forum.js ';

export async function getForums(req, res, next) {
  const userName = req.query.username;

  // Get all forums
  const forums = await (
    userName
    ? forumInterface.getAllByUserName(userName) 
    : forumInterface.getAll()
  );

  res.status(200).json(forums);
}

export async function getForumbyId(req, res, next) {
  const id = req.params.id;
  const forum = await forumInterface.getById(id);

  if (forum) {
    res.status(200).send(forum);
  } else {
    res.status(404).json({ message: `The Forum id(${id}) is NOT found !!!`});
  }
}

export async function createForum(req, res, next) {
  const { subject, content } = req.body;
  const forum = await forumInterface.create(subject, content, req.userId);
  if (!forum) {
    return res.sendStatus(500);
  }
  res.status(201).json(forum);
}

export async function updateForum(req, res, next) {
  const id = req.params.id;
  const { subject, content } = req.body;
  const forum = await forumInterface.getById(id);
  if (!forum) {
    return res.status(404).json({ message: `The Forum id(${id}) is NOT found !!!`});
  }

  // Check if valid edit permission
  if (forum.userId !== req.userId) {
    return res.sendStatus(403);
  }

  const updated = await forumInterface.update(id, subject, content);
  if (!updated) {
    return res.status(500).json({ message: `It failed to update the forum`});
  }
  res.status(200).json(updated);
}

export async function removeForum(req, res, next) {
  const id = req.params.id;
  const forum = await forumInterface.getById(id);
  if (!forum) {
    return res.status(404).json({ message: `The Forum id(${id}) is NOT found !!!`});
  }

  // Check if valid remove permisson
  if (forum.userId !== req.userId) {
    return res.sendStatus(403);
  }

  const deleted = await forumInterface.remove(id);
  if (!deleted) {
    return res.status(500).json({ message: `It failed to delete the forum`});
  }
  res.sendStatus(204);
}