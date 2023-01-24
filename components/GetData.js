import { useState, useEffect } from "react";

export const GetData = () => {

    const [data,setData] = useState(null);

    useEffect(() => {
        fetch("https://api.allorigins.win/get?url=https://raw.githubusercontent.com/jasperschalla/MensaInfo/master/mensa_info.json")
        .then(response => response.json())
        .then(data => setData(data));
    },[]);


    return data;

}