CREATE DATABASE marketCubos;

CREATE TABLE usuarios (
	id serial primary key,
  nome varchar(100) not null,
  email varchar(100) not null unique,
  senha text not null
);

create table produtos (
	id serial primary key,
  	id_usuario integer references usuarios(id),
  	titulo varchar(200) not null,
  	descricao varchar(2100) not null,
  	valor integer not null,
  	quantidade integer not null,
  	foto_url text not null,
  	foto_path text
)
