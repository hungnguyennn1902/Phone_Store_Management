const UserModel = require('../models/user');
const index = async (req, res)=>{
    
    const users = await UserModel.find();
    res.render("admin/users/user",{
        users,
    });
}
const create = (req, res) => {
    res.render("admin/users/add_user");
}
const edit = (req, res) => {
    res.render("admin/users/edit_user");
}

module.exports = {
    index,
    create, 
    edit
};
