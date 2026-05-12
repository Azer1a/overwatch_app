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
        ('Blizzard World', 'Ориса', 'лучший',
         'Её копьё и вращение помогают продавливать узкие места на первой точке, она устойчива к контролю и хорошо держит фронт.'),
        
        ('Blizzard World', 'Уинстон', 'лучший',
         'Отлично подходит для атаки на первую точку, может запрыгивать на возвышенности и выгонять снайперов, мешающих команде.'),
        
        ('Blizzard World', 'Трейсер', 'лучший',
         'Её мобильность идеальна для обхода флангов на всех этапах карты, она может отвлекать защиту на первой точке и тревожить врагов во время сопровождения.'),
        
        ('Blizzard World', 'Крысавчик', 'лучший',
         'Король ближних боёв на первой узкой улице, его гранаты рикошетят от стен и наносят огромный урон.'),
        
        ('Blizzard World', 'Лусио', 'лучший',
         'Его ускорение необходимо для быстрого прохода узких мест и рывков на точку, а лечение по площади эффективно в скученных боях.'),
        
        ('Blizzard World', 'Батист', 'лучший',
         'Его «Бессмертное поле» спасает команду от ультимейтов на открытых участках, а высокая прыгучесть помогает занимать выгодные позиции.'),
        
        ('Blizzard World', 'Турбосвин', 'неподходящий',
         'Не может защитить команду от дальних атак на открытых участках сопровождения, его перетягивание менее эффективно против укрытий.'),
        
        ('Blizzard World', 'Заря', 'неподходящий',
         'Её щиты теряют эффективность из-за большого количества укрытий и невозможности постоянно накапливать заряд.'),
        
        ('Blizzard World', 'Фарра', 'неподходящий',
         'На карте много закрытых помещений и низких потолков, где она не может эффективно летать, становясь лёгкой мишенью.'),
        
        ('Blizzard World', 'Роковая Вдова', 'неподходящий',
         'Линии обзора часто перекрываются укрытиями и постройками, что снижает её эффективность на большинстве участков карты.'),
        
        ('Blizzard World', 'Дзенъятта', 'неподходящий',
         'Слишком медленный, чтобы уклоняться от атак, и не имеет способов быстро спастись от фланкеров.'),
        
        ('Blizzard World', 'Бригитта', 'неподходящий',
         'Ей сложно поддерживать щит на дальних дистанциях, а на открытых участках она становится уязвимой для снайперов.')
    ]

    for map_name, hero_name, quality, description in combinations:
        if map_name in maps and hero_name in heroes:
            cur.execute("""
                INSERT INTO combination_of_hero_and_map (id_map, id_hero, quality, description_comb)
                VALUES (%s, %s, %s, %s) 
                ON CONFLICT (id_map, id_hero) DO UPDATE 
                SET quality = EXCLUDED.quality,
                    description_comb = EXCLUDED.description_comb;
            """, (maps[map_name], heroes[hero_name], quality, description))
        else:
            missing = []
            if map_name not in maps:
                missing.append(f"карта '{map_name}'")
            if hero_name not in heroes:
                missing.append(f"герой '{hero_name}'")
            print(f"Пропущена комбинация: {', '.join(missing)} не найдены")

    conn.commit()
    cur.close()
    conn.close()

if __name__ == "__main__":
    seed_combinations()