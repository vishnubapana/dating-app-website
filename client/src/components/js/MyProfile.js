import React from 'react';
import { Container,Row,Col,Form ,Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import DefaultUserPic from "../../images/male.jpg";
const axios = require('axios');

class MyProfile extends React.Component {
    constructor(props){
        super(props);
        this.state={
            user_id:"608b7ef5959d6e02e442c1af",
            username:this.props.username,
            bio:this.props.bio,
            profileImage:this.props.profileImage,
            uploadedFile:null,
            oppgender:this.props.oppgender,
            gender:this.props.gender
        }
    }

    fetchUserDetails=(user_id)=>{
        //console.log(user_id);
        // axios.get("http://localhost:3000/videos/"+_id,{
            axios.get("http://localhost:5000/videos/608b7ef5959d6e02e442c1af",{
            headers: {
                "content-type": "application/json"
              }
        }).then(res=>{
            console.log(res);
            this.setState({username:res.data.username});
            this.setState({bio:res.data.Bio});
            // this.setState({profileImage:res.data.results[0].profileImage})
        })
        .catch(err=>console.log(err))
    }

    changeProfileImage=(event)=>{
       
        this.setState({uploadedFile:event.target.files[0]});
        console.log(this.state.uploadedFile);
    }

    componentDidMount(){
        this.fetchUserDetails(this.state.user_id);
       }

    UpdateProfileHandler=(e)=>{
        e.preventDefault();
        //create object of form data
        const formData=new FormData(e.target);
        // formData.append("profileImage",this.state.uploadedFile);
        formData.append("user_id",this.state.user_id);
        // formData.append("username",this.state.username);
        // formData.append("bio",this.state.bio);
        console.log("Formdata");
        console.log(JSON.stringify(formData));
        //update-profile
        axios.put("http://localhost:5000/videos/"+this.state.user_id,formData,{
            headers: {
                "content-type": "application/json"
              }
        }).then(res=>{
            console.log(res);
           this.setState({profileImage:res.data.results.profileImage});
        })
        .catch(err=>console.log(err))
    }

    handleInputChange = (e) => {
      // let nam = e.target.name;
      // let val = e.target.value;
      // this.setState({[nam]: val});
      console.log("Input changed")
    }


render(){
    const imagestyle = {
        width: "100%", height: "100%"
    }
    if(this.state.profileImage){
        var imagestr=this.state.profileImage;
        console.log(imagestr);
        imagestr = imagestr.replace("public/", "");
        console.log("Imagestr"+imagestr);
        var profilePic="http://localhost:5000/"+imagestr;
    }else{
         profilePic=DefaultUserPic;
    }

    return (
        <Container>
        <Row>
       <Col>
       <img src={profilePic} style={imagestyle} alt="profile pic" />
       </Col>
        <Col>
            <h1>User Profile</h1>


            <Form onSubmit={this.UpdateProfileHandler} className="form">     
    <p>{this.state.msg}</p>
  <Form.Group controlId="formCategory1">
    <Form.Label>Name</Form.Label>
    <Form.Control type="text" name='username' defaultValue={this.state.username} onChange={this.handleInputChange} />
  
  </Form.Group>
  <Form.Group controlId="formCategory2">
  <h6>Bio</h6>
    {/* <Form.Label>Bio</Form.Label> */}
    {/* <Form.Control as="textarea" rows={3} defaultValue={this.state.email} /> */}
    <Form.Control type="textarea" name='bio' defaultValue={this.state.bio} onChange={this.handleInputChange} />
  </Form.Group>

  <Form.Group controlId="formCategory3">
      {/* <Form.Check 
        type={type}
        id={`default-${type}`}
        label={`default ${type}`}
      /> */}

      <h5>Gender</h5>
        <label>
          Male
          <input
            name="genderM"
            type="checkbox"
            value="Male"
            checked={this.state.gender}
            // onChange={this.handleInputChange} 
            />
        </label>
        <label>
          Female
          <input
            name="genderF"
            type="checkbox"
            value="Female"
            checked={this.state.gender}
            // onChange={this.handleInputChange} 
            />
        </label>
        <label>
          Other
          <input
            name="genderO"
            type="checkbox"
            value="Other"
            checked={this.state.gender}
            // onChange={this.handleInputChange} 
            />
        </label>
  </Form.Group>

  <Form.Group controlId="formCategory4">
      {/* <Form.Check 
        type={type}
        id={`default-${type}`}
        label={`default ${type}`}
      /> */}

      <h5> Preferred Opposite Gender</h5>
        <label>
          Male
          <input
            name="oppgenderM"
            type="checkbox"
            value="Male"
            checked={this.state.oppgender}
            // onChange={this.handleInputChange} 
            />
        </label>
        <label>
          Female
          <input
            name="oppgenderF"
            type="checkbox"
            value="Female"
            checked={this.state.oppgender}
            // onChange={this.handleInputChange} 
            />
        </label>
        <label>
          Other
          <input
            name="oppgenderO"
            type="checkbox"
            value="Other"
            checked={this.state.oppgender}
            // onChange={this.handleInputChange} 
            />
        </label>
  </Form.Group>

  <Form.Group controlId="formCategory4">
    <Form.Label>Profile Image</Form.Label>
    <Form.Control type="file" name="profileImage" onChange={this.changeProfileImage}/>
    </Form.Group>
  {/* <Button variant="primary" onClick={this.UpdateProfileHandler}>Update Profile</Button> */}
  <Button type='submit'>Update Profile</Button>
  </Form>
   </Col>

       </Row>
        </Container>
    )
}
}

// const mapStatetoProps=(state)=>{
//     return{
//         user_id:state.user.userDetails.userid,
//         username:state.user.userDetails.username,
//        email:state.user.email,
//        profileImage: state.user.profileImage,
//        msg:state.user.msg
//     }
//    }
   
   

//    export default connect(mapStatetoProps)(MyProfile);
 export default MyProfile;