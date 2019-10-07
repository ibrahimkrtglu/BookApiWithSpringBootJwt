import React from 'react'

class Update extends React.Component{
    render(){
        if(this.props.updating){
            return(
                <div className="divUpdate">
                    <form onSubmit={()=>this.props.handleUpdate(this.props.id)}>
                    <input type="text" className="text" value={this.props.new_title} name="new_title" onChange={this.props.handleChange} placeholder="update the title of book"/>
                    <input type="text" className="text" value={this.props.new_author} name="new_author" onChange={this.props.handleChange} placeholder="update the author of book"/>
                    
                    <button className="updateButton2"> Update</button>
                    </form>    
                </div>
            )
        }

        return(null)
    }
}
export default Update;