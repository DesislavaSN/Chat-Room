import { StyleSheet, Text, View } from "react-native";
import { formatDate } from "../utils/common";
import { useEffect, useState } from "react";

export default function MessageItem({message, currentUser}) {  
    const [time, setTime] = useState('');
    const [theDate, setTheDate] = useState('');

    useEffect(() => {
        renderTime();
    },[])

    const renderTime = () => {
        if (message) {
            let date = message.createdAt;
            // console.log('==> ', new Date(date?.seconds * 1000).toString().slice(4,10));
            setTime(new Date(date?.seconds * 1000).toString().split(' ')[4].slice(0,5));
            setTheDate(new Date(date?.seconds * 1000).toString().slice(4,10));
        }
    }
      
    if(currentUser?.userId == message?.userId) {
        // my message - shows message at the RHS
        return (
            <View style={styles.mainContSender}>
                <View style={styles.msgContSender}>
                    <Text>{message.text}</Text>
                </View>
                <Text style={styles.timeMsgSender}>{time}, {theDate}</Text>
            </View>
        )
    } else {
        return (
            // other user - shows message at the LHS
            <View style={styles.mainContReciever}>
                <View style={styles.msgContReciever}>
                    <Text>{message?.text}</Text>
                </View>
                <Text style={styles.timeMsgReciever}>{time}, {theDate}</Text>
            </View>
        )
    }
    
}

const styles=StyleSheet.create({
    mainContSender: {
        flex: 1,
        alignItems: 'flex-end',
    },
    msgContSender: {
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 7,
        paddingVertical: 6,
        width: '40%',
        backgroundColor: '#fff',
        marginTop: 10,
        marginRight: 15,
        marginBottom: 3,
    },
    mainContReciever: {
        flex: 1,
        alignItems: 'flex-start',
    },
    msgContReciever: {
        borderColor: '#BEADFA',
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 7,
        paddingVertical: 6,
        padding: 5,
        width: '40%',
        backgroundColor: '#DFCCFB',
        marginTop: 10,
        marginLeft: 15,
        marginBottom: 3,
    },
    timeMsgSender: {
        marginBottom: 5,
        marginRight: 17,
        color: '#686D76',
        fontSize: 12,

    },
    timeMsgReciever: {
        marginBottom: 5,
        marginLeft: 17,
        color: '#686D76',
        fontSize: 12,
    }
});