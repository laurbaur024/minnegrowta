// react imports
import React from 'react';
import { useState, useEffect } from 'react';
import { useUserContext } from "../ctx/UserContext";
import Upload from '../components/Uploader';
import TimelineContainer from "../components/TimelineContainer";
// Chackra imports
import { Grid, GridItem, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, FormControl, FormLabel, Input, Textarea, Text } from '@chakra-ui/react'

// import TimelineContainer from '../components/TimelineContainer';




export default function Planner() {
  const { currUser } = useUserContext();
  const id = currUser?.data?._id;
  const [image, setImage] = useState('')
  const [currentUser, setCurrentUser] = useState(null);
  const [okToRender, setOkToRender] = useState(false)
  const [journalPosts, setJournalPosts] = useState([]);
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
    if (currUser?.data?._id)
      myJournalPosts(currUser?.data?._id)
  }, [currUser]);


  const { isOpen: isJournalOpen, onOpen: onJournalOpen, onClose: onJournalClose } = useDisclosure()
  const [editData, setEditData] = useState({});


  const {
    isOpen: isEditModalOpen,
    onOpen: onEditModalOpen,
    onClose: onEditModalClose,
  } = useDisclosure();


  const onSubmit = async () => {
    try {
      console.log(id)
      let response = await fetch('/api/journal', {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ title: form.title, text: form.text, userId: id, image: image })
      })
      console.log("success")
      window.location.reload();
    } catch (error) {
      console.log(error)
    }
  }

    const openEditModal = (entryData) => {
      setEditData(entryData);
      onEditModalOpen();
    };

    // monitors what is being typed in new journal post form
    const [form, setForm] = useState({ title: "", text: "" });
    let handleInputChange = (e) => {
      if (e.target.name === "journalTitle") {
        setForm({ ...form, title: e.target.value })
      } else {
        setForm({ ...form, text: e.target.value })
        console.log(form)
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

    const onDelete = async (event) => {
      try {
        const response = await fetch(`/api/journal/${event.target.id}`, {
          method: "DELETE",
        });
        console.log(response)
        const data = await response.json();
        setCurrentUser(data.user);
        window.location.reload();
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }

    const onUpdate = async () => {
      try {
        const response = await fetch(`/api/journal/${editData._id}`, {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            title: editData.title,
            text: editData.text,
          }),
        });
        if (response.ok) {
          onEditModalClose();
          window.location.reload();
        } else {
          console.error("Error updating journal entry");
        }
      } catch (error) {
        console.error("Error updating journal entry:", error);
      }
    };

    return (
      <div className="garden-container">
        <>
          <Grid className="garden-content"
            templateRows="auto 1fr">
            <h2 style={{ whiteSpace: 'nowrap', margin: '20px' }}>Your Timeline</h2>
            <GridItem className="timeline" rowSpan={1} colSpan={5}>
              <div>
                <TimelineContainer />
              </div>
            </GridItem>
            <GridItem className="journal-grid" colSpan={1}>
              <h2 style={{ whiteSpace: 'nowrap' }}>Add Journal Post</h2>
              <Button colorScheme='green' onClick={onJournalOpen}>New Post</Button>
              <Modal isOpen={isJournalOpen} onClose={onJournalClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>New Journal Post</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <FormControl>
                      <FormLabel>Journal Post Title:</FormLabel>
                      <Input type='text' value={form.title} key={form.title} onChange={handleInputChange} name="journalTitle" />
                    </FormControl>
                    <FormControl>
                      <Text mb='8px'>Journal Post Content:</Text>
                      <Textarea
                        // value={form.text}
                        // onChange={handleInputChange}
                        placeholder='Enter Post Content Here'
                        size='lg'
                        name="journalText"
                      // key={form.text}
                      />
                    </FormControl>
                    {/* <Lorem count={2} /> */}
                  </ModalBody>
                  <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onSubmit}>
                      Submit
                    </Button>
                    <Upload setImage={setImage} />
                  </ModalFooter>
                </ModalContent>
              </Modal>

              <Modal isOpen={isEditModalOpen} onClose={onEditModalClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Edit Journal Entry</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <FormControl>
                      <FormLabel>Journal Post Title:</FormLabel>
                      <Input
                        type="text"
                        value={editData.title}
                        onChange={(e) =>
                          setEditData({ ...editData, title: e.target.value })
                        }
                      />
                    </FormControl>
                    <FormControl>
                      <Text mb="8px">Journal Post Content:</Text>
                      <Textarea
                        value={editData.text}
                        onChange={(e) =>
                          setEditData({ ...editData, text: e.target.value })
                        }
                        placeholder="Enter Post Content Here"
                        size="lg"
                      />
                    </FormControl>
                  </ModalBody>
                  <ModalFooter>
                    <Button colorScheme="green" mr={3} onClick={onUpdate}>
                      Update
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>

            </GridItem>
            <GridItem colSpan={4} className="alljournal-grid">
              <h2>My Journal Entries</h2>
              <Accordion allowToggle>
                {results.map((data, index) => (
                  <AccordionItem key={data._id}>
                    <h2>
                      <AccordionButton>
                        <Box as="span" flex='1' textAlign='left'>
                          {`${data.title}`}
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel className="journal-panel" pb={4}>
                      <div className="img-cnt">
                        <div className="journal-img">
                          <img src={`${data.image}`} alt="image of plants" width="500" height="300"></img>
                        </div>
                        <div className="journal-cnt">
                          {`${data.text}`}
                        </div>
                      </div>
                      <div className="button-cnt" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Button colorScheme='orange' onClick={onDelete} id={data._id}>
                          Delete
                        </Button>
                        <Button
                          colorScheme="blue"
                          onClick={() => openEditModal(data)}
                          id={data._id}
                        >
                          Edit
                        </Button>
                      </div>
                    </AccordionPanel>
                  </AccordionItem>
                ))}
              </Accordion>
            </GridItem>
          </Grid>
        </>
      </div>
    );
  }
