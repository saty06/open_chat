import Home from "./Page/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <div className="overflow-hidden" >
      
     
      <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Home />}>
        <Route path="*" element={<Home/>}/>
        
   
         
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

function ErrorMessage(){
  return(
    <>
    <h2>Erroe kgkgk </h2>
    </>
  )
}

export default App;
