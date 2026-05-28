DROP DATABASE IF EXISTS qr_tickets;

CREATE DATABASE qr_tickets;

USE qr_tickets;

CREATE TABLE tickets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    email VARCHAR(100),
    token VARCHAR(255),
    usada BOOLEAN DEFAULT FALSE
);