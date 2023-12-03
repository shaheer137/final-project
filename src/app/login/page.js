'use client'
import { useRouter } from "next/navigation"
import { loginWithFacebook } from "../config/firebase";
import { useState } from "react";

export default function Login() {
    const [user, setUser] = useState(null)
    const router = useRouter()

    const onLogin = async () => {
        try {
            const login = await loginWithFacebook()
            router.push('./dashboard', { scroll: false })
        } catch (error) {
            console.error(error)
        }
    }
    console.log('user', user)

    return <div className="signinContainer">
        <h1 style={{ marginTop: '20px' }}>Welcome!</h1>
        <p>Sign up or log in to continue</p>
        <button style={{ width: '90%', height: '35px', fontSize: 'large', borderRadius: '5px', color: 'white', backgroundColor: 'blue', marginBottom: '10px', border: '1px solid blue' }} onClick={onLogin}>Continue with Facebook</button>
        <button style={{ width: '90%', height: '35px', fontSize: 'large', borderRadius: '5px', color: 'black', backgroundColor: 'white', marginBottom: '10px', border: '1px solid grey' }} >Continue with Google</button>
        <button style={{ width: '90%', height: '35px', fontSize: 'large', borderRadius: '5px', color: 'white', backgroundColor: 'black', marginBottom: '10px', border: '1px solid black' }} >Continue with Apple</button>
        <p>or</p>
        <button style={{ width: '90%', height: '35px', fontSize: 'large', borderRadius: '5px', color: 'white', backgroundColor: 'deeppink', marginBottom: '10px', border: '1px solid deeppink' }}  >Sign In</button>
        <p>By signing up, you agree to our <span style={{ color: 'deeppink' }}>Terms and Conditions</span> and <span style={{ color: 'deeppink' }}>Privacy Policy</span></p>
    </div>
}