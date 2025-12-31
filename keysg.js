const { generateKeyPairSync } = require('crypto');
const fs = require('fs');

const { privateKey, publicKey } = generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
        type: 'pkcs1',
        format: 'pem'
    },
    privateKeyEncoding: {
        type: 'pkcs1',
        format: 'pem'
    }
});

if (!fs.existsSync('keys')) {
    fs.mkdirSync('keys');
}

fs.writeFileSync('keys/private.pem', privateKey);
fs.writeFileSync('keys/public.pem', publicKey);

console.log('Llaves RSA generadas');
