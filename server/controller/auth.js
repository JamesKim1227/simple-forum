'use strict'

import * as userInterface from '../db/interface/user.js';
import * as crypto from '../util/crypto.js';
import * as auth from '../util/auth.js';


export async function signup(req, res, next) {
  const { username, password, email } = req.body;

  // Find the user by name if exists
  const user = await userInterface.getByUserName(username);
  if (user) {
    return res.status(409).json({ message: `The user(${username}) already exists.`});
  }

  // Create the user
  const hashedPassword = await crypto.createPassword(password);
  const newUserId = await userInterface.create(username, hashedPassword, email);

  // Create the authenticate token
  const token = await auth.createToken(newUserId);
  return res.status(201).json({ token: token });
}

export async function signin(req, res, next) {
  const { username, password } = req.body;

  // Find the user
  const user = await userInterface.getByUserName(username);
  if (!user) {
    return res.status(401).json({ message: `Invalid user or password.`});
  }

  // Check if the password is valid
  const isValidPassword = await crypto.comparePassword(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ message: `Invalid user or password.`});
  }

  // Create the authentication token
  const token = await auth.createToken(user.id);
  return res.status(201).json({ token: token });
}

export async function me(req, res, next) {
  // Find the user
  const user = await userInterface.findById(req.userId);
  if (!user) {
    return res.status(404).json({ message: `User not found` });
  }

  return res.status(200).json({ token: req.token, username: user.username });
}

export async function edit(req, res, next) {
  const { old_password, new_password, email } = req.body;

  // Find the user
  const user = await userInterface.findById(req.userId);
  if (!user) {
    return res.status(401).json({ message: `Invalid user or password.`});
  }
 
  let updatedPassword = user.password;
  let updatedEmail = user.email;

  // If old_password and new_password are set
  if (old_password && new_password) {
    // Check if the password is valid
    const isValidPassword = await auth.comparePassword(old_password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: `Invalid user or password.`});
    }

    // Create the new hashed password
    updatedPassword = await crypto.createPassword(new_password);
  }

  if (email) {
    updatedEmail = email;
  }

  if (user.password !== updatedPassword || user.email !== updatedEmail) {
    // Update the password or email
    const updated = await userInterface.update(req.userId, updatedPassword, updatedEmail);
    if (!updated) {
      return res.status(500).json({ message: `It failed to update the user`});
    }
  }

  return res.sendStatus(200);
}

export async function dropout(req, res, next) {
  // Find the user
  const user = await userInterface.findById(req.userId);
  if (!user) {
    return res.status(401).json({ message: `Invalid user or password.` });
  }

  // Delete the user
  const deleted = await userInterface.remove(req.userId);
  if (!deleted) {
    return res.status(500).json({ message: `It failed to delete the forum`});
  }

  return res.sendStatus(204);
}