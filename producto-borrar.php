<?php
include 'claseDB.php';

if (isset($_POST['codigo'])){
    $codigo = $_POST['codigo'];
} else {
    die('No hay post');
}
$query = "DELETE FROM producto WHERE cod='$codigo'";
$result = mysqli_query($conexion, $query);

if (!$result){
    die('No se ha podido borrar el producto deseado: '.mysqli_error($conexion));
}
echo "Producto borrado con éxito.";
