import React from 'react'
import { BrowserRouter as Router,Link } from "react-router-dom";
import { Redirect } from 'react-router'
import Logo from './../images/profile2.png'

class Login extends React.Component{

    
    render(){

        const redirectReferrer = this.props.redirectReferrer;
        if(redirectReferrer){
            return <Redirect to="/Home" />
        }
        
        return(
            <div className="parent">
            <div className="child">
                <form onSubmit={this.props.handleLogin} className="LoginForm">
                    <div className="imgcontainer">
                    <img  src={Logo} alt="Avatar" className="avatar" />
                    </div>
                    <div className="container">
                        <label  className="LoginLabel"><b>Username</b></label>
                        <input type="text" className="InputLogin" value={this.props.username} name="username" onChange={this.props.handleChange} placeholder="Your Username"/>
                        
                        <label  className="LoginLabel"><b>Password</b></label>
                        <input type="password" className="InputLogin" value={this.props.password} name="password" onChange={this.props.handleChange} placeholder="Your Password" autoComplete="password"/>
                        <br />
                    <button className="LoginButton">Login</button> <Link className="Link" to="/SignUp">Sign Up</Link> 
                    
                    </div>
                
                </form>    



                
            </div>
            </div>
            
        )
    
    }
}

export default Login;