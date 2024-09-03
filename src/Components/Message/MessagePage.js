// import React, { useState, useEffect } from 'react';
// import axios from "axios";
// // import "./MessagePage.css";
// import { useParams } from "react-router-dom";



// const MessagePage = ({ friendId }) => {
//   const [chatMessages, setChatMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [senderPerson, setSenderPerson] = useState([]);
//   const [receiverPerson, setReceiverPerson] = useState([]);
//   // Get the friendId parameter from the URL
//   const currentUser = JSON.parse(localStorage.getItem('User'));
//   localStorage.removeItem('friend_id');
//   const userId = currentUser.userid;

//   useEffect(() => {
//     const fetchMessages = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8086/api/v1/users/${userId}/message/${friendId}`);
//         const sortedMessages = response.data.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
//         setChatMessages(sortedMessages);

//         const responseSend = await axios.get(`http://localhost:8086/api/v1/users/${userId}`);
//         setSenderPerson(responseSend.data);

//         const responseReceive = await axios.get(`http://localhost:8086/api/v1/users/${friendId}`);
//         setReceiverPerson(responseReceive.data);

//         // Remove friendId from local storage after retrieving it

//       } catch (error) {
//         console.error('Error fetching messages:', error);
//       }
//     };
//     fetchMessages();
//   }, [friendId, userId]);

 
//   const sendMessage = async () => {
//     try {
     
//       await axios.post(`http://localhost:8086/api/v1/users/${userId}/message/send/${friendId}`, newMessage);
//       const response = await axios.get(`http://localhost:8086/api/v1/users/${userId}/message/${friendId}`);
//       const sortedMessages = response.data.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
//       setChatMessages(sortedMessages);
//       setNewMessage("");
//     } catch (error) {
//       console.error('Error sending message:', error);
//     }
//   };
//   return (
//     <div>
//       <div className="container">
//         <div className="row d-flex justify-content-center">
//           <div className="col-md-8 col-lg-6 col-xl-4">
//             <div className="card" id="chat1" style={{ borderRadius: "15px",width: "400px" }}>
//               <div className="card-header d-flex justify-content align-items-center p-3 bg-info text-white border-bottom-0"
//                 style={{ borderTopLeftRadius: "15px", borderTopRightRadius: "15px" }}>
//                 <i className="fas fa-angle-left"></i>
//                 <img src={receiverPerson.profile_picture} width="45" height="45" style={{ borderRadius: "50%" }} />
//                 <p className="mb-0 fw-bold">{receiverPerson.username}</p>
//                 <i className="fas fa-times"></i>
//               </div>
//               <div className="live-chat" style={{ maxHeight: "300px", overflowY: "auto" }}>
//                 {chatMessages.map((message, index) => (
//                   <div key={index} className="message-container">
//                     <div className={message.senderID === userId ? 'sender-left' : 'sender-right'}>
//                       <img src={message.senderID === userId ? senderPerson.profile_picture : receiverPerson.profile_picture}
//                         width="45" height="45" style={{ borderRadius: "50%" }} />
//                       <span className="message-text">{message.message_text}</span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div>
//               <br />
//             </div>
//             <div className="message-input">
//               <div className="form-outline">
//                 <textarea className="form-control" id="textAreaExample" rows="3" width="70%" value={newMessage} onChange={(e) => setNewMessage(e.target.value)}></textarea>
//               </div>
//               <button className="btn btn-primary" onClick={sendMessage}>Send</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default MessagePage;

import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useParams } from "react-router-dom";
import { IoSend } from "react-icons/io5";

const MessagePage = ({ friendId }) => {
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [senderPerson, setSenderPerson] = useState({});
  const [receiverPerson, setReceiverPerson] = useState({});
  const currentUser = JSON.parse(localStorage.getItem('User'));
  localStorage.removeItem('friend_id');
  const userId = currentUser.userid;

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:8086/api/v1/users/${userId}/message/${friendId}`);
        const sortedMessages = response.data.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        setChatMessages(sortedMessages);

        const responseSend = await axios.get(`http://localhost:8086/api/v1/users/${userId}`);
        setSenderPerson(responseSend.data);

        const responseReceive = await axios.get(`http://localhost:8086/api/v1/users/${friendId}`);
        setReceiverPerson(responseReceive.data);

      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    fetchMessages();
  }, [friendId, userId]);

  const sendMessage = async () => {
    try {
      await axios.post(`http://localhost:8086/api/v1/users/${userId}/message/send/${friendId}`, newMessage);
      const response = await axios.get(`http://localhost:8086/api/v1/users/${userId}/message/${friendId}`);
      const sortedMessages = response.data.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
      setChatMessages(sortedMessages);
      setNewMessage("");
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      <div className="container">
        {/* <div className="row d-flex justify-content-center">
          <div className="col-md-8 col-lg-6 col-xl-4"> */}
            {/* <div className="card" style={{width:'80%'}}> */}
              <div className="card-header" >
                <h6>
                <img src={receiverPerson.profile_picture} width="45" height="45" style={{ borderRadius: "50%"}}  />
                {receiverPerson.username}
                </h6>
              </div>
              <div className="live-chat">
                {chatMessages.map((message, index) => (
                  <div key={index} className="message-container">
                    <div className={message.senderID === userId ? 'sender-left' : 'sender-right'}>
                      <img src={message.senderID === userId ? senderPerson.profile_picture : receiverPerson.profile_picture}
                        width="45" height="45" style={{ borderRadius: "50%" }} />
                      <span>{message.message_text}</span>
                    </div>
                  </div>
                ))}
              </div>
            {/* </div> */}
            <div>
              <br />
            </div>
            <div className="message-input">
              <div className="form-outline" style={{width:'120%'}}>
                <textarea className="form-control" rows="3" value={newMessage} onChange={(e) => setNewMessage(e.target.value)}></textarea>
              </div>
              <button className="btn btn-primary" onClick={sendMessage}><IoSend /></button>
            </div>
          </div>
        </div>
    //   </div>
    // </div>
  );
}

export default MessagePage;
