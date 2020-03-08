/*<<<--------------------Función autoejecutable NodeJs-------------------->>>*/
(function(document, window, undefined, $) {
    (function() {
        return search = {
          $buscar: $("#buscar"),
          $tipo: $("#tipo"),
          $ciudad: $("#ciudad"),
          apiUrl: '',

          //Inicia funciones de busqueda.
          Init: function() {
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
                    var endpoint = this.apiUrl+`/ciudad/${$("#ciudad").val()}/tipo/${$("#tipo").val()}/desde/${valores[0]}/hasta/${valores[1]}`;
                }
                 else {
                    var endpoint = this.apiUrl+'/search';
                }
                this.ajaxRequest(endpoint, 'GET', 'json', {})
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
          setSearch: function() {
            let busqueda = $("#checkPersonalizada");
            busqueda.on('change', (e) => {
              this.customSearch = !this.customSearch;
              $('#personalizada').toggleClass('invisible');
            });
          },

          //Función ajax pórtatil.
          ajaxRequest: function(url, type, dataType, data) {
            return $.ajax({
              url: url,
              type: type,
              dataType: dataType,
              data: data
            })
          },

          //Obtiene ciudades y tipos.
          getSettings: function() {
            let endpoint = this.apiUrl+'/listas'
            this.ajaxRequest(endpoint, 'GET', 'json', {})
            .done(data => {
              if (!data.error) {
                console.log(data);
                this.$ciudad.append(this.renderSelect(data.ciudades));
                this.$tipo.append(this.renderSelect(data.tipos));
              }
            })
          },

          //Renderiza ciudades y tipos.
          renderSelect: function(data) {
            var html = '';
            data.forEach((key, idx) => {
              html += `<option value="${key}">${key}</option>`;
            });
            return html
          },

          //Renderiza búsqueda personalizada.
          renderObj: function(obj) {
            var html = '';

            obj.forEach(function(key, idx)  {
              html += `<div class="card horizontal">
                      <div class="card-image">
                          <img src="http://localhost:8080/img/home.jpg">
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
        search.Init();
})(document, window, undefined, jQuery);
