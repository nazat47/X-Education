const createTokenUser = (user) => {
  return { name: user.username, email: user.email, id: user._id, role: user.role };
};
module.exports = createTokenUser;
