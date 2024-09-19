import React,{useState} from 'react';
import Brightness5RoundedIcon from '@mui/icons-material/Brightness5Rounded';
import Brightness7RoundedIcon from '@mui/icons-material/Brightness7Rounded';
import { PhoneIcon,  ArrowBackIcon} from '@chakra-ui/icon'
import { Button } from '@chakra-ui/react'



function ThemeToggleButton() {
const[color, setColor] = useState(false)
  const click = ()=>{
    setColor(true)
    console.log("data is scnkc")
  }
  
    return (
   <>
   <Button onClick={()=>click()}  >  {color===true ? (PhoneIcon):(ArrowBackIcon)}   </Button>
   
   </>
    );
  }
  
  export default ThemeToggleButton;
  