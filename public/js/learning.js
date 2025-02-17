////Variables////
let iframe = document.getElementById("result");
let tabclosing = document.getElementById("tabclosebtn");
let devtools = document.getElementById("devtools");
let proxyurl = document.getElementById("proxyurl");
let proxybtn = document.getElementById("proxybtn");
let notification = document.querySelector(".notification");
let pageSrc = iframe.src;
let navigation_bar = document.querySelector(".mainbtns");
let showorhideui = document.querySelector(".dropdown");
////Load saved data////
let newLoader = localStorage.getItem("loader");
let tabclosingval = localStorage.getItem("tabcloseval");
let savedlinkurl = localStorage.getItem("savedURL");
let devtoolsVal = localStorage.getItem("devtoolsval");
let proxyURLVal = localStorage.getItem("proxyurlval");

if (newLoader) {
  iframe.style.background = `url('${newLoader}}')`;
}
if (devtoolsVal === "true") {
  devtools.style.display = "";
}
if (devtoolsVal === "false") {
  devtools.style.display = "none";
}

if (proxyURLVal === "true") {
  proxyurl.style.visibility = "visible";
  proxybtn.innerHTML = "Hide proxy URL";
}
if (proxyURLVal === "false") {
  proxyurl.style.visibility = "hidden";
  proxybtn.innerHTML = "Show proxy URL";
}

if (tabclosingval === "true") {
  tabclosing.innerHTML = "Disable Tab Closing Preventer";
  window.onbeforeunload = () => {
    return "Do you want to leave the current tab?";
  }
} else {
  tabclosing.innerHTML = "Enable Tab Closing Preventer";
}

////Functions////

// site onload function
document.addEventListener("DOMContentLoaded", function () {
  notification.style.visibility = "hidden";
  showorhideui.style.visibility = "hidden";
});

//Tool functions

function delay(milliseconds) {
  return new Promise(resolve => {
    setTimeout(resolve, milliseconds);
  });
}

function CopyLink(classorid) {
  let copything;
  if (classorid.includes(".")) {
    copything = document.querySelector(classorid);
  } else {
    copything = document.getElementById(classorid);
  }
  copything.select();
  document.execCommand("copy");
  copything.setSelectionRange(0, 0);
  notify("Link Copied!", "Your link has been copied to the clipboard!");
}

function notify(title, content) {
  let notifTitle = document.querySelector(".title");
  let notifContent = document.querySelector(".content");
  notification.style.visibility = "visible";
  notification.style.transition = "0.2s";
  notification.style.opacity = "1";
  notifTitle.innerHTML = title;
  notifContent.innerHTML = content;
  delay(2000).then(() => {
    notification.style.opacity = "0";
    notification.style.visibility = "hidden";
  });
}

function foreverloop() {
  setTimeout(function () {
    proxyurl.value = iframe.contentWindow.location.href;
    proxyurl.value = proxyurl.value.replace("/learning", "");
    localStorage.setItem("savedURL", iframe.contentWindow.location.href);
    foreverloop();
  }, 1000);
}
foreverloop();



//Button functions

function searchshow() {
  let searchbar = document.querySelector(".searchbar");
  let searchinput = document.querySelector(".searchinput");

  if (searchbar.style.top === "20px") {
    searchbar.style.transition = "0.3s";
    searchbar.style.top = "90px";
    searchinput.style.width = "20em";
  } else {
    searchbar.style.transition = "0.3s";
    searchbar.style.top = "20px";
    searchinput.style.width = "1em";
  }
}
document.addEventListener("DOMContentLoaded", searchshow);


function reloadPX() {
  iframe.contentWindow.location.reload(true);
}

