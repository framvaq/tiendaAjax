mostrarTabla();

function mostrarTabla() {
    $.ajax({
        url: 'productos-mostrar.php',
        type: 'GET',
        success: function (response) {
            let productos = JSON.parse(response);
            let plantilla = '';
            productos.forEach(producto => {
                plantilla += `
                    <tr idProducto="${producto.cod}">
                            <td>${producto.cod}</td>
                            <td>${producto.nombre}</td>
                            <td>${producto.descripcion}</td>
                            <td>${producto.familia}</td>
                            <td>${producto.pvp}</td>
                            <td>${producto.stock}</td>
                            <td><button class="borrar btn  btn-danger">Borrar</button></td>
                            <td><button class="modificar btn btn-warning">Modificar</button></td>
                        </tr>
                        `
            });
            $('#productos').html(plantilla);
        }
    })
}

$(document).on('click', '.borrar',
    function () {
        if (confirm('¿Estás seguro de que quieres borrar el producto?')) {
            let elemento = $(this)[0].parentElement.parentElement;
            let codigo = $(elemento).attr('idProducto');

            $.post('producto-borrar.php', {
                codigo
            }, function (response) {
                mostrarTabla();
            });
        }
    }
);

$(document).on('click', '.modificar',
    function(){
        
    }
)