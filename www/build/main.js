webpackJsonp([2],{

/***/ 104:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_agent_auth_service__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_provider_enum__ = __webpack_require__(34);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};




/**
 * Generated class for the AuthPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AuthPage = /** @class */ (function () {
    function AuthPage(navCtrl, navParams, loadingCtrl, agentAuthService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.agentAuthService = agentAuthService;
        if (!this.agentAuthService.getIsAuthResInit()) {
            var loader_1 = this.presentLoading('loading');
            this.agentAuthService.authResInitEventSubscribe(function () {
                loader_1.dismiss();
            });
        }
    }
    AuthPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AuthPage');
    };
    AuthPage.prototype.gglSignIn = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.agentAuthService.setStrategy(__WEBPACK_IMPORTED_MODULE_3__models_provider_enum__["a" /* Provider */].GOOGLE_PROVIDER);
                        return [4 /*yield*/, this.agentAuthService.onSignIn()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_1 = _a.sent();
                        console.log(ex_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthPage.prototype.fbSignIn = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    AuthPage.prototype.ctSignIn = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.agentAuthService.setStrategy(__WEBPACK_IMPORTED_MODULE_3__models_provider_enum__["a" /* Provider */].CUSTOM_PROVIDER);
                        return [4 /*yield*/, this.agentAuthService.onSignIn()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_2 = _a.sent();
                        console.log(ex_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthPage.prototype.ctSignUp = function () {
        return __awaiter(this, void 0, void 0, function () {
            var params, ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.agentAuthService.setStrategy(__WEBPACK_IMPORTED_MODULE_3__models_provider_enum__["a" /* Provider */].CUSTOM_PROVIDER);
                        params = {};
                        return [4 /*yield*/, this.agentAuthService.onSignIn(params)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_3 = _a.sent();
                        console.log(ex_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthPage.prototype.presentLoading = function (text) {
        var loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            content: "<div><h3>" + text + "</h3></div>",
        });
        loading.present();
        return loading;
    };
    AuthPage.prototype.isUserSignIn = function () {
        return this.agentAuthService.isSignIn();
    };
    AuthPage.prototype.signOut = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.agentAuthService.onSignOut()];
                    case 1:
                        res = _a.sent();
                        console.log(res);
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        console.log(e_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-auth',template:/*ion-inline-start:"C:\Users\Ofir Genish\ionic projects\auth-system-project\src\pages\auth\auth.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>Auth</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n<ion-grid *ngIf="!isUserSignIn(); else signIn">\n<ion-row>\n  <ion-col> <h4>SignIn using social media</h4> </ion-col>\n</ion-row>\n\n<ion-row>\n  <ion-col><button ion-button (click)="gglSignIn()"> Google </button></ion-col>\n  <ion-col><button ion-button (click)="fbSignIn()"> Facebook </button></ion-col>  \n</ion-row>\n\n<ion-row>\n  <ion-col> <h4>SignIn or SignUp using email</h4> </ion-col>\n</ion-row>\n\n<ion-row>\n  <ion-col> <button ion-button (click)="ctSignIn()">SignIn</button> </ion-col>\n  <ion-col> <button ion-button>SignUp</button></ion-col>  \n</ion-row>\n\n</ion-grid>\n\n<ng-template #signIn>\n  <ion-grid>\n    <ion-row>\n      <ion-col>\n        <ion-title>\n          user sign in\n        </ion-title>\n      </ion-col>\n    </ion-row>\n    <ion-row>\n        <ion-col>\n          <button (click)="signOut()" ion-button>SignOut</button>\n        </ion-col>\n      </ion-row>\n  </ion-grid>\n</ng-template>\n</ion-content>\n'/*ion-inline-end:"C:\Users\Ofir Genish\ionic projects\auth-system-project\src\pages\auth\auth.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_0__services_agent_auth_service__["a" /* AgentAuthService */]])
    ], AuthPage);
    return AuthPage;
}());

//# sourceMappingURL=auth.js.map

/***/ }),

/***/ 105:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_agent_auth_service__ = __webpack_require__(81);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ProfilePage = /** @class */ (function () {
    function ProfilePage(navCtrl, navParams, agentAuth) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.agentAuth = agentAuth;
    }
    ProfilePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ProfilePage');
    };
    ProfilePage.prototype.isSignIn = function () {
        return this.agentAuth.isSignIn();
    };
    ProfilePage.prototype.getProfile = function () {
        if (this.agentAuth.isSignIn()) {
            return this.agentAuth.getProfile();
        }
    };
    ProfilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-profile',template:/*ion-inline-start:"C:\Users\Ofir Genish\ionic projects\auth-system-project\src\pages\profile\profile.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>Profile</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n  <ion-grid *ngIf="isSignIn(); else notSignIn">\n    <ion-row>\n      <ion-col>\n        <ion-title>Hello {{getProfile().userName}} !</ion-title>\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col>\n        <ion-list>\n          <ion-item>\n            First name : {{getProfile().personalData.firstName}}\n          </ion-item>\n          <ion-item>\n            Last name : {{getProfile().personalData.lastName}}\n          </ion-item>\n          <ion-item>\n            Email : {{getProfile().email}}\n          </ion-item>\n          <ion-item>\n            ID : {{getProfile().id}}\n          </ion-item>\n        </ion-list>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n  <ng-template #notSignIn>\n      <ion-grid>\n        <ion-row>\n          <ion-col>\n            <ion-title>No user sign in</ion-title>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </ng-template>\n\n</ion-content>'/*ion-inline-end:"C:\Users\Ofir Genish\ionic projects\auth-system-project\src\pages\profile\profile.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__services_agent_auth_service__["a" /* AgentAuthService */]])
    ], ProfilePage);
    return ProfilePage;
}());

