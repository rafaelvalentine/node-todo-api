const { SHA256 } = require('crypto-js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const password = 'abe123'

// bcrypt.genSalt(10, (err, salt) => {
//     if (err) {
//         console.log(err)
//         return
//     }
//     bcrypt.hash(password, salt, (err, hash) => {
//         if (err) {
//             console.log(err)
//             return
//         }
//         console.log('hash: ', hash)
//     })
// })


const hashedPassword = '$2a$10$aHOPNTRG6Ul5lXm8UFP4luBuNB/lX1UrhhrY4Fv39.fRYn2vbSrq2'

bcrypt.compare(password, hashedPassword, (err, result) => {
    if (err) {
        console.log(err)
        return
    }
    console.log('compare password: ', result)
})

// var data = {
//     id: 10
// }

// var token = jwt.sign(data, '123abc')
// console.log(token)

// var decoded = jwt.verify(token, '123abc')
// console.log('decoded', decoded)

// var message = 'I am user number 3';
// var hash = SHA256(message).toString();
//
// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// var data = {
//   id: 4
// };
// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }
//
//
// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();
//
//
// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
// if (resultHash === token.hash) {
//   console.log('Data was not changed');
// } else {
//   console.log('Data was changed. Do not trust!');
// }