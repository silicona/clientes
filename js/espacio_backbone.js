(function(){
	window.obtenerTemplate = function(id){
		return _.template( $('#' + id).html() );
	};

	window.Videoclub = {
		Modelo: {},
		Coleccion: {},
		Vista: {},
		Router: {},
	};

	APP_HOME = 'localhost/videoclub/';



	Videoclub.Modelo.Pelicula = Backbone.Model.extend({	
		defaults: {
			codigo: '',
			titulo: '',
			direccion: '',
			actor: '',
			estreno: '',
			sinopsis: ''
		},

		// validate: function(attr){
		// 	for(a in attr){
		// 		if(_.isEmpty(a)){
		// 			return a + " debe tener algún valor";
		// 		}
		// 	}
		// },

		urlRoot: '../php/gestor.php',
	});

	Videoclub.Coleccion.Peliculas = Backbone.Collection.extend(
	{
		model: Videoclub.Modelo.Pelicula,
		url: '#peliculas',
	}, {
		crear_coleccion: function(json){
				  //var listar = function(json){
				var coleccion = new Videoclub.Coleccion.Peliculas;

				console.log(json);
		  	//var datos = $.parseJSON(json);
		  	//for(x=0; x <  datos.length; x++){
		  	for(x=0; x <  json.length; x++){
		  		//var dat = JSON.parse(datos[x]);
		  		var dat = JSON.parse(json[x]);

		  		var pelicula = new Videoclub.Modelo.Pelicula;

		  		pelicula.set('codigo', dat['codigo']),
		  		pelicula.set('titulo', dat['titulo']),
		  		pelicula.set('direccion', dat['direccion']),
		  		pelicula.set('actor', dat['actor']),
		  		pelicula.set('estreno', dat['estreno']),
		  		pelicula.set('sinopsis', dat['sinopsis']),

		  		coleccion.add(pelicula);
				}
				
				return coleccion;
			},
	});


	var obtenerDatos = function(){
		var datos = '';
		b = $.ajax({
			url: 'includes/gestor.php',

			method: 'post',

			data: { accion: 'ver_lista' },

			dataType: 'json',

			error: function(xhr, status, thrown){	console.log('Error: ', status);	},

			success: function(a, b, c){ return a }
		});//done(function(json){
		// 			//console.log('dentro');
		// 			//$('.pizarra').html('Datos recibidos');
		// 			//$('.pizarra').append(json[0]);
		// 				//datos = json;	//listar(json);
		// 				//return JSON.parse(json);
		// 				//coleccion = Videoclub.Router.crear_coleccion(datos);
		// 											//var vista_peliculas = new Videoclub.Vista.Peliculas({ collection: coleccion });
		// 					//vista_peliculas.render();
		// 			//console.log(coleccion);
		// 			return json;
		//});
		console.log(b);
		coleccion = Videoclub.Coleccion.Peliculas.crear_coleccion(b);
		console.log(coleccion);
		return coleccion;
	};

	//a = obtenerDatos();
	//console.log(a);

	//Vistas
		Videoclub.Vista.Pelicula = Backbone.View.extend({
			tagName: 'li',

			template: obtenerTemplate('peliculaTemplate'),

			initialize: function(){
				this.model.bind('change', 'verCambio');
			},

			verCambio: function(e){
				console.log(e);
			},

			render: function(){
				this.$el.html(this.template(this.model.toJSON()));
				return this;
			},
		});

		Videoclub.Vista.Peliculas = Backbone.View.extend({
			tagName: 'ul',

			//el: '.pizarra',

			render: function(){
				this.collection.each(function(pelicula){
					var pelicula_en_coleccion = new Videoclub.Vista.Pelicula({ model: pelicula });
					this.$el.append(pelicula_en_coleccion.render().el);
				}, this);
				return this;
			}
		});

		Videoclub.Vista.Formulario = Backbone.View.extend({
			tagName: 'div',

			className: 'form',

			el: '.pizarra',

			template: obtenerTemplate('form'),

			render: function(){
				this.$el.html(this.template);
				return this
			},
		});

		Videoclub.Vista.Nav = Backbone.View.extend({
			tagName: 'nav',

			//el: $('main'),

			className: 'menu',

			template: obtenerTemplate('nav'),

			render: function(){
				this.$el.html(this.template);
				return this;
			}
		});

	//Router
		Videoclub.Router = Backbone.Router.extend({
			routes: { 
				''					: 'index',
				'insertar'	: 'insertar',
				'peliculas' : 'ver', //show
				'peliculas/:id': 'ver', //show peliculas y pelicula
				'ver/:id'		: 'ver',
				'descargar/*varios': 'descargar',
				'busqueda/:query'	 : 'buscar',
				'*defecto'	: 'defecto',
			},

			limpiar: function(){
				$('.pizarra').html('');
			},

			index: function(){
				$('.ruta').html('En Index.');
			},

			insertar: function(){
				this.limpiar();
				var vista_formulario = new Videoclub.Vista.Formulario;
				vista_formulario.render();
			},

			ver: function(id){
				$('.centro').html();
				switch(id){
					case 1:

					  $('.ruta').html('En ver la id ' + id);
					  break;
					default:
					  $('.ruta').html('En Ver peliculas');
					  this.limpiar();

					  // var listar = function(json){

					  // 	var datos = $.parseJSON(json);
							// for(x=0; x <  datos.length; x++){
							//  	var dat = JSON.parse(datos[x]);

							// 	var pelicula = new Videoclub.Modelo.Pelicula;
							// 	pelicula.set('codigo', dat['codigo']),
							// 	pelicula.set('titulo', dat['titulo']),
							// 	pelicula.set('direccion', dat['direccion']),
							// 	pelicula.set('actor', dat['actor']),
							// 	pelicula.set('estreno', dat['estreno']),
							// 	pelicula.set('sinopsis', dat['sinopsis']),
								
							// 	coleccion.add(pelicula);
							// //console.log(dat);
							// }

							var vista_peliculas = new Videoclub.Vista.Peliculas({ collection: coleccion_peliculas });
							vista_peliculas.render();
					  
					  break;

				}
			},

			descargar: function(varios){
				 $('.ruta').html('Para descargar el capitulo ' + varios + ' (Parámetro con varios slashes)');
			},

			buscar: function(query){
				 $('.ruta').html('Buscando datos con los siguientes parametros: ' + query);
			},

			defecto: function(defecto){
				 $('.ruta').html('Esta ruta no existe. Intentabas acceder a: ' + defecto);
			},
		
		});

	var disparador = _.extend({}, Backbone.Events);

	//var coleccion_peliculas = obtenerDatos();
	//console.log(coleccion_peliculas);
	//var coleccion_peliculas = new Videoclub.Coleccion.Peliculas;


	$(document).ready(function(){
		var vista_nav = new Videoclub.Vista.Nav({ el: $('section.izq') });
		vista_nav.render();
		//var vista_formulario = new Videoclub.Vista.Formulario;
		//$('#insertar').click(function(){ vista_formulario.render().el });

		var router = new Videoclub.Router;
		//$('a').on('click', function(e){
			//router.navigate($(this).attr('href'), { trigger: true });
		//})

		router.on('ruta:insertar', function(id){

		});
		Backbone.history.start({ 
			//pushState: true 
		});


		//$('#insertar').click(function(){ $(this) = '#insertar' });
		$('#ver_lista').click(function(){ window.location.href = '#peliculas' });
		//var vista_pelicula = new Videoclub.Vista.Peliculas();

	})

})();