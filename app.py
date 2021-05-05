from flask import Flask, render_template, request, jsonify
import pymongo
from passlib.hash import pbkdf2_sha256
import uuid
#from user.models import User
app = Flask(__name__)

# Database
client = pymongo.MongoClient('localhost', 27017)
db = client.dating_app

class User:
    def signup(self):
        
        # Create User Object

        user = {
            "_id" : uuid.uuid4().hex,
            "first_name" : request.form.get('first_name'),
            "last_name" : request.form.get('last_name'),
            "email" : request.form.get('email'),
            "password" : request.form.get('password')
        }

        # Encrypt Password
        user['password'] = pbkdf2_sha256.encrypt(user['password'])
        
        # Check for exisitng email address
        if db.users.find_one({"email": user['email']}):
            return jsonify({"error" : "Email address already in use"}), 400

        # Add to database
        if db.users.insert_one(user):
            return jsonify(user), 200
        return jsonify({"error" : "Signup Failed"}), 400

# Default Routes
@app.route('/')
def home():
    return render_template('home.html')

@app.route('/showsignup')
def showSignUp():
    return render_template('signup.html')

@app.route('/showlogin')
def showLogIn():
    return render_template('login.html')

@app.route('/dashboard/')
def dashboard():
    return render_template('dashboard.html')
# Additional Routes
@app.route('/user/signup', methods=['POST'])
def signup():
    return User().signup()

if __name__ == '__main__':
    app.run()