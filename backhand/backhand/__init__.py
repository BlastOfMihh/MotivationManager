from flask import Flask
app=Flask(__name__)

from .cruds import bp as crud_bp

app.register_blueprint(crud_bp)