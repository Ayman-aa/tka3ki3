import psycopg2
from auth import Auth

def main():
    try:

        HOSTNAME = 'localhost'
        USERNAME = 'superuser'
        PASSWORD = 'aza'
        DATABASE = 'auth_db'

        connection = psycopg2.connect(host=HOSTNAME, user=USERNAME, password=PASSWORD, dbname=DATABASE )
                
        auth = Auth(connection)
        
        while True:
            logged_in_user = auth.get_logged_in_user()
            if logged_in_user:
                print(f"Currently logged in as: {logged_in_user}")
                
            print("\n=== Authentication System ===")
            print("1. Login")
            print("2. Signup")
            print("3. Logout")
            print("4. Exit")
            
            choice = input("Enter your choice (1/2/3/4): ")
            
            if choice == '4' or choice.lower() == 'exit':
                print("Goodbye!")
                break
                
            elif choice == '3' or choice.lower() == 'logout':
                if logged_in_user:
                    auth.logout()
                    print("You have been logged out.")
                else:
                    print("You are not logged in.")
                
            elif choice == '1' or choice.lower() == 'login':
                if logged_in_user:
                    print(f"You are already logged in as {logged_in_user}")
                    continue
                    
                username = input("Username: ")
                password = input("Password: ")
                
                if auth.login(username, password):
                    print(f"You are now logged in as {username}.")
                else:
                    print("Invalid username or password.")
                    signup_choice = input("Would you like to sign up? (y/n): ")
                    
                    if signup_choice.lower() == 'y':
                        # Move to signup flow
                        choice = '2'
                    else:
                        continue
            
            if choice == '2' or choice.lower() == 'signup':
                if logged_in_user:
                    print(f"You are already logged in as {logged_in_user}")
                    continue
                    
                while True:
                    username = input("Choose a username: ")
                    if auth.check_user_exists(username):
                        print("Username already exists. Please choose another.")
                    else:
                        break
                
                while True:
                    password = input("Choose a password: ")
                    confirm_password = input("Confirm password: ")
                    
                    if password != confirm_password:
                        print("Passwords don't match! Try again.")
                    else:
                        break
                
                if auth.signup(username, password):
                    print("Account created successfully!")
                    print(f"You are now logged in as {username}.")
                else:
                    print("Error creating account. Please try again.")
        
        connection.close()
        
    except psycopg2.Error as e:
        print(f"Database error: {e}")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    main()