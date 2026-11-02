CREATE TABLE role (
	id_role SERIAL PRIMARY KEY,
	name_role VARCHAR(10) NOT NULL CHECK (name_role IN('танк', 'урон', 'поддержка'))
);


CREATE TABLE hero (
	id_hero SERIAL PRIMARY KEY,
	id_role INTEGER REFERENCES role(id_role) ON DELETE RESTRICT ON UPDATE CASCADE,
	name_hero VARCHAR(60) UNIQUE NOT NULL,
	image_url VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE counter_pick (
	id_hero INTEGER REFERENCES hero(id_hero) ON DELETE CASCADE ON UPDATE CASCADE,
	id_enemy INTEGER REFERENCES hero(id_hero) ON DELETE CASCADE ON UPDATE CASCADE,
	strength VARCHAR(20) NOT NULL CHECK (strength IN('лучший', 'хороший', 'не брать')),
	description_c TEXT NOT NULL,
	PRIMARY KEY (id_hero, id_enemy)
);

CREATE TABLE synergy (
	id_hero1 INTEGER REFERENCES hero(id_hero) ON DELETE CASCADE ON UPDATE CASCADE,
	id_hero2 INTEGER REFERENCES hero(id_hero) ON DELETE CASCADE ON UPDATE CASCADE,
	usefulness VARCHAR(20) NOT NULL CHECK (usefulness IN('лучший', 'хороший', 'плохой')),
	description_s TEXT NOT NULL,
	PRIMARY KEY (id_hero1, id_hero2)
);

CREATE TABLE game_map (
	id_map SERIAL PRIMARY KEY,
	name_map VARCHAR(60) UNIQUE NOT NULL,
	image_map VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE combination_of_hero_and_map (
	id_map INTEGER REFERENCES game_map(id_map)ON DELETE CASCADE ON UPDATE CASCADE,
	id_hero INTEGER REFERENCES hero(id_hero) ON DELETE CASCADE ON UPDATE CASCADE,
	quality VARCHAR(20) NOT NULL CHECK (quality IN('лучший', 'неподходящий')),
	description_comb TEXT NOT NULL,
	PRIMARY KEY (id_map, id_hero)
)

SELECT * FROM combination_of_hero_and_map;