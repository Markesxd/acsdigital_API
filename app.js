const express = require('express');
const db = require('./db');
const cors = require('cors');

const app = express();
const port = 80;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
          res.send('Hello World!' + process.version);
});

app.post('/paciente', async (req, res) => {
        const paciente = req.body;
        await db.insertPatient(paciente);
        res.send(paciente);
});

app.post('/paciente/deletar', async (req, res) => {
        const {identificador, valor} = req.body;
        await db.deletePatient(identificador, valor);
        res.json({message: 'operação realizada com sucesso'});
});

app.get('/paciente/recuperar/:identificador', async (req, res) => {
        const {identificador} = req.params;
        const {valor} = req.query;
        const paciente = await db.selectPatient(identificador, valor);
        res.json(paciente);
});

app.post('/paciente/alterar/:id', async (req, res) => {
        const {id} = req.params;
        const {identificador, novoValor} = req.body;
        await db.updatePatient(id, identificador, novoValor);
        res.json({message: 'operação realizada com sucesso'});
});

app.post('/vacina', async (req, res) => {
        const vacina = req.body;
        await db.insertVaccine(vacina);
        res.json(vacina);
});

app.get('/vacina/recuperar/:identificador', async (req, res) => {
        const {identificador} = req.params;
        const {valor} = req.query;
        const vacina = await db.selectVaccine(identificador, valor);
        res.json(vacina);
});

app.post('/vacina/alterar/:id', async (req, res) => {
        const {id} = req.params;
        const {identificador, novoValor} = req.body;
        await db.updateVaccine(id, identificador, novoValor);
        res.json({message: "operação realizada com sucesso"});
});

app.post('/vacina/deletar', async (req, res) => {
        const {identificador, valor} = req.body;
        await db.deleteVaccine(identificador, valor);
        res.json({message: "operação realizada com sucesso"});
});

app.listen(port, () => {console.log('App running')});
