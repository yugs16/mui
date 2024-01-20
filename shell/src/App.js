// import logo from "!file-loader!./logo.svg";
import React from 'react';
import {Logo} from './logo'
import './App.css';
import { useEffect, useRef } from 'react';


import { BrowserRouter, Routes, Route } from "react-router-dom";
import mountWrapper from 'comp2Webpack/mountWrapper';

const RemoteComp1 = React.lazy(() => import("comp1/Comp1App"));


// const RemoteComp2 = React.lazy(() => import("comp2/Comp2App"));


function RemoteApp2 (props) {

  const divRef = useRef(null);

  useEffect(()=>{
    import("comp2Webpack/Comp2WebPackApp").then((comp)=>{
      mountWrapper(divRef.current, comp);
    }).catch(e=>{throw e;});

  }, [])

  return (
    <div ref={divRef}></div>
  )
}

function App() {
  return (
    <div className="App">
        {/* <img src={<Logo/>} className="App-logo" alt="logo" /> */}
        {/* <div >{Logo}</div> */}
        <nav class="nav nav-pills nav-fill">
          <a class="nav-link active" aria-current="page" href="/comp">Component React</a>
          <a class="nav-link active" aria-current="page" href="/vue">Component Vue</a>
          
          <a class="nav-link active" aria-current="page" href="/vite">Component Vite</a>
        </nav>
        <div>Remote</div>
        <BrowserRouter>
          <Routes>
            <Route path="/comp/*" element={<RemoteComp1 projectName={'main'}/>} />
            <Route path="/vue/*" element={<RemoteApp2 projectName={'main'}/>} />
            {/* <Route path="/vite" element={<RemoteApp3Vite projectName={'main'}/>} /> */}
            <Route path="*" element={<div>No Page</div>} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
