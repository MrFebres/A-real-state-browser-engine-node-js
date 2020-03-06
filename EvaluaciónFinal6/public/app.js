/*<<<--------------------Función autoejecutable NodeJs-------------------->>>*/
(function(document, window, undefined, $) {
    (function() {
        return Search = {
          $buscar: $("#buscar"),
          $tipo: $("#tipo"),
          $ciudad: $("#ciudad"),

          //Inicia funciones de busqueda.
          Init: () => {
            this.getSettings();
            //Inicializador del elemento Slider
            $("#rangoPrecio").ionRangeSlider({
              type: "double",
              grid: false,
              min: 0,
              max: 100000,
              from: 1000,
              to: 20000,
              prefix: "$"
            });
            //Consulta de toda la data.
            $('#buscar').click(() => {
                if ($("#checkPersonalizada")[0].checked) {
                    let valores = $("#rangoPrecio").val();
                    valores = valores.split(";");
                    var endpoint = `http://localhost:3000/ciudad/${$("#ciudad").val()}/tipo/${$("#tipo").val()}/desde/${valores[0]}/hasta/${valores[1]}`;
                }
                 else {
                    var endpoint = "http://localhost:3000/search";
                }
                this.ajaxRequest(endpoint, 'GET')
                  .done(data => {
                      if (!data.error) {
                            console.log(data);
                            $('.lista').html(this.renderObj(data.datos));
                        }
                    });
            });
            this.setSearch();
          },

          //Muestra u oculta opciones avanzadas.
          setSearch: () => {
            let busqueda = $("#checkPersonalizada");
            busqueda.on('change', (e) => {
              this.customSearch = !this.customSearch;
              $('#personalizada').toggleClass('invisible');
            });
          },

          //Función ajax pórtatil.
          ajaxRequest: (url, type) => {
            return $.ajax({
              url: url,
              type: type,
              dataType: 'json'
            })
          },

          //Obtiene ciudades y tipos.
          getSettings: () => {
            let endpoint = 'http://localhost:3000/listas';
            this.ajaxRequest(endpoint, 'GET',{})
            .done(data => {
              if (!data.error) {
                console.log(data);
                $ciudad.append(this.renderSelect(data.ciudades));
                $tipo.append(this.renderSelect(data.tipos));
              }
            })
          },

          //Renderiza ciudades y tipos.
          renderSelect: (data) => {
            var html = '';
            data.forEach((key, idx) => {
              html += `<option value="${key}">${key}</option>`;
            });
            return html
          },

          //Renderiza búsqueda personalizada.
          renderObj: (obj) => {
            var html = '';

            obj.forEach((key, idx) => {
              html += `<div class="card horizontal">
                      <div class="card-image">
                          <img src="http://localhost:3000/img/home.jpg">
                      </div>
                      <div class="card-stacked">
                          <div class="card-content">
                              <div>
                                  <p><strong>Direccion: </strong>${key.Direccion}</p>
                              </div>
                              <div>
                                  <p><strong>Ciudad: </strong>${key.Ciudad}</p>
                              </div>
                              <div>
                                  <p><strong>Telefono: </strong>${key.Telefono}</p>
                              </div>
                              <div>
                                  <p><strong>Código postal: </strong>${key.Codigo_Postal}</p>
                              </div>
                              <div>
                                  <p><strong>Precio: </strong>${key.Precio}</p>
                              </div>
                              <div>
                                  <p><strong>Tipo: </strong>${key.Tipo}</p>
                              </div>
                          </div>
                      </div>
                  </div>`;
                });
                return html;
            }
          };
        })();
        Search.Init();
})(document, window, undefined, jQuery);
