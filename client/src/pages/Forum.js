import { Grid, GridItem } from '@chakra-ui/react';
import { Card, CardHeader, CardBody, CardFooter, Heading, Text } from '@chakra-ui/react';
import { Button, ButtonGroup } from '@chakra-ui/react';



export default function Forum () {
  return (
    <>
        <Grid className="forum-content"
        h='700px'
        templateRows='repeat(1, 1fr)'
        templateColumns='repeat(5, 1fr)'
        gap={4}
      >
        
        <GridItem colSpan={1} bg='papayawhip'>
          <h2>List of my blog posts apear here, when clicked what happens, what to do with delete or update buttons?</h2>
        </GridItem>
        <GridItem colSpan={4} bg='papayawhip'>
          <h2>All blog posts will go here in chronological order, when clicked on what happens?</h2>
        </GridItem>
        
      </Grid>
    </>
  )
}