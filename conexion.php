<?php

	  error_reporting(E_ALL);

    // $host_name  = "localhost";
    // $database   = "videoclub";
    // $user_name  = "shilum";
    // $password   = "shilum";
    // $enlace = mysqli_connect($host_name, $user_name, $password, $database);    
    // if(mysqli_connect_errno()){
    // 	echo 'Error al conectar con la base de datos: '.mysqli_connect_error()."<br>";
    // 	echo '<div><a href="index.php">Volver a index</a></div>';
    // }
	$origen = $_SERVER['HTTP_REFERER'];
  $origen = substr($origen, 0, strpos($origen, ".php") + 4);

	class Conexion {
		private $db_host = 'localhost';
		private $db_nombre = 'clientes';
		private $db_usuario = 'usuario';
		private $db_pass = 'pass';

		public function enchufar(){
			$conexion = new mysqli(
				$this->db_host,
				$this->db_usuario,
				$this->db_pass,
				$this->db_nombre
				);

			if($conexion->connect_error){
				echo "Error de conexión ($conexion->connect_errno); $conexion->connect_error\n";
				//header('Location: '.$origen.'?respuesta=Error de conexion con el servidor. Inténtelo más tarde.');
				exit;
			} else {
				return $conexion;
			}
		}
	}

	$enchufe = new Conexion();
	$conexion = $enchufe->enchufar();
	$conexion->set_charset('utf8');

	function asegurar($dato){
		$dato = addslashes($dato);
		$dato = htmlspecialchars($dato);
		return $dato;
	}

?>
