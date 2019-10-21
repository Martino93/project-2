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
    .select("#scatter")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);

var chartGroup = svg.append("g")
    .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);



d3.csv("../../csv_files/demo_nutrition_clean.csv").then(function(data){
    console.log(data);
    data.forEach(function(d){
        d.RIDAGEYR = +d.RIDAGEYR,
        d.DR1TKCAL = +d.DR1TKCAL
    })

    var personID = d3.map(data, function(d){
        return (d.SEQN)
    }).keys()
    // console.log(personID)

    d3.select("#selDataSet")
        .selectAll("myOptions")
        .data(personID)
        .enter()
        .append('option')
        .text(d => d)
        .attr("value", d => d)

    var myColor = d3.scaleOrdinal()
        .domain(personID)
        .range(d3.schemeSet2)

    var xScale = d3.scaleLinear()
        .domain([10,80])
        .range([0,chartWidth])

    var yScale = d3.scaleLinear()
        .domain([0, d3.max(data, data => data.DR1TKCAL)])
        .range([chartHeight, 0])

var xAxis = d3.axisBottom(xScale);
var yAxis = d3.axisLeft(yScale);

chartGroup.append("g")
    .classed("axis", true)
    .call(yAxis);

chartGroup.append("g")
    .classed("axis", true)
    .attr("transform", "translate(0, "+ chartHeight + ")")
    .call(xAxis);

chartGroup.append("g")
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .filter(function(d){
        return ((d.DR1TKCAL + d.DR2TKCAL) / 2) >5 ;
    })
    .filter(function(d){
        return d.RIDAGEYR>=18 && d.RIDAGEYR < 80;
    })
    .attr('cx', d => xScale(+d.RIDAGEYR))
    .attr('cy', d => yScale(+d.DR1TKCAL))
    .attr('r',2)
    .attr('stroke','black')
    .style('fill','#69b3a2')
});

