<?php
$conexion = mysqli_connect(
        'localhost',
        'sa',
        'sa',
        'tienda'
    );

mysqli_set_charset($conexion, "utf8");