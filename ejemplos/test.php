<!DOCTYPE html>
<html>
<head>
	<title>test</title>
	<?php include 'head_test.php' ?>
</head>
<body>

<main class='container-fluid'>
	<header><h1>Test</h1></header>
	<div class="container">
		<nav class='col-md-2'>
			<ul>
				<legend>Nav</legend>
				<li><a href="/clientes">Volver a inicio</a></li>
				<li><a href="/clien_test/test.php">Iniciar test</a></li>
				<li><a href="#test">Vista test</a></li>
				<li><a href="#todos">Insertar nuevos clientes</a></li>
				<li><a href="backbone_begin.html">Otro tutorial</a></li>
			</ul>
			<ul class="acciones">
				<legend>Acciones</legend>
				<li><a href="/clientes/">Inicio</a></li>
				<li id='ver_tabla'><a href="#clientes">Ver todos los clientes</a></li>
				<li id="insertar"><a href="#insertar">Insertar nuevos clientes</a></li>
				<li><a href="test.php">Test</a></li>
			</ul>
		</nav>
		<section class="col-md-8 centro">
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

<script type="text/javascript">
	// var Todo = Backbone.Model.extend({
	// 	defaults: {
	// 		titulo: '',
	// 		completado: false
	// 	}
	// });

	// var ColeccionTodo = Backbone.Collection.extend({
	// 	model: Todo,
	// 	url: '/clientes/gestor.php'
	// });

	// var todos = new ColeccionTodo();
	//  a = todos.fetch();
	//  console.log('a: ', a);
</script>

</body>
</html>