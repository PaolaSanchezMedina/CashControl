const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  next();
});
app.use(bodyParser.json());

const PUERTO = 3000;

const conexion = mysql.createConnection({
  host: "localhost",
  database: "cashcontrol",
  user: "root",
  password: "1234",
});

app.listen(PUERTO, () => {
  console.log(`Servidor corriendo en el puerto: ${PUERTO}`);
});

conexion.connect((error) => {
  if (error) throw error;
  console.log("Conexión exitosa a la base de datos");
});

app.get("/", (req, res) => {
  res.send("API");
});

const jwt = require("jsonwebtoken");

// Ruta para que un usuario inicie sesión
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Consulta para buscar al usuario en la base de datos por nombre de usuario y contraseña
  const query = "SELECT * FROM usuarios WHERE username = ? AND password = ?";
  conexion.query(query, [username, password], (error, resultados) => {
    if (error) {
      return res.status(500).json({ error: "Error en la base de datos" });
    }

    // Si no se encuentra ningún usuario con las credenciales proporcionadas
    if (resultados.length === 0) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    // Usuario encontrado, se puede iniciar sesión
    // Obtener el ID del usuario de la base de datos
    const user = resultados[0];
    const userID = user.UserID; // Ajusta el nombre del campo de ID de usuario si es diferente

    // Generar un token JWT con la información del usuario
    const token = jwt.sign({ userId: userID }, "tu_secreto_secreto", {
      expiresIn: "1h",
    });

    console.log("Token generado:", token); // Agregar registro para verificar el token
    console.log("ID de usuario:", userID); // Agregar registro para verificar el ID del usuario

    // Enviar el token y la información del usuario al cliente
    res.json({
      message: "Inicio de sesión exitoso",
      token: token,
      userID: userID,
    });
  });
});

// Ruta para crear un nuevo usuario
app.post("/users", (req, res) => {
  const { username, email, password } = req.body;

  // Consulta para verificar si el nombre de usuario o correo electrónico ya existen
  const checkUserQuery =
    "SELECT * FROM usuarios WHERE username = ? OR email = ?";
  conexion.query(checkUserQuery, [username, email], (error, resultados) => {
    if (error) {
      return res.status(500).json({ error: "Error al verificar usuario" });
    }

    // Verificar si ya existe un usuario con ese nombre de usuario o correo electrónico
    if (resultados.length > 0) {
      console.log("El usuario ya existe");
      return res.status(400).json({ error: "El usuario ya existe" });
    }

    // Si no se encuentra ningún usuario, procede a crear uno nuevo
    const newUser = {
      username: username,
      email: email,
      password: password,
    };

    const insertUserQuery = "INSERT INTO usuarios SET ?";
    conexion.query(insertUserQuery, newUser, (error, resultado) => {
      if (error) {
        return res.status(500).json({ error: "Error al crear el usuario" });
      }

      const query =
        "SELECT * FROM usuarios WHERE username = ? AND password = ?";
      conexion.query(query, [username, password], (error, resultados) => {
        if (error) {
          return res.status(500).json({ error: "Error en la base de datos" });
        }
        const user = resultados[0];
        const userID = user.UserID; // Ajusta el nombre del campo de ID de usuario si es diferente

        // Generar un token JWT con la información del usuario
        const token = jwt.sign({ userId: userID }, "tu_secreto_secreto", {
          expiresIn: "1h",
        });

        console.log("Token generado:", token); // Agregar registro para verificar el token
        console.log("ID de usuario:", userID); // Agregar registro para verificar el ID del usuario

        // Enviar el token y la información del usuario al cliente
        res.json({
          message: "Inicio de sesión exitoso",
          token: token,
          userID: userID,
        });
      });
    });
  });
});

// Ruta para obtener un usuario específico por su ID
app.get("/users/:userID", (req, res) => {
  const { userID } = req.params;
  const query = `SELECT * FROM users WHERE userID='${userID}'`;
  conexion.query(query, (error, resultado) => {
    if (error) return console.error(error.message);
    if (resultado.length > 0) {
      res.json(resultado[0]);
    } else {
      res.json("Usuario no encontrado");
    }
  });
});

// Ruta para obtener todos los usuarios
app.get("/users", (req, res) => {
  const query = "SELECT * FROM users";
  conexion.query(query, (error, resultado) => {
    if (error) return console.error(error.message);
    if (resultado.length > 0) {
      res.json(resultado);
    } else {
      res.json("No hay registros de usuarios");
    }
  });
});

