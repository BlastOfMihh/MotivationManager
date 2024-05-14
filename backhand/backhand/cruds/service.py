from .repo import Repo
from .motivation import Motivation
from .founder import Founder
from .validator import Validator

class Service:
    def __init__(self, repo:Repo):
        self.xrepo=repo
        self._last_id=0

    def _get_last_id(self):
        self._last_id+=1
        return self._last_id

    def add_examples(self):
        examples=[
            Motivation(0, "Kill Bill", 5),
            Motivation(1, "To be evil", 1),
            Motivation(2, "To be special", 4),
            Motivation(3, "Zumba", 5),
            Motivation(4, "Aesthetics madness", 5),
            Motivation(5, "Conquering Troy", 5)
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

    def get_all(self):
        all=self.xrepo.get_all()
        return all
    
    def get_strenghts(self):
        return set([motivation.strength for motivation in self.xrepo.get_all()])

    def get_page(self, index, size, all=None):
        if all is None:
            all=self.get_all()
        right_index=(index+1)*size-1
        if right_index>=len(all):
            right_index=len(all)-1
        left_index=max(0, right_index-size-1)
        print("all", all)
        page=all[left_index:right_index+1]
        print("all",page)
        print("left right index",left_index, right_index)
        return page,left_index//size
    
    def get_filter_page(self, index, size, name_filter_key=None, strength_filter_key=None, sort_by_name=False):
        def apply_filters_to_page(self, index, size, filters):
            elements=self.get_all()
            for my_filter in filters:
                elements=my_filter(self,elements)
            return self.get_page(index, size, elements)
        def name_filter(self, all):
            return list(filter(lambda x : name_filter_key in x.name, all))
        def strength_filter(self, all):
            return list(filter(lambda x: abs(strength_filter_key- x.strength)<=0.99, all))
        def sort_by_name(self, elements):
            result = sorted(elements, key=lambda x : x.name)
            return result
        filters_list=[]
        if name_filter_key is not None:
            filters_list.append(name_filter)
        if strength_filter_key is not None:
            filters_list.append(strength_filter)
        if sort_by_name:
            filters_list.append(sort_by_name)
        return apply_filters_to_page(self, index, size, filters_list)

    def get_all_dict(self):
        all=self.get_all()
        return [x.to_dict() for x in all]

    def _validate_motivation(self, motivation):
        if not Motivation.is_valid(motivation):
            raise Exception("Motivation not valid")
        if self.get_by_name(motivation.name) is not None:
            raise Exception("Motivation name must be unique")

    def add(self, entity_json):
        new_motivation=Motivation.from_dict(entity_json)
        new_motivation.id=self._get_last_id()
        Validator.validate(new_motivation)
        self.xrepo.add(new_motivation)
        return new_motivation.to_dict()

    def remove(self, id):
        if self.xrepo.get(id) is None :
            raise Exception("Id"+str(id)+" not found for deletion")
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
    




    def founder_add(self, motivation_id, name, email):
        print("adding founder")
        new_founder=Founder(name, email, motivation_id)
        self.xrepo.add(new_founder)

    def founder_remove(self, id):
        print(id)
        self.xrepo.founder_remove(id)

    def founder_update(self, id , motivation_id, name, email):
        new_founder=Founder(name, email, motivation_id)
        self.xrepo.founder_update(id, new_founder)

    def founder_get(self, id):
        founder = self.xrepo.founder_get(id)
        return {
            "name":founder.name,
            "email":founder.email,

        }

    def founder_get_all(self):
        return self.xrepo.founder_get_all()
        