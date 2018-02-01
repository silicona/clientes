<!DOCTYPE html>
<html>
<head>
	<title>Babysteps</title>
	<meta charset="utf-8">
	<link rel="stylesheet" type="text/css" href="../../bootstrap-3.3.7/css/bootstrap.css">
	<script type="text/javascript" src="../../js/jquery-3.1.1.js"></script>
	<script type="text/javascript" src="../../bootstrap-3.3.7/js/bootstrap.js"></script>
	<script type="text/javascript" src="../../js/underscore-1.8.3.js"></script>
	<script type="text/javascript" src="../../js/backbone-1.3.3.js"></script>

	<script type="text/template" id='formulario'>

		<form class="col-sm-12">

      <legend>Share the feedback</legend>

      <div class="control-group">
        <label>Email</label><br>
        <input type="text" id="email" placeholder="Your email address...">
      </div>

      <div class="control-group">
        <label>Web site</label><br>
        <input type="text" id="website" placeholder="Your website...">
      </div>

      <div class="control-group">
        <label>Feedback</label><br>
        <textarea id="feedback" class="input-xxlarge" placeholder="Feedback text..." rows="6"></textarea>
      </div>

      <button type="submit" id="submit" class="btn">Submit</button>

    </form>

	</script>

</head>
<body>
<main class="container">
  
<h1>Babysteps</h1>
<nav class="nav nav-bar">
<a href="http://beletsky.net/blog/categories/babystepsbackbone/">Categoria del blog</a>
<a href="http://beletsky.net/2012/10/baby-steps-to-backbonejs-starting-up.html">Inicio</a>
<a href="http://beletsky.net/2012/11/baby-steps-to-backbonejs-model.html">Validacion</a>
<a href="http://backbonejs.org/">Backbone JS</a>
</nav>

<script src="baby-modelos.js"></script>
<script src="baby-vistas.js"></script>
<script src="baby-app.js"></script>

<div id="app"></div>


<script type="text/javascript">


</script>
</main>
</body>
</html>

