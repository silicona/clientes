<?php

	include 'conexion.php';
	$resultado = 'Por defecto';

	// if(isset($_GET)){
	// 	$consulta = "select * from clientes";
	// 	$a = $conexion->query($consulta);
	// 	if($a){
	// 		$resultado = [];
	// 		while ($res = $a->fetch_assoc()){
	// 			array_push($resultado, json_encode($res));
	// 					//array_push($resultado, $res);
	// 					//$resultado .= json_encode($res) +'';
	// 		}
	// 		$resultado = json_encode($resultado);

	// 	} else {
	// 		$resultado = $conexion->error;
	// 	}
	// 	 echo $resultado;
	// }

	if(isset($_POST['accion'])){
		if(($_POST['accion'] == 'insertar') || ($_POST['accion'] == 'editar')){

			// $nombre = asegurar($_POST['datos'][0]);
			// $direccion = asegurar($_POST['datos'][1]);
			// $telefono = asegurar($_POST['datos'][2]);
			// $email = asegurar($_POST['datos'][3]);
			// $comentarios = asegurar($_POST['datos'][4]);

			$nombre = asegurar($_POST['datos']['nombre']);
			$direccion = asegurar($_POST['datos']['direccion']);
			$telefono = asegurar($_POST['datos']['telefono']);
			$email = asegurar($_POST['datos']['email']);
			$comentarios = asegurar($_POST['datos']['comentarios']);
		}

		switch($_POST['accion']){

			case 'insertar':
				$consulta = "INSERT INTO clientes(nombre, direccion, telefono, email, comentarios)
														VALUES ('{$nombre}','{$direccion}','{$telefono}','{$email}','{$comentarios}')";

				$a = $conexion->query($consulta);
				$resultado = ($a) ? 'Nuevo cliente registrado' : 'Error en el registro: '.$conexion->error;
				break;

			case 'editar':
				$consulta = "UPDATE clientes SET nombre='$nombre', direccion='$direccion', telefono='$telefono',email='$email', comentarios='$comentarios' WHERE id='{$_POST['usuario']}'";
				$a = $conexion->query($consulta);
				$resultado = ($a) ? 'Registro actualizado' : 'Error al actualizar: '.$conexion->error;
				break;

			case 'ver':
				$consulta = "select * from clientes";
				$a = $conexion->query($consulta);
				if($a){
					$resultado = [];
					while ($res = $a->fetch_assoc()){	
						array_push($resultado, $res);	
					}
					$resultado = json_encode($resultado);
				} 
				else {
					$resultado = $conexion->error;
				}
				break;

			case 'borrar':
				$consulta = 'delete from clientes where clientes.id='.$_POST['usuario'];
				$a = $conexion->query($consulta);
				$resultado = ($a) ? 'Cliente borrado' : 'Error: '.$conexion->error;
				break;
				
			default:
				break;
		}
		echo $resultado;
	}

	

?>