import prisma from "../src/database/database";
import supertest from 'supertest';
import app from "../src/index";
import { faker } from '@faker-js/faker';

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE "Users";`;
});


afterAll(async () => {
  await prisma.$disconnect();
});



describe('Test POST /register',()=>{
  it('Should return status 201 and the new user created when everything go well',async()=>{
    const body = {
      email: 'jojo@email.com',
      password: 'xablau',
      confirmPassword: 'xablau'
    }
    const result =  await supertest(app).post(`/register`).send(body);
    expect(result.status).toBe(201);
    expect(result.body).toMatchObject({email:body.email,password:result.body.password});
  });

  it('Should return status 422 when the body of the request is invalid (invalid email)',async()=>{
    const body = {
      email: 'jojoemail.com',
      password: 'xablau',
      confirmPassword: 'xablau'
    }
    const result =  await supertest(app).post(`/register`).send(body);
    expect(result.status).toBe(422);
  });
  it('Should return status 422 when the body of the request is invalid (invalid password)',async()=>{
    const body = {
      email: 'jojo@email.com',
      password: 1,
      confirmPassword: 1
    }
    const result =  await supertest(app).post(`/register`).send(body);
    expect(result.status).toBe(422);
  });
  it('Should return status 400 when the passwords of the body are not the same',async()=>{
    const body = {
      email: 'jojo@email.com',
      password: 'xablau',
      confirmPassword: 'xabla'
    }
    const result =  await supertest(app).post(`/register`).send(body);
    expect(result.status).toBe(400);
  });
  it('Should return status 409 if the email sent by the body were already been used',async()=>{
    const body = {
      email: 'jojo@email.com',
      password: 'xablau',
      confirmPassword: 'xablau'
    }
    await supertest(app).post(`/register`).send(body);
    const result =  await supertest(app).post(`/register`).send(body);
    expect(result.status).toBe(409);
  });
});


describe('Test POST /login',()=>{
  it('Should return status 200 and the new token generated when everything go well',async()=>{
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
    const result =  await supertest(app).post(`/login`).send(body);
    expect(result.status).toBe(200);
    console.log(result.body);
    expect(result.body).toBeInstanceOf(Object);
  });
  it('Should return status 422 when the body of the request is invalid',async()=>{
    const body = {
      email: 'jojo@email.com'
    }
    const result =  await supertest(app).post(`/login`).send(body);
    expect(result.status).toBe(422);
  });
  it('Should return status 404 when the requested user does not exist',async()=>{
    const body = {
      email: 'jojo@email.com',
      password: 'xablau'
    }
    const result =  await supertest(app).post(`/login`).send(body);
    expect(result.status).toBe(404);
  });
  it('Should return status 401 when the informed password is wrong',async()=>{
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
    const result =  await supertest(app).post(`/login`).send(body);
    expect(result.status).toBe(401);
  });
});


// tests about tests