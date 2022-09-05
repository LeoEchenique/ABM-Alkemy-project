import React from "react";
import style from "./wallet.module.css"
import icon_update from "../icons/icon_verify.png"
import { useEffect, useState } from "react";
import axios from "axios";


export default function Wallet({balance}) {

    const [wallet,setWallet]=useState([]) 
    let user= JSON.parse(localStorage.getItem("user"))

    const getWallet = async ()=>{
        let wallet = await axios.get(`http://localhost:3001/Wallet/${user.Token}`);
        setWallet(wallet.data)
    }   
    
    useEffect( () => {
      getWallet()
    },[])

    
    return (
        <div className={style.div_container}>
            <h1>Your wallet</h1>
           
            <div className={style.card_wallet}>
                <div className={style.head_wallet}>
                    <h2>Wallet balance</h2>
                    <img className={style.icon_verify} src={icon_update} alt=""/>
                </div>

                {wallet ? 
                <h1 key={wallet.Id} className={style.current_balance} >${wallet.Funds } </h1>
                : null }
                  
             
                <h3 className={style.card_number}> **** **** **** ****</h3>
            </div>

        </div>
    )
}