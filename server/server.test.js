const request = require('supertest');
const app = require('./server');
describe('POST /email', () => {
    test('returns an error if company domain not found or email format unknown', async () => {
        const res = await request(app)
            .post('/email')
            .send({
                fullName: 'John Doe',
                domainName: 'unknown.com'
            });
        console.log(res)
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Company domain not found or email format unknown');
    });

    test('returns a valid email address with firstname_lastname format', async () => {
        const res = await request(app)
            .post('/email')
            .send({
                fullName: 'John Doe',
                domainName: 'google.com'
            });
        expect(res.status).toBe(200);
        expect(res.body.email).toMatch(/^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,}$/);
    });

    test('returns a valid email address with initial format', async () => {
        const res = await request(app)
            .post('/email')
            .send({
                fullName: 'John Doe',
                domainName: 'babbel.com'
            });
        expect(res.status).toBe(200);
        expect(res.body.email).toMatch(/^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,}$/);
    });
});