//# sourceMappingURL=profile.js.map

/***/ }),

/***/ 117:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 117;

/***/ }),

/***/ 159:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/auth/auth.module": [
		410,
		1
	],
	"../pages/profile/profile.module": [
		411,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 159;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 160:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomAuthService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__user_api_user_api_service__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_provider_enum__ = __webpack_require__(34);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};





var CustomAuthService = /** @class */ (function () {
    function CustomAuthService(userApi) {
        this.userApi = userApi;
    }
    //#region - user actions / talk with server
    CustomAuthService.prototype.onSignIn = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var res, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.userApi.postSignInUser(__WEBPACK_IMPORTED_MODULE_4__models_provider_enum__["a" /* Provider */].CUSTOM_PROVIDER, params.data)];
                    case 1:
                        res = _a.sent();
                        console.log(res, res.body.data.tokenData);
                        this.setSession(res.body.data.tokenData);
                        this.udb = res.body.data.user;
                        return [2 /*return*/, this.udb];
                    case 2:
                        e_1 = _a.sent();
                        console.log(e_1);
                        throw e_1;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CustomAuthService.prototype.onSignOut = function () {
        return __awaiter(this, void 0, void 0, function () {
            var headers, res, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        headers = this.getAuthHeader();
                        // first token removeing from local storage than removing from the db, UX consideration
                        this.removeTokenFromLocal();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.userApi.deleteUserCurToken(headers)];
                    case 2:
                        res = _a.sent();
                        console.log(res);
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _a.sent();
                        console.log(e_2);
                        throw e_2;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    //#endregion
    CustomAuthService.prototype.isSignIn = function () {
        var tokenStatus = __WEBPACK_IMPORTED_MODULE_2_moment__().isBefore(this.getExpiration());
        if (!tokenStatus) {
            this.removeTokenFromLocal();
        }
        return tokenStatus;
    };
    CustomAuthService.prototype.getProfile = function () {
        return this.udb;
    };
    CustomAuthService.prototype.getProvider = function () {
        return __WEBPACK_IMPORTED_MODULE_4__models_provider_enum__["a" /* Provider */].CUSTOM_PROVIDER;
    };
    CustomAuthService.prototype.getAuthHeader = function () {
        return new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'x-auth': this.getToken(), 'x-provider': 'custom' });
    };
    //#region - private methods - token related 
    CustomAuthService.prototype.getToken = function () {
        return localStorage.getItem('token');
    };
    CustomAuthService.prototype.setSession = function (authResult) {
        var expiresAt = __WEBPACK_IMPORTED_MODULE_2_moment__["unix"](authResult.expDate);
        ;
        localStorage.setItem('token', authResult.token);
        localStorage.setItem("exp_date", JSON.stringify(expiresAt.valueOf()));
    };
    CustomAuthService.prototype.getExpiration = function () {
        var expiration = localStorage.getItem("exp_date");
        var expiresAt = JSON.parse(expiration);
        return __WEBPACK_IMPORTED_MODULE_2_moment__(expiresAt);
    };
    CustomAuthService.prototype.removeTokenFromLocal = function () {
        localStorage.removeItem("token");
        localStorage.removeItem("exp_date");
    };
    CustomAuthService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__user_api_user_api_service__["a" /* UserApiService */]])
    ], CustomAuthService);
    return CustomAuthService;
}());

//# sourceMappingURL=custom-auth.service.js.map

/***/ }),

/***/ 284:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export FB_APP_ID */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return GOOGLE_CLIENT_ID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return GOOGLE_API_KEY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SERVER_API_URL; });
var SERVER_API_URL = "https://frozen-depths-97143.herokuapp.com/";
var FACEBOOK_APP_ID = "193767451426342";
var GOOGLE_CLIENT_ID = "185191598431-iloo5lp0ne8jshgj5cblusuglr4bv2rt.apps.googleusercontent.com";
var GOOGLE_API_KEY = "AIzaSyAacSp1HggwNuJQvmW7WE374Gzs3-ETDjU";

//# sourceMappingURL=auth-data.js.map

/***/ }),

/***/ 285:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GoogleAuthService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__data_auth_data__ = __webpack_require__(284);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__user_api_user_api_service__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_provider_enum__ = __webpack_require__(34);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};



//



