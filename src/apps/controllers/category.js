const CategoryModel = require('../models/category');
const index = async (req, res) => {
    const categories = await CategoryModel.find();
    res.render("admin/categories/category",{
        categories,
    });
}
const create = (req, res) => {
    res.render("admin/categories/add_category");
}
const edit = (req, res) => {
    res.render("admin/categories/edit_category");
}
module.exports = {
    index,
    create,
    edit
};

