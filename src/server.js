const { serverHttp } = require("./http.js")

require("./websocket.js")

serverHttp.listen(3001, () => console.log("Server is runing"))