var EXTRA_SCOPES = "https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.me";
/**
 * << READ THIS >>
 * 1.   Using this service requires the api 'https://apis.google.com/js/platform.js' .
 *      Add this line <script src="https://apis.google.com/js/platform.js" async defer></script>
 *      to the index.html file .
 *
 * 2.   define the string 'CLIENT_ID' in an external json file, and import it to this service .
 *
 * doc :
 *  https://developers.google.com/identity/protocols/OAuth2UserAgent#example
 */
var GoogleAuthService = /** @class */ (function () {
    function GoogleAuthService(userApi) {
        var _this = this;
        this.userApi = userApi;
        this.isAuth2Init = false;
        this.auth2InitEvent = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
        this.delayedSignInOnLoadEvent = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
        /**
         * doc :
         *  https://developers.google.com/identity/protocols/OAuth2UserAgent#example
         *  https://developers.google.com/identity/protocols/OAuth2UserAgent#creatingclient
         */
        // prevent duplicate code
        var setAuthRes = function () {
            // listening to both client and auth2 objects.
            window['gapi'].load('client:auth2', function () {
                _this.auth2 = window['gapi'].auth2.init({
                    client_id: __WEBPACK_IMPORTED_MODULE_3__data_auth_data__["c" /* GGL_CLIENT_ID */],
                    fetch_basic_profile: true,
                    scope: "profile " + EXTRA_SCOPES
                });
                window['gapi'].client.init({
                    'apiKey': __WEBPACK_IMPORTED_MODULE_3__data_auth_data__["b" /* GGL_API_KEY */],
                    'clientId': __WEBPACK_IMPORTED_MODULE_3__data_auth_data__["c" /* GGL_CLIENT_ID */],
                    'scope': "https://www.googleapis.com/auth/drive.metadata.readonly  " + EXTRA_SCOPES,
                    'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest']
                });
                var authInstance = window['gapi'].auth2.getAuthInstance();
                authInstance.isSignedIn.listen(function () {
                    console.log('isSignedIn.listen');
                    _this.userApi.getUserData(_this.getAuthHeader());
                    _this.delayedSignInOnLoadEvent.next();
                });
                _this.isAuth2Init = true;
                _this.auth2InitEvent.next();
            });
        };
        // if the plugin has been loaded
        if (document.readyState === 'complete') {
            setAuthRes();
        }
        else {
            // if the plugin has not been loaded, listening to load event of window
            // and when it dispatched calling setAuth2()
            try {
                window.addEventListener('load', function (e) {
                    setAuthRes();
                });
            }
            catch (ex) {
                console.log(ex);
            }
        }
    }
    //#region :: public AuthService API mathods
    GoogleAuthService.prototype.onSignIn = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, tok, serverRes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.isAuth2Init && !this.auth2.isSignedIn.get())) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.auth2.signIn()];
                    case 1:
                        res = _a.sent();
                        console.log('User signed in.');
                        tok = res.Zi.id_token;
                        return [4 /*yield*/, this.userApi.postSignInUser(__WEBPACK_IMPORTED_MODULE_5__models_provider_enum__["a" /* Provider */].GOOGLE_PROVIDER, { idToken: tok })];
                    case 2:
                        serverRes = _a.sent();
                        // authenticate the server response. / validating the returned user id.
                        this.authenticateServerResponse(serverRes.body);
                        // saving the signed user data in the service.
                        this.udb = serverRes.body.data.user;
                        return [2 /*return*/, this.udb];
                    case 3: throw new Error('the user is sign in or the auth2 object is\'nt initialized');
                }
            });
        });
    };
    GoogleAuthService.prototype.onSignOut = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.isAuth2Init && this.auth2.isSignedIn.get())) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.auth2.signOut()];
                    case 1:
                        _a.sent(); // this method do have no return value
                        console.log('User signed out.');
                        return [4 /*yield*/, this.userApi.deleteUserCurToken(this.getAuthHeader())];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3: throw new Error('the user is\'nt sign in or the auth2 object is\'nt initialized');
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @returns true if the current user is currently signed in.
     * if the auth2 object is not initialized it will return false.
     */
    GoogleAuthService.prototype.isSignIn = function () {
        if (this.isAuth2Init) {
            return this.auth2.isSignedIn.get();
        }
        else {
            return false;
        }
    };
    GoogleAuthService.prototype.getProfile = function () {
        if (this.isAuth2Init && this.auth2.isSignedIn.get()) {
            return this.udb;
        }
        else {
            console.log('the user is\'nt sign in');
        }
    };
    GoogleAuthService.prototype.getProvider = function () {
        return __WEBPACK_IMPORTED_MODULE_5__models_provider_enum__["a" /* Provider */].GOOGLE_PROVIDER;
    };
    GoogleAuthService.prototype.getAuthHeader = function () {
        var tok = this.getUserAuthData().id_token;
        return new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["c" /* HttpHeaders */]({ 'x-auth': tok, 'x-provider': 'google' });
    };
    //#endregion 
    //#region :: public resource initialized methods
    /** @description subscribe to auth resource done initializing event.
     * @param {function=} callback Optional callback.
     * @returns {Subscription} subscription object from this event subscribing.
     */
    GoogleAuthService.prototype.authResInitEventSubscribe = function (callback) {
        return this.auth2InitEvent.subscribe(callback);
    };
    /** @description subscribe to delayed signIn event.
     *          when the user is allready signed in when the app load.
     * @param {function=} callback Optional callback.
     * @returns {Subscription} subscription object from this event subscribing.
     */
    GoogleAuthService.prototype.delayedSignInOnLoadEventSubscribe = function (callback) {
        return this.delayedSignInOnLoadEvent.subscribe(callback);
    };
    /**
     * @returns true if the auth2 object is initialized.
     */
    GoogleAuthService.prototype.isAuthResourceInit = function () {
        return this.isAuth2Init;
    };
    //#endregion 
    //#region :: private methods
    GoogleAuthService.prototype.getUserAuthData = function () {
        // doc : https://developers.google.com/identity/sign-in/web/reference#googleauthcurrentuserget
        if (this.auth2.isSignedIn.get()) {
            var curUser = this.auth2.currentUser.get();
            var userAuthData = curUser.Zi;
            return userAuthData;
        }
        else {
            console.log('the user is\'nt sign in');
        }
    };
    GoogleAuthService.prototype.authenticateServerResponse = function (res) {
        var authValue = res.data.authValue;
        var authuid = this.auth2.currentUser.get().getBasicProfile().getId();
        return authValue === authuid;
    };
    GoogleAuthService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__user_api_user_api_service__["a" /* UserApiService */]])
    ], GoogleAuthService);
    return GoogleAuthService;
}());

