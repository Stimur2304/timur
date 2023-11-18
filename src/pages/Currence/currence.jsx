import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "./currence.css"

const Currence = () => {
  const TOKEN = "7HSplfD5jvQyInmyjeIS2RJhASUrOmbSZycJRcw291dc4861";
   const[data,setData] = useState([])
   const[loading,setLoading] = useState(false)
   const getCurrent = async () =>{
    setLoading(true)
    try{
      const responce  = await axios.get("https://data.fx.kg/api/v1/current",{
        headers:{
          'Authorization':`Bearer ${TOKEN}`
        }
      })
      let filteredData  = responce.data

      filteredData = filteredData.filter(item =>{
        return item.id < 16
      })
      setData(filteredData)
      console.log(data)
    }catch(e){
      console.log(e)
    }finally{
      setLoading(false)
    }
   }
  useEffect(()=>{
    getCurrent()
  },[])

  const getOnlyFiveBanks = async () =>{
    setLoading(true)
    try{
      const responce  = await axios.get("https://data.fx.kg/api/v1/current",{
        headers:{
          'Authorization':`Bearer ${TOKEN}`
        }
      })
      
      let filteredData  = responce.data

      filteredData = filteredData.filter(item =>{
        return item.id < 6 
      })
      setData(filteredData)
      console.log(data)
    }catch(e){
      console.log(e)
    }finally{
      setLoading(false)
    }
   }
   const getOnlyTenBanks = async () =>{
    setLoading(true)
    try{
      const responce  = await axios.get("https://data.fx.kg/api/v1/current",{
        headers:{
          'Authorization':`Bearer ${TOKEN}`
        }
      })
      
      let filteredData  = responce.data

      filteredData = filteredData.filter(item =>{
        return item.id < 11
      })
      setData(filteredData)
      console.log(data)
    }catch(e){
      console.log(e)
    }finally{
      setLoading(false)
    }
   } 
   const getEUR = ()=>{
    data.sort((a,b) =>{
      return b.rates[0].buy_eur - a.rates[0].buy_eur
    })

  }
  
  return (
    <div className='currence-div'>

      {!loading?
     <div className='button-div'>
       <input type="button" onClick={getOnlyFiveBanks} value="5" />
       <input type="button" onClick={getOnlyTenBanks} value="10" />
       <input type="button" onClick={getCurrent} value="All" />
     </div>:""}
      {!loading ?  

      <div className='title'>
        <p></p>
        <p>Banks</p>
        <p>RUB</p>
        <input type="button" onClick={getEUR} value="EUR" />
      </div>:''}
       {loading ?
      <div className='Loading'>Loading...</div>
      :
      <div>
        {data.sort((a,b)=>{
         return (
          b.rates[0].buy_usd  - a.rates[0].buy_usd 
         )
        }).sort((a,b)=>{
          return b.rates[0].buy_rub - a.rates[0].buy_rub
        }).map((item,idx)=>{
          return (
                  <div key={idx}>
                        <div className='current-wrap'>
                          <div className='current-wrap__item'>{item.title}</div>
                          <div className='current-wrap__item'>{item.rates[0].buy_usd} </div>
                          <div className='current-wrap__item' >{item.rates[0].buy_rub}</div>
                          <div className='current-wrap__item'>{item.rates[0].buy_eur} </div>
                        </div>
                  </div>
          )
        })}
        </div>} 
    </div>
  )
}

export default Currence