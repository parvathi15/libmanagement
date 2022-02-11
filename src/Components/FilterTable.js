import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class Navbar extends Component {
    constructor(props){
        super(props);
        this.state={
          sideBar: false,
          user:{},
          atoken: window.localStorage.getItem("MyUser"),
          role:"",
          showMenu: false
        }
    
        this.handleSidebar = this.handleSidebar.bind(this);
        this.showMenu = this.showMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
      }
      
    
    
      componentDidMount = async () => {
    
        const token = JSON.parse(this.state.atoken);
        console.log(token.username);
        this.setState({
          role:token
        })
      }
    
      handleSidebar(){
        const userData = localStorage.getItem("MyUser");
        const user = JSON.parse(userData);
        this.setState({user:user});
        this.setState({
          sideBar : !this.state.sideBar
        });
      }
    
      showMenu(event) {
        event.preventDefault();
        
        this.setState({ showMenu: true }, () => {
          document.addEventListener('click', this.closeMenu);
        });
      }
      
      closeMenu() {
        this.setState({ showMenu: false }, () => {
          document.removeEventListener('click', this.closeMenu);
        });
      }
    
      logout() {
        localStorage.setItem("MyUser", JSON.stringify(""))
        }  
    render() {
      console.log(this.state.role.username);
        return (
            <div> 
          <nav class="navbar navbar-expand-sm">
          <button
               onClick = {this.handleSidebar}
               className={`navToggle ${this.state.sideBar ? "open" : null}`}>
               <span />
               <span />
               <span />
             </button>
             <div  onClick={this.handleSidebar.bind(this)} className={`overlay ${this.state.sideBar ? "open" : ""}`}>
                    
                    </div>
                    <ul className="navbar-nav mr-auto mainNav" style={this.state.sideBar ? { transform: "translateX(0)" } : null}>
                
                <li>
                  
                  <Link to="/login" className="mainNavLink">
                    login
                    </Link>
                 
                </li>
                <li>
                  
                  <Link to="/register" className="mainNavLink">
                    register
                    </Link>
   
                    <Link to={{ pathname: "/userbook", state: this.state.role }}>
                    Userbooks
                    </Link>
   
                    {/* <Link to={{ pathname: "/userbook", state: this.state.role }}>
                     {title}
                    </Link> */}
                 
                </li>
                <li>
               
                    
                    <Link to="/sample" className="mainNavLink">
                    {this.state.user.username}
                    </Link>
                 
                </li>
               </ul>

  <div class="navbar-collapse collapse dual-nav order-4 order-md-4 justify-content-end">
    <ul className="mr-5" >
    <li class="nav-item">
    {this.state.user.username == null ? ( 
      <Link to="/" className="mainNavLink" style = {{marginRight:"20px",textDecoration:"none",fontSize:"20px"}}>
      {/* <Link to="/" className="mainNavLink" onClick={this.showMenu} style = {{marginRight:"20px"}}> */}
       Logout
      </Link>
    ):(
      
  <Link to="/" className="mainNavLink" onClick={this.showMenu} style = {{marginRight:"20px"}}>
                 {this.state.role.username} Profile
                 </Link>
    )}
                 </li>
    </ul>
    {/* <ul class="navbar-nav border border-primary">
      <li class="nav-item">
        <a class="nav-link" href="#">Right Link</a>
      </li>
    </ul> */}
  </div>
</nav>
{
                      this.state.showMenu
                        ? (
                          <div className="menu">
                            <Link to="/sample" className="mainNavLink">
                            <li> Menu item 1 </li>
                            </Link>
                            <Link to="/admin" className="mainNavLink">
                            <li> Menu item 2 </li>
                            </Link>
                            <li> Menu item 3 </li>
                          </div>
                       )
                        : (
                          null
                        )
                    } 
  </div>
        )
    }
}
