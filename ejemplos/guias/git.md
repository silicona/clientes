# GIT

## Comandos

### Globales


Obtener usuario o email
  : `git config --global user.name`

  : `git config --global user.email`

Configura el usuario o el email
  : `git config --global user.name 'usuario'`

  : `git config --global user.email 'usuario@dominio.com'`

Configura el modo de push (más abajo)
  : `git config --global push.default matching/simple`

Configura un alias para los comandos
  : `git config --global alias.co checkout`

Activa los cambios en el bash
  : `source <archivo>`

  : `source ~/.bash_profile`


### Repositorios


| Estado								| Acción				| Estado		| Accion 				| Estado 			| Accion 		| Estado 				|
|:---------------------:|:-------------:|:---------:|:-------------:|:-----------:|:---------:|:-------------:|
| Untracked - Unstaged	| `git add -A`	| Staged 		| `git commit`	| Repo local	| `git push`| Repo remoto		|


Inicia un repositorio 
  : `git init` (en directorio raiz del proyecto)

Estado de los branches
  : `git status`

Añadir archivos sin seguimiento
  : `git add -A`

  : `git add .`

Confirma los archivos para enviar
  : `git commit -m 'Mensaje del commit'`

  : `git commit -a` (solo confirma archivos con seguimiento)

Informe de commits
  : `git log` (da el SHA de cada commit)

  : `git log -p` (log con diff)

Compara el ultimo commit con la nueva version
  : `git diff` (cambios NO añadidos)

  : `git diff --staged` (cambios no confirmados)

  : `git diff master` (diff acepta dos argumentos; al dejar uno vacio, coge la rama actual para la comparación con master)


### Creando un repositorio


Añadir origen remoto
  : `git remote add origin https://.../xxxx.git`

Añadir repositorio local al remoto
  : `git push <repo remoto> <branch>`

  : `git push -u origin master` (-u permite realizar pulls)

    Modos de push:
    * **matching** - Sube el local a las ramas remotas con el mismo nombre
    * **simple** - Sube el local a la rama remota de git push

Obtener desde el repositorio remoto
  : `git pull origin master`


Clona el repositorio remoto en el local (carpeta incluida)
  : `git clone https://..../xxx.git`


### Branching y Merging


Crear nueva rama y cambia a ella
  : `git checkout -b "nombre de rama"`

Cambia a una rama
  : `git checkout master` (vuelve al master para el merge)

Se junta la rama con el master
  : `git merge "nombre de rama"`

Obtener las ramas existentes y la actual
  : `git branch`

Borra una rama que no haya sido merged con el master
  : `git branch -D "nombre de rama"`

Devuelve el proyecto al inicio de la rama o el master
  : `git checkout -f`

Inicia Detaiched Head (permite crear nuevos commit y ramas sin molestar a los actuales)
  : `git checkout <SHA de commit>`

## Paginas estáticas de Github

Crear la rama gh-pages
  : `git checkout -b "gh-pages"`

Acceder a la página por el navegador
  : `https://<usuario Github>/.github.io/<repositorio>`



















