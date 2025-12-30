const Usuario = require('../../users-express/models/Usuario');

// Crear usuario
const crearUsuario = async (req, res) => {
    try {
        const { nombre, email, pass } = req.body;

        // Validaciones básicas
        if (!nombre || !email || !pass) {
            return res.status(400).json({
                error: 'Nombre, email y password son obligatorios'
            });
        }

        const usuario = await Usuario.create({ nombre, email, pass });
        res.status(201).json(usuario);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener usuarios
const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
};

// Actualizar usuario
const actualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;

        const [updated] = await Usuario.update(req.body, {
            where: { id }
        });

        if (updated === 0) {
            return res.status(404).json({
                error: 'Usuario no encontrado'
            });
        }

        res.json({ message: 'Usuario actualizado correctamente' });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar usuario
const eliminarUsuario = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await Usuario.destroy({
            where: { id }
        });

        if (!deleted) {
            return res.status(404).json({
                error: 'Usuario no encontrado'
            });
        }

        res.json({ message: 'Usuario eliminado correctamente' });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    crearUsuario,
    obtenerUsuarios,
    actualizarUsuario,
    eliminarUsuario
};
