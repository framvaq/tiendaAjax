$(function () {
    mostrarTabla();

    $('.formModificar').hide();
    $('#mensaje').hide();


    $(document).on('click', '.borrar',
        function () {

            $('#mensaje').hide();
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

            $('#mensaje').hide();
            //Primero devuelve el nombre y el stock del producto elegido para mostrarlo en el formulario
            $('.formCrear').hide();
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
            //console.log(codigo);
            let stock = $('#nuevoStockProductoModificar').val();
            if (stock >= 0) {

                $.post('producto-modificar.php', {
                    codigo,
                    stock
                }, function (response) {
                    $('#mensaje').html(response).show();
                    mostrarTabla();
                    $('.formModificar').hide();
                    $('.formCrear').show();
                })
            } else {

                $('#mensaje').html('No se puede poner un stock negativo').show();
            }


        }
    )

    //Añadir producto
    $(document).on('click', '.crearProducto',
        function (e) {

            $('#mensaje').hide();
            e.preventDefault();
            let nombre = $('#nombreNuevo').val();
            let descripcion = $('#descripcionNueva').val();
            let familia = $('#familiaNueva').val();
            let precio = $('#precioNuevo').val();
            let stock = $('#stockNuevo').val();
            if (nombre && descripcion && familia && precio > 0 && stock >= 0) {

                $.post('producto-crear.php', {
                    nombre,
                    descripcion,
                    familia,
                    precio,
                    stock
                }, function (response) {
                    $('.formCrear').children().children().val('');
                    $('#mensaje').html(response).show();
                    mostrarTabla();
                })
            } else {
                $('#mensaje').html("Todos los campos son obligatorios").show();
            }

        })

    //Buscar
    //TODO modificar la función mostrarTabla() y productos-mostrar.php para que admitan parámetros de búsqueda (nombre, codigo, familia...)
    $('#buscar').keyup(function (e) {

        $('#mensaje').hide();
        //Para que sólo busque cuando hay algo en la barra de búsqueda
        if ($('#buscar').val()) {
            let busqueda = $('#buscar').val();
            $.ajax({
                url: 'producto-buscar.php',
                type: 'POST',
                data: {
                    busqueda
                },
                success: function (response) {
                    let plantilla = '';
                    if (response != "[]") {
                        let productosBuscar = JSON.parse(response);

                        productosBuscar.forEach(producto => {
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

                    } else {
                        plantilla = "No hemos encontrado nigún producto cuyo nombre contenga esas letras.";
                    }

                    $('#productos').html(plantilla);

                }
            })
        } else {
            mostrarTabla();
        }
    });



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