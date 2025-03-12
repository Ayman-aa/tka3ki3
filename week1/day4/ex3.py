from ex2 import Dog
import random

class PetDog(Dog):
    def __init__(self,name,age,weight):
        super().__init__(name,age,weight)
        self.trained = False

    def train(self):
        print(super().bark())
        self.trained = True

    def play(self,*dogs):
        dogs_names = ", ".join(dogs)
        print(f"{dogs_names} all play together")

    def do_a_trick(self):
        if self.trained:
            tricks = [
                    f"{self.name} does a barrel roll",
                    f"{self.name} stands on his back legs",
                    f"{self.name} shakes your hand",
                    f"{self.name} plays dead"
                    ]
            print(random.choice(tricks))
        else:
            print(f"{self.name} is not trained yet!")



pet_dog = PetDog("Rocky", 6, 22)
pet_dog.train()
pet_dog.play("Buddy", "Max", "Charlie")
pet_dog.do_a_trick()