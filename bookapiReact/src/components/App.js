import React from 'react'
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Login from './Login';
import SignUp from './SignUp';
import Home from './Home';




class App extends React.Component{

    constructor(){

        super();

        this.state = {
            username:"" ,
            password:"" ,
           
            candidate_username:"",
            candidate_password:"",
            name:"",
            email:"" ,
            redirectReferrer:false

        }

        this.handleLogin=this.handleLogin.bind(this);
        this.handleSignUp=this.handleSignUp.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    

    handleLogin(e){
       
        e.preventDefault();
        fetch("http://localhost:8080/api/auth/signin",{
            method:'post',
            headers:{
                'Content-Type': 'application/json' ,
                'Accept': 'application/json' 
             },
            body:JSON.stringify({
                
                "username" : this.state.username ,
                "password" : this.state.password
            })
            
        }).then(response =>response.json()).then(data => {
           
                localStorage.setItem("token",data.accessToken);
                localStorage.setItem("expire_at", 886400);
                   
            
        }).then(()=>{
            
           
            if(localStorage.getItem("token")!=='undefined'){
                this.setState(
                    {redirectReferrer:true 
                    
                    });

                    
            }
            else{
                this.setState({
                    redirectReferrer:false
                });
            }
            
                
        })
    }

    handleSignUp(e){    
        
        e.preventDefault();
        fetch("http://localhost:8080/api/auth/signup",{
            method:'post',
            headers:{
                'Content-Type': 'application/json' ,
                'Accept': 'application/json'
             },
            body:JSON.stringify({
                "name" : this.state.name,
                "username" : this.state.candidate_username ,
                "email" : this.state.email,
                "role" : ["admin"],
                "password" : this.state.candidate_password
            })
            
        }).then(response =>response.json()).then(data => {
            alert(data.name +" has been signed up successfully")
        })
    }

    
    handleChange(event){
        const {type,name,value,checked} =event.target
        type === "checkbox" ? this.setState({[name]:checked}) : this.setState({[name]:value})
    }


    render(){

        
            return(
                <Router>
                <Switch>               
                <Route exact path="/" render={props => <Login  handleChange={this.handleChange} handleLogin={this.handleLogin} username={this.state.username} password={this.state.password} token={this.state.token} redirectReferrer={this.state.redirectReferrer}/>} />
                <Route exact path="/SignUp" render={props => <SignUp handleChange={this.handleChange} handleSignUp={this.handleSignUp} candidate_username={this.state.candidate_username} candidate_password={this.state.candidate_password} name={this.state.name} email={this.state.email} />} />
                <Route exact path="/Home"  render={props => <Home redirectReferrer={this.state.redirectReferrer} />} />
                </Switch> 
                </Router>

            )
        
        
    }
}

export default App;