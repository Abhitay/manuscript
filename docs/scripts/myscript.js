// Map Setup
const width = 750;
const height = 600;

// Create SVG Container
const svg = d3.select("#plot")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .call(
    d3.zoom().scaleExtent([1, 8]).on("zoom", ({ transform }) => {
      svg.attr("transform", transform);
    })
  )
  .append("g");

// Define Projection and Path
const projection = d3.geoMercator()
  .scale(150)
  .translate([width / 2, height / 2]);

const path = d3.geoPath().projection(projection);

// Tooltip for Interactivity
const tooltip = d3.select("body").append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

// City Data (Extended)
const cities = [
  { "place_label": "London", "lat": 51.5074, "long": -0.1278, "country": "United Kingdom", "count": 2047 },
  { "place_label": "Leyden", "lat": 43.534, "long": -75.3789, "country": "United States", "count": 442 },
  { "place_label": "Paris", "lat": 48.8535, "long": 2.3484, "country": "France", "count": 243 },
  { "place_label": "New York", "lat": 40.7127, "long": -74.006, "country": "United States", "count": 127 },
  { "place_label": "Vienna", "lat": 48.2084, "long": 16.3725, "country": "Austria", "count": 1 },
  { "place_label": "Prague", "lat": 50.0875, "long": 14.4213, "country": "Czech Republic", "count": 1 },
  { "place_label": "Liverpool", "lat": 53.4072, "long": -2.9917, "country": "United Kingdom", "count": 1 },
  { "place_label": "Amsterdam", "lat": 52.3731, "long": 4.8925, "country": "Netherlands", "count": 14 },
  { "place_label": "Munich", "lat": 48.1371, "long": 11.5754, "country": "Germany", "count": 103 },
  { "place_label": "Rome", "lat": 41.8933, "long": 12.4829, "country": "Italy", "count": 5 },
  { "place_label": "Madrid", "lat": 40.4167, "long": -3.7036, "country": "Spain", "count": 1 },
  { "place_label": "Reims", "lat": 49.2578, "long": 4.0319, "country": "France", "count": 40 },
  { "place_label": "Florence", "lat": 43.7698, "long": 11.2556, "country": "Italy", "count": 36 },
  { "place_label": "New Haven", "lat": 41.3082, "long": -72.9251, "country": "United States", "count": 31 },
  { "place_label": "Austria", "lat": 47.594, "long": 14.1246, "country": "Austria", "count": 30 },
  { "place_label": "Cambron-Casteau", "lat": 50.5831, "long": 3.8875, "country": "Belgium", "count": 29 },
  { "place_label": "Abbaye Saint-Martin de Tournai", "lat": 18.075277, "long": -63.060001, "country": "France", "count": 24 },
  { "place_label": "Oxford", "lat": 51.752, "long": -1.2578, "country": "United Kingdom", "count": 21 },
  { "place_label": "Hainaut", "lat": 50.3619, "long": 4.1252, "country": "Belgium", "count": 21 },
  { "place_label": "Milan", "lat": 45.4642, "long": 9.1896, "country": "Italy", "count": 16 },
  { "place_label": "Laon", "lat": 49.5647, "long": 3.6207, "country": "France", "count": 15 },
  { "place_label": "Cluny", "lat": 46.4339, "long": 4.6576, "country": "France", "count": 13 },
  { "place_label": "Boston", "lat": 42.3554, "long": -71.0605, "country": "United States", "count": 13 },
  { "place_label": "Venice", "lat": 45.4372, "long": 12.3346, "country": "Italy", "count": 9 },
  { "place_label": "Los Angeles", "lat": 34.0537, "long": -118.2428, "country": "United States", "count": 8 },
  { "place_label": "Zürich", "lat": 47.3744, "long": 8.541, "country": "Switzerland", "count": 7 },
  { "place_label": "Troussures", "lat": 49.3828, "long": 1.9594, "country": "France", "count": 7 },
  { "place_label": "Geneva", "lat": 46.2018, "long": 6.1466, "country": "Switzerland", "count": 6 },
  { "place_label": "Autun", "lat": 46.951, "long": 4.2989, "country": "France", "count": 5 },
  { "place_label": "Cambridge", "lat": 52.2055, "long": 0.1187, "country": "United Kingdom", "count": 5 },
  { "place_label": "Leipzig", "lat": 51.3406, "long": 12.3747, "country": "Germany", "count": 4 },
  { "place_label": "Berlin", "lat": 52.5109, "long": 13.3989, "country": "Germany", "count": 4 },
  { "place_label": "Metz", "lat": 49.1197, "long": 6.1764, "country": "France", "count": 3 },
  { "place_label": "Chicago", "lat": 41.8756, "long": -87.6244, "country": "United States", "count": 3 },
  { "place_label": "Trieste", "lat": 45.6496, "long": 13.7773, "country": "Italy", "count": 3 }
];

// Load and Render the World Map
d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
  .then(world => {
    const countries = topojson.feature(world, world.objects.countries).features;

    // Populate Single-Select Dropdown Menu
    d3.select("#countrySelect")
      .selectAll("option")
      .data([...new Set(cities.map(d => d.country))])
      .enter().append("option")
      .text(d => d);

    // Draw World Map
    svg.append("g")
      .selectAll("path")
      .data(countries)
      .enter().append("path")
      .attr("d", path)
      .attr("fill", "lightblue")
      .attr("stroke", "#333");

    // Plot Cities
    const cityGroup = svg.append("g");

    function update(selectedCountry) {
      const filteredCities = selectedCountry === "All" 
        ? cities 
        : cities.filter(d => d.country === selectedCountry);

      const points = cityGroup.selectAll("circle").data(filteredCities, d => d.place_label);

      points.enter().append("circle")
        .attr("cx", d => projection([d.long, d.lat])[0])
        .attr("cy", d => projection([d.long, d.lat])[1])
        .attr("r", d => Math.sqrt(d.count) * 0.8)
        .attr("fill", "orange")
        .attr("opacity", 0.75)
        .on("mouseover", (event, d) => {
          tooltip.transition().duration(200).style("opacity", 0.9);
          tooltip.html(`
            <strong>${d.place_label}</strong><br>
            Manuscripts: ${d.count}<br>
            Coordinates: (${d.lat.toFixed(2)}, ${d.long.toFixed(2)})
          `)
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", () => {
          tooltip.transition().duration(500).style("opacity", 0);
        });

      points.exit().remove();
    }

    // Initial Load
    update("All");

    // Dropdown Change Event
    d3.select("#countrySelect").on("change", function () {
      const selectedOption = d3.select(this).property("value");
      update(selectedOption);
    });
  })
  .catch(error => console.error("Error loading data:", error));
