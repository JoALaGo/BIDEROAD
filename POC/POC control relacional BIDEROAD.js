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
  document.getElementsByClassName('sidebar-container')[0].innerHTML += '<span class="sb-content" onClick="modal_entidades()"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookshelf" viewBox="0 0 16 16"><path d="M2.5 0a.5.5 0 0 1 .5.5V2h10V.5a.5.5 0 0 1 1 0v15a.5.5 0 0 1-1 0V15H3v.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 .5-.5M3 14h10v-3H3zm0-4h10V7H3zm0-4h10V3H3z"></path></svg>&nbsp; Modulo de entidades</span>';
  console.log("Provisional UI injected.");
}


function sleep(ms) {
return new Promise(resolve => setTimeout(resolve, ms));
}

sleep(2000).then(() => { 
  //esperamos a que la pagina cargue completamente
init_dbb();
inject_UI_module(); 
});


