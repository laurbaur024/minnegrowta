// react imports
import React from 'react';
import { useState, useEffect } from 'react';

// Chackra imports
import { 
  Button,
  Grid, 
  GridItem,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from '@chakra-ui/react';
import { Card, CardHeader, CardBody, CardFooter, Heading, Text } from '@chakra-ui/react';




export default function Planner() {

  const [results, setResults] = useState([]);

  const searchJournal = async () => {
    const response = await fetch("/api/journal");
    const data = await response.json()
    setResults(data.payload);
    console.log(data)
  }
    useEffect(() => {
    searchJournal();

  }, []);


  return (
    <div className="garden-container">
    <>
      <Grid className="garden-content"
        h='700px'
        templateRows='repeat(2, 1fr)'
        templateColumns='repeat(5, 1fr)'
        gap={4}
      >
        <GridItem className="timeline" rowSpan={1} colSpan={5} bg='tomato'>
          <h1>Insert timeline here</h1>
        </GridItem>
        <GridItem className="addpost" colSpan={1}>
          <h2 style={{ whiteSpace: 'nowrap' }}>Add Journal Post</h2>
        </GridItem>
        <GridItem colSpan={4} className="journal-grid">
          <h2>My Journal Entries</h2>
          <Accordion allowToggle>
          {results.map((data) => (
            <AccordionItem key={data._id}>
              <h2>
                <AccordionButton>
                  <Box as="span" flex='1' textAlign='left'>
                    {`${data.title}`}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <div>
                  <img src={`${data.image}`} alt="image of plants" width="500" height="300"></img>
                </div>
                <div>
                  {`${data.text}`}
                </div>
                <Button className='homeButton' colorScheme='orange' href='https://arb.umn.edu/' target='_blank'>Reply to Post
                </Button>
              </AccordionPanel>
            </AccordionItem>
            ))}
          </Accordion>
        </GridItem>
      </Grid>
    </>
    </div>
  )
}