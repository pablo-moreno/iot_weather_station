const Hapi = require('hapi');
const server = new Hapi.Server();
const DEBUG = true;
const DB = require('./db');
const clientIO = require('socket.io-client')('http://localhost:7890');

let db = new DB();

server.connection({
    host: '0.0.0.0',
    port: 7890
});

let io = require('socket.io')(server.listener);

// Static files
server.register(require('inert'), (err) => {
    server.route({
        method: 'GET',
        path: '/',
        handler: (request, reply) => {
            return reply.file('./public/index.html');
        }
    });

    server.route({
        method: 'GET',
        path: '/static/{param*}',
        handler: {
            directory: {
                path: './public/static/'
            }
        }
    });
});

// Server routes
server.route({
    method: 'POST',
    path: '/measure/',
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
            clientIO.emit('postMeasure', data);
            reply({
                status: ok
            })
        })
        .catch((err) => {
            reply({
                status: err
            })
        })
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
        db.get(limit = 100, skip = 0).then((data) => {
            reply(data)
        })
        .catch((err) => {
            reply({
                error: err
            })
        })
    }
})

// SocketIO
io.on('connection', (socket) => {
    console.log('Connection received');

    socket.on('postMeasure', (data) => {
        console.log('Post measure', data);
        io.sockets.emit('postMeasure', data);
    })

    socket.on('disconnect', (data) => {
        console.log('disconnected')
    })
});

// Start server
server.start((err) => {
    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);

    // Register socket.io client event
    clientIO.on('postMeasure', (data) => {
        console.log('receiving', data);
    });
});