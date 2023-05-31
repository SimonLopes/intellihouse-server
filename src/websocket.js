const { io, serverHttp } = require("./http.js")
const Users = require('./modules/user.js')


io.on("connection", socket => {
    console.log(socket.id)
    socket.on("hello", (msg) => {
        console.log(msg)
    })
})