//# sourceMappingURL=google-auth.service.js.map

/***/ }),

/***/ 286:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FacebookAuthService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__user_api_user_api_service__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_provider_enum__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};




var FB_APP_ID = ''; //"193767451426342";
var FacebookAuthService = /** @class */ (function () {
    function FacebookAuthService(userApi) {
        this.userApi = userApi;
        this.fbAuthInitEvent = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__["Subject"]();
        this.isfbAuthInit = false;
        this.facebookAuthInit();
    }
    //#region :: public AuthService API mathods
    FacebookAuthService.prototype.onSignIn = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, serverRes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fbAuth.login(undefined, { scope: 'public_profile,email' })];
                    case 1:
                        res = _a.sent();
                        console.log(res);
                        if (!(res != undefined && res.status === 'connected')) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.userApi.postSignInUser(__WEBPACK_IMPORTED_MODULE_2__models_provider_enum__["a" /* Provider */].FACEBOOK_PROVIDER, { idToken: '' })];
                    case 2:
                        serverRes = _a.sent();
                        this.udb = serverRes.body.data.user;
                        return [2 /*return*/, this.udb];
                    case 3:
                        console.log('The person is not logged into this app or we are unable to tell.');
                        _a.label = 4;
                    case 4: return [2 /*return*/, null];
                }
            });
        });
    };
    ;
    FacebookAuthService.prototype.onSignOut = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fbAuth.logout()];
                    case 1:
                        res = _a.sent();
                        this.udb = undefined;
                        console.log(res);
                        return [2 /*return*/];
                }
            });
        });
    };
    FacebookAuthService.prototype.isSignIn = function () {
        /**
         * doc :
         *  https://developers.facebook.com/docs/reference/javascript/FB.getAuthResponse/
         */
        if (this.fbAuth == undefined) {
            return false;
        }
        else {
            var res = this.fbAuth.getAuthResponse();
            if (res == null || res == undefined) {
                return false;
            }
        }
    };
    FacebookAuthService.prototype.getProfile = function () {
        return this.udb;
    };
    FacebookAuthService.prototype.getProvider = function () {
        return __WEBPACK_IMPORTED_MODULE_2__models_provider_enum__["a" /* Provider */].FACEBOOK_PROVIDER;
    };
    FacebookAuthService.prototype.getAuthHeader = function () {
        // return x-provider and x-auth
        return null;
    };
    //#endregion
    //#region :: public resource initialized methods
    /** @description subscribe to auth resource done initializing event.
     * @param {function=} callback Optional callback.
     * @returns {Subscription} subscription object from this event subscribing.
     */
    FacebookAuthService.prototype.authResInitEventSubscribe = function (callback) {
        return this.fbAuthInitEvent.subscribe(callback);
    };
    /**
     * @returns true if the auth2 object is initialized.
     */
    FacebookAuthService.prototype.isAuthResourceInit = function () {
        return this.isfbAuthInit;
    };
    //#endregion ***
    //#region :: private methods
    FacebookAuthService.prototype.facebookAuthInit = function () {
        var _this = this;
        /**
         * doc :
         *  https://developers.facebook.com/docs/javascript/quickstart
         */
        window['fbAsyncInit'] = function () {
            window['FB'].init({
                appId: FB_APP_ID,
                autoLogAppEvents: true,
                xfbml: true,
                version: 'v2.12',
                status: true
            });
            _this.fbAuth = window['FB'];
            // 
            _this.isfbAuthInit = true;
            _this.fbAuthInitEvent.next();
            /*
            if (this.isSignIn()) {
                this.setProfileData();
            }
            */
        };
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    };
    FacebookAuthService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__user_api_user_api_service__["a" /* UserApiService */]])
    ], FacebookAuthService);
    return FacebookAuthService;
}());

