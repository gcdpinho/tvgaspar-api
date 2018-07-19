CREATE TABLE category (
    id INT NOT NULL AUTO_INCREMENT,
    category VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    color VARCHAR(255),
    PRIMARY KEY (id)
);

CREATE TABLE image (
    id INT NOT NULL AUTO_INCREMENT,
    image VARCHAR(255),
    src VARCHAR(255) NOT NULL UNIQUE,
    PRIMARY KEY (id)
);

CREATE TABLE tag (
    id INT NOT NULL AUTO_INCREMENT,
    tag VARCHAR(255) NOT NULL UNIQUE,
    PRIMARY KEY (id)
);

CREATE TABLE image_tag (
    image_id INT NOT NULL,
    tag_id INT NOT NULL,
    PRIMARY KEY (image_id, tag_id),
    FOREIGN KEY (image_id) REFERENCES image (id),
    FOREIGN KEY (tag_id) REFERENCES tag (id)
);

CREATE TABLE user (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    login VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255),
    password_digest VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    flgAdm BOOLEAN DEFAULT 0,
    token VARCHAR(255),
    PRIMARY KEY (id)
);

CREATE TABLE video (
    id INT NOT NULL AUTO_INCREMENT,
    video VARCHAR(255),
    description TEXT,
    src VARCHAR(255) NOT NULL UNIQUE,
    PRIMARY KEY (id)
);

CREATE TABLE tag_video (
    video_id int NOT NULL,
    tag_id int NOT NULL,
    PRIMARY KEY (video_id, tag_id),
    FOREIGN KEY (video_id) REFERENCES video (id),
    FOREIGN KEY (tag_id) REFERENCES tag (id)
);

CREATE TABLE ad (
    id int NOT NULL AUTO_INCREMENT,
    ad varchar(255) NOT NULL UNIQUE,
    type varchar(255) NOT NULL,
    description TEXT,
    src varchar (255),
    flgActive BOOLEAN DEFAULT 0, 
    image_id int NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (image_id) REFERENCES image (id)
);

CREATE TABLE news (
    id int NOT NULL AUTO_INCREMENT,
    headline varchar(255) NOT NULL UNIQUE,
    subtitle varchar(255),
    body MEDIUMTEXT NOT NULL,
    abstract TINYTEXT NOT NULL,
    author varchar(255),
    created_at DATETIME,
    updated_at DATETIME,
    flgActive BOOLEAN DEFAULT 0,
    approval BOOLEAN NOT NULL,
    user_id int NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user (id)
);

CREATE TABLE news_tag (
    news_id int NOT NULL,
    tag_id int NOT NULL,
    PRIMARY KEY (news_id, tag_id),
    FOREIGN KEY (news_id) REFERENCES news (id),
    FOREIGN KEY (tag_id) REFERENCES tag (id)
);

CREATE TABLE image_news (
    news_id int NOT NULL,
    image_id int NOT NULL,
    PRIMARY KEY (news_id, image_id),
    FOREIGN KEY (news_id) REFERENCES news (id),
    FOREIGN KEY (image_id) REFERENCES image (id)
);

CREATE TABLE category_news (
    news_id int NOT NULL,
    category_id int NOT NULL,
    PRIMARY KEY (news_id, category_id),
    FOREIGN KEY (news_id) REFERENCES news (id),
    FOREIGN KEY (category_id) REFERENCES category (id)
);

CREATE TABLE news_video (
    news_id int NOT NULL,
    video_id int NOT NULL,
    PRIMARY KEY (news_id, video_id),
    FOREIGN KEY (news_id) REFERENCES news (id),
    FOREIGN KEY (video_id) REFERENCES video (id)
);