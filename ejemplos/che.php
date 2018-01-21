<?php
// ini_set('display errors', 1);
// error_reporting(E_ALL);

// include 'conexion.php';
// $resultado = 'Por defecto';
// if($_SERVER['REQUEST_METHOD'] == 'GET'){
// // if(isset($_GET['ver'])){
// 	$consulta = "select * from clientes";
//  	$a = $conexion->query($consulta);

// 	if($a){
// 		$resultado = [];
// 		while ($res = $a->fetch_assoc()){	array_push($resultado, $res);	}
// 		$resultado = json_encode($resultado);
// 	} else {
// 		$resultado = $conexion->error;
// 	}

//  	echo $resultado;
// }

// // if (isset($_GET['insertar'])){
// // 	$consulta = "INSERT INTO clientes(nombre, direccion, telefono, email, comentarios)
// // 	VALUES ('{$nombre}','{$direccion}','{$telefono}','{$email}','{$comentarios}')";

// // 	$a = $conexion->query($consulta);
// // 	$resultado = ($a) ? 'Nuevo cliente registrado' : 'Error en el registro: '.$conexion->error;

// // 	echo $resultado + 'jajaja';
// // } else {
// // 	echo 'Fallo: '; var_dump($_GET);
// // }


// //$resultado = (var_dump($_SERVER));

// //$resultado = json_encode(array('llave' => 'valor'));
// if($_SERVER['REQUEST_METHOD'] == 'GET'){
//   //$resultado = 'con get';
// }
// $res = 'Cagada';
// if(isset($_POST)){
// 	$res = 'tengo post' . $_POST['listado'];
// }
// //$datos = $_POST['listado'];
// $datos = json_encode($_POST['listado']);
// $res = $datos['albania'];
// //echo $datos;
// foreach($datos as $k => $v){
// 	//$res = $datos;
// 	echo $k . ': ' . $v;

// }
// echo gettype($res);

//echo $resultado;
echo '<h1>CHE</h1>';
$f= fopen('europa-codigos.txt', 'r') or die('<p>No se ha abierto</p>');
$cabezas = [];
while ($linea = fgets($f)){
	for($x=0; $x<6; $x++){
		array_push($cabezas, $linea);
	}
	
	echo $linea . '<br>';
}
//echo fgets($f);
// $gestor = fopen("europa-codigos.txt", "r") or die('<p>No se ha abierto</p>');
// if ($gestor) {
//     while (($búfer = fgets($gestor, 4096)) !== false) {
//         echo $búfer;
//     }
//     if (!feof($gestor)) {
//         echo "Error: fallo inesperado de fgets()\n";
//     }
//     fclose($gestor);
// }

echo 'Fin';
?>