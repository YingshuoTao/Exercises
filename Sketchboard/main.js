function generate_circles(num=10, size=1, id="#svg") {
  function circle_generator() {
    const svg = d3.select(id);
    const width = document.querySelector("#svg").width.baseVal.value
    const height = document.querySelector("#svg").height.baseVal.value
    const x = Math.floor(Math.random() * (width + 1));
    const y = Math.floor(Math.random() * (height + 1));
    const rad = Math.floor(Math.random() * ((width + height) / 8 * size + 1));
    var r = Math.floor(Math.random() * 256).toString(16);
    var g = Math.floor(Math.random() * 256).toString(16);
    var b = Math.floor(Math.random() * 256).toString(16);
    r = (r.length == 2) ? r : "0" + r;
    g = (g.length == 2) ? g : "0" + g;
    b = (b.length == 2) ? b : "0" + b;
    const c = "#".concat(r, g, b);
    console.log(c);
    svg.append("circle")
       .attr("cx", x)
       .attr("cy", y)
       .attr("r", rad)
       .style("fill", c);
  }
  for (let i=0; i<num; i++) {
    circle_generator();
  }
}

generate_circles(20, 0.8);
