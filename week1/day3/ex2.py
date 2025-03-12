class Dog:
    def __init__(self,name,height):
        self.name = name
        self.height = height

    def bark(self):
        print(f"{self.name} goes woof!")

    def jump(self):
        print(f"{self.name} jumps {self.height*2} cm high!")

def whos_bigger(dogs):
    big_dawg = dogs[0]
    for dog in dogs[1:]:
        if dog.height > big_dawg.height:
            big_dawg = dog
    print(f"{big_dawg.name} is the biggest dog in here!")


davids_dog = Dog("Rex",50)
print(f"{davids_dog.name} height's is {davids_dog.height}")
davids_dog.bark()
davids_dog.jump()

sarahs_dog = Dog("Teacup",20)
print(f"{sarahs_dog.name} height's is {sarahs_dog.height}")
sarahs_dog.bark()
sarahs_dog.jump()

dogs = [davids_dog, sarahs_dog]
whos_bigger(dogs)