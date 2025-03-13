def player_input(player, board):
    while True:
        try:
            position = int(input(f"Player {player}, choose a position (1-9): "))
            position -= 1

            if position < 0 or position > 8:
                print("Position must be between 1 and 9. Try again.")
                continue

            if board[position] != ' ':
                print("That position is already taken. Try again.")
                continue
            return position
        except:
             print("Please enter a number between 1 and 9.")


def display_board(board):
    print("\n")
    print(f" {board[0]} | {board[1]} | {board[2]} ")
    print('-----------')
    print(f' {board[3]} | {board[4]} | {board[5]} ')
    print('-----------')
    print(f' {board[6]} | {board[7]} | {board[8]} ')
    print('\n')


def check_win(board):
    for i in range(0, 9, 3):
        if board[i] == board[i+1] == board[i+2] != ' ':
            return board[i]

    for i in range(3):
         if board[i] == board[i+3] == board[i+6] != ' ':
            return board[i]

    if board[0] == board[4] == board[8] != ' ':
        return board[0]

    if board[2] == board[4] == board[6] != ' ':
        return board[2]

    if ' ' not in board:
        return 'Tie'

    return None


def play():
    print("Welcome to Tic Tac Toe!")
    print("Player 1 is X and Player 2 is O")
    print("Positions are numbered as follows:")
    print(" 1 | 2 | 3 ")
    print("-----------")
    print(" 4 | 5 | 6 ")
    print("-----------")
    print(" 7 | 8 | 9 ")
    print("\nLet's begin!\n")

    board = [' ' for _ in range(9)]
    current_player = 'X'

    while True:
        display_board(board)

        position = player_input(current_player, board)

        board[position] = current_player

        result = check_win(board)
        if result:
            display_board(board)
            if result == 'Tie':
                print("Game over! It's a tie!")
            else:
                print(f"Game over! Player {result} wins!")

            play_again = input("Do you want to play again? (yes/no): ").lower()
            if play_again.startswith('y'):
                play()
            else:
                print("Thanks for playing!")
            break

        current_player = 'O' if current_player == 'X' else 'X'

if __name__ == "__main__":
    play()