import React, { useState } from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel, Box } from '@chakra-ui/react';
import Login from './Login';
import Sign from './Sign';


const TabLogin = () => {
    const [selectedTab, setSelectedTab] = useState('Login'); // Initialize with 'login' tab selected
    const isMobile = window.innerWidth < 768; // Define a breakpoint for mobile
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024; // Define a breakpoint for tablet
  
  
    return (
    <Box  mt={'10%'}>
      {(!isMobile && isTablet) && (
            <Box m={'auto'} w={'80%'}  pt={'30%'}>
            <Tabs 
            isFitted variant='enclosed' 
            defaultIndex={0}  
            onChange={(index) => setSelectedTab(index === 0 ? 'Login' : 'Sign')} 
            w={'70%'} 
            margin={'auto'}
              borderWidth="0.5px"
              borderRadius={'10'}
            //borderColor="gray.200"
            //borderRadius="md" 
            >
          <TabList mb='1em'>
            <Tab as={'b'}p={3} fontSize={20} _selected={{ color: 'white', bg: '#FF0080' }}>Login</Tab>
            <Tab as={'b'}p={3} fontSize={20} _selected={{ color: 'white', bg: '#FF0080' }}>Sign</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {selectedTab === 'Login' && (
                <Login/>
              )}
            </TabPanel>
            <TabPanel>
              {selectedTab === 'Sign' && (
                <Sign />
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
        </Box>
      )}

      {(isMobile && !isTablet) && (
            <Box m={'auto'} w={'80%'} pt={'50%'}>
            <Tabs 
            isFitted variant='enclosed' 
            defaultIndex={0}  
            onChange={(index) => setSelectedTab(index === 0 ? 'Login' : 'Sign')} 
            w={'100%'} 
            margin={'auto'}
              borderWidth="0.5px"
              borderRadius={'10'}
            //borderColor="gray.200"
            //borderRadius="md" 
            >
          <TabList mb='1em'>
            <Tab as={'b'}p={3} fontSize={20} _selected={{ color: 'white', bg: '#FF0080' }}>Login</Tab>
            <Tab as={'b'}p={3} fontSize={20} _selected={{ color: 'white', bg: '#FF0080' }}>Sign</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {selectedTab === 'Login' && (
                <Login/>
              )}
            </TabPanel>
            <TabPanel>
              {selectedTab === 'Sign' && (
                <Sign />
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
        </Box>
      )}

      {(!isMobile && !isTablet) && (
            <Box mt={'10%'} mb={10}>
            <Tabs 
            isFitted variant='enclosed' 
            defaultIndex={0}  
            onChange={(index) => setSelectedTab(index === 0 ? 'Login' : 'Sign')} 
            w={'25%'} 
            margin={'auto'}
              borderWidth="0.5px"
              borderRadius={'10'}
            //borderColor="gray.200"
            //borderRadius="md" 
            >
          <TabList mb='1em'>
            <Tab as={'b'}p={3} fontSize={20} _selected={{ color: 'white', bg: '#FF0080' }}>Login</Tab>
            <Tab as={'b'}p={3} fontSize={20} _selected={{ color: 'white', bg: '#FF0080' }}>Sign</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {selectedTab === 'Login' && (
                <Login/>
              )}
            </TabPanel>
            <TabPanel>
              {selectedTab === 'Sign' && (
                <Sign />
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
        </Box>
      )}
      
  </Box>
  )
}

export default TabLogin