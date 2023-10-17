const https = require('http');
const app = require('./app')



// permet de renvoyer un port valide
const normalizePort = val => {
    const port = parseInt(val , 10);

    if(isNaN(port)){
        return val
    }
    if(port >= 0){
        return port
    }
    return false
}


const port = normalizePort(process.env.PORT || '3000')
app.set('port' , port)

// faire une fonction qui va gerer tout ce qui est comme erreur sur le port

const errorHandler = err => {
    if(err.syscall !== 'listen'){
        throw err
    }
    const address = server.address()
    const bind = typeof address === 'string' ? 'pipe' + address : 'port' + port


    switch (err.code){
        case 'EACCES' :
            console.err(bind + 'require elevated privileges')
            process.exit(1)
            break;
        case 'EADDRINUSE' :   
            console.err(bind + ' is already to use')
            process.exit(1)
            break;
            default:
            throw err
    }
}

// on créer un server
const server = https.createServer(app)

server.on('error' , errorHandler)
server.on('listening' , () => {
    const address = server.address()
    const bind = typeof address === 'string' ? 'pipe' + address : "port" + port;
    console.log('listening on' , bind)
})

server.listen(port)
