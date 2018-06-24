
/* / Get modal element */
var modal = document.getElementById('simpleModal');
// Get open modal button
var modalCfgU = document.getElementById('modalCfgU');
// Get close button
//var closeBtn = document.getElementsByClassName('close');
var closeBtn = document.getElementsByClassName("close")[0];

// Listen for open click
modalCfgU.addEventListener('click', openModal);
// Listen for close click
closeBtn.addEventListener('click', closeModal);
// Listen for outside click
window.addEventListener('click', outsideClick);

// Function to open modal
function openModal(){
modal.style.display = 'block';
}

// Function to close modal
function closeModal(){
    modal.style.display = 'none';
}
    
// Function to close modal if outside click
function outsideClick(e){
    if(e.target == modal){
    modal.style.display = 'none';
    }
}

var select = document.getElementById('combo');
      $(document).ready(function(){ 
      $('#button1').click(function(){ 
      console.log($('#combo :selected').val());
      });
      });