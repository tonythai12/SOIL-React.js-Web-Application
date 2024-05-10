const http = require('http');
const bcrypt = require('bcrypt');

const password = 'emma1234';
const hashed = bcrypt.hashSync(password, 10);
console.log(bcrypt.compare(password, hashed));
console.log(hashed);
// console.log(http.STATUS_CODES);
