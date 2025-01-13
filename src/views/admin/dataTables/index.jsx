
import React, { useState } from 'react';
import axios from 'axios';
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
// import Dashboard from './dashboard';

export default function Settings() {
  const [tableType, setTableType] = useState(null);
  const [backendData, setBackendData] = useState([]);
  const [checkData, setCheckData] = useState({});
  const [present, setPresent] = useState([]);
  const toast = useToast();

  const fetchAttendance = async (isPresent) => {
    try {
      const response = await axios.post(
        'https://x8ki-letl-twmt.n7.xano.io/api:V6Q6GSfP/getstudentdetail',
        { check: isPresent },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      console.log('Attendance response data:', response?.data);
      setBackendData(response?.data || []);
      if (isPresent) {
        setPresent(response?.data || []);
      }
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
          headers: { 'Content-Type': 'application/json' },
        }
      );
      if (response.status === 200) {
        console.log('Fetched data from backend:', response?.data);
        setBackendData(response?.data || []);
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
        updatedData[row.Email_Id] = row;
      } else {
        delete updatedData[row.Email_Id];
      }
      return updatedData;
    });
  };

  return (
    <Box align="center" pt="80px">
      <Flex mb="6" gap="30px" mx="auto" mt="10">
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
            <MenuItem onClick={() => { handleFetchData(); setTableType('check'); }}>
              Check Table
            </MenuItem>
            <MenuItem onClick={() => { handleFetchData(); setTableType('normal'); }}>
              Normal Table
            </MenuItem>
            <MenuItem onClick={() => { fetchAttendance(true); setTableType('present'); }}>
              Present
            </MenuItem>
            <MenuItem onClick={() => { fetchAttendance(false); setTableType('absent'); }}>
              Absent
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>

      {/* Tables based on tableType */}
      {tableType === 'check' && (
        <TableContainer>
          <Table size="lg" bg="gray.500">
            <Thead bg="gray.200">
              <Tr>
                <Th>ID</Th>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Lab</Th>
                <Th>Course Program</Th>
                <Th>Cohort</Th>
                <Th>BL Engineer</Th>
                <Th>Check</Th>
              </Tr>
            </Thead>
            <Tbody>
              {backendData.map((row, index) => (
                <Tr key={index}>
                  <Td>{index + 1}</Td>
                  <Td>{row.Name}</Td>
                  <Td>{row.Email_Id}</Td>
                  <Td>{row.Lab}</Td>
                  <Td>{row.Course_Program}</Td>
                  <Td>{row.Cohort}</Td>
                  <Td>{row.BL_Engineer}</Td>
                  <Td>
                    <Checkbox
                      isChecked={!!checkData[row.Email_Id]}
                      onChange={(e) => handleCheckboxChange(row, e.target.checked)}
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
                <Th>ID</Th>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Lab</Th>
                <Th>Course Program</Th>
                <Th>Cohort</Th>
                <Th>BL Engineer</Th>
              </Tr>
            </Thead>
            <Tbody>
              {backendData.map((row, index) => (
                <Tr key={index}>
                  <Td>{index + 1}</Td>
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

      {tableType === 'present' && present.length > 0 && (
        <TableContainer>
          <Table size="lg" bg="gray.500">
            <Thead bg="gray.200">
              <Tr>
                <Th>ID</Th>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Attendance</Th>
                <Th>Today</Th>
              </Tr>
            </Thead>
            <Tbody>
              {present.map((row, index) => (
                <Tr key={index}>
                  <Td>{index + 1}</Td>
                  <Td>{row.name}</Td>
                  <Td>{row.email}</Td>
                  <Td>{row.attendance}</Td>
                  <Td>{row.today}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}

      {tableType === 'absent' && (
        <TableContainer>
          <Table size="lg" bg="gray.500">
            <Thead bg="gray.200">
              <Tr>
                <Th>ID</Th>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Attendance</Th>
                <Th>Cohort</Th>
              </Tr>
            </Thead>
            <Tbody>
              {backendData.map((row, index) => (
                <Tr key={index}>
                  <Td>{index + 1}</Td>
                  <Td>{row.Name}</Td>
                  <Td>{row.Email_Id}</Td>
                  <Td>A</Td>
                  <Td>{row.Cohort}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}

      {/* {backendData.length <= 0 && <Dashboard />} */}
    </Box>
  );
}
