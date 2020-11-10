function AddOpt(arg, value, index) {
    var option = new Option(value, index);
    switch (arg) {
        case 0:
            {
                document.forms[0].faculty.options[index] = option;
            }
            break;

        case 1:
            {
                document.forms[0].course.options[index] = option;
            }
            break;

        case 2:
            {
                document.forms[0].group.options[index] = option;
            }
            break;

        case 3:
            {
                document.forms[0].student.options[index] = option;
            }
            break;
    }
}

function LoadDoc() {
    var xmldoc = new ActiveXObject("Microsoft.XMLDOM");
    xmldoc.async = false;
    xmldoc.load("data.xml");

    faculty = xmldoc.getElementsByTagName("faculty");
    document.forms[0].faculty.length = 0;
    for (var i = 0; i < faculty.length; i++) {
        AddOpt(0, faculty.item(i).getAttribute("name"), i);
    }
    course = faculty.item(0).getElementsByTagName("course");
    document.forms[0].course.length = 0;
    for (var i = 0; i < course.length; i++) {
        AddOpt(1, course.item(i).getAttribute("value"), i);
    }
    group = course.item(0).getElementsByTagName("group");
    document.forms[0].group.length = 0;
    for (var i = 0; i < group.length; i++) {
        AddOpt(2, group.item(i).getAttribute("name"), i);
    }
    student = group.item(0).getElementsByTagName("student");
    document.forms[0].student.length = 0;
    for (var i = 0; i < student.length; i++) {
        AddOpt(3, student.item(i).getAttribute("name"), i);
    }
    eltable = document.getElementById("mtable");
    subjects = group.item(0).getElementsByTagName("subjects");
    subjects = subjects.item(0).getElementsByTagName("subject");
    for (var i = 0; i < subjects.length; i++) {
        eltable.rows[i + 1].cells[0].innerHTML = subjects.item(i).text;
    }
    marks = student.item(0).getElementsByTagName("mark");
    for (var i = 0; i < marks.length; i++) {
        eval("document.forms[0].m" + (i + 1) + ".item(" + marks.item(i).text + ").checked = true");
    }
}

function changeSelect(arg, value) {
    switch (arg) {
        case 0:
            {
                course = faculty.item(value).getElementsByTagName("course");
                document.forms[0].course.length = 0;
                for (var i = 0; i < course.length; i++) {
                    AddOpt(1, course.item(i).getAttribute("value"), i);
                }
                changeSelect(1, 0);
            }
            break;

        case 1:
            {
                group = course.item(document.forms[0].course.value).getElementsByTagName("group");
                document.forms[0].group.length = 0;
                for (var i = 0; i < group.length; i++) {
                    AddOpt(2, group.item(i).getAttribute("name"), i);
                }
                changeSelect(2, 0);
            }
            break;

        case 2:
            {
                student = group.item(document.forms[0].group.value).getElementsByTagName("student");
                document.forms[0].student.length = 0;
                for (var i = 0; i < student.length; i++) {
                    AddOpt(3, student.item(i).getAttribute("name"), i);
                }

                subjects = group.item(document.forms[0].group.value).getElementsByTagName("subjects");
                subjects = subjects.item(0).getElementsByTagName("subject");
                for (var i = 0; i < subjects.length; i++) {
                    eltable.rows[i + 1].cells[0].innerHTML = subjects.item(i).text;
                }
                changeSelect(3, 0);
            }
            break;

        case 3:
            {
                student = group.item(document.forms[0].group.value).getElementsByTagName("student");
                marks = student.item(value).getElementsByTagName("mark");
                for (var i = 0; i < marks.length; i++) {
                    eval("document.forms[0].m" + (i + 1) + ".item(" + marks.item(i).text + ").checked = true");
                }
            }
            break;
    }
}

function setMark(arg, value) {
    marks.item(arg).textContent = value;
    xmldoc.save("data.xml");
}

function calcMark() {
    var radios = document.getElementsByTagName('input');
    var sum = 0;

    for (var j = 0; j < radios.length; j++) {
        for (var i = 0; i < radios.length; i++) {
            if (radios[i].type == 'radio' && radios[i].checked && radios[i].name == ('m' + j)) {
                sum += parseInt(radios[i].value, 10);
            }
        }
    }

    var markBlock = document.getElementById("markBlock");

    sum = Math.floor(sum / 7 * 10) / 10;

    markBlock.innerHTML = "Средний балл за контрольный срок: " + sum + " баллов.";
}

function clearMark() {
    var markBlock = document.getElementById('markBlock');
    markBlock.innerHTML = '';
}