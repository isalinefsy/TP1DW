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
function changeColor(bg,button_color) {
    var button = window.document.getElementById("idButton1");
    document.body.style.background = bg;
    button.style.color = button_color;
}

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

function DisplaySelectedCountry(xmlDocumentUrl, xslDocumentUrl, ElementARecuperer, CodePays) {

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

function DisplayTitle(){
    document.getElementById('id_display_title').innerHTML=this.getAttribute("title");
}

function But5_MakeClickable(){
    var cercle = document.getElementsByTagName('circle')[0];
    cercle.addEventListener("click", DisplayTitle);
    var rect = document.getElementsByTagName('rect')[0];
    rect.addEventListener("click", DisplayTitle);
    var path = document.getElementsByTagName('path')[0];
    path.addEventListener("click", DisplayTitle);
}

function But6_LoadMap(xmlDocumentUrl) {


    var xmlDocument = chargerHttpXML(xmlDocumentUrl);
    
    var serializer = new XMLSerializer();
    var str = serializer.serializeToString(xmlDocument);
    
    // Recherche du parent (dont l'id est "here") de l'�l�ment � remplacer dans le document HTML courant
    var elementHtmlParent = window.document.getElementById("id_display_map");
    
	// ins�rer l'�lement transform� dans la page html
    elementHtmlParent.innerHTML = str;

}

function DisplayCountryName(){
    document.getElementById('id_display_country').innerHTML=this.getAttribute("countryname");
}

function But7_MakeCountriesClickable(){
    var countries = document.getElementById('id_display_map').getElementsByTagName("path");
    for (let i = 1; i < countries.length; i++) {
        countries[i].addEventListener("click", DisplayCountryName);
      } 
}


function Country_touched(){
    this.style.fill = 'red';
    var code = this.getAttribute("id");
}

function Country_untouched(){
    this.style.fill = 'grey';
}


function But8_MakeCountriesDynamic(){
    var countries = document.getElementById('id_display_map').getElementsByTagName("path");
    for (let i = 1; i < countries.length; i++) {
        let previous_color = countries[i].style.fill;
        countries[i].addEventListener("mouseover", Country_touched);
        countries[i].addEventListener("mouseleave", function (){this.style.fill = previous_color;});  
      } 
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Bouton3_ajaxBibliographie(xmlDocumentUrl, xslDocumentUrl, baliseElementARecuperer) {

    // Chargement du fichier XSL � l'aide de XMLHttpRequest synchrone 
    var xslDocument = chargerHttpXML(xslDocumentUrl);

	//cr�ation d'un processuer XSL
    var xsltProcessor = new XSLTProcessor();

    // Importation du .xsl
    xsltProcessor.importStylesheet(xslDocument);

    // Chargement du fichier XML � l'aide de XMLHttpRequest synchrone 
    var xmlDocument = chargerHttpXML(xmlDocumentUrl);

    // Cr�ation du document XML transform� par le XSL
    var newXmlDocument = xsltProcessor.transformToDocument(xmlDocument);

    // Recherche du parent (dont l'id est "here") de l'�l�ment � remplacer dans le document HTML courant
    var elementHtmlParent = window.document.getElementById("id_element_a_remplacer");
    
	// ins�rer l'�lement transform� dans la page html
    elementHtmlParent.innerHTML=newXmlDocument.getElementsByTagName(baliseElementARecuperer)[0].innerHTML;
	

}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Bouton4_ajaxBibliographieAvecParametres(xmlDocumentUrl, xslDocumentUrl, baliseElementARecuperer, paramXSL_type_reference) {

    // Chargement du fichier XSL � l'aide de XMLHttpRequest synchrone 
    var xslDocument = chargerHttpXML(xslDocumentUrl);

	//cr�ation d'un processuer XSL
    var xsltProcessor = new XSLTProcessor();

    // Importation du .xsl
    xsltProcessor.importStylesheet(xslDocument);
	
	//passage du param�tre � la feuille de style
	xsltProcessor.setParameter("", "param_ref_type",paramXSL_type_reference);

    // Chargement du fichier XML � l'aide de XMLHttpRequest synchrone 
    var xmlDocument = chargerHttpXML(xmlDocumentUrl);

    // Cr�ation du document XML transform� par le XSL
    var newXmlDocument = xsltProcessor.transformToDocument(xmlDocument);

    // Recherche du parent (dont l'id est "here") de l'�l�ment � remplacer dans le document HTML courant
    var elementHtmlParent = window.document.getElementById("id_element_a_remplacer");
    
	// ins�rer l'�lement transform� dans la page html
    elementHtmlParent.innerHTML=newXmlDocument.getElementsByTagName(baliseElementARecuperer)[0].innerHTML;
	

}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Bouton4_ajaxEmployeesTableau(xmlDocumentUrl, xslDocumentUrl) {
    //commenter la ligne suivante qui affiche la bo�te de dialogue!
    alert("Fonction � compl�ter...");
}
