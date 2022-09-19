import prisma from "../src/database/database";
import supertest from 'supertest';
import app from "../src/index";
import { faker } from '@faker-js/faker';

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE "Users";`;
  await prisma.$executeRaw`TRUNCATE TABLE "Tests";`;
});


afterAll(async () => {
  await prisma.$disconnect();
});



describe('Test POST /register', () => {
  it('Should return status 201 and the new user created when everything go well', async () => {
    const body = {
      email: 'jojo@email.com',
      password: 'xablau',
      confirmPassword: 'xablau'
    }
    const result = await supertest(app).post(`/register`).send(body);
    expect(result.status).toBe(201);
    expect(result.body).toMatchObject({ email: body.email, password: result.body.password });
  });

  it('Should return status 422 when the body of the request is invalid (invalid email)', async () => {
    const body = {
      email: 'jojoemail.com',
      password: 'xablau',
      confirmPassword: 'xablau'
    }
    const result = await supertest(app).post(`/register`).send(body);
    expect(result.status).toBe(422);
  });
  it('Should return status 422 when the body of the request is invalid (invalid password)', async () => {
    const body = {
      email: 'jojo@email.com',
      password: 1,
      confirmPassword: 1
    }
    const result = await supertest(app).post(`/register`).send(body);
    expect(result.status).toBe(422);
  });
  it('Should return status 400 when the passwords of the body are not the same', async () => {
    const body = {
      email: 'jojo@email.com',
      password: 'xablau',
      confirmPassword: 'xabla'
    }
    const result = await supertest(app).post(`/register`).send(body);
    expect(result.status).toBe(400);
  });
  it('Should return status 409 if the email sent by the body were already been used', async () => {
    const body = {
      email: 'jojo@email.com',
      password: 'xablau',
      confirmPassword: 'xablau'
    }
    await supertest(app).post(`/register`).send(body);
    const result = await supertest(app).post(`/register`).send(body);
    expect(result.status).toBe(409);
  });
});


describe('Test POST /login', () => {
  it('Should return status 200 and the new token generated when everything go well', async () => {
    const bodyRegister = {
      email: 'jojo@email.com',
      password: 'xablau',
      confirmPassword: 'xablau'
    }
    const body = {
      email: 'jojo@email.com',
      password: 'xablau'
    }
    await supertest(app).post(`/register`).send(bodyRegister);
    const result = await supertest(app).post(`/login`).send(body);
    expect(result.status).toBe(200);
    console.log(result.body);
    expect(result.body).toBeInstanceOf(Object);
  });
  it('Should return status 422 when the body of the request is invalid', async () => {
    const body = {
      email: 'jojo@email.com'
    }
    const result = await supertest(app).post(`/login`).send(body);
    expect(result.status).toBe(422);
  });
  it('Should return status 404 when the requested user does not exist', async () => {
    const body = {
      email: 'jojo@email.com',
      password: 'xablau'
    }
    const result = await supertest(app).post(`/login`).send(body);
    expect(result.status).toBe(404);
  });
  it('Should return status 401 when the informed password is wrong', async () => {
    const bodyRegister = {
      email: 'jojo@email.com',
      password: 'xablau',
      confirmPassword: 'xablau'
    }
    const body = {
      email: 'jojo@email.com',
      password: 'xabla'
    }
    await supertest(app).post(`/register`).send(bodyRegister);
    const result = await supertest(app).post(`/login`).send(body);
    expect(result.status).toBe(401);
  });
});


// tests about tests

describe('Test POST /tests', () => {
  it('Should return status 201 and the new test created when everything go well', async () => {
    const bodyRegister = {
      email: 'jojo@email.com',
      password: 'xablau',
      confirmPassword: 'xablau'
    }
    const bodyLogin = {
      email: 'jojo@email.com',
      password: 'xablau'
    }
    await supertest(app).post(`/register`).send(bodyRegister);
    const resultLogin = await supertest(app).post(`/login`).send(bodyLogin);

    const body = {
      name: 'projetao',
      pdfUrl: 'https://www.africau.edu/images/default/sample.pdf',
      category: 'Projeto',
      discipline: 'HTML e CSS',
      teacher: 'Bruna Hamori'
    }
    const result = await supertest(app).post(`/tests`).send(body).set({authorization: 'Bearer ' + resultLogin.body.token});
    
    expect(result.status).toBe(201);
    
    expect(result.body).toMatchObject({name:body.name,pdfUrl:body.pdfUrl});
  });
  it('Should return status 401 when the token is not informed or invalid', async () => {
    const bodyRegister = {
      email: 'jojo@email.com',
      password: 'xablau',
      confirmPassword: 'xablau'
    }
    const bodyLogin = {
      email: 'jojo@email.com',
      password: 'xablau'
    }
    await supertest(app).post(`/register`).send(bodyRegister);
    const resultLogin = await supertest(app).post(`/login`).send(bodyLogin);

    const body = {
      name: 'projetao',
      pdfUrl: 'https://www.africau.edu/images/default/sample.pdf',
      category: 'Projeto',
      discipline: 'HTML e CSS',
      teacher: 'Bruna Hamori'
    }
    const result = await supertest(app).post(`/tests`).send(body).set({authorization: 'xablau'});
    
    expect(result.status).toBe(401);
  });
  it('Should return status 422 when the body of the request is invalid', async () => {
    const bodyRegister = {
      email: 'jojo@email.com',
      password: 'xablau',
      confirmPassword: 'xablau'
    }
    const bodyLogin = {
      email: 'jojo@email.com',
      password: 'xablau'
    }
    await supertest(app).post(`/register`).send(bodyRegister);
    const resultLogin = await supertest(app).post(`/login`).send(bodyLogin);

    const body = {
      name: 'projetao',
      pdfUrl: 'www.africau.edu/images/default/sample.pdf',
      category: 'Projeto',
      discipline: 'HTML e CSS',
      teacher: 'Bruna Hamori'
    }
    const result = await supertest(app).post(`/tests`).send(body).set({authorization: 'Bearer ' + resultLogin.body.token});
    
    expect(result.status).toBe(422);
  });
  it('Should return status 404 when the informed category does not exist', async () => {
    const bodyRegister = {
      email: 'jojo@email.com',
      password: 'xablau',
      confirmPassword: 'xablau'
    }
    const bodyLogin = {
      email: 'jojo@email.com',
      password: 'xablau'
    }
    await supertest(app).post(`/register`).send(bodyRegister);
    const resultLogin = await supertest(app).post(`/login`).send(bodyLogin);

    const body = {
      name: 'projetao',
      pdfUrl: 'https://www.africau.edu/images/default/sample.pdf',
      category: 'Projetao',
      discipline: 'HTML e CSS',
      teacher: 'Bruna Hamori'
    }
    const result = await supertest(app).post(`/tests`).send(body).set({authorization: 'Bearer ' + resultLogin.body.token});
    
    expect(result.status).toBe(404);
  });
  it('Should return status 404 when the informed teacher does not exist', async () => {
    const bodyRegister = {
      email: 'jojo@email.com',
      password: 'xablau',
      confirmPassword: 'xablau'
    }
    const bodyLogin = {
      email: 'jojo@email.com',
      password: 'xablau'
    }
    await supertest(app).post(`/register`).send(bodyRegister);
    const resultLogin = await supertest(app).post(`/login`).send(bodyLogin);

    const body = {
      name: 'projetao',
      pdfUrl: 'https://www.africau.edu/images/default/sample.pdf',
      category: 'Projeto',
      discipline: 'HTML e CSS',
      teacher: 'Jubiscleiton'
    }
    const result = await supertest(app).post(`/tests`).send(body).set({authorization: 'Bearer ' + resultLogin.body.token});
    
    expect(result.status).toBe(404);
  });
  it('Should return status 404 when the informed discipline does not exist', async () => {
    const bodyRegister = {
      email: 'jojo@email.com',
      password: 'xablau',
      confirmPassword: 'xablau'
    }
    const bodyLogin = {
      email: 'jojo@email.com',
      password: 'xablau'
    }
    await supertest(app).post(`/register`).send(bodyRegister);
    const resultLogin = await supertest(app).post(`/login`).send(bodyLogin);

    const body = {
      name: 'projetao',
      pdfUrl: 'https://www.africau.edu/images/default/sample.pdf',
      category: 'Projeto',
      discipline: 'Boot Bar',
      teacher: 'Bruna Hamori'
    }
    const result = await supertest(app).post(`/tests`).send(body).set({authorization: 'Bearer ' + resultLogin.body.token});
    
    expect(result.status).toBe(404);
  });
});

describe('Test GET /tests/byDiscipline', () => {
  it('Should return status 200 and an array', async () => {
    const bodyRegister = {
      email: 'jojo@email.com',
      password: 'xablau',
      confirmPassword: 'xablau'
    }
    const bodyLogin = {
      email: 'jojo@email.com',
      password: 'xablau'
    }
    await supertest(app).post(`/register`).send(bodyRegister);
    const resultLogin = await supertest(app).post(`/login`).send(bodyLogin);

    const body1 = {
      name: 'projetao',
      pdfUrl: 'https://www.africau.edu/images/default/sample.pdf',
      category: 'Prática',
      discipline: 'HTML e CSS',
      teacher: 'Bruna Hamori'
    }
    await supertest(app).post(`/tests`).send(body1).set({authorization: 'Bearer ' + resultLogin.body.token});
    const body2 = {
      name: 'projetinho',
      pdfUrl: 'https://www.africau.edu/images/default/sample.pdf',
      category: 'Projeto',
      discipline: 'HTML e CSS',
      teacher: 'Bruna Hamori'
    }
    await supertest(app).post(`/tests`).send(body2).set({authorization: 'Bearer ' + resultLogin.body.token});
    const body3 = {
      name: 'projetasso',
      pdfUrl: 'https://www.africau.edu/images/default/sample.pdf',
      category: 'Projeto',
      discipline: 'HTML e CSS',
      teacher: 'Bruna Hamori'
    }
    await supertest(app).post(`/tests`).send(body3).set({authorization: 'Bearer ' + resultLogin.body.token});

    const result = await supertest(app).get(`/tests/byDiscipline`).set({authorization: 'Bearer ' + resultLogin.body.token});
    
    expect(result.status).toBe(200);
    expect(result.body).toBeInstanceOf(Array);
  });
  it('Should return status 401 when the token is invalid', async () => {
    const bodyRegister = {
      email: 'jojo@email.com',
      password: 'xablau',
      confirmPassword: 'xablau'
    }
    const bodyLogin = {
      email: 'jojo@email.com',
      password: 'xablau'
    }
    await supertest(app).post(`/register`).send(bodyRegister);
    const resultLogin = await supertest(app).post(`/login`).send(bodyLogin);

    const body1 = {
      name: 'projetao',
      pdfUrl: 'https://www.africau.edu/images/default/sample.pdf',
      category: 'Prática',
      discipline: 'HTML e CSS',
      teacher: 'Bruna Hamori'
    }
    await supertest(app).post(`/tests`).send(body1).set({authorization: 'Bearer ' + resultLogin.body.token});
    const body2 = {
      name: 'projetinho',
      pdfUrl: 'https://www.africau.edu/images/default/sample.pdf',
      category: 'Projeto',
      discipline: 'HTML e CSS',
      teacher: 'Bruna Hamori'
    }
    await supertest(app).post(`/tests`).send(body2).set({authorization: 'Bearer ' + resultLogin.body.token});
    const body3 = {
      name: 'projetasso',
      pdfUrl: 'https://www.africau.edu/images/default/sample.pdf',
      category: 'Projeto',
      discipline: 'HTML e CSS',
      teacher: 'Bruna Hamori'
    }
    await supertest(app).post(`/tests`).send(body3).set({authorization: 'Bearer ' + resultLogin.body.token});

    const result = await supertest(app).get(`/tests/byDiscipline`).set({authorization:resultLogin.body.token});
    
    expect(result.status).toBe(401);
  });
});

describe('Test GET /tests/byTeacher', () => {
  it('Should return status 200 and an array', async () => {
    const bodyRegister = {
      email: 'jojo@email.com',
      password: 'xablau',
      confirmPassword: 'xablau'
    }
    const bodyLogin = {
      email: 'jojo@email.com',
      password: 'xablau'
    }
    await supertest(app).post(`/register`).send(bodyRegister);
    const resultLogin = await supertest(app).post(`/login`).send(bodyLogin);

    const body1 = {
      name: 'projetao',
      pdfUrl: 'https://www.africau.edu/images/default/sample.pdf',
      category: 'Prática',
      discipline: 'HTML e CSS',
      teacher: 'Bruna Hamori'
    }
    await supertest(app).post(`/tests`).send(body1).set({authorization: 'Bearer ' + resultLogin.body.token});
    const body2 = {
      name: 'projetinho',
      pdfUrl: 'https://www.africau.edu/images/default/sample.pdf',
      category: 'Projeto',
      discipline: 'HTML e CSS',
      teacher: 'Bruna Hamori'
    }
    await supertest(app).post(`/tests`).send(body2).set({authorization: 'Bearer ' + resultLogin.body.token});
    const body3 = {
      name: 'projetasso',
      pdfUrl: 'https://www.africau.edu/images/default/sample.pdf',
      category: 'Projeto',
      discipline: 'HTML e CSS',
      teacher: 'Bruna Hamori'
    }
    await supertest(app).post(`/tests`).send(body3).set({authorization: 'Bearer ' + resultLogin.body.token});

    const result = await supertest(app).get(`/tests/byTeacher`).set({authorization: 'Bearer ' + resultLogin.body.token});
    
    expect(result.status).toBe(200);
    expect(result.body).toBeInstanceOf(Array);
  });

  it('Should return status 401 when the token is invalid', async () => {
    const bodyRegister = {
      email: 'jojo@email.com',
      password: 'xablau',
      confirmPassword: 'xablau'
    }
    const bodyLogin = {
      email: 'jojo@email.com',
      password: 'xablau'
    }
    await supertest(app).post(`/register`).send(bodyRegister);
    const resultLogin = await supertest(app).post(`/login`).send(bodyLogin);

    const body1 = {
      name: 'projetao',
      pdfUrl: 'https://www.africau.edu/images/default/sample.pdf',
      category: 'Prática',
      discipline: 'HTML e CSS',
      teacher: 'Bruna Hamori'
    }
    await supertest(app).post(`/tests`).send(body1).set({authorization: 'Bearer ' + resultLogin.body.token});
    const body2 = {
      name: 'projetinho',
      pdfUrl: 'https://www.africau.edu/images/default/sample.pdf',
      category: 'Projeto',
      discipline: 'HTML e CSS',
      teacher: 'Bruna Hamori'
    }
    await supertest(app).post(`/tests`).send(body2).set({authorization: 'Bearer ' + resultLogin.body.token});
    const body3 = {
      name: 'projetasso',
      pdfUrl: 'https://www.africau.edu/images/default/sample.pdf',
      category: 'Projeto',
      discipline: 'HTML e CSS',
      teacher: 'Bruna Hamori'
    }
    await supertest(app).post(`/tests`).send(body3).set({authorization: 'Bearer ' + resultLogin.body.token});

    const result = await supertest(app).get(`/tests/byTeacher`).set({authorization:resultLogin.body.token});
    
    expect(result.status).toBe(401);
  });
});

