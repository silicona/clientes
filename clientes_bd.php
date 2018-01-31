<?php

	ini_set('display_errors', 1);
	error_reporting(E_ALL);

	define( 'SUBIDAS', 'subidas/' );

	define('BASE_URL', 'localhost/clien_test');

	define('BASE_FILES', '/var/www/html/clien_test/');
	$base = new PDO("mysql:host=localhost;dbname=clientes", 'usuario', 'pass');


	//define('BASE_FILES', '/Applications/XAMPP/htdocs/alejo/clientes/');
	//$base = new PDO("mysql:host=localhost;dbname=clientes_backbone", 'usuario', 'pass');

		// Fuente de datos procesados por Backbone
	$datos = json_decode(file_get_contents('php://input'));


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

		$consulta = "INSERT INTO clientes (nombre, direccion, telefono, prefijo, tel_tipo, imagen, email, comentarios) 
												VALUES (:nombre, :direccion, :telefono, :prefijo, :tel_tipo, :imagen, :email, :comentarios)";

		$peticion = $base->prepare($consulta);

		$subida = preparar_atributo_imagen_validado($datos);

		$resultado['peticion'] = $peticion->execute(array(
			':nombre' 		=> $datos -> nombre,
			':direccion' 	=> $datos -> direccion,
			':telefono' 	=> $datos -> telefono,
			':prefijo' 		=> $datos -> prefijo,
			':tel_tipo' 	=> $datos -> tel_tipo,
			':imagen' 		=> $subida['imagen'],
			':email' 			=> $datos -> email,
			':comentarios' => $datos -> comentarios,
			));

		$resultado['id'] = $base->lastInsertId();

		$resultado['subida'] = $subida;
		$resultado['datos'] = $datos;
		$resultado['aviso'] = 'Nuevo cliente registrado';
		
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

		$subida = preparar_atributo_imagen_validado($datos);

		$resultado['peticion'] = $peticion -> execute( array(
			':id' 				=> $datos -> id,
			':nombre' 		=> $datos -> nombre,
			':direccion' 	=> $datos -> direccion,
			':telefono' 	=> $datos -> telefono,
			':prefijo' 		=> $datos -> prefijo,
			':tel_tipo' 	=> $datos -> tel_tipo,
			':imagen' 		=> $subida['imagen'],
			':email' 			=> $datos -> email,
			':comentarios' => $datos -> comentarios,
			));

		$resultado['error'] = !$resultado['peticion'] ? mysqli_error($base) : 'Sin errores';

		$resultado['id'] = $datos -> id;

		$resultado['aviso'] = 'Perfil actualizado';

		echo json_encode($resultado);
	}

	if($metodo == "DELETE"){

		$consulta = "DELETE FROM clientes WHERE id = :id";
		
		$peticion = $base->prepare($consulta);

		$id = asegurar($_GET['id']);

		$resultado = $peticion->execute(array(':id' => $id));

		echo json_encode($id);

	}

/////////// Auxiliares ////////////////

	function asegurar($dato){
		$dato = addslashes($dato);
		$dato = htmlspecialchars($dato);
		return $dato;
	}

	//// Validando ////
	function preparar_atributo_imagen_validado($datos){
	
		$imagen_final = 'avatar.jpg';

		$nombre = $datos -> nombre;

		$imagen_previa = $datos -> imagen;

		$imagen64 = $datos -> data -> base64;

		if( $imagen64 ){

			if($imagen64 != ''){

				$imagen_nombre = 'imagen_' . $nombre . '.jpg';

				$ruta = BASE_FILES . SUBIDAS . $imagen_nombre;

				$salida['subida'] = file_put_contents($ruta, base64_decode($imagen64));

				if( $salida['subida'] !== false ){

					$imagen_final = $imagen_nombre;
					$salida['subida'] = error_get_last();

				} else {

					$salida['subida'] = error_get_last();

				}

			} else if($imagen_previa != 'avatar.jpg'){

				$imagen_final = $imagen_previa;

			}

		}
		
		$salida['imagen'] = $imagen_final;

		return $salida;
	}

	//// Sin validar ///
	function preparar_atributo_imagen($nombre_cliente, $imagen_previa){
	
		$imagen = 'avatar.jpg';

		if(isset($_FILES['imagen_archivo'])){
		
			if($_FILES['imagen_archivo']['name'] != ''){

				$imagen_subida = subirImagen($nombre_cliente);
				$res['subida'] = $imagen_subida;

				$imagen = crea_atributo_imagen($imagen_subida);

			} else if($imagen_previa != 'avatar.jpg'){

				$imagen = $imagen_previa;

				//$imagen = 'sin imagen';

			}

		}
		
		$res['imagen'] = $imagen;

		return $res;

	}

	function subirImagen($nombre_cliente){

		$directorio = 'subidas/';

		$archivo = $directorio . basename($_FILES['imagen_archivo']['name']);

		$tipo = pathinfo($archivo, PATHINFO_EXTENSION);

		$test = getimagesize($_FILES['imagen_archivo']['tmp_name']);

		if($test){

			if($archivo != $directorio . ''){

				if($tipo == "jpg" || $tipo == "png" || $tipo == "jpeg" || $tipo == "gif"){

					$nombre_imagen = 'imagen-' . $nombre_cliente . '.' . $tipo;

					$subida = move_uploaded_file(	$_FILES['imagen_archivo']['tmp_name'],
																				BASE_FILES . $directorio . $nombre_imagen );

					if($subida){

						$respuesta = $nombre_imagen;

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

		return $respuesta;

	}

	function crea_atributo_imagen($nombre_imagen){

		$ini = substr($nombre_imagen, 0, 6);
		$atributo_imagen = ($ini == 'imagen') ? $nombre_imagen : 'avatar.jpg';

		return $atributo_imagen;

	}


?>