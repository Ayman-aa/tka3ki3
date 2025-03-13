import random

class Game:
    def __init__(self):
        self.user_item = ""
        self.computer_item = ""
        self.result = ""

    def get_user_item(self):
        while True:
            try:
                choice = input("Select (r)ock, (s)cissors or (p)apper : ")

                if choice == "r" or choice == "s" or choice == "p":
                    self.user_item = choice
                    return self.user_item
                else:
                    print("We won't move forward until you make a choice :)\n")
                    continue
            except:
                print("\nWe won't move forward until you make a choice :)\n")
                continue

    def get_computer_item(self):

        self.computer_item = f"{random.choice('rsp')}"
        return self.computer_item

    def get_game_result(self, user_item, computer_item):

        if user_item == 'r' and computer_item == 's':
            self.result = "win"
            return self.result

        elif user_item == 's' and computer_item == 'p':
            self.result = "win"
            return self.result

        elif user_item == 'p' and computer_item == 'r':
            self.result = "win"
            return self.result

        elif user_item == computer_item:
            self.result = "draw"
            return self.result

        else:
            self.result = "loss"
            return self.result

    def play(self):
        user_item = self.get_user_item()

        computer_item = self.get_computer_item()

        result = self.get_game_result(user_item, computer_item)

        item_names = {'r': 'rock', 'p': 'paper', 's': 'scissors'}
        print(f"You selected {item_names[user_item]}. The computer selected {item_names[computer_item]}. You {result}!")

        return result