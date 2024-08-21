import { Text, View, StyleSheet, Platform, TouchableOpacity, } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from 'expo-image';
import { useAuth } from "../context/authContext";
import { blurhash } from '../utils/blurhash';
import {
    Menu,
    MenuOptions,
    MenuTrigger,
} from 'react-native-popup-menu';
import { MenuItem } from "./CustomMenuItems";
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from "expo-router";

const ios = Platform.OS === 'ios';

export default function HomeHeader() {
    const {top}= useSafeAreaInsets();
    const {logout, user} = useAuth();    
    const router = useRouter();

    const handleLogOut = async () => {
        // console.log('logged out!'); 
        await logout();
    }  

    return (
        <View style={[{paddingTop: ios ? top : top+25}, styles.mainCont]}>
            <View>
                <Text style={styles.header}>Chats</Text>
            </View>

            <View style={styles.imgCont}>
                <Menu>
                    <MenuTrigger customStyles={{
                        triggerWrapper: {
                            // trigger wrapper style
                        }
                    }}>
                        <Image
                            style={styles.profileImg}
                            source={user?.profileUrl}
                            placeholder={{ blurhash }}
                            transition={500}
                        />
                    </MenuTrigger>
                    <MenuOptions customStyles={{
                        optionsContainer: {
                            borderRadius: 10,
                            borderCurve: 'continuous',
                            marginTop: 35,
                            marginLeft: -20,
                            backgroundColor: 'white',
                            width: 150,
                        }
                    }}>
                        <MenuItem 
                            text='Profile' 
                            action={() => router.push('profileUser')} 
                            value={null}  
                            icon={<Feather name="user" size={24} color="#7D7C7C" />}
                        />
                        <Divider />
                        <MenuItem 
                            text='Sign Out' 
                            action={handleLogOut}
                            value={null}
                            icon={<MaterialIcons name="logout" size={24} color="#7D7C7C" />}
                        />
                    </MenuOptions>
                </Menu>
            </View>
        </View>
    )
}

const Divider = () =>{
    return (
        <View style={{ height: 5 ,width: '100%', color: '#000', }} />
    )
}

const styles = StyleSheet.create({
    mainCont:{
        backgroundColor: '#C499F3',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomLeftRadius: 35,
        borderBottomRightRadius: 35,
        paddingBottom: 25,
        paddingHorizontal: 10,
        alignItems: 'center',
    },
    header: {
        fontWeight: '700',
        fontSize: 22,
        color: '#fff',
    },
    imgCont: {
        flex: 1,
        alignItems: 'flex-end',
    },
    profileImg: {
        width: 30,
        height: 30,
        borderRadius: 100,
    }
    
});