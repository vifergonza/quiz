var usuarios = {
    admin: {
        id: 1,
        username: "admin",
        password: "1234"
    },
    pepe: {
        id: 2,
        username: "pepe",
        password: "5678"
    }
};

exports.autenticar = function(login, password, callback) {
    if (usuarios[login]) {
        if (password === usuarios[login].password) {
            callback(null, usuarios[login]);
        } else {
            callback(new Error('Password erroneo'));
        }
    } else {
        callback(new Error('No existe el usuario'));
    }
};
