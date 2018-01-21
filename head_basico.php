<meta charset="utf-8">

<link rel="stylesheet" type="text/css" href="bootstrap-3.3.7/css/bootstrap.css">
<link rel="stylesheet" type="text/css" href="estilo.css">

<script type="text/javascript" src="js/jquery-3.1.1.js"></script>
<script type="text/javascript" src="bootstrap-3.3.7/js/bootstrap.js"></script>

<script type="text/javascript" src="js/underscore-1.8.3.js"></script>
<script type="text/javascript" src="js/backbone-1.3.3.js"></script>

<script type="text/template" id='inicioCabecera'>
		<thead>
			<tr>
				<th>Nombre</th>
				<th colspan=3>Opciones</th>
			</tr>
		</thead>
		<tbody>
</script>

<script type="text/template" id='inicioTemplate'>
	<td><strong><%= nombre %></strong></td>
	<td><button class="perfil">Ver perfil</button></td>
	<td><button class="editar">Editar</button></td>
	<td><button class="borrar">Borrar</button></td>
</script>

<script type="text/template" id='carteraCabecera'>
		<thead>
			<tr>
				<th>Nombre</th>
				<th>Direccion</th>
				<th>Teléfono</th>
				<th>Email</th>
				<th>Comentarios</th>
			</tr>
		</thead>
		<tbody>
			<caption>Cartera de clientes</caption>
</script>

<script type="text/template" id="clienteTemplate">
		<td><strong><%= nombre %></strong></td>
		<td><%= direccion %></td>
		<td><%- prefijo %> - <%- telefono %></td>
		<td><%= email %></td>
		<td><%= comentarios %></td>
</script>

<script type="text/template" id='carteraPie'>
		</tbody>
		<tfoot>
			<tr>
				<th colspan=5>Cartera de clientes</th>		
			</tr>
		</tfoot>	
</script>

<script type="text/template" id='perfilTemplate'>
	<table class="table perfil">
		<thead>
			<tr>
				<th colspan=2>Datos</th>
				<th>Imagen</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td class='etiqueta'>Nombre:</td>
				<td class='dato nombre' data="nombre"><%= nombre %></td>
				<td rowspan=4 class="retrato"><img src="subidas/<%= imagen %>" alt="<%= imagen %>" title="<%= nombre %>"></td>
			</tr>
				<td class='etiqueta'>Direccion:</td>
				<td class='dato' data="direccion"><%= direccion %></td>			
			</tr>
			<tr>
				<td class='etiqueta'>Teléfono:</td>
				<td class='dato' data="telefono"><%- telefono %></td>
			</tr>
			<tr>
				<td class='etiqueta'>Email:</td>
				<td class='dato' data="email"><%- email %></td>
			</tr>
			<tr>
				<td colspan=3 class="comentario" class='dato' data='comentarios'><%- comentarios %></td>
				<input type="hidden" value="<%= id %>" name="id">
			</tr>

		</tbody>
		<tfoot>
			<tr>
				<th colspan=2>Datos</th>
				<th>Imagen</th>
			</tr>
		</tfoot>
	</table>
</script>

<script type="text/template" id="form_crear">
	<legend><%= titulo %></legend>
	<div class="form-group">
		<label for="nombre">Ingrese Nombre:</label>
		<input type="text" name="nombre" id="nombre" class="form-control">
		<small class="form-text text-muted">Los apellidos son opcionales</small>
	</div>
	<div class="form-group">
		<label for="direccion">Ingrese direccion:</label>
		<input type="text" name="direccion" class="form-control">
	</div>
	<div class="form-group">
		<label for="telefono">Ingrese teléfono:</label>
		<div>
			<select name="prefijo">
				<option value="34"><img src="media/iconos/"><span>España<span> (+34)</option>
				<option value="355"><img src="media/iconos/"><span>Albania<span> (+355)</option>
				<option value="33"><img src="media/iconos/"><span>Francia<span> (+33)</option>
				<option value="298"><img src="media/iconos/"><span>Islas Feroe<span> (+298)</option>
				<option value="373"><img src="media/iconos/"><span>Moldavia<span> (+373)</option>
			</select>
			<input type="text" name="telefono" id="telefono">
		</div>
			<small class="form-text text-muted">Si lo desea, utilice / o - para separar los numeros.</small>
	</div>
	<div class="form-group">
		<label for="email">Ingrese email</label>
		<input type="email" name="email" id="email" class="form-control">
	</div>
	<div class="form-group">
		<label for="imagen">Imagen</label>
		<input type="file" name="imagen" id="imagen">
	</div>
	<div class="form-group">
		<label for="comentarios">Comentarios</label>
		<textarea col=30 row=20 name="comentarios" id="comentarios" class="form-control"></textarea>
	</div>
	<div class="form-group">
		<input type="submit" value="<%- boton %>" name="boton">
	</div>
</script>

<script type="text/template" id="form">
	<form action="" method="">
		<table>
			<tr>
				<td><label for="nombre">Ingrese Nombre:</label></td>
				<td><input type="text" name="nombre" id="nombre" value="<%- modelo.nombre %>"></td>
			</tr>
			<tr>
				<td><label for="direccion">Ingrese direccion:</label></td>
				<td><input type="text" name="direccion" value="<%- modelo.direccion %>"></td>
			</tr>
			<tr>
				<td><label for="telefono">Ingrese teléfono:</label></td>
				<td><input type="text" name="telefono" id="telefono" value="<%- modelo.telefono %>"></td>
			</tr>
			<tr>
				<td><label for="email">Ingrese email</label></td>
				<td><input type="email" name="email" id="email" value="<%- modelo.email %>"></td>
			</tr>
			<tr>
				<td><label for="comentarios">Comentarios</label></td>
				<td><textarea col=30 row=20 name="comentarios" id="comentarios"><%- modelo.comentarios %></textarea></td>
			</tr>
			<tr>
				<td><input type="submit" value="<%- boton %>" name="boton"></td>
			</tr>
		</table>

	</form>
</script>




