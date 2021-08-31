import { Button, Form , FormGroup , Label , Input } from 'reactstrap';
import React, { Component } from 'react';
import Axios from 'axios';
import {Link} from "react-router-dom";


export default class SignUp extends Component {
    userData;
    constructor(props){
        super(props);
        this.state = {
            signupData :{
                name: "",
                email: "",
                phone :"",
                password: "",
                isLoading: ""
            },
            msg: ""
        }
    }
    onChangehandler = (e, key)=> {
        const {signupData}= this.state;
        signupData[e.target.name] = e.target.value;
        this.setState({signupData})
    };
    onSubmitHandler =  (e) => {
        e.preventDefault();
        this.setState({isLoading:true});
        Axios.post("http://localhost:8000/api/user-signup", this.state.signupData)
        .then((response)=>{
            this.setState({isLoading: false});
            if(response.data.status === 200) {
                this.setState({
                    msg: response.data.message,
                    signupData: {
                        name: "",
                        email: "",
                        phone : "",
                        password: ""
                    }
                });
                setTimeout(()=> {
                    this.setState({msg: ""});
                },2000)
            }
            if(response.data.status === "failed"){
                this.setState({msg: response.data.message});
                setTimeout(()=>{
                    this.setState({msg: ""});
                },2000);
            }
        })
    }

    render(){
        const isLoading = this.state.isLoading;
        return (
            <div>
                <Form className="containers shadow viewSignup">
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input type="name" name="name" onChange={this.onChangehandler} placeholder="Enter name" value={this.state.signupData.name}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Email id</Label>
                        <Input type="email" name="email" onChange={this.onChangehandler} placeholder="Enter email" value={this.state.signupData.email}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="phone">Phone Number</Label>
                        <Input type="phone" name="phone" onChange={this.onChangehandler}
                        placeholder="Enter phone number" value={this.state.signupData.phone}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password" >Password</Label>
                        <Input type="password" name="password" onChange={this.onChangehandler}
                        placeholder="Enter password " value={this.state.signupData.password}></Input>
                    </FormGroup>
                    <p className="text-white">{this.state.msg}</p>
                    <Button
                    className="text-center mb-4" color="success"
                    onClick={this.onSubmitHandler}>Sign Up
                        {isLoading ? (
                            <span className="spinner-border spinner-border-sm ml-5" role="status" aria-hidden="true"></span>
                        ): (
                           <span></span>
                        )}
                    </Button>
                    <Link  to="/sign-in" className="text-white ml-5">I am already member</Link>
                </Form>
            </div>
        )
    }
}
