$(function () {
    mostrarTabla();
    $('.esconder').hide();



    $(document).on('click', '.borrar',
        function () {
            if (confirm('¿Estás seguro de que quieres borrar el producto?')) {
                let codigo = getIdBoton($(this));

                $.post('producto-borrar.php', {
                    codigo
                }, function (response) {
                    mostrarTabla();
                });
            }
        }
    );

    //Formulario actualizar stock
    $(document).on('click', '.modificar',
        function () {
            //Primero devuelve el nombre y el stock del producto elegido para mostrarlo en el formulario
            let codigo = getIdBoton($(this));
            $.post('producto-datos.php', {
                codigo
            }, function (response) {
                let datos = JSON.parse(response);

                datos.forEach(dato => {
                    //console.log(dato['nombre']);
                    let nombre = dato['nombre'];
                    let stock = dato['stock'];
                    let codigo = dato['codigo'];

                    $('#productoModificar').html(nombre);
                    $('#stockProductoModificar').html(stock);
                    $('#idProductoModificar').val(codigo);
                    //console.log($('#idProductoModificar').val());

                });
                mostrarModificar = true;
                $('.formModificar').show();
            })
        }
    )

    //Actualizar stock
    $(document).on('click', '.modificarStock',
        function () {
            //Ahora sí, se actualiza el stock del producto deseado y se muestra el mensaje del servidor
            //console.log(codigo);
            let codigo = $('#idProductoModificar').val();
            console.log(codigo);
            let stock = $('#nuevoStockProductoModificar').val();
            console.log(stock);
            $.post('producto-modificar.php', {
                codigo,
                stock
            }, function (response) {
                mostrarTabla();
                $('.formModificar').hide();
                $('.mensaje .modificar').html('Producto modificado correctamente');
            })
        }
    )

    //Buscar
    $('#buscar').keyup(function (e) {
        //Sólo se ejecuta cuando hay algún valor
        if ($('#buscar').val()) {
            let busqueda = $('#buscar').val();
            //Envío la búsqueda a php
            $.ajax({
                url: 'producto-buscar.php',
                type: 'POST',
                data: {
                    busqueda
                },
                success: function (response) {
                    //console.log(response);
                    let productos = JSON.parse(response);
                    let plantilla = '';
                    //console.log(productos);
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

        } else {
            mostrarTabla();
        }
    })

    /*FUNCIONES*/
    //Accede a la base de datos y muestra la tabla
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

    //Obtengo el id del elemento al que corresponde un botón
    function getIdBoton(boton) {
        let elemento = $(boton)[0].parentElement.parentElement;
        let codigo = $(elemento).attr('idProducto');
        return codigo;
    }
})