<?php
include 'claseDB.php';

if (isset($_POST['busqueda'])){
    $busqueda = $_POST['busqueda'];
}

if (!empty($busqueda)){
    $query = "SELECT * FROM producto WHERE nombre LIKE '%$busqueda%'";
    $result = mysqli_query($conexion, $query);

    if (!$result){
        die("No se ha podido buscar: ".mysqli_error($conexion));
    }

    $json = array();

    while($row = mysqli_fetch_array($result)){
        $json[] = array(
            'cod' => $row['cod'],
            'nombre' => $row['nombre'],
            'descripcion' => $row['descripcion'],
            'pvp' => $row['PVP'],
            'familia' => $row['familia'],
            'stock' => $row['stock']
        );
    }
    //print_r ($json);
    $jsonstring = json_encode($json);
    
    echo $jsonstring;
}

