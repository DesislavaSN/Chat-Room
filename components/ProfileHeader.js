import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useAuth } from "../context/authContext";
import Entypo from '@expo/vector-icons/Entypo';
import { useRouter } from "expo-router";

export default function ProfileHeader() {
    const {user} = useAuth(); 
    const router = useRouter();

    return (
        <View style={styles.mainCont}>
            <TouchableOpacity onPress={() => router.back()}>
                <Entypo name="chevron-left" size={35} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.userName}>Hi, {user.username}</Text>
                
        </View>
    )
}

const styles = StyleSheet.create({
    mainCont: {
        backgroundColor: '#C499F3',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomLeftRadius: 35,
        borderBottomRightRadius: 35,
        paddingVertical: 20,
        paddingHorizontal: 15,
        alignItems: 'center',
    },
    userName: {
        color: '#fff',
        fontSize: 25,
        fontWeight: '800'
    },
    
})