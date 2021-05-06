import React from 'react'
import { Link } from 'react-router-dom'
import '../css/home.css'
import '../css/index.css'

function SignIn() {
    return (
<>

        <div className="signup-login">
            <div>
                <div>
                    <div className="login-form">
                        <form className="login_form">
                            <div className="sidenav">
                                <div className="login-main-text">
                                    <h2>Login</h2>
                                    <p className="hint-text">Login or register from here to access.</p>
                                </div>
                            </div>
                            <div className="form-group">
                                
                                <input type="email" name="email" id="email" className="form-control" placeholder="Email"/>
                            </div>
                            <div className="form-group">
                       
                                <input type="password" name="password" id="password" className="form-control"
                                    placeholder="Password"/>
                            </div>
                            <p className="error error-hidden"></p>
                            <button type="submit" className="btn btn-success btn-lg btn-block center">Sign in</button>
                        </form>
                        <div className="text-center">Don't have an account? <Link to='/sign-up'>Sign up</Link></div>
                    </div>
                </div>
            </div>
            
        </div>
        </>
    )
}

export default SignIn
