import Product from "../models/Product.js";

//add product
export const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      stock,
      rating,
      reviews,
      status,
    } = req.body;

    const sizes = JSON.parse(req.body.sizes || "[]");

    // MULTIPLE IMAGE PATHS
 const images = req.files?.images?.map(
  (file) =>
    `${req.protocol}://${req.get("host")}/${file.path.replace(/\\/g, "/")}`
) || [];

    if (!name || !price || !category || !subCategory || images.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing",
      });
    }

    const product = await Product.create({
      name,
      description,
      price,
      category,
      subCategory,
      images,
      stock,
      rating,
      reviews,
      sizes,
      status,
    });

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
//get all product
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      success: true,
      products,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

//get product by id
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "product not found !",
      });
    }
    res.status(200).json({
      success: true,
      message: "product found successfully",
      product,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

//delete product by id

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not found !",
      });
    }
    await product.deleteOne();
    res.status(200).json({
      success: true,
      message: "product deleted successfuly",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

//full update
export const updateProductPut = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "product not found !",
      });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );
    res.status(200).json({
      success: true,
      message: "product full updated successfully",
      updatedProduct,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

//partial update
export const productUpdatePatch = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "product not found !",
      });
    }
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      {
        new: true,
        runValidators: true,
      },
    );
    res.status(200).json({
      success: true,
      message: "product updated successfully",
      updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
