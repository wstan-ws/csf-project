drop database if exists handy;

create database handy;

use handy;

create table users (

    first_name varchar(128) not null,
    last_name varchar(128) not null,
    email varchar(128) not null,
    phone_number char(8) not null,
    address text not null,
    postal_code char(6) not null,
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
    postal_code char(6) not null,
    username varchar(64) not null,
    password varchar(64) not null,
    electrician boolean default false,
    electrician_license_no varchar(64),
    plumber boolean default false,
    plumber_license_no varchar(64),
    aircon boolean default false,
    aircon_license_no varchar(64),
    active boolean default false,
    rating varchar(64),

    primary key (username)
);

create table chats (

	chat_id int auto_increment,
    user varchar(128) not null,
    merchant varchar(128) not null,
    last_message text,
    timestamp varchar(64) not null,

    primary key (chat_id)
);

create table jobs (

    job_id varchar(64) not null,
    timestamp varchar(64) not null,
    user_username varchar(64) not null,
    merchant_username varchar(64) not null,
    type varchar(64) not null,
    scheduled_date varchar(64),
    scheduled_time varchar(64),
    user_postal_code char(6) not null,
    merchant_postal_code char(6) not null,
    status int default 0 not null,
    completed_timestamp varchar(64),

    primary key (job_id),
    constraint fk_user_username foreign key (user_username)
    references users(username),
    constraint fk_merchant_username foreign key (merchant_username)
    references merchants(username)
);

create table reviews (

    review_id int auto_increment,
    job_id varchar(64) not null,
    rating int not null,
    comments text,
    date varchar(64) not null,
    time varchar(64) not null,

    primary key (review_id),
    constraint fk_job_id foreign key (job_id)
    references jobs(job_id)
);