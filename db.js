async function connect(){
        if(global.connection && global.connection.state !== 'disconnected')
                        return global.connection;

        const mysql = require("mysql2/promise");
        const connection = await mysql.createConnection("Censored :D");
        console.log("Conectou no MySQL!");
        global.connection = connection;
        return connection;
}

async function insertPatient(patient){
        const conn = await connect();
        const query = `INSERT INTO patient (name, bestcontact, address, email, telephone, vaccine, dose, schedule, innoculation) VALUES ("${patient.name}", ${patient.bestcontact}, "${patient.address}", "${patient.email}", "${patient.telephone}","${patient.vaccine}", ${patient.dose}, "${patient.schedule}", "${patient.innoculation}");`;
        console.log(query);
        await conn.query(query);
}

async function selectPatient(identifier, value){
        const conn = await connect();
        let query;
        if (identifier == 0){
                query = `SELECT * FROM patient;`
        } else{
                query = `SELECT * FROM patient WHERE ${identifier}="${value}";`;
        }
        console.log(query);
        const list = await conn.query(query);
        return list[0];
}
async function updatePatient(id, identifier, newValue){
        const conn = await connect();
        const query = `UPDATE patient SET ${identifier}="${newValue}" WHERE id=${id};`;
        console.log(query);
        await conn.query(query);
}

async function deletePatient(identifier, value){
        const conn = await connect();
        const query = `DELETE FROM patient WHERE ${identifier}="${value}";`;
        console.log(query);
        await conn.query(query);
}

async function insertVaccine(vaccine){
        const conn = await connect();
        const {nome, data, lote} = vaccine;
        const query = `INSERT INTO vacinas (nome, data, lote) VALUES ("${nome}", "${data}", "${lote}");`
        console.log(query);
        await conn.query(query);
}

async function selectVaccine(identifier, value){
        const conn = await connect();
        let query;
        if(identifier == 0) {
                query = `SELECT * FROM vacinas;`
        } else {
                query = `SELECT * FROM vacinas WHERE ${identifier}="${value}";`
        }
        console.log(query);
        const [rows] = await conn.query(query);
        return rows;
}

async function updateVaccine(id, identifier, newValue){
        const conn = await connect();
        const query = `UPDATE vacinas
        SET ${identifier}="${newValue}"
        WHERE id=${id};`
        console.log(query);
        await conn.query(query);
}

async function deleteVaccine(identifier, value){
        const conn = await connect();
        const query = `DELETE FROM vacinas WHERE ${identifier}="${value}";`
        console.log(query);
        await conn.query(query);
}

module.exports = {insertPatient, deletePatient, selectPatient, updatePatient, insertVaccine, selectVaccine, updateVaccine, deleteVaccine};