//# sourceMappingURL=facebook-auth.service.js.map

/***/ }),

/***/ 330:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__auth_auth__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__profile_profile__ = __webpack_require__(105);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TabsPage = /** @class */ (function () {
    function TabsPage() {
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_1__auth_auth__["a" /* AuthPage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_2__profile_profile__["a" /* ProfilePage */];
    }
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\Ofir Genish\ionic projects\auth-system-project\src\pages\tabs\tabs.html"*/'<ion-tabs>\n  <ion-tab [root]="tab1Root" tabTitle="Auth"></ion-tab>\n  <ion-tab [root]="tab2Root" tabTitle="Profile"></ion-tab>\n</ion-tabs>\n'/*ion-inline-end:"C:\Users\Ofir Genish\ionic projects\auth-system-project\src\pages\tabs\tabs.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 331:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(332);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(352);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 34:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Provider; });
var Provider;
(function (Provider) {
    Provider[Provider["CUSTOM_PROVIDER"] = 0] = "CUSTOM_PROVIDER";
    Provider[Provider["GOOGLE_PROVIDER"] = 1] = "GOOGLE_PROVIDER";
    Provider[Provider["FACEBOOK_PROVIDER"] = 2] = "FACEBOOK_PROVIDER";
})(Provider || (Provider = {}));
//# sourceMappingURL=provider.enum.js.map

/***/ }),

/***/ 352:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(326);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__ = __webpack_require__(329);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(409);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_auth_auth__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_profile_profile__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_tabs_tabs__ = __webpack_require__(330);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_user_api_user_api_service__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__services_google_auth_google_auth_service__ = __webpack_require__(285);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__services_facebook_auth_facebook_auth_service__ = __webpack_require__(286);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__services_custom_auth_custom_auth_service__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__services_agent_auth_service__ = __webpack_require__(81);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};















