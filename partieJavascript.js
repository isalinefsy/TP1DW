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
	
}
//////////////QUESTION 9 à terminer
var availableCountryCodes = [
    {id:"AD"},{id:"AE"},{id:"AF"},{id:"AG"},{id:"AI"},{id:"AL"},{id:"AM"},{id:"AO"},{id:"AR"},{id:"AS"},{id:"AT"},{id:"AU"},{id:"AW"},{id:"AX"},{id:"AZ"},{id:"BA"},{id:"BB"},{id:"BD"},{id:"BE"},{id:"BF"},{id:"BG"},{id:"BH"},{id:"BI"},{id:"BJ"},{id:"BL"},{id:"BN"},{id:"BO"},{id:"BM"},{id:"BQ"},{id:"BR"},{id:"BS"},{id:"BT"},{id:"BV"},{id:"BW"},{id:"BY"},{id:"BZ"},{id:"CA"},{id:"CC"},{id:"CD"},{id:"CF"},{id:"CG"},{id:"CH"},{id:"CI"},{id:"CK"},{id:"CL"},{id:"CM"},{id:"CN"},{id:"CO"},{id:"CR"},{id:"CU"},{id:"CV"},{id:"CW"},{id:"CX"},{id:"CY"},{id:"CZ"},{id:"DE"},{id:"DJ"},{id:"DK"},{id:"DM"},{id:"DO"},{id:"DZ"},{id:"EC"},{id:"EG"},{id:"EE"},{id:"EH"},{id:"ER"},{id:"ES"},{id:"ET"},{id:"FI"},{id:"FJ"},{id:"FK"},{id:"FM"},{id:"FO"},{id:"FR"},{id:"GA"},{id:"GB"},{id:"GE"},{id:"GD"},{id:"GF"},{id:"GG"},{id:"GH"},{id:"GI"},{id:"GL"},{id:"GM"},{id:"GN"},{id:"GO"},{id:"GP"},{id:"GQ"},{id:"GR"},{id:"GS"},{id:"GT"},{id:"GU"},{id:"GW"},{id:"GY"},{id:"HK"},{id:"HM"},{id:"HN"},{id:"HR"},{id:"HT"},{id:"HU"},{id:"ID"},{id:"IE"},{id:"IL"},{id:"IM"},{id:"IN"},{id:"IO"},{id:"IQ"},{id:"IR"},{id:"IS"},{id:"IT"},{id:"JE"},{id:"JM"},{id:"JO"},{id:"JP"},{id:"JU"},{id:"KE"},{id:"KG"},{id:"KH"},{id:"KI"},{id:"KM"},{id:"KN"},{id:"KP"},{id:"KR"},{id:"XK"},{id:"KW"},{id:"KY"},{id:"KZ"},{id:"LA"},{id:"LB"},{id:"LC"},{id:"LI"},{id:"LK"},{id:"LR"},{id:"LS"},{id:"LT"},{id:"LU"},{id:"LV"},{id:"LY"},{id:"MA"},{id:"MC"},{id:"MD"},{id:"MG"},{id:"ME"},{id:"MF"},{id:"MH"},{id:"MK"},{id:"ML"},{id:"MO"},{id:"MM"},{id:"MN"},{id:"MP"},{id:"MQ"},{id:"MR"},{id:"MS"},{id:"MT"},{id:"MU"},{id:"MV"},{id:"MW"},{id:"MX"},{id:"MY"},{id:"MZ"},{id:"NA"},{id:"NC"},{id:"NE"},{id:"NF"},{id:"NG"},{id:"NI"},{id:"NL"},{id:"NO"},{id:"NP"},{id:"NR"},{id:"NU"},{id:"NZ"},{id:"OM"},{id:"PA"},{id:"PE"},{id:"PF"},{id:"PG"},{id:"PH"},{id:"PK"},{id:"PL"},{id:"PM"},{id:"PN"},{id:"PR"},{id:"PS"},{id:"PT"},{id:"PW"},{id:"PY"},{id:"QA"},{id:"RE"},{id:"RO"},{id:"RS"},{id:"RU"},{id:"RW"},{id:"SA"},{id:"SB"},{id:"SC"},{id:"SD"},{id:"SE"},{id:"SG"},{id:"SH"},{id:"SI"},{id:"SJ"},{id:"SK"},{id:"SL"},{id:"SM"},{id:"SN"},{id:"SO"},{id:"SR"},{id:"SS"},{id:"ST"},{id:"SV"},{id:"SX"},{id:"SY"},{id:"SZ"},{id:"TC"},{id:"TD"},{id:"TF"},{id:"TG"},{id:"TH"},{id:"TJ"},{id:"TK"},{id:"TL"},{id:"TM"},{id:"TN"},{id:"TO"},{id:"TR"},{id:"TT"},{id:"TV"},{id:"TW"},{id:"TZ"},{id:"UA"},{id:"UG"},{id:"UM-DQ"},{id:"UM-FQ"},{id:"UM-HQ"},{id:"UM-JQ"},{id:"UM-MQ"},{id:"UM-WQ"},{id:"US"},{id:"UY"},{id:"UZ"},{id:"VA"},{id:"VC"},{id:"VE"},{id:"VG"},{id:"VI"},{id:"VN"},{id:"VU"},{id:"WF"},{id:"WS"},{id:"YE"},{id:"YT"},{id:"ZA"},{id:"ZM"},{id:"ZW"}
];

function liste_But3(){
    var list = window.document.getElementById("available_codes");
    for(let i = 0; i < availableCountryCodes.length; i++){
        let option = "<option value=\"" + availableCountryCodes[i].id + "\">";
        list.innerHTML += option;
    }
}
liste_But3();

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