import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import Tours from "./Tours";
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = "https://course-api.com/react-tours-project";
function App() {
  const [loading, setLoading] = useState(true);

  // tours data is initially set to false
  const [tours, setTours] = useState([]);

  //This function performs a delere from list
  // by filtering based on the id. It then invokes the setTour
  //so that the tours variable is updated
  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  };
  //Function to fecth data from API
  //getting data from API is a 2step process
  //1. fetch using the APi url
  //2. Parse the json data in an array of objects
  const fetchTours = async () => {
    //when fetching let the user know that you're fetching data
    setLoading(true);

    try {
      const response = await fetch(url); //fetch response from api
      const tours = await response.json(); //parse the tours data using response
      setLoading(false);
      setTours(tours); //this sets the tours variable to the data we fetched
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //use effect to invoke fetchtours function after initial rendering
  useEffect(() => {
    fetchTours();
  }, []);

  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }

  if (tours.length === 0) {
    return (
      <main>
        <div className="title">
          <h2>no tours left</h2>
          <button className="btn" onClick={() => fetchTours()}>
            refresh
          </button>
        </div>
      </main>
    );
  }

  //This returns  the Tours component with props = tours for data,
  //removeTour props for the "remove tour functionality"
  //where tours is the data for rendering the component.
  return (
    <main>
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  );
}

export default App;
