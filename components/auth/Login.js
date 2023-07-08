import { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity, useNavigation } from "react-native";
import { Icon } from "react-native-material-ui"

//importing dimensions
import { extraLarge, textSize } from "../dimensions"

//helper functions
import { getUser, setUser, storeColor } from "../../models/User";


const Login = ({ navigation }) =>{
    const [userData, setUserData] = useState({
        email:"",
        name:""
    })

    const fetchUser = async () => {
        let user = undefined;
        try {
            user = await getUser();
        } catch (error) {
            console.log("User does not exists");
        }
        

        if(user && Object.keys(user).length!==0){
            
            navigation.replace("Home");
            //navigation.navigate("Home");
        }
    }

    useEffect(()=>{
        fetchUser()
        storeColor();
    }, [])

    const saveUser = () => {
        if(setUser(userData)){
            console.log("User stored Successfully...");
            navigation.navigate("Home");
        }else{
            //show error message
        }
    }

    return(
        <View style={styles.container}>
            <View style={styles.logo}>
                <Text style={{fontSize:extraLarge}}>LOGO</Text>
                <Text style={{fontSize: textSize}}>Manage your income and expenditure easily and effectively</Text>
            </View>

            <View>
                <Text style={{fontSize: textSize}}>To continue using CASMA please Log in</Text>
                <View style={styles.textInput}><Icon name="email" /><TextInput placeholder=" welcometocasma@gmail.com" style={{width:"80%"}} onChangeText={(text)=>{
                    setUserData({...userData, email: text})
                }}/></View>
                <View style={styles.textInput}><Icon name = "person"/><TextInput placeholder=" Your Good Name" style={{width:"80%"}} onChangeText={(text)=>{
                    setUserData({...userData, name: text})
                }} /></View>
            </View>

            <TouchableOpacity style={styles.btn} onPress={saveUser}>
                <Text style={{color:"#fff"}}>Login</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        paddingHorizontal:13,
        paddingVertical:10,
        flex:1
    },
    logo:{
        justifyContent:"center",
        alignItems:"center",
        marginBottom: 24
    },
    textInput:{
        border: 2,
        borderWidth: 1,
        flexDirection:"row",
        paddingVertical:10,
        paddingHorizontal:4,
        marginVertical: 5
    },
    btn:{
        position:"absolute",
        bottom:30,
        width:"98%",
        backgroundColor:"darkblue",
        marginLeft:10,
        marginRight:"auto",
        alignItems:"center",
        paddingVertical:10

    }
})

export default Login;