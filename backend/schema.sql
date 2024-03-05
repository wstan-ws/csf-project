drop database if exists handy;

create database handy;

use handy;

create table users (

    id int auto_increment,
    first_name varchar(128) not null,
    last_name varchar(128) not null,
    email varchar(128) not null,
    phone_number char(8) not null,
    address text not null,
    username varchar(64) not null unique,
    password varchar(64) not null,

    primary key (id)
);

create table merchants (

    id int auto_increment,
    first_name varchar(128) not null,
    last_name varchar(128) not null,
    email varchar(128) not null,
    phone_number char(8) not null,
    company_name varchar(128) not null,
    username varchar(64) not null unique,
    password varchar(64) not null,
    electrician boolean default false,
    electrician_license_no varchar(64),
    plumber boolean default false,
    plumber_license_no varchar(64),
    aircon boolean default false,
    aircon_license_no varchar(64),

    primary key (id)
);