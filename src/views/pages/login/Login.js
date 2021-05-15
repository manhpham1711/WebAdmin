import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
    CButton,
    CCard,
    CCardBody,
    CCardGroup,
    CCol,
    CContainer,
    CForm,
    CInput,
    CInputGroup,
    CInputGroupPrepend,
    CInputGroupText,
    CRow
  } from '@coreui/react'
  import CIcon from '@coreui/icons-react'
  

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
        email: 'email',
        password: 'password'
    };

    this.changeValuePassword = this.changeValuePassword.bind(this);
    this.changeValueEmail = this.changeValueEmail.bind(this);
    this.checkUser = this.checkUser.bind(this);
    this.login = this.login.bind(this);
  }

changeValueEmail(event) {
    this.setState({
        email: event.target.value
    })
}

changeValuePassword(event) {
    this.setState({
        password: event.target.value
    })
}

checkUser() {
    var id = localStorage.getItem("role_id");
    if (id !== null) {
      this.props.history.push('/dashboad');
    } else {
      this.props.history.push('/');
    }
  }

login(event){
    event.preventDefault();

    let email = event.target['email'].value;
    let password = event.target['password'].value;

    let Account = {
      email: email,
      password: password
    }
    let AccountInJson = JSON.stringify(Account);
    console.log(AccountInJson);

    fetch("https://eat2gether-api.herokuapp.com/api/sign-in", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: AccountInJson
    })
      .then((response) => {
        console.log(response.status);
        if (response.status === 200) {
          return response.json();
        } else {
          response = null;
          return response;
        }
      }).then((response) => {
        if (response !== null) {
          console.log(response);
          localStorage.removeItem("role_id");
          localStorage.setItem("role_id", response);
          alert("welcome back to Facebook (*:*) ");
          this.props.history.push('/dashboard');
        } else {
          localStorage.removeItem("role_id");
          alert('email or password incorect');
          this.props.history.push('/');
        }
      });
    // console.log('username: ' + this.state.username);
    // console.log('username: ' + this.state.password);
}


  render() {
    return (
            <div>
              <CContainer>
                <CRow className="justify-content-center">
                  <CCol md="8">
                    <CCardGroup>
                      <CCard className="p-4">
                        <CCardBody>
                          <CForm onSubmit={this.login}>
                            <p className="text-muted">Sign In to your account</p>
                            <CInputGroup className="mb-3">
                              <CInputGroupPrepend>
                                <CInputGroupText>
                                  <CIcon name="cil-user" />
                                </CInputGroupText>
                              </CInputGroupPrepend>
                              <CInput type="text" name= "email" onChange={this.changeValueEmail} placeholder="Email" autoComplete="email" />
                            </CInputGroup>
                            <CInputGroup className="mb-4">
                              <CInputGroupPrepend>
                                <CInputGroupText>
                                  <CIcon name="cil-lock-locked" />
                                </CInputGroupText>
                              </CInputGroupPrepend>
                              <CInput type="password" name="password" onChange={this.changeValuePassword} placeholder="Password" autoComplete="current-password" />
                            </CInputGroup>
                            <CRow>
                              <CCol xs="6">
                                <CButton color="primary" className="px-4" type="submit" >Login</CButton>
                              </CCol>
                              <CCol xs="6" className="text-right">
                                <CButton  className="px-0">Forgot password?</CButton>
                              </CCol>
                            </CRow>
                          </CForm>
                        </CCardBody>
                      </CCard>
                    </CCardGroup>
                  </CCol>
                </CRow>
              </CContainer>
            </div>
          )
  }
}

export default withRouter(Login);