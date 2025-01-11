import React, { useState } from "react";
import {
  Icon,
  Flex,
  Text,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
  useColorModeValue,
  useToast,
  Box,
  Input,
  HStack,
} from "@chakra-ui/react";
import { MdOutlineMoreHoriz } from "react-icons/md";

export default function Banner(props) {
  const toast = useToast();
  const { ...rest } = props;
const[fileData, setFileData] = useState()
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type === "text/csv") {
        const reader = new FileReader();
  
        // Event listener to process the file once it's read
        reader.onload = (e) => {
          const fileContent = e.target.result; // File content as a string
          console.log("CSV File Content:", fileContent);
  
          // Example: Parse CSV data (basic splitting by lines and commas)
          const rows = fileContent.split("\n").map((row) => row.split(","));
          setFileData(rows)
          console.log("Parsed CSV Data:", rows);
  
          // Add your CSV processing logic here
        };
  
        reader.onerror = (e) => {
          console.error("Error reading file:", e.target.error);
          toast({
            title: "Error",
            description: "An error occurred while reading the file.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        };
  
        // Read the file as text
        reader.readAsText(file);
  
        toast({
          title: "File Uploaded",
          description: `${file.name} uploaded successfully!`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Invalid File",
          description: "Please upload a valid CSV file.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };
  

  const openFilePicker = () => {
    document.getElementById("file-upload").click();
  };

  const {
    isOpen: isOpen1,
    onOpen: onOpen1,
    onClose: onClose1,
  } = useDisclosure();

  const textColor = useColorModeValue("secondaryGray.500", "white");
  const iconColor = useColorModeValue("brand.500", "white");
  const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const bgHover = useColorModeValue(
    { bg: "secondaryGray.400" },
    { bg: "whiteAlpha.50" }
  );
  const bgFocus = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.100" }
  );

  return (
    <Menu isOpen={isOpen1} onClose={onClose1}>
      <Box>
        <HStack wrap="wrap" gap="6">
          <MenuButton
            align="center"
            justifyContent="center"
            bg={bgButton}
            _hover={bgHover}
            _focus={bgFocus}
            _active={bgFocus}
            w="37px"
            h="37px"
            lineHeight="100%"
            onClick={onOpen1}
            borderRadius="10px"
            {...rest}
          >
            <Icon as={MdOutlineMoreHoriz} color={iconColor} w="24px" h="24px" />
          </MenuButton>
        </HStack>

        <MenuList>
          <MenuItem onClick={openFilePicker}>Upload CSV</MenuItem>
        </MenuList>

        <Input
          id="file-upload"
          type="file"
          accept=".csv"
          display="none"
          onChange={handleFileUpload}
        />
      </Box>
    </Menu>
  );
}
