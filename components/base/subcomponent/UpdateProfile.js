import { StyleSheet, Text, TouchableOpacity, View, TextInput, Alert } from "react-native"
import { useState } from "react";

import { isValidProfile } from "./helper";
import AsyncStorage from "@react-native-async-storage/async-storage";
//database


const UpdateProfile = ({route, navigation}) =>{

    const { themeColor, user } = route.params;

    const [data, setData] = useState({
        name:user.name,
        email:user.email
    })

    const update = (name, value) =>{
        setData({...data, [name]: value});

    }

    const save = async () => {
        
        let validated = isValidProfile(data);
        if(validated){
            try {
                await AsyncStorage.setItem("User", JSON.stringify(data), ()=>{
                    Alert.alert("User Data updated successfully!");
                });
                navigation.goBack();
    
            } catch (error) {
                console.log("--Some error occured", error);
            }
        }else{
            Alert.alert("Invalid Input?", "Name must contain atleast 5 character\nName and Email field cannot be empty");
        }
        

    }

    return(
        <View style={{flex:1}}>
            
            <View style={{paddingHorizontal:20}}>
                <View style={styles.textInput}>
                    <Text style={{color: themeColor, fontWeight:"bold"}}>Name</Text>
                    <TextInput value={data.name} style={{width:"80%"}} onChangeText={(text)=>{
                        update("name", text)
                    }}/>
                </View>

                <View style={styles.textInput}>
                    <Text style={{color: themeColor, fontWeight:"bold"}}>Email</Text>
                    <TextInput value={data.email} style={{width:"80%"}} onChangeText={(text)=>{
                    update("email", text)
                    }} />
                </View>
            </View>

            <TouchableOpacity style={[styles.btn, {backgroundColor:themeColor}]} onPress = {save}>
                <Text style={{color:"#fff", fontWeight:"bold"}}>UPDATE</Text>
            </TouchableOpacity>
        </View>
    )
}

export default UpdateProfile;

const styles = StyleSheet.create({
    container:{
        width:"100%"
    },
    mode:{
        width:"85%",
        marginTop:15,
        marginLeft:"auto",
        marginRight:"auto",
        flexDirection:"row",
        justifyContent:"space-around"
    },
    textInput:{
        border: 2,
        borderWidth: 1,
        paddingVertical:10,
        paddingHorizontal:4,
        marginVertical: 5
    },
    btn:{
        position:"absolute",
        bottom:30,
        width:"90%",
        marginRight:"auto",
        marginLeft:10,
        alignItems:"center",
        paddingVertical:10
    }
})