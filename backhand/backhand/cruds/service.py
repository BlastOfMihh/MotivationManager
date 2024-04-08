from .repo import Repo
from .motivation import Motivation

class Service():
    def __init__(self, repo:Repo):
        self.xrepo=repo
        self._last_id=0
    xrepo=Repo()

    def _get_last_id(self):
        self._last_id+=1
        return self._last_id

    def add_examples(self):
        examples=[
            Motivation(0, "Kill Bill", 5),
            Motivation(1, "To be evil", 1),
            Motivation(2, "To be special", 4),
            Motivation(3, "Zumba", 5),
            Motivation(4, "Aesthetics madness", 5)
        ]
        for x in examples:
            self.xrepo.add(x)

    def get(self, id):
        entity=self.xrepo.get(id)
        if entity is None:
            raise Exception("No entity with this id")
        return self.xrepo.get(id).to_dict()
    
    def get_by_name(self, name):
        all=self.xrepo.get_all()
        ans = list(filter(lambda x : x.name==name, all))
        if len(ans)==0:
            return None
        return ans[0].to_dict()

    def get_all_dict(self):
        return [x.to_dict() for x in self.xrepo.get_all()]

    def get_all(self):
        return self.xrepo.get_all()

    def _validate_motivation(self, motivation):
        if not Motivation.is_valid(motivation):
            raise Exception("Motivation not valid")
        if self.get_by_name(motivation.name) is not None:
            raise Exception("Motivation name must be unique")

    def add(self, entity_json):
        new_motivation=Motivation.from_dict(entity_json)
        new_motivation.id=self._get_last_id()
        self._validate_motivation(new_motivation)
        self.xrepo.add(new_motivation)
        return new_motivation.to_dict()

    def remove(self, id):
        if self.xrepo.get(id) is None :
            raise Exception("Id not found for deletion")
        self.xrepo.remove(id)

    def update(self, id, entity_json):
        if self.xrepo.get(id) is None :
            raise Exception("Id not found for update")
        self.xrepo.remove(id)
        new_motivation=Motivation.from_dict(entity_json)
        new_motivation.id=id
        self._validate_motivation(new_motivation)
        self.xrepo.add(new_motivation)
        return new_motivation
    
    def get_sorted_by_name(self):
        result = sorted(self.xrepo.get_all(), key=lambda x : x.name)
        return [ x.to_dict() for x in result ]



    # helper function
    def _bad_request():
        pass