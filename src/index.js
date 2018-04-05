import $ from "./resources/dom";
import style from "./css/style.css";

if (window.IIP_SDK && !window.IIP_SDK.hasRun) {
  window.IIP_SDK.hasRun = true;

  // Init
  window.IIP_SDK.init = res => {
    // Setup style
    const setStyle = $.new("style");
    setStyle.type = "text/css";
    setStyle.textContent = style;
    $("head").append(setStyle);

    // Setup iframe
    const currentUrl = encodeURIComponent(window.location.href);
    let ifrm = $.new("iframe");
    ifrm.setAttribute(
      "src",
      "http://localhost:3000/plugin?appId=" +
        res.appId +
        "&url=" +
        currentUrl +
        "&text=" +
        res.text +
        "&cId=" +
        res.credit.id +
        "&cType=" +
        res.credit.type
    );
    ifrm.setAttribute("width", "100%");
    ifrm.setAttribute("title", "Invest in Press");
    ifrm.setAttribute("id", "iip_menu_frame");
    ifrm.setAttribute("frameborder", "0");
    ifrm.setAttribute("scrolling", "no");
    ifrm.setAttribute("tabindex", "0");
    ifrm.setAttribute("allowtransparency", "true");
    ifrm.setAttribute(
      "style",
      "width: 1px !important; min-width: 100% !important; border: none !important; overflow: hidden !important; height: 100% !important; position: fixed; top: 0px !important; right: 0px !important; left: auto !important; bottom: auto !important; z-index: 2147483647 !important;"
    );
    $("body").append(ifrm);

    window.addEventListener("message", function(ev) {
      if (ev.data.closeMenu) {
        $("#iip_menu_frame").hide();
        $("html").removeClass("iip_slideout_active");
      }
    });
  };

  window.IIP_SDK.openMenu = (subText, person, image) => {
    var iframeWin = document.getElementById("iip_menu_frame").contentWindow;
    iframeWin.postMessage(
      { open: true, subText, person, image },
      "http://localhost:3000"
    );
    $("#iip_menu_frame").show();
    $("html").addClass("iip_slideout_active");
  };
}

window.IIP_SDK.onReady();
