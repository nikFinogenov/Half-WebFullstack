USE ucode_web;

SELECT heroes.id, heroes.name, SUM(heroes_powers.power_points) AS total_power
FROM heroes
INNER JOIN heroes_powers ON heroes.id = heroes_powers.hero_id
INNER JOIN powers ON heroes_powers.power_id = powers.id
GROUP BY heroes.id, heroes.name
ORDER BY total_power DESC, heroes.id ASC
LIMIT 1;

SELECT heroes.id, heroes.name, SUM(CASE WHEN powers.type = 'defense' THEN heroes_powers.power_points ELSE 0 END) AS total_defense
FROM heroes
LEFT JOIN heroes_powers ON heroes.id = heroes_powers.hero_id
LEFT JOIN powers ON heroes_powers.power_id = powers.id
GROUP BY heroes.id, heroes.name
ORDER BY total_defense ASC, heroes.id ASC
LIMIT 1;

SELECT heroes.id, heroes.name, SUM(heroes_powers.power_points) AS total_power
FROM heroes
INNER JOIN heroes_teams ON heroes.id = heroes_teams.hero_id
INNER JOIN teams ON heroes_teams.team_id = teams.id
LEFT JOIN heroes_powers ON heroes.id = heroes_powers.hero_id
WHERE teams.name = 'Avengers' AND heroes.id NOT IN 
    (SELECT hero_id FROM heroes_teams WHERE team_id = 
        (SELECT id FROM teams WHERE name = 'Hydra'))
GROUP BY heroes.id, heroes.name
ORDER BY total_power DESC;

SELECT teams.name AS team_name, SUM(heroes_powers.power_points) AS total_power
FROM teams
INNER JOIN heroes_teams ON teams.id = heroes_teams.team_id
INNER JOIN heroes ON heroes.id = heroes_teams.hero_id
LEFT JOIN heroes_powers ON heroes.id = heroes_powers.hero_id
WHERE teams.name IN ('Avengers', 'Hydra')
GROUP BY teams.name
ORDER BY total_power ASC;
