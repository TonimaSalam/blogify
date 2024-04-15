class UserCreation {
  constructor(username, useremail, password) {
    this.username = username;
    this.useremail = useremail;
    this.password = password;
  }
}

class UserLogin {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }
}

class UpdateUser {
  constructor(newPassword, oldPassword) {
    this.newPassword = newPassword;
    this.oldPassword = oldPassword;
  }
}

module.exports = {
  UserCreation,
  UserLogin,
  UpdateUser,
};
