<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">

	<meta name="viewport" content="width=device-width">
	<title>Inicio</title>

	<link rel="stylesheet" type="text/css" href="vendor/bootstrap-3.7.7/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="css/estilo.css">

	<script type="text/javascript" src="vendor/jquery-3.1.1.min.js"></script>
	<!-- <script type="text/javascript" src="vendor/bootstrap-4.0.0/dist/js/bootstrap.min.js"></script> -->
	<script type="text/javascript" src="vendor/bootstrap-3.3.7/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="vendor/underscore-1.8.3.js"></script>
	<script type="text/javascript" src="vendor/backbone-1.3.3.js"></script>

	<?php require_once 'inc/templatesBB.php' ?>

</head>
<body>

<main class='container-fluid'>

	<div class="container">

		<header><h1>Base de datos</h1></header>

		<nav class="acciones navbar">
			<a href="index.php" class="navbrand">Inicio</a>
			<a href="#clientes" id='ver_tabla'>Tabla de clientes</a>
			<a href="#insertar" id="insertar">Añadir cliente</a>
			<!-- <a href="test_clientes">Ver Tests</a> -->
			<a href="BBtests/iniciar.php">Ver Tests</a>
		</nav>	

		<section class="col-md-10 centro">

			<!--<div style="margin: 2ex"><input type="file" name="" id="file"></div>-->
			<div class="pizarra">
				Ver la pizarra de inicio. Vacia de momento.
			</div>

		</section>

		<aside class='col-md-2 lateral'>

			<h3>Espacio de avisos</h3>
			<div class="aviso">Sin avisos</div>

		</aside>

	</div>

	<footer>
		<p>Base de datos de prueba</p>
	</footer>
	
</main>



<script type="text/javascript" src="js/funciones.js"></script>

</body>
</html>