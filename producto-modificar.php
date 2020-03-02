<?php
include_once 'claseDB.php';

if (isset($_POST)){
    $codigo = $_POST['codigo'];
    $stock = $_POST['stock'];
}

$query = "UPDATE producto SET stock=$stock WHERE cod=$codigo";
$result = mysqli_query($conexion, $query);

if (!$result){
    die('No se ha podido modificar el stock: '.mysqli_error($conexion));
}

echo 'Stock modificado correctamente.';

