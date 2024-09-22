( () => {
    var _e = window.queueMicrotask || (o => Promise.resolve().then(o));
    async function ye(o) {
        let e = {};
        return e[o.type] = o,
        navigator.clipboard.write([new ClipboardItem(e)])
    }
    var Ve = /bot|crawl|spider/i.test(navigator.userAgent);
    async function be(o, e, t) {
        return new Promise(n => o.toBlob(n, e, t))
    }
    var le = o => parseInt(o) & 255
      , Oe = /^rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*[\d.]+\s*)?\)$/i;
    function we(o) {
        let e = o.match(Oe);
        return e ? {
            r: le(e[1]),
            g: le(e[2]),
            b: le(e[3]),
            a: e[4] ? Math.clamp(parseFloat(e[4].substring(1)), 0, 1) : 1
        } : null
    }
    function Ie(o) {
        let e = o.lastIndexOf("/");
        return e === -1 ? o : o.slice(e + 1)
    }
    function ve(o) {
        let e = Ie(o)
          , t = e.lastIndexOf(".");
        return t === -1 || t === e.length - 1 || t === 0 ? e : e.substr(0, t)
    }
    function Fe(o) {
        let e = o.lastIndexOf(".");
        return e === -1 || e === o.length - 1 || e === 0 ? "" : o.substr(e + 1).toLowerCase()
    }
    function Te(o, e) {
        return Fe(o) === e
    }
    var se = function() {
        let o = navigator.appVersion;
        return o.indexOf("Win") !== -1 ? "Windows" : o.indexOf("Mac") !== -1 ? "MacOS" : o.indexOf("X11") !== -1 || o.indexOf("Linux") !== -1 ? "Linux" : "Unknown OS"
    }()
      , ae = navigator.userAgent.toLowerCase()
      , de = se === "MacOS"
      , Pe = se === "Windows"
      , Ee = se === "Linux"
      , Me = ae.indexOf("firefox") > -1
      , Ce = /^((?!chrome|android).)*safari/i.test(ae)
      , Ze = /android/i.test(ae);
    function ue(o) {
        return de && o.button === 0 && o.ctrlKey
    }
    var ce = {
        isDesktop: !1,
        isMobile: !1,
        isDesktopApp: !1,
        isMobileApp: !1,
        isIosApp: !1,
        isAndroidApp: !1,
        isPhone: !1,
        isTablet: !1,
        isMacOS: de,
        isWin: Pe,
        isLinux: Ee,
        isSafari: Ce,
        resourcePathPrefix: "file:///",
        mobileDeviceHeight: 0,
        mobileKeyboardHeight: 0,
        mobileSoftKeyboardVisible: !1
    };
    var Ae = 1.5
      , De = 40
      , Xe = 800
      , ie = .2
      , Ye = .9
      , R = (o, e, t=Ye) => o * t + e * (1 - t)
      , Le = (o, e) => (R(o >> 16 & 255, e >> 16 & 255) << 16) + (R(o >> 8 & 255, e >> 8 & 255) << 8) + (R(o & 255, e & 255) | 0)
      , fe = (o, e) => e.right < o.left || e.left > o.right || e.bottom < o.top || e.top > o.bottom
      , We = (o, e) => ({
        left: Math.min(o.left, e.left),
        right: Math.max(o.right, e.right),
        top: Math.min(o.top, e.top),
        bottom: Math.max(o.bottom, e.bottom)
    })
      , pe = (o, e, t) => ({
        left: o - t,
        right: o + t,
        top: e - t,
        bottom: e + t
    })
      , K = o => {
        o.style.margin = "0",
        o.style.padding = "0",
        o.style.border = "0",
        o.style.width = "100%",
        o.style.height = "100%",
        o.style.overflow = "hidden"
    }
    ;
    var he = {
        fill: "color-fill",
        fillFocused: "color-fill-focused",
        fillTag: "color-fill-tag",
        fillUnresolved: "color-fill-unresolved",
        fillAttachment: "color-fill-attachment",
        arrow: "color-arrow",
        circle: "color-circle",
        line: "color-line",
        text: "color-text",
        fillHighlight: "color-fill-highlight",
        lineHighlight: "color-line-highlight"
    }
      , z = 100 //Circle Size
      , me = class {
        constructor(e, t, n) {
            this.x = null;
            this.y = null;
            this.fx = null;
            this.fy = null;
            this.forward = {};
            this.reverse = {};
            this.weight = 0;
            this.color = null;
            this.rendered = !1;
            this.fadeAlpha = 0;
            this.moveText = 0;
            this.fontDirty = !1;
            this.onClick = e => {
                let t = e.nativeEvent;
                if (e.button === 2 || t.instanceOf(MouseEvent) && ue(t)) {
                    let {renderer: n} = this;
                    n.onNodeRightClick && n.onNodeRightClick(e.nativeEvent, this.id, this.type)
                }
            }
            ;
            this.renderer = e,
            this.id = t,
            this.type = n
        }
        initGraphics() {
            if (this.rendered)
                return !1;
            this.rendered = !0;
            let {renderer: e} = this, t;
            t = this.circle = new PIXI.Graphics,
            t.eventMode = "static",
            t.beginFill(16777215),
            t.drawCircle(z, z, z),
            t.endFill(),
            ce.isMobile && (t.beginFill(16777215, 1e-4),
            t.drawCircle(z, z, z * 5),
            t.endFill()),
            t.pivot.x = z,
            t.pivot.y = z,
            t.cursor = "pointer",
            t.zIndex = 1,
            t.on("pointerdown", s => e.onPointerDown(this, s)).on("pointerover", s => e.onPointerOver(this, s)).on("pointerout", () => e.onPointerOut()).on("click", this.onClick).on("rightclick", this.onClick);
            let n = this.getFillColor();
            t.alpha = n.a,
            t.tint = n.rgb,
            e.hanger.addChild(t);
            let r = new PIXI.TextStyle(this.getTextStyle())
              , i = this.text = new PIXI.Text(this.getDisplayText(),r);
            return i.eventMode = "none",
            i.resolution = 2,
            i.anchor.set(.5, 0),
            i.zIndex = 2,
            e.hanger.addChild(i),
            this.fadeAlpha = 0,
            !0
        }
        clearGraphics() {
            if (!this.rendered)
                return;
            this.rendered = !1;
            let {circle: e, highlight: t, text: n} = this;
            e && (this.circle = null,
            e.parent && e.parent.removeChild(e),
            e.destroy()),
            t && (this.highlight = null,
            t.parent && t.parent.removeChild(t),
            t.destroy()),
            n && (this.text = null,
            n.parent && n.parent.removeChild(n),
            n.destroy())
        }
        getTextStyle() {
            let {renderer: e} = this
              , t = this.getSize();
            return new PIXI.TextStyle({
                fontSize: 14 + t / 4,
                fill: e.colors.text.rgb,
                fontFamily: 'ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Inter", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Microsoft YaHei Light", sans-serif',
                wordWrap: !0,
                wordWrapWidth: 300,
                align: "center"
            })
        }
        render() {
            if (!this.rendered)
                return;
            let {renderer: e, x: t, y: n, circle: r, highlight: i, text: s, fadeAlpha: f, moveText: b} = this
              , m = this.getSize()
              , T = this.getFillColor()
              , I = e.colors.text
              , v = e.getHighlightNode()
              , N = v === this
              , P = e.nodeScale
              , C = s.visible
              , x = ie;
            (!v || N || this.forward.hasOwnProperty(v.id) || this.reverse.hasOwnProperty(v.id)) && (x = 1),
            f = this.fadeAlpha = R(f, x);
            let E = f * T.a
              , l = e.textAlpha;
            l = f * l,
            N && (l = 1),
            l *= I.a;
            let u = N ? 15 : 0;
            b = this.moveText = C ? R(b, u) : u;
            let c = l > .001
              , d = e.viewport
              , w = N || !fe(d, pe(t, n, m * P + 1));
            if (c && (c = N || !fe(d, {
                left: t - 300,
                right: t + 300,
                top: n,
                bottom: n + 200
            })),
            r.tint = Le(r.tint, T.rgb),
            r.visible = w,
            w && (r.x = t,
            r.y = n,
            r.scale.x = r.scale.y = m / 100 * P,
            r.alpha = E),
            this.id.match(/^\d+$/) && (c = !1),
            s.visible = c,
            c && (s.x = t,
            s.y = n + (m + 5) * P + b / e.scale,
            s.scale.x = s.scale.y = P,
            e.scale < window.devicePixelRatio && (s.scale.x = s.scale.y = window.devicePixelRatio / e.scale),
            s.alpha = l),
            N) {
                i || (i = this.highlight = new PIXI.Graphics,
                i.eventMode = "none",
                i.zIndex = 1,
                e.hanger.addChild(i)),
                i.x = t,
                i.y = n,
                i.scale.x = i.scale.y = P,
                i.clear();
                let L = Math.max(1, 1 / e.scale / P)
                  , H = e.colors.circle;
                i.alpha = H.a,
                i.lineStyle(L, H.rgb, 1),
                i.drawCircle(0, 0, m + L / 2)
            } else
                i && (i.parent.removeChild(i),
                i.destroy(),
                this.highlight = null);
            this.fontDirty && (this.fontDirty = !1,
            s.style = this.getTextStyle())
        }
        getFillColor() {
            let {renderer: e, type: t, color: n} = this;
            if (e.getHighlightNode() === this)
                return e.colors.fillHighlight;
            if (t === "focused") {
                let r = e.colors.fillFocused;
                if (r.a > 0)
                    return r
            } else {
                if (n)
                    return n;
                if (t === "tag")
                    return e.colors.fillTag;
                if (t === "unresolved")
                    return e.colors.fillUnresolved;
                if (t === "attachment")
                    return e.colors.fillAttachment
            }
            return e.colors.fill
        }
        getSize() {
            return this.renderer.fNodeSizeMult * Math.max(8, Math.min(Math.sqrt(this.weight + 1) * 1, 30)) //Circle Size
        }
        getDisplayText() {
            let e = this.id;
            return Te(e, "md") && (e = ve(e)),
            e
        }
        getRelated() {
            return Object.keys(this.forward).concat(Object.keys(this.reverse))
        }
    }
      , ge = class {
        constructor(e, t, n) {
            this.rendered = !1;
            this.renderer = e,
            this.source = t,
            this.target = n
        }
        initGraphics() {
            if (this.rendered || !this.source.rendered || !this.target.rendered)
                return;
            this.rendered = !0;
            let {renderer: e} = this
              , t = this.px = new PIXI.Container;
            e.hanger.addChild(t);
            let n = this.line = new PIXI.Sprite(PIXI.Texture.WHITE);
            n.eventMode = "none";
            let r = e.colors.line;
            n.alpha = ie * r.a,
            n.tint = r.rgb,
            t.addChild(n);
            let i = this.arrow = new PIXI.Graphics;
            i.eventMode = "none";
            let s = e.colors.text;
            i.alpha = ie * s.a,
            i.tint = s.rgb,
            i.beginFill(16777215),
            i.moveTo(0, 0),
            i.lineTo(-4, -2),
            i.lineTo(-3, 0),
            i.lineTo(-4, 2),
            i.lineTo(0, 0),
            i.endFill(),
            i.zIndex = 1,
            e.hanger.addChild(i)
        }
        clearGraphics() {
            if (!this.rendered)
                return;
            this.rendered = !1;
            let {px: e, line: t, arrow: n} = this;
            e && (this.px = null,
            e.parent && e.parent.removeChild(e),
            e.destroy(),
            e.visible = !1),
            t && (this.line = null,
            t.destroy(),
            t.visible = !1),
            n && (this.arrow = null,
            n.parent && n.parent.removeChild(n),
            n.destroy(),
            n.visible = !1)
        }
        render() {
            if (!this.rendered)
                return;
            let {px: e, line: t, arrow: n, renderer: r, source: i, target: s} = this
              , f = r.getHighlightNode()
              , b = i === f || s === f
              , m = ie;
            (!f || b) && (m = 1);
            let T = m * Math.clamp((r.scale - .3) * 2, 0, 1)
              , I = r.colors.line;
            b && (I = r.colors.lineHighlight);
            let v = r.colors.arrow
              , P = !(i.reverse.hasOwnProperty(s.id) && i.id.localeCompare(s.id) < 0)
              , C = r.fShowArrow
              , x = r.fLineSizeMult / r.scale
              , E = r.viewport
              , l = pe(i.x, i.y, x)
              , u = pe(s.x, s.y, x)
              , c = !fe(E, We(l, u));
            if (m *= I.a,
            T *= v.a,
            t.alpha = R(t.alpha, m),
            n.alpha = R(n.alpha, T),
            P = P && c,
            C = C && c && n.alpha > .001,
            t.visible = P,
            n.visible = C,
            !P && !C)
                return;
            let d = s.x - i.x
              , w = s.y - i.y
              , L = Math.sqrt(d * d + w * w)
              , H = i.getSize() * r.nodeScale
              , h = s.getSize() * r.nodeScale;
            n.visible = C = C && L > x,
            P && (e.x = i.x + d * H / L,
            e.y = i.y + w * H / L,
            e.pivot.set(0, 0),
            e.rotation = Math.atan2(w, d),
            t.x = 0,
            t.y = -x / 2,
            t.width = Math.max(0, L - H - h),
            t.height = x,
            t.tint = Le(t.tint, I.rgb)),
            n.visible = C,
            C && (h += 1,
            n.x = s.x - d * h / L,
            n.y = s.y - w * h / L,
            n.pivot.set(0, 0),
            n.rotation = Math.atan2(w, d),
            n.scale.x = n.scale.y = 2 * Math.sqrt(r.fLineSizeMult) / r.scale,
            n.tint = v.rgb)
        }
    }
      , xe = class {
        constructor(e) {
            this.rendered = !1;
            this.renderer = e
        }
        initGraphics() {
            let {renderer: e} = this;
            if (!this.text) {
                let t = this.text = new PIXI.Text("Powered by Evox",this.getTextStyle());
                t.eventMode = "none",
                t.anchor.set(1, 1),
                t.zIndex = 3,
                t.alpha = .5,
                e.px.stage.addChild(t)
            }
        }
        clearGraphics() {
            let {text: e} = this;
            e && e.parent && (this.text = null,
            e.parent.removeChild(e),
            e.destroy()),
            this.rendered = !1
        }
        render() {
            let {renderer: e, text: t} = this;
            if (!t)
                return;
            t.visible = !e.hidePowerTag,
            t.alpha = e.colors.text.a;
            let n = e.px.renderer;
            t.x = n.width / n.resolution,
            t.y = n.height / n.resolution,
            this.rendered || (this.rendered = !0,
            this.text.style = this.getTextStyle())
        }
        getTextStyle() {
            return new PIXI.TextStyle({
                fontSize: 12,
                fill: this.renderer.colors.text.rgb,
                fontFamily: 'ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Inter", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Microsoft YaHei Light", sans-serif',
                wordWrap: !1,
                align: "right"
            })
        }
    }
      , re = class {
        constructor(e, t, n, r) {
            this.interactiveEl = null;
            this.onNodeClick = null;
            this.onNodeRightClick = null;
            this.onNodeHover = null;
            this.onNodeUnhover = null;
            this.workerResults = null;
            this.nodeLookup = {};
            this.nodes = [];
            this.links = [];
            this.dragNode = null;
            this.highlightNode = null;
            this.px = null;
            this.hanger = null;
            this.powerTag = null;
            this.scale = 1;
            this.nodeScale = 1;
            this.textAlpha = 1;
            this.targetScale = 1;
            this.panX = 0;
            this.panY = 0;
            this.panvX = 0;
            this.panvY = 0;
            this.keyboardActions = {};
            this.panning = !1;
            this.width = 0;
            this.height = 0;
            this.viewport = null;
            this.zoomCenterX = 0;
            this.zoomCenterY = 0;
            this.hidePowerTag = !1;
            this.fNodeSizeMult = 1;
            this.fLineSizeMult = 1;
            this.fTextShowMult = 1;
            this.fShowArrow = !1;
            this.mouseX = null;
            this.mouseY = null;
            this.colors = {};
            this.renderTimer = null;
            this.hidePowerTag = n,
            this.containerEl = e,
            this.testCSS();
            let i = this.interactiveEl = e.createEl("canvas");
            if (e.style.padding = "0",
            e.style.overflow = "hidden",
            e.style.position = "relative",
            i.style.position = "absolute",
            i.style.left = "0",
            i.style.top = "0",
            K(i),
            i.addEventListener("mousedown", s => s.preventDefault()),
            i.addEventListener("wheel", this.onWheel.bind(this), {
                passive: !1
            }),
            i.addEventListener("mousemove", this.onMouseMove.bind(this), {
                passive: !0
            }),
            i.addEventListener("mouseout", this.onMouseMove.bind(this)),
            r || (r = new Worker("./galaxy/sim.js",{
                name: "Graph Worker"
            })),
            this.worker = r,
            r.onmessage = s => {
                s.data.ignore || (this.workerResults = s.data,
                this.changed())
            }
            ,
            t) {
                let s = this.iframeEl = e.createEl("iframe");
                K(s),
                s.onload = this.onIframeLoad.bind(this),
                s.contentDocument && this.onIframeLoad()
            } else {
                let s = e.createEl("canvas");
                K(s),
                setTimeout( () => {
                    try {
                        this.initGraphics(s)
                    } catch (f) {
                        setTimeout( () => {
                            this.initGraphics(s)
                        }
                        , 300)
                    }
                }
                , 50)
            }
        }
        destroy() {
            this.worker.terminate(),
            this.workerResults = null,
            this.destroyGraphics()
        }
        onIframeLoad() {
            let {iframeEl: e} = this;
            e.contentWindow.onbeforeunload = this.onIframeUnload.bind(this);
            let t = e.contentDocument.body;
            K(t),
            t.innerHTML = "<canvas>";
            let n = t.firstChild;
            K(n),
            this.destroyGraphics(),
            this.initGraphics(n)
        }
        onIframeUnload() {
            this.destroyGraphics()
        }
        onWheel(e) {
            if (e.preventDefault(),
            !this.px)
                return;
            let t = e.deltaY;
            e.deltaMode === 1 ? t *= De : e.deltaMode === 2 && (t *= Xe);
            let n = this.targetScale;
            if (n *= Math.pow(Ae, -t / 120),
            this.targetScale = n,
            n < this.scale)
                this.zoomCenterX = 0,
                this.zoomCenterY = 0;
            else {
                let r = window.devicePixelRatio;
                this.zoomCenterX = e.offsetX * r,
                this.zoomCenterY = e.offsetY * r
            }
            this.changed()
        }
        onMouseMove(e) {
            e.type === "mouseout" ? this.mouseX = this.mouseY = null : (this.mouseX = e.offsetX,
            this.mouseY = e.offsetY)
        }
        initGraphics(e) {
            let {iframeEl: t, interactiveEl: n, worker: r} = this, i;
            PIXI.settings.RENDER_OPTIONS.hello = !1;
            let s = window.WebGL2RenderingContext;
            try {
                t && t.contentWindow.WebGL2RenderingContext && (window.WebGL2RenderingContext = t.contentWindow.WebGL2RenderingContext),
                i = this.px = new PIXI.Application({
                    view: e,
                    antialias: !0,
                    backgroundAlpha: 0,
                    autoStart: !1
                })
            } finally {
                window.WebGL2RenderingContext = s
            }
            i.renderer.events.setTargetElement(n);
            let f = null;
            this.onPointerDown = (h, p) => {
                p.nativeEvent.target === n && (E || (this.dragNode = h,
                f = p.getLocalPosition(i.stage)))
            }
            ;
            let b = h => {
                let {dragNode: p} = this;
                if (!p)
                    return;
                if (l) {
                    f = null,
                    this.dragNode = null;
                    return
                }
                if (f) {
                    let O = h.getLocalPosition(i.stage)
                      , y = O.x - f.x
                      , M = O.y - f.y;
                    y * y + M * M > 25 && (f = null)
                }
                let a = h.getLocalPosition(this.hanger);
                p.fx = a.x,
                p.fy = a.y,
                r.postMessage({
                    alpha: .3,
                    alphaTarget: .3,
                    run: !0,
                    forceNode: {
                        id: p.id,
                        x: a.x,
                        y: a.y
                    }
                }),
                this.changed()
            }
              , m = h => {
                h.nativeEvent.instanceOf(TouchEvent) && d(h.nativeEvent);
                let {dragNode: p} = this;
                if (!p)
                    return;
                let a = h.nativeEvent;
                f && this.onNodeClick && (a.instanceOf(MouseEvent) && (a.button === 0 || a.button === 1) && !ue(a) || a.instanceOf(TouchEvent)) && this.onNodeClick(a, p.id, p.type),
                p.fx = null,
                p.fy = null,
                r.postMessage({
                    alphaTarget: 0,
                    forceNode: {
                        id: p.id,
                        x: null,
                        y: null
                    }
                }),
                f = null,
                this.dragNode = null,
                this.changed()
            }
            ;
            i.stage.on("pointermove", b).on("pointerup", m).on("pointerupoutside", m).eventMode = "static",
            this.onPointerOver = (h, p) => {
                if (p.pointerType === "touch")
                    return;
                this.highlightNode = h,
                this.changed();
                let a = p.nativeEvent;
                a.instanceOf(MouseEvent) && (this.mouseX = a.offsetX,
                this.mouseY = a.offsetY),
                this.onNodeHover && this.onNodeHover(a, h.id, h.type)
            }
            ,
            this.onPointerOut = () => {
                this.highlightNode = null,
                this.changed(),
                this.onNodeUnhover && this.onNodeUnhover()
            }
            ;
            let T = this.hanger = new PIXI.Container;
            T.eventMode = "static";
            let I = this.powerTag = new xe(this);
            this.onResize(),
            this.resetPan();
            let v = new PIXI.Graphics;
            v.eventMode = "static",
            v.beginFill(0),
            v.drawRect(0, 0, 1e4, 1e4),
            v.endFill(),
            v.alpha = 0;
            let N = null
              , P = null
              , C = performance.now()
              , x = 0
              , E = null
              , l = null
              , u = 0
              , c = 0
              , d = h => {
                let p = performance.now()
                  , a = p - C
                  , O = Array.prototype.slice.call(h.touches)
                  , y = null
                  , M = null;
                for (let S of O)
                    E && S.identifier === E.identifier && (y = S),
                    l && S.identifier === l.identifier && (M = S);
                if (M && !y && (E = l,
                y = M,
                l = null,
                M = null),
                y ? O.remove(y) : O.length > 0 && (y = O.first(),
                O.splice(0, 1)),
                M ? O.remove(M) : O.length > 0 && (M = O.first(),
                O.splice(0, 1)),
                !f && !this.dragNode && E && y && E.identifier === y.identifier) {
                    let S = window.devicePixelRatio;
                    if (l && M && l.identifier === M.identifier) {
                        let A = this.interactiveEl.getBoundingClientRect()
                          , B = ((E.clientX + l.clientX) / 2 - A.x) * S
                          , j = ((E.clientY + l.clientY) / 2 - A.y) * S
                          , X = ((y.clientX + M.clientX) / 2 - A.x) * S
                          , q = ((y.clientY + M.clientY) / 2 - A.y) * S
                          , U = E.clientX - l.clientX
                          , _ = E.clientY - l.clientY
                          , V = y.clientX - M.clientX
                          , J = y.clientY - M.clientY
                          , Z = U * U + _ * _
                          , G = V * V + J * J;
                        if (Z !== 0 && G !== 0) {
                            let oe = Math.sqrt(G / Z)
                              , Q = this.targetScale * oe
                              , ee = this.panX + (X - B)
                              , te = this.panY + (q - j);
                            this.zoomCenterX = X,
                            this.zoomCenterY = q,
                            this.setPan(ee, te),
                            this.targetScale = Q,
                            this.changed()
                        }
                        u = 0,
                        c = 0
                    } else {
                        let A = (y.clientX - E.clientX) * S
                          , B = (y.clientY - E.clientY) * S;
                        x = R(x, a, .8),
                        C = p,
                        u = R(u, A, .8),
                        c = R(c, B, .8),
                        this.setPan(this.panX + A, this.panY + B),
                        this.changed()
                    }
                } else
                    x = R(x, a, .8),
                    a < 100 && (this.panvX = u / x,
                    this.panvY = c / x),
                    u = u = 0;
                E = y,
                l = M
            }
              , w = h => {
                if (h.nativeEvent.instanceOf(TouchEvent)) {
                    d(h.nativeEvent);
                    return
                }
                N = h.getLocalPosition(i.stage),
                P = {
                    x: T.x,
                    y: T.y
                },
                document.body.addClass("is-grabbing"),
                this.panning = !0
            }
              , L = h => {
                if (h.nativeEvent.instanceOf(TouchEvent)) {
                    d(h.nativeEvent);
                    return
                }
                N = null,
                document.body.removeClass("is-grabbing"),
                this.panning = !1;
                let a = performance.now() - C;
                x = R(x, a, .8),
                a > 100 ? this.panvX = this.panvY = 0 : (this.panvX /= x,
                this.panvY /= x)
            }
              , H = h => {
                if (h.nativeEvent.instanceOf(TouchEvent)) {
                    d(h.nativeEvent);
                    return
                }
                if (N) {
                    let p = h.getLocalPosition(i.stage)
                      , a = P.x + p.x - N.x
                      , O = P.y + p.y - N.y
                      , y = performance.now();
                    x = R(x, y - C, .8),
                    C = y,
                    this.panvX = R(this.panvX, a - this.panX, .8),
                    this.panvY = R(this.panvY, O - this.panY, .8),
                    this.setPan(a, O),
                    this.changed()
                }
            }
            ;
            v.on("pointerdown", w),
            i.stage.on("pointermove", H).on("pointerup", L).on("pointerupoutside", L).eventMode = "static",
            i.stage.addChild(v),
            i.stage.addChild(T),
            I.initGraphics(),
            this.updateZoom(),
            this.renderCallback = () => {
                if (this.renderTimer = null,
                !this.px || this.idleFrames > 60)
                    return;
                let {nodes: h, links: p} = this
                  , a = this.workerResults;
                if (a) {
                    let {id: g, buffer: k} = a
                      , F = !0;
                    if (k instanceof ArrayBuffer)
                        this.workerResults = null;
                    else {
                        let D = new Uint32Array(k,k.byteLength - 4,1);
                        D[0] === a.v ? F = !1 : a.v = D[0]
                    }
                    if (F) {
                        let D = new Float32Array(k);
                        for (let W = 0; W < g.length; W++) {
                            let Y = this.nodeLookup[g[W]];
                            Y && (Y.x = D[W * 2],
                            Y.y = D[W * 2 + 1],
                            Y.fx && (Y.x = Y.fx),
                            Y.fy && (Y.y = Y.fy))
                        }
                    }
                }
                let {panning: O, panvX: y, panvY: M, keyboardActions: S} = this
                  , A = S.shift;
                if (!O) {
                    this.panX += y * 1e3 / 60,
                    this.panY += M * 1e3 / 60;
                    let g = 0
                      , k = 0;
                    S.up && (k += 1),
                    S.down && (k -= 1),
                    S.left && (g += 1),
                    S.right && (g -= 1),
                    (g !== 0 || k !== 0) && (this.idleFrames = 0);
                    let F = A ? 3 : 1;
                    this.panvX = R(y, g * F, .9),
                    this.panvY = R(M, k * F, .9)
                }
                let B = 1 + (A ? .1 : .03)
                  , j = !1;
                if (S.zoomin && (this.targetScale *= B,
                j = !0),
                S.zoomout && (this.targetScale /= B,
                j = !0),
                j) {
                    this.idleFrames = 0;
                    let g = window.devicePixelRatio;
                    this.zoomCenterX = this.width / 1 * g,
                    this.zoomCenterY = this.height / 1 * g
                }
                this.updateZoom();
                let X = this.scale
                  , q = -this.panX / X
                  , U = -this.panY / X
                  , _ = q + this.width / X * window.devicePixelRatio
                  , V = U + this.height / X * window.devicePixelRatio;
                this.viewport = {
                    left: q,
                    right: _,
                    top: U,
                    bottom: V
                };
                let J = (q + _) / 2
                  , Z = (U + V) / 2
                  , G = []
                  , oe = (g, k) => g.dist - k.dist
                  , Q = 50;
                for (let g of h)
                    if (!g.rendered) {
                        let k = g.x - J
                          , F = g.y - Z
                          , D = k * k + F * F;
                        (G.length < Q || D < G.last().dist) && (G.push({
                            node: g,
                            dist: k * k + F * F
                        }),
                        G.sort(oe),
                        G.length > Q && G.pop())
                    }
                if (G.length > 0) {
                    for (let g of G)
                        g.node.initGraphics();
                    this.idleFrames = 0
                }
                for (let g of p)
                    g.initGraphics();
                for (let g of h)
                    g.render();
                for (let g of p)
                    g.render();
                I.render(),
                T.sortChildren(),
                i.render(),
                this.idleFrames++,
                this.queueRender();
                let {mouseX: ee, mouseY: te, highlightNode: ne} = this;
                if (ee !== null && te !== null && ne) {
                    let g = (ee * window.devicePixelRatio - this.panX) / X
                      , k = (te * window.devicePixelRatio - this.panY) / X
                      , F = ne.x - g
                      , D = ne.y - k
                      , W = ne.getSize() * this.nodeScale + 2;
                    F * F + D * D > W * W && (this.highlightNode = null,
                    this.idleFrames = 0,
                    this.onNodeUnhover && this.onNodeUnhover())
                }
            }
            ,
            this.queueRender()
        }
        destroyGraphics() {
            let {iframeEl: e, px: t, links: n, nodes: r, powerTag: i} = this;
            this.hanger = null;
            for (let s of n)
                s.clearGraphics();
            for (let s of r)
                s.clearGraphics();
            i && (this.powerTag = null,
            i.clearGraphics()),
            t && (t.renderer.events.setTargetElement(null),
            e && document.body.contains(e) && e.contentDocument && t.destroy(!0, {
                children: !0,
                texture: !0,
                baseTexture: !0
            }),
            this.px = null),
            this.containerEl.win.cancelAnimationFrame(this.renderTimer),
            this.renderTimer = null,
            this.renderCallback = null,
            document.body.removeClass("is-grabbing")
        }
        zoomTo(e, t) {
            this.targetScale = e,
            t ? (this.zoomCenterX = t.x,
            this.zoomCenterY = t.y) : this.zoomCenterX = this.zoomCenterY = 0
        }
        onResize() {
            let {px: e, hanger: t, containerEl: n, interactiveEl: r} = this
              , i = window.devicePixelRatio
              , s = n.clientWidth
              , f = n.clientHeight;
            if (this.width = s,
            this.height = f,
            e) {
                let b = Math.round(s * i)
                  , m = Math.round(f * i)
                  , T = e.renderer
                  , I = T.width
                  , v = T.height;
                T.view.style.width = s + "px",
                T.view.style.height = f + "px",
                T.resize(b, m),
                r.width = s,
                r.height = f,
                e.renderer.events.resolutionChange(1 / i),
                t && this.setPan(this.panX + (b - I) / 2, this.panY + (m - v) / 2)
            }
            this.changed()
        }
        resetPan() {
            let e = window.devicePixelRatio;
            this.setPan(this.width / 2 * e, this.height / 2 * e)
        }
        setData(e) {
            let { nodes: t, nodeLookup: n, links: r } = this,
                i = e.nodes,
                s = {},
                f = [],
                b = [],
                m = false,
                T = false,
                I = 0;
        
            let sizeFactor = 250; // Factor to increase dot sizes
        
            // Update existing nodes or prepare to add new ones
            for (let l of t) {
                if (!i.hasOwnProperty(l.id)) {
                    f.push(l);
                    m = true;
                    continue;
                }
                I = Math.max(I, l.x * l.x + l.y * l.y);
                s[l.id] = false;
            }
        
            let v = Math.sqrt(I),
                N = [];
        
            for (let l in i) {
                if (!i.hasOwnProperty(l)) continue;
                let u = i[l];
        
                if (n.hasOwnProperty(l)) {
                    let c = u.color || null,
                        d = n[l];
        
                    if (d.color !== c) {
                        d.color = c;
                        T = true;
                    }
                    if (d.type !== u.type) {
                        d.type = u.type;
                        T = true;
                    }
                    d.size = (u.size || 1) * sizeFactor; // Update existing node size
                } else {
                    let c = new me(this, l, u.type);
                    c.color = u.color || null;
                    c.size = (u.size || 1) * sizeFactor; // Set size for new nodes
                    t.push(c);
                    n[l] = c;
                    m = true;
                    N.push(c);
                }
            }
        
            // Link management
            for (let l in i) {
                if (!i.hasOwnProperty(l) || !n.hasOwnProperty(l)) continue;
                let u = n[l],
                    d = i[l].links;
        
                for (let w in u.forward) {
                    if (u.forward.hasOwnProperty(w) && !d.hasOwnProperty(w)) {
                        b.push(u.forward[w]);
                        m = true;
                    }
                }
        
                for (let w in d) {
                    if (!d.hasOwnProperty(w) || u.forward.hasOwnProperty(w) || !n.hasOwnProperty(w)) continue;
                    let L = n[w],
                        H = new ge(this, u, L);
                    r.push(H);
                    u.forward[L.id] = H;
                    L.reverse[u.id] = H;
                    m = true;
                }
            }
        
            let P = l => {
                l.clearGraphics();
                r.remove(l);
                delete l.source.forward[l.target.id];
                delete l.target.reverse[l.source.id];
            };
        
            for (let l of b) P(l);
            for (let l of f) {
                l.clearGraphics();
                t.remove(l);
                delete n[l.id];
                let { forward: u, reverse: c } = l;
        
                for (let d in u) {
                    if (u.hasOwnProperty(d)) P(u[d]);
                }
                for (let d in c) {
                    if (c.hasOwnProperty(d)) P(c[d]);
                }
            }
        
            let C = N.length;
            if (C > 0) {
                let l = C * 60 * 60,
                    u = Math.sqrt(l / Math.PI + v * v) - v,
                    c = Math.sqrt(l);
        
                for (let d of N) {
                    let w = 0,
                        L = 0,
                        H = 0,
                        h = d.getRelated();
        
                    for (let p of h) {
                        if (n.hasOwnProperty(p)) {
                            let a = n[p];
                            if (a.x !== null && a.y !== null) {
                                w += a.x;
                                L += a.y;
                                H++;
                            }
                        }
                    }
        
                    if (H > 0) {
                        d.x = w / H + (Math.random() - 0.5) * c;
                        d.y = L / H + (Math.random() - 0.5) * c;
                    } else {
                        let p = Math.random() * 2 * Math.PI,
                            a = v + Math.sqrt(Math.random()) * u;
                        d.x = a * Math.cos(p);
                        d.y = a * Math.sin(p);
                    }
                    s[d.id] = [d.x, d.y];
                }
            }
        
            let x = e.weights;
            for (let l in n) {
                if (!n.hasOwnProperty(l)) continue;
                let u = n[l],
                    c = u.weight;
        
                x ? (x.hasOwnProperty(l) ? (c = x[l]) : (c = 0)) : (c = u.getRelated().length);
                if (u.weight !== c) {
                    u.weight = c;
                    m = true;
                }
            }
        
            if (!m) {
                T && this.changed();
                return;
            }
        
            let E = [];
            for (let l of r) E.push([l.source.id, l.target.id]);
        
            this.worker.postMessage({
                nodes: s,
                links: E,
                alpha: 0.3,
                run: true
            });
        
            this.changed();
        }
        
        setRenderOptions(e) {
            let {nodeSizeMultiplier: t, lineSizeMultiplier: n, showArrow: r, textFadeMultiplier: i} = e;
            Number.isNumber(t) && (this.fNodeSizeMult = t),
            Number.isNumber(n) && (this.fLineSizeMult = n),
            Number.isNumber(i) && (this.fTextShowMult = i),
            isBoolean(r) && (this.fShowArrow = r),
            this.changed()
        }
        setForces(e) {
            this.worker.postMessage({
                forces: e,
                alpha: .3,
                run: !0
            })
        }
        getHighlightNode() {
            return this.dragNode || this.highlightNode
        }
        updateZoom() {
            let {scale: e, targetScale: t, panX: n, panY: r} = this;
            t = this.targetScale = Math.min(5, Math.max(6 / 4, t)); // Increased max zoom to 2
            if ((e > t ? e / t : t / e) - 1 >= .01) {
                let {zoomCenterX: s, zoomCenterY: f} = this;
                if (s === 0 && f === 0) {
                    let m = window.devicePixelRatio;
                    s = this.width / 2 * m;
                    f = this.height / 2 * m;
                }
                let b = {
                    x: (s - n) / e,
                    y: (f - r) / e
                };
                e = R(e, t, .85);
                n -= b.x * e + n - s;
                r -= b.y * e + r - f;
                this.changed();
            }
            this.setPan(n, r);
            this.setScale(e);
        }
        setPan(e, t) {
            let {hanger: n} = this;
            this.panX = e,
            this.panY = t,
            n && (n.x = e,
            n.y = t)
        }
        setScale(e) {
            let {hanger: t} = this;
            this.scale = e,
            this.nodeScale = Math.sqrt(1 / e);
            let n = Math.log(e) / Math.log(2);
            this.textAlpha = Math.clamp(n + 1 - this.fTextShowMult, 0, 1),
            t && (t.scale.x = t.scale.y = e)
        }
        changed() {
            this.idleFrames = 0,
            this.queueRender()
        }
        queueRender() {
            !this.renderTimer && this.renderCallback && (this.renderTimer = this.containerEl.win.requestAnimationFrame(this.renderCallback))
        }
        testCSS() {
            let e = n => {
                let r = document.body.createDiv({
                    cls: "graph-view " + n
                })
                  , i = getComputedStyle(r)
                  , s = i.color
                  , f = i.opacity;
                r.detach();
                let b = we(s)
                  , m = parseFloat(f);
                return isNaN(m) && (m = 1),
                b ? {
                    a: m * b.a,
                    rgb: b.r << 16 | b.g << 8 | b.b
                } : {
                    a: m,
                    rgb: 8947848
                }
            }
            ;
            for (let n in he)
                he.hasOwnProperty(n) && (this.colors[n] = e(he[n]));
            for (let n of this.nodes)
                n.fontDirty = !0;
            let {powerTag: t} = this;
            t && (t.rendered = !1),
            this.changed()
        }
        getTransparentScreenshot() {
            let {px: e} = this;
            return e.render(),
            e.view
        }
        getBackgroundScreenshot() {
            let e = this.getTransparentScreenshot()
              , t = document.createElement("canvas");
            t.width = e.width,
            t.height = e.height;
            let n = t.getContext("2d");
            return n.fillStyle = "#FFFFFF",
            n.fillRect(0, 0, e.width, e.height),
            n.drawImage(e, 0, 0),
            t
        }
        static async copyToClipboard(e, t) {
            let n = await be(e, t);
            await ye(n)
        }
    }
    ;
    var ze = !1;
    try {
        window.addEventListener("test", null, Object.defineProperty({}, "passive", {
            get: function() {
                ze = {
                    passive: !1
                }
            }
        }))
    } catch (o) {}
    function Be(o) {
        return new Promise( (e, t) => {
            let n = document.createElement("script");
            n.type = "text/javascript",
            n.src = o,
            n.addEventListener("load", () => e(n)),
            n.addEventListener("error", r => t(r)),
            document.body.appendChild(n)
        }
        )
    }
    function Se(o, e) {
        let t = !1
          , n = null;
        return {
            get loaded() {
                return t
            },
            get promise() {
                if (t)
                    return Promise.resolve();
                if (!n) {
                    e && e.before && e.before();
                    let r = Be(o);
                    r.catch(i => {
                        i.detach(),
                        n = null
                    }
                    ),
                    n = r.then( () => {
                        t = !0,
                        n = null,
                        e && e.after && e.after()
                    }
                    )
                }
                return n
            },
            then(r) {
                return t ? r() : this.promise.then(r)
            }
        }
    }
    var ke = new Map;
    for (let o of "a abbr acronym b bdi bdo big br button canvas cite code data del dfn em embed i iframe img input ins kbd label map mark meter noscript object outputpicture progress q ruby s samp select small span strong sub sup svg textarea time u tt var video wbr".split(" "))
        ke.set(o, !0);
    for (let o of "address article aside blockquote details dialog dd div dl dt fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 header hgroup hr li main nav ol p pre ul".split(" "))
        ke.set(o, !1);
    function Re(o, e) {
        o.isShown() ? e() : o.onNodeInserted(e, !0)
    }
    async function Ne(o, e) {
        let t = await ajaxPromise({
            url: o
        });
        return new Worker(window.URL.createObjectURL(new Blob([t])),e)
    }
    async function He(o, e) {
        if (Me)
            return Ne(o, e);
        try {
            return new Worker(o,e)
        } catch (t) {
            return Ne(o)
        }
    }
    var $ = fish(".demo-graph");
    if ($) {
        let o = Se("./galaxy/pixi.min.js");
        Re($, () => {
            let e = full;

            let p3 = {
                1: {
                    links: ["2", "5", "6"]
                },
                2: {
                    links: ["1", "4"]
                },
                3: {
                    links: ["4"]
                },
                4: {
                    links: ["2", "3", "5", "14", "16"]
                },
                5: {
                    links: ["1", "4", "14", "15", "Kyriakos", "DarkAngel"],
                    //color: "#aac522"
                },
                6: {
                    links: ["1", "Kyriakos", "DarkAngel"]
                },
                7: {
                    links: ["Kyriakos", "DarkAngel"]
                },
                8: {
                    links: ["10", "Kyriakos", "DarkAngel"]
                },
                9: {
                    links: ["10"]
                },
                10: {
                    links: ["8", "9", "Kyriakos", "DarkAngel"]
                },
                Kyriakos: {
                    links: ["6", "7", "8", "12", "10", "40", "13", "5", "talamagkas", "papostol"]
                },
                12: {
                    links: ["Kyriakos", "DarkAngel"]
                },
                13: {
                    links: ["11", "15", "19"]
                },
                14: {
                    links: ["4", "5", "15", "16", "17"]
                },
                15: {
                    links: ["2", "3", "5", "14", "16"]
                },
                16: {
                    links: ["4", "14", "17", "papostol"]
                },
                17: {
                    links: ["14", "papostol"]
                },
                18: {
                    links: ["15", "papostol"]
                },
                19: {
                    links: ["13", "papostol"]
                },
                20: {
                    links: ["papostol"]
                },
                21: {
                    links: ["papostol"]
                },
                22: {
                    links: ["23"]
                },
                23: {
                    links: ["22", "papostol"]
                },
                24: {
                    links: ["25", "26"]
                },
                25: {
                    links: ["24"]
                },
                26: {
                    links: ["24", "papostol", "27", "talamagkas"],
                    //color: "#aac522"
                },
                27: {
                    links: ["26", "30", "33", "31", "talamagkas"]
                },
                28: {
                    links: ["29", "30"]
                },
                29: {
                    links: ["28", "35"]
                },
                30: {
                    links: ["27", "28", "34", "35"]
                },
                31: {
                    links: ["27", "34", "32"],
                    //color: "#aac522"
                },
                32: {
                    links: ["31", "38", "39", "41", "talamagkas"]
                },
                33: {
                    links: ["27", "34", "38"]
                },
                34: {
                    links: ["30", "35", "36", "37", "31", "33"]
                },
                35: {
                    links: ["29", "30", "34", "36"]
                },
                36: {
                    links: ["34", "35", "37", "45"]
                },
                37: {
                    links: ["34", "36", "45", "41", "39", "38"]
                },
                38: {
                    links: ["32", "33", "37", "39", "16"]
                },
                39: {
                    links: ["32", "38", "37", "41"]
                },
                40: {
                    links: ["Kyriakos", "42", "talamagkas"]
                },
                41: {
                    links: ["32", "39", "37", "45", "talamagkas"]
                },
                42: {
                    links: ["40", "45"]
                },
                43: {
                    links: ["talamagkas", "45"]
                },
                44: {
                    links: ["45", "46"]
                },
                45: {
                    links: ["36", "37", "41", "43", "44", "46"]
                },
                46: {
                    links: ["45", "44"]
                },
                papostol: {
                    color: "#22c55e",
                    links: ["21", "23", "26", "talamagkas", "19", "Kyriakos", "18", "17", "16", "20"]
                },
                "talamagkas": {
                    color: "#aac522",
                    links: ["papostol", "26", "27", "32", "Kyriakos", "41", "43", "40"]
                },
                "DarkAngel": {
                    color: "#aac522",
                    links: ["papostol", "26", "27", "32", "talamagkas","Kyriakos", "41", "43", "40"]
                },
                "Pravis": {
                    color: "#aac522",
                    links: ["26", "27", "32", "talamagkas","Kyriakos", "41", "43", "40"]
                }
            }
            for (let n in e)
                if (e.hasOwnProperty(n)) {
                    let r = e[n];
                    r.type = "";
                    let i = {};
                    for (let s of e[n].links)
                        i[s] = !0;
                    r.links = i,
                    r.color ? r.color = {
                        rgb: parseInt(r.color.slice(1), 16),
                        a: 1
                    } : n.match(/^\d+$/) && (r.color = {
                        rgb: parseInt("bababa", 16),
                        a: .8
                    })
                }
            let t = He("./galaxy/sim.js", {
                name: "Graph Worker"
            });
            o.then(async () => {
                let n = await t;
                document.fonts && await document.fonts.ready,
                $.empty();
                let r = new re($,!1,!0,n);
                r.setRenderOptions({
                    textFadeMultiplier: -2,
                    lineSizeMultiplier: 2
                }),
                r.targetScale = 1 / 4 * window.devicePixelRatio,
                r.setScale(r.targetScale),
                r.setData({
                    nodes: e
                }),
                new ResizeObserver( () => r.onResize()).observe($)
            }
            )
        }
        )
    }
}
)();
