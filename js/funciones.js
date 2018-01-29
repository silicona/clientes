var Pelicula = Backbone.Model.extend({
	defaults: {
		codigo: '',
		titulo: '',
		direccion: '',
		actor: '',
		estreno: '',
		sinopsis: ''
	},

	validate: function(attr){
		for(a in attr){
			if(_.isEmpty(a)){
				return a + " debe tener algún valor";
			}
		}
	},

	urlRoot: '../php/gestor.php',

});

var ColeccionPeliculas = Backbone.Collection.extend({
	model: Pelicula,

	url: '/peliculas/',
});

var coleccion = new ColeccionPeliculas();

// var Index = Backbone.View.extend({
// 	tagname: 'div',

// 	el:'aside',

// 	initialize: function(){	this.render(); },

// 	events: {	'click .boton_aside': 'saludo_as'	},

// 	render: function(){ this.$el.append("<button class='boton_aside'>Púlsame para saludarte</button>");	},
// 	//template: _.template('<button class="boton">Hola</button>'),

// 	saludo_as: function(){ alert('Hello desde el Aside');	}
// });

//var index = new Index();

// var Portada = Backbone.View.extend({
// 	tagname: 'div',

// 	el: '.centro',

// 	initialize: function(){	this.render(); },

// 	render: function(){ 
// 		//this.$el.append("<button class='boton'>Púlsame</button>");
// 		this.$el.append(this.template(variable = 'ahora mismo'));	
// 	},

// 	events: {	'click .boton': 'saludo' },

// 	template: _.template('<button class="boton">Púlsame <%= variable %></button>'),

// 	saludo: function(){	alert('Hola Mundo'); }
// });

var ListaElemento = Backbone.View.extend({
	tagName: 'li',

	//el: '#listado',

	initialize: function(){ this.render(); },

	render: function(){
		this.el.append(this.template(this.model.toJSON()));
	},

	//template: _.template("<%= titulo %>"),
	template: _.template( $('#peliculaTemplate').html()),
});


var Listado = Backbone.View.extend({
	tagName: 'ul',

	initialize: function(){
		console.log(this.collection);
	},

	render: function(){},
});


var Rutas = Backbone.View.extend({
	routes: { 'mis_rutas' : 'enrutar'},

	enrutar: function(ruta){
		$('.menu nav ul li').html(ruta)
	}
});

$(document).ready(function(){
	//var portada = new Portada();
	
	//var index = new Index();

	//$('.centro').append("Dentro desde Funciones.<br>");

	$('#ver_lista').on('click', function(){
		$.ajax({
			url: 'includes/gestor.php',
			method: 'post',
			data: { accion: 'ver_lista' },
		}).done(function(json){
			var datos = $.parseJSON(json);
			for(x=0; x <  datos.length; x++){
			 	var dat = JSON.parse(datos[x]);
				var pelicula = new Pelicula({
					codigo: dat['codigo'],
					titulo: dat['titulo'],
					direccion: dat['direccion'],
					actor: dat['actor'],
					estreno: dat['estreno'],
					sinopsis: dat['sinopsis'],
				});
				coleccion.add(pelicula);
			}
			/*
			nombres = [];
				_.each(arti.attributes, function(valor, clave){
					(clave === "titulo") ? nombres.push(valor) : '';
				}); 
			});

			$('.centro').append('<br>Hay ' + coleccion.length + ' elementos en la colección: ' + nombres.join(', '));
			*/

			$('.centro').append('<div id="listado"></div>');
			//$('#listado').append('<ul></ul>');
			//var listado = new Listado({ collection: coleccion});
			_.each(coleccion.models, function(pelicula){ 
				var listado = new Listado({model: pelicula});
			});





		})
	});

	//var rutas = new Rutas();

	//Backbone.history.start();

	$('#ver_tabla').on('click', function(){ 
		$.ajax({
			url: 'includes/gestor.php',
			method: 'post',
			data: { accion: 'ver_tabla' }
		}).done(function(html){
			$('#centro').html(html);
		})
	});

})