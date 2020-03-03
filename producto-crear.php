<?php
include 'claseDB.php';

if (isset($_POST)){
    $codigo = uniqid();
    $nombre = $_POST['nombre'];
    $descripcion = $_POST['descripcion'];
    $familia = $_POST['familia'];
    $pvp = $_POST['precio'];
    $stock = $_POST['stock'];
}

$query = "INSERT INTO producto (cod, nombre, descripcion, PVP, familia, stock) VALUES ('$codigo', '$nombre', '$descripcion', '$pvp', '$familia', '$stock')";
$result = mysqli_query($conexion, $query);
if (!$result){
    die ("No se ha podido insertar el producto: ". mysqli_error($conexion));
}

echo 'Producto creado con éxito';