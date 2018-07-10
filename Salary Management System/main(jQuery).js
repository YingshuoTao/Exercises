$(function() {

  //初始化
  function initialize() {
    if (!localStorage.staff) {
      localStorage.staff = "";
      staff_json = [];
    } else {
    //将localStorage数据解析为staff_json
    staff_json = JSON.parse(localStorage.staff);
    synchronize();
    }
  }

  initialize();



  //添加员工
  function staff_add() {
    //采集表单数据为new_staff对象
    $("#btn_add").on("click", (event) => {
      event.preventDefault();
      const _name = $("input[name='name']").val();
      const _gender = $("input[name='gender']:checked").val();
      const _age = $("input[name='age']").val();
      //验证表单数据并同步
      if (_name && _age) {
        new_staff = {"name": _name, "gender": _gender, "age": _age};
        staff_json.push(new_staff);
        synchronize();
      }
    });
  }

  staff_add();



  //发生人员变化后同步数据
  function synchronize() {
    //更新显示
    $("#staff_list").html("");
    for (let i=0; i<staff_json.length; i++) {
      $("#staff_list").append(
        "<p>Name: " + staff_json[i].name +
        "   Gender: " + staff_json[i].gender +
        "   Age: " + staff_json[i].age +
        "   <button class='staff_del'>Delete</button></p>"
      );
    }
    //更新localStorage
    localStorage.staff = JSON.stringify(staff_json);
    //更新删除按钮事件
    $(".staff_del").on("click", function() {
      const index = $(this).parent().index();
      $(this).parent().remove();
      staff_json.splice(index, 1);
      localStorage.staff = JSON.stringify(staff_json);
    });
  }

})
