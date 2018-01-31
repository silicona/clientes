# Editor VI

## Comandos

* shift + Q -> Entra en modo Comando

### Modo comando

| Comando 		| Acción 											|
|:-----------:|:---------------------------:|
| :q 					| Salir si no hubo cambios 		|
| :q! 				| Salir sin guardar cambios 	|
| :w 					| Guardar cambios 						|
| :w archivo1 | Guardar cambios en archivo1 |
| :wq 				| Guardar cambios y salir 		|

### Movimiento del cursor

| Comando  		| Acción																				|
|:-----------:|:---------------------------------------------:|
| Flechas 		| Mover en la dirección de la flecha arriba 		|
| h  					| Mover hacia la izquierda 											|
| l  					| Mover hacia la derecha 												|
| k 					| Mover hacia arriba 														|
| j 					| Mover hacia abajo 														|
| 1G 					| Lleva el cursor hasta el comienzo del archivo |
| G 					| Lleva el cursor hasta el final del archivo  	|

### Cambio de modo comando a texto:

| Comando | Acción 																																									|
|:-------:|:---------------------------------------------------------------------------------------:|
| i 			| Inserta texto a la izquierda del cursor 																								|
| a 			| Inserta texto a la derecha del cursor 																									|
| A 			| Inserta texto al final de la línea donde se encuentra el cursor 												|
| I 			| Inserta texto al comienzo de la línea donde se encuentra el cursor 											|
| o 			| Abre una línea debajo de la actual 																											|
| O 			| Abre una línea encima de la actual 																											|
| x>>			| Indenta x líneas a la derecha empezando por la que en ese momento está bajo el cursor 	|		
| x<<			| Indenta x líneas a la izquierda empezando por la que en ese momento está bajo el cursor |


### Borrar texto:

| Comando | Acción 																																									|
|:-------:|:---------------------------------------------------------------------------------------:|
| x 			| Borra el carácter bajo el cursor 																												|
| dd 			| Borra la línea donde se encuentra el cursor 																						|
| ndd 		| Borra las próximas n líneas 																														|
| D 			| Borra desde donde se encuentra el cursor hasta el final de la línea 										|
| dw 			| Borra desde donde se encuentra el cursor hasta el final de una palabra 									|
| dxd			| Elimina x líneas empezando por la que en ese momento está bajo el cursor								|
| nx			|	Elimina n caracteres empezando por el que en ese momento está bajo el cursor  					|	

### Cortar y pegar:

Esto implica mover partes del archivo de un lugar a otro del mismo. Para esto se debe:
 1. Cortar el texto que se desea mover utilizando alguno de los comandos usados para borrar
texto.
 2. Mover el cursor (con alguno de los comandos utilizados para desplazar el cursor en el
texto) hasta el lugar donde se desee pegar el texto.
 3. Pegar el texto con el comando __p__.

### Copiar y pegar:

Esta operación difiere de la anterior. En este caso lo que se hace es repetir partes del texto
en otro lugar del archivo. Para esto se debe:
 * Utilizar el comando __yy__, cuya función es copiar la línea donde se encuentra situado el
cursor.
 * Mover el cursor (con alguno de los comandos utilizados para desplazar el cursor en el
texto) hasta el lugar donde se desee pegar el texto.
 * Pegar el texto con el comando __p__. 

### Deshacer cambios:

Se puede deshacer el último cambio realizado, utilizando el comando **u**.

__MODO TEXTO:__
 En este modo se ingresa el texto deseado. Para pasar de modo texto a modo comando
simplemente se debe apretar la tecla ESC.

__MODO LÍNEA:__
 Para ingresar al modo línea desde el modo comando, se debe utilizar alguna de las
siguientes teclas:
 * /
 * ?
 * :

Para volver al modo comando desde el modo última línea, se debe apretar la tecla **ENTER** (al finalizar el comando) o la tecla **ESC** (que interrumpe el comando).

### Buscar texto:

| Comando | Acción 																								|
|:-------:|:-----------------------------------------------------:|
| /texto 	| Busca hacia adelante la cadena de caracteres “texto” 	|
| ?texto 	| Busca hacia atrás la cadena de caracteres “texto” 		|

### Referencias

[Editor VI en linux - CCM](http://es.ccm.net/contents/318-linux-el-editor-de-vi)

