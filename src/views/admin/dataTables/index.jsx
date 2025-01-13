/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2023 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import { Box, SimpleGrid } from "@chakra-ui/react";
import DevelopmentTable from "views/admin/dataTables/components/DevelopmentTable";
import CheckTable from "views/admin/dataTables/components/CheckTable";
import ColumnsTable from "views/admin/dataTables/components/ColumnsTable";
import ComplexTable from "views/admin/dataTables/components/ComplexTable";
import {
  columnsDataDevelopment,
  columnsDataCheck,
  columnsDataColumns,
  columnsDataComplex,
} from "views/admin/dataTables/variables/columnsData";
import tableDataDevelopment from "views/admin/dataTables/variables/tableDataDevelopment.json";
import tableDataCheck from "views/admin/dataTables/variables/tableDataCheck.json";
import tableDataColumns from "views/admin/dataTables/variables/tableDataColumns.json";
import tableDataComplex from "views/admin/dataTables/variables/tableDataComplex.json";
import React from "react";

export default function Settings() {
  // Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        mb='20px'
        columns={{ sm: 1, md: 2 }}
        spacing={{ base: "20px", xl: "20px" }}>
        <DevelopmentTable
          columnsData={columnsDataDevelopment}
          tableData={tableDataDevelopment}
        />
        <CheckTable columnsData={columnsDataCheck} tableData={tableDataCheck} />
        <ColumnsTable
          columnsData={columnsDataColumns}
          tableData={tableDataColumns}
        />
        <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        />
      </SimpleGrid>
    </Box>
  );
}

import React, { useState } from 'react';
import {
  Box,

  Button,
  useToast,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
 
  Checkbox,
} from '@chakra-ui/react';
import axios from 'axios';
// import Dashboard from './dashboard';
import Dashboard  from './dashboard'

export default function Settings() {
 
  const [tableType, setTableType] = useState(null);
  const [backendData, setBackendData] = useState([]);
  const [checkData, setCheckData] = useState({});
  const[present, setPresent] = useState([])
  const toast = useToast();

  const fetchAttendance = async (isPresent) => {
    try {
      const response = await axios.post(
        'https://x8ki-letl-twmt.n7.xano.io/api:V6Q6GSfP/getstudentdetail',
        {
          check: isPresent, // Data to be sent
        },
        {
          headers: {
            'Content-Type': 'application/json', // Correct placement of headers
          },
        }
      );
      
      console.log('Attendance response data:', response?.data)
      setBackendData(response?.data);
      if(isPresent===true){
        setPresent((backendData.flat(Infinity)))
      }
  
      console.log( " data will access  from the xeno", response?.data[0]);
    } catch (error) {
      console.error('Error fetching attendance:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch attendance data.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleFetchData = async () => {
    try {
      const response = await axios.get(
        'https://x8ki-letl-twmt.n7.xano.io/api:ufB-AVZm/studentdata',
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.status === 200) {
        console.log('Fetched data from backend:', response?.data);
        setBackendData(response?.data);
        toast({
          title: 'Data Fetched',
          description: 'Successfully fetched data from the backend.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch data from the backend.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleCheckboxChange = (row, isChecked) => {
    setCheckData((prev) => {
      const updatedData = { ...prev };
      if (isChecked) {
        updatedData[row.email] = row;
      } else {
        delete updatedData[row.email];
      }
      return updatedData;
    });
  };
   console.log("  present  data",present)

  return (
    <Box style={{ alignItems: 'center' }}>
      <Box pt="80px">
        <Flex mb="6" style={{ gap: '30px' }} mx="auto" mt="10">
          <Menu>
            <MenuButton
              as={Button}
              colorScheme="teal"
              size="lg"
              px="8"
              borderRadius="md"
              boxShadow="md"
            >
              Options
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => { handleFetchData(); setTableType('check'); }}>Check Table</MenuItem>
              <MenuItem onClick={() => { handleFetchData(); setTableType('normal'); }}>Normal Table</MenuItem>
              <MenuItem onClick={() => {fetchAttendance(true); setTableType('present');} }>Present</MenuItem>
              <MenuItem onClick={() => {fetchAttendance(false); setTableType('absent')}}>Absent</MenuItem>
            </MenuList>
          </Menu>
        </Flex>


        {tableType === 'check' && (
          <TableContainer>
            <Table size="lg" bg="gray.500">
              <Thead bg="gray.200">
              <Tr>
                <Th>Id</Th>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Lab</Th>
                  <Th>Course_Program</Th>
                  <Th>Cohort</Th>
                  <Th>BL_Engineer</Th>
                  <Th>CHECK BOX</Th>
                </Tr>
              </Thead>
              <Tbody>
                {backendData.map((row, index) => (                   
                  <Tr key={index}>
                    <Td>{index===0 ? 1: index+1}</Td>
                    <Td>{row.Name}</Td>
                    <Td>{row.Email_Id}</Td>
                    <Td>{row.Lab}</Td>
                    <Td>{row.Course_Program}</Td>
                    <Td>{row.Cohort}</Td>
                    <Td>{row.BL_Engineer}</Td>
                    <Td>
                      <Checkbox
                        isChecked={!!checkData[row.email]}
                        onChange={(e) =>
                          handleCheckboxChange(row, e.target.checked)
                        }
                      >
                        Check
                      </Checkbox>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}
        {tableType === 'normal' && (
          <TableContainer>
            <Table size="lg" bg="gray.500">
              <Thead bg="gray.200">
                <Tr>
                <Th>Id</Th>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Lab</Th>
                  <Th>Course_Program</Th>
                  <Th>Cohort</Th>
                  <Th>BL_Engineer</Th>
                </Tr>
              </Thead>
              <Tbody>
                {backendData.map((row, index) => (
                  <Tr key={index}>
                    <Td>{index===0 ? 1: index+1}</Td>
                    <Td>{row.Name}</Td>
                    <Td>{row.Email_Id}</Td>
                    <Td>{row.Lab}</Td>
                    <Td>{row.Course_Program}</Td>
                    <Td>{row.Cohort}</Td>
                    <Td>{row.BL_Engineer}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}
    {
      tableType==='absent' &&(
        <TableContainer>
            <Table size="lg" bg="gray.500">
              <Thead bg="gray.200">
                <Tr>
                <Th>Id</Th>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Attendance</Th>
                  <Th>Cohort</Th>
                 
                </Tr>
              </Thead>
              <Tbody>
               
              {backendData.map((row, index) => (
                  <Tr key={index}>
                     <Td>{index===0 ? 1: index+1}</Td>
                    <Td>{row.Name}</Td>
                    <Td>{row.Email_Id}</Td>
                    <Td>A</Td>
                    <Td>{row.Cohort}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
      )
    }
    {
      backendData.length>0 &&  present.length>0 &&  tableType==='present'&& (
        <TableContainer>
        <Table size="lg" bg="gray.500">
          <Thead bg="gray.200">
            <Tr>
              <Th> Id</Th>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Attendance</Th>
              <Th>today</Th>
             
            </Tr>
          </Thead>
          <Tbody>
            {present.map((row, index) => (
              <Tr key={index}>
                 <Td>{index===0 ? 1: index+1}</Td>
                <Td>{row.name}</Td>
                <Td>{row.email}</Td>
                <Td>{row.attendance}</Td>
                <Td>{row.today}</Td>    

              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>


      )
    }

      </Box>
      {  backendData.length<= 0  && <Dashboard />}
    </Box>
  );
}
