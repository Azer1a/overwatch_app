from flask import Flask, jsonify, request
from flask_cors import CORS
from database import get_db_connection
import psycopg2.extras

app = Flask(__name__)
CORS(app)


@app.route('/api/roles', methods=['GET'])
def get_roles():
    try:
        conn = get_db_connection()
        cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

        cur.execute("SELECT id_role, name_role FROM role ORDER BY id_role;")
        roles = cur.fetchall()

        cur.close()
        conn.close()
        return jsonify(roles)
    
    except Exception as e:
        print(f"Ошибка в get_roles: {e}")
        return jsonify({"error": "Внутренняя ошибка сервера"}), 500

@app.route('/api/heroes', methods=['GET'])
def get_heroes():
    try:
        role = request.args.get('role')

        conn = get_db_connection()
        cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

        if role:
            cur.execute("SELECT id_role FROM role WHERE name_role = %s;", (role,))
            if not cur.fetchone():
                return jsonify({"error": f"Роль '{role}' не неайдена"}), 404

            cur.execute("""
                SELECT h.id_hero, h.name_hero, h.image_url, r.name_role
                FROM hero h
                JOIN role r ON h.id_role =r.id_role
                WHERE r.name_role = %s
                ORDER BY h.name_hero;       
            """, (role,))
        else:
            cur.execute("""
                SELECT h.id_hero, h.name_hero, h.image_url, r.name_role
                FROM hero h
                JOIN role r ON h.id_role =r.id_role
                ORDER BY r.id_role, h.name_hero;       
            """, (role,))
    
        heroes = cur.fetchall()
        cur.close()
        conn.close()
        return jsonify(heroes)
    
    except Exception as e:
        print(f"Ошибка в get_roles: {e}")
        return jsonify({"error": "Внутренняя ошибка сервера"}), 500

@app.route('/api/counters', methods=['GET'])
def get_counters_pick():

    try:
        hero_id = request.args.get('hero_id')
        user_role = request.args.get('user_role')
    
        if not hero_id or not user_role:
            return jsonify({"error": "Не указан hero_id или user_role"}), 400

        conn = get_db_connection()
        cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

        cur.execute("SELECT name_hero FROM hero WHERE id_hero = %s", (hero_id,))
        victim = cur.fetchone()
        if not victim:
            return jsonify({"error":"Герой не найден"}), 404
    
        cur.execute("SELECT id_role FROM role WHERE name_role = %s", (user_role,))
        if not cur.fetchone():
            return jsonify({"error": f"Роль '{user_role}' не найдена"}), 404
        
        cur.execute("""
            SELECT
                h2.id_hero as counter_id,
                h2.name_hero as counter_name,
                h2.image_url as counter_image,
                cp.strength,
                cp.description_c
            FROM counter_pick cp
            JOIN hero h1 ON cp.id_hero = h1.id_hero
            JOIN hero h2 ON cp.id_enemy = h2.id_hero
            JOIN role r ON h2.id_role = r.id_role
            WHERE h1.id_hero = %s
            AND r.name_role = %s
            ORDER BY
                CASE cp.strength
                    WHEN 'лучший' THEN 1
                    WHEN 'хороший' THEN 2
                    WHEN 'не брать' THEN 3
                END,
                h2.name_hero;
        """, (hero_id, user_role))

        counters = cur.fetchall()
        cur.close()
        conn.close()

        result = {
            "hero": {
                "id_hero": int(hero_id),
                "name_hero": victim['name_hero']
            },
            "user_role":user_role,
            "counters": {
                "best": [dict(c) for c in counters if c['strength'] == 'лучший'],
                "good": [dict(c) for c in counters if c['strength'] == 'хороший'],
                "worst": [dict(c) for c in counters if c['strength'] == 'не брать']
            }
        }

        return jsonify(result)
    
    except Exception as e:
        print(f"Ошибка в get_counters_pick: {e}")
        return jsonify({"error": "Внутренняя ошибка сервера"}), 500

@app.route('/api/tanks', methods=['GET'])
def get_tanks():
    try:
        conn = get_db_connection()
        cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

        cur.execute("""
            SELECT h.id_hero, h.name_hero, h.image_url
            FROM hero h
            JOIN role r ON h.id_role = r.id_role
            WHERE r.name_role = 'танк'
            ORDER BY h.name_hero;    
        """)

        tanks = cur.fetchall()
        cur.close()
        conn.close()
        return jsonify(tanks)
    
    except Exception as e:
        print(f"Ошибка в get_tanks: {e}")
        return jsonify({"error": "Внутренняя ошибка сервера"}), 500

