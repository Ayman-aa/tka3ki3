# Given a list of tuples, create a dictionary.
data = [("name", "Elie"), ("job", "Instructor")]
print(dict(data))

# Given two lists, create a dictionary mapping keys to values.
keys = ["CA", "NJ", "RI"]
values = ["California", "New Jersey", "Rhode Island"]
print(dict(zip(keys, values)))

# Create a dictionary where the keys are vowels and values are 0.
vowel_dict = {v: 0 for v in "aeiou"}
print(vowel_dict)

# Create a dictionary where keys are positions in the alphabet and values are the letters.
alphabet_dict = {i + 1: chr(65 + i) for i in range(26)}
print(alphabet_dict)

# Super Bonus: Count vowels in a given string.
string = "awesome sauce"
vowel_count = {v: string.count(v) for v in "aeiou"}
print(vowel_count)