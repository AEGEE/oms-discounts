const { startServer, stopServer } = require('../../lib/server.js');
const { request } = require('../scripts/helpers');
const generator = require('../scripts/generator');
const mock = require('../scripts/mock');

describe('Metrics requests', () => {
    beforeEach(async () => {
        mock.mockAll();
        await startServer();
    });

    afterEach(async () => {
        await stopServer();
        mock.cleanAll();
    });

    test('should return data correctly', async () => {
        await generator.createCategory({});

        const integration = await generator.createIntegration({});
        await generator.createCode({ claimed_by: null }, integration);
        await generator.createCode({ claimed_by: 1337 }, integration);

        const res = await request({
            uri: '/metrics',
            method: 'GET',
            json: false
        });

        console.log(res.body)
        expect(res.statusCode).toEqual(200);
    });
});
