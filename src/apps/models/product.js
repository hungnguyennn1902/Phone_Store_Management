const mongoose = require("../../common/database")();
const productSchema = new mongoose.Schema({
    cat_id: {
        type: mongoose.Types.ObjectId ,
        required: true, 
        ref: "Categories",
    },
    thumbnail: {
        type: String ,
    },
    description: {
        type: String ,
    },
    price: {
        type: String ,
    },
    status: {
        type: String ,
    },
    featured: {
        type: Boolean ,
        default: false,
    },
    promotion: {
        type: String ,
    },
    warranty: {
        type: String ,
    },
    accessories: {
        type: String ,
    },
    is_stock: {
        type: Boolean ,
        default: true,
    },
    name: {
        type: String ,
        required: true,
        text: true,
    },
    slug: {
        type: String ,
        required: true,
    }
},{timestamps: true});

const ProductModel = mongoose.model("Products", productSchema, "products");
module.exports = ProductModel;




