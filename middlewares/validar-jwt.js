const { verificarJWT } = require('../helpers/jwt');

const validarJWT = (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    const token = authHeader.replace('Bearer ', '');

    try {
        const { uid } = verificarJWT(token);
        req.uid = uid;
        next();
    } catch (error) {
        return res.status(401).json({
            msg: 'Token no válido'
        });
    }
};

module.exports = validarJWT;
