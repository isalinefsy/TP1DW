//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function recupererPremierEnfantDeTypeElement(n) {
    var x = n.firstChild;
    while (x.nodeType != 1) { // Test if x is an element node (and not a text node or other)
        x = x.nextSibling;
    }
    return x;
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//change le contenu de l'�lement avec l'id "nom" avec la chaine de caract�res en param�tre	  


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//charge le fichier XML se trouvant � l'URL relative donn� dans le param�treet le retourne
function chargerHttpXML(xmlDocumentUrl) {

    var httpAjax;

    httpAjax = window.XMLHttpRequest ?
        new XMLHttpRequest() :
        new ActiveXObject('Microsoft.XMLHTTP');

    if (httpAjax.overrideMimeType) {
        httpAjax.overrideMimeType('text/xml');
    }

    //chargement du fichier XML � l'aide de XMLHttpRequest synchrone (le 3� param�tre est d�fini � false)
    httpAjax.open('GET', xmlDocumentUrl, false);
    httpAjax.send();

    return httpAjax.responseXML;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
// Charge le fichier JSON se trouvant � l'URL donn�e en param�tre et le retourne
function chargerHttpJSON(jsonDocumentUrl) {

    var httpAjax;

    httpAjax = window.XMLHttpRequest ?
        new XMLHttpRequest() :
        new ActiveXObject('Microsoft.XMLHTTP');

    if (httpAjax.overrideMimeType) {
        httpAjax.overrideMimeType('text/xml');
    }

    // chargement du fichier JSON � l'aide de XMLHttpRequest synchrone (le 3� param�tre est d�fini � false)
    httpAjax.open('GET', jsonDocumentUrl, false);
    httpAjax.send();

    var responseData = eval("(" + httpAjax.responseText + ")");

    return responseData;
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// permet de changer la couleur du fond de la page ainsi que la couleur du texte du bouton 1. Utilisé pour les boutons 1 et 2
function But1_2_changeColor(bg,button_color) {
    var button = window.document.getElementById("idButton1");
    document.body.style.background = bg;
    button.style.color = button_color;
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Affiche le nom officiel et la capitale du pays selectionné dans l'input field
//Colorie aussi en vert sur la map (si elle est chargée) les pays qui parlent la même langue que le pays selectionné
function But3_DisplaySelectedCountry(xmlDocumentUrl, xslDocumentUrl, ElementARecuperer, CodePays) {

    // Chargement du fichier XSL � l'aide de XMLHttpRequest synchrone 
    var xslDocument = chargerHttpXML(xslDocumentUrl);

	//cr�ation d'un processuer XSL
    var xsltProcessor = new XSLTProcessor();

    // Importation du .xsl
    xsltProcessor.importStylesheet(xslDocument);
    xsltProcessor.setParameter("", "code",CodePays);

    // Chargement du fichier XML � l'aide de XMLHttpRequest synchrone 
    var xmlDocument = chargerHttpXML(xmlDocumentUrl);

    // Cr�ation du document XML transform� par le XSL
    var newXmlDocument = xsltProcessor.transformToDocument(xmlDocument);

    // Recherche du parent (dont l'id est "here") de l'�l�ment � remplacer dans le document HTML courant
    var elementHtmlParent = window.document.getElementById("id_display_selected_country");
    
	// ins�rer l'�lement transform� dans la page html
    elementHtmlParent.innerHTML=newXmlDocument.getElementsByTagName(ElementARecuperer)[0].innerHTML;

    
    var countries = document.getElementById('id_display_map').getElementsByTagName("path");
    for (let i=0; i< countries.length; i++){
        countries[i].style.fill = "#CCCCCC";
    }

    //Change la couleur des pays de la carte dont les mêmes langues sont parlées

    var greencountries = newXmlDocument.getElementsByTagName('GreenCountries');
    for (let i=0; i< greencountries.length; i++){
        document.getElementById(greencountries[i].innerHTML).style.fill = 'green';
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function But4_LoadDrawing(xmlDocumentUrl) {


    var xmlDocument = chargerHttpXML(xmlDocumentUrl);
    
    var serializer = new XMLSerializer();
    var str = serializer.serializeToString(xmlDocument);
    
    // Recherche du parent (dont l'id est "here") de l'�l�ment � remplacer dans le document HTML courant
    var elementHtmlParent = window.document.getElementById("id_display_drawing");
    
	// ins�rer l'�lement transform� dans la page html
    elementHtmlParent.innerHTML = str;

}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//fonction evenement qui affiche le titre
function DisplayTitle(){
    document.getElementById('id_display_title').innerHTML=this.getAttribute("title");
}

//Permet de rendre les formes du dessin cliquables et d'afficher leur titre
function But5_MakeClickable(){
    But4_LoadDrawing('exemple.svg');
    var cercle = document.getElementsByTagName('circle')[0];
    cercle.addEventListener("click", DisplayTitle);
    var rect = document.getElementsByTagName('rect')[0];
    rect.addEventListener("click", DisplayTitle);
    var path = document.getElementsByTagName('path')[0];
    path.addEventListener("click", DisplayTitle);
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//charge le fichier worldHigh.svg sur la page
function But6_LoadMap(xmlDocumentUrl) {


    var xmlDocument = chargerHttpXML(xmlDocumentUrl);
    
    var serializer = new XMLSerializer();
    var str = serializer.serializeToString(xmlDocument);
    
    // Recherche du parent (dont l'id est "here") de l'�l�ment � remplacer dans le document HTML courant
    var elementHtmlParent = window.document.getElementById("id_display_map");
    
	// ins�rer l'�lement transform� dans la page html
    elementHtmlParent.innerHTML = str;

}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//fonction evenement qui affiche le nom du pays cliqué
function DisplayCountryName(){
    document.getElementById('id_display_country').innerHTML=this.getAttribute("countryname");
}

//Permet de rendre les pays cliquables et d'afficher leur nom officiel
function But7_MakeCountriesClickable(){
    But6_LoadMap('worldHigh.svg');
    var countries = document.getElementById('id_display_map').getElementsByTagName("path");
    for (let i = 1; i < countries.length; i++) {
        countries[i].addEventListener("click", DisplayCountryName);
      } 
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//fonction evenement pour l'affichage du tableau d'infos des pays pointés
function Country_touched(){
    this.style.fill = 'red';
    var code = this.getAttribute("id");

    // Chargement du fichier XSL � l'aide de XMLHttpRequest synchrone 
    var xslDocument = chargerHttpXML("Question8.xsl");

	//cr�ation d'un processuer XSL
    var xsltProcessor = new XSLTProcessor();

    // Importation du .xsl
    xsltProcessor.importStylesheet(xslDocument);
    xsltProcessor.setParameter("", "code", code);

    // Chargement du fichier XML � l'aide de XMLHttpRequest synchrone 
    var xmlDocument = chargerHttpXML("countriesTP.xml");

    // Cr�ation du document XML transform� par le XSL
    var newXmlDocument = xsltProcessor.transformToDocument(xmlDocument);

    // Recherche du parent (dont l'id est "here") de l'�l�ment � remplacer dans le document HTML courant
    var elementHtmlParent = window.document.getElementById("id_display_country");
    
	// ins�rer l'�lement transform� dans la page html
    elementHtmlParent.innerHTML=newXmlDocument.getElementsByTagName('Pays')[0].innerHTML;

}

//Permet d'afficher les infos des pays en les pointants
function But8_MakeCountriesDynamic(){
    But6_LoadMap('worldHigh.svg');
    var countries = document.getElementById('id_display_map').getElementsByTagName("path");
    for (let i = 0; i < countries.length; i++) {
        let previous_color = countries[i].style.fill;
        countries[i].addEventListener("mouseover", Country_touched);
        countries[i].addEventListener("mouseleave", function (){this.style.fill = previous_color;});  
      } 
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Active la fonction d'autocompletion pour le boutton 3
function But9_ActivateAutoCompletion(xmlDocumentUrl){
    var list = document.getElementById('id_datalist');
    var xmlDocument = chargerHttpXML(xmlDocumentUrl);
    var codes = xmlDocument.getElementsByTagName('cca2');
    for (let i = 0; i < codes.length; i++) {
        var option=document.createElement('option');
        option.value = codes[i].innerHTML;
        list.appendChild(option);
      }
    
}
//désactive la fonction d'autocompletion
function But9_DeactivateAutoCompletion(xmlDocumentUrl){
    var list = document.getElementById('id_datalist');
    list.innerHTML ='';
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//fonction evenement pour afficher le tableau du pays pointés avec la monnaie 
function Country_touched_bis(){
    this.style.fill = 'red';
    var code = this.getAttribute("id");
    // Chargement du fichier XSL � l'aide de XMLHttpRequest synchrone 
    var xslDocument = chargerHttpXML("Question10.xsl");

	//cr�ation d'un processuer XSL
    var xsltProcessor = new XSLTProcessor();

    // Importation du .xsl
    xsltProcessor.importStylesheet(xslDocument);
    xsltProcessor.setParameter("", "code", code);

    // Chargement du fichier XML � l'aide de XMLHttpRequest synchrone 
    var xmlDocument = chargerHttpXML("countriesTP.xml");

    // Cr�ation du document XML transform� par le XSL
    var newXmlDocument = xsltProcessor.transformToDocument(xmlDocument);

    // Recherche du parent (dont l'id est "here") de l'�l�ment � remplacer dans le document HTML courant
    var elementHtmlParent = window.document.getElementById("id_display_country");
    
	// ins�rer l'�lement transform� dans la page html
    elementHtmlParent.innerHTML=newXmlDocument.getElementsByTagName('Pays')[0].innerHTML;

    const data = chargerHttpJSON("https://restcountries.com/v2/alpha/"+code.toLowerCase());
    
    document.getElementById("currency_column").innerHTML = data.currencies[0].name;

}

//Fonction correspondant au bouton 10 pour ajouter la monnaie dans le tableau d'information
function But10_AddCurrency(){
    But6_LoadMap('worldHigh.svg');
    var countries = document.getElementById('id_display_map').getElementsByTagName("path");
    for (let i = 0; i < countries.length; i++) {
        let previous_color = countries[i].style.fill;
        countries[i].addEventListener("mouseover", Country_touched_bis);
        countries[i].addEventListener("mouseleave", function (){this.style.fill = previous_color;});
      } 
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Fonction correspondant à l'appui sur le bouton 12, jeu
function But12_clickSvg() {
    But6_LoadMap('worldHigh.svg');
    var paths = document.getElementById('id_display_map').getElementsByTagName("path");
    var name = paths[Math.floor(Math.random() * paths.length)].getAttribute("countryname");
    document.getElementById("textjeu").innerHTML = "Try to find <span style='color: blue; font-weight: bold;'>" + name + "</span> on the map!";
    
    for (var i = 0; i < paths.length; i++) {
        paths[i].addEventListener("click", function() {
            var clickedName = this.getAttribute("countryname");
            if (name && clickedName === name) {
                alert("True");
                document.getElementById("textjeu").innerHTML = "";
                name = ""; // Reset name after correct guess
            } else if (name && clickedName !== name) {
                alert("False");
            }
            clickedName = "";
        });
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Fonction correspondant à l'appui sur le bouton 13, colorie les pays en fonction de leur PIB/hab, relie a un json 
function But13() {
    But6_LoadMap('worldHigh.svg');
    fetch('POPULATION.json')
        .then(response => response.json())
        .then(data => {
            var populationData = data;
            var countries = document.getElementById('id_display_map').getElementsByTagName("path");
            var legend = document.getElementById('legend');

            for (var i = 0; i < populationData.length; i++) {
                var countryName = populationData[i]['country'];
                var population = parseInt(populationData[i]['population'], 10);

                for (var j = 0; j < countries.length; j++) {
                    if (countryName === countries[j].getAttribute('countryname')) {
                        if (population < 1000000) {
                            countries[j].style.fill = 'red';
                        } else if (population < 10000000) {
                            countries[j].style.fill = 'orange';
                        } else if (population < 100000000) {
                            countries[j].style.fill = 'yellow';
                        } else {
                            countries[j].style.fill = 'green';
                        }
                    }
                }
            }

            // Create legend HTML elements
            var legendItems = [
                { color: 'red', label: 'Low Population (<1M)' },
                { color: 'orange', label: 'Medium-Low Population (1M - 10M)' },
                { color: 'yellow', label: 'Medium-High Population (10M - 100M)' },
                { color: 'green', label: 'High Population (>100M)' }
            ];

            var legendHTML = '<ul>';
            legendItems.forEach(item => {
                legendHTML += `<li style="color: ${item.color};">${item.label}</li>`;
            });
            legendHTML += '</ul>';

            // Append legend HTML to the legend element
            legend.innerHTML = legendHTML;
        })
        .catch(error => {
            console.error('Error fetching population data:', error);
        });
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
