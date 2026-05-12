import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database import get_db_connection

def seed_counter_pick():
    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("SELECT id_hero, name_hero FROM hero;")
    heroes = {row[1]: row[0] for row in cur.fetchall()}

    counters_brigitte = [
        ('Фарра', 'лучший',
         'Держится в воздухе, куда её щит и булава не достают. Ракетами обстреливает с безопасной дистанции. Конкуссивным взрывом сбивает её позицию.'),
        
        ('Бастион', 'лучший',
         'В режиме "Турель" уничтожает её щит за секунды и убивает её саму. Её щит имеет всего 250 HP и не выдерживает его урона. Может уничтожать её с дистанции, не подпуская близко.'),
        
        ('Эхо', 'хороший',
         'Держится в воздухе, куда её щит и булава не достают. Фокусирующий луч добивает с безопасной высоты.'),
        
        ('D.Va', 'хороший',
         'С помощью ракет и выстрелов из основного оружия быстро уничтожает щит Бригитты, а следом и её саму. Бригитта никаким образом не может дать отпор D.Va.'),
        
        ('Трейсер', 'хороший',
         'Маленькая и быстрая цель — Бригитте сложно в неё попасть булавой. Постоянно мелькает вокруг, атакует со спины. Может отвлекать и давить с флангов.'),
        
        ('Сомбра', 'хороший',
         'Хак отключает её щит и удар щитом, оставляя без защиты и контроля.'),
        
        ('Крысавчик', 'хороший',
         'Гранаты наносят урон по площади и могут попадать за её щит, тем самым щит её никак не защитит от его атак.'),
        
        ('Мойра', 'не брать',
         'Мойра не наносит урон сквозь щит Бригитты. Сама Бригитта имеет много урона с булавы, что в конечном счёте Бригитта уничтожит Мойру, если та не сбежит.'),
        
        ('Уинстон', 'лучший',
         'Прыгает на неё, ставит щит, отрезая от лечения. Пушка — лучевой урон с автозахватом, который игнорирует её щит. Хорош для преследования.')
    ]

    hero_name = 'Бригитта'
    hero_id = heroes[hero_name]

    for counter_name, strength, description in counters_brigitte:
        if counter_name in heroes:
            cur.execute("""
                INSERT INTO counter_pick (id_hero, id_enemy, strength, description_c)
                VALUES (%s, %s, %s, %s)
                ON CONFLICT (id_hero, id_enemy) DO UPDATE 
                SET strength = EXCLUDED.strength,
                    description_c = EXCLUDED.description_c;
            """, (hero_id, heroes[counter_name], strength, description))

    conn.commit()
    cur.close()
    conn.close()

if __name__ == "__main__":
    seed_counter_pick()