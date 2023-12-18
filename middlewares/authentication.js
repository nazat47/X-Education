const { Unauthenticated, Unauthorized } = require("../errors");
const { isTokenValid } = require("../utils");

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;
  if (!token) {
    throw new Unauthenticated("User not authenticated");
  }
  try {
    const payload = isTokenValid(token);
    const { name, email, id, role } = payload;
    req.user = {
      name,
      email,
      id,
      role,
    };
    next();
  } catch (error) {
    throw new Unauthenticated("Authentication failed");
  }
};
const authorizePermissions = () => {
  return (req, res, next) => {
    if (req.user.role !== "admin") {
      throw new Unauthorized("Not athorized to access this route");
    }
    next();
  };
};
module.exports = { authenticateUser, authorizePermissions };
