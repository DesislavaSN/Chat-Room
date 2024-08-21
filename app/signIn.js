// Image by vectorjuice on Freepik

import { useRef, useState } from "react";
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TextInput,
    View,
    KeyboardAvoidingView,
    TouchableOpacity,
    Alert,
    ScrollView,
} from "react-native";
import { Octicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Loading from "../components/Loading";
import { useAuth } from "../context/authContext";

const { width, height } = Dimensions.get("screen");

export default function SignIn() {
    const router = useRouter();
    // useRef is a React Hook that lets you reference a value that’s not needed for rendering.
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const [isLoading, setIsLoading] = useState(false);
    const {login} = useAuth();

    const handleLogin = async () => {
        // console.log("user is loging in");
        // console.log(emailRef.current);
        // console.log(passwordRef.current);

        if (emailRef.current == "" || passwordRef.current == "") {
            Alert.alert("Sign In", "Please fill all the fields!");
            return;
        }
        // login process
        setIsLoading(true);
        let response = await login(emailRef.current, passwordRef.current);
        // console.log('Response on LOG IN is >>> ', response);
        setIsLoading(false);
        if (!response.success) {
            Alert.alert('Sign In', response.msg)
        }
    };

    return (
        <ScrollView
            style={styles.container}
            bounces={false}
            showsVerticalScrollIndicator={false}
        >
            <KeyboardAvoidingView>
                <StatusBar style="dark" />
                <View style={styles.imgCont}>
                    <Image
                        style={styles.img}
                        source={require("../assets/images/login2.jpg")}
                    />
                </View>
                <View style={styles.signinCont}>
                    <Text style={styles.signinText}>Sign In</Text>
                    <View style={styles.inputCont}>
                        <Octicons name="mail" size={20} color={"#61677A"} />
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            cursorColor="#61677A"
                            placeholderTextColor="#61677A"
                            onChangeText={(value) => (emailRef.current = value)}
                        />
                    </View>
                    <View style={styles.inputCont}>
                        <Octicons name="lock" size={20} color={"#61677A"} />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            cursorColor="#61677A"
                            placeholderTextColor="#61677A"
                            secureTextEntry
                            onChangeText={(value) => (passwordRef.current = value)}
                        />
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.forgot}
                    onPress={() => console.log("forgot pass pressed")}
                >
                    <Text style={styles.forgotText}>Forgot password?</Text>
                </TouchableOpacity>

                {isLoading ? (
                    <Loading />
                ) : (
                    <TouchableOpacity
                        style={styles.btnCont}
                        onPress={() => handleLogin()}
                    >
                        <Text style={styles.btn}>Sign In</Text>
                    </TouchableOpacity>
                )}

                <View style={styles.bottomCont}>
                    <Text style={styles.account}>Don't have an account? </Text>
                    <TouchableOpacity onPress={() => router.push("signUp")}>
                        <Text style={styles.signup}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imgCont: {
        height: height * 0.4,
        alignItems: "center",
        paddingTop: 35,
        marginBottom: 25,
    },
    img: {
        // width: width * 0.75,
        // height: height * 0.35,

        borderRadius: 100,
        width: width * 0.65,
        height: height * 0.35,
    },
    signinCont: {
        alignItems: "center",
    },
    signinText: {
        fontWeight: "700",
        fontSize: 25,
        marginBottom: 18,
    },
    inputCont: {
        flexDirection: "row",
        width: width * 0.85,
        backgroundColor: "#EEEEEE",
        borderRadius: 10,
        paddingVertical: 10,
        paddingLeft: 10,
        alignItems: "center",
        marginBottom: 10,
    },
    input: {
        marginLeft: 10,
        fontSize: 15,
    },
    forgot: {
        alignItems: "flex-end",
        marginRight: 28,
    },
    forgotText: {
        color: "#61677A",
        fontWeight: "600",
    },
    btnCont: {
        width: width * 0.8,
        backgroundColor: "#7360DF",
        alignSelf: "center",
        alignItems: "center",
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 15,
    },
    btn: {
        color: "white",
        fontWeight: "500",
        fontSize: 20,
    },
    bottomCont: {
        alignSelf: "center",
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    account: {
        color: "#61677A",
        fontWeight: "400",
    },
    signup: {
        color: "#7360DF",
        fontWeight: "700",
        fontSize: 15,
    },
});
