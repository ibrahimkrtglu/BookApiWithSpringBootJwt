import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";



class Footer extends React.Component{
    render(){
        return(
        <div className="divFooter">
            
            
            <nav className="navbar" role="navigation">
                <img src="https://s3.amazonaws.com/plloyd/codepen/animated-menu-logo.svg" alt="there is a problem" />
            </nav>

            <div id="content">
                
                
            </div>

            <footer id="mobile-footer">
                

                <div id="mobile-menu">
                    
                    <div id="mobile-footer-container">
                        
                        <div className="mobile-link">
                            <a href="https://ibrahimkurtoglu.wordpress.com/" className="text-center">My Account</a>
                        </div>
                        <div className="mobile-link">
                            <a href="https://ibrahimkurtoglu.wordpress.com/" className="text-center">Reviews</a>
                        </div>
                        <div className="mobile-link">
                            <a href="https://ibrahimkurtoglu.wordpress.com/" className="text-center">Contact Us</a>
                        </div>
                    </div>
                </div>
                <div id="mobile-footer-close">
                    <button id="mobile-footer-btn">
                    <div className="mobile-btn-close is-rotating-back">
                        <span></span>
                    </div>
                    </button>
                </div>
            </footer>
            
               
        </div>
        )
    }
}

export default Footer;