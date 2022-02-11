import React, { Component } from 'react';
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import HomePage from "./Components/user/Homepage";
import ViewBook from "./Components/user/ViewBook";
import Userbooks from "./Components/user/Userbooks";
import UserProfile from "./Components/user/UserProfile";
import BookHistory from "./Components/user/BookHistory";
import AddBook from "./Components/admin/AddBook";
import EditBook from "./Components/admin/EditBook";
import BookList from "./Components/admin/BookList";
import Adminpage from "./Components/admin/Adminpage";
import RequestList from "./Components/admin/RequestList";
import EditRequest from "./Components/admin/edit-request";
import Bookrequests from "./Components/admin/Bookrequests";
import Register from "./Components/admin/Register";
import EditBookReq from "./Components/admin/EditBookReq";
import Difference from "./Components/modals/Difference";
import ImpFine from "./Components/admin/ImpFine";
import BookRecords from "./Components/admin/Returnbooks/BookRecords";
import EditBookReturn from "./Components/admin/Returnbooks/EditBookReturn";
import Editform from "./Components/modals/Editform";
import demoform from "./Components/admin/demoform";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import Viewbook from './Components/user/Viewbook';

export default class App extends Component {
  constructor(props) {
    super(props);

}
  render() {
    return (
      <div className='App'>
      <Router>

<Switch>
  <Route exact path="/libmanagement" component={Login} />
  <Route exact path="/libmanagement/Register" component={Register} />
  <div>
    <Navbar />
    <Route path="/libmanagement/homepage" component={HomePage} />
    <Route exact path="/libmanagement/userbook" component={Userbooks} />
    <Route exact path="/libmanagement/addbook" component={AddBook} /> 
    <Route path="/libmanagement/history" component={BookHistory} /> 
    <Route exact path="/libmanagement/editbook/:id" component={EditBook} />
    <Route exact path="/libmanagement/list" component={BookList} />
    <Route path="/libmanagement/records" component={Bookrequests} />
    <Route exact path="/libmanagement/admin" component={Adminpage} />
    <Route path="/libmanagement/userreqs" component={RequestList} />
    <Route path="/libmanagement/edituser/:id" component={EditRequest} />
    <Route path="/libmanagement/editbkre/:id" component={EditBookReq} />
    <Route path="/libmanagement/diff" component={Difference} />
    <Route path="/libmanagement/modal" component={Editform} />
    <Route path="/libmanagement/fine/:id" component={ImpFine} />
    <Route path="/libmanagement/return" component={BookRecords} />
    <Route path="/libmanagement/profile" component={UserProfile} />
    <Route path="/libmanagement/editreturn/:id" component={EditBookReturn} />
    <Route path="/libmanagement/viewbook/:id" component={ViewBook} />
    </div>
    </Switch>
  </Router>
  </div>
    )
  }
}


