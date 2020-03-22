var jsonfile = "samples.json";

d3.json(jsonfile).then(function(x) {
    //console.log(x)
});

function init() {
    var sampleid = d3.select("#selDataset");
    d3.json(jsonfile).then(function(data) {
        var samplnames = data.names;
            console.log(samplnames);
            
        samplnames.forEach((x) => {
            sampleid.append("option").text(x).property("value", x);

            
        });
        var firstname = samplnames[0];
        builddemotable(firstname);
        barGraph(firstname);
        bubbleGraph(firstname);
    });
}

function builddemotable(sample) {
    d3.json(jsonfile).then(function(data) {
        
        var samplemetadata = data.metadata;
        var filterdata = samplemetadata.filter(x => x.id == sample)
         //console.log(filterdata);
        var filterresults = filterdata[0];
         //console.log(filterresults);
        var sample_metadata = d3.select("#sample-metadata");

        sample_metadata.html("");
        Object.entries(filterresults).forEach(function([key, value]) {
            console.log(key,value);
            var row = sample_metadata.append("tr");           
            row.append("td").html(`<strong><font size = '2'>${key}</font></strong>:`);
            row.append("td").html(`<font size ='2'>${value}</font>`);
        });
            
        });
}
 
function barGraph(xsamples){
    d3.json(jsonfile).then(function(x) {
        var bacteriaBB = x.samples
        //console.log(bacteriaBB);
        var filterBar = bacteriaBB.filter(x => x.id == xsamples)
        var otuIDs = filterBar.map(x => x.otu_ids)
        var otuSVals = filterBar.map(x => x.sample_values)
        var otuLabls = filterBar.map(x => x.otu_labels)
            //console.log(otuIDs)
        var otuID10 = otuIDs[0].slice(0, 10) 
            //console.log(otuID10);
        var otuSVals10 = otuSVals[0].slice(0, 10)
        var otuLabls10 = otuLabls[0].slice(0, 10)
        var otuIDstr = otuID10.map(x => `OTU ID ${x}`);

        var data = [{
            type: 'bar',
            x: otuSVals10.reverse(),
            y: otuIDstr.reverse(),
            orientation: 'h',
            text: otuLabls10.reverse()
          }];
          
          Plotly.newPlot('bar', data);

    })
}

function bubbleGraph(xsamples){
    d3.json(jsonfile).then(function(x) {
        var bacteriaBB = x.samples
            //console.log(bacteriaBB);
        var filterBar = bacteriaBB.filter(x => x.id == xsamples)
        var otuIDs = filterBar.map(x => x.otu_ids)
        var otuSVals = filterBar.map(x => x.sample_values)
        var otuLabls = filterBar.map(x => x.otu_labels)
            //console.log(otuIDs)
        
        var trace1 = {
            x: otuIDs[0],
            y: otuSVals[0],
            mode: 'markers',
            text: otuLabls[0],
            marker: {
              size: otuSVals[0],
              color: otuIDs[0]
              
            }
          };
          
          var data = [trace1];

          
          Plotly.newPlot('bubble', data);

    })
}


function optionChanged(newsample) {
    builddemotable(newsample);
    barGraph(newsample);
    bubbleGraph(newsample);

}



init();

