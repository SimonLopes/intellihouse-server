const { serverHttp } = require("./http.js")

require("./websocket.js")

serverHttp.listen(process.env.PORT || 3001, () => console.log("Server is runing"))