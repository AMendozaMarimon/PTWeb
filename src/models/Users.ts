import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  nombre: String,
  metadata: {
    precios_especiales: [
      {
        nombre_producto: String,
        precio_especial_personal: Number,
      },
    ],
  },
});

const Users = mongoose.model("User", userSchema);

export default Users;
