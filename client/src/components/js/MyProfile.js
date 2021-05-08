import React from 'react';
import { Container,Row,Col,Form ,Button} from 'react-bootstrap';
import DefaultUserPic from "../../images/male.jpg";
import { getUser } from '../utils/Common';
import { storage } from '../utils/firebase'
import NavigationBarDashboard from "./NavigationBarDashboard"

const axios = require('axios');


class MyProfile extends React.Component {
    constructor(props){
        super(props);
        this.state={
              user_id:"",
              firstname:"",
              lastname:"",
              bio:"",
              profileImgUrl:"",
              gender:"",
              genderM:"false",
              genderF:"false",
              genderN:"false",
              lookingfor:"",
              lookingforM:"false",
              lookingforF:"false",
              lookingforN:"false",
        }
    }

    fetchUserDetails=(user_id)=>{
            axios.get("http://localhost:8000/api/users/"+user_id,{
            headers: {
                "content-type": "application/json"
              }
        }).then(res=>{
            console.log("Fetch results");
            console.log(res);
            this.setState({user_id:res.data.user_id});
            this.setState({firstname:res.data.user.name});
            this.setState({lastname:res.data.user.lastname});
            this.setState({gender:res.data.user.gender});
            this.setState({lookingfor:res.data.user.lookingfor});
            this.setState({profileImgUrl:res.data.user.profileImgUrl});
            this.radioconditions1();
            this.radioconditions2();
            console.log("State:")
            console.log(this.state)
        })
        .catch(err=>console.log(err))
        // this.radioconditions1();
        
    }

    changeProfileImage=(event)=>{
       
        this.setState({uploadedFile:event.target.files[0]});
        console.log(this.state.uploadedFile);
    }

    componentDidMount(){
        var user_id=getUser()._id;
        console.log(user_id);
        this.fetchUserDetails(user_id);
       }

    UpdateProfileHandler=(e)=>{
        e.preventDefault();
        const formData=new FormData(e.target);
        formData.append("user_id",this.state.user_id);
        console.log("Formdata");
        console.log(JSON.stringify(formData));
        axios.put("http://localhost:5000/api/signin"+this.state.user_id,formData,{
            headers: {
                "content-type": "application/json"
              }
        }).then(res=>{
            console.log(res);
          //  this.setState({profileImage:res.data.results.profileImage});
        })
        .catch(err=>console.log(err))
    }

//     handleSubmit = async e => {
//       e.preventDefault();
//   const uploadTask = storage.ref('images/' + email + '/' + fileName).put(file);
//   uploadTask.on(
//   "state_changed",
//   snapshot => { },
//   error => {
//     console.log(error);
//   },
//   () => {
//     storage
//       .ref("images")
//       .child(email)
//       .child(fileName)
//       .getDownloadURL()
//       .then(url => {
//         console.log(url);
//         setImageUrl(url);
//         UpdateProfileHandler({
//           name,
//           lastname,
//           email,
//           password,
//           gender,
//           lookingfor,
//           birthday,
//           "profileImgUrl": url
//         }, props);
//       });
//   }
// );
// }

    handleInputChange = (e) => {
      console.log("Input changed")
    }

    handleLookingFor = (event) => {
      console.log("Looking for changed")
    }

    radioconditions1(){
      if(this.state.gender=="male"){
        this.setState({genderM:"true"});
      }
      else if(this.state.gender=="female"){
        this.setState({genderF:"true"});
      }
      else if(this.state.gender=="notsure"){
        this.setState({genderN:"true"});
      }
    }
    radioconditions2(){
      if(this.state.lookingfor=='male'){
        this.state.lookingforM='true'
      }
      else if(this.state.lookingfor=='female'){
        this.state.lookingforF='true'
      }
      else if(this.state.lookingfor=="notsure"){
        this.state.lookingforN='true'
      }

    }

render(){
    const imagestyle = {
        width: "100%", height: "100%"
    }
    return (
        <div>
          <NavigationBarDashboard />
        <Row>
       <Col>
       <img src={this.state.profileImgUrl} style={imagestyle} alt="profile pic" />
       </Col>
        <Col>
            <h1>User Profile</h1>


            <Form onSubmit={this.UpdateProfileHandler} className="form">     
  <Form.Group controlId="formCategory1">
    <Form.Label>First Name</Form.Label>
    <Form.Control type="text" name='firstname' value={this.state.firstname}  onChange={this.handleInputChange} />
    <Form.Label>Last Name</Form.Label>
    <Form.Control type="text" name='lastname' value={this.state.lastname} onChange={this.handleInputChange} />
  </Form.Group>
  <Form.Group controlId="formCategory2">
  <h6>Bio</h6>
    <Form.Control type="textarea" name='bio' defaultValue={this.state.bio} onChange={this.handleInputChange} />
  </Form.Group>

  <Form.Group controlId="formCategory3">
      <h5>Gender</h5>
        <label>
          Male
          <input
            id="gender1"
            name="gender"
            type="radio"
            value="male"
            checked={this.state.genderM}
            onChange={this.handleInputChange} 
            />
        </label>
        <label>
          Female
          <input
            id="gender2"
            name="gender"
            type="radio"
            value="female"
            checked={this.state.genderF}
            onChange={this.handleInputChange} 
            />
        </label>
        <label>
          Other
          <input
            id="gender3"
            name="gender"
            type="radio"
            value="notsure"
            checked={this.state.genderN}
            onChange={this.handleInputChange} 
            />
        </label>
  </Form.Group>

  <Form.Group controlId="formCategory4">
      <h5> Looking For</h5>
        <label>
          Male
          <input
            name="lookingfor"
            type="radio"
            value="male"
            checked={this.state.lookingforM}
            onChange={this.handleInputChange}
            />
        </label>
        <label>
          Female
          <input
            name="lookingfor"
            type="radio"
            value="female"
            checked={this.state.lookingforF}
            onChange={this.handleInputChange} 
            />
        </label>
        <label>
          Both
          <input
            name="lookingfor"
            type="radio"
            value="notsure"
            checked={this.state.lookingforN}
            onChange={this.handleInputChange} 
            />
        </label>
  </Form.Group>

  <Form.Group controlId="formCategory4">
    <Form.Label>Profile Image</Form.Label>
    <Form.Control type="file" name="profileImage" onChange={this.changeProfileImage}/>
    </Form.Group>
  <Button type='submit'>Update Profile</Button>
  </Form>
   </Col>

       </Row>
        </div>
    )
}
}

 export default MyProfile;