import express from "express";
import bodyParser from "body-parser";
import { initModels } from "./models/init-models.js";
import cors from "cors";

const app = express();
const port = 3001;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

const { Users, Platforms, Shipment } = initModels();

app.use(cors());

//AQUI SE HACEN TODAS LAS CONSULTAS A LA BASE DE DATOS

// ##################################### USUARIOS #####################################

app.get("/users", async (req, res) => {
  const users = await Users.findAll();
  return res.json(users);
});

app.post("/users", async (req, res) => {
  const { body } = req;
  if (!body.name) {
    return res.status(400).json({ msg: "El campo 'name' es requerido" });
  }
  // Convert platforms array to string if needed
  if (Array.isArray(body.platforms)) {
    body.platforms = body.platforms.join(", ");
  }
  const user = await Users.findOne({ where: { email: body.email } });
  if (user)
    return res.status(400).json({
      msg: "El correo ya se encuentra registrado, intenta con otro",
    });
  const created = await Users.create(body);
  if (!created)
    return res
      .status(500)
      .json({ msg: "El usuario no pudo crearse debido a un problema interno" });
  return res.json(created);
});

app.put("/users/:id", async (req, res) => {
  const { body } = req;

  const user = await Users.findByPk(req.params.id);
  if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });

  // Actualizar campos del usuario
  await user.update(body);
  return res.json(user);
});

//##################################### PLATAFORMAS #####################################

app.get("/platforms", async (req, res) => {
  const platforms = await Platforms.findAll();
  return res.json(platforms);
});

app.post("/platforms", async (req, res) => {
  const { body } = req;
  if (!body.name) {
    return res.status(400).json({ msg: "El campo 'name' es requerido" });
  }
  const platforms = await Platforms.findOne({ where: { name: body.name } });
  if (platforms)
    return res.status(400).json({
      msg: "La plataforma ya se encuentra registrada, intenta con otro nombre",
    });
  const created = await Platforms.create(body);
  if (!created)
    return res
      .status(500)
      .json({ msg: "La plataforma no pudo ser creada, intente más tarde" });
  return res.json(created);
});

//#########################################################################################

// ###################################### ENVIO #####################################

app.get("/shipment", async (req, res) => {
  const shipment = await Shipment.findAll();
  return res.json(shipment);
});

app.post("/shipment", async (req, res) => {
  const { body } = req;
  const shipment = await Shipment.findOne({ where: { name: body.name } });
  if (shipment)
    return res.status(400).json({
      msg: "La paquetería ya se encuentra registrada, intenta con otro nombre",
    });
  const created = await Shipment.create(body);
  if (!created)
    return res
      .status(500)
      .json({ msg: "La paquetería no pudo ser creada, intente más tarde" });
  return res.json(created);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
