from flask import Flask, render_template, request, jsonify, session, redirect
from functools import wraps
import pymongo
from passlib.hash import pbkdf2_sha256
import uuid
#from user.models import User
app = Flask(__name__)
app.secret_key = b"d\\\x13\xacb\xff\xbdWG\xa506\xef'h\x9c"
# Database
client = pymongo.MongoClient('localhost', 27017)
db = client.dating_app

class User:

    def start_session(self, user):
        del user['password']
        session['logged_in'] = True
        session['user'] = user
        return jsonify(user), 200

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
        user['password'] = pbkdf2_sha256.hash(user['password'])
        
        # Check for exisitng email address
        if db.users.find_one({"email": user['email']}):
            return jsonify({"error" : "Email address already in use"}), 400

        # Add to database
        if db.users.insert_one(user):
            return self.start_session(user)
        return jsonify({"error" : "Signup Failed"}), 400
    
    def signout(self):
        session.clear()
        return redirect('/')
    
    def login(self):
        user = db.users.find_one({
            "email" : request.form.get('email')
        })
        if user and pbkdf2_sha256.verify(request.form.get('password'), user['password']):
            return self.start_session(user)
        return jsonify({"error" : "Invalid login credentials"}), 401

# Decorators
def login_required(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        if 'logged_in' in session:
            return f(*args, **kwargs)
        else:
            return redirect('/')
    return wrap

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
@login_required
def dashboard():
    return render_template('dashboard.html')
# Additional Routes
@app.route('/user/signup', methods=['POST'])
def signup():
    return User().signup()

@app.route('/user/signout')
def signout():
    return User().signout()

@app.route('/user/login', methods=['POST'])
def login():
    return User().login()
if __name__ == '__main__':
    app.run()