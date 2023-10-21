import Products from "../models/Products";

const getAllProducts = (req: Request, res: any) => {
  Products
    .find({ existencia: { $ne: 0 } }) // Verifica que la existencia sea diferente a 0
    .then((products) => {
      res.json(products); // Enviamos el JSON con los productos que tienen Stock
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: "Error al obtener los productos en Stock." + err });
    });
};

export default getAllProducts;
