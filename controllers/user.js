'use strict'

var bcrypt = require('bcrypt-nodejs');
var userModel = require('../models/user');

function pruebas(req, res) {
   res.status(200).send({
      message: 'Probando una acción del controlador de usuarios del API REST con node y mongoDB'
   });
}

function saveUser(req, res) {
   var params = req.body;
   console.log(params);

   var user = new userModel();

   user.name = params.name;
   user.surname = params.surname;
   user.email = params.email;
   user.role = 'ROLE_ADMIN';
   user.image = 'null';
   if (params.password) {
      // Encriptar contraseña y guardar datos
      bcrypt.hash(params.password, null, null, function(err, hash) {
         user.password = hash;
         if (user.name != null && user.surname != null && user.email != null) {
            // Guardar usuario
            user.save((err, userStored) => {
               if(err) {
                  res.status(500).send({message: 'Error al guardar el usuario.'});
               } else {
                  if (!userStored) {
                     res.status(404).send({message: 'No se ha registrado el usuario'});
                  } else {
                     res.status(200).send({user: userStored});
                  }
               }
            });
         } else {
            res.status(200).send({message: 'Introduce todos los campos.'});
         }
      });
   } else {
      res.status(200).send({message: 'Introduce la contraseña.'});
   }
}

module.exports = {
   pruebas,
   saveUser
};