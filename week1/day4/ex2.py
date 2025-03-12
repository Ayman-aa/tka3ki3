class Dog:
    def __init__(self, name, age, weight):
        self.name = name
        self.age = age
        self.weight = weight

    def bark(self):
        return f"{self.name} is barking"

    def run_speed(self):
        return f"{self.weight/(self.age * 10)}"

    def fight(self,other_dog):
        winner = self.name if (self.run_speed() * self.weight) > (other_dog.run_speed() * other_dog.weight) else other_dog.name
        return f"{self.name} and {other_dog.name} are fighting! {winner} won"

dog1 = Dog('rex',1,25)
dog2 = Dog('pun',1,45)
dog3 = Dog('moon',3,10)
