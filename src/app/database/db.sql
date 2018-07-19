CREATE TABLE categoria (
    idCategoria INT NOT NULL AUTO_INCREMENT,
    nomeCategoria VARCHAR(255) NOT NULL UNIQUE,
    descCategoria TEXT,
    cor varchar(255),
    PRIMARY KEY (idCategoria)
);

CREATE TABLE imagem (
    idImagem int NOT NULL AUTO_INCREMENT,
    nomeImagem varchar(255),
    src varchar(255) NOT NULL UNIQUE,
    PRIMARY KEY (idImagem)
);

CREATE TABLE tag (
    idTag int NOT NULL AUTO_INCREMENT,
    nomeTag varchar(255) NOT NULL UNIQUE,
    PRIMARY KEY (idTag)
);

CREATE TABLE imagem_tag (
    idImagem int NOT NULL,
    idTag int NOT NULL,
    PRIMARY KEY (idImagem, idTag),
    FOREIGN KEY (idImagem) REFERENCES imagem (idImagem),
    FOREIGN KEY (idTag) REFERENCES tag (idTag)
);