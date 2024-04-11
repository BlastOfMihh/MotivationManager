from flask import Flask
from flask_cors import CORS
app=Flask(__name__)

CORS(app)


from .cruds import bp as crud_bp

app.register_blueprint(crud_bp)