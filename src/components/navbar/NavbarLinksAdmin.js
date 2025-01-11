// Chakra Imports
import {
  Avatar,
  Button,
  Flex,
  Icon,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  useColorMode,
  useToast,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Stack,
} from '@chakra-ui/react';

import axios from 'axios';

// Custom Components
import { ItemContent } from 'components/menu/ItemContent';
import { SearchBar } from 'components/navbar/searchBar/SearchBar';
import { SidebarResponsive } from 'components/sidebar/Sidebar';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

// Assets
import navImage from 'assets/img/layout/Navbar.png';
import { MdNotificationsNone, MdInfoOutline } from 'react-icons/md';
import { IoMdMoon, IoMdSunny } from 'react-icons/io';
import { FaEthereum } from 'react-icons/fa';
import routes from 'routes';

import { useGoogleLogin } from '@react-oauth/google';

export default function HeaderLinks(props) {
  const { secondary } = props;
  const { colorMode, toggleColorMode } = useColorMode();
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState();
  const [notification, setNotification] = useState();
  const toast = useToast();

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => setUser(tokenResponse),
    onError: (error) => console.error('Login Failed:', error),
  });
  const fetchGoogleUserInfo = async (accessToken) => {
    try {
      const userInfo = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/json',
          },
        },
      );
      return userInfo.data;
    } catch (error) {
      console.error('Error fetching Google user info:', error);

      throw error;
    }
  };
  const handleSubmitcheck = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.post(
        'http://localhost:3000/api/v1/users/calculate-profit-loss',
        {}, // Empty body, as you're not sending data
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      setNotification(response?.data?.result);
      console.log('Response data: ', response?.data?.result);

      // Check the response for success or failure
      if (response.status === 200) {
        console.log('Backend data: ', response);
        toast({
          title: 'Fetched notification data',
          description:
            'The table data and selections have been sent to the backend successfully.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Submission Failed to notification data',
          description: 'There was an issue with submitting the data.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An error occurred while sending the data to the backend.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      console.error('Error submitting data:', error);
    }
  };

  const addUserToBackend = async (userData) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/v1/users',
        userData,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
      toast({
        title: 'Login successfull',
        description: 'User data has been successfully saved.',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      // Extract the token
      const token = response?.data?.token;

      // Store the token in localStorage
      localStorage.setItem('authToken', token);

      // Optionally, you can verify if the token was stored correctly

      return response.data;
    } catch (error) {
      console.error('Error adding user to backend:', error);
      toast({
        title: 'Backend Error',
        description: 'Failed to save user data to the backend.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      throw error;
    }
  };

  useEffect(() => {
    if (user) {
      (async () => {
        try {
          const profileData = await fetchGoogleUserInfo(user.access_token);
          setProfile(profileData);

          const newUser = {
            firstName: profileData.given_name,
            lastName: profileData.family_name,
            email: profileData.email,
            google_picture: profileData.picture,
            google_id: profileData.id,
          };

          const response = await addUserToBackend(newUser);
          console.log('User added to backend:', response);
        } catch (error) {
          console.error('Error in Google Login flow:', error);
        }
      })();
    }
  }, [user]);

  // Chakra Color Mode
  const navbarIcon = useColorModeValue('gray.400', 'white');
  let menuBg = useColorModeValue('white', 'navy.800');
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorBrand = useColorModeValue('brand.700', 'brand.400');
  const ethColor = useColorModeValue('gray.700', 'white');
  const borderColor = useColorModeValue('#E6ECFA', 'rgba(135, 140, 189, 0.3)');
  const ethBg = useColorModeValue('secondaryGray.300', 'navy.900');
  const ethBox = useColorModeValue('white', 'navy.800');
  const shadow = useColorModeValue(
    '14px 17px 40px 4px rgba(112, 144, 176, 0.18)',
    '14px 17px 40px 4px rgba(112, 144, 176, 0.06)',
  );
  const borderButton = useColorModeValue('secondaryGray.500', 'whiteAlpha.200');
  return (
    <Flex
      w={{ sm: '100%', md: 'auto' }}
      alignItems="center"
      flexDirection="row"
      bg={menuBg}
      flexWrap={secondary ? { base: 'wrap', md: 'nowrap' } : 'unset'}
      p="10px"
      borderRadius="30px"
      boxShadow={shadow}
    >
      <SearchBar
        mb={() => {
          if (secondary) {
            return { base: '10px', md: 'unset' };
          }
          return 'unset';
        }}
        me="10px"
        borderRadius="30px"
      />
      <Flex
        bg={ethBg}
        display={secondary ? 'flex' : 'none'}
        borderRadius="30px"
        ms="auto"
        p="6px"
        align="center"
        me="6px"
      >
        <Flex
          align="center"
          justify="center"
          bg={ethBox}
          h="29px"
          w="29px"
          borderRadius="30px"
          me="7px"
        >
          <Icon color={ethColor} w="9px" h="14px" as={FaEthereum} />
        </Flex>
        <Text
          w="max-content"
          color={ethColor}
          fontSize="sm"
          fontWeight="700"
          me="6px"
        >
          1,924
          <Text as="span" display={{ base: 'none', md: 'unset' }}>
            {' '}
            ETH
          </Text>
        </Text>
      </Flex>
      <SidebarResponsive routes={routes} />
      <Menu>
        <MenuButton p="0px">
          <Icon
            mt="6px"
            as={MdNotificationsNone}
            color={navbarIcon}
            w="18px"
            h="18px"
            me="10px"
            // onClick={handleSubmitcheck}
          />
        </MenuButton>
        <MenuList
          boxShadow={shadow}
          p="20px"
          borderRadius="20px"
          bg={menuBg}
          border="none"
          mt="22px"
          me={{ base: '30px', md: 'unset' }}
          minW={{ base: 'unset', md: '400px', xl: '450px' }}
          maxW={{ base: '360px', md: 'unset' }}
        >
          <Flex w="100%" mb="20px">
            <Text fontSize="md" fontWeight="600" color={textColor}>
              Notifications
            </Text>
            <Text
              fontSize="sm"
              fontWeight="500"
              color={textColorBrand}
              ms="auto"
              cursor="pointer"
              onClick={handleSubmitcheck}
            >
              Mark all read
            </Text>
          </Flex>
          <Flex flexDirection="column">
            <MenuItem
              _hover={{ bg: 'none' }}
              _focus={{ bg: 'none' }}
              px="0"
              borderRadius="8px"
              mb="10px"
            >
              {notification != null &&
                notification?.map((value, index) => {
                  return (
                    <>
                      <Stack spacing={3} key={index}>
                        <Alert status="success">
                          <AlertIcon />
                          Data uploaded to the server. {value?.totalProfitLoss}
                        </Alert>
                        <Alert status="success">
                          <AlertIcon />
                          Data uploaded to the server.{' '}
                          {value?.portfolioPercentageChangeData}
                        </Alert>
                      </Stack>
                    </>
                  );
                })}
              {notification == null && (
                <>
                  <Stack spacing={3}>
                    <Alert status="error">
                      <AlertIcon />
                      There was an error processing your request
                    </Alert>

                    <Alert status="success">
                      <AlertIcon />
                      Data uploaded to the server. Fire on!
                    </Alert>

                    <Alert status="warning">
                      <AlertIcon />
                      Seems your account is about expire, upgrade now
                    </Alert>

                    <Alert status="info">
                      <AlertIcon />
                      Chakra is going live on August 30th. Get ready!
                    </Alert>
                  </Stack>
                </>
              )}

              {/* <Button onClick={handleSubmitcheck}  > click me </Button> */}
            </MenuItem>
            {/* <MenuItem
              _hover={{ bg: 'none' }}
              _focus={{ bg: 'none' }}
              px="0"
              borderRadius="8px"
              mb="10px"
            >
              <ItemContent info="Horizon Design System Free" />
            </MenuItem> */}
          </Flex>
        </MenuList>
      </Menu>
      <Button
        variant="no-hover"
        bg="transparent"
        p="0px"
        minW="unset"
        minH="unset"
        h="18px"
        w="max-content"
        onClick={toggleColorMode}
      >
        <Icon
          me="10px"
          h="18px"
          w="18px"
          color={navbarIcon}
          as={colorMode === 'light' ? IoMdMoon : IoMdSunny}
        />
      </Button>
      <Menu>
        <MenuButton p="0px">
          <Avatar
            _hover={{ cursor: 'pointer' }}
            color="white"
            name="Adela Parkson"
            bg="#11047A"
            size="sm"
            w="40px"
            h="40px"
          />
        </MenuButton>
        <MenuList
          boxShadow={shadow}
          p="0px"
          mt="10px"
          borderRadius="20px"
          bg={menuBg}
          border="none"
        >
          <Flex w="100%" mb="0px">
            <Text
              ps="20px"
              pt="16px"
              pb="10px"
              w="100%"
              borderBottom="1px solid"
              borderColor={borderColor}
              fontSize="sm"
              fontWeight="700"
              color={textColor}
            >
              👋&nbsp; Hey, {user ? user.given_name : ' DUDE '}
            </Text>
          </Flex>
          <Flex flexDirection="column" p="10px">
            <MenuItem
              _hover={{ bg: 'none' }}
              _focus={{ bg: 'none' }}
              borderRadius="8px"
              px="14px"
            >
              <Text fontSize="sm">Profile Settings</Text>
            </MenuItem>
            <MenuItem
              _hover={{ bg: 'none' }}
              _focus={{ bg: 'none' }}
              borderRadius="8px"
              px="14px"
            >
              <Text fontSize="sm" onClick={() => login()} color="green">
                Login
              </Text>
            </MenuItem>
            <MenuItem
              _hover={{ bg: 'none' }}
              _focus={{ bg: 'none' }}
              color="red.400"
              borderRadius="8px"
              px="14px"
            >
              {/* <Text fontSize="sm">Log out</Text> */}
              <Text fontSize="sm" color="red">
                Logout
              </Text>
            </MenuItem>
          </Flex>
        </MenuList>
      </Menu>
    </Flex>
  );
}

HeaderLinks.propTypes = {
  variant: PropTypes.string,
  fixed: PropTypes.bool,
  secondary: PropTypes.bool,
  onOpen: PropTypes.func,
};
