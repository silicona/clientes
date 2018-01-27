# MySQL

## Comandos

Mostrar las Bases de datos
  : `SHOW databases;`

Crear Base de datos
  : `CREATE database videoclub;`

Operar con una Base de datos
  : `use videoclub;`

Mostrar las tablas de una BD
  : `SHOW tables;`

Muestra los registros de una tabla
  : `DESCRIBE peliculas;`

Crear Tablas
  : `CREATE table peliculas ( id int auto_increment, titulo varchar(20) NOT NULL, direccion varchar(200) DEFAULT '', autor varchar (200), estreno year(4), sinopsis text, primary key (codigo));`

Vacia la tabla y la vuelve a crear
  : `TRUNCATE table peliculas;`

Renombrar tabla
  : `ALTER TABLE amigos RENAME contactos;`

  : `RENAME TABLE amigos TO contactos;`

Comprobar tabla
  : `CHECK TABLE peliculas FAST QUICK;`

  : `CHECK TABLE peliculas EXTENDED;`

Añadir indice
  : `ALTER TABLE peliculas ADD INDEX <nombre_indice>(<nombre_campo>);`

Añadir campo a tabla
  : `ALTER TABLE (nombre_tabla) ADD COLUMN <nombre_columna> <tipo> AFTER <nombre_columna>;`

  : `ALTER TABLE peliculas ADD COLUMN <campo_nuevo> varchar(30);`

Borrar campo de tabla (no borra indices si solo hay uno en la tabla)
  : `ALTER TABLE peliculas DROP dirección, DROP estreno;`

Modificar campos
  : `ÀLTER TABLE peliculas MODIFY estreno SMALLINT UNSIGNED;`

Modificar el atributo de campo DEFAULT
  : `ALTER TABLE peliculas ALTER autor SET DEFAULT 'Varios';`

Borrar el atributo de campo Default
  : `ALTER TABLE peliculas ALTER autor DROP DEFAULT;`


---


