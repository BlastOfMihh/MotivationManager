from .repo import Repo
from .motivation import Motivation

class Service():
    def __init__(self, repo:Repo):
        self.xrepo=repo
        self._last_id=0
        self.sorting_flag=False
        self.name_filter_key=""
        self.page_size=3
        self.page_index=1
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
        start_ind=min((self.page_index-1)*self.page_size, len(all)-1)
        end_ind= min(self.page_index*self.page_size, len(all)-1)
        all = all[ start_ind : end_ind]
        print(start_ind, end_ind)
        return all

    def set_page(self, page_size, page_index):
        max_page_size=len(self.get_all())
        page_size=min(max_page_size, page_size)
        page_size=max(page_size, 1)

        max_page_index=max_page_size//page_size + 1 if max_page_size%page_size!=0 else 0
        page_index=max(page_index, 1)
        page_index=min(page_index, max_page_size)

        self.page_index=page_index
        self.page_size=page_size
        return {'index':page_index, 'size':page_size}

    def get_all_dict(self):
        return [x.to_dict() for x in self.get_all()]

    def name_filter(self, all):
        return list(filter(lambda x : self.name_filter_key in x.name, all))

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

    def toggle_sorting(self):
        self.sorting_flag=not self.sorting_flag

    def set_name_filter_key(self, key):
        self.name_filter_key=key



    # helper function
    def _bad_request():
        pass