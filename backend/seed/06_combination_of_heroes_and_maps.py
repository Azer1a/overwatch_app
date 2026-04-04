import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database import get_db_connection

def seed_combinations():
    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("SELECT id_map, name_map FROM game_map;")
    maps = {row[1]: row[0] for row in cur.fetchall()}

    cur.execute("SELECT id_hero, name_hero FROM hero;")
    heroes = {row[1]: row[0] for row in cur.fetchall()}

    combinations = [
        ('Blizzard World', 'D.Va', 'лучший',
         'Способна быстро забраться на верхние платформы и выгонять оттуда снайперов.'),
        
        ('Blizzard World', 'Заря', 'лучший',
         'На карте достаточно узких пространств, которыми может пользоваться Заря.'),
        
        ('Blizzard World', 'Соджорн', 'лучший',
         'Может занимать высокие платформы и обстреливать противников на расстоянии. Контроль верхних платформ над точкой даёт команде хорошее преимущество.'),
        
        ('Blizzard World', 'Эш', 'лучший',
         'Может занимать высокие платформы и обстреливать противников на расстоянии. Контроль верхних платформ над точкой даёт команде хорошее преимущество.'),
        
        ('Blizzard World', 'Вендетта', 'лучший',
         'Способна быстро забраться на верхние платформы и выгонять оттуда снайперов.'),
        
        ('Blizzard World', 'Лусио', 'лучший',
         'Ускоряет союзников, что важно, для преодоления больших и открытых пространств до главного места битвы.'),
        
        ('Blizzard World', 'Райнхардт', 'неподходящий',
         'Слишком много открытых пространств и высот, которые он не может контролировать.'),
        
        ('Blizzard World', 'Турбосвин', 'неподходящий',
         'На открытых пространствах он предоставляет возможность противникам копить ультимейты, нанося по нему урон, и не приносит никакой пользы команде.'),
        
        ('Blizzard World', 'Жнец', 'неподходящий',
         'Хоть и полезен в ближнем бою, но на карте слишком много открытых пространств. Снайперы и другие, кто может занимать верхние платформы и вести с них обстрел, уничтожат его до того, как он подойдёт на свою дистанцию выстрела.'),
        
        ('Blizzard World', 'Дзенъятта', 'неподходящий',
         'Нет выживаемости на открытых пространствах, лёгкая добыча для D.Va и снайперов.')
    ]

    for map_name, hero_name, quality, description in combinations:
        if map_name in maps and hero_name in heroes:
            cur.execute("""
                INSERT INTO combination_of_hero_and_map (id_map, id_hero, quality, description_comb)
                VALUES (%s, %s, %s, %s) 
                ON CONFLICT (id_map, id_hero) DO NOTHING;
            """, (maps[map_name], heroes[hero_name], quality, description))
            print(f"+ {map_name} + {hero_name}: {quality}")
    
    conn.commit()
    cur.close()
    conn.close()

if __name__ == "__main__":
    seed_combinations()
