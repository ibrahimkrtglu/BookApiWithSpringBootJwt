import React from 'react'



class List extends React.Component{
    render(){
       
        const toDoList = this.props.allBooks
        return toDoList.map((elem,i)=>{
            return( 
                <div className="divList">
                
                <table key={i} className="greenTable">
                    <tbody>
                        <tr key={elem.id}>
                            
                                <td className="id" >{elem.id}</td> 
                                <td className="title">{elem.title}</td>
                                <td className= "author">{elem.author}</td>
                                <td className="mineButton"><button className="deleteButton" onClick={() => this.props.handleDelete(elem.id) }>Delete</button> </td>
                                <td className="mineButton"><button className="updateButton" onClick={() =>this.props.clickUpdate(elem.id)}>Update</button> </td>      
                        </tr>
                        
                    </tbody>
                </table>
                 
                </div>
                )
        }       
        )   
    }
}

export default List;