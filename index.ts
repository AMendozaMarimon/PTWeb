const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
import productRoutes from './src/routes/routes';

//---- INICIAMOS EL SERVIDOR -----//

// Accede a la variable de entorno PORT desde process.env
const PORT_ENV: string | undefined = process.env.PORT;

// Crea la instancia de Express
const app = express();
app.use(express.json());
app.use(morgan("dev"));

// Asigna 3000 como valor por defecto si PORT_ENV es undefined
const PORT = parseInt(PORT_ENV || "3000", 10);

// Ahora puedes usar la variable PORT para configurar el puerto del servidor
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});

//----- INICIALIZAMOS LAS RUTAS -----//

app.use("/", productRoutes);

//----- CONECTAMOS A LA BASE DE DATOS -----//

// Definición de URI de la base de datos
const mongoURI = `mongodb://drenvio:moM5f3AodwLE5d0A@ac-aemgtkt-shard-00-00.unqyghm.mongodb.net:27017,ac-aemgtkt-shard-00-01.unqyghm.mongodb.net:27017,ac-aemgtkt-shard-00-02.unqyghm.mongodb.net:27017/challenge?replicaSet=atlas-y8oxsk-shard-0&ssl=true&authSource=admin`;

// Conexión a la base de datos
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conexión a la base de datos exitosa");
  })
  .catch((err: string) => {
    console.error("ERROR a conectarse a la base de datos, " + err);
  });

module.exports = { app };
