const http        = require('http'),
      express     = require('express'),
      bodyParser  = require('body-parser'),

      rutas       = require('./rutas');

const port        = process.env.PORT || 3000,
      app         = express(),
      server      = http.createServer(app)

rutas(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

server.listen(port, () => console.log(`Server is running in http://localhost:${port}`))
