# Initial list of sandwich orders
sandwich_orders = [
    "Tuna sandwich", "Pastrami sandwich", "Avocado sandwich", 
    "Pastrami sandwich", "Egg sandwich", "Chicken sandwich", 
    "Pastrami sandwich"
]

print("Sorry, we're out of Pastrami sandwiches.")
while "Pastrami sandwich" in sandwich_orders:
    sandwich_orders.remove("Pastrami sandwich")  # Remove all occurrences


finished_sandwiches = []
while sandwich_orders:
    current_sandwich = sandwich_orders.pop(0)  # Remove the first sandwich from orders
    print(f"I made your {current_sandwich.lower()}")  # Print message
    finished_sandwiches.append(current_sandwich)  # Move to finished list


print("\nFinished sandwiches:", finished_sandwiches)
