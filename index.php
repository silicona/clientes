<!DOCTYPE html>
<html>
<head>
	<?php include 'head_basico.php' ?>
	<title>Index</title>
</head>
<body>

<main class='container-fluid'>
	<header><h1>Base de datos</h1></header>
	<div class="container">
		<nav class='col-md-2'>
			<ul class="acciones">
				<legend>Acciones</legend>
				<li><a href="index.php">Inicio</a></li>
				<!-- <li><a href="/clientes/">Inicio</a></li> -->
				<li id='ver_tabla'><a href="#clientes">Ver todos los clientes</a></li>
				<li id="insertar"><a href="#insertar">Insertar nuevos clientes</a></li>
				<li><a href="test.php">Test</a></li>
			</ul>
		</nav>
		<section class="col-md-8 centro">

			<!--<div style="margin: 2ex"><input type="file" name="" id="file"></div>-->

			<div class="pizarra">
				Ver la pizarra de inicio. Vacia de momento.
			</div>
		</section>
		<aside class='col-md-2'>
			<h3>Espacio de avisos</h3>
			<div class="aviso">Sin avisos</div>

		</aside>
	</div>
<footer>
	<p>Base de datos de prueba</p>
</footer>
</main>



<script type="text/javascript" src="funciones.js"></script>

</body>
</html>