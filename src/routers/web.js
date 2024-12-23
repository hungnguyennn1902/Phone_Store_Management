const express = require("express");
const router = express.Router();


// Test
const TestController = require('../apps/controllers/test');

router.get("/test", TestController.test);
router.get("/test1", TestController.test1);
// Auth
const AuthController = require('../apps/controllers/auth');
//Admin
const AdminController = require('../apps/controllers/admin');
//Product
const ProductController = require('../apps/controllers/product');
//User
const UserController = require('../apps/controllers/user');
//Category
const CategoryController = require('../apps/controllers/category');
//Import Middleware
const AuthMiddleware = require("../apps/middlewares/auth");
const UploadMiddleware = require('../apps/middlewares/upload');
//Site
const SiteController = require('../apps/controllers/site');
//Router admin
//Auth
router.get("/admin/login", AuthMiddleware.checkLogin, AuthController.getLogin);
router.post("/admin/login", AuthMiddleware.checkLogin, AuthController.postLogin);
router.get("/admin/logout", AuthMiddleware.checkAdmin, AuthController.logout);
//Admin
router.get("/admin/dashboard", AuthMiddleware.checkAdmin, AdminController.index);
//Product
router.get("/admin/products", AuthMiddleware.checkAdmin, ProductController.index);
router.get("/admin/products/create", AuthMiddleware.checkAdmin, ProductController.create);
router.post("/admin/products/store",
    UploadMiddleware.single("thumbnail"),
    AuthMiddleware.checkAdmin,
    ProductController.store);
router.get("/admin/products/edit/:id", AuthMiddleware.checkAdmin, ProductController.edit);
router.post("/admin/products/update/:id",
UploadMiddleware.single("thumbnail"),
 AuthMiddleware.checkAdmin,
   ProductController.update);

router.get("/admin/products/delete/:id", AuthMiddleware.checkAdmin,  ProductController.del);
//User
router.get("/admin/users", AuthMiddleware.checkAdmin, UserController.index);
router.get("/admin/users/create", AuthMiddleware.checkAdmin, UserController.create);
router.get("/admin/users/edit/:id", AuthMiddleware.checkAdmin, UserController.edit);
//Category
router.get("/admin/categories", CategoryController.index);
module.exports = router;

//Router Site
router.get("/", SiteController.home);
router.get("/category-:slug.:id", SiteController.category);
router.get("/product-:slug.:id", SiteController.product);
router.post("/product-:slug.:id", SiteController.comment);
router.get("/search", SiteController.search);
router.get("/cart", SiteController.cart);
router.get("/delete-cart-:id", SiteController.deleteCart);
router.post("/add-to-cart", SiteController.addToCart);
router.post("/update-cart", SiteController.updateCart);
router.post("/order", SiteController.order);
router.get("/success", SiteController.success);



