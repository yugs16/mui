
import './App.css';
import logo from './logo.svg'

function App(props) {
  return (
    <div className="App">
      <header className="App-header-comp1">
        <img src={logo} alt="Your SVG" className='App-logo ' /><p>  Component comp1 from `{props.projectName? props.projectName: '-'}` project.</p>
      </header>
    </div>
  );
}

export default App;
