const request = require('supertest');
const app = require('../../users-express/app');
const sequelize = require('../../users-express/models/database');
const Usuario = require('../../users-express/models/Usuario');

beforeAll(async () => {
    await sequelize.sync({ force: true });
});

afterAll(async () => {
    await sequelize.close();
});

describe('API Usuarios (Integración)', () => {

    test('POST /api/usuarios crea un usuario', async () => {
        const res = await request(app)
            .post('/api/usuarios')
            .send({
                nombre: 'Juan',
                email: 'juan@test.com',
                pass: '123456'
            });

        expect(res.statusCode).toBe(201);
    });

    test('POST /api/usuarios falla si faltan campos', async () => {
        const res = await request(app).post('/api/usuarios').send({});
        expect(res.statusCode).toBe(400);
    });

    test('GET /api/usuarios devuelve lista', async () => {
        const res = await request(app).get('/api/usuarios');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    test('PUT /api/usuarios/:id actualiza usuario', async () => {
        const user = await Usuario.create({
            nombre: 'Ana',
            email: 'ana@test.com',
            pass: '123'
        });

        const res = await request(app)
            .put(`/api/usuarios/${user.id}`)
            .send({ nombre: 'Ana Updated' });

        expect(res.statusCode).toBe(200);
    });

    test('DELETE /api/usuarios/:id elimina usuario', async () => {
        const user = await Usuario.create({
            nombre: 'Pedro',
            email: 'pedro@test.com',
            pass: '123'
        });

        const res = await request(app)
            .delete(`/api/usuarios/${user.id}`);

        expect(res.statusCode).toBe(200);
    });
});
