import React, { Component } from 'react';

import './App.css';

import FileUploader from  'react-firebase-file-uploader';
import firebase from 'firebase';
import firebaseConfig from './firebase.js';

firebase.initializeApp(firebaseConfig);
 


const INITIAL_STATE = []


class App extends Component {

 

  constructor(props) {
    super(props);
    this.state = {
      image: '',
      imageURL: '',
      progress: 0,
      listImg: []
    };

    // This binding is necessary to make `this` work in the callback
    this.handleGetImages = this.handleGetImages.bind(this);
 
  }y

  

  componentDidMount() {
    this.handleGetImages()
    /*let ar = 
    console.log(typeof(ar))
    
      
       
        this.setState({
          listImg: this.handleGetImages()
          });
        console.log(this.state.listImg)*/
      
  }




   handleGetImages = () => {
    let storageRef = firebase.storage().ref('Images');
    let ar = []
    
     storageRef.listAll().then(  function(result) {
      result.items.forEach( function(imageRef) {
        // And finally display them
        
         displayImage(imageRef);
       
      });
      }).catch(function(error) {
      // Handle any errors
    });

    function displayImage(imageRef) {
      imageRef.getDownloadURL().then(function(url) {
           ar.push(url)
       console.log(ar)


      }   
      )
      
     


      }

      this.setState({listImg: ar});
     

      setTimeout(function(){
        this.setState({listImg: ar});
   }.bind(this),3000);
      
   console.log(this.state.listImg)

  /*  function displayImage(imageRef) {
      imageRef.getDownloadURL().then(function(url) {
        // TODO: Display the image on the UI
        
       let listImg = this.state.listImg.concat(url);
       console.log(listImg)
        return {
          listImg 
           
        };
        
          
         
        

           
         

  
     
             
       

      }).catch(function(error) {
        // Handle any errors
      });
      console.log(this.state.listImg)
     
} */






/*this.setState({
  listImg: ar
});*/





   
  }






  handleUploadStart = () => {
    this.setState({
      progress: 0
    })
  }

  handleUploadSuccess = filename => {
    this.setState({
      image: filename,
      progress: 100
    })
    //this.handleGetImages()
   

 /*    firebase.storage().ref('Images').child(filename).getDownloadURL()
     .then(url => this.setState(state => {
        let listImg = state.listImg.concat(url);
        return {
          listImg 
           
        };
      })
        
        
        
       
      )*/
  
  }
  

  render() {
     
    return (
      <div className="App">
         
        <label className="upload">
        Choose file to upload
        <FileUploader
          hidden
          accept='image/*'
          name='image'
          storageRef={firebase.storage().ref('Images')}
          onUploadStart={this.handleUploadStart}
          onUploadSuccess={this.handleUploadSuccess}
        
        /> 
        </label>
        <br/>
         
        <ul>
          {this.state.listImg ? this.state.listImg.map(item => (
            <li key={item}><a href={item}><img src={item}/></a></li>
          )) : 'mdaaaa'}
        </ul>
        {/* this.state.image && <img src={this.state.imageURL} />*/ }
      </div>
    );
  }
  
}

export default App;
