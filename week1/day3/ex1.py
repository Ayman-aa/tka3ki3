class Cat:
    def __init__(self, cat_name, cat_age):
        self.name = cat_name
        self.age = cat_age

cat1 = Cat("Whiskers", 5)
cat2 = Cat("Tom", 7)
cat3 = Cat("Fluffy", 3)

def find_oldest_cat(cats):
    oldest_cat = cats[0]
    for cat in cats[1:]:
        if cat.age > oldest_cat.age:
            oldest_cat = cat
    return oldest_cat

cats = [cat1, cat2, cat3]
oldest_cat = find_oldest_cat(cats)
print(f"The oldest cat is {oldest_cat.name}, and is {oldest_cat.age} years old.")