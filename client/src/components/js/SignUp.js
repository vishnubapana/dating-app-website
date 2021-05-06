import React from 'react'
import { Link } from 'react-router-dom'
import '../css/home.css'
import '../css/index.css'

function SignUp() {
    return (
        <>
        <div class="signup-login">
			<form name="registration">
				<h2>Register</h2>
				<p class="hint-text">Create your account. It's free and only takes a minute.</p>
				<div class="form-group">
					<div class="row">
						<div class="col"><input type="text" class="form-control" name="first_name"
								placeholder="First Name" id="first_name"/></div>
						<div class="col"><input type="text" class="form-control" name="last_name"
								placeholder="Last Name" id="last_name"/></div>
					</div>
				</div>
				<div class="form-group">
					<input type="email" class="form-control" name="email" placeholder="Email" id="email"/>
				</div>
				<div class="form-group">
					<input type="password" class="form-control" name="password" placeholder="Password" id="password"/>
				</div>
				<div class="form-group">
					<p class="error error-hidden"></p>
					<button type="submit" class="btn btn-success btn-lg btn-block center" id="btnSignUp">Register
						Now</button>
				</div>
			</form>
			<div class="text-center">Already have an account? <Link to='/sign-in'>Sign in</Link></div>
		</div>
        </>
    )
}

export default SignUp
