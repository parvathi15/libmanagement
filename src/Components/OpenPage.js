import React, { Component } from 'react';
import librarian from "../img/librarian.png";
import member from "../img/member.png";

export default class OpenPage extends Component {
    render() {
        return (
 
    <div className="container mt-5" style = {{paddingTop:"250px !important"}}>
      <div id="parent">
        <div id="left">
        <img src={librarian} alt="" className="mt-5" />
        <h2>Librarian</h2>
        </div>
        <div class="wrapper">
    <div class="line"></div>
    <div class="wordwrapper">
        <div class="word">or</div>                                        
    </div>
</div>
        {/* <span class="divider">
        <i className="fa fa-star"></i>
        </span> */}
        <div id="right">
        <img src={member} alt="" className="mt-5" />
        <h2>Member</h2>
        </div>
    </div> 
  </div>
        )
    }
}


