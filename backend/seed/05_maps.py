import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database import get_db_connection

def seed_maps():
    conn = get_db_connection()
    cur = conn.cursor()

    maps = [
        ('Пост наблюдения: Гибралтар', 'Watchpoint_Gibraltar.png'),
        ('Трон Анубиса', 'Throne_of_Anubis.png'),
        ('Сураваса', 'Suravasa.png'),
        ('Монастырь Шамбала', 'Shambali_Monastery.png'),
        ('Самоа', 'Samoa.png'),
        ('Рунасапи', 'Runasapi.png'),
        ('Шоссе 66', 'Route_66.png'),
        ('Риальто', 'Rialto.png'),
        ('Параисо', 'Paraiso.png'),
        ('Оазис', 'Oasis.png'),
        ('Нумбани', 'Numbani.png'),
        ('Нью-Квин-Стрит', 'New_Queen_Street.png'),
        ('Нью-Джанк', 'New_Junk_City.png'),
        ('Непал', 'Nepal.png'),
        ('Мидтаун', 'Midtown.png'),
        ('Башня Лицзян', 'Lijiang_Tower.png'),
        ('Кингс Роу', 'King\'s_Row.png'),
        ('Джанкертаун', 'Junkertown.png'),
        ('Илиос', 'Illios.png'),
        ('Голливуд', 'Hollywood.png'),
        ('Гавана', 'Havana.png'),
        ('Ханаока', 'Hanaoka.png'),
        ('Эсперанса', 'Esperanca.png'),
        ('Айхенвальд', 'Eichenwalde.png'),
        ('Дорадо', 'Dorado.png'),
        ('Колизей', 'Colosseo.png'),
        ('Королевская трасса', 'Circuit_Royal.png'),
        ('Пусан', 'Busan.png'),
        ('Blizzard World', 'Blizzard_World.png'),
        ('Антарктический полуостров', 'Antarctic_Peninsula.png'),
        ('Атлус', 'Aatlis.png')
    ]

    for map_name, map_image in maps:
        cur.execute("""
            INSERT INTO game_map (name_map, image_map)
            VALUES (%s, %s)
            ON CONFLICT (name_map) DO NOTHING; 
        """, (map_name, map_image))
        print(f" + {map_name}")
    
    conn.commit()
    cur.close()
    conn.close()

if __name__ == "__main__":
    seed_maps()