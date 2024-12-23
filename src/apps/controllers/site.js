const ProductModel = require('../models/product');
const CategoryModel = require('../models/category');
const CommentModel = require('../models/comment');
const  transporter  = require('../../common/transporter');
const config = require("config");
const ejs = require("ejs");
const path = require("path");

const home = async (req, res)=>{
    const featured = await ProductModel.find({
        featured: true,
        is_stock: true,
        
    })
        .sort({_id: -1})
        .limit(6)    
    ;
    const lastest = await ProductModel.find({
        is_stock: true,

    })
        .sort({_id: -1})
        .limit(6);

    
    res.render("site/index", {featured, lastest});
}
const category = async (req, res)=>{
    const id = req.params.id;
    const products = await ProductModel.find({cat_id: id}).sort({_id: -1});
    const category = await CategoryModel.find({_id: id});   
    res.render("site/category",{products, category});
}
const product = async (req, res)=>{
    const id = req.params.id;
    const product = await ProductModel.findById(id);
    const comments = await CommentModel.find({prd_id: id});
    res.render("site/product", {product, comments});
}
const comment = async (req, res) => {
    const prd_id = req.params.id;
    const {full_name, email, body} = req.body;
    const comment = {
        prd_id,
        full_name,
        body,
        email,
    }
    await new CommentModel(comment).save();
    res.redirect(req.path);
    
}
const search = async (req, res)=>{
    const keyword = req.query.keyword || "";
    const products = await ProductModel.find({
        $text:{
            $search: keyword,   
        }
    });
    res.render("site/search", {products, keyword});
}
const cart = (req, res)=>{
    const cart = req.session.cart;
    res.render("site/cart", {cart});
}
const addToCart = async (req, res) => {
    const items = req.session.cart;
    const id = req.body.id;
    let qty = parseInt(req.body.qty);
    let isProductExists = false;
    items.map((item)=>{
        if(item.id === id){
            item.qty += qty;
            isProductExists = true;
        }
        return item;
    });
    if(!isProductExists){
        const product = await ProductModel.findById(id);
        items.push({
            id,
            name: product.name,
            thumbnail: product.thumbnail,
            price: product.price,
            qty,
        })
    };
    req.session.cart = items;
    res.redirect("/cart");

}
const updateCart = (req, res) => {
    const products = req.body.products;
    let items = req.session.cart;
    items.map((item)=>{
        item.qty = parseInt(products[item.id]["qty"]);
        return item;
    })
    
    res.redirect("/cart");
}
const deleteCart = (req, res) => {
    const{id} = req.params;
    let items = req.session.cart;
    const newItems = items.filter((item)=>item.id != id);
    req.session.cart = newItems;
    res.redirect("/cart");
}
const order = async (req, res) => {
    const items = req.session.cart;
    const {name, phone, mail, add} = req.body;
    // Lấy ra đường dẫn đến thư mục views
    const viewPath = req.app.get("views");
    // Compile template EJS sang HTML để gửi mail cho khách hàng
    const html = await ejs.renderFile(
        path.join(viewPath, "site/email-order.ejs"),
        {
            name,
            phone,
            mail,
            add,
            totalPrice: 0,
            items,
        }
    );
    // Gửi mail
    await transporter.sendMail({
        to: mail,
        from: "Hung",
        subject: "Xác nhận đơn hàng từ Vietpro Shop",
        html,
    });

    req.session.cart = [];
    res.redirect("/success");
}
const success = (req, res)=>{
    res.render("site/success");
}


module.exports = {
    home,
    category,
    product,
    search,
    cart,
    success,
    comment,
    addToCart,
    updateCart,
    deleteCart,
    order,
    
}
