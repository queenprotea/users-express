const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const privateKey = fs.readFileSync(
    path.join(__dirname, '../keys/private.pem'),
    'utf8'
);

const publicKey = fs.readFileSync(
    path.join(__dirname, '../keys/public.pem'),
    'utf8'
);

const generarJWT = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = { uid };

        jwt.sign(
            payload,
            privateKey,
            {
                algorithm: 'RS256',
                expiresIn: '1h'
            },
            (err, token) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(token);
                }
            }
        );
    });
};

const verificarJWT = (token) => {
    return jwt.verify(token, publicKey, {
        algorithms: ['RS256']
    });
};

module.exports = {
    generarJWT,
    verificarJWT
};
