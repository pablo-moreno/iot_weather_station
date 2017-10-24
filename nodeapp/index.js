const Hapi = require('hapi');
const server = new Hapi.Server();
const DEBUG = true;
const DB = require('./db');

let db = new DB();

server.connection({ 
    host: '0.0.0.0',
    port: 7890
});

server.register(require('inert'), (err) => {
    server.route({
        method: 'POST',
        path: '/measure',
        config: {
            cors: {
                origin: ['*'],
                credentials: true
            }
        },
        handler: (request, reply) => {
            let data = request.payload;
            data.date = new Date();
            db.post(data).then((ok) => {
                reply({status: ok})
            })
            .catch((err) => {
                reply({status: err})
            })
        }
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, reply) => {
            return reply.file('./public/index.html');
        }
    });
    
    /*
    server.route({
        method: 'GET',
        path: '/manifest.json',
        handler: (request, reply) => {
            return reply.file('./public/manifest.json');
        }
    });

    server.route({
        method: 'GET',
        path: '/favicon.ico',
        handler: (request, reply) => {
            return reply.file('./public/favicon.ico');
        }
    });

    server.route({
        method: 'GET',
        path: '/service-worker.js',
        handler: (request, reply) => {
            return reply.file('./public/service-worker.js');
        }
    });
    */

    server.route({
        method: 'GET',
        path: '/static/{param*}',
        handler: {
            directory: {
                path: './public/static/'
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/measures/',
        config: {
            cors: {
                origin: ['*'],
                credentials: true
            }
        },
        handler: (request, reply) => {
            db.get(20).then((data) => {
                reply(data)
            })
            .catch((err) => {
                reply({
                    error: err
                })
            })
        }
    })

    server.start((err) => {
        if (err) {
            throw err;
        }
        console.log('Server running at:', server.info.uri);
    });
});

