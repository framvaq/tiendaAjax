<?php
//Lamo al fichero de conexión de la base de datos
include_once ('claseDB.php');

//Creo y ejecuto la consulta
$query = "SELECT * FROM producto";
$result = mysqli_query($conexion, $query);

//EN caso de error
if (!$result){
    die('Error en la consulta: '.mysqli_error($conexion));
}

//Guardo los resultado en un array, que luego pasaré a formato json
$json = array();
while($row = mysqli_fetch_array($result)){
    $json[] = array(
        'cod' => $row['cod'],
        'nombre' => $row['nombre'],
        'descripcion' => utf8_encode($row['descripcion']),
        'pvp' => $row['PVP'],
        'familia' => $row['familia'],
        'stock' => $row['stock']
    );
}
//print_r ($json);
$jsonstring = json_encode($json);

echo $jsonstring;
