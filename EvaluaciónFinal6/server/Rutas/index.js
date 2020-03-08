const path       = require('path');
      storage    = require('../storage');

const rutas      = (app) => {

//Obtención de toda la data
  app.get('/search', (req, res) => {
      storage.getDataAll()
          .then((data) => {
              res.json({ "error": false, "datos": data });
          })
          .catch((err) => {
              res.json({ "error": true, "datos": err });
          });
  });
  //Obtención de búsqueda ciudades y tipos.
  app.get('/listas', (req, res) => {
    storage.getDataAll()
        .then((data) => {
            let ciudades = [];
            let tipos = [];
            data.forEach((key, idx) => {
                if (ciudades.indexOf(key.Ciudad) < 0) {
                    ciudades.push(key.Ciudad);
                }
                if (tipos.indexOf(key.Tipo) < 0) {
                    tipos.push(key.Tipo);
                }
            });
            res.json({ "error": false, "ciudades": ciudades, "tipos": tipos });
        })
        .catch((err) => {
            res.json({ "error": true, "err": err });
        });
    });
    //Obtención de datos según filtro.
    app.get('/ciudad/:ciudadId/tipo/:tipoId/desde/:desdeVal/hasta/:hastaVal', (req, res) => {
        let params = req.params;
        let datos = [];
        storage.getDataAll()
            .then(data => {
                var aux = [];
                var arr2 = [];
                var datos = [];

                aux = data.slice();
                //valida si se seleccionaron ciudades
                if (params.ciudadId != "todas") {
                    aux.forEach((key, idx) => {
                        if (key.Ciudad == params.ciudadId) {
                            arr2.push(key);
                        }
                    });
                } else {
                    arr2 = aux.slice();
                }
                //reinicio de arrays.
                aux = [];
                aux = arr2.slice();
                arr2 = [];

                //valida si se selecciono un tipo en especifico
                if (params.tipoId != "todos") {
                    aux.forEach((key, idx) => {
                        if (key.Tipo == params.tipoId) { arr2.push(key); }
                    });
                } else {
                    arr2 = aux.slice();
                }
                // recorre y filtra si esta entre los valores seleccionados
                arr2.forEach((key, idx) => {
                    let valor = parseInt(key.Precio.replace("$", "").replace(",", ""));
                    if (valor >= parseInt(params.desdeVal) && valor <= parseInt(params.hastaVal)) {
                        datos.push(key);
                    }
                });
                res.status(200).json({ datos, params });
            })
            .catch((err) => {
                res.json({ "error": true, "err": err });
            });
    });
};

module.exports = rutas;
