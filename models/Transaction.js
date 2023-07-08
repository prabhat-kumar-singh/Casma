import AsyncStorage from "@react-native-async-storage/async-storage";

/*

 Transaction:{
    "MonthYear":{
        "day":[
            {amount: , mode: , remark: , time: }
        ]
    }
 }

*/

const getDatabase = async () => {
    let keys = [];
    try{
        keys = await AsyncStorage.getAllKeys();
    }catch(err){
        console.log("Error: ", err);
    }

    return keys;
}

const getAllData = async () => {
    let data = {};
    let key = [];

    //check if the database exists or not
    try {
        key = await getDatabase();
        if(!key.includes("Transaction")) return data;
    } catch (error) {
        return data;
    }

    try {
        data = await AsyncStorage.getItem("Transaction");
        return JSON.parse(data);
    } catch (error) {
        console.log("Unable to fetch data");
    }
}

const createDatabase = async (data) => {
    try {
        await AsyncStorage.setItem("Transaction", JSON.stringify(data), ()=> console.log("Data Added Successfully"));
    } catch (error) {
        console.log("Unable to Create Database");
    }
}

const storeData = async (data) => {

    try {
        await AsyncStorage.setItem("Transaction", JSON.stringify(data));
    } catch (error) {
        console.log("Unable to store data into the database");
    }

}


const addTransaction = async (key, day, data) => {
    //check if database exists or not
    let keys = await getDatabase();
    let dbData = {};
    let dayData = [];
    let dayObj = {};

    //fetch all the data from the database to update and store new data
    try {
        dbData = await getAllData();
    } catch (error) {
        console.log(error);
    }

    
    if(keys.includes("Transaction")){
        //database exists

        //check if key already exists or not
        if(key in dbData){
            //check if any entry is available for particular day

            if(day in dbData[key]){
                //if day exists then push the new data
                dbData[key][day].push(data);
            }else{
                //create a new key day and add the data
                dayData.push(data);
                dbData[key][day] = dayData;
            }

        }else{
            //if key does not exists then insert key with day value
            dayData.push(data);
            dayObj[day] = dayData
            dbData[key] = dayObj;
        }

    }else{
        //database doesn't exists, create the database first
        dayData.push(data);
        dayObj[day] = dayData
        dbData[key] = dayObj;
        try {
            await createDatabase(dbData); 
        } catch (error) {
            console.log("Unable to create database");
        }
        return;
    }

    //finally store the data into the database
    try {
        await storeData(dbData);
    } catch (error) {
        console.log("Unable to store the data into database", error);
    }
}

const deleteTransaction = async (key, day, idx) => {
    //check if database exists or not
    let keys = [];
    try {
        keys = await getDatabase();
    } catch (error) {
        console.log("Unable to get keys");
    }

    if(keys.includes("Transaction")){
        let dbData = {};
        try {
            dbData = await getAllData();
            let dayData = dbData[key][day];
            dayData.splice(idx, 1);

            //if dayData becomes empty then remove the whole key from the database
            if(dayData.length===0){
                delete dbData[key][day];
            }else{
                dbData[key][day] = dayData;
            }
            //update the database
            await storeData(dbData);

        } catch (error) {
            console.log("Some Error occured", error);
        }
    }
    
}

const removeDatabase = async () => {
    try {
        await AsyncStorage.removeItem("Transaction");
    } catch (err) {
        console.log(err);
    }
}

const updateTransaction = async (data,key, day, idx) => {
    let keys = [];
    try {
        keys = await getDatabase();
    } catch (error) {
        console.log("Unable to get keys");
    }

    if(keys.includes("Transaction")){
        //console.log("update data", data);
        let dbData = {};
        try {
            dbData = await getAllData();
            console.log("dbData", dbData[key])
            let dayData = dbData[key][day];
            dayData[idx] = data;

            //update the database
            await storeData(dbData);

        } catch (error) {
            console.log("Some Error occured in update", error);
        }
    }
}


export { getAllData, addTransaction, updateTransaction, deleteTransaction, removeDatabase}

