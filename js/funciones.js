(function(){

	window.Base = {
		Modelo: {},
		Coleccion: {},
		Vista: {},
		Router: {},
		Constantes: {}
	};

	window.obtenerTemplate = function(id){
		return _.template( $('#' + id).html() );
	};

	// Constantes
		URL = window.location.href;
		
		if( URL.indexOf('localhost') != false ){

			Base.Root = 'http://localhost/clientes/';
			Base.File = '/home/silicona/Escritorio/html/clientes/';

		} else {

			Base.Root = '/';
			Base.File = '/';
		}
		
		console.log(Base.File);
		Base.Subidas = Base.File + 'subidas/';

	// Modelos
		Base.Modelo.Cliente = Backbone.Model.extend({
			
			url: function(){

				var ruta = Base.Root + 'clientes_bd.php';
				return this.id ? ruta + '?id=' + this.id : ruta;

			},

			defaults: {
				nombre: '',
				direccion: '',
				telefono: '', 
				prefijo: '34',
				tel_tipo: 'movil',
				email: '',
				imagen: 'avatar.jpg',
				comentarios: 'Sin comentarios'
			},

			//fileAttribute: 'imagen_archivo',
			fileAttribute: 'imagen_archivo',

			validate: function(atrs){
				var errores = [];
				// 	//console.dir('validando: ',atrs);

				if(!atrs.nombre){
			 		errores.push({ atributo: 'nombre', 
			 									 mensaje: 'El nombre no puede estar en blanco' });
				}

				return errores.length > 0 ? errores : false;

		  }

		});


	// Coleccion
		Base.Coleccion.Cartera = Backbone.Collection.extend({
			model: Base.Modelo.Cliente,
			url: Base.Root + 'clientes_bd.php',
		}),

	// Vistas
		Base.Vista.Inicio = Backbone.View.extend({
			tagName: 'table',

			className: 'table inicio',

			cabecera: obtenerTemplate('inicioCabecera'),

			initialize: function(){
				this.collection.on('add remove', this.render, this);
				this.collection.on('remove', this.remove, this);
			},

			render: function(){
				this.$el.html(this.cabecera);
				this.$el.append(
					this.collection.map(function(inicial){
						return new Base.Vista.Iniciales({ model: inicial }).render();
					})
				);
			},

			remove: function(inicial){
				Backbone.sync('delete', inicial)
			},
		});

		Base.Vista.Iniciales = Backbone.View.extend({
			tagName: 'tr',

			template: obtenerTemplate('inicioTemplate'),

			render: function(){
				return this.$el.html(this.template(this.model.toJSON()));
			},

			events: {
				'click .perfil': 'verPerfil',
				'click .editar': 'editar',
				'click .borrar': 'borrar',
			},

			verPerfil: function(){
				router.navigate('#perfil/' + this.model.id, { trigger: true });
			},

			editar: function(){
				router.navigate('#editar/' + this.model.id, { trigger: true });
				//var vista_form = new Base.Vista.Formulario({ model: this.model });
				//var vista_form = new Base.Vista.Form({ model: cliente });

				//vista_form.titulo = 'Editar cliente';
				//vista_form.boton = 'Actualizar';	
				//vista_form.render();		

			},

			borrar: function(){
				inicio.remove(this.model);
			}
		});

		Base.Vista.Cliente = Backbone.View.extend({
			tagName: 'tr',

			className: 'cliente',

			template: obtenerTemplate('clienteTemplate'),

			render: function(){
				return this.$el.html(this.template(this.model.toJSON()));
			},

			events: {
				'click .editar': 'editarCliente',
				'click .borrar': 'borrarCliente',
			},

			editarCliente: function(){
				router.navigate("#editar/" + this.model.id, { trigger: true });
			},

			borrarCliente: function(){
				this.model.destroy(); // Metodo de Backbone
			},

			eliminar: function(){
				this.$el.remove(); // Metodo de jQuery para el DOM
				borrarBD(this.model.id);
			},

			initialize: function(){
				this.model.on('change', this.render, this);
				this.model.on('destroy', this.eliminar, this);
			},
		});

		Base.Vista.Cartera = Backbone.View.extend({
			tagName: 'table',

			className: 'table cartera table-striped',

			cabecera: obtenerTemplate('carteraCabecera'),

			pie: obtenerTemplate('carteraPie'),

			initialize: function(){
				this.collection.on('add', this.render, this);
			},

			render: function(){
				this.$el.html( this.cabecera );
				this.$el.append(	
					this.collection.map(function(inicial){
						return new Base.Vista.Cliente({ model: inicial }).render();
					})
				);
				this.$el.append( this.pie );
			},
		});

		Base.Vista.Perfil = Backbone.View.extend({
			tagName: 'table',

			className: 'perfil table table-striped',

			template: obtenerTemplate('perfilTemplate'),

			render: function(){
				$('.pizarra').html(this.$el.html(this.template(this.model.toJSON())));
			},

			initialize: function(){
	  		this.model.on('change', this.render, this);
			},

			events: {
				'dblclick .dato' : 'abrirEdicion',
				'keypress .edicion': 'pulsarEnter',
				'keypress #telefono': 'formatearTel',
			},

			abrirEdicion: function(e){
				var valor = e.currentTarget.innerHTML;
				var celda = $(e.currentTarget);
				var tel = celda.attr('data') == 'telefono';

				celda.addClass('editando');

				if(tel){ celda.html('<input class="edicion" id="telefono" type="text" value="' + valor + '">');
				}
				else { celda.html('<input class="edicion" type="text" value="' + valor + '">');	}

				$('.edicion').focus();
			},

			pulsarEnter: function(e){
				if(e.which == 13){ this.cerrar(e.target);	}
			},

			formatearTel: function(e){
				perm = hacerRango(45, 58); // con e.charCode
				permitida = hacerRango(45, 58).find(function(el){	if(el == e.charCode){ return true } else { false } });

				if(!permitida){ alert('Caracter no permitodo'); return false }
			},

			cerrar: function(input){
				$padre = $(input).parent();
				$padre.html(input.value);

				console.log($padre.attr('data'));
				//editarAtributo(this.model.id, $padre.attr('data'), input.value);
				this.model.set($padre.attr('data'), input.value);
				Backbone.sync('update', this.model);

			},

		});

		Base.Vista.Formulario = Backbone.View.extend({
			
			tagName: 'form',

			className: 'form ingresar',

			template: obtenerTemplate('formulario'),


			initialize: function(e){

				this.titulo = e.titulo;
				this.boton = e.boton;

				this.model.on('invalid', function(modelo, errores){
					this.verErrores(modelo, errores);
				}, this);

				this.model.on('sync', function(mod, res, opt){
					if(res.peticion){

						router.navigate("#perfil/" + res.id , { trigger: true });
						$('.aviso').html(e.aviso);
					}
					else {

						router.navigate("clientes", { trigger: true });
					 	$('.aviso').html('Error en el registro');

					}

				})

			},


			render: function(e){

				var datos = { 

					titulo: this.titulo,
					boton: this.boton,

				};

				datos = Object.assign(datos, this.model.toJSON());
				
				//console.log('datos: ', datos);

				$('.pizarra').html(this.$el.html(this.template(datos)));

				//nombre.replace(['_', /[\s|\b]\w/g], [' ', function(letra){ letra.toUpperCase()}])
			
			},


			events: {

				'keypress #telefono': 'formatearTel',
				'change .input-imagen': 'verPreimagen',
				'click .boton_formulario': 'subir',
			
			},

			formatearTel: function(e){

				perm = hacerRango(45, 58); // con e.charCode
				permitida = perm.find(function(el){	if(el == e.charCode){ return true } else { false } });

				if(!permitida){ alert('Caracter no permitido'); return false }

			},

			verPreimagen: function(e){

				var archivo = e.target.files[0];

				var tipo = /image.*/;

				var nombre_imagen = archivo.name;

				if(!archivo.type.match(tipo)) { return }

				var lector = new FileReader();

				lector.onload = function(evento){

					var archivo = evento.target.result;

					$('.foto', '.form').attr('src', archivo);

					$('input[name=imagen]').attr('value', nombre_imagen);

				}

				lector.readAsDataURL(archivo);

			},

			subir: function(e){

				if(e){ e.preventDefault(); }

				var form = this.el;

				for(x=0; x<form.length; x++){
					if(form[x].name == 'boton' || form[x].name == 'imagen_archivo'){ continue }

					if((form[x].name == 'nombre') || (form[x].name == 'direccion')){
						form[x].value = form[x].value.replace(/\s/g, '_').toLowerCase();
					}

					this.model.set(form[x].name, form[x].value);
				}
				
				var imagen_base = $('.foto', '.col-imagen-cliente')[0].src.split(',')[1] || this.model.get('imagen');

				var opciones = {

					cache: false,

					data: { base64: imagen_base },

					processData: false,

					contentType: false,

				};

					// No se ejecutan success, error, done, ni fail
					// La respuesta se controla por el evento sync
				this.model.save( opciones );
  
			},

			verErrores: function(modelo, errores){
				console.log('modelo: ', modelo);
				console.log('errores: ', errores);
			}

		});

	// router
		Base.Router = Backbone.Router.extend({
			routes: {
				'' : 'index',
				'insertar' : 'insertar',
				'editar/:id' : 'editar',
				'clientes' : 'verTodos',
				'perfil/:id' : 'verPerfil',
			},

			index: function(){

				this.limpiar('pizarra', 'aviso');

				inicio = new Base.Coleccion.Cartera();
				inicio.fetch();
				var vista = new Base.Vista.Inicio({ collection: inicio });

				$('.pizarra').append(vista.el);

			},

			insertar: function(){

				this.limpiar('aviso');

				var cliente = new Base.Modelo.Cliente();
				var vista_formulario = new Base.Vista.Formulario({ model: cliente, 
																													 titulo: 'Registrar cliente',
																													 boton: 'Registrar' });

				vista_formulario.render();

			},

			editar: function(id){
				
				this.limpiar('aviso');
				
				//var vista_form = new Base.Vista.Form({ model: cliente });
				var cliente = new Base.Modelo.Cliente({ id: id });

				cliente.fetch().done(function(modelo){
					var vista_form = new Base.Vista.Formulario({ model: cliente,
																											 titulo: 'Editar cliente',
																											 boton: 'Actualizar' });
					//vista_form.titulo = 'Editar cliente';
					//vista_form.boton = 'Actualizar';
					vista_form.render();
					console.log('modelo', cliente.get('id'));

				});

				console.log('editando', cliente);

				//console.log(cliente.attributes);
				//vista_form.render();
			},

			verTodos: function(){

				this.limpiar('pizarra', 'aviso');

				conjunto = new Base.Coleccion.Cartera;
				var vista = new Base.Vista.Cartera({ collection: conjunto });

				conjunto.fetch();

				$('.pizarra').append(vista.el);	

			},

			verPerfil: function(id){

				perfil = new Base.Modelo.Cliente;
				perfil.id = id;

				var visa = new Base.Vista.Perfil({ model: perfil });

				perfil.fetch();

			},

			limpiar: function(zona){

				for(a in arguments){

					switch(arguments[a]){

						case 'aviso':
							$('.aviso').html('Sin avisos');
							break;

						default:
							$('.' + zona).html('');
							break;

					}

				}

			},

		});

	// Auxiliares
		var verEventos = function(evento){
			console.log('Evento: ', evento)
		}
		var oido = {};
		oido = _.extend(oido, Backbone.Events);
		oido.bind('submit', 'verEventos');
		//console.log('oido: ', oido);

		function hacerRango(start, edge, step) {
		  // If only one number was passed in make it the edge and 0 the start.
		  if (arguments.length == 1) {
		    edge = start;
		    start = 0;
		  }
 
		  // Validate the edge and step numbers.
		  edge = edge || 0;
		  step = step || 1;
		 
		  // Create the array of numbers, stopping befor the edge.
		  for (var ret = []; (edge - start) * step > 0; start += step) {
		    ret.push(start);
		  }
		  return ret;
		}


	$(document).ready(function(){

		router = new Base.Router();
		Backbone.history.start();

	});

})();