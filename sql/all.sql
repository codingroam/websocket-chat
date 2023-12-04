CREATE DATABASE IF NOT EXISTS websocket_chatroom;
DROP TABLE offmessage_record;
CREATE TABLE offmessage_record (id int NOT NULL AUTO_INCREMENT, from_user varchar(50) NOT NULL, to_user varchar(50) NOT NULL, DATE datetime NOT NULL, state int(2) NOT NULL, content varchar(300) NOT NULL, content_type varchar(30) NOT NULL, PRIMARY KEY (id)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 DEFAULT COLLATE=utf8mb4_general_ci;
DROP TABLE user;
CREATE TABLE user (id int NOT NULL AUTO_INCREMENT, username varchar(50) NOT NULL, password varchar(50) NOT NULL, nickname varchar(50), picture varchar(50), signature varchar(100), addr varchar(100), tel varchar(30) NOT NULL, PRIMARY KEY (id), CONSTRAINT username UNIQUE (username)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 DEFAULT COLLATE=utf8mb4_general_ci;
INSERT INTO user (id, username, password, nickname, picture, signature, addr, tel) VALUES (1, '张无忌', '81DC9BDB52D04DC20036DBD8313ED055', '小钻风', 'fe39d57b-5a23-4066-8a22-55f7a8c08de8.png', null, null, '');
INSERT INTO user (id, username, password, nickname, picture, signature, addr, tel) VALUES (3, '剑神卓不凡', '81DC9BDB52D04DC20036DBD8313ED055', '约汉', '82979bce-e874-4ed5-a9fa-7a415d7b92eb.png', null, null, '');
INSERT INTO user (id, username, password, nickname, picture, signature, addr, tel) VALUES (4, '赵敏', '81DC9BDB52D04DC20036DBD8313ED055', '敏敏', '82979bce-e874-4ed5-a9fa-7a415d7b92eb.png', null, null, '');
INSERT INTO user (id, username, password, nickname, picture, signature, addr, tel) VALUES (5, '爱德华纽盖特', '81DC9BDB52D04DC20036DBD8313ED055', '爱德华', '82979bce-e874-4ed5-a9fa-7a415d7b92eb.png', null, null, '');
INSERT INTO user (id, username, password, nickname, picture, signature, addr, tel) VALUES (21, '菲菲', '81dc9bdb52d04dc20036dbd8313ed055', '菲菲', 'd2b8537e-581b-48f1-8001-35d75fa0da64.png', null, null, '15233667819');
INSERT INTO user (id, username, password, nickname, picture, signature, addr, tel) VALUES (22, 'car', '81dc9bdb52d04dc20036dbd8313ed055', 'car', '6efe0c1c-4573-4b70-88d6-3e25ef268644.png', null, null, '15233667819');
INSERT INTO user (id, username, password, nickname, picture, signature, addr, tel) VALUES (24, '白胡子', '81dc9bdb52d04dc20036dbd8313ed055', '白胡子', 'c09e50ad-2c7c-4a87-86b9-419d04619c55.png', null, null, '15233667819');
INSERT INTO user (id, username, password, nickname, picture, signature, addr, tel) VALUES (26, '乔峰', '81dc9bdb52d04dc20036dbd8313ed055', '乔峰', '5edfeaee-200f-4aa1-99ba-dadcdc3114f4.png', null, null, '15233667819');
INSERT INTO user (id, username, password, nickname, picture, signature, addr, tel) VALUES (29, '孙悟空', '81dc9bdb52d04dc20036dbd8313ed055', '孙悟空', '8397ed5d-22f6-48fa-92f5-2e7d58dc17a1.png', null, null, '15517986633');