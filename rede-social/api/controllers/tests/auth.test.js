import { register } from '../auth.js';
import { login} from '../auth.js';
import {db} from '../../connect.js';


jest.mock('../../connect.js');

///npm test -- --config=jest.config.js chamar no terminal

describe('register', () => {
  it('Deve retornar um erro 422 se o nome estiver em branco', () => {
    const req = {
      body: {
        username: '',
        email: 'test@example.com',
        password: 'password',
        confirmPassword: 'password',
      },
    };

    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    register(req, res);

    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({ msg: 'o nome eh obrigatorio' });
  });

  it('Deve retornar um erro 422 se o email estiver em branco', () => {
    const req = {
      body: {
        username: 'testuser',
        email: '',
        password: 'password',
        confirmPassword: 'password',
      },
    };

    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    register(req, res);

    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({ msg: 'o email eh obrigatorio' });
  });

  it('Deve retornar um erro 422 se a senha estiver em branco', () => {
    const req = {
      body: {
        username: 'testuser',
        email: 'test@example.com',
        password: '',
        confirmPassword: 'password',
      },
    };

    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    register(req, res);

    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({ msg: 'a senha eh obrigatoria' });
  });

  it('Deve retornar um erro 422 se a senha e a confirmação de senha forem diferentes', async () => {
    const req = {
      body: {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password',
        confirmPassword: 'differentpassword',
      },
    };
  
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };
  
    // Crie o mock db.registerUser com mockImplementation
    db.registerUser = jest.fn().mockImplementation((username, email, password, callback) => {
      // Simule um erro no banco de dados
      callback(new Error('Erro no banco de dados'), null);
    });
  
    await register(req, res);
  
    // Atualize a expectativa para 422, pois a função register está retornando 422
    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({ msg: 'as senhas estão diferentes' });
  });
 
  
});



describe('login', () => {
  test('Deve retornar 500 se logar', () => {
    const req = { body: { email: 'test@example.com', password: 'password' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock a database error
    db.query = jest.fn((query, values, callback) => {
      callback('Database error', null);
    });

    login(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ msg: 'erro no servidor' });
  });

  // You can write more test cases for other scenarios
});