// Ruta para actualizar un usuario por su ID
app.put("/users/:userID", (req, res) => {
  const { userID } = req.params;
  const updatedUser = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };

  const query = `UPDATE users SET ? WHERE userID='${userID}'`;
  conexion.query(query, updatedUser, (error, resultado) => {
    if (error) return console.error(error.message);
    res.json("Usuario actualizado exitosamente");
  });
});

// Ruta para eliminar un usuario por su ID
app.delete("/users/:userID", (req, res) => {
  const { userID } = req.params;
  const query = `DELETE FROM users WHERE userID='${userID}'`;
  conexion.query(query, (error, resultado) => {
    if (error) return console.error(error.message);
    res.json("Usuario eliminado exitosamente");
  });
});

//TRANSACCIONES----------------------
// Ruta para crear una nueva transacción (en tu archivo Node.js)
app.post("/transactions", (req, res) => {
  const transaction = {
    userID: req.body.userID,
    transactionDate: req.body.transactionDate,
    transactionType: req.body.transactionType,
    amount: req.body.amount,
    description: req.body.description,
    category: req.body.category,
    paymentMethod: req.body.paymentMethod,
  };

  const query = "INSERT INTO transacciones SET ?";
  conexion.query(query, transaction, (error, resultado) => {
    if (error) {
      return res.status(500).json({ error: "Error al crear la transacción" });
    }
    res.json("Transacción creada exitosamente");
  });
});

// Ruta para obtener transacciones filtradas por tipo
app.get('/transactions', (req, res) => {
  const { type, userId } = req.query;

  if (!type || !userId) {
    return res.status(400).json({ error: 'Faltan parámetros en la solicitud' });
  }

  const query = 'SELECT * FROM transacciones WHERE TransactionType = ? AND UserID = ?';
  conexion.query(query, [type, userId], (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Error al obtener transacciones' });
    }

    res.json(results);
  });
});


// Ruta para obtener una transacción por su ID
app.get("/transactions/:transactionID", (req, res) => {
  const { transactionID } = req.params;
  const query = `SELECT * FROM transactions WHERE transactionID=${transactionID}`;
  conexion.query(query, (error, resultado) => {
    if (error) return console.error(error.message);
    if (resultado.length > 0) {
      res.json(resultado[0]);
    } else {
      res.json("Transacción no encontrada");
    }
  });
});

// Ruta para actualizar una transacción por su ID
app.put("/transactions/:transactionID", (req, res) => {
  const { transactionID } = req.params;
  const updatedTransaction = {
    userID: req.body.userID,
    transactionDate: req.body.transactionDate,
    transactionType: req.body.transactionType,
    amount: req.body.amount,
    description: req.body.description,
    category: req.body.category,
    paymentMethod: req.body.paymentMethod,
  };

  const query = `UPDATE transactions SET ? WHERE transactionID=${transactionID}`;
  conexion.query(query, updatedTransaction, (error, resultado) => {
    if (error) return console.error(error.message);
    res.json("Transacción actualizada exitosamente");
  });
});

// Ruta para eliminar una transacción por su ID
app.delete("/transactions/:transactionID", (req, res) => {
  const { transactionID } = req.params;
  const query = `DELETE FROM transactions WHERE transactionID=${transactionID}`;
  conexion.query(query, (error, resultado) => {
    if (error) return console.error(error.message);
    res.json("Transacción eliminada exitosamente");
  });
});

//CATEGORIES---------------------
// Ruta para obtener todas las categorías
app.get("/categories", (req, res) => {
  const query = "SELECT * FROM categories";
  conexion.query(query, (error, resultado) => {
    if (error) return console.error(error.message);
    if (resultado.length > 0) {
      res.json(resultado);
    } else {
      res.json("No hay categorías disponibles");
    }
  });
});

// Ruta para crear una nueva categoría
app.post("/categories", (req, res) => {
  const category = {
    categoryID: req.body.categoryID,
    categoryName: req.body.categoryName,
    categoryIcon: req.body.categoryIcon,
  };
  const query = "INSERT INTO categories SET ?";
  conexion.query(query, category, (error, resultado) => {
    if (error) return console.error(error.message);
    res.json("Categoría creada exitosamente");
  });
});

