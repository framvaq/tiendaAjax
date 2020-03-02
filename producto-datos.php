<?php
include_once ('claseDB.php');

if (isset($_POST['codigo'])){
    $codigo = $_POST['codigo'];
}

$query = "SELECT cod, nombre, stock FROM producto WHERE cod='$codigo'";
$result = mysqli_query($conexion, $query);

if (!$result){
    die('Error al consultar los datos.'.mysqli_error($conexion));
}

//Guardo los datos en un array que luego pasaré a formato json
$json = array();

while ($row = mysqli_fetch_array($result)){
    $json[] = array(
        'nombre' => $row['nombre'],
        'stock' => $row['stock'],
        'codigo' => $row['cod']
    );
}

$jsonstring = json_encode($json);

echo $jsonstring;