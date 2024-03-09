import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Select } from "./exports";
import axios from "axios";
import Graph from "./Graph";
import { graphData } from "../Locations/locations";



const Form = () => {
  const [toggle, setToggle] = useState(true);
  const [path, setPath] = useState([]);
  const [destination, setDestination] = useState(null);
  const [source, setSource] = useState(null);
  const [distance, setDistance] = useState(0);

  const sourceRef = useRef(null);
  const destinationRef = useRef(null);
  const { register, handleSubmit } = useForm({
    defaultValues: {},
  });

  const onSubmit = (data) => {
    setDestination(data.destination);
    setSource(data.source);

    axios
      .post("http://127.0.0.1:5000/pathFinder", data)
      .then((res) => {
        console.log(res);
        const formattedDistance = Number(res.data.shortest_distance).toFixed(2); //ccccc.
        setPath(res.data.shortest_path);
        setDistance(formattedDistance);
      })
      .then(() => setToggle(!toggle));
  };

     const divStyle1 = {
       background:"linear-gradient(to bottom right,#3498db,#2ecc71 )", // Example gradient from orange to red
       width: "100%",
       height: "100%", // Adjust the height as needed
       margin: "auto"
     };

    //  const headingStyle = {
    //    fontSize: "50px", // Set the desired font size
    //    width: "100px", // Set the desired width
    //    height: "50px", // Set the desired height
    //    margin: " auto",
    //    animation: "fadeIn 2s ease-in-out",
    //    textalign: "center"
    //  };
  

  return (
    <div style={divStyle1}>

      {/* <h1  style={headingStyle}>RAPIDROUTE</h1> */}
      {toggle ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border-2 border-slate-700 rounded-lg px-2 py-3 mt-4 gap-y-2"
        >
          <Select ref={sourceRef} {...register("source")} endpoint="start location" />
          <Select ref={destinationRef} {...register("destination")} endpoint="destination" />
          <Button type="submit" />
        </form>
      ) : (
        <>
          <Graph
            graphData={graphData}
            destination={destination}
            source={source}
            path={path}
          />
          {path.length > 0 && (
            <div>
              <p>The shortest path is:</p>
              {path.map((p, index) => (
                <span key={index}>{p}, </span>
              ))}
              </div>  
            )}
            <div>
              <p>The shortest distance is {distance} km.</p>
            </div>
        </>
      )}
    </div>
  );
};

export default Form;
