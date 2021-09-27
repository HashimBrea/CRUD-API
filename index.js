const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require('cors');

const port = process.env.port || 3500;

const app = express();

app.use(express.json()); 

app.listen(port, ()=> console.log(`Servidor: ${port}`));


app.use(cors());

//Conexión BD

const conexionmsql = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'',
    database: 'nodeapp'
});

//Primer Endpoint

app.get('/', (req, res) => {
    res.send('Bienvenido al API.');
  });
  
  //Mostrar todos los clientes

  app.get('/clientes', (req, res) => {
    const sql = 'SELECT * FROM clientes';
  
    conexionmsql.query(sql, (error, resultado) => {
      if (error) throw error;
      if (resultado.length > 0) {
        res.json(resultado);
      } else {
        res.send('Sin resultado');
      }
    });
  });

  //Mostrar un cliente
  
  app.get('/clientes/:id', (req, res) => {
    const { id } = req.params;
    const sql = `SELECT * FROM clientes WHERE id = ${id}`;
    conexionmsql.query(sql, (error, resultado) => {
      if (error) throw error;
  
      if (resultado.length > 0) {
        res.json(resultado);
      } else {
        res.send('Sin resultado');
      }
    });
  });
  
  //Agregar cliente

  app.post('/agregar', (req, res) => {
    const sql = 'INSERT INTO clientes SET ?';
  
    const clienteObj = {
      id: req.body.id,
      nombre: req.body.nombre,
      apellidos: req.body.apellidos,
      edad: req.body.edad
    };
    conexionmsql.query(sql, clienteObj, error => {
      if (error) throw error;
      res.send('Cliente creado');
    });

  });

  //Editar cliente
  
  app.put('/clientes/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, apellidos, edad } = req.body;
    const sql = `UPDATE clientes SET nombre = '${nombre}', apellidos='${apellidos}', edad='${edad}' WHERE id =${id}`;
  
    conexionmsql.query(sql, error => {
      if (error) throw error;
      res.send('Cliente updated!');
    });
  });
  
  
  //Eliminar cliente


  app.delete('/eliminar/:id', (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM clientes WHERE id= ${id}`;
  
    conexionmsql.query(sql, error => {
      if (error) throw error;
      res.send('Cliente deleted');
    });
  });


   //Eliminar todos los clientes

  app.delete('/clientes', (req, res) => {
    const { id } = req.params;
    const sql = `TRUNCATE TABLE clientes`;
  
    conexionmsql.query(sql, error => {
      if (error) throw error;
      res.send('Clientes eliminados');
    });
  });

 
  //Ordenar clientes ascendente

  app.get('/clientesasc', (req, res) => {
    const sql = 'SELECT * FROM clientes ORDER BY nombre ASC';
  
    conexionmsql.query(sql, (error, resultado) => {
      if (error) throw error;
      if (resultado.length > 0) {
        res.json(resultado);
      } else {
        res.send('Sin resultado');
      }
    });
  });

  //Ordenar clientes descendente

  app.get('/clientesdesc', (req, res) => {
    const sql = 'SELECT * FROM clientes ORDER BY nombre DESC';
  
    conexionmsql.query(sql, (error, resultado) => {
      if (error) throw error;
      if (resultado.length > 0) {
        res.json(resultado);
      } else {
        res.send('Sin resultado');
      }
    });
  });

  //Ordenar clientes edad asc

  app.get('/clientesedadasc', (req, res) => {
    const sql = 'SELECT * FROM clientes ORDER BY edad ASC';
  
    conexionmsql.query(sql, (error, resultado) => {
      if (error) throw error;
      if (resultado.length > 0) {
        res.json(resultado);
      } else {
        res.send('Sin resultado');
      }
    });
  });


  //Ordenar clientes edad desc

  app.get('/clientesedaddesc', (req, res) => {
    const sql = 'SELECT * FROM clientes ORDER BY edad DESC';
  
    conexionmsql.query(sql, (error, resultado) => {
      if (error) throw error;
      if (resultado.length > 0) {
        res.json(resultado);
      } else {
        res.send('Sin resultado');
      }
    });
  });


//Prueba conexión

conexionmsql.connect(error => {
    if (error) throw error;
    console.log("Conectado a la base de datos.");
  });




