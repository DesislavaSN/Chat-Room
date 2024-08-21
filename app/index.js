import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';

export default function StartPage() {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Chat Room</Text>
            <ActivityIndicator style={styles.activity}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    title: {
        paddingTop: 150,
        fontWeight: '800',
        fontSize: 33,
        color: '#C499F3',
    },
    activity: {
        marginTop: 150,
        
    }
})