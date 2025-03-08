import random

def number_guessing_game():
    random_number = random.randint(1, 100)
    max_attempts = 7
    
    print("Welcome to the Number Guessing Game!")
    print(f"You have {max_attempts} attempts to guess the number between 1 and 100.")
    
    for attempt in range(1, max_attempts + 1):
        try:
            guess = int(input(f"Attempt {attempt}: Enter your guess: "))
            
            if guess < 1 or guess > 100:
                print("Please enter a number between 1 and 100.")
                continue
            
            if guess < random_number:
                print("Too low!")
            elif guess > random_number:
                print("Too high!")
            else:
                print(f"Congratulations! You guessed the number {random_number} correctly in {attempt} attempts.")
                return
        except ValueError:
            print("Invalid input. Please enter a valid number.")
    
    print(f"Sorry, you've used all {max_attempts} attempts. The correct number was {random_number}.")

if __name__ == "__main__":
    number_guessing_game()
