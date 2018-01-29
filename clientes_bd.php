<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

define('BASE_URL', 'localhost/clien_test');
define('BASE_FILES', '/var/www/html/clien_test/');


//include 'conexion.php';
	
	function asegurar($dato){
		$dato = addslashes($dato);
		$dato = htmlspecialchars($dato);
		return $dato;
	}

<<<<<<< HEAD
//	$base = new PDO("mysql:host=localhost;dbname=clientes", 'usuario', 'pass');
	$base = new PDO("mysql:host=localhost;dbname=clientes_backbone", 'usuario', 'pass');

=======
	$base = new PDO("mysql:host=localhost;dbname=clientes", 'usuario', 'pass');

	// Fuente de datos procesados por Backbone
>>>>>>> d41f77b2dfd365071b64f769b2bf4574caf96d4f
	$datos = json_decode(file_get_contents('php://input'));

	$imagen = 'sin imagen';

	if(isset($_FILES['imagen'])){
	
		if($_FILES['imagen'] != ''){
			$resultado['img'] = subirImagen('alejo');
			$ini = substr($resultado['img'], 0, 5);
			$imagen = ($ini == 'imagen') ? $resultado['img'] : 'avatar.jpg';
		}

	}

	$metodo = $_SERVER['REQUEST_METHOD'];

	if($metodo == 'GET'){

		if(isset($_GET['id'])){

			$peticion = $base->query("SELECT * FROM clientes WHERE id=".$_GET['id']);
			$peticion->setFetchMode(PDO::FETCH_ASSOC);

			echo json_encode($peticion->fetch());

		}	else {

			$peticion = $base->query("SELECT * FROM clientes");
			$peticion->setFetchMode(PDO::FETCH_ASSOC);

			echo json_encode($peticion->fetchAll());

		}

	}


	if($metodo == 'POST'){

		//$consulta = "INSERT INTO clientes (nombre, direccion, telefono, email, imagen, comentarios) VALUES (:nombre, :direccion, :telefono, :email, :imagen, :comentarios)";
		$consulta = "INSERT INTO clientes (nombre, direccion, telefono, prefijo, tel_tipo, imagen, email, comentarios) VALUES (:nombre, :direccion, :telefono, :prefijo, :tel_tipo, :imagen, :email, :comentarios)";
		$peticion = $base->prepare($consulta);

		// Falta sanear $_POST
		$datos = $_POST;

		$peticion->execute(array(
			':nombre' 		=> $datos['nombre'],
			':direccion' 	=> $datos['direccion'],
			':telefono' 	=> $datos['telefono'],
			':prefijo' 		=> $datos['prefijo'],
			':tel_tipo' 	=> $datos['tel_tipo'],
			':imagen' 		=> $imagen,
			':email' 			=> $datos['email'],
			':comentarios' => $datos['comentarios'],
			));
		$resultado['id'] = $base->lastInsertId();

		echo json_encode($resultado);

	}

	if($metodo == 'PUT'){
		$consulta = "UPDATE clientes 
								 SET 		nombre 	  = :nombre, 
												direccion = :direccion, 
												telefono  = :telefono,
												prefijo 	= :prefijo,
												tel_tipo  = :tel_tipo,
												imagen 	  = :imagen, 
												email 		= :email, 
												comentarios = :comentarios 
								 WHERE 	id = :id";

		$peticion = $base->prepare($consulta);

			// Falta sanear $_POST
		$datos = $_POST;

		$resultado = $peticion->execute(array(
			':nombre' 		=> $datos['nombre'],
			':direccion' 	=> $datos['direccion'],
			':telefono' 	=> $datos['telefono'],
			':prefijo' 		=> $datos['prefijo'],
			':email' 			=> $datos['email'],
			':imagen' 		=> $imagen,
			//':imagen' 		=> $datos->imagen,
			':comentarios' => $datos['comentarios'],
			':id' => $datos['id'],
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

					if(move_uploaded_file($_FILES['imagen']['tmp_name'], BASE_FILES . $directorio . 'imagen-' . $nombre . '.' . $tipo)){

						$respuesta = 'imagen-' . $nombre . '.' . $tipo;

					}	else {

						$respuesta = 'Ha habido un problema al subir la imagen';

					}

				}	else {

					$respuesta = 'El archivo no es jpg, png, jpeg o gif';

				}

			}	else {

				$respuesta = 'El archivo no es válido';

			}

		}	else {

			$respuesta = 'El archivo no es una imagen';

		}

	}


?>