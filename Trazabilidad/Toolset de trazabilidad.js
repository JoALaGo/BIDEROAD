var datatables = [];
    var ultima_migaja;
    var diccionario_ids_dom = new Object();
    var diccionario_ids_trazabilidad = new Object();

    function seguir_pista(entrada_migaja, entrada_objetivo) {
      //la entrada de la migaja es un objeto del DOM
      //la entrada_objetivo es el ID al que queremos ir
      console.log("Pistas: " + entrada_migaja + "," + entrada_objetivo);
      ultima_migaja = entrada_migaja;
      enfocar(entrada_objetivo.trim());

    }

    function retornar_pista() {
      enfocar(entrada_migaja);
    }
    function buildAncestorTree(clickedID) {
      // Define the hierarchy order.
      const levels = ["R", "SR", "F", "SF", "P", "SP", "EC", "ER"];
      let parts = clickedID.split(".");
      let candidates = [];

      // Helper: generate a candidate by modifying one level.
      // It takes a base parts array and a level index to “flip.”
      // For that level, if its value ends with "000", we upgrade it to prefix+"001";
      // otherwise we downgrade it to prefix+"000".
      // All lower levels are then set to their default ("000").
      function generateCandidate(levelIndex, baseParts) {
        let newParts = baseParts.slice(); // clone array
        const prefix = levels[levelIndex];
        let current = newParts[levelIndex];
        let candidateValue;
        if (current.endsWith("000")) {
          candidateValue = prefix + "001";
        } else {
          candidateValue = prefix + "000";
        }
        newParts[levelIndex] = candidateValue;
        // For all lower levels, set them to default: prefix + "000"
        for (let j = levelIndex + 1; j < newParts.length; j++) {
          newParts[j] = levels[j] + "000";
        }
        return newParts.join(".");
      }

      // In our example the key levels are:
      // Level 2: F, Level 4: P, Level 5: SP.
      // Process them in order; if one candidate is found, use it as the base for the next.

      // Level F (index 2)
      let candidateF = generateCandidate(2, parts);
      candidates.push(candidateF);

      // Level P (index 4) using candidateF as the new base.
      let partsForP = candidateF.split(".");
      let candidateP = generateCandidate(4, partsForP);
      candidates.push(candidateP);

      // Level SP (index 5) using candidateP as the new base.
      let partsForSP = candidateP.split(".");
      let candidateSP = generateCandidate(5, partsForSP);
      candidates.push(candidateSP);

      return candidates;
    }

    function findRowsForCandidates(candidates) {
      let results = [];
      // Search every <tr> in the document.
      const allRows = document.querySelectorAll("tr");
      candidates.forEach(candidate => {
        allRows.forEach(tr => {
          let firstCell = tr.querySelector("td, th");
          if (firstCell && firstCell.textContent.trim() === candidate) {
            results.push(candidate);
          }
        });
      });
      return results;
    }

    function processNamespaceClick(clickedID) {
      // Build the candidate ancestor/child tree from the clicked ID.
      const candidates = buildAncestorTree(clickedID);
      console.log("Candidate tree based on clicked ID:", candidates);

      // Search through all rows for matching candidates.
      const found = findRowsForCandidates(candidates);
      console.log("Found related rows:", found);
    }
    function ver_relativos(entrada) {

      processNamespaceClick(entrada);
    }

    function enfocar(entrada) {
      try {
        if (typeof (entrada) == 'object') {
          entrada.focus();
        } else {
          document.getElementById(entrada).focus();
        }
      } catch (error) {
        alert('Error al intentar enfocar objecto: ' + entrada);
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
            this.diccionario_ids_trazabilidad[current_td_data.trim()] = '';
            document.getElementsByTagName('td')[a].innerHTML = result;

          }

        }
      }

      for (let a = 0; a < document.getElementsByTagName('td').length; a++) {
        var current_td_data = document.getElementsByTagName('td')[a].innerHTML;
        if (document.getElementsByTagName('td')[a].childNodes.length == 1) {
          //Transformamos las strings de ID dentro de los elementos td en elementos <a>
          const pattern1 = /^NFR\d{3}\.SR\d{3}\.F\d{3}\.SF\d{3}\.P\d{3}\.SP\d{3}\.EC\d{3}$/;//patron de IDs de elementos
          if (pattern1.test(current_td_data.trim())) {
            console.log("Testing TD for id pattern: " + current_td_data);
            console.log(" %cApplicable ID: " + pattern1.test(current_td_data.trim()), "background-color:green;color:white");
            var result = "<a id='" + current_td_data.trim() + "' onclick='ver_relativos(`" + current_td_data.trim() + "`)' href='#" + current_td_data.trim() + "'>" + current_td_data.trim() + "</a>";
            console.log("Result: " + result);
            this.diccionario_ids_trazabilidad[current_td_data.trim()] = '';
            document.getElementsByTagName('td')[a].innerHTML = result;

          }

        }
      }

      for (let a = 0; a < document.getElementsByTagName('td').length; a++) {
        var current_td_data = document.getElementsByTagName('td')[a].innerHTML;
        if (document.getElementsByTagName('td')[a].childNodes.length == 1) {
          //Transformamos las strings de dependencias de cierto tipo a un Hyperlink para enfocar la dependencia.
          const pattern2 = /^D-R\d{3}\.SR\d{3}\.F\d{3}\.SF\d{3}\.P\d{3}\.SP\d{3}\.EC\d{3}$/;
          let new_dom_id = Date.now() + Math.random() * (99999 - 1111) + 1111;
          if (pattern2.test(current_td_data.trim())) {

            console.log("Testing TD for dep. id pattern: " + current_td_data);
            console.log(" %cApplicable Dependency ID: " + pattern2.test(current_td_data.trim()), "background-color:green;color:white");
            var result = "<a id='" + new_dom_id + "' href='#" + current_td_data.replace('D-', '') + "' onclick='seguir_pista(`" + new_dom_id + "`,`" + current_td_data.replace('D-', '') + "`)'>" + current_td_data.replace('D-', '') + "</a>";
            console.log("Result: " + result);
            this.diccionario_ids_dom[current_td_data.trim()] = '';
            document.getElementsByTagName('td')[a].innerHTML = result;

          }
        }
      }

    }

    var botones = [];
    function colocar_footer() {
      botones = [];
      const footer = document.createElement('footer');
      const div = document.createElement('div');
      div.classList.add('footer-buttons');

      // Create 5 buttons
      for (let i = 1; i <= 5; i++) {
        const button = document.createElement('button');
        botones.push(button.textContent = `Button ${i}`);
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
      //restaurar vista original
      document.getElementsByTagName('button')[0].innerText = "Vista treesheets"
      document.getElementsByTagName('button')[0].onclick = function () { restaurar_vista_original() };

      document.getElementsByTagName('button')[1].innerText = "Vista separada"
      document.getElementsByTagName('button')[1].onclick = function () { window.location.reload() };







    }

    /**
     * Separates all nested tables from a container element.
     * @param {HTMLElement} container - The outer container (or table) element.
     * @returns {HTMLElement[]} An array of detached table elements.
     */
    function separateTables(container) {
      const innerTables = container.querySelectorAll('table');
      const separated = [];
      innerTables.forEach(table => {
        if (table.parentNode) {
          table.parentNode.removeChild(table);
        }
        separated.push(table);
      });
      return separated;
    }

    /**
     * Categorizes rows into groups:
     * - If any cell in a row contains a dependency (i.e. a substring matching /\bD-\S+/),
     *   the row is categorized as a dependency.
     * - Else if the row’s first cell starts with "CHL-", it goes to the "changelog" group.
     * - Otherwise, the row is scanned for a breadcrumb test ID and each non-"000" part is added
     *   to its corresponding category.
     *
     * The test ID format is:
     *   [NFR or R]xxx.SRxxx.Fxxx.SFxxx.Pxxx.SPxxx.ECxxx
     * optionally with ".ERxxx" appended.
     *
     * Groups include:
     *   changelog, dependency, nonFunctionalRequisite, requisite, subRequisite, function, 
     *   subFunction, prueba, subPrueba, edgeCase, error.
     *
     * @param {HTMLTableRowElement[]} rows - Array of table row elements.
     * @returns {Object} An object with keys for each group and values as arrays of rows.
     */
    function categorizeRowsByTestId(rows) {
      // Map prefixes to category names.
      const categoryMap = {
        NFR: "nonFunctionalRequisite",
        R: "requisite",
        SR: "subRequisite",
        F: "function",
        SF: "subFunction",
        P: "prueba",
        SP: "subPrueba",
        EC: "edgeCase",
        ER: "error"
      };

      // Initialize groups, adding "changelog" and "dependency".
      const groups = {
        changelog: [],
        dependency: [],
        nonFunctionalRequisite: [],
        requisite: [],
        subRequisite: [],
        function: [],
        subFunction: [],
        prueba: [],
        subPrueba: [],
        edgeCase: [],
        error: []
      };

      // Regular expression to match a breadcrumb.
      // Accepts either "NFR" or "R" as the first part.
      const breadcrumbRegex = /(NFR\d{3}|R\d{3})\.SR\d{3}\.F\d{3}\.SF\d{3}\.P\d{3}\.SP\d{3}\.EC\d{3}(?:\.ER\d{3})?/;

      rows.forEach(row => {
        const cells = row.querySelectorAll('td, th');
        if (!cells.length) return;

        // Check every cell for a dependency ID using a regex that looks for a word boundary.
        let isDependency = false;
        for (let cell of cells) {
          if (/\bD-\S+/.test(cell.textContent)) {
            isDependency = true;
            break;
          }
        }
        if (isDependency) {
          groups.dependency.push(row);
          return; // Stop further processing.
        }

        // Check if the row is a changelog row (first cell starts with "CHL-").
        const firstCellText = cells[0].textContent.trim().replace(/\s+/g, '');
        if (firstCellText.startsWith("CHL-")) {
          groups.changelog.push(row);
          return; // Do not process further.
        }

        // For remaining rows, search the entire row for the breadcrumb.
        const rowText = row.textContent.replace(/\s+/g, "");
        const match = rowText.match(breadcrumbRegex);
        console.log(row);
        console.log(rowText);
        if (!match) {
          console.log("FAILED");
          return; // Skip if no breadcrumb is found.
        }

        const breadcrumb = match[0];
        // Split the breadcrumb into its parts.
        const parts = breadcrumb.split('.');

        parts.forEach(part => {
          // Match parts such as "NFR002", "R003", "SR000", etc.
          const partMatch = part.match(/^(NFR|R|SR|F|SF|P|SP|EC|ER)(\d{3})$/);
          if (partMatch && partMatch[2] !== "000") {
            const prefix = partMatch[1];
            const category = categoryMap[prefix];
            if (category) {
              console.log("Assigned to: " + prefix);
              groups[category].push(row);
            }
          }
        });
      });
      return groups;
    }

    /**
     * Creates a new table element for a given category, adds a header row (using an existing
     * header row if available, or creating a generic header), and appends the provided rows.
     * @param {String} category - The category name (e.g., "function", "dependency", etc.).
     * @param {HTMLTableRowElement[]} rows - Array of rows to be appended to the table.
     * @returns {HTMLTableElement} The newly created table.
     */
    function createCategoryTable(category, rows) {
      const table = document.createElement('table');
      table.id = `table-${category}`;
      table.style.marginBottom = '20px';
      table.style.borderCollapse = 'collapse';
      table.style.width = '100%';
      table.style.border = '1px solid #ccc';

      // Attempt to find a header row among the rows (one containing <th> cells).
      let headerRowIndex = rows.findIndex(row => row.querySelector('th'));
      let headerRow = null;
      if (headerRowIndex !== -1) {
        // Remove header row from the group to avoid duplicating it.
        headerRow = rows.splice(headerRowIndex, 1)[0];
      }

      // Create a category title row.
      const categoryTitleRow = document.createElement('tr');
      const categoryTitleCell = document.createElement('th');
      // Determine the column count based on the header row (if available) or the first data row.
      const colCount = headerRow
        ? headerRow.children.length
        : (rows[0] ? rows[0].children.length : 1);
      categoryTitleCell.colSpan = colCount;
      categoryTitleCell.textContent = category;
      categoryTitleCell.style.backgroundColor = '#d0d0d0';
      categoryTitleCell.style.padding = '8px';
      categoryTitleCell.style.border = '1px solid #ccc';
      categoryTitleRow.appendChild(categoryTitleCell);
      table.appendChild(categoryTitleRow);

      // Append the header row if available; otherwise, create a generic header.
      if (headerRow) {
        table.appendChild(headerRow.cloneNode(true));
      } else if (rows.length > 0) {
        const genericHeaderRow = document.createElement('tr');
        for (let i = 0; i < colCount; i++) {
          const th = document.createElement('th');
          th.textContent = `Column ${i + 1}`;
          th.style.backgroundColor = '#f0f0f0';
          th.style.padding = '8px';
          th.style.border = '1px solid #ccc';
          genericHeaderRow.appendChild(th);
        }
        table.appendChild(genericHeaderRow);
      }

      // Append the data rows.
      rows.forEach(row => {
        table.appendChild(row);
      });

      return table;
    }


    function backup_contenido_original() {
      localStorage.setItem('original_body', document.body.innerHTML);
    }

    function backup_contenido_segmentado() {
      localStorage.setItem('segmented_body', document.body.innerHTML);
    }

    function addExternalCSS(url) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = url;
      link.type = 'text/css';
      document.head.appendChild(link);
    }

    function addExternalScript(url, callback) {
      const script = document.createElement('script');
      script.src = url;
      script.type = 'text/javascript';
      script.onload = callback; // Optional: Run a function when the script loads
      document.head.appendChild(script);
    }


    function arreglarFormatoTabla(id) {
      const table = document.getElementById(id);

      if (!table) {
        console.error("Table not found");
        console.log(id);
        return;
      }

      const rows = Array.from(table.rows);

      // Extract the title row
      const titleRow = rows.shift();
      if (titleRow && titleRow.cells.length === 1 && titleRow.cells[0].colSpan > 1) {
        const caption = document.createElement("caption");
        caption.textContent = titleRow.cells[0].textContent.trim();
        table.prepend(caption);
      }

      // Extract the header row
      const headerRow = rows.shift();
      if (headerRow && headerRow.cells[0].tagName === "TH") {
        let thead = table.querySelector("thead");
        if (!thead) {
          thead = document.createElement("thead");
          table.insertBefore(thead, table.tBodies[0]);
        }

        thead.appendChild(headerRow);
      }

      // Reinsert remaining rows into <tbody>
      let tbody = table.querySelector("tbody");
      if (!tbody) {
        tbody = document.createElement("tbody");
        table.appendChild(tbody);
      }

      tbody.innerHTML = "";
      rows.forEach(row => tbody.appendChild(row));
    }


    function restaurar_vista_original() {
      document.body.innerHTML = localStorage.getItem('original_body');
      colocar_footer();
    }

    function colocar_vista_segmentada() {

      datatables = [];
      document.body.innerHTML = localStorage.getItem('segmented_body');
      for (let x in document.getElementsByTagName('table')) {
        //inicializamos las data tables
        datatables.push(new DataTable('#' + document.getElemensByTagName('table')[x].id));
      }



    }







    window.onload = function (e) {

      backup_contenido_original();

      colocar_footer();

      //we load jquery and datatable styles
      addExternalCSS('https://cdn.datatables.net/2.2.2/css/dataTables.dataTables.min.css');
      addExternalScript('https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js',
        function () {


          addExternalScript('https://cdn.datatables.net/2.2.2/js/dataTables.min.js', function () {

            //clasificamos las tablas
            // --- Example usage ---

            // 1. Separate all inner tables from the outer container.
            const outerContainer = document.body; // Replace with your container element.
            const tablesArray = separateTables(outerContainer);

            // 2. Gather all rows from the separated tables.
            let allRows = [];
            tablesArray.forEach(table => {
              // Adjust the selector if your rows are not inside <tbody>.
              const rows = Array.from(table.querySelectorAll('tr'));
              allRows = allRows.concat(rows);
            });

            // 3. Categorize the rows by the test ID breadcrumb, changelogs, and dependencies.
            const categorizedRows = categorizeRowsByTestId(allRows);
            console.log(categorizedRows);

            // 4. Create new tables for each category and append them to an output container.
            const outputContainer = document.getElementById('outputTables') || document.body;
            Object.keys(categorizedRows).forEach(category => {
              // Make a shallow copy of the rows array for this category.
              const rowsCopy = categorizedRows[category].slice();
              if (rowsCopy.length > 0) {
                const newTable = createCategoryTable(category, rowsCopy);
                outputContainer.appendChild(newTable);
              }
            });


            //reparamos las tablas
            let formatos_informacion = {};
            //cambiamos nombres de las tablas y les asignamos las columnas correctas
            document.getElementsByTagName('table')[0].getElementsByTagName('th')[0].innerText = "Registro de cambios";
            formatos_informacion['formato_changelog'] = { "ID_cambio": '', "ID_elemento": '', "Descripcion": "", "Fecha_cambio": "" };

            document.getElementsByTagName('table')[1].getElementsByTagName('th')[0].innerText = "Dependencias";
            formatos_informacion['formato_dependencias'] = { "ID_dependencia": '', "Ubicacion_dependencia": '', "Fecha_asignada": "" };

            document.getElementsByTagName('table')[2].getElementsByTagName('th')[0].innerText = "Requisitos no funcionales";
            formatos_informacion['requisitos_no_funcionales'] = { "ID_requisito": '', "Madurez": '', "Modulo": "", "Fecha_creacion": "", "Descripcion": "", "¿PMV?": "", "": "", "": "", "": "" };

            document.getElementsByTagName('table')[3].getElementsByTagName('th')[0].innerText = "Requisitos funcionales";
            formatos_informacion['requisitos_funcionales'] = { "ID_requisito": '', "Madurez": '', "Modulo": "", "Fecha_creacion": "", "Descripcion": "", "¿PMV?": "", "": "", "": "", "": "" };

            document.getElementsByTagName('table')[4].getElementsByTagName('th')[0].innerText = "Sub-requisitos";
            formatos_informacion['sub_requisitos'] = { "ID_sub_requisito": '', "Madurez": '', "Modulo": "", "Fecha_creacion": "", "Descripcion": "", "¿PMV?": "", "": "", "": "" };

            document.getElementsByTagName('table')[5].getElementsByTagName('th')[0].innerText = "Funciones";
            formatos_informacion['funciones'] = { "ID_funcion": '', "Madurez": '', "PMV": "", "Descripcion": "", "": "", "": "", "": "" };
            document.getElementsByTagName('table')[3].node

            document.getElementsByTagName('table')[6].getElementsByTagName('th')[0].innerText = "Pruebas";
            formatos_informacion['pruebas'] = { "ID_prueba": '', "Madurez": '', "Descripcion": "", "": "", "": "", "": "" };

            document.getElementsByTagName('table')[7].getElementsByTagName('th')[0].innerText = "Sub-pruebas";
            formatos_informacion['sub_pruebas'] = { "ID_prueba": '', "Madurez": '', "Descripcion": "", "": "", "": "", "": "" };

            document.getElementsByTagName('table')[8].getElementsByTagName('th')[0].innerText = "Errores";
            for (let x in document.getElementsByTagName('table')) {
              arreglarFormatoTabla(document.getElementsByTagName('table')[x].id);
              console.log(document.getElementsByTagName('table')[x].id);
              //inicializamos las data tables
              datatables.push(new DataTable('#' + document.getElementsByTagName('table')[x].id, {
                paging: false
                

              }));
            }


            for(let x in document.getElementsByClassName('dt-container dt-empty-footer') ){
              try{
                document.getElementsByClassName('dt-container dt-empty-footer')[x].style.maxWidth = '70%';
              }catch(e){
                
              }
              
            }
            


            backup_contenido_segmentado();
            //            restaurar_vista_original();
            colocar_migajas();

          })

        });

    }