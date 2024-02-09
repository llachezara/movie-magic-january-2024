const jwt = require('jsonwebtoken');

function sign (payload, secretOrPrivateKey, options){
   return new Promise((resolve, reject) => {
    jwt.sign(payload, secretOrPrivateKey, options, (err, token)=>{

            if (err) {
                return reject(err);
            }

           resolve(token);
    })
})
};
module.exports = {
    sign
};