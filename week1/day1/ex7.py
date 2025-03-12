basket = ["Banana", "Apples", "Oranges", "Blueberries"]

basket.remove("Banana")  # Removes the first occurrence of "Banana"

basket.remove("Blueberries")  # Removes "Blueberries"

basket.append("Kiwi")  # Adds "Kiwi" at the end

basket.insert(0, "Apples")  # Inserts "Apples" at index 0

apple_count = basket.count("Apples")
print("Number of Apples:", apple_count)  # Output: 2

basket.clear()  # Clears all elements from the list

print("Basket:", basket)  # Output: []

