import Category from "../models/Servicios/category.js";

export async function getCategory (req, res) {
  const categories = await Category.find();
  res.json(categories);
};

export async function getCategoryId (req, res) {
  try {
      const categories = await Category.findById(req.params.id);
      if (!categories) {
          return res.status(404).json({ msg: 'Producto no encontrado' })
      }
      res.status(200).json(categories)
  } catch (error) {
      console.error('Error al obtener el producto', error);
      res.status(500).json({ msg: 'Error del Servidor' });
  }
}

export async function postCategory (req, res) {
  try {
      const { name, description } = req.body;

      // Imprime los datos que recibes para verificar que req.body tenga la información correcta
      console.log("Datos recibidos:", { name });

      // Crea un nuevo documento
      const newCategory = new Category({
          name,
          description
      });

      // Guarda el documento en la base de datos
      await newCategory.save();

      // Devuelve una respuesta exitosa
      res.status(201).json(newCategory);
  } catch (error) {
      // Imprime el error para ayudar a depurar
      console.error("Error al guardar el documento:", error);

      // Devuelve una respuesta de error
      res.status(500).json({ msg: "Error al guardar el documento", error });
  }
};

export async function puCategory(req, res) {
  const { stock } = req.body;

  try {
      const product = await Product.findById(req.params.id);
      if (!product) {
          return res.status(404).json({ message: 'Product not found' });
      }
      product.stock = stock;
      await product.save();
      res.status(200).json({ message: 'Updated Stock', newStock: product.stock });
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
}