import AsyncStorage from "@react-native-async-storage/async-storage";

const getUser = async () => {

    try {
        const res = await AsyncStorage.getItem("User")
        return JSON.parse(res);
        
    } catch (error) {
        console.log("User Does not exists");
        return {};
    }
}

const setUser = async (user) => {
    try {
        await AsyncStorage.setItem("User", JSON.stringify(user), ()=>{
            console.log("User Created Successfully...", user);
        });
        
        return true;
    } catch (error) {
        console.log("Unable to Create User, try again!. Error: ", error);
        return false;
    }
}


const storeColor = async (data) => {
    let color = data?data:{current:"#4DD637", list:["darkblue", "#E21717", "#1B98F5", "#23C4ED", "#383CC1", "#120E43", "#4DD637", "#8D3DAF"]};
    try {
        await AsyncStorage.setItem("GlobalColor", JSON.stringify(color) );
    } catch (error) {
        console.log("Unable to Store color");
    }
}

const getGlobalColor = async () =>{
    let color = {};
    try {
        color = await AsyncStorage.getItem('GlobalColor');
    } catch (error) {
        color = {current:"#4DD637", list:["darkblue", "#E21717", "#1B98F5", "#23C4ED", "#383CC1", "#120E43", "#4DD637", "#8D3DAF"]}
        await storeColor();
    }

    return JSON.parse(color);
}

const setGlobalColor = async (color) => {
    let data = {};
    try {
        data = await getGlobalColor();
    } catch (error) {
        console.log("unable to set color");
        return;
    }

    data.current = color;
    try {
        await storeColor(data);
        console.log("Successfully change theme color")
    } catch (error) {
        console.log("Unable to store color details")
    }
}

export {getUser, setUser, storeColor, getGlobalColor, setGlobalColor};