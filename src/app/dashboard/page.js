'use client'
import Link from 'next/link'
import React from 'react';
import { useRouter } from "next/navigation"
import { IoMdPerson } from 'react-icons/io';
import { FaHome, FaCompass, FaShoppingBag, FaHeart, FaEnvelope, FaCog, FaVideo, FaCamera, FaSmile, } from 'react-icons/fa';
import { getPosts } from '../config/firebase';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faComment, faShare } from '@fortawesome/free-solid-svg-icons';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { updateStatus } from "../config/firebase"
import { collection, query, where, onSnapshot, db } from '../config/firebase'
import { handleChat } from "../config/firebase"
import { checkAndCreateRoom, posting } from '../config/firebase';

export default function Dashboard() {
    const [post, setPost] = useState([])
    const [friendRequest, setFriendRequest] = useState([])
    const [friends, setFriends] = useState([])
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    const [userDetail, setUserDetail] = useState()
    const auth = getAuth();
    const [NewMessages, setNewMessages] = useState()
    const [msg, setMsg] = useState()

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                setUserDetail(user)
            } else {
            }
        });
    }, [])

    console.log('users', userDetail)

    useEffect(() => {
        getData()
        request()
        MyContacts()
    }, [])

    const getData = async () => {
        try {
            const data = await getPosts();
            setPost(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        }
    }
    console.log('post --->', post)

    if (!post) {
        return <div>Loading...</div>
    }

    const request = async () => {
        const q = query(collection(db, "users"), where("status", "==", "pending"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const data = [];
            querySnapshot.forEach((doc) => {
                data.push({ id: doc.id, ...doc.data() });
            });
            setFriendRequest(data)
        });
    }

    async function MyContacts() {
        const q = query(collection(db, "users"), where("status", "==", "accepted"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const data = [];
            querySnapshot.forEach((doc) => {
                data.push({ id: doc.id, ...doc.data() });
            });
            setFriends(data)
        });
    }

    console.log('friend', friends)

    if (!friends) {
        return <div>Loading...</div>
    }

    const postMessages = () => {
        handleChat(NewMessages)
    }

    console.log('msg', msg)

    return <div>
        <div className="header">
            <h1 style={{ fontSize: 28, position: 'absolute', top: 2, left: 30, color: 'black' }}>Scrolllink</h1>
            <input className="input" type="text" placeholder="Type something here ..." />
            <button className='button-logout'>Logout</button>
            {userDetail && userDetail.displayName ? (
                <div>
                    {userDetail.photoURL ? (
                        <img width={39} style={{ marginRight: 20 }}
                            src={userDetail.photoURL}
                            alt="User Photo"
                        />
                    ) : (
                        <span>No Photos </span>
                    )}
                    <span style={{ color: 'black', position: 'absolute', top: 8, right: 82, fontSize: 20 }}>{userDetail.displayName}</span>
                </div>
            ) : (
                <span>Loading...</span>
            )}
        </div>

        <div style={{ display: 'flex' }}>
            <div className='side-bar' style={{ flex: 1, padding: '5px' }}>
                <div className='menu-container'>
                    <div>
                        <h1 style={{ fontSize: 'large', margin: '10px', pdding: '10px', height: '40px', fontWeight: 'bolder' }} >My Contacts</h1>
                        {friends.map(item => {
                            return <div style={{ border: '1px solid black', borderRadius: '10px', margin: '10px', padding: '10px' }} >
                                <h1> {item.fullname}</h1>
                            </div>
                        })}
                    </div>
                    <div className='menu-item'>
                        <FaCog /> <Link href="/">Setting</Link>
                    </div>
                    <div className='menu-item'>
                        <FaEnvelope /> <Link href="/explore">Messages</Link>
                    </div>
                    <div className='menu-item'>
                        <FaHeart /> <Link href="/marketplace">My favorite</Link>
                    </div>
                    <div className='menu-item'>
                        <FaShoppingBag /> <Link href="/favorites">Marketplace</Link>
                    </div>
                    <div className='menu-item'>
                        <FaCompass /> <Link href="/messages">Explore</Link>
                    </div>
                    <div className='menu-item'>
                        <FaHome /> <Link href="/settings">Feed</Link>
                    </div>
                </div>
            </div>

            <div className='post' style={{ flex: 2, padding: '20px', width: '510px', backgroundColor: '#eeeeee' }}>
                <input style={{ border: '2px solid black', borderRadius: 5, marginLeft: 24, width: '90%', border: '1px solid #ccc;', height: '40px' }} placeholder=" What's happening? " /><br /><br />
                <div style={{ display: 'flex' }} className="menuu-container">
                    <div className='menuu-item'>
                        <FaVideo /> <Link href="/">Live </Link>
                    </div>
                    <div className='menuu-item'>
                        <FaCamera /> <Link href="/explore">Photos</Link>
                    </div>
                    <div className='menuu-item'>
                        <FaSmile /> <Link href="/marketplace">Feelings</Link>

                    </div>
                    <div className='menuuu-item'>
                        <button className="button-post" onClick={() => router.push('/postad')}>Post</button>
                    </div>

                </div> <br />
                <div>
                    {post.map(item => {
                        return <div style={{ marginTop: 10 }}>
                            <div>
                                <span style={{ display: 'flex' }}>
                                    <img style={{ marginLeft: 5 }} width={30} src={userDetail.photoURL} />
                                    <p style={{ fontSize: 18, color: 'black ', marginLeft: 5 }}>{userDetail.displayName}</p>
                                </span>
                                <h2 style={{ color: 'aaaaaa' }}>Description: {item.description}</h2>
                                <img height={70} width='100%' src={item.imageUrl} />
                            </div>
                            <div style={{ borderTop: '2px solid grey', borderBottom: '2px solid grey', color: 'black', fontSize: 21 }}>
                                <FontAwesomeIcon icon={faThumbsUp} /> Like
                                <FontAwesomeIcon icon={faComment} style={{ marginLeft: 80 }} /> Comment
                                <FontAwesomeIcon icon={faShare} style={{ marginLeft: 80 }} /> Share
                            </div>
                        </div>
                    })}
                </div>
            </div>

            <div style={{ flex: 3, padding: '20px', backgroundColor: 'white', margin: 5, borderRadius: 6 }}>
                <div className='request'>
                    <h1 style={{ fontSize: 'large', fontWeight: 'bolder', textAlign: 'left', borderBottom: '1px solid black', padding: 10 }}> You might like </h1>
                    {friendRequest.map(item => {
                        return (<div style={{ borderRadius: '10px', margin: '10px', padding: '10px' }} >
                            <h1 style={{ textAlign: 'left' }}>{item.fullname}</h1>
                            <button onClick={() => { updateStatus(item.id, 'accepted') }} style={{ padding: '10px', margin: '2px', fontSize: 'small', backgroundColor: 'deeppink', borderRadius: '5px', width: '90px' }}>Accept</button>
                            <button onClick={() => { updateStatus(item.id, 'decline') }} style={{ padding: '10px', margin: '2px', fontSize: 'small', backgroundColor: 'white', border: '1px solid black', borderRadius: '5px', width: '90px' }}>Ignore</button>
                        </div>
                        )
                    })}
                </div>
                <div className='request'>
                    <h1 style={{ fontSize: 'large', fontWeight: 'bolder', textAlign: 'left', padding: 10 }}>Upcoming events</h1>
                    <div>
                        <span><img width={30} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJukIYseLOtlMDhYKfQfx0uDqurOqoXNmQOw&usqp=CAU' />
                            <h2 style={{ position: 'relative', bottom: 34, right: 29 }}>Design Talks</h2>
                            <h4 style={{ position: 'relative', bottom: 38, right: 29, fontSize: 12 }}>12 Oct, 13:00 IST</h4>
                            <p style={{ fontSize: 12, position: 'relative', bottom: 30, borderBottom: '1px solid grey' }}>A general talks about design with Sr <br />  Designer of Logitech Michael Spunfik</p>
                        </span>
                        <p style={{ fontSize: 14 }}>112 Joined</p>
                    </div>
                </div>

                <div className='request'>
                    <h1 style={{ fontSize: 'large', fontWeight: 'bolder', textAlign: 'left', padding: 10 }}>Upcoming events</h1>
                    <div>
                        <span><img width={30} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJukIYseLOtlMDhYKfQfx0uDqurOqoXNmQOw&usqp=CAU' />
                            <h2 style={{ position: 'relative', bottom: 34, right: 29 }}>Design Talks</h2>
                            <h4 style={{ position: 'relative', bottom: 38, right: 29, fontSize: 12 }}>30 Dec, 16:00 IST</h4>
                            <p style={{ fontSize: 12, position: 'relative', bottom: 30, borderBottom: '1px solid grey' }}>A general talks about design with Sr <br />  Designer of Logitech Michael Spunfik</p>
                        </span>
                        <p style={{ fontSize: 14 }}>80 Joined</p>
                    </div>
                </div>

            </div>

            <div style={{ flex: 3, padding: '20px', backgroundColor: 'pink' }}>
                <h1 style={{ fontSize: 'large', margin: '10px', padding: '10px', height: '40px', fontWeight: 'bolder' }} >CHATS</h1>
                {friends.map(item => {
                    return <div onClick={() => { checkAndCreateRoom(item.id, setMsg) }} style={{ border: '1px solid black', borderRadius: '10px', margin: '10px', padding: '10px', width: '200px', display: 'flex', justifyContent: 'space-between' }} >
                        <h1> {item.fullname}</h1>
                        <FaEnvelope />
                        <div>
                            <form >
                                <input style={{ backgroundColor: 'beige' }} type="text" placeholder="Type your message here..." onChange={(e) => setNewMessages(e.target.value)} />
                                <button style={{ padding: '10px', marginLeft: '60px', fontSize: 'small', backgroundColor: 'red', borderRadius: '5px', width: '50px', marginTop: '10px' }} onClick={postMessages}>Send</button>
                            </form>
                        </div>

                    </div>

                })}
            </div>
        </div>
    </div>
}