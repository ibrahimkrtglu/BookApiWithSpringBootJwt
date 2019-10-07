import React from 'react'

class SignUp extends React.Component{

    render(){
        return(
            
            <div className="parentSignUp">
            <div className="SignUpDiv">
                <div className="SignUpContainer">
                <form onSubmit={this.props.handleSignUp} className="SubmitSignUp">
                    
                        <h1>Sign Up</h1>
                        <p>Please fill in this form to create an account.</p>
                        <hr />
                        <label ><b>Name</b></label>
                        <input type="text"  value={this.props.name} name="name" onChange={this.props.handleChange} placeholder="Your Name" className="inputSignUp" />
                        <label ><b>Email</b></label>
                        <input type="text"  value={this.props.email} name="email" onChange={this.props.handleChange} placeholder="Your E-mail" className="inputSignUp" />
                        <label ><b>Username</b></label>
                        <input type="text"  value={this.props.candidate_username} name="candidate_username" onChange={this.props.handleChange} placeholder="Your Username" className="inputSignUp" />
                        <label ><b>Password</b></label>
                        <input type="text"  value={this.props.candidate_password} name="candidate_password" onChange={this.props.handleChange} placeholder="Your Password" className="inputSignUp" autoComplete="password"/>

                        <p className="pSignUp">By creating an account you agree to our <a href="https://www.termsfeed.com/blog/privacy-policies-vs-terms-conditions/">Terms & Privacy</a>.</p>

                        <div className="clearfix">
                            <button className="signupbtn"> Sign Up</button>
                        </div>
                    
                </form>

                </div>
            </div>
            </div>
        )
    }
}

export default SignUp;


 

  