// Ruta para obtener una categoría por su ID
app.get("/categories/:categoryID", (req, res) => {
  const { categoryID } = req.params;
  const query = `SELECT * FROM categories WHERE categoryID='${categoryID}'`;
  conexion.query(query, (error, resultado) => {
    if (error) return console.error(error.message);
    if (resultado.length > 0) {
      res.json(resultado[0]);
    } else {
      res.json("Categoría no encontrada");
    }
  });
});

// Ruta para actualizar una categoría por su ID
app.put("/categories/:categoryID", (req, res) => {
  const { categoryID } = req.params;
  const updatedCategory = {
    categoryName: req.body.categoryName,
    categoryIcon: req.body.categoryIcon,
  };

  const query = `UPDATE categories SET ? WHERE categoryID='${categoryID}'`;
  conexion.query(query, updatedCategory, (error, resultado) => {
    if (error) return console.error(error.message);
    res.json("Categoría actualizada exitosamente");
  });
});

// Ruta para eliminar una categoría por su ID
app.delete("/categories/:categoryID", (req, res) => {
  const { categoryID } = req.params;
  const query = `DELETE FROM categories WHERE categoryID='${categoryID}'`;
  conexion.query(query, (error, resultado) => {
    if (error) return console.error(error.message);
    res.json("Categoría eliminada exitosamente");
  });
});

//SUMMARIES-------------
// Ruta para obtener un resumen financiero específico por su ID
app.get("/summary/:summaryID", (req, res) => {
  const { summaryID } = req.params;
  const query = `SELECT * FROM summary WHERE summaryID='${summaryID}'`;
  conexion.query(query, (error, resultado) => {
    if (error) return console.error(error.message);
    if (resultado.length > 0) {
      res.json(resultado[0]);
    } else {
      res.json("Resumen financiero no encontrado");
    }
  });
});

// Ruta para obtener el resumen financiero de un usuario específico
app.get("/summary/user/:userID", (req, res) => {
  const { userID } = req.params;
  const query = `SELECT * FROM summary WHERE userID='${userID}'`;
  conexion.query(query, (error, resultado) => {
    if (error) return console.error(error.message);
    if (resultado.length > 0) {
      res.json(resultado);
    } else {
      res.json("No se encontró un resumen financiero para este usuario");
    }
  });
});

// Ruta para crear un nuevo resumen financiero
app.post("/summary", (req, res) => {
  const newSummary = {
    userID: req.body.userID,
    totalBalance: req.body.totalBalance,
    totalExpenses: req.body.totalExpenses,
    summaryDate: req.body.summaryDate,
  };
  const query = "INSERT INTO summary SET ?";
  conexion.query(query, newSummary, (error, resultado) => {
    if (error) return console.error(error.message);
    res.json("Resumen financiero creado exitosamente");
  });
});

// Ruta para actualizar un resumen financiero por su ID
app.put("/summary/:summaryID", (req, res) => {
  const { summaryID } = req.params;
  const updatedSummary = {
    totalBalance: req.body.totalBalance,
    totalExpenses: req.body.totalExpenses,
    summaryDate: req.body.summaryDate,
  };

  const query = `UPDATE summary SET ? WHERE summaryID='${summaryID}'`;
  conexion.query(query, updatedSummary, (error, resultado) => {
    if (error) return console.error(error.message);
    res.json("Resumen financiero actualizado exitosamente");
  });
});

// Ruta para eliminar un resumen financiero por su ID
app.delete("/summary/:summaryID", (req, res) => {
  const { summaryID } = req.params;
  const query = `DELETE FROM summary WHERE summaryID='${summaryID}'`;
  conexion.query(query, (error, resultado) => {
    if (error) return console.error(error.message);
    res.json("Resumen financiero eliminado exitosamente");
  });
});

//BUDGETS------------------
// Ruta para crear un nuevo presupuesto
app.post("/budgets", (req, res) => {
  const newBudget = {
    userID: req.body.userID,
    category: req.body.category,
    budgetAmount: req.body.budgetAmount,
    spentAmount: req.body.spentAmount,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
  };
  const query = "INSERT INTO budgets SET ?";
  conexion.query(query, newBudget, (error, resultado) => {
    if (error) return console.error(error.message);
    res.json("Presupuesto creado exitosamente");
  });
});

