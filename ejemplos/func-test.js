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
		Base.Constantes.Root = 'localhost/clientes/';

	// Modelos
		Base.Modelo.Cliente = Backbone.Model.extend({
			defaults: {
				id: '',
				nombre: '',
				direccion: '',
				telefono: '',
				email: '',
				comentarios: ''
			},

			urlRoot: '/clientes.php',
		});

	// Coleccion
		Base.Coleccion.Cartera = Backbone.Collection.extend({
			model: Base.Modelo.Cliente,
			url: '/clien_test/che.php',
		}),

		cartera = new Base.Coleccion.Cartera;

	// Vistas
		Base.Vista.Cliente = Backbone.View.extend({
			tagName: 'tr',

			className: 'cliente',

			template: obtenerTemplate('clienteTemplate'),

			render: function(){
				this.$el.html(this.template(this.model.toJSON()));
				return this;
			},

			events: {
				'click .editar': 'editarCliente',
				'click .borrar': 'borrarCliente',
			},

			editarCliente: function(){
				//var nombreNuevo = prompt('Por favor, introduce un nuevo nombre', this.model.get('nombre'));
				// Evita acciones si se pulsa cancel
				//if(!nombreNuevo) return;
				//this.model.set('nombre', nombreNuevo);
				router.navigate("#editar/" + this.model.id, { trigger: true });
			},

			borrarCliente: function(){
				this.model.destroy(); // Metodo de Backbone
			},

			eliminar: function(){
				this.$el.remove(); // Metodo de jQuery para el DOM
				//console.log(this.model.id);
				borrarBD(this.model.id);
			},

			initialize: function(){
				this.model.on('change', this.render, this);
				this.model.on('destroy', this.eliminar, this);
			},
		});

		Base.Vista.Cartera = Backbone.View.extend({
			tagName: 'table',

			className: 'cartera',

			render: function(){
				this.collection.each(function(cliente){
					var vista_cliente = new Base.Vista.Cliente({ model: cliente });
					this.$el.append(vista_cliente.render().el);
				}, this);

				return this;
			},
		});



		Base.Vista.Form = Backbone.View.extend({
			tagName: 'div',

			className: 'form',

			el: '.pizarra',

			//accion: 'defecto',

			template: obtenerTemplate('form'),
			//template: _.template($('#form').html()),

			render: function(acc, user){
				this.$el.html(this.template({ accion: acc, usuario: user, boton: boton }));
				return this;
			},

			events: {
				'submit': 'envioAjax',
			},

			envioAjax: function(e){
				modificarBD(e);
			},
		});

		Base.Vista.Test = Backbone.View.extend({
			tagName: 'table',

			el: '.pizarra',

			template: obtenerTemplate('carteraTemplate'),

			render: function(){
				this.collection.each(function(cliente){
					var vis_cli = Base.Vista.Cliente({ model: cliente});
					this.$el.append(vis_cli);
				}, this);
			},

			events: {
				//'change'
			},

			initialize: function(){
				console.log('this: ', this.collection.models);
				//this.collection.fetch();
				//console.log(this.collection);
			},
		});

	// To do
			var Todo = Backbone.Model.extend({
				defaults: {
					titulo: '',
					completado: false
				}
			});

			var ColeccionTodo = Backbone.Collection.extend({
				model: Todo,
				url: '/clientes/gestor.php'
			});

			var todos = new ColeccionTodo();
			//a = todos.fetch();
			//console.log('a: ', a);

	// Lamadas Ajax
		var obtenerDatos = function(){
			a = $.ajax({
				url: 'gestor.php',

				method: 'post',

				data: { accion: 'ver' },

				dataType: 'json',

			}).done(function(json){
					console.log('respuesta cruda: ',json);
					//datos = JSON.parse(json);
					//for(x=0; x<datos.length; x++){
						//a = JSON.parse(datos[x]);
						//a = datos[x];
					for(x=0; x<json.length; x++){
						console.log('cada uno: ',json[x]);
						a = json[x];
						//a = JSON.parse(json[x]);
						var cliente = new Base.Modelo.Cliente();
						cliente.set('id', a['id']);
						cliente.set('nombre', a['nombre']);
						cliente.set('direccion', a['direccion']);
						cliente.set('telefono', a['telefono']);
						cliente.set('email', a['email']);
						cliente.set('comentarios', a['comentarios']);

						clientes.add(cliente);
					}

					var vista_cartera = new Base.Vista.Cartera({ collection: clientes });
					$('.pizarra').append(vista_cartera.render().el);

			}).fail(function(xhr, text, thrown){
				console.log('Obj: ', xhr);
				console.log('Texto: ', text);
				console.log('Error lanzado: ', thrown);
			});

			console.log( 'ajax: ', a['responseText']);
		};

		var modificarBD = function(evento){
			evento.preventDefault();
			// console.log(e.target);
			var form = evento.target;
			//datos = [];
			var obj = {};
			for(x=0; x<form.length;x++){

				if(form[x].name == 'boton'){ continue };
				//(form[x].name != 'boton') ? obj[form[x].name] = form[x].value : continue; 
									//datos.push(form[x].value);
				obj[form[x].name] = form[x].value;
			}
			//var usuario = obj['usuario'], accion = obj['accion'];
			console.log(obj);
			//router.navigate('/test.php', {trigger: true});

			$.ajax({
				url: 'gestor.php',

				method: 'post',

				data: { accion: obj['accion'], 
								datos: obj,
								usuario: obj['usuario']
							},

				//error: function(xhr, status, thrown){	console.log('Error: ', status);	},
			}).done(function(resultado){
				//window.location.href = '#clientes';
				//router.navigate('#clientes', {trigger: true});
				$('.aviso').html(resultado);
			}).fail(function(xhr, resultado){
				$('.aviso').html(resultado);
			});

			obj = {};
		};

		var borrarBD = function(id){
			$.ajax({
				url: 'gestor.php',

				method: 'post',

				data: { accion: 'borrar',
								usuario: id},

				error: function(xhr, status, thrown){	console.log('Error: ', status);	},
			}).done(function(resultado){
				$('.aviso').html(resultado);
			});
			
		};

		var editarUsuario = function(id){
			$.ajax({
				url: 'gestor,php',

				method: 'post',

				data: { accion: 'editar',
								usuario: id, 
							},
				error: function(xhr, status, thrown){	console.log('Error: ', status);	},
			}).done(function(resultado){
				$('.aviso').html(resultado);
			});
		}

		// var envioAjax = function(e){
		// 	e.preventDefault();
		// }

	// router
		Base.Router = Backbone.Router.extend({
			routes: {
				'' : 'index',
				'insertar' : 'insertar',
				'editar/:id' : 'editar',
				'clientes' : 'verTodos',
				'perfil/:id' : 'verPerfil',
				'todos' : 'todos',
				'test' : 'test',
				//'clientes_bd': 'verClientes'
			},

			todos: function(){
				$('.pantalla').html('Toy en todos!!');
				console.log(JSON);
				//cartera.fetch()
			},

			verClientes: function(){
				
			},

			test: function(){
				clientes = new Base.Coleccion.Cartera([]);
				a = clientes.fetch({
					dataType: 'json',
				});
				 a.done(function(modelo, respuesta, opts){
				// 		//console.log(this);
				// 		console.log('Dentro:', modelo);
					console.log('modelo enjson: ', modelo);
				// 		//return respuesta;


				 	var vis_test = new Base.Vista.Test({ collection: clientes });
				 	vis_test.render();
					
				});
				// a.fail(function(d,e){
				// 	console.log('Error: ', e);
				// })
				// a.always(function(){
				// 	console.log('Desde always del router')
				// });
				//obtenerDatos();
				console.log('a', a);
				console.log('res: ', clientes);
				//var vis_test = new Base.Vista.Test({ collection: clientes });
				//vis_test.render();
			},

			limpiar: function(zona){
				switch(zona){
					case 'aviso':
						$('.aviso').html('Sin avisos');
						break;
					default:
						$('.' + zona).html('');
						break;
				}
			},

			index: function(){
				this.limpiar('pizarra');
				this.limpiar('aviso');
				clientes = new Base.Coleccion.Cartera();
				obtenerDatos();
			},

			insertar: function(){
				this.limpiar('aviso');
				$('.cartera').remove();
				var vista_formulario = new Base.Vista.Form();
				accion = 'insertar';
				usuario = ''
				boton = 'Registrar';
				vista_formulario.render(accion, usuario, boton);
			},

			editar: function(id){
				$('.cartera').remove();
				this.limpiar('aviso');
				var vista_formulario = new Base.Vista.Form();
				accion = 'editar';
				usuario = id;
				boton = 'Actualizar';
				vista_formulario.render(accion, usuario, boton);
			},

			verTodos: function(){
				this.limpiar('pizarra');
				this.limpiar('aviso');
				clientes = new Base.Coleccion.Cartera();
				obtenerDatos();
				console.log(clientes);
				//clientes = new Base.Coleccion.Cartera();
			},

			verPerfil: function(id){

			}
		});

	$(document).ready(function(){

		router = new Base.Router();
		Backbone.history.start();

		//datos = obtenerDatos();
		//console.log('datos: ', datos);
		//console.log('clientes: ', clientes.models);
		//var vista_cartera = new Base.Vista.Cartera({ collection: clientes, el: '.pizarra' });
		//$('.centro').append(vista_cartera.render().el);
		//console.log(vista_cartera);
	});

})();