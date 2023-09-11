import React from "react";
import CardContainer from "../components/CardContainer";
import TimelineContainer from "../components/TimelineContainer";
import {Card, Stack, CardBody, Heading, Text, Button} from '@chakra-ui/react'
import { useUserContext } from "../ctx/UserContext"; 

const App = () => {
  const margin = {
    marginBottom: "10px"
  }

  const { currUser } = useUserContext();
  const username = currUser?.data?.username;

  return (
    <div className="dash-container">
      <h1>Welcome to Your Dashboard, {username}</h1>
      <CardContainer className="cardcont"/>
      <Card className="timeline-content" style={margin}direction={{ base: 'column', sm: 'row' }} overflow='hidden' variant='outline'>
        <Stack>
          <CardBody>
            <Heading>{TimelineContainer}</Heading>
            <Text py='2'>Timeline will go here!</Text>
            <Button>Timeline</Button>
          </CardBody>
        </Stack>
      </Card>
    </div>
  );
};





// function Dashboard() {
//   return (
//     <>
//     <h2>Garden Planner User Dashboard</h2>
//     <div className="row">
//       <div className="col-md-4">
//         <div className="card">
//           <img src="placeholder" className="card=img-top" alt="My Favorites" />
//           <div className="card-body">
//             <h5 className="card-title">My Favorites</h5>
//             <p className="card-text">I love these plants!</p>
//             <a href="placeholder" className="btn btn-primary">View</a>
//           </div>
//         </div>
//       </div>
//     </div>
//     <div className="row">
//       <div className="col-md-4">
//         <div className="card">
//           <img src="placeholder" className="card=img-top" alt="My Garden" />
//           <div className="card-body">
//             <h5 className="card-title">My Garden</h5>
//             <p className="card-text">Plants in my garden / My garden journal</p>
//             <a href="placeholder" className="btn btn-primary">Go!</a>
//           </div>
//         </div>
//       </div>
//     </div>
//     <div className="row">
//       <div className="col-md-4">
//         <div className="card">
//           <img src="placeholder" className="card=img-top" alt="Forum" />
//           <div className="card-body">
//             <h5 className="card-title">Forum</h5>
//             <p className="card-text">Have a question or just want to share a spectacular picture of your garden?  Post it in the forum!</p>
//             <a href="{placeholder}" className="btn btn-primary">Visit User Forum</a>
//           </div>
//         </div>
//       </div>
//     </div>
//     <div className="container">
//       <div className="col-md-4">
//         <div className="card">
//           <img src="placeholder" className="card=img-top" alt="Timeline" />
//           <div className="card-body">
//             <h5 className="card-title">Timeline</h5>
//           </div>
//         </div>
//       </div>
//     </div>

//     </>
//   );
// }
//export default Dashboard;
//export default Timeline;
export default App;