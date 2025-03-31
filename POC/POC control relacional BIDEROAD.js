// enter some javascript here and it will run
// on every page on this domain (location.host)

  // Your code here

  var bdd;
  console.log('Incorporating the hierarchy modules and UI');
  
  
  function init_dbb() {
  bdd = localStorage.getItem('bdd_entidades');//el registro de entidades contiene las relaciones entre entidades
  if (bdd == null) {
      localStorage.setItem('bdd_entidades', '{"root":""}');
          console.log("BDD not found, creating the BDD.");
  }else{
          console.log("DBB retrieved.");
          if(bdd!=''){
              bdd = JSON.parse(bdd);	
              console.log("DBB loaded.");
          }else{
              console.log("DBB loaded but empty.");
          }
          
      }
}

function inject_UI_module() {
  document.getElementsByClassName('sidebar-container')[0].innerHTML += '<span class="sb-content" onClick="abrir_modal_entidades()"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookshelf" viewBox="0 0 16 16"><path d="M2.5 0a.5.5 0 0 1 .5.5V2h10V.5a.5.5 0 0 1 1 0v15a.5.5 0 0 1-1 0V15H3v.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 .5-.5M3 14h10v-3H3zm0-4h10V7H3zm0-4h10V3H3z"></path></svg>&nbsp; Modulo de entidades</span>';
  document.body.innerHTML+='<div id="modal_entidades" class="modal" style="display:none;"><div class="modal-content"><span class="close" id="close_modal">&times;</span><h2>Modal Title</h2><p id="injected_modal_text">This is the modal content.</p></div></div>';

  console.log("Provisional UI injected.");
  

}
 // Get modal and close button


 // Function to open the modal
 function abrir_modal_entidades() {
    let modal = document.getElementById('modal_entidades');
     modal.style.display = "block";
     // You can inject content here if needed
     
 }
 


function sleep(ms) {
return new Promise(resolve => setTimeout(resolve, ms));
}

sleep(2000).then(() => { 
  //esperamos a que la pagina cargue completamente
  // When the user clicks on <span> (x), close the modal
 document.head.append('<link type="text/css" href="css/style.css?ver=1.1" rel="stylesheet"><link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" type="text/css"><link type="text/css" href="css/popup.css" rel="stylesheet" />');
 sleep(2000).then(() => { 

init_dbb();
inject_UI_module(); 
});
 
});


