from game import Game

def get_user_menu_choice():
    print("\n==== Rock Paper Scissors ====")
    print("1. Play a new game")
    print("2. Show scores")
    print("3. Quit")

    while True:
        choice = input("Enter your choice (1, 2, or 3): ")
        if choice in ['1', '2', '3']:
            return choice
        else:
            print("Invalid choice. Please try again.")

def print_results(results):
    print("\n==== Game Results ====")
    print(f"You won {results['win']} times")
    print(f"You lost {results['loss']} times")
    print(f"You drew {results['draw']} times")
    print(f"Total games played: {sum(results.values())}")
    print("\nThanks for playing!")

def main():
    results = {'win': 0, 'loss': 0, 'draw': 0}

    while True:
        user_choice = get_user_menu_choice()

        if user_choice == '1':
            game = Game()
            result = game.play()

            if result in results:
                results[result] += 1

        elif user_choice == '2':
            print_results(results)

        elif user_choice == '3':
            print_results(results)
            break

if __name__ == "__main__":
    main()