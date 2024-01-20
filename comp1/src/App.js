
import './App.css';

function App(props) {
  return (
    <div className="App">
      <header className="App-header">
        <p>Component comp1 from {props.projectName? props.projectName: '-'} project.</p>
      </header>
    </div>
  );
}

export default App;
