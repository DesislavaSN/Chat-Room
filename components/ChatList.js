import { FlatList, StyleSheet, Text, View } from "react-native";
import ChatItem from "./ChatItem";
import { useRouter } from "expo-router";

export default function ChatList({users, currentUser}) {
    const router = useRouter();
    return (
        <View style={styles.mainCont}>
            <FlatList
                data={users}
                keyExtractor={item => Math.random()}
                contentContainerStyle={{flex: 1, paddingVertical: 25,}}
                showsVerticalScrollIndicator={false}
                renderItem={({item, index}) => <ChatItem 
                    item={item} 
                    index={index}
                    noBorder={index+1 == users.length} 
                    router={router} 
                    currentUser={currentUser}
                />}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    mainCont: {
        flex: 1,
        // backgroundColor: 'yellow'
    }
})