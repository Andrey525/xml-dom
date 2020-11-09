function LoadDoc() {
    var xmldoc = new ActiveXObject("Microsoft.XMLDOM");
    xmldoc.async = false;
    xmldoc.load("data.xml");
    output = "Факультеты: \n";
    facs = xmldoc.getElementByTagName("fakultet");
    for (var i = 0; i < facs.length; i++) {
        output += facs.item(i).name;
    }
    alert(output);
}