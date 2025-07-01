// Get the modal
var modal = document.getElementById("myModal");
var modal_change = document.getElementById("myModal_change");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
var span_change = document.getElementsByClassName("Update")[0];

// When the user clicks the button, open the modal 
function openForm(id,userid,name) {
  modal.style.display = "block";
  document.getElementById('id').textContent += id;
  document.getElementById('name').textContent += name;
  document.getElementById('idNumber').value = id;
}
function openForm_change(id,name,role,session,userid,sick,business,vacation) {
    modal_change.style.display = "block";
    document.getElementById('identicationNumber').value = id;
    document.getElementById('name_update').value = name;
    document.getElementById('role').textContent = role;
    document.getElementById('role').value = role;
    document.getElementById('session').value = session;
    document.getElementById('uid').value = userid;
    document.getElementById('sick_leave').value = sick;
    document.getElementById('business_leave').value = business;
    document.getElementById('vacation_leave').value = vacation;
  }

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
  document.getElementById('id').textContent = '';
  document.getElementById('name').textContent = '';
}
span_change.onclick = function() {
    modal_change.style.display = "none";
    document.getElementById('id').textContent = '';
    document.getElementById('name').textContent = '';
  }

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    document.getElementById('id').textContent = '';
    document.getElementById('name').textContent = '';
  }
  else if (event.target == modal_change) {
    modal_change.style.display = "none";
  }
  
}