Obtener registros de la Base de Datos
  : `SELECT * FROM peliculas WHERE id = $id ORDER BY titulo DESC;

  : `SELECT titulo, autor FROM peliculas WHERE estreno >= '1980';`

  : `SELECT titulo, autor FROM peliculas WHERE estreno BETWEEN 1980 AND 2000;`

  : `SELECT * FROM libros WHERE SELECT titulo FROM peliculas WHERE NOT titulo = 'Amanecer zulu';`
  
  : `SELECT titulo FROM peliculas WHERE direccion LIKE "%Coppola%";`

  : `SELECT DISTINCT titulo FROM peliculas WHERE direccion REGEXP "Coppola";`

Crear un rgistro en la Base de datos
  : `INSERT INTO peliculas(titulo, direccion, autor, estreno, sinopsis) VALUES ('{$nombre}', '{$direccion}', '{autor}', '{$estreno}', '{$sinopsis}');`

Actualizar un registro
  : `UPDATE peliculas SET titulo = '{$titulo}', direccion = '{$direccion}', autor = '{$autor}', estreno = '{$estreno}', sinopsis = '{$sinopsis}' WHERE id = $id;`

Reemplazar un registro (puede repitir campos Primary y Unique)
  : `REPLACE INTO peliculas VALUES (23, 'Amanecer Púrpura', 'Charles Bukowsky', '1910', 'Sinopsis de ejemplo.');`

Borrar un registro
  : `DELETE FROM peliculas WHERE id = $id;`

  : `DELETE FROM peliculas LIMIT 3;`


---


Crear Usuario (opcion 1)
  : `GRANT ALL ON videoclub.* TO 'usuario'@'localhost' IDENTIFIED BY 'pass';`

Listar todos los usuarios de un servidor MySQL
  : `SELECT User from mysql.user;`

Usuarios con acceso a cada base de datos
  : `SELECT u.User,Db FROM mysql.user u,mysql.db d WHERE u.User=d.User;`

Refrescar Tabla mysql de permisos
  : `FLUSH PRIVILEGES;`

Obtener nuestro usuario (conectado)
  : `SELECT CURRENT_USER();`



### Enlaces de referencia

* Ver la [Documentacion de MySQL](https://dev.mysql.com/doc/)

* Desde [linuxito](https://www.linuxito.com/gnu-linux/nivel-medio/544-como-listar-todos-los-usuarios-en-mysql)

* Ver Crear Base de datos en [la web de Aner Barrena](http://www.anerbarrena.com/create-database-mysql-4991/)

* Como crear usuarios de MySql en [Cambrico.net](http://cambrico.net/mysql/como-crear-un-usuario-en-mysql-3-formas-diferentes)

#### Instalacion de wordpress

Ver la instalación basica de [Wordpress en Ubuntu 16](Desde https://www.digitalocean.com/community/tutorials/como-instalar-wordpress-con-lamp-en-ubuntu-16-04-es)



## Cómo crear un usuario en MySQL: 3 formas diferentes

### La forma clásica, con la sentencia GRANT

Utilizando la sentencia GRANT podemos crear un usuario a la par que otorgarle uno o varios privilegios sobre los objetos de una base de datos, o la base de datos completa.

    mysql> GRANT ALL ON videoclub.* TO 'adolfo'@'localhost' IDENTIFIED BY 'pass_adolfo';

    mysql> GRANT SELECT, INSERT ON test.* TO 'adolfo'@'localhost' IDENTIFIED BY 'pass_adolfo';

    mysql> USE test;	>>	Database changed

    mysql> SELECT * FROM frutas;


| nombre    | color    |
|:---------:|:--------:|
| fresa     | rojo     | 
| manzana   | verde    | 
| uva       | verde    |


### La sentencia CREATE USER


A partir de la versión MySQL 5.0.2 existe la posibilidad de crear usuarios sin necesidad de asignarles privilegios, utilizando la sentencia CREATE USER.

    mysql> CREATE USER 'fernando'@'localhost' IDENTIFIED BY 'fer_pass';

Los privilegios necesarios para ejecutar la sentencia CREATE USER son `CREATE USER` o bien `INSERT` en la base de datos mysql.
El usuario recién creado no tiene privilegio alguno, por lo que deberemos asignarle permisos utilizando sentencias GRANT (esta vez sin la cláusula IDENTIFIED BY).

### Modo hardcore: insertando en la tabla users

Mucho cuidado con esta base de datos, ya que contiene toda la información de usuarios y permisos.

Ejemplo de creación del usuario mariano usando INSERT en nuestra base de datos. Nos conectamos con un usuario con privilegios, en este caso root, y seleccionamos la base de datos mysql mediante la sentencia USE.

    mysql> USE mysql;  >>	Database changed

    mysql> INSERT INTO user VALUES('localhost','mariano',PASSWORD('pass_mariano'),'Y','Y',

    'N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N',

    'N','N','N','','','','',0,0,0,0);		>>  Query OK, 1 row affected (0,00 sec)

Es necesario llamar a la función PASSWORD() para almacenar el password codificado, en los otros casos, el IDENTIFIED BY se encarga de hacer la codificación.

En este caso se le dan permisos globales de INSERT y SELECT, para saber a qué corresponde cada columna, se puede hacer un DESCRIBE user.

    mysql> DESCRIBE user;

| Field                 | Type              | Null | Key | Default | Extra |
|:---------------------:|:-----------------:|:----:|:---:|:-------:|:-----:|
| Host                  | char(60)          | NO   | PRI |         |       | 
| User                  | char(16)          | NO   | PRI |         |       | 
| Password              | char(41)          | NO   |     |         |       | 
| SELECT_priv           | enum('N','Y')     | NO   |     | N       |       | 
| Insert_priv           | enum('N','Y')     | NO   |     | N       |       | 
| Update_priv           | enum('N','Y')     | NO   |     | N       |       | 
| Delete_priv           | enum('N','Y')     | NO   |     | N       |       | 
| Create_priv           | enum('N','Y')     | NO   |     | N       |       | 
| Drop_priv             | enum('N','Y')     | NO   |     | N       |       | 
| Reload_priv           | enum('N','Y')     | NO   |     | N       |       | 
| Shutdown_priv         | enum('N','Y')     | NO   |     | N       |       | 
|	(...)                 |                   |      |     |         |       |


Para asignar privilegios a bases de datos específicas o tablas específicas, se debe usar GRANT.

Utilizando este método, tenemos que forzar que se refresquen las tablas de permisos usando FLUSH PRIVILEGES.

    mysql> FLUSH PRIVILEGES;


### Otras consideraciones

También se pueden crear usuarios desde la herramienta visual MySQL Administrator, que forma parte de las GUI Tools que ofrece gratuitamente MySQL y se pueden descargar desde aquí. (Es multiplataforma, pero en Mac funciona bastante mal)

Para saber con qué usuario estamos conectados en este momento, podemos usar la función CURRENT_USER() o USER().

    mysql> SELECT CURRENT_USER();


| CURRENT_USER()   |
|:----------------:|
| adolfo@localhost | 


Al crear un usuario, se define el contexto desde el que se puede conectar, por ejemplo 'adolfo'@'localhost' solamente se puede conectar desde el mismo servidor de la base de datos.

Para crear usuarios que se puedan conectar desde varias máquinas, se puede crear un usuario por cada máquina o usar el comodín '%', el usuario 'adolfo'@'%' se podría conectar desde cualquier máquina, y el usuario 'fernando'@'192.168.1.%' se podría conectar desde máquinas con una dirección IP comprendida entre 192.168.1.1 y 129.168.1.255.


    GRANT SELECT, INSERT ON test.* TO 'adolfo'@'%' IDENTIFIED BY 'pass_adolfo';

    CREATE USER 'fernando'@'192.168.1.%' IDENTIFIED BY 'fer_pass';

En el caso de que estemos realizando la creación de un usuario mediante el método INSERT y nos aparezca el siguiente error:

**ERROR 1136 (21S01): Column count doesn't match value count at row 1**

La razón es que algunas de las columnas de la tabla user no tienen valor por defecto (por ejemplo ssl_type), y no las hemos informado todas, es necesario hacerlo.

