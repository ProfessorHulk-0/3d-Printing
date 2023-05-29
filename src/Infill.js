import React,{useState} from 'react'
import { useDispatch } from 'react-redux';
import {setSelectedinfill , useProductData} from './slices/productdataSlice'

import { Progress } from "@material-tailwind/react";
export default function Infill() {

  const dispatch= useDispatch()
  const infill= useProductData().selectedinfill
  const [preventFocus, setPreventFocus] = useState(false);


  return (
    <>
    <div className='ml-auto   w-1/12 mr-6' >
      <input type='number' value={infill} onClick={(e)=>{
            
            if (preventFocus) {
              e.target.blur(); 
              setPreventFocus(false); 
            }
      }} onChange={(event)=>{
        console.log(Number(3400))
        let num =Number( event.target.value)
        if (num>100 ){
          num=100
        }
        
       
        dispatch(setSelectedinfill(num))
      }} className='text-center w-[100px]  border-2 rounded-full border-green-300  '/>
    </div>
  
    <div className=' w-9/12 mx-auto mb-6 mt-4 '>
    <Progress value={Number(infill)} label=" " />
    </div>
    <div className='w-11/12 mx-auto  cursor-pointer focus:border-cyan-300 rounded-md  ' >
    <VolumeControl handleChange={(event) => {
 console.log(event.target.value,"final infill")
    dispatch(setSelectedinfill(event.target.value))
  }} percent={Number(infill)}
  
 />
  
    </div>
    </>
  )
}



const VolumeControl = ({ handleChange ,percent}) => {
  return (
    <div >
   
      <input
        className='w-full cursor-pointer'
        type="range"
        id="volume"
        name="volume"
        max="100"
        step="1"
    
        value={percent}
        onChange={(e)=>{
          handleChange(e)
        }}
      />
      
    </div>
  );
};





