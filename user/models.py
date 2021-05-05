from flask import Flask, jsonify

class User:
    def signup(self):
        user = {
            "_id" : "",
            "first_name" : "",
            "last_name" : "",
            "email" : "",
            "password" : ""
        }
        return jsonify(user), 200