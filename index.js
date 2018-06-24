//creacion del servidor
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
server.listen(process.env.PORT || 4000);

console.log('el servidor esta corriendo...');

Send_Users();
app.use(express.static('public'));
//creamos los arrays necesarios
users = [];
conexiones = [];
///probando git-guthub

io.sockets.on('connection', socket => {
    conexiones.push(socket);
    console.log('conectado: %s sockets conectados', conexiones.length);
    //DESCONECTADOS
    socket.on('disconnect', function(data){
        conexiones.splice(conexiones.indexOf(socket), 1);
        users.splice(users.indexOf(socket),1);
        console.log('desconectado: %s sockets conectados', conexiones.length);
        //console.log(conexiones);
    });
    socket.on('filter', function(id_Socket,filtro){
        for (let i = 0; i < users.length; i++){
            if (users[i].id == id_Socket){
                users[i].filter = filtro;
                console.log(users[i].filter);
                break;
                };
            };
    });
    //enviar mensajes
    socket.on('send message', function(data){
        //console.log(data);
        if(users.length === 0){
            // si entro aca, no hay usuarios registrados
            users.push(data);
        }
        else{let temp = users.filter(users => users.id === data.id); // FILTRO POR SOCKET
            if(temp.length != 0){
                //si entro aca, el usuario ya esta registrado ACTUALIZA SUS DATOS
                for (let i = 0; i < users.length; i++){
                if (users[i].nombre === data.nombre){
                    users[i].lat = data.lat;
                    users[i].long = data.long;
                    break;
                    };
                };
            } else {
                //Si entro aca, el usuario es nuevo o recargo la pagina y se le asigno un nuevo socket
                users.push(data);
            };
        }
       console.log(users);
    });
});


function Send_Users(){ //ENVIA LOS DATOS DE LA MATRIZ PARA QUE LOS SOCKET PUEDAN RECIBIRLOS Y FILTRARLOS POR ELLOS MISMOS
    setInterval(function(){
        if(users.length != 0){
            var array;
            for (let i = 0; i < users.length; i++){
                array = users.filter(user => user.nombre === users[i].filter);
                io.sockets.emit(users[i].id, array);
            };
        };

    },5000,"JavaScript");
}