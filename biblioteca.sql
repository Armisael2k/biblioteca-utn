CREATE TABLE IF NOT EXISTS carreras
(
    id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre varchar(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS informaciones
(
    id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre varchar(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS grupos
(
    id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre varchar(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS usuarios
(
    id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre varchar(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS alumnos
(
    id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    matricula varchar(30) NOT NULL,
    nombre varchar(255) NOT NULL,
    id_carrera int(11) NOT NULL,
    id_grupo int(11) NOT NULL,
    FOREIGN KEY (id_carrera) REFERENCES carreras(id),
    FOREIGN KEY (id_grupo) REFERENCES grupos(id)
);

CREATE TABLE IF NOT EXISTS entradas
(
    id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_usuario int(11) NOT NULL,
    id_informacion int(11) NOT NULL,
    tipo int(1) NOT NULL,
    fecha datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id),
    FOREIGN KEY (id_informacion) REFERENCES informaciones(id)
);

CREATE TABLE IF NOT EXISTS prestamos_computadoras
(
    id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_usuario int(11) NOT NULL,
    id_informacion int(11) NOT NULL,
    numero int(11) NOT NULL,
    tipo int(1) NOT NULL,
    fecha datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id),
    FOREIGN KEY (id_informacion) REFERENCES informaciones(id)
);

CREATE TABLE IF NOT EXISTS libros
(
    id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    codigo varchar(30) NOT NULL,
    nombre varchar(255) NOT NULL,
    autor varchar(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS prestamos
(
    id_usuario int(11) NOT NULL,
    id_libro int(11) NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id),
    FOREIGN KEY (id_libro) REFERENCES libros(id),
    PRIMARY KEY (id_usuario, id_libro)
);

CREATE TABLE IF NOT EXISTS registros_libros
(
    id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_usuario int(11) NOT NULL,
    id_libro int(11) NOT NULL,
    id_informacion int(11) NOT NULL,
    tipo int(1) NOT NULL,
    movimiento int(1) NOT NULL,
    fecha datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id),
    FOREIGN KEY (id_libro) REFERENCES libros(id),
    FOREIGN KEY (id_informacion) REFERENCES informaciones(id)
);