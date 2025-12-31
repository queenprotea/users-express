const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const login = async (req, res) => {
    const { email, pass } = req.body;

    if (!email || !pass) {
        return res.status(400).json({
            msg: 'Email y password son obligatorios'
        });
    }

    try {
        const usuario = await Usuario.findOne({ where: { email } });

        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / Password incorrectos'
            });
        }

        const validPassword = bcrypt.compareSync(pass, usuario.pass);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / Password incorrectos'
            });
        }

        const token = await generarJWT(usuario.id);

        res.json({
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                email: usuario.email
            },
            token
        });

    } catch (error) {
        res.status(500).json({
            msg: 'Error en el servidor'
        });
    }
};

module.exports = { login };
