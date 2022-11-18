# Angular/React - Django

## Instalación

- Instalar NodeJs: https://nodejs.org/en/
- Instalar Angular CLI mediante el siguiente comando en una terminal: npm install -g @angular/cli
- React no necesita ser instalado basta con instalar NodeJs
- Instalar docker desktop: https://www.docker.com/
- instalar make para windows mediante el siguiente comando: choco install make

## Compilación

Lo que primero debemos hacer es descargar los archivos de las tres plantillas(Angular, React y Django) o clonar el siguiente repositorio: https://github.com/derseck/conceptTest.git

![image](https://user-images.githubusercontent.com/17151902/202359430-c82bff54-45b8-4242-aa4a-0eaac85b1285.png)

El repositorio está compuesto por tres carpetas:

- Django: carpeta que almacena la plantilla en Django y es encargada del Back-End
- Facturación: carpeta que almacena la plantilla en Angular, es una de las opciones de Front-End
- Test: carpeta que almacena la plantilla en React, es una de las opciones de Front-End

A continuacion, ingresamos a la carpeta Django y ejecutamos el siguiente comando:

```
docker-compose up
```

En otro terminal ejecutamos los comandos:

```
docker ps
docker exec -it project_name bash
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
```
El comando createsuperuser les pedira nombre de usuario, correo y contraseña, este sera el usuario administrador de Django(yo uso usr:admin y psw:admin)

A continuacion, ingresamos a la carpeta Facturacion y ejecutamos el siguientes comandos:

```
npm install
ng s
```
Nota: en caso de que les aparesca un error "ng : No se puede cargar el archivo C:\Users\user\AppData\Roaming\npm\ng.ps1 porque la ejecución de scripts está deshabilitada en este sistema." deberemos abrir la powershell en modo administrador y ejecutar el comando: Set-ExecutionPolicy Unrestricted

A continuacion, ingresamos a la carpeta Facturacion y ejecutamos el siguientes comandos:

```
npm install
npm start
```
