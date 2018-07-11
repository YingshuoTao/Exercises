var staff = new Vue({
  el: "#staff_management",
  data: {
    data_structure: ["name", "gender", "age", "position", "salary", "insurance"],
    staff: [],
    new_personel: {},
    edit_mode: false,
    current_personel: undefined
  },
  computed: {
    staff_number: function() {
      return this.staff.length;
    },
    personel_taxes: function() {
      const gross = parseInt(staff.current_personel.salary);
      var taxes = taxes_calculator(gross);
      return taxes;
    },
    personel_net_salary: function() {
      const gross = parseInt(staff.current_personel.salary);
      var taxes = taxes_calculator(gross);
      return gross - taxes;
    },
    total_cashflow: function() {
      var res = 0;
      for (let i=0; i<this.staff.length; i++) {
        res += (parseInt(this.staff[i].salary) || 0) +
               (parseInt(this.staff[i].insurance) || 0);
      }
      return res;
    },
    taxes_and_insurance: function() {
      var res = 0;
      for (let i=0; i<this.staff.length; i++) {
        res += (parseInt(this.staff[i].insurance) || 0);
      }
      return res;
    }
  },
  methods: {
    edit_toggle: function() {
      staff.edit_mode = !staff.edit_mode;
      staff.current_personel = undefined;
    },
    personel_add: function() {
      if (staff.new_personel.name) {
        staff.staff.push(staff.new_personel);
        staff.new_personel = {};
        synchronize();
      }
    },
    personel_detail: function($event) {
      const $temp = $($event.target).parent().parent();
      staff.current_personel = staff.staff[$temp.index()-1];
    },
    personel_remove: function($event) {
      const $temp = $($event.target).parent().parent();
      staff.staff.splice($temp.index()-1, 1);
      synchronize();
    },
    personel_edit: function($event) {
      const $temp = $($event.target).parent();
      // $temp.parent().index()-1为行索引
      // $temp.index()为列索引
      Vue.set(staff.staff[$temp.parent().index()-1],
              staff.data_structure[$temp.index()],
              $event.target.value);
      synchronize();
    }
  }
});



function initialize() {
  staff.staff = JSON.parse(localStorage.staff);
}

function synchronize() {
  localStorage.staff = JSON.stringify(staff.staff);
}

function taxes_calculator(gross) {
  var taxes = 0;
  if (gross > 5000) {
    if (gross > 8000) {
      taxes += 3000 * 0.03;
      if (gross > 17000) {
        taxes += 9000 * 0.1;
        if (gross > 30000) {
          taxes += 13000 * 0.2;
          //More...
          taxes += (gross - 5000 - 3000 - 9000 - 13000) * 0.25
        } else {
          taxes += (gross - 5000 - 3000 - 9000) * 0.2
        }
      } else {
        taxes += (gross - 5000 - 3000) * 0.1
      }
    } else {
      taxes += (gross - 5000) * 0.03;
    }
  }
  return taxes;
}



$(function() {
  if (localStorage.staff) {
    initialize();
  }
})
