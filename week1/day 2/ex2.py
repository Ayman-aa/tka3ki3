def calculate_price(age):
    if age < 3:
        return 0
    elif 3 <= age <= 12:
        return 12
    else:
        return 15

def get_family_cost():
    family = {}
    print("\n--- Family Ticket Calculator ---")
    while True:
        name = input("Enter family member's name (or done to finish) : ")
        if name.lower() == 'done':
            break
        try:
            age = int(input(f"Enter {name}'s age : "))
            if age < 0:
                print("Age cannot be negative. Please try again.")
                continue
            family[name] = age
        except ValueError:
            print("Invalid age. Please enter a number.")

    print("\nTicket prices for your family:")
    total = 0
    for name,age in family.items():
        price = calculate_price(age)
        total += price
        print(f"{name.capitalize()} (age {age}): ${price}")

    print(f"\nTotal cost for your family: ${total}")

get_family_cost()