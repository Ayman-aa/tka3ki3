class Family:
    members = []
    last_name =""

    def __init__(self,members,last_name="Rochfeld"):
        self.members = members
        self.last_name = last_name

    def born(self,**member_info):
        self.members.append(member_info)
        print(f"Congratulation {self.last_name} for the new born {member_info['name']}!")

    def is_18(self, name):
        for member in self.members:
            if member['name'] == name:
                return member['age'] >= 18
        return False

    def family_presentation(self):
        print(f"The {self.last_name}'s family : ")
        for member in self.members:
            print(member)



details =   [
            {'name':'Michael','age':35,'gender':'Male','is_child':False},
            {'name':'Sarah','age':32,'gender':'Female','is_child':False}
        ]
fam = Family(details)
fam.born(name='Mark',age=0,gender='Male',is_child=True)
fam.family_presentation()