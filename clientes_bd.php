<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

//include 'conexion.php';
	
	function asegurar($dato){
		$dato = addslashes($dato);
		$dato = htmlspecialchars($dato);
		return $dato;
	}

	$base = new PDO("mysql:host=localhost;dbname=clientes", 'usuario', 'pass');
	$datos = json_decode(file_get_contents('php://input'));
	//$datos = file('PHP://input');
	//$datos = json_encode(file('PHP://input'));
	//$datos = (file_get_contents('PHP://input'));

	$imagen = 'sin imagen';

	if(isset($_FILES['imagen'])){
		$resultado['img'] = subirImagen('alejo');
		$ini = substr($resultado['img'], 0, 5);
		$imagen = ($ini == 'imagen') ? $resultado['img'] : 'Sin imagen';
	}

	$metodo = $_SERVER['REQUEST_METHOD'];

	if($metodo == 'GET'){
		// if(isset($_GET['id'])){
		// 	//$consulta = "SELECT * FROM clientes WHERE id=".$_GET['id'];
		// 	$peticion = $base->query("SELECT * FROM clientes WHERE id=".$_GET['id']);
		// 	$peticion->setFetchMode(PDO::FETCH_ASSOC);
		// 	echo json_encode($peticion->fetch());
		// }
		// else {
		// 	$peticion = $base->query("SELECT * FROM clientes");
		// 	$peticion->setFetchMode(PDO::FETCH_ASSOC);
		// 	echo json_encode($peticion->fetchAll());

		// }

		$consulta = "SELECT * FROM clientes";
		$consulta .= (isset($_GET['id'])) ? " WHERE id=" . $_GET['id'] : '';
		
		$peticion = $base->query($consulta);
		$peticion->setFetchMode(PDO::FETCH_ASSOC);
		echo json_encode($peticion->fetchAll());
	}

	if($metodo == 'POST'){
		//$consulta = "INSERT INTO clientes (nombre, direccion, telefono, email, imagen, comentarios) VALUES (:nombre, :direccion, :telefono, :email, :imagen, :comentarios)";
		$consulta = "INSERT INTO clientes (nombre, direccion, telefono, prefijo, imagen, email, comentarios) VALUES (:nombre, :direccion, :telefono, :prefijo, :imagen, :email, :comentarios)";
		$peticion = $base->prepare($consulta);
		//$obj = $datos->attachment;
		//$datos = json_decode(file_get_contents('php://input'));
		//$datos = (file_get_contents('php://input'));

		// $peticion->execute(array(
		// 	':nombre' 		=> $datos->nombre,
		// 	':direccion' 	=> $datos->direccion,
		// 	':telefono' 	=> $datos->telefono,
		// 	':prefijo' 		=> $datos->prefijo,
		// 	':email' 			=> $datos->email,
		// 	//':imagen' 		=> $datos->imagen,
		// 	':imagen' 		=> $imagen,
		// 	':comentarios' => $datos->comentarios,
		// 	));
		// $resultado['id'] = $base->lastInsertId();

		// echo json_encode($resultado);

		echo json_encode($datos);
		//echo gettype($datos);
		//var_dump($datos);
		//echo implode(', ',array_keys($datos);
	}

	if($metodo == 'PUT'){
		$consulta = "UPDATE clientes SET nombre 	 = :nombre, 
																	 	 direccion = :direccion, 
																	 	 telefono  = :telefono,
																	   prefijo 	 = :prefijo,
																	   imagen 	 = :imagen, 
																	   email 		 = :email, 
																	   comentarios = :comentarios WHERE id = :id";

		$peticion = $base->prepare($consulta);
		$resultado = $peticion->execute(array(
			':nombre' 		=> $datos->nombre,
			':direccion' 	=> $datos->direccion,
			':telefono' 	=> $datos->telefono,
			':prefijo' 		=> $datos->prefijo,
			':email' 			=> $datos->email,
			':imagen' 		=> $imagen,
			//':imagen' 		=> $datos->imagen,
			':comentarios' => $datos->comentarios,
			':id' => $datos->id,
			));
		echo ($resultado) ? json_encode(['id' => $datos->id]) : '';
	}

	if($metodo == "DELETE"){
		$consulta = "DELETE FROM clientes WHERE id = :id";
		$peticion = $base->prepare($consulta);
		$id = asegurar($_GET['id']);
		//$peticion->execute(array(':id' => $id));
		$resultado = $peticion->execute(array(':id' => $id));
		echo json_encode($id);
	}

	function subirImagen($nombre){
		$directorio = 'subidas/';
		$archivo = $directorio . basename($_FILES['imagen']['name']);
		$tipo = pathinfo($archivo, PATHINFO_EXTENSION);

		$test = getimagesize($_FILES['imagen']['tmp_name']);
		if($test){
			if($archivo != $directorio . ''){
				if($tipo == "jpg" || $tipo == "png" || $tipo == "jpeg" || $tipo == "gif"){
					if(move_uploaded_file($_FILES['imagen']['tmp_name'], 'imagen-' . $nombre . '.' . $tipo)){
						$respuesta = 'imagen-' . $nombre . '.' . $tipo;
					}
					else {
						$respuesta = 'Ha habido un problema al subir la imagen';
					}
				}
				else {
					$respuesta = 'El archivo no es jpg, png, jpeg o gif';
				}
			}
			else {
				$respuesta = 'El archivo no es válido';
			}
		}
		else {
			$respuesta = 'El archivo no es una imagen';
		}


	}


?>