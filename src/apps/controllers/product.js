const CategoryModel = require("../models/category");
const ProductModel = require("../models/product");
const pagination = require("../../common/pagination");
const slug = require('slug');
const fs = require('fs');
const path = require('path');
const index = async (req, res) => {
    const limit = 10;
    const page = parseInt(req.query.page) || 1;
    const skip = page * limit - limit;
    const totalRow = await ProductModel.find().countDocuments();
    const totalPage = Math.ceil(totalRow / limit);
    const products = await ProductModel
        .find()
        .sort({_id: -1})
        .skip(skip)
        .limit(limit)
        .populate({ path: "cat_id" });
    const next = page + 1;
    const hasNext = page < totalPage ? true : false;
    const prev = page - 1;
    const hasPrev = page > 1 ? true : false;
    res.render("admin/products/product", {
        products,
        pages: pagination(page, totalPage),
        page,
        totalPage,
        next,
        hasNext,
        prev,
        hasPrev,
    });
}
const create = async (req, res) => {
    const categories = await CategoryModel.find();
    res.render("admin/products/add_product", {
        categories,
    });
}
const store = (req, res) => {
    const { file, body } = req;
    const product = {
        name: body.name,
        slug: slug(body.name),
        price: body.price,
        warranty: body.warranty,
        accessories: body.accessories,
        promotion: body.promotion,
        status: body.status,
        cat_id: body.cat_id,
        is_stock: body.is_stock,
        featured: body.featured == "on",
        description: body.description,

    }
    if (file) {
        const thumbnail = "products/" + file.originalname;
        fs.renameSync(file.path, path.resolve("src/public/images", thumbnail));
        product["thumbnail"] = thumbnail;
        new ProductModel(product).save();
        res.redirect("/admin/products");
    }

}
const edit = async (req, res) => {
    const id = req.params.id;
    const product = await ProductModel.findById({_id:id});
    const categories = await CategoryModel.find();
    res.render("admin/products/edit_product",{
        product,
        categories,
    });
}

const update = async (req, res) => {
    const id = req.params.id;
    const { file, body } = req;
    const product = {
        name: body.name,
        slug: slug(body.name),
        price: body.price,
        warranty: body.warranty,
        accessories: body.accessories,
        promotion: body.promotion,
        status: body.status,
        cat_id: body.cat_id,
        is_stock: body.is_stock,
        featured: body.featured == "on",
        description: body.description,

    }
    if (file) {
        const thumbnail = "products/" + file.originalname;
        fs.renameSync(file.path, path.resolve("src/public/images", thumbnail));
        product["thumbnail"] = thumbnail;
        
    }
    await ProductModel.updateOne({_id:id},{$set:product});
    res.redirect("/admin/products");

}
const del = async (req, res) => {
    const id = req.params.id;
    await ProductModel.deleteOne({_id: id});
    res.redirect("/admin/products")

}
module.exports = {
    index,
    edit,
    create,
    del,
    store,
    update,
};
