if (!window.started) {
  window.started = !0;
  var namespace = "n" + Math.random().toString().substr(2),
    key = Math.random().toString().substr(2),
    set = {
      blockalert: !0,
      blockconfirm: !1,
      blockprompt: !1,
      renderalert: !1,
    },
    injectScript = function (e, t) {
      var n = document.createElement("script");
      (n.innerHTML =
        "(" +
        e.toString() +
        ")(" +
        (t
          ? t
              .map(function (e) {
                return JSON.stringify(e);
              })
              .join(", ")
          : "") +
        ");"),
        n.addEventListener(
          "load",
          function () {
            document.documentElement.removeChild(n);
          },
          !0
        ),
        document.documentElement.insertBefore(
          n,
          document.documentElement.firstChild || null
        );
    },
    renderalert = function (e) {
      var t = document.createElement("div");
      (t.style.fontSize = "15px"),
        (t.style.width = "100%"),
        (t.style.height = "100%"),
        (t.style.position = "fixed"),
        (t.style.top = "0"),
        (t.style.left = "0"),
        (t.style.zIndex = "1000000"),
        (t.style.background =
          "-webkit-gradient(radial, 50% 40%, 100, 50% 40%, " +
          0.8 * window.innerWidth +
          ", from(rgba(150,150,150,.8)), to(rgba(200,200,200,.1)))");
      var n = document.createElement("div");
      (n.style.minWidth = "120px"),
        (n.style.maxWidth = window.innerWidth - 100),
        (n.style.maxHeight = window.innerHeight - 100),
        (n.style.padding = "20px"),
        (n.style.position = "fixed"),
        (n.style.zIndex = "1000001"),
        (n.style.background =
          "-webkit-gradient(linear, left top, left bottom, from(white), to(#DAE7F9))"),
        (n.style.border = "1px solid #78B"),
        (n.style.borderRadius = "4px"),
        (n.style.fontFamily = "Arial"),
        t.appendChild(n);
      var r = document.createElement("div");
      (r.innerHTML = e ? e.replace(/\n/g, "<br>") : ""),
        (r.style.padding = "10px 10px 0"),
        n.appendChild(r);
      var o = document.createElement("div");
      (o.innerHTML = "OK"),
        (o.fontSize = "16px"),
        (o.style.color = "#13336E"),
        (o.style.cssFloat = "right"),
        (o.style.border = "1.2px solid #A2B5D5"),
        (o.style.borderRadius = "6px"),
        (o.style.padding = "3px 9px"),
        (o.style.marginTop = "20px"),
        (o.style.cursor = "pointer"),
        (o.style.background = "rgba(255,255,255,.1)"),
        (o.onmouseover = function () {
          o.style.background =
            "-webkit-gradient(linear, left top, left bottom, from(rgba(255,255,255,.4)), to(rgba(130,150,180,.4)))";
        }),
        (o.onmouseout = function () {
          o.style.background = "rgba(255,255,255,.1)";
        }),
        n.appendChild(o);
      var i = function () {
          (n.style.left = (window.innerWidth - n.offsetWidth) / 2 + "px"),
            (n.style.top = (window.innerHeight - n.offsetHeight) / 3 + "px");
        },
        d = function (e) {
          13 == e.keyCode && a(), s(e);
        },
        s = function (e) {
          e.stopPropagation(), e.preventDefault();
        },
        a = function () {
          document.documentElement.removeChild(t),
            o.removeEventListener("click", a, !0),
            window.removeEventListener("keydown", d, !0),
            window.removeEventListener("resize", i, !0),
            window.removeEventListener("mousewheel", s, !0);
        };
      o.addEventListener("click", a, !0),
        window.addEventListener("keydown", d, !0),
        window.addEventListener("resize", i, !0),
        window.addEventListener("mousewheel", s, !0),
        document.documentElement.appendChild(t),
        i();
    };
  var observer = new MutationObserver((e) => {});
  observer.observe(document, { childList: !0 }),
    injectScript(
      function (e, t, n) {
        window[e] = new (function () {
          var r = window.alert,
            o = window.confirm,
            i = window.prompt,
            d = function (t) {
              (t.namespace = e),
                window.dispatchEvent(new CustomEvent(e, { detail: t }));
            };
          (this.set = function (e, r) {
            e == t && (n = r);
          }),
            (window.alert = function (e) {
              var t = n.blockalert || n.renderalert || !1;
              return (
                d({ alert: { blocked: t, message: e ? e.toString() : "" } }),
                !t && r(e)
              );
            }),
            (window.confirm = function (e) {
              var t = n.blockconfirm || !1;
              return (
                d({ confirm: { blocked: t, message: e ? e.toString() : "" } }),
                !t && o(e)
              );
            }),
            (window.prompt = function (e, t) {
              var r = n.blockprompt || !1;
              return (
                d({
                  prompt: {
                    blocked: r,
                    message: e ? e.toString() : "",
                    def: t,
                  },
                }),
                !r && i(e, t)
              );
            });
        })();
      },
      [namespace, key, set]
    );
}
