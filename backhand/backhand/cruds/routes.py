from . import bp 
from .repo import Repo
from .motivation import Motivation
from .service import Service
from flask import request

xrepo=Repo()
service=Service(xrepo)

service.add_examples()

@bp.route('/get/<id>', methods=['GET'])
def get(id):
    if request.method=='GET':
        try:
            id=int(id)
            return service.get(id)
        except ValueError:
            return "Invalid ID"
        except Exception as e:
            return str(e)

@bp.route('/get/all', methods=['GET'])
def get_all():
    if request.method=='GET':
        return service.get_all_dict()

@bp.route('/add', methods=['POST'])
def add():
    if request.method=='POST':
        try:
            motivation_dict = service.add( request.get_json() )
            return motivation_dict, 201
        except Exception as e:
            return str(e)

@bp.route('/remove', methods=['DELETE'])
def remove():
    if request.method=='DELETE':
        try:
            delete_id=request.get_json()["id"]
            service.remove(delete_id)
            return {}
        except Exception as e:
            return str(e)
    return 404

@bp.route('/update/<id>', methods=['PUT'])
def update(id):
    if request.method=='PUT':
        id=int(id)
        response = service.update(id, request.get_json())
        return response.to_dict()
        # try:
        #     service.update(int(id), request.get_json())
        # except Exception as e:
        #     return str(e)

@bp.route('/get/sorted/name', methods=['GET'])
def sort_by_name():
    return service.get_sorted_by_name()
    

# helper function
def _bad_request():
    pass