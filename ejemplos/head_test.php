<meta charset="utf-8">

<meta charset="utf-8">

<link rel="stylesheet" type="text/css" href="estilo.css">

<script type="text/javascript" src="js/jquery-3.1.1.js"></script>
<!-- <link rel="stylesheet" type="text/css" href="bootstrap-3.3.7/css/bootstrap.css">
<script type="text/javascript" src="bootstrap-3.3.7/js/bootstrap.js"></script> -->

<script type="text/javascript" src="js/underscore-1.8.3.js"></script>
<script type="text/javascript" src="js/backbone-1.3.3.js"></script>


<script type="text/template" id="clienteTemplate">
		<td><strong><%= nombre %></strong></td>
		<td><%= direccion %></td>
		<td><%= telefono %></td>
		<td><%= email %></td>
		<td><%= comentarios %></td>
		<td><button class="editar">Ver perfil</button></td>
 		<td><button class="editar">Editar</button></td>
		<td><button class="borrar">Borrar</button></td>
</script>

<script type="text/template" id='carteraTemplate'>
		<td><strong><%= nombre %></strong></td>
		<td><%= direccion %></td>
		<td><%= telefono %></td>
		<td><%= email %></td>
		<td><%= comentarios %></td>
</script>

<script type="text/template" id='modificarTemplate'>
	<td><strong><%= nombre %></strong></td>
	<td><button class="editar">Ver perfil</button></td>
	<td><button class="editar">Editar</button></td>
	<td><button class="borrar">Borrar</button></td>
</script>

<script type="text/template" id="form">
	<form action="gestor.php" method="post">
		<table>
			<tr>
				<td><label for="nombre">Ingrese Nombre:</label></td>
				<td><input type="text" name="nombre" id="nombre"></td>
			</tr>
			<tr>
				<td><label for="direccion">Ingrese direccion:</label></td>
				<td><input type="text" name="direccion"></td>
			</tr>
			<tr>
				<td><label for="telefono">Ingrese teléfono:</label></td>
				<td><input type="text" name="telefono" id="telefono"></td>
			</tr>
			<tr>
				<td><label for="email">Ingrese email</label></td>
				<td><input type="email" name="email" id="email"></td>
			</tr>
			<tr>
				<td><label for="comentarios">Comentarios</label></td>
				<td><textarea col=30 row=20 name="comentarios" id="comentarios"></textarea></td>
			</tr>
			<tr>
				<td><input type="submit" value="<%- boton %>" name="boton"></td>
			</tr>
		</table>
		<input type="hidden" name="accion" value="<%= accion %>">
		<input type="hidden" name="usuario" value="<%= usuario %>">
	</form>
</script>


<script type="text/javascript" src="func-test.js"></script>
<!-- <script type="text/javascript" src="js/funciones.js"></script> -->