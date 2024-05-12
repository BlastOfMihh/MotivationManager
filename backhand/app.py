from backhand import create_app
# run_tests()
from flask import Flask, jsonify, session, request, redirect, url_for
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity, get_jwt



testing=True

if __name__=="__main__":
    app=create_app()
    # if testing:
    #     from test_service_founder import run
    #     run()
        # unittest.main()
    app.run(debug=True)
