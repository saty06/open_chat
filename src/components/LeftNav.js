import React, { useContext, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { LuPanelLeftClose } from "react-icons/lu";
import { FiUser, FiMessageSquare } from "react-icons/fi";
import { SlOptions } from "react-icons/sl";
import { ContextApp } from "../utils/Context";
import userProfile from './image/R1.svg'
import {
  Card, CardHeader, CardBody,  Heading, Box, Stack, Text, StackDivider
  , Button, CloseButton, Image
} from '@chakra-ui/react'
import google from './image/google.jpg'
import linkedin from './image/linkedin.jpg'

import githum from './image/github.jpg'

function LeftNav() {
  const { setShowSlide, showSlide, handleQuery } = useContext(ContextApp);
  const [showCard, setShowCard] = useState(true)
  const [showlogin, setShowLogin] = useState(true)
  const imageData = [google, linkedin, githum]
  const imageName = ["Google", "LinkedIn", "GitHub"]
  const showCardFun = () => {
    setShowCard(true)
    console.log(showCard)
  }
  
  return (
    // top section
    <div
      className={
        !showSlide
          ? "h-screen bg-gray-900 w-[300px] border-r border-gray-500 hidden lg:flex items-center justify-between p-2 text-white flex-col translate-x-0"
          : "hidden"
      }
    >
      <div className="flex items-start justify-between w-full">
        <span
          className="border border-gray-600  rounded w-[80%] py-2 text-xs flex gap-1 items-center justify-center cursor-pointer"
          onClick={() => window.location.reload()}
        >
          <AiOutlinePlus fontSize={18} />
          New Chat
        </span>
        <span
          className="border border-gray-600  rounded px-3 py-[9px] flex items-center justify-center cursor-pointer"
          title="Close sidebar"
          onClick={() => setShowSlide(!showSlide)}
        >
          <LuPanelLeftClose />
        </span>
      </div>
      {/* middle section  */}
      <div className="h-[80%] w-full p-2 flex items-start justify-start flex-col overflow-hidden overflow-y-auto text-sm scroll my-2">
        {/* msg  */}
        <span
          className="rounded w-full py-3 px-2 text-xs my-2 flex gap-1 items-center justify-between cursor-pointer hover:bg-gray-800 transition-all duration-300 overflow-hidden truncate whitespace-nowrap"
          value={"What is Programming?"}
          onClick={handleQuery}
        >
          <span className="flex gap-2 items-center justify-center text-base">
            <FiMessageSquare />
            <span className="text-sm">What is Programming?</span>
          </span>
        </span>
        <span
          className="rounded w-full py-3 px-2 text-xs my-2 flex gap-2 items-center justify-between cursor-pointer hover:bg-gray-800 transition-all duration-300 overflow-hidden truncate whitespace-nowrap "
          value={"How to use an API?"}
          onClick={handleQuery}
        >
          <span className="flex gap-2 items-center justify-center text-base">
            <FiMessageSquare />
            <span className="text-sm">How to use an API?</span>
          </span>
        </span>
      </div>
      {/* bottom section  */}
      <div className="w-full border-t border-gray-600 flex flex-col gap-2 items-center justify-center p-2"  >
        <span className="rounded w-full py-2 px-2 text-xs flex gap-1 items-center justify-between cursor-pointer hover:bg-gray-800 transition-all duration-300" >

          <span className="flex gap-1 items-center justify-center text-sm"  >
            {
              !showCard && (
                <div >
                  <Card >
                    <CloseButton style={{ paddingLeft: "220px" }} onClick={() => showCardFun()} />
                    <CardHeader>
                      <Heading size='md' style={{ display: "flex" }}>Client Report</Heading>

                    </CardHeader>

                    <CardBody style={{ maxHeight: 200, overflow: "auto" }} className="scroll">
                      <Stack divider={<StackDivider />} spacing='4'>
                        <Box>
                          <Heading size='xs' textTransform='uppercase'>
                            Summary
                          </Heading>
                          <Text pt='2' fontSize='sm'>
                            View a summary of all your clients over the last month.
                          </Text>
                        </Box>
                        <Box>
                          <Heading size='xs' textTransform='uppercase'>
                            Overview
                          </Heading>
                          <Text pt='2' fontSize='sm'>
                            Check out the overview of your clients.
                          </Text>
                        </Box>
                        <Box>
                          <Heading size='xs' textTransform='uppercase'>
                            Analysis
                          </Heading>
                          <Text pt='2' fontSize='sm'>
                            See a detailed analysis of all your business clients.
                          </Text>
                          <Text pt='2' fontSize='sm'>
                            See a detailed analysis of all your business clients.
                          </Text>
                          <Text pt='2' fontSize='sm'>
                            See a detailed analysis of all your business clients.
                          </Text>
                          <Text pt='2' fontSize='sm'>
                            See a detailed analysis of all your business clients.
                          </Text>
                        </Box>
                      </Stack>
                    </CardBody>
                  </Card>
                  <FiUser />
                  Upgrade to Plus
                </div>
              )
            }




            {
              showCard && (
                <div>
                  <FiUser />
                  Upgrade to Plus

                </div>
              )
            }

          </span>



          {
            showCard && (

              <span className="rounded-md bg-yellow-200 px-1.5 py-0.5 text-xs font-medium uppercase text-gray-800" style={{marginTop:"12px"}} >
                <Stack direction='row' spacing={4}>
                  <Button colorScheme='teal' variant='solid' onClick={() => setShowCard(!showCard)}     >
                    NEW
                  </Button>

                </Stack>


              </span>

            )
          }




        </span>
        <span className="rounded w-full py-2 px-2 text-xs flex gap-1 items-center justify-between cursor-pointer hover:bg-gray-800 transition-all duration-300">

          <span className="flex gap-2 items-center justify-center text-sm font-bold">
            {
              !showlogin && (
                <div>
                  <Card >
                    <CloseButton style={{ paddingLeft: "220px" }} onClick={() => setShowLogin(true)} />
                    <CardBody style={{ maxHeight: 200, overflow: "auto" }} className="scroll">
                      <Stack spacing='4'>
                        <Box>
                          {/* <Heading size='xs' textTransform='uppercase'>
                            Summary
                          </Heading> */}

                          {
                            imageData.map((value, index) => {
                              return (
                                <>
                                  <Box key={index} style={{ marginTop: "10px", display: "flex", height:"50px"}}>
                                    <Image
                                      borderRadius="40px"
                                      boxSize="50px"
                                      src={value}
                                      alt={`Image ${index + 1}`} // Alt text should be descriptive
                                    />
                                    <Text style={{ marginLeft: "50px", marginTop:"10px",  fontSize:"20px"}} 
                                    onClick={()=> console.log("data  value ",index )}
                                    >{imageName[index]} </Text> {/* You can adjust or remove this */}
                                  </Box>
                                </>
                              )
                            })
                          }


                        </Box>
                      </Stack>
                    </CardBody>
                  </Card>





                </div>
              )
            }

            {/* USER */}

            {showlogin ? (
              <div style={{ display: "flex" }} >
                <img
                  src={`${userProfile}`}
                  alt="user"
                  className="w-8 h-8 object-cover rounded-sm"
                />
                <Button colorScheme='teal' onClick={() => setShowLogin(false)} style={{ paddingLeft: "20px" }} >Sign up</Button>
              </div>
            ) : (
              ""
            )}
          </span>


          <span className="rounded-md  px-1.5 py-0.5 text-xs font-medium uppercase text-gray-500">
            <SlOptions />
          </span>
        </span>
      </div>
    </div>
  );
}

export default LeftNav;
