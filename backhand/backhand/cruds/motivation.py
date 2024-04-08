class Motivation():
    def __init__(self, id:int, name:str, strength:float):
        self.id=id
        self.name=name
        self.strength=strength
    
    @staticmethod
    def is_valid(motivation):
        return (motivation.strength<=5 and motivation.strength>=0)
    
    def to_dict(self):
        return vars(self)

    def __repr__(self) -> str:
        return f"Motivation(id={self.id}, name={self.name}, strength={self.strength})"
    
    @classmethod
    def from_dict(cls, data):
        return cls(data['id'], data['name'], data['strength'])
    # @classmethod
    # def from_dict_no_id(cls, data):
    #     return cls(data['id'], data['name'], data['strength'])

# motiv=Motivation(0, "salut", 4)
# print(motiv.to_dict())
