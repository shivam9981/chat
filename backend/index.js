const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const app = express()
const cors = require('cors')

const server = http.createServer(app);
const port = 4500;
app.use(cors())


app.get('/',(req,res)=>{
    res.send("app connected")
})

const io =  socketIO(server, {
    cors:{
        origin:"http://localhost:3000",
        methods: ["GET","POST"],
    }
});

io.on("connection", (socket)=>{  
    console.log(`socket was connected ${socket.id}`)

    socket.on('join_room', (room)=>{
        socket.join(room);
    })

    socket.on('send_message',(data)=>{
        console.log(data)
        socket.to(data.rooms).emit("receive_message",data)
    })
})

server.listen(port, ()=>{
    console.log(`server was connected ${port}`)
})