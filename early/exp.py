# Given a list [1, 2, 3, 4], print out all the values in the list one by one.
nums = [1, 2, 3, 4]
for num in nums:
    print(num)

# Given a list [1, 2, 3, 4], print out all the values in the list multiplied by 20.
print([num * 20 for num in nums])

# Given a list ["Elie", "Tim", "Matt"], return a new list with only the first letter of each name.
names = ["Elie", "Tim", "Matt"]
print([name[0] for name in names])

# Given a list [1, 2, 3, 4, 5, 6], return a new list with all the even values.
numbers = [1, 2, 3, 4, 5, 6]
print([num for num in numbers if num % 2 == 0])

# Given two lists [1, 2, 3, 4] and [3, 4, 5, 6], return a new list that contains only the values present in both lists.
list1 = [1, 2, 3, 4]
list2 = [3, 4, 5, 6]
print([num for num in list1 if num in list2])

# Given a list of words ["Elie", "Tim", "Matt"], return a new list with each word reversed and in lowercase.
print([name.lower()[::-1] for name in names])

# Given two strings "first" and "third", return a new list of the letters that are present in both strings.
str1 = "first"
str2 = "third"
print(sorted(set(str1) & set(str2)))

# For all numbers between 1 and 100, return a list of the numbers that are divisible by 12.
print([num for num in range(1, 101) if num % 12 == 0])

# Given the string "amazing", return a list with all the vowels removed.
string = "amazing"
vowels = "aeiou"
print([char for char in string if char not in vowels])

# Generate a list with the following value: [[0, 1, 2], [0, 1, 2], [0, 1, 2]].
print([[i for i in range(3)] for _ in range(3)])

# Generate a list with the given structure (10x10 grid of numbers 0-9).
print([[i for i in range(10)] for _ in range(10)])