var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_auth_auth__["a" /* AuthPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_profile_profile__["a" /* ProfilePage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_tabs_tabs__["a" /* TabsPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/auth/auth.module#AuthPageModule', name: 'AuthPage', segment: 'auth', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/profile/profile.module#ProfilePageModule', name: 'ProfilePage', segment: 'profile', priority: 'low', defaultHistory: [] }
                    ]
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["a" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_auth_auth__["a" /* AuthPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_profile_profile__["a" /* ProfilePage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_tabs_tabs__["a" /* TabsPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_11__services_google_auth_google_auth_service__["a" /* GoogleAuthService */],
                __WEBPACK_IMPORTED_MODULE_12__services_facebook_auth_facebook_auth_service__["a" /* FacebookAuthService */],
                __WEBPACK_IMPORTED_MODULE_10__services_user_api_user_api_service__["a" /* UserApiService */],
                __WEBPACK_IMPORTED_MODULE_13__services_custom_auth_custom_auth_service__["a" /* CustomAuthService */],
                __WEBPACK_IMPORTED_MODULE_14__services_agent_auth_service__["a" /* AgentAuthService */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 383:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 161,
	"./af.js": 161,
	"./ar": 162,
	"./ar-dz": 163,
	"./ar-dz.js": 163,
	"./ar-kw": 164,
	"./ar-kw.js": 164,
	"./ar-ly": 165,
	"./ar-ly.js": 165,
	"./ar-ma": 166,
	"./ar-ma.js": 166,
	"./ar-sa": 167,
	"./ar-sa.js": 167,
	"./ar-tn": 168,
	"./ar-tn.js": 168,
	"./ar.js": 162,
	"./az": 169,
	"./az.js": 169,
	"./be": 170,
	"./be.js": 170,
	"./bg": 171,
	"./bg.js": 171,
	"./bm": 172,
	"./bm.js": 172,
	"./bn": 173,
	"./bn.js": 173,
	"./bo": 174,
	"./bo.js": 174,
	"./br": 175,
	"./br.js": 175,
	"./bs": 176,
	"./bs.js": 176,
	"./ca": 177,
	"./ca.js": 177,
	"./cs": 178,
	"./cs.js": 178,
	"./cv": 179,
	"./cv.js": 179,
	"./cy": 180,
	"./cy.js": 180,
	"./da": 181,
	"./da.js": 181,
	"./de": 182,
	"./de-at": 183,
	"./de-at.js": 183,
	"./de-ch": 184,
	"./de-ch.js": 184,
	"./de.js": 182,
	"./dv": 185,
	"./dv.js": 185,
	"./el": 186,
	"./el.js": 186,
	"./en-au": 187,
	"./en-au.js": 187,
	"./en-ca": 188,
	"./en-ca.js": 188,
	"./en-gb": 189,
	"./en-gb.js": 189,
	"./en-ie": 190,
	"./en-ie.js": 190,
	"./en-il": 191,
	"./en-il.js": 191,
	"./en-nz": 192,
	"./en-nz.js": 192,
	"./eo": 193,
	"./eo.js": 193,
	"./es": 194,
	"./es-do": 195,
	"./es-do.js": 195,
	"./es-us": 196,
	"./es-us.js": 196,
	"./es.js": 194,
	"./et": 197,
	"./et.js": 197,
	"./eu": 198,
	"./eu.js": 198,
	"./fa": 199,
	"./fa.js": 199,
	"./fi": 200,
	"./fi.js": 200,
	"./fo": 201,
	"./fo.js": 201,
	"./fr": 202,
	"./fr-ca": 203,
	"./fr-ca.js": 203,
	"./fr-ch": 204,
	"./fr-ch.js": 204,
	"./fr.js": 202,
	"./fy": 205,
	"./fy.js": 205,
	"./gd": 206,
	"./gd.js": 206,
	"./gl": 207,
	"./gl.js": 207,
	"./gom-latn": 208,
	"./gom-latn.js": 208,
	"./gu": 209,
	"./gu.js": 209,
	"./he": 210,
	"./he.js": 210,
	"./hi": 211,
	"./hi.js": 211,
	"./hr": 212,
	"./hr.js": 212,
	"./hu": 213,
	"./hu.js": 213,
	"./hy-am": 214,
	"./hy-am.js": 214,
	"./id": 215,
	"./id.js": 215,
	"./is": 216,
	"./is.js": 216,
	"./it": 217,
	"./it.js": 217,
	"./ja": 218,
	"./ja.js": 218,
	"./jv": 219,
	"./jv.js": 219,
	"./ka": 220,
	"./ka.js": 220,
	"./kk": 221,
	"./kk.js": 221,
	"./km": 222,
	"./km.js": 222,
	"./kn": 223,
	"./kn.js": 223,
	"./ko": 224,
	"./ko.js": 224,
	"./ky": 225,
	"./ky.js": 225,
	"./lb": 226,
	"./lb.js": 226,
	"./lo": 227,
	"./lo.js": 227,
	"./lt": 228,
	"./lt.js": 228,
	"./lv": 229,
	"./lv.js": 229,
	"./me": 230,
	"./me.js": 230,
	"./mi": 231,
	"./mi.js": 231,
	"./mk": 232,
	"./mk.js": 232,
	"./ml": 233,
	"./ml.js": 233,
	"./mn": 234,
	"./mn.js": 234,
	"./mr": 235,
	"./mr.js": 235,
	"./ms": 236,
	"./ms-my": 237,
	"./ms-my.js": 237,
	"./ms.js": 236,
	"./mt": 238,
	"./mt.js": 238,
	"./my": 239,
	"./my.js": 239,
	"./nb": 240,
	"./nb.js": 240,
	"./ne": 241,
	"./ne.js": 241,
	"./nl": 242,
	"./nl-be": 243,
	"./nl-be.js": 243,
	"./nl.js": 242,
	"./nn": 244,
	"./nn.js": 244,
	"./pa-in": 245,
	"./pa-in.js": 245,
	"./pl": 246,
	"./pl.js": 246,
	"./pt": 247,
	"./pt-br": 248,
	"./pt-br.js": 248,
	"./pt.js": 247,
	"./ro": 249,
	"./ro.js": 249,
	"./ru": 250,
	"./ru.js": 250,
	"./sd": 251,
	"./sd.js": 251,
	"./se": 252,
	"./se.js": 252,
	"./si": 253,
	"./si.js": 253,
	"./sk": 254,
	"./sk.js": 254,
	"./sl": 255,
	"./sl.js": 255,
	"./sq": 256,
	"./sq.js": 256,
	"./sr": 257,
	"./sr-cyrl": 258,
	"./sr-cyrl.js": 258,
	"./sr.js": 257,
	"./ss": 259,
	"./ss.js": 259,
	"./sv": 260,
	"./sv.js": 260,
	"./sw": 261,
	"./sw.js": 261,
	"./ta": 262,
	"./ta.js": 262,
	"./te": 263,
	"./te.js": 263,
	"./tet": 264,
	"./tet.js": 264,
	"./tg": 265,
	"./tg.js": 265,
	"./th": 266,
	"./th.js": 266,
	"./tl-ph": 267,
	"./tl-ph.js": 267,
	"./tlh": 268,
	"./tlh.js": 268,
	"./tr": 269,
	"./tr.js": 269,
	"./tzl": 270,
	"./tzl.js": 270,
	"./tzm": 271,
	"./tzm-latn": 272,
	"./tzm-latn.js": 272,
	"./tzm.js": 271,
	"./ug-cn": 273,
	"./ug-cn.js": 273,
	"./uk": 274,
	"./uk.js": 274,
	"./ur": 275,
	"./ur.js": 275,
	"./uz": 276,
	"./uz-latn": 277,
	"./uz-latn.js": 277,
	"./uz.js": 276,
	"./vi": 278,
	"./vi.js": 278,
	"./x-pseudo": 279,
	"./x-pseudo.js": 279,
	"./yo": 280,
	"./yo.js": 280,
	"./zh-cn": 281,
	"./zh-cn.js": 281,
	"./zh-hk": 282,
	"./zh-hk.js": 282,
	"./zh-tw": 283,
	"./zh-tw.js": 283
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 383;

/***/ }),

