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
		Base.Constantes.Root = 'http://localhost/clien_test/';
		Base.Constantes.File = '/home/Silicona/Escritorio/html/clien_test/';

	// Modelos
		Base.Modelo.Cliente = Backbone.Model.extend({
			url: function(){
				return this.id ? 'clientes_bd.php?id=' + this.id : 'clientes_bd.php';
			},

			fileAttribute: 'attachment',
		});


		var Image = Backbone.Model.extend({

		    readFile: function(file) {
		        var reader = new FileReader();
		        // closure to capture the file information.
		        reader.onload = (function(theFile,that) {
		            return function(e) {
		                //set model
		                that.set({filename: theFile.name, data: e.target.result});

		            };
		        })(file,this);

		        // Read in the image file as a data URL.
		        reader.readAsDataURL(file);
		    }   
		});
	// Coleccion
		Base.Coleccion.Cartera = Backbone.Collection.extend({
			model: Base.Modelo.Cliente,
			url: 'clientes_bd.php',
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

		Base.Vista.CrearCliente = Backbone.View.extend({
			tagName: 'form',

			className: 'form ingresar',

			template: obtenerTemplate('form_crear'),

			//enctype: 'multipart/form-data',

			initialize: function(){
				//this.$el.attr('enctype', 'multipart/form-data');
				//this.$el.attr('data-remote', 'true');
				//this.$el.attr('method', 'post');
			},

			render: function(){
				var datos = { 
					titulo: this.titulo,
					boton: this.boton 
				};

				$('.pizarra').html(this.$el.html(this.template(datos)));
			},

			events: {
				'keypress #telefono': 'formatearTel',
				//'submit': 'enviar',
				//'all': 'verConsola',
				//'submit .ingresar': 'conForm',
				'submit': 'subir',
			},

			formatearTel: function(e){
				perm = hacerRango(45, 58); // con e.charCode
				permitida = perm.find(function(el){	if(el == e.charCode){ return true } else { false } });

				if(!permitida){ alert('Caracter no permitodo'); return false }
			},

			enviar: function(e){
				e.preventDefault();
				var form = e.target;
				var cliente = new Base.Modelo.Cliente;
				for(a=0; a<7; a++){
					if(form[a].name == 'boton'){ continue; }
				  cliente.set(form[a].name, form[a].value);
				}

				cliente.save({
				}).done(function(e){
					router.navigate("perfil/" + e.id , { trigger: true });
					$('.aviso').html('Nuevo cliente registrado');
				}).fail(function(e){
					router.navigate("clientes", { trigger: true });
					$('.aviso').html('Error en el registro');
				});
			},

			subir: function(e){
				if(e){ e.preventDefault(); }
				var valores = {};
				var archivo = $(':input[type="file"]')[0].files[0];

				var formData = new FormData()
				_.each($('form').serializeArray(), function(input){

					//valores[input.name] = input.value;
					this.model.set(input.name, input.value);
				}, this)

				//var cliente = new Base.Modelo.Cliente;
				this.model.set('attachment', archivo);
				console.log('valores: ', this.model);

				_.each(this.model.attributes, function(nom, val){
					formData.append(nom, val);
				});

				// _.defaults(),{
				// 	data: formData,
				// 	processData: false,
				// 	contentType: false,
				// }

				//console.log('valores: ', $('form :file'));
				this.model.save(
				// 	valores, 

				//  	{ iframe: true,
				//  		files: $('form :file'),
				//  		data: valores,
				//  		method: 'post' });
					//null,
						formData,
					{ 
						data: formData,
						processData: false,
						contentType: false,
						method: 'post',
					}
				).done(function(e){
					//router.navigate("perfil/" + e.id , { trigger: true });
					//$('.aviso').html('Nuevo cliente registrado');
					console.log(e);
				});

				this.model.on('progress', function(e){ console.log(e) })
			},

			conForm: function(e){
				if(e){ e.preventDefault(); e.stopPropagation()}

				var formData = new FormData();
				//console.log(this.$('form'));
				_.each(valores, function(key, value){
					formData.append(key, value);
				});

				formData.append('imagen', $('#imagen').files[0]);
				console.log('form:', formData);
			// 	this.model.save(
			// 		valores, 

			// 	 	{ iframe: true,
			// 	 		files: this.$('form :file'),
			// 	 		data: valores,
			// 	 		method: 'post',
			// 	 		processData: false,
			// 	 		contentType: false });

			},


//https://stackoverflow.com/questions/14743842/backbone-js-and-formdata


			// events : {
   //      "click #uploadDocument" : "showUploadDocumentDetails",
   //      "change #documents" : "documentsSelected",
   //      "click .cancel-document" : "cancelDocument"
   //  },
//     showUploadDocumentDetails : function(event) {
//         $('#id-gen-form').attr("enctype","multipart/form-data");
//         $('#id-gen-form').attr("action",this.model.url);
//         var config = {
//                 support : "image/jpg,image/png,image/bmp,image/jpeg,image/gif",     // Valid file formats
//                 form: "id-gen-form",                    // Form ID
//                 dragArea: "dragAndDropFiles",       // Upload Area ID
//                 uploadUrl: this.model.url               // Server side upload url
//             };

//                 initMultiUploader(config);




//         if($('#uploadDocument').attr("checked")){
//             $('#id-documentCategory-div').show();
//             $('#id-documentName-div').show();
//             this.model.set({"uploadDocument": "YES"},{silent: true});
//         }
//         else{
//             $('#id-documentCategory-div').hide();
//             $('#id-documentName-div').hide();
//             this.model.set({"uploadDocument": "NO"},{silent: true});
//         }
//     },
//     cancelDocument : function(event) {
//         var targ;
//         if (!event) event = window.event;
//         if (event.target) targ = event.target;
//         else if (event.srcElement) targ = event.srcElement;
//          $('#' + event.target.id).parent().parent().remove();
//          var documentDetails = this.model.get("documentDetails");
//          documentDetails = _.without(documentDetails, _(documentDetails).find(function(x) {return x.seqNum == event.target.id;}));
//          this.model.set({
//                 "documentDetails" : documentDetails
//             }, {
//                 silent : true
//             });
//     },
//     documentsSelected : function(event) {
//         var targ;
//         if (!event) event = window.event;
//         if (event.target) targ = event.target;
//         else if (event.srcElement) targ = event.srcElement;
//         if (targ.nodeType == 3) // defeat Safari bug
//         targ = targ.parentNode;
//                 var files = event.target.files; // FileList object

//                 var html = [];
//                 var documentDetails = [];
//                 $(".files").html(html.join(''));
//                 var _this = this;
//                 _this.model.set({
//                     "documentDetails" : documentDetails
//                 }, {
//                     silent : true
//                 });
//                  var seqNum = 0;
//             for(var i=0; i< files.length; i++){

//                 (function(file) {
//                     html.push("<tr class='template-upload' style='font-size: 10px;'>");
//                     html.push("<td class='name'><span>"+file.name+"</span></td>");
//                     html.push("<td class='size'><span>"+file.size+" KB <br/>"+file.type+"</span></td>");
//                     //html.push("<td><div class='progress progress-success progress-striped active'style='width: 100px;' role='progressbar' aria-valuemin='0' aria-valuemax='100' aria-valuenow='0'><div class='bar' style='width:0%;'></div></div></td>");
//                     if(LNS.MyesqNG.isMimeTypeSupported(file.type)){
//                         if(!LNS.MyesqNG.isFileSizeExceeded(file.size)){
//                             html.push("<td class='error' colspan='2'></td>");
//                             var reader = new FileReader();  
//                             console.log(reader);
//                                 reader.onload = function(e) { 
//                                       var targ;
//                                     if (!e) e = window.event;
//                                     if (e.target) targ = e.target;
//                                     else if (e.srcElement) targ = e.srcElement;
//                                     if (targ.nodeType == 3) // defeat Safari bug
//                                     targ = targ.parentNode;
//                                     console.log(e.target.result);
//                                       var content = e.target.result;
//                                       var document = new Object();
//                                       document.name = file.name;
//                                       document.type = file.type;
//                                       document.content = content;
//                                       document.seqNum = "document"+seqNum;
//                                       seqNum++;
//                                       documentDetails.push(document);
//                                      // _this.model.set({"documentDetails" : documentDetails},{silent:true});
//                                   };
//                                 reader.readAsDataURL(file, "UTF-8");
//                         }else{
//                              seqNum++;
//                             html.push("<td class='error' colspan='2'><span class='label label-important'>Error</span> Too long</td>");
//                         }
//                 }else{
//                      seqNum++;
//                     html.push("<td class='error' colspan='2'><span class='label label-important'>Error</span> Not suported</td>");
//                 }
//                  html.push("<td><a id='document"+i+"' class='btn btn-warning btn-mini cancel-document'>Cancel</a></td>");
//                  html.push("</tr>");
//                 })(files[i]);
//             }
//             $(".files").html(html.join(''));

//       }


// LNS.MyesqNG.isMimeTypeSupported = function(mimeType){
//     var mimeTypes = ['text/plain','application/zip','application/x-rar-compressed','application/pdf'];
//     if($.inArray(mimeType.toLowerCase(), mimeTypes) == -1) {
//         return false;
//     }else{
//         return true;
//     }
// };

// LNS.MyesqNG.isFileSizeExceeded = function(fileSize) {
//     var size = 2000000000000000000000000000;
//     if(Number(fileSize) > Number(size)){
//         return true;
//     }else{
//         return false;
//     }
// };
		});

	//ase.vista.Preview

		Base.Vista.Form = Backbone.View.extend({
			tagName: 'div',

			className: 'form',

			template: obtenerTemplate('form'),

			render: function(){
				var contenido = { modelo: this.model.toJSON(), boton: this.boton };
				$('.pizarra').html(this.$el.html(this.template(contenido)));
			},

			events: {
				'submit': 'envioAjax',
			},

			envioAjax: function(e){
				e.preventDefault();
				var form = e.target;

				for(x=0; x<form.length;x++){
				 	if(form[x].name == 'boton'){ continue };
					this.model.set(form[x].name, form[x].value)
				}
				console.log('Modelo saliendo: ', this.model);
				this.model.save().done(function(res){
					console.log('vuelta: ', res.id);
					router.navigate("perfil/" + res.id, { trigger: true });
					$('.aviso').html('Perfil actualizado');
				});
			},

			envioUpdate: function(e){
				e.preventDefault();
			},

			initialize: function(nuevo){
				this.model.on('change', this.render, this)
			}
		});

	// Auxiliares
		var verEventos = function(evento){
			console.log('Evento: ', evento)
		}
		var oido = {};
		oido = _.extend(oido, Backbone.Events);
		oido.bind('submit', 'verEventos');
		console.log('oido: ', oido);

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

	// Llamadas Ajax
		var obtenerDatos = function(){
			$.ajax({
				url: 'gestor.php',

				method: 'post',

				data: { accion: 'ver' },

				error: function(xhr, status, thrown){	console.log('Error: ', status);	},

			}).done(function(json){
					console.log(json);
					datos = JSON.parse(json);
					for(x=0; x<datos.length; x++){
						a = JSON.parse(datos[x]);
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
			});
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

			index: function(){
				this.limpiar('pizarra', 'aviso');
				inicio = new Base.Coleccion.Cartera();
				inicio.fetch();
				var vista = new Base.Vista.Inicio({ collection: inicio });
				$('.pizarra').append(vista.el);
			},

			insertar: function(){
				this.limpiar('aviso');
				var cliente = new Base.Modelo.Cliente;
				var vista_formulario = new Base.Vista.CrearCliente({ model: cliente });
				vista_formulario.titulo = 'Registrar cliente';
				vista_formulario.boton = 'Registrar';
				vista_formulario.render();
			},

			editar: function(id){
				this.limpiar('aviso');
				var cliente = new Base.Modelo.Cliente({ id: id });
				var vista_formulario = new Base.Vista.Form({ model: cliente });
				vista_formulario.boton = 'Actualizar';
				cliente.fetch();
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
		});

	$(document).ready(function(){

		router = new Base.Router();
		Backbone.history.start();

	});

})();