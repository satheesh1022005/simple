import {
  useState,
  useRef
} from "react"; 
import "./App.css";
import './node_modules/bootstrap/dist/css/bootstrap.min.css';

function App() { 
  const inputRef = useRef(null); 
  const resultRef = useRef(null); 
  const [result, setResult] = useState(0); 
 
  function plus(e) { 
    e.preventDefault(); 
    setResult((result) => result + Number(inputRef.current.value)); 
  }; 
 
  function minus(e) { 
  	e.preventDefault(); 
    setResult((result) => result - Number(inputRef.current.value)); 
  };
 
  function times(e) { 
    e.preventDefault(); 
    setResult((result) => result * Number(inputRef.current.value)); 
  }; 
 
  function divide(e) { 
    e.preventDefault(); 
    setResult((result) => result / Number(inputRef.current.value)); 
  };
 
  function resetInput(e) { 
    e.preventDefault();
    inputRef.current.value=0;
  }; 
 
  function resetResult(e) { 
    e.preventDefault();
    setResult(0);
    inputRef.current.value=0;
  
  }; 
 
  return ( 
    <body>
    <div className="App"> 
       
        <h1>Simple Calculator using REACT JS</h1> 
     
      <form> 
        <p ref={resultRef} id="result" className="text-white"> 
          {result} 
        </p> 
        <input id="in"
          pattern="[0-9]" 
          ref={inputRef} 
          type="number" 
          placeholder="Type a number" 
        /> 
        <div id="oper">
        <button onClick={plus}>addition</button> 
        <button onClick={minus}>subraction</button>
        <button onClick={times}>multiply</button>
        <button onClick={divide}>divide</button>
        <button onClick={resetInput} className="bg-danger text-white">Resetinput</button>
        <button onClick={resetResult} className="bg-danger text-white">ResetResult</button>
        </div>
      </form> 
    </div> 
    </body>
  ); 
} 
 
export default App; 
