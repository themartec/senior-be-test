import * as react from "react";
import t, {
    createContext as createContext,
    useContext as useContext,
    useMemo as useMemo,
    createElement as createElement,
    useCallback as useCallback,
    forwardRef as forwardRef,
    Children as Children,
    isValidElement as isValidElement,
    cloneElement as cloneElement,
    Fragment as Fragment,
    useLayoutEffect as useLayoutEffect,
    useEffect as useEffect,
    useRef as userRef,
    useState as useState,
    useReducer as useReducer,
    createRef as createRef
} from "react";
import {
    Carousel as Carousel,
    Text as Text,
    SearchIcon as SearchIcon,
    TextInput as TextInput,
    Box as Box,
    ClearDecorator as ClearDecorator,
    FormField as FormField,
    Columns as Columns,
    Column as Column,
    Placeholder as PlaceHolder,
    Pill as Pill,
    PlusIcon as PlusIcon,
    MinusIcon as MinusIcon,
    ChevronDownIcon as ChevronDownIcon,
    Rows as Rows,
    Button as Button,
    ArrowLeftIcon as ArrowLeftIcon,
    Title as Title,
    tokens as tokens,
    TitlePlaceholder as TitlePlaceholder,
    CheckboxGroup as CheckboxGroup,
    NumberInput as NumberInput,
    RadioGroup as RadioGroup,
    Badge as Badge,
    SlidersIcon as V,
    InfoIcon as W,
    Select as H,
    SortIcon as Q,
    ImageCard as z,
    FolderIcon as $,
    GridIcon as G,
    VideoCard as K,
    AudioCard as Y,
    EmbedCard as J,
    LinkIcon as Z,
    EyeIcon as X,
    MasonryItem as ee,
    Masonry as te,
    GridViewIcon as ne,
    ListBulletLtrIcon as re,
    ExportIcon as ie,
    AlertTriangleIcon as ae,
    ProgressBar as oe,
    Alert as le,
    OpenInNewIcon as se,
    AudioContextProvider as ue
} from "@canva/app-ui-kit";
import {
    flushSync as ce,
    createPortal as de
} from "react-dom";
import {
    jsx as pe
} from "react/jsx-runtime";


function he() {
    return he = Object.assign ? Object.assign.bind() : function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
        }
        return e
    }, he.apply(this, arguments)
}
var fe, me;

function createMemoryHistory(options) {
    const {
        initialEntries = ["/"],
        initialIndex,
        v5Compat = false
    } = options;

    const entries = initialEntries.map((entry, index) => createLocation(entry, typeof entry === "string" ? null : entry.state, index === 0 ? "default" : undefined));
    let currentIndex = clampIndex(initialIndex == null ? entries.length - 1 : initialIndex);
    let action = ActionType.Pop;
    let listener = null;

    function clampIndex(index) {
        return Math.min(Math.max(index, 0), entries.length - 1);
    }

    function getCurrentLocation() {
        return entries[currentIndex];
    }

    function createLocation(path, state, key) {
        const basePath = entries.length ? getCurrentLocation().pathname : "/";
        const location = createPathObject(basePath, path, state, key);
        validatePath(location.pathname);
        return location;
    }

    function createPathObject(basePath, path, state, key) {
        return {
            ...parsePath(basePath, path),
            state: state,
            key: key || generateKey()
        };
    }

    function validatePath(pathname) {
        if (!pathname.startsWith("/")) {
            throw new Error(`Relative pathnames are not supported in memory history: ${JSON.stringify(pathname)}`);
        }
    }

    function toUrlString(location) {
        return typeof location === "string" ? location : formatPath(location);
    }

    return {
        get index() {
            return currentIndex;
        },
        get action() {
            return action;
        },
        get location() {
            return getCurrentLocation();
        },
        createHref: toUrlString,
        createURL: location => new URL(toUrlString(location), "http://localhost"),
        encodeLocation(location) {
            const path = typeof location === "string" ? parsePath(location) : location;
            return {
                pathname: path.pathname || "",
                search: path.search || "",
                hash: path.hash || ""
            };
        },
        push(path, state) {
            action = ActionType.Push;
            const location = createLocation(path, state);
            currentIndex += 1;
            entries.splice(currentIndex, entries.length, location);
            if (v5Compat && listener) {
                listener({ action, location, delta: 1 });
            }
        },
        replace(path, state) {
            action = ActionType.Replace;
            const location = createLocation(path, state);
            entries[currentIndex] = location;
            if (v5Compat && listener) {
                listener({ action, location, delta: 0 });
            }
        },
        go(delta) {
            action = ActionType.Pop;
            const newIndex = clampIndex(currentIndex + delta);
            const location = entries[newIndex];
            currentIndex = newIndex;
            if (listener) {
                listener({ action, location, delta });
            }
        },
        listen(callback) {
            listener = callback;
            return () => {
                listener = null;
            };
        }
    };
}

const ActionType = {
    Pop: "POP",
    Push: "PUSH",
    Replace: "REPLACE"
};

function generateKey() {
    return Math.random().toString(36).substr(2, 8);
}

function parsePath(basePath, path) {
    const url = new URL(path, `http://localhost${basePath}`);
    return {
        pathname: url.pathname,
        search: url.search,
        hash: url.hash
    };
}

function formatPath({ pathname, search, hash }) {
    return `${pathname}${search}${hash}`;
}

function ge(e, t) {
    if (!1 === e || null == e) throw new Error(t)
}

function ye(e, t) {
    if (!e) {
        "undefined" != typeof console && console.warn(t);
        try {
            throw new Error(t)
        } catch (e) {}
    }
}

function be() {
    return Math.random().toString(36).substr(2, 8)
}

function _e(e) {
    let t = {};
    if (e) {
        let n = e.indexOf("#");
        n >= 0 && (t.hash = e.substr(n), e = e.substr(0, n));
        let r = e.indexOf("?");
        r >= 0 && (t.search = e.substr(r), e = e.substr(0, r)), e && (t.pathname = e)
    }
    return t
}

function Ee(e, t, n) {
    void 0 === n && (n = "/");
    let r = Fe(("string" == typeof t ? _e(t) : t).pathname || "/", n);
    if (null == r) return null;
    let i = we(e);
    ! function(e) {
        e.sort(((e, t) => e.score !== t.score ? t.score - e.score : function(e, t) {
            let n = e.length === t.length && e.slice(0, -1).every(((e, n) => e === t[n]));
            return n ? e[e.length - 1] - t[t.length - 1] : 0
        }(e.routesMeta.map((e => e.childrenIndex)), t.routesMeta.map((e => e.childrenIndex)))))
    }(i);
    let a = null;
    for (let e = 0; null == a && e < i.length; ++e) a = Re(i[e], De(r));
    return a
}

function we(e, t, n, r) {
    void 0 === t && (t = []), void 0 === n && (n = []), void 0 === r && (r = "");
    let i = (e, i, a) => {
        let o = {
            relativePath: void 0 === a ? e.path || "" : a,
            caseSensitive: !0 === e.caseSensitive,
            childrenIndex: i,
            route: e
        };
        o.relativePath.startsWith("/") && (ge(o.relativePath.startsWith(r), 'Absolute route path "' + o.relativePath + '" nested under path "' + r + '" is not valid. An absolute child route path must start with the combined path of all its parent routes.'), o.relativePath = o.relativePath.slice(r.length));
        let l = je([r, o.relativePath]),
            s = n.concat(o);
        e.children && e.children.length > 0 && (ge(!0 !== e.index, 'Index routes must not have child routes. Please remove all child routes from route path "' + l + '".'), we(e.children, t, s, l)), (null != e.path || e.index) && t.push({
            path: l,
            score: Ie(l, e.index),
            routesMeta: s
        })
    };
    return e.forEach(((e, t) => {
        var n;
        if ("" !== e.path && null != (n = e.path) && n.includes("?"))
            for (let n of Ce(e.path)) i(e, t, n);
        else i(e, t)
    })), t
}

function Ce(e) {
    let t = e.split("/");
    if (0 === t.length) return [];
    let [n, ...r] = t, i = n.endsWith("?"), a = n.replace(/\?$/, "");
    if (0 === r.length) return i ? [a, ""] : [a];
    let o = Ce(r.join("/")),
        l = [];
    return l.push(...o.map((e => "" === e ? a : [a, e].join("/")))), i && l.push(...o), l.map((t => e.startsWith("/") && "" === t ? "/" : t))
}! function(e) {
    e.Pop = "POP", e.Push = "PUSH", e.Replace = "REPLACE"
}(fe || (fe = {})),
    function(e) {
        e.data = "data", e.deferred = "deferred", e.redirect = "redirect", e.error = "error"
    }(me || (me = {}));
const Se = /^:\w+$/,
    ke = 3,
    Oe = 2,
    xe = 1,
    Ne = 10,
    Pe = -2,
    Te = e => "*" === e;

function Ie(e, t) {
    let n = e.split("/"),
        r = n.length;
    return n.some(Te) && (r += Pe), t && (r += Oe), n.filter((e => !Te(e))).reduce(((e, t) => e + (Se.test(t) ? ke : "" === t ? xe : Ne)), r)
}

function Re(e, t) {
    let {
        routesMeta: n
    } = e, r = {}, i = "/", a = [];
    for (let e = 0; e < n.length; ++e) {
        let o = n[e],
            l = e === n.length - 1,
            s = "/" === i ? t : t.slice(i.length) || "/",
            u = Ae({
                path: o.relativePath,
                caseSensitive: o.caseSensitive,
                end: l
            }, s);
        if (!u) return null;
        Object.assign(r, u.params);
        let c = o.route;
        a.push({
            params: r,
            pathname: je([i, u.pathname]),
            pathnameBase: qe(je([i, u.pathnameBase])),
            route: c
        }), "/" !== u.pathnameBase && (i = je([i, u.pathnameBase]))
    }
    return a
}

function Ae(e, t) {
    "string" == typeof e && (e = {
        path: e,
        caseSensitive: !1,
        end: !0
    });
    let [n, r] = function(e, t, n) {
        void 0 === t && (t = !1);
        void 0 === n && (n = !0);
        ye("*" === e || !e.endsWith("*") || e.endsWith("/*"), 'Route path "' + e + '" will be treated as if it were "' + e.replace(/\*$/, "/*") + '" because the `*` character must always follow a `/` in the pattern. To get rid of this warning, please change the route path to "' + e.replace(/\*$/, "/*") + '".');
        let r = [],
            i = "^" + e.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:(\w+)(\?)?/g, ((e, t, n) => (r.push({
                paramName: t,
                isOptional: null != n
            }), n ? "/?([^\\/]+)?" : "/([^\\/]+)")));
        e.endsWith("*") ? (r.push({
            paramName: "*"
        }), i += "*" === e || "/*" === e ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : n ? i += "\\/*$" : "" !== e && "/" !== e && (i += "(?:(?=\\/|$))");
        let a = new RegExp(i, t ? void 0 : "i");
        return [a, r]
    }(e.path, e.caseSensitive, e.end), i = t.match(n);
    if (!i) return null;
    let a = i[0],
        o = a.replace(/(.)\/+$/, "$1"),
        l = i.slice(1);
    return {
        params: r.reduce(((e, t, n) => {
            let {
                paramName: r,
                isOptional: i
            } = t;
            if ("*" === r) {
                let e = l[n] || "";
                o = a.slice(0, a.length - e.length).replace(/(.)\/+$/, "$1")
            }
            const s = l[n];
            return e[r] = i && !s ? void 0 : function(e, t) {
                try {
                    return decodeURIComponent(e)
                } catch (n) {
                    return ye(!1, 'The value for the URL param "' + t + '" will not be decoded because the string "' + e + '" is a malformed URL segment. This is probably due to a bad percent encoding (' + n + ")."), e
                }
            }(s || "", r), e
        }), {}),
        pathname: a,
        pathnameBase: o,
        pattern: e
    }
}

function De(e) {
    try {
        return decodeURI(e)
    } catch (t) {
        return ye(!1, 'The URL path "' + e + '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent encoding (' + t + ")."), e
    }
}

function Fe(e, t) {
    if ("/" === t) return e;
    if (!e.toLowerCase().startsWith(t.toLowerCase())) return null;
    let n = t.endsWith("/") ? t.length - 1 : t.length,
        r = e.charAt(n);
    return r && "/" !== r ? null : e.slice(n) || "/"
}

function Le(e, t, n, r) {
    return "Cannot include a '" + e + "' character in a manually specified `to." + t + "` field [" + JSON.stringify(r) + "].  Please separate it out to the `to." + n + '` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.'
}

function Me(e) {
    return e.filter(((e, t) => 0 === t || e.route.path && e.route.path.length > 0))
}

function Ue(e, t, n, r) {
    let i;
    void 0 === r && (r = !1), "string" == typeof e ? i = _e(e) : (i = he({}, e), ge(!i.pathname || !i.pathname.includes("?"), Le("?", "pathname", "search", i)), ge(!i.pathname || !i.pathname.includes("#"), Le("#", "pathname", "hash", i)), ge(!i.search || !i.search.includes("#"), Le("#", "search", "hash", i)));
    let a, o = "" === e || "" === i.pathname,
        l = o ? "/" : i.pathname;
    if (null == l) a = n;
    else if (r) {
        let e = t[t.length - 1].replace(/^\//, "").split("/");
        if (l.startsWith("..")) {
            let t = l.split("/");
            for (;
                ".." === t[0];) t.shift(), e.pop();
            i.pathname = t.join("/")
        }
        a = "/" + e.join("/")
    } else {
        let e = t.length - 1;
        if (l.startsWith("..")) {
            let t = l.split("/");
            for (;
                ".." === t[0];) t.shift(), e -= 1;
            i.pathname = t.join("/")
        }
        a = e >= 0 ? t[e] : "/"
    }
    let s = function(e, t) {
            void 0 === t && (t = "/");
            let {
                pathname: n,
                search: r = "",
                hash: i = ""
            } = "string" == typeof e ? _e(e) : e, a = n ? n.startsWith("/") ? n : function(e, t) {
                let n = t.replace(/\/+$/, "").split("/");
                return e.split("/").forEach((e => {
                    ".." === e ? n.length > 1 && n.pop() : "." !== e && n.push(e)
                })), n.length > 1 ? n.join("/") : "/"
            }(n, t) : t;
            return {
                pathname: a,
                search: Be(r),
                hash: Ve(i)
            }
        }(i, a),
        u = l && "/" !== l && l.endsWith("/"),
        c = (o || "." === l) && n.endsWith("/");
    return s.pathname.endsWith("/") || !u && !c || (s.pathname += "/"), s
}
const je = e => e.join("/").replace(/\/\/+/g, "/"),
    qe = e => e.replace(/\/+$/, "").replace(/^\/*/, "/"),
    Be = e => e && "?" !== e ? e.startsWith("?") ? e : "?" + e : "",
    Ve = e => e && "#" !== e ? e.startsWith("#") ? e : "#" + e : "";
const We = ["post", "put", "patch", "delete"];
new Set(We);
const He = ["get", ...We];

function Qe() {
    return Qe = Object.assign ? Object.assign.bind() : function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
        }
        return e
    }, Qe.apply(this, arguments)
}
new Set(He);
const ze = react.createContext(null);
"production" !== process.env.NODE_ENV && (ze.displayName = "DataRouter");
const $e = react.createContext(null);
"production" !== process.env.NODE_ENV && ($e.displayName = "DataRouterState");
const Ge = react.createContext(null);
"production" !== process.env.NODE_ENV && (Ge.displayName = "Await");
const Ke = react.createContext(null);
"production" !== process.env.NODE_ENV && (Ke.displayName = "Navigation");
const Ye = react.createContext(null);
"production" !== process.env.NODE_ENV && (Ye.displayName = "Location");
const Je = react.createContext({
    outlet: null,
    matches: [],
    isDataRoute: !1
});
"production" !== process.env.NODE_ENV && (Je.displayName = "Route");
const Ze = react.createContext(null);

function Xe() {
    return null != react.useContext(Ye)
}

function et() {
    return Xe() || ("production" !== process.env.NODE_ENV ? ge(!1, "useLocation() may be used only in the context of a <Router> component.") : ge(!1)), react.useContext(Ye).location
}
"production" !== process.env.NODE_ENV && (Ze.displayName = "RouteError");
const tt = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";

function nt(t) {
    react.useContext(Ke).static || react.useLayoutEffect(t)
}

function rt() {
    let {
        isDataRoute: t
    } = react.useContext(Je);
    return t ? function() {
        let {
            router: t
        } = function(t) {
            let n = react.useContext(ze);
            return n || ("production" !== process.env.NODE_ENV ? ge(!1, pt(t)) : ge(!1)), n
        }(ct.UseNavigateStable), n = ht(dt.UseNavigateStable), r = react.useRef(!1);
        return nt((() => {
            r.current = !0
        })), react.useCallback((function(e, i) {
            void 0 === i && (i = {}), "production" !== process.env.NODE_ENV && ye(r.current, tt), r.current && ("number" == typeof e ? t.navigate(e) : t.navigate(e, Qe({
                fromRouteId: n
            }, i)))
        }), [t, n])
    }() : function() {
        Xe() || ("production" !== process.env.NODE_ENV ? ge(!1, "useNavigate() may be used only in the context of a <Router> component.") : ge(!1));
        let t = react.useContext(ze),
            {
                basename: n,
                navigator: r
            } = react.useContext(Ke),
            {
                matches: i
            } = react.useContext(Je),
            {
                pathname: a
            } = et(),
            o = JSON.stringify(Me(i).map((e => e.pathnameBase))),
            l = react.useRef(!1);
        return nt((() => {
            l.current = !0
        })), react.useCallback((function(e, i) {
            if (void 0 === i && (i = {}), "production" !== process.env.NODE_ENV && ye(l.current, tt), !l.current) return;
            if ("number" == typeof e) return void r.go(e);
            let s = Ue(e, JSON.parse(o), a, "path" === i.relative);
            null == t && "/" !== n && (s.pathname = "/" === s.pathname ? n : je([n, s.pathname])), (i.replace ? r.replace : r.push)(s, i.state, i)
        }), [n, r, o, a, t])
    }()
}

function it() {
    let {
        matches: t
    } = react.useContext(Je), n = t[t.length - 1];
    return n ? n.params : {}
}

function at(t, n) {
    return function(t, n, r) {
        Xe() || ("production" !== process.env.NODE_ENV ? ge(!1, "useRoutes() may be used only in the context of a <Router> component.") : ge(!1));
        let {
            navigator: i
        } = react.useContext(Ke), {
            matches: a
        } = react.useContext(Je), o = a[a.length - 1], l = o ? o.params : {}, s = o ? o.pathname : "/", u = o ? o.pathnameBase : "/", c = o && o.route;
        if ("production" !== process.env.NODE_ENV) {
            let e = c && c.path || "";
            d = s, p = !c || e.endsWith("*"), h = 'You rendered descendant <Routes> (or called `useRoutes()`) at "' + s + '" (under <Route path="' + e + '">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won\'t match anymore and therefore the child routes will never render.\n\nPlease change the parent <Route path="' + e + '"> to <Route path="' + ("/" === e ? "*" : e + "/*") + '">.', p || ft[d] || (ft[d] = !0, "production" !== process.env.NODE_ENV && ye(!1, h))
        }
        var d, p, h;
        let f, m = et();
        if (n) {
            var v;
            let e = "string" == typeof n ? _e(n) : n;
            "/" === u || (null == (v = e.pathname) ? void 0 : v.startsWith(u)) || ("production" !== process.env.NODE_ENV ? ge(!1, 'When overriding the location using `<Routes location>` or `useRoutes(routes, location)`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "' + u + '" but pathname "' + e.pathname + '" was given in the `location` prop.') : ge(!1)), f = e
        } else f = m;
        let g = f.pathname || "/",
            y = "/" === u ? g : g.slice(u.length) || "/",
            b = Ee(t, {
                pathname: y
            });
        "production" !== process.env.NODE_ENV && ("production" !== process.env.NODE_ENV && ye(c || null != b, 'No routes matched location "' + f.pathname + f.search + f.hash + '" '), "production" !== process.env.NODE_ENV && ye(null == b || void 0 !== b[b.length - 1].route.element || void 0 !== b[b.length - 1].route.Component, 'Matched leaf route at location "' + f.pathname + f.search + f.hash + '" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.'));
        let _ = function(t, n, r) {
            var i, a;
            void 0 === n && (n = []);
            void 0 === r && (r = null);
            if (null == t) {
                if (null == (a = r) || !a.errors) return null;
                t = r.matches
            }
            let o = t,
                l = null == (i = r) ? void 0 : i.errors;
            if (null != l) {
                let e = o.findIndex((e => e.route.id && (null == l ? void 0 : l[e.route.id])));
                e >= 0 || ("production" !== process.env.NODE_ENV ? ge(!1, "Could not find a matching route for errors on route IDs: " + Object.keys(l).join(",")) : ge(!1)), o = o.slice(0, Math.min(o.length, e + 1))
            }
            return o.reduceRight(((t, i, a) => {
                let s = i.route.id ? null == l ? void 0 : l[i.route.id] : null,
                    u = null;
                r && (u = i.route.errorElement || lt);
                let c = n.concat(o.slice(0, a + 1)),
                    d = () => {
                        let n;
                        return n = s ? u : i.route.Component ? react.createElement(i.route.Component, null) : i.route.element ? i.route.element : t, react.createElement(ut, {
                            match: i,
                            routeContext: {
                                outlet: t,
                                matches: c,
                                isDataRoute: null != r
                            },
                            children: n
                        })
                    };
                return r && (i.route.ErrorBoundary || i.route.errorElement || 0 === a) ? react.createElement(st, {
                    location: r.location,
                    revalidation: r.revalidation,
                    component: u,
                    error: s,
                    children: d(),
                    routeContext: {
                        outlet: null,
                        matches: c,
                        isDataRoute: !0
                    }
                }) : d()
            }), null)
        }(b && b.map((e => Object.assign({}, e, {
            params: Object.assign({}, l, e.params),
            pathname: je([u, i.encodeLocation ? i.encodeLocation(e.pathname).pathname : e.pathname]),
            pathnameBase: "/" === e.pathnameBase ? u : je([u, i.encodeLocation ? i.encodeLocation(e.pathnameBase).pathname : e.pathnameBase])
        }))), a, r);
        if (n && _) return react.createElement(Ye.Provider, {
            value: {
                location: Qe({
                    pathname: "/",
                    search: "",
                    hash: "",
                    state: null,
                    key: "default"
                }, f),
                navigationType: fe.Pop
            }
        }, _);
        return _
    }(t, n)
}

function ot() {
    let t = function() {
            var t;
            let n = react.useContext(Ze),
                r = function(t) {
                    let n = react.useContext($e);
                    return n || ("production" !== process.env.NODE_ENV ? ge(!1, pt(t)) : ge(!1)), n
                }(dt.UseRouteError),
                i = ht(dt.UseRouteError);
            if (n) return n;
            return null == (t = r.errors) ? void 0 : t[i]
        }(),
        n = function(e) {
            return null != e && "number" == typeof e.status && "string" == typeof e.statusText && "boolean" == typeof e.internal && "data" in e
        }(t) ? t.status + " " + t.statusText : t instanceof Error ? t.message : JSON.stringify(t),
        r = t instanceof Error ? t.stack : null,
        i = "rgba(200,200,200, 0.5)",
        a = {
            padding: "0.5rem",
            backgroundColor: i
        },
        o = {
            padding: "2px 4px",
            backgroundColor: i
        },
        l = null;
    return "production" !== process.env.NODE_ENV && (console.error("Error handled by React Router default ErrorBoundary:", t), l = react.createElement(react.Fragment, null, react.createElement("p", null, "💿 Hey developer 👋"), react.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", react.createElement("code", {
        style: o
    }, "ErrorBoundary"), " or", " ", react.createElement("code", {
        style: o
    }, "errorElement"), " prop on your route."))), react.createElement(react.Fragment, null, react.createElement("h2", null, "Unexpected Application Error!"), react.createElement("h3", {
        style: {
            fontStyle: "italic"
        }
    }, n), r ? react.createElement("pre", {
        style: a
    }, r) : null, l)
}
const lt = react.createElement(ot, null);
class st extends react.Component {
    constructor(e) {
        super(e), this.state = {
            location: e.location,
            revalidation: e.revalidation,
            error: e.error
        }
    }
    static getDerivedStateFromError(e) {
        return {
            error: e
        }
    }
    static getDerivedStateFromProps(e, t) {
        return t.location !== e.location || "idle" !== t.revalidation && "idle" === e.revalidation ? {
            error: e.error,
            location: e.location,
            revalidation: e.revalidation
        } : {
            error: e.error || t.error,
            location: t.location,
            revalidation: e.revalidation || t.revalidation
        }
    }
    componentDidCatch(e, t) {
        console.error("React Router caught the following error during render", e, t)
    }
    render() {
        return this.state.error ? react.createElement(Je.Provider, {
            value: this.props.routeContext
        }, react.createElement(Ze.Provider, {
            value: this.state.error,
            children: this.props.component
        })) : this.props.children
    }
}

function ut(t) {
    let {
        routeContext: n,
        match: r,
        children: i
    } = t, a = react.useContext(ze);
    return a && a.static && a.staticContext && (r.route.errorElement || r.route.ErrorBoundary) && (a.staticContext._deepestRenderedBoundaryId = r.route.id), react.createElement(Je.Provider, {
        value: n
    }, i)
}
var ct = function(e) {
        return e.UseBlocker = "useBlocker", e.UseRevalidator = "useRevalidator", e.UseNavigateStable = "useNavigate", e
    }(ct || {}),
    dt = function(e) {
        return e.UseBlocker = "useBlocker", e.UseLoaderData = "useLoaderData", e.UseActionData = "useActionData", e.UseRouteError = "useRouteError", e.UseNavigation = "useNavigation", e.UseRouteLoaderData = "useRouteLoaderData", e.UseMatches = "useMatches", e.UseRevalidator = "useRevalidator", e.UseNavigateStable = "useNavigate", e.UseRouteId = "useRouteId", e
    }(dt || {});

function pt(e) {
    return e + " must be used within a data router.  See https://reactrouter.com/routers/picking-a-router."
}

function ht(t) {
    let n = function(t) {
            let n = react.useContext(Je);
            return n || ("production" !== process.env.NODE_ENV ? ge(!1, pt(t)) : ge(!1)), n
        }(t),
        r = n.matches[n.matches.length - 1];
    return r.route.id || ("production" !== process.env.NODE_ENV ? ge(!1, t + ' can only be used on routes that contain a unique "id"') : ge(!1)), r.route.id
}
const ft = {};
const mt = react.startTransition;

function vt(t) {
    let {
        basename: n,
        children: r,
        initialEntries: i,
        initialIndex: a,
        future: o
    } = t, l = react.useRef();
    null == l.current && (l.current = createMemoryHistory({
        initialEntries: i,
        initialIndex: a,
        v5Compat: !0
    }));
    let s = l.current,
        [u, c] = react.useState({
            action: s.action,
            location: s.location
        }),
        {
            v7_startTransition: d
        } = o || {},
        p = react.useCallback((e => {
            d && mt ? mt((() => c(e))) : c(e)
        }), [c, d]);
    return react.useLayoutEffect((() => s.listen(p)), [s, p]), react.createElement(bt, {
        basename: n,
        children: r,
        location: u.location,
        navigationType: u.action,
        navigator: s
    })
}

function gt(t) {
    let {
        to: n,
        replace: r,
        state: i,
        relative: a
    } = t;
    Xe() || ("production" !== process.env.NODE_ENV ? ge(!1, "<Navigate> may be used only in the context of a <Router> component.") : ge(!1)), "production" !== process.env.NODE_ENV && ye(!react.useContext(Ke).static, "<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.");
    let {
        matches: o
    } = react.useContext(Je), {
        pathname: l
    } = et(), s = rt(), u = Ue(n, Me(o).map((e => e.pathnameBase)), l, "path" === a), c = JSON.stringify(u);
    return react.useEffect((() => s(JSON.parse(c), {
        replace: r,
        state: i,
        relative: a
    })), [s, c, a, r, i]), null
}

function yt(e) {
    "production" !== process.env.NODE_ENV ? ge(!1, "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.") : ge(!1)
}

function bt(t) {
    let {
        basename: n = "/",
        children: r = null,
        location: i,
        navigationType: a = fe.Pop,
        navigator: o,
        static: l = !1
    } = t;
    Xe() && ("production" !== process.env.NODE_ENV ? ge(!1, "You cannot render a <Router> inside another <Router>. You should never have more than one in your app.") : ge(!1));
    let s = n.replace(/^\/*/, "/"),
        u = react.useMemo((() => ({
            basename: s,
            navigator: o,
            static: l
        })), [s, o, l]);
    "string" == typeof i && (i = _e(i));
    let {
        pathname: c = "/",
        search: d = "",
        hash: p = "",
        state: h = null,
        key: f = "default"
    } = i, m = react.useMemo((() => {
        let e = Fe(c, s);
        return null == e ? null : {
            location: {
                pathname: e,
                search: d,
                hash: p,
                state: h,
                key: f
            },
            navigationType: a
        }
    }), [s, c, d, p, h, f, a]);
    return "production" !== process.env.NODE_ENV && ye(null != m, '<Router basename="' + s + '"> is not able to match the URL "' + c + d + p + "\" because it does not start with the basename, so the <Router> won't render anything."), null == m ? null : react.createElement(Ke.Provider, {
        value: u
    }, react.createElement(Ye.Provider, {
        children: r,
        value: m
    }))
}

function _t(e) {
    let {
        children: t,
        location: n
    } = e;
    return at(Et(t), n)
}

function Et(t, n) {
    void 0 === n && (n = []);
    let r = [];
    return react.Children.forEach(t, ((t, i) => {
        if (!react.isValidElement(t)) return;
        let a = [...n, i];
        if (t.type === react.Fragment) return void r.push.apply(r, Et(t.props.children, a));
        t.type !== yt && ("production" !== process.env.NODE_ENV ? ge(!1, "[" + ("string" == typeof t.type ? t.type : t.type.name) + "] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>") : ge(!1)), t.props.index && t.props.children && ("production" !== process.env.NODE_ENV ? ge(!1, "An index route cannot have child routes.") : ge(!1));
        let o = {
            id: t.props.id || a.join("-"),
            caseSensitive: t.props.caseSensitive,
            element: t.props.element,
            Component: t.props.Component,
            index: t.props.index,
            path: t.props.path,
            loader: t.props.loader,
            action: t.props.action,
            errorElement: t.props.errorElement,
            ErrorBoundary: t.props.ErrorBoundary,
            hasErrorBoundary: null != t.props.ErrorBoundary || null != t.props.errorElement,
            shouldRevalidate: t.props.shouldRevalidate,
            handle: t.props.handle,
            lazy: t.props.lazy
        };
        t.props.children && (o.children = Et(t.props.children, a)), r.push(o)
    })), r
}
new Promise((() => {}));
var wt = createContext({
    serviceName: ""
});

function Ct() {
    var e = useContext(wt);
    if (!e) throw new Error("useConfig must be used within a ConfigContext.Provider");
    return e
}

function St(e, t) {
    void 0 === t && (t = {});
    var n = t.insertAt;
    if (e && "undefined" != typeof document) {
        var r = document.head || document.getElementsByTagName("head")[0],
            i = document.createElement("style");
        i.type = "text/css", "top" === n && r.firstChild ? r.insertBefore(i, r.firstChild) : r.appendChild(i), i.styleSheet ? i.styleSheet.cssText = e : i.appendChild(document.createTextNode(e))
    }
}
var kt = "home_page_tabHeader__-s33m";

function Ot() {
    return Ot = Object.assign ? Object.assign.bind() : function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
        }
        return e
    }, Ot.apply(this, arguments)
}

function xt(e, t, {
    checkForDefaultPrevented: n = !0
} = {}) {
    return function(r) {
        if (null == e || e(r), !1 === n || !r.defaultPrevented) return null == t ? void 0 : t(r)
    }
}

function Nt(e, t = []) {
    let o = [];
    const l = () => {
        const t = o.map((e => createContext(e)));
        return function(n) {
            const r = (null == n ? void 0 : n[e]) || t;
            return useMemo((() => ({
                [`__scope${e}`]: {
                    ...n,
                    [e]: r
                }
            })), [n, r])
        }
    };
    return l.scopeName = e, [function(t, l) {
        const s = createContext(l),
            u = o.length;

        function c(t) {
            const {
                scope: n,
                children: r,
                ...o
            } = t, l = (null == n ? void 0 : n[e][u]) || s, c = useMemo((() => o), Object.values(o));
            return createElement(l.Provider, {
                value: c
            }, r)
        }
        return o = [...o, l], c.displayName = t + "Provider", [c, function(n, i) {
            const a = (null == i ? void 0 : i[e][u]) || s,
                o = useContext(a);
            if (o) return o;
            if (void 0 !== l) return l;
            throw new Error(`\`${n}\` must be used within \`${t}\``)
        }]
    }, Pt(l, ...t)]
}

function Pt(...e) {
    const t = e[0];
    if (1 === e.length) return t;
    const n = () => {
        const n = e.map((e => ({
            useScope: e(),
            scopeName: e.scopeName
        })));
        return function(e) {
            const r = n.reduce(((t, {
                useScope: n,
                scopeName: r
            }) => ({
                ...t,
                ...n(e)[`__scope${r}`]
            })), {});
            return useMemo((() => ({
                [`__scope${t.scopeName}`]: r
            })), [r])
        }
    };
    return n.scopeName = t.scopeName, n
}

function Tt(...e) {
    return t => e.forEach((e => function(e, t) {
        "function" == typeof e ? e(t) : null != e && (e.current = t)
    }(e, t)))
}

function It(...e) {
    return useCallback(Tt(...e), e)
}
St('.home_page_tabHeader__-s33m div[role="tablist"] {\n  display: block;\n  overflow: hidden;\n}\n\n.home_page_exitButtonContainer__APO4e {\n  display: flex;\n  flex-direction: column;\n}\n');
const Rt = forwardRef(((e, t) => {
    const {
        children: n,
        ...r
    } = e, i = Children.toArray(n), o = i.find(Ft);
    if (o) {
        const e = o.props.children,
            n = i.map((t => t === o ? Children.count(e) > 1 ? Children.only(null) : isValidElement(e) ? e.props.children : null : t));
        return createElement(At, Ot({}, r, {
            ref: t
        }), isValidElement(e) ? cloneElement(e, void 0, n) : null)
    }
    return createElement(At, Ot({}, r, {
        ref: t
    }), n)
}));
Rt.displayName = "Slot";
const At = forwardRef(((e, t) => {
    const {
        children: n,
        ...r
    } = e;
    return isValidElement(n) ? cloneElement(n, {
        ...Lt(r, n.props),
        ref: t ? Tt(t, n.ref) : n.ref
    }) : Children.count(n) > 1 ? Children.only(null) : null
}));
At.displayName = "SlotClone";
const Dt = ({
                children: e
            }) => createElement(Fragment, null, e);

function Ft(e) {
    return isValidElement(e) && e.type === Dt
}

function Lt(e, t) {
    const n = {
        ...t
    };
    for (const r in t) {
        const i = e[r],
            a = t[r];
        /^on[A-Z]/.test(r) ? i && a ? n[r] = (...e) => {
            a(...e), i(...e)
        } : i && (n[r] = i) : "style" === r ? n[r] = {
            ...i,
            ...a
        } : "className" === r && (n[r] = [i, a].filter(Boolean).join(" "))
    }
    return {
        ...e,
        ...n
    }
}
const Mt = Boolean(null === globalThis || void 0 === globalThis ? void 0 : globalThis.document) ? useLayoutEffect : () => {},
    Ut = react["useId".toString()] || (() => {});
let jt = 0;

function qt(t) {
    const [n, r] = react.useState(Ut());
    return Mt((() => {
        t || r((e => null != e ? e : String(jt++)))
    }), [t]), t || (n ? `radix-${n}` : "")
}
const Bt = ["a", "button", "div", "form", "h2", "h3", "img", "input", "label", "li", "nav", "ol", "p", "span", "svg", "ul"].reduce(((e, t) => {
    const n = forwardRef(((e, n) => {
        const {
            asChild: r,
            ...i
        } = e, o = r ? Rt : t;
        return useEffect((() => {
            window[Symbol.for("radix-ui")] = !0
        }), []), createElement(o, Ot({}, i, {
            ref: n
        }))
    }));
    return n.displayName = `Primitive.${t}`, {
        ...e,
        [t]: n
    }
}), {});

function Vt(e) {
    const t = userRef(e);
    return useEffect((() => {
        t.current = e
    })), useMemo((() => (...e) => {
        var n;
        return null === (n = t.current) || void 0 === n ? void 0 : n.call(t, ...e)
    }), [])
}

function Wt({
                prop: e,
                defaultProp: t,
                onChange: n = (() => {})
            }) {
    const [r, i] = function({
                                defaultProp: e,
                                onChange: t
                            }) {
        const n = useState(e),
            [r] = n,
            i = userRef(r),
            a = Vt(t);
        return useEffect((() => {
            i.current !== r && (a(r), i.current = r)
        }), [r, i, a]), n
    }({
        defaultProp: t,
        onChange: n
    }), a = void 0 !== e, l = a ? e : r, s = Vt(n);
    return [l, useCallback((t => {
        if (a) {
            const n = "function" == typeof t ? t(e) : t;
            n !== e && s(n)
        } else i(t)
    }), [a, e, i, s])]
}
const Ht = createContext(void 0);

function Qt(e) {
    const t = useContext(Ht);
    return e || t || "ltr"
}
const zt = "rovingFocusGroup.onEntryFocus",
    $t = {
        bubbles: !1,
        cancelable: !0
    },
    Gt = "RovingFocusGroup",
    [Kt, Yt, Jt] = function(e) {
        const n = e + "CollectionProvider",
            [r, i] = Nt(n),
            [a, o] = r(n, {
                collectionRef: {
                    current: null
                },
                itemMap: new Map
            }),
            l = e + "CollectionSlot",
            s = e + "CollectionItemSlot",
            u = "data-radix-collection-item";
        return [{
            Provider: e => {
                const {
                    scope: n,
                    children: r
                } = e, i = t.useRef(null), o = t.useRef(new Map).current;
                return t.createElement(a, {
                    scope: n,
                    itemMap: o,
                    collectionRef: i
                }, r)
            },
            Slot: t.forwardRef(((e, n) => {
                const {
                    scope: r,
                    children: i
                } = e, a = It(n, o(l, r).collectionRef);
                return t.createElement(Rt, {
                    ref: a
                }, i)
            })),
            ItemSlot: t.forwardRef(((e, n) => {
                const {
                    scope: r,
                    children: i,
                    ...a
                } = e, l = t.useRef(null), c = It(n, l), d = o(s, r);
                return t.useEffect((() => (d.itemMap.set(l, {
                    ref: l,
                    ...a
                }), () => {
                    d.itemMap.delete(l)
                }))), t.createElement(Rt, {
                    [u]: "",
                    ref: c
                }, i)
            }))
        }, function(n) {
            const r = o(e + "CollectionConsumer", n),
                i = t.useCallback((() => {
                    const e = r.collectionRef.current;
                    if (!e) return [];
                    const t = Array.from(e.querySelectorAll(`[${u}]`)),
                        n = Array.from(r.itemMap.values()).sort(((e, n) => t.indexOf(e.ref.current) - t.indexOf(n.ref.current)));
                    return n
                }), [r.collectionRef, r.itemMap]);
            return i
        }, i]
    }(Gt),
    [Zt, Xt] = Nt(Gt, [Jt]),
    [en, tn] = Zt(Gt),
    nn = forwardRef(((e, t) => createElement(Kt.Provider, {
        scope: e.__scopeRovingFocusGroup
    }, createElement(Kt.Slot, {
        scope: e.__scopeRovingFocusGroup
    }, createElement(rn, Ot({}, e, {
        ref: t
    })))))),
    rn = forwardRef(((e, t) => {
        const {
            __scopeRovingFocusGroup: n,
            orientation: r,
            loop: i = !1,
            dir: l,
            currentTabStopId: s,
            defaultCurrentTabStopId: u,
            onCurrentTabStopIdChange: c,
            onEntryFocus: d,
            ...p
        } = e, v = userRef(null), g = It(t, v), y = Qt(l), [b = null, _] = Wt({
            prop: s,
            defaultProp: u,
            onChange: c
        }), [E, w] = useState(!1), C = Vt(d), S = Yt(n), k = userRef(!1), [O, x] = useState(0);
        return useEffect((() => {
            const e = v.current;
            if (e) return e.addEventListener(zt, C), () => e.removeEventListener(zt, C)
        }), [C]), createElement(en, {
            scope: n,
            orientation: r,
            dir: y,
            loop: i,
            currentTabStopId: b,
            onItemFocus: useCallback((e => _(e)), [_]),
            onItemShiftTab: useCallback((() => w(!0)), []),
            onFocusableItemAdd: useCallback((() => x((e => e + 1))), []),
            onFocusableItemRemove: useCallback((() => x((e => e - 1))), [])
        }, createElement(Bt.div, Ot({
            tabIndex: E || 0 === O ? -1 : 0,
            "data-orientation": r
        }, p, {
            ref: g,
            style: {
                outline: "none",
                ...e.style
            },
            onMouseDown: xt(e.onMouseDown, (() => {
                k.current = !0
            })),
            onFocus: xt(e.onFocus, (e => {
                const t = !k.current;
                if (e.target === e.currentTarget && t && !E) {
                    const t = new CustomEvent(zt, $t);
                    if (e.currentTarget.dispatchEvent(t), !t.defaultPrevented) {
                        const e = S().filter((e => e.focusable));
                        ln([e.find((e => e.active)), e.find((e => e.id === b)), ...e].filter(Boolean).map((e => e.ref.current)))
                    }
                }
                k.current = !1
            })),
            onBlur: xt(e.onBlur, (() => w(!1)))
        })))
    })),
    an = forwardRef(((e, t) => {
        const {
            __scopeRovingFocusGroup: n,
            focusable: r = !0,
            active: i = !1,
            tabStopId: o,
            ...l
        } = e, s = qt(), u = o || s, c = tn("RovingFocusGroupItem", n), d = c.currentTabStopId === u, p = Yt(n), {
            onFocusableItemAdd: f,
            onFocusableItemRemove: m
        } = c;
        return useEffect((() => {
            if (r) return f(), () => m()
        }), [r, f, m]), createElement(Kt.ItemSlot, {
            scope: n,
            id: u,
            focusable: r,
            active: i
        }, createElement(Bt.span, Ot({
            tabIndex: d ? 0 : -1,
            "data-orientation": c.orientation
        }, l, {
            ref: t,
            onMouseDown: xt(e.onMouseDown, (e => {
                r ? c.onItemFocus(u) : e.preventDefault()
            })),
            onFocus: xt(e.onFocus, (() => c.onItemFocus(u))),
            onKeyDown: xt(e.onKeyDown, (e => {
                if ("Tab" === e.key && e.shiftKey) return void c.onItemShiftTab();
                if (e.target !== e.currentTarget) return;
                const t = function(e, t, n) {
                    const r = function(e, t) {
                        return "rtl" !== t ? e : "ArrowLeft" === e ? "ArrowRight" : "ArrowRight" === e ? "ArrowLeft" : e
                    }(e.key, n);
                    return "vertical" === t && ["ArrowLeft", "ArrowRight"].includes(r) || "horizontal" === t && ["ArrowUp", "ArrowDown"].includes(r) ? void 0 : on[r]
                }(e, c.orientation, c.dir);
                if (void 0 !== t) {
                    e.preventDefault();
                    let i = p().filter((e => e.focusable)).map((e => e.ref.current));
                    if ("last" === t) i.reverse();
                    else if ("prev" === t || "next" === t) {
                        "prev" === t && i.reverse();
                        const a = i.indexOf(e.currentTarget);
                        i = c.loop ? (r = a + 1, (n = i).map(((e, t) => n[(r + t) % n.length]))) : i.slice(a + 1)
                    }
                    setTimeout((() => ln(i)))
                }
                var n, r
            }))
        })))
    })),
    on = {
        ArrowLeft: "prev",
        ArrowUp: "prev",
        ArrowRight: "next",
        ArrowDown: "next",
        PageUp: "first",
        Home: "first",
        PageDown: "last",
        End: "last"
    };

function ln(e) {
    const t = document.activeElement;
    for (const n of e) {
        if (n === t) return;
        if (n.focus(), document.activeElement !== t) return
    }
}
const sn = nn,
    un = an;
const cn = e => {
    const {
        present: t,
        children: n
    } = e, r = function(e) {
        const [t, n] = useState(), r = userRef({}), i = userRef(e), a = userRef("none"), l = e ? "mounted" : "unmounted", [s, u] = function(e, t) {
            return useReducer(((e, n) => {
                const r = t[e][n];
                return null != r ? r : e
            }), e)
        }(l, {
            mounted: {
                UNMOUNT: "unmounted",
                ANIMATION_OUT: "unmountSuspended"
            },
            unmountSuspended: {
                MOUNT: "mounted",
                ANIMATION_END: "unmounted"
            },
            unmounted: {
                MOUNT: "mounted"
            }
        });
        return useEffect((() => {
            const e = dn(r.current);
            a.current = "mounted" === s ? e : "none"
        }), [s]), Mt((() => {
            const t = r.current,
                n = i.current;
            if (n !== e) {
                const r = a.current,
                    o = dn(t);
                if (e) u("MOUNT");
                else if ("none" === o || "none" === (null == t ? void 0 : t.display)) u("UNMOUNT");
                else {
                    u(n && r !== o ? "ANIMATION_OUT" : "UNMOUNT")
                }
                i.current = e
            }
        }), [e, u]), Mt((() => {
            if (t) {
                const e = e => {
                        const n = dn(r.current).includes(e.animationName);
                        e.target === t && n && ce((() => u("ANIMATION_END")))
                    },
                    n = e => {
                        e.target === t && (a.current = dn(r.current))
                    };
                return t.addEventListener("animationstart", n), t.addEventListener("animationcancel", e), t.addEventListener("animationend", e), () => {
                    t.removeEventListener("animationstart", n), t.removeEventListener("animationcancel", e), t.removeEventListener("animationend", e)
                }
            }
            u("ANIMATION_END")
        }), [t, u]), {
            isPresent: ["mounted", "unmountSuspended"].includes(s),
            ref: useCallback((e => {
                e && (r.current = getComputedStyle(e)), n(e)
            }), [])
        }
    }(t), i = "function" == typeof n ? n({
        present: r.isPresent
    }) : Children.only(n), a = It(r.ref, i.ref);
    return "function" == typeof n || r.isPresent ? cloneElement(i, {
        ref: a
    }) : null
};

function dn(e) {
    return (null == e ? void 0 : e.animationName) || "none"
}
cn.displayName = "Presence";
const pn = "Tabs",
    [hn, fn] = Nt(pn, [Xt]),
    mn = Xt(),
    [vn, gn] = hn(pn);

function yn(e, t) {
    return `${e}-trigger-${t}`
}

function bn(e, t) {
    return `${e}-content-${t}`
}
const _n = forwardRef(((e, t) => {
        const {
            __scopeTabs: n,
            value: r,
            onValueChange: i,
            defaultValue: o,
            orientation: l = "horizontal",
            dir: s,
            activationMode: u = "automatic",
            ...c
        } = e, d = Qt(s), [p, h] = Wt({
            prop: r,
            onChange: i,
            defaultProp: o
        });
        return createElement(vn, {
            scope: n,
            baseId: qt(),
            value: p,
            onValueChange: h,
            orientation: l,
            dir: d,
            activationMode: u
        }, createElement(Bt.div, Ot({
            dir: d,
            "data-orientation": l
        }, c, {
            ref: t
        })))
    })),
    En = forwardRef(((e, t) => {
        const {
            __scopeTabs: n,
            loop: r = !0,
            ...i
        } = e, o = gn("TabsList", n), l = mn(n);
        return createElement(sn, Ot({
            asChild: !0
        }, l, {
            orientation: o.orientation,
            dir: o.dir,
            loop: r
        }), createElement(Bt.div, Ot({
            role: "tablist",
            "aria-orientation": o.orientation
        }, i, {
            ref: t
        })))
    })),
    wn = forwardRef(((e, t) => {
        const {
            __scopeTabs: n,
            value: r,
            disabled: i = !1,
            ...o
        } = e, l = gn("TabsTrigger", n), s = mn(n), u = yn(l.baseId, r), c = bn(l.baseId, r), d = r === l.value;
        return createElement(un, Ot({
            asChild: !0
        }, s, {
            focusable: !i,
            active: d
        }), createElement(Bt.button, Ot({
            type: "button",
            role: "tab",
            "aria-selected": d,
            "aria-controls": c,
            "data-state": d ? "active" : "inactive",
            "data-disabled": i ? "" : void 0,
            disabled: i,
            id: u
        }, o, {
            ref: t,
            onMouseDown: xt(e.onMouseDown, (e => {
                i || 0 !== e.button || !1 !== e.ctrlKey ? e.preventDefault() : l.onValueChange(r)
            })),
            onKeyDown: xt(e.onKeyDown, (e => {
                [" ", "Enter"].includes(e.key) && l.onValueChange(r)
            })),
            onFocus: xt(e.onFocus, (() => {
                const e = "manual" !== l.activationMode;
                d || i || !e || l.onValueChange(r)
            }))
        })))
    })),
    Cn = forwardRef(((e, t) => {
        const {
            __scopeTabs: n,
            value: r,
            forceMount: i,
            children: o,
            ...l
        } = e, s = gn("TabsContent", n), u = yn(s.baseId, r), c = bn(s.baseId, r), d = r === s.value, p = userRef(d);
        return useEffect((() => {
            const e = requestAnimationFrame((() => p.current = !1));
            return () => cancelAnimationFrame(e)
        }), []), createElement(cn, {
            present: i || d
        }, (({
                 present: n
             }) => createElement(Bt.div, Ot({
            "data-state": d ? "active" : "inactive",
            "data-orientation": s.orientation,
            role: "tabpanel",
            "aria-labelledby": u,
            hidden: !n,
            id: c,
            tabIndex: 0
        }, l, {
            ref: t,
            style: {
                ...e.style,
                animationDuration: p.current ? "0s" : void 0
            }
        }), n && o)))
    }));
var Sn = "tab_menu_tabsList__ufAjA",
    kn = "tab_menu_tabsTrigger__FNwC1";
St('.tab_menu_tabsList__ufAjA {\n  display: flex;\n  width: 100%;\n  justify-content: left;\n}\n\n.tab_menu_scrollTabMenuItem__HyZ33 {\n  display: flex;\n}\n\n.tab_menu_scrollTabMenuItemStretch__UJOsm {\n  flex-grow: 1;\n}\n\n.tab_menu_tabsTrigger__FNwC1 {\n  cursor: pointer;\n  background: none;\n  border: none;\n  padding: 0;\n  font: inherit;\n  outline: inherit;\n  padding: var(--ui-kit-space-1);\n  text-align: center;\n  border-bottom: 2px solid transparent;\n}\n\n.tab_menu_scrollTabMenuItemStretch__UJOsm .tab_menu_tabsTrigger__FNwC1 {\n  flex-grow: 1;\n}\n\n.tab_menu_tabsTrigger__FNwC1[data-state="active"] {\n  border-bottom: 2px solid var(--ui-kit-color-primary);\n}\n\n.tab_menu_tabsTrigger__FNwC1[data-state="active"] span {\n  color: var(--ui-kit-color-typography-primary) !important;\n}\n');
var On = function(e) {
        var n = e.children,
            r = e.defaultValue,
            i = e.tabValue,
            a = e.onValueChange,
            o = e.className;
        return t.createElement(_n, {
            defaultValue: r,
            value: i,
            onValueChange: a,
            className: o
        }, n)
    },
    xn = function(e) {
        var n = e.children;
        return t.createElement(En, {
            className: Sn,
            "aria-label": "Filter assets"
        }, t.createElement(Carousel, null, n))
    },
    Nn = function(e) {
        var n = e.children,
            r = e.value,
            i = void 0 === r ? n : r;
        return t.createElement(wn, {
            className: kn,
            value: i
        }, t.createElement(Text, {
            tone: "tertiary",
            tagName: "span",
            variant: "bold"
        }, n))
    },
    Pn = function(e) {
        var n = e.children,
            r = e.value;
        return t.createElement(Cn, {
            className: "TabsContent",
            value: r
        }, n)
    },
    Tn = function() {
        return Tn = Object.assign || function(e) {
            for (var t, n = 1, r = arguments.length; n < r; n++)
                for (var i in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            return e
        }, Tn.apply(this, arguments)
    };

function In(e, t) {
    var n = {};
    for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
    if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
        var i = 0;
        for (r = Object.getOwnPropertySymbols(e); i < r.length; i++) t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (n[r[i]] = e[r[i]])
    }
    return n
}

function Rn(e, t, n, r) {
    return new(n || (n = Promise))((function(i, a) {
        function o(e) {
            try {
                s(r.next(e))
            } catch (e) {
                a(e)
            }
        }

        function l(e) {
            try {
                s(r.throw(e))
            } catch (e) {
                a(e)
            }
        }

        function s(e) {
            var t;
            e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function(e) {
                e(t)
            }))).then(o, l)
        }
        s((r = r.apply(e, t || [])).next())
    }))
}

function An(e, t) {
    var n, r, i, a, o = {
        label: 0,
        sent: function() {
            if (1 & i[0]) throw i[1];
            return i[1]
        },
        trys: [],
        ops: []
    };
    return a = {
        next: l(0),
        throw: l(1),
        return: l(2)
    }, "function" == typeof Symbol && (a[Symbol.iterator] = function() {
        return this
    }), a;

    function l(l) {
        return function(s) {
            return function(l) {
                if (n) throw new TypeError("Generator is already executing.");
                for (; a && (a = 0, l[0] && (o = 0)), o;) try {
                    if (n = 1, r && (i = 2 & l[0] ? r.return : l[0] ? r.throw || ((i = r.return) && i.call(r), 0) : r.next) && !(i = i.call(r, l[1])).done) return i;
                    switch (r = 0, i && (l = [2 & l[0], i.value]), l[0]) {
                        case 0:
                        case 1:
                            i = l;
                            break;
                        case 4:
                            return o.label++, {
                                value: l[1],
                                done: !1
                            };
                        case 5:
                            o.label++, r = l[1], l = [0];
                            continue;
                        case 7:
                            l = o.ops.pop(), o.trys.pop();
                            continue;
                        default:
                            if (!(i = o.trys, (i = i.length > 0 && i[i.length - 1]) || 6 !== l[0] && 2 !== l[0])) {
                                o = 0;
                                continue
                            }
                            if (3 === l[0] && (!i || l[1] > i[0] && l[1] < i[3])) {
                                o.label = l[1];
                                break
                            }
                            if (6 === l[0] && o.label < i[1]) {
                                o.label = i[1], i = l;
                                break
                            }
                            if (i && o.label < i[2]) {
                                o.label = i[2], o.ops.push(l);
                                break
                            }
                            i[2] && o.ops.pop(), o.trys.pop();
                            continue
                    }
                    l = t.call(e, o)
                } catch (e) {
                    l = [6, e], r = 0
                } finally {
                    n = i = 0
                }
                if (5 & l[0]) throw l[1];
                return {
                    value: l[0] ? l[1] : void 0,
                    done: !0
                }
            }([l, s])
        }
    }
}

function Dn(e, t) {
    var n = "function" == typeof Symbol && e[Symbol.iterator];
    if (!n) return e;
    var r, i, a = n.call(e),
        o = [];
    try {
        for (;
            (void 0 === t || t-- > 0) && !(r = a.next()).done;) o.push(r.value)
    } catch (e) {
        i = {
            error: e
        }
    } finally {
        try {
            r && !r.done && (n = a.return) && n.call(a)
        } finally {
            if (i) throw i.error
        }
    }
    return o
}

function Fn(e, t, n) {
    if (n || 2 === arguments.length)
        for (var r, i = 0, a = t.length; i < a; i++) !r && i in t || (r || (r = Array.prototype.slice.call(t, 0, i)), r[i] = t[i]);
    return e.concat(r || Array.prototype.slice.call(t))
}
"function" == typeof SuppressedError && SuppressedError;
var Ln = function() {
        var e = et().state,
            t = rt();
        return function(n, r) {
            n.toString().toLowerCase().startsWith("/search") ? t(n, Tn(Tn({}, r), {
                state: Tn(Tn({}, e), null == r ? void 0 : r.state)
            })) : t(n, Tn(Tn({}, r), {
                state: Tn(Tn(Tn({}, e), null == r ? void 0 : r.state), {
                    query: void 0,
                    filters: void 0
                })
            }))
        }
    },
    Mn = function() {
        return "Search"
    },
    Un = "search_filterButton__KC0K2",
    jn = "search_filterButtonPlaceholder__kq7LS";
St(".search_filterButton__KC0K2 span {\n  top: var(--ui-kit-space-050) !important;\n  right: 0 !important;\n}\n\n.search_filterButtonPlaceholder__kq7LS {\n  width: calc(var(--ui-kit-base-unit) * 4);\n  height: calc(var(--ui-kit-base-unit) * 4);\n  padding: var(--ui-kit-space-050);\n}\n");
var qn = "search_suggestion_wrapper__IBbH-",
    Bn = "search_suggestion_searchRow__3Zruh",
    Vn = "search_suggestion_clickOffElement__17b1F",
    Wn = "search_suggestion_menuDivider__t-FLC";

function Hn(e) {
    var n = e.children,
        r = e.onClick;
    return t.createElement("div", {
        role: "button",
        className: Bn,
        tabIndex: 0,
        onClick: r
    }, n)
}

function Qn(e) {
    var n = e.text;
    return t.createElement("div", {
        className: Wn
    }, t.createElement(Text, {
        size: "small",
        variant: "bold"
    }, n))
}
St(".search_suggestion_wrapper__IBbH- {\n  position: absolute;\n  top: calc(var(--ui-kit-base-unit) * 5);\n  z-index: 11;\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  row-gap: var(--ui-kit-space-1);\n  border: 1px solid var(--ui-kit-color-border-low);\n  border-top: none;\n  background-color: var(--ui-kit-color-surface);\n  border-radius: 0 0 var(--ui-kit-border-radius) var(--ui-kit-border-radius);\n  padding: calc(var(--ui-kit-space-1) * 0.75) 0\n    calc(var(--ui-kit-space-1) * 1.5) 0;\n}\n\n.search_suggestion_searchRow__3Zruh {\n  display: flex;\n  gap: var(--ui-kit-space-1);\n  padding: var(--ui-kit-space-1) var(--ui-kit-space-2);\n  transition: background-color 0.1s;\n}\n\n.search_suggestion_searchRow__3Zruh:hover {\n  background-color: var(--ui-kit-color-secondary-hover);\n  cursor: pointer;\n  transition: background-color 0.1s;\n}\n\n.search_suggestion_clickOffElement__17b1F {\n  background-color: var(--ui-kit-color-surface);\n  opacity: 0.3;\n  height: 100vh;\n  width: 100%;\n  position: absolute;\n  z-index: 10;\n}\n\n.search_suggestion_menuDivider__t-FLC {\n  padding-left: var(--ui-kit-space-2);\n  padding-right: var(--ui-kit-space-2);\n  padding-top: calc(var(--ui-kit-base-unit) * 1.5);\n}\n");
var zn = function(e) {
        var n = e.searchQuery,
            r = e.onSubmit,
            i = e.onCancel;
        return t.createElement(t.Fragment, null, t.createElement("div", {
            role: "dialog",
            className: qn
        }, t.createElement(Qn, {
            text: "Suggested"
        }), t.createElement(Hn, {
            onClick: function() {
                return r()
            }
        }, t.createElement(SearchIcon, null), t.createElement(Text, null, "Search for ", t.createElement("strong", null, n)))), t.createElement("div", {
            className: Vn,
            onClick: function() {
                return i()
            }
        }))
    },
    $n = "temp_filter_popover_popoverContainer__80hjV",
    Gn = "temp_filter_popover_popoverOverlayMobile__ZY4wi",
    Kn = "temp_filter_popover_popoverOverlay__plleM";
St(".temp_filter_popover_popoverContainer__80hjV {\n  background: var(--ui-kit-color-surface);\n  border-radius: var(--ui-kit-border-radius);\n  cursor: default;\n  z-index: 9999;\n  padding-bottom: 0;\n  display: flex;\n  flex-direction: column;\n  padding-bottom: 2px;\n}\n\n.temp_filter_popover_popoverOverlayMobile__ZY4wi {\n  background-color: var(--ui-kit-color-surface);\n  opacity: 0.6;\n  height: 100vh;\n  width: 100vw;\n  left: 0;\n  top: 0;\n  position: fixed;\n  z-index: 10;\n}\n\n.temp_filter_popover_popoverOverlay__plleM {\n  background-color: var(--ui-kit-color-surface);\n  opacity: 0.3;\n  height: 100vh;\n  width: 100%;\n  position: absolute;\n  z-index: 10;\n}\n");
var Yn = 767,
    Jn = "undefined" != typeof window ? window : void 0,
    Zn = "undefined" != typeof navigator ? navigator : void 0;

function Xn() {
    return "PORTRAIT" == ((e = function(e, t) {
        if (void 0 === e && (e = Jn), void 0 === t && (t = Zn), !e || !t) return {
            width: 0,
            height: 0
        };
        if (null != t && t.userAgent.match(/iphone|ipad/gi)) {
            var n = e;
            if (90 === n.orientation || -90 === n.orientation) return {
                width: e.screen.height,
                height: e.screen.width
            }
        }
        return e.screen
    }()).width > Yn || e.width > e.height ? "LANDSCAPE" : "PORTRAIT");
    var e
}
var er = function(e) {
        var n, r, i, a, o, l, s = e.open,
            u = e.searchboxReference,
            c = e.children,
            d = e.onClose;
        return s ? t.createElement(t.Fragment, null, t.createElement("div", {
            className: $n,
            style: Xn() ? {
                position: "fixed",
                bottom: 0,
                left: 0,
                width: "100vw",
                maxHeight: "80vh"
            } : {
                position: "fixed",
                top: "".concat(((null === (r = null === (n = u.current) || void 0 === n ? void 0 : n.getBoundingClientRect()) || void 0 === r ? void 0 : r.bottom) || 0) + 6, "px"),
                left: "".concat((null === (a = null === (i = u.current) || void 0 === i ? void 0 : i.getBoundingClientRect()) || void 0 === a ? void 0 : a.left) || 0, "px"),
                width: "".concat((null === (l = null === (o = u.current) || void 0 === o ? void 0 : o.getBoundingClientRect()) || void 0 === l ? void 0 : l.width) || 0, "px"),
                maxHeight: "".concat(.8 * (document.body.getBoundingClientRect().height - 100), "px")
            }
        }, c), t.createElement("div", {
            className: Xn() ? Gn : Kn,
            onClick: function() {
                return d()
            }
        })) : null
    },
    tr = "pill_filter_pillsContainer__J-PIb",
    nr = "pill_filter_pillPlaceholder__z5ZRK",
    rr = "pill_filter_viewMore__IeAUR";
St(".pill_filter_pillsContainer__J-PIb {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: left;\n  gap: var(--ui-kit-space-1) var(--ui-kit-space-1);\n}\n\n.pill_filter_pillPlaceholder__z5ZRK {\n  height: calc(var(--ui-kit-base-unit) * 3);\n  width: calc(var(--ui-kit-base-unit) * 6);\n}\n\n.pill_filter_viewMore__IeAUR svg {\n  height: var(--ui-kit-space-2);\n  width: var(--ui-kit-space-2);\n}\n\n.pill_filter_viewMore__IeAUR span {\n  height: var(--ui-kit-space-2) !important;\n  width: var(--ui-kit-space-2) !important;\n}\n\n.pill_filter_viewMore__IeAUR {\n  display: flex;\n  align-items: center;\n  cursor: pointer;\n  padding: var(--ui-kit-space-1);\n  border-radius: var(--ui-kit-space-050);\n  width: fit-content;\n  gap: var(--ui-kit-space-050);\n}\n\n.pill_filter_viewMore__IeAUR:hover {\n  background: var(--ui-kit-color-neutral);\n}\n");
var ir, ar = function(e) {
    var n = e.query,
        r = e.onQueryChange,
        i = e.disabled,
        a = e.placeholder,
        o = function() {
            r("")
        };
    return t.createElement(TextInput, {
        start: function() {
            return t.createElement(Box, {
                paddingStart: "0.5u"
            }, t.createElement(SearchIcon, null))
        },
        placeholder: a || Mn(),
        disabled: i,
        value: n,
        onChange: function(e) {
            return r(e)
        },
        onKeyDown: function(e) {
            return e.stopPropagation()
        },
        end: function() {
            return t.createElement(ClearDecorator, {
                onClear: o
            })
        }
    })
};

function or(e) {
    return e.dynamicOptions && (!e.status || "loading" === e.status)
}

function lr(e) {
    return e.dynamicOptions && "error" === e.status
}! function(e) {
    e.ALL = "all", e.CUSTOM = "custom"
}(ir || (ir = {}));
var sr = function(e) {
    var n, r = e.filterConfig,
        i = e.filterValue,
        a = e.setFilterValue,
        o = Dn(useState([]), 2),
        l = o[0],
        s = o[1],
        u = Dn(useState(!1), 2),
        c = u[0],
        d = u[1],
        p = Dn(useState([]), 2),
        f = p[0],
        v = p[1],
        g = Dn(useState(""), 2),
        y = g[0],
        _ = g[1];
    useEffect((function() {
        var e;
        (null === (e = r.options) || void 0 === e ? void 0 : e.length) && (s(r.options), _(""), d(!1), v(ur(r.options, !1, 5)))
    }), [r]);
    if (lr(r)) return null;
    if (or(r)) return t.createElement(FormField, {
        label: r.label,
        control: function() {
            return t.createElement(Columns, {
                spacing: "1u"
            }, Array(5).fill(0).map((function(e, n) {
                return t.createElement(Column, {
                    key: n,
                    width: "1/5"
                }, t.createElement("div", {
                    className: nr
                }, t.createElement(PlaceHolder, {
                    shape: "sharpRectangle"
                })))
            })))
        }
    });
    if (!(null === (n = r.options) || void 0 === n ? void 0 : n.length)) return null;
    var E = r.options;
    return t.createElement(FormField, {
        label: r.label,
        control: function() {
            return t.createElement("div", {
                className: tr
            }, null == f ? void 0 : f.map((function(e, n) {
                var r = null == i ? void 0 : i.some((function(t) {
                    return t === e.value
                }));
                return t.createElement(Pill, {
                    text: e.label,
                    selected: r,
                    key: n,
                    onClick: function() {
                        a(r ? (i || []).filter((function(t) {
                            return t !== e.value
                        })) : Fn(Fn([], Dn(i || []), !1), [e.value], !1))
                    }
                })
            })), (null == l ? void 0 : l.length) > 5 && t.createElement("div", {
                className: rr,
                onClick: function() {
                    return function(e) {
                        v(ur(l, !e, 5)), d(!e)
                    }(c)
                }
            }, !c && t.createElement(t.Fragment, null, t.createElement(PlusIcon, null), t.createElement(Text, {
                size: "small",
                tone: "primary"
            }, "View More")), c && t.createElement(t.Fragment, null, t.createElement(MinusIcon, null), t.createElement(Text, {
                size: "small",
                tone: "primary"
            }, "View Less"))), E && E.length > 5 && t.createElement(ar, {
                query: y,
                onQueryChange: function(e) {
                    _(e);
                    var t = E.filter((function(t) {
                        return t.label.toLowerCase().includes(e.toLowerCase())
                    }));
                    s(t), v(ur(t, c, 5))
                },
                placeholder: "Search ".concat(r.label.toLowerCase())
            }))
        }
    })
};

function ur(e, t, n) {
    return function(e, t, n) {
        return n && (null == e ? void 0 : e.length) > n && !t
    }(e, t, n) ? e.slice(0, n) : e
}
var cr = "filter_form_buttonArea__tk-S1",
    dr = "filter_form_mobileButtonArea__8zBKs",
    pr = "filter_form_scrollArea__ochgo";
St(".filter_form_buttonArea__tk-S1 {\n  background-color: var(--ui-kit-color-surface);\n  padding: var(--ui-kit-space-2);\n  border: var(--ui-kit-color-border) 1px solid;\n  border-radius: 0 0 var(--ui-kit-border-radius) var(--ui-kit-border-radius);\n}\n\n.filter_form_buttonArea__tk-S1.filter_form_mobileButtonArea__8zBKs {\n  border-radius: 0;\n  border-bottom: 0;\n}\n\n.filter_form_scrollArea__ochgo {\n  border: var(--ui-kit-color-border) 1px solid;\n  border-bottom: 0;\n  border-radius: var(--ui-kit-border-radius) var(--ui-kit-border-radius) 0 0;\n  box-sizing: border-box;\n  flex-grow: 1;\n  overflow-y: scroll;\n  height: 100%;\n  padding: var(--ui-kit-space-3) var(--ui-kit-space-2);\n\n  /* for firefox */\n  scrollbar-width: thin;\n  scrollbar-color: var(--ui-kit-color-typography-quaternary) transparent;\n}\n");
var hr = Object.defineProperty,
    fr = (e, t, n) => (((e, t, n) => {
        t in e ? hr(e, t, {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: n
        }) : e[t] = n
    })(e, "symbol" != typeof t ? t + "" : t, n), n);
let mr = new class {
        constructor() {
            fr(this, "current", this.detect()), fr(this, "handoffState", "pending"), fr(this, "currentId", 0)
        }
        set(e) {
            this.current !== e && (this.handoffState = "pending", this.currentId = 0, this.current = e)
        }
        reset() {
            this.set(this.detect())
        }
        nextId() {
            return ++this.currentId
        }
        get isServer() {
            return "server" === this.current
        }
        get isClient() {
            return "client" === this.current
        }
        detect() {
            return "undefined" == typeof window || "undefined" == typeof document ? "server" : "client"
        }
        handoff() {
            "pending" === this.handoffState && (this.handoffState = "complete")
        }
        get isHandoffComplete() {
            return "complete" === this.handoffState
        }
    },
    vr = (e, t) => {
        mr.isServer ? useEffect(e, t) : useLayoutEffect(e, t)
    };

function gr(e) {
    let t = userRef(e);
    return vr((() => {
        t.current = e
    }), [e]), t
}
let yr = function(e) {
    let n = gr(e);
    return t.useCallback(((...e) => n.current(...e)), [n])
};

function br() {
    let t = function() {
            let t = "undefined" == typeof document;
            return "useSyncExternalStore" in react && react.useSyncExternalStore((() => () => {}), (() => !1), (() => !t))
        }(),
        [n, r] = react.useState(mr.isHandoffComplete);
    return n && !1 === mr.isHandoffComplete && r(!1), react.useEffect((() => {
        !0 !== n && r(!0)
    }), [n]), react.useEffect((() => mr.handoff()), []), !t && n
}
var _r;
let Er = null != (_r = t.useId) ? _r : function() {
    let e = br(),
        [n, r] = t.useState(e ? () => mr.nextId() : null);
    return vr((() => {
        null === n && r(mr.nextId())
    }), [n]), null != n ? "" + n : void 0
};

function wr(e, t, ...n) {
    if (e in t) {
        let r = t[e];
        return "function" == typeof r ? r(...n) : r
    }
    let r = new Error(`Tried to handle "${e}" but there is no handler defined. Only defined handlers are: ${Object.keys(t).map((e => `"${e}"`)).join(", ")}.`);
    throw Error.captureStackTrace && Error.captureStackTrace(r, wr), r
}

function Cr(e) {
    return mr.isServer ? null : e instanceof Node ? e.ownerDocument : null != e && e.hasOwnProperty("current") && e.current instanceof Node ? e.current.ownerDocument : document
}
let Sr = ["[contentEditable=true]", "[tabindex]", "a[href]", "area[href]", "button:not([disabled])", "iframe", "input:not([disabled])", "select:not([disabled])", "textarea:not([disabled])"].map((e => `${e}:not([tabindex='-1'])`)).join(",");
var kr = (e => (e[e.First = 1] = "First", e[e.Previous = 2] = "Previous", e[e.Next = 4] = "Next", e[e.Last = 8] = "Last", e[e.WrapAround = 16] = "WrapAround", e[e.NoScroll = 32] = "NoScroll", e))(kr || {}),
    Or = (e => (e[e.Error = 0] = "Error", e[e.Overflow = 1] = "Overflow", e[e.Success = 2] = "Success", e[e.Underflow = 3] = "Underflow", e))(Or || {}),
    xr = (e => (e[e.Previous = -1] = "Previous", e[e.Next = 1] = "Next", e))(xr || {});

function Nr(e = document.body) {
    return null == e ? [] : Array.from(e.querySelectorAll(Sr)).sort(((e, t) => Math.sign((e.tabIndex || Number.MAX_SAFE_INTEGER) - (t.tabIndex || Number.MAX_SAFE_INTEGER))))
}
var Pr = (e => (e[e.Strict = 0] = "Strict", e[e.Loose = 1] = "Loose", e))(Pr || {});

function Tr(e, t = 0) {
    var n;
    return e !== (null == (n = Cr(e)) ? void 0 : n.body) && wr(t, {
        0: () => e.matches(Sr),
        1() {
            let t = e;
            for (; null !== t;) {
                if (t.matches(Sr)) return !0;
                t = t.parentElement
            }
            return !1
        }
    })
}
var Ir = (e => (e[e.Keyboard = 0] = "Keyboard", e[e.Mouse = 1] = "Mouse", e))(Ir || {});
"undefined" != typeof window && "undefined" != typeof document && (document.addEventListener("keydown", (e => {
    e.metaKey || e.altKey || e.ctrlKey || (document.documentElement.dataset.headlessuiFocusVisible = "")
}), !0), document.addEventListener("click", (e => {
    1 === e.detail ? delete document.documentElement.dataset.headlessuiFocusVisible : 0 === e.detail && (document.documentElement.dataset.headlessuiFocusVisible = "")
}), !0));
let Rr = ["textarea", "input"].join(",");

function Ar(e, t, {
    sorted: n = !0,
    relativeTo: r = null,
    skipElements: i = []
} = {}) {
    let a = Array.isArray(e) ? e.length > 0 ? e[0].ownerDocument : document : e.ownerDocument,
        o = Array.isArray(e) ? n ? function(e, t = (e => e)) {
            return e.slice().sort(((e, n) => {
                let r = t(e),
                    i = t(n);
                if (null === r || null === i) return 0;
                let a = r.compareDocumentPosition(i);
                return a & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : a & Node.DOCUMENT_POSITION_PRECEDING ? 1 : 0
            }))
        }(e) : e : Nr(e);
    i.length > 0 && o.length > 1 && (o = o.filter((e => !i.includes(e)))), r = null != r ? r : a.activeElement;
    let l, s = (() => {
            if (5 & t) return 1;
            if (10 & t) return -1;
            throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last")
        })(),
        u = (() => {
            if (1 & t) return 0;
            if (2 & t) return Math.max(0, o.indexOf(r)) - 1;
            if (4 & t) return Math.max(0, o.indexOf(r)) + 1;
            if (8 & t) return o.length - 1;
            throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last")
        })(),
        c = 32 & t ? {
            preventScroll: !0
        } : {},
        d = 0,
        p = o.length;
    do {
        if (d >= p || d + p <= 0) return 0;
        let e = u + d;
        if (16 & t) e = (e + p) % p;
        else {
            if (e < 0) return 3;
            if (e >= p) return 1
        }
        l = o[e], null == l || l.focus(c), d += s
    } while (l !== a.activeElement);
    return 6 & t && function(e) {
        var t, n;
        return null != (n = null == (t = null == e ? void 0 : e.matches) ? void 0 : t.call(e, Rr)) && n
    }(l) && l.select(), 2
}

function Dr(e, t, n) {
    let r = gr(t);
    useEffect((() => {
        function t(e) {
            r.current(e)
        }
        return document.addEventListener(e, t, n), () => document.removeEventListener(e, t, n)
    }), [e, n])
}

function Fr(e, t, n) {
    let r = gr(t);
    useEffect((() => {
        function t(e) {
            r.current(e)
        }
        return window.addEventListener(e, t, n), () => window.removeEventListener(e, t, n)
    }), [e, n])
}

function Lr(e, t, n = !0) {
    let r = userRef(!1);

    function i(n, i) {
        if (!r.current || n.defaultPrevented) return;
        let a = i(n);
        if (null === a || !a.getRootNode().contains(a) || !a.isConnected) return;
        let o = function e(t) {
            return "function" == typeof t ? e(t()) : Array.isArray(t) || t instanceof Set ? t : [t]
        }(e);
        for (let e of o) {
            if (null === e) continue;
            let t = e instanceof HTMLElement ? e : e.current;
            if (null != t && t.contains(a) || n.composed && n.composedPath().includes(t)) return
        }
        return !Tr(a, Pr.Loose) && -1 !== a.tabIndex && n.preventDefault(), t(n, a)
    }
    useEffect((() => {
        requestAnimationFrame((() => {
            r.current = n
        }))
    }), [n]);
    let a = userRef(null);
    Dr("pointerdown", (e => {
        var t, n;
        r.current && (a.current = (null == (n = null == (t = e.composedPath) ? void 0 : t.call(e)) ? void 0 : n[0]) || e.target)
    }), !0), Dr("mousedown", (e => {
        var t, n;
        r.current && (a.current = (null == (n = null == (t = e.composedPath) ? void 0 : t.call(e)) ? void 0 : n[0]) || e.target)
    }), !0), Dr("click", (e => {
        a.current && (i(e, (() => a.current)), a.current = null)
    }), !0), Dr("touchend", (e => i(e, (() => e.target instanceof HTMLElement ? e.target : null))), !0), Fr("blur", (e => i(e, (() => window.document.activeElement instanceof HTMLIFrameElement ? window.document.activeElement : null))), !0)
}

function Mr(e) {
    var t;
    if (e.type) return e.type;
    let n = null != (t = e.as) ? t : "button";
    return "string" == typeof n && "button" === n.toLowerCase() ? "button" : void 0
}
let Ur = Symbol();

function jr(e, t = !0) {
    return Object.assign(e, {
        [Ur]: t
    })
}

function qr(...e) {
    let t = userRef(e);
    useEffect((() => {
        t.current = e
    }), [e]);
    let n = yr((e => {
        for (let n of t.current) null != n && ("function" == typeof n ? n(e) : n.current = e)
    }));
    return e.every((e => null == e || (null == e ? void 0 : e[Ur]))) ? void 0 : n
}

function Br(...e) {
    return Array.from(new Set(e.flatMap((e => "string" == typeof e ? e.split(" ") : [])))).filter(Boolean).join(" ")
}
var Vr = (e => (e[e.None = 0] = "None", e[e.RenderStrategy = 1] = "RenderStrategy", e[e.Static = 2] = "Static", e))(Vr || {}),
    Wr = (e => (e[e.Unmount = 0] = "Unmount", e[e.Hidden = 1] = "Hidden", e))(Wr || {});

function Hr({
                ourProps: e,
                theirProps: t,
                slot: n,
                defaultTag: r,
                features: i,
                visible: a = !0,
                name: o
            }) {
    let l = zr(t, e);
    if (a) return Qr(l, n, r, o);
    let s = null != i ? i : 0;
    if (2 & s) {
        let {
            static: e = !1,
            ...t
        } = l;
        if (e) return Qr(t, n, r, o)
    }
    if (1 & s) {
        let {
            unmount: e = !0,
            ...t
        } = l;
        return wr(e ? 0 : 1, {
            0: () => null,
            1: () => Qr({
                ...t,
                hidden: !0,
                style: {
                    display: "none"
                }
            }, n, r, o)
        })
    }
    return Qr(l, n, r, o)
}

function Qr(e, t = {}, n, r) {
    let {
        as: i = n,
        children: o,
        refName: l = "ref",
        ...s
    } = Kr(e, ["unmount", "static"]), p = void 0 !== e.ref ? {
        [l]: e.ref
    } : {}, h = "function" == typeof o ? o(t) : o;
    "className" in s && s.className && "function" == typeof s.className && (s.className = s.className(t));
    let f = {};
    if (t) {
        let e = !1,
            n = [];
        for (let [r, i] of Object.entries(t)) "boolean" == typeof i && (e = !0), !0 === i && n.push(r);
        e && (f["data-headlessui-state"] = n.join(" "))
    }
    if (i === Fragment && Object.keys(Gr(s)).length > 0) {
        if (!isValidElement(h) || Array.isArray(h) && h.length > 1) throw new Error(['Passing props on "Fragment"!', "", `The current component <${r} /> is rendering a "Fragment".`, "However we need to passthrough the following props:", Object.keys(s).map((e => `  - ${e}`)).join("\n"), "", "You can apply a few solutions:", ['Add an `as="..."` prop, to ensure that we render an actual element instead of a "Fragment".', "Render a single element as the child so that we can forward the props onto that element."].map((e => `  - ${e}`)).join("\n")].join("\n"));
        let e = h.props,
            t = "function" == typeof(null == e ? void 0 : e.className) ? (...t) => Br(null == e ? void 0 : e.className(...t), s.className) : Br(null == e ? void 0 : e.className, s.className),
            n = t ? {
                className: t
            } : {};
        return cloneElement(h, Object.assign({}, zr(h.props, Gr(Kr(s, ["ref"]))), f, p, function(...e) {
            return {
                ref: e.every((e => null == e)) ? void 0 : t => {
                    for (let n of e) null != n && ("function" == typeof n ? n(t) : n.current = t)
                }
            }
        }(h.ref, p.ref), n))
    }
    return createElement(i, Object.assign({}, Kr(s, ["ref"]), i !== Fragment && p, i !== Fragment && f), h)
}

function zr(...e) {
    if (0 === e.length) return {};
    if (1 === e.length) return e[0];
    let t = {},
        n = {};
    for (let r of e)
        for (let e in r) e.startsWith("on") && "function" == typeof r[e] ? (null != n[e] || (n[e] = []), n[e].push(r[e])) : t[e] = r[e];
    if (t.disabled || t["aria-disabled"]) return Object.assign(t, Object.fromEntries(Object.keys(n).map((e => [e, void 0]))));
    for (let e in n) Object.assign(t, {
        [e](t, ...r) {
            let i = n[e];
            for (let e of i) {
                if ((t instanceof Event || (null == t ? void 0 : t.nativeEvent) instanceof Event) && t.defaultPrevented) return;
                e(t, ...r)
            }
        }
    });
    return t
}

function $r(e) {
    var t;
    return Object.assign(forwardRef(e), {
        displayName: null != (t = e.displayName) ? t : e.name
    })
}

function Gr(e) {
    let t = Object.assign({}, e);
    for (let e in t) void 0 === t[e] && delete t[e];
    return t
}

function Kr(e, t = []) {
    let n = Object.assign({}, e);
    for (let e of t) e in n && delete n[e];
    return n
}

function Yr(e) {
    let t = e.parentElement,
        n = null;
    for (; t && !(t instanceof HTMLFieldSetElement);) t instanceof HTMLLegendElement && (n = t), t = t.parentElement;
    let r = "" === (null == t ? void 0 : t.getAttribute("disabled"));
    return (!r || ! function(e) {
        if (!e) return !1;
        let t = e.previousElementSibling;
        for (; null !== t;) {
            if (t instanceof HTMLLegendElement) return !1;
            t = t.previousElementSibling
        }
        return !0
    }(n)) && r
}
var Jr = (e => (e[e.None = 1] = "None", e[e.Focusable = 2] = "Focusable", e[e.Hidden = 4] = "Hidden", e))(Jr || {});
let Zr = $r((function(e, t) {
        let {
            features: n = 1,
            ...r
        } = e;
        return Hr({
            ourProps: {
                ref: t,
                "aria-hidden": 2 == (2 & n) || void 0,
                style: {
                    position: "fixed",
                    top: 1,
                    left: 1,
                    width: 1,
                    height: 0,
                    padding: 0,
                    margin: -1,
                    overflow: "hidden",
                    clip: "rect(0, 0, 0, 0)",
                    whiteSpace: "nowrap",
                    borderWidth: "0",
                    ...4 == (4 & n) && 2 != (2 & n) && {
                        display: "none"
                    }
                }
            },
            theirProps: r,
            slot: {},
            defaultTag: "div",
            name: "Hidden"
        })
    })),
    Xr = createContext(null);
Xr.displayName = "OpenClosedContext";
var ei = (e => (e[e.Open = 1] = "Open", e[e.Closed = 2] = "Closed", e[e.Closing = 4] = "Closing", e[e.Opening = 8] = "Opening", e))(ei || {});

function ti() {
    return useContext(Xr)
}

function ni({
                value: e,
                children: n
            }) {
    return t.createElement(Xr.Provider, {
        value: e
    }, n)
}
var ri = (e => (e.Space = " ", e.Enter = "Enter", e.Escape = "Escape", e.Backspace = "Backspace", e.Delete = "Delete", e.ArrowLeft = "ArrowLeft", e.ArrowUp = "ArrowUp", e.ArrowRight = "ArrowRight", e.ArrowDown = "ArrowDown", e.Home = "Home", e.End = "End", e.PageUp = "PageUp", e.PageDown = "PageDown", e.Tab = "Tab", e))(ri || {});

function ii(...e) {
    return useMemo((() => Cr(...e)), [...e])
}
var ai = (e => (e[e.Forwards = 0] = "Forwards", e[e.Backwards = 1] = "Backwards", e))(ai || {});

function oi() {
    let e = userRef(0);
    return Fr("keydown", (t => {
        "Tab" === t.key && (e.current = t.shiftKey ? 1 : 0)
    }), !0), e
}

function li(e) {
    let t = yr(e),
        n = userRef(!1);
    useEffect((() => (n.current = !1, () => {
        n.current = !0,
            function(e) {
                "function" == typeof queueMicrotask ? queueMicrotask(e) : Promise.resolve().then(e).catch((e => setTimeout((() => {
                    throw e
                }))))
            }((() => {
                n.current && t()
            }))
    })), [t])
}
let si = createContext(!1);

function ui() {
    return useContext(si)
}

function ci(e) {
    let t = ui(),
        n = useContext(hi),
        i = ii(e),
        [a, o] = useState((() => {
            if (!t && null !== n || mr.isServer) return null;
            let e = null == i ? void 0 : i.getElementById("headlessui-portal-root");
            if (e) return e;
            if (null === i) return null;
            let r = i.createElement("div");
            return r.setAttribute("id", "headlessui-portal-root"), i.body.appendChild(r)
        }));
    return useEffect((() => {
        null !== a && (null != i && i.body.contains(a) || null == i || i.body.appendChild(a))
    }), [a, i]), useEffect((() => {
        t || null !== n && o(n.current)
    }), [n, o, t]), a
}
let di = Fragment;
let pi = Fragment,
    hi = createContext(null);
let fi = createContext(null);

function mi() {
    let e = useContext(fi),
        n = userRef([]),
        a = yr((t => (n.current.push(t), e && e.register(t), () => useCallback(t)))),
        o = yr((t => {
            let r = n.current.indexOf(t); - 1 !== r && n.current.splice(r, 1), e && e.unregister(t)
        })),
        l = useMemo((() => ({
            register: a,
            unregister: o,
            portals: n
        })), [a, o, n]);
    return [n, useMemo((() => function({
                                     children: e
                                 }) {
        return t.createElement(fi.Provider, {
            value: l
        }, e)
    }), [l])]
}
let vi = $r((function(e, t) {
        let n = e,
            i = userRef(null),
            a = qr(jr((e => {
                i.current = e
            })), t),
            o = ii(i),
            l = ci(i),
            [s] = useState((() => {
                var e;
                return mr.isServer ? null : null != (e = null == o ? void 0 : o.createElement("div")) ? e : null
            })),
            u = useContext(fi),
            c = br();
        return vr((() => {
            !l || !s || l.contains(s) || (s.setAttribute("data-headlessui-portal", ""), l.appendChild(s))
        }), [l, s]), vr((() => {
            if (s && u) return u.register(s)
        }), [u, s]), li((() => {
            var e;
            !l || !s || (s instanceof Node && l.contains(s) && l.removeChild(s), l.childNodes.length <= 0 && (null == (e = l.parentElement) || e.removeChild(l)))
        })), c && l && s ? de(Hr({
            ourProps: {
                ref: a
            },
            theirProps: n,
            defaultTag: di,
            name: "Portal"
        }), s) : null
    })),
    gi = $r((function(e, n) {
        let {
            target: r,
            ...i
        } = e, a = {
            ref: qr(n)
        };
        return t.createElement(hi.Provider, {
            value: r
        }, Hr({
            ourProps: a,
            theirProps: i,
            defaultTag: pi,
            name: "Popover.Group"
        }))
    }));

function yi({
                defaultContainers: e = [],
                portals: n,
                mainTreeNodeRef: r
            } = {}) {
    var a;
    let o = userRef(null != (a = null == r ? void 0 : r.current) ? a : null),
        l = ii(o),
        s = yr((() => {
            var t;
            let r = [];
            for (let t of e) null !== t && (t instanceof HTMLElement ? r.push(t) : "current" in t && t.current instanceof HTMLElement && r.push(t.current));
            if (null != n && n.current)
                for (let e of n.current) r.push(e);
            for (let e of null != (t = null == l ? void 0 : l.querySelectorAll("html > *, body > *")) ? t : []) e !== document.body && e !== document.head && e instanceof HTMLElement && "headlessui-portal-root" !== e.id && (e.contains(o.current) || r.some((t => e.contains(t))) || r.push(e));
            return r
        }));
    return {
        resolveContainers: s,
        contains: yr((e => s().some((t => t.contains(e))))),
        mainTreeNodeRef: o,
        MainTreeNode: useMemo((() => function() {
            return null != r ? null : t.createElement(Zr, {
                features: Jr.Hidden,
                ref: o
            })
        }), [o, r])
    }
}

function bi() {
    let e = userRef(null);
    return {
        mainTreeNodeRef: e,
        MainTreeNode: useMemo((() => function() {
            return t.createElement(Zr, {
                features: Jr.Hidden,
                ref: e
            })
        }), [e])
    }
}
Object.assign(vi, {
    Group: gi
});
var _i = (e => (e[e.Open = 0] = "Open", e[e.Closed = 1] = "Closed", e))(_i || {}),
    Ei = (e => (e[e.TogglePopover = 0] = "TogglePopover", e[e.ClosePopover = 1] = "ClosePopover", e[e.SetButton = 2] = "SetButton", e[e.SetButtonId = 3] = "SetButtonId", e[e.SetPanel = 4] = "SetPanel", e[e.SetPanelId = 5] = "SetPanelId", e))(Ei || {});
let wi = {
        0: e => {
            let t = {
                ...e,
                popoverState: wr(e.popoverState, {
                    0: 1,
                    1: 0
                })
            };
            return 0 === t.popoverState && (t.__demoMode = !1), t
        },
        1: e => 1 === e.popoverState ? e : {
            ...e,
            popoverState: 1
        },
        2: (e, t) => e.button === t.button ? e : {
            ...e,
            button: t.button
        },
        3: (e, t) => e.buttonId === t.buttonId ? e : {
            ...e,
            buttonId: t.buttonId
        },
        4: (e, t) => e.panel === t.panel ? e : {
            ...e,
            panel: t.panel
        },
        5: (e, t) => e.panelId === t.panelId ? e : {
            ...e,
            panelId: t.panelId
        }
    },
    Ci = createContext(null);

function Si(e) {
    let t = useContext(Ci);
    if (null === t) {
        let t = new Error(`<${e} /> is missing a parent <Popover /> component.`);
        throw Error.captureStackTrace && Error.captureStackTrace(t, Si), t
    }
    return t
}
Ci.displayName = "PopoverContext";
let ki = createContext(null);

function Oi(e) {
    let t = useContext(ki);
    if (null === t) {
        let t = new Error(`<${e} /> is missing a parent <Popover /> component.`);
        throw Error.captureStackTrace && Error.captureStackTrace(t, Oi), t
    }
    return t
}
ki.displayName = "PopoverAPIContext";
let xi = createContext(null);

function Ni() {
    return useContext(xi)
}
xi.displayName = "PopoverGroupContext";
let Pi = createContext(null);

function Ti(e, t) {
    return wr(t.type, wi, e, t)
}
Pi.displayName = "PopoverPanelContext";
let Ii = Vr.RenderStrategy | Vr.Static;
let Ri = Vr.RenderStrategy | Vr.Static;
let Ai = $r((function(e, n) {
        var r;
        let {
            __demoMode: a = !1,
            ...o
        } = e, l = userRef(null), s = qr(n, jr((e => {
            l.current = e
        }))), u = userRef([]), c = useReducer(Ti, {
            __demoMode: a,
            popoverState: a ? 0 : 1,
            buttons: u,
            button: null,
            buttonId: null,
            panel: null,
            panelId: null,
            beforePanelSentinel: createRef(),
            afterPanelSentinel: createRef()
        }), [{
            popoverState: d,
            button: p,
            buttonId: m,
            panel: y,
            panelId: b,
            beforePanelSentinel: _,
            afterPanelSentinel: E
        }, w] = c, C = ii(null != (r = l.current) ? r : p), S = useMemo((() => {
            if (!p || !y) return !1;
            for (let e of document.querySelectorAll("body > *"))
                if (Number(null == e ? void 0 : e.contains(p)) ^ Number(null == e ? void 0 : e.contains(y))) return !0;
            let e = Nr(),
                t = e.indexOf(p),
                n = (t + e.length - 1) % e.length,
                r = (t + 1) % e.length,
                i = e[n],
                a = e[r];
            return !y.contains(i) && !y.contains(a)
        }), [p, y]), k = gr(m), O = gr(b), x = useMemo((() => ({
            buttonId: k,
            panelId: O,
            close: () => w({
                type: 1
            })
        })), [k, O, w]), N = Ni(), P = null == N ? void 0 : N.registerPopover, T = yr((() => {
            var e;
            return null != (e = null == N ? void 0 : N.isFocusWithinPopoverGroup()) ? e : (null == C ? void 0 : C.activeElement) && ((null == p ? void 0 : p.contains(C.activeElement)) || (null == y ? void 0 : y.contains(C.activeElement)))
        }));
        useEffect((() => null == P ? void 0 : P(x)), [P, x]);
        let [I, R] = mi(), A = yi({
            mainTreeNodeRef: null == N ? void 0 : N.mainTreeNodeRef,
            portals: I,
            defaultContainers: [p, y]
        });
        (function(e, t, n, r) {
            let i = gr(n);
            useEffect((() => {
                function n(e) {
                    i.current(e)
                }
                return (e = null != e ? e : window).addEventListener(t, n, r), () => e.removeEventListener(t, n, r)
            }), [e, t, r])
        })(null == C ? void 0 : C.defaultView, "focus", (e => {
            var t, n, r, i;
            e.target !== window && e.target instanceof HTMLElement && 0 === d && (T() || p && y && (A.contains(e.target) || null != (n = null == (t = _.current) ? void 0 : t.contains) && n.call(t, e.target) || null != (i = null == (r = E.current) ? void 0 : r.contains) && i.call(r, e.target) || w({
                type: 1
            })))
        }), !0), Lr(A.resolveContainers, ((e, t) => {
            w({
                type: 1
            }), Tr(t, Pr.Loose) || (e.preventDefault(), null == p || p.focus())
        }), 0 === d);
        let D = yr((e => {
                w({
                    type: 1
                });
                let t = e ? e instanceof HTMLElement ? e : "current" in e && e.current instanceof HTMLElement ? e.current : p : p;
                null == t || t.focus()
            })),
            F = useMemo((() => ({
                close: D,
                isPortalled: S
            })), [D, S]),
            L = useMemo((() => ({
                open: 0 === d,
                close: D
            })), [d, D]),
            M = {
                ref: s
            };
        return t.createElement(Pi.Provider, {
            value: null
        }, t.createElement(Ci.Provider, {
            value: c
        }, t.createElement(ki.Provider, {
            value: F
        }, t.createElement(ni, {
            value: wr(d, {
                0: ei.Open,
                1: ei.Closed
            })
        }, t.createElement(R, null, Hr({
            ourProps: M,
            theirProps: o,
            slot: L,
            defaultTag: "div",
            name: "Popover"
        }), t.createElement(A.MainTreeNode, null))))))
    })),
    Di = $r((function(e, n) {
        let a = Er(),
            {
                id: o = `headlessui-popover-button-${a}`,
                ...l
            } = e,
            [s, u] = Si("Popover.Button"),
            {
                isPortalled: c
            } = Oi("Popover.Button"),
            d = userRef(null),
            p = `headlessui-focus-sentinel-${Er()}`,
            v = Ni(),
            g = null == v ? void 0 : v.closeOthers,
            y = null !== useContext(Pi);
        useEffect((() => {
            if (!y) return u({
                type: 3,
                buttonId: o
            }), () => {
                u({
                    type: 3,
                    buttonId: null
                })
            }
        }), [y, o, u]);
        let [b] = useState((() => Symbol())), _ = qr(d, n, y ? null : e => {
            if (e) s.buttons.current.push(b);
            else {
                let e = s.buttons.current.indexOf(b); - 1 !== e && s.buttons.current.splice(e, 1)
            }
            s.buttons.current.length > 1 && console.warn("You are already using a <Popover.Button /> but only 1 <Popover.Button /> is supported."), e && u({
                type: 2,
                button: e
            })
        }), E = qr(d, n), w = ii(d), C = yr((e => {
            var t, n, r;
            if (y) {
                if (1 === s.popoverState) return;
                switch (e.key) {
                    case ri.Space:
                    case ri.Enter:
                        e.preventDefault(), null == (n = (t = e.target).click) || n.call(t), u({
                            type: 1
                        }), null == (r = s.button) || r.focus()
                }
            } else switch (e.key) {
                case ri.Space:
                case ri.Enter:
                    e.preventDefault(), e.stopPropagation(), 1 === s.popoverState && (null == g || g(s.buttonId)), u({
                        type: 0
                    });
                    break;
                case ri.Escape:
                    if (0 !== s.popoverState) return null == g ? void 0 : g(s.buttonId);
                    if (!d.current || null != w && w.activeElement && !d.current.contains(w.activeElement)) return;
                    e.preventDefault(), e.stopPropagation(), u({
                        type: 1
                    })
            }
        })), S = yr((e => {
            y || e.key === ri.Space && e.preventDefault()
        })), k = yr((t => {
            var n, r;
            Yr(t.currentTarget) || e.disabled || (y ? (u({
                type: 1
            }), null == (n = s.button) || n.focus()) : (t.preventDefault(), t.stopPropagation(), 1 === s.popoverState && (null == g || g(s.buttonId)), u({
                type: 0
            }), null == (r = s.button) || r.focus()))
        })), O = yr((e => {
            e.preventDefault(), e.stopPropagation()
        })), x = 0 === s.popoverState, N = useMemo((() => ({
            open: x
        })), [x]), P = function(e, t) {
            let [n, r] = useState((() => Mr(e)));
            return vr((() => {
                r(Mr(e))
            }), [e.type, e.as]), vr((() => {
                n || t.current && t.current instanceof HTMLButtonElement && !t.current.hasAttribute("type") && r("button")
            }), [n, t]), n
        }(e, d), T = y ? {
            ref: E,
            type: P,
            onKeyDown: C,
            onClick: k
        } : {
            ref: _,
            id: s.buttonId,
            type: P,
            "aria-expanded": 0 === s.popoverState,
            "aria-controls": s.panel ? s.panelId : void 0,
            onKeyDown: C,
            onKeyUp: S,
            onClick: k,
            onMouseDown: O
        }, I = oi(), R = yr((() => {
            let e = s.panel;
            e && wr(I.current, {
                [ai.Forwards]: () => Ar(e, kr.First),
                [ai.Backwards]: () => Ar(e, kr.Last)
            }) === Or.Error && Ar(Nr().filter((e => "true" !== e.dataset.headlessuiFocusGuard)), wr(I.current, {
                [ai.Forwards]: kr.Next,
                [ai.Backwards]: kr.Previous
            }), {
                relativeTo: s.button
            })
        }));
        return t.createElement(t.Fragment, null, Hr({
            ourProps: T,
            theirProps: l,
            slot: N,
            defaultTag: "button",
            name: "Popover.Button"
        }), x && !y && c && t.createElement(Zr, {
            id: p,
            features: Jr.Focusable,
            "data-headlessui-focus-guard": !0,
            as: "button",
            type: "button",
            onFocus: R
        }))
    })),
    Fi = $r((function(e, t) {
        let n = Er(),
            {
                id: r = `headlessui-popover-overlay-${n}`,
                ...a
            } = e,
            [{
                popoverState: o
            }, l] = Si("Popover.Overlay"),
            s = qr(t),
            u = ti(),
            c = null !== u ? (u & ei.Open) === ei.Open : 0 === o;
        return Hr({
            ourProps: {
                ref: s,
                id: r,
                "aria-hidden": !0,
                onClick: yr((e => {
                    if (Yr(e.currentTarget)) return e.preventDefault();
                    l({
                        type: 1
                    })
                }))
            },
            theirProps: a,
            slot: useMemo((() => ({
                open: 0 === o
            })), [o]),
            defaultTag: "div",
            features: Ii,
            visible: c,
            name: "Popover.Overlay"
        })
    })),
    Li = $r((function(e, n) {
        let r = Er(),
            {
                id: a = `headlessui-popover-panel-${r}`,
                focus: o = !1,
                ...l
            } = e,
            [s, u] = Si("Popover.Panel"),
            {
                close: c,
                isPortalled: d
            } = Oi("Popover.Panel"),
            p = `headlessui-focus-sentinel-before-${Er()}`,
            m = `headlessui-focus-sentinel-after-${Er()}`,
            v = userRef(null),
            g = qr(v, n, (e => {
                u({
                    type: 4,
                    panel: e
                })
            })),
            y = ii(v);
        vr((() => (u({
            type: 5,
            panelId: a
        }), () => {
            u({
                type: 5,
                panelId: null
            })
        })), [a, u]);
        let b = ti(),
            _ = null !== b ? (b & ei.Open) === ei.Open : 0 === s.popoverState,
            E = yr((e => {
                var t;
                if (e.key === ri.Escape) {
                    if (0 !== s.popoverState || !v.current || null != y && y.activeElement && !v.current.contains(y.activeElement)) return;
                    e.preventDefault(), e.stopPropagation(), u({
                        type: 1
                    }), null == (t = s.button) || t.focus()
                }
            }));
        useEffect((() => {
            var t;
            e.static || 1 === s.popoverState && (null == (t = e.unmount) || t) && u({
                type: 4,
                panel: null
            })
        }), [s.popoverState, e.unmount, e.static, u]), useEffect((() => {
            if (s.__demoMode || !o || 0 !== s.popoverState || !v.current) return;
            let e = null == y ? void 0 : y.activeElement;
            v.current.contains(e) || Ar(v.current, kr.First)
        }), [s.__demoMode, o, v, s.popoverState]);
        let w = useMemo((() => ({
                open: 0 === s.popoverState,
                close: c
            })), [s, c]),
            C = {
                ref: g,
                id: a,
                onKeyDown: E,
                onBlur: o && 0 === s.popoverState ? e => {
                    var t, n, r, i, a;
                    let o = e.relatedTarget;
                    o && v.current && (null != (t = v.current) && t.contains(o) || (u({
                        type: 1
                    }), (null != (r = null == (n = s.beforePanelSentinel.current) ? void 0 : n.contains) && r.call(n, o) || null != (a = null == (i = s.afterPanelSentinel.current) ? void 0 : i.contains) && a.call(i, o)) && o.focus({
                        preventScroll: !0
                    })))
                } : void 0,
                tabIndex: -1
            },
            S = oi(),
            k = yr((() => {
                let e = v.current;
                e && wr(S.current, {
                    [ai.Forwards]: () => {
                        var t;
                        Ar(e, kr.First) === Or.Error && (null == (t = s.afterPanelSentinel.current) || t.focus())
                    },
                    [ai.Backwards]: () => {
                        var e;
                        null == (e = s.button) || e.focus({
                            preventScroll: !0
                        })
                    }
                })
            })),
            O = yr((() => {
                let e = v.current;
                e && wr(S.current, {
                    [ai.Forwards]: () => {
                        var e;
                        if (!s.button) return;
                        let t = Nr(),
                            n = t.indexOf(s.button),
                            r = t.slice(0, n + 1),
                            i = [...t.slice(n + 1), ...r];
                        for (let t of i.slice())
                            if ("true" === t.dataset.headlessuiFocusGuard || null != (e = s.panel) && e.contains(t)) {
                                let e = i.indexOf(t); - 1 !== e && i.splice(e, 1)
                            } Ar(i, kr.First, {
                            sorted: !1
                        })
                    },
                    [ai.Backwards]: () => {
                        var t;
                        Ar(e, kr.Previous) === Or.Error && (null == (t = s.button) || t.focus())
                    }
                })
            }));
        return t.createElement(Pi.Provider, {
            value: a
        }, _ && d && t.createElement(Zr, {
            id: p,
            ref: s.beforePanelSentinel,
            features: Jr.Focusable,
            "data-headlessui-focus-guard": !0,
            as: "button",
            type: "button",
            onFocus: k
        }), Hr({
            ourProps: C,
            theirProps: l,
            slot: w,
            defaultTag: "div",
            features: Ri,
            visible: _,
            name: "Popover.Panel"
        }), _ && d && t.createElement(Zr, {
            id: m,
            ref: s.afterPanelSentinel,
            features: Jr.Focusable,
            "data-headlessui-focus-guard": !0,
            as: "button",
            type: "button",
            onFocus: O
        }))
    })),
    Mi = $r((function(e, n) {
        let r = userRef(null),
            a = qr(r, n),
            [o, l] = useState([]),
            s = bi(),
            u = yr((e => {
                l((t => {
                    let n = t.indexOf(e);
                    if (-1 !== n) {
                        let e = t.slice();
                        return e.splice(n, 1), e
                    }
                    return t
                }))
            })),
            c = yr((e => (l((t => [...t, e])), () => u(e)))),
            d = yr((() => {
                var e;
                let t = Cr(r);
                if (!t) return !1;
                let n = t.activeElement;
                return !(null == (e = r.current) || !e.contains(n)) || o.some((e => {
                    var r, i;
                    return (null == (r = t.getElementById(e.buttonId.current)) ? void 0 : r.contains(n)) || (null == (i = t.getElementById(e.panelId.current)) ? void 0 : i.contains(n))
                }))
            })),
            p = yr((e => {
                for (let t of o) t.buttonId.current !== e && t.close()
            })),
            h = useMemo((() => ({
                registerPopover: c,
                unregisterPopover: u,
                isFocusWithinPopoverGroup: d,
                closeOthers: p,
                mainTreeNodeRef: s.mainTreeNodeRef
            })), [c, u, d, p, s.mainTreeNodeRef]),
            v = useMemo((() => ({})), []),
            g = e,
            y = {
                ref: a
            };
        return t.createElement(xi.Provider, {
            value: h
        }, Hr({
            ourProps: y,
            theirProps: g,
            slot: v,
            defaultTag: "div",
            name: "Popover.Group"
        }), t.createElement(s.MainTreeNode, null))
    })),
    Ui = Object.assign(Ai, {
        Button: Di,
        Overlay: Fi,
        Panel: Li,
        Group: Mi
    });
var ji = "container_filter_optionsContainer__QUz4t",
    qi = "container_filter_dropdownSelect__NxE8Z",
    Bi = "container_filter_popoverOuter__siecU",
    Vi = "container_filter_popoverInner__D5zre",
    Wi = "container_filter_dropdownItem__-0yib",
    Hi = "container_filter_viewMoreButton__a-rFw",
    Qi = "container_filter_panelContent__n5IBG",
    zi = "container_filter_containerContent__1FlsF";
St(".container_filter_optionsContainer__QUz4t {\n  max-height: 250px;\n  min-height: 25px;\n  overflow: scroll;\n}\n\n.container_filter_dropdownSelect__NxE8Z {\n  border-radius: var(--ui-kit-border-radius);\n  border: 1px solid var(--ui-kit-color-border);\n  background: var(--ui-kit-color-page);\n  height: calc(var(--ui-kit-space-1) * 5);\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-top: var(--ui-kit-space-1);\n  cursor: pointer;\n  padding: 0 calc(var(--ui-kit-space-1) * 1.5);\n}\n\n.container_filter_popoverOuter__siecU {\n  position: fixed;\n  z-index: 999;\n  margin-top: var(--ui-kit-space-1);\n}\n\n.container_filter_popoverInner__D5zre {\n  background: var(--ui-kit-color-surface);\n  box-shadow: var(--ui-kit-box-shadow-faint);\n  border-radius: var(--ui-kit-border-radius);\n}\n\n.container_filter_dropdownItem__-0yib {\n  display: flex;\n  font-weight: 400;\n  height: calc(var(--ui-kit-base-unit) * 5);\n  padding: 0 calc(var(--ui-kit-base-unit) * 2);\n  align-items: center;\n  justify-content: space-between;\n  cursor: pointer;\n}\n\n.container_filter_dropdownItem__-0yib:hover {\n  background-color: var(--ui-kit-color-tertiary-hover);\n}\n\n.container_filter_container__-KII1 {\n  display: flex;\n  align-items: center;\n  gap: var(--ui-kit-space-1);\n}\n\n.container_filter_viewMoreButton__a-rFw {\n  margin: var(--ui-kit-space-1) var(--ui-kit-space-2);\n}\n\n.container_filter_panelContent__n5IBG {\n  padding: var(--ui-kit-space-2);\n}\n\n.container_filter_containerContent__1FlsF {\n  display: flex;\n  min-height: calc(var(--ui-kit-base-unit) * 6);\n  align-items: center;\n  justify-content: center;\n}\n");
var $i = class {
        constructor() {
            this.listeners = new Set, this.subscribe = this.subscribe.bind(this)
        }
        subscribe(e) {
            return this.listeners.add(e), this.onSubscribe(), () => {
                this.listeners.delete(e), this.onUnsubscribe()
            }
        }
        hasListeners() {
            return this.listeners.size > 0
        }
        onSubscribe() {}
        onUnsubscribe() {}
    },
    Gi = "undefined" == typeof window || "Deno" in window;

function Ki() {}

function Yi(e) {
    return "number" == typeof e && e >= 0 && e !== 1 / 0
}

function Ji(e, t) {
    return Math.max(e + (t || 0) - Date.now(), 0)
}

function Zi(e, t) {
    const {
        type: n = "all",
        exact: r,
        fetchStatus: i,
        predicate: a,
        queryKey: o,
        stale: l
    } = e;
    if (o)
        if (r) {
            if (t.queryHash !== ea(o, t.options)) return !1
        } else if (!na(t.queryKey, o)) return !1;
    if ("all" !== n) {
        const e = t.isActive();
        if ("active" === n && !e) return !1;
        if ("inactive" === n && e) return !1
    }
    return ("boolean" != typeof l || t.isStale() === l) && ((void 0 === i || i === t.state.fetchStatus) && !(a && !a(t)))
}

function Xi(e, t) {
    const {
        exact: n,
        status: r,
        predicate: i,
        mutationKey: a
    } = e;
    if (a) {
        if (!t.options.mutationKey) return !1;
        if (n) {
            if (ta(t.options.mutationKey) !== ta(a)) return !1
        } else if (!na(t.options.mutationKey, a)) return !1
    }
    return (!r || t.state.status === r) && !(i && !i(t))
}

function ea(e, t) {
    return (t?.queryKeyHashFn || ta)(e)
}

function ta(e) {
    return JSON.stringify(e, ((e, t) => oa(t) ? Object.keys(t).sort().reduce(((e, n) => (e[n] = t[n], e)), {}) : t))
}

function na(e, t) {
    return e === t || typeof e == typeof t && (!(!e || !t || "object" != typeof e || "object" != typeof t) && !Object.keys(t).some((n => !na(e[n], t[n]))))
}

function ra(e, t) {
    if (e === t) return e;
    const n = aa(e) && aa(t);
    if (n || oa(e) && oa(t)) {
        const r = n ? e : Object.keys(e),
            i = r.length,
            a = n ? t : Object.keys(t),
            o = a.length,
            l = n ? [] : {};
        let s = 0;
        for (let i = 0; i < o; i++) {
            const o = n ? i : a[i];
            !n && void 0 === e[o] && void 0 === t[o] && r.includes(o) ? (l[o] = void 0, s++) : (l[o] = ra(e[o], t[o]), l[o] === e[o] && void 0 !== e[o] && s++)
        }
        return i === o && s === i ? e : l
    }
    return t
}

function ia(e, t) {
    if (!t || Object.keys(e).length !== Object.keys(t).length) return !1;
    for (const n in e)
        if (e[n] !== t[n]) return !1;
    return !0
}

function aa(e) {
    return Array.isArray(e) && e.length === Object.keys(e).length
}

function oa(e) {
    if (!la(e)) return !1;
    const t = e.constructor;
    if (void 0 === t) return !0;
    const n = t.prototype;
    return !!la(n) && !!n.hasOwnProperty("isPrototypeOf")
}

function la(e) {
    return "[object Object]" === Object.prototype.toString.call(e)
}

function sa(e, t, n) {
    return "function" == typeof n.structuralSharing ? n.structuralSharing(e, t) : !1 !== n.structuralSharing ? ra(e, t) : t
}

function ua(e, t, n = 0) {
    const r = [...e, t];
    return n && r.length > n ? r.slice(1) : r
}

function ca(e, t, n = 0) {
    const r = [t, ...e];
    return n && r.length > n ? r.slice(0, -1) : r
}
var da = new class extends $i {
        #e;
        #t;
        #n;
        constructor() {
            super(), this.#n = e => {
                if (!Gi && window.addEventListener) {
                    const t = () => e();
                    return window.addEventListener("visibilitychange", t, !1), () => {
                        window.removeEventListener("visibilitychange", t)
                    }
                }
            }
        }
        onSubscribe() {
            this.#t || this.setEventListener(this.#n)
        }
        onUnsubscribe() {
            this.hasListeners() || (this.#t?.(), this.#t = void 0)
        }
        setEventListener(e) {
            this.#n = e, this.#t?.(), this.#t = e((e => {
                "boolean" == typeof e ? this.setFocused(e) : this.onFocus()
            }))
        }
        setFocused(e) {
            this.#e !== e && (this.#e = e, this.onFocus())
        }
        onFocus() {
            this.listeners.forEach((e => {
                e()
            }))
        }
        isFocused() {
            return "boolean" == typeof this.#e ? this.#e : "hidden" !== globalThis.document?.visibilityState
        }
    },
    pa = new class extends $i {
        #r = !0;
        #t;
        #n;
        constructor() {
            super(), this.#n = e => {
                if (!Gi && window.addEventListener) {
                    const t = () => e(!0),
                        n = () => e(!1);
                    return window.addEventListener("online", t, !1), window.addEventListener("offline", n, !1), () => {
                        window.removeEventListener("online", t), window.removeEventListener("offline", n)
                    }
                }
            }
        }
        onSubscribe() {
            this.#t || this.setEventListener(this.#n)
        }
        onUnsubscribe() {
            this.hasListeners() || (this.#t?.(), this.#t = void 0)
        }
        setEventListener(e) {
            this.#n = e, this.#t?.(), this.#t = e(this.setOnline.bind(this))
        }
        setOnline(e) {
            this.#r !== e && (this.#r = e, this.listeners.forEach((t => {
                t(e)
            })))
        }
        isOnline() {
            return this.#r
        }
    };

function ha(e) {
    return Math.min(1e3 * 2 ** e, 3e4)
}

function fa(e) {
    return "online" !== (e ?? "online") || pa.isOnline()
}
var ma = class {
    constructor(e) {
        this.revert = e?.revert, this.silent = e?.silent
    }
};

function va(e) {
    return e instanceof ma
}

function ga(e) {
    let t, n, r, i = !1,
        a = 0,
        o = !1;
    const l = new Promise(((e, t) => {
            n = e, r = t
        })),
        s = () => !da.isFocused() || "always" !== e.networkMode && !pa.isOnline(),
        u = r => {
            o || (o = !0, e.onSuccess?.(r), t?.(), n(r))
        },
        c = n => {
            o || (o = !0, e.onError?.(n), t?.(), r(n))
        },
        d = () => new Promise((n => {
            t = e => {
                const t = o || !s();
                return t && n(e), t
            }, e.onPause?.()
        })).then((() => {
            t = void 0, o || e.onContinue?.()
        })),
        p = () => {
            if (o) return;
            let t;
            try {
                t = e.fn()
            } catch (e) {
                t = Promise.reject(e)
            }
            Promise.resolve(t).then(u).catch((t => {
                if (o) return;
                const n = e.retry ?? (Gi ? 0 : 3),
                    r = e.retryDelay ?? ha,
                    l = "function" == typeof r ? r(a, t) : r,
                    u = !0 === n || "number" == typeof n && a < n || "function" == typeof n && n(a, t);
                var h;
                !i && u ? (a++, e.onFail?.(a, t), (h = l, new Promise((e => {
                    setTimeout(e, h)
                }))).then((() => {
                    if (s()) return d()
                })).then((() => {
                    i ? c(t) : p()
                }))) : c(t)
            }))
        };
    return fa(e.networkMode) ? p() : d().then(p), {
        promise: l,
        cancel: t => {
            o || (c(new ma(t)), e.abort?.())
        },
        continue: () => {
            const e = t?.();
            return e ? l : Promise.resolve()
        },
        cancelRetry: () => {
            i = !0
        },
        continueRetry: () => {
            i = !1
        }
    }
}
var ya = function() {
        let e = [],
            t = 0,
            n = e => {
                e()
            },
            r = e => {
                e()
            },
            i = e => setTimeout(e, 0);
        const a = r => {
                t ? e.push(r) : i((() => {
                    n(r)
                }))
            },
            o = () => {
                const t = e;
                e = [], t.length && i((() => {
                    r((() => {
                        t.forEach((e => {
                            n(e)
                        }))
                    }))
                }))
            };
        return {
            batch: e => {
                let n;
                t++;
                try {
                    n = e()
                } finally {
                    t--, t || o()
                }
                return n
            },
            batchCalls: e => (...t) => {
                a((() => {
                    e(...t)
                }))
            },
            schedule: a,
            setNotifyFunction: e => {
                n = e
            },
            setBatchNotifyFunction: e => {
                r = e
            },
            setScheduler: e => {
                i = e
            }
        }
    }(),
    ba = class {
        #i;
        destroy() {
            this.clearGcTimeout()
        }
        scheduleGc() {
            this.clearGcTimeout(), Yi(this.gcTime) && (this.#i = setTimeout((() => {
                this.optionalRemove()
            }), this.gcTime))
        }
        updateGcTime(e) {
            this.gcTime = Math.max(this.gcTime || 0, e ?? (Gi ? 1 / 0 : 3e5))
        }
        clearGcTimeout() {
            this.#i && (clearTimeout(this.#i), this.#i = void 0)
        }
    },
    _a = class extends ba {
        #a;
        #o;
        #l;
        #s;
        #u;
        #c;
        #d;
        #p;
        constructor(e) {
            super(), this.#p = !1, this.#d = e.defaultOptions, this.#h(e.options), this.#c = [], this.#l = e.cache, this.queryKey = e.queryKey, this.queryHash = e.queryHash, this.#a = e.state || function(e) {
                const t = "function" == typeof e.initialData ? e.initialData() : e.initialData,
                    n = void 0 !== t,
                    r = n ? "function" == typeof e.initialDataUpdatedAt ? e.initialDataUpdatedAt() : e.initialDataUpdatedAt : 0;
                return {
                    data: t,
                    dataUpdateCount: 0,
                    dataUpdatedAt: n ? r ?? Date.now() : 0,
                    error: null,
                    errorUpdateCount: 0,
                    errorUpdatedAt: 0,
                    fetchFailureCount: 0,
                    fetchFailureReason: null,
                    fetchMeta: null,
                    isInvalidated: !1,
                    status: n ? "success" : "pending",
                    fetchStatus: "idle"
                }
            }(this.options), this.state = this.#a, this.scheduleGc()
        }
        get meta() {
            return this.options.meta
        }
        #h(e) {
            this.options = {
                ...this.#d,
                ...e
            }, this.updateGcTime(this.options.gcTime)
        }
        optionalRemove() {
            this.#c.length || "idle" !== this.state.fetchStatus || this.#l.remove(this)
        }
        setData(e, t) {
            const n = sa(this.state.data, e, this.options);
            return this.#f({
                data: n,
                type: "success",
                dataUpdatedAt: t?.updatedAt,
                manual: t?.manual
            }), n
        }
        setState(e, t) {
            this.#f({
                type: "setState",
                state: e,
                setStateOptions: t
            })
        }
        cancel(e) {
            const t = this.#s;
            return this.#u?.cancel(e), t ? t.then(Ki).catch(Ki) : Promise.resolve()
        }
        destroy() {
            super.destroy(), this.cancel({
                silent: !0
            })
        }
        reset() {
            this.destroy(), this.setState(this.#a)
        }
        isActive() {
            return this.#c.some((e => !1 !== e.options.enabled))
        }
        isDisabled() {
            return this.getObserversCount() > 0 && !this.isActive()
        }
        isStale() {
            return this.state.isInvalidated || !this.state.dataUpdatedAt || this.#c.some((e => e.getCurrentResult().isStale))
        }
        isStaleByTime(e = 0) {
            return this.state.isInvalidated || !this.state.dataUpdatedAt || !Ji(this.state.dataUpdatedAt, e)
        }
        onFocus() {
            const e = this.#c.find((e => e.shouldFetchOnWindowFocus()));
            e?.refetch({
                cancelRefetch: !1
            }), this.#u?.continue()
        }
        onOnline() {
            const e = this.#c.find((e => e.shouldFetchOnReconnect()));
            e?.refetch({
                cancelRefetch: !1
            }), this.#u?.continue()
        }
        addObserver(e) {
            this.#c.includes(e) || (this.#c.push(e), this.clearGcTimeout(), this.#l.notify({
                type: "observerAdded",
                query: this,
                observer: e
            }))
        }
        removeObserver(e) {
            this.#c.includes(e) && (this.#c = this.#c.filter((t => t !== e)), this.#c.length || (this.#u && (this.#p ? this.#u.cancel({
                revert: !0
            }) : this.#u.cancelRetry()), this.scheduleGc()), this.#l.notify({
                type: "observerRemoved",
                query: this,
                observer: e
            }))
        }
        getObserversCount() {
            return this.#c.length
        }
        invalidate() {
            this.state.isInvalidated || this.#f({
                type: "invalidate"
            })
        }
        fetch(e, t) {
            if ("idle" !== this.state.fetchStatus)
                if (this.state.dataUpdatedAt && t?.cancelRefetch) this.cancel({
                    silent: !0
                });
                else if (this.#s) return this.#u?.continueRetry(), this.#s;
            if (e && this.#h(e), !this.options.queryFn) {
                const e = this.#c.find((e => e.options.queryFn));
                e && this.#h(e.options)
            }
            "production" !== process.env.NODE_ENV && (Array.isArray(this.options.queryKey) || console.error("As of v4, queryKey needs to be an Array. If you are using a string like 'repoData', please change it to an Array, e.g. ['repoData']"));
            const n = new AbortController,
                r = {
                    queryKey: this.queryKey,
                    meta: this.meta
                },
                i = e => {
                    Object.defineProperty(e, "signal", {
                        enumerable: !0,
                        get: () => (this.#p = !0, n.signal)
                    })
                };
            i(r);
            const a = {
                fetchOptions: t,
                options: this.options,
                queryKey: this.queryKey,
                state: this.state,
                fetchFn: () => this.options.queryFn ? (this.#p = !1, this.options.persister ? this.options.persister(this.options.queryFn, r, this) : this.options.queryFn(r)) : Promise.reject(new Error(`Missing queryFn: '${this.options.queryHash}'`))
            };
            i(a), this.options.behavior?.onFetch(a, this), this.#o = this.state, "idle" !== this.state.fetchStatus && this.state.fetchMeta === a.fetchOptions?.meta || this.#f({
                type: "fetch",
                meta: a.fetchOptions?.meta
            });
            const o = e => {
                va(e) && e.silent || this.#f({
                    type: "error",
                    error: e
                }), va(e) || (this.#l.config.onError?.(e, this), this.#l.config.onSettled?.(this.state.data, e, this)), this.isFetchingOptimistic || this.scheduleGc(), this.isFetchingOptimistic = !1
            };
            return this.#u = ga({
                fn: a.fetchFn,
                abort: n.abort.bind(n),
                onSuccess: e => {
                    if (void 0 === e) return "production" !== process.env.NODE_ENV && console.error(`Query data cannot be undefined. Please make sure to return a value other than undefined from your query function. Affected query key: ${this.queryHash}`), void o(new Error(`${this.queryHash} data is undefined`));
                    this.setData(e), this.#l.config.onSuccess?.(e, this), this.#l.config.onSettled?.(e, this.state.error, this), this.isFetchingOptimistic || this.scheduleGc(), this.isFetchingOptimistic = !1
                },
                onError: o,
                onFail: (e, t) => {
                    this.#f({
                        type: "failed",
                        failureCount: e,
                        error: t
                    })
                },
                onPause: () => {
                    this.#f({
                        type: "pause"
                    })
                },
                onContinue: () => {
                    this.#f({
                        type: "continue"
                    })
                },
                retry: a.options.retry,
                retryDelay: a.options.retryDelay,
                networkMode: a.options.networkMode
            }), this.#s = this.#u.promise, this.#s
        }
        #f(e) {
            this.state = (t => {
                switch (e.type) {
                    case "failed":
                        return {
                            ...t, fetchFailureCount: e.failureCount, fetchFailureReason: e.error
                        };
                    case "pause":
                        return {
                            ...t, fetchStatus: "paused"
                        };
                    case "continue":
                        return {
                            ...t, fetchStatus: "fetching"
                        };
                    case "fetch":
                        return {
                            ...t, fetchFailureCount: 0, fetchFailureReason: null, fetchMeta: e.meta ?? null, fetchStatus: fa(this.options.networkMode) ? "fetching" : "paused", ...!t.dataUpdatedAt && {
                                error: null,
                                status: "pending"
                            }
                        };
                    case "success":
                        return {
                            ...t, data: e.data, dataUpdateCount: t.dataUpdateCount + 1, dataUpdatedAt: e.dataUpdatedAt ?? Date.now(), error: null, isInvalidated: !1, status: "success", ...!e.manual && {
                                fetchStatus: "idle",
                                fetchFailureCount: 0,
                                fetchFailureReason: null
                            }
                        };
                    case "error":
                        const n = e.error;
                        return va(n) && n.revert && this.#o ? {
                            ...this.#o,
                            fetchStatus: "idle"
                        } : {
                            ...t,
                            error: n,
                            errorUpdateCount: t.errorUpdateCount + 1,
                            errorUpdatedAt: Date.now(),
                            fetchFailureCount: t.fetchFailureCount + 1,
                            fetchFailureReason: n,
                            fetchStatus: "idle",
                            status: "error"
                        };
                    case "invalidate":
                        return {
                            ...t, isInvalidated: !0
                        };
                    case "setState":
                        return {
                            ...t, ...e.state
                        }
                }
            })(this.state), ya.batch((() => {
                this.#c.forEach((e => {
                    e.onQueryUpdate()
                })), this.#l.notify({
                    query: this,
                    type: "updated",
                    action: e
                })
            }))
        }
    };
var Ea = class extends $i {
        constructor(e = {}) {
            super(), this.config = e, this.#m = new Map
        }
        #m;
        build(e, t, n) {
            const r = t.queryKey,
                i = t.queryHash ?? ea(r, t);
            let a = this.get(i);
            return a || (a = new _a({
                cache: this,
                queryKey: r,
                queryHash: i,
                options: e.defaultQueryOptions(t),
                state: n,
                defaultOptions: e.getQueryDefaults(r)
            }), this.add(a)), a
        }
        add(e) {
            this.#m.has(e.queryHash) || (this.#m.set(e.queryHash, e), this.notify({
                type: "added",
                query: e
            }))
        }
        remove(e) {
            const t = this.#m.get(e.queryHash);
            t && (e.destroy(), t === e && this.#m.delete(e.queryHash), this.notify({
                type: "removed",
                query: e
            }))
        }
        clear() {
            ya.batch((() => {
                this.getAll().forEach((e => {
                    this.remove(e)
                }))
            }))
        }
        get(e) {
            return this.#m.get(e)
        }
        getAll() {
            return [...this.#m.values()]
        }
        find(e) {
            const t = {
                exact: !0,
                ...e
            };
            return this.getAll().find((e => Zi(t, e)))
        }
        findAll(e = {}) {
            const t = this.getAll();
            return Object.keys(e).length > 0 ? t.filter((t => Zi(e, t))) : t
        }
        notify(e) {
            ya.batch((() => {
                this.listeners.forEach((t => {
                    t(e)
                }))
            }))
        }
        onFocus() {
            ya.batch((() => {
                this.getAll().forEach((e => {
                    e.onFocus()
                }))
            }))
        }
        onOnline() {
            ya.batch((() => {
                this.getAll().forEach((e => {
                    e.onOnline()
                }))
            }))
        }
    },
    wa = class extends ba {
        #c;
        #d;
        #v;
        #u;
        constructor(e) {
            super(), this.mutationId = e.mutationId, this.#d = e.defaultOptions, this.#v = e.mutationCache, this.#c = [], this.state = e.state || {
                context: void 0,
                data: void 0,
                error: null,
                failureCount: 0,
                failureReason: null,
                isPaused: !1,
                status: "idle",
                variables: void 0,
                submittedAt: 0
            }, this.setOptions(e.options), this.scheduleGc()
        }
        setOptions(e) {
            this.options = {
                ...this.#d,
                ...e
            }, this.updateGcTime(this.options.gcTime)
        }
        get meta() {
            return this.options.meta
        }
        addObserver(e) {
            this.#c.includes(e) || (this.#c.push(e), this.clearGcTimeout(), this.#v.notify({
                type: "observerAdded",
                mutation: this,
                observer: e
            }))
        }
        removeObserver(e) {
            this.#c = this.#c.filter((t => t !== e)), this.scheduleGc(), this.#v.notify({
                type: "observerRemoved",
                mutation: this,
                observer: e
            })
        }
        optionalRemove() {
            this.#c.length || ("pending" === this.state.status ? this.scheduleGc() : this.#v.remove(this))
        }
        continue () {
            return this.#u?.continue() ?? this.execute(this.state.variables)
        }
        async execute(e) {
            const t = () => (this.#u = ga({
                    fn: () => this.options.mutationFn ? this.options.mutationFn(e) : Promise.reject(new Error("No mutationFn found")),
                    onFail: (e, t) => {
                        this.#f({
                            type: "failed",
                            failureCount: e,
                            error: t
                        })
                    },
                    onPause: () => {
                        this.#f({
                            type: "pause"
                        })
                    },
                    onContinue: () => {
                        this.#f({
                            type: "continue"
                        })
                    },
                    retry: this.options.retry ?? 0,
                    retryDelay: this.options.retryDelay,
                    networkMode: this.options.networkMode
                }), this.#u.promise),
                n = "pending" === this.state.status;
            try {
                if (!n) {
                    this.#f({
                        type: "pending",
                        variables: e
                    }), await (this.#v.config.onMutate?.(e, this));
                    const t = await (this.options.onMutate?.(e));
                    t !== this.state.context && this.#f({
                        type: "pending",
                        context: t,
                        variables: e
                    })
                }
                const r = await t();
                return await (this.#v.config.onSuccess?.(r, e, this.state.context, this)), await (this.options.onSuccess?.(r, e, this.state.context)), await (this.#v.config.onSettled?.(r, null, this.state.variables, this.state.context, this)), await (this.options.onSettled?.(r, null, e, this.state.context)), this.#f({
                    type: "success",
                    data: r
                }), r
            } catch (t) {
                try {
                    throw await (this.#v.config.onError?.(t, e, this.state.context, this)), await (this.options.onError?.(t, e, this.state.context)), await (this.#v.config.onSettled?.(void 0, t, this.state.variables, this.state.context, this)), await (this.options.onSettled?.(void 0, t, e, this.state.context)), t
                } finally {
                    this.#f({
                        type: "error",
                        error: t
                    })
                }
            }
        }
        #f(e) {
            this.state = (t => {
                switch (e.type) {
                    case "failed":
                        return {
                            ...t, failureCount: e.failureCount, failureReason: e.error
                        };
                    case "pause":
                        return {
                            ...t, isPaused: !0
                        };
                    case "continue":
                        return {
                            ...t, isPaused: !1
                        };
                    case "pending":
                        return {
                            ...t, context: e.context, data: void 0, failureCount: 0, failureReason: null, error: null, isPaused: !fa(this.options.networkMode), status: "pending", variables: e.variables, submittedAt: Date.now()
                        };
                    case "success":
                        return {
                            ...t, data: e.data, failureCount: 0, failureReason: null, error: null, status: "success", isPaused: !1
                        };
                    case "error":
                        return {
                            ...t, data: void 0, error: e.error, failureCount: t.failureCount + 1, failureReason: e.error, isPaused: !1, status: "error"
                        }
                }
            })(this.state), ya.batch((() => {
                this.#c.forEach((t => {
                    t.onMutationUpdate(e)
                })), this.#v.notify({
                    mutation: this,
                    type: "updated",
                    action: e
                })
            }))
        }
    };
var Ca = class extends $i {
    constructor(e = {}) {
        super(), this.config = e, this.#g = [], this.#y = 0
    }
    #g;
    #y;
    #b;
    build(e, t, n) {
        const r = new wa({
            mutationCache: this,
            mutationId: ++this.#y,
            options: e.defaultMutationOptions(t),
            state: n
        });
        return this.add(r), r
    }
    add(e) {
        this.#g.push(e), this.notify({
            type: "added",
            mutation: e
        })
    }
    remove(e) {
        this.#g = this.#g.filter((t => t !== e)), this.notify({
            type: "removed",
            mutation: e
        })
    }
    clear() {
        ya.batch((() => {
            this.#g.forEach((e => {
                this.remove(e)
            }))
        }))
    }
    getAll() {
        return this.#g
    }
    find(e) {
        const t = {
            exact: !0,
            ...e
        };
        return this.#g.find((e => Xi(t, e)))
    }
    findAll(e = {}) {
        return this.#g.filter((t => Xi(e, t)))
    }
    notify(e) {
        ya.batch((() => {
            this.listeners.forEach((t => {
                t(e)
            }))
        }))
    }
    resumePausedMutations() {
        return this.#b = (this.#b ?? Promise.resolve()).then((() => {
            const e = this.#g.filter((e => e.state.isPaused));
            return ya.batch((() => e.reduce(((e, t) => e.then((() => t.continue().catch(Ki)))), Promise.resolve())))
        })).then((() => {
            this.#b = void 0
        })), this.#b
    }
};

function Sa(e) {
    return {
        onFetch: (t, n) => {
            const r = async () => {
                const n = t.options,
                    r = t.fetchOptions?.meta?.fetchMore?.direction,
                    i = t.state.data?.pages || [],
                    a = t.state.data?.pageParams || [],
                    o = {
                        pages: [],
                        pageParams: []
                    };
                let l = !1;
                const s = t.options.queryFn || (() => Promise.reject(new Error(`Missing queryFn: '${t.options.queryHash}'`))),
                    u = async (e, n, r) => {
                        if (l) return Promise.reject();
                        if (null == n && e.pages.length) return Promise.resolve(e);
                        const i = {
                            queryKey: t.queryKey,
                            pageParam: n,
                            direction: r ? "backward" : "forward",
                            meta: t.options.meta
                        };
                        var a;
                        a = i, Object.defineProperty(a, "signal", {
                            enumerable: !0,
                            get: () => (t.signal.aborted ? l = !0 : t.signal.addEventListener("abort", (() => {
                                l = !0
                            })), t.signal)
                        });
                        const o = await s(i),
                            {
                                maxPages: u
                            } = t.options,
                            c = r ? ca : ua;
                        return {
                            pages: c(e.pages, o, u),
                            pageParams: c(e.pageParams, n, u)
                        }
                    };
                let c;
                if (r && i.length) {
                    const e = "backward" === r,
                        t = {
                            pages: i,
                            pageParams: a
                        },
                        o = (e ? Oa : ka)(n, t);
                    c = await u(t, o, e)
                } else {
                    c = await u(o, a[0] ?? n.initialPageParam);
                    const t = e ?? i.length;
                    for (let e = 1; e < t; e++) {
                        const e = ka(n, c);
                        c = await u(c, e)
                    }
                }
                return c
            };
            t.options.persister ? t.fetchFn = () => t.options.persister?.(r, {
                queryKey: t.queryKey,
                meta: t.options.meta,
                signal: t.signal
            }, n) : t.fetchFn = r
        }
    }
}

function ka(e, {
    pages: t,
    pageParams: n
}) {
    const r = t.length - 1;
    return e.getNextPageParam(t[r], t, n[r], n)
}

function Oa(e, {
    pages: t,
    pageParams: n
}) {
    return e.getPreviousPageParam?.(t[0], t, n[0], n)
}

function xa(e, t) {
    return !!t && null != ka(e, t)
}

function Na(e, t) {
    return !(!t || !e.getPreviousPageParam) && null != Oa(e, t)
}
var Pa = class {
        #_;
        #v;
        #d;
        #E;
        #w;
        #C;
        #S;
        #k;
        constructor(e = {}) {
            this.#_ = e.queryCache || new Ea, this.#v = e.mutationCache || new Ca, this.#d = e.defaultOptions || {}, this.#E = new Map, this.#w = new Map, this.#C = 0
        }
        mount() {
            this.#C++, 1 === this.#C && (this.#S = da.subscribe((() => {
                da.isFocused() && (this.resumePausedMutations(), this.#_.onFocus())
            })), this.#k = pa.subscribe((() => {
                pa.isOnline() && (this.resumePausedMutations(), this.#_.onOnline())
            })))
        }
        unmount() {
            this.#C--, 0 === this.#C && (this.#S?.(), this.#S = void 0, this.#k?.(), this.#k = void 0)
        }
        isFetching(e) {
            return this.#_.findAll({
                ...e,
                fetchStatus: "fetching"
            }).length
        }
        isMutating(e) {
            return this.#v.findAll({
                ...e,
                status: "pending"
            }).length
        }
        getQueryData(e) {
            const t = this.defaultQueryOptions({
                queryKey: e
            });
            return this.#_.get(t.queryHash)?.state.data
        }
        ensureQueryData(e) {
            const t = this.getQueryData(e.queryKey);
            return void 0 !== t ? Promise.resolve(t) : this.fetchQuery(e)
        }
        getQueriesData(e) {
            return this.getQueryCache().findAll(e).map((({
                                                             queryKey: e,
                                                             state: t
                                                         }) => [e, t.data]))
        }
        setQueryData(e, t, n) {
            const r = this.defaultQueryOptions({
                    queryKey: e
                }),
                i = this.#_.get(r.queryHash),
                a = i?.state.data,
                o = function(e, t) {
                    return "function" == typeof e ? e(t) : e
                }(t, a);
            if (void 0 !== o) return this.#_.build(this, r).setData(o, {
                ...n,
                manual: !0
            })
        }
        setQueriesData(e, t, n) {
            return ya.batch((() => this.getQueryCache().findAll(e).map((({
                                                                             queryKey: e
                                                                         }) => [e, this.setQueryData(e, t, n)]))))
        }
        getQueryState(e) {
            const t = this.defaultQueryOptions({
                queryKey: e
            });
            return this.#_.get(t.queryHash)?.state
        }
        removeQueries(e) {
            const t = this.#_;
            ya.batch((() => {
                t.findAll(e).forEach((e => {
                    t.remove(e)
                }))
            }))
        }
        resetQueries(e, t) {
            const n = this.#_,
                r = {
                    type: "active",
                    ...e
                };
            return ya.batch((() => (n.findAll(e).forEach((e => {
                e.reset()
            })), this.refetchQueries(r, t))))
        }
        cancelQueries(e = {}, t = {}) {
            const n = {
                    revert: !0,
                    ...t
                },
                r = ya.batch((() => this.#_.findAll(e).map((e => e.cancel(n)))));
            return Promise.all(r).then(Ki).catch(Ki)
        }
        invalidateQueries(e = {}, t = {}) {
            return ya.batch((() => {
                if (this.#_.findAll(e).forEach((e => {
                    e.invalidate()
                })), "none" === e.refetchType) return Promise.resolve();
                const n = {
                    ...e,
                    type: e.refetchType ?? e.type ?? "active"
                };
                return this.refetchQueries(n, t)
            }))
        }
        refetchQueries(e = {}, t) {
            const n = {
                    ...t,
                    cancelRefetch: t?.cancelRefetch ?? !0
                },
                r = ya.batch((() => this.#_.findAll(e).filter((e => !e.isDisabled())).map((e => {
                    let t = e.fetch(void 0, n);
                    return n.throwOnError || (t = t.catch(Ki)), "paused" === e.state.fetchStatus ? Promise.resolve() : t
                }))));
            return Promise.all(r).then(Ki)
        }
        fetchQuery(e) {
            const t = this.defaultQueryOptions(e);
            void 0 === t.retry && (t.retry = !1);
            const n = this.#_.build(this, t);
            return n.isStaleByTime(t.staleTime) ? n.fetch(t) : Promise.resolve(n.state.data)
        }
        prefetchQuery(e) {
            return this.fetchQuery(e).then(Ki).catch(Ki)
        }
        fetchInfiniteQuery(e) {
            return e.behavior = Sa(e.pages), this.fetchQuery(e)
        }
        prefetchInfiniteQuery(e) {
            return this.fetchInfiniteQuery(e).then(Ki).catch(Ki)
        }
        resumePausedMutations() {
            return this.#v.resumePausedMutations()
        }
        getQueryCache() {
            return this.#_
        }
        getMutationCache() {
            return this.#v
        }
        getDefaultOptions() {
            return this.#d
        }
        setDefaultOptions(e) {
            this.#d = e
        }
        setQueryDefaults(e, t) {
            this.#E.set(ta(e), {
                queryKey: e,
                defaultOptions: t
            })
        }
        getQueryDefaults(e) {
            const t = [...this.#E.values()];
            let n = {};
            return t.forEach((t => {
                na(e, t.queryKey) && (n = {
                    ...n,
                    ...t.defaultOptions
                })
            })), n
        }
        setMutationDefaults(e, t) {
            this.#w.set(ta(e), {
                mutationKey: e,
                defaultOptions: t
            })
        }
        getMutationDefaults(e) {
            const t = [...this.#w.values()];
            let n = {};
            return t.forEach((t => {
                na(e, t.mutationKey) && (n = {
                    ...n,
                    ...t.defaultOptions
                })
            })), n
        }
        defaultQueryOptions(e) {
            if (e._defaulted) return e;
            const t = {
                ...this.#d.queries,
                ...this.getQueryDefaults(e.queryKey),
                ...e,
                _defaulted: !0
            };
            return t.queryHash || (t.queryHash = ea(t.queryKey, t)), void 0 === t.refetchOnReconnect && (t.refetchOnReconnect = "always" !== t.networkMode), void 0 === t.throwOnError && (t.throwOnError = !!t.suspense), void 0 === t.networkMode && t.persister && (t.networkMode = "offlineFirst"), t
        }
        defaultMutationOptions(e) {
            return e?._defaulted ? e : {
                ...this.#d.mutations,
                ...e?.mutationKey && this.getMutationDefaults(e.mutationKey),
                ...e,
                _defaulted: !0
            }
        }
        clear() {
            this.#_.clear(), this.#v.clear()
        }
    },
    Ta = class extends $i {
        constructor(e, t) {
            super(), this.options = t, this.#O = e, this.#x = null, this.bindMethods(), this.setOptions(t)
        }
        #O;
        #N = void 0;
        #P = void 0;
        #T = void 0;
        #I;
        #R;
        #x;
        #A;
        #D;
        #F;
        #L;
        #M;
        #U;
        #j = new Set;
        bindMethods() {
            this.refetch = this.refetch.bind(this)
        }
        onSubscribe() {
            1 === this.listeners.size && (this.#N.addObserver(this), Ia(this.#N, this.options) ? this.#q() : this.updateResult(), this.#B())
        }
        onUnsubscribe() {
            this.hasListeners() || this.destroy()
        }
        shouldFetchOnReconnect() {
            return Ra(this.#N, this.options, this.options.refetchOnReconnect)
        }
        shouldFetchOnWindowFocus() {
            return Ra(this.#N, this.options, this.options.refetchOnWindowFocus)
        }
        destroy() {
            this.listeners = new Set, this.#V(), this.#W(), this.#N.removeObserver(this)
        }
        setOptions(e, t) {
            const n = this.options,
                r = this.#N;
            if (this.options = this.#O.defaultQueryOptions(e), void 0 !== this.options.enabled && "boolean" != typeof this.options.enabled) throw new Error("Expected enabled to be a boolean");
            this.#H(), ia(this.options, n) || this.#O.getQueryCache().notify({
                type: "observerOptionsUpdated",
                query: this.#N,
                observer: this
            });
            const i = this.hasListeners();
            i && Aa(this.#N, r, this.options, n) && this.#q(), this.updateResult(t), !i || this.#N === r && this.options.enabled === n.enabled && this.options.staleTime === n.staleTime || this.#Q();
            const a = this.#z();
            !i || this.#N === r && this.options.enabled === n.enabled && a === this.#U || this.#$(a)
        }
        getOptimisticResult(e) {
            const t = this.#O.getQueryCache().build(this.#O, e),
                n = this.createResult(t, e);
            return function(e, t) {
                if (!ia(e.getCurrentResult(), t)) return !0;
                return !1
            }(this, n) && (this.#T = n, this.#R = this.options, this.#I = this.#N.state), n
        }
        getCurrentResult() {
            return this.#T
        }
        trackResult(e) {
            const t = {};
            return Object.keys(e).forEach((n => {
                Object.defineProperty(t, n, {
                    configurable: !1,
                    enumerable: !0,
                    get: () => (this.#j.add(n), e[n])
                })
            })), t
        }
        getCurrentQuery() {
            return this.#N
        }
        refetch({
                    ...e
                } = {}) {
            return this.fetch({
                ...e
            })
        }
        fetchOptimistic(e) {
            const t = this.#O.defaultQueryOptions(e),
                n = this.#O.getQueryCache().build(this.#O, t);
            return n.isFetchingOptimistic = !0, n.fetch().then((() => this.createResult(n, t)))
        }
        fetch(e) {
            return this.#q({
                ...e,
                cancelRefetch: e.cancelRefetch ?? !0
            }).then((() => (this.updateResult(), this.#T)))
        }
        #q(e) {
            this.#H();
            let t = this.#N.fetch(this.options, e);
            return e?.throwOnError || (t = t.catch(Ki)), t
        }
        #Q() {
            if (this.#V(), Gi || this.#T.isStale || !Yi(this.options.staleTime)) return;
            const e = Ji(this.#T.dataUpdatedAt, this.options.staleTime) + 1;
            this.#L = setTimeout((() => {
                this.#T.isStale || this.updateResult()
            }), e)
        }
        #z() {
            return ("function" == typeof this.options.refetchInterval ? this.options.refetchInterval(this.#N) : this.options.refetchInterval) ?? !1
        }
        #$(e) {
            this.#W(), this.#U = e, !Gi && !1 !== this.options.enabled && Yi(this.#U) && 0 !== this.#U && (this.#M = setInterval((() => {
                (this.options.refetchIntervalInBackground || da.isFocused()) && this.#q()
            }), this.#U))
        }
        #B() {
            this.#Q(), this.#$(this.#z())
        }
        #V() {
            this.#L && (clearTimeout(this.#L), this.#L = void 0)
        }
        #W() {
            this.#M && (clearInterval(this.#M), this.#M = void 0)
        }
        createResult(e, t) {
            const n = this.#N,
                r = this.options,
                i = this.#T,
                a = this.#I,
                o = this.#R,
                l = e !== n ? e.state : this.#P,
                {
                    state: s
                } = e;
            let u, {
                    error: c,
                    errorUpdatedAt: d,
                    fetchStatus: p,
                    status: h
                } = s,
                f = !1;
            if (t._optimisticResults) {
                const i = this.hasListeners(),
                    a = !i && Ia(e, t),
                    o = i && Aa(e, n, t, r);
                (a || o) && (p = fa(e.options.networkMode) ? "fetching" : "paused", s.dataUpdatedAt || (h = "pending")), "isRestoring" === t._optimisticResults && (p = "idle")
            }
            if (t.select && void 0 !== s.data)
                if (i && s.data === a?.data && t.select === this.#A) u = this.#D;
                else try {
                    this.#A = t.select, u = t.select(s.data), u = sa(i?.data, u, t), this.#D = u, this.#x = null
                } catch (e) {
                    this.#x = e
                } else u = s.data;
            if (void 0 !== t.placeholderData && void 0 === u && "pending" === h) {
                let e;
                if (i?.isPlaceholderData && t.placeholderData === o?.placeholderData) e = i.data;
                else if (e = "function" == typeof t.placeholderData ? t.placeholderData(this.#F?.state.data, this.#F) : t.placeholderData, t.select && void 0 !== e) try {
                    e = t.select(e), this.#x = null
                } catch (e) {
                    this.#x = e
                }
                void 0 !== e && (h = "success", u = sa(i?.data, e, t), f = !0)
            }
            this.#x && (c = this.#x, u = this.#D, d = Date.now(), h = "error");
            const m = "fetching" === p,
                v = "pending" === h,
                g = "error" === h,
                y = v && m;
            return {
                status: h,
                fetchStatus: p,
                isPending: v,
                isSuccess: "success" === h,
                isError: g,
                isInitialLoading: y,
                isLoading: y,
                data: u,
                dataUpdatedAt: s.dataUpdatedAt,
                error: c,
                errorUpdatedAt: d,
                failureCount: s.fetchFailureCount,
                failureReason: s.fetchFailureReason,
                errorUpdateCount: s.errorUpdateCount,
                isFetched: s.dataUpdateCount > 0 || s.errorUpdateCount > 0,
                isFetchedAfterMount: s.dataUpdateCount > l.dataUpdateCount || s.errorUpdateCount > l.errorUpdateCount,
                isFetching: m,
                isRefetching: m && !v,
                isLoadingError: g && 0 === s.dataUpdatedAt,
                isPaused: "paused" === p,
                isPlaceholderData: f,
                isRefetchError: g && 0 !== s.dataUpdatedAt,
                isStale: Da(e, t),
                refetch: this.refetch
            }
        }
        updateResult(e) {
            const t = this.#T,
                n = this.createResult(this.#N, this.options);
            if (this.#I = this.#N.state, this.#R = this.options, void 0 !== this.#I.data && (this.#F = this.#N), ia(n, t)) return;
            this.#T = n;
            const r = {};
            !1 !== e?.listeners && (() => {
                if (!t) return !0;
                const {
                    notifyOnChangeProps: e
                } = this.options, n = "function" == typeof e ? e() : e;
                if ("all" === n || !n && !this.#j.size) return !0;
                const r = new Set(n ?? this.#j);
                return this.options.throwOnError && r.add("error"), Object.keys(this.#T).some((e => {
                    const n = e;
                    return this.#T[n] !== t[n] && r.has(n)
                }))
            })() && (r.listeners = !0), this.#G({
                ...r,
                ...e
            })
        }
        #H() {
            const e = this.#O.getQueryCache().build(this.#O, this.options);
            if (e === this.#N) return;
            const t = this.#N;
            this.#N = e, this.#P = e.state, this.hasListeners() && (t?.removeObserver(this), e.addObserver(this))
        }
        onQueryUpdate() {
            this.updateResult(), this.hasListeners() && this.#B()
        }
        #G(e) {
            ya.batch((() => {
                e.listeners && this.listeners.forEach((e => {
                    e(this.#T)
                })), this.#O.getQueryCache().notify({
                    query: this.#N,
                    type: "observerResultsUpdated"
                })
            }))
        }
    };

function Ia(e, t) {
    return function(e, t) {
        return !(!1 === t.enabled || e.state.dataUpdatedAt || "error" === e.state.status && !1 === t.retryOnMount)
    }(e, t) || e.state.dataUpdatedAt > 0 && Ra(e, t, t.refetchOnMount)
}

function Ra(e, t, n) {
    if (!1 !== t.enabled) {
        const r = "function" == typeof n ? n(e) : n;
        return "always" === r || !1 !== r && Da(e, t)
    }
    return !1
}

function Aa(e, t, n, r) {
    return !1 !== n.enabled && (e !== t || !1 === r.enabled) && (!n.suspense || "error" !== e.state.status) && Da(e, n)
}

function Da(e, t) {
    return e.isStaleByTime(t.staleTime)
}
var Fa = class extends Ta {
        constructor(e, t) {
            super(e, t)
        }
        bindMethods() {
            super.bindMethods(), this.fetchNextPage = this.fetchNextPage.bind(this), this.fetchPreviousPage = this.fetchPreviousPage.bind(this)
        }
        setOptions(e, t) {
            super.setOptions({
                ...e,
                behavior: Sa()
            }, t)
        }
        getOptimisticResult(e) {
            return e.behavior = Sa(), super.getOptimisticResult(e)
        }
        fetchNextPage(e) {
            return this.fetch({
                ...e,
                meta: {
                    fetchMore: {
                        direction: "forward"
                    }
                }
            })
        }
        fetchPreviousPage(e) {
            return this.fetch({
                ...e,
                meta: {
                    fetchMore: {
                        direction: "backward"
                    }
                }
            })
        }
        createResult(e, t) {
            const {
                state: n
            } = e, r = super.createResult(e, t), {
                isFetching: i,
                isRefetching: a
            } = r, o = i && "forward" === n.fetchMeta?.fetchMore?.direction, l = i && "backward" === n.fetchMeta?.fetchMore?.direction;
            return {
                ...r,
                fetchNextPage: this.fetchNextPage,
                fetchPreviousPage: this.fetchPreviousPage,
                hasNextPage: xa(t, n.data),
                hasPreviousPage: Na(t, n.data),
                isFetchingNextPage: o,
                isFetchingPreviousPage: l,
                isRefetching: a && !o && !l
            }
        }
    },
    La = react.createContext(void 0),
    Ma = t => {
        const n = react.useContext(La);
        if (t) return t;
        if (!n) throw new Error("No QueryClient set, use QueryClientProvider to set one");
        return n
    },
    Ua = ({
              client: t,
              children: n
          }) => (react.useEffect((() => (t.mount(), () => {
        t.unmount()
    })), [t]), pe(La.Provider, {
        value: t,
        children: n
    })),
    ja = react.createContext(!1),
    qa = () => react.useContext(ja);
ja.Provider;
var Ba = react.createContext(function() {
        let e = !1;
        return {
            clearReset: () => {
                e = !1
            },
            reset: () => {
                e = !0
            },
            isReset: () => e
        }
    }()),
    Va = () => react.useContext(Ba);
var Wa = (e, t) => {
        (e.suspense || e.throwOnError) && (t.isReset() || (e.retryOnMount = !1))
    },
    Ha = t => {
        react.useEffect((() => {
            t.clearReset()
        }), [t])
    },
    Qa = ({
              result: e,
              errorResetBoundary: t,
              throwOnError: n,
              query: r
          }) => {
        return e.isError && !t.isReset() && !e.isFetching && r && (i = n, a = [e.error, r], "function" == typeof i ? i(...a) : !!i);
        var i, a
    },
    za = e => {
        e.suspense && "number" != typeof e.staleTime && (e.staleTime = 1e3)
    },
    $a = (e, t) => e?.suspense && t.isPending,
    Ga = (e, t, n) => t.fetchOptimistic(e).catch((() => {
        n.clearReset()
    }));

function Ka(t, n) {
    return function(t, n, r) {
        if ("production" !== process.env.NODE_ENV && ("object" != typeof t || Array.isArray(t))) throw new Error('Bad argument type. Starting with v5, only the "Object" form is allowed when calling query related functions. Please use the error stack to find the culprit call. More info here: https://tanstack.com/query/latest/docs/react/guides/migrating-to-v5#supports-a-single-signature-one-object');
        const i = Ma(r),
            a = qa(),
            o = Va(),
            l = i.defaultQueryOptions(t);
        l._optimisticResults = a ? "isRestoring" : "optimistic", za(l), Wa(l, o), Ha(o);
        const [s] = react.useState((() => new n(i, l))), u = s.getOptimisticResult(l);
        if (react.useSyncExternalStore(react.useCallback((e => {
            const t = a ? () => {} : s.subscribe(ya.batchCalls(e));
            return s.updateResult(), t
        }), [s, a]), (() => s.getCurrentResult()), (() => s.getCurrentResult())), react.useEffect((() => {
            s.setOptions(l, {
                listeners: !1
            })
        }), [l, s]), $a(l, u)) throw Ga(l, s, o);
        if (Qa({
            result: u,
            errorResetBoundary: o,
            throwOnError: l.throwOnError,
            query: i.getQueryCache().get(l.queryHash)
        })) throw u.error;
        return l.notifyOnChangeProps ? u : s.trackResult(u)
    }(t, Fa, n)
}
var Ya = function() {
        var e = Ct().sortOptions,
            t = et(),
            n = t.state,
            r = In(t, ["state"]),
            i = rt();
        return {
            sortBy: null == n ? void 0 : n.sortBy,
            setSortBy: function(e) {
                return i(r, {
                    state: Tn(Tn({}, n), {
                        sortBy: e
                    }),
                    replace: !0
                })
            },
            sortOptions: e
        }
    },
    Ja = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};

function Za(e) {
    return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e
}
var Xa, eo, to, no = {
    exports: {}
};
eo = Ja, to = function() {
    var e = function() {},
        t = "undefined",
        n = typeof window !== t && typeof window.navigator !== t && /Trident\/|MSIE /.test(window.navigator.userAgent),
        r = ["trace", "debug", "info", "warn", "error"],
        i = {},
        a = null;

    function o(e, t) {
        var n = e[t];
        if ("function" == typeof n.bind) return n.bind(e);
        try {
            return Function.prototype.bind.call(n, e)
        } catch (t) {
            return function() {
                return Function.prototype.apply.apply(n, [e, arguments])
            }
        }
    }

    function l() {
        console.log && (console.log.apply ? console.log.apply(console, arguments) : Function.prototype.apply.apply(console.log, [console, arguments])), console.trace && console.trace()
    }

    function s() {
        for (var n = this.getLevel(), i = 0; i < r.length; i++) {
            var a = r[i];
            this[a] = i < n ? e : this.methodFactory(a, n, this.name)
        }
        if (this.log = this.debug, typeof console === t && n < this.levels.SILENT) return "No console available for logging"
    }

    function u(e) {
        return function() {
            typeof console !== t && (s.call(this), this[e].apply(this, arguments))
        }
    }

    function c(r, i, a) {
        return function(r) {
            return "debug" === r && (r = "log"), typeof console !== t && ("trace" === r && n ? l : void 0 !== console[r] ? o(console, r) : void 0 !== console.log ? o(console, "log") : e)
        }(r) || u.apply(this, arguments)
    }

    function d(e, n) {
        var o, l, u, d = this,
            p = "loglevel";

        function h() {
            var e;
            if (typeof window !== t && p) {
                try {
                    e = window.localStorage[p]
                } catch (e) {}
                if (typeof e === t) try {
                    var n = window.document.cookie,
                        r = encodeURIComponent(p),
                        i = n.indexOf(r + "="); - 1 !== i && (e = /^([^;]+)/.exec(n.slice(i + r.length + 1))[1])
                } catch (e) {}
                return void 0 === d.levels[e] && (e = void 0), e
            }
        }

        function f(e) {
            var t = e;
            if ("string" == typeof t && void 0 !== d.levels[t.toUpperCase()] && (t = d.levels[t.toUpperCase()]), "number" == typeof t && t >= 0 && t <= d.levels.SILENT) return t;
            throw new TypeError("log.setLevel() called with invalid level: " + e)
        }
        "string" == typeof e ? p += ":" + e : "symbol" == typeof e && (p = void 0), d.name = e, d.levels = {
            TRACE: 0,
            DEBUG: 1,
            INFO: 2,
            WARN: 3,
            ERROR: 4,
            SILENT: 5
        }, d.methodFactory = n || c, d.getLevel = function() {
            return null != u ? u : null != l ? l : o
        }, d.setLevel = function(e, n) {
            return u = f(e), !1 !== n && function(e) {
                var n = (r[e] || "silent").toUpperCase();
                if (typeof window !== t && p) {
                    try {
                        return void(window.localStorage[p] = n)
                    } catch (e) {}
                    try {
                        window.document.cookie = encodeURIComponent(p) + "=" + n + ";"
                    } catch (e) {}
                }
            }(u), s.call(d)
        }, d.setDefaultLevel = function(e) {
            l = f(e), h() || d.setLevel(e, !1)
        }, d.resetLevel = function() {
            u = null,
                function() {
                    if (typeof window !== t && p) {
                        try {
                            window.localStorage.removeItem(p)
                        } catch (e) {}
                        try {
                            window.document.cookie = encodeURIComponent(p) + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC"
                        } catch (e) {}
                    }
                }(), s.call(d)
        }, d.enableAll = function(e) {
            d.setLevel(d.levels.TRACE, e)
        }, d.disableAll = function(e) {
            d.setLevel(d.levels.SILENT, e)
        }, d.rebuild = function() {
            if (a !== d && (o = f(a.getLevel())), s.call(d), a === d)
                for (var e in i) i[e].rebuild()
        }, o = f(a ? a.getLevel() : "WARN");
        var m = h();
        null != m && (u = f(m)), s.call(d)
    }(a = new d).getLogger = function(e) {
        if ("symbol" != typeof e && "string" != typeof e || "" === e) throw new TypeError("You must supply a name when creating a logger.");
        var t = i[e];
        return t || (t = i[e] = new d(e, a.methodFactory)), t
    };
    var p = typeof window !== t ? window.log : void 0;
    return a.noConflict = function() {
        return typeof window !== t && window.log === a && (window.log = p), a
    }, a.getLoggers = function() {
        return i
    }, a.default = a, a
}, (Xa = no).exports ? Xa.exports = to() : eo.log = to();
var ro = Za(no.exports),
    io = {
        debug: "color: blue",
        warn: "color: orange",
        error: "color: red"
    },
    ao = function(e, t) {
        var n = t[0],
            r = t.slice(1);
        return "string" == typeof n ? t[0] = "%c[".concat((new Date).toISOString(), "] [").concat(e.toUpperCase(), "]: ").concat(n) : t.unshift("[".concat((new Date).toISOString(), "] [").concat(e.toUpperCase(), "]:")), Fn([t[0], io[e]], Dn(r), !1)
    },
    oo = function(e) {
        return ro.setLevel(e), {
            debug: function() {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                return ro.debug.apply(ro, Fn([], Dn(ao("debug", e)), !1))
            },
            warn: function() {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                return ro.warn.apply(ro, Fn([], Dn(ao("warn", e)), !1))
            },
            error: function() {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                return ro.error.apply(ro, Fn([], Dn(ao("error", e)), !1))
            }
        }
    },
    lo = createContext(void 0),
    so = function(e) {
        var n = e.children,
            r = e.logLevel,
            i = Dn(useState(oo(r)), 2),
            a = i[0],
            o = i[1];
        return useEffect((function() {
            o(oo(r))
        }), [r]), t.createElement(lo.Provider, {
            value: a
        }, n)
    },
    uo = function() {
        return useContext(lo)
    };
var co = createContext({
        findResources: function() {
            return Promise.resolve({
                type: "ERROR",
                errorCode: "CONFIGURATION_REQUIRED"
            })
        },
        refreshResources: function() {}
    }),
    po = function(e) {
        var n = e.children,
            r = e.findResources,
            i = Dn(useState(0), 2),
            a = i[0],
            o = i[1];
        return t.createElement(co.Provider, {
            value: {
                resourceRefreshSeed: a,
                findResources: r,
                refreshResources: function() {
                    return o((function(e) {
                        return e + 1
                    }))
                }
            }
        }, n)
    },
    ho = function(e, t) {
        var n = uo(),
            i = useContext(co),
            a = i.findResources,
            o = i.resourceRefreshSeed,
            l = Ya().sortBy,
            s = Tn({
                sort: l,
                locale: "en-US"
            }, e),
            u = Ma(),
            c = Ka({
                enabled: !(null == t ? void 0 : t.skip),
                queryKey: fo(s, o),
                queryFn: function(e) {
                    return Rn(void 0, void 0, void 0, (function() {
                        var t, r, i;
                        return An(this, (function(o) {
                            switch (o.label) {
                                case 0:
                                    return null == n || n.debug("Sending request", s), [4, a(Tn(Tn({}, s), {
                                        continuation: e.pageParam
                                    }))];
                                case 1:
                                    if ("ERROR" === (t = o.sent()).type) throw r = "Error occurred while finding resources: ".concat(t.errorCode), null == n || n.error(r), new Error(r);
                                    return [4, Promise.all(t.resources.map((function(e) {
                                        return function(e) {
                                            if ("UNKNOWN" === e.type || "CONTAINER" === e.type) return Promise.resolve(e);
                                            var t = e.thumbnail;
                                            return new Promise((function(n) {
                                                if ((null == t ? void 0 : t.width) && (null == t ? void 0 : t.height)) n(e);
                                                else {
                                                    ("IMAGE" === e.type || "VIDEO" === e.type) && e.width && e.height && n(Tn(Tn({}, e), {
                                                        thumbnail: {
                                                            url: null == t ? void 0 : t.url,
                                                            width: e.width,
                                                            height: e.height
                                                        }
                                                    }));
                                                    var r = document.createElement("img");
                                                    r.src = (null == t ? void 0 : t.url) || e.url, r.onload = function() {
                                                        n(Tn(Tn({}, e), {
                                                            thumbnail: {
                                                                url: null == t ? void 0 : t.url,
                                                                width: r.naturalWidth,
                                                                height: r.naturalHeight
                                                            }
                                                        }))
                                                    }, r.onerror = function() {
                                                        if ("VIDEO" === e.type) {
                                                            var r = document.createElement("video");
                                                            r.src = e.previewUrl || e.url, r.onload = function() {
                                                                n(Tn(Tn({}, e), {
                                                                    thumbnail: {
                                                                        url: null == t ? void 0 : t.url,
                                                                        width: r.videoWidth,
                                                                        height: r.videoHeight
                                                                    }
                                                                }))
                                                            }, r.onerror = function() {
                                                                n(Tn(Tn({}, e), {
                                                                    thumbnail: {
                                                                        url: null == t ? void 0 : t.url,
                                                                        width: 100,
                                                                        height: 100
                                                                    }
                                                                }))
                                                            }
                                                        } else n(Tn(Tn({}, e), {
                                                            thumbnail: {
                                                                url: null == t ? void 0 : t.url,
                                                                width: 100,
                                                                height: 100
                                                            }
                                                        }))
                                                    }
                                                }
                                            }))
                                        }(e).catch((function() {
                                            return e
                                        }))
                                    })))];
                                case 2:
                                    return i = o.sent(), null == n || n.debug("Received response:", t), [2, Tn(Tn({}, t), {
                                        resources: i
                                    })]
                            }
                        }))
                    }))
                },
                getNextPageParam: function(e) {
                    return e.continuation
                },
                initialPageParam: void 0
            }),
            d = c.data,
            p = c.isLoading,
            f = c.isError,
            m = c.hasNextPage,
            v = c.fetchNextPage,
            g = c.isFetchingNextPage;
        useEffect((function() {
            f && u.clear()
        }), [f, u]);
        var y = (null == d ? void 0 : d.pages) ? d.pages.flatMap((function(e) {
            var t;
            return null === (t = e.resources) || void 0 === t ? void 0 : t.filter((function(e) {
                return null != e
            })).filter((function(e) {
                return "UNKNOWN" !== (null == e ? void 0 : e.type)
            })).sort((function(e, t) {
                return "AUDIO" !== e.type && "AUDIO" !== t.type || e.type === t.type ? 0 : "AUDIO" === e.type ? 1 : "AUDIO" === t.type ? -1 : 0
            }))
        })) : [];
        return {
            results: y,
            isLoading: p,
            isError: f,
            hasNextPage: m,
            isFetchingNextPage: g,
            isEmpty: y.length < 1,
            fetchNextPage: v
        }
    };

function fo(e, t) {
    var n = e.locale,
        r = e.types,
        i = e.containerId,
        a = e.parentContainerType,
        o = e.containerTypes,
        l = e.query,
        s = e.sort,
        u = e.filters,
        c = e.limit,
        d = e.tab;
    return [n, i, a, l, u && JSON.stringify(u), s, r && r.join("_"), o && o.join("_"), c, d, t]
}
var mo = "no_result_noResult__7et8N";
St(".no_result_noResult__7et8N p {\n  text-align: center;\n  margin-top: var(--ui-kit-space-2);\n}\n");
var vo = function(e) {
        var n = e.children,
            r = void 0 === n ? "There's nothing here." : n;
        return t.createElement(Box, {
            height: "full",
            width: "full",
            className: mo
        }, t.createElement(Text, null, r))
    },
    go = function(e) {
        var n = e.selectedContainer,
            r = e.onContainerChange,
            i = e.containerType,
            a = Ct().containerTypes,
            o = uo(),
            l = Dn(useState(n), 2),
            s = l[0],
            u = l[1],
            c = userRef(null),
            d = null == a ? void 0 : a.find((function(e) {
                return e.value === i
            })),
            p = Dn(useState(0), 2),
            v = p[0],
            g = p[1],
            y = function() {
                if (c.current) {
                    var e = c.current.getBoundingClientRect();
                    g(e.bottom + 4)
                }
            };
        useEffect((function() {
            var e = document.querySelector("#filterFormScroll");
            if (e) return y(), e.addEventListener("scroll", y),
                function() {
                    e.removeEventListener("scroll", y)
                }
        }), []);
        var _ = ho({
                types: ["CONTAINER"],
                containerTypes: [i],
                limit: 10
            }, {
                skip: !d
            }),
            E = _.results,
            w = _.isLoading,
            C = _.isFetchingNextPage,
            N = _.hasNextPage,
            P = _.fetchNextPage;
        return d ? t.createElement(FormField, {
            label: d.label,
            control: function() {
                return t.createElement(Ui, {
                    style: {
                        position: "relative"
                    }
                }, (function(e) {
                    var a, o, l = e.open;
                    return t.createElement(t.Fragment, null, t.createElement("div", {
                        style: {
                            width: "100%"
                        }
                    }, t.createElement(Ui.Button, {
                        as: "div"
                    }, t.createElement("div", {
                        className: qi,
                        ref: c
                    }, t.createElement(Text, null, (null == n ? void 0 : n.name) || "All ".concat(d.label.toLowerCase())), t.createElement(ChevronDownIcon, null)))), l && t.createElement(t.Fragment, null, t.createElement(Ui.Overlay, null), t.createElement(Ui.Panel, {
                        className: Bi,
                        style: {
                            top: "".concat(v, "px"),
                            width: "".concat((null === (o = null === (a = c.current) || void 0 === a ? void 0 : a.getBoundingClientRect()) || void 0 === o ? void 0 : o.width) || 300, "px")
                        }
                    }, (function(e) {
                        var n = e.close;
                        return w || (null == E ? void 0 : E.length) ? s ? t.createElement("div", {
                            className: Vi
                        }, t.createElement("div", {
                            className: Qi
                        }, t.createElement(Rows, {
                            spacing: "1u"
                        }, t.createElement(Columns, {
                            spacing: "1u",
                            alignY: "center",
                            align: "start"
                        }, t.createElement(Column, {
                            width: "content"
                        }, t.createElement(Button, {
                            onClick: function() {
                                return u(void 0)
                            },
                            icon: ArrowLeftIcon,
                            variant: "tertiary"
                        })), t.createElement(Column, null, t.createElement(Title, {
                            size: "xsmall"
                        }, s.name))), t.createElement("div", {
                            className: zi
                        }, t.createElement(Text, null, "Filter results from this ", i)), t.createElement(Button, {
                            variant: "primary",
                            stretch: !0,
                            onClick: function() {
                                r(s), n()
                            }
                        }, "Select")))) : t.createElement("div", {
                            className: Vi
                        }, t.createElement("div", {
                            className: ji
                        }, t.createElement("div", {
                            key: "all containers",
                            onClick: function() {
                                r(void 0), n()
                            },
                            className: Wi
                        }, t.createElement(Text, null, "All ".concat(d.label.toLowerCase()))), E.map((function(e) {
                            return t.createElement("div", {
                                key: e.id,
                                onClick: function() {
                                    u({
                                        id: e.id,
                                        type: i,
                                        name: e.name
                                    })
                                },
                                className: Wi
                            }, t.createElement(Text, {
                                lineClamp: 1
                            }, e.name))
                        })), N && P && !C && t.createElement("div", {
                            className: Hi
                        }, t.createElement(Button, {
                            variant: "secondary",
                            onClick: function() {
                                P()
                            },
                            stretch: !0
                        }, "View More")), (w || C) && t.createElement(Rows, {
                            spacing: "2u"
                        }, Array.from({
                            length: 4
                        }).map((function(e, n) {
                            return t.createElement("div", {
                                key: n,
                                style: {
                                    height: "calc(".concat(tokens.baseUnit, " * 4)"),
                                    width: "100%",
                                    padding: "0 ".concat(tokens.space2)
                                }
                            }, t.createElement(PlaceHolder, {
                                shape: "rectangle"
                            }))
                        }))))) : t.createElement("div", {
                            className: Vi
                        }, t.createElement("div", {
                            className: Qi
                        }, t.createElement(vo, null)))
                    }))))
                }))
            }
        }) : (null == o || o.error("Please choose a valid container type for filtering. The container type should be one of the config.containerTypes values."), null)
    },
    yo = function(e) {
        var n, r = e.filterConfig,
            i = e.filterValue,
            a = e.setFilterValue;
        return lr(r) ? null : or(r) ? t.createElement(FormField, {
            label: r.label,
            control: function() {
                return t.createElement(Rows, {
                    spacing: "0.5u"
                }, t.createElement(TitlePlaceholder, null), t.createElement(TitlePlaceholder, null), t.createElement(TitlePlaceholder, null))
            }
        }) : (null === (n = r.options) || void 0 === n ? void 0 : n.length) ? t.createElement(FormField, {
            label: r.label,
            control: function() {
                var e;
                return t.createElement(t.Fragment, null, t.createElement(CheckboxGroup, {
                    options: r.options || [],
                    value: (null == i ? void 0 : i.selected) || [],
                    onChange: function(e) {
                        return a({
                            selected: e
                        })
                    }
                }), r.allowCustomValue && t.createElement(TextInput, {
                    placeholder: "Enter additional values separated by ,",
                    value: null === (e = null == i ? void 0 : i.customValues) || void 0 === e ? void 0 : e.join(","),
                    onChange: function(e) {
                        return a(Tn(Tn({}, i), {
                            customValues: e.split(",")
                        }))
                    },
                    onKeyDown: function(e) {
                        return e.stopPropagation()
                    }
                }))
            }
        }) : null
    },
    bo = function(e) {
        var n = e.value,
            r = e.onChange,
            i = e.showError;
        return t.createElement(TextInput, {
            value: n,
            onChange: function(e) {
                var t, n = (t = e.replace(/[^\d]/g, "")).length <= 2 ? t : t.length <= 4 ? "".concat(t.slice(0, 2), "/").concat(t.slice(2)) : "".concat(t.slice(0, 2), "/").concat(t.slice(2, 4), "/").concat(t.slice(4, 8));
                r(n)
            },
            placeholder: "DD/MM/YYYY",
            error: i && !_o(n),
            onKeyDown: function(e) {
                return e.stopPropagation()
            }
        })
    };

function _o(e) {
    if (!e) return !0;
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(e)) return !1;
    var t = e.split("/"),
        n = parseInt(t[0], 10),
        r = parseInt(t[1], 10) - 1,
        i = parseInt(t[2], 10);
    if (isNaN(n) || isNaN(r) || isNaN(i)) return !1;
    var a = new Date(i, r, n);
    return a.getFullYear() === i && a.getMonth() === r && a.getDate() === n
}
var Eo, wo = "custom_radio_value_input_customSizeInputGroup__pxJv3",
    Co = "custom_radio_value_input_inputContainer__Rxo8a",
    So = "custom_radio_value_input_iconContainer__QzHUi";

function ko() {
    return ko = Object.assign ? Object.assign.bind() : function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
        }
        return e
    }, ko.apply(this, arguments)
}
St(".custom_radio_value_input_customSizeInputGroup__pxJv3 {\n  margin-left: calc(var(--ui-kit-space-1) * 3.5);\n}\n\n.custom_radio_value_input_inputContainer__Rxo8a {\n  position: relative;\n}\n\n.custom_radio_value_input_iconContainer__QzHUi {\n  position: absolute;\n  top: var(--ui-kit-base-unit);\n  right: var(--ui-kit-base-unit);\n  padding: var(--ui-kit-space-050) var(--ui-kit-space-050);\n  z-index: 24;\n}\n\n.custom_radio_value_input_iconContainer__QzHUi svg {\n  width: calc(var(--ui-kit-base-unit) * 2);\n  height: calc(var(--ui-kit-base-unit) * 2);\n}\n");
var Oo = function(t) {
        return react.createElement("svg", ko({
            xmlns: "http://www.w3.org/2000/svg",
            width: 13,
            height: 10,
            fill: "none"
        }, t), Eo || (Eo = react.createElement("path", {
            fill: "var(--ui-kit-color-typography-primary,#0D1216",
            fillOpacity: .7,
            d: "M.513 9.62V.536h.955v.967l.123.023C2.071.785 2.777.414 3.707.414c.539 0 1.01.123 1.412.37.402.245.715.62.937 1.124.223.5.334 1.121.334 1.863 0 .739-.117 1.358-.351 1.858-.235.5-.559.875-.973 1.125-.414.246-.89.37-1.43.37-.437 0-.826-.077-1.166-.23a2.161 2.161 0 0 1-.879-.75l-.123.024v3.451H.513m2.912-3.352c1.309 0 1.963-.832 1.963-2.497 0-1.667-.654-2.501-1.963-2.501-.383 0-.72.087-1.013.263-.293.176-.524.451-.692.826-.168.371-.252.842-.252 1.412 0 .567.084 1.038.252 1.413.168.37.399.644.692.82.293.176.63.264 1.013.264M8.318 7H7.263l1.998-3.352L7.363.538H8.44L9.935 3.02h.135l1.5-2.484H12.6L10.75 3.648 12.702 7h-1.078l-1.594-2.73h-.135L8.318 7"
        })))
    },
    xo = function(e) {
        var n, r = e.inputType,
            i = e.values,
            a = e.onChange;
        return "SIZE_RANGE" === r ? t.createElement("div", {
            className: wo
        }, t.createElement(Columns, {
            spacing: "1u"
        }, t.createElement(Column, null, t.createElement(No, {
            label: "From",
            value: null == i ? void 0 : i[0],
            onChange: function(e) {
                return a([e, null == i ? void 0 : i[1]])
            }
        })), t.createElement(Column, null, t.createElement(No, {
            label: "To",
            value: null == i ? void 0 : i[1],
            onChange: function(e) {
                return a([null == i ? void 0 : i[0], e])
            }
        })))) : "DATE_RANGE" === r ? t.createElement(Rows, {
            spacing: "1u"
        }, t.createElement(FormField, {
            label: "From",
            control: function() {
                var e;
                return t.createElement(bo, {
                    value: null === (e = null == i ? void 0 : i[0]) || void 0 === e ? void 0 : e.toString(),
                    onChange: function(e) {
                        return a([e, null == i ? void 0 : i[1]])
                    }
                })
            }
        }), t.createElement(FormField, {
            label: "To",
            control: function() {
                var e;
                return t.createElement(bo, {
                    value: null === (e = null == i ? void 0 : i[1]) || void 0 === e ? void 0 : e.toString(),
                    onChange: function(e) {
                        return a([null == i ? void 0 : i[0], e])
                    }
                })
            }
        })) : "PLAIN_TEXT" === r ? t.createElement(TextInput, {
            value: null === (n = null == i ? void 0 : i[0]) || void 0 === n ? void 0 : n.toString(),
            onChange: function(e) {
                return a([e])
            },
            placeholder: "Enter custom value",
            onKeyDown: function(e) {
                return e.stopPropagation()
            }
        }) : void 0
    },
    No = function(e) {
        var n = e.label,
            r = e.value,
            i = e.onChange;
        return t.createElement(FormField, {
            label: n,
            control: function() {
                return t.createElement("div", {
                    className: Co
                }, t.createElement(NumberInput, {
                    value: r,
                    onChange: i,
                    placeholder: n,
                    id: n,
                    onKeyDown: function(e) {
                        return e.stopPropagation()
                    }
                }), t.createElement("div", {
                    className: So,
                    style: {
                        paddingTop: "var(--ui-kit-space-050)"
                    }
                }, t.createElement(Oo, {
                    size: "small"
                })))
            }
        })
    },
    Po = function(e) {
        var n, r = e.filterConfig,
            i = e.filterValue,
            a = e.onFilterValueChange;
        return lr(r) ? null : or(r) ? t.createElement(FormField, {
            label: r.label,
            control: function() {
                return t.createElement(Rows, {
                    spacing: "0.5u"
                }, t.createElement(TitlePlaceholder, null), t.createElement(TitlePlaceholder, null), t.createElement(TitlePlaceholder, null))
            }
        }) : (null === (n = r.options) || void 0 === n ? void 0 : n.length) ? t.createElement(Rows, {
            spacing: "1u"
        }, t.createElement(FormField, {
            label: r.label,
            control: function() {
                var e, n, o, l, s;
                return t.createElement(RadioGroup, {
                    options: (n = r.options || [], o = r.allowCustomValue, s = n.map((function(e) {
                        return {
                            value: e.value,
                            label: e.label || e.value
                        }
                    })), s.unshift({
                        value: ir.ALL,
                        label: "All"
                    }), o && s.push({
                        value: ir.CUSTOM,
                        label: l || "Custom"
                    }), s),
                    onChange: function(e) {
                        a(Tn(Tn({}, i), {
                            selected: [e]
                        }))
                    },
                    value: null === (e = null == i ? void 0 : i.selected) || void 0 === e ? void 0 : e[0]
                })
            }
        }), function(e) {
            var t;
            return (null === (t = null == e ? void 0 : e.selected) || void 0 === t ? void 0 : t[0]) === ir.CUSTOM
        }(i) && r.allowCustomValue && t.createElement(xo, {
            inputType: r.customValueInputType,
            values: i.customValues,
            onChange: function(e) {
                return a({
                    selected: ["custom"],
                    customValues: e
                })
            }
        })) : null
    };

function To(e) {
    var t, n, r = "";
    if ("string" == typeof e || "number" == typeof e) r += e;
    else if ("object" == typeof e)
        if (Array.isArray(e))
            for (t = 0; t < e.length; t++) e[t] && (n = To(e[t])) && (r && (r += " "), r += n);
        else
            for (t in e) e[t] && (r && (r += " "), r += t);
    return r
}

function Io() {
    for (var e, t, n = 0, r = ""; n < arguments.length;)(e = arguments[n++]) && (t = To(e)) && (r && (r += " "), r += t);
    return r
}
var Ro = createContext({
        filterButtonStatus: "disable"
    }),
    Ao = function(e) {
        var n = e.filterFormConfig,
            r = e.findFilterOptions,
            a = e.children,
            o = Dn(useState("unknown"), 2),
            l = o[0],
            s = o[1],
            u = Dn(useState(), 2),
            c = u[0],
            d = u[1],
            p = Dn(useState(n), 2),
            f = p[0],
            v = p[1],
            g = useMemo((function() {
                return Fo(n)
            }), [n]),
            y = useMemo((function() {
                return qo(n)
            }), [n]),
            b = useMemo((function() {
                return Bo(n)
            }), [n]),
            _ = Dn(useState(!1), 2),
            E = _[0],
            w = _[1],
            C = uo();
        return useEffect((function() {
            y && (b && s("unknown"), w(!0), v((function(e) {
                return Vo(e)
            })))
        }), [y, c, b]), useEffect((function() {
            n && (r && (null == g ? void 0 : g.length) ? g.forEach((function(e) {
                if (!e.status || "loading" === e.status) {
                    var t = e.reloadOnContainerChange ? c : void 0;
                    r(e.key, t).then((function(t) {
                        (null == t ? void 0 : t.length) ? v((function(n) {
                            return jo(n || {}, e, "ready", t)
                        })): v((function(n) {
                            return jo(n || {}, e, "empty", t)
                        }))
                    })).catch((function(t) {
                        null == C || C.error("Failed to load filter options for key:".concat(e.key, " label: ").concat(e.label, "."), t), v((function(t) {
                            return jo(t || {}, e, "error")
                        }))
                    }))
                }
            })) : v((function(e) {
                return Lo(e)
            })))
        }), [c, n, g, r, E, C]), useEffect((function() {
            "unknown" === l && (n ? f && Mo(f) ? s("enable") : f && Uo(f) && s("disable") : s("disable"))
        }), [n, f, l]), t.createElement(Ro.Provider, {
            value: {
                filterButtonStatus: l,
                onContainerChange: d,
                filterFormConfig: f
            }
        }, a)
    },
    Do = function() {
        var e = useContext(Ro);
        if (!e) throw new Error("useFilters must be used within a FiltersProvider");
        return {
            filterButtonStatus: e.filterButtonStatus,
            filterFormConfig: e.filterFormConfig,
            onContainerChange: e.onContainerChange
        }
    },
    Fo = function(e) {
        var t;
        return (null === (t = null == e ? void 0 : e.filters) || void 0 === t ? void 0 : t.filter((function(e) {
            return !0 === e.dynamicOptions
        }))) || []
    },
    Lo = function(e) {
        return e && e.filters ? {
            containerTypes: e.containerTypes,
            filters: e.filters.filter((function(e) {
                return !e.dynamicOptions
            }))
        } : e
    },
    Mo = function(e) {
        var t, n;
        return !!(null === (t = e.containerTypes) || void 0 === t ? void 0 : t.length) || !!(null === (n = e.filters) || void 0 === n ? void 0 : n.some((function(e) {
            var t;
            return (null === (t = null == e ? void 0 : e.options) || void 0 === t ? void 0 : t.length) && !(e.dynamicOptions && "loading" === e.status)
        })))
    },
    Uo = function(e) {
        var t, n, r;
        return !(null === (t = null == e ? void 0 : e.containerTypes) || void 0 === t ? void 0 : t.length) && (!(null === (n = null == e ? void 0 : e.filters) || void 0 === n ? void 0 : n.some(or)) && !(null === (r = null == e ? void 0 : e.filters) || void 0 === r ? void 0 : r.some((function(e) {
            var t;
            return null === (t = e.options) || void 0 === t ? void 0 : t.length
        }))))
    },
    jo = function(e, t, n, r) {
        var i, a = null === (i = e.filters) || void 0 === i ? void 0 : i.findIndex((function(e) {
            return e.key === t.key
        }));
        return void 0 === a || -1 === a ? e : Tn(Tn({}, e), {
            filters: (null == e ? void 0 : e.filters) ? Fn(Fn(Fn([], Dn(e.filters.slice(0, a)), !1), [Tn(Tn({}, t), {
                status: n,
                options: r
            })], !1), Dn(e.filters.slice(a + 1)), !1) : void 0
        })
    },
    qo = function(e) {
        var t;
        return !!e && (null === (t = e.filters) || void 0 === t ? void 0 : t.some((function(e) {
            return e.dynamicOptions && e.reloadOnContainerChange
        })))
    },
    Bo = function(e) {
        var t, n;
        return !(!e || (null === (t = e.containerTypes) || void 0 === t ? void 0 : t.length)) && !(null === (n = e.filters) || void 0 === n ? void 0 : n.some((function(e) {
            return !(e.dynamicOptions && e.reloadOnContainerChange)
        })))
    },
    Vo = function(e) {
        var t;
        if (e) return Tn(Tn({}, e), {
            filters: null === (t = e.filters) || void 0 === t ? void 0 : t.map((function(e) {
                return e.dynamicOptions && e.reloadOnContainerChange ? Tn(Tn({}, e), {
                    status: "loading"
                }) : e
            }))
        })
    },
    Wo = function(e) {
        var n, r, i = e.selectedFilters,
            a = e.setSelectedFilters,
            o = e.onSubmitFilters,
            l = Do(),
            s = l.filterButtonStatus,
            u = l.filterFormConfig,
            c = l.onContainerChange;
        return useEffect((function() {
            null == c || c(null == i ? void 0 : i.container)
        }), [i, c]), "enable" !== s ? null : t.createElement(t.Fragment, null, t.createElement("div", {
            className: pr,
            id: "filterFormScroll"
        }, t.createElement(Rows, {
            spacing: "3u"
        }, (null === (n = null == u ? void 0 : u.containerTypes) || void 0 === n ? void 0 : n.length) && t.createElement(go, {
            containerType: u.containerTypes[0],
            onContainerChange: function(e) {
                a(Tn(Tn({}, i), {
                    container: e
                })), null == c || c(e)
            },
            selectedContainer: null == i ? void 0 : i.container
        }), null === (r = null == u ? void 0 : u.filters) || void 0 === r ? void 0 : r.map((function(e, n) {
            var r, o, l, s;
            return "PILLS" === e.filterType ? t.createElement(sr, {
                key: "filter-".concat(n),
                filterConfig: e,
                filterValue: null === (o = null === (r = null == i ? void 0 : i.selectedOptions) || void 0 === r ? void 0 : r[e.key]) || void 0 === o ? void 0 : o.selected,
                setFilterValue: function(t) {
                    var n;
                    return a(Tn(Tn({}, i), {
                        selectedOptions: Tn(Tn({}, null == i ? void 0 : i.selectedOptions), (n = {}, n[e.key] = {
                            selected: t || []
                        }, n))
                    }))
                }
            }) : "CHECKBOX" === e.filterType ? t.createElement(yo, {
                key: "filter-".concat(n),
                filterConfig: e,
                filterValue: null === (l = null == i ? void 0 : i.selectedOptions) || void 0 === l ? void 0 : l[e.key],
                setFilterValue: function(t) {
                    var n;
                    return a(Tn(Tn({}, i), {
                        selectedOptions: Tn(Tn({}, null == i ? void 0 : i.selectedOptions), (n = {}, n[e.key] = t, n))
                    }))
                }
            }) : "RADIO" === e.filterType ? t.createElement(Po, {
                key: "filter-".concat(n),
                filterConfig: e,
                filterValue: null === (s = null == i ? void 0 : i.selectedOptions) || void 0 === s ? void 0 : s[e.key],
                onFilterValueChange: function(t) {
                    var n;
                    return a(Tn(Tn({}, i), {
                        selectedOptions: Tn(Tn({}, null == i ? void 0 : i.selectedOptions), (n = {}, n[e.key] = t, n))
                    }))
                }
            }) : void 0
        })))), t.createElement("div", {
            className: Io(cr, Xn() && dr)
        }, t.createElement(Columns, {
            spacing: "1u",
            align: "start"
        }, t.createElement(Column, null, t.createElement(Button, {
            variant: "secondary",
            onClick: function() {
                return a({})
            },
            stretch: !0
        }, "Clear all")), t.createElement(Column, null, t.createElement(Button, {
            variant: "primary",
            onClick: function() {
                o(i)
            },
            stretch: !0
        }, "Apply")))))
    },
    Ho = function(e, t) {
        if (!e || !e.selectedOptions || !t) return e;
        var n = Object.keys(e.selectedOptions).reduce((function(e, n) {
                var r, i = null === (r = t.filters) || void 0 === r ? void 0 : r.find((function(e) {
                    return e.key === n && e.dynamicOptions && e.reloadOnContainerChange
                }));
                return i && (e[n] = i), e
            }), {}),
            r = Object.entries(e.selectedOptions).reduce((function(e, t) {
                var r, i = Dn(t, 2),
                    a = i[0],
                    o = i[1];
                return n[a] ? e[a] = {
                    selected: null === (r = o.selected) || void 0 === r ? void 0 : r.filter((function(e) {
                        var t;
                        return null === (t = n[a].options) || void 0 === t ? void 0 : t.find((function(t) {
                            return t.value === e
                        }))
                    })),
                    customValues: o.customValues
                } : e[a] = o, e
            }), {});
        return {
            container: e.container,
            selectedOptions: r
        }
    };

function Qo(e) {
    if (!e) return 0;
    var t = 0;
    if (e.container && t++, e.selectedOptions) {
        var n = e.selectedOptions;
        Object.keys(n).forEach((function(e) {
            var r, i, a, o;
            (null === (r = n[e].selected) || void 0 === r ? void 0 : r[0]) !== ir.ALL && (null === (i = n[e].selected) || void 0 === i ? void 0 : i[0]) !== ir.CUSTOM && (t += (null === (a = n[e].selected) || void 0 === a ? void 0 : a.length) || 0), t += (null === (o = n[e].customValues) || void 0 === o ? void 0 : o.length) || 0
        }))
    }
    return t
}
var zo = function(e) {
        var n = e.defaultQuery,
            r = e.defaultFilters,
            i = e.onSearchSubmit,
            a = e.disabled,
            o = e.placeholder,
            l = Dn(useState(), 2),
            s = l[0],
            u = l[1],
            c = Dn(useState(), 2),
            d = c[0],
            p = c[1],
            v = Dn(useState(!0), 2),
            g = v[0],
            y = v[1],
            b = Dn(useState(!1), 2),
            S = b[0],
            k = b[1];
        useEffect((function() {
            return p(r)
        }), [r]), useEffect((function() {
            return u(n)
        }), [n]);
        var O = Do(),
            N = O.filterButtonStatus,
            P = O.filterFormConfig,
            T = Dn(useState(0), 2),
            I = T[0],
            R = T[1];
        useEffect((function() {
            R(Qo(Ho(d, P)) || 0)
        }), [P, d]);
        var D = function(e) {
                (e || n) && (y(!0), i({
                    query: e,
                    filters: d
                }))
            },
            F = userRef(null);
        return t.createElement("form", {
            onSubmit: function(e) {
                return e.preventDefault()
            },
            style: {
                position: "relative"
            }
        }, t.createElement("div", {
            ref: F
        }, t.createElement(TextInput, {
            value: s,
            start: function() {
                return t.createElement(Box, {
                    paddingStart: "0.5u"
                }, t.createElement(SearchIcon, null))
            },
            disabled: a,
            onChange: function(e) {
                return u(e)
            },
            placeholder: o || Mn(),
            onKeyDown: function(e) {
                var t = e.key;
                g && y(!1), "Enter" === t && D(s || "")
            },
            end: t.createElement(t.Fragment, null, s && t.createElement(ClearDecorator, {
                onClear: function() {
                    u(""), D("")
                }
            }), "unknown" === N && t.createElement(Box, {
                className: jn
            }, t.createElement(PlaceHolder, {
                shape: "square"
            })), "enable" === N && t.createElement(Box, {
                className: Un
            }, I > 0 && t.createElement(Badge, {
                tone: "assist",
                shape: "circle",
                ariaLabel: "".concat(I, " filters selected"),
                text: I.toString()
            }, t.createElement(Button, {
                onClick: function() {
                    return k((function(e) {
                        return !e
                    }))
                },
                icon: V,
                variant: "tertiary",
                ariaLabel: "Filter results"
            })), 0 === I && t.createElement(Button, {
                onClick: function() {
                    return k((function(e) {
                        return !e
                    }))
                },
                icon: V,
                variant: "tertiary",
                ariaLabel: "Filter results"
            })))
        })), s && !g && t.createElement(zn, {
            searchQuery: s,
            onSubmit: function() {
                return D(s)
            },
            onCancel: function() {
                return y(!0)
            }
        }), "enable" === N && t.createElement(er, {
            open: S,
            searchboxReference: F,
            onClose: function() {
                return k(!1)
            }
        }, t.createElement(Wo, {
            onSubmitFilters: function(e) {
                p(e), i({
                    query: s,
                    filters: e
                }), k(!1)
            },
            selectedFilters: d,
            setSelectedFilters: p
        })))
    },
    $o = function(e) {
        var n, r = e.onSearchResultPage,
            i = e.container,
            a = Ct(),
            o = a.search,
            l = a.serviceName,
            s = a.containerTypes,
            u = rt(),
            c = et().state || {},
            d = c.query,
            p = c.filters,
            h = Ln(),
            f = Do().filterFormConfig;
        if (!o || !o.enabled) return null;
        var m = s && i ? s.find((function(e) {
                return e.value.toLowerCase() === i.containerType.toLowerCase()
            })) : void 0,
            v = o.placeholder || "Search from ".concat(l);
        (null === (n = null == m ? void 0 : m.searchInsideContainer) || void 0 === n ? void 0 : n.enabled) && (v = m.searchInsideContainer.placeholder || "Search from ".concat(null == i ? void 0 : i.name));
        return t.createElement(zo, {
            placeholder: v,
            onSearchSubmit: function(e) {
                var t, n = e.query,
                    a = e.filters,
                    o = !n && Qo(Ho(a, f)) < 1;
                !r && o || (r && o ? u(-1) : h("/search", {
                    state: {
                        query: n,
                        filters: Ho(a),
                        container: (null === (t = null == m ? void 0 : m.searchInsideContainer) || void 0 === t ? void 0 : t.enabled) ? i : void 0
                    },
                    replace: r
                }))
            },
            defaultFilters: p,
            defaultQuery: d,
            filterConfig: o.filterFormConfig
        })
    },
    Go = "tooltip_tooltipButton__ymfHQ";
St(".tooltip_tooltipButton__ymfHQ button {\n  cursor: default !important;\n  background-color: transparent !important;\n}\n");
var Ko = function(e) {
        var n = e.Icon,
            r = void 0 === n ? W : n,
            i = e.message;
        return t.createElement(Box, {
            className: Go
        }, t.createElement(Button, {
            variant: "tertiary",
            icon: r,
            tooltipLabel: i
        }))
    },
    Yo = "sort_sortContainer__PiqI-";
St(".sort_sortContainer__PiqI- {\n  position: relative;\n}\n\n.sort_sortContainer__PiqI- button > span:first-child {\n  padding-left: var(--ui-kit-space-3);\n}\n\n.sort_sortContainer__PiqI- > span {\n  position: absolute;\n  bottom: var(--ui-kit-space-1);\n  left: var(--ui-kit-space-1);\n}\n");
var Jo, Zo = function(e) {
        var n = e.options,
            r = e.setSelectedSortOption,
            i = e.selectedSortOption;
        return t.createElement("div", {
            className: Yo
        }, t.createElement(H, {
            stretch: !0,
            options: n,
            onChange: r,
            value: i
        }), t.createElement(Q, null))
    },
    Xo = function() {
        var e = Ya(),
            n = e.sortOptions,
            r = e.sortBy,
            i = e.setSortBy;
        return (null == n ? void 0 : n.length) ? t.createElement(Zo, {
            options: n,
            selectedSortOption: r,
            setSelectedSortOption: i
        }) : null
    },
    el = function() {
        var e = Dn(useState(!1), 2),
            n = e[0],
            r = e[1],
            i = userRef(null),
            a = useCallback((function() {
                if (i.current) {
                    var e = i.current.scrollTop <= 48;
                    e || (i.current.style.paddingTop = "".concat(48, "px")), e && (i.current.style.paddingTop = "0"), r(!e)
                }
            }), []);
        return t.useEffect((function() {
            var e = i.current;
            return null == e || e.addEventListener("scroll", a),
                function() {
                    null == e || e.removeEventListener("scroll", a)
                }
        }), [a]), {
            scrollRef: i,
            hide: n
        }
    };
! function(e) {
    e.ALL = "all", e.ASSET = "asset"
}(Jo || (Jo = {}));
var tl = "tabbed_page_tabbedPage__7LR-W",
    nl = "tabbed_page_tabContent__AFE4z",
    rl = "tabbed_page_tabContentWithTitle__-ukVy",
    il = "tabbed_page_inactiveTab__9-3AQ";
St('.tabbed_page_tabbedPage__7LR-W {\n  height: 100%;\n}\n\n.tabbed_page_tabContent__AFE4z {\n  padding: var(--ui-kit-space-1) 0 0;\n}\n\n.tabbed_page_tabContentWithTitle__-ukVy {\n  padding-top: 0;\n}\n\n.tabbed_page_inactiveTab__9-3AQ {\n  display: none;\n}\n\n.tabbed_page_tabHeader__p-3bJ div[role="tablist"] {\n  display: block;\n  overflow: hidden;\n}\n');
var al = "container_item_containerItem__SaDdR",
    ol = "container_item_thumbnailWrapper__KyjfU",
    ll = "container_item_thumbnailIconWrapper__2reNj",
    sl = "container_item_thumbnailImageWrapper__te4D-",
    ul = "container_item_detailsWrapper__aTa4P";
St(".container_item_containerItem__SaDdR {\n  display: flex;\n  border-radius: var(--ui-kit-border-radius);\n  cursor: pointer;\n  transition: var(--ui-kit-fade-transition);\n  column-gap: var(--ui-kit-base-unit);\n}\n\n.container_item_containerItem__SaDdR:hover {\n  background-color: var(--ui-kit-color-secondary-hover);\n  transition: var(--ui-kit-fade-transition);\n}\n\n.container_item_thumbnailWrapper__KyjfU {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: calc((var(--ui-kit-base-unit)) * 7);\n  width: calc((var(--ui-kit-base-unit)) * 7);\n  border-radius: calc(var(--ui-kit-border-radius) * 2);\n  background-color: var(--ui-kit-color-neutral);\n  margin: var(--ui-kit-space-1);\n  padding: var(--ui-kit-space-1);\n}\n\n.container_item_thumbnailIconWrapper__2reNj {\n  width: calc((var(--ui-kit-base-unit)) * 3);\n  height: calc((var(--ui-kit-base-unit)) * 3);\n  display: flex;\n}\n\n.container_item_thumbnailImageWrapper__te4D- img {\n  object-fit: scale-down;\n}\n\n.container_item_detailsWrapper__aTa4P {\n  row-gap: calc(var(--ui-kit-space-050) * 0.5);\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n}\n");
var cl = function(e) {
        var n = e.name,
            r = e.subtitle,
            i = e.thumbnailUrl,
            a = e.onClick,
            o = e.icon,
            l = void 0 === o ? "folder" : o;
        return t.createElement("div", {
            className: al,
            onClick: a
        }, t.createElement("div", {
            className: Io(ol, i && sl)
        }, i ? t.createElement(z, {
            thumbnailUrl: i,
            borderRadius: "standard",
            ariaLabel: "".concat(n, "-container"),
            onClick: function() {}
        }) : t.createElement("span", {
            className: ll
        }, "folder" === l ? t.createElement($, null) : t.createElement(G, null))), t.createElement("div", {
            className: ul
        }, t.createElement(Text, {
            variant: "bold",
            tone: "secondary",
            lineClamp: 1
        }, n), r && t.createElement(Text, {
            tone: "secondary",
            variant: "regular",
            size: "small",
            lineClamp: 1
        }, r)))
    },
    dl = "list_placeholder_listPlaceholderItem__ZRCps",
    pl = "list_placeholder_listItemWrapper__z57-g",
    hl = "list_placeholder_textPlaceholder__Y7d6M";
St(".list_placeholder_listPlaceholderItem__ZRCps {\n  width: 100%;\n  display: flex;\n  column-gap: var(--ui-kit-space-150);\n  align-items: center;\n  padding: var(--ui-kit-space-1);\n}\n\n.list_placeholder_listItemWrapper__z57-g {\n  display: flex;\n  column-gap: calc(var(--ui-kit-base-unit) * 1);\n  height: calc(var(--ui-kit-base-unit) * 8);\n}\n\n.list_placeholder_textPlaceholder__Y7d6M {\n  width: 100%;\n  height: min-content;\n  display: flex;\n  flex-direction: column;\n  row-gap: var(--ui-kit-space-1);\n}\n");
var fl, ml = function(e) {
        var n = e.itemCount,
            r = void 0 === n ? 10 : n;
        return t.createElement("div", {
            role: "status",
            "aria-live": "polite",
            "aria-busy": "true"
        }, t.createElement(Rows, {
            spacing: "0.5u"
        }, Array.from({
            length: r
        }, (function(e, n) {
            return t.createElement("div", {
                key: n,
                className: pl,
                "aria-label": "Loading item ".concat(n + 1)
            }, t.createElement("div", {
                className: dl
            }, t.createElement("div", {
                style: {
                    width: "calc(".concat(tokens.baseUnit, " * ").concat(9, ")")
                }
            }, t.createElement(PlaceHolder, {
                shape: "square"
            })), t.createElement("div", {
                className: hl
            }, t.createElement("div", null, t.createElement(TitlePlaceholder, {
                size: "small"
            })), t.createElement(TitlePlaceholder, {
                size: "xsmall"
            }))))
        }))))
    },
    vl = {
        exports: {}
    },
    gl = {
        exports: {}
    },
    yl = {
        exports: {}
    },
    bl = {};
var _l, El, wl, Cl, Sl, kl, Ol, xl, Nl, Pl, Tl, Il, Rl, Al, Dl = {};

function Fl() {
    return El || (El = 1, "production" === process.env.NODE_ENV ? yl.exports = function() {
        if (fl) return bl;
        fl = 1;
        var e = "function" == typeof Symbol && Symbol.for,
            t = e ? Symbol.for("react.element") : 60103,
            n = e ? Symbol.for("react.portal") : 60106,
            r = e ? Symbol.for("react.fragment") : 60107,
            i = e ? Symbol.for("react.strict_mode") : 60108,
            a = e ? Symbol.for("react.profiler") : 60114,
            o = e ? Symbol.for("react.provider") : 60109,
            l = e ? Symbol.for("react.context") : 60110,
            s = e ? Symbol.for("react.async_mode") : 60111,
            u = e ? Symbol.for("react.concurrent_mode") : 60111,
            c = e ? Symbol.for("react.forward_ref") : 60112,
            d = e ? Symbol.for("react.suspense") : 60113,
            p = e ? Symbol.for("react.suspense_list") : 60120,
            h = e ? Symbol.for("react.memo") : 60115,
            f = e ? Symbol.for("react.lazy") : 60116,
            m = e ? Symbol.for("react.block") : 60121,
            v = e ? Symbol.for("react.fundamental") : 60117,
            g = e ? Symbol.for("react.responder") : 60118,
            y = e ? Symbol.for("react.scope") : 60119;

        function b(e) {
            if ("object" == typeof e && null !== e) {
                var p = e.$$typeof;
                switch (p) {
                    case t:
                        switch (e = e.type) {
                            case s:
                            case u:
                            case r:
                            case a:
                            case i:
                            case d:
                                return e;
                            default:
                                switch (e = e && e.$$typeof) {
                                    case l:
                                    case c:
                                    case f:
                                    case h:
                                    case o:
                                        return e;
                                    default:
                                        return p
                                }
                        }
                    case n:
                        return p
                }
            }
        }

        function _(e) {
            return b(e) === u
        }
        return bl.AsyncMode = s, bl.ConcurrentMode = u, bl.ContextConsumer = l, bl.ContextProvider = o, bl.Element = t, bl.ForwardRef = c, bl.Fragment = r, bl.Lazy = f, bl.Memo = h, bl.Portal = n, bl.Profiler = a, bl.StrictMode = i, bl.Suspense = d, bl.isAsyncMode = function(e) {
            return _(e) || b(e) === s
        }, bl.isConcurrentMode = _, bl.isContextConsumer = function(e) {
            return b(e) === l
        }, bl.isContextProvider = function(e) {
            return b(e) === o
        }, bl.isElement = function(e) {
            return "object" == typeof e && null !== e && e.$$typeof === t
        }, bl.isForwardRef = function(e) {
            return b(e) === c
        }, bl.isFragment = function(e) {
            return b(e) === r
        }, bl.isLazy = function(e) {
            return b(e) === f
        }, bl.isMemo = function(e) {
            return b(e) === h
        }, bl.isPortal = function(e) {
            return b(e) === n
        }, bl.isProfiler = function(e) {
            return b(e) === a
        }, bl.isStrictMode = function(e) {
            return b(e) === i
        }, bl.isSuspense = function(e) {
            return b(e) === d
        }, bl.isValidElementType = function(e) {
            return "string" == typeof e || "function" == typeof e || e === r || e === u || e === a || e === i || e === d || e === p || "object" == typeof e && null !== e && (e.$$typeof === f || e.$$typeof === h || e.$$typeof === o || e.$$typeof === l || e.$$typeof === c || e.$$typeof === v || e.$$typeof === g || e.$$typeof === y || e.$$typeof === m)
        }, bl.typeOf = b, bl
    }() : yl.exports = (_l || (_l = 1, "production" !== process.env.NODE_ENV && function() {
        var e = "function" == typeof Symbol && Symbol.for,
            t = e ? Symbol.for("react.element") : 60103,
            n = e ? Symbol.for("react.portal") : 60106,
            r = e ? Symbol.for("react.fragment") : 60107,
            i = e ? Symbol.for("react.strict_mode") : 60108,
            a = e ? Symbol.for("react.profiler") : 60114,
            o = e ? Symbol.for("react.provider") : 60109,
            l = e ? Symbol.for("react.context") : 60110,
            s = e ? Symbol.for("react.async_mode") : 60111,
            u = e ? Symbol.for("react.concurrent_mode") : 60111,
            c = e ? Symbol.for("react.forward_ref") : 60112,
            d = e ? Symbol.for("react.suspense") : 60113,
            p = e ? Symbol.for("react.suspense_list") : 60120,
            h = e ? Symbol.for("react.memo") : 60115,
            f = e ? Symbol.for("react.lazy") : 60116,
            m = e ? Symbol.for("react.block") : 60121,
            v = e ? Symbol.for("react.fundamental") : 60117,
            g = e ? Symbol.for("react.responder") : 60118,
            y = e ? Symbol.for("react.scope") : 60119;

        function b(e) {
            if ("object" == typeof e && null !== e) {
                var p = e.$$typeof;
                switch (p) {
                    case t:
                        var m = e.type;
                        switch (m) {
                            case s:
                            case u:
                            case r:
                            case a:
                            case i:
                            case d:
                                return m;
                            default:
                                var v = m && m.$$typeof;
                                switch (v) {
                                    case l:
                                    case c:
                                    case f:
                                    case h:
                                    case o:
                                        return v;
                                    default:
                                        return p
                                }
                        }
                    case n:
                        return p
                }
            }
        }
        var _ = s,
            E = u,
            w = l,
            C = o,
            S = t,
            k = c,
            O = r,
            x = f,
            N = h,
            P = n,
            T = a,
            I = i,
            R = d,
            A = !1;

        function D(e) {
            return b(e) === u
        }
        Dl.AsyncMode = _, Dl.ConcurrentMode = E, Dl.ContextConsumer = w, Dl.ContextProvider = C, Dl.Element = S, Dl.ForwardRef = k, Dl.Fragment = O, Dl.Lazy = x, Dl.Memo = N, Dl.Portal = P, Dl.Profiler = T, Dl.StrictMode = I, Dl.Suspense = R, Dl.isAsyncMode = function(e) {
            return A || (A = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), D(e) || b(e) === s
        }, Dl.isConcurrentMode = D, Dl.isContextConsumer = function(e) {
            return b(e) === l
        }, Dl.isContextProvider = function(e) {
            return b(e) === o
        }, Dl.isElement = function(e) {
            return "object" == typeof e && null !== e && e.$$typeof === t
        }, Dl.isForwardRef = function(e) {
            return b(e) === c
        }, Dl.isFragment = function(e) {
            return b(e) === r
        }, Dl.isLazy = function(e) {
            return b(e) === f
        }, Dl.isMemo = function(e) {
            return b(e) === h
        }, Dl.isPortal = function(e) {
            return b(e) === n
        }, Dl.isProfiler = function(e) {
            return b(e) === a
        }, Dl.isStrictMode = function(e) {
            return b(e) === i
        }, Dl.isSuspense = function(e) {
            return b(e) === d
        }, Dl.isValidElementType = function(e) {
            return "string" == typeof e || "function" == typeof e || e === r || e === u || e === a || e === i || e === d || e === p || "object" == typeof e && null !== e && (e.$$typeof === f || e.$$typeof === h || e.$$typeof === o || e.$$typeof === l || e.$$typeof === c || e.$$typeof === v || e.$$typeof === g || e.$$typeof === y || e.$$typeof === m)
        }, Dl.typeOf = b
    }()), Dl)), yl.exports
}

function Ll() {
    if (Cl) return wl;
    Cl = 1;
    var e = Object.getOwnPropertySymbols,
        t = Object.prototype.hasOwnProperty,
        n = Object.prototype.propertyIsEnumerable;
    return wl = function() {
        try {
            if (!Object.assign) return !1;
            var e = new String("abc");
            if (e[5] = "de", "5" === Object.getOwnPropertyNames(e)[0]) return !1;
            for (var t = {}, n = 0; n < 10; n++) t["_" + String.fromCharCode(n)] = n;
            var r = Object.getOwnPropertyNames(t).map((function(e) {
                return t[e]
            }));
            if ("0123456789" !== r.join("")) return !1;
            var i = {};
            return "abcdefghijklmnopqrst".split("").forEach((function(e) {
                i[e] = e
            })), "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, i)).join("")
        } catch (e) {
            return !1
        }
    }() ? Object.assign : function(r, i) {
        for (var a, o, l = function(e) {
            if (null == e) throw new TypeError("Object.assign cannot be called with null or undefined");
            return Object(e)
        }(r), s = 1; s < arguments.length; s++) {
            for (var u in a = Object(arguments[s])) t.call(a, u) && (l[u] = a[u]);
            if (e) {
                o = e(a);
                for (var c = 0; c < o.length; c++) n.call(a, o[c]) && (l[o[c]] = a[o[c]])
            }
        }
        return l
    }, wl
}

function Ml() {
    if (kl) return Sl;
    kl = 1;
    return Sl = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"
}

function Ul() {
    return xl ? Ol : (xl = 1, Ol = Function.call.bind(Object.prototype.hasOwnProperty))
}
if ("production" !== process.env.NODE_ENV) {
    var jl = Fl();
    gl.exports = function() {
        if (Il) return Tl;
        Il = 1;
        var e = Fl(),
            t = Ll(),
            n = Ml(),
            r = Ul(),
            i = function() {
                if (Pl) return Nl;
                Pl = 1;
                var e = function() {};
                if ("production" !== process.env.NODE_ENV) {
                    var t = Ml(),
                        n = {},
                        r = Ul();
                    e = function(e) {
                        var t = "Warning: " + e;
                        "undefined" != typeof console && console.error(t);
                        try {
                            throw new Error(t)
                        } catch (e) {}
                    }
                }

                function i(i, a, o, l, s) {
                    if ("production" !== process.env.NODE_ENV)
                        for (var u in i)
                            if (r(i, u)) {
                                var c;
                                try {
                                    if ("function" != typeof i[u]) {
                                        var d = Error((l || "React class") + ": " + o + " type `" + u + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof i[u] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                                        throw d.name = "Invariant Violation", d
                                    }
                                    c = i[u](a, u, l, o, null, t)
                                } catch (e) {
                                    c = e
                                }
                                if (!c || c instanceof Error || e((l || "React class") + ": type specification of " + o + " `" + u + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof c + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."), c instanceof Error && !(c.message in n)) {
                                    n[c.message] = !0;
                                    var p = s ? s() : "";
                                    e("Failed " + o + " type: " + c.message + (null != p ? p : ""))
                                }
                            }
                }
                return i.resetWarningCache = function() {
                    "production" !== process.env.NODE_ENV && (n = {})
                }, Nl = i
            }(),
            a = function() {};

        function o() {
            return null
        }
        return "production" !== process.env.NODE_ENV && (a = function(e) {
            var t = "Warning: " + e;
            "undefined" != typeof console && console.error(t);
            try {
                throw new Error(t)
            } catch (e) {}
        }), Tl = function(l, s) {
            var u = "function" == typeof Symbol && Symbol.iterator,
                c = "@@iterator",
                d = "<<anonymous>>",
                p = {
                    array: v("array"),
                    bigint: v("bigint"),
                    bool: v("boolean"),
                    func: v("function"),
                    number: v("number"),
                    object: v("object"),
                    string: v("string"),
                    symbol: v("symbol"),
                    any: m(o),
                    arrayOf: function(e) {
                        return m((function(t, r, i, a, o) {
                            if ("function" != typeof e) return new f("Property `" + o + "` of component `" + i + "` has invalid PropType notation inside arrayOf.");
                            var l = t[r];
                            if (!Array.isArray(l)) return new f("Invalid " + a + " `" + o + "` of type `" + b(l) + "` supplied to `" + i + "`, expected an array.");
                            for (var s = 0; s < l.length; s++) {
                                var u = e(l, s, i, a, o + "[" + s + "]", n);
                                if (u instanceof Error) return u
                            }
                            return null
                        }))
                    },
                    element: m((function(e, t, n, r, i) {
                        var a = e[t];
                        return l(a) ? null : new f("Invalid " + r + " `" + i + "` of type `" + b(a) + "` supplied to `" + n + "`, expected a single ReactElement.")
                    })),
                    elementType: m((function(t, n, r, i, a) {
                        var o = t[n];
                        return e.isValidElementType(o) ? null : new f("Invalid " + i + " `" + a + "` of type `" + b(o) + "` supplied to `" + r + "`, expected a single ReactElement type.")
                    })),
                    instanceOf: function(e) {
                        return m((function(t, n, r, i, a) {
                            if (!(t[n] instanceof e)) {
                                var o = e.name || d;
                                return new f("Invalid " + i + " `" + a + "` of type `" + ((l = t[n]).constructor && l.constructor.name ? l.constructor.name : d) + "` supplied to `" + r + "`, expected instance of `" + o + "`.")
                            }
                            var l;
                            return null
                        }))
                    },
                    node: m((function(e, t, n, r, i) {
                        return y(e[t]) ? null : new f("Invalid " + r + " `" + i + "` supplied to `" + n + "`, expected a ReactNode.")
                    })),
                    objectOf: function(e) {
                        return m((function(t, i, a, o, l) {
                            if ("function" != typeof e) return new f("Property `" + l + "` of component `" + a + "` has invalid PropType notation inside objectOf.");
                            var s = t[i],
                                u = b(s);
                            if ("object" !== u) return new f("Invalid " + o + " `" + l + "` of type `" + u + "` supplied to `" + a + "`, expected an object.");
                            for (var c in s)
                                if (r(s, c)) {
                                    var d = e(s, c, a, o, l + "." + c, n);
                                    if (d instanceof Error) return d
                                } return null
                        }))
                    },
                    oneOf: function(e) {
                        return Array.isArray(e) ? m((function(t, n, r, i, a) {
                            for (var o = t[n], l = 0; l < e.length; l++)
                                if (h(o, e[l])) return null;
                            var s = JSON.stringify(e, (function(e, t) {
                                return "symbol" === _(t) ? String(t) : t
                            }));
                            return new f("Invalid " + i + " `" + a + "` of value `" + String(o) + "` supplied to `" + r + "`, expected one of " + s + ".")
                        })) : ("production" !== process.env.NODE_ENV && a(arguments.length > 1 ? "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])." : "Invalid argument supplied to oneOf, expected an array."), o)
                    },
                    oneOfType: function(e) {
                        if (!Array.isArray(e)) return "production" !== process.env.NODE_ENV && a("Invalid argument supplied to oneOfType, expected an instance of array."), o;
                        for (var t = 0; t < e.length; t++) {
                            var i = e[t];
                            if ("function" != typeof i) return a("Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + E(i) + " at index " + t + "."), o
                        }
                        return m((function(t, i, a, o, l) {
                            for (var s = [], u = 0; u < e.length; u++) {
                                var c = (0, e[u])(t, i, a, o, l, n);
                                if (null == c) return null;
                                c.data && r(c.data, "expectedType") && s.push(c.data.expectedType)
                            }
                            return new f("Invalid " + o + " `" + l + "` supplied to `" + a + "`" + (s.length > 0 ? ", expected one of type [" + s.join(", ") + "]" : "") + ".")
                        }))
                    },
                    shape: function(e) {
                        return m((function(t, r, i, a, o) {
                            var l = t[r],
                                s = b(l);
                            if ("object" !== s) return new f("Invalid " + a + " `" + o + "` of type `" + s + "` supplied to `" + i + "`, expected `object`.");
                            for (var u in e) {
                                var c = e[u];
                                if ("function" != typeof c) return g(i, a, o, u, _(c));
                                var d = c(l, u, i, a, o + "." + u, n);
                                if (d) return d
                            }
                            return null
                        }))
                    },
                    exact: function(e) {
                        return m((function(i, a, o, l, s) {
                            var u = i[a],
                                c = b(u);
                            if ("object" !== c) return new f("Invalid " + l + " `" + s + "` of type `" + c + "` supplied to `" + o + "`, expected `object`.");
                            var d = t({}, i[a], e);
                            for (var p in d) {
                                var h = e[p];
                                if (r(e, p) && "function" != typeof h) return g(o, l, s, p, _(h));
                                if (!h) return new f("Invalid " + l + " `" + s + "` key `" + p + "` supplied to `" + o + "`.\nBad object: " + JSON.stringify(i[a], null, "  ") + "\nValid keys: " + JSON.stringify(Object.keys(e), null, "  "));
                                var m = h(u, p, o, l, s + "." + p, n);
                                if (m) return m
                            }
                            return null
                        }))
                    }
                };

            function h(e, t) {
                return e === t ? 0 !== e || 1 / e == 1 / t : e != e && t != t
            }

            function f(e, t) {
                this.message = e, this.data = t && "object" == typeof t ? t : {}, this.stack = ""
            }

            function m(e) {
                if ("production" !== process.env.NODE_ENV) var t = {},
                    r = 0;

                function i(i, o, l, u, c, p, h) {
                    if (u = u || d, p = p || l, h !== n) {
                        if (s) {
                            var m = new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");
                            throw m.name = "Invariant Violation", m
                        }
                        if ("production" !== process.env.NODE_ENV && "undefined" != typeof console) {
                            var v = u + ":" + l;
                            !t[v] && r < 3 && (a("You are manually calling a React.PropTypes validation function for the `" + p + "` prop on `" + u + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."), t[v] = !0, r++)
                        }
                    }
                    return null == o[l] ? i ? null === o[l] ? new f("The " + c + " `" + p + "` is marked as required in `" + u + "`, but its value is `null`.") : new f("The " + c + " `" + p + "` is marked as required in `" + u + "`, but its value is `undefined`.") : null : e(o, l, u, c, p)
                }
                var o = i.bind(null, !1);
                return o.isRequired = i.bind(null, !0), o
            }

            function v(e) {
                return m((function(t, n, r, i, a, o) {
                    var l = t[n];
                    return b(l) !== e ? new f("Invalid " + i + " `" + a + "` of type `" + _(l) + "` supplied to `" + r + "`, expected `" + e + "`.", {
                        expectedType: e
                    }) : null
                }))
            }

            function g(e, t, n, r, i) {
                return new f((e || "React class") + ": " + t + " type `" + n + "." + r + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + i + "`.")
            }

            function y(e) {
                switch (typeof e) {
                    case "number":
                    case "string":
                    case "undefined":
                        return !0;
                    case "boolean":
                        return !e;
                    case "object":
                        if (Array.isArray(e)) return e.every(y);
                        if (null === e || l(e)) return !0;
                        var t = function(e) {
                            var t = e && (u && e[u] || e[c]);
                            if ("function" == typeof t) return t
                        }(e);
                        if (!t) return !1;
                        var n, r = t.call(e);
                        if (t !== e.entries) {
                            for (; !(n = r.next()).done;)
                                if (!y(n.value)) return !1
                        } else
                            for (; !(n = r.next()).done;) {
                                var i = n.value;
                                if (i && !y(i[1])) return !1
                            }
                        return !0;
                    default:
                        return !1
                }
            }

            function b(e) {
                var t = typeof e;
                return Array.isArray(e) ? "array" : e instanceof RegExp ? "object" : function(e, t) {
                    return "symbol" === e || !!t && ("Symbol" === t["@@toStringTag"] || "function" == typeof Symbol && t instanceof Symbol)
                }(t, e) ? "symbol" : t
            }

            function _(e) {
                if (null == e) return "" + e;
                var t = b(e);
                if ("object" === t) {
                    if (e instanceof Date) return "date";
                    if (e instanceof RegExp) return "regexp"
                }
                return t
            }

            function E(e) {
                var t = _(e);
                switch (t) {
                    case "array":
                    case "object":
                        return "an " + t;
                    case "boolean":
                    case "date":
                    case "regexp":
                        return "a " + t;
                    default:
                        return t
                }
            }
            return f.prototype = Error.prototype, p.checkPropTypes = i, p.resetWarningCache = i.resetWarningCache, p.PropTypes = p, p
        }, Tl
    }()(jl.isElement, !0)
} else gl.exports = function() {
    if (Al) return Rl;
    Al = 1;
    var e = Ml();

    function t() {}

    function n() {}
    return n.resetWarningCache = t, Rl = function() {
        function r(t, n, r, i, a, o) {
            if (o !== e) {
                var l = new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");
                throw l.name = "Invariant Violation", l
            }
        }

        function i() {
            return r
        }
        r.isRequired = r;
        var a = {
            array: r,
            bigint: r,
            bool: r,
            func: r,
            number: r,
            object: r,
            string: r,
            symbol: r,
            any: r,
            arrayOf: i,
            element: r,
            elementType: r,
            instanceOf: i,
            node: r,
            objectOf: i,
            oneOf: i,
            oneOfType: i,
            shape: i,
            exact: i,
            checkPropTypes: n,
            resetWarningCache: t
        };
        return a.PropTypes = a, a
    }
}()();
var ql = gl.exports;
! function(e, n) {
    Object.defineProperty(n, "__esModule", {
        value: !0
    });
    var r = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t
            }
        }(),
        i = t,
        a = l(i),
        o = l(ql);

    function l(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }
    var s = function(e) {
        function t(e) {
            ! function(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, t);
            var n = function(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
            return n.scrollListener = n.scrollListener.bind(n), n.eventListenerOptions = n.eventListenerOptions.bind(n), n.mousewheelListener = n.mousewheelListener.bind(n), n
        }
        return function(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }(t, e), r(t, [{
            key: "componentDidMount",
            value: function() {
                this.pageLoaded = this.props.pageStart, this.options = this.eventListenerOptions(), this.attachScrollListener()
            }
        }, {
            key: "componentDidUpdate",
            value: function() {
                if (this.props.isReverse && this.loadMore) {
                    var e = this.getParentElement(this.scrollComponent);
                    e.scrollTop = e.scrollHeight - this.beforeScrollHeight + this.beforeScrollTop, this.loadMore = !1
                }
                this.attachScrollListener()
            }
        }, {
            key: "componentWillUnmount",
            value: function() {
                this.detachScrollListener(), this.detachMousewheelListener()
            }
        }, {
            key: "isPassiveSupported",
            value: function() {
                var e = !1,
                    t = {
                        get passive() {
                            e = !0
                        }
                    };
                try {
                    document.addEventListener("test", null, t), document.removeEventListener("test", null, t)
                } catch (e) {}
                return e
            }
        }, {
            key: "eventListenerOptions",
            value: function() {
                this.props.useCapture;
                return this.isPassiveSupported() ? {
                    useCapture: this.props.useCapture,
                    passive: !0
                } : {
                    passive: !1
                }
            }
        }, {
            key: "setDefaultLoader",
            value: function(e) {
                this.defaultLoader = e
            }
        }, {
            key: "detachMousewheelListener",
            value: function() {
                var e = window;
                !1 === this.props.useWindow && (e = this.scrollComponent.parentNode), e.removeEventListener("mousewheel", this.mousewheelListener, this.options ? this.options : this.props.useCapture)
            }
        }, {
            key: "detachScrollListener",
            value: function() {
                var e = window;
                !1 === this.props.useWindow && (e = this.getParentElement(this.scrollComponent)), e.removeEventListener("scroll", this.scrollListener, this.options ? this.options : this.props.useCapture), e.removeEventListener("resize", this.scrollListener, this.options ? this.options : this.props.useCapture)
            }
        }, {
            key: "getParentElement",
            value: function(e) {
                var t = this.props.getScrollParent && this.props.getScrollParent();
                return null != t ? t : e && e.parentNode
            }
        }, {
            key: "filterProps",
            value: function(e) {
                return e
            }
        }, {
            key: "attachScrollListener",
            value: function() {
                var e = this.getParentElement(this.scrollComponent);
                if (this.props.hasMore && e) {
                    var t = window;
                    !1 === this.props.useWindow && (t = e), t.addEventListener("mousewheel", this.mousewheelListener, this.options ? this.options : this.props.useCapture), t.addEventListener("scroll", this.scrollListener, this.options ? this.options : this.props.useCapture), t.addEventListener("resize", this.scrollListener, this.options ? this.options : this.props.useCapture), this.props.initialLoad && this.scrollListener()
                }
            }
        }, {
            key: "mousewheelListener",
            value: function(e) {
                1 !== e.deltaY || this.isPassiveSupported() || e.preventDefault()
            }
        }, {
            key: "scrollListener",
            value: function() {
                var e = this.scrollComponent,
                    t = window,
                    n = this.getParentElement(e),
                    r = void 0;
                if (this.props.useWindow) {
                    var i = document.documentElement || document.body.parentNode || document.body,
                        a = void 0 !== t.pageYOffset ? t.pageYOffset : i.scrollTop;
                    r = this.props.isReverse ? a : this.calculateOffset(e, a)
                } else r = this.props.isReverse ? n.scrollTop : e.scrollHeight - n.scrollTop - n.clientHeight;
                r < Number(this.props.threshold) && e && null !== e.offsetParent && (this.detachScrollListener(), this.beforeScrollHeight = n.scrollHeight, this.beforeScrollTop = n.scrollTop, "function" == typeof this.props.loadMore && (this.props.loadMore(this.pageLoaded += 1), this.loadMore = !0))
            }
        }, {
            key: "calculateOffset",
            value: function(e, t) {
                return e ? this.calculateTopPosition(e) + (e.offsetHeight - t - window.innerHeight) : 0
            }
        }, {
            key: "calculateTopPosition",
            value: function(e) {
                return e ? e.offsetTop + this.calculateTopPosition(e.offsetParent) : 0
            }
        }, {
            key: "render",
            value: function() {
                var e = this,
                    t = this.filterProps(this.props),
                    n = t.children,
                    r = t.element,
                    i = t.hasMore;
                t.initialLoad;
                var o = t.isReverse,
                    l = t.loader;
                t.loadMore, t.pageStart;
                var s = t.ref;
                t.threshold, t.useCapture, t.useWindow, t.getScrollParent;
                var u = function(e, t) {
                    var n = {};
                    for (var r in e) t.indexOf(r) >= 0 || Object.prototype.hasOwnProperty.call(e, r) && (n[r] = e[r]);
                    return n
                }(t, ["children", "element", "hasMore", "initialLoad", "isReverse", "loader", "loadMore", "pageStart", "ref", "threshold", "useCapture", "useWindow", "getScrollParent"]);
                u.ref = function(t) {
                    e.scrollComponent = t, s && s(t)
                };
                var c = [n];
                return i && (l ? o ? c.unshift(l) : c.push(l) : this.defaultLoader && (o ? c.unshift(this.defaultLoader) : c.push(this.defaultLoader))), a.default.createElement(r, u, c)
            }
        }]), t
    }(i.Component);
    s.propTypes = {
        children: o.default.node.isRequired,
        element: o.default.node,
        hasMore: o.default.bool,
        initialLoad: o.default.bool,
        isReverse: o.default.bool,
        loader: o.default.node,
        loadMore: o.default.func.isRequired,
        pageStart: o.default.number,
        ref: o.default.func,
        getScrollParent: o.default.func,
        threshold: o.default.number,
        useCapture: o.default.bool,
        useWindow: o.default.bool
    }, s.defaultProps = {
        element: "div",
        hasMore: !1,
        initialLoad: !0,
        pageStart: 0,
        ref: null,
        threshold: 250,
        useWindow: !0,
        isReverse: !1,
        useCapture: !1,
        loader: null,
        getScrollParent: null
    }, n.default = s, e.exports = n.default
}(vl, vl.exports);
var Bl = Za(vl.exports),
    Vl = "scroll_scrollRoot__DUtHf",
    Wl = "scroll_scrollRootTight__8U0-0",
    Hl = "scroll_scrollFixed__9xcvD",
    Ql = "scroll_scrollFixedTab__-NWQt",
    zl = "scroll_scrollContainer__HzQ5u",
    $l = "scroll_pageWithNoFooter__r5Xpc",
    Gl = "scroll_finishedScroll__FBW2Q";
St(".scroll_scrollRoot__DUtHf {\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  overflow-y: hidden;\n  box-sizing: border-box;\n}\n\n.scroll_scrollRootTight__8U0-0 {\n  row-gap: 0;\n}\n\n.scroll_scrollFixed__9xcvD {\n  padding-right: var(--ui-kit-space-2);\n  padding-bottom: var(--ui-kit-space-1);\n}\n\n.scroll_scrollFixedTab__-NWQt {\n  padding-bottom: 0;\n}\n\n.scroll_scrollContainer__HzQ5u {\n  overflow-y: scroll;\n  height: 100%;\n  max-height: 100%;\n  width: 100%;\n  flex-grow: 1;\n  padding-right: var(--ui-kit-space-2);\n  box-sizing: border-box;\n  scrollbar-gutter: stable;\n\n  /* for firefox */\n  scrollbar-width: thin;\n  scrollbar-color: var(--ui-kit-color-typography-quaternary) transparent;\n}\n\n.scroll_scrollContainer__HzQ5u::-webkit-scrollbar {\n  position: absolute;\n  width: var(--ui-kit-base-unit);\n  height: 0;\n}\n\n.scroll_scrollContainer__HzQ5u::-webkit-scrollbar-track {\n  background: transparent;\n  width: var(--ui-kit-base-unit);\n  margin-top: var(--ui-kit-space-1);\n  margin-bottom: var(--ui-kit-space-1);\n}\n\n.scroll_scrollContainer__HzQ5u::-webkit-scrollbar-thumb {\n  border-radius: var(--ui-kit-border-radius);\n  background: var(--ui-kit-color-typography-quaternary);\n  visibility: hidden;\n}\n\n.scroll_scrollContainer__HzQ5u:hover::-webkit-scrollbar-thumb,\n.scroll_scrollContainer__HzQ5u:focus::-webkit-scrollbar-thumb,\n.scroll_scrollContainer__HzQ5u:focus-within::-webkit-scrollbar-thumb {\n  visibility: visible;\n}\n\n.scroll_pageWithNoFooter__r5Xpc .scroll_finishedScroll__FBW2Q {\n  padding-bottom: var(--ui-kit-space-2);\n}\n");
var Kl = function(e) {
        var n = e.containerType,
            r = e.parentContainer,
            i = e.errorMessage,
            a = void 0 === i ? "Something went wrong, please try again." : i,
            o = e.isInfinite,
            l = e.containersShownPerPage,
            s = e.icon,
            u = e.emptyMessage,
            c = e.query,
            d = e.filters,
            p = e.onResultUpdate,
            f = e.tab,
            v = Dn(useState(!1), 2),
            g = v[0],
            y = v[1],
            b = Ct().containersPerPage,
            _ = ho({
                types: ["CONTAINER"],
                containerTypes: [n],
                limit: void 0 === b ? 20 : b,
                query: c,
                filters: d,
                parentContainerType: null == r ? void 0 : r.type,
                containerId: null == r ? void 0 : r.id,
                tab: f
            }, {
                singlePage: !o,
                skip: g
            }),
            E = _.results,
            C = _.isLoading,
            S = _.isError,
            k = _.isEmpty,
            O = _.isFetchingNextPage,
            x = _.fetchNextPage,
            N = _.hasNextPage,
            P = Ln();
        if (useEffect((function() {
            S && y(!0)
        }), [S]), useEffect((function() {
            C || (S ? null == p || p("error") : (k && (null == p || p("empty")), (null == E ? void 0 : E.length) && (null == p || p("success"))))
        }), [E, p, C, S, k]), g) return t.createElement(vo, null, a);
        if (C) return t.createElement(ml, {
            itemCount: l
        });
        if (k) return t.createElement(vo, null, u);
        var T = E.filter((function(e) {
            return "CONTAINER" === e.type
        })).slice(0, o ? void 0 : l);
        return (null == T ? void 0 : T.length) ? o ? t.createElement(Box, {
            height: "full",
            width: "full"
        }, t.createElement(Bl, {
            loadMore: function() {
                x()
            },
            hasMore: N && !O,
            getScrollParent: function() {
                return document.querySelector(".".concat(zl))
            },
            useWindow: !1,
            className: Io(!N && Gl)
        }, t.createElement(Rows, {
            spacing: "0"
        }, T.map((function(e, n) {
            var r;
            return t.createElement(cl, {
                id: e.id,
                name: e.name,
                onClick: function() {
                    return P("/container/".concat(e.id), {
                        state: {
                            container: e
                        }
                    })
                },
                icon: s || "grid",
                key: n,
                thumbnailUrl: null === (r = e.thumbnail) || void 0 === r ? void 0 : r.url,
                subtitle: Yl(e)
            })
        })), O && t.createElement(ml, {
            itemCount: 3
        })))) : t.createElement(Rows, {
            spacing: "0"
        }, T.map((function(e, n) {
            var r;
            return t.createElement(cl, {
                id: e.id,
                name: e.name,
                onClick: function() {
                    return P("/container/".concat(e.id), {
                        state: {
                            container: e
                        }
                    })
                },
                icon: s || "grid",
                key: n,
                thumbnailUrl: null === (r = e.thumbnail) || void 0 === r ? void 0 : r.url,
                subtitle: Yl(e)
            })
        }))) : t.createElement(vo, null)
    },
    Yl = function(e) {
        var t = void 0;
        return void 0 !== e.numItems ? (t = "".concat(e.numItems, " items"), void 0 !== e.numContainers && (t += " · ".concat(e.numContainers, " containers"))) : t = e.description, t
    };

function Jl(e) {
    return "IMAGE" === e.type || "VIDEO" === e.type || "EMBED" === e.type || "AUDIO" === e.type
}
var Zl = {
    listItemWrapper: "full_width_placeholder_listItemWrapper__f7SQf",
    listPlaceholderBlockItem: "full_width_placeholder_listPlaceholderBlockItem__CWw2W",
    listPlaceholderImageItem: "full_width_placeholder_listPlaceholderImageItem__pKHIa"
};
St(".full_width_placeholder_listItemWrapper__f7SQf {\n  display: flex;\n  flex-direction: column;\n  row-gap: var(--ui-kit-space-1);\n}\n\n.full_width_placeholder_listPlaceholderBlockItem__CWw2W {\n  height: 200px;\n}\n\n.full_width_placeholder_listPlaceholderImageItem__pKHIa {\n  height: 100%;\n}\n");
var Xl = function(e) {
        var n = e.itemCount,
            r = void 0 === n ? 5 : n;
        return t.createElement("div", {
            role: "status",
            "aria-live": "polite",
            "aria-busy": "true"
        }, t.createElement(Rows, {
            spacing: "1.5u"
        }, Array.from({
            length: r
        }, (function(e, n) {
            return t.createElement("div", {
                key: n,
                className: Zl.listItemWrapper,
                "aria-label": "Loading item ".concat(n + 1)
            }, t.createElement("div", {
                className: Zl.listPlaceholderBlockItem
            }, t.createElement(PlaceHolder, {
                shape: "sharpRectangle"
            })), t.createElement("div", {
                className: Zl.listPlaceholderItem
            }, t.createElement(TitlePlaceholder, null)))
        }))))
    },
    es = "masonry_placeholder_placeholderWrapper__vUiek";
St(".masonry_placeholder_placeholderWrapper__vUiek {\n  height: 110px;\n}\n");
var ts = function() {
        return t.createElement("div", null, t.createElement(Rows, {
            spacing: "1u"
        }, t.createElement(Columns, {
            spacing: "1u"
        }, t.createElement(Column, {
            width: "1/2"
        }, t.createElement("div", {
            className: es
        }, t.createElement(PlaceHolder, {
            shape: "sharpRectangle"
        }))), t.createElement(Column, null, t.createElement("div", {
            className: es
        }, t.createElement(PlaceHolder, {
            shape: "sharpRectangle"
        })))), t.createElement(Columns, {
            spacing: "1u"
        }, t.createElement(Column, {
            width: "1/3"
        }, t.createElement("div", {
            className: es
        }, t.createElement(PlaceHolder, {
            shape: "sharpRectangle"
        }))), t.createElement(Column, {
            width: "2/5"
        }, t.createElement("div", {
            className: es
        }, t.createElement(PlaceHolder, {
            shape: "sharpRectangle"
        }))), t.createElement(Column, null, t.createElement("div", {
            className: es
        }, t.createElement(PlaceHolder, {
            shape: "sharpRectangle"
        })))), t.createElement(Columns, {
            spacing: "1u"
        }, t.createElement(Column, {
            width: "3/5"
        }, t.createElement("div", {
            className: es
        }, t.createElement(PlaceHolder, {
            shape: "sharpRectangle"
        }))), t.createElement(Column, null, t.createElement("div", {
            className: es
        }, t.createElement(PlaceHolder, {
            shape: "sharpRectangle"
        })))), t.createElement(Columns, {
            spacing: "1u"
        }, t.createElement(Column, {
            width: "1/2"
        }, t.createElement("div", {
            className: es
        }, t.createElement(PlaceHolder, {
            shape: "sharpRectangle"
        }))), t.createElement(Column, null, t.createElement("div", {
            className: es
        }, t.createElement(PlaceHolder, {
            shape: "sharpRectangle"
        }))))))
    },
    ns = function() {
        var e, n = Ct(),
            r = n.layouts;
        (null == r ? void 0 : r.length) || ((null === (e = n.resourceTypes) || void 0 === e ? void 0 : e.includes("AUDIO")) && (r = ["LIST", "MASONRY"]), r = (null == r ? void 0 : r.length) ? r : ["MASONRY"]);
        var a = et(),
            o = a.state,
            l = In(a, ["state"]),
            s = rt(),
            u = useMemo((function() {
                return (null == r ? void 0 : r.length) ? function(e) {
                    return s(l, {
                        state: Tn(Tn({}, o), {
                            layout: e
                        }),
                        replace: !0
                    })
                } : void 0
            }), [r, l, s, o]),
            c = (null == o ? void 0 : o.layout) || r[0],
            d = t.useCallback((function() {
                (null == r ? void 0 : r.length) && u && u(function(e, t) {
                    var n = t.findIndex((function(t) {
                        return t === e
                    }));
                    if (-1 === n) throw new Error("Current item not found");
                    return t[(n + 1) % t.length]
                }(c, r))
            }), [u, c, r]),
            p = t.memo((function() {
                return "LIST" === c ? t.createElement(ml, null) : "FULL_WIDTH" === c ? t.createElement(Xl, null) : "MASONRY" === c ? t.createElement(ts, null) : void 0
            }));
        return {
            currentLayout: c,
            Placeholder: p,
            setNextLayout: d,
            showLayoutSwitch: (null == r ? void 0 : r.length) > 1 && d
        }
    };
var rs = "video_asset_card_videoCard__QGVUh";
St(".video_asset_card_videoCard__QGVUh *,\n.video_asset_card_videoCard__QGVUh *::after {\n  border: 0 !important;\n}\n");
var is = function(e) {
        var n, r, i, a = e.video,
            o = e.onClick,
            l = e.onDragStart,
            s = e.borderRadius;
        return (null === (n = a.thumbnail) || void 0 === n ? void 0 : n.url) || a.url || a.previewUrl ? "image/gif" === a.mimeType ? t.createElement(Box, {
            width: "full",
            height: "full",
            className: rs
        }, t.createElement(K, {
            ariaLabel: a.name,
            alt: a.name,
            thumbnailUrl: (null === (r = a.thumbnail) || void 0 === r ? void 0 : r.url) || "No thumbnail url provided",
            mimeType: a.mimeType,
            onClick: o,
            onDragStart: l,
            borderRadius: s
        })) : t.createElement(Box, {
            width: "full",
            height: "full",
            className: rs
        }, t.createElement(K, {
            mimeType: a.mimeType,
            ariaLabel: "Add video ".concat(a.name, " to design"),
            thumbnailUrl: (null === (i = a.thumbnail) || void 0 === i ? void 0 : i.url) || "No thumbnail url provided",
            videoPreviewUrl: a.previewUrl || a.url,
            durationInSeconds: a.durationMs / 1e3,
            onClick: o,
            onDragStart: l,
            borderRadius: s
        })) : t.createElement(z, {
            onClick: function() {},
            ariaLabel: "Invalid Video Asset",
            thumbnailUrl: "Invalid Video Asset",
            borderRadius: s
        })
    },
    as = "full_width_asset_fullWidthItem__0jn0a",
    os = "full_width_asset_embedItem__-DCm4";
St(".full_width_asset_fullWidthItem__0jn0a *,\n.full_width_asset_fullWidthItem__0jn0a *::after {\n  border-radius: var(--ui-kit-border-radius) !important;\n  border: 0 !important;\n}\n\n.full_width_asset_fullWidthItem__0jn0a {\n  min-height: calc(var(--ui-kit-base-unit) * 10);\n}\n\n.full_width_asset_fullWidthItem__0jn0a.full_width_asset_embedItem__-DCm4 {\n  min-height: calc(var(--ui-kit-base-unit) * 16);\n}\n");
var ls = function(e) {
        var n, r = e.audio,
            i = e.onClick,
            a = e.onDragStart;
        return t.createElement(Y, {
            title: r.name,
            durationInSeconds: r.durationMs / 1e3,
            audioPreviewUrl: r.previewUrl || r.url,
            thumbnailUrl: null === (n = r.thumbnail) || void 0 === n ? void 0 : n.url,
            onClick: i,
            onDragStart: a,
            ariaLabel: "Add audio ".concat(r.name, " to design")
        })
    },
    ss = function(e) {
        var n, r, i = e.item,
            a = e.onDragStart,
            o = e.onClick;
        switch (i.type) {
            case "EMBED":
                return t.createElement("div", {
                    className: Io(as, os)
                }, t.createElement(J, {
                    title: i.name,
                    ariaLabel: "Add embed ".concat(i.name, " to design"),
                    thumbnailUrl: (null === (n = i.thumbnail) || void 0 === n ? void 0 : n.url) || "No thumbnail url provided",
                    onClick: o,
                    onDragStart: a,
                    description: i.description
                }));
            case "VIDEO":
                return t.createElement(Rows, {
                    spacing: "1u"
                }, t.createElement("div", {
                    className: as
                }, t.createElement(is, {
                    video: i,
                    onClick: o,
                    onDragStart: a
                })), t.createElement(Rows, {
                    spacing: "0.5u"
                }, t.createElement(Title, {
                    size: "xsmall"
                }, i.name), i.description && t.createElement(Text, {
                    size: "small"
                }, i.description)));
            case "IMAGE":
                return t.createElement(Rows, {
                    spacing: "1u"
                }, t.createElement("div", {
                    className: as
                }, t.createElement(z, {
                    ariaLabel: "Add image ".concat(i.name, " to design"),
                    thumbnailUrl: (null === (r = i.thumbnail) || void 0 === r ? void 0 : r.url) || "No thumbnail url provided",
                    onClick: o,
                    onDragStart: a
                })), t.createElement(Rows, {
                    spacing: "0.5u"
                }, t.createElement(Title, {
                    size: "xsmall"
                }, i.name), i.description && t.createElement(Text, {
                    size: "small"
                }, i.description)));
            case "AUDIO":
                return t.createElement(ls, {
                    audio: i,
                    onClick: o,
                    onDragStart: a
                });
            default:
                return i
        }
    },
    us = function(e) {
        var n = e.items,
            r = e.onClick,
            i = e.onDragStart,
            a = e.isFetchingNextPage;
        return t.createElement(Rows, {
            spacing: "2u"
        }, null == n ? void 0 : n.map((function(e) {
            return t.createElement(ss, {
                item: e,
                key: e.id,
                onClick: function() {
                    return r(e)
                },
                onDragStart: function(t) {
                    return i(t, e)
                }
            })
        })), a && t.createElement(Xl, {
            itemCount: 3
        }))
    },
    cs = "list_asset_assetItem__9aaRe",
    ds = "list_asset_audioCardContainer__eiU17",
    ps = "list_asset_assetItemEyeButton__hpWBr",
    hs = "list_asset_assetItemThumbnail__uKgwg";
St(".list_asset_assetItem__9aaRe {\n  display: flex;\n  column-gap: var(--ui-kit-space-050);\n  color: var(--ui-kit-color-surface);\n  text-decoration: none;\n  align-items: center;\n  width: 100%;\n  height: calc(var(--ui-kit-base-unit) * 9);\n  cursor: pointer;\n  background: transparent;\n  border: 0;\n  padding: 0;\n  text-align: start;\n}\n\n.list_asset_audioCardContainer__eiU17 {\n  display: flex;\n  cursor: pointer;\n  background: transparent;\n  border: 0;\n  padding: 0;\n  text-align: start;\n  text-decoration: none;\n  align-items: center;\n  width: 100%;\n}\n\n.list_asset_audioCardContainer__eiU17 > div:first-child {\n  flex-grow: 1;\n}\n\n.list_asset_audioCardContainer__eiU17:hover {\n  background: var(--ui-kit-color-secondary-hover);\n  border-radius: var(--ui-kit-border-radius);\n}\n\n.list_asset_audioCardContainer__eiU17 div:hover {\n  background-color: transparent !important;\n}\n\n.list_asset_audioCardContainer__eiU17:hover .list_asset_assetItemEyeButton__hpWBr {\n  display: block;\n}\n\n.list_asset_assetItem__9aaRe > div:nth-child(2) {\n  flex-grow: 1;\n}\n\n.list_asset_assetItemThumbnail__uKgwg {\n  width: calc(var(--ui-kit-base-unit) 7);\n  height: calc(var(--ui-kit-base-unit) * 7);\n  margin: 0 var(--ui-kit-space-1);\n  display: flex;\n}\n\n.list_asset_assetItemThumbnail__uKgwg img {\n  object-fit: cover;\n  width: 100%;\n  height: 100%;\n  border-radius: var(--ui-kit-border-radius);\n}\n\n.list_asset_assetItem__9aaRe:hover .list_asset_assetItemEyeButton__hpWBr {\n  display: block;\n}\n\n.list_asset_assetItemEyeButton__hpWBr {\n  display: none;\n  margin-right: var(--ui-kit-space-1);\n}\n\n.list_asset_assetItem__9aaRe:hover {\n  background: var(--ui-kit-color-secondary-hover);\n  border-radius: var(--ui-kit-border-radius);\n}\n");
var fs = "list_item_inner_listItemVideoOverrides__nHye6",
    ms = "list_item_inner_listItemCardOverrides__C1IoU";
St(".list_item_inner_listItemVideoOverrides__nHye6 > div {\n  width: calc(var(--ui-kit-base-unit) * 7) !important;\n}\n\n.list_item_inner_listItemVideoOverrides__nHye6 span {\n  left: calc(var(--ui-kit-space-050) * -1);\n  bottom: calc(var(--ui-kit-space-050) * -1);\n}\n\n.list_item_inner_listItemCardOverrides__C1IoU *,\n.list_item_inner_listItemCardOverrides__C1IoU *::after {\n  border-radius: var(--ui-kit-border-radius) !important;\n  border: 0 !important;\n}\n");
var vs = function(e) {
        var n, r, i = e.item;
        switch (i.type) {
            case "IMAGE":
                return t.createElement("div", {
                    className: ms,
                    style: gs()
                }, t.createElement(z, {
                    onClick: function() {},
                    thumbnailUrl: (null === (n = i.thumbnail) || void 0 === n ? void 0 : n.url) || "",
                    ariaLabel: "Add image ".concat(i.name, " to design")
                }));
            case "VIDEO":
                return t.createElement("div", {
                    className: Io(fs, ms),
                    style: gs()
                }, t.createElement(is, {
                    video: i,
                    onClick: function() {}
                }));
            case "EMBED":
                return t.createElement("div", {
                    className: ms,
                    style: gs()
                }, t.createElement(J, {
                    thumbnailUrl: (null === (r = i.thumbnail) || void 0 === r ? void 0 : r.url) || "",
                    title: "",
                    onClick: function() {},
                    onDragStart: function() {},
                    ariaLabel: "Add embed ".concat(i.name, " to design")
                }));
            default:
                return i
        }
    },
    gs = function() {
        return {
            width: "calc(".concat(tokens.baseUnit, " * 7)"),
            height: "calc(".concat(tokens.baseUnit, " * 7)")
        }
    },
    ys = "attachment_badge_attachmentBadgeText__ixKn9";
St(".attachment_badge_attachmentBadgeText__ixKn9 {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: start;\n  width: fit-content;\n}\n\n.attachment_badge_attachmentBadgeText__ixKn9 svg {\n  height: calc(var(--ui-kit-base-unit) * 2) !important;\n  width: calc(var(--ui-kit-base-unit) * 2) !important;\n}\n");
var bs = function(e) {
        var n = e.numAttachments;
        return t.createElement(Badge, {
            tone: "contrast",
            shape: "regular",
            ariaLabel: "".concat(n, " attachments"),
            tooltipLabel: "".concat(n, " attachments"),
            text: t.createElement("span", {
                className: ys
            }, t.createElement(Z, null), t.createElement("span", null, n))
        })
    },
    _s = function(e) {
        var n, r = e.onClick,
            i = e.onDetailsClick,
            a = e.item,
            o = e.onDragStart;
        return "AUDIO" === a.type ? t.createElement("div", {
            className: ds,
            onDragStart: o,
            draggable: "true"
        }, t.createElement(ls, {
            audio: a,
            onClick: r
        }), i && t.createElement("div", {
            className: ps
        }, t.createElement(Button, {
            onClick: function(e) {
                e.stopPropagation(), null == i || i()
            },
            icon: X,
            variant: "tertiary"
        }))) : t.createElement("div", {
            className: cs,
            onClick: r,
            onDragStart: o,
            draggable: "true"
        }, t.createElement("div", null, t.createElement("div", {
            className: hs
        }, t.createElement(vs, {
            item: a
        }))), t.createElement(Rows, {
            spacing: "0.5u",
            align: "start"
        }, t.createElement(Text, {
            size: "small",
            lineClamp: 1,
            variant: "bold"
        }, a.name), (null === (n = a.attachments) || void 0 === n ? void 0 : n.length) ? t.createElement(bs, {
            numAttachments: a.attachments.length
        }) : null), i && t.createElement("div", {
            className: ps
        }, t.createElement(Button, {
            onClick: function(e) {
                e.stopPropagation(), null == i || i()
            },
            icon: X,
            variant: "tertiary"
        })))
    },
    Es = function(e) {
        var n = e.items,
            r = e.onClick,
            i = e.onDetailsClick,
            a = e.onDragStart,
            o = e.isFetchingNextPage;
        return t.createElement(Rows, {
            spacing: "1u"
        }, t.createElement(Rows, {
            spacing: "0"
        }, null == n ? void 0 : n.map((function(e) {
            return t.createElement(_s, Tn({
                item: e,
                key: e.id,
                onClick: function() {
                    return r(e)
                },
                onDetailsClick: i ? function() {
                    return null == i ? void 0 : i(e)
                } : void 0,
                onDragStart: function(t) {
                    return a(t, e)
                }
            }, e))
        }))), o && t.createElement(ml, {
            itemCount: 5
        }))
    },
    ws = "masonry_asset_masonryAssetItem__9Ib-I",
    Cs = "masonry_asset_masonryAssetItemEyeButton__2Mtgh",
    Ss = "masonry_asset_attachmentsBadge__X6mPV";
St(".masonry_asset_masonryAssetItem__9Ib-I {\n  width: 100%;\n  height: 100%;\n  position: relative;\n  overflow-x: hidden;\n}\n\n.masonry_asset_masonryAssetItemEyeButton__2Mtgh,\n.masonry_asset_attachmentsBadge__X6mPV {\n  cursor: pointer;\n  position: absolute;\n  visibility: hidden;\n  z-index: 3;\n}\n\n.masonry_asset_masonryAssetItemEyeButton__2Mtgh {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  top: var(--ui-kit-space-050);\n  right: var(--ui-kit-space-050);\n  background-color: var(--ui-kit-color-contrast);\n  color: var(--ui-kit-color-contrast-fore);\n  border: 0;\n  border-radius: var(--ui-kit-border-radius);\n  padding: var(--ui-kit-space-050);\n  width: calc(var(--ui-kit-base-unit) * 3);\n  height: calc(var(--ui-kit-base-unit) * 3);\n  transform: translateY(calc(var(--ui-kit-base-unit) * -2.5));\n  transition: 0.1s ease-in;\n}\n\n.masonry_asset_masonryAssetItemEyeButton__2Mtgh:hover {\n  background-color: var(--ui-kit-color-contrast-hover);\n}\n\n.masonry_asset_attachmentsBadge__X6mPV {\n  transition: 0.15s ease-in-out;\n  bottom: var(--ui-kit-space-1);\n  right: var(--ui-kit-space-1);\n  pointer-events: none;\n}\n\n.masonry_asset_masonryAssetItem__9Ib-I:hover .masonry_asset_masonryAssetItemEyeButton__2Mtgh {\n  visibility: visible;\n  transform: translateY(0);\n}\n\n.masonry_asset_masonryAssetItem__9Ib-I:hover .masonry_asset_attachmentsBadge__X6mPV {\n  visibility: visible;\n}\n\n.masonry_asset_placeholderWrapper__SREB6 {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n}\n\n.masonry_asset_masonryVideoOverrides__w9P0Y *,\n.masonry_asset_masonryVideoOverrides__w9P0Y *::after {\n  border-radius: 0 !important;\n  border: 0 !important;\n}\n");
var ks = function(e) {
        var n, r = e.item,
            i = e.onClick,
            a = e.onDetailsClick,
            o = e.onDragStart,
            l = e.hideDetailsIcon,
            s = Xn();
        return t.createElement("div", {
            className: ws
        }, function() {
            var e, n;
            switch (r.type) {
                case "IMAGE":
                    return t.createElement(z, {
                        ariaLabel: r.name,
                        thumbnailUrl: (null === (e = r.thumbnail) || void 0 === e ? void 0 : e.url) || "No thumbnail URL provided",
                        onClick: i,
                        onDragStart: o
                    });
                case "VIDEO":
                    return t.createElement(is, {
                        video: r,
                        onClick: i,
                        onDragStart: o,
                        borderRadius: "none"
                    });
                case "EMBED":
                    return t.createElement(J, {
                        ariaLabel: r.name,
                        thumbnailUrl: (null === (n = r.thumbnail) || void 0 === n ? void 0 : n.url) || "No thumbnail URL provided",
                        onClick: i,
                        onDragStart: o
                    });
                default:
                    return r
            }
        }(), t.createElement("div", null, !l && t.createElement("button", {
            className: Cs,
            type: "button",
            onClick: function(e) {
                e.stopPropagation(), a && a()
            }
        }, t.createElement(X, null))), (null === (n = r.attachments) || void 0 === n ? void 0 : n.length) && !s ? t.createElement("div", {
            className: Ss
        }, t.createElement(bs, {
            numAttachments: r.attachments.length
        })) : null)
    },
    Os = function(e) {
        var n, r, i, a = e.items,
            o = e.onClick,
            l = e.onDetailsClick,
            s = e.onDragStart,
            u = e.isFetchingNextPage,
            c = Ct().resourceTypes,
            d = void 0 === c ? ["IMAGE", "VIDEO"] : c,
            p = u ? function(e) {
                for (var t = e.num, n = e.minHeight, r = e.maxHeight, i = [], a = 0; a < t; a++) {
                    var o = Math.floor(Math.random() * (r - n + 1) + n),
                        l = {
                            height: o,
                            width: Math.floor(o * (.8 * Math.random() + 1))
                        };
                    i.push(l)
                }
                return i
            }({
                num: 10,
                maxHeight: 150,
                minHeight: 100
            }).map((function(e, n) {
                return t.createElement(ee, {
                    targetWidthPx: e.width,
                    targetHeightPx: e.height,
                    key: "placeholder-".concat(n)
                }, t.createElement(PlaceHolder, {
                    shape: "sharpRectangle"
                }))
            })) : [];
        return d.includes("AUDIO") ? t.createElement(Rows, {
            spacing: "1u"
        }, (r = a, i = [], r.forEach((function(e, t) {
            var n = "AUDIO" === e.type ? "AUDIO" : "NON_AUDIO";
            0 === i.length || i[i.length - 1].type !== n ? i.push({
                type: n,
                assets: [e]
            }) : i[i.length - 1].assets.push(e), t === r.length - 1 && ("AUDIO" === i[i.length - 1].type && i.push({
                type: "NON_AUDIO",
                assets: [],
                isLastGroup: !0
            }), i[i.length - 1].isLastGroup = !0)
        })), i).map((function(e, n) {
            var r, i;
            return "AUDIO" === e.type ? t.createElement(Es, {
                key: n,
                items: e.assets,
                onClick: o,
                onDragStart: s,
                onDetailsClick: l
            }) : t.createElement(te, {
                targetRowHeightPx: 100,
                key: n
            }, Fn(Fn([], Dn((null === (i = null === (r = e.assets) || void 0 === r ? void 0 : r.filter((function(e) {
                return "AUDIO" !== e.type
            }))) || void 0 === i ? void 0 : i.map((function(e, n) {
                return t.createElement(ee, {
                    key: n,
                    targetHeightPx: e.thumbnail.height || 100,
                    targetWidthPx: e.thumbnail.width || 100
                }, t.createElement(ks, {
                    item: e,
                    key: e.id + n,
                    hideDetailsIcon: !l,
                    onClick: function() {
                        return o(e)
                    },
                    onDetailsClick: function() {
                        return null == l ? void 0 : l(e)
                    },
                    onDragStart: function(t) {
                        return s(t, e)
                    }
                }))
            }))) || []), !1), Dn(e.isLastGroup ? p : []), !1))
        }))) : t.createElement(te, {
            targetRowHeightPx: 100
        }, Fn(Fn([], Dn((null === (n = null == a ? void 0 : a.filter((function(e) {
            return "AUDIO" !== e.type
        }))) || void 0 === n ? void 0 : n.map((function(e, n) {
            return t.createElement(ee, {
                key: n,
                targetHeightPx: e.thumbnail.height || 100,
                targetWidthPx: e.thumbnail.width || 100
            }, t.createElement(ks, {
                item: e,
                key: e.id + n,
                hideDetailsIcon: !l,
                onClick: function() {
                    return o(e)
                },
                onDetailsClick: function() {
                    return null == l ? void 0 : l(e)
                },
                onDragStart: function(t) {
                    return s(t, e)
                }
            }))
        }))) || []), !1), Dn(p), !1))
    };

function xs(e) {
    var n = e.layout,
        r = e.items,
        i = e.onClick,
        a = e.onDragStart,
        o = e.onDetailsClick,
        l = e.isFetchingNextPage;
    return "FULL_WIDTH" === n ? t.createElement(us, {
        onClick: i,
        onDragStart: a,
        items: r,
        isFetchingNextPage: l
    }) : "LIST" === n ? t.createElement(Es, {
        onClick: i,
        onDragStart: a,
        onDetailsClick: o,
        items: r,
        isFetchingNextPage: l
    }) : t.createElement(Os, {
        onClick: i,
        onDragStart: a,
        onDetailsClick: o,
        items: r,
        isFetchingNextPage: l
    })
}
const {
    canva: Ns
} = window;
Ns.designInteraction.selection, Ns.designInteraction.overlay;
const Ps = Ns.dragAndDrop;

function Ts(e) {
    return Ns.designInteraction.addNativeElement(e)
}
const {
    canva: Is
} = window;

function Rs(e) {
    return Is.content.upload(e)
}

function As(e) {
    var t, n = null === (t = e.split("?")[0].split(".").pop()) || void 0 === t ? void 0 : t.toLowerCase();
    return n && {
        jpg: "image/jpeg",
        jpeg: "image/jpeg",
        png: "image/png",
        gif: "image/gif",
        webp: "image/webp",
        bmp: "image/bmp",
        svg: "image/svg+xml",
        mp4: "video/mp4"
    } [n] || null
}

function Ds(e, t) {
    var n, r;
    if (e.height && e.width) return {
        width: e.width,
        height: e.height
    };
    var i = function(e) {
        var t;
        if ("VIDEO" === e.type && "image/gif" !== e.mimeType) {
            var n = document.querySelector("video[src='".concat(e.previewUrl, "']"));
            if (n) return {
                width: n.videoWidth,
                height: n.videoHeight
            };
            var r = document.querySelector("video[src='".concat(e.url, "']"));
            if (r) return {
                width: r.videoWidth,
                height: r.videoHeight
            }
        }
        var i = document.querySelector("img[src='".concat((null === (t = e.thumbnail) || void 0 === t ? void 0 : t.url) || e.url, "']"));
        if (i) return {
            width: i.naturalWidth,
            height: i.naturalHeight
        }
    }(e);
    return i || ((null === (n = e.thumbnail) || void 0 === n ? void 0 : n.height) && (null === (r = e.thumbnail) || void 0 === r ? void 0 : r.width) ? {
        width: e.thumbnail.width,
        height: e.thumbnail.height
    } : t || {
        width: 100,
        height: 100
    })
}
var Fs = function(e, t) {
        return Rn(void 0, void 0, void 0, (function() {
            var n, r, i, a, o, l, s, u, c, d, p, h;
            return An(this, (function(f) {
                switch (f.label) {
                    case 0:
                        switch (e.type) {
                            case "IMAGE":
                                return [3, 1];
                            case "VIDEO":
                                return [3, 4];
                            case "EMBED":
                                return [3, 7];
                            case "AUDIO":
                                return [3, 9]
                        }
                        return [3, 12];
                    case 1:
                        return e.mimeType || null == t || t.warn("App Template: warning: asset is missing mimeType"), e.url ? (n = Tn({
                            type: "IMAGE",
                            mimeType: null !== (a = e.mimeType) && void 0 !== a ? a : As(e.url || (null === (o = e.thumbnail) || void 0 === o ? void 0 : o.url)),
                            url: null !== (l = e.url) && void 0 !== l ? l : null === (s = e.thumbnail) || void 0 === s ? void 0 : s.url,
                            thumbnailUrl: null !== (c = null === (u = e.thumbnail) || void 0 === u ? void 0 : u.url) && void 0 !== c ? c : e.url
                        }, Ds(e)), null == t || t.debug("Uploading image to Canva with options from click", n), [4, Rs(n)]) : (null == t || t.warn("App Template: warning: asset is missing url"), [2]);
                    case 2:
                        return [4, Ts({
                            type: "IMAGE",
                            ref: (i = f.sent()).ref
                        })];
                    case 3:
                    case 6:
                    case 8:
                    case 11:
                        return f.sent(), [2];
                    case 4:
                        return e.mimeType || null == t || t.warn("App Template: warning: asset is missing mimeType"), e.url ? (r = Tn({
                            type: "VIDEO",
                            mimeType: null !== (d = e.mimeType) && void 0 !== d ? d : As(e.url || (null === (p = e.thumbnail) || void 0 === p ? void 0 : p.url)),
                            url: e.url,
                            thumbnailImageUrl: null === (h = e.thumbnail) || void 0 === h ? void 0 : h.url,
                            thumbnailVideoUrl: e.previewUrl
                        }, Ds(e)), null == t || t.debug("Uploading video to Canva with options from click", r), [4, Rs(r)]) : (null == t || t.warn("App Template: warning: asset is missing url"), [2]);
                    case 5:
                        return [4, Ts({
                            type: "VIDEO",
                            ref: (i = f.sent()).ref
                        })];
                    case 7:
                        return [4, Ts({
                            type: "EMBED",
                            url: e.url
                        })];
                    case 9:
                        return [4, Rs({
                            type: "AUDIO",
                            title: e.name,
                            url: e.url,
                            mimeType: e.mimeType,
                            durationMs: e.durationMs
                        })];
                    case 10:
                        return i = f.sent(), [4, (m = {
                            ref: i.ref
                        }, Ns.designInteraction.addAudioTrack(m))];
                    case 12:
                        return [2, e];
                    case 13:
                        return [2]
                }
                var m
            }))
        }))
    },
    Ls = function(e, t, n) {
        if ("AUDIO" !== t.type) {
            var r = qs(t, n);
            Ps.startDrag(e, Us(t, Bs(r), n))
        } else Ps.startDrag(e, Ms(t, n))
    },
    Ms = function(e, t) {
        var n = {
            type: "AUDIO",
            resolveAudioRef: function() {
                return js(e)
            },
            durationMs: e.durationMs,
            title: e.name
        };
        return null == t || t.debug("Start dragging audio", n), n
    },
    Us = function(e, t, n) {
        var r, i, a, o, l;
        switch (e.type) {
            case "IMAGE":
                "image/gif" === e.mimeType && (null == n || n.warn("App Template: warning: GIF is being shown as an image. GIFs must be displayed as a video to upload properly."));
                var s = {
                    type: "IMAGE",
                    previewUrl: (null === (r = e.dragAndDropPreview) || void 0 === r ? void 0 : r.url) || e.thumbnail.url,
                    previewSize: t,
                    fullSize: Ds(e, t),
                    resolveImageRef: function() {
                        var t, r, i, a, o, l = {
                            type: "IMAGE",
                            mimeType: null !== (t = e.mimeType) && void 0 !== t ? t : As(e.url || (null === (r = e.thumbnail) || void 0 === r ? void 0 : r.url)),
                            url: null !== (i = e.url) && void 0 !== i ? i : null === (a = e.thumbnail) || void 0 === a ? void 0 : a.url,
                            thumbnailUrl: null === (o = e.thumbnail) || void 0 === o ? void 0 : o.url
                        };
                        return null == n || n.debug("Uploading image to Canva with options from drag and drop", l), Rs(l)
                    }
                };
                return null == n || n.debug("Start dragging image", s), s;
            case "VIDEO":
                var u = {
                    type: "VIDEO",
                    previewUrl: (null === (i = e.dragAndDropPreview) || void 0 === i ? void 0 : i.url) || (null === (a = e.thumbnail) || void 0 === a ? void 0 : a.url),
                    previewSize: t,
                    fullSize: Ds(e, t),
                    resolveVideoRef: function() {
                        var t, r = {
                            type: "VIDEO",
                            mimeType: e.mimeType,
                            url: e.url,
                            thumbnailImageUrl: null === (t = e.thumbnail) || void 0 === t ? void 0 : t.url,
                            thumbnailVideoUrl: e.previewUrl
                        };
                        return null == n || n.debug("Uploading video to Canva with options from drag and drop", r), Rs(r)
                    }
                };
                return null == n || n.debug("Start dragging video", u), u;
            case "EMBED":
                var c = {
                    type: "EMBED",
                    previewUrl: (null === (o = e.dragAndDropPreview) || void 0 === o ? void 0 : o.url) || (null === (l = e.thumbnail) || void 0 === l ? void 0 : l.url),
                    previewSize: t,
                    embedUrl: e.url
                };
                return null == n || n.debug("Start dragging embed", c), c;
            default:
                return e
        }
    },
    js = function(e) {
        return Rs({
            title: e.name,
            durationMs: e.durationMs,
            mimeType: e.mimeType,
            type: "AUDIO",
            url: e.url
        })
    };
var qs = function(e, t) {
        var n, r, i, a;
        if ((null === (n = e.dragAndDropPreview) || void 0 === n ? void 0 : n.width) && (null === (r = e.dragAndDropPreview) || void 0 === r ? void 0 : r.height)) return {
            width: e.dragAndDropPreview.width,
            height: e.dragAndDropPreview.height
        };
        if ((null === (i = e.thumbnail) || void 0 === i ? void 0 : i.width) && (null === (a = e.thumbnail) || void 0 === a ? void 0 : a.height)) return {
            width: e.thumbnail.width,
            height: e.thumbnail.height
        };
        if (function(e) {
            return ["IMAGE", "VIDEO"].includes(e.type)
        }(e)) {
            var o = Ds(e);
            if (o) return o
        }
        return null == t || t.warn("Unknown preview size of embed", e.url), {
            width: 100,
            height: 100
        }
    },
    Bs = function(e, t) {
        if (void 0 === t && (t = 200), e.width < 200) return e;
        var n = e.height / e.width;
        return {
            width: t,
            height: Math.round(t * n)
        }
    },
    Vs = function(e) {
        var n = e.emptyMessage,
            r = e.isInfinite,
            i = e.assetsShownPerPage,
            a = e.parentContainer,
            o = e.query,
            l = e.filters,
            s = e.onResultUpdate,
            u = e.resourceTypes,
            c = e.tab,
            d = Dn(useState(!1), 2),
            p = d[0],
            f = d[1],
            v = uo(),
            g = ns().currentLayout,
            y = Ct(),
            b = y.resourceTypes,
            _ = y.resourcesPerPage,
            E = ho({
                types: u || b || ["VIDEO", "IMAGE"],
                limit: void 0 === _ ? "FULL_WIDTH" === g ? 10 : 50 : _,
                query: o,
                filters: l,
                containerId: null == a ? void 0 : a.id,
                parentContainerType: null == a ? void 0 : a.type,
                tab: c
            }, {
                singlePage: !r,
                skip: p
            }),
            w = E.results,
            C = E.isLoading,
            S = E.isError,
            k = E.isEmpty,
            O = E.hasNextPage,
            x = E.isFetchingNextPage,
            N = E.fetchNextPage;
        useEffect((function() {
            S && f(!0)
        }), [S]), useEffect((function() {
            C || (S ? null == s || s("error") : (k && (null == s || s("empty")), (null == w ? void 0 : w.length) && (null == s || s("success"))))
        }), [w, s, C, S, k]);
        var P = ns(),
            T = P.currentLayout,
            I = P.Placeholder,
            R = Ln(),
            A = Xn(),
            D = t.useCallback((function(e) {
                R("/asset/".concat(e.id), {
                    state: {
                        item: e
                    }
                })
            }), [R]);
        return p ? t.createElement(vo, null, "Something went wrong, please try again.") : C ? t.createElement(I, null) : k ? t.createElement(vo, null, n) : r ? t.createElement(Bl, {
            loadMore: function() {
                N()
            },
            hasMore: O && !x,
            getScrollParent: function() {
                return document.querySelector(".".concat(zl))
            },
            useWindow: !1,
            className: Io(!O && Gl)
        }, t.createElement(xs, {
            onClick: A ? D : function(e) {
                return Fs(e, v)
            },
            onDragStart: function(e, t) {
                return Ls(e, t, v)
            },
            onDetailsClick: A ? void 0 : D,
            layout: T,
            items: w.filter(Jl).slice(0, r ? void 0 : i),
            isFetchingNextPage: x
        })) : t.createElement(xs, {
            onClick: A ? D : function(e) {
                return Fs(e, v)
            },
            onDragStart: function(e, t) {
                return Ls(e, t, v)
            },
            onDetailsClick: A ? void 0 : D,
            layout: T,
            items: w.filter(Jl).slice(0, r ? void 0 : i)
        })
    },
    Ws = "expand_control_expandControl__6UyVx",
    Hs = "expand_control_expandButton__NQkx3";
St(".expand_control_expandControl__6UyVx {\n  display: flex;\n  justify-content: space-between;\n}\n\n.expand_control_expandButton__NQkx3 {\n  position: relative;\n  background: transparent;\n  border: none;\n  cursor: pointer;\n}\n\n.expand_control_expandButton__NQkx3:hover {\n  color: var(--ui-kit-color-typography-link-hover);\n}\n");
var Qs = function(e) {
        var n = e.title,
            r = e.onExpand;
        return e.hide ? null : t.createElement("div", {
            className: Ws,
            role: "region"
        }, t.createElement(Title, {
            size: "xsmall"
        }, n), t.createElement("button", {
            className: Hs,
            onClick: r
        }, t.createElement(Text, {
            size: "small",
            tone: "tertiary",
            "aria-label": "See all items",
            tagName: "span",
            variant: "bold"
        }, "See all")))
    },
    zs = "all_tab_combinedResultMask__mqXHV",
    $s = "all_tab_allTab__aqGMW";
St(".all_tab_combinedResultMask__mqXHV {\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  top: 0;\n  background-color: inherit;\n  background-color: var(--ui-kit-color-surface);\n}\n\n.all_tab_allTab__aqGMW {\n  position: relative;\n}\n");
var Gs = function(e) {
        var n = e.tabs,
            r = e.onExpand,
            a = e.emptyMessage,
            l = e.parentContainer,
            s = e.query,
            u = e.filters,
            c = Dn(useState({}), 2),
            d = c[0],
            p = c[1],
            h = useCallback((function(e, t) {
                void 0 === d[e] && p((function(n) {
                    var r;
                    return Tn(Tn({}, n), ((r = {})[e] = t, r))
                }))
            }), [d]),
            f = useMemo((function() {
                var e = Object.values(d);
                if (!(e.length < n.length - 1)) return e.some((function(e) {
                    return "empty" !== e
                })) ? e.some((function(e) {
                    return "error" !== e
                })) ? void 0 : "error" : "empty"
            }), [d, n.length]);
        return t.createElement(Box, {
            className: Io($s, Gl)
        }, f && t.createElement(Ks, {
            result: f,
            emptyMessage: a
        }), t.createElement(Rows, {
            spacing: "3u"
        }, n.map((function(e, n) {
            return "CONTAINERS" === e.type ? t.createElement(Rows, {
                spacing: "1u",
                key: n
            }, t.createElement(Qs, {
                title: e.label,
                onExpand: function() {
                    return r(e.value)
                },
                hide: !!f
            }), t.createElement(Kl, {
                containerType: e.containerTypes[0] || e.value,
                containersShownPerPage: 3,
                icon: e.containerIcon,
                emptyMessage: a,
                parentContainer: l,
                query: s,
                filters: u,
                onResultUpdate: function(t) {
                    return h(e.value, t)
                },
                tab: e.value
            })) : "RESOURCES" === e.type ? t.createElement(Rows, {
                spacing: "1u",
                key: n
            }, t.createElement(Qs, {
                title: e.label,
                onExpand: function() {
                    return r(e.value)
                },
                hide: !!f
            }), t.createElement(Vs, {
                assetsShownPerPage: 5,
                query: s,
                filters: u,
                emptyMessage: a,
                parentContainer: l,
                onResultUpdate: function(t) {
                    return h(e.value, t)
                },
                resourceTypes: e.resourceTypes,
                tab: e.value
            })) : void 0
        }))))
    },
    Ks = function(e) {
        var n = e.result,
            r = e.emptyMessage;
        return t.createElement("div", {
            className: zs
        }, "empty" === n && t.createElement(vo, null, r), "error" === n && t.createElement(vo, null, "Something went wrong, please try again."))
    },
    Ys = function() {
        var e = ns(),
            n = e.setNextLayout,
            r = e.currentLayout;
        return e.showLayoutSwitch ? t.createElement(Button, {
            variant: "tertiary",
            onClick: n,
            icon: function() {
                return "MASONRY" === r ? t.createElement(ne, null) : t.createElement(re, null)
            }
        }) : null
    },
    Js = function(e) {
        void 0 === e && (e = zl);
        var t = uo();
        useEffect((function() {
            var n = document.querySelector(".".concat(e));
            if (n) {
                var r = n.offsetWidth - n.clientWidth || 0;
                null == t || t.debug("Offsetting scroll bar width of ".concat(r, " px")), n.style.paddingRight = "calc(".concat(tokens.space2, " - ").concat(r, "px)")
            }
        }), [e, t])
    },
    Zs = function(e) {
        var n = e.onTabChange,
            r = e.header,
            i = e.scrollRef,
            a = e.footer,
            o = e.tabs,
            l = e.currentTab,
            s = e.showLayoutSwitch,
            u = e.emptyMessage,
            c = e.parentContainer,
            d = e.query,
            p = e.filters,
            h = Ct().sortOptions;
        Js();
        var f = function() {
            return !(null == h ? void 0 : h.length) && s && l === Jo.ASSET
        };
        return t.createElement(On, {
            tabValue: l,
            onValueChange: n,
            className: Io(tl, !a && $l)
        }, t.createElement("div", {
            className: Io(Vl, Wl)
        }, t.createElement("div", {
            className: Io(Hl, o.length > 1 && Ql)
        }, r), t.createElement("div", {
            className: zl,
            ref: i
        }, t.createElement(Pn, {
            value: l || ""
        }, o.map((function(e) {
            var r;
            return t.createElement("div", {
                className: Io(o.length > 1 && nl, e.value !== l && il, s && f() && rl),
                key: "tab-".concat(e.value)
            }, "OVERVIEW" === e.type && t.createElement(Gs, {
                tabs: (null === (r = e.tabValues) || void 0 === r ? void 0 : r.length) ? o.filter((function(t) {
                    var n;
                    return null === (n = e.tabValues) || void 0 === n ? void 0 : n.includes(t.value)
                })) : o,
                onExpand: n,
                emptyMessage: u,
                parentContainer: c,
                query: d,
                filters: p
            }), "RESOURCES" === e.type && t.createElement(Rows, {
                spacing: "1u"
            }, s && (f() ? t.createElement(Columns, {
                spacing: "1u",
                alignY: "center"
            }, t.createElement(Column, null, t.createElement(Title, {
                size: "xsmall"
            }, "Assets")), t.createElement(Column, {
                width: "content"
            }, t.createElement(Ys, null))) : null), t.createElement(Vs, {
                emptyMessage: u,
                parentContainer: c,
                isInfinite: !0,
                query: d,
                filters: p,
                resourceTypes: e.resourceTypes,
                tab: e.value
            })), "CONTAINERS" === e.type && t.createElement(Rows, {
                spacing: "1u"
            }, t.createElement(Kl, {
                icon: e.containerIcon,
                emptyMessage: u,
                parentContainer: c,
                isInfinite: !0,
                query: d,
                filters: p,
                containerType: e.containerTypes[0] || e.value,
                tab: e.value
            })))
        })))), a))
    },
    Xs = function(e) {
        var n = e.onClick,
            r = e.exportTo;
        return t.createElement(Button, {
            stretch: !0,
            variant: "secondary",
            onClick: n,
            icon: function() {
                return t.createElement(ie, null)
            }
        }, "Save to ".concat(r))
    },
    eu = "export_button_box_stickyExportButtonContainer__8MVSG";
St(".export_button_box_stickyExportButtonContainer__8MVSG {\n  padding: var(--ui-kit-space-2) var(--ui-kit-space-2) var(--ui-kit-space-2) 0;\n  z-index: 999;\n  background-color: var(--ui-kit-color-surface);\n}\n");
var tu = function(e) {
        var n = e.defaultExportContainer,
            r = Ln(),
            i = Ct(),
            a = i.serviceName,
            o = i.export;
        return (null == o ? void 0 : o.enabled) ? t.createElement("div", {
            className: eu
        }, t.createElement(Xs, {
            onClick: function() {
                return r("/export", {
                    state: {
                        exportToContainer: n
                    }
                })
            },
            exportTo: a
        })) : null
    },
    nu = function(e) {
        var n = e.title,
            r = e.goBack,
            i = rt();
        return t.createElement(Columns, {
            spacing: "1u",
            alignY: "center",
            align: "start"
        }, t.createElement(Column, {
            width: "content"
        }, t.createElement(Button, {
            onClick: r || function() {
                return i(-1)
            },
            icon: ArrowLeftIcon,
            variant: "tertiary"
        })), t.createElement(Column, null, t.createElement(Title, {
            size: "xsmall",
            lineClamp: 1
        }, n)))
    },
    ru = function() {
        var e = Ct(),
            n = e.containerTypes,
            r = e.moreInfoMessage,
            a = e.exit,
            o = e.tabs,
            l = e.sortOptions,
            s = e.export,
            u = Ln(),
            c = useMemo((function() {
                return function(e, t) {
                    if (null == e ? void 0 : e.length) return null == e ? void 0 : e.map((function(e) {
                        var n;
                        return "CONTAINERS" === e.type ? Tn(Tn({}, e), {
                            containerIcon: null === (n = null == t ? void 0 : t.find((function(t) {
                                return t.value === e.containerTypes[0]
                            }))) || void 0 === n ? void 0 : n.icon
                        }) : e
                    }));
                    var n = [];
                    if (t) {
                        var r = t.filter((function(e) {
                            var t;
                            return null === (t = e.listingSurfaces) || void 0 === t ? void 0 : t.some((function(e) {
                                return "HOMEPAGE" === e.surface
                            }))
                        }));
                        n.push.apply(n, Fn([], Dn(r.map((function(e) {
                            return {
                                value: e.value,
                                label: e.label,
                                containerIcon: e.icon,
                                type: "CONTAINERS",
                                containerTypes: [e.value]
                            }
                        }))), !1))
                    }
                    return n.push({
                        value: Jo.ASSET,
                        label: "Assets",
                        type: "RESOURCES"
                    }), n.length > 1 && n.unshift({
                        value: Jo.ALL,
                        label: "All",
                        type: "OVERVIEW",
                        tabValues: n.map((function(e) {
                            return e.value
                        }))
                    }), n
                }(o, n)
            }), [n, o]),
            d = it().tab,
            p = void 0 === d ? c[0].value : d,
            f = el(),
            m = f.scrollRef,
            v = f.hide,
            g = useMemo((function() {
                return r ? c.length > 1 ? {
                    position: "TAB",
                    message: r
                } : (null == l ? void 0 : l.length) ? {
                    position: "SORT",
                    message: r
                } : {
                    position: "STANDALONE",
                    message: r
                } : {
                    position: "NONE"
                }
            }), [r, l, c]);
        return useEffect((function() {
            m.current && (m.current.scrollTop = 0)
        }), [p, m]), t.createElement(Zs, {
            currentTab: p,
            header: t.createElement(Box, {
                paddingTop: (null == a ? void 0 : a.enabled) ? "0" : "1u"
            }, t.createElement(Rows, {
                spacing: "1u"
            }, (null == a ? void 0 : a.enabled) && t.createElement(nu, {
                title: a.text,
                goBack: a.onExit
            }), t.createElement($o, null), !v && (null == l ? void 0 : l.length) && t.createElement(Columns, {
                spacing: "0",
                alignY: "center"
            }, t.createElement(Column, null, t.createElement(Xo, null)), "SORT" === g.position && t.createElement(Column, {
                width: "containedContent"
            }, t.createElement(Ko, {
                message: g.message
            }))), !v && "STANDALONE" === g.position && t.createElement(Box, {
                flexDirection: "row",
                display: "flex",
                alignItems: "center",
                justifyContent: "start"
            }, t.createElement(Text, null, "Can't find your files?"), t.createElement(Ko, {
                message: g.message
            })), c.length > 1 && t.createElement("div", {
                className: kt
            }, t.createElement(Columns, {
                spacing: "0",
                alignY: "center"
            }, t.createElement(Column, null, t.createElement(xn, null, c.map((function(e, n) {
                var r = e.value,
                    i = e.label;
                return t.createElement(Nn, {
                    key: n,
                    value: r
                }, i)
            })))), "TAB" === g.position && t.createElement(Column, {
                width: "containedContent"
            }, t.createElement(Ko, {
                message: g.message
            })))))),
            footer: (null == s ? void 0 : s.enabled) ? t.createElement(tu, null) : null,
            scrollRef: m,
            onTabChange: function(e) {
                u("/home/".concat(e.toLowerCase()), {
                    replace: !0
                })
            },
            tabs: c
        })
    },
    iu = {
        itemDetailsContent: "item_details_view_itemDetailsContent__TcQ8i",
        attributesList: "item_details_view_attributesList__1VKTe"
    };
St(".item_details_view_itemDetailsContent__TcQ8i {\n  width: 100%;\n}\n\nul.item_details_view_attributesList__1VKTe {\n  list-style-type: none;\n  padding: 0;\n  margin: 0;\n  display: flex;\n  flex-direction: column;\n  row-gap: var(--ui-kit-base-unit);\n}\n");
var au, ou = "unsupported_file_unsupportedFileDetailsPage__sjGGr",
    lu = "unsupported_file_unsupportedFileItem__wBt1z",
    su = "unsupported_file_unsupportedFileItemActive__rfoeD",
    uu = "unsupported_file_itemFileNameBox__qIlrY",
    cu = "unsupported_file_itemFileIconBox__4bg2V",
    du = "unsupported_file_warnBadge__q61Is";

function pu() {
    return pu = Object.assign ? Object.assign.bind() : function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
        }
        return e
    }, pu.apply(this, arguments)
}
St(".unsupported_file_unsupportedFileDetailsPage__sjGGr {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n}\n\n.unsupported_file_unsupportedFileItem__wBt1z {\n  box-sizing: border-box;\n  width: 100%;\n  cursor: pointer;\n  color: var(--ui-kit-color-typography-primary);\n  cursor: pointer;\n  background: transparent;\n  text-align: start;\n  padding: var(--ui-kit-space-1);\n  border-radius: var(--ui-kit-border-radius);\n  height: calc(var(--ui-kit-base-unit) * 9);\n}\n\n.unsupported_file_unsupportedFileItemActive__rfoeD {\n  cursor: default;\n}\n\n.unsupported_file_itemFileNameBox__qIlrY {\n  display: flex;\n  flex-direction: row;\n  align-items: baseline;\n  justify-content: start;\n}\n\n.unsupported_file_unsupportedFileItem__wBt1z:hover {\n  background-color: var(--ui-kit-color-secondary-hover);\n}\n\n.unsupported_file_unsupportedFileItemActive__rfoeD {\n  background-color: var(--ui-kit-color-secondary-hover);\n}\n\n.unsupported_file_itemFileIconBox__4bg2V {\n  background-color: var(--ui-kit-color-neutral);\n  border-radius: var(--ui-kit-border-radius);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: calc(var(--ui-kit-base-unit) * 7);\n  width: calc(var(--ui-kit-base-unit) * 7);\n}\n\n.unsupported_file_itemFileIconBox__4bg2V svg {\n  height: calc(var(--ui-kit-base-unit) * 3);\n  width: calc(var(--ui-kit-base-unit) * 3);\n}\n\n.unsupported_file_unsupportedFileItem__wBt1z:hover .unsupported_file_warnBadge__q61Is {\n  display: flex;\n}\n\n.unsupported_file_unsupportedFileItemActive__rfoeD .unsupported_file_warnBadge__q61Is {\n  display: flex;\n}\n\n.unsupported_file_warnBadge__q61Is {\n  width: calc(var(--ui-kit-base-unit) * 2);\n  height: calc(var(--ui-kit-base-unit) * 2);\n  display: none;\n  background-color: var(--ui-kit-color-warn-hover);\n  border-radius: 50%;\n  align-items: center;\n  justify-content: center;\n  margin-right: var(--ui-kit-space-050);\n}\n\n.unsupported_file_warnBadge__q61Is span {\n  margin: calc(var(--ui-kit-space-050) * 0.5);\n  margin-bottom: var(--ui-kit-space-050);\n}\n");
var hu = function(t) {
        return react.createElement("svg", pu({
            xmlns: "http://www.w3.org/2000/svg",
            width: 24,
            height: 24,
            fill: "none"
        }, t), au || (au = react.createElement("path", {
            fill: "currentColor",
            fillRule: "evenodd",
            d: "M6.5 4a.5.5 0 0 1 .5-.5h4.002v4.503a2 2 0 0 0 2 2h5.248a.75.75 0 0 0 .75-.75V9.25a.747.747 0 0 0-.22-.531l-6.134-6.134A2.002 2.002 0 0 0 11.231 2h-4.23A2 2 0 0 0 5 4v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7.75a.75.75 0 0 0-1.5 0V20a.5.5 0 0 1-.5.5H7a.5.5 0 0 1-.5-.5zm9.942 4.503-3.94-3.94v3.44a.5.5 0 0 0 .5.5zM9 17a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5A.75.75 0 0 1 9 17m.75-4.754a.75.75 0 0 0 0 1.5h4.5a.75.75 0 0 0 0-1.5z",
            clipRule: "evenodd"
        })))
    },
    fu = function(e) {
        var n = e.filename,
            r = e.onClick,
            i = e.active,
            a = function(e) {
                if (!e) return {
                    baseName: "Unnamed file"
                };
                var t = e.lastIndexOf(".");
                if (t > 0) {
                    var n = e.substring(t);
                    return n.length > 20 ? {
                        baseName: e
                    } : {
                        extension: n,
                        baseName: e.substring(0, t)
                    }
                }
                return {
                    baseName: e
                }
            }(n),
            o = a.baseName,
            l = a.extension;
        return t.createElement("div", {
            onClick: r,
            className: Io(lu, i && su)
        }, t.createElement(Columns, {
            spacing: "1.5u",
            alignY: "center",
            align: "start"
        }, t.createElement(Column, {
            width: "containedContent"
        }, t.createElement("div", {
            className: cu
        }, t.createElement(hu, null))), t.createElement(Column, null, t.createElement("div", {
            className: uu
        }, t.createElement(Text, {
            size: "small",
            lineClamp: 1,
            variant: "bold"
        }, o), t.createElement(Text, {
            size: "small",
            lineClamp: 1,
            variant: "bold"
        }, l))), t.createElement(Column, {
            width: "containedContent"
        }, t.createElement("div", {
            className: du,
            "aria-label": "This file is currently not supported by Canva"
        }, t.createElement(ae, null)))))
    };
var mu = "attachment_list_attachmentDivider__MqNqB";
St(".attachment_list_attachmentDivider__MqNqB {\n  width: 100%;\n  height: 0;\n  border-bottom: var(--ui-kit-color-border) 1px solid;\n  margin: var(--ui-kit-space-050);\n}\n");
var vu = {
        "Name (A-Z)": function(e, t) {
            return _u(e.name, t.name)
        },
        "Name (Z-A)": function(e, t) {
            return _u(e.name, t.name, "descending")
        },
        "Dimension (largest)": yu((function(e, t) {
            var n, r, i, a;
            return Eu((null !== (n = e.height) && void 0 !== n ? n : 0) * (null !== (r = e.width) && void 0 !== r ? r : 0), (null !== (i = t.height) && void 0 !== i ? i : 0) * (null !== (a = t.width) && void 0 !== a ? a : 0), "descending")
        })),
        "Dimension (smallest)": yu((function(e, t) {
            var n, r, i, a;
            return Eu((null !== (n = e.height) && void 0 !== n ? n : 0) * (null !== (r = e.width) && void 0 !== r ? r : 0), (null !== (i = t.height) && void 0 !== i ? i : 0) * (null !== (a = t.width) && void 0 !== a ? a : 0))
        })),
        "Date Created (newest)": yu((function(e, t) {
            var n, r;
            return Eu(null === (n = e.createdAt) || void 0 === n ? void 0 : n.getTime(), null === (r = t.createdAt) || void 0 === r ? void 0 : r.getTime(), "descending")
        })),
        "Date Created (oldest)": yu((function(e, t) {
            var n, r;
            return Eu(null === (n = e.createdAt) || void 0 === n ? void 0 : n.getTime(), null === (r = t.createdAt) || void 0 === r ? void 0 : r.getTime())
        }))
    },
    gu = function(e) {
        var n = e.attachments,
            r = e.onClickAttachment,
            a = uo(),
            o = Dn(useState(n.filter((function(e) {
                return "IMAGE" === e.type || "VIDEO" === e.type || "EMBED" === e.type
            }))), 2),
            l = o[0],
            s = o[1],
            u = useMemo((function() {
                return n.filter((function(e) {
                    return "OTHER" === e.type
                }))
            }), [n]);
        return l.length || u.length ? t.createElement(Rows, {
            spacing: "1u"
        }, t.createElement(Title, {
            size: "xsmall"
        }, "Attachments"), l && t.createElement(H, {
            options: Object.keys(vu).map((function(e) {
                return {
                    value: e
                }
            })),
            stretch: !0,
            placeholder: "Sort attachments",
            onChange: function(e) {
                return e && s((function(t) {
                    return Fn([], Dn(t.sort(vu[e])), !1)
                }))
            }
        }), t.createElement(Rows, {
            spacing: "0"
        }, l.map((function(e, n) {
            return t.createElement(_s, {
                key: n,
                item: e,
                onClick: function() {
                    return Fs(e, a)
                },
                onDragStart: function(t) {
                    return Ls(t, e, a)
                },
                onDetailsClick: function() {
                    return r(e)
                }
            })
        })), l.length && u.length ? t.createElement(Box, {
            className: mu
        }) : null, u.map((function(e, n) {
            return t.createElement(fu, {
                filename: e.filename,
                key: n,
                onClick: function() {
                    return r(e)
                }
            })
        })))) : null
    };

function yu(e) {
    return function(t, n) {
        return bu(t) && bu(n) ? e(t, n) : bu(t) || bu(n) ? bu(t) ? -1 : 1 : 0
    }
}

function bu(e) {
    return "IMAGE" === e.type || "VIDEO" === e.type
}

function _u(e, t, n) {
    return void 0 === n && (n = "ascending"), e || t ? e ? t ? "ascending" === n ? e.localeCompare(t) : -e.localeCompare(t) : -1 : 1 : 0
}

function Eu(e, t, n) {
    return void 0 === n && (n = "ascending"), e || t ? e ? t ? "ascending" === n ? e - t : t - e : -1 : 1 : 0
}
var wu = function(e) {
    var n, r, i = e.item,
        a = e.onDragStart,
        o = e.onClick,
        l = void 0 === o ? function() {} : o,
        s = Dn(t.useState(), 2),
        u = s[0],
        c = s[1],
        d = Ln(),
        p = function(e) {
            var t = e.attributes || {};
            if ("EMBED" === e.type) return t.URL = e.url, Object.entries(t);
            "AUDIO" !== e.type && e.width && e.height && (t.Dimension = "".concat(e.width, " x ").concat(e.height));
            e.createdAt && (t["Created at"] = Su(new Date(e.createdAt)));
            e.updatedAt && (t["Updated at"] = Su(new Date(e.updatedAt)));
            return Object.entries(t)
        }(i),
        h = Ct().search,
        f = Do(),
        m = f.filterButtonStatus,
        v = f.filterFormConfig;
    return t.createElement(Rows, {
        spacing: "2u"
    }, i.tags && t.createElement("div", {
        "aria-label": "Asset Tags",
        role: "region"
    }, t.createElement(Carousel, null, i.tags.map((function(e, n) {
        return t.createElement(Pill, {
            text: e.label,
            key: n,
            onClick: function() {
                return function(e) {
                    var t, n, r;
                    if (null == h ? void 0 : h.enabled) {
                        var i = null === (n = null == v ? void 0 : v.filters) || void 0 === n ? void 0 : n.find((function(e) {
                            return e.label.toLowerCase().startsWith("tag")
                        }));
                        i && "disable" !== m && (null === (r = i.options) || void 0 === r ? void 0 : r.some((function(t) {
                            return t.value === e.value
                        }))) ? d("/search", {
                            state: {
                                item: void 0,
                                query: void 0,
                                filters: {
                                    selectedOptions: (t = {}, t[i.key] = {
                                        selected: [e.value]
                                    }, t)
                                }
                            }
                        }) : d("/search", {
                            state: {
                                item: void 0,
                                query: e.label,
                                filter: void 0
                            }
                        })
                    }
                }(e)
            }
        })
    })))), t.createElement(Button, {
        variant: "primary",
        onClick: function() {
            return Rn(this, void 0, void 0, (function() {
                return An(this, (function(e) {
                    switch (e.label) {
                        case 0:
                            return c({
                                status: "loading"
                            }), [4, l()];
                        case 1:
                            return e.sent(), c({
                                status: "ready"
                            }), [2]
                    }
                }))
            }))
        },
        loading: "loading" === (null == u ? void 0 : u.status),
        stretch: !0
    }, "Add to design"), t.createElement("div", {
        className: iu.itemDetailsContent
    }, t.createElement(Rows, {
        spacing: "2u"
    }, t.createElement("div", {
        style: {
            minHeight: "calc(".concat(tokens.baseUnit, " * 10)")
        }
    }, "IMAGE" === i.type && t.createElement(z, {
        ariaLabel: "Image: ".concat(i.name),
        thumbnailUrl: (null === (n = i.thumbnail) || void 0 === n ? void 0 : n.url) || "No thumbnail URL provided",
        alt: i.name,
        onDragStart: a,
        onClick: l
    }), "VIDEO" === i.type && t.createElement(is, {
        video: i,
        onClick: l,
        onDragStart: a
    }), "EMBED" === i.type && t.createElement(J, {
        ariaLabel: "Embed: ".concat(i.name),
        thumbnailUrl: (null === (r = i.thumbnail) || void 0 === r ? void 0 : r.url) || "No thumbnail URL provided",
        onDragStart: a,
        onClick: l,
        title: ""
    }), "AUDIO" === i.type && t.createElement(ls, {
        audio: i,
        onClick: l,
        onDragStart: a
    })), t.createElement("div", {
        className: iu.attributes,
        "aria-labelledby": "attributesLabel"
    }, t.createElement("ul", {
        className: iu.attributesList
    }, t.createElement("li", {
        className: iu.attributeItem
    }, t.createElement(Text, {
        tagName: "span"
    }, "EMBED" !== i.type && i.filename || i.name)), i.description && t.createElement("li", null, t.createElement(Text, {
        size: "small",
        tagName: "span"
    }, i.description)), null == p ? void 0 : p.map((function(e) {
        var n = Dn(e, 2),
            r = n[0],
            i = n[1];
        return t.createElement("li", {
            key: "".concat(r),
            className: iu.attributeItem
        }, t.createElement(Text, {
            size: "small",
            tagName: "span"
        }, r), t.createElement("strong", null, " • "), t.createElement(Text, {
            size: "small",
            tagName: "span"
        }, i))
    })))), i.attachments && t.createElement(gu, {
        attachments: i.attachments,
        onClickAttachment: function(e) {
            return d("/attachment/".concat(i.id, "/").concat(e.id), {
                state: {
                    attachment: e,
                    item: i
                }
            })
        }
    }))))
};
var Cu = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric"
};

function Su(e) {
    var t;
    return null === (t = null == e ? void 0 : e.toLocaleDateString) || void 0 === t ? void 0 : t.call(e, void 0, Cu)
}
var ku = function() {
        var e, n = et(),
            r = uo(),
            i = Ln();
        Js();
        var a = null === (e = n.state) || void 0 === e ? void 0 : e.item;
        return a && "CONTAINER" !== a.type && "UNKNOWN" !== a.type ? t.createElement(Box, {
            paddingEnd: "2u",
            className: zl
        }, t.createElement(Rows, {
            spacing: "1u"
        }, t.createElement(nu, {
            title: a.name
        }), t.createElement(wu, {
            item: a,
            onClick: function() {
                return Fs(a, r)
            },
            onDragStart: function(e) {
                return Ls(e, a, r)
            }
        }))) : (i("/home"), null)
    },
    Ou = "export_container_select_optionsContainer__trutG",
    xu = "export_container_select_dropdownSelect__2-3oF",
    Nu = "export_container_select_popoverDiv__S6tAl",
    Pu = "export_container_select_dropdownItem__ebWwG",
    Tu = "export_container_select_container__vHL43",
    Iu = "export_container_select_viewMoreButton__bG-z0",
    Ru = "export_container_select_panelContent__ZfaRn",
    Au = "export_container_select_containerContent__pNxVE";
St(".export_container_select_optionsContainer__trutG {\n  max-height: 270px;\n  min-height: 25px;\n  overflow-y: scroll;\n  padding-right: 0;\n}\n\n.export_container_select_dropdownSelect__2-3oF {\n  border-radius: var(--ui-kit-border-radius);\n  border: 1px solid var(--ui-kit-color-border);\n  background: var(--ui-kit-color-page);\n  height: 40px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-top: var(--ui-kit-space-1);\n  cursor: pointer;\n  padding: 0 calc(var(--ui-kit-space-1) * 1.5);\n}\n\n.export_container_select_popoverDiv__S6tAl {\n  width: 100%;\n  background: var(--ui-kit-color-surface);\n  box-shadow: var(--ui-kit-box-shadow-faint);\n  border-radius: var(--ui-kit-border-radius);\n  position: absolute;\n  padding: var(--ui-kit-space-1) 0;\n  z-index: 99;\n  margin-top: var(--ui-kit-space-050);\n}\n\n.export_container_select_dropdownItem__ebWwG {\n  display: flex;\n  font-weight: 400;\n  height: calc(var(--ui-kit-base-unit) * 5);\n  padding: 0 calc(var(--ui-kit-base-unit) * 2);\n  align-items: center;\n  justify-content: space-between;\n  cursor: pointer;\n}\n\n.export_container_select_container__vHL43 {\n  display: flex;\n  align-items: center;\n  gap: var(--ui-kit-space-1);\n}\n\n.export_container_select_viewMoreButton__bG-z0 {\n  margin: var(--ui-kit-space-1) var(--ui-kit-space-2);\n}\n\n.export_container_select_panelContent__ZfaRn {\n  margin: var(--ui-kit-space-1);\n}\n\n.export_container_select_containerContent__pNxVE {\n  display: flex;\n  min-height: calc(var(--ui-kit-base-unit) * 6);\n  align-items: center;\n  justify-content: center;\n}\n");
var Du = function(e) {
        var n = e.containerOptions,
            r = e.selectedContainer,
            i = e.setSelectedContainer,
            a = e.containerType,
            o = void 0 === a ? "CONTAINER" : a,
            l = e.hasNextPage,
            s = e.fetchNextPage,
            u = e.isFetchingNextPage,
            c = e.containersLoading,
            d = Dn(useState(""), 2),
            p = d[0],
            f = d[1],
            v = Dn(useState(n), 2),
            g = v[0],
            y = v[1];
        return useEffect((function() {
            y(n.filter((function(e) {
                return e.name.toLowerCase().includes(p.toLowerCase())
            })))
        }), [p, n]), t.createElement(Rows, {
            spacing: "1u"
        }, t.createElement(Ui, {
            style: {
                position: "relative"
            }
        }, (function(e) {
            var a = e.open;
            return t.createElement(t.Fragment, null, t.createElement("div", {
                style: {
                    width: "100%"
                }
            }, t.createElement(Ui.Button, {
                as: "div"
            }, t.createElement("div", {
                className: xu
            }, t.createElement(Text, null, (null == r ? void 0 : r.name) || "Select"), t.createElement(ChevronDownIcon, null)))), a && t.createElement(t.Fragment, null, t.createElement(Ui.Overlay, null), t.createElement(Ui.Panel, {
                className: Nu
            }, (function(e) {
                var a = e.close;
                return c ? t.createElement(Rows, {
                    spacing: "2u"
                }, Array.from({
                    length: 4
                }).map((function(e, n) {
                    return t.createElement("div", {
                        key: n,
                        style: {
                            height: "calc(".concat(tokens.baseUnit, " * 4)"),
                            width: "100%",
                            padding: "0 ".concat(tokens.space2)
                        }
                    }, t.createElement(PlaceHolder, {
                        shape: "rectangle"
                    }))
                }))) : c || (null == n ? void 0 : n.length) ? r ? t.createElement("div", {
                    className: Ru
                }, t.createElement(Rows, {
                    spacing: "1u"
                }, t.createElement(Columns, {
                    spacing: "1u",
                    alignY: "center",
                    align: "start"
                }, t.createElement(Column, {
                    width: "content"
                }, t.createElement(Button, {
                    onClick: function() {
                        return i(void 0)
                    },
                    icon: ArrowLeftIcon,
                    variant: "tertiary"
                })), t.createElement(Column, null, t.createElement(Title, {
                    size: "xsmall"
                }, r.name))), t.createElement("div", {
                    className: Au
                }, t.createElement(Text, {
                    size: "small"
                }, "Save here")), t.createElement(Button, {
                    variant: "primary",
                    stretch: !0,
                    onClick: function() {
                        return a()
                    }
                }, "Select"))) : t.createElement("div", null, t.createElement("div", {
                    style: {
                        margin: "0px 8px 16px"
                    }
                }, t.createElement(ar, {
                    query: p,
                    onQueryChange: f,
                    placeholder: "Search all ".concat(o)
                })), t.createElement("div", {
                    className: Io(zl, Ou)
                }, g.map((function(e) {
                    return t.createElement("div", {
                        key: e.id,
                        onClick: function() {
                            i(e)
                        },
                        className: Pu
                    }, t.createElement("span", {
                        className: Tu
                    }, t.createElement($, null), t.createElement(Text, null, e.name)))
                })), l && s && !u && t.createElement("div", {
                    className: Iu
                }, t.createElement(Button, {
                    variant: "secondary",
                    onClick: function() {
                        s()
                    },
                    stretch: !0
                }, "View More")), u && t.createElement(Rows, {
                    spacing: "2u"
                }, Array.from({
                    length: 4
                }).map((function(e, n) {
                    return t.createElement("div", {
                        key: n,
                        style: {
                            height: "calc(".concat(tokens.baseUnit, " * 4)"),
                            width: "100%",
                            padding: "0 ".concat(tokens.space2)
                        }
                    }, t.createElement(PlaceHolder, {
                        shape: "rectangle"
                    }))
                }))))) : t.createElement("div", {
                    className: Ru
                }, t.createElement(vo, null))
            }))))
        })))
    },
    Fu = "export_loading__yW0qZ",
    Lu = "export_exportContainer__rJb8B";
St(".export_loading__yW0qZ {\n  padding-right: var(--ui-kit-space-2);\n  margin: 0 var(--ui-kit-space-1);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100%;\n}\n\n.export_exportContainer__rJb8B {\n  padding-right: var(--ui-kit-space-2);\n  margin-top: var(--ui-kit-space-2);\n}\n");
var Mu = createContext(void 0),
    Uu = function(e) {
        var n = e.children,
            r = Dn(useState(), 2),
            i = r[0],
            a = r[1],
            o = Dn(useState(), 2),
            l = o[0],
            s = o[1];
        return useEffect((function() {
            return function() {
                return clearTimeout(l)
            }
        })), t.createElement(Mu.Provider, {
            value: {
                toast: i,
                sendToastNotification: function(e) {
                    if (clearTimeout(l), a(e), !e.dismissible) {
                        var t = setTimeout((function() {
                            a(void 0)
                        }), 2e3);
                        s(t)
                    }
                },
                removeToast: function() {
                    return a(void 0)
                }
            }
        }, n)
    },
    ju = function() {
        var e = useContext(Mu);
        if (!e) throw new Error("useToast must be used within a ToastProvider");
        return e
    },
    qu = function(e) {
        var n = e.containerOptions,
            i = e.navigateBack,
            a = e.upload,
            l = e.defaultContainer,
            s = e.hasNextPage,
            u = e.fetchNextPage,
            c = e.isFetchingNextPage,
            d = e.exportTo,
            p = e.acceptedFileTypes,
            f = e.exportToContainerType,
            v = e.estimatedUploadTimeMs,
            g = void 0 === v ? 2e3 : v,
            y = e.containersLoading,
            _ = Dn(useState(l), 2),
            E = _[0],
            w = _[1],
            C = useContext(co).refreshResources,
            S = Dn(useState(!1), 2),
            k = S[0],
            O = S[1],
            x = ju().sendToastNotification,
            N = function(e, t) {
                void 0 === t && (t = !1);
                var n = Dn(useState(0), 2),
                    r = n[0],
                    i = n[1];
                return useEffect((function() {
                    var n = null,
                        r = null,
                        a = function(o) {
                            n || (n = o);
                            var l = o - n;
                            if (l >= e) i(t ? 100 : 95);
                            else {
                                var s, u = l / e;
                                s = u <= .5 ? Math.round(100 * u) : u <= .7 ? Math.round(50 + 40 * (u - .5)) : Math.round(70 + 30 * (u - .7)), (t || s <= 95) && i(s), r = requestAnimationFrame(a)
                            }
                        };
                    return r = requestAnimationFrame(a),
                        function() {
                            r && cancelAnimationFrame(r)
                        }
                }), [e, t]), {
                    progress: r
                }
            }(g || 2e3).progress,
            P = uo(),
            T = Dn(useState(!1), 2),
            I = T[0],
            D = T[1],
            L = useCallback((function(e) {
                return Rn(void 0, void 0, void 0, (function() {
                    var t, n;
                    return An(this, (function(r) {
                        switch (r.label) {
                            case 0:
                                return null == P || P.debug("Requesting to start export"), [4, (o = {
                                    acceptedFileTypes: p || ["PNG", "PDF_STANDARD", "JPG", "GIF", "SVG", "VIDEO", "PPTX"]
                                }, Ns.export.requestExport(o))];
                            case 1:
                                switch (t = r.sent(), t.status) {
                                    case "COMPLETED":
                                        return [3, 2];
                                    case "ABORTED":
                                        return [3, 7]
                                }
                                return [3, 8];
                            case 2:
                                n = function() {
                                    return x({
                                        message: "Failed to export to ".concat((null == E ? void 0 : E.name) || d),
                                        tone: "critical",
                                        dismissible: !0
                                    })
                                }, r.label = 3;
                            case 3:
                                return r.trys.push([3, 5, , 6]), [4, a(t.exportBlobs[0].url, e)];
                            case 4:
                                return r.sent().success ? (x({
                                    message: "Successfully exported to ".concat((null == E ? void 0 : E.name) || d),
                                    tone: "positive"
                                }), C(), i()) : (n(), i()), [3, 6];
                            case 5:
                                return r.sent(), n(), i(), [3, 6];
                            case 6:
                                return [3, 9];
                            case 7:
                                return i(), [3, 9];
                            case 8:
                                return [2, t];
                            case 9:
                                return O(!1), [2]
                        }
                        var o
                    }))
                }))
            }), [p, d, P, i, E, x, a]);
        useEffect((function() {
            E && D(!1)
        }), [E]), useEffect((function() {
            f || (L(), O(!0))
        }), [f, L]);
        return k ? t.createElement("div", {
            className: Fu
        }, t.createElement(Rows, {
            spacing: "1u"
        }, t.createElement(Title, {
            size: "xsmall",
            alignment: "center"
        }, "Exporting design to ", (null == E ? void 0 : E.name) || d), t.createElement(oe, {
            value: N,
            size: "medium"
        }), t.createElement(Text, {
            tone: "tertiary",
            alignment: "center"
        }, "Please wait, this can take a few moments."))) : f ? t.createElement("div", {
            className: Lu
        }, t.createElement(Title, {
            size: "xsmall"
        }, "Select ".concat(f)), t.createElement(Rows, {
            spacing: "2u"
        }, t.createElement(Du, {
            containerOptions: n,
            selectedContainer: E,
            setSelectedContainer: w,
            containerType: f,
            hasNextPage: s,
            fetchNextPage: u,
            isFetchingNextPage: c,
            containersLoading: y
        }), I && t.createElement(Text, {
            tone: "critical",
            size: "small"
        }, "Select a ".concat(f, " to continue")), t.createElement(Rows, {
            spacing: "1u"
        }, t.createElement(Button, {
            variant: "primary",
            onClick: function() {
                E ? (L(E.id), O(!0)) : D(!0)
            },
            disabled: I
        }, "Continue"), t.createElement(Button, {
            variant: "secondary",
            onClick: i
        }, "Cancel")))) : void 0
    },
    Bu = function(e) {
        var n, r, i, a, o, l = e.saveExportedDesign,
            s = Ct(),
            u = s.serviceName,
            c = s.export,
            d = s.containerTypes,
            p = rt(),
            h = et(),
            f = uo(),
            m = null === (n = h.state) || void 0 === n ? void 0 : n.exportToContainer,
            v = ho({
                types: ["CONTAINER"],
                containerTypes: (null == c ? void 0 : c.enabled) ? null == c ? void 0 : c.containerTypes : void 0,
                limit: 10
            }, {
                skip: !(null == c ? void 0 : c.enabled) || !(null === (r = null == c ? void 0 : c.containerTypes) || void 0 === r ? void 0 : r.length)
            }),
            g = v.results,
            y = v.isLoading,
            b = v.isFetchingNextPage,
            _ = v.hasNextPage,
            E = v.fetchNextPage;
        if (null == c ? void 0 : c.enabled) {
            var w = null == d ? void 0 : d.find((function(e) {
                var t;
                return e.value === (null === (t = null == c ? void 0 : c.containerTypes) || void 0 === t ? void 0 : t[0])
            }));
            return (null === (i = null == c ? void 0 : c.containerTypes) || void 0 === i ? void 0 : i[0]) && !w && (null == f || f.error("Please choose a valid container type for exporting. The container type should be one of the config.containerTypes values.")), t.createElement(qu, {
                navigateBack: function() {
                    return p(-1)
                },
                upload: l,
                exportTo: u,
                acceptedFileTypes: null == c ? void 0 : c.acceptedFileTypes,
                containerOptions: g,
                isFetchingNextPage: b,
                fetchNextPage: E,
                hasNextPage: _,
                containersLoading: y,
                exportToContainerType: null === (a = null == w ? void 0 : w.label) || void 0 === a ? void 0 : a.toLowerCase(),
                defaultContainer: (null == m ? void 0 : m.containerType) === (null === (o = null == c ? void 0 : c.containerTypes) || void 0 === o ? void 0 : o[0]) ? m : void 0,
                estimatedUploadTimeMs: null == c ? void 0 : c.estimatedUploadTimeMs
            })
        }
        p("/")
    },
    Vu = "single_container_page_tabHeader__-R2ar";
St('.single_container_page_tabHeader__-R2ar div[role="tablist"] {\n  display: block;\n  overflow: hidden;\n}\n');
var Wu = function() {
        var e, n = Ln(),
            r = et(),
            a = Ct(),
            o = a.containerTypes,
            l = a.sortOptions,
            s = a.export,
            u = el(),
            c = u.scrollRef,
            d = u.hide,
            p = null === (e = r.state) || void 0 === e ? void 0 : e.container,
            f = useMemo((function() {
                var e;
                return function(e, t, n) {
                    if (null == e ? void 0 : e.length) return null == e ? void 0 : e.map((function(e) {
                        var n;
                        return "CONTAINERS" === e.type ? Tn(Tn({}, e), {
                            containerIcon: null === (n = null == t ? void 0 : t.find((function(t) {
                                return t.value === e.containerTypes[0]
                            }))) || void 0 === n ? void 0 : n.icon
                        }) : e
                    }));
                    if (!n || !(null == t ? void 0 : t.length)) return [{
                        value: Jo.ASSET,
                        label: "Assets",
                        type: "RESOURCES"
                    }];
                    var r = null == t ? void 0 : t.filter((function(e) {
                        var t = e.listingSurfaces.find((function(e) {
                            return "CONTAINER" === e.surface
                        }));
                        return !!t && t.parentContainerTypes.includes(n)
                    })).map((function(e) {
                        return {
                            value: e.value,
                            label: e.label,
                            containerIcon: e.icon,
                            containerTypes: [e.value],
                            type: "CONTAINERS"
                        }
                    }));
                    return r.push({
                        value: Jo.ASSET,
                        label: "Assets",
                        type: "RESOURCES"
                    }), r.length > 1 && r.unshift({
                        value: Jo.ALL,
                        label: "All",
                        type: "OVERVIEW",
                        tabValues: r.map((function(e) {
                            return e.value
                        }))
                    }), r
                }(null === (e = null == o ? void 0 : o.find((function(e) {
                    return e.value === (null == p ? void 0 : p.containerType)
                }))) || void 0 === e ? void 0 : e.tabs, o, null == p ? void 0 : p.containerType)
            }), [p, o]),
            m = it().tab,
            v = void 0 === m ? f[0].value : m;
        if (useEffect((function() {
            c.current && (c.current.scrollTop = 0)
        }), [v, c]), p) {
            return t.createElement(Zs, {
                footer: (null == s ? void 0 : s.enabled) ? t.createElement(tu, {
                    defaultExportContainer: p
                }) : null,
                parentContainer: {
                    id: p.id,
                    type: p.containerType
                },
                onTabChange: function(e) {
                    n("/container/".concat(p.id, "/").concat(e.toLowerCase()), {
                        replace: !0
                    })
                },
                tabs: f,
                currentTab: v,
                header: t.createElement(Rows, {
                    spacing: "1u"
                }, t.createElement(nu, {
                    title: p.name
                }), t.createElement(Rows, {
                    spacing: "1u"
                }, t.createElement($o, {
                    container: p
                }), !d && ((null == l ? void 0 : l.length) ? v === Jo.ASSET ? t.createElement(Columns, {
                    spacing: "1u",
                    alignY: "center"
                }, t.createElement(Column, null, t.createElement(Xo, null)), t.createElement(Column, {
                    width: "content"
                }, t.createElement(Ys, null))) : t.createElement(Xo, null) : null), f.length > 1 && t.createElement("div", {
                    className: Vu
                }, t.createElement(Columns, {
                    spacing: "0",
                    alignY: "center"
                }, t.createElement(Column, null, t.createElement(xn, null, f.map((function(e, n) {
                    var r = e.value,
                        i = e.label;
                    return t.createElement(Nn, {
                        key: n,
                        value: r
                    }, i)
                })))))))),
                scrollRef: c,
                showLayoutSwitch: !0
            })
        }
        n("/")
    },
    Hu = {
        clearFilter: "search_result_page_clearFilter__kGWmS"
    };
St(".search_result_page_clearFilter__kGWmS {\n  color: var(--ui-kit-color-primary);\n  text-decoration: underline;\n  cursor: pointer;\n  padding-left: var(--ui-kit-space-050);\n}\n\n.search_result_page_clearFilter__kGWmS:hover {\n  color: var(--ui-kit-color-primary-hover);\n  text-decoration: none;\n}\n");
var Qu = function() {
        var e = et().state || {},
            n = e.query,
            r = e.filters,
            a = e.container,
            o = rt(),
            l = Ln(),
            s = Ct(),
            u = s.containerTypes,
            c = s.tabs,
            d = s.search,
            p = s.export,
            h = useMemo((function() {
                return function(e, t, n, r) {
                    var i;
                    if (null == e ? void 0 : e.length) return e;
                    if (null == t ? void 0 : t.length) return t.filter((function(e) {
                        var t, r;
                        return "CONTAINERS" !== e.type || "CONTAINERS" === e.type && (null === (r = null === (t = null == n ? void 0 : n.find((function(t) {
                            return t.value === e.containerTypes[0]
                        }))) || void 0 === t ? void 0 : t.listingSurfaces) || void 0 === r ? void 0 : r.find((function(e) {
                            return "SEARCH" === e.surface
                        })))
                    }));
                    var a = (null === (i = null == n ? void 0 : n.filter((function(e) {
                        var t = e.listingSurfaces.find((function(e) {
                            return "SEARCH" === e.surface
                        }));
                        if (!r) return t;
                        var n = e.listingSurfaces.find((function(e) {
                            return "CONTAINER" === e.surface && e.parentContainerTypes.includes(r)
                        }));
                        return t && n
                    }))) || void 0 === i ? void 0 : i.map((function(e) {
                        return {
                            value: e.value,
                            label: e.label,
                            containerIcon: e.icon,
                            containerTypes: [e.value],
                            type: "CONTAINERS"
                        }
                    }))) || [];
                    return a.push({
                        value: Jo.ASSET,
                        label: "Asset",
                        type: "RESOURCES"
                    }), a.length > 1 && a.unshift({
                        value: Jo.ALL,
                        label: "All",
                        type: "OVERVIEW",
                        tabValues: a.map((function(e) {
                            return e.value
                        }))
                    }), a
                }((null == d ? void 0 : d.enabled) && d.tabs || void 0, c, u, null == a ? void 0 : a.containerType)
            }), [a, u, d, c]),
            f = it().tab,
            m = void 0 === f ? h[0].value : f,
            v = Do().filterFormConfig,
            g = el(),
            y = g.scrollRef,
            _ = g.hide;
        return t.createElement(Zs, {
            footer: (null == p ? void 0 : p.enabled) ? t.createElement(tu, {
                defaultExportContainer: a
            }) : null,
            onTabChange: function(e) {
                return l("/search/".concat(e.toLowerCase()), {
                    replace: !0
                })
            },
            tabs: h,
            currentTab: m,
            scrollRef: y,
            header: t.createElement(Rows, {
                spacing: "1u"
            }, t.createElement(nu, {
                title: "Search results",
                goBack: function() {
                    return o(-1)
                }
            }), t.createElement($o, {
                onSearchResultPage: !0,
                container: a
            }), !_ && t.createElement(Xo, null), h.length > 1 && t.createElement("div", {
                className: Hu.tabHeader
            }, t.createElement(Columns, {
                spacing: "0",
                alignY: "center"
            }, t.createElement(Column, null, t.createElement(xn, null, h.map((function(e, n) {
                var r = e.value,
                    i = e.label;
                return t.createElement(Nn, {
                    key: n,
                    value: r
                }, i)
            }))))))),
            parentContainer: {
                id: null == a ? void 0 : a.id,
                type: null == a ? void 0 : a.containerType
            },
            query: n,
            filters: r,
            emptyMessage: t.createElement(Text, null, "Sorry, we couldn't find any results".concat(n ? ' for "'.concat(n, '". Try searching something related') : "", "."), Qo(Ho(r, v)) >= 1 && t.createElement("span", {
                className: Hu.clearFilter,
                onClick: function() {
                    return n ? l("/search", {
                        state: {
                            query: n,
                            filters: void 0,
                            container: a
                        },
                        replace: !0
                    }) : o(-1)
                }
            }, "Clear filters."))
        })
    },
    zu = function() {
        return t.useEffect((function() {
            console.log("%c\n\n       ____                           _                         \n      / ___|__ _ _ ____   ____ _     / \\   _ __  _ __           \n     | |   / _` | '_ \\ \\ / / _^ |   / _ \\ | '_ \\| '_ \\           \n     | |__| (_| | | | \\ V / (_| |  / ___ \\| |_) | |_) |         \n      \\____\\__,_|_| |_|\\_/ \\__,_| /_/   \\_\\ .__/| .__/  _       \n      / ___|___  _ __ ___  _ __   ___  _ _|_| __|_| __ | |_ ___ \n     | |   / _ \\| '_ - _ \\| '_ \\ / _ \\| '_ \\ / _ \\ '_ \\| __/ __|\n     | |__| (_) | | | | | | |_) | (_) | | | |  __/ | | | |_\\__ \\\n      \\____\\___/|_| |_| |_| .__/ \\___/|_| |_|\\___|_| |_|\\__|___/\n                          |_|      \n      %c   _      \n      __(.)<      \n      \\___)   \n    ", "color: cyan; font-family: monospace", "color: #DAA520; font-family: monospace"), console.table({
                "📇 Template Name": "@canva/app-components)",
                "🔖 Template Version": "1.0.0-beta.21",
                "🔖 Template Date": "Tue Jul 23 2024"
            }, ["Description"])
        }), []), t.createElement(t.Fragment, null)
    },
    $u = "searchable_list_view_searchableListViewRoot__VoAng";
St(".searchable_list_view_searchableListViewRoot__VoAng,\n.searchable_list_view_searchableListViewRoot__VoAng * {\n  box-sizing: border-box;\n}\n");
var Gu = function(e) {
        var t = e.children,
            n = et(),
            r = uo();
        return useEffect((function() {
            null == r || r.debug("Navigated to:", n)
        }), [n, r]), t
    },
    Ku = function(e) {
        var n = e.children,
            r = Dn(useReducer(Zu, Ju), 2),
            i = r[0],
            a = r[1];
        return useEffect((function() {
            var e = function(e) {
                try {
                    return sessionStorage.getItem(e)
                } catch (e) {
                    return console.error("Failed to get item from sessionStorage:", e), null
                }
            }("sessionStoreData");
            e && a({
                type: "SET_DATA",
                payload: JSON.parse(e)
            })
        }), []), useEffect((function() {
            ! function(e, t) {
                try {
                    return sessionStorage.setItem(e, t), !0
                } catch (e) {
                    return console.error("Failed to set item in sessionStorage:", e), !1
                }
            }("sessionStoreData", JSON.stringify(i.data))
        }), [i.data]), t.createElement(Yu.Provider, {
            value: {
                state: i,
                dispatch: a
            }
        }, n)
    };
var Yu = createContext(void 0),
    Ju = {
        data: null
    },
    Zu = function(e, t) {
        return "SET_DATA" === t.type ? Tn(Tn({}, e), {
            data: Tn(Tn({}, e.data), t.payload)
        }) : e
    };

function Xu() {
    var e = et(),
        n = function() {
            var e = useContext(Yu);
            if (!e) throw new Error("useSessionStore must be used within a SessionStoreProvider");
            var t = useCallback((function(t) {
                e.dispatch({
                    type: "SET_DATA",
                    payload: t
                })
            }), []);
            return {
                state: e.state,
                updateState: t
            }
        }(),
        i = n.state,
        a = n.updateState,
        l = rt(),
        s = uo(),
        u = Dn(t.useState({
            status: "loading"
        }), 2),
        c = u[0],
        d = u[1];
    t.useEffect((function() {
        var e, t, n;
        "loading" == c.status && (null === (e = i.data) || void 0 === e ? void 0 : e.pathname) && (null == s || s.debug("route_cacher:", "Navigating to", null === (t = i.data) || void 0 === t ? void 0 : t.pathname), d({
            status: "ready"
        }), l(null === (n = i.data) || void 0 === n ? void 0 : n.pathname, {
            state: i.data.state
        }))
    }), [i, l, c.status, s]), t.useEffect((function() {
        "/export" !== e.pathname.toLowerCase() && (null == s || s.debug("route_cacher:", "updating url", e.pathname), a({
            pathname: e.pathname,
            state: e.state
        }))
    }), [e, s, a])
}

function ec(e) {
    var t = e.children;
    return Xu(), t
}
var tc = "toast_container_toastContainer__bFbqi",
    nc = "toast_container_toast__gAlpl";
St(".toast_container_toastContainer__bFbqi {\n  position: fixed;\n  top: var(--ui-kit-space-2);\n  left: var(--ui-kit-space-2);\n  right: var(--ui-kit-space-2);\n  z-index: 99999;\n}\n\n.toast_container_toast__gAlpl {\n  width: 100%;\n}\n\n.toast_container_toastStory__U-Tyi {\n  position: relative;\n  height: 100%;\n}\n\n.toast_container_toastStory__U-Tyi .toast_container_toastContainer__bFbqi {\n  position: absolute;\n  left: 0;\n}\n");
var rc = function() {
    var e = ju(),
        n = e.toast,
        r = e.removeToast;
    if (n) return t.createElement("div", {
        className: tc
    }, t.createElement("div", {
        className: nc
    }, t.createElement(le, {
        tone: n.tone || "positive",
        onDismiss: n.dismissible ? r : void 0
    }, n.message)))
};
const {
    canva: ic
} = window;
ic.appProcess;
var ac = function(e) {
        var n = e.filename,
            r = e.url,
            i = e.header;
        return t.createElement(Box, {
            height: "full",
            paddingBottom: "2u",
            paddingEnd: "2u",
            className: ou
        }, t.createElement(Rows, {
            spacing: "2u"
        }, i, t.createElement(Rows, {
            spacing: "1u"
        }, t.createElement(le, {
            tone: "warn"
        }, "Currently only images and videos can be dragged and dropped into the design."), t.createElement(fu, {
            filename: n,
            active: !0
        }))), t.createElement(Rows, {
            spacing: "1u"
        }, t.createElement(Button, {
            icon: function() {
                return t.createElement(se, null)
            },
            variant: "primary",
            stretch: !0,
            onClick: function() {
                return e = {
                    url: r
                }, ic.platform.requestOpenExternalUrl(e);
                var e
            }
        }, "Open file in a new tab"), t.createElement(Button, {
            disabled: !0,
            variant: "primary",
            stretch: !0
        }, "Insert in design")))
    },
    oc = function() {
        var e, n, r = et(),
            i = uo(),
            a = Ln();
        Js();
        var o = null === (e = r.state) || void 0 === e ? void 0 : e.item,
            l = null === (n = r.state) || void 0 === n ? void 0 : n.attachment;
        return o && l ? "OTHER" === l.type ? t.createElement(ac, {
            filename: l.filename,
            url: l.url,
            header: t.createElement(nu, {
                title: "Attachment"
            })
        }) : t.createElement(Box, {
            paddingEnd: "2u",
            className: zl
        }, t.createElement(Rows, {
            spacing: "1u"
        }, t.createElement(nu, {
            title: "Attachment"
        }), t.createElement(wu, {
            item: l,
            onClick: function() {
                return Fs(l, i)
            },
            onDragStart: function(e) {
                return Ls(e, l, i)
            }
        }))) : (a("/home"), null)
    },
    searchListView = function(e) {
        var n, r = e.config,
            i = e.findResources,
            a = e.saveExportedDesign,
            o = e.logLevel,
            l = void 0 === o ? "error" : o,
            s = e.findFilterOptions;
        return t.createElement(so, {
            logLevel: l
        }, t.createElement(Ku, null, t.createElement(Box, {
            paddingTop: "1u",
            height: "full",
            className: $u
        }, t.createElement(Ua, {
            client: new Pa({
                defaultOptions: {
                    queries: {
                        refetchOnWindowFocus: !1,
                        staleTime: 6e4,
                        retryOnMount: !1,
                        retry: !1
                    }
                }
            })
        }, t.createElement(zu, null), t.createElement(Uu, null, t.createElement(wt.Provider, {
            value: r
        }, t.createElement(po, {
            findResources: i
        }, t.createElement(Ao, {
            findFilterOptions: s,
            filterFormConfig: (null === (n = r.search) || void 0 === n ? void 0 : n.enabled) ? r.search.filterFormConfig : void 0
        }, t.createElement(ue, null, t.createElement(vt, null, r.enableAppStatePersistence && t.createElement(ec, null), t.createElement(Gu, null, t.createElement(_t, null, t.createElement(yt, {
            path: "/home/:tab?",
            element: t.createElement(ru, null)
        }), t.createElement(yt, {
            path: "/container/:containerId?/:tab?",
            element: t.createElement(Wu, null)
        }), t.createElement(yt, {
            path: "/asset/:assetId?",
            element: t.createElement(ku, null)
        }), t.createElement(yt, {
            path: "/attachment/:assetId/:attachmentId",
            element: t.createElement(oc, null)
        }), a && r.export && t.createElement(yt, {
            path: "/export",
            element: t.createElement(Bu, {
                saveExportedDesign: a
            })
        }), t.createElement(yt, {
            path: "/search/:tab?",
            element: t.createElement(Qu, null)
        }), t.createElement(yt, {
            path: "*",
            element: t.createElement(gt, {
                replace: !0,
                to: "/home"
            })
        })))))))), t.createElement(rc, null))))))
    };
export {
    searchListView as SearchableListView
};