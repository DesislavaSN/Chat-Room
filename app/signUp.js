import { AntDesign, Octicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, TextInput, View, KeyboardAvoidingView, TouchableOpacity, Alert, ScrollView } from 'react-native';
import Loading from '../components/Loading';
import { useAuth } from '../context/authContext';

// Image by vectorjuice on Freepik
const { width, height } = Dimensions.get('screen');

export default function SignUp() {
    const router = useRouter();
    // useRef is a React Hook that lets you reference a value that’s not needed for rendering. 
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const usernameRef = useRef('');
    const profileRef = useRef('');   
    const [isLoading, setIsLoading] = useState(false);
    const {register} = useAuth();

    // https://assets.petco.com/petco/image/upload/f_auto,q_auto/hamster-care-sheet-hero

    const handleRegister = async () => {
        // console.log('New user is registering');
        // console.log(emailRef.current);
        // console.log(passwordRef.current);
        // console.log(usernameRef.current);
        // console.log(profileRef.current);

        if (usernameRef.current == '' || emailRef.current == '' || passwordRef.current == '' || profileRef.current == '') {
            Alert.alert('Sign Up', 'Please fill all the fields!');
            return;
        }
        // register process
        setIsLoading(true);
        let response = await register(emailRef.current, passwordRef.current,usernameRef.current, profileRef.current);
        setIsLoading(false);
        // console.log('Response on REGISTER is >>> ', response);
        if (!response.success) {
            Alert.alert('Sign Up:', response.msg);
        }
    }

    return (
        <ScrollView style={styles.container} bounces={false} showsVerticalScrollIndicator={false}>
            <KeyboardAvoidingView>
                <StatusBar style="dark" />
                <View style={styles.imgCont}>
                    <Image style={styles.img} source={require('../assets/images/register2.jpg')} />
                </View>
                <View style={styles.signinCont}>
                    <Text style={styles.signinText}>Sign Up</Text>
                    <View style={styles.inputCont}>
                        <AntDesign name='user' size={22} color={'#61677A'} />
                        <TextInput
                            style={styles.input}
                            placeholder='Username'
                            cursorColor='#61677A'
                            placeholderTextColor='#61677A'
                            onChangeText={value => usernameRef.current = value}
                        />
                    </View>
                    <View style={styles.inputCont}>
                        <Octicons name='mail' size={20} color={'#61677A'} />
                        <TextInput
                            style={styles.input}
                            placeholder='Email'
                            cursorColor='#61677A'
                            placeholderTextColor='#61677A'
                            onChangeText={value => emailRef.current = value}
                        />
                    </View>
                    <View style={styles.inputCont}>
                        <Octicons name='lock' size={20} color={'#61677A'} />
                        <TextInput
                            style={styles.input}
                            placeholder='Password'
                            cursorColor='#61677A'
                            placeholderTextColor='#61677A'
                            secureTextEntry
                            onChangeText={value => passwordRef.current = value}
                        />
                    </View>
                    <View style={styles.inputCont}>
                        <MaterialIcons name='portrait' size={24} color={'#61677A'} />
                        <TextInput
                            style={styles.input}
                            placeholder='Profile url'
                            cursorColor='#61677A'
                            placeholderTextColor='#61677A'
                            onChangeText={value => profileRef.current = value}
                        />
                    </View>
                </View>

                <TouchableOpacity style={styles.forgot} onPress={() => console.log('forgot pass pressed')}>
                    <Text style={styles.forgotText}>Forgot password?</Text>
                </TouchableOpacity>

                {isLoading ? (
                    <Loading />
                ) : (
                    <TouchableOpacity style={styles.btnCont} onPress={() => handleRegister()}>
                        <Text style={styles.btn}>Sign Up</Text>
                    </TouchableOpacity>
                )}

                <View style={styles.bottomCont}>
                    <Text style={styles.account}>Already have an account? </Text>
                    <TouchableOpacity onPress={() => router.push('signIn')}>
                        <Text style={styles.signup}>Sign In</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imgCont: {
        height: height * 0.40,
        alignItems: 'center',
        paddingTop: 35,
    },
    img: {
        // width: width * 0.65,
        height: height * 0.35,
    },
    signinCont: {
        // borderWidth: 1,
        // borderColor: 'red',
        alignItems: 'center',
    },
    signinText: {
        fontWeight: '700',
        fontSize: 25,
        marginBottom: 18,
    },
    inputCont: {
        flexDirection: 'row',
        width: width * 0.85,
        backgroundColor: '#EEEEEE',
        borderRadius: 10,
        paddingVertical: 10,
        paddingLeft: 10,
        alignItems: 'center',
        marginBottom: 10,
    },
    input: {
        marginLeft: 10,
        fontSize: 15,
    },
    forgot: {
        alignItems: 'flex-end',
        marginRight: 28,
    },
    forgotText: {
        color: '#61677A',
        fontWeight: '600',
    },
    btnCont: {
        width: width * 0.80,
        backgroundColor: '#FF76CE',
        alignSelf: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 15,
    },
    btn: {
        color: 'white',
        fontWeight: '500',
        fontSize: 20,

    },
    bottomCont: {
        alignSelf: 'center',
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    account: {
        color: '#61677A',
        fontWeight: '400',
    },
    signup: {
        color: '#FF76CE',
        fontWeight: '700',
        fontSize: 15,
    }
})