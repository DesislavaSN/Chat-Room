import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Image } from 'expo-image';
import { blurhash } from "../utils/blurhash";
import { useEffect, useState } from "react";
import getRoomId, { formatDate } from "../utils/common";
import { collection, doc, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebaseConfig";


export default function ChatItem({item, router, noBorder, currentUser}) {
    const [lastMessage, setLastMessage] = useState(undefined);

    useEffect(() => {
        const roomId = getRoomId(currentUser?.userId, item?.userId);
        const docRef = doc(db, 'rooms', roomId);
        const messagesRef = collection(docRef, 'messages');
        const q = query(messagesRef, orderBy('createdAt', 'desc'));

        let unsub = onSnapshot(q, (snapshot) => {
            let allMessages = snapshot.docs.map(doc => {
                return doc.data();
            });
            setLastMessage(allMessages[0] ? allMessages[0] : null);
        });
        return unsub;
    }, []);

    // console.log('last msg is: ', lastMessage);

    const opanChatRoom = () => {
        router.push({pathname: '/chatRoom', params: item});
    }

    const renderDate = () => {
        if (lastMessage) {
            let date = lastMessage.createdAt;
            // console.log('==> ', new Date(date?.seconds * 1000).toString().split(' ')[4].slice(0,5));
            return formatDate(new Date(date?.seconds * 1000));
        } 
    }

    const renderLastMessage = () => {
        if(typeof lastMessage == 'undefined') {
            return 'Loading...';
        }
        if (lastMessage) {
            if (currentUser.userId == lastMessage.userId) {
                return 'You: ' + lastMessage.text;
            }
            return lastMessage.text;
        } else {
            return 'Say Hi';
        }
    }

    return (
        <TouchableOpacity
            onPress={opanChatRoom}
            style={!noBorder ? styles.mainCont : styles.noBorderMainCont}>
            <Image
                source={item?.profileUrl}
                style={styles.profileImg}
                placeholder={{ blurhash }}
                transition={500}
            />
            <View style={{flex:1}}>
                <View style={styles.dataCont}>
                    <Text style={{fontWeight: 500,}}>{item?.username}</Text>
                    <Text style={{color:'grey'}}>{renderDate()}</Text>
                </View>
                <Text style={styles.message}>{renderLastMessage()}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    mainCont: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 10,
        borderBlockColor: 'lightgrey',
        borderBottomWidth: 1,
    },
    noBorderMainCont: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 10,
    },
    profileImg: {
        width: 60,
        height: 60,
        borderRadius: 100,
    },
    dataCont: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 8,
    },
    message: {
        paddingLeft: 8,
        color: 'grey',
    }
})