import jwt from "jsonwebtoken";

const validatePerson = (req, res, next) => {
  if (req.person.id === req.params.id || req.person.isAdmin) {
    req.isAdmin = req.person.isAdmin;
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

export const validateAdminSessionToken = (req, res, next) => {
  const token = req.cookies.session_token;

  if (!token) {
    return res.status(401).send("Not authorized!");
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(404).send("Token is invalid!");
    }
    req.person = decoded;
    validateAdmin(req, res, next);
  });
};

export const validatePersonSessionToken = (req, res, next) => {
  const token = req.cookies.session_token;

  if (!token) {
    return res.status(401).send("Not authorized!");
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(404).send("Token is invalid!");
    }
    req.person = decoded;
    validatePerson(req, res, next);
  });
};
