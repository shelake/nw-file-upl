
// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import './ListOfPeople.css';
// // import MessagePage from './MessagePage';
// // import { Link } from 'react-router-dom';

// // function ListOfPeople(props) {
// //   const [userFriends, setUserFriends] = useState([]);
// //   const [selectedFriendId, setSelectedFriendId] = useState(null);
// //   const currentUser = JSON.parse(localStorage.getItem('User'));
// //   const userId = currentUser.userid;

// //   useEffect(() => {
// //     axios.get(`http://localhost:8086/api/v1/users/${userId}/friends`)
// //       .then(response => {
// //         setUserFriends(response.data);
// //       })
// //       .catch(error => {
// //         console.error('Error fetching user data:', error);
// //       });
// //   }, [userId]);

// //   return (
// //     <div className="container">
// //       <div className="row">
// //         <div className="col-md-4">
// //           <div className="people-container">
// //             <h4 style={{ fontFamily: "initial" }}>Friends</h4>
// //             <div className="row">
// //               {userFriends.map((friendship, index) => (
// //                 <div>{currentUser.userid==friendship.userid1 ? 
// //                     (
// //                 <div key={index} onClick={() => setSelectedFriendId(friendship.userid2)}>
// //                   <div className="card-people">
// //                     <div class="card p-3" style={{ width: "80%" }}>
// //                       <div class="d-flex align-items-center">
// //                         <div class="image">
// //                           {friendship.user1Profile == null ?
// //                             <img src={{}} width="45" height="45" style={{ borderRadius: "50%" }} /> :
// //                             <img src={friendship.user2Profile} width="45" height="45" style={{ borderRadius: "50%" }} />}
// //                         </div>
// //                         &nbsp;&nbsp;&nbsp;
// //                           <div class="ml-3 w-30">
// //                             <h5 class="mb-0 mt-0" style={{ fontFamily: "cursive" }}>{friendship.user2name}</h5>
// //                             <div class="button mt-2 d-flex flex-row align-items-center"></div>
// //                           </div>
// //                         <br></br>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>):
// //                 (
// //                     <div key={index} onClick={() => setSelectedFriendId(friendship.userid1)}>
// //                   <div className="card-people">
// //                     <div class="card p-3" style={{ width: "80%" }}>
// //                       <div class="d-flex align-items-center">
// //                         <div class="image">
// //                           {friendship.user2Profile == null ?
// //                             <img src={{}} width="45" height="45" style={{ borderRadius: "50%" }} /> :
// //                             <img src={friendship.user1Profile} width="45" height="45" style={{ borderRadius: "50%" }} />}
// //                         </div>
// //                         &nbsp;&nbsp;&nbsp;
// //                           <div class="ml-3 w-30">
// //                             <h5 class="mb-0 mt-0" style={{ fontFamily: "cursive" }}>{friendship.user1name}</h5>
// //                             <div class="button mt-2 d-flex flex-row align-items-center"></div>
// //                           </div>
// //                         <br></br>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>
// //                 )}</div>
                
// //               ))}
// //             </div>
// //           </div>
// //         </div>
// //         <div className="col-md-8">
// //           {selectedFriendId && <MessagePage friendId={selectedFriendId} />}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default ListOfPeople;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// // import './ListOfPeople.css';
// import MessagePage from './MessagePage';
// import { Link } from 'react-router-dom';
// import { Container, Row, Col } from 'react-bootstrap';

// function ListOfPeople(props) {
//   const [userFriends, setUserFriends] = useState([]);
//   const [selectedFriendId, setSelectedFriendId] = useState(null);
//   const currentUser = JSON.parse(localStorage.getItem('User'));
//   const userId = currentUser.userid;

//   useEffect(() => {
//     axios.get(`http://localhost:8086/api/v1/users/${userId}/friends`)
//       .then(response => {
//         setUserFriends(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching user data:', error);
//       });
//   }, [userId]);



//   return (
//     <Container>
//       <Row>
//         <Col xs={4}>
//           {/* Your List of People Component */}
         
//             {/* Your List of People Component Content */}

//             {/* starts here */}

