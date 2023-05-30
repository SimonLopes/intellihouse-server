import express, { response } from "express";
import cors from "cors"
import http from "http"
import { Server } from "socket.io"
import path from "path"

import requestSimule from './configs/requestSimule'

import Host from "./modules/host"
import User from "./modules/user"

const app = express();

app.use(cors())

app.use(express.json())


///////////USERS
app.post("/Auth", async (req, res) => {
    const response = await User.Auth(req.body)
    res.send(response)

})
app.post("/CreateUser", async (req, res) => {
    const response = await User.CreateUser(req.body)
    res.send(response)

})
app.post("/ReadUser", async (req, res) => {
    const response = await User.ReadUser(req.body)
    res.send(response)

})
app.post("/UpdateUser", async (req, res) => {
    const response = await User.UpdateUser(req.body)
    res.send(response)

})
app.post("/DeleteUser", async (req, res) => {
    const response = await User.DeleteUser(req.body)
    res.send(response)

})

/////////////HOSTS
app.post("/CreateHost", async (req, res) => {
    const response = await Host.CreateHost(req.body)
    res.send(response)

})
app.post("/ReadHost", async (req, res) => {
    const response = await Host.ReadHost(req.body)
    res.send(response)

})
app.post("/UpdateHost", async (req, res) => {
    const response = await Host.UpdateHost(req.body)
    res.send(response)

})
app.post("/DeleteHost", async (req, res) => {
    const response = await Host.DeleteHost(req.body)
    res.send(response)

})





app.use(express.static(path.join(__dirname, "..", "public")))

const serverHttp = http.createServer(app)

const io = new Server(serverHttp)

export { serverHttp, io }