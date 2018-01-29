// 2 - Definiendo el objeto
var Persona_base = function(config){
  this.nombre = config.nombre;
  this.edad = config.edad;
  this.trabajo = config.trabajo;
};

Persona_base.prototype.trabajar = function(){
    return this.nombre + ' está currando.';
};

// 3 - Definiendo un modelo
var Persona = Backbone.Model.extend({
	defaults: {
		nombre: 'Invitada',
		edad: 38,
		trabajo: 'Diletante'
	},
	// 4 - Validacion
	// Solo actuan al emplear set()
	// Utiliza objeto.isValid() y objeto.validationError
	validate: function(atributos){
		if(atributos.edad < 0){
			return 'La edad debe ser positiva';
		}

		if(_.isEmpty(atributos.nombre)){
			return 'Todas las personas deben tener un nombre';
		}
	},
	trabajar: function(){
		return this.get('nombre') + ' lo está haciendo.';
	},
});

var Modelo = Backbone.Model.extend(
	{
		// Metodos y propiedades de instancia
    
    propiedadInstancia: 'valor de instancia',
    
    metodoInstancia: function(mensaje){ alert('Metodo de instancia') },

	}, {
		// Metodos y propiedades de clase
		propiedadClase: 'valor de clase',

    metodoClase: function(mensaje){ alert('Metodo de clase') },
	}
);

var SubModelo = Modelo.extend({
});

// console.log(Modelo.propiedadClase);
// Modelo.metodoClase();

// var modelo_base = new Modelo;
// console.log(modelo_base.propiedadInstancia);
// modelo_base.metodoInstancia();


var Cliente = Backbone.Model.extend({
	
	initialize: function(){
    console.log('Instancia de Cliente iniciada');
  },

  defaults: {
  	empresa: 'Desconocida',
  	telefonos: [],
  	edad: 20,
  },

  sumarTelefono: function(num){
  	var telefonos_array = this.get('telefonos');
  	telefonos_array.push(num);
  	this.set({ telefonos: telefonos_array });
  },

  validate: function(atributos){
  	console.log('Validando');
  	if(atributos.edad < 18){
  		return 'Demasiado joven';
  	}
  },

  // Modificar el nombre de la etiqueta id, referencia en el servidor
  idAttribute: 'dni',

  // Atributo cid - identificador en el cliente, aun sin enviar al servidor
    
});
var cliente = new Cliente({nombre: 'Alfonso Marin', empresa:'Universidad de murcia', telefonos:['968000000'], edad: 2 });
// Evento para recibir el error de la validacion
console.log(cliente.get('edad'));
cliente.bind('error', function(modelo, error){
	alert('error en ' + modelo + ': ' + error);
});

// Eventos provocados por set
cliente.bind('change',function(target, options){
    //options es el mismo objeto hash que se pasa desde el comando set(attrs, [options])
    alert('Atributo modificado');
});
 
cliente.bind('change:edad', function(target, valor, options){
   //Podemos acceder a la variable interna
   var old = this.previousAttributes().edad;
   alert('Modificada la edad a ' + valor + '. Antiguo valor:' + old);
});

// funcion para detectar los atributos cambiados exclusivamente
cliente.bind('change', function(){
    console.log('Cambiados: ', JSON.stringify(this.changedAttributes()));
});

//cliente.set({ edad: 15 });
//console.log(cliente.get('edad'));
//cliente.sumarTelefono('687000000');
//alert(cliente.get('telefonos')); // ['968000000', '687000000']


// 10 - Ayudantes de templates - Situado por posicionamiento de código con VistaPersona
var ayudante_template = function(id){
	return _.template( $('#' + id).html() );
}

// 5 - Explicando las vistas
var FichaCliente = Backbone.View.extend({
	tagName: 'li',

	className: 'ficha',

	template: _.template($('#fichaTemplate').html()),

	render: function(){
		$(this.el).append(this.template(this.model.toJSON()));
		return this;
	}
});

