var stringPathName = window.location.pathname
var re = new RegExp("\/scripts\/[0-9]+$");

if (re.test(stringPathName)) {

    document.getElementById('scriptid').readOnly = true;
//	document.getElementById('scriptid').value=scriptid[1];
}