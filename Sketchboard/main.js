//随机圆数组
class Circles {

  // num为圆数量，size为尺寸系数，id为<svg>的css选择器
  // eg. var circles = new Circles(20, 0.8); //生成20个尺寸系数为0.8的圆
  constructor(num=10, size=1, id="#svg") {

    const svg = d3.select(id);
    const width = document.querySelector("#svg").width.baseVal.value;
    const height = document.querySelector("#svg").height.baseVal.value;
    var circles = [];

    function circle_generator() {
      const [x, y] = Circles.random_coordinate(width, height);
      const r = Math.floor(Math.random() * (width + height) / 8 * size);
      const circle = svg.append("circle")
                        .attr("cx", x)
                        .attr("cy", y)
                        .attr("r", r)
                        .style("fill", Circles.random_color());
      circles.push(circle);
    }

    for (let i=0; i<num; i++) {
      circle_generator();
    }

    this.svg = svg;
    this.width = width;
    this.height = height;
    this.circles = circles;

  }


  //辅助方法
  static random_coordinate(width, height) {
    const x = Math.floor(Math.random() * (width + 1));
    const y = Math.floor(Math.random() * (height + 1));
    return [x, y];
  }

  static random_color() {
    var c = Math.floor(Math.random() * 16777216).toString(16);
    while (c.length < 6) {
        c = "0" + c;
    }
    return "#" + c;
  }


  // num为变色次数，freq为频率系数
  // eg. circles.neon(50, 2); //圆数组进行50次变色，频率系数为2
  neon(num=10, freq=1) {
    var command = "";
    for (let i=0; i<this.circles.length; i++) {
      command = "this.circles[" + i + "]";
      for (let j=0; j<num; j++) {
        const time = Math.random() * 1001 / freq;
        command += ".transition().duration(" + time +
                   ").style('fill', Circles.random_color())";
      }
      command += ";";
      eval(command);
    }
  }

  // spd为聚集速度，x为横坐标占宽度百分比，y为纵坐标占高度百分比，无x，y则目标位置随机
  // eg. circles.gather(1.5, 30, 40); //圆数组以1.5倍速度聚集至画布(30%, 40%)处
  gather(spd=1,x=Math.floor(Math.random()*101),
               y=Math.floor(Math.random()*101)) {
    for (let i=0; i<this.circles.length; i++) {
      this.circles[i].transition()
                     .duration(3000 / spd)
                     .attr("cx", x / 100 * this.width)
                     .attr("cy", y / 100 * this.height);
    }
  }

  // freq为频率系数，num为分散次数
  // eg. circles.separate(0.8, 5); //圆数组以0.8的频率系数进行5次分散分布
  separate(freq=1, num=1) {
    var command = "";
    for (let i=0; i<this.circles.length; i++) {
      command = "this.circles[" + i + "]";
      for (let j=0; j<num; j++) {
        command += ".transition().duration(3000 / " + freq +
                   ").attr('cx'," +
                   "Circles.random_coordinate(this.width, this.height)[0])" +
                   " .attr('cy'," +
                   "Circles.random_coordinate(this.width, this.height)[1])";
      }
      command += ";";
      eval(command);
    }
  }

  // num为震动次数，freq为频率，amp为振幅
  // eg. circles.vibrate(50, 1.5, 2); //进行50次频率系数为1.5，振幅系数为2的震动
  vibrate(num=10, freq=1, amp=1) {
    var command = "";
    for (let i=0; i<this.circles.length; i++) {
      command = "this.circles[" + i + "]";
      for (let j=0; j<num; j++) {
        command += ".transition().duration(Math.random() * 200 / " +
                   freq + ").attr('cx'," +
                   "this.circles[i]._groups[0][0].cx.baseVal.value + " +
                   "(Math.random() >= 0.5 ? 1 : -1) * " +
                   "Math.floor(Math.random() * 10 * " + amp + ")).attr('cy'," +
                   "this.circles[i]._groups[0][0].cy.baseVal.value + " +
                   "(Math.random() >= 0.5 ? 1 : -1) * " +
                   "Math.floor(Math.random() * 10 * " + amp + "))";
      }
      command += ";";
      eval(command);
    }
  }

  //停止鬼畜
  stop() {
    for (let i=0; i<this.circles.length; i++) {
      this.circles[i].transition();
    }
  }

  //清空圆数组
  clear() {
    for (let i=0; i<this.circles.length; i++) {
      this.circles[i]._groups[0][0].remove();
    }
    delete this.svg;
    delete this.width;
    delete this.height;
    delete this.circles;
  }

}

//扬帆起航
var a = new Circles(200, 0.2);
