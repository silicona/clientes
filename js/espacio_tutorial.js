(function(){
	window.Tutorial = {
		Modelos: {},
		Colecciones: {},
		Vistas: {},

		// 13 - Router
		Router: {}
	};

	// Asignada como variable global, pero es posible crearsu propio espacio en Tutorial
	window.obtenerTemplate = function(id){
		return _.template( $('#' + id).html() );
	};

	Tutorial.Modelos.Persona = Backbone.Model.extend({
		defaults: {
			nombre: 'Invitada',
			edad: 35,
			trabajo: 'Diletante'
		}
	});

	Tutorial.Colecciones.Gente = Backbone.Collection.extend({
		model: Tutorial.Modelos.Persona
	});

	Tutorial.Vistas.Gente = Backbone.View.extend({
		tagName: 'ul',

		render: function(){
			this.collection.each(function(persona){
				var vistaPersona = new Tutorial.Vistas.Persona({ model: persona });
				this.$el.append(vistaPersona.render().el);
			}, this);

			return this;
		}
	});

	Tutorial.Vistas.Persona = Backbone.View.extend({
		tagName: 'li',

		template: obtenerTemplate('templatePersona'),

		render: function(){
			this.$el.html( this.template(this.model.toJSON()) );
			return this;
		},
	});

	Tutorial.Router = Backbone.Router.extend({
		routes: { 
			'': 'index',
			'ver/:id': 'ver',
			'descargar/*varios': 'descargar',
			'busqueda/:query': 'buscar',
			'*defecto': 'defecto',
		},

		index: function(){
			 $('.ruta').html('La ruta de Index ha sido invocada. Temblad, mortales.');
		},

		ver: function(id){
			 $('.ruta').html('Estamos en la ruta para ver la id ' + id);
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

	var coleccionGente = new Tutorial.Colecciones.Gente([
		{ nombre: 'Shilum', edad: 4 },
		{ nombre: 'Pepita', trabajo: 'Profesional cualificada' },
		{ edad: 67 }
	]);

	var vistaGente = new Tutorial.Vistas.Gente({ collection: coleccionGente });


	$(document).ready(function(){
		$('.centro').append(vistaGente.render().el);
		$('.centro').append('<div class="ruta"></div>');
		new Tutorial.Router;
		Backbone.history.start();
	});

})();
