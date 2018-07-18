$(function() {

  const svg = d3.select("#svg")
                .attr("width", window.innerWidth * 0.85)
                .attr("height", window.innerHeight);
  const $color_picker = $("input[type='color']")[0];
  const $thickness_picker = $("input[type='number']")[0];

  var color = "#000000",
      thickness = 5,
      points = [],
      step = [],
      stack = [],
      drawing = false;

  $($color_picker).on("change", function() {
    color = $color_picker.value;
  });
  $($thickness_picker).on("change", function() {
    thickness = parseInt($thickness_picker.value);
  });

  $("#erase").on("click", function() {
    erase();
  });
  $("#undo").on("click", function() {
    undo();
  });
  $("#hint").on("click", function() {
    console.log("Try the following commands!");
    console.log("******************************");
    console.log("var circles = new Circles()");
    console.log("circles.neon()");
    console.log("circles.gather()");
    console.log("circles.separate()");
    console.log("circles.vibrate()");
    console.log("circles.stop()");
    console.log("circles.clear()");
    console.log("******************************");
    alert("Hints displayed in console.");
  });


  function draw() {
    if (drawing) {
      const coordinate = d3.mouse(this);
      const point = svg.append("circle")
                       .attr("cx", coordinate[0])
                       .attr("cy", coordinate[1])
                       .attr("r", thickness)
                       .style("fill", color);
      points.push(point);
      step.push(point);
      if (points.length>1) {
        const p1 = points[points.length-2];
        const p2 = points[points.length-1];
        const joint = svg.append("line")
                         .attr("x1", p1._groups[0][0].cx.baseVal.value)
                         .attr("y1", p1._groups[0][0].cy.baseVal.value)
                         .attr("x2", p2._groups[0][0].cx.baseVal.value)
                         .attr("y2", p2._groups[0][0].cy.baseVal.value)
                         .attr("stroke-width", thickness * 2)
                         .style("stroke", color);
      step.push(joint);
      }
    }
  }

  function erase() {
    const confirm = window.confirm("Are you sure " +
                                   "you want to erase all the drawings?");
    if (confirm) {
      for (let i=0; i<stack.length; i++) {
        for (let j=0; j<stack[i].length; j++) {
          stack[i][j].remove();
        }
      }
      stack = [];
    }
  }

  function undo() {
    if (stack.length>0) {
      var temp = stack.pop();
      for (let i=0; i<temp.length; i++) {
        temp[i].remove();
      }
    }
  }


  svg.on("mousedown.e1", function() {
       drawing = true;
   }).on("mousedown.e2", draw)
     .on("mouseup", function(){
       drawing = false;
       points = [];
       stack.push(step);
       step = [];
   }).on("mousemove", draw);

});
