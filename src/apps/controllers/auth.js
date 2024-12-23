const UserModel = require('../models/user');
const getLogin = (req, res) => {
    res.render("admin/login", {data:{}});
}
const postLogin = async (req, res)=>{
    let {email, password} = req.body;
    const alert = "Tài khoản không hợp lệ !";
    const users = await UserModel.find({email, password});
    if(users.length > 0){
        req.session.email = email;
        res.redirect("/admin/dashboard");
    }else{
        res.render("admin/login", {data:{error: "Tai khoan ko hop le !"}} )
    }
}   

const logout = (req, res) => {
    req.session.destroy();
    res.redirect("/admin/login");
}
module.exports = {
    getLogin,
    logout,
    postLogin
};
