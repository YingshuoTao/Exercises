$(function() {

  const svg = d3.select("#svg")
                .attr("width", window.innerWidth * 0.85)
                .attr("height", window.innerHeight);
  const $color_picker = $("input[type='color']")[0];
  const $thickness_picker = $("input[type='number']")[0];

  var color = "#000000",
      thickness = 5,
      //points保存了当前step的所有点
      points = [],
      //step为当前一笔画出的图形
      step = [],
      //stack为保存了所有step的二维数组栈
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
      //画点(浏览器渲染内置刷新频率约16ms，快速移动时绘制图形为散点)
      const coordinate = d3.mouse(this);
      const point = svg.append("circle")
                       .attr("cx", coordinate[0])
                       .attr("cy", coordinate[1])
                       .attr("r", thickness)
                       .style("fill", color);
      points.push(point);
      step.push(point);
      //连线（用直线连接绘制的散点确保视觉效果）
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

  //清空stack
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

  //清除stack中末位的step
  function undo() {
    if (stack.length>0) {
      var temp = stack.pop();
      for (let i=0; i<temp.length; i++) {
        temp[i].remove();
      }
    }
  }


  //d3默认不支持同一事件绑定多个处理函数，因此采用e1、e2两个命名空间
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
