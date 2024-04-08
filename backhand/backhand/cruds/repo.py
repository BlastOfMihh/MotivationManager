
class Repo():
    def __init__(self) -> None:
        self.entities=[ ]

    def add(self, entity):
        self.entities.append(entity)
    
    def remove(self, id):
        self.entities=list(filter(lambda x: x.id!=id, self.entities))

    def update(self, id, entity):
        self.entities=map(lambda x: 
                           x if x.id!=id else entity, self.entities)
    
    def get(self, id):
        search_results=list(filter(lambda x: x.id==id, self.entities))
        if len(search_results)==0:
            return None
        return search_results[0]

    def get_all(self):
        return self.entities