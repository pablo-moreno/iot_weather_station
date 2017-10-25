import openSocket from 'socket.io-client';
const socket = openSocket('http://0.0.0.0:7890');

let emit = (data) => {
    console.log('emitting', data)
    socket.emit('postMeasure', data)
}

let onPostMeasure = (err, callback) => {
    socket.on('postMeasure', (data) => {
        if (err) {
            console.log('Error:', err)
        }
        callback(data)
    })
}

export { onPostMeasure, emit };
