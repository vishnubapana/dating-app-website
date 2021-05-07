import React from 'react'
import { Link } from 'react-router-dom'
import '../css/home.css'
import '../css/index.css'
import NavigationBarSignUp from './NavigationBarSignUp'

function SignUp() {
    return (
        <>
		<NavigationBarSignUp/>
        <div className="signup-login">
			<form name="registration">
				<h2>Register</h2>
				<p className="hint-text">Create your account. It's free and only takes a minute.</p>
				<div className="form-group">
					<div className="row">
						<div className="col"><input type="text" className="form-control" name="first_name"
								placeholder="First Name" id="first_name"/></div>
						<div className="col"><input type="text" className="form-control" name="last_name"
								placeholder="Last Name" id="last_name"/></div>
					</div>
				</div>
				<div className="form-group">
					<input type="email" className="form-control" name="email" placeholder="Email" id="email"/>
				</div>
				<div className="form-group">
					<input type="password" className="form-control" name="password" placeholder="Password" id="password"/>
				</div>
				<div className="form-group">
					<p className="error error-hidden"></p>
					<button type="submit" className="btn btn-success btn-lg btn-block center" id="btnSignUp">Register
						Now</button>
				</div>
			</form>
			<div className="text-center">Already have an account? <Link to='/sign-in'>Sign in</Link></div>
		</div>
        </>
    )
}

export default SignUp
