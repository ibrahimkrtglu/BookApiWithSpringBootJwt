import React from "react"

class Submit extends React.Component{
    render(){
        return(
            <div className="divSubmit">
                <form onSubmit={this.props.handleCreate}>
                    <input type="text" className="text" value={this.props.title} name="title" onChange={this.props.handleChange} placeholder="write the title of book"/>    
                        
                    <input type="text"  className="text" value={this.props.author} name="author" onChange={this.props.handleChange} placeholder="write the author of book"/>
                    
                    <button className="submitButton"> Submit</button>
                </form>
            </div>
        )
    }
}

export default Submit;