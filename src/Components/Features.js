import React, { Component } from 'react';
import { Button,Modal } from 'react-bootstrap';

export default class Features extends Component {
    constructor(props) {
        super(props);
    }

    setModalOpen = (e) => {
        e.preventDefault();
        this.setState(prevState => ({
            showModal: !prevState.showModal 
        }));
        window.location = "/libmanagement";
      }
  render() {
    return (
        <div className="modalBackground">
           
        <Modal.Dialog>
        <Modal.Header closeButton onClick={this.setModalOpen}>
            
        </Modal.Header>
           <Modal.Body>
                  
{/* <div class="container mt-5">
 <div class="h1-banner-title mt-5"><h4>General Instructions</h4>
</div>
<div class="rag-quiz mb20" id="rag-quiz">  */}
 <div class="h1-banner-title text-center"><h4>Instructions</h4>
</div>
<ul className='mt-4'>
<p>You can request only one book at a time.</p>
<p>You need librarian's approval for your membership.Once librarian approves your membership requests,you can read the book.</p>
<p>Once a User requests for a book,the status of that borrowed book would appear in Userbooks page.</p>
<p>Once your book request is successfull you can read it for one month.</p>
<p>Make sure to return the borrowed book by the due date.</p>
<p>You can extend the book after the due date only once.</p>
<p>A penalty of 400rs will be charged if borrowed book is not returned on due date..</p>
<p>Your account would be inactive if you dont clear your dues.</p>
</ul>
{/* </div>
</div> */}
      
              <Modal.Footer>
              <div className="form-group mt-3">  
                      <button
                      onClick={this.setModalOpen}
                      className="button-add">Cancel</button>
                    
                   
                  </div>
                  </Modal.Footer>
              
              </Modal.Body>
              </Modal.Dialog>
            </div>
           
    )
  }
}
