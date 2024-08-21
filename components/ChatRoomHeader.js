import { Stack } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Entypo from '@expo/vector-icons/Entypo';
import { Image } from "expo-image";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function ChatRoomHeader({user, router}) {
    return (
        <Stack.Screen
            options={{
                title: '',
                headerShadowVisible:(false),
                headerBackVisible:(false),
                headerLeft:() => {
                    return(
                        <View style={styles.leftHeaderCont}>
                            <TouchableOpacity onPress={() => router.back()}>
                                <Entypo name="chevron-left" size={30} color="#737373" />
                            </TouchableOpacity>
                            <Image
                                source={user.profileUrl}
                                style={styles.userImg}
                            />
                            <Text style={styles.username}>{user?.username}</Text>
                        </View>
                    )
                },
                headerRight: ()=>{
                    return(
                        <View style={styles.rightHeaderCont}>
                        <TouchableOpacity onPress={() => console.log('Call icon btn pressed')}>
                            <Ionicons name="call" size={24} color="#737373" style={{marginRight: 20}}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => console.log('Video icon btn pressed')}>
                            <Ionicons name="videocam" size={26} color="#737373" />
                        </TouchableOpacity>
                        </View>
                    )
                }
            }}
        />
    );
};

const styles = StyleSheet.create({
    leftHeaderCont: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    userImg: {
        width: 40,
        height: 40,
        borderRadius: 100,
        marginLeft: 5,
    },
    username: {
        color: '#737373',
        fontSize: 20,
        fontWeight: '700',
        marginLeft: 15,
    }, 
    rightHeaderCont:{
        marginRight: 8,
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
})