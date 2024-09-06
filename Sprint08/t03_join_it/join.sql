SELECT heroes.name AS hero_name, teams.name AS team_name
FROM  heroes
LEFT JOIN heroes_teams ON heroes.id = heroes_teams.hero_id
LEFT JOIN teams ON heroes_teams.team_id = teams.id;

SELECT heroes.name AS hero_name, powers.name AS power_name
FROM powers
LEFT JOIN heroes_powers ON powers.id = heroes_powers.power_id
LEFT JOIN heroes ON heroes_powers.hero_id = heroes.id;

SELECT heroes.name AS hero_name, powers.name AS power_name, teams.name AS team_name
FROM heroes
INNER JOIN heroes_powers ON heroes.id = heroes_powers.hero_id
INNER JOIN powers ON heroes_powers.power_id = powers.id
INNER JOIN heroes_teams ON heroes.id = heroes_teams.hero_id
INNER JOIN teams ON heroes_teams.team_id = teams.id;

