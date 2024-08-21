import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore"; 

export default AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [ isAuthenticated, setIsAuthenticated] = useState(undefined); // to redirect the user -> to signIn or to Home page
    
    useEffect(() => {
        // if isAuthenticated == true - user has signed in and if it's false - user is NOT authenticated
        // setIsAuthenticated(false);

        /* onAuthStateChanged() - from firebase: tazi fun. priema 2 parametara: 
            -1. auth (koito nie sme inicializirali vuv firebaseConfig file);
            -2. callback f. (user) za da proverim dali ima user i ako da -> setUser(user);
        */ 
        const unsub = onAuthStateChanged(auth, (user) => {
            if(user) {
                setIsAuthenticated(true);
                setUser(user);
                updateUserData(user.uid);
            } else {
                setIsAuthenticated(false);
                setUser(null);
            }
        });
        return unsub;
    },[]);

    const updateUserData = async (userId) => {
        const docRef = doc(db, 'users', userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            let data = docSnap.data();
            setUser({...user, username: data.username, profileUrl: data.profileUrl, userId: data.userId});
            // console.log('DATA >>>> ', data);
        } else {
            console.log('docSnap.data() is undefined - updateUserData()');
            console.log('No such document!');
        }
    };

    const updateProfileUrl = async (newProfileUrl) => {
        const userDocRef = doc(db, 'users', user.userId);
        await updateDoc(userDocRef, {
            profileUrl: newProfileUrl
        });
        setUser({...user, profileUrl: newProfileUrl});
    };

    const login = async (email, password) => {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            // console.log('Loged existing user >>> ', response);
            return {success: true}
        } catch (error) {
            let msg = error.message;
            console.log('ERROR LOG IN --', error.message);
            if (msg.includes('(auth/invalid-credential)')) {
                msg = 'Invalid Credential';
            }
            return {success: false, msg}
        }
    }

    const register = async (email, password, username, profileUrl) => {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password );
            // console.log('NEW USER IS >>> ', response);

            await setDoc(doc(db, 'users', response?.user?.uid), {
                username,
                profileUrl,
                userId: response?.user?.uid
            });
            return {success: true, data: response?.user};
        } catch (error) {
            let msg = error.message;
            if(msg.includes('(auth/invalid-email)')) {
                msg = 'Invalid email';
            }
            if (msg.includes('(auth/email-already-in-use)')) {
                msg = 'This email is already in use.'
            }
            return {success: false, msg};
        }
    }
    
    const logout = async () => {        
        try {
            await signOut(auth);
            return {success: true};
        } catch (error) {
            return {success: false, msg: error.message, error: error}
        }
    }

    /*
        AuthContext.Provider vrushtame sustoqnie za ydostoverenie i svurzanite s nego functions koito sa dostupni za vsichki children 
        (dushterni komponenti - tezi posochenite vuv 'value'). Te sa dostupni chrez hook useAuth koeto pozvolqva na 
        komponentite da izpolzvat dannite za ydostoverqvane i deistviq v ramkite na app-a
    */
    return (
        <AuthContext.Provider value={{user, isAuthenticated, login, logout, register, updateProfileUrl, }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    //useContext is a React Hook that lets you read and subscribe to context from your component.
    const value = useContext(AuthContext);

    if(!value) {
        throw new Error('useAuth must be wrapped inside AuthContext.Provider');
    }
    return value;
}