// Ruta para obtener un presupuesto específico por su ID
app.get("/budgets/:budgetID", (req, res) => {
  const { budgetID } = req.params;
  const query = `SELECT * FROM budgets WHERE budgetID='${budgetID}'`;
  conexion.query(query, (error, resultado) => {
    if (error) return console.error(error.message);
    if (resultado.length > 0) {
      res.json(resultado[0]);
    } else {
      res.json("Presupuesto no encontrado");
    }
  });
});

// Ruta para obtener una lista de presupuestos de un usuario específico
app.get("/budgets/user/:userID", (req, res) => {
  const { userID } = req.params;
  const query = `SELECT * FROM budgets WHERE userID='${userID}'`;
  conexion.query(query, (error, resultado) => {
    if (error) return console.error(error.message);
    if (resultado.length > 0) {
      res.json(resultado);
    } else {
      res.json("No se encontraron presupuestos para este usuario");
    }
  });
});

// Ruta para actualizar un presupuesto por su ID
app.put("/budgets/:budgetID", (req, res) => {
  const { budgetID } = req.params;
  const updatedBudget = {
    category: req.body.category,
    budgetAmount: req.body.budgetAmount,
    spentAmount: req.body.spentAmount,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
  };

  const query = `UPDATE budgets SET ? WHERE budgetID='${budgetID}'`;
  conexion.query(query, updatedBudget, (error, resultado) => {
    if (error) return console.error(error.message);
    res.json("Presupuesto actualizado exitosamente");
  });
});

// Ruta para eliminar un presupuesto por su ID
app.delete("/budgets/:budgetID", (req, res) => {
  const { budgetID } = req.params;
  const query = `DELETE FROM budgets WHERE budgetID='${budgetID}'`;
  conexion.query(query, (error, resultado) => {
    if (error) return console.error(error.message);
    res.json("Presupuesto eliminado exitosamente");
  });
});

//GOALS----------
// Ruta para crear una nueva meta
app.post("/goals", (req, res) => {
  const newGoal = {
    userID: req.body.userID,
    goalName: req.body.goalName,
    goalAmount: req.body.goalAmount,
    savedAmount: req.body.savedAmount,
  };
  const query = "INSERT INTO goals SET ?";
  conexion.query(query, newGoal, (error, resultado) => {
    if (error) return console.error(error.message);
    res.json("Meta creada exitosamente");
  });
});

// Ruta para obtener una meta específica por su ID
app.get("/goals/:goalID", (req, res) => {
  const { goalID } = req.params;
  const query = `SELECT * FROM goals WHERE goalID='${goalID}'`;
  conexion.query(query, (error, resultado) => {
    if (error) return console.error(error.message);
    if (resultado.length > 0) {
      res.json(resultado[0]);
    } else {
      res.json("Meta no encontrada");
    }
  });
});

// Ruta para obtener una lista de metas de un usuario específico
app.get("/goals/user/:userID", (req, res) => {
  const { userID } = req.params;
  const query = `SELECT * FROM goals WHERE userID='${userID}'`;
  conexion.query(query, (error, resultado) => {
    if (error) return console.error(error.message);
    if (resultado.length > 0) {
      res.json(resultado);
    } else {
      res.json("No se encontraron metas para este usuario");
    }
  });
});

// Ruta para actualizar una meta por su ID
app.put("/goals/:goalID", (req, res) => {
  const { goalID } = req.params;
  const updatedGoal = {
    goalName: req.body.goalName,
    goalAmount: req.body.goalAmount,
    savedAmount: req.body.savedAmount,
  };

  const query = `UPDATE goals SET ? WHERE goalID='${goalID}'`;
  conexion.query(query, updatedGoal, (error, resultado) => {
    if (error) return console.error(error.message);
    res.json("Meta actualizada exitosamente");
  });
});

// Ruta para eliminar una meta por su ID
app.delete("/goals/:goalID", (req, res) => {
  const { goalID } = req.params;
  const query = `DELETE FROM goals WHERE goalID='${goalID}'`;
  conexion.query(query, (error, resultado) => {
    if (error) return console.error(error.message);
    res.json("Meta eliminada exitosamente");
  });
});

