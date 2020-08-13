import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [selectedFile, setselectedFile] = useState()
  const onChangeHandler = event =>{

      setselectedFile(event.target.files[0])

  }

  const onClickHandler = () => {
    const data = new FormData() 
    data.append('file', selectedFile)
    axios.post("http://localhost:8000/upload", data, { 
      // receive two    parameter endpoint url ,form data
    })
  .then(res => { // then print response status
      console.log(res.statusText)
  })
  }

  return (
    <div className="App">
      <header className="App-header">
      <input type="file" name="file" onChange={onChangeHandler}/>
      <button type="button" className="btn btn-success btn-block" onClick={onClickHandler}>Upload</button> 
      </header>
    </div>
  );
}

export default App;
