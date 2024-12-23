module.exports = {
    app:{
        port: 3000,
        static_folder: `${__dirname}/../src/public`,
        router: `${__dirname}/../src/routers/web`,
        view_folder: `${__dirname}/../src/apps/views`,
        view_engine: "ejs",
        session_key: "hungdz",
    },
    mail:{
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: "hung2k3saison@gmail.com",
          pass: "mrmi kjdd whgr heih",
        },
    }
};