/***/ 409:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(326);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(329);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__ = __webpack_require__(330);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__["a" /* TabsPage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\Ofir Genish\ionic projects\auth-system-project\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"C:\Users\Ofir Genish\ionic projects\auth-system-project\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 42:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserApiService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data_auth_data__ = __webpack_require__(284);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_provider_enum__ = __webpack_require__(34);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};




var UserApiService = /** @class */ (function () {
    function UserApiService(httpClient) {
        this.httpClient = httpClient;
        this.curSubRoute = 'users/';
    }
    UserApiService.prototype.postSignInUser = function (provider, requestBody) {
        return __awaiter(this, void 0, void 0, function () {
            var queryUrl, res, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("postSignUpUser(" + provider + ", " + requestBody + ")");
                        queryUrl = __WEBPACK_IMPORTED_MODULE_2__data_auth_data__["a" /* API_URL */] + this.curSubRoute + this.getRouteByProvider(provider);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.httpClient.post(queryUrl, requestBody, { observe: 'response' }).toPromise()];
                    case 2:
                        res = _a.sent();
                        console.log(res);
                        return [2 /*return*/, res];
                    case 3:
                        e_1 = _a.sent();
                        throw e_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // had a problom parsing the body of the request as a json , so
    // removing. in the option of the request, the observe, and adding responseType: 'text' fix it.
    UserApiService.prototype.deleteUserCurToken = function (headers) {
        return __awaiter(this, void 0, void 0, function () {
            var queryUrl, res, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("deleteUserCurToken(" + headers + ")");
                        queryUrl = __WEBPACK_IMPORTED_MODULE_2__data_auth_data__["a" /* API_URL */] + this.curSubRoute + 'me/' + 'token/';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.httpClient.request('DELETE', queryUrl, { headers: headers, responseType: 'text' }).toPromise()];
                    case 2:
                        res = _a.sent();
                        console.log(res);
                        return [2 /*return*/, res];
                    case 3:
                        e_2 = _a.sent();
                        throw e_2;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserApiService.prototype.getUserData = function (headers) {
        return __awaiter(this, void 0, void 0, function () {
            var queryUrl, res, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("getUserData(" + headers + ")");
                        queryUrl = __WEBPACK_IMPORTED_MODULE_2__data_auth_data__["a" /* API_URL */] + this.curSubRoute + 'me/';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.httpClient.get(queryUrl, { headers: headers, observe: 'response' }).toPromise()];
                    case 2:
                        res = _a.sent();
                        console.log(res);
                        return [2 /*return*/, res];
                    case 3:
                        e_3 = _a.sent();
                        throw e_3;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserApiService.prototype.postUserData = function (headers, requestBody) {
        return __awaiter(this, void 0, void 0, function () {
            var queryUrl, res, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("postUserData(" + headers + ", " + requestBody + ")");
                        queryUrl = __WEBPACK_IMPORTED_MODULE_2__data_auth_data__["a" /* API_URL */] + this.curSubRoute + 'data/';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.httpClient.post(queryUrl, requestBody, { headers: headers, responseType: 'text' }).toPromise()];
                    case 2:
                        res = _a.sent();
                        console.log(res);
                        return [2 /*return*/, res];
                    case 3:
                        e_4 = _a.sent();
                        throw e_4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserApiService.prototype.getRouteByProvider = function (provider) {
        switch (provider) {
            case __WEBPACK_IMPORTED_MODULE_3__models_provider_enum__["a" /* Provider */].CUSTOM_PROVIDER:
                return 'c/';
            case __WEBPACK_IMPORTED_MODULE_3__models_provider_enum__["a" /* Provider */].GOOGLE_PROVIDER:
                return 'g/';
            case __WEBPACK_IMPORTED_MODULE_3__models_provider_enum__["a" /* Provider */].FACEBOOK_PROVIDER:
                return 'f/';
            default:
                return '';
        }
    };
    UserApiService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]])
    ], UserApiService);
    return UserApiService;
}());

//# sourceMappingURL=user-api.service.js.map

/***/ }),

/***/ 81:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AgentAuthService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__custom_auth_custom_auth_service__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__google_auth_google_auth_service__ = __webpack_require__(285);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__facebook_auth_facebook_auth_service__ = __webpack_require__(286);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__user_api_user_api_service__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_provider_enum__ = __webpack_require__(34);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};







var AgentAuthService = /** @class */ (function () {
    function AgentAuthService(custom, google, facebook, userApi) {
        var _this = this;
        this.custom = custom;
        this.google = google;
        this.facebook = facebook;
        this.userApi = userApi;
        // event, dispatch when all auth related resources are loaded,
        // when google and facebook plugin is loaded.  
        this.authResInitEvent = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
        this.userStatusChangeEvent = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
        // flag, set to true when all auth related resources are loaded.
        this.isAuthResInit = false;
        var g_init = false;
        var f_init = false;
        /*
        let c_init = false;
        */
        this.google.authResInitEventSubscribe(function () {
            g_init = true;
            _this.chackIsAuthResInit(g_init, f_init, true);
        });
        this.facebook.authResInitEventSubscribe(function () {
            f_init = true;
            _this.chackIsAuthResInit(g_init, f_init, true);
        });
        this.google.delayedSignInOnLoadEventSubscribe(function () {
            _this.userStatusChangeEvent.next();
            _this.setStrategy(__WEBPACK_IMPORTED_MODULE_6__models_provider_enum__["a" /* Provider */].GOOGLE_PROVIDER);
        });
    }
    //#region - user actions / talk with server
    AgentAuthService.prototype.onSignIn = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.authService == undefined)) return [3 /*break*/, 1];
                        throw new Error('Auth service is not initialized');
                    case 1: return [4 /*yield*/, this.authService.onSignIn(params)];
                    case 2:
                        res = _a.sent();
                        this.userStatusChangeEvent.next();
                        return [2 /*return*/, res];
                }
            });
        });
    };
    AgentAuthService.prototype.onSignOut = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.authService == undefined)) return [3 /*break*/, 1];
                        throw new Error('Auth service is not initialized');
                    case 1: return [4 /*yield*/, this.authService.onSignOut()];
                    case 2:
                        res = _a.sent();
                        this.userStatusChangeEvent.next();
                        return [2 /*return*/, res];
                }
            });
        });
    };
    AgentAuthService.prototype.onUpdateUserData = function (userData) {
        return __awaiter(this, void 0, void 0, function () {
            var headers, body, res, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        headers = this.authService.getAuthHeader();
                        body = { data: userData };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.userApi.postUserData(headers, body)];
                    case 2:
                        res = _a.sent();
                        console.log(res);
                        return [2 /*return*/, res];
                    case 3:
                        e_1 = _a.sent();
                        console.log(e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    //#endregion
    //#region - cur signed session data getters and setters
    AgentAuthService.prototype.isSignIn = function () {
        if (this.authService == undefined) {
            return false;
        }
        else {
            return this.authService.isSignIn();
        }
    };
    AgentAuthService.prototype.setStrategy = function (authProvider) {
        switch (authProvider) {
            case __WEBPACK_IMPORTED_MODULE_6__models_provider_enum__["a" /* Provider */].CUSTOM_PROVIDER:
                this.authService = this.custom;
                break;
            case __WEBPACK_IMPORTED_MODULE_6__models_provider_enum__["a" /* Provider */].GOOGLE_PROVIDER:
                this.authService = this.google;
                break;
            case __WEBPACK_IMPORTED_MODULE_6__models_provider_enum__["a" /* Provider */].FACEBOOK_PROVIDER:
                /*this.authService = this.facebook;*/
                break;
            default:
                break;
        }
    };
    AgentAuthService.prototype.getProfile = function () {
        if (this.authService != undefined) {
            return this.authService.getProfile();
        }
    };
    AgentAuthService.prototype.getProvider = function () {
        return this.authService ? this.authService.getProvider() : undefined;
    };
    //#endregion
    //#region - auth resourse releted methods and events subscribing
    AgentAuthService.prototype.getIsAuthResInit = function () {
        return this.isAuthResInit;
    };
    AgentAuthService.prototype.authResInitEventSubscribe = function (callback) {
        return this.authResInitEvent.subscribe(callback);
    };
    AgentAuthService.prototype.userStatusChangeEventSubscribe = function (callback) {
        return this.userStatusChangeEvent.subscribe(callback);
    };
    //#endregion
    //#region - private methods
    AgentAuthService.prototype.chackIsAuthResInit = function (g, f, c) {
        if (g && f && c) {
            this.isUserSignInOnLoad();
            this.isAuthResInit = true;
            this.authResInitEvent.next();
        }
    };
    AgentAuthService.prototype.isUserSignInOnLoad = function () {
        this.authService = [this.google, /*this.facebook,*/ this.custom]
            .find(function (auth) {
            var res = auth.isSignIn();
            return res;
        });
    };
    AgentAuthService.prototype.cleanAllSignInProviders = function () {
        var _this = this;
        var authProviders = this.getAuthProvidersArray();
        authProviders.forEach(function (auth) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!auth.isSignIn()) return [3 /*break*/, 2];
                        return [4 /*yield*/, auth.onSignOut()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); });
    };
    AgentAuthService.prototype.getAuthProvidersArray = function () {
        return [this.custom, this.google, this.facebook];
    };
    AgentAuthService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__custom_auth_custom_auth_service__["a" /* CustomAuthService */], __WEBPACK_IMPORTED_MODULE_3__google_auth_google_auth_service__["a" /* GoogleAuthService */], __WEBPACK_IMPORTED_MODULE_4__facebook_auth_facebook_auth_service__["a" /* FacebookAuthService */], __WEBPACK_IMPORTED_MODULE_5__user_api_user_api_service__["a" /* UserApiService */]])
    ], AgentAuthService);
    return AgentAuthService;
}());

//# sourceMappingURL=agent-auth.service.js.map

/***/ })

},[331]);
//# sourceMappingURL=main.js.map