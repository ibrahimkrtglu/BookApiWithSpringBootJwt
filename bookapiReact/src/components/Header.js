import React from 'react'

class Header extends React.Component{
    render(){
        return(
            <div>
                <div className="topnav">
                <a className="topnavhome" href="#home">Home</a>
                <a className="topnava" href="#news">News</a>
                <a className="topnava" href="#contact">Contact</a>
                <a className="topnava" href="#about">About</a>
                <a className="btnLogOut "onClick={this.props.handleLogOut} href="#logout">Log Out</a>
            </div>
                <header>
	                <div className="overlay">
                        <h1>A Magical Mixture</h1>
                        <h3>A good book,a cup of coffee which is good brewed and some rain</h3>
                        <p> Make some coffee , grab a book and watch as heaven open its gates</p>
	                    <br />
	                    <button className="headerButton">READ MORE BOOKS!</button>
                        
		            </div>
                </header>

            </div>
        )
    }
}

export default Header;