//          <div className="row">
//         <div className="col-md-4">
//           <div className="people-container">
//             <h4 style={{ fontFamily: "initial" }}>Friends</h4>
//            <div className="row">
//            {userFriends.map((friendship, index) => (
//                 <div>{currentUser.userid==friendship.userid1 ? 
//                     (
//                 <div key={index} onClick={() => setSelectedFriendId(friendship.userid2)}>
//                   {/* <div className="card-people"> */}
//                     <div class="card p-3" style={{ width: "40%" }}>
//                       {/* <div class="d-flex align-items-center"> */}
//                         <div class="image">
//                           {friendship.user1Profile == null ?
//                             <img src={{}} width="45" height="45" style={{ borderRadius: "50%" }} /> :
//                             <img src={friendship.user2Profile} width="45" height="45" style={{ borderRadius: "50%" }} />}
//                         </div>
//                         &nbsp;&nbsp;&nbsp;
//                           <div class="ml-3 w-30">
//                             <h5 class="mb-0 mt-0" style={{ fontFamily: "cursive" }}>{friendship.user2name}</h5>
//                             <div class="button mt-2 d-flex flex-row align-items-center"></div>
//                           </div>
//                         <br></br>
//                       {/* </div> */}
//                     {/* </div> */}
//                   </div>
//                 </div>):
//                 (
//                     <div key={index} onClick={() => setSelectedFriendId(friendship.userid1)}>
//                   {/* <div className="card-people"> */}
//                     <div class="card p-3" style={{ width: "80%" }}>
//                       <div class="d-flex align-items-center">
//                         <div class="image">
//                           {friendship.user2Profile == null ?
//                             <img src={{}} width="45" height="45" style={{ borderRadius: "50%" }} /> :
//                             <img src={friendship.user1Profile} width="45" height="45" style={{ borderRadius: "50%" }} />}
//                         </div>
//                         &nbsp;&nbsp;&nbsp;
//                           <div class="ml-3 w-30">
//                             <h5 class="mb-0 mt-0" style={{ fontFamily: "cursive" }}>{friendship.user1name}</h5>
//                             <div class="button mt-2 d-flex flex-row align-items-center"></div>
//                           </div>
//                         <br></br>
//                       </div>
//                     </div>
//                   {/* </div> */}
//                 </div>
//                 )}</div>
                
//               ))}
//             </div>
//           </div>
//         </div>


//           </div>
//         </Col>
//         <Col xs={8}>
//           {/* Your Message Page Component */}
//           <div className="container">
//             {/* Your Message Page Component Content */}
//             <div className="col-md-8">
//           {selectedFriendId && <MessagePage friendId={selectedFriendId} />}
//         </div>
//           </div>
//         </Col>
//       </Row>
//     </Container>
   
//   )
// }

// export default ListOfPeople

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MessagePage from './MessagePage';
import { Container, Row, Col } from 'react-bootstrap';

function ListOfPeople(props) {
  const [userFriends, setUserFriends] = useState([]);
  const [selectedFriendId, setSelectedFriendId] = useState(null);
  const currentUser = JSON.parse(localStorage.getItem('User'));
  const userId = currentUser.userid;

  useEffect(() => {
    axios.get(`http://localhost:8080/api/v1/users/${userId}/friends`)
      .then(response => {
        setUserFriends(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, [userId]);

  return (
    <Container>
      <Row>
        <Col xs={6}>
          <div className="row">
            {/* <div className="col-md-4"style={{width:'10%',paddingRight:'0px'}}> */}
              <div className="people-container" >
                <h4><center>Friends</center></h4>
                <div className="row">
                  {userFriends.map((friendship, index) => (
                    <div key={index} onClick={() => setSelectedFriendId(currentUser.userid === friendship.userid1 ? friendship.userid2 : friendship.userid1)}>
                      <div className="card p-3" style={{ width: "40%" }}>
                        <div className="image">
                          {currentUser.userid === friendship.userid1 ?
                            <img src={friendship.user2Profile} alt="Profile" width="45" height="45" style={{ borderRadius: "50%" }} /> :
                            <img src={friendship.user1Profile} alt="Profile" width="45" height="45" style={{ borderRadius: "50%" }} />}
                        </div>
                        <div className="ml-3 w-30">
                          <h5>{currentUser.userid === friendship.userid1 ? friendship.user2name : friendship.user1name}</h5>
                          <div className="button mt-2 d-flex flex-row align-items-center"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            {/* </div> */}
          </div>
        </Col>
        <Col xs={6}>
          <div className="col-md-8">
            {selectedFriendId && <MessagePage friendId={selectedFriendId} />}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ListOfPeople;

