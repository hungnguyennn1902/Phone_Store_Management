const checkLogin = (req, res, next) => {
    if(req.session.email){
        return res.redirect("/admin/dashboard");
    }
    next();
}
const checkAdmin = (req, res, next) => {
    if(!req.session.email){
        return res.redirect("/admin/login");
    }
    next();   
}
module.exports = {
    checkLogin, 
    checkAdmin,
};
