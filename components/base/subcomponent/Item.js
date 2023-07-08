import { useState } from "react";
import { Text, TouchableOpacity, View, Alert } from "react-native"
import { secondaryHeading } from "../../dimensions";
import { Icon } from "react-native-material-ui";
import { deleteTransaction } from "../../../models/Transaction";
import { useNavigation } from "@react-navigation/native";

const Item = ({data, itemKey, day, id, themeColor}) => {

    const navigation = useNavigation();

    let year = parseInt(itemKey.slice(-4, ));
    let month = parseInt(itemKey.slice(0,-4));

    const showConfirmDialog =  () => {
        return Alert.alert(
                "Are your sure?",
                "Are you sure you want to remove this data?",
                [
                  // The "Yes" button
                  {
                    text: "Yes",
                    onPress: async () => {
                        try {
                            await deleteTransaction(itemKey, day, id);
                            console.log("Deleted Successfully");
                        } catch (error) {
                            console.log("Some Error Occured");
                        }
                    },
                  },
                  // The "No" button
                  // Does nothing but dismiss the dialog when tapped
                  {
                    text: "No"
                  },
                ],
                {cancelable:true}
              );
    };

    return(
        <View style={{width:"100%"}}>
            <View style={{width:"95%", flexDirection:"row", justifyContent:"space-between", marginLeft:"auto", marginRight:"auto",backgroundColor:themeColor, padding:5}}>
                <Text style={{color:"#fff"}}>{new Date(year, month-1, parseInt(day)).toDateString()}</Text>
                <Text style={{color:"#fff"}}>{new Date(data.time).toLocaleTimeString('en-US')}</Text>
            </View>
            <View style={{width:"95%", flexDirection: "row", justifyContent: "space-between", marginBottom: 5, padding:5, marginLeft:"auto", marginRight:"auto"}}>
                <View style={{width:"70%"}}>
                    <Text>{data.mode==="IN"?"Cash In": "Cash Out"}<Text style={{fontSize: secondaryHeading, fontWeight:"bold" ,color: data.mode==="IN"?"green": "red"}}>  {data.amount}</Text></Text>
                    <Text>Remark: {data.remark}</Text>
                </View>
                <View style={{flexDirection:"row", width:"30%", justifyContent: 'space-around', alignItems:"center"}}>
                    <View>
                        <TouchableOpacity onPress={()=> navigation.navigate("Update", {
                            dataToUpdate: data,
                            key: itemKey,
                            day: day,
                            idx: id,
                            themeColor: themeColor
                        })}>
                            <Icon name="edit" />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity onPress={showConfirmDialog}>
                            <Icon name="delete" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Item;