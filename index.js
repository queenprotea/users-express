require('dotenv').config();
const app = require('./app');
const sequelize = require('./models/database');

const PORT = process.env.PORT || 3000;

(async () => {
    try {
        await sequelize.sync();
        console.log('Base de datos conectada');
        app.listen(PORT, () => {
            console.log(`Servidor en puerto ${PORT}`);
        });
    } catch (err) {
        console.error('Error DB:', err);
    }
})();
