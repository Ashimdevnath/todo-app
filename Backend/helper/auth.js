const bcrypt = require('bcryptjs');

const hashpassword = async (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        reject(err);
      } else {
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) {
            reject(err);
          } else {
            resolve(hash);
          }
        });
      }
    });
  });
}

const comparePassword = async (password, hash) => {
  return bcrypt.compare(password, hash);
}

module.exports = {
  hashpassword,
  comparePassword
}
