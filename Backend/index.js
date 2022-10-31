require('dotenv').config()
const mysql = require("./functions/mysql")
const express = require('express');
const cors = require('cors')

const app = express();
const port = 3001;

app.use(express.json())
app.use(cors())

app.post('/create', (req, res) => {
    if (req.body.key) {
        const nome = req.body?.nome
        const data = req.body?.data
        const status = req.body?.status

        if (nome == null || data == null || status == null) {
            res.send("Check the request body")
        } else {
            mysql.query(`INSERT INTO tarefas (nome, data, status) VALUES(?,?,?)`, [nome, data, status]).then((result) => {
                res.json(result)
            })
        }
    } else {
        res.json({})
    }
})

app.post('/read', (req, res) => {

    if (req.body?.key === 'key123') {
        mysql.query("SELECT * FROM tarefas").then((result) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
            res.json(result)
        })
    } else {
        res.json({})
    }
})

app.put('/update', (req, res) => {
    if (req.body.key) {
        const id = req.body?.id
        const nome = req.body?.nome
        const data = req.body?.data
        const status = req.body?.status

        if (id == null || nome == null || data == null || status == null) {
            res.send("You must provide all the required values")
        } else {
            mysql.query(`UPDATE tarefas SET nome = ?, data = ?, status = ? WHERE id = ?`, [nome, data, status, id]).then((result) => {
                res.json(result)
            })
        }
    } else {
        res.json({})
    }
})

app.post('/delete', (req, res) => {
    if (req.body.key == 'key123') {
        if (req.body.id == null) {
            res.json("You need to provide the id from task")
        } else {
            mysql.query('DELETE FROM tarefas WHERE id = ?', [req.body.id]).then((result) => {
                res.json(result)
            });
        }
    } else {
        res.json({})
    }
})

app.listen(port);