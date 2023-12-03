'use client'
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { post } from "../config/firebase"

export default function PostAd() {
    const router = useRouter()
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [file, setFile] = useState()
    const [loading, setLoading] = useState(false)

    const addPost = async () => {
        await post(title, description, file[0])
        router.push('/dashboard')
    }

    return (<div style={{ marginTop: 80 }} className="postAdd"> 
        <h3 style={{ position: 'relative', left: 140, fontSize: 25 }} >Post</h3><br/>
        <input style={{border: '1px solid black', width: '330px', height: '35px'}} onChange={(e) => setDescription(e.target.value)} placeholder=" DESCRIPTION" /> <br /> <br />
        <input className="postfile" onChange={(e) => setFile(e.target.files)} type="file" /><br /><br />
        {loading ? <img src='https://i.gifer.com/ZKZg.gif' width='20' />
            :
            <center> <button style={{ fontSize: 20, marginLeft: '120px' }} className="button-post" onClick={addPost}>Submit</button> </center>
        }
    </div>)
}