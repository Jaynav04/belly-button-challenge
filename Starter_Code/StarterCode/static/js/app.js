function init(){
    const link = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
   //Reading in the json
    d3.json(link).then(function(data) {
         console.log(data);

     // Creating the drop down list for Test subject ID No.
         let names = data.names
         console.log(names)
         names.forEach(function(name) {
          d3.select('#selDataset')
         .append('option')
         .text(name)
         .attr("value",name)
          });
          optionChanged(d3.select("#selDataset").property("value"));
    })
}

//Add in and Update the plots
  function optionChanged(value) {
     const link = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
   //Reading in the json
    d3.json(link).then(function(data) {

     var md = data.metadata.filter(d => d.id == value);

     var sample = data.samples.filter(d => d.id == value);

     //Adding demographic info table
     test= md[0]
          var div = d3.select("#sample-metadata");
          div.html("")
          var list = div.append("h1");
          Object.entries(test).forEach(([key, value]) => {
               list.append("p").text(key+": "+value)
               .style('font-size','30%');
                   });
     
     //Bar chart
     let xbar =sample[0].sample_values.sort((a,b)=> b-a).slice(0,10).reverse()
     let ybar =sample[0].otu_ids.slice(0,10).reverse().map(x => "OTU " +  x);
     let tbar =sample[0].otu_labels.sort((a,b)=> b-a).slice(0,10).reverse();
     
     let trace1 = {
                    x:xbar,
                    y:ybar,
                    text:tbar,
                    type:"bar",
                    orientation:'h'
                    }
                    
      let d = [trace1]
     var config = {responsive: true}
     let layout = {
          title: "Top 10 OTUs"
                              }
                         
     Plotly.newPlot("bar",d,layout,config)
                    
     // bubble graph
     let trace2 = {
          x : sample[0].otu_ids,
          y : sample[0].sample_values,
          text :sample[0].otu_labels,
          mode : 'markers',
          marker : {
               color : sample[0].otu_ids,
               size : sample[0].sample_values
               }
               }
                              
     var layout2 = {
          title: '<b>Bubble Chart</b>',
          automargin: true,
          autosize: true,
          showlegend: false,
          margin: {
                l: 150,
               r: 50,
               b: 50,
               t: 50,
               pad: 4      
                  }};
                    
     var data2 = [trace2];
     var config = {responsive:true}
     Plotly.newPlot('bubble',data2,layout2,config);

     //Gauge chart 
     let trace3 = {
          domain:{ x: [0, 1], y: [0, 1] },
          value:test.wfreq,
          type:"indicator",
          title:"Belly Button Washing Frequency",
          mode:"gauge+number+delta",
          gauge:{
               axis: { range: [null, 10], tickwidth: 1, tickcolor: "darkblue" },
               bar: { color: "darkblue" },
               bgcolor: "white",
               borderwidth: 2,
               bordercolor: "gray",
               steps: [
               { range: [0, 1], color: "cyan" },
               { range: [1, 2], color: "royalblue" },
               { range: [2, 3], color: "green" },
                { range: [3, 4], color: "lightgreen" },
                { range: [4, 5], color: "yellow" },
                { range: [5, 6], color: "orange" },
                { range: [6, 7], color: "red" },
                { range: [7, 8], color: "darkpink" },
                { range: [8, 9], color: "lightpink" },
                { range: [9, 10], color: "lightgrey" },]
             }
             
     }
     var data3 = [trace3]
     var config = {responsive:true}

     Plotly.newPlot('gauge',data3,config);
     
          })
  }
         
    


init()


