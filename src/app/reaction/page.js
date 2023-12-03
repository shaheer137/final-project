// 'use client'
// import React from 'react';
// import { useState } from 'react';
// import { FaThumbsUp, FaLaugh, FaAngry, FaSad, FaWow, FaHeart } from 'react-icons/fa';

// const LikeButton = () => {
//   const [reaction, setReaction] = useState();

//   const handleReaction = (newReaction) => {
//     setReaction((prevReaction) => (prevReaction === newReaction ? null : newReaction));
//   };

//   return (
//     <div style={{ backgroundColor: '#23297a', color: 'white', fontSize: 21 }}>
//       <div onClick={() => handleReaction('like')}>
//         <FaThumbsUp /> Like
//       </div>
//       <div onClick={() => handleReaction('love')} style={{ marginLeft: 20 }}>
//         <FaHeart /> Love
//       </div>
//       <div onClick={() => handleReaction('haha')} style={{ marginLeft: 20 }}>
//         <FaLaugh /> Haha
//       </div>
//       <div onClick={() => handleReaction('wow')} style={{ marginLeft: 20 }}>
//         <FaWow /> Wow
//       </div>
//       <div onClick={() => handleReaction('sad')} style={{ marginLeft: 20 }}>
//         <FaSad /> Sad
//       </div>
//       <div onClick={() => handleReaction('angry')} style={{ marginLeft: 20 }}>
//         <FaAngry /> Angry
//       </div>
//       {reaction && <div>You reacted with: {reaction}</div>}
//     </div>
//   );
// };

// export default LikeButton;


