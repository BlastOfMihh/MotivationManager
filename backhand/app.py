from backhand import create_app
import unittest
# run_tests()

testing=True

if __name__=="__main__":
    app=create_app()
    # if testing:
    #     from test_service_founder import run
    #     run()
        # unittest.main()
    app.run(debug=True)
