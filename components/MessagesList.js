import { ScrollView } from "react-native";
import MessageItem from "./MessageItem";

export default function MessagesList({messages, scrollViewRef, currentUser}) {  
      
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            onContentSizeChange={() => scrollViewRef?.current?.scrollToEnd({animated: true})}
            ref={scrollViewRef}
            style={{flex:1}}
            
        >
            {
                messages.map((item, index) => {
                    return(
                        <MessageItem key={index} message={item} currentUser={currentUser} /> 
                    )
                })
            }
        </ScrollView>
             
    );
};