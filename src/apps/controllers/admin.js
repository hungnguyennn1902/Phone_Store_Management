const UserModel = require('../models/user');
const ProductModel = require('../models/product');
const CommentModel = require("../models/comment");
const index = async (req, res) => {
    
    const users = (await UserModel.find()).length;
    const products = (await ProductModel.find()).length;
    const comments = (await CommentModel.find()).length;
    res.render("admin/admin", {
        users,
        products,
        comments,
    });
}
module.exports = {
    index,
};
