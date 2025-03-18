import hashlib
import os

class Auth:
    def __init__(self, conn):
        self.conn = conn
        self.logged_in_user = None

    def _hash_password(self, password):
        salt = os.urandom(32)
        key = hashlib.pbkdf2_hmac(
            'sha256',
            password.encode('utf-8'),
            salt,
            100000
        )
        return salt.hex() + ':' + key.hex()

    def _verify_password(self, stored_password, provided_password):
        salt_hex, key_hex = stored_password.split(':')
        salt = bytes.fromhex(salt_hex)
        stored_key = bytes.fromhex(key_hex)

        key = hashlib.pbkdf2_hmac(
            'sha256',
            provided_password.encode('utf-8'),
            salt,
            100000 
        )

        return key == stored_key

    def check_user_exists(self, username):
        try:
            cursor = self.conn.cursor()
            
            cursor.execute("SELECT username FROM users WHERE username = %s", (username,))
            result = cursor.fetchone()
            
            cursor.close()
            
            return result is not None
            
        except Exception as e:
            print(f"Error checking user existence: {e}")
            return False

    def login(self, username, password):
        try:
            cursor = self.conn.cursor()
            
            cursor.execute("SELECT password FROM users WHERE username = %s", (username,))
            result = cursor.fetchone()
            
            cursor.close()
            
            if result and self._verify_password(result[0], password):
                self.logged_in_user = username
                return True
            return False
            
        except Exception as e:
            print(f"Login error: {e}")
            return False

    def signup(self, username, password):
        if self.check_user_exists(username):
            return False
            
        try:
            cursor = self.conn.cursor()
            
            hashed_password = self._hash_password(password)
            
            cursor.execute(
                "INSERT INTO users (username, password) VALUES (%s, %s)",
                (username, hashed_password)
            )
            
            self.conn.commit()
            cursor.close()
            
            self.logged_in_user = username
            return True
            
        except Exception as e:
            print(f"Signup error: {e}")
            return False
    
    def get_logged_in_user(self):
        return self.logged_in_user
    
    def logout(self):
        self.logged_in_user = None