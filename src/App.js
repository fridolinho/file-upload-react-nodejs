import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [selectedFile, setselectedFile] = useState()
  const onChangeHandler = event =>{

      setselectedFile(event.target.files[0])

  }

  const onClickHandler = async () => {
    const data = new FormData() 
    data.append('file', selectedFile)
    const res = await axios.post("http://localhost:8000/upload", data)
    console.log('resultats', res);
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
