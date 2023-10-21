import { Request, Response } from "express";
import Products from "../models/Products";
import Users from "../models/Users";

interface UserDocument {
  _id: string;
  nombre: string;
  metadata: {
    precios_especiales: {
      nombre_producto: string;
      precio_especial_personal: number;
    }[];
  };
}

interface ProductDocument {
  _id: string;
  nombre: string;
  precio_base: number;
  existencia: number;
}

const userWithSpecialPrice = async (req: Request, res: Response) => {
  try {
    const { user_id, nombre_producto } = req.params; // Obtengo los parámetros de la URL

    // Buscamos el usuario mediante el id
    const user = (await Users.findById(user_id)) as UserDocument;

    // Error si el usuario no se encuentra en la base de datos
    if (!user) {
      return res
        .status(404)
        .json({ error: "Usuario no encontrado en la base de datos!" });
    }

    // Buscar el precio especial para el producto en el campo "metadata"
    const priceSpecial = await user.metadata?.precios_especiales;

    // Buscar el precio especial para el producto en específico
    if (priceSpecial && priceSpecial.length > 0) {
      const findPriceSpecial = priceSpecial.find(
        (product) => product.nombre_producto === nombre_producto
      );

      // Si se encuentra un producto especial lo retornamos
      if (findPriceSpecial) {
        const specialPriceMessage = "Este es el precio: " + findPriceSpecial.precio_especial_personal;
        return res.status(200).json({ message: specialPriceMessage });
      }
    }

    // Si no se encuentra precio especial se busca el producto en la base de datos
    const productPriceBase = await Products.findOne({
      nombre: nombre_producto,
    }) as ProductDocument;

    if (productPriceBase) {
      return res.status(200).json(productPriceBase.precio_base);
    } else {
      return res
        .status(404)
        .json({ error: "Producto no encontrado en la base de datos" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export default userWithSpecialPrice;
