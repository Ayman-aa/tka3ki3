number = int(input("Enter a number : "))
length = int(input("Enter a length : "))

list1 = []
for i in range(1,length + 1):
    list1.append(number * i)
print(f"Multiples of {number} up to length {length}: {list1}")