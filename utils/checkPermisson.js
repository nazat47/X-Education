const { Unathorized } = require("../errors");

const checkPermission = (requestUser, resourceId) => {
  if (requestUser.id === resourceId.toString()) {
    return;
  }
  throw new Unathorized("You dont have permission");
};
module.exports = checkPermission;
