Vue.component('listapedidoscomponent', 
{
    data: function() {
        return {
            pedidos: undefined,
            descendente: true
        }
    },

    methods: {

        seleccionarPedidoYNavegarAEditar: function(pedido)
        {
            store.state.pedidoSeleccionado = pedido

            obtenerLineasPedido((response) => 
            {
                store.state.pedidoSeleccionado.lineasDePedido = response.body

                store.state.currentComponent = store.state.components.detalles
                
            },
            () => alert("Error al intentar obtener las lineas de pedido del pedido")
            ,
            store.state.pedidoSeleccionado.Codigo)

            
        },

        obtenerColorEstadoPedido: function(estado)
        {
            cssClass = "icono-estado-";
            switch(estado)
            {
                case "Recibido":
                    cssClass += "recibido";
                    break;
                case "Preparando":
                    cssClass += "preparando";
                    break;
                case "Cancelado":
                    cssClass += "cancelado";
                    break;
                case "En reparto":
                    cssClass += "enreparto";
                    break;
            }

            return cssClass;
        },

        obtenerYMostrarPedidos: function()
        {
            obtenerPedidos((response) => 
            { 
                this.pedidos = response.body;
            }, 
            () => alert("Hubo un error inesperado al cargar los pedidos"))
        },

        sortTable: function (col) {
            var res = 0;
            var hola = this.descendente = !this.descendente;
            var imagen = document.getElementById(col);
            //alert(hola);
            
            this.pedidos.sort(function(a, b) {
                //alert(hola);
                if(hola) {
                    imagen.src = "flechaabajo.png";
                    if (a[col] > b[col]) {
                        //alert(a[col] + ">" + b[col]);
                        res =  1;
                    } 
                    else if (a[col] < b[col]) {
                        //alert(a[col] + "<" + b[col]);
                        res = -1;
                    }
                }
                else {
                    imagen.src = "flechaarriba.png";
                    if (b[col] > a[col]) {
                        //alert(b[col] + ">" + a[col]);
                        res =  1;
                    } 
                    else if (b[col] < a[col]) {
                        //alert(b[col] + "<" + a[col]);
                        res = -1;
                    }
                }
                
                //alert(res);
            return res;
            })
            //alert(JSON.stringify(this.pedidos));
        }
    },

    mounted() {
        this.obtenerYMostrarPedidos()
    },

    template:
    ` 
    <div style="margin-left:14%">
            <div class="row justify-content-center">
                <div class="divSuperior">
                    <h4 id="title">PEDIDOS</h4>
                    <div>
                        
                        <!-- <div class="buscador form-group">
                            <input placeholder="Buscar" class="form-control">
                            <button class="form-control"><i data-toggle="tooltip" title="Ajustes" class="material-icons align-bottom">search</i></button>
                        </div> -->

                        <button v-on:click="$store.state.currentComponent = $store.state.components.realizarpedido" class="btn btn-primary btn-hacerpedido">Hacer Pedido</button>

                        <div class="input-group mb-3 buscador">
                            <input type="text" class="form-control" placeholder="Buscar" aria-label="Recipient's username">
                            <div class="input-group-append">
                              <a href="#"><span class="input-group-text"><i class="material-icons btn-buscador">search</i></span></a>
                            </div>
                        </div>

                    </div>
                </div>

                <table class="rounded table table-striped align-self-center text-center">

                    <thead class="rounded">
                    <tr class="header align-bottom">
                        <th scope="col">
                            PEDIDO 
                            <img id="Codigo" src="flechaabajo.png" width="15" height="15" v-on:click="sortTable('Codigo')">
                        </th>
                        <th scope="col">
                            PROVEEDOR
                            <img id="NombreRazonSocialProveedor" src="flechaabajo.png" width="15" height="15" v-on:click="sortTable('NombreRazonSocialProveedor')">
                        </th>
                        <th scope="col">
                            FECHA REGISTRADA
                            <img id="FechaPedido" src="flechaabajo.png" width="15" height="15" v-on:click="sortTable('FechaPedido')">
                        </th>
                        <th scope="col">
                            ESTADO
                            <img id="Estado" src="flechaabajo.png" width="15" height="15" v-on:click="sortTable('Estado')">
                        </th>
                        <th scope="col">
                            FECHA RECIBIMIENTO
                            <img id="FechaRecepcion" src="flechaabajo.png" width="15" height="15" v-on:click="sortTable('FechaRecepcion')">
                        </th>
                        <th scope="col">
                            PRECIO
                            <img id="PrecioTotalPedido" src="flechaabajo.png" width="15" height="15" v-on:click="sortTable('PrecioTotalPedido')">
                        </th>
                        <th scope="col">
                            DETALLES
                        </th>
                    </tr>
                    </thead>

                    <tbody class="table-body ">
                        <template v-for="pedido in pedidos">
                            <tr>
                                <td class="table-body-bold">{{pedido.Codigo}}</td>
                                <td class="table-body-bold">{{pedido.NombreRazonSocialProveedor}}</td>
                                <td>{{pedido.FechaPedido}}</td>
                                <td><i data-toggle="tooltip" title="Ajustes" :class="obtenerColorEstadoPedido(pedido.Estado)" class="material-icons">lens</i> {{pedido.Estado}}</td>
                                <td>{{pedido.FechaRecepcion}}</td>
                                <td>{{pedido.PrecioTotalPedido}} €</td>
                                <td><a v-on:click="seleccionarPedidoYNavegarAEditar(pedido)" href="#" class="btn-detalles"><i data-toggle="tooltip" title="Ver" class="material-icons">remove_red_eye</i></a></td>
                            </tr>
                        </template>
                    </tbody>

                </table>

            </div>
            
        </div>
    `
})