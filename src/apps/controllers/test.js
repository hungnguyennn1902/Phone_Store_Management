const ProductModel = require("../models/product");
const CategoryModel = require("../models/category")
const test = (req, res) => {
    
    res.send("defined");
}
const test1 = (req, res) => {
   
        res.send("not defined");
    
}


module.exports = {
    
    test, 
    test1
};
