// Get the modal
var modal = document.getElementById("myModal");
var modal_change = document.getElementById("myModal_change");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
var span_change = document.getElementsByClassName("Update")[0];

// When the user clicks the button, open the modal 
function openForm(id) {
  modal.style.display = "block";
  document.getElementById('id2').value = id;
  document.getElementById('idtext').textContent = id;
}
function openForm_change(id,empid,type,boss,name,position,leave_reason,leave_day_total,leave_day_begin,leave_day_end,leave_day_come) {
    modal_change.style.display = "block";
    document.getElementById('id').value = id;
    document.getElementById('type').value = type;
    if(parseInt(type) == 1 ){
        var type_value = "ลาป่วย";
    }
    else if(parseInt(type) == 2){
        var type_value = "ลากิจ";
    }
    else{
        var type_value = "ลาพักร้อน";
    }
    if(parseInt(boss) == 1 ){
        var boss_value = "Mr.Warut";
    }
    else if(parseInt(boss) == 2){
        var boss_value = "Mr.Siripong";
    }
    else if(parseInt(boss) == 3){
        var boss_value = "Mr.Wachira";
    }
    else{
        var boss_value = "Mr.Anusit";
    }
    document.getElementById('type').textContent += type_value;
    document.getElementById('boss').value = boss;
    document.getElementById('boss').textContent += boss_value;
    document.getElementById('name').value = name;
    document.getElementById('position').value = position;
    document.getElementById('position').textContent += position;
    document.getElementById('leave_reason').textContent += leave_reason;
    document.getElementById('t1').value = leave_day_begin;
    document.getElementById('t2').value = leave_day_end;
    document.getElementById('total').value = leave_day_total;
    document.getElementById('leave_day_come').value = leave_day_come;
    
    
  }

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
  
}
span_change.onclick = function() {
    modal_change.style.display = "none";
    document.getElementById('type').textContent = '';
    document.getElementById('boss').textContent = '';
    document.getElementById('position').textContent ='';
    document.getElementById('leave_reason').textContent = '';
    document.getElementById('position').value = '';
  }

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    
  }
  else if (event.target == modal_change) {
    modal_change.style.display = "none";
    document.getElementById('type').textContent = '';
    document.getElementById('boss').textContent = '';
    document.getElementById('position').textContent ='';
    document.getElementById('leave_reason').textContent = '';
    
  }
  
}