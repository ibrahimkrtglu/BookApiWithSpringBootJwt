import React from 'react';
import Header from './Header';
import Footer from './Footer';
import List from './List';
import Submit from './Submit';
import Update from './Update';
import { Redirect } from 'react-router';



class Home extends React.Component{

    constructor(){
        super();

        this.state = {
            new_title : "",
            title : "",
            new_author : "",
            author : "" ,
            allBooks : [] ,
            id:"" ,
            updating:false ,
            isLoggedOut:false ,
            dene:"ilk"
          
        }


        this.handleChange = this.handleChange.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.clickUpdate = this.clickUpdate.bind(this);
        this.handleLogOut = this.handleLogOut.bind(this);
    }


    handleDelete(id){    
        fetch("http://localhost:8080/api/auth/api/book/"+id,{
            method:'DELETE',
            headers:{
                'Content-Type': 'application/json' ,
                'Accept': 'application/json' ,
                'Authorization' : 'Bearer '+localStorage.getItem("token")
             },
            body:JSON.stringify({
                
                'id':id
            })
            
        }).then(response=>response.json())
          .then(response=>{
            alert("The book which has id "+response+" has been deleted successfully")
            const array=this.state.allBooks
            var  i=0
            while(array[i].id!==id){
                i++
            }
            
            delete array[i];
            this.setState({allBooks:array})
            
        }
            )
    }

    handleLogOut(){
        localStorage.clear();

        this.callback();
    }

    callback(){
        window.location.href = '/';
    }

   

    handleUpdate(id){   
        fetch("http://localhost:8080/api/auth/api/book/"+id,{
            method:'put',
            headers:{
                'Content-Type': 'application/json' ,
                'Accept': 'application/json' ,
                'Authorization' : 'Bearer '+localStorage.getItem("token")
             },
            body:JSON.stringify({
                "id" : id,
                "title" : this.state.new_title ,
                "author" : this.state.new_author
            })
            
        }).then(response =>response.json()).then(data => {alert("The book has been updated as " +data.title +" successfully")})
    }

    handleChange(event){
        const {type,name,value,checked} =event.target
        type === "checkbox" ? this.setState({[name]:checked}) : this.setState({[name]:value})
    }

    handleCreate(){    
        fetch("http://localhost:8080/api/auth/api/book",{
            method:'post',
            headers:{
                'Content-Type': 'application/json' ,
                'Accept': 'application/json' ,
                'Authorization' : 'Bearer '+localStorage.getItem("token")
             },
            body:JSON.stringify({
                
                "title" : this.state.title ,
                "author" : this.state.author
            })
            
        }).then(response =>response.json()).then(data => {alert(data.title +" has been created successfully")})
    }
    clickUpdate(id){
        this.setState({
            id:id,
            updating:!this.state.updating 
        })   
    }




    componentDidMount(){
        fetch("http://localhost:8080/api/auth/api/book")
        .then(response => response.json())
        .then(response=>{
            this.setState({allBooks:response})
            
        })
    }


    render(){
        
       
        if(localStorage.getItem("token")==='undefined' || !localStorage.getItem("token")){
            return <Redirect to="/" />
              
          
            
            
            
        }
        else{
           

            return(
              
                <div className="divApp">
                    

                    
                    <Header handleLogOut={this.handleLogOut}/>
                    <Submit handleChange={this.handleChange} handleCreate = {this.handleCreate} title={this.state.title} author={this.state.author} />
                    <List allBooks={this.state.allBooks} handleDelete={this.handleDelete} clickUpdate={this.clickUpdate}/> 
                    <Update new_title={this.state.new_title} new_author={this.state.new_author} handleChange={this.handleChange} handleUpdate={this.handleUpdate} 
                    updating={this.state.updating}  id={this.state.id} /> 

                    
                    <Footer />

                    
                    
                </div>
                )
        }
       
    }
}

export default Home;