from ex4 import Family

class TheIncredibles(Family):

    def __init__(self,members,last_name="TheIncredibles"):
        super().__init__(members,last_name)

    def use_power(self):
        for member in self.members:
            if member['age'] >= 18:
                print(f"{member['name']} use {member['power']}")
            else:
                raise Exception(f"{member['name']} is not 18 years old yet to use their power")

    def incredible_presentation(self):
        print("Worry not! why? warewa ktaaaa!")
        super().family_presentation()

def main():
    details = [
            {'name':'Michael','age':35,'gender':'Male','is_child':False,'power': 'fly','incredible_name':'MikeFly'},
            {'name':'Sarah','age':32,'gender':'Female','is_child':False,'power': 'read minds','incredible_name':'SuperWoman'}
            ]

    fam = TheIncredibles(details)
    fam.use_power()
    print()
    fam.incredible_presentation()
    print()
    fam.born(name='baby Jack', age=2, gender='Male', is_child=True, power='Unknown Power',incredible_name='Jack Jack')
    print()
    fam.incredible_presentation()
    print()
    fam.use_power()
if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print(f"Caught exception: {str(e)}")



