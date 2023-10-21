import { Request, Response } from "express";
import Users from "../models/Users";
import Products from "../models/Products";

interface UserDocument {
  _id: string;
  id: number;
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

    // Buscamos el usuario mediante el ID
    const user = (await Users.findById(user_id)) as UserDocument;
    console.log(user);

    // Error si el usuario no se encuentra en la base de datos
    if (!user) {
      return res
        .status(404)
        .json({ error: "Usuario no encontrado en la base de datos!" });
    }

    // Buscar el precio especial para el producto en el campo "metadata"
    const specialPrice = await user.metadata?.precios_especiales;

    // Buscar el precio especial para el producto en específico
    if (specialPrice && specialPrice.length > 0) {
      const findPriceSpecial = specialPrice.find(
        (product) => product.nombre_producto === nombre_producto
      );

      // Si se encuentra un producto especial, lo retornamos
      if (findPriceSpecial) {
        return res
          .status(200)
          .json({ precio_especial: findPriceSpecial.precio_especial_personal });
      }
    }

    // Si no se encuentra precio especial, se busca el producto en la base de datos
    const product = (await Products.findOne({
      nombre: nombre_producto,
    })) as ProductDocument;

    const basePriceProduct = await product.precio_base;

    if (basePriceProduct) {
      return res.status(200).json({ precio_base: basePriceProduct });
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
