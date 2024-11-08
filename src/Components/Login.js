import React, { Component } from 'react';
// import checkLogin from "../Components/LoginService";
import { Route , withRouter} from 'react-router-dom';
import { Link } from "react-router-dom";
import axios from "axios";
import Features from './Features';
import books from "./img/books.png";


 class Login extends Component {
  constructor(props) {
    super(props)
   
    this.state = {
        email: "",
        password: "",
        errorMessage: "",
        users:[],
        display:"none",
        timePassed:false,
        showModal: false,
        show:false,
        localuser:{}
      };
      this.timerId = null;
  }

  showModal = (e) => {
    this.setState(prevState => ({
        showModal: !prevState.showModal 
    }));
  }

  handleModal() {
    this.setState({show:!this.state.show})
  }

      changeUserName = e => {
        const email = e.target.value;
        this.setState({ email });
      };
    
      changePassword = e => {
        const password = e.target.value;
        this.setState({ password });
      };

      resetMessage() {
        this.timerId = setTimeout(() => {
          this.setState({
            errorMessage: ""
          });
          this.timerId = null;
        }, 2000);
      }

      componentDidMount() {
        this.setState({
          localuser:localStorage.setItem("MyUser", JSON.stringify(this.state.localuser))
        })
        
      }

      // submitLogin = (e) => {
      //   console.log("zdfsdxg")
      //   e.preventDefault();
      //   const user = {
      //     email: this.state.email.toLowerCase(),
      //     password: this.state.password
      //     };
         
      //     axios
      //     .post("http://localhost:6000/libmanagement/members/login", user)
      //     .then(res => {
      //       console.log(res)
      //       this.setState({errorMessage:res.data.message})
      //     if (res.data.message === "Login Successfull") {
      //       localStorage.setItem("MyUser", JSON.stringify(res.data.user))
      //     this.props.history.push({
      //     pathname: '/homepage',
      //     state: {
      //        user: res.data.user
      //     } 
      //     });
      //     } 
      //     if(this.state.email === "librarian@gmail.com" && this.state.password === "admin"){
      //       this.props.history.push({
      //         pathname: '/admin' 
      //       });
      //     } else if(this.state.email === "librarian@gmail.com" && this.state.password !== "admin")  {
      //       this.setState({errorMessage:"Invalid Librarian"})
      //     } 
          
      //     else if(this.state.email === "" && this.state.password === "")  {
      //       this.setState({errorMessage:"Please enter the details"})
      //     } 
        
          
      //     else {
      //       console.log("")
      //     }
      //     })
      //     }

    //   
    
    submitLogin = (e) => {
      e.preventDefault();
    
      const user = {
        email: this.state.email.toLowerCase(),
        password: this.state.password
      };
    
      // Check if the user is the librarian
      if (user.email === "librarian@gmail.com" && user.password === "admin") {
        // Redirect directly to the admin page for the librarian
        this.props.history.push({
          pathname: '/admin'
        });
      } else if (user.email === "librarian@gmail.com" && user.password !== "admin") {
        // If the email is correct for the librarian but the password is incorrect
        this.setState({ errorMessage: "Invalid Librarian" });
      } else {
        // Non-librarian users will go through the regular login API request
        axios
          .post("https://libmanagement-a12k.onrender.com//members/login", user)
          .then((res) => {
            console.log("Response data:", res.data); // Debugging
    
            // Check if login is successful
            if (res.data.message === "Login Successful") {
              // Store user in local storage
              localStorage.setItem("MyUser", JSON.stringify(res.data.user));
    
              // Redirect to the homepage
              this.props.history.push({
                pathname: "/homepage",
                state: { user: res.data.user }
              });
            } else {
              // Set error message if login failed
              this.setState({ errorMessage: res.data.message });
            }
          })
          .catch((error) => {
            console.error("An error occurred:", error);
            this.setState({ errorMessage: "An error occurred, please try again." });
          });
      }
    };
    
      
    render() {
     
        return (
            <div class="login_wrapper">
            <div class="alert alert-primary mt-5" role="alert" style = {{height:"60px",fontSize:"17px",color: "#595771",background:"#e4dce7",margin:"0px auto",borderColor:"#ab67bc !important"}}>
            <span className="d-block">Check our <Link to = "/features" onClick={()=>{this.handleModal()}}><b>Instructions</b></Link></span>
            </div>
            <form class="login_box" onSubmit={this.submitLogin}>
                <div class="login_brand">
                    <img src={books} alt="upGrad" style = {{height:"56px",width:"56px"}} />
                    </div>
                    <div class="login_header">Welcome to Library!</div>
                    <div class="login_content">
                        <div class="ip_container userType">
                            <label class="ip_label">Email</label>
                            <input placeholder="name@email.com" class="input" name="email" type="text" value={this.state.email} onChange={this.changeUserName} />
                            </div>
                            <div class="ip_container userType"><label class="ip_label">Password</label>
                            <input placeholder="Enter Your Password" class="input" name="password" type="password" value={this.state.password} onChange={this.changePassword} />
                            </div>
                            </div>
                            <div class="login_footer">
                            <input type="submit"  value="Login" className="submitBtn button_primary button mt-4 mb-3" />
                             </div>
                            <div class="register-path">
                            <p class="text-center">Not a member? 
                            <Link to="/Register">
                           <a className ="register">Register now</a> 
                           </Link>
                           </p>
                            </div>
                    
                            {this.state.errorMessage === ""?(
                            <p className = "errormsg" style={{ display: this.state.display }}>{this.state.errorMessage}</p>
                            ):(
                              <p className = "errormsg">{this.state.errorMessage}</p>
                            )}
                            
                            </form>
                            {this.state.showModal && 
          <Features 
            onCloseModal={this.showModal} 
          />
        } 
                            </div>
            
            
        )
    }
}

export default withRouter(Login);