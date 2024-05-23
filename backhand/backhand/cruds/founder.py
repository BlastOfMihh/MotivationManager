from backhand import db
from .motivation import Motivation
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship

class Founder(db.Model):
    __tablename__='Founders'

    _id=db.Column(db.Integer, primary_key=True)
    motivation_id=db.Column(db.Integer, ForeignKey("motivations._id"), nullable=False)
    name=db.Column(db.Text, nullable=False)
    email=db.Column(db.Text, nullable=False)


    def __init__(self, name:str, email:str, motivation_id:int):
        self.name=name
        self.email=email
        self.motivation_id=motivation_id
    
    @staticmethod
    def is_valid(motivation):
        return (motivation.strength<=5 and motivation.strength>=0)
    
    def to_dict(self):
        return {"id":self._id, "motivation_id":self.motivation_id, "name": self.name, "email": self.email}

    def __repr__(self) -> str:
        return {"id" :self.motivation_id, "name": self.name, "strength": self.email}
    
    # @classmethod
    # def from_dict(cls, data):
    #     return cls(data['id'], data['name'], data['strength'])

    @classmethod
    def from_dict_no_id(cls, data):
        return cls( data['name'], data['email'], data['motivation_id'])

# motiv=Motivation(0, "salut", 4)
# print(motiv.to_dict())
