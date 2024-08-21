import { Image } from "expo-image";
import { Alert, Dimensions, Keyboard, KeyboardAvoidingView, 
    TouchableWithoutFeedback, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View 
} from "react-native";
import { blurhash } from '../../utils/blurhash'
import { useAuth } from "../../context/authContext";
import { useRef } from "react";
import { useState } from "react";
import Loading from "../../components/Loading";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('screen');

export default function ProfileUser() {
    const {user, updateProfileUrl, logout} = useAuth(); 
    // console.log('USER > ', user);

    const textRef = useRef('');
    const inputRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleUpdateImage = async () => {
        // console.log(' ==> ', profileUrlRef.current);
        let newTextRef = textRef.current.trim();
        if (textRef.current == '') {
            Alert.alert('Message', 'Please fill up the field!');
            return;
        }
        setIsLoading(true);
        await updateProfileUrl(newTextRef);
        setIsLoading(false);
        if(inputRef) {
            inputRef?.current?.clear();
        }
    }

    const handleLogOut = async () => {
        await logout();
    }

    return (
        <KeyboardAvoidingView
            style={styles.keyboradViewCont}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.mainCont}>
                    <View style={styles.imgCont}>
                        {
                            isLoading ? (
                                <Loading />
                            ) : (
                                <Image
                                    style={styles.userImg}
                                    source={user.profileUrl}
                                    placeholder={{ blurhash }}
                                    transition={500}
                                />
                            ) 
                        }
                        <View style={styles.inputCont}>
                            <TextInput
                                ref={inputRef}
                                placeholder='Update Image'
                                cursorColor='#61677A'
                                placeholderTextColor='#61677A'
                                style={styles.input}
                                onChangeText={value => textRef.current = value}
                            />
                            <TouchableOpacity style={{paddingHorizontal: 20,}} onPress={handleUpdateImage}>
                                <MaterialIcons name="system-update-alt" size={24} color="#61677A" />
                            </TouchableOpacity>
                        </View>
                        
                        {/* <View style={styles.infoCont}>
                            <Text>Username: {user.username}</Text>
                        </View> */}
                    </View>

                    <View style={styles.signOutCont}>
                        <TouchableOpacity onPress={handleLogOut} style={styles.signOutBtn}>
                            <Text style={styles.textBtn}>Sign Out</Text>
                        </TouchableOpacity>
                    </View>
                    
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

/*
<Image
    style={styles.userImg}
    source={user.profileUrl}
    placeholder={{ blurhash }}
    transition={500}
/>

*/

const styles = StyleSheet.create({
    keyboradViewCont: {
        flex: 1,
    },
    mainCont: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
     infoCont: {
        marginTop: 20,
    },
    imgCont: {
        flex: 3,
        marginTop: 25,
        alignItems: 'center',
        // borderWidth: 1,
    },
    userImg: {
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: '#EEEEEE'
    },
    inputCont: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 15,
        backgroundColor: '#EEEEEE',
        borderRadius: 20,
        paddingVertical: 10,
        width: width * 0.60,
        
    },
    input: {
        fontSize: 15,
        paddingHorizontal: 20,
    },
    updateBtn: {
        backgroundColor: '#EEEEEE',
        borderRadius: 20,
        paddingVertical: 10,
        // paddingLeft: 5,
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    signOutCont :{
        marginVertical: 30,
        width: width * 0.30,
    },
    signOutBtn :{
        alignItems: 'center',
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: '#C499F3',
        borderRadius: 20,
        backgroundColor: '#C499F3'
    },
    textBtn :{
        color: '#fff',
        fontWeight: '700',
        fontSize: 17,
    },
    
})