// react imports
import React from 'react';
import { useState, useEffect } from 'react';
import {useUserContext} from "../ctx/UserContext";
import Upload from '../components/Uploader';

// Chackra imports
import {
  Grid,
  GridItem,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Button,
  ButtonGroup,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Textarea,
} from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter, Heading, Text } from '@chakra-ui/react';
import TimelineContainer from '../components/TimelineContainer';




export default function Planner() {
  const { currUser } = useUserContext();
  const id = currUser?.data?._id;
  const [ image, setImage] = useState('')
  const  [ okToRender, setOkToRender ] = useState(false)
  const [ journalPosts, setJournalPosts ] = useState([]);
  const myJournalPosts = async (userId) => {
    try {
      const response = await fetch(`/api/user/${userId}`);
      const journalPostsData = await response.json()
      // console.log(journalPostsData)
      // const myPostsId = journalPostsData.payload.myJournals
      setJournalPosts(journalPostsData.payload.myJournals)
      // const fetchPromises = myPostsId.map((id) => getMyPosts(id));
      // await Promise.all(fetchPromises);
      setOkToRender(true);
    } catch (error) {
      console.error('error fetching journal posts', error);
    }
  };
  useEffect(() => {
    if( currUser?.data?._id )
      myJournalPosts(currUser?.data?._id)
  }, [currUser]);

//code for modal
const { isOpen: isJournalOpen , onOpen: onJournalOpen, onClose: onJournalClose } = useDisclosure()



const onSubmit = async () => {
  try {
    let response = await fetch('/api/journal', {
      method: "POST",
      headers: {"content-type": "application/json"},
      body: JSON.stringify( {title: form.title, text: form.text } )
    })
    console.log("success")
  } catch (error) {
    console.log(error)
  }
}



// monitors what is being typed in new journal post form
const [form, setForm] = useState({title: "", text: ""});
let handleInputChange = (e) => {
  if(e.target.name === "journalTitle"){
    setForm({...form, title: e.target.value})
  } else {
    setForm({...form, text: e.target.value})
  }
}

  //get all journal posts
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
        <GridItem className="timeline" rowSpan={1} colSpan={5}>
          <div>
            <TimelineContainer></TimelineContainer>
          </div>
        </GridItem>
        <GridItem className="addpost" colSpan={1}>
          <h2 style={{ whiteSpace: 'nowrap' }}>Add Journal Post</h2>
            <p></p>
            <Button onClick={onJournalOpen}>Add a New Journal Post</Button>
            <p></p>
            <h2>My Journal Posts:</h2>
            <div>
              {journalPosts?.map((data1) => (
                <div key={data1?._id}>
                  <ul>
                    <li>
                      {data1 ? (
                        <>
                          {data1.title}
                          {/* <Button onClick={() => deleteJournalPost(data1?._id)}>Delete Journal Post</Button> */}
                        </>
                      ) : (
                        <p>Post data is not available.</p>
                      )}
                    </li>
                  </ul>
                </div>
              ))}
            </div>
            <Modal isOpen={isJournalOpen} onClose={onJournalClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>New Journal Post</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl>
                  <FormLabel>Journal Post Title:</FormLabel>
                  <Input type='text' value={form.title} key={form.title} onChange={handleInputChange} name="journalTitle"/>
                </FormControl>
                <FormControl>
                <Text mb='8px'>Journal Post Content:</Text>
                <Textarea
                  value={form.content}
                  onChange={handleInputChange}
                  placeholder='Enter Post Content Here'
                  size='lg'
                  name="journalContent"
                  key={form.content}
                />
                </FormControl>
                  {/* <Lorem count={2} /> */}
              </ModalBody>
              <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={onSubmit}>
                  Submit
                </Button>
                <Upload setImage={setImage}/>
              </ModalFooter>
            </ModalContent>
          </Modal>

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
                {/* <Button className='homeButton' colorScheme='orange' href='https://arb.umn.edu/' target='_blank'>Reply to Post */}
                {/* </Button> */}
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