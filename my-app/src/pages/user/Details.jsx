import { Link ,useParams} from 'react-router-dom'
import React, { useState,useContext, useEffect } from 'react'
import { Carousel, Typography, Button } from "@material-tailwind/react";
import axios from 'axios';
import { UserContext } from '../../UserContext';

function Details1(currentTable) {
  const [person, setPerson] = useState([]);

  const [restaurantInfo, setRestaurantInfo] = useState({});
  const [restauranttable, setrestauranttable] = useState([]);
  const { restaurant_id } = useParams();

console.log(restaurant_id)
  useEffect(() => {
      axios.get('http://localhost:5000/recordpId')
      .then((response) => {
          setPerson(response.data);
      })
      .catch((error) => console.log(error.message))



      
      axios.get(`http://localhost:5000/recordtable/${restaurant_id}`)
      .then((response) => {
        setrestauranttable(response.data);
        console.log(response.data);
      })
      .catch((error) => console.log(error.message))





      axios.get('http://localhost:5000/recordrId/'+restaurant_id)
      .then((response) => {
           setRestaurantInfo(response.data[0]);
      })
      .catch((error) => console.log(error.message))

  }, []);
 
// console.log(restaurantInfo)
  let cards = [

    { Name: "  Qaysar Pizza ", path: "https://d2nuhorlnps36p.cloudfront.net/hotels/93783/93783_039_Restaurant.jpg", describtion: " Enjoy an amazing dining experience at our restaurant. Book your table now and enjoy the most delicious dishes.", price: "12.1044$ " },
    { Name: "  Pizza Nina ", path: "https://one-sourceconstruction.com/site/wp-content/uploads/c9.jpg", describtion: " Enjoy an amazing dining experience at our restaurant. Book your table now and enjoy the most delicious dishes.", price: "12.1044$ " },
    { Name: "  The Judge", path: "https://eventective-media.azureedge.net/2524260_lg.jpg", describtion: " Enjoy an amazing dining experience at our restaurant. Book your table now and enjoy the most delicious dishes.", price: "12.1044$ " },


  ]

  const [email, setEmail] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [time, setTime] = useState('')
  const [date, setDate] = useState('')

  const { SignStatus,updateSignStatus } = useContext(UserContext)


  const handleSubmit =  (e) => {
    
    e.preventDefault();

axios.post('http://localhost:5000/orders', {
  email: email,
  tableNumber: tableNumber,
  time: time,
  date: date,
  userid: person[0].userid,
  restaurant_id:restaurant_id

 
})
.then(function (response) {
  console.log(response)
  window.location.href="http://localhost:3000/PaymentPage"

})
.catch(function (error) {
});

  }


  return (

    <>
      <div className="relative">
        <img
          src="https://one-sourceconstruction.com/site/wp-content/uploads/c9.jpg"
          className="absolute inset-0 object-cover w-full h-full"
          alt=""
        />
   
      </div>
  


      <section class="px-3 py-5 bg-neutral-100 lg:py-10">
    <div class="grid lg:grid-cols-2 items-center justify-items-center gap-5">
    <div class="ms-10">
            <h1 class="text-4xl lg:text-6xl text-white font-bold">{restaurantInfo.restaurant_name}</h1>
            <div class="w-20 h-2 bg-amber-500 my-4"></div>
            <p class="text-2xl text-gray-200">{restaurantInfo.address}</p>
            <p class="text-xl text-gray-200 mb-10">{restaurantInfo.des}</p>
          </div>
        <div class="order-1 lg:order-2">
            <img class="h-80 w-80 object-cover lg:w-[500px] lg:h-[500px] rounded-lg" src={restaurantInfo.img} alt=""/>
        </div>
    </div>
</section>





{restauranttable?.length !== 0 ?  <>
  <center><h5 className="uppercase mb-2 text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
        Available TAbles </h5></center>

     
      <div className='flex flex-wrap gap-10 justify-center my-16'>
        
      {restauranttable?.map((e)=>{

            return(

      
              <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                  <img className="rounded-t-lg" src={e?.img} alt="" />
                </a>
                <center>
                  <div className="p-5">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-black dark:text-white">
                       TABLE #{e?.table_number}
                      </h5>
                    <button className="bg-amber-600 border-none text-sm text-white rounded-lg px-2 py-2 text-black mr-4">
                      <Link to="Login">BOOK</Link>
                    </button>
                  </div>
                </center>
              </div>
              

              
           
      )})}
      </div>
  </> : <h1 className='uppercase mb-2 text-center text-5xl font-bold tracking-tight text-white dark:text-white'>NO available tables</h1>}

     <>
        <>
          <div className="flex justify-center items-center w-screen h-screen bg-white">
            <div className="container mx-auto my-4 px-4 lg:px-20">
             
            <form onSubmit={handleSubmit}>
              <div className="w-full p-8 my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2xl">
                <div className="flex">
                  <div>
                    <Typography
                      variant="h1"
                      color="orange"
                      className="mb-4 text-3xl md:text-4xl lg:text-5xl"
                    >
                      Restaurant Details
                    </Typography>
                    <Typography
                      variant="h1"
                      color="black"
                      className="mb-4 text-3xl md:text-4xl lg:text-5xl"
                    >
                      Send us a message
                    </Typography>
                  </div>
                </div>



                
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
                  <input
                    className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="email*"
                    value={email}
                    onChange={(e) => {setEmail(e.target.value);}}
                  />
                  <input
                    className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                    type="number"
                    placeholder="tableNumber*"
                    value={tableNumber}
                    onChange={(e) => {setTableNumber(e.target.value);}}
                  />
                  <input htmlFor="time_start"
                    className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                    type="time"
                    placeholder=""
                    name="time_start"
                    value={time}
                    onChange={(e) => {setTime(e.target.value);}}
                  />
                  <input
                    className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                    id="date"
                    type="date"
                    placeholder="First Name*"
                    value={date}
                    onChange={(e) => {setDate(e.target.value);}}
                  />
                </div>
                <br />

                { SignStatus =="signUp" ?
               <Link to="/SignUp">
               <button  type="submit" className="buttonNav border-none bg-transparent px-8 py-3 text-black mr-4">
                 
                    SignUp
                        
               </button>
               </Link>
                  :         
                  <button  type="submit" className="buttonNav border-none bg-transparent px-8 py-3 text-black mr-4">
                     
                           Pay Now
                           
                  </button>
                 
                }


                

              </div>
              </form>
              <div className="w-full lg:-mt-96 lg:w-2/6 px-8 py-12 ml-auto bg-orange-900 rounded-2xl">
                <div className="flex flex-col text-black">
                  <h1 className="font-bold uppercase text-4xl my-4">
                    Booking Details
                  </h1>
                  <p className="text-gray-400">
                    Restaurant reservation services provide many advantages and benefits such as ease and convenience without having to
                    go to the restaurant in person or wait in line. You can book a table from anywhere and at any time convenient for you
                    via phone or online.
                  </p>
                  <div className="flex my-4 w-2/3 lg:w-1/2">
                    <div className="flex flex-col">
                      <i className="fas fa-map-marker-alt pt-2 pr-2"></i>
                    </div>
                    <i className="fas fa-map-marker-alt pt-2 pr-2">
                      <div className="flex flex-col">
                        <h2 className="text-2xl">MA6A3MKOM</h2>
                        <p className="text-gray-400">
                          Jordan-Amman Reservation Service
                        </p>
                      </div>
                    </i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
        <>
          <div>
            <Typography
              variant="h1"
              color="black"
              className="mb-4 text-3xl md:text-4xl lg:text-5xl"
            >
              <center><h1> Contact us for reservation
              </h1></center>
            </Typography>
          </div>
          <div className="flex justify-center items-center w-screen h-screen bg-white">
            {/* COMPONENT CODE */}
            <div className="container mx-auto my-4 px-4 lg:px-20">
              <div className="w-full p-8 my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2xl">
                <div className="flex">
                  <div>
                    <Typography
                      variant="h1"
                      color="orange"
                      className="mb-4 text-3xl md:text-4xl lg:text-5xl"
                    >
                      Call us to book a service
                    </Typography>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
                  <input
                    className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="name restaurant*"
                  />
                  <input
                    className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="type of food*"
                  />
                </div>
                <div className="my-4">
                  <textarea
                    placeholder="Message*"
                    className="w-full h-32 bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                    defaultValue={""}
                  />
                </div>
                <button className="buttonNav border-none bg-transparent px-8 py-3 text-black mr-4">
                  <Link to="Login">     Send Message </Link>
                </button>
              </div>
            </div>
          </div>
        </>
      </>
    </>)
}

export default Details1
