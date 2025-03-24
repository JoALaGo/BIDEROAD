var ultima_migaja;
var diccionario_ids_dom = new Object();
var diccionario_ids_trazabilidad = new Object();

function seguir_pista(entrada_migaja, entrada_objetivo) {
    //la entrada de la migaja es un objeto del DOM
    //la entrada_objetivo es el ID al que queremos ir
    console.log("Pistas: "+entrada_migaja+","+entrada_objetivo);
    ultima_migaja = entrada_migaja;
    enfocar(entrada_objetivo.trim());

}

function retornar_pista() {
    enfocar(entrada_migaja);
}

function ver_relativos(entrada) {
    alert("Descendientes: " + entrada);
}

function enfocar(entrada) {
    try {
        if(typeof(entrada)=='object'){
            entrada.focus();
        }else{
            document.getElementById(entrada).focus();
        }
    } catch (error) {
        alert('Error al intentar enfocar objecto: '+entrada);
    }
   
    
}

function colocar_migajas() {

    for (let a = 0; a < document.getElementsByTagName('td').length; a++) {
        var current_td_data = document.getElementsByTagName('td')[a].innerHTML;
        if (document.getElementsByTagName('td')[a].childNodes.length == 1) {
            //Transformamos las strings de ID dentro de los elementos td en elementos <a>
            const pattern1 = /^R\d{3}\.SR\d{3}\.F\d{3}\.SF\d{3}\.P\d{3}\.SP\d{3}\.EC\d{3}$/;//patron de IDs de elementos
            if (pattern1.test(current_td_data.trim())) {
                console.log("Testing TD for id pattern: " + current_td_data);
                console.log(" %cApplicable ID: " + pattern1.test(current_td_data.trim()), "background-color:green;color:white");
                var result = "<a id='" + current_td_data.trim() + "' onclick='ver_relativos(`" + current_td_data.trim() + "`)' href='#" + current_td_data.trim() + "'>" + current_td_data.trim() + "</a>";
                console.log("Result: " + result);
                this.diccionario_ids_trazabilidad[current_td_data.trim()]='';
                document.getElementsByTagName('td')[a].innerHTML = result;
                
            }

        }
    }
    for (let a = 0; a < document.getElementsByTagName('td').length; a++) {
        var current_td_data = document.getElementsByTagName('td')[a].innerHTML;
        if (document.getElementsByTagName('td')[a].childNodes.length == 1) {
            //Transformamos las strings de dependencias de cierto tipo a un Hyperlink para enfocar la dependencia.
            const pattern2 = /^D-R\d{3}\.SR\d{3}\.F\d{3}\.SF\d{3}\.P\d{3}\.SP\d{3}\.EC\d{3}$/;
            let new_dom_id= Date.now()+Math.random() * (99999 - 1111) + 1111;
            if (pattern2.test(current_td_data.trim())) {
                
                console.log("Testing TD for dep. id pattern: " + current_td_data);
                console.log(" %cApplicable Dependency ID: " + pattern2.test(current_td_data.trim()), "background-color:green;color:white");
                var result = "<a id='"+new_dom_id+"' href='#" + current_td_data.replace('D-', '') + "' onclick='seguir_pista(`" + new_dom_id + "`,`" + current_td_data.replace('D-','') + "`)'>" + current_td_data.replace('D-', '') + "</a>";
                console.log("Result: " + result);
                this.diccionario_ids_dom[current_td_data.trim()]='';
                document.getElementsByTagName('td')[a].innerHTML = result;
                
            }
        }
    }

}


function colocar_footer(){
    const footer = document.createElement('footer');
    const div = document.createElement('div');
    div.classList.add('footer-buttons');
    
    // Create 5 buttons
    for (let i = 1; i <= 5; i++) {
        const button = document.createElement('button');
        button.textContent = `Button ${i}`;
        div.appendChild(button);
    }
    
    // Append the div to the footer and the footer to the body
    footer.appendChild(div);
    document.body.appendChild(footer);
    
    // Add some CSS to make the footer stick to the bottom of the viewport
    const style = document.createElement('style');
    style.textContent = `
        body {
            margin: 0;
            padding: 0;
        }
    
        footer {
            position: fixed; /* Fix the footer at the bottom */
            left: 0;
            bottom: 0;
            width: 100%; /* Ensure it takes up the full width of the viewport */
            background-color: #333;
            color: white;
            padding: 10px;
            z-index: 1000; /* Ensure the footer stays above other content */
        }
    
        .footer-buttons {
            display: flex;
            justify-content: space-around;
        }
    
        button {
            background-color: #444;
            color: white;
            border: none;
            padding: 10px;
            cursor: pointer;
        }
    
        button:hover {
            background-color: #555;
        }
    `;
    
    document.head.appendChild(style);

    for(x in document.getElementsByTagName("table")){
        document.getElementsByTagName("table")[x].className = "zoomable";
      } 
    

    function separar_tablas() {
        let regex = /^R\d{3}\.SR\d{3}\.F\d{3}\.SF\d{3}\.P\d{3}\.SP\d{3}\.EC\d{3}$/;
var result = document.createElement('table');
for(let x in document.querySelectorAll('tr')){
try{
if(regex.test(document.querySelectorAll('tr')[x].cells[0].innerText)){
    console.log(document.querySelectorAll('tr')[x].cells[0].innerText);

result.append(document.querySelectorAll('tr')[x]);
  }
}catch(e){
}
  

}
document.body.innerHTML="";
document.body.append(result);
    }
    
   
    
    
}
window.onload = function(e){ 
    colocar_migajas();
    colocar_footer();
}
