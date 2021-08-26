var inputData = [];
var margin = {top: 10, right: 30, bottom: 60, left: 60},
    width = 490 - margin.left - margin.right,
    height = 470 - margin.top - margin.bottom;

// append the svg object to the body of the page
var Svg = d3.select("#scatter")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//Read the data
// read in the data and make the plot
d3.csv("assets/data/data.csv").then(function (thisData) {
  
// Add X axis
var x = d3.scaleLinear()
.domain([0, 24])
.range([ 0, width ]);

Svg.append("g")
.attr("transform", "translate(0," + height + ")")
.call(d3.axisBottom(x).tickSize(-height*1.3).ticks(12))
.select(".domain").remove()

// Add Y axis
var y = d3.scaleLinear()
.domain([0, 24])
.range([ height, 0])
.nice()
Svg.append("g")
.call(d3.axisLeft(y).tickSize(-width*1.3).ticks(12))
.select(".domain").remove()

// Customization
Svg.selectAll(".tick line").attr("stroke", "#EBEBEB")

// Add X axis label:
Svg.append("text")
  .attr("text-anchor", "middle")
  .attr("x", width/2)
  .attr("y", height + margin.top + 25)
  .style("font-size", "25px")
  .text("Health Care");

// Y axis label:
Svg.append("text")
  .attr("text-anchor", "middle")
  .attr("transform", "rotate(-90)")
  .attr("y", -margin.left+20)
  .attr("x", -(height+margin.top)/2)
  .style("font-size", "25px")
  .text("Poverty")

  // Add dots
  Svg
    .append("g")
    .selectAll("dot")
    .data(thisData)
    .enter()
    .append("circle")
    .attr("cx", function (d) {
      return x(d.healthcareLow);
    })
    .attr("cy", function (d) {
      return y(d.poverty);
    })
    .attr("r", 2.5)
    .style("fill", "#69b3a2");
});
