--create type bodywork_types AS ENUM('SEDAN', 'LIFTBACK', 'LIMUSINE', 'COMBI', 'CABRIOLET', 'ROADSTER', 'COUPE', 'HATCHBACK', 'SUV', 'VAN', 'PICKUP');
--create type class_types AS ENUM('MINI', 'LOWER', 'LOWER_MIDDLE', 'MIDDLE', 'UPPER_MIDDLE', 'LUXURY', 'SPORT', 'SUPERSPORT');
--create type fuel_types AS ENUM('PLUGIN_HYBRID', 'DIESEL', 'MILD_HYBRID', 'GASOLINE', 'CNG', 'ELECTRO', 'LPG');

create table car (
  id bigserial not null,
  brand varchar(50) not null,
  country varchar(100),
  start_from INT,
  logo BYTEA not null,
  created_at DATE not null,
  updated_at DATE not null,
  primary key (id)
);

create table model (
  id bigserial not null,
  car_id bigint not null references car (id),
  model varchar(100) not null,
  bodywork varchar(100) not null,
  car_class varchar(100) not null,
  price_from INT not null,
  equipment varchar(100)[] not null,
  more_versions varchar(100)[],
  height INT not null,
  width INT not null,
  car_length INT not null,
  weight INT not null,
  created_at DATE not null,
  updated_at DATE not null,
  primary key (id)
);

create table engine (
  id bigserial not null,
  model_id bigint not null references model (id),
  engine_volume varchar(100) not null,
  maximum_performance INT not null,
  gearbox varchar(100) not null,
  fuel varchar(100) not null,
  acceleration_from_0_to_100 FLOAT not null,
  drive_type varchar(255) not null,
  kind_of_engine varchar(255) not null,
  combined_consumption_from FLOAT not null,
  combined_consumption_to FLOAT not null,
  CO2_emissions_from INT not null,
  CO2_emissions_to INT not null,
  maximum_speed INT not null,
  maximum_torque INT not null,
  created_at DATE not null,
  updated_at DATE not null,
  primary key (id)
);