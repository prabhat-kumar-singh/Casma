import { useEffect, useRef, useState } from "react"
import { View, Text, TouchableOpacity } from "react-native"

import { Icon } from "react-native-material-ui";

//database
import { getUser, getGlobalColor, setGlobalColor } from "../../models/User";
import { primaryHeading, primaryText, secondaryHeading } from "../dimensions";
import { FlatList } from "react-native-gesture-handler";

const Profile = ({navigation}) =>{
    const [themeColor, setThemeColor] = useState("darkblue")
    const listOfColors = useRef([]);
    const [user, setUser] = useState({});

    const getColor = async () => {
        let color = {};
        try {
            color = await getGlobalColor();
            setThemeColor(color.current)
            listOfColors.current = color.list;
        } catch (error) {
            console.log("Unable to fetch color");
        }
    }

    const getUserDetail = async () => {
        try {
            let userData = await getUser();
            setUser(userData);
        } catch (error) {
            console.log("Unable to get User Information");
            setUser({email:"guestuser123@gmail.com", name:"Guest123"});
        }
    }

    const changeColor = async (color) => {
        try {
            await setGlobalColor(color);
            console.log("Color changed successfully");
        } catch (error) {
            console.log("unable to change color")
        }
    }

    useEffect(()=>{
        getColor();
        getUserDetail();
    }, [user])

    useEffect(()=>{
        getColor();
    }, [themeColor])

    return(
        <View style={{flex:1, width:"100%", alignItems:"center"}}>
          
            <View style={{alignItems:"center"}}>
                <Icon name="person" size={150} />
                <Text style={{fontSize:primaryHeading, color: themeColor}}>{user.name} 
                    <TouchableOpacity onPress={()=> navigation.navigate("UpdateProfile", {
                        themeColor: themeColor,
                        user: user
                    })}>
                        <Icon name="edit" size={20} /> 
                    </TouchableOpacity>
                </Text>
                <Text style={{fontSize:secondaryHeading}}>{user.email}</Text>
            </View>

            <View style={{marginTop:20}}>
                <Text style={{fontSize:primaryText, paddingVertical:10}}>Choose Theme Color</Text>
                <FlatList
                  data={listOfColors.current}
                  renderItem={({item})=><TouchableOpacity onPress={()=>{
                    setThemeColor(item);
                    changeColor(item)
                  }} style={{height:30, width:30, borderRadius:30/2, backgroundColor:item, marginHorizontal:5}}></TouchableOpacity>}
                  horizontal={true}
                />
            </View>
        </View>
    )
}

export default Profile