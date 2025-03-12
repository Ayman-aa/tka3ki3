class Farm:
    def __init__(self,name):
        self.name = name
        self.animals = {}

    def add_animal(self,animal_name,animal_count=1):
        if animal_name in self.animals:
            self.animals[animal_name] += animal_count
        else:
            self.animals[animal_name] = animal_count

    def get_info(self):
        output = f"{self.name}'s farm\n\n"
        for animal,count in sorted(self.animals.items()):
            output += f"{animal:<6} : {count}\n"
        output += "\n    E-I-E-I-0!\n"
        return output
    
    def get_animal_types(self):
        return sorted(self.animals.keys())
    
    def get_short_info(self):
        animals_list = []
        for animal, count in sorted(self.animals.items()):
            plural = f"{animal}s" if count > 1 else animal
            animals_list.append(plural)
        
        if len(animals_list) > 1:
            return f"{self.name}'s farm has {', '.join(animals_list[:-1])} and {animals_list[-1]}."
        else:
            return f"{self.name}'s farm has {animals_list[0]}."



macdonald = Farm("McDonald")
macdonald.add_animal('cow', 5)
macdonald.add_animal('sheep')
macdonald.add_animal('sheep')
macdonald.add_animal('goat', 12)
print(macdonald.get_info())
print(macdonald.get_animal_types())
print(macdonald.get_short_info())
