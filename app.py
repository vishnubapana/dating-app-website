from flask import Flask, render_template, request, jsonify
#from flask_mongoengine import MongoEngine
from user.models import User
app = Flask(__name__)

'''
app.config['MONGODB_SETTINGS'] = {
    'db' : 'dating-app',
    'host' : 'localhost',
    'port' : 27017
}
db = MongoEngine()
db.init_app(app)

class Users(db.Document):
    first_name = db.StringField()
    last_name = db.StringField()
    email = db.StringField()
    password = db.StringField()
    def to_json(Self):
        return {"first_name" : self.first_name,
                "last_name" : self.last_name,
                "email" : self.email,
                "password" : self.password}
'''
@app.route('/')
def home():
    return render_template('home.html')

@app.route('/showsignup')
def showSignUp():
    return render_template('signup.html')

@app.route('/showlogin')
def showLogIn():
    return render_template('login.html')

#routes
@app.route('/user/signup', methods=['POST'])
def signup():
    return User().signup()

if __name__ == '__main__':
    app.run()