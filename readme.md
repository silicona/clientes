# Gestor de clientes

Aplicacion realizada con BackboneJS y PHP 7.0. 

Descarga o clona el proyecto y crea la base de datos local según la estructura indicada. Abre el navegador y accede a localhost/clien_test/index.php.

## Base de datos

Aplicación construida con base de datos MySQL. Pendiente de test con LocalStorage

Los archivos actuales pueden ser modificados sin previo aviso.

### Estructura BD


| Field       | Type         | Null | Key | Default | Extra          |
|:-----------:|:------------:|:----:|:---:|:-------:|:--------------:|
| id          | int(11)      | NO   | PRI | NULL    | auto_increment |
| nombre      | varchar(30)  | YES  |     | NULL    |                |
| direccion   | varchar(200) | YES  |     | NULL    |                |
| email       | varchar(50)  | YES  |     | NULL    |                |
| telefono    | varchar(20)  | YES  |     | NULL    |                |
| prefijo     | int(7)       | YES  |     | NULL    |                |
| tel_tipo    | varchar(10)  | YES  |     | NULL    |                |
| comentarios | text         | YES  |     | NULL    |                |
| imagen      | varchar(30)  | YES  |     | NULL    |                |


## Licencia

Aplicación pedagógica. Aprende y difunde. Se agradece el reconocimeinto.
