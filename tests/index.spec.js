import app from "../src/app";
import request from 'supertest';

describe('exists GET /tasks', () => {

    // should respond with a 404 status code
    test('should respond with a 404 status code', async () => {
        const response = await request(app).get('/tasks').send();
        expect(response.status).toBe(404)
    })
})

describe('exists GET /', () => {

    // should respond with a 200 status code
    test('should respond with a 200 status code', async () => {
        const response = await request(app).get('/').send();
        expect(response.status).toBe(200);
    });
    
    //should respond with and array
    test('should respond with a JSON', async () => {
        const response = await request(app).get('/').send();
        expect(response.body).toBeInstanceOf(Object);
    });

    //should respond with 3 users
    test('should respond with 3 users', async () => {
        const response = await request(app).get('/').send();
        expect(response.body.length).toBe(3);
    });

    //should respond with any user
    test('should respond with any user', async () => {
        const response = await request(app).get('/').send();
        expect(response.body.length).toBeGreaterThanOrEqual(1);
    });
})

describe('exists GET /stack', () => {

    //should respond with a 200 status code
    test('should respond with a 200 status code', async () => {
        const response = await request(app).get('/stack=html').send();
        expect(response.status).toBe(200);
    });
    
    //should respond with and array
    test('should respond with a JSON', async () => {
        const response = await request(app).get('/stack=html').send();
        expect(response.body).toBeInstanceOf(Object);
    });

    test('should respond with 1', async () => {
        const response = await request(app).get('/stack=html').send();
        expect(response.body.id).toBe(1);
    });

    test('should respond with undefined', async () => {
        const response = await request(app).get('/stack=pearl').send();
        expect(response.body.id).toBe(undefined);
    });
})

describe('exists GET /id',  () => {
    //should respond with a 200 status code
    test('should respond with a 200 status code', async () => {
        const response = await request(app).get('/id=1').send();
        expect(response.status).toBe(200);
    });
    
    //should respond with and array
    test('should respond with a JSON', async () => {
        const response = await request(app).get('/id=1').send();
        expect(response.body).toBeInstanceOf(Object);
    });

    //should respond with username david
    test('should respond with user test david', async () => {
        var estimatedUser = "david";
        const response = await request(app).get('/id=1').send();
        expect(response.body.user).toBe(estimatedUser);
    });

    //should respond with stacks length = 6
    test('should respond with stacks length equals to 6', async () => {
        const response = await request(app).get('/id=1').send();
        expect(response.body.stacks.length).toBe(6);
    });

    // should respond with stack equals to nodejs
    test('should respond with stacks equals to nodejs', async () => {
        const response = await request(app).get('/id=1').send();
        expect(response.body.stacks[4]).toBe("nodejs");
    });

    // should response with stacks
    const random = Math.floor(Math.random() * 3 + 1);
    test('should respond with stacks on every user id = ' + random , async () => {
        const response = await request(app).get('/id=' + random).send();
        expect(response.body.stacks.length).toBeGreaterThan(1);
    });


    //check online status
    test('should respond with online is true ' , async () => {
        const response = await request(app).get('/id=1').send();
        expect(response.body.online).toBe(true);
    });

    //check response  of user 0
    test('should check if user 0 exists' , async () => {
        const response = await request(app).get('/id=0').send();
        expect(response.body.id).not.toBe(0);
    });

    // check every username gives a correct value of id (integer)
    test('should check if user id is numeric' , async () => {
        const response = await request(app).get('/id=' + random).send();
        expect(response.body.id).not.toBeNaN();
    });
   


})

describe('exists GET /connections',  () => {

    //should respond with 1
    test('should check first connection value is 1', async () => {
        const response = await request(app).get('/connections').send();
        expect(response.body).toBe(1);
    });
    //should respond with a 200 status code
    test('should respond with a 200 status code', async () => {
        const response = await request(app).get('/connections').send();
        expect(response.status).toBe(200);
    });
    

    //should respond with numeric value of connections
    test('should check connections returned is a number', async () => {
        const response = await request(app).get('/connections').send();
        expect(response.body).not.toBeNaN();
    });



})