@app.route('/api/synergies/<int:tank_id>', methods=['GET'])
def get_synergies(tank_id):

    try:
        conn = get_db_connection()
        cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

        cur.execute("SELECT name_hero FROM hero WHERE id_hero = %s;", (tank_id,))
        tank = cur.fetchone()
        if not tank:
            return jsonify({"error": "Танк не найден"}), 404
    
        cur.execute("""
            SELECT
                h2.id_hero,
                h2.name_hero,
                h2.image_url,
                s.usefulness,
                s.description_s
            FROM synergy s
            JOIN hero h1 ON s.id_hero1 = h1.id_hero
            JOIN hero h2 ON s.id_hero2 = h2.id_hero
            JOIN role r ON h2.id_role = r.id_role
            WHERE h1.id_hero = %s
                AND r.name_role = 'поддержка'
            ORDER BY
                CASE s.usefulness
                    WHEN 'лучший' THEN 1
                    WHEN 'хороший' THEN 2
                    WHEN 'плохой' THEN 3
                END,
                h2.name_hero;
        """, (tank_id,))

        synergies = cur.fetchall()
        cur.close()
        conn.close()

        result = {
            "tank": tank['name_hero'],
            "tank_id": tank_id,
            "synergies": {
                "best": [s for s in synergies if s['usefulness'] == 'лучший'],
                "good": [s for s in synergies if s['usefulness'] == 'хороший'],
                "worst": [s for s in synergies if s['usefulness'] == 'плохой'],
            }
        }

        return jsonify(result)
    
    except Exception as e:
        print(f"Ошибка в get_synergies: {e}")
        return jsonify({"error": "Внутренняя ошибка сервера"}), 500

@app.route('/api/maps', methods=['GET'])
def get_maps():
    try:
        conn = get_db_connection()
        cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

        cur.execute("""
            SELECT id_map, name_map, image_map
            FROM game_map
            ORDER BY name_map;
        """)
        maps = cur.fetchall()

        cur.close()
        conn.close()
        return jsonify(maps)
    
    except Exception as e:
        print(f"Ошибка в get_maps: {e}")
        return jsonify({"error": "Внутренняя ошибка сервера"}), 500

@app.route('/api/map-heroes', methods=['GET'])
def get_map_heroes():
    try:
        map_id = request.args.get('map_id')
        user_role = request.args.get('user_role')

        if not map_id or not user_role:
            return jsonify({"error": "Не указан map_is или user_role"}), 400
    
        conn = get_db_connection()
        cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    
        cur.execute("SELECT name_map FROM game_map WHERE id_map = %s", (map_id,))
        game_map = cur.fetchone()
        if not game_map:
            return jsonify({"error": "Карта не найдена"}), 404

        cur.execute("SELECT id_role FROM role WHERE name_role = %s", (user_role,))
        if not cur.fetchone():
            return jsonify({"error": f"Роль '{user_role}' не найдена"}), 404

        cur.execute("""
            SELECT
                h.id_hero,
                h.name_hero,
                h.image_url,
                cm.quality,
                cm.description_comb
            FROM combination_of_hero_and_map cm
            JOIN hero h ON cm.id_hero = h.id_hero
            JOIN role r ON h.id_role = r.id_role
            WHERE cm.id_map = %s
                AND r.name_role = %s
            ORDER BY
                CASE cm.quality
                    WHEN 'лучший' THEN 1
                    WHEN 'неподходящий' THEN 2
                END,
                h.name_hero; 
        """, (map_id, user_role))

        heroes = cur.fetchall()

        cur.close()
        conn.close()

        result ={
            "map": game_map['name_map'],
            "map_id": int(map_id),
            "user_role": user_role,
            "heroes":{
                "best": [h for h in heroes if h['quality'] == 'лучший'],
                "worst": [h for h in heroes if h['quality'] == 'неподходящий']
            }
        }

        return jsonify(result)

    except Exception as e:
        print(f"Ошибка в get_map_heroes: {e}")
        return jsonify({"error": "Внутренняя ошибка сервера"}), 500    

if __name__ == '__main__':
    app.run(debug=True, port=5000)