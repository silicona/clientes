<?php

//include 'conexion.php';

$db = new PDO("mysql:host=localhost;dbname=tareas_backbone", "usuario", "pass");
$data = json_decode(file_get_contents("php://input"));

// GET — > Retrieve a list of tasks.
// POST — > Create a new task.
// PUT — > Update a task (in this case, set done to true or false)
// DELETE —> Remove the task from the database

//Base de datos creada con:
//create table tareas(id int auto_increment, titulo varchar(50), hecho int, primary key (id));


if ($_SERVER['REQUEST_METHOD'] == 'GET'){
  $statement = $db->query('SELECT * FROM tareas');
  $statement->setFetchMode(PDO::FETCH_ASSOC);
  echo json_encode($statement->fetchAll());
}

if ($_SERVER['REQUEST_METHOD'] == 'POST'){
  $sql = 'INSERT INTO tareas (titulo) values (:titulo)';
  $query = $db->prepare($sql);
  $query->execute(array(':titulo'=>$data->titulo));
  $result['id'] = $db->lastInsertId();
  echo json_encode($result);
}

if ($_SERVER['REQUEST_METHOD'] == 'PUT'){
  $sql = 'UPDATE tareas SET hecho = :hecho WHERE id = :id';
  $query = $db->prepare($sql);
  $resultado = $query->execute(array(':hecho'=>$data->hecho, ':id'=>$data->id));
  echo json_encode($resultado);
}
 
if ($_SERVER['REQUEST_METHOD'] == 'DELETE'){
 $sql = 'DELETE FROM tareas WHERE id = :id';
 $query = $db->prepare($sql);
 $query->execute(array(':id'=>$_GET['id']));
}


/// Codigo original ///

//$db = new PDO("mysql:host=localhost;dbname=tasks", "root", "root");
//$data = json_decode(file_get_contents("php://input"));

//if ($_SERVER['REQUEST_METHOD'] == 'GET'){
  //$statement = $db->query('SELECT * FROM tasks');
  // $statement = $db->query('SELECT * FROM tareas');
  // $statement->setFetchMode(PDO::FETCH_ASSOC);
  // echo json_encode($statement->fetchAll());
//}

// if ($_SERVER['REQUEST_METHOD'] == 'POST'){
//   $sql = 'INSERT INTO tasks (title) values (:title)';
//   $query = $db->prepare($sql);
//   $query->execute(array(':title'=>$data->title));
//   $result['id'] = $db->lastInsertId();
//   echo json_encode($result);
// }

// if ($_SERVER['REQUEST_METHOD'] == 'PUT'){
//   $sql = 'UPDATE tasks SET done = :done WHERE id = :id';
//   $query = $db->prepare($sql);
//     // Comentada porque no devuelve nada a la coleccion
//     //$query->execute(array(':done'=>$data->done, ':id'=>$data->id));

//     // Anexo propio que persiste el check
//   $resultado = $query->execute(array(':hecho'=>$data->hecho, ':id'=>$data->id));
//   echo json_encode($resultado);
// }

// if ($_SERVER['REQUEST_METHOD'] == 'DELETE'){
//  $sql = 'DELETE FROM tasks WHERE id = :id';
//  $query = $db->prepare($sql);
//  $query->execute(array(':id'=>$_GET['id']));
// }

?>