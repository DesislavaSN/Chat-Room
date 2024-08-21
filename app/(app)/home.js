import {  Text, View, TouchableOpacity, Image, StyleSheet, } from "react-native";
import { useAuth } from "../../context/authContext";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import ChatList from "../../components/ChatList";
import Loading from "../../components/Loading";
import { usersRef } from "../../firebaseConfig";
import { getDocs, query, where } from "firebase/firestore"; 
// import { db } from '../../firebaseConfig';


export default function Home() {
    const {user} = useAuth();
    // console.log('got USER >>>', user);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if(user?.uid){
            getUsers();
        }
    }, []);
    
    //after log in all the existing Users show up on screen:
    const getUsers = async () => {
        // fetch data from firebase:
        const q = query(usersRef, where('userId', '!=', user?.uid));        
        let data = [];
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(doc => {
            data.push({...doc.data()});
        });
        setUsers(data);
    }
    // console.log('ALL USERS --- ', users);
    
    return (
        <View style={styles.mainCont}>
            <StatusBar style="light" />

            {users.length > 0 ? (
                <ChatList users={users} currentUser={user} />
                ) : (
                    <View style={{flex: 1, alignItems: 'center', marginTop: 200, }}>
                        <Loading size={30}/>
                    </View>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    mainCont: {
        flex: 1,
        backgroundColor: 'white',
    },
    img: {
        width: 200,
        height: 200,
        borderWidth: 1,
        borderColor: 'red',
    }
});