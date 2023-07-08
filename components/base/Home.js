import { View, Text, SafeAreaView, StyleSheet, Platform, StatusBar, TouchableOpacity, ScrollView } from "react-native";
import { useEffect, useState, useCallback, useRef } from "react";

import { useFocusEffect } from "@react-navigation/native";
import { Icon } from "react-native-material-ui"

import { getAllData } from "../../models/Transaction";

//dimensions
import { primaryHeading, extraLarge, primaryText } from "../dimensions"

//components
import DashBoard from "./subcomponent/DashBoard";
import Chart from "./subcomponent/Chart";
import { getGlobalColor } from "../../models/User";

const Home = ({navigation}) =>{
    const [res, setRes] = useState({});
    const themeColor = useRef("darkblue");

    const getData = async () => {
        let data = await getAllData();
        setRes(data);
    }

    const getColor = async () => {
        let color = {};
        try {
            color = await getGlobalColor();
            themeColor.current = color.current;
        } catch (error) {
            console.log("Unable to fetch color");
        }
    }

      useEffect(()=>{
        getData();
        getColor();
      }, [])

      //re-rendering
      useFocusEffect(
        useCallback(() => {
          // Perform any necessary re-rendering logic here
          // This code will be executed when the screen gains focus
          getData();
          getColor();
          return () => {
            // Cleanup or unsubscribe from any resources if needed
          };
        }, [])
      );

    
    return(
        <SafeAreaView style={styles.AndroidSafeArea}>
            <ScrollView style={styles.container}>
                {/*Header Bar */}
                <View style={styles.headerBar}>
                    <Text style={{fontSize:primaryHeading}}>Home</Text>
                    <TouchableOpacity onPress={()=> navigation.navigate("Profile")}><Icon name = "person" style={styles.profile}/></TouchableOpacity>
                </View>

                {/* DashBoard */}
                <DashBoard data= {res} themeColor={themeColor.current}/>

                {/* Income/Expenditure Chart */}
                <Chart chartData={res} themeColor={themeColor.current}/>

                {/* More Details */}
                <TouchableOpacity style={{height:50, width:150, alignItems:"center", justifyContent: 'center',marginLeft:"auto", marginRight:"auto", paddingHorizontal:10, backgroundColor:themeColor.current}} onPress={()=>navigation.navigate("Detail", {themeColor: themeColor.current})}>
                    <Text style={{fontSize:primaryText, color:"#fff", fontWeight:"bold"}}>Show More</Text>
                </TouchableOpacity>

                {/*Extra Space at the bottom */}
                <View style={{height:50}}>
                </View>
            </ScrollView>
            {/* Add Expenses */}
            <TouchableOpacity style={[styles.plus, {backgroundColor: themeColor.current}]} ><Text style={{fontSize:extraLarge, color:"#fff"}} onPress={()=>navigation.navigate("ADD", {themeColor: themeColor.current})}>+</Text></TouchableOpacity>
                
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    AndroidSafeArea: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    container:{
        flex:1
    },
    headerBar:{
        flexDirection:"row",
        height:50,
        paddingVertical:10,
        paddingHorizontal:15,
        justifyContent:"space-between",
        alignItems:"center"
    },
    profile:{
        alignItems:"flex-end"
    },
    plus:{
        position:"absolute",
        bottom:30,
        right:30,
        height:60,
        width:60,
        borderRadius: 60/2,
        justifyContent:"center",
        alignItems:"center",
    },
})

export default Home;