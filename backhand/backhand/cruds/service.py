from .repo import Repo
from .motivation import Motivation
from .founder import Founder
from .validator import Validator

class Service:
    def __init__(self, repo:Repo):
        self.xrepo=repo
        self._last_id=0
        self.sorting_flag=False
        self.name_filter_key=""
        self.page_size=3
        self.page_index=0
        self.strenght_filter_flag=False
        self.strenght_filter_key=5

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
        if self.sorting_flag:
            all = sorted(all, key=lambda x : x.name)
        all = self.name_filter(all)
        if self.strenght_filter_flag:
            all = self.strenght_filter_(all)
        return all
    
    def get_strenghts(self):
        return set([motivation.strength for motivation in self.xrepo.get_all()])

    def turn_page(self):
        print("turn ")
        self.page_index+=1
        self.page_index=max(self.page_index, 0)

    def turn_back_page(self):
        print("turn back ")
        self.page_index-=1
        self.page_index=max(self.page_index, 0)

    def get_page(self):
        all=self.get_all()
        left_index=(self.page_index)*self.page_size
        right_index=left_index + self.page_size
        if left_index>len(all)-1:
            self.page_index-=1
            left_index=(self.page_index)*self.page_size
            right_index=left_index + self.page_size
        all=all[left_index:right_index]
        return all


    def set_page(self, page_size, page_index):
        self.page_size=max(page_size, 1)
        return {'index':self.page_index, 'size':self.page_size}

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
    
    def get_sorted_by_name(self):
        result = sorted(self.xrepo.get_all(), key=lambda x : x.name)
        return [ x.to_dict() for x in result ]

    def toggle_sorting(self):
        self.sorting_flag=not self.sorting_flag

    def set_name_filter_key(self, key):
        self.name_filter_key=key

    def name_filter(self, all):
        return list(filter(lambda x : self.name_filter_key in x.name, all))

    def set_strenght_filter(self, key):
        self.strenght_filter_key=key
        self.strenght_filter_flag=True

    def strenght_filter_(self, all):
        return list(filter(lambda x: abs(self.strenght_filter_key - x.strength)<=0.99, all))

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
        