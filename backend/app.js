const express = require("express");
const { default: mongoose } = require("mongoose");
const bodyParser = require('body-parser');
const cookiePaser = require('cookie-parser');
const cors = require('cors')
const app = express();
const path = require('path');
const link = require('./config/mongo_url')
const hopitalRoute = require('./routes/hopital')
const ambulancierRouter = require('./routes/ambulancier')
const serviceRouter = require('./routes/service')
const urgenceRouter = require('./routes/urgence')

mongoose.connect( LINK_MONGO, {
    useNewUrlParser : true,
    useUnifiedTopology : true
})
.then(() => console.log('succès de la connexion à mongo'))
.catch(() => console.log('échec de la connexion à mongo'))


// recupere toute nos requete sous format json
app.use(express.json());
app.use(cors());

// pour gerer le cors (les differentes requete envoyer a notre application)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.json())
app.use(cookiePaser())

app.use('/api/hopital' , hopitalRoute);
app.use('/api/ambulancier' , ambulancierRouter);
app.use('/api/service' , serviceRouter);
app.use('/api/urgence' , urgenceRouter);





module.exports = app ;
