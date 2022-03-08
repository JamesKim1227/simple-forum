'use strict'


export const InvalidUrlRequest = (req, res, next) => {
    return res.sendStatus(404);
}

export const serverError = (error, req, res, next) => {
    console.error(error);
    res.sendStatus(500);
  };