//REMINDERS----------------
// Ruta para crear un nuevo recordatorio
app.post("/reminders", (req, res) => {
  const newReminder = {
    userID: req.body.userID,
    reminderDate: req.body.reminderDate,
    description: req.body.description,
    location: req.body.location,
  };
  const query = "INSERT INTO reminders SET ?";
  conexion.query(query, newReminder, (error, resultado) => {
    if (error) return console.error(error.message);
    res.json("Recordatorio creado exitosamente");
  });
});

// Ruta para obtener un recordatorio específico por su ID
app.get("/reminders/:reminderID", (req, res) => {
  const { reminderID } = req.params;
  const query = `SELECT * FROM reminders WHERE reminderID='${reminderID}'`;
  conexion.query(query, (error, resultado) => {
    if (error) return console.error(error.message);
    if (resultado.length > 0) {
      res.json(resultado[0]);
    } else {
      res.json("Recordatorio no encontrado");
    }
  });
});

// Ruta para obtener una lista de recordatorios de un usuario específico
app.get("/reminders/user/:userID", (req, res) => {
  const { userID } = req.params;
  const query = `SELECT * FROM reminders WHERE userID='${userID}'`;
  conexion.query(query, (error, resultado) => {
    if (error) return console.error(error.message);
    if (resultado.length > 0) {
      res.json(resultado);
    } else {
      res.json("No se encontraron recordatorios para este usuario");
    }
  });
});

// Ruta para actualizar un recordatorio por su ID
app.put("/reminders/:reminderID", (req, res) => {
  const { reminderID } = req.params;
  const updatedReminder = {
    reminderDate: req.body.reminderDate,
    description: req.body.description,
    location: req.body.location,
  };

  const query = `UPDATE reminders SET ? WHERE reminderID='${reminderID}'`;
  conexion.query(query, updatedReminder, (error, resultado) => {
    if (error) return console.error(error.message);
    res.json("Recordatorio actualizado exitosamente");
  });
});

// Ruta para eliminar un recordatorio por su ID
app.delete("/reminders/:reminderID", (req, res) => {
  const { reminderID } = req.params;
  const query = `DELETE FROM reminders WHERE reminderID='${reminderID}'`;
  conexion.query(query, (error, resultado) => {
    if (error) return console.error(error.message);
    res.json("Recordatorio eliminado exitosamente");
  });
});

//REPORTS--------------------
// Ruta para crear un nuevo informe
app.post("/reports", (req, res) => {
  const newReport = {
    userID: req.body.userID,
    reportDate: req.body.reportDate,
    reportType: req.body.reportType,
  };
  const query = "INSERT INTO reports SET ?";
  conexion.query(query, newReport, (error, resultado) => {
    if (error) return console.error(error.message);
    res.json("Informe creado exitosamente");
  });
});

// Ruta para obtener un informe específico por su ID
app.get("/reports/:reportID", (req, res) => {
  const { reportID } = req.params;
  const query = `SELECT * FROM reports WHERE reportID='${reportID}'`;
  conexion.query(query, (error, resultado) => {
    if (error) return console.error(error.message);
    if (resultado.length > 0) {
      res.json(resultado[0]);
    } else {
      res.json("Informe no encontrado");
    }
  });
});

// Ruta para obtener una lista de informes de un usuario específico
app.get("/reports/user/:userID", (req, res) => {
  const { userID } = req.params;
  const query = `SELECT * FROM reports WHERE userID='${userID}'`;
  conexion.query(query, (error, resultado) => {
    if (error) return console.error(error.message);
    if (resultado.length > 0) {
      res.json(resultado);
    } else {
      res.json("No se encontraron informes para este usuario");
    }
  });
});

// Ruta para actualizar un informe por su ID
app.put("/reports/:reportID", (req, res) => {
  const { reportID } = req.params;
  const updatedReport = {
    reportDate: req.body.reportDate,
    reportType: req.body.reportType,
  };

  const query = `UPDATE reports SET ? WHERE reportID='${reportID}'`;
  conexion.query(query, updatedReport, (error, resultado) => {
    if (error) return console.error(error.message);
    res.json("Informe actualizado exitosamente");
  });
});

// Ruta para eliminar un informe por su ID
app.delete("/reports/:reportID", (req, res) => {
  const { reportID } = req.params;
  const query = `DELETE FROM reports WHERE reportID='${reportID}'`;
  conexion.query(query, (error, resultado) => {
    if (error) return console.error(error.message);
    res.json("Informe eliminado exitosamente");
  });
});
