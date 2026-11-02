import psycopg2
from psycopg2.extras import RealDictCursor
import psycopg2.extras
import os

def get_db_connection():
    conn = psycopg2.connect(
        host='localhost',
        database='overwatch',
        user='app_overwatch_admin',
        password='your_password_here'
    )
    return conn

def test_connection():
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('SELECT 1')
        cur.close()
        conn.close()
        print("Подключение к БД успешно")
        return True
    except Exception as e:
        print (f"Ошибка подключения: {e}")
        return False
    
if __name__ == '__main__':
    test_connection()