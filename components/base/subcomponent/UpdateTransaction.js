import { StyleSheet, Text, TouchableOpacity, View, TextInput } from "react-native"
import { useRef, useState } from "react";
//date time picker
import DateTimePicker  from "@react-native-community/datetimepicker"
import { extraLarge, primaryText, secondaryText } from "../../dimensions";
import { Icon } from "react-native-material-ui";

import { isValid } from "./helper";
//database
import { addTransaction, updateTransaction } from "../../../models/Transaction";


const UpdateTransaction = ({route, navigation}) =>{
    //console.log("route", route.params);
    const {dataToUpdate, key, day, idx, themeColor} = route.params;

    let year = parseInt(key.slice(-4, ));
    let month = parseInt(key.slice(0,-4));

    const [showDate, setShowDate] = useState(false);
    const [showTime, setShowTime] = useState(false);
    const valid = useRef(true);

    const [date, setDate] = useState(new Date(year, month, parseInt(day)));
    const [data, setData] = useState({...dataToUpdate, time: new Date()})

    const update = (name, value) =>{
        setData({...data, [name]: value});

        //validate input field
        let validated = isValid({...data, [name]: value});
        valid.current = validated;
    }

    const save = async () => {
        try {
            await updateTransaction(data, key, day, idx);
            console.log("Data Saved Successfully");
            navigation.goBack();

        } catch (error) {
            console.log("--Some error occured", error);
        }

    }

    return(
        <View style={{flex:1}}>
            {/* Mode */}
            <View style={styles.mode}>
                <View style={{borderTopLeftRadius:20, borderTopRightRadius:0, borderBottomRightRadius:0, borderBottomLeftRadius:20,  width:"50%", backgroundColor: data.mode==="IN"?themeColor:"#e2e2e2"}}>
                    <TouchableOpacity onPress={()=> update("mode", "IN")}>
                        <Text style={{fontSize:extraLarge, padding: 5, textAlign:"center", color:"#fff"}}>Cash In</Text>
                    </TouchableOpacity>
                </View>
                <View style={{borderTopLeftRadius:0, borderTopRightRadius:20, borderBottomRightRadius:20, borderBottomLeftRadius:0, width:"50%", backgroundColor: data.mode==="OUT"?themeColor:"#e2e2e2"}}>
                    <TouchableOpacity onPress={()=> update("mode", "OUT")}>
                        <Text style={{fontSize:extraLarge, padding: 5, textAlign:"center", color:"#fff"}}>Cash Out</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/*Data Time Picker */}
            <View style={styles.picker}>
                <View style={styles.pickerItem}>
                    <TouchableOpacity
                        onPress={()=>setShowDate(!showDate)}
                    >
                        <Icon name="event" color={themeColor} /><Text style={{fontSize: secondaryText}}>{date.toDateString()}</Text>
                    </TouchableOpacity>
                {showDate && <DateTimePicker mode="date" value={date} onChange={(event, value)=>{
                    setShowDate(!showDate)
                    setDate(value);
                }} />}
                </View>
                <View style={styles.pickerItem}>
                    <TouchableOpacity
                        onPress={()=>setShowTime(!showTime)}
                    >
                        <Icon name="alarm" color={themeColor} /><Text style={{fontSize: secondaryText}}>{data.time.toLocaleTimeString('en-US')}</Text>
                    </TouchableOpacity>
                {showTime && <DateTimePicker mode="time" value={data.time} onChange={(event, value)=>{
                    setShowTime(!showTime)
                    update("time", value)
                }} />}
                </View>
            </View>
            
            <View style={{paddingHorizontal:20}}>
                <View style={styles.textInput}>
                    <Text style={{color: themeColor, fontWeight:"bold"}}>Amount</Text>
                    <TextInput keyboardType="numeric" value={data.amount} placeholder=" welcometocasma@gmail.com" style={{width:"80%"}} onChangeText={(text)=>{
                        update("amount", text)
                    }}/>
                </View>

                <View style={styles.textInput}>
                    <Text style={{color: themeColor, fontWeight:"bold"}}>Remark</Text>
                    <TextInput value={data.remark} placeholder="Remarks: Groceries, Investment..." style={{width:"80%"}} onChangeText={(text)=>{
                    update("remark", text)
                    }} />
                </View>
            </View>

            <TouchableOpacity style={[styles.btn, {backgroundColor: valid.current? themeColor:"#e2e2e2"}]} onPress = {save} disabled={!valid.current}>
                <Text style={{color:"#fff", fontWeight:"bold"}}>UPDATE</Text>
            </TouchableOpacity>
        </View>
    )
}

export default UpdateTransaction;

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
    picker:{
        flexDirection:"row",
        justifyContent:"space-between",
        paddingHorizontal:20,
        paddingVertical:10
    },
    pickerItem:{},
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