function fullscreen() {
  var doc = iframe.ownerDocument;
  var docEl = doc.documentElement;

  if (docEl.requestFullscreen) {
    iframe.requestFullscreen();
  } else if (docEl.mozRequestFullScreen) {
    iframe.mozRequestFullScreen();
  } else if (docEl.webkitRequestFullscreen) {
    iframe.webkitRequestFullscreen();
  } else if (docEl.msRequestFullscreen) {
    iframe.msRequestFullscreen();
  } else {
    alert("Your browser doesn't support fullscreening.");
  }
}

function showsettings() {
  let settingspanel = document.querySelector(".settingspanel");

  if (settingspanel.style.bottom === "-1000px") {
    settingspanel.style.transition = "0.5s";
    settingspanel.style.bottom = "10px";
  } else {
    settingspanel.style.transition = "0.5s";
    settingspanel.style.bottom = "-1000px";
  }
}
document.addEventListener("DOMContentLoaded", showsettings);

function showorhidedevtools() {
  if (devtools.style.display === "") {
    devtools.style.display = "none";
    localStorage.setItem("devtoolsval", 'false');
  } else {
    devtools.style.display = "";
    localStorage.setItem("devtoolsval", 'true');
  }
}

function devTools() {
  if (!iframe) return
  let erudaWindow = iframe.contentWindow
  let erudaDocument = iframe.contentDocument

  if (!erudaWindow || !erudaDocument) return

  if (erudaWindow.eruda?._isInit) {
    erudaWindow.eruda.destroy()
  } else {
    let script = erudaDocument.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/eruda'
    script.onload = function () {
      if (!erudaWindow) return
      erudaWindow.eruda.init();
      erudaWindow.eruda.show();
    }
    erudaDocument.head.appendChild(script);
  }
}


function proxyURL() {
  if (proxyurl.style.visibility === "visible") {
    proxyurl.style.visibility = "hidden";
    proxybtn.innerHTML = "Show proxy URL";
    localStorage.setItem("proxyurlval", 'false');
  } else {
    proxyurl.style.visibility = "visible";
    proxybtn.innerHTML = "Hide proxy URL";
    localStorage.setItem("proxyurlval", 'true');
  }
}


function changeloader() {
  let input = document.getElementById("loaderinput");
  let newLoader = localStorage.getItem("loader");
  iframe.style.background = `url('${input.value}}')`;
  localStorage.setItem("loader", input);
}

function preventClosing() {
  if (tabclosing.innerHTML === "Enable Tab Closing Preventer") {
    tabclosing.innerHTML = "Disable Tab Cloaking Preventer";
    localStorage.setItem("tabcloseval", "true");
    notify("Search bar update", "Please note that the search bar will NOT work by turning this on. (You can use the search engine instead.)");
    window.onbeforeunload = () => {
      return "Do you want to leave the current tab?";
    }
  } else {
    tabclosing.innerHTML = "Enable Tab Cloaking Preventer";
    localStorage.setItem("tabcloseval", "false");
    alert("Make sure you click on reload in the next alert!");
    location.reload();
  }
}

function hideui() {
  let searchbar = document.querySelector(".searchbar");
  let searchinput = document.querySelector(".searchinput");
  navigation_bar.style.top = "-70px";
  navigation_bar.style.boxShadow = "none";
  searchbar.style.top = "-67px";
  searchbar.style.transition = "0.5s";
  searchinput.style.width = "1em";
  showorhideui.style.top = "-20px";
  delay(1000).then(() => {
    showorhideui.style.visibility = "visible";
    showorhideui.style.opacity = "1";
    showorhideui.style.transition = "0.5s";
    showorhideui.style.top = "5px";
  });
}

function showui() { 
  let searchbar = document.querySelector(".searchbar");
  navigation_bar.style.top = "7px";
  navigation_bar.style.boxShadow = "0px 4px 4px 0px rgba(0, 0, 0, 0.5)";
  showorhideui.style.transition = "1s";
  showorhideui.style.opacity = "0";
  searchbar.style.top = "20px";
  searchbar.style.transition = "0.5s";
  showorhideui.style.visibility = "hidden";
}
