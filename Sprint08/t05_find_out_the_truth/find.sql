USE ucode_web;

SELECT heroes.id, heroes.name, COUNT(DISTINCT heroes_teams.team_id) AS team_count
FROM heroes
INNER JOIN heroes_teams ON heroes.id = heroes_teams.hero_id
INNER JOIN races ON heroes.race_id = races.id
WHERE heroes.id IN 
    (SELECT hero_id
    FROM heroes_teams
    GROUP BY hero_id
    HAVING COUNT(DISTINCT team_id) >= 2)
AND races.name != 'Human'
AND heroes.name LIKE '%a%'
AND heroes.class_role IN ('tankman', 'healer')
GROUP BY heroes.id, heroes.name
ORDER BY heroes.id ASC
LIMIT 1;
