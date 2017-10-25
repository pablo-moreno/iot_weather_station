import openSocket from 'socket.io-client';
import { BASE_URL } from '../config';
const socket = openSocket(BASE_URL);

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
