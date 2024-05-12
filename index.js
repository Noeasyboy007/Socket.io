const express = require('express')

const app = express();

const http = require('http');

const colors = require('colors')

const path = require('path')

const { Server } = require("socket.io");
const { Socket } = require('engine.io');

const server = http.createServer(app);

const io = new Server(server)

const PORT = 8080;

app.use(express.static(path.resolve("./public")))

//Socket.io
io.on('connection', (client) => {
    console.log('a new user connected', client.id);

    client.on("user-message", (message) => {
        io.emit('message', message)
    })

    client.on('disconnect', () => {
        console.log('user disconnected');
    });
});


app.get('/', (req, res) => {
    return res.sendFile("/public/index.html")
})

server.listen(PORT, () => { console.log(`Server startred at PORT: ${PORT}`.bgBlue.white) })