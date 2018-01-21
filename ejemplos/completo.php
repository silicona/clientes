<!DOCTYPE html>
<html>
<head>

	<meta charset="utf-8">

	<title>Ejemplo completo</title>
	<link rel="stylesheet" type="text/css" href="bootstrap-3.3.7/css/bootstrap.css">
	<link rel="stylesheet" type="text/css" href="estilo.css">

	<script type="text/javascript" src="js/jquery-3.1.1.js"></script>
	<script type="text/javascript" src="bootstrap-3.3.7/js/bootstrap.js"></script>

	<script type="text/javascript" src="js/underscore-1.8.3.js"></script>
	<script type="text/javascript" src="js/backbone-1.3.3.js"></script>

</head>
<body class="container">
	<div class="row">
		<div class="col-lg-12">
			<h1>Ejemplo completo</h1>
			<p>Desde : <a href="https://medium.com/@scottdixon/backbone-js-with-php-mysql-362b07dad844">Este blog</a>. Falta investigarlo</p>
			
	  	<h2>Tareas</h2>
	  	<ul>
		  	<li><a href="javascript:;" id="ver">Ver la BD</a></li>
		  	<li><a href="javascript:;" id="nueva-tarea">Añadir nueva tarea</a></li>
	  	</ul>
		</div>
	</div>

	<!-- 
	<div id="app">
	  <h2>Tasks</h2>
	  <a href="javascript:;" id="new-task">+ New Task</a>
	  <div id="tasks"></div>
	</div> 
	-->
		
	<div id="app row">
		<div class="col-lg-6">
		  <div id="tareas"></div>
		</div>
		<div class="col-lg-6">
			<div id="BD"></div>
		</div>
	</div>

	<script type="text/javascript">
		// Create a Task model with a url property. 
		// Backbone will use this url to create new tasks and update/delete existing tasks. For each new task, we want to default done to false.

		var Tarea = Backbone.Model.extend({ 
		  url: function (){
		    return (this.id) ? "completo_db.php?id=" + this.id : "completo_db.php";
		  },
		  defaults: { hecho: 0 }
		});

		// Create a Tasks collection which will contain each task. Again, we provide a url property. Backbone will use this url to fetch the initial set of tasks from our database.

		var Tareas = Backbone.Collection.extend({
		  model: Tarea,
		  url: 'completo_db.php'
		});

		// Create a TaskView view. In backbone, the view also acts as a controller. 
		// We’ll listen for two events here: when a task anchor/link is clicked (in this case the delete button) and when a checkbox is toggled (which will send an UPDATE request to the server).

		var VistaTarea = Backbone.View.extend({
		  tagName: 'li',
		  events: {
		    'click a': function(){
		      tareas.remove(this.model)
		    },
		    'click input': function(){
		      this.model.set('hecho', this.model.get('hecho') == 0 ? 1 : 0)
		      Backbone.sync('update', this.model)
		    }
		  },
		 template: _.template('<p><input type="checkbox" <% if (hecho == 1){ %>checked<% } %>/> <%= titulo %> <a href="javascript:;">Borrar</a></p>'),
		 render: function(){
		   return this.$el.html(this.template(this.model.attributes));
		 }
		})

		// Here we listen for add/remove, which will re-render our list. 
		// We also trigger a DELETE request when a task is removed.

		var VistaTareas = Backbone.View.extend({
		  initialize: function() {
		    this.collection.on('add remove', this.render, this)
		    this.collection.on('remove', this.remove, this)
		  },
		  remove: function(tarea){
		    Backbone.sync('delete', tarea)
		  },
		  tagName: 'ul',
		  render:function () {
		    $('#tareas').children().detach();
		    $('#tareas').append(
		    	this.collection.map(function(tarea){
		      	return new VistaTarea({ model: tarea }).render();
		    	})
		    );
		  }
		});

		$(document).ready(function(){

		  $('#nueva-tarea').on('click', function(){
		    var titulo = prompt('Tarea:')
		    var tarea = new Tarea;
		    tarea.set('titulo', titulo);
		    tarea.save()
		    tareas.add(tarea);
		    console.log('tarea: ',tarea);
		    console.log('tareas: ',tareas)
		  })

		  $('#ver').on('click', function(){
		  	var a = $.ajax({
		  		url: 'completo_db.php',

		  		method: 'get',

		  		dataType: 'json',
		  	});

		  	a.done(function(res){
		  		//$('#BD').html(JSON.parse(res));
		  		console.log('Exito: %o', res);
		  	});

		  	a.fail(function(xhr, mensaje){
		  		$('#BD').html(mensaje);
		  		console.log('Fracaso: ' + res);
		  	});

		  	a.always(function(algo){
		  		$('#BD').append('<p>Final: </p>')
		  	})
		  });
		})

		var tareas = new Tareas();
		var vistaTareas = new VistaTareas({ collection: tareas });
		tareas.fetch();
	</script>

	<script type="text/javascript">

		/////////////////////
		// Código original //
		/////////////////////

		// Create a Task model with a url property. 
		// Backbone will use this url to create new tasks and update/delete existing tasks. For each new task, we want to default done to false.

		// var Task = Backbone.Model.extend({ 
		//   url: function (){
		//     return (this.id) ? "tasks.php?id=" + this.id : "tasks.php";
		//   },
		//   defaults: { done: 0 }
		// });

		// // Create a Tasks collection which will contain each task. Again, we provide a url property. Backbone will use this url to fetch the initial set of tasks from our database.

		// var Tasks = Backbone.Collection.extend({
		//   model: Task,
		//   url: 'tasks.php'
		// });

		// // Create a TaskView view. In backbone, the view also acts as a controller. 
		// // We’ll listen for two events here: when a task anchor/link is clicked (in this case the delete button) and when a checkbox is toggled (which will send an UPDATE request to the server).

		// var TaskView = Backbone.View.extend({
		//   tagName: 'li',
		//   events: {
		//     'click a': function(){
		//       tasks.remove(this.model)
		//      },
		//     'click input': function(){
		//       this.model.set('done', this.model.get('done') == 0 ? 1 : 0)
		//       Backbone.sync('update', this.model)
		//     }
		//   },
		//  template: _.template('<p><input type="checkbox" <% if (done == 1){ %>checked<% } %>/> <%= title %> <a href="javascript:;">Delete</a></p>'),
		//  render: function(){
		//    return this.$el.html(this.template(this.model.attributes));
		//  }
		// })

		// // Here we listen for add/remove, which will re-render our list. 
		// // We also trigger a DELETE request when a task is removed.

		// var TasksView = Backbone.View.extend({
		//   initialize: function() {
		//     this.collection.on('add remove', this.render, this)
		//     this.collection.on('remove', this.remove, this)
		//   },
		//   remove: function(task){
		//     Backbone.sync('delete', task)
		//   },
		//   tagName: 'ul',
		//   render:function () {
		// 	  $('#tasks').children().detach();
		// 	  $('#tasks').append(
		// 	   	this.collection.map(function(task){
		// 	  	return new TaskView({model: task}).render();
		// 	  }));

		//   }
		// });
	
		// // Add some jQuery for new tasks. The .save() method triggers a POST request to the server.

		// $(document).ready(function(){
		// 	$('#new-task').on('click', function(){
		//     var title = prompt('Task:')
		//     var task = new Task;
		//     task.set('title', title);
		//     task.save()
		//     tasks.add(task);
		//   });
		// });


		// var tasks = new Tasks();
		// var tasksView = new TasksView({collection: tasks });
		// tasks.fetch();
	</script>


</body>
</html>