import { Product } from "../../models/product";

export const createProduct = async (data: any) => {
  return await Product.create(data);
};

export const getAllProducts = async () => {
  return await Product.findAll();
};

export const getProductById = async (id: number) => {
  return await Product.findByPk(id);
};

export const updateProduct = async (id: number, data: any) => {
  const product = await Product.findByPk(id);
  if (product) {
    return await product.update(data);
  }
  return null;
};

export const deleteProduct = async (id: number) => {
  const product = await Product.findByPk(id);
  if (product) {
    await product.destroy();
    return true;
  }
  return false;
};
