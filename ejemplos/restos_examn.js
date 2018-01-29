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

				// _.each($('form').serializeArray(), function(input){

				// 	//valores[input.name] = input.value;
				// 	this.model.set(input.name, input.value);
				// }, this)

				// //var cliente = new Base.Modelo.Cliente;
				// this.model.set('imagen_archivo', archivo);

				// _.each(this.model.attributes, function(val, nom){
				// 	//formData.append(nom, val);
				// 	formData[nom] = val;
				// });

				// console.log('valores: ', formData);

								// var valores = {};
				// var archivo = $(':input[type="file"]')[0].files[0];

				//this.model.on('progress', function(e){ console.log('Progreso: ',e) })

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


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 				module.exports = Backbone.View.extend({
//     initialize: function(options) {
//         this.render();
//         $('#app').html(this.$el);

//         var fileInput = document.getElementById('userPhotoInput');
//         fileInput.addEventListener('change', function(e) {
//             var file = fileInput.files[0];
//             var reader = new FileReader();
//             reader.onload = function(e) {
//                 $('#fileData').val(reader.result);
//                 $('#fileName').val(file.name);
//             };
//             reader.readAsDataURL(file);
//         });

//     },
//     render: function() {
//         this.$el.html(template({data: this.model.attributes}));
//     },
//     events: {
//         submit: 'save',
//     },
//     save: function(e) {
//         e.preventDefault();
//         e.stopPropagation();
//         var newFile = this.$('#fileData').val();
//         var newFilename = this.$('#fileName').val();
//         var self = this;
//         this.model.save(
//             { 
//                 file: newFile,
//                 filename: newFilename
//             },
//             {
//                 error: function(model, response) {
//                     alert('Failed to save resume. Please try again.');
//                 },
//                 success: function(model, response, options) {
//                     if(response.status == "failed") {
//                         alert(response.message);
//                     } else {
//                         alert('Added successfully.');
//                         Backbone.history.navigate('/resumes', {trigger: true});
//                     }
//                 }
//             }
//         });
//     }
// });

// router.post('/', function(req, res) {
//     var data = {
//         created_at: Date.now()
//     };

//     //get the file extension
//     var re = /(?:\.([^.]+))?$/;
//     var ext = re.exec(req.body.filename)[1]; 
//     //build our filename
//     var filename = req.body.filename + "." + ext;

//     var data_url = req.body.file;
//     //strip out all of the meta data
//     var matches = data_url.match(/^data:.+\/(.+);base64,(.*)$/);
//     var base64_data = matches[2];
//     //decode the base64 data
//     var buffer = new Buffer(base64_data, 'base64');
//     //where to save the file
//     var folder = "tmp/"

//     fs.writeFile(folder + filename, buffer, function(err, stat) {
//         if(err) {
//             res.json({status: 'failed', message: 'Failed to upload file. Please try again.'});
//         } else {
//             data.file = folder + filename;
//             var model = new Model(data);
//             model.save(function(err, saved) {
//                 res.json( (err) ? {status: 'failed', message: 'Failed to save new item'} : {status: 'added', _id: saved._id, created_at: saved.created_at} );
//             });
//         }
//     });

// });


//////////////////////////////////////////////////////////////////////////////////////////////

Base.Vista.Preview = Backbone.View.extend({
			tagName: 'img',

			el: '.imagen_cliente',
			alt: 'gggg',

			//className: 'prevista',

			initialize: function(){
				//this.render()
			},

			render: function(){
				this.$el.attr('src', 'gggg');
			},
		});

		Base.Vista.Form = Backbone.View.extend({
			tagName: 'div',

			className: 'form',

			template: obtenerTemplate('form'),

			render: function(e){

				console.log(e);

				var contenido = { 
					modelo: this.model.toJSON(), 
					boton: this.boton 
				};

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
				
				//console.log('Modelo saliendo: ', this.model);
				
				this.model.save().done(function(res){
					
					//console.log('vuelta: ', res.id);
					router.navigate("perfil/" + res.id, { trigger: true });

					$('.aviso').html('Perfil actualizado');
				
				});

			},


			initialize: function(nuevo){


				this.model.on('change', this.render, this);

			}

		});


		
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
