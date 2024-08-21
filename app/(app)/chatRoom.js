import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar, StyleSheet, Text, TextInput, View, TouchableOpacity, KeyBoardAvoidingView, Keyboard, ScrollView, KeyboardAvoidingView, Platform, Alert } from "react-native";
import ChatRoomHeader from "../../components/ChatRoomHeader";
import MessagesList from "../../components/MessagesList";
import { useEffect, useRef, useState } from "react";
import Feather from '@expo/vector-icons/Feather';
import { useAuth } from "../../context/authContext";
import getRoomId from "../../utils/common";
import { setDoc, doc, Timestamp, collection, addDoc, query, orderBy, onSnapshot,  } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export default function ChatRoom() {
    const item = useLocalSearchParams(); //second user
    const {user} = useAuth(); // logged in user 
    const router = useRouter();
    // console.log('item is: ', item);
    const [messages, setMessages] = useState([]);
    // creating a textRef and using useRef() upgrading the app will not rerender the whole app:
    const textRef = useRef(''); 
    // to clear the text input after sending the message:
    const inputRef = useRef(null);
    const scrollViewRef = useRef(null);
    

    useEffect(() => {
        createRoomIdNotExist();
        const roomId = getRoomId(user?.userId, item?.userId);
        const docRef = doc(db, 'rooms', roomId);
        const messagesRef = collection(docRef, 'messages');
        const q = query(messagesRef, orderBy('createdAt', 'asc'));

        let unsub = onSnapshot(q, (snapshot) => {
            let allMessages = snapshot.docs.map(doc => {
                return doc.data();
            });
            setMessages([...allMessages]);
        });

        const KeyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow', updateScrollView
        )

        return () => {
            unsub;
            KeyboardDidShowListener.remove();
        };

    }, []);

    const updateScrollView = () => {
        setTimeout(() => {
            scrollViewRef?.current?.scrollToEnd({animated: true});
        }, 100);
    };

    const createRoomIdNotExist = async () => {
        // roomId
        let roomId = getRoomId(user?.userId, item?.userId);
        // set that info into the datebase - Firbase:
        await setDoc(doc(db, 'rooms', roomId), {
            roomId,
            createdAt: Timestamp.fromDate(new Date()),
        });
    };

    const handleSendMessage = async () => {
        let message = textRef.current.trim();
        if(!message){
            return;
        }
        try {
            let roomId = getRoomId(user?.userId, item?.userId);
            //get docRef from the chat we r in:
            const docRef = doc(db, 'rooms', roomId);
            // create a collection of messages inside a document:
            const messagesRef = collection(docRef, 'messages');
            textRef.current = '';
            if (inputRef) {
                inputRef?.current?.clear();
            }
            //in collection 'message' we create a document which is the new message: 
            const newDoc = await addDoc(messagesRef, {
                // we can add more properties to this object for example if the user seen the message or not, and so on...
                userId: user?.userId, 
                text: message,
                profileUrl: user?.profileUrl,
                username: user?.username,
                createdAt: Timestamp.fromDate(new Date()),
                id: Math.floor(Math.random()* 10000) + 1,
            });
            // console.log('new message id:', newDoc.id);
        } catch (error) {
            Alert.alert('Message', error.message);
        }
    }
    
    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{flex:1}} keyboardVerticalOffset={55} >
            <ScrollView contentContainerStyle={{flex:1}} style={{flex:1}} showsVerticalScrollIndicator={false} bounces={false} >
                <View style={styles.mainCont}>
                    <StatusBar style='dark' />
                    <ChatRoomHeader user={item} router={router} />
                    <View style={styles.divider} />
                    <View style={styles.messagesCont}>
                        <View style={{flex: 1}}>
                            <MessagesList
                                scrollViewRef={scrollViewRef}
                                messages={messages}
                                currentUser={user}
                            />
                        </View>
                    </View>
                    <View style={styles.inputCont}>
                        <View style={styles.innerInputCont}>
                            <TextInput
                                ref={inputRef}
                                // it won't rerendare the page after typing and correcting the text:
                                onChangeText={value => textRef.current = value}
                                placeholder="Type here ..."
                                style={styles.messageInput}
                                cursorColor={'#737373'}
                            />
                            <TouchableOpacity 
                                style={styles.sendBtnCont} 
                                onPress={() => {
                                    Keyboard.dismiss; 
                                    handleSendMessage();
                                }}
                            >
                                <Feather name="send" size={24} color="grey"/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    mainCont: {
        flex: 1,
        backgroundColor: '#fff',
    },
    divider: {
        borderColor: 'lightgrey',
        borderWidth: 0.5,
        marginTop: 13,
    },
    messagesCont: {
        flex: 1,
        overflow: 'visible',
        backgroundColor: '#F1F1F1'
    }, 
    inputCont: {
        alignItems: 'center',
        backgroundColor: '#F1F1F1',
        paddingBottom: 20,
    },
    innerInputCont: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 100,
        marginHorizontal: 25,
        backgroundColor: '#fff',
    },
    messageInput: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 100,
    }, 
    sendBtnCont: {
        borderRadius: 100,
        backgroundColor: '#F1F1F1',
        padding: 7,
        marginRight: 10,
    },
})