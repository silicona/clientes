<!DOCTYPE html>
<html>

  <head>

    <title>Test clientes</title>


  <meta charset="utf-8">

  <meta name="viewport" content="width=device-width">
  <title>Tests BB</title>
  <link rel="stylesheet" type="text/css" href="../vendor/bootstrap-3.3.7/css/bootstrap.min.css"></script>
  <link rel="stylesheet" type="text/css" href="../vendor/qunit-2.6.0.css">
  <link rel="stylesheet" type="text/css" href="../css/estilo.css">

  <script type="text/javascript" src="../vendor/jquery-3.1.1.min.js"></script>
  <!-- <script type="text/javascript" src="vendor/bootstrap-4.0.0/dist/js/bootstrap.min.js"></script> -->
  <script type="text/javascript" src="../vendor/bootstrap-3.3.7/js/bootstrap.min.js"></script>
  <script type="text/javascript" src="../vendor/qunit-2.6.0.js"></script>

  <script type="text/javascript" src="../vendor/underscore-1.8.3.js"></script>
  <script type="text/javascript" src="../vendor/backbone-1.3.3.js"></script>
  
  <?php require_once '../inc/templatesBB.php' ?>


  </head>
  <body>

  <div class="container">
    
    <h1>Tests TDD Clientes</h1>

    <nav class="navbar">
      <a href="../" class="navbrand">Inicio</a>
      &emsp;
      <a href="https://github.com/delawski/Tutorial-TDD-Backbone.js/blob/master/docs/tutorial-part1.md" target="_blank">Tutorial Delawski</a>
      &emsp;
      <a href="http://api.qunitjs.com/" target="_blank">Api QUnit</a>
    </nav>

    <section class="row">
      <article class="col-sm-10 col-sm-offset-1">
        
        <div id="qunit"></div>
        <div id="qunit-fixture"></div>

      </article>
    </section>

  </div>

       <!-- Fuente -->
    <script type="text/javascript" src="../js/funciones.js"></script>

      <!-- Tests -->
    <script type="text/javascript" src="vistas/inicio_test.js"></script>
    <script type="text/javascript" src="modelos/cliente_test.js"></script>
    <script type="text/javascript" src="colecciones/cartera_test.js"></script>
    <!-- <script type="text/javascript" src="tests/vistas.js"></script> -->
  </body>
</html>