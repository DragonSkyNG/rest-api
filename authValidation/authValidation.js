import jwt from "jsonwebtoken";
import personModel from "../models/personModel.js";

const validatePerson = (req, res, next) => {
  if (req.person.id === req.params.id || req.person.isAdmin) {
    req.person.isAdmin;
    next();
  } else {
    return res.status(406).send("You don't have necessary access");
  }
};

const validateAdmin = (req, res, next) => {
  if (req.person.isAdmin) {
    next();
  } else {
    return res.status(406).send("You don't have necessary access");
  }
};

export const validateAdminSessionToken = async (req, res, next) => {
  const token = req.cookies.session_token;

  if (!token) {
    return res.status(401).send("Not authorized!");
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(404).send("Token is invalid!");
    }
    req.person = decoded;
    const person = await personModel.findById(req.person.id);
    if (req.person.isAdmin !== person.isAdmin) {
      return res.clearCookie("session_token").status(403).send("Token is invalid!");
    }
    validateAdmin(req, res, next);
  });
};

export const validatePersonSessionToken = async (req, res, next) => {
  const token = req.cookies.session_token;

  if (!token) {
    return res.status(401).send("Not authorized!");
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(404).send("Token is invalid!");
    }
    req.person = decoded;
    const person = await personModel.findById(req.person.id);
    if (req.person.isAdmin !== person.isAdmin) {
      return res.clearCookie("session_token").status(403).send("Token is invalid!");
    }
    validatePerson(req, res, next);
  });
};
