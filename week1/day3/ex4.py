class Zoo:
    def __init__(self, zoo_name):
        self.name = zoo_name
        self.animals = []

    def add_animal(self, new_animal):
        if new_animal not in self.animals:
            self.animals.append(new_animal)

    def get_animals(self):
        print("Animals in the zoo:", self.animals)

    def sell_animal(self, animal_sold):
        if animal_sold in self.animals:
            self.animals.remove(animal_sold)

    def sort_animals(self):
        self.animals.sort()
        grouped_animals = {}
        for animal in self.animals:
            first_letter = animal[0]
            if first_letter in grouped_animals:
                grouped_animals[first_letter].append(animal)
            else:
                grouped_animals[first_letter] = [animal]
        return grouped_animals

    def get_groups(self):
        groups = self.sort_animals()
        for key, value in groups.items():
            print(f"{key}: {value}")



new_york_zoo = Zoo("New York Zoo")


new_york_zoo.add_animal("Giraffe")
new_york_zoo.add_animal("Bear")
new_york_zoo.add_animal("Baboon")
new_york_zoo.add_animal("Cougar")
new_york_zoo.add_animal("Cat")
new_york_zoo.add_animal("Ape")
new_york_zoo.add_animal("Emu")
new_york_zoo.add_animal("Eel")


new_york_zoo.get_animals()


new_york_zoo.sell_animal("Giraffe")


new_york_zoo.get_animals()


new_york_zoo.get_groups()
