// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        globalObject
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"9q94c":[function(require,module,exports,__globalThis) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "d113fd8ce37f48ea";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, HMR_USE_SSE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var HMR_USE_SSE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && ![
        'localhost',
        '127.0.0.1',
        '0.0.0.0'
    ].includes(hostname) ? 'wss' : 'ws';
    var ws;
    if (HMR_USE_SSE) ws = new EventSource('/__parcel_hmr');
    else try {
        ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
    } catch (err) {
        if (err.message) console.error(err.message);
        ws = {};
    }
    // Web extension context
    var extCtx = typeof browser === 'undefined' ? typeof chrome === 'undefined' ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes('test.js');
    }
    // $FlowFixMe
    ws.onmessage = async function(event /*: {data: string, ...} */ ) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data /*: HMRMessage */  = JSON.parse(event.data);
        if (data.type === 'reload') fullReload();
        else if (data.type === 'update') {
            // Remove error overlay if there is one
            if (typeof document !== 'undefined') removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH);
            // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') window.dispatchEvent(new CustomEvent('parcelhmraccept'));
                await hmrApplyUpdates(assets);
                // Dispose all old assets.
                let processedAssets = {} /*: {|[string]: boolean|} */ ;
                for(let i = 0; i < assetsToDispose.length; i++){
                    let id = assetsToDispose[i][1];
                    if (!processedAssets[id]) {
                        hmrDispose(assetsToDispose[i][0], id);
                        processedAssets[id] = true;
                    }
                }
                // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
            }
            if (typeof document !== 'undefined') {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html);
                // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    if (ws instanceof WebSocket) {
        ws.onerror = function(e) {
            if (e.message) console.error(e.message);
        };
        ws.onclose = function() {
            console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
        };
    }
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, '') : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + '</div>').join('')}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ''}
      </div>
    `;
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ('reload' in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute('href');
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', // $FlowFixMe
    href.split('?')[0] + '?' + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === 'js') {
        if (typeof document !== 'undefined') {
            let script = document.createElement('script');
            script.src = asset.url + '?t=' + Date.now();
            if (asset.outputFormat === 'esmodule') script.type = 'module';
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === 'function') {
            // Worker scripts
            if (asset.outputFormat === 'esmodule') return import(asset.url + '?t=' + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + '?t=' + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != 'undefined' && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) {
            assetsToAlsoAccept.forEach(function(a) {
                hmrDispose(a[0], a[1]);
            });
            // $FlowFixMe[method-unbinding]
            assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
        }
    });
}

},{}],"aenu9":[function(require,module,exports,__globalThis) {
// controller.js
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _helpers = require("./helpers");
var _databaseUtilityJs = require("./databaseUtility.js");
var _model = require("./model");
var _adminLoginModal = require("./views/adminLoginModal");
var _adminLoginModalDefault = parcelHelpers.interopDefault(_adminLoginModal);
var _newAptView = require("./views/newAptView");
var _newAptViewDefault = parcelHelpers.interopDefault(_newAptView);
var _appointmentsViewJs = require("./views/appointmentsView.js");
var _appointmentsViewJsDefault = parcelHelpers.interopDefault(_appointmentsViewJs);
var _customerSliderJs = require("./views/customerSlider.js");
var _customerSliderJsDefault = parcelHelpers.interopDefault(_customerSliderJs);
var _configJs = require("./config.js");
// ! weird stuff going on on submit - with the spinner especially
async function controlAppointmentFormSubmit(formData) {
    console.log('controlAppointmentFormSubmit running');
    try {
        // Save form data to localStorage for persistence
        localStorage.setItem('pendingAppointment', JSON.stringify(formData));
        // Show loading spinner or feedback to the user
        (0, _newAptViewDefault.default).renderSpinner('Processing your appointment... Feel free to check out the rest of the page in the meantime!');
        // 1) Fetch and validate the address
        const { streetAddress, zipCode } = formData;
        const isValidAddress = await (0, _databaseUtilityJs.optimizedValidateAddress)(zipCode, streetAddress);
        if (!isValidAddress) throw new Error('Your address could not be found in our database. Please try again and select a valid address from the suggestions pop-up!');
        // ! address is valid
        // 4) Process form submission (e.g., update database or state)
        _model.AppState.addAppointment(formData);
        localStorage.removeItem('pendingAppointment');
        setTimeout(()=>{
            (0, _helpers.notyf).open({
                type: 'success',
                message: `Your appointment is confirmed for ${formData.aptTimeslot} on ${(0, _helpers.formatDate)(formData.aptDate)} !`
            });
        }, 3000);
    // 5) Render success message
    } catch (err1) {
        console.error(err1.message || err1);
        (0, _helpers.notyf).error(`Could not create your appointment. ${err1.message}.`);
    } finally{
        localStorage.removeItem('pendingAppointment');
        (0, _newAptViewDefault.default).cancelSpinner(); // Ensure the spinner is stopped in the finally block
        (0, _newAptViewDefault.default).handleToggleModal(); // Close modal window
        (0, _newAptViewDefault.default)._form.reset();
    }
}
async function controlAdminLogin(formData) {
    try {
        // Show loading spinner or feedback to the user
        (0, _adminLoginModalDefault.default).renderSpinner('Checking your credentials...');
        // Credentials check
        const credentialsGood = formData.username === (0, _configJs.adminCredentials).username && formData.password === (0, _configJs.adminCredentials).password;
        if (credentialsGood) setTimeout(()=>{
            (0, _helpers.loginAdminHeaderSwitch)(document.querySelector('.toggle-login-btn a')); // header switch
            (0, _helpers.loginAdminUISwitch)(document.querySelectorAll('section')); // content / UI switch
            (0, _adminLoginModalDefault.default).handleToggleModal(); // Close modal window
            (0, _adminLoginModalDefault.default).cancelSpinner();
            (0, _helpers.notyf).success('Login successful!');
        }, 1000);
        else {
            (0, _adminLoginModalDefault.default).cancelSpinner();
            (0, _helpers.notyf).error('Wrong username or password... please try again');
        }
        // Success - make it current account
        _model.AppState.currentAdminAccount = formData;
    } catch (error) {
        console.error(error.message || err);
    } finally{
        (0, _adminLoginModalDefault.default)._form.reset(); // reset form
    }
}
// modify appointment
// modify appointment
async function controlModifyAppointment(appointmentId) {
    try {
        // Retrieve the existing appointment data from the model
        const appointment = _model.AppState.appointments.find((appt)=>appt.id === appointmentId);
        if (!appointment) throw new Error('Appointment not found.');
        // Open the appointment modification form with the current data
        (0, _appointmentsViewJsDefault.default).renderEditForm(appointment);
        // Ensure the form has finished editing before we continue
        const updatedAppointment = await (0, _newAptViewDefault.default).getUpdatedFormData();
        if (!updatedAppointment) throw new Error('Failed to retrieve updated appointment data.');
        // Modify the appointment in the model
        _model.AppState.modifyAppointment(appointmentId, updatedAppointment);
        // Update appointments view
        (0, _appointmentsViewJsDefault.default).displayAppointments();
        console.log('Editing finished. Appointment updated in the state.');
        // Display success message
        (0, _helpers.notyf).success('Appointment successfully updated!');
        // Optionally, close the form/modal
        (0, _appointmentsViewJsDefault.default).handleToggleModal();
        console.log('controlModifyAppointment ending...');
    } catch (err1) {
        console.error(err1);
        (0, _helpers.notyf).error(`Failed to modify the appointment. ${err1.message}`);
    } finally{
        // Ensure the form/modal is closed
        (0, _appointmentsViewJsDefault.default).handleToggleModal();
    }
}
// cancel appointment
async function controlCancelAppointment(appointmentId) {
    try {
        // Retrieve the existing appointment data from the model
        const appointment = _model.AppState.appointments.find((appt)=>appt.id === appointmentId);
        if (!appointment) throw new Error('Appointment not found.');
        // Confirm cancellation
        const confirmCancel = window.confirm('Are you sure you want to cancel this appointment?');
        if (!confirmCancel) return;
        // Cancel the appointment in the model
        _model.AppState.cancelAppointment(appointmentId);
        // Display a success message
        (0, _helpers.notyf).success('Appointment successfully cancelled!');
        // Refresh the appointment list
        (0, _appointmentsViewJsDefault.default).displayAppointments();
    } catch (err1) {
        console.error(err1);
        (0, _helpers.notyf).error(`Failed to cancel the appointment. ${err1.message}`);
    }
}
async function init() {
    _model.AppState.initializeState();
    // * check for pending requests and finish them
    if (_model.AppState.pendingAppointmentObject) controlAppointmentFormSubmit(_model.AppState.pendingAppointmentObject);
    (0, _newAptViewDefault.default).addHandlerSubmitForm(controlAppointmentFormSubmit);
    (0, _adminLoginModalDefault.default).addHandlerSubmitForm(controlAdminLogin);
    //* Add event listener for action buttons (modify/cancel)
    (0, _appointmentsViewJsDefault.default).addHandlerActionButton((button, appointmentId)=>{
        if (button.classList.contains('modify-button')) controlModifyAppointment(appointmentId);
        else if (button.classList.contains('cancel-button')) controlCancelAppointment(appointmentId);
    });
// newAptView._addSubmitEditHandler();
}
init();

},{"./helpers":"hGI1E","./databaseUtility.js":"frWAm","./model":"Y4A21","./views/adminLoginModal":"WJUHe","./views/newAptView":"05dYz","./views/customerSlider.js":"fdtLx","./config.js":"k5Hzs","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","./views/appointmentsView.js":"9Ut8o"}],"hGI1E":[function(require,module,exports,__globalThis) {
// helpers.js
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
// Example of saving generated appointments to localStorage
parcelHelpers.export(exports, "saveAppointmentsToLocalStorage", ()=>saveAppointmentsToLocalStorage);
parcelHelpers.export(exports, "addAppointmentToLocalStorage", ()=>addAppointmentToLocalStorage);
parcelHelpers.export(exports, "currentPendingAppointmentRequest", ()=>currentPendingAppointmentRequest);
parcelHelpers.export(exports, "loginAdminHeaderSwitch", ()=>loginAdminHeaderSwitch);
parcelHelpers.export(exports, "loginAdminUISwitch", ()=>loginAdminUISwitch);
parcelHelpers.export(exports, "formatDate", ()=>formatDate);
parcelHelpers.export(exports, "notyf", ()=>notyf);
var _notyf = require("notyf");
var _notyfMinCss = require("notyf/notyf.min.css");
var _model = require("./model");
function saveAppointmentsToLocalStorage(appointmentsArray = null) {
    if (appointmentsArray) localStorage.setItem('appointments', JSON.stringify(appointmentsArray));
    else {
        const appointments = generateMockAppointments();
        localStorage.setItem('appointments', JSON.stringify(appointments));
    }
}
function addAppointmentToLocalStorage(newAppointment) {
    // Step 1: Retrieve the current appointments from localStorage (if any)
    let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    // Normalize input: trim spaces, convert to lowercase for comparison
    const normalizeText = (text)=>text ? text.trim().toLowerCase() : '';
    // Step 2: Make sure it isn't a duplicate (criteria: fullName and streetAddress are the same)
    const isDuplicate = appointments?.some((apt)=>normalizeText(apt.fullName) === normalizeText(newAppointment.fullName) && normalizeText(apt.streetAddress) === normalizeText(newAppointment.streetAddress) && apt.zipCode === newAppointment.zipCode);
    console.log('isDuplicate:', isDuplicate);
    // * improvement to implement: show the previous appointment screen (or a link to cancel it)!
    if (isDuplicate) throw new Error("You've already made an appointment with us! Please cancel it before we can book a new one for you!");
    console.log('adding to local storage (success)');
    // Step 3: Add the new appointment to the array
    appointments.push(newAppointment);
    // Step 3: Store the updated array back into localStorage
    localStorage.setItem('appointments', JSON.stringify(appointments));
}
function currentPendingAppointmentRequest() {
    try {
        // Check for any pending appointment submission
        const pendingAppointment = localStorage.getItem('pendingAppointment');
        if (!pendingAppointment) return false;
        const formData = JSON.parse(pendingAppointment);
        // Show spinner and retry processing
        notyf.open({
            type: 'warning',
            message: 'Resuming your previous appointment request...'
        });
        return formData;
    } catch (err) {
        console.error('Error resuming pending appointment:', err);
    } finally{
        localStorage.removeItem('pendingAppointment'); // Clean up if there's an issue
    }
}
function loginAdminHeaderSwitch(headerElement) {
    console.log('loginAdminHeaderSwitch running');
    if (!(0, _model.AppState).currentAdminAccount) throw new Error("account couldn't be found in AppState");
    else {
        // Remove the "Sign up" button
        const signUpButton = document.querySelector('.cta-btn');
        if (signUpButton) signUpButton.remove();
        // Update button text
        headerElement.textContent = `${(0, _model.AppState).currentAdminAccount.username[0].toUpperCase() + (0, _model.AppState).currentAdminAccount.username.slice(1)} logged in`;
        // Update styles
        headerElement.style.color = 'var(--color-secondary)';
        headerElement.style.cursor = 'not-allowed';
        headerElement.style.pointerEvents = 'none';
        // Disable its parent container if needed
        const toggleLoginContainer = headerElement.closest('.toggle-login-btn');
        if (toggleLoginContainer) toggleLoginContainer.style.pointerEvents = 'none';
    }
}
function loginAdminUISwitch(sectionsToHide) {
    // first add hiddenSection class to all
    sectionsToHide.forEach((section)=>section.classList.add('hideSection'));
    const adminSectionElement = document.querySelector('.admin-section');
    // then remove it from the adminSection
    adminSectionElement.classList.remove('hideSection');
}
function formatDate(date, options = null) {
    if (options) return new Intl.DateTimeFormat('en', options).format(new Date(date));
    return new Intl.DateTimeFormat('en', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        weekday: 'long'
    }).format(new Date(date));
}
const notyf = new (0, _notyf.Notyf)({
    duration: 5000,
    position: {
        x: 'center',
        y: 'top'
    },
    types: [
        {
            type: 'warning',
            background: 'orange',
            icon: {
                className: 'material-icons',
                tagName: 'i',
                text: 'warning'
            }
        },
        {
            type: 'success',
            background: 'green',
            duration: 3000,
            dismissible: true
        },
        {
            type: 'error',
            background: 'indianred',
            duration: 7000,
            dismissible: true
        },
        {
            type: 'confirmation',
            background: 'green',
            duration: 8000,
            dismissible: false,
            message: "Appointment Successfully booked! Confirmation email is on it's way!",
            icon: {
                className: 'material-icons',
                tagName: 'i',
                text: 'check_circle'
            },
            className: 'notyf-confirmation'
        }
    ]
});

},{"notyf":"2LIPM","notyf/notyf.min.css":"bpCRw","./model":"Y4A21","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2LIPM":[function(require,module,exports,__globalThis) {
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "DEFAULT_OPTIONS", ()=>DEFAULT_OPTIONS);
parcelHelpers.export(exports, "Notyf", ()=>Notyf);
parcelHelpers.export(exports, "NotyfArray", ()=>NotyfArray);
parcelHelpers.export(exports, "NotyfArrayEvent", ()=>NotyfArrayEvent);
parcelHelpers.export(exports, "NotyfEvent", ()=>NotyfEvent);
parcelHelpers.export(exports, "NotyfNotification", ()=>NotyfNotification);
parcelHelpers.export(exports, "NotyfView", ()=>NotyfView);
var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for(var s, i = 1, n = arguments.length; i < n; i++){
            s = arguments[i];
            for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var NotyfNotification = /** @class */ function() {
    function NotyfNotification(options) {
        this.options = options;
        this.listeners = {};
    }
    NotyfNotification.prototype.on = function(eventType, cb) {
        var callbacks = this.listeners[eventType] || [];
        this.listeners[eventType] = callbacks.concat([
            cb
        ]);
    };
    NotyfNotification.prototype.triggerEvent = function(eventType, event) {
        var _this = this;
        var callbacks = this.listeners[eventType] || [];
        callbacks.forEach(function(cb) {
            return cb({
                target: _this,
                event: event
            });
        });
    };
    return NotyfNotification;
}();
var NotyfArrayEvent;
(function(NotyfArrayEvent) {
    NotyfArrayEvent[NotyfArrayEvent["Add"] = 0] = "Add";
    NotyfArrayEvent[NotyfArrayEvent["Remove"] = 1] = "Remove";
})(NotyfArrayEvent || (NotyfArrayEvent = {}));
var NotyfArray = /** @class */ function() {
    function NotyfArray() {
        this.notifications = [];
    }
    NotyfArray.prototype.push = function(elem) {
        this.notifications.push(elem);
        this.updateFn(elem, NotyfArrayEvent.Add, this.notifications);
    };
    NotyfArray.prototype.splice = function(index, num) {
        var elem = this.notifications.splice(index, num)[0];
        this.updateFn(elem, NotyfArrayEvent.Remove, this.notifications);
        return elem;
    };
    NotyfArray.prototype.indexOf = function(elem) {
        return this.notifications.indexOf(elem);
    };
    NotyfArray.prototype.onUpdate = function(fn) {
        this.updateFn = fn;
    };
    return NotyfArray;
}();
var NotyfEvent;
(function(NotyfEvent) {
    NotyfEvent["Dismiss"] = "dismiss";
    NotyfEvent["Click"] = "click";
})(NotyfEvent || (NotyfEvent = {}));
var DEFAULT_OPTIONS = {
    types: [
        {
            type: 'success',
            className: 'notyf__toast--success',
            backgroundColor: '#3dc763',
            icon: {
                className: 'notyf__icon--success',
                tagName: 'i'
            }
        },
        {
            type: 'error',
            className: 'notyf__toast--error',
            backgroundColor: '#ed3d3d',
            icon: {
                className: 'notyf__icon--error',
                tagName: 'i'
            }
        }
    ],
    duration: 2000,
    ripple: true,
    position: {
        x: 'right',
        y: 'bottom'
    },
    dismissible: false
};
var NotyfView = /** @class */ function() {
    function NotyfView() {
        this.notifications = [];
        this.events = {};
        this.X_POSITION_FLEX_MAP = {
            left: 'flex-start',
            center: 'center',
            right: 'flex-end'
        };
        this.Y_POSITION_FLEX_MAP = {
            top: 'flex-start',
            center: 'center',
            bottom: 'flex-end'
        };
        // Creates the main notifications container
        var docFrag = document.createDocumentFragment();
        var notyfContainer = this._createHTMLElement({
            tagName: 'div',
            className: 'notyf'
        });
        docFrag.appendChild(notyfContainer);
        document.body.appendChild(docFrag);
        this.container = notyfContainer;
        // Identifies the main animation end event
        this.animationEndEventName = this._getAnimationEndEventName();
        this._createA11yContainer();
    }
    NotyfView.prototype.on = function(event, cb) {
        var _a;
        this.events = __assign(__assign({}, this.events), (_a = {}, _a[event] = cb, _a));
    };
    NotyfView.prototype.update = function(notification, type) {
        if (type === NotyfArrayEvent.Add) this.addNotification(notification);
        else if (type === NotyfArrayEvent.Remove) this.removeNotification(notification);
    };
    NotyfView.prototype.removeNotification = function(notification) {
        var _this = this;
        var renderedNotification = this._popRenderedNotification(notification);
        var node;
        if (!renderedNotification) return;
        node = renderedNotification.node;
        node.classList.add('notyf__toast--disappear');
        var handleEvent;
        node.addEventListener(this.animationEndEventName, handleEvent = function(event) {
            if (event.target === node) {
                node.removeEventListener(_this.animationEndEventName, handleEvent);
                _this.container.removeChild(node);
            }
        });
    };
    NotyfView.prototype.addNotification = function(notification) {
        var node = this._renderNotification(notification);
        this.notifications.push({
            notification: notification,
            node: node
        });
        // For a11y purposes, we still want to announce that there's a notification in the screen
        // even if it comes with no message.
        this._announce(notification.options.message || 'Notification');
    };
    NotyfView.prototype._renderNotification = function(notification) {
        var _a;
        var card = this._buildNotificationCard(notification);
        var className = notification.options.className;
        if (className) (_a = card.classList).add.apply(_a, className.split(' '));
        this.container.appendChild(card);
        return card;
    };
    NotyfView.prototype._popRenderedNotification = function(notification) {
        var idx = -1;
        for(var i = 0; i < this.notifications.length && idx < 0; i++)if (this.notifications[i].notification === notification) idx = i;
        if (idx !== -1) return this.notifications.splice(idx, 1)[0];
        return;
    };
    NotyfView.prototype.getXPosition = function(options) {
        var _a;
        return ((_a = options === null || options === void 0 ? void 0 : options.position) === null || _a === void 0 ? void 0 : _a.x) || 'right';
    };
    NotyfView.prototype.getYPosition = function(options) {
        var _a;
        return ((_a = options === null || options === void 0 ? void 0 : options.position) === null || _a === void 0 ? void 0 : _a.y) || 'bottom';
    };
    NotyfView.prototype.adjustContainerAlignment = function(options) {
        var align = this.X_POSITION_FLEX_MAP[this.getXPosition(options)];
        var justify = this.Y_POSITION_FLEX_MAP[this.getYPosition(options)];
        var style = this.container.style;
        style.setProperty('justify-content', justify);
        style.setProperty('align-items', align);
    };
    NotyfView.prototype._buildNotificationCard = function(notification) {
        var _this = this;
        var options = notification.options;
        var iconOpts = options.icon;
        // Adjust container according to position (e.g. top-left, bottom-center, etc)
        this.adjustContainerAlignment(options);
        // Create elements
        var notificationElem = this._createHTMLElement({
            tagName: 'div',
            className: 'notyf__toast'
        });
        var ripple = this._createHTMLElement({
            tagName: 'div',
            className: 'notyf__ripple'
        });
        var wrapper = this._createHTMLElement({
            tagName: 'div',
            className: 'notyf__wrapper'
        });
        var message = this._createHTMLElement({
            tagName: 'div',
            className: 'notyf__message'
        });
        message.innerHTML = options.message || '';
        var mainColor = options.background || options.backgroundColor;
        // Build the icon and append it to the card
        if (iconOpts) {
            var iconContainer = this._createHTMLElement({
                tagName: 'div',
                className: 'notyf__icon'
            });
            if (typeof iconOpts === 'string' || iconOpts instanceof String) iconContainer.innerHTML = new String(iconOpts).valueOf();
            if (typeof iconOpts === 'object') {
                var _a = iconOpts.tagName, tagName = _a === void 0 ? 'i' : _a, className_1 = iconOpts.className, text = iconOpts.text, _b = iconOpts.color, color = _b === void 0 ? mainColor : _b;
                var iconElement = this._createHTMLElement({
                    tagName: tagName,
                    className: className_1,
                    text: text
                });
                if (color) iconElement.style.color = color;
                iconContainer.appendChild(iconElement);
            }
            wrapper.appendChild(iconContainer);
        }
        wrapper.appendChild(message);
        notificationElem.appendChild(wrapper);
        // Add ripple if applicable, else just paint the full toast
        if (mainColor) {
            if (options.ripple) {
                ripple.style.background = mainColor;
                notificationElem.appendChild(ripple);
            } else notificationElem.style.background = mainColor;
        }
        // Add dismiss button
        if (options.dismissible) {
            var dismissWrapper = this._createHTMLElement({
                tagName: 'div',
                className: 'notyf__dismiss'
            });
            var dismissButton = this._createHTMLElement({
                tagName: 'button',
                className: 'notyf__dismiss-btn'
            });
            dismissWrapper.appendChild(dismissButton);
            wrapper.appendChild(dismissWrapper);
            notificationElem.classList.add("notyf__toast--dismissible");
            dismissButton.addEventListener('click', function(event) {
                var _a, _b;
                (_b = (_a = _this.events)[NotyfEvent.Dismiss]) === null || _b === void 0 || _b.call(_a, {
                    target: notification,
                    event: event
                });
                event.stopPropagation();
            });
        }
        notificationElem.addEventListener('click', function(event) {
            var _a, _b;
            return (_b = (_a = _this.events)[NotyfEvent.Click]) === null || _b === void 0 ? void 0 : _b.call(_a, {
                target: notification,
                event: event
            });
        });
        // Adjust margins depending on whether its an upper or lower notification
        var className = this.getYPosition(options) === 'top' ? 'upper' : 'lower';
        notificationElem.classList.add("notyf__toast--" + className);
        return notificationElem;
    };
    NotyfView.prototype._createHTMLElement = function(_a) {
        var tagName = _a.tagName, className = _a.className, text = _a.text;
        var elem = document.createElement(tagName);
        if (className) elem.className = className;
        elem.textContent = text || null;
        return elem;
    };
    /**
     * Creates an invisible container which will announce the notyfs to
     * screen readers
     */ NotyfView.prototype._createA11yContainer = function() {
        var a11yContainer = this._createHTMLElement({
            tagName: 'div',
            className: 'notyf-announcer'
        });
        a11yContainer.setAttribute('aria-atomic', 'true');
        a11yContainer.setAttribute('aria-live', 'polite');
        // Set the a11y container to be visible hidden. Can't use display: none as
        // screen readers won't read it.
        a11yContainer.style.border = '0';
        a11yContainer.style.clip = 'rect(0 0 0 0)';
        a11yContainer.style.height = '1px';
        a11yContainer.style.margin = '-1px';
        a11yContainer.style.overflow = 'hidden';
        a11yContainer.style.padding = '0';
        a11yContainer.style.position = 'absolute';
        a11yContainer.style.width = '1px';
        a11yContainer.style.outline = '0';
        document.body.appendChild(a11yContainer);
        this.a11yContainer = a11yContainer;
    };
    /**
     * Announces a message to screenreaders.
     */ NotyfView.prototype._announce = function(message) {
        var _this = this;
        this.a11yContainer.textContent = '';
        // This 100ms timeout is necessary for some browser + screen-reader combinations:
        // - Both JAWS and NVDA over IE11 will not announce anything without a non-zero timeout.
        // - With Chrome and IE11 with NVDA or JAWS, a repeated (identical) message won't be read a
        //   second time without clearing and then using a non-zero delay.
        // (using JAWS 17 at time of this writing).
        // https://github.com/angular/material2/blob/master/src/cdk/a11y/live-announcer/live-announcer.ts
        setTimeout(function() {
            _this.a11yContainer.textContent = message;
        }, 100);
    };
    /**
     * Determine which animationend event is supported
     */ NotyfView.prototype._getAnimationEndEventName = function() {
        var el = document.createElement('_fake');
        var transitions = {
            MozTransition: 'animationend',
            OTransition: 'oAnimationEnd',
            WebkitTransition: 'webkitAnimationEnd',
            transition: 'animationend'
        };
        var t;
        for(t in transitions){
            if (el.style[t] !== undefined) return transitions[t];
        }
        // No supported animation end event. Using "animationend" as a fallback
        return 'animationend';
    };
    return NotyfView;
}();
/**
 * Main controller class. Defines the main Notyf API.
 */ var Notyf = /** @class */ function() {
    function Notyf(opts) {
        var _this = this;
        this.dismiss = this._removeNotification;
        this.notifications = new NotyfArray();
        this.view = new NotyfView();
        var types = this.registerTypes(opts);
        this.options = __assign(__assign({}, DEFAULT_OPTIONS), opts);
        this.options.types = types;
        this.notifications.onUpdate(function(elem, type) {
            return _this.view.update(elem, type);
        });
        this.view.on(NotyfEvent.Dismiss, function(_a) {
            var target = _a.target, event = _a.event;
            _this._removeNotification(target);
            // tslint:disable-next-line: no-string-literal
            target['triggerEvent'](NotyfEvent.Dismiss, event);
        });
        // tslint:disable-next-line: no-string-literal
        this.view.on(NotyfEvent.Click, function(_a) {
            var target = _a.target, event = _a.event;
            return target['triggerEvent'](NotyfEvent.Click, event);
        });
    }
    Notyf.prototype.error = function(payload) {
        var options = this.normalizeOptions('error', payload);
        return this.open(options);
    };
    Notyf.prototype.success = function(payload) {
        var options = this.normalizeOptions('success', payload);
        return this.open(options);
    };
    Notyf.prototype.open = function(options) {
        var defaultOpts = this.options.types.find(function(_a) {
            var type = _a.type;
            return type === options.type;
        }) || {};
        var config = __assign(__assign({}, defaultOpts), options);
        this.assignProps([
            'ripple',
            'position',
            'dismissible'
        ], config);
        var notification = new NotyfNotification(config);
        this._pushNotification(notification);
        return notification;
    };
    Notyf.prototype.dismissAll = function() {
        while(this.notifications.splice(0, 1));
    };
    /**
     * Assigns properties to a config object based on two rules:
     * 1. If the config object already sets that prop, leave it as so
     * 2. Otherwise, use the default prop from the global options
     *
     * It's intended to build the final config object to open a notification. e.g. if
     * 'dismissible' is not set, then use the value from the global config.
     *
     * @param props - properties to be assigned to the config object
     * @param config - object whose properties need to be set
     */ Notyf.prototype.assignProps = function(props, config) {
        var _this = this;
        props.forEach(function(prop) {
            // intentional double equality to check for both null and undefined
            config[prop] = config[prop] == null ? _this.options[prop] : config[prop];
        });
    };
    Notyf.prototype._pushNotification = function(notification) {
        var _this = this;
        this.notifications.push(notification);
        var duration = notification.options.duration !== undefined ? notification.options.duration : this.options.duration;
        if (duration) setTimeout(function() {
            return _this._removeNotification(notification);
        }, duration);
    };
    Notyf.prototype._removeNotification = function(notification) {
        var index = this.notifications.indexOf(notification);
        if (index !== -1) this.notifications.splice(index, 1);
    };
    Notyf.prototype.normalizeOptions = function(type, payload) {
        var options = {
            type: type
        };
        if (typeof payload === 'string') options.message = payload;
        else if (typeof payload === 'object') options = __assign(__assign({}, options), payload);
        return options;
    };
    Notyf.prototype.registerTypes = function(opts) {
        var incomingTypes = (opts && opts.types || []).slice();
        var finalDefaultTypes = DEFAULT_OPTIONS.types.map(function(defaultType) {
            // find if there's a default type within the user input's types, if so, it means the user
            // wants to change some of the default settings
            var userTypeIdx = -1;
            incomingTypes.forEach(function(t, idx) {
                if (t.type === defaultType.type) userTypeIdx = idx;
            });
            var userType = userTypeIdx !== -1 ? incomingTypes.splice(userTypeIdx, 1)[0] : {};
            return __assign(__assign({}, defaultType), userType);
        });
        return finalDefaultTypes.concat(incomingTypes);
    };
    return Notyf;
}();

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports,__globalThis) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || Object.prototype.hasOwnProperty.call(dest, key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"bpCRw":[function() {},{}],"Y4A21":[function(require,module,exports,__globalThis) {
// model.js
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "AppState", ()=>AppState);
var _helpers = require("./helpers");
const AppState = {
    appointments: JSON.parse(localStorage.getItem('appointments')) || [],
    addresses: [],
    pendingAppointmentObject: localStorage.getItem('pendingAppointment') || null,
    currentAdminAccount: null,
    // Initialize state with local storage data
    initializeState () {
        this._finishAnyPendingRequests();
        this._initializeAppointments();
    },
    _finishAnyPendingRequests () {
        const currentRequest = (0, _helpers.currentPendingAppointmentRequest)();
        if (currentRequest) this.pendingAppointmentObject = currentRequest;
    },
    async _initializeAddresses () {
        const db = await openDatabase();
        const fetchAddresses = new Promise((resolve, reject)=>{
            const transaction = db.transaction('addresses', 'readonly');
            const store = transaction.objectStore('addresses');
            const request = store.getAll();
            request.onsuccess = ()=>resolve(request.result || []);
            request.onerror = ()=>reject(request.error);
        });
        const addresses = await fetchAddresses;
        if (!addresses || addresses.length === 0) {
            console.log('IndexedDB is empty. Need to fetch data.');
            return false; // Database is not initialized
        }
        // console.log('Addresses fetched from IndexedDB:', addresses);
        this.addresses = addresses;
        return true; // Database is initialized
    },
    _initializeAppointments () {
        const storedAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
        this.appointments = storedAppointments;
    },
    // Add appointment and update localStorage
    addAppointment (newAppointment) {
        // add 'status: confirmed'
        const aptWithStatusFlag = {
            ...newAppointment,
            status: 'confirmed'
        };
        this.appointments.push(aptWithStatusFlag);
        (0, _helpers.addAppointmentToLocalStorage)(aptWithStatusFlag);
        console.log('Added appointment:', aptWithStatusFlag);
    },
    // Delete appointment and update localStorage
    cancelAppointment (appointmentId) {
        this.appointments = this.appointments.filter((a)=>a.id !== appointmentId);
        (0, _helpers.saveAppointmentsToLocalStorage)(this.appointments);
        console.log('Deleted appointment with ID:', appointmentId);
    },
    // Modify appointment and update localStorage
    modifyAppointment (appointmentId, updatedObject) {
        const appointmentIndex = this.appointments.findIndex((a)=>a.id === appointmentId);
        if (appointmentIndex !== -1) {
            this.appointments[appointmentIndex] = {
                ...this.appointments[appointmentIndex],
                ...updatedObject
            };
            (0, _helpers.saveAppointmentsToLocalStorage)(this.appointments);
            console.log('Modified appointment:', updatedObject);
        }
    }
};

},{"./helpers":"hGI1E","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"frWAm":[function(require,module,exports,__globalThis) {
// databaseUtility.js
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
// Open the IndexedDB database.
parcelHelpers.export(exports, "openDatabase", ()=>openDatabase);
parcelHelpers.export(exports, "fetchAndStoreData", ()=>fetchAndStoreData);
parcelHelpers.export(exports, "debounce", ()=>debounce);
// Helper function to calculate match score
parcelHelpers.export(exports, "calculateMatchScore", ()=>calculateMatchScore);
// Tokenize address into words for flexible search
parcelHelpers.export(exports, "tokenizeAddress", ()=>tokenizeAddress);
// Search by zip code first, then refine by the rest of the address
parcelHelpers.export(exports, "searchAddress", ()=>searchAddress);
// Efficiently validate an address by matching tokens with IndexedDB indexes
parcelHelpers.export(exports, "optimizedValidateAddress", ()=>optimizedValidateAddress);
// Function to check if the database is already populated
parcelHelpers.export(exports, "checkIfDatabasePopulated", ()=>checkIfDatabasePopulated);
var _config = require("./config");
var _model = require("./model");
async function openDatabase() {
    return new Promise((resolve, reject)=>{
        const request = indexedDB.open((0, _config.dbName), 1);
        request.onupgradeneeded = function() {
            const db = request.result;
            // addresses store with indexes
            if (!db.objectStoreNames.contains('addresses')) {
                const addressStore = db.createObjectStore('addresses', {
                    keyPath: 'id'
                });
                addressStore.createIndex('zipCode', 'zipCode', {
                    unique: false
                });
                addressStore.createIndex('searchableAddress', 'searchableAddress', {
                    unique: false
                });
                addressStore.createIndex('searchableTokens', 'searchableAddressTokens', {
                    unique: false,
                    multiEntry: true
                });
            }
        };
        request.onsuccess = ()=>resolve(request.result);
        request.onerror = ()=>reject(request.error);
    });
}
let fetchAndStoreDataPromise = null;
async function fetchAndStoreData() {
    if (fetchAndStoreDataPromise) return fetchAndStoreDataPromise; // Return the existing promise if already running
    fetchAndStoreDataPromise = (async ()=>{
        try {
            console.log('Starting fetchAndStoreData...');
            _model.AppState.isFetchingData = true;
            const response = await fetch('https://data.lacity.org/api/views/4ca8-mxuh/rows.json?accessType=DOWNLOAD');
            const data = await response.json();
            const addresses = data.data.filter((item)=>item[18]).map((item, index)=>{
                const addressString = `${item[11]} ${item[13]} ${item[14]} ${item[15]}`.trim();
                return {
                    id: index + 1,
                    streetNumber: item[11],
                    streetDirection: item[13],
                    streetName: item[14],
                    streetType: item[15],
                    zipCode: item[18],
                    lat: item[19],
                    lng: item[20],
                    searchableAddress: addressString.toLowerCase(),
                    searchableAddressTokens: tokenizeAddress(addressString)
                };
            });
            const db = await openDatabase();
            const batchSize = 1000;
            for(let i = 0; i < addresses.length; i += batchSize){
                const batch = addresses.slice(i, i + batchSize);
                await storeDataBatch(db, batch);
            }
            console.log('All data stored successfully.');
            _model.AppState.isDataLoaded = true;
        } catch (err) {
            console.error('Error in fetchAndStoreData:', err);
        } finally{
            _model.AppState.isFetchingData = false;
            fetchAndStoreDataPromise = null; // Reset promise after completion
        }
    })();
    return fetchAndStoreDataPromise;
}
// Store data in IndexedDB in batches
async function storeDataBatch(db, batch) {
    return new Promise((resolve, reject)=>{
        const transaction = db.transaction((0, _config.storeName), 'readwrite');
        const store = transaction.objectStore((0, _config.storeName));
        batch.forEach((item)=>store.put(item));
        transaction.oncomplete = resolve;
        transaction.onerror = ()=>reject(transaction.error);
    });
}
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(()=>func.apply(this, args), wait);
    };
}
function calculateMatchScore(record, tokens) {
    let score = 0;
    // Match on street name
    if (record?.streetName && tokens?.some((token)=>record.streetName.toLowerCase().includes(token))) score += 3;
    // Match on street direction (only if it exists)
    if (record.streetDirection && tokens?.some((token)=>record.streetDirection.toLowerCase().includes(token))) score += 2;
    // Match on street type (if present)
    if (record.streetType && tokens?.some((token)=>record.streetType.toLowerCase().includes(token))) score += 1;
    // Match on street number (if present)
    if (record.streetNumber && tokens?.some((token)=>record.streetNumber.toLowerCase().includes(token))) score += 1;
    return score;
}
function tokenizeAddress(address) {
    return address.toLowerCase().trim().split(/\s+/); // Split by spaces
}
async function searchAddress(zipCode, query) {
    const db = await openDatabase();
    const formattedZipCode = zipCode.trim(); // Ensure no extra spaces in zipCode
    return new Promise((resolve, reject)=>{
        const transaction = db.transaction((0, _config.storeName), 'readonly');
        const store = transaction.objectStore('addresses');
        const zipCodeIndex = store.index('zipCode');
        // Fetch all records matching the zip code
        const zipRequest = zipCodeIndex.getAll(formattedZipCode);
        zipRequest.onsuccess = function() {
            const zipFilteredResults = zipRequest.result;
            if (!query?.trim()) {
                resolve(zipFilteredResults.slice(0, 10)); // Return top 10 if no query
                return;
            }
            const tokens = query.toLowerCase().trim().split(/\s+/); // Tokenize query
            // Refined results based on tokens
            const refinedResults = zipFilteredResults.filter((record)=>tokens.every((token)=>record.searchableAddress.includes(token) || record.searchableAddressTokens && record.searchableAddressTokens.includes(token)));
            // Calculate relevance score for refined results
            refinedResults.forEach((result)=>{
                result.matchScore = calculateMatchScore(result, tokens);
            });
            refinedResults.sort((a, b)=>b.matchScore - a.matchScore); // Sort by match score
            resolve(refinedResults.slice(0, 10)); // Limit to top 10 results
        };
        zipRequest.onerror = (error)=>reject(error);
    });
}
async function optimizedValidateAddress(zipCode, streetAddress) {
    try {
        // Ensure data is present in the database
        const isDatabasePopulated = await checkIfDatabasePopulated();
        if (!isDatabasePopulated) {
            console.log('Database is empty, fetching data...');
            await fetchAndStoreData();
        }
        console.log('database populated');
        const db = await openDatabase();
        // Format input
        const formattedZipCode = zipCode.trim();
        const tokens = streetAddress.toLowerCase().trim().split(/\s+/);
        return new Promise((resolve, reject)=>{
            const transaction = db.transaction((0, _config.storeName), 'readonly');
            const store = transaction.objectStore((0, _config.storeName));
            // Using zipCodeIndex to fetch addresses that match the zip code first
            const zipCodeIndex = store.index('zipCode');
            const zipRequest = zipCodeIndex.getAll(formattedZipCode);
            zipRequest.onsuccess = function() {
                const zipFilteredResults = zipRequest.result;
                // If no results found for zipCode, return false immediately
                if (!zipFilteredResults || zipFilteredResults.length === 0) {
                    resolve(false);
                    return;
                }
                // Tokenize the query to match against 'searchableAddressTokens'
                const matchedResults = zipFilteredResults.filter((record)=>{
                    // Check if all tokens exist in the searchable tokens of the address
                    return tokens.every((token)=>record.searchableAddressTokens.includes(token));
                });
                // If any record matched all tokens, return true
                resolve(matchedResults.length > 0);
            };
            zipRequest.onerror = function() {
                reject(zipRequest.error);
            };
        });
    } catch (error) {
        console.error('Error in optimizedValidateAddress:', error);
        return false;
    }
}
async function checkIfDatabasePopulated() {
    try {
        const db = await openDatabase();
        return new Promise((resolve, reject)=>{
            const transaction = db.transaction((0, _config.storeName), 'readonly');
            const store = transaction.objectStore((0, _config.storeName));
            // Count the number of entries in the store
            const countRequest = store.count();
            countRequest.onsuccess = ()=>resolve(countRequest.result > 50);
            countRequest.onerror = ()=>reject(countRequest.error);
        });
    } catch (error) {
        console.error('Error checking database population:', error);
        return false;
    }
}

},{"./config":"k5Hzs","./model":"Y4A21","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"k5Hzs":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "dbName", ()=>dbName);
parcelHelpers.export(exports, "storeName", ()=>storeName);
parcelHelpers.export(exports, "adminCredentials", ()=>adminCredentials);
const dbName = 'CityDataDB';
const storeName = 'addresses';
const adminCredentials = {
    username: 'admin',
    password: 'password123'
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"WJUHe":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _config = require("../config");
var _helpers = require("../helpers");
var _modalView = require("./ModalView");
var _modalViewDefault = parcelHelpers.interopDefault(_modalView);
var _justValidate = require("just-validate");
var _justValidateDefault = parcelHelpers.interopDefault(_justValidate);
class AdminLoginModal extends (0, _modalViewDefault.default) {
    _form = document.querySelector('.adminLoginModal');
    _formOverlay = document.querySelector('.login-overlay');
    _submitButton = document.querySelector('.login-submit-btn');
    _toggleLoginButton = document.querySelector('.toggle-login-btn');
    _spinnerDiv = document.querySelector('.spinner-div');
    _spinner = document.querySelector('.spinner');
    _usernameEl = document.getElementById('username');
    _validator;
    constructor(){
        super('.adminLoginModal', '.login-overlay', '.toggle-login-btn', 'login-submit-btn'); // Pass selectors to parent class
        // Initialize validation
        this._initValidation();
    }
    // Initialize validation rules
    _initValidation() {
        if (!this._form) return;
        this._validator = new (0, _justValidateDefault.default)(this._form, {
            errorLabelCssClass: 'error-message',
            tooltip: {
                position: 'top'
            },
            lockForm: true
        });
        this._validator.addField('#username', [
            {
                rule: 'required',
                errorMessage: 'Username is required'
            },
            {
                rule: 'minLength',
                value: 3,
                errorMessage: 'Username must be at least 3 characters'
            }
        ]).addField('#password', [
            {
                rule: 'required',
                errorMessage: 'Password is required'
            },
            {
                rule: 'minLength',
                value: 6,
                errorMessage: 'Password must be at least 6 characters'
            }
        ]);
    }
    // ! TO DELETE THIS CODE
    // async _handleSuccess() {
    //   console.log('HANDLE RUNNING');
    //   const formData = this._getFormData();
    //   try {
    //     console.log('starting try block');
    //     // Mock login validation (replace with API call or backend logic)
    //     if (
    //       formData.username === adminCredentials.username &&
    //       formData.password === adminCredentials.password
    //     ) {
    //       notyf.success('Login successful!');
    //       this._form.reset(); // Reset the form
    //       this.handleToggleModal(); // Close the modal
    //     }
    //   } catch (error) {
    //     console.error('Login Error:', error);
    //     notyf.error('Invalid username or password. Please try again');
    //   } finally {
    //   }
    // }
    // ! TO DELETE THIS CODE ABOVE
    // Handle successful form submission
    // async handleFormSubmit(e, onSuccess) {
    //   console.log('form submit running');
    //   e.preventDefault();
    //   try {
    //     this._submitButton.disabled = true;
    //     const isValid = await this._validator.isValid; // Ensure this works as intended
    //     console.log('Is the form valid:', isValid);
    //     if (isValid) {
    //       const formData = this._getFormData();
    //       if (
    //         formData.username === adminCredentials.username &&
    //         formData.password === adminCredentials.password
    //       ) {
    //         notyf.success('Login successful!');
    //         this._form.reset(); // Reset the form
    //         this.handleToggleModal(); // Close the modal
    //       }
    //       if (onSuccess) {
    //         console.log('Calling onSuccess...');
    //         await onSuccess(formData);
    //       }
    //     } else {
    //       this._handleFailure();
    //     }
    //   } catch (error) {
    //     console.error('Form submission error:', error);
    //     notyf.error('An error occurred during form submission.');
    //   } finally {
    //     this._submitButton.disabled = false;
    //   }
    // }
    // Handle validation failure
    _handleFailure() {
        // Focus on the first invalid field
        const firstInvalidField = document.querySelector('.is-invalid');
        if (firstInvalidField) firstInvalidField.focus();
    }
    // Get form data
    getFormData() {
        return {
            username: document.getElementById('username').value,
            password: document.getElementById('password').value
        };
    }
    // Display spinner
    renderSpinner(message = '') {
        // Hide form elements while keeping them in the DOM
        this._form.querySelectorAll('h2, label, input, button').forEach((el)=>el.style.display = 'none');
        // Show the spinner
        this._spinnerDiv.style.display = 'flex';
        this._spinnerDiv.style.flexDirection = 'column';
        this._spinnerDiv.style.gap = '1rem';
        this._spinnerDiv.classList.remove('hidden');
        this._spinnerDiv.classList.add('visible');
        this._spinnerDiv.querySelector('p').textContent = message || 'Loading...';
    }
    // Hide spinner
    cancelSpinner() {
        // Restore visibility of form elements
        this._form.querySelectorAll('h2, label, input, button').forEach((el)=>el.style.display = 'block');
        // Hide the spinner
        this._spinnerDiv.style.display = 'none';
        this._spinnerDiv.classList.remove('visible');
        this._spinnerDiv.classList.add('hidden');
    }
}
exports.default = new AdminLoginModal();

},{"../config":"k5Hzs","../helpers":"hGI1E","./ModalView":"hpKCi","just-validate":"gcCDD","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"hpKCi":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
class ModalView {
    _modal;
    _modalOverlay;
    _modalToggleButton;
    _submitButton;
    constructor(modalElement, overlayElement, toggleButtonEl, submitButtonEl){
        this._modal = document.querySelector(modalElement);
        this._modalOverlay = document.querySelector(overlayElement);
        this._modalToggleButton = document.querySelectorAll(toggleButtonEl);
        this._submitButton = document.querySelector(submitButtonEl);
        // ! Bind methods
        this.handleToggleModal = this.handleToggleModal.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.detectOutsideClickOrESCKeypress = this.detectOutsideClickOrESCKeypress.bind(this);
        this.preventCloseOnInsideClick = this.preventCloseOnInsideClick.bind(this);
        this._initEventListeners();
    }
    // Add event listeners for toggle, close on outside click, and ESC keypress
    _initEventListeners() {
        this.addHandlerToggleModal();
        this.addHandlerSubmitForm();
        this.addHandlerCloseOnOutsideClickOrESCKeypress();
        this.addHandlerPreventCloseOnModal();
    }
    handleToggleModal() {
        const isVisible = !this._modal.classList.contains('hidden');
        // Call toggleVisibility only once with the correct state
        if (isVisible) this.toggleVisibility(this._modal, this._modalOverlay); // Close modal
        else {
            this.toggleVisibility(this._modal, this._modalOverlay); // Open modal
            this._focusFirstInput();
        // Focus the first input field inside the modal
        }
    }
    _focusFirstInput() {
        const firstInput = this._modal.querySelector('input, textarea, select');
        console.log(firstInput);
        if (firstInput) requestAnimationFrame(()=>{
            firstInput.focus();
        });
    }
    // Toggle visibility and add class to body
    toggleVisibility(...elements) {
        elements.forEach((el)=>{
            if (el.classList.contains('hidden')) {
                el.classList.remove('hidden');
                el.classList.add('visible');
                document.body.classList.add('modal-open');
                this._focusFirstInput();
            } else {
                el.classList.remove('visible');
                el.classList.add('hidden');
                document.body.classList.remove('modal-open');
            }
        });
    }
    // Handle closing modal on outside click or ESC key press
    detectOutsideClickOrESCKeypress(e) {
        const isOutsideClick = e.type === 'click' && e.target === this._modalOverlay;
        const isESCKeyPress = e.type === 'keydown' && e.key === 'Escape';
        if (isESCKeyPress && !this._modal.classList.contains('hidden')) this.toggleVisibility(this._modal, this._modalOverlay);
        else if (isOutsideClick) this.toggleVisibility(this._modal, this._modalOverlay);
    }
    // Prevent clicks inside the modal from toggling or closing it
    preventCloseOnInsideClick(e) {
        e.stopPropagation();
    }
    // Cleanup event listeners when modal is closed
    cleanupHandlers() {
        if (this._modalOverlay) this._modalOverlay.removeEventListener('click', this.detectOutsideClickOrESCKeypress);
        document.removeEventListener('keydown', this.detectOutsideClickOrESCKeypress);
        if (this._modal) this._modal.removeEventListener('click', this.preventCloseOnInsideClick);
    }
    // Add handler for opening/closing modal
    addHandlerToggleModal() {
        if (this._modalToggleButton) this._modalToggleButton.forEach((button)=>button.addEventListener('click', this.handleToggleModal));
    }
    // ! FORM SUBMIT HANDLER
    async handleFormSubmit(e, onSuccess) {
        e.preventDefault();
        try {
            // EDITING
            const isEditingSession = this._modal.classList.contains('edit-session') || this._submitButton.classList.contains('edit-session');
            if (isEditingSession) {
                console.log('Edit session detected. Handling edit logic.');
                await this._saveEditedAppointment();
                return;
            }
            // REGULAR SUBMIT
            this._submitButton.disabled = true;
            const isValid = await this._validator.isValid;
            console.log('is the form valid', isValid);
            if (isValid) {
                const formData = this.getFormData();
                // console.log(formData);
                if (onSuccess) onSuccess(formData);
            }
        } catch (error) {
            console.error('Form submission error:', error);
            notyf.error('An error occurred during form submission.');
        } finally{
            this._submitButton.disabled = false;
        }
    }
    // Add handler for form Submit
    addHandlerSubmitForm(handlerFunction = null, isEditingSession = false) {
        if (!this._modal || !this._submitButton) return;
        if (handlerFunction === null) {
            this._modal.addEventListener('submit', this.handleFormSubmit);
            return;
        }
        if (handlerFunction) this._modal.addEventListener('submit', async (e)=>{
            await this.handleFormSubmit(e, handlerFunction);
        });
    }
    // Add handler for closing modal on outside click or ESC key press
    addHandlerCloseOnOutsideClickOrESCKeypress() {
        if (this._modalOverlay) this._modalOverlay.addEventListener('click', this.detectOutsideClickOrESCKeypress);
        document.addEventListener('keydown', this.detectOutsideClickOrESCKeypress);
    }
    // Prevent closing modal when clicking inside it
    addHandlerPreventCloseOnModal() {
        if (this._modal) this._modal.addEventListener('click', this.preventCloseOnInsideClick);
    }
}
exports.default = ModalView;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gcCDD":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "CustomStyleTagIds", ()=>CustomStyleTagIds);
parcelHelpers.export(exports, "GroupRules", ()=>GroupRules);
parcelHelpers.export(exports, "Rules", ()=>Rules);
parcelHelpers.export(exports, "default", ()=>JustValidate);
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __publicField = (obj, key, value)=>{
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
};
const EMAIL_REGEXP = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const INTEGER_REGEXP = /^-?[0-9]\d*$/;
const PASSWORD_REGEXP = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
const STRONG_PASSWORD_REGEXP = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const isEmpty = (value)=>{
    let newVal = value;
    if (typeof value === "string") newVal = value.trim();
    return !newVal;
};
const isEmail = (value)=>{
    return EMAIL_REGEXP.test(value);
};
const isLengthMoreThanMax = (value, len)=>{
    return value.length > len;
};
const isLengthLessThanMin = (value, len)=>{
    return value.length < len;
};
const isNumber = (value)=>{
    if (typeof value !== "string") return false;
    return !isNaN(+value) && !isNaN(parseFloat(value));
};
const isInteger = (value)=>{
    return INTEGER_REGEXP.test(value);
};
const isPassword = (value)=>{
    return PASSWORD_REGEXP.test(value);
};
const isStrongPassword = (value)=>{
    return STRONG_PASSWORD_REGEXP.test(value);
};
const isNumberMoreThanMax = (value, len)=>{
    return value > len;
};
const isNumberLessThanMin = (value, len)=>{
    return value < len;
};
const isInvalidOrEmptyString = (value)=>{
    return typeof value !== "string" || value === "";
};
var Rules = /* @__PURE__ */ ((Rules2)=>{
    Rules2["Required"] = "required";
    Rules2["Email"] = "email";
    Rules2["MinLength"] = "minLength";
    Rules2["MaxLength"] = "maxLength";
    Rules2["Password"] = "password";
    Rules2["Number"] = "number";
    Rules2["Integer"] = "integer";
    Rules2["MaxNumber"] = "maxNumber";
    Rules2["MinNumber"] = "minNumber";
    Rules2["StrongPassword"] = "strongPassword";
    Rules2["CustomRegexp"] = "customRegexp";
    Rules2["MinFilesCount"] = "minFilesCount";
    Rules2["MaxFilesCount"] = "maxFilesCount";
    Rules2["Files"] = "files";
    return Rules2;
})(Rules || {});
var GroupRules = /* @__PURE__ */ ((GroupRules2)=>{
    GroupRules2["Required"] = "required";
    return GroupRules2;
})(GroupRules || {});
var CustomStyleTagIds = /* @__PURE__ */ ((CustomStyleTagIds2)=>{
    CustomStyleTagIds2["Label"] = "label";
    CustomStyleTagIds2["LabelArrow"] = "labelArrow";
    return CustomStyleTagIds2;
})(CustomStyleTagIds || {});
const defaultDictionary = [
    {
        key: Rules.Required,
        dict: {
            en: "The field is required"
        }
    },
    {
        key: Rules.Email,
        dict: {
            en: "Email has invalid format"
        }
    },
    {
        key: Rules.MaxLength,
        dict: {
            en: "The field must contain a maximum of :value characters"
        }
    },
    {
        key: Rules.MinLength,
        dict: {
            en: "The field must contain a minimum of :value characters"
        }
    },
    {
        key: Rules.Password,
        dict: {
            en: "Password must contain minimum eight characters, at least one letter and one number"
        }
    },
    {
        key: Rules.StrongPassword,
        dict: {
            en: "Password should contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
        }
    },
    {
        key: Rules.Number,
        dict: {
            en: "Value should be a number"
        }
    },
    {
        key: Rules.MaxNumber,
        dict: {
            en: "Number should be less or equal than :value"
        }
    },
    {
        key: Rules.MinNumber,
        dict: {
            en: "Number should be more or equal than :value"
        }
    },
    {
        key: Rules.MinFilesCount,
        dict: {
            en: "Files count should be more or equal than :value"
        }
    },
    {
        key: Rules.MaxFilesCount,
        dict: {
            en: "Files count should be less or equal than :value"
        }
    },
    {
        key: Rules.Files,
        dict: {
            en: "Uploaded files have one or several invalid properties (extension/size/type etc)."
        }
    }
];
const DEFAULT_ERROR_FIELD_MESSAGE = "Value is incorrect";
const isPromise = (val)=>typeof val === "object" && val !== null && "then" in val && typeof val.then === "function";
const getNodeParents = (el)=>{
    let elem = el;
    const els = [];
    while(elem){
        els.unshift(elem);
        elem = elem.parentNode;
    }
    return els;
};
const getClosestParent = (groups, parents)=>{
    const reversedParents = [
        ...parents
    ].reverse();
    for(let i = 0, len = reversedParents.length; i < len; ++i){
        const parent = reversedParents[i];
        for(const key in groups){
            const group = groups[key];
            if (group.groupElem === parent) return [
                key,
                group
            ];
        }
    }
    return null;
};
const getClassList = (classList)=>{
    if (Array.isArray(classList)) return classList.filter((cls)=>cls.length > 0);
    if (typeof classList === "string" && classList.trim()) return [
        ...classList.split(" ").filter((cls)=>cls.length > 0)
    ];
    return [];
};
const isElement = (element)=>{
    return element instanceof Element || element instanceof HTMLDocument;
};
const errorLabelCss = `.just-validate-error-label[data-tooltip=true]{position:fixed;padding:4px 8px;background:#423f3f;color:#fff;white-space:nowrap;z-index:10;border-radius:4px;transform:translateY(-5px)}.just-validate-error-label[data-tooltip=true]:before{content:'';width:0;height:0;border-left:solid 5px transparent;border-right:solid 5px transparent;border-bottom:solid 5px #423f3f;position:absolute;z-index:3;display:block;bottom:-5px;transform:rotate(180deg);left:calc(50% - 5px)}.just-validate-error-label[data-tooltip=true][data-direction=left]{transform:translateX(-5px)}.just-validate-error-label[data-tooltip=true][data-direction=left]:before{right:-7px;bottom:auto;left:auto;top:calc(50% - 2px);transform:rotate(90deg)}.just-validate-error-label[data-tooltip=true][data-direction=right]{transform:translateX(5px)}.just-validate-error-label[data-tooltip=true][data-direction=right]:before{right:auto;bottom:auto;left:-7px;top:calc(50% - 2px);transform:rotate(-90deg)}.just-validate-error-label[data-tooltip=true][data-direction=bottom]{transform:translateY(5px)}.just-validate-error-label[data-tooltip=true][data-direction=bottom]:before{right:auto;bottom:auto;left:calc(50% - 5px);top:-5px;transform:rotate(0)}`;
const TOOLTIP_ARROW_HEIGHT = 5;
const defaultGlobalConfig = {
    errorFieldStyle: {
        color: "#b81111",
        border: "1px solid #B81111"
    },
    errorFieldCssClass: "just-validate-error-field",
    successFieldCssClass: "just-validate-success-field",
    errorLabelStyle: {
        color: "#b81111"
    },
    errorLabelCssClass: "just-validate-error-label",
    successLabelCssClass: "just-validate-success-label",
    focusInvalidField: true,
    lockForm: true,
    testingMode: false,
    validateBeforeSubmitting: false,
    submitFormAutomatically: false
};
class JustValidate {
    constructor(form, globalConfig, dictLocale){
        __publicField(this, "form", null);
        __publicField(this, "fields", {});
        __publicField(this, "groupFields", {});
        __publicField(this, "errors", {});
        __publicField(this, "isValid", false);
        __publicField(this, "isSubmitted", false);
        __publicField(this, "globalConfig", defaultGlobalConfig);
        __publicField(this, "errorLabels", {});
        __publicField(this, "successLabels", {});
        __publicField(this, "eventListeners", []);
        __publicField(this, "dictLocale", defaultDictionary);
        __publicField(this, "currentLocale", "en");
        __publicField(this, "customStyleTags", {});
        __publicField(this, "onSuccessCallback");
        __publicField(this, "onFailCallback");
        __publicField(this, "onValidateCallback");
        __publicField(this, "tooltips", []);
        __publicField(this, "lastScrollPosition");
        __publicField(this, "isScrollTick");
        __publicField(this, "fieldIds", /* @__PURE__ */ new Map());
        __publicField(this, "getKeyByFieldSelector", (field)=>{
            return this.fieldIds.get(field);
        });
        __publicField(this, "getFieldSelectorByKey", (key)=>{
            for (const [fieldSelector, k] of this.fieldIds){
                if (key === k) return fieldSelector;
            }
            return void 0;
        });
        __publicField(this, "getCompatibleFields", ()=>{
            const fields = {};
            Object.keys(this.fields).forEach((key)=>{
                let newKey = key;
                const fieldSelector = this.getFieldSelectorByKey(key);
                if (typeof fieldSelector === "string") newKey = fieldSelector;
                fields[newKey] = {
                    ...this.fields[key]
                };
            });
            return fields;
        });
        __publicField(this, "setKeyByFieldSelector", (field)=>{
            if (this.fieldIds.has(field)) return this.fieldIds.get(field);
            const key = String(this.fieldIds.size + 1);
            this.fieldIds.set(field, key);
            return key;
        });
        __publicField(this, "refreshAllTooltips", ()=>{
            this.tooltips.forEach((item)=>{
                item.refresh();
            });
        });
        __publicField(this, "handleDocumentScroll", ()=>{
            this.lastScrollPosition = window.scrollY;
            if (!this.isScrollTick) {
                window.requestAnimationFrame(()=>{
                    this.refreshAllTooltips();
                    this.isScrollTick = false;
                });
                this.isScrollTick = true;
            }
        });
        __publicField(this, "formSubmitHandler", (ev)=>{
            ev.preventDefault();
            this.isSubmitted = true;
            this.validateHandler(ev);
        });
        __publicField(this, "handleFieldChange", (target)=>{
            let foundKey;
            for(const key in this.fields){
                const field = this.fields[key];
                if (field.elem === target) {
                    foundKey = key;
                    break;
                }
            }
            if (!foundKey) return;
            this.fields[foundKey].touched = true;
            this.validateField(foundKey, true);
        });
        __publicField(this, "handleGroupChange", (target)=>{
            let foundKey;
            for(const key in this.groupFields){
                const group = this.groupFields[key];
                if (group.elems.find((elem)=>elem === target)) {
                    foundKey = key;
                    break;
                }
            }
            if (!foundKey) return;
            this.groupFields[foundKey].touched = true;
            this.validateGroup(foundKey, true);
        });
        __publicField(this, "handlerChange", (ev)=>{
            if (!ev.target) return;
            this.handleFieldChange(ev.target);
            this.handleGroupChange(ev.target);
            this.renderErrors();
        });
        this.initialize(form, globalConfig, dictLocale);
    }
    initialize(form, globalConfig, dictLocale) {
        this.form = null;
        this.errors = {};
        this.isValid = false;
        this.isSubmitted = false;
        this.globalConfig = defaultGlobalConfig;
        this.errorLabels = {};
        this.successLabels = {};
        this.eventListeners = [];
        this.customStyleTags = {};
        this.tooltips = [];
        this.currentLocale = "en";
        if (typeof form === "string") {
            const elem = document.querySelector(form);
            if (!elem) throw Error(`Form with ${form} selector not found! Please check the form selector`);
            this.setForm(elem);
        } else if (form instanceof HTMLFormElement) this.setForm(form);
        else throw Error(`Form selector is not valid. Please specify a string selector or a DOM element.`);
        this.globalConfig = {
            ...defaultGlobalConfig,
            ...globalConfig
        };
        if (dictLocale) this.dictLocale = [
            ...dictLocale,
            ...defaultDictionary
        ];
        if (this.isTooltip()) {
            const styleTag = document.createElement("style");
            styleTag.textContent = errorLabelCss;
            this.customStyleTags[CustomStyleTagIds.Label] = document.head.appendChild(styleTag);
            this.addListener("scroll", document, this.handleDocumentScroll);
        }
    }
    getLocalisedString(rule, ruleValue, customMsg) {
        var _a;
        const search = customMsg != null ? customMsg : rule;
        let localisedStr = (_a = this.dictLocale.find((item)=>item.key === search)) == null ? void 0 : _a.dict[this.currentLocale];
        if (!localisedStr) {
            if (customMsg) localisedStr = customMsg;
        }
        if (localisedStr && ruleValue !== void 0) switch(rule){
            case Rules.MaxLength:
            case Rules.MinLength:
            case Rules.MaxNumber:
            case Rules.MinNumber:
            case Rules.MinFilesCount:
            case Rules.MaxFilesCount:
                localisedStr = localisedStr.replace(":value", String(ruleValue));
        }
        return localisedStr || customMsg || DEFAULT_ERROR_FIELD_MESSAGE;
    }
    getFieldErrorMessage(fieldRule, elem) {
        const msg = typeof fieldRule.errorMessage === "function" ? fieldRule.errorMessage(this.getElemValue(elem), this.fields) : fieldRule.errorMessage;
        return this.getLocalisedString(fieldRule.rule, fieldRule.value, msg);
    }
    getFieldSuccessMessage(successMessage, elem) {
        const msg = typeof successMessage === "function" ? successMessage(this.getElemValue(elem), this.fields) : successMessage;
        return this.getLocalisedString(void 0, void 0, msg);
    }
    getGroupErrorMessage(groupRule) {
        return this.getLocalisedString(groupRule.rule, void 0, groupRule.errorMessage);
    }
    getGroupSuccessMessage(groupRule) {
        if (!groupRule.successMessage) return void 0;
        return this.getLocalisedString(void 0, void 0, groupRule.successMessage);
    }
    setFieldInvalid(key, fieldRule) {
        this.fields[key].isValid = false;
        this.fields[key].errorMessage = this.getFieldErrorMessage(fieldRule, this.fields[key].elem);
    }
    setFieldValid(key, successMessage) {
        this.fields[key].isValid = true;
        if (successMessage !== void 0) this.fields[key].successMessage = this.getFieldSuccessMessage(successMessage, this.fields[key].elem);
    }
    setGroupInvalid(key, groupRule) {
        this.groupFields[key].isValid = false;
        this.groupFields[key].errorMessage = this.getGroupErrorMessage(groupRule);
    }
    setGroupValid(key, groupRule) {
        this.groupFields[key].isValid = true;
        this.groupFields[key].successMessage = this.getGroupSuccessMessage(groupRule);
    }
    getElemValue(elem) {
        switch(elem.type){
            case "checkbox":
                return elem.checked;
            case "file":
                return elem.files;
            default:
                return elem.value;
        }
    }
    validateGroupRule(key, elems, groupRule) {
        switch(groupRule.rule){
            case GroupRules.Required:
                if (elems.every((elem)=>!elem.checked)) this.setGroupInvalid(key, groupRule);
                else this.setGroupValid(key, groupRule);
        }
    }
    validateFieldRule(key, elem, fieldRule, afterInputChanged = false) {
        const ruleValue = fieldRule.value;
        const elemValue = this.getElemValue(elem);
        if (fieldRule.plugin) {
            const result = fieldRule.plugin(elemValue, this.getCompatibleFields());
            if (!result) this.setFieldInvalid(key, fieldRule);
            return;
        }
        switch(fieldRule.rule){
            case Rules.Required:
                if (isEmpty(elemValue)) this.setFieldInvalid(key, fieldRule);
                break;
            case Rules.Email:
                if (isInvalidOrEmptyString(elemValue)) break;
                if (!isEmail(elemValue)) this.setFieldInvalid(key, fieldRule);
                break;
            case Rules.MaxLength:
                if (ruleValue === void 0) {
                    console.error(`Value for ${fieldRule.rule} rule for [${key}] field is not defined. The field will be always invalid.`);
                    this.setFieldInvalid(key, fieldRule);
                    break;
                }
                if (typeof ruleValue !== "number") {
                    console.error(`Value for ${fieldRule.rule} rule for [${key}] should be a number. The field will be always invalid.`);
                    this.setFieldInvalid(key, fieldRule);
                    break;
                }
                if (isInvalidOrEmptyString(elemValue)) break;
                if (isLengthMoreThanMax(elemValue, ruleValue)) this.setFieldInvalid(key, fieldRule);
                break;
            case Rules.MinLength:
                if (ruleValue === void 0) {
                    console.error(`Value for ${fieldRule.rule} rule for [${key}] field is not defined. The field will be always invalid.`);
                    this.setFieldInvalid(key, fieldRule);
                    break;
                }
                if (typeof ruleValue !== "number") {
                    console.error(`Value for ${fieldRule.rule} rule for [${key}] should be a number. The field will be always invalid.`);
                    this.setFieldInvalid(key, fieldRule);
                    break;
                }
                if (isInvalidOrEmptyString(elemValue)) break;
                if (isLengthLessThanMin(elemValue, ruleValue)) this.setFieldInvalid(key, fieldRule);
                break;
            case Rules.Password:
                if (isInvalidOrEmptyString(elemValue)) break;
                if (!isPassword(elemValue)) this.setFieldInvalid(key, fieldRule);
                break;
            case Rules.StrongPassword:
                if (isInvalidOrEmptyString(elemValue)) break;
                if (!isStrongPassword(elemValue)) this.setFieldInvalid(key, fieldRule);
                break;
            case Rules.Number:
                if (isInvalidOrEmptyString(elemValue)) break;
                if (!isNumber(elemValue)) this.setFieldInvalid(key, fieldRule);
                break;
            case Rules.Integer:
                if (isInvalidOrEmptyString(elemValue)) break;
                if (!isInteger(elemValue)) this.setFieldInvalid(key, fieldRule);
                break;
            case Rules.MaxNumber:
                {
                    if (ruleValue === void 0) {
                        console.error(`Value for ${fieldRule.rule} rule for [${key}] field is not defined. The field will be always invalid.`);
                        this.setFieldInvalid(key, fieldRule);
                        break;
                    }
                    if (typeof ruleValue !== "number") {
                        console.error(`Value for ${fieldRule.rule} rule for [${key}] field should be a number. The field will be always invalid.`);
                        this.setFieldInvalid(key, fieldRule);
                        break;
                    }
                    if (isInvalidOrEmptyString(elemValue)) break;
                    const num = +elemValue;
                    if (Number.isNaN(num) || isNumberMoreThanMax(num, ruleValue)) this.setFieldInvalid(key, fieldRule);
                    break;
                }
            case Rules.MinNumber:
                {
                    if (ruleValue === void 0) {
                        console.error(`Value for ${fieldRule.rule} rule for [${key}] field is not defined. The field will be always invalid.`);
                        this.setFieldInvalid(key, fieldRule);
                        break;
                    }
                    if (typeof ruleValue !== "number") {
                        console.error(`Value for ${fieldRule.rule} rule for [${key}] field should be a number. The field will be always invalid.`);
                        this.setFieldInvalid(key, fieldRule);
                        break;
                    }
                    if (isInvalidOrEmptyString(elemValue)) break;
                    const num = +elemValue;
                    if (Number.isNaN(num) || isNumberLessThanMin(num, ruleValue)) this.setFieldInvalid(key, fieldRule);
                    break;
                }
            case Rules.CustomRegexp:
                {
                    if (ruleValue === void 0) {
                        console.error(`Value for ${fieldRule.rule} rule for [${key}] field is not defined. This field will be always invalid.`);
                        this.setFieldInvalid(key, fieldRule);
                        return;
                    }
                    let regexp;
                    try {
                        regexp = new RegExp(ruleValue);
                    } catch (e) {
                        console.error(`Value for ${fieldRule.rule} rule for [${key}] should be a valid regexp. This field will be always invalid.`);
                        this.setFieldInvalid(key, fieldRule);
                        break;
                    }
                    const str = String(elemValue);
                    if (str !== "" && !regexp.test(str)) this.setFieldInvalid(key, fieldRule);
                    break;
                }
            case Rules.MinFilesCount:
                if (ruleValue === void 0) {
                    console.error(`Value for ${fieldRule.rule} rule for [${key}] field is not defined. This field will be always invalid.`);
                    this.setFieldInvalid(key, fieldRule);
                    break;
                }
                if (typeof ruleValue !== "number") {
                    console.error(`Value for ${fieldRule.rule} rule for [${key}] field should be a number. The field will be always invalid.`);
                    this.setFieldInvalid(key, fieldRule);
                    break;
                }
                if (Number.isFinite(elemValue == null ? void 0 : elemValue.length) && elemValue.length < ruleValue) {
                    this.setFieldInvalid(key, fieldRule);
                    break;
                }
                break;
            case Rules.MaxFilesCount:
                if (ruleValue === void 0) {
                    console.error(`Value for ${fieldRule.rule} rule for [${key}] field is not defined. This field will be always invalid.`);
                    this.setFieldInvalid(key, fieldRule);
                    break;
                }
                if (typeof ruleValue !== "number") {
                    console.error(`Value for ${fieldRule.rule} rule for [${key}] field should be a number. The field will be always invalid.`);
                    this.setFieldInvalid(key, fieldRule);
                    break;
                }
                if (Number.isFinite(elemValue == null ? void 0 : elemValue.length) && elemValue.length > ruleValue) {
                    this.setFieldInvalid(key, fieldRule);
                    break;
                }
                break;
            case Rules.Files:
                {
                    if (ruleValue === void 0) {
                        console.error(`Value for ${fieldRule.rule} rule for [${key}] field is not defined. This field will be always invalid.`);
                        this.setFieldInvalid(key, fieldRule);
                        return;
                    }
                    if (typeof ruleValue !== "object") {
                        console.error(`Value for ${fieldRule.rule} rule for [${key}] field should be an object. This field will be always invalid.`);
                        this.setFieldInvalid(key, fieldRule);
                        return;
                    }
                    const filesConfig = ruleValue.files;
                    if (typeof filesConfig !== "object") {
                        console.error(`Value for ${fieldRule.rule} rule for [${key}] field should be an object with files array. This field will be always invalid.`);
                        this.setFieldInvalid(key, fieldRule);
                        return;
                    }
                    const isFilePropsInvalid = (file, fileConfig)=>{
                        const minSizeInvalid = Number.isFinite(fileConfig.minSize) && file.size < fileConfig.minSize;
                        const maxSizeInvalid = Number.isFinite(fileConfig.maxSize) && file.size > fileConfig.maxSize;
                        const nameInvalid = Array.isArray(fileConfig.names) && !fileConfig.names.includes(file.name);
                        const extInvalid = Array.isArray(fileConfig.extensions) && !fileConfig.extensions.includes(file.name.split(".")[file.name.split(".").length - 1]);
                        const typeInvalid = Array.isArray(fileConfig.types) && !fileConfig.types.includes(file.type);
                        return minSizeInvalid || maxSizeInvalid || nameInvalid || extInvalid || typeInvalid;
                    };
                    if (typeof elemValue === "object" && elemValue !== null) for(let fileIdx = 0, len = elemValue.length; fileIdx < len; ++fileIdx){
                        const file = elemValue.item(fileIdx);
                        if (!file) {
                            this.setFieldInvalid(key, fieldRule);
                            break;
                        }
                        const filesInvalid = isFilePropsInvalid(file, filesConfig);
                        if (filesInvalid) {
                            this.setFieldInvalid(key, fieldRule);
                            break;
                        }
                    }
                    break;
                }
            default:
                {
                    if (typeof fieldRule.validator !== "function") {
                        console.error(`Validator for custom rule for [${key}] field should be a function. This field will be always invalid.`);
                        this.setFieldInvalid(key, fieldRule);
                        return;
                    }
                    const result = fieldRule.validator(elemValue, this.getCompatibleFields());
                    if (typeof result !== "boolean" && typeof result !== "function") console.error(`Validator return value for [${key}] field should be boolean or function. It will be cast to boolean.`);
                    if (typeof result === "function") {
                        if (afterInputChanged) this.fields[key].asyncCheckPending = true;
                        else {
                            this.fields[key].asyncCheckPending = false;
                            const promise = result();
                            if (!isPromise(promise)) {
                                console.error(`Validator function for custom rule for [${key}] field should return a Promise. This field will be always invalid.`);
                                this.setFieldInvalid(key, fieldRule);
                                return;
                            }
                            return promise.then((resp)=>{
                                if (!resp) this.setFieldInvalid(key, fieldRule);
                            }).catch(()=>{
                                this.setFieldInvalid(key, fieldRule);
                            });
                        }
                    }
                    if (!result) this.setFieldInvalid(key, fieldRule);
                }
        }
    }
    isFormValid() {
        let isValid = true;
        for(let i = 0, len = Object.values(this.fields).length; i < len; ++i){
            const item = Object.values(this.fields)[i];
            if (item.isValid === void 0) {
                isValid = void 0;
                break;
            }
            if (item.isValid === false) {
                isValid = false;
                break;
            }
        }
        for(let i = 0, len = Object.values(this.groupFields).length; i < len; ++i){
            const item = Object.values(this.groupFields)[i];
            if (item.isValid === void 0) {
                isValid = void 0;
                break;
            }
            if (item.isValid === false) {
                isValid = false;
                break;
            }
        }
        return isValid;
    }
    validateField(key, afterInputChanged = false) {
        var _a;
        const field = this.fields[key];
        field.isValid = true;
        const promises = [];
        [
            ...field.rules
        ].reverse().forEach((rule)=>{
            const res = this.validateFieldRule(key, field.elem, rule, afterInputChanged);
            if (isPromise(res)) promises.push(res);
        });
        if (field.isValid) this.setFieldValid(key, (_a = field.config) == null ? void 0 : _a.successMessage);
        return Promise.allSettled(promises).finally(()=>{
            var _a2;
            if (afterInputChanged) (_a2 = this.onValidateCallback) == null || _a2.call(this, {
                isValid: this.isFormValid(),
                isSubmitted: this.isSubmitted,
                fields: this.getCompatibleFields(),
                groups: {
                    ...this.groupFields
                }
            });
        });
    }
    revalidateField(fieldSelector) {
        if (typeof fieldSelector !== "string" && !isElement(fieldSelector)) throw Error(`Field selector is not valid. Please specify a string selector or a valid DOM element.`);
        const key = this.getKeyByFieldSelector(fieldSelector);
        if (!key || !this.fields[key]) {
            console.error(`Field not found. Check the field selector.`);
            return Promise.reject();
        }
        return new Promise((resolve)=>{
            this.validateField(key, true).finally(()=>{
                this.clearFieldStyle(key);
                this.clearFieldLabel(key);
                this.renderFieldError(key, true);
                resolve(!!this.fields[key].isValid);
            });
        });
    }
    revalidateGroup(groupSelector) {
        if (typeof groupSelector !== "string" && !isElement(groupSelector)) throw Error(`Group selector is not valid. Please specify a string selector or a valid DOM element.`);
        const key = this.getKeyByFieldSelector(groupSelector);
        if (!key || !this.groupFields[key]) {
            console.error(`Group not found. Check the group selector.`);
            return Promise.reject();
        }
        return new Promise((resolve)=>{
            this.validateGroup(key).finally(()=>{
                this.clearFieldLabel(key);
                this.renderGroupError(key, true);
                resolve(!!this.groupFields[key].isValid);
            });
        });
    }
    validateGroup(key, afterInputChanged = false) {
        const group = this.groupFields[key];
        const promises = [];
        [
            ...group.rules
        ].reverse().forEach((rule)=>{
            const res = this.validateGroupRule(key, group.elems, rule);
            if (isPromise(res)) promises.push(res);
        });
        return Promise.allSettled(promises).finally(()=>{
            var _a;
            if (afterInputChanged) (_a = this.onValidateCallback) == null || _a.call(this, {
                isValid: this.isFormValid(),
                isSubmitted: this.isSubmitted,
                fields: this.getCompatibleFields(),
                groups: {
                    ...this.groupFields
                }
            });
        });
    }
    focusInvalidField() {
        for(const key in this.fields){
            const field = this.fields[key];
            if (!field.isValid) {
                setTimeout(()=>field.elem.focus(), 0);
                break;
            }
        }
    }
    afterSubmitValidation(forceRevalidation = false) {
        this.renderErrors(forceRevalidation);
        if (this.globalConfig.focusInvalidField) this.focusInvalidField();
    }
    validate(forceRevalidation = false) {
        return new Promise((resolve)=>{
            const promises = [];
            Object.keys(this.fields).forEach((key)=>{
                const promise = this.validateField(key);
                if (isPromise(promise)) promises.push(promise);
            });
            Object.keys(this.groupFields).forEach((key)=>{
                const promise = this.validateGroup(key);
                if (isPromise(promise)) promises.push(promise);
            });
            Promise.allSettled(promises).then(()=>{
                var _a;
                this.afterSubmitValidation(forceRevalidation);
                (_a = this.onValidateCallback) == null || _a.call(this, {
                    isValid: this.isFormValid(),
                    isSubmitted: this.isSubmitted,
                    fields: this.getCompatibleFields(),
                    groups: {
                        ...this.groupFields
                    }
                });
                resolve(!!promises.length);
            });
        });
    }
    revalidate() {
        return new Promise((resolve)=>{
            this.validateHandler(void 0, true).finally(()=>{
                if (this.globalConfig.focusInvalidField) this.focusInvalidField();
                resolve(this.isValid);
            });
        });
    }
    validateHandler(ev, forceRevalidation = false) {
        if (this.globalConfig.lockForm) this.lockForm();
        return this.validate(forceRevalidation).finally(()=>{
            var _a, _b, _c;
            if (this.globalConfig.lockForm) this.unlockForm();
            if (this.isValid) {
                (_a = this.onSuccessCallback) == null || _a.call(this, ev);
                if (this.globalConfig.submitFormAutomatically) (_b = ev == null ? void 0 : ev.currentTarget) == null || _b.submit();
            } else (_c = this.onFailCallback) == null || _c.call(this, this.getCompatibleFields(), this.groupFields);
        });
    }
    setForm(form) {
        this.form = form;
        this.form.setAttribute("novalidate", "novalidate");
        this.removeListener("submit", this.form, this.formSubmitHandler);
        this.addListener("submit", this.form, this.formSubmitHandler);
    }
    addListener(type, elem, handler) {
        elem.addEventListener(type, handler);
        this.eventListeners.push({
            type,
            elem,
            func: handler
        });
    }
    removeListener(type, elem, handler) {
        elem.removeEventListener(type, handler);
        this.eventListeners = this.eventListeners.filter((item)=>item.type !== type || item.elem !== elem);
    }
    addField(fieldSelector, rules, config) {
        if (typeof fieldSelector !== "string" && !isElement(fieldSelector)) throw Error(`Field selector is not valid. Please specify a string selector or a valid DOM element.`);
        let elem;
        if (typeof fieldSelector === "string") elem = this.form.querySelector(fieldSelector);
        else elem = fieldSelector;
        if (!elem) throw Error(`Field doesn't exist in the DOM! Please check the field selector.`);
        if (!Array.isArray(rules) || !rules.length) throw Error(`Rules argument should be an array and should contain at least 1 element.`);
        rules.forEach((item)=>{
            if (!("rule" in item || "validator" in item || "plugin" in item)) throw Error(`Rules argument must contain at least one rule or validator property.`);
            if (!item.validator && !item.plugin && (!item.rule || !Object.values(Rules).includes(item.rule))) throw Error(`Rule should be one of these types: ${Object.values(Rules).join(", ")}. Provided value: ${item.rule}`);
        });
        const key = this.setKeyByFieldSelector(fieldSelector);
        this.fields[key] = {
            elem,
            rules,
            isValid: void 0,
            touched: false,
            config
        };
        this.setListeners(elem);
        if (this.isSubmitted || this.globalConfig.validateBeforeSubmitting) this.validateField(key);
        return this;
    }
    removeField(fieldSelector) {
        if (typeof fieldSelector !== "string" && !isElement(fieldSelector)) throw Error(`Field selector is not valid. Please specify a string selector or a valid DOM element.`);
        const key = this.getKeyByFieldSelector(fieldSelector);
        if (!key || !this.fields[key]) {
            console.error(`Field not found. Check the field selector.`);
            return this;
        }
        const type = this.getListenerType(this.fields[key].elem.type);
        this.removeListener(type, this.fields[key].elem, this.handlerChange);
        this.clearErrors();
        delete this.fields[key];
        return this;
    }
    removeGroup(group) {
        if (typeof group !== "string") throw Error(`Group selector is not valid. Please specify a string selector.`);
        const key = this.getKeyByFieldSelector(group);
        if (!key || !this.groupFields[key]) {
            console.error(`Group not found. Check the group selector.`);
            return this;
        }
        this.groupFields[key].elems.forEach((elem)=>{
            const type = this.getListenerType(elem.type);
            this.removeListener(type, elem, this.handlerChange);
        });
        this.clearErrors();
        delete this.groupFields[key];
        return this;
    }
    addRequiredGroup(groupField, errorMessage, config, successMessage) {
        if (typeof groupField !== "string" && !isElement(groupField)) throw Error(`Group selector is not valid. Please specify a string selector or a valid DOM element.`);
        let elem;
        if (typeof groupField === "string") elem = this.form.querySelector(groupField);
        else elem = groupField;
        if (!elem) throw Error(`Group selector not found! Please check the group selector.`);
        const inputs = elem.querySelectorAll("input");
        const childrenInputs = Array.from(inputs).filter((input)=>{
            const parent = getClosestParent(this.groupFields, getNodeParents(input));
            if (!parent) return true;
            return parent[1].elems.find((elem2)=>elem2 !== input);
        });
        const key = this.setKeyByFieldSelector(groupField);
        this.groupFields[key] = {
            rules: [
                {
                    rule: GroupRules.Required,
                    errorMessage,
                    successMessage
                }
            ],
            groupElem: elem,
            elems: childrenInputs,
            touched: false,
            isValid: void 0,
            config
        };
        inputs.forEach((input)=>{
            this.setListeners(input);
        });
        return this;
    }
    getListenerType(type) {
        switch(type){
            case "checkbox":
            case "select-one":
            case "file":
            case "radio":
                return "change";
            default:
                return "input";
        }
    }
    setListeners(elem) {
        const type = this.getListenerType(elem.type);
        this.removeListener(type, elem, this.handlerChange);
        this.addListener(type, elem, this.handlerChange);
    }
    clearFieldLabel(key) {
        var _a, _b;
        (_a = this.errorLabels[key]) == null || _a.remove();
        (_b = this.successLabels[key]) == null || _b.remove();
    }
    clearFieldStyle(key) {
        var _a, _b, _c, _d;
        const field = this.fields[key];
        const errorStyle = ((_a = field.config) == null ? void 0 : _a.errorFieldStyle) || this.globalConfig.errorFieldStyle;
        Object.keys(errorStyle).forEach((key2)=>{
            field.elem.style[key2] = "";
        });
        const successStyle = ((_b = field.config) == null ? void 0 : _b.successFieldStyle) || this.globalConfig.successFieldStyle || {};
        Object.keys(successStyle).forEach((key2)=>{
            field.elem.style[key2] = "";
        });
        field.elem.classList.remove(...getClassList(((_c = field.config) == null ? void 0 : _c.errorFieldCssClass) || this.globalConfig.errorFieldCssClass), ...getClassList(((_d = field.config) == null ? void 0 : _d.successFieldCssClass) || this.globalConfig.successFieldCssClass));
    }
    clearErrors() {
        var _a, _b;
        Object.keys(this.errorLabels).forEach((key)=>this.errorLabels[key].remove());
        Object.keys(this.successLabels).forEach((key)=>this.successLabels[key].remove());
        for(const key in this.fields)this.clearFieldStyle(key);
        for(const key in this.groupFields){
            const group = this.groupFields[key];
            const errorStyle = ((_a = group.config) == null ? void 0 : _a.errorFieldStyle) || this.globalConfig.errorFieldStyle;
            Object.keys(errorStyle).forEach((key2)=>{
                group.elems.forEach((elem)=>{
                    var _a2;
                    elem.style[key2] = "";
                    elem.classList.remove(...getClassList(((_a2 = group.config) == null ? void 0 : _a2.errorFieldCssClass) || this.globalConfig.errorFieldCssClass));
                });
            });
            const successStyle = ((_b = group.config) == null ? void 0 : _b.successFieldStyle) || this.globalConfig.successFieldStyle || {};
            Object.keys(successStyle).forEach((key2)=>{
                group.elems.forEach((elem)=>{
                    var _a2;
                    elem.style[key2] = "";
                    elem.classList.remove(...getClassList(((_a2 = group.config) == null ? void 0 : _a2.successFieldCssClass) || this.globalConfig.successFieldCssClass));
                });
            });
        }
        this.tooltips = [];
    }
    isTooltip() {
        return !!this.globalConfig.tooltip;
    }
    lockForm() {
        const elems = this.form.querySelectorAll("input, textarea, button, select");
        for(let i = 0, len = elems.length; i < len; ++i){
            elems[i].setAttribute("data-just-validate-fallback-disabled", elems[i].disabled ? "true" : "false");
            elems[i].setAttribute("disabled", "disabled");
            elems[i].style.pointerEvents = "none";
            elems[i].style.webkitFilter = "grayscale(100%)";
            elems[i].style.filter = "grayscale(100%)";
        }
    }
    unlockForm() {
        const elems = this.form.querySelectorAll("input, textarea, button, select");
        for(let i = 0, len = elems.length; i < len; ++i){
            if (elems[i].getAttribute("data-just-validate-fallback-disabled") !== "true") elems[i].removeAttribute("disabled");
            elems[i].style.pointerEvents = "";
            elems[i].style.webkitFilter = "";
            elems[i].style.filter = "";
        }
    }
    renderTooltip(elem, errorLabel, position) {
        var _a;
        const { top, left, width, height } = elem.getBoundingClientRect();
        const errorLabelRect = errorLabel.getBoundingClientRect();
        const pos = position || ((_a = this.globalConfig.tooltip) == null ? void 0 : _a.position);
        switch(pos){
            case "left":
                errorLabel.style.top = `${top + height / 2 - errorLabelRect.height / 2}px`;
                errorLabel.style.left = `${left - errorLabelRect.width - TOOLTIP_ARROW_HEIGHT}px`;
                break;
            case "top":
                errorLabel.style.top = `${top - errorLabelRect.height - TOOLTIP_ARROW_HEIGHT}px`;
                errorLabel.style.left = `${left + width / 2 - errorLabelRect.width / 2}px`;
                break;
            case "right":
                errorLabel.style.top = `${top + height / 2 - errorLabelRect.height / 2}px`;
                errorLabel.style.left = `${left + width + TOOLTIP_ARROW_HEIGHT}px`;
                break;
            case "bottom":
                errorLabel.style.top = `${top + height + TOOLTIP_ARROW_HEIGHT}px`;
                errorLabel.style.left = `${left + width / 2 - errorLabelRect.width / 2}px`;
                break;
        }
        errorLabel.dataset.direction = pos;
        const refresh = ()=>{
            this.renderTooltip(elem, errorLabel, position);
        };
        return {
            refresh
        };
    }
    createErrorLabelElem(key, errorMessage, config) {
        const errorLabel = document.createElement("div");
        errorLabel.innerHTML = errorMessage;
        const customErrorLabelStyle = this.isTooltip() ? config == null ? void 0 : config.errorLabelStyle : (config == null ? void 0 : config.errorLabelStyle) || this.globalConfig.errorLabelStyle;
        Object.assign(errorLabel.style, customErrorLabelStyle);
        errorLabel.classList.add(...getClassList((config == null ? void 0 : config.errorLabelCssClass) || this.globalConfig.errorLabelCssClass), "just-validate-error-label");
        if (this.isTooltip()) errorLabel.dataset.tooltip = "true";
        if (this.globalConfig.testingMode) errorLabel.dataset.testId = `error-label-${key}`;
        this.errorLabels[key] = errorLabel;
        return errorLabel;
    }
    createSuccessLabelElem(key, successMessage, config) {
        if (successMessage === void 0) return null;
        const successLabel = document.createElement("div");
        successLabel.innerHTML = successMessage;
        const customSuccessLabelStyle = (config == null ? void 0 : config.successLabelStyle) || this.globalConfig.successLabelStyle;
        Object.assign(successLabel.style, customSuccessLabelStyle);
        successLabel.classList.add(...getClassList((config == null ? void 0 : config.successLabelCssClass) || this.globalConfig.successLabelCssClass), "just-validate-success-label");
        if (this.globalConfig.testingMode) successLabel.dataset.testId = `success-label-${key}`;
        this.successLabels[key] = successLabel;
        return successLabel;
    }
    renderErrorsContainer(label, errorsContainer) {
        const container = errorsContainer || this.globalConfig.errorsContainer;
        if (typeof container === "string") {
            const elem = this.form.querySelector(container);
            if (elem) {
                elem.appendChild(label);
                return true;
            } else console.error(`Error container with ${container} selector not found. Errors will be rendered as usual`);
        }
        if (container instanceof Element) {
            container.appendChild(label);
            return true;
        }
        if (container !== void 0) console.error(`Error container not found. It should be a string or existing Element. Errors will be rendered as usual`);
        return false;
    }
    renderGroupLabel(elem, label, errorsContainer, isSuccess) {
        if (!isSuccess) {
            const renderedInErrorsContainer = this.renderErrorsContainer(label, errorsContainer);
            if (renderedInErrorsContainer) return;
        }
        elem.appendChild(label);
    }
    renderFieldLabel(elem, label, errorsContainer, isSuccess) {
        var _a, _b, _c, _d, _e, _f, _g;
        if (!isSuccess) {
            const renderedInErrorsContainer = this.renderErrorsContainer(label, errorsContainer);
            if (renderedInErrorsContainer) return;
        }
        if (elem.type === "checkbox" || elem.type === "radio") {
            const labelElem = document.querySelector(`label[for="${elem.getAttribute("id")}"]`);
            if (((_b = (_a = elem.parentElement) == null ? void 0 : _a.tagName) == null ? void 0 : _b.toLowerCase()) === "label") (_d = (_c = elem.parentElement) == null ? void 0 : _c.parentElement) == null || _d.appendChild(label);
            else if (labelElem) (_e = labelElem.parentElement) == null || _e.appendChild(label);
            else (_f = elem.parentElement) == null || _f.appendChild(label);
        } else (_g = elem.parentElement) == null || _g.appendChild(label);
    }
    showLabels(fields, isError) {
        Object.keys(fields).forEach((fieldName, i)=>{
            const error = fields[fieldName];
            const key = this.getKeyByFieldSelector(fieldName);
            if (!key || !this.fields[key]) {
                console.error(`Field not found. Check the field selector.`);
                return;
            }
            const field = this.fields[key];
            field.isValid = !isError;
            this.clearFieldStyle(key);
            this.clearFieldLabel(key);
            this.renderFieldError(key, false, error);
            if (i === 0 && this.globalConfig.focusInvalidField) setTimeout(()=>field.elem.focus(), 0);
        });
    }
    showErrors(fields) {
        if (typeof fields !== "object") throw Error("[showErrors]: Errors should be an object with key: value format");
        this.showLabels(fields, true);
    }
    showSuccessLabels(fields) {
        if (typeof fields !== "object") throw Error("[showSuccessLabels]: Labels should be an object with key: value format");
        this.showLabels(fields, false);
    }
    renderFieldError(key, forced = false, message) {
        var _a, _b, _c, _d, _e, _f;
        const field = this.fields[key];
        if (field.isValid === false) this.isValid = false;
        if (field.isValid === void 0 || !forced && !this.isSubmitted && !field.touched && message === void 0) return;
        if (field.isValid) {
            if (!field.asyncCheckPending) {
                const successLabel = this.createSuccessLabelElem(key, message !== void 0 ? message : field.successMessage, field.config);
                if (successLabel) this.renderFieldLabel(field.elem, successLabel, (_a = field.config) == null ? void 0 : _a.errorsContainer, true);
                field.elem.classList.add(...getClassList(((_b = field.config) == null ? void 0 : _b.successFieldCssClass) || this.globalConfig.successFieldCssClass));
            }
            return;
        }
        field.elem.classList.add(...getClassList(((_c = field.config) == null ? void 0 : _c.errorFieldCssClass) || this.globalConfig.errorFieldCssClass));
        const errorLabel = this.createErrorLabelElem(key, message !== void 0 ? message : field.errorMessage, field.config);
        this.renderFieldLabel(field.elem, errorLabel, (_d = field.config) == null ? void 0 : _d.errorsContainer);
        if (this.isTooltip()) this.tooltips.push(this.renderTooltip(field.elem, errorLabel, (_f = (_e = field.config) == null ? void 0 : _e.tooltip) == null ? void 0 : _f.position));
    }
    renderGroupError(key, force = true) {
        var _a, _b, _c, _d;
        const group = this.groupFields[key];
        if (group.isValid === false) this.isValid = false;
        if (group.isValid === void 0 || !force && !this.isSubmitted && !group.touched) return;
        if (group.isValid) {
            group.elems.forEach((elem)=>{
                var _a2, _b2;
                Object.assign(elem.style, ((_a2 = group.config) == null ? void 0 : _a2.successFieldStyle) || this.globalConfig.successFieldStyle);
                elem.classList.add(...getClassList(((_b2 = group.config) == null ? void 0 : _b2.successFieldCssClass) || this.globalConfig.successFieldCssClass));
            });
            const successLabel = this.createSuccessLabelElem(key, group.successMessage, group.config);
            if (successLabel) this.renderGroupLabel(group.groupElem, successLabel, (_a = group.config) == null ? void 0 : _a.errorsContainer, true);
            return;
        }
        this.isValid = false;
        group.elems.forEach((elem)=>{
            var _a2, _b2;
            Object.assign(elem.style, ((_a2 = group.config) == null ? void 0 : _a2.errorFieldStyle) || this.globalConfig.errorFieldStyle);
            elem.classList.add(...getClassList(((_b2 = group.config) == null ? void 0 : _b2.errorFieldCssClass) || this.globalConfig.errorFieldCssClass));
        });
        const errorLabel = this.createErrorLabelElem(key, group.errorMessage, group.config);
        this.renderGroupLabel(group.groupElem, errorLabel, (_b = group.config) == null ? void 0 : _b.errorsContainer);
        if (this.isTooltip()) this.tooltips.push(this.renderTooltip(group.groupElem, errorLabel, (_d = (_c = group.config) == null ? void 0 : _c.tooltip) == null ? void 0 : _d.position));
    }
    renderErrors(forceRevalidation = false) {
        if (!this.isSubmitted && !forceRevalidation && !this.globalConfig.validateBeforeSubmitting) return;
        this.clearErrors();
        this.isValid = true;
        for(const key in this.groupFields)this.renderGroupError(key);
        for(const key in this.fields)this.renderFieldError(key);
    }
    destroy() {
        this.eventListeners.forEach((event)=>{
            this.removeListener(event.type, event.elem, event.func);
        });
        Object.keys(this.customStyleTags).forEach((key)=>{
            this.customStyleTags[key].remove();
        });
        this.clearErrors();
        if (this.globalConfig.lockForm) this.unlockForm();
    }
    refresh() {
        this.destroy();
        if (!this.form) console.error("Cannot initialize the library! Form is not defined");
        else {
            this.initialize(this.form, this.globalConfig);
            Object.keys(this.fields).forEach((key)=>{
                const fieldSelector = this.getFieldSelectorByKey(key);
                if (fieldSelector) this.addField(fieldSelector, [
                    ...this.fields[key].rules
                ], this.fields[key].config);
            });
        }
    }
    setCurrentLocale(locale) {
        if (typeof locale !== "string" && locale !== void 0) {
            console.error("Current locale should be a string");
            return;
        }
        this.currentLocale = locale;
        if (this.isSubmitted) this.validate();
    }
    onSuccess(callback) {
        this.onSuccessCallback = callback;
        return this;
    }
    onFail(callback) {
        this.onFailCallback = callback;
        return this;
    }
    onValidate(callback) {
        this.onValidateCallback = callback;
        return this;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"05dYz":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _justValidate = require("just-validate");
var _justValidateDefault = parcelHelpers.interopDefault(_justValidate);
var _databaseUtilityJs = require("../databaseUtility.js");
var _helpers = require("../helpers");
var _modalView = require("./ModalView");
var _modalViewDefault = parcelHelpers.interopDefault(_modalView);
var _modelJs = require("../model.js");
class NewAptView extends (0, _modalViewDefault.default) {
    _form = document.querySelector('.newAppointmentForm');
    _formOverlay = document.querySelector('.form-overlay');
    _errorMessages = document.querySelectorAll('.error-message');
    _toggleFormButton = document.querySelector('.cta-btn');
    _submitButton = document.querySelector('.form-submit-btn');
    _cancelButton = document.querySelector('.form-cancel-btn');
    _spinnerDiv = document.querySelector('.form-spinner-div');
    _spinner = document.querySelector('.spinner');
    _validator;
    _addressInput = document.getElementById('streetAddress');
    _suggestionsContainer = document.getElementById('suggestions');
    _zipCodeEL = document.getElementById('zipCode');
    _currentQuery = '';
    _fullNameEl = document.getElementById('fullName');
    _id;
    _emailEl = document.getElementById('email');
    _streetAddressEl = document.getElementById('streetAddress');
    _zipCodeEl = document.getElementById('zipCode');
    _secondLineAddressEl = document.getElementById('secondLineAddress');
    _aptDateEl = document.getElementById('aptDate');
    _aptTimeslotEl = document.getElementById('aptTimeslot');
    _editingSessionFinished = null;
    constructor(){
        super('.newAppointmentForm', '.form-overlay', '.cta-btn', 'form-submit-btn'); // Pass selectors to parent class
        // Initialize validation and event listeners
        this._initValidation();
        this._initAddressSuggestions();
    }
    _handleCancel() {
        this._clear(); // Clear the form state
        localStorage.removeItem('pendingAppointment'); // Remove pending appointment data
        this._form.reset(); // Reset the form
        this.cancelSpinner(); // Hide spinner if displayed
        (0, _helpers.notyf).open({
            type: 'warning',
            message: 'Your appointment request was canceled'
        });
        this.handleToggleModal(); // Close modal window if needed
    }
    renderSpinner(message = '') {
        // Hide form elements while keeping them in the DOM
        this._form.querySelectorAll('h2, label, input, select, button').forEach((el)=>{
            el.style.display = 'none';
        });
        // Show the spinner
        this._spinnerDiv.style.display = 'flex';
        this._spinnerDiv.classList.remove('hidden');
        this._spinnerDiv.classList.add('visible');
        this._spinnerDiv.querySelector('p').textContent = message || 'Processing...';
        const spinnerCancelButton = this._spinnerDiv.querySelector('.spinner-cancel-btn');
        spinnerCancelButton?.addEventListener('click', ()=>this._handleCancel());
        // Show the spinner
        this._spinnerDiv.style.display = 'flex';
        // Add a delay to ensure the spinner is visible for at least 2 seconds
        setTimeout(()=>{
            this._form.querySelectorAll('h2, label, input, select, button, textarea, .form-fields').forEach((el)=>{
                el.style.display = 'block';
            });
        }, 2000);
    }
    cancelSpinner() {
        if (this._spinnerDiv) {
            this._spinnerDiv.style.display = 'none'; // Hide the spinner
            this._spinnerDiv.classList.add('hidden');
            this._spinnerDiv.classList.remove('visible');
        }
        // Restore visibility of form elements
        console.log(this._form.querySelectorAll('h2, label, input, select, button'));
    // .forEach(el => el.classList.remove('hidden'));
    }
    // Initialize validation rules once
    _initValidation() {
        this._validator = new (0, _justValidateDefault.default)(this._form, {
            errorLabelCssClass: 'error-message',
            tooltip: {
                position: 'top'
            },
            lockForm: true
        });
        this._validator.addField('#fullName', [
            {
                rule: 'required',
                errorMessage: 'Full Name is required'
            },
            {
                rule: 'minLength',
                value: 3,
                errorMessage: 'Full Name must be at least 3 characters'
            },
            {
                validator: (value)=>value.trim().split(' ').length >= 2,
                errorMessage: 'Full Name must contain at least two words'
            }
        ]).addField('#email', [
            {
                rule: 'required',
                errorMessage: 'Email is required'
            },
            {
                rule: 'email',
                errorMessage: 'Email format is incorrect'
            }
        ]).addField('#streetAddress', [
            {
                rule: 'required',
                errorMessage: 'Street Address is required'
            }
        ]).addField('#zipCode', [
            {
                rule: 'required',
                errorMessage: 'Zip Code is required'
            },
            {
                rule: 'number',
                errorMessage: 'Must be a 5 digit LA county Zip Code'
            },
            {
                rule: 'minLength',
                value: 5,
                errorMessage: 'Zip Code must be exactly 5 digits'
            },
            {
                rule: 'maxLength',
                value: 5,
                errorMessage: 'Zip Code must be exactly 5 digits'
            }
        ]).addField('#aptDate', [
            {
                rule: 'required',
                errorMessage: 'Appointment Date is required'
            },
            {
                validator: (value)=>new Date(value) >= new Date(),
                errorMessage: 'Please choose a future date'
            }
        ]).addField('#aptTimeslot', [
            {
                rule: 'required',
                errorMessage: '2h timeslot must be selected'
            }
        ]);
        return this._validator;
    }
    // Initialize address suggestion functionality
    _initAddressSuggestions() {
        const displaySuggestions = (matches)=>{
            this._suggestionsContainer.innerHTML = '';
            if (!matches.length) {
                const noMatch = document.createElement('div');
                noMatch.className = 'suggestion-item';
                noMatch.textContent = 'No matches found';
                this._suggestionsContainer.appendChild(noMatch);
                return;
            }
            matches.forEach((match)=>{
                const suggestionItem = document.createElement('div');
                suggestionItem.className = 'suggestion-item';
                suggestionItem.textContent = `${match.streetNumber || ''} ${match.streetDirection || ''} ${match.streetName} ${match.streetType || ''}, ${match.zipCode || ''}`.trim();
                suggestionItem.dataset.address = JSON.stringify(match);
                suggestionItem.addEventListener('click', ()=>{
                    const addressText = suggestionItem.textContent.trim();
                    const addressWithoutZip = addressText.replace(/\s*\d{5}(\s*\-\s*\d{4})?(\s*,\s*)?$/, '').trim();
                    this._addressInput.value = addressWithoutZip.replace(',', '');
                    this._suggestionsContainer.innerHTML = '';
                    this._suggestionsContainer.style.display = 'none';
                });
                this._suggestionsContainer.appendChild(suggestionItem);
            });
        };
        const handleAddressInput = async ()=>{
            const query = this._addressInput.value.trim();
            const zipCode = this._zipCodeEL.value.trim();
            if (query.length < 2) {
                this._suggestionsContainer.innerHTML = '';
                return;
            }
            if (query === this._currentQuery) return;
            this._currentQuery = query;
            this._suggestionsContainer.innerHTML = '<p>Loading suggestions...</p>';
            try {
                const matches = zipCode.length >= 5 ? await (0, _databaseUtilityJs.searchAddress)(zipCode, query) : await (0, _databaseUtilityJs.searchAddress)(query);
                displaySuggestions(matches);
            } catch (err) {
                console.error('Error fetching address suggestions:', err);
            }
        };
        this._addressInput.addEventListener('input', (0, _databaseUtilityJs.debounce)(handleAddressInput, 300));
        this._zipCodeEL.addEventListener('input', (0, _databaseUtilityJs.debounce)(handleAddressInput, 300));
        document.addEventListener('click', (event)=>{
            if (!this._suggestionsContainer.contains(event.target) && event.target !== this._addressInput) {
                this._suggestionsContainer.innerHTML = '';
                this._suggestionsContainer.style.display = 'none';
            }
        });
        this._addressInput.addEventListener('focus', ()=>{
            if (this._suggestionsContainer.innerHTML.trim()) this._suggestionsContainer.style.display = 'block';
        });
        this._suggestionsContainer.addEventListener('mousedown', (event)=>{
            event.preventDefault();
        });
        this._addressInput.addEventListener('blur', ()=>{
            setTimeout(()=>{
                this._suggestionsContainer.style.display = 'none';
            }, 200);
        });
    }
    _handleFailure() {
        const firstInvalidField = document.querySelector('.is-invalid');
        if (firstInvalidField) firstInvalidField.focus();
    }
    populateFormWithExistingData(appointment) {
        this._id = appointment.id; // save id in this._id
        this._form.classList.add('edit-session');
        this._submitButton.textContent = 'Save changes';
        this._submitButton.classList.add('edit-session');
        this._submitButton.classList.remove('form-submit-btn');
        this._submitButton.removeAttribute('type');
        const titleEl = this._form.querySelector('h2');
        titleEl.textContent = 'Editing Appointment... ';
        // Update the form input fields with the existing appointment data
        this._fullNameEl.value = appointment.fullName || '';
        this._emailEl.value = appointment.email || '';
        this._streetAddressEl.value = appointment.streetAddress || '';
        this._zipCodeEl.value = appointment.zipCode || '';
        this._secondLineAddressEl.value = appointment.secondLineAddress || '';
        this._aptDateEl.value = appointment.aptDate || '';
        this._aptTimeslotEl.value = appointment.aptTimeslot || '';
    }
    async _saveEditedAppointment() {
        const updatedAppointment = this.getFormData(true);
        // Update the appointment in the appointments array (find by ID or other identifier)
        const index = _modelJs.AppState.appointments.findIndex((appt)=>+appt.id === +updatedAppointment.id);
        console.log(index, 'index');
        if (index !== -1) {
            _modelJs.AppState.appointments[index] = updatedAppointment; // Update appointment
            (0, _helpers.notyf).success('Appointment successfully updated!');
        } else (0, _helpers.notyf).error('Appointment not found for updating!');
        // Resolve the editing session promise
        if (this._editingSessionFinished) this._editingSessionFinished(true); // Notify that editing is finished
        this._resetEditSession();
    }
    _resetEditSession() {
        // Reset after editing
        this.handleToggleModal();
        this._form.classList.remove('edit-session'); // Reset form to "create" mode
        this._submitButton.classList.remove('edit-session');
        this._submitButton.classList.add('form-submit-btn');
        this._submitButton.type = 'submit';
        this._submitButton.textContent = 'Create Appointment'; // Restore button text
    }
    async isEditingFinished() {
        return new Promise((resolve)=>{
            this._editingSessionFinished = resolve; // Store the resolve function to call it later when editing is finished
        });
    }
    async getUpdatedFormData() {
        // Check if the editing is finished
        const isFinished = await this.isEditingFinished();
        if (isFinished) // Retrieve and return the form data
        return this.getFormData(true); // or any other form data fetching logic
        return null; // Return null if editing is not finished
    }
    getFormData(isEditingSession) {
        if (isEditingSession) return {
            fullName: this._fullNameEl.value,
            id: this._id,
            secondLineAddress: this._secondLineAddressEl.value,
            aptDate: this._aptDateEl.value,
            aptTimeslot: this._aptTimeslotEl.value,
            zipCode: this._zipCodeEl.value,
            streetAddress: this._streetAddressEl.value,
            email: this._emailEl.value
        };
        else return {
            fullName: this._fullNameEl.value,
            id: Math.random().toString(36).substr(2, 9),
            email: this._emailEl.value,
            streetAddress: this._streetAddressEl.value,
            secondLineAddress: this._secondLineAddressEl.value,
            aptDate: this._aptDateEl.value,
            aptTimeslot: this._aptTimeslotEl.value,
            zipCode: this._zipCodeEl.value
        };
    }
}
exports.default = new NewAptView();

},{"just-validate":"gcCDD","../databaseUtility.js":"frWAm","../helpers":"hGI1E","./ModalView":"hpKCi","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","../model.js":"Y4A21"}],"fdtLx":[function(require,module,exports,__globalThis) {
class CustomerSlider {
    constructor(){
        this.slides = document.querySelectorAll('.slide');
        this.sliderBtnLeft = document.querySelector('.slider-btn-left');
        this.sliderBtnRight = document.querySelector('.slider-btn-right');
        this.dots = document.querySelector('.dots');
        this.currSlide = 0;
        this.maxSlide = this.slides.length - 1;
        this.minSlide = 0;
        this.init();
    }
    init() {
        this._setSlideTransforms();
        this._createDots();
        this._activateDot(this.currSlide);
        this._addEventListeners();
    }
    // Set initial slide transforms
    _setSlideTransforms() {
        this.slides.forEach((s, i)=>{
            s.style.transform = `translateX(${i * 100}%)`;
        });
    }
    // Go to a specific slide
    _goToSlide(goTo) {
        this.currSlide = goTo;
        this.slides.forEach((s, i)=>s.style.transform = `translateX(${(i - goTo) * 100}%)`);
    }
    // Show next slide
    _nextSlide() {
        if (this.currSlide === this.maxSlide) this._goToSlide(0);
        else {
            this.currSlide++;
            this._goToSlide(this.currSlide);
        }
        this._activateDot(this.currSlide);
    }
    // Show previous slide
    _prevSlide() {
        if (this.currSlide === 0) this._goToSlide(this.maxSlide);
        else {
            this.currSlide--;
            this._goToSlide(this.currSlide);
        }
        this._activateDot(this.currSlide);
    }
    // Create dots for slider navigation
    _createDots() {
        this.slides.forEach((_, i)=>{
            const html = `<button class="dot" data-slide="${i}"></button>`;
            this.dots.insertAdjacentHTML('beforeend', html);
        });
    }
    // Activate a specific dot
    _activateDot(slide) {
        document.querySelectorAll('.dot').forEach((dot)=>{
            dot.classList.remove('dot-active');
        });
        document.querySelector(`.dot[data-slide="${slide}"]`).classList.add('dot-active');
    }
    // Add event listeners
    _addEventListeners() {
        // Event listener for dot click
        this.dots.addEventListener('click', (e)=>{
            e.preventDefault();
            const clickedDot = e.target.closest('.dot');
            if (!clickedDot) return;
            const dotNumber = clickedDot.dataset.slide;
            this._goToSlide(dotNumber);
            this._activateDot(dotNumber);
        });
        // Event listeners for slider buttons
        this.sliderBtnRight.addEventListener('click', ()=>this._nextSlide());
        this.sliderBtnLeft.addEventListener('click', ()=>this._prevSlide());
        // Event listeners for keyboard arrows
        document.addEventListener('keydown', (e)=>{
            if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                e.preventDefault();
                if (e.key === 'ArrowRight') this._nextSlide();
                if (e.key === 'ArrowLeft') this._prevSlide();
                this._activateDot(this.currSlide);
            }
        });
    }
}
// Instantiate and initialize the slider
const slider = new CustomerSlider();

},{}],"9Ut8o":[function(require,module,exports,__globalThis) {
// AppointmentsView.js
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _helpers = require("../helpers");
var _newAptView = require("./newAptView");
var _newAptViewDefault = parcelHelpers.interopDefault(_newAptView);
class AppointmentsView {
    _tableBody;
    _appointmentsPerPage = 5;
    _currentPage = 1;
    _currentFilter = 'all';
    _paginationContainer;
    constructor(){
        this._tableBody = document.querySelector('#appointments-tbody');
        this._paginationContainer = document.querySelector('#pagination-controls');
        this.displayAppointments();
        this._addNavigationEventListeners();
    }
    _addNavigationEventListeners() {
        const filters = [
            {
                id: 'all-appointments',
                filter: 'all'
            },
            {
                id: 'todays-appointments',
                filter: 'today'
            },
            {
                id: 'next-7-days',
                filter: 'next7days'
            },
            {
                id: 'next-30-days',
                filter: 'next30days'
            }
        ];
        filters.forEach(({ id, filter })=>{
            document.getElementById(id).addEventListener('click', ()=>{
                // If the clicked filter is already active, do nothing
                if (this._currentFilter === filter) return;
                // Remove 'active' class from all elements
                filters.forEach(({ id })=>{
                    document.getElementById(id).classList.remove('active');
                });
                // Add 'active' class to the clicked element
                document.getElementById(id).classList.add('active');
                document.getElementById(id).blur();
                // Set the current filter and page, then display appointments
                this._currentFilter = filter;
                this._currentPage = 1; // Reset to page 1 when a new filter is selected
                this.displayAppointments(filter);
            });
        });
    }
    handleModifyButtonClick(appointmentId) {
        const appointment = this._getAppointmentsFromLocalStorage().find((appt)=>appt.id === appointmentId);
        if (appointment) this.renderEditForm(appointment); // Pass the appointment with the existing ID
    }
    renderEditForm(appointment) {
        // Open the modal
        (0, _newAptViewDefault.default).toggleVisibility(document.querySelector('.newAppointmentForm'), document.querySelector('.form-overlay'));
        (0, _newAptViewDefault.default).populateFormWithExistingData(appointment); // Populate the form with existing data
    }
    // Handle modal toggle
    handleToggleModal() {
        const formContainer = document.querySelector('.edit-form-container');
        if (formContainer) formContainer.remove();
    }
    generateMockAppointments() {
        const appointments = [];
        const names = [
            'John Doe',
            'Jane Smith',
            'Alice Johnson',
            'Bob Brown'
        ];
        const timeslots = [
            '7AM-9AM',
            '9AM-11AM',
            '11AM-1PM',
            '1PM-3PM',
            '3PM-5PM',
            '5PM-7PM'
        ];
        function getRandomDate() {
            const today = new Date();
            const randomizer = Math.random();
            let randomDate;
            if (randomizer < 0.3) // 30% chance for appointments today
            randomDate = new Date(today);
            else if (randomizer < 0.7) {
                // 40% chance for appointments in the next 7 days
                const daysAhead = Math.floor(Math.random() * 7) + 1;
                randomDate = new Date(today);
                randomDate.setDate(today.getDate() + daysAhead);
            } else {
                // 30% chance for appointments in the next 30 days
                const daysAhead = Math.floor(Math.random() * 30) + 8;
                randomDate = new Date(today);
                randomDate.setDate(today.getDate() + daysAhead);
            }
            const year = randomDate.getFullYear();
            const month = ('0' + (randomDate.getMonth() + 1)).slice(-2);
            const day = ('0' + randomDate.getDate()).slice(-2);
            return `${year}-${month}-${day}`;
        }
        function getRandomTimeslot() {
            const randomIndex = Math.floor(Math.random() * timeslots.length);
            return timeslots[randomIndex];
        }
        //  prettier-ignore
        const validZipCodes = [
            '90001',
            '90002',
            '90003',
            '90004',
            '90005',
            '90006',
            '90007',
            '90008',
            '90009',
            '90010',
            '90011',
            '90012',
            '90013',
            '90014',
            '90015',
            '90016',
            '90017',
            '90018',
            '90019',
            '90020',
            '90021',
            '90022',
            '90023',
            '90024',
            '90025',
            '90026',
            '90027',
            '90028',
            '90029',
            '90030',
            '90031',
            '90032',
            '90033',
            '90034',
            '90035',
            '90036',
            '90037',
            '90038',
            '90039',
            '90040'
        ];
        for(let i = 0; i < 66; i++){
            const appointment = {
                fullName: names[Math.floor(Math.random() * names.length)],
                id: Math.random().toString(),
                email: `user${i}@example.com`,
                streetAddress: `${Math.floor(Math.random() * 1000)} ${[
                    'S',
                    'W',
                    'E',
                    'N'
                ][Math.floor(Math.random() * 4)]} Bentley`,
                zipCode: validZipCodes[Math.floor(Math.random() * validZipCodes.length)],
                secondLineAddress: Math.floor(Math.random() * 200) + 1,
                aptDate: getRandomDate(),
                aptTimeslot: getRandomTimeslot(),
                status: 'confirmed'
            };
            appointments.push(appointment);
        }
        (0, _helpers.saveAppointmentsToLocalStorage)(appointments);
        this.displayAppointments();
        return appointments;
    }
    _filterAppointmentsForToday(appointments) {
        const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
        return appointments.filter((appt)=>appt.aptDate === today);
    }
    _filterAppointmentsNext7Days(appointments) {
        const today = new Date();
        const next7Days = new Date(today);
        next7Days.setDate(today.getDate() + 7);
        return appointments.filter((appt)=>{
            const appointmentDate = new Date(appt.aptDate);
            return appointmentDate >= today && appointmentDate <= next7Days;
        });
    }
    _filterAppointmentsNext30Days(appointments) {
        const today = new Date();
        const next30Days = new Date(today);
        next30Days.setDate(today.getDate() + 30);
        return appointments.filter((appt)=>{
            const appointmentDate = new Date(appt.aptDate);
            return appointmentDate >= today && appointmentDate <= next30Days;
        });
    }
    _renderPagination(totalNumAppointments) {
        const totalPages = Math.ceil(totalNumAppointments / this._appointmentsPerPage);
        this._paginationContainer.innerHTML = ''; // Clear existing pagination
        // Create the main container for pagination controls
        const paginationControls = document.createElement('div');
        paginationControls.classList.add('pagination-controls');
        paginationControls.style.display = 'flex';
        paginationControls.style.flexDirection = 'row';
        // Create Prev button
        const prevButton = document.createElement('button');
        prevButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#5d5a88" viewBox="0 0 256 256"><path d="M224,88v80a16,16,0,0,1-16,16H128v40a8,8,0,0,1-13.66,5.66l-96-96a8,8,0,0,1,0-11.32l96-96A8,8,0,0,1,128,32V72h80A16,16,0,0,1,224,88Z"></path></svg>';
        prevButton.classList.add('pagination-btn', 'pagination-prev');
        prevButton.disabled = this._currentPage === 1;
        prevButton.addEventListener('click', ()=>{
            if (this._currentPage > 1) {
                this._currentPage--;
                this.displayAppointments(this._currentFilter); // Pass current filter
            }
        });
        paginationControls.appendChild(prevButton);
        // Create Page buttons
        for(let i = 1; i <= totalPages; i++){
            const button = document.createElement('button');
            button.textContent = i;
            button.classList.add('pagination-button');
            if (i === this._currentPage) button.classList.add('active');
            button.addEventListener('click', ()=>{
                this._currentPage = i;
                this.displayAppointments(this._currentFilter); // Pass current filter
            });
            paginationControls.appendChild(button);
        }
        // Create Next button
        const nextButton = document.createElement('button');
        nextButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#5d5a88" viewBox="0 0 256 256"><path d="M237.66,133.66l-96,96A8,8,0,0,1,128,224V184H48a16,16,0,0,1-16-16V88A16,16,0,0,1,48,72h80V32a8,8,0,0,1,13.66-5.66l96,96A8,8,0,0,1,237.66,133.66Z"></path></svg>';
        nextButton.classList.add('pagination-btn', 'pagination-next');
        nextButton.disabled = this._currentPage === totalPages;
        nextButton.addEventListener('click', ()=>{
            if (this._currentPage < totalPages) {
                this._currentPage++;
                this.displayAppointments(this._currentFilter); // Pass current filter
            }
        });
        paginationControls.appendChild(nextButton);
        // Append the pagination buttons container to the main pagination container
        this._paginationContainer.appendChild(paginationControls);
        // Create the page info container
        const paginationInfoContainer = document.createElement('div');
        paginationInfoContainer.classList.add('pagination-info-container');
        // Calculate and display results info (e.g., "Showing 5/55 results")
        const startResult = (this._currentPage - 1) * this._appointmentsPerPage + 1;
        const endResult = Math.min(this._currentPage * this._appointmentsPerPage, totalNumAppointments);
        const paginationInfo = document.createElement('span');
        paginationInfo.classList.add('pagination-info');
        paginationInfo.style.backgroundColor = '#ff9000';
        paginationInfo.style.borderRadius = '20px';
        paginationInfo.style.fontWeight = '800';
        paginationInfo.style.padding = '0.5rem 3rem';
        paginationInfo.textContent = `Showing ${startResult}-${endResult} / ${totalNumAppointments} total results`;
        paginationInfoContainer.appendChild(paginationInfo);
        // Append the pagination info container to the main pagination container
        this._paginationContainer.prepend(paginationInfoContainer);
    }
    displayAppointments(filter = this._currentFilter) {
        let appointments = this._getAppointmentsFromLocalStorage();
        if (!appointments || Array.isArray(appointments) && appointments.length === 0) appointments = this.generateMockAppointments();
        // Apply the selected filter
        if (filter === 'today') appointments = this._filterAppointmentsForToday(appointments);
        else if (filter === 'next7days') appointments = this._filterAppointmentsNext7Days(appointments);
        else if (filter === 'next30days') appointments = this._filterAppointmentsNext30Days(appointments);
        // Calculate paginated results
        const start = (this._currentPage - 1) * this._appointmentsPerPage;
        const end = start + this._appointmentsPerPage;
        const paginatedAppointments = appointments.slice(start, end);
        // Check if there are appointments to display
        if (!appointments || appointments.length === 0) {
            this._tableBody.innerHTML = '<tr><td colspan="6">No appointments available</td></tr>';
            this._paginationContainer.style.display = 'none';
            return;
        }
        if (!paginatedAppointments || paginatedAppointments.length === 0) this._tableBody.innerHTML = '<tr><td colspan="6">No appointments available for this page</td></tr>';
        else {
            // Generate table rows
            const rows = paginatedAppointments.map((appt)=>`
        <tr>
          <td>${appt.fullName}</td>
          <td>${appt.streetAddress}</td>
          <td>${(0, _helpers.formatDate)(appt.aptDate, {
                    day: 'numeric',
                    month: 'short',
                    weekday: 'short'
                })}</td>
          <td>${appt.aptTimeslot}</td>
          <td>${appt.status || 'confirmed'}</td>
          <td>
<button class="action-button modify-button" data-tooltip="Modify" data-id="${appt.id}">
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#5d5a88" viewBox="0 0 256 256">
    <path d="M227.32,73.37,182.63,28.69a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31l83.67-83.66,3.48,13.9-36.8,36.79a8,8,0,0,0,11.31,11.32l40-40a8,8,0,0,0,2.11-7.6l-6.9-27.61L227.32,96A16,16,0,0,0,227.32,73.37ZM192,108.69,147.32,64l24-24L216,84.69Z"></path>
  </svg>
</button>
<button class="action-button cancel-button" data-tooltip="Cancel" data-id="${appt.id}">
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#5d5a88" viewBox="0 0 256 256"><path d="M224,56a8,8,0,0,1-8,8h-8V208a16,16,0,0,1-16,16H64a16,16,0,0,1-16-16V64H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,56ZM88,32h80a8,8,0,0,0,0-16H88a8,8,0,0,0,0,16Z"></path></svg>
  
</button>
          </td>
        </tr>
      `);
            this._tableBody.innerHTML = rows.join('');
        }
        // Render pagination if more than one page of results
        if (appointments.length > this._appointmentsPerPage) {
            this._paginationContainer.style.display = 'flex';
            this._renderPagination(appointments.length);
        } else this._paginationContainer.style.display = 'none';
    }
    _getAppointmentsFromLocalStorage() {
        const appointmentsJSON = localStorage.getItem('appointments');
        return appointmentsJSON ? JSON.parse(appointmentsJSON) : [];
    }
    addHandlerActionButton(handlerFunction) {
        this._tableBody.addEventListener('click', function(e) {
            const button = e.target.closest('.action-button');
            if (!button) return;
            const appointmentId = button.dataset.id;
            handlerFunction(button, appointmentId);
        });
    }
}
exports.default = new AppointmentsView();

},{"../helpers":"hGI1E","./newAptView":"05dYz","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["9q94c","aenu9"], "aenu9", "parcelRequire94c2")

//# sourceMappingURL=index.e37f48ea.js.map
