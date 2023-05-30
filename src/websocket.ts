import { io, serverHttp } from "./http";
import Users from './modules/user'


io.on("connection", socket => {
    console.log(socket.id)
    socket.on("hello", (msg) => {
        console.log(msg)
    })
})

