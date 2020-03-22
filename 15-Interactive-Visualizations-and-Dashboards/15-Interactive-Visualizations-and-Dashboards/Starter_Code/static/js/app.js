var dropdownMenu = d3.select("#selDataset");

d3.json("samples.json").then(function(x) {
    var names = x.names;

    name.forEach(sample => {
        dropdownMenu.append("option").text(sample).property("value",sample);
           
    });
    