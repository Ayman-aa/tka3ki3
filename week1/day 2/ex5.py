import random
def compare_numbers(num1):
    if num1 >= 1 and num1 <= 100:
        num2 = random.randint(1,100)
        if num1 == num2:
            print("Success")
        else:
            print("Failure")
        print(f"Your number : {num1}, the random number : {num2}")

    else:
        print("Enter a number between 1 and 100")

compare_numbers(2)