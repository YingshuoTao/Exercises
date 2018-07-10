var staff = new Vue({
  el: "#staff_management",
  data: {
    staff: [],
    new_personel: {}
  },
  methods: {
    personel_add: function() {
      if (staff.new_personel.name &&
          staff.new_personel.gender &&
          staff.new_personel.age) {
        staff.staff.push(staff.new_personel);
        staff.new_personel = {};
        synchronize();
      }
    },
    personel_remove: function($event) {
      const $temp = $($event.target).parent();
      staff.staff.splice($temp.index(), 1);
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



$(function() {
  if (localStorage.staff) {
    initialize();
  }
})
