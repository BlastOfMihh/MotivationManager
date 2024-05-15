from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

from backhand.cruds.routes import register_routes
from backhand.cruds import bp 


from flask import jsonify, session, request, redirect, url_for
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity, get_jwt


db=SQLAlchemy() if 'db' not in locals() else db
jwt=JWTManager() if 'jwt' not in locals() else jwt

def create_app():
    app=Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///./mydb.db'

    # for the JWT thing
    app.config['SECRET_KEY'] = 'stronger_than_water'
    app.config["JWT_SECRET_KEY"] = 'balanced_as_fire'
    app.config['JWT_TOKEN_LOCATION'] = ['headers']
    CORS(app)

    db.init_app(app)
    from backhand.cruds.repo import Repo
    from backhand.cruds.service import Service
    # app.register_blueprint(bp)
    xrepo=Repo(db)
    service=Service(xrepo)
    register_routes(app,service)

    # JWT Initialization
    jwt.init_app(app=app)

    migrate=Migrate(app, db)
    return app