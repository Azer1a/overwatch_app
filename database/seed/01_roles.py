import sys
import os

backend_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', 'backend'))
sys.path.append(backend_path)

from database import get_db_connection

def seed_roles():
    conn = get_db_connection()
    cur = conn.cursor()

    roles = [('танк'),('урон'),('поддержка')]

    for role in roles:
        cur.execute("""
            INSERT INTO role (name_role)
            VALUES (%s)
            ON CONFLICT (name_role) DO NOTHING;
        """, (role,))
    
    conn.commit()
    cur.close()
    conn.close()
    print("Roles commit")

if __name__ == "__main__":
    seed_roles()