import React, { Component } from 'react';

import './App.css';

import FileUploader from  'react-firebase-file-uploader';
import firebase from 'firebase';
import firebaseConfig from './firebase.js';

firebase.initializeApp(firebaseConfig);
console.log(firebase)





class App extends Component {

  state = {
    image: '',
    imageURL: '',
    progress: 0
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

    firebase.storage().ref('Images').child(filename).getDownloadURL()
      .then(url => this.setState({
        imageURL: url
      }))
      
  }

  render() {
    console.log(this.state.progress)
    return (
      <div className="App">
        <label>Progress</label>
        <p>{this.state.progress}</p>
        <FileUploader 
          accept='image/*'
          name='image'
          storageRef={firebase.storage().ref('Images')}
          onUploadStart={this.handleUploadStart}
          onUploadSuccess={this.handleUploadSuccess}
        />  
      </div>
    );
  }
  
}

export default App;
