import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database import get_db_connection

def seed_heroes():
    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("SELECT id_role, name_role FROM role;")
    roles = {row[1]: row[0] for row in cur.fetchall()}

    heroes = [
        # Танки
        ('D.Va', 'танк', 'Icon-D.Va.png'),
        ('Кулак Смерти', 'танк', 'Icon-Doomfist.png'),
        ('Ориса', 'танк', 'Icon-Orisa.png'),
        ('Раматтра', 'танк', 'Icon-Ramattra.png'),
        ('Райнхардт', 'танк', 'Icon-Reinhardt.png'),
        ('Турбосвин', 'танк', 'Icon-Roadhog.png'),
        ('Сигма', 'танк', 'Icon-Sigma.png'),
        ('Уинстон', 'танк', 'Icon-Winston.png'),
        ('Таран', 'танк', 'Icon-Wrecking_Ball.png'),
        ('Королева Стервятников', 'танк', 'Icon-Junker_Queen.png'),
        ('Заря', 'танк', 'Icon-Zarya.png'),
        ('Мауга', 'танк', 'Icon-Mauga.png'),
        ('Азарт', 'танк', 'Icon-Hazard.png'),
        ('Домина', 'танк', 'Icon-Domina.png'),

        # Урон
        ('Эш', 'урон', 'Icon-Ashe.png'),
        ('Бастион', 'урон', 'Icon-Bastion.png'),
        ('Кэссиди', 'урон', 'Icon-Cassidy.png'),
        ('Эхо', 'урон', 'Icon-Echo.png'),
        ('Гэндзи', 'урон', 'Icon-Genji.png'),
        ('Хандзо', 'урон', 'Icon-Hanzo.png'),
        ('Жнец', 'урон', 'Icon-Reaper.png'),
        ('Фарра', 'урон', 'Icon-Pharah.png'),
        ('Соджорн', 'урон', 'Icon-Sojourn.png'),
        ('Солдат-76', 'урон', 'Icon-Soldier_76.png'),
        ('Сомбра', 'урон', 'Icon-Sombra.png'),
        ('Симметра', 'урон', 'Icon-Symmetra.png'),
        ('Торбьорн', 'урон', 'Icon-Torbjorn.png'),
        ('Трейсер', 'урон', 'Icon-Tracer.png'),
        ('Авентюра', 'урон', 'Icon-Venture.png'),
        ('Роковая Вдова', 'урон', 'Icon-Widowmaker.png'),
        ('Крысавчик', 'урон', 'Icon-Junkrat.png'),
        ('Мэй', 'урон', 'Icon-Mei.png'),
        ('Ань Жань', 'урон', 'Icon-Anran.png'),
        ('Фрейя', 'урон', 'Icon-Freja.png'),
        ('Эмре', 'урон', 'Icon-Emre.png'),
        ('Вендетта', 'урон', 'Icon-Vendetta.png'),

        # Поддержка
        ('Ангел', 'поддержка', 'Icon-Mercy.png'),
        ('Ана', 'поддержка', 'Icon-Ana.png'),
        ('Батист', 'поддержка', 'Icon-Baptiste.png'),
        ('Бригитта', 'поддержка', 'Icon-Brigitte.png'),
        ('Иллари', 'поддержка', 'Icon-Illari.png'),
        ('Кирико', 'поддержка', 'Icon-kiriko.png'),
        ('Лусио', 'поддержка', 'Icon-Lucio.png'),
        ('Мойра', 'поддержка', 'Icon-Moira.png'),
        ('Дзенъятта', 'поддержка', 'Icon-Zenyatta.png'),
        ('Ткач Жизни', 'поддержка', 'Icon-Lifeweaver.png'),
        ('Юнона', 'поддержка', 'Icon-Juno.png'),
        ('Мидзуки', 'поддержка', 'Icon-Mizuki.png'),
        ('У Ян', 'поддержка', 'Icon-Wuyang.png'),
        ('Реактивная Киса', 'поддержка', 'Icon-Jetpack_Cat.png')
    ]

    for name, role, image in heroes:
        if role in roles:
            cur.execute("""
                INSERT INTO hero (name_hero, id_role, image_url)
                VALUES (%s, %s, %s)
                ON CONFLICT (name_hero) DO NOTHING;     
            """, (name, roles[role], image))
        else:
            print(f"Роль '{role}' для героя '{name}' не найена")
    
    conn.commit()
    cur.close()
    conn.close()
    print("Heroes commit")

if __name__ == "__main__":
    seed_heroes()