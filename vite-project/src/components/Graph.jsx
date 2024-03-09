// import React, { useEffect, useRef } from "react";
// import * as d3 from "d3";

// const Graph = ({
//   graphData,
//   source = "Pulchowk",
//   destination = "Lagankhel",
//   path,
// }) => {
//   const graphRef = useRef(null);
//   // console.log("source", source, "destination", destination)
//   console.log(path);
  

//   useEffect(() => {
//     // Parse data
//     const nodesSet = new Set();
//     const links = graphData.map(([source, target, distance]) => {
//       nodesSet.add(source);
//       nodesSet.add(target);
//       return { source, target, distance };
//     },[source,destination,path]);

//     // Convert set to array to get unique nodes
//     const nodes = Array.from(nodesSet).map((node) => ({ id: node }));

//     // Create SVG
//     const svg = d3
//       .select(graphRef.current)
//       .append("svg")
//       .attr("width", 800)
//       .attr("height", 600);

//     // Initialize force simulation
//     const simulation = d3
//       .forceSimulation(nodes)
//       .force(
//         "link",
//         d3.forceLink(links).id((d) => d.id)
//       )
//       .force("charge", d3.forceManyBody())
//       .force(
//         "center",
//         d3.forceCenter(svg.node().clientWidth / 2, svg.node().clientHeight / 2)
//       );

//     // Render links
//     const link = svg
//       .selectAll(".link")
//       .data(links)
//       .enter()
//       .append("line")
//       .attr("class", "link")
//       .style("stroke", "blue")
//       .style("stroke-opacity", 0.5)
//       .style("stroke-width", 2);

//     // Render nodes
//     const node = svg
//       .selectAll(".node")
//       .data(nodes)
//       .enter()
//       .append("circle")
//       .attr("class", "node")
//       .attr("r", 3)
//       .style("fill", (d) =>
//        ( path?.includes(d.id.toLowerCase())) ? "rgb(0, 0, 255)" : "skyblue"
//       ) //style("fill", "skyblue");
//       .style("stroke", "none");
//     // Add labels
//     const label = svg
//       .selectAll(".label")
//       .data(nodes)
//       .enter()
//       .append("text")
//       .attr("class", "label")
//       .text((d) => d.id)
//       .style("font-size", "8px")
//       .style("fill", "black")
//       .style("font-weight", "bold");

//     // Add simulation tick event
//     simulation.on("tick", () => {
//       link
//         .attr("x1", (d) => d.source.x)
//         .attr("y1", (d) => d.source.y)
//         .attr("x2", (d) => d.target.x)
//         .attr("y2", (d) => d.target.y);

//       node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);

//       label.attr("x", (d) => d.x + 10).attr("y", (d) => d.y - 10);
//     });
//   }, [graphData, source, destination]);

//   const divStyle = {
//      background: "linear-gradient(to bottom right,#3498db,#2ecc71 )", // Example gradient from orange to red
//      width: "100%",
//      height: "100vh", // Adjust the height as needed
//   };

//   return <div ref={graphRef} style={divStyle} ></div>;
// };

// export default Graph;






import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const Graph = ({ graphData, source, destination, path }) => {
  const graphRef = useRef(null);

  useEffect(() => {
    // Parse data
    const nodesSet = new Set();
    const links = graphData.map(([source, target, distance]) => {
      nodesSet.add(source);
      nodesSet.add(target);
      return { source, target, distance };
    });

    // Convert set to array to get unique nodes
    const nodes = Array.from(nodesSet).map((node) => ({ id: node }));

    // Create SVG
    const svg = d3
      .select(graphRef.current)
      .append("svg")
      .attr("width", 800)
      .attr("height", 600);

    // Initialize force simulation
    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3.forceLink(links).id((d) => d.id)
      )
      .force("charge", d3.forceManyBody())
      .force(
        "center",
        d3.forceCenter(svg.node().clientWidth / 2, svg.node().clientHeight / 2)
      );

    // Render links
    const link = svg
      .selectAll(".link")
      .data(links)
      .enter()
      .append("line")
      .attr("class", "link")
      .style("stroke", "white")
      .style("stroke-opacity", 0.5)
      .style("stroke-width", 2);

    // Render nodes
    const node = svg
      .selectAll(".node")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("class", "node")
      .attr("r", 3)
      // Ensure path is truthy before using it
      .style("fill", (d) =>
        path?.includes(d.id.toLowerCase()) ? "rgb(0, 0, 255)" : "purple"
      )
      .style("stroke", "none");

    // Add labels
    const label = svg
      .selectAll(".label")
      .data(nodes)
      .enter()
      .append("text")
      .attr("class", "label")
      .text((d) => d.id)
      .style("font-size", "8px")
      .style("fill", "black")
      .style("font-weight", "bold");

    // Add simulation tick event
    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);

      label.attr("x", (d) => d.x + 10).attr("y", (d) => d.y - 10);
    });
  }, [graphData, source, destination, path]);

  const divStyle = {
    background: "linear-gradient(to bottom right,#3498db,#2ecc71 )",
    width: "100%",
    height: "100%",
  };

  return <div ref={graphRef} style={divStyle}></div>;
};

export default Graph;
