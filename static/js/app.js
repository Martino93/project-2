var svgWidth, svgHeight, chartMargin, chartWidth, chartHeight

svgWidth = 950;
svgHeight = 650;
chartMargin = {
    top:50,
    left:50,
    bottom:50,
    right:50
};
chartWidth = svgWidth - (chartMargin.left + chartMargin.right);
chartHeight = svgHeight - (chartMargin.top + chartMargin.bottom);

var svg = d3
    .select("#bar")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);

var chartGroup = svg.append("g")
    .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

//loading data


d3.csv("csv_files/demo_nutrition.csv").then(function(data){
    console.log(data);
    d3.mean(data, function(d){
        return lst = [d.DR1TPROT, d.DR1TCARB, d.DR1TSUGR];
    })
    console.log(lst)
    console.log(data.keys)
    
    data.forEach(function(data){
        data.DR1TPROT = +data.DR1TPROT;
        data.DR1TCARB = +data.DR1TCARB;
        data.DR1TSUGR = +data.DR1TSUGR;
        data.DR1TFIBE = +data.DR1TFIBE;
        data.DR1TTFAT = +data.DR1TTFAT;
    })

// scaling axes
var xScale = d3.scaleLinear()
    .domain([83500, 93000])
    .range([0, chartWidth]) 

var yScale = d3.scaleLinear()
    .domain([5, d3.max(data, data=>data.DR1TCARB)])
    .range([chartHeight, 0])

// creating axes
var xAxis = d3.axisBottom(xScale);
var yAxis = d3.axisLeft(yScale);

chartGroup.append("g")
    .classed("axis", true)
    .call(yAxis);

chartGroup.append("g")
    .classed("axis", true)
    .attr("transform", "translate(0, " + chartHeight + ")")
    .call(xAxis);

// circles
chartGroup.append("g")
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
        // .attr("cx", function(d){return xAxis(d.age);})
        // .attr("cy", function(d){return yAxis(d.DR1TKCAL);})
        // .attr("r", 2)
        // .style("fill", function(d){return color(d.state);})
        .attr('cx', d => xScale(+d.SEQN))
        .attr('cy', d => yScale(+d.DR1TKCAL))
        .attr('r', 5)
        .attr("stroke", "black")
        .style("fill" , "#69b3a2")
        
// data text
chartGroup.append("g")
    .selectAll("text")
    .data(data)
    .enter()
    .append("text")
    .text(d => d.abbr)
    .attr("x", d => xScale(+d.SEQN))
    .attr("y", d => yScale(+d.DR1TKCAL)+3)
    .attr("font_family", "sans-serif")
    .attr("font-size", "7px")
    .attr("fill", "white")
    .style("text-anchor", "middle")
    .style("font-weight", "bold")

// axes labels
svg.append("text")
    .attr("transform", "translate(" + (chartWidth/2) +" ,"+ (chartHeight + chartMargin.top + 40) + ")")
    .style("text-anchor", "middle")
    .text("SEQN")

svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", -90 - chartMargin.left)
    .attr("x",0 - (chartHeight / 2)-50)
    .attr("dy", "10em")
    .style("text-anchor", "middle")
    .text("% of population that smokes");  




// function xGridLines(){
//     return d3.axisBottom(xScale).ticks(10)
// }

// chartGroup.append("g")
//     .attr("class", "grid")
//     .attr("transform", "translate(0," + chartHeight + ")")
//     .call(xGridLines()
//         .tickSize(-chartHeight))
//         .tickFormat(" ")

});


// https://www.youtube.com/watch?v=2S1AbEWX85o

