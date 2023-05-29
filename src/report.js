import {
    Card,
    Typography,
    Button,
    Input,
    Dialog,
    DialogBody,
 
    DialogFooter,
   
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    


  } from "@material-tailwind/react";
  import { useCountries } from "use-react-countries";
  import {CheckBadgeIcon} from "@heroicons/react/24/solid";
  import { RotatingLines} from 'react-loader-spinner'
  import { uploadBytes ,ref } from "firebase/storage";
  import refrence ,{storage} from "./firebase";
  import { useState } from "react";
  import {useProductData 
    } from './slices/productdataSlice'
    import { addDoc } from "firebase/firestore";
import {useModelData} from './slices/dataslice'
  export default function Report() {
    const [open, setOpen] = useState(false);
    const [countrys ,setCountrys] = useState("India") ;
    const [phone , setPhone] = useState("");
    const handleOpen = () => setOpen(!open);
    const material = useProductData().selectedMaterial
    const color = useProductData().selectedColor
    const infill=useProductData().selectedinfill
    const printer=useProductData().selectedPrinter
    const  modelData = useModelData().formettedModel
  
    const [loader,setLoader]=useState(false)
    
    const [buttonHidder,setButtonHider]=useState(false)
    const [personalInfo,setPersonalInfo] =useState({
      email:"",
    })
    
    const [emailError,setEmailError] = useState(false)
    const [phoneError,setPhoneError] = useState(false)
    const buttonClass = buttonHidder ? "hidden" :  ""
    return (
      <>
      <Card color="gray" variant="gradient" className="w-10/12 mb-2 py-6 " shadow={true}>
        <ul className="mx-auto">
            
            <li>
             <Typography variant="h6"  color="White">
             Material <span className="ml-8">:   {material+" - "+color[0]}</span>
             </Typography>
            </li>
            <li>
            
             <Typography variant="h6"  color="White">
             Infill <span className="ml-16">: {infill + "%"}</span>
             </Typography>
            </li>
            <li>
             
             <Typography variant="h6"  color="White">
             Printer <span className="ml-12">: {printer}</span> 
             </Typography>
            </li>
        </ul>
        
      </Card>
      <div className="mt-4 w-full mb-2 ">
      <div className=" grid lg:grid-cols-2 w-10/12 gap-5 ">
      <div>
      <Input    
       
        
       value={personalInfo.email} onChange={(e)=>setPersonalInfo({...personalInfo,email:e.target.value})} placeholder="Enter Email"  />
      {emailError && <Typography variant="small" color="red" className="ml-2 -w-10/12">! Invalid</Typography>}
      </div>
      <div>
      <CountryInput setCountrys={(val)=>{
        setCountrys(val)
      }} setPhone={(val)=>{
        setPhone(val)
      }}/>
      {phoneError && <Typography variant="small" color="red" className="ml-2 w-10/12">! Invalid</Typography>}
      </div>
    </div>
      
     
      <div className="mb-2 mt-4 w-8/12 lg:w-6/12  mx-auto  ">
     <div className={buttonClass}>
     { 
     
     <Button onClick={()=>{
   
        
       
        const validEmailParams={param1:(personalInfo.email.slice(personalInfo.email.length-4,personalInfo.email.length)===".com"),
                                param2:(!personalInfo.email.includes("@.") && !personalInfo.email.includes(".@") && (personalInfo.email.includes("@"))),
                                param3:(personalInfo.email.endsWith(".com") && !personalInfo.email.startsWith("@"))
                                 }
        console.log(validEmailParams.param3,"first")
        const validation=(validEmailParams.param1 && validEmailParams.param2 && validEmailParams.param3)
      
        if(!validation) {
          
        
          setEmailError(true)
        } 
        else{
          setEmailError(false)
        }
      
        const validPhone=phone.length===10
                               
       console.log(phone,countrys)                          
                                 

        if(!validPhone) {
          setPhoneError(true)
       
      } 
      else{
        setPhoneError(false)
      }
      
     if (!emailError && !phoneError && personalInfo.email.length>1 && phone.length>1){
      setButtonHider(true)
     
      setLoader(true)
      addDoc(refrence,{
          material,
          color ,
          infill,
          printer,
          modelName:modelData.name,
          clientDetails:{
            phone:phone ,
            email:personalInfo.email,
            country:countrys
          }
        }).then(response=>{
        const  storageRef = ref(storage, modelData.name);
          uploadBytes(storageRef,modelData).then((snapshot) => {
            console.log('Uploaded a blob or file!');
            setLoader(false)
          
            
            setButtonHider(true)
            handleOpen()
           });
        }
        
        )
     }
     

          
      }}  color="light-green">Submit your model</Button>

    }
    </div>
    <div className="mx-auto w-8/12 mt-4">
    <RotatingLines
  strokeColor="grey"
  strokeWidth="5"
  animationDuration="0.75"
  width="56"
  visible={loader}
/>
</div>
     </div>
     
     
      </div>

  
<>
      <Dialog open={open} handler={handleOpen}>
      
        <DialogBody  className="grid place-items-center gap-4">
          <CheckBadgeIcon className="h-16 w-16 text-green-300" />
          <Typography color="blue" variant="h4">
            We got it
          </Typography>
          <Typography className="text-center font-normal">
           We will get back to you with in 24 hours
          </Typography>
        </DialogBody>
        <DialogFooter className=" space-x-2 " >
         
          <Button className="mx-auto " variant="gradient" color="green" onClick={()=>{handleOpen()
           setButtonHider(false)
           setPersonalInfo({email:"",phone:""})
           }}>
            Done
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  

      </>
    );
  }



 function CountryInput({setCountrys , setPhone}) {
    const { countries } = useCountries();
    const [country, setCountry] = useState(221);
    const { name, flags, countryCallingCode } = countries[country];
   
    return (
      <div className="relative flex w-full ">
        <Menu placement="bottom-start">
          <MenuHandler>
            <Button
              ripple={false}
              variant="text"
              color="blue-gray"
              className="flex h-10 items-center gap-2 rounded-r-none border border-r-0 border-blue-gray-200 bg-blue-gray-500/10 pl-3"
            >
              <img
                src={flags.svg}
                alt={name}
                className="h-4 w-4 rounded-full object-cover"
              />
              {countryCallingCode}
            </Button>
          </MenuHandler>
          <MenuList className="max-h-[20rem] max-w-[18rem]">
            {countries.map(
              ({ name, flags, countryCallingCode }, index) => {
                return (
                  <MenuItem
                    key={name}
                    value={name}
                    className="flex items-center gap-2"
                    onClick={() =>{ setCountry(index)
                      setCountrys(name)}}
                  >
                    <img
                      src={flags.svg}
                      alt={name}
                      className="h-5 w-5 rounded-full object-cover"
                    />
                    {name} <span className="ml-auto">{countryCallingCode}</span>
                  </MenuItem>
                );
              }
            )}
          </MenuList>
        </Menu>
        <Input
          type="number"
          placeholder="Phone"
          className="rounded-l-none !border-t-blue-gray-200 focus:!border-t-blue-500"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
          containerProps={{
            className: "min-w-0",
          }}
        
          onChange={(e)=>{
              setPhone(e.target.value)
          }}
        />
      </div>
    );
  }