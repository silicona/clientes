<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

// $datos = json_decode(file_get_contents('php://input'));

// if($_SERVER['REQUEST_METHOD'] == 'post'){
// 	$datos = $_REQUEST;
// }

$datos = $_POST;

echo json_encode($datos);

?>