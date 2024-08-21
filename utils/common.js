/*
this function returns the roomId always in the same order - doesn't matter who has logged in - user 1 or user 2 
and using that roomId you can get all the messages for that person/user
*/ 
export default function getRoomId(userId1, userId2) {
    const sortedId = [userId1, userId2].sort();
    const roomId = sortedId.join('-');
    return roomId;
}

/*
Formated the Date from created message -> from seconds and nanoseconds to real date:
*/
export const formatDate = date => {
    const day = date.getDate();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    const getMonth = months[date.getMonth()];
    const myDate = day + ' ' + getMonth;
    return myDate;  
}

