import Product from "../models/Compras/products.js";
import Category from "../models/Servicios/category.js"

export async function getProduct (req, res) {
  const products = await Product.find();
  res.json(products);
};

export async function getProductId (req, res) {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ msg: 'Producto no encontrado' })
        }
        res.status(200).json(product)
    } catch (error) {
        console.error('Error al obtener el producto', error);
        res.status(500).json({ msg: 'Error del Servidor' });
    }
}

export async function postProduct (req, res) {
  try {
      const { name, description, price, stock, category } = req.body;

      // Imprime los datos que recibes para verificar que req.body tenga la información correcta
      console.log("Datos recibidos:", { name, description, price, stock, category });
      
      const categoryExists = await Category.findOne({ name: category });
      if (!categoryExists) {
        return res.status(400).json({ msg: 'Category not found' })};

      // Crea un nuevo documento
      const newProduct = new Product({
          name,
          description,
          price,
          stock,
          category
      });

      // Guarda el documento en la base de datos
      await newProduct.save();

      // Devuelve una respuesta exitosa
      res.status(201).json(newProduct);
  } catch (error) {
      // Imprime el error para ayudar a depurar
      console.error("Error al guardar el documento:", error);

      // Devuelve una respuesta de error
      res.status(500).json({ msg: "Error al guardar el documento", error });
  }
};

export async function putProduct(req, res) {
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

export async function deleteProduct (req, res) {
    try {
        const products = await Product.findById(req.params.id);

        if (!products) {
            return res.status(404).json({ error: 'Product not found' });
        }
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'The product has been deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

