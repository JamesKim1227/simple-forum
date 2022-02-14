'use strict '

let forums = [
  {
    id: '1',
    subject: 'test subject 1',
    content: '',
    name: 'James',
    createdAt: Date.now().toString()
  },
  {
    id: '2',
    subject: 'test subject 2',
    content: '',
    name: 'Robert',
    createdAt: Date.now().toString()
  },
  {
    id: '3',
    subject: 'test subject 3',
    content: '',
    name: 'John',
    createdAt: Date.now().toString()
  },
];

export async function getAll() {
  return forums;
}

export async function getAllByUserName(userName) {
  return forums.filter((forum) => forum.name === userName);
}

export async function getById(id) {
  return forums.find((forum) => forum.id === id);
}

export async function create(subject, content, name) {
  let forum = {
    id: Date.now().toString(),
    subject: subject,
    content: content,
    name: name,
    createdAt: Date.now().toString(),
  };

  forums = [forum, ...forums];
  return forum;
}

export async function update(id, subject, content) {
  const forum = forums.find((forum) => forum.id === id);
  if (forum) {
    // An object can change values.
    forum.subject = subject;
    forum.content = content;
  }
  return forum;
}

export async function remove(id) {
  const forum = forums.find((forum) => forum.id === id);
  if (! forum) {
    return false;
  }

  forums = forums.filter((forum) => forum.id !== id);
  return true;
}