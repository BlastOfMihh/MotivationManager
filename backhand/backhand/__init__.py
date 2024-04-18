from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

from backhand.cruds.routes import register_routes
from backhand.cruds import bp 




db=SQLAlchemy()

def create_app():
    app=Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///./mydb.db'
    CORS(app)

    db.init_app(app)
    from backhand.cruds.repo import Repo
    from backhand.cruds.service import Service
    # app.register_blueprint(bp)
    xrepo=Repo(db)
    service=Service(xrepo)
    register_routes(app,service)

    migrate=Migrate(app, db)
    return app