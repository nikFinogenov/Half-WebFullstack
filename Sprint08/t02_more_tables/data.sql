USE ucode_web;

INSERT INTO races (name) VALUES
('Human'),
('Kree'),
('Asgardian'),
('Immortal'),
('Metalist'),
('Mutant');

UPDATE heroes SET race_id = (SELECT id FROM races WHERE name = 'Human') WHERE name = 'Iron Man';
UPDATE heroes SET race_id = (SELECT id FROM races WHERE name = 'Asgardian') WHERE name = 'Thor';
UPDATE heroes SET race_id = (SELECT id FROM races WHERE name = 'Human') WHERE name = 'Doctor Strange';
UPDATE heroes SET race_id = (SELECT id FROM races WHERE name = 'Mutant') WHERE name = 'Hulk';
UPDATE heroes SET race_id = (SELECT id FROM races WHERE name = 'Human') WHERE name = 'Spider-Man';
UPDATE heroes SET race_id = (SELECT id FROM races WHERE name = 'Kree') WHERE name = 'Groot';
UPDATE heroes SET race_id = (SELECT id FROM races WHERE name = 'Kree') WHERE name = 'Rocket Raccoon';
UPDATE heroes SET race_id = (SELECT id FROM races WHERE name = 'Human') WHERE name = 'Black Widow';
UPDATE heroes SET race_id = (SELECT id FROM races WHERE name = 'Human') WHERE name = 'Vision';
UPDATE heroes SET race_id = (SELECT id FROM races WHERE name = 'Mutant') WHERE name = 'Wolverine';
UPDATE heroes SET race_id = (SELECT id FROM races WHERE name = 'Immortal') WHERE name = 'Death';
UPDATE heroes SET race_id = (SELECT id FROM races WHERE name = 'Metalist') WHERE name = 'Nathan';

INSERT INTO powers (name, type) VALUES
('chill', 'defense'),
('demon call', 'attack'),
('bloody fist', 'attack'),
('iron shield', 'defense'),
('thunder strike', 'attack'),
('healing light', 'defense'),
('web shooter', 'attack'),
('adamantium claws', 'attack');

INSERT INTO heroes_powers (hero_id, power_id, power_points) VALUES
((SELECT id FROM heroes WHERE name = 'Iron Man'), (SELECT id FROM powers WHERE name = 'iron shield'), 200),
((SELECT id FROM heroes WHERE name = 'Nathan'), (SELECT id FROM powers WHERE name = 'demon call'), 300),
((SELECT id FROM heroes WHERE name = 'Death'), (SELECT id FROM powers WHERE name = 'chill'), 500),
((SELECT id FROM heroes WHERE name = 'Thor'), (SELECT id FROM powers WHERE name = 'thunder strike'), 150),
((SELECT id FROM heroes WHERE name = 'Hulk'), (SELECT id FROM powers WHERE name = 'bloody fist'), 110),
((SELECT id FROM heroes WHERE name = 'Spider-Man'), (SELECT id FROM powers WHERE name = 'web shooter'), 90),
((SELECT id FROM heroes WHERE name = 'Wolverine'), (SELECT id FROM powers WHERE name = 'adamantium claws'), 100);

INSERT INTO teams (name) VALUES
('Avengers'),
('Hydra');

INSERT INTO heroes_teams (hero_id, team_id) VALUES
((SELECT id FROM heroes WHERE name = 'Iron Man'), (SELECT id FROM teams WHERE name = 'Avengers')),
((SELECT id FROM heroes WHERE name = 'Nathan'), (SELECT id FROM teams WHERE name = 'Avengers')),
((SELECT id FROM heroes WHERE name = 'Nathan'), (SELECT id FROM teams WHERE name = 'Hydra')),
((SELECT id FROM heroes WHERE name = 'Death'), (SELECT id FROM teams WHERE name = 'Avengers')),
((SELECT id FROM heroes WHERE name = 'Death'), (SELECT id FROM teams WHERE name = 'Hydra')),
((SELECT id FROM heroes WHERE name = 'Thor'), (SELECT id FROM teams WHERE name = 'Avengers')),
((SELECT id FROM heroes WHERE name = 'Black Widow'), (SELECT id FROM teams WHERE name = 'Avengers')),
((SELECT id FROM heroes WHERE name = 'Hulk'), (SELECT id FROM teams WHERE name = 'Avengers')),
((SELECT id FROM heroes WHERE name = 'Doctor Strange'), (SELECT id FROM teams WHERE name = 'Hydra')),
((SELECT id FROM heroes WHERE name = 'Wolverine'), (SELECT id FROM teams WHERE name = 'Hydra'));