var VistaPersona = Backbone.View.extend({
	tagName: 'li',

	className: 'persona',

	id: 'id_persona',

	// 9 - anulado para usar el encadenado de VistaGente
	//initialize: function(){	this.render() },

	render: function(){
		// 5
		//this.$el.html( this.model.get('nombre') + ' (' + this.model.get('edad') + ') - ' + this.model.get('trabajo') );
		// 6
		//this.$el.html( this.mi_template(this.model.toJSON()) );
		// 7
		//this.$el.html( this.template_html(this.model.toJSON()) );
		// 10
		this.$el.html( this.template_aux(this.model.toJSON()) );

		// 9 - Encadenado
		return this;
	},
		

	// 6 - Usando templates
	mi_template: _.template("<strong><%= nombre %></strong> (<%= edad %>) - <%= trabajo %>"),

	// 7 - Mejorando templates
	// Código HTML para el Template - En head_tutorial.php
	// <script id="personTemplate" type="text/template">
  //   <strong><%= name %></strong> (<%= age %>) - <%= occupation %>
	// </script>
	template_html: _.template( $('#templatePersona').html() ),

	// 10 - Ayudantes de template
	template_aux: ayudante_template('templatePersona'),

	// 12 - Eventos
	events: {
		//'mouseover': 'mostrarAlerta',
		//'click strong': 'mostrarAlertaFuerte',
		'click .editar': 'editarPersona',
		'click .borrar': 'borrarPersona',
	},

	editarPersona: function(){
		var nombreNuevo = prompt('Por favor, introduce un nuevo nombre', this.model.get('nombre'));
		// Evita acciones si se pulsa cancel
		if(!nombreNuevo) return;
		this.model.set('nombre', nombreNuevo);
	},

	borrarPersona: function(){
		this.model.destroy(); // Metodo de Backbone
	},

	eliminar: function(){
		this.$el.remove(); // Metodo de jQuery para el DOM
	},

	initialize: function(){
		this.model.on('change', this.render, this);
		this.model.on('destroy', this.eliminar, this);
	},

	// mostrarAlerta: function(){
	// 	alert('Estás encima!!');
	// },

	// mostrarAlertaFuerte: function(e){
	// 	console.log(e);
	// 	alert('Has hecho ' + e.type + '!!');
	// },
});

// 8 - colecciones
var ColeccionGente = Backbone.Collection.extend({	
	model: Persona, 
});

var Clientes = Backbone.Collection.extend(
	{	// parte Instancia
		model: Cliente,

		comparator: function(cliente){
			// Orden por nombre
			return cliente.get('nombre');
		},
	}, 
	{	//parte Clase

	}
);

// 9 - Vista de colecciones
var VistaGente = Backbone.View.extend({
	tagName: 'ul',

	//el: '.centro',

	// 12 - Eventos - Formulario de Añadir Personas
	initialize: function(){
		//console.log(this.collection);
		//this.render();
		this.collection.on('add', this.sumarUno, this);
	},

	render: function(){
		//console.log('Render VistaGente - this: ', this);
		//console.log('Render VistaGente - this.collection.models: ', this.collection.models);
		//console.log('Render VistaGente - this.collection.toJSON(): ', this.collection.toJSON());
		//console.log('Render VistaGente - this.collection.toJSON()[0]: ', this.collection.toJSON()[0]);
		//this.collection.each(function(persona){
			//console.log('Persona: ', persona);
				//Dentro del loop, this pierde la referencia. Para mantenerla, se añade this como contexto de la funcion
			//console.log('Dentro de this.collection - this: ', this);
			//var persona_en_coleccion = new VistaPersona({ model: persona })
			//console.log('Dentro de this.collection - persona_en_coleccion: ', persona_en_coleccion);
			//console.log('Dentro de this.collection - persona_en_coleccion.el: ', persona_en_coleccion.el);
			//this.$el.append(persona_en_coleccion.render().el);
		//}, this);

		// 12 - Refactorizacion para incluir sumarUno
		this.collection.each(this.sumarUno, this);

		// Usar soiempre para encadenado
		return this;
	},

	sumarUno: function(persona){
		var persona_en_coleccion = new VistaPersona({ model: persona });

		this.$el.append(persona_en_coleccion.render().el);
	},
});

// 10 - Ayudante detemplates - Sobre 5

// 11 - Espacio de nombre - En espacio_tutorial.js

// 12 - Eventos - En 5 - vista_persona

var VistaSumarPersona = Backbone.View.extend({
	el: '#sumarPersona',

	events: {
		'submit': 'enviar',
	},

	enviar: function(e){
		e.preventDefault();
		console.log('Dentro de enviar');
		var nuevoNombrePersona = $(e.currentTarget).find('input[type=text]').val();

		var persona = new Persona({	nombre: nuevoNombrePersona });

		this.collection.add(persona);
	}
});

//13 - Router
	// Segundo tutorial
var Enrutador = Backbone.Router.extend({
	routes:{                                     // Ejemplos de coincidencias:
		""                  : "index",
    "help"              : "ayuda",           	 // #help
    "tag/:tagid"        : "muestraEtiqueta",    // #tag/perro
    "tag/:tagid/p:page" : "muestraEtiqueta",    // #tag/perro/p5
    "download/*file"    : "descargar",         // #download/path/to/file.txt
			//Especificación Ajax Crawling
		"!/post/:titulo"		: "post" // #!/post/tutorial-backbone-js

  },
  index: function() { /* ... */ },
  ayuda: function(){ /* ... */ },
	muestraEtiqueta: function(tagid, page){ /* ... */ },
	descargar: function(file){ /* ... */ },
	post: function(titulo){ /* ... */ },

	  // Uso de Regexp para una ruta
	initialize: function(){
		this.route(/post\/(\d+)/, 'id', function(IdPagina){ /*...*/ });
	},

});


//$(document).ready(function(){

	// 2 - Definiendo el objeto
		var person = new Persona_base({
			nombre: "Shilum",
			edad: 4,
			trabajo: "Dormir"
		});

		// console.log('Persona Base');
		// console.log(person.nombre);
		// console.log(person.edad);
		// console.log(person.trabajo);
		// console.log(person.trabajar());

	// 3 - Definiendo el modelo
		var persona = new Persona();

		// console.log('Modelo');
		// console.log(persona);
		// console.log(persona.toJSON());
		persona.set('nombre', 'Fire');
		//console.log(persona.class);
		// console.log(persona.get('nombre'));
		// console.log(persona.get('edad'));
		// console.log(persona.get('trabajo'));
		// console.log(persona.trabajar());

	// 4 - Validaciones
		persona.on('error', function(modelo, error){
			console.log(error);
		});
		//console.log('Validaciones');
		persona.set('edad', -1);
		//console.log('Es valido: ', persona.isValid());
		//console.log(persona.validationError);
		persona.set('edad', 12);
		persona.set('nombre', '');
		//console.log('Es valido: ', persona.isValid());
		//console.log(persona.validationError);
		persona.set('nombre', 'Nombre cambiado');

	// 5- Vistas I // 6 - Usando templates // 7 - Mejorando templates
		var vista_persona = new VistaPersona({ model: persona });

		//console.log('Vistas');
		//console.log(vista_persona);
		//console.log(vista_persona.el);
		//console.log(vista_persona.$el);
		//$('.centro').append(vista_persona.el);

		// var ficha = new FichaCliente({
		// 	el: $('aside'),
		// 	model: cliente,
		// })

	// 8 - Colecciones
		var coleccion_gente = new ColeccionGente([
			{ nombre: 'Zakiah', edad: 29},
			{ nombre: 'Tarro de Fresa', edad: 2, trabajo: 'Recopilador'},
			{ edad: 101 }
		]);
		
		coleccion_gente.add(persona);
		
		var otra_persona = new Persona({
			nombre: "Mohit Jain", 
			edad: 25, 
			trabajo: "Desarrollador"
		});

		var vista_otra = new VistaPersona({ model: otra_persona });

		coleccion_gente.add(otra_persona);

		//console.log('Colecciones');
		//console.log(coleccion_gente);
		//console.log(coleccion_gente.toJSON()[2]);

		var clientes = new Clientes([
			{nombre:'Qlfonso', apellidos:'Marín'}, 
		  {nombre:'Javier', apellidos:'Serrano'}
		]);

			// Recuperacion de datos
			// clientes.get('id-de-cliente');
			// clientes.getByCid('valor-id');
		//console.log(clientes.toJSON()[0]);
		//console.log(clientes.toJSON()[1]);

	// 9 - Vista de colecciones
		//console.log('Vista de colecciones');
			// 12 - Anulada para pasarla debajo de vista_sumar_persona
		var vista_gente = new VistaGente({ collection: coleccion_gente });
		//console.log(vista_gente);
		//vista_gente.render();
		//console.log('vista_gente.el: ', vista_gente.el);

	// 12 - Formulario añadir
		// Creacion de la vista tras la carga del DOM - Su el es un objeto DOM (formulario #sumarPersona)

		// Metodos Bind y Trigger
		var objeto = {};
		_.extend(objeto, Backbone.Events);
		objeto.bind('mi_evento', function(mensaje){
			alert('Mi evento tiene un mensaje: ' + mensaje);
		});

		objeto.bind('evento_hover', function(mensaje, final){
			alert("- " + mensaje + "\n- " + final);
		});

		objeto.bind('all', function(nombre_evento){
			alert('Todos los eventos llevan a mi, a través de ' + nombre_evento);
		})

	// 13 - Routers
		// En espacio_tutorial.js, debido a la fuente

//});

$(document).ready(function(){
	$('.centro').prepend('<h2>Tutorial.js</h2>');
	
	// 5 -6 - 7
	//$('.centro').append(vista_persona.render().el);
	
	// 9
	//var vista_gente = new VistaGente({ collection: coleccion_gente });
	$('.centro').append(vista_gente.render().el);
	//$('.centro').append(vista_sumar_persona.render().el);
	var vista_sumar_persona = new VistaSumarPersona({ collection: coleccion_gente });

	var ficha = new FichaCliente({
		el: $('aside'),
		model: cliente,
	});

	ficha.render();

	// 12 - Eventos - Funcion trigger (correspondiente con bind)
	$('#mievento').on('click', function(e){
		objeto.trigger('mi_evento', 'Hiciste ' + e.type);
	}).on('mouseover', function(e){
		objeto.trigger('evento_hover', 'Estoy encima: ' + e.type, 'No digas más');
	});

	// 13
	//new Enrutador;
	//Backbone.history.start();
		// Si la App no tiene el root en '/'
	//Backbone.history.start({ root: '/app/home'});
});
