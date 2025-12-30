const { crearUsuario } = require('../../users-express/controllers/usuarios');
const Usuario = require('../../users-express/models/Usuario');

jest.mock('../../users-express/models/Usuario');

describe('crearUsuario (Unitarias)', () => {

    test('retorna 400 si faltan campos', async () => {
        const req = { body: {} };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await crearUsuario(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                error: expect.any(String),
            })
        );

    });

    test('crea usuario correctamente', async () => {
        Usuario.create.mockResolvedValue({
            id: 1,
            nombre: 'Test',
            email: 'test@test.com'
        });

        const req = {
            body: {
                nombre: 'Test',
                email: 'test@test.com',
                pass: '123'
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await crearUsuario(req, res);

        expect(Usuario.create).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                id: 1,
                nombre: 'Test'
            })
        );
    });
});
