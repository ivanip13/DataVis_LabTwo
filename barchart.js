/*****************************************/
/*   DRAW BAR CHART - ALREADY COMPLETE   */
/*****************************************/

// CHART AREA

let margin = { top: 40, right: 20, bottom: 40, left: 90 },
  width =
    document.querySelector("#chart-area").clientWidth -
    margin.left -
    margin.right,
  height = 400 - margin.top - margin.bottom;

width = width > 600 ? 600 : width;

let svg = d3
  .select("#chart-area")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// AXIS

let x = d3
  .scaleBand()
  .range([0, width])
  .paddingInner(0.1);

let y = d3.scaleLinear().range([height, 0]);

let xAxis = d3
  .axisBottom()
  .scale(x)
  .tickFormat(function(d) {
    return shortenString(d, 20);
  });

let yAxis = d3.axisLeft().scale(y);

let xAxisGroup = svg.append("g").attr("class", "x-axis axis");

let yAxisGroup = svg.append("g").attr("class", "y-axis axis");

function renderBarChart(data) {
  // Check array length (top 5 attractions)
  if (data.length > 5) {
    errorMessage("Max 5 rows");
    return;
  }

  // Check object properties
  if (
    !data[0].hasOwnProperty("Visitors") ||
    !data[0].hasOwnProperty("Location") ||
    !data[0].hasOwnProperty("Category")
  ) {
    errorMessage(
      "The Object properties are not correct! An attraction should include at least: 'Visitors', 'Location', 'Category'"
    );
    return;
  }

  x.domain(
    data.map(function(d) {
      return d.Location;
    })
  );
  y.domain([
    0,
    d3.max(data, function(d) {
      return d.Visitors;
    })
  ]);

  // ---- DRAW BARS ----
  let bars = svg
    .selectAll(".bar")
    .remove()
    .exit()
    .data(data);

  bars
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", function(d) {
      return x(d.Location);
    })
    .attr("y", function(d) {
      return y(d.Visitors);
    })
    .attr("height", function(d) {
      return height - y(d.Visitors);
    })
    .attr("width", x.bandwidth())
    .on("mouseover", function(event, d) {
      //Get this bar's x/y values, then augment for the tooltip
      let xPosition =
        margin.left +
        width / 2 +
        parseFloat(d3.select(this).attr("x")) +
        x.bandwidth() / 2;
      let yPosition =
        margin.top + parseFloat(d3.select(this).attr("y")) / 2 + height;

      //Update the tooltip position and value
      d3.select("#tooltip")
        .style("left", xPosition - 300 + "px")
        .style("top", yPosition + "px")
        .select("#value")
        .text(d.Visitors);

      //Show the tooltip
      d3.select("#tooltip").classed("hidden", false);
    })
    .on("mouseout", function(d) {
      //Hide the tooltip
      d3.select("#tooltip").classed("hidden", true);
    });

  // ---- DRAW AXIS	----
  xAxisGroup = svg
    .select(".x-axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
  ;

  yAxisGroup = svg.select(".y-axis").call(yAxis);

  svg.select("text.axis-title").remove();
  svg
    .append("text")
    .attr("class", "axis-title")
    .attr("x", -5)
    .attr("y", -15)
    .attr("dy", ".1em")
    .style("text-anchor", "start")
    .text("Annual Number of Visitors by Category");
  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x",0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Number of Visitors");
  svg.append("text")
      .attr("transform",
            "translate(" + (width/2) + " ," +
                           (height + margin.top -10) + ")")
      .style("text-anchor", "middle")
      .text("Name");

}





function errorMessage(message) {
  console.log(message);
}

function shortenString(content, maxLength) {
  // Trim the string to the maximum length
  let trimmedString = content.substr(0, maxLength);

  // Re-trim if we are in the middle of a word
  trimmedString = trimmedString.substr(
    0,
    Math.min(trimmedString.length, trimmedString.lastIndexOf(" "))
  );

  return trimmedString;
}