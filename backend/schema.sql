drop database if exists handy;

create database handy;

use handy;

create table users (

    first_name varchar(128) not null,
    last_name varchar(128) not null,
    email varchar(128) not null,
    phone_number char(8) not null,
    address text not null,
    username varchar(64) not null,
    password varchar(64) not null,

    primary key (username)
);

create table merchants (

    first_name varchar(128) not null,
    last_name varchar(128) not null,
    email varchar(128) not null,
    phone_number char(8) not null,
    company_name varchar(128) not null,
    username varchar(64) not null,
    password varchar(64) not null,
    electrician boolean default false,
    electrician_license_no varchar(64),
    plumber boolean default false,
    plumber_license_no varchar(64),
    aircon boolean default false,
    aircon_license_no varchar(64),
    active boolean default false,

    primary key (username)
);

create table chats (

	chat_id int auto_increment,
    user varchar(128) not null,
    merchant varchar(128) not null,

    primary key (chat_id)
);
