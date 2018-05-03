Array.prototype.del = function(e) {
	e.sort();
	var t = this.concat([]);
	for (var n = e.length - 1; n >= 0; n--) t = t.slice(0, e[n]).concat(t.slice(e[n] + 1));
	return t
};
try {
	HTMLImageElement.prototype.loadOnce = function(e) {
		var t = 0;
		this.onload = function() {
			t || e.call(this, null), t++
		}
	}
} catch (e) {
	window = {}
}(function(e) {
	function r() {
		this.readyState && (this.readyState = 0, this.dorsyWorker.startWorker())
	}
	var t = function() {
			if (window.navigator) {
				var e = window.navigator.userAgent;
				return /Android|android/.test(e) ? "android" : /iPhone|iPad|iPod/.test(e) ? "ios" : "other"
			}
			return "sandBox"
		}(),
		n = {
			lib: [],
			definedPs: {},
			init: function() {
				this.require("config")
			},
			module: function(e, t) {
				function s(e) {
					r++;
					var o = n[r];
					if (r == n.length - 1) {
						e[o] = t.call(null, i);
						return
					}
					e[o] ? s(e[o]) : s(e[o] = {})
				}
				var n = [e];
				/\./g.test(e) && (n = e.split("."));
				var r = -1,
					i = this;
				s(this.lib)
			},
			require: function(e) {
				var t = this,
					n = document.createElement("script");
				document.body.appendChild(n), n.src = "./js/module/" + e + ".js", n.onload = n.onerror = function(e) {
					t.handlerror(e)
				}
			},
			handlerror: function(e) {},
			destroySelf: function(t) {
				delete window[e];
				var n = new Error(t);
				throw n
			},
			reflect: function(e, t, n) {
				var r = this.lib.config.getModuleName(e),
					i = r.spaceName,
					s = r.actName;
				switch (i) {
				case "Filter":
				case "Alteration":
					return this.lib[i][s].process(t, n);
				case "ComEffect":
					return this.lib[s].process(t, n);
				default:
					this.destroySelf("AI_ERROR: ")
				}
			},
			reflectEasy: function(e) {
				var t = this.lib.config.getEasyFun(e).actName;
				return this.definedPs[e] || this.lib.easy.getFun(t)
			},
			add: function(e, t, n, r, i, s, o, u) {
				return this.lib.addLayer.add(e, t, n, r, i, s, o, u)
			},
			worker: function(e, t) {},
			applyMatrix: function(e, t) {},
			tools: function(e, t) {
				var n = Array.prototype.shift.call(t);
				if (this.lib.Tools[n]) return this.lib.Tools[n].process(e, t);
				throw new Error("AI_ERROR: \u4e0d\u5b58\u5728\u7684\u5de5\u5177\u65b9\u6cd5_" + n)
			},
			definePs: function(e, t) {
				this.definedPs[e] = t
			}
		};
	window[e] = function(r, i, s) {
		var o = this;
		if (!(this instanceof window[e])) return new window[e](r, i, s);
		this.startTime = +(new Date);
		var u = document.createElement("canvas"),
			a = u.getContext("2d");
		if (!isNaN(r)) u.width = r, u.height = i, s = s || "#fff", a.fillStyle = s, a.fillRect(0, 0, r, i), this.srcImg = "";
		else if (typeof r == "string") {
			var f = new Image;
			f.onload = function() {
				u.width = parseInt(this.width), u.height = parseInt(this.height), a.drawImage(this, 0, 0, this.width, this.height)
			}, f.src = r
		} else {
			var l = i,
				c = s,
				h = r.width,
				p = r.height,
				d = h / p;
			i || s ? s ? i || (l = c * d) : c = ~~ (l / d) : (l = h, c = p), u.width = l, u.height = c, isNaN(l) ? a.drawImage(r, 0, 0) : t == "ios" ? n.lib.Fix.drawImageIOS(a, r, l, c) : a.drawImage(r, 0, 0, l, c), this.srcImg = r
            //u.width , u.height 是显示大小
            //r.width, r.height原图尺寸
		}
		this.canvas = u, this.context = a, this.imgData = a.getImageData(0, 0, u.width, u.height), this.name = e + "_" + Math.random(), this.canvas.id = this.name, this.layers = [];
		var v = document.createElement("canvas");
		v.width = u.width, v.height = u.height, this.ctxCanvas = v, this.ctxContext = u.getContext("2d"), this.width = this.canvas.width, this.height = this.canvas.height, this.useWorker = n.useWorker, this.readyState = 1, this.useWorker && (this.dorsyWorker = n.lib.dorsyWorker(this));
        if (n.lib.Tools) for (var m in n.lib.Tools) this.Tools[m] = function(e) {
			return function(t) {
				return o.Tools(e, t)
			}
		}(m)
	}, window[e].module = function(e, t) {
		n.module(e, t)
	}, window[e].dorsyMath = function() {
		return n.lib.dorsyMath
	}, window[e].setName = function(e) {
		n.name = e || "alloyimage.js"
	}, window[e].getConfig = function() {
		return n.lib.config.getConfig()
	}, window[e].define = function(e, t) {
		n.definePs(e, t)
	}, window[e].useWorker = function(e) {
		if (!window.Worker) {
			this.useWorker = 0, console.log("AI_WARNING: \u6d4f\u89c8\u5668\u4e0d\u652f\u6301web worker, \u81ea\u52a8\u5207\u6362\u4e3a\u5355\u7ebf\u7a0b\nAI_WARNING: the brower doesn't support Web Worker");
			return
		}
		var e = e || "";
		/[\/\\]$/.test(e) && (e += n.name), e == "" && (e = "alloyimage.js"), n.useWorker = 1, n.path = e;
		var t = new XMLHttpRequest;
		t.onreadystatechange = function() {
			t.readyState == 4 && t.status == "404" && n.destroySelf("AI_ERROR\uff1a\u4f7f\u7528worker\u65f6\uff0cai\u6587\u4ef6\u8def\u5f84\u6307\u5b9a\u9519\u8bef\nAI_ERROR: error occured while using web worker since indicate the wrong path of file ai")
		}, t.open("GET", e, !1), t.send()
	}, onmessage = function(e) {
		var t = e.data,
			r;
		t[0] == "act" ? r = n.reflect(t[1], t[2], t[3]) : t[0] == "add" && (r = n.add.apply(n, t[1])), postMessage(r)
	}, window[e].prototype = {
		set width(e) {
			this.canvas.width = e
		}, set height(e) {
			this.canvas.height = e
		}, get width() {
			return this.canvas.width
		}, get height() {
			return this.canvas.height
		}, act: function(e, t) {
			var i = [];
			return i = Array.prototype.slice.call(arguments, 1), this.useWorker ? (this.dorsyWorker.queue.push(["act", e, i]), r.call(this)) : n.reflect(e, this.imgData, i), this
		},
		view: function(e, t, n, r, i) {
			var s = this.clone();
			return s.type = 1, this.addLayer(s, "\u6b63\u5e38", 0, 0), s.act(e, t, n, r, i), this
		},
		excute: function() {
			var e = this.layers,
				t = e.length;
			e[t - 1] && e[t - 1][0].type == 1 && (this.imgData = e[t - 1][0].imgData, delete e[t - 1])
		},
		cancel: function() {
			var e = this.layers,
				t = e.length;
			e[t - 1] && e[t - 1][0].type == 1 && delete e[t - 1]
		},
		show: function(t, n, r) {
			if (!r && this.useWorker) return this.dorsyWorker.queue.push(["show", t, n]), this;
			if (this.layers.length == 0) this.tempPsLib = {
				imgData: this.imgData
			};
			else {
				var i = new window[e](this.canvas.width, this.canvas.height);
				i.add(this, "\u6b63\u5e38", 0, 0, n), this.tempPsLib = i;
				for (var s = 0; s < this.layers.length; s++) {
					var o = this.layers[s],
						u = o[0].layers,
						a = o[0];
					u[u.length - 1] && u[u.length - 1][0].type == 1 && (a = u[u.length - 1][0]), i.add(a, o[1], o[2], o[3], n)
				}
				this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
			}
			this.context.putImageData(this.tempPsLib.imgData, 0, 0);
			if (t){
                //预览框
                if (typeof t == "string") {
				    var f = document.querySelector(t);
				    f.appendChild(this.canvas)
			    } else {
                    t.appendChild(this.canvas);
                }
            }else{
                document.body.appendChild(this.canvas);
            } 
			return this
		},
		replaceChild: function(e) {
			var t;
			return typeof e == "string" ? t = document.querySelector(e) : t = e, t.innerHTML = "", this.show(t)
		},
		replace: function(e, t) {
			return !t && this.useWorker ? (this.dorsyWorker.queue.push(["replace", e]), r.call(this), this) : (e && (e.onload = function() {}, e.src = this.save(0, 1, t)), this)
		},
		add: function() {
			var e = [],
				t, i, s, o, u, a, f;
			for (var l = 0; l < arguments.length; l++) {
				if (!l) continue;
				switch (typeof arguments[l]) {
				case "string":
					/\d+%/.test(arguments[l]) ? s = arguments[l].replace("%", "") : /[RGB]+/.test(arguments[l]) ? f = arguments[l] : i = arguments[l];
					break;
				case "number":
					e.push(arguments[l]);
					break;
				case "boolean":
					a = arguments[l]
				}
			}
			return o = e[0] || 0, u = e[1] || 0, i = i || "\u6b63\u5e38", s = s / 100 || 1, a = a || !1, f = f || "RGB", t = arguments[0], this.useWorker ? (this.dorsyWorker.queue.push(["add", t, i, s, o, u, a, f]), r.call(this)) : n.add(this.imgData, t.imgData, i, s, o, u, a, f), this
		},
		addLayer: function(e, t, n, r) {
			return this.layers.push([e, t, n, r]), this
		},
		clone: function(t) {
			var n = new window[e](this.canvas.width, this.canvas.height);
			return n.context.putImageData(this.imgData, 0, 0), n.imgData = n.context.getImageData(0, 0, this.canvas.width, this.canvas.height), n
		},
		swap: function(e, t) {
			var n = this.layers[e];
			return this.layers[e] = this.layers[t], this.layers[t] = n, this
		},
		deleteLayers: function(e) {
			this.layers = this.layers.del(e)
		},
		save: function(t, n, i) {
			t = t || "png", t = t.toLowerCase(), n = n || .8, t == "jpg" && (t = "jpeg");
			var s = "image/" + t;
			if (!i && this.useWorker){
			    return this.dorsyWorker.queue.push(["save"]), r.call(this), this;
			} 
			if (!this.layers.length) {
			    return this.context.putImageData(this.imgData, 0, 0), this.canvas.toDataURL(s, n);
			}
            
			var o = new window[e](this.canvas.width, this.canvas.height);
			o.add(this, "\u6b63\u5e38", 0, 0, isFast), this.tempPsLib = o;
			for (var u = 0; u < this.layers.length; u++) {
				var a = this.layers[u],
					f = a[0].layers,
					l = a[0];
				f[f.length - 1] && f[f.length - 1][0].type == 1 && (l = f[f.length - 1][0]), o.add(l, a[1], a[2], a[3], isFast)
			}
            
			return this.context.clearRect(0, 0, this.canvas.width, this.canvas.height), this.context.putImageData(o.imgData, 0, 0), this.canvas.toDataURL(s, n)
		},
		saveFile: function(e, t) {
			e = e || "AlloyImage\u5408\u6210\u56fe\u50cf.jpg", t = t || 1;
			var n = /.*.(jpg|png|gif|jpeg)$/g,
				r = "png";
			n.test(e) ? (n.lastIndex = 0, r = n.exec(e)[1]) : e += ".png";
			var i = this.save(r, t),
				s = document.createElement("a");
			s.href = i, s.download = e;
			var o = document.createEvent("HTMLEvents");
			o.initEvent("click", !1, !1), s.dispatchEvent(o)
		},
		download: function(e, t) {
			this.saveFile(e, t)
		},
		saveAsDataURL: function() {},
		saveAsBlob: function() {},
		saveAsBuffer: function() {},
		drawRect: function(e) {
			var t;
			(t = document.getElementById("imgRect")) || (t = document.createElement("canvas"), t.id = "imgRect", document.body.appendChild(t), t.width = parseInt(this.canvas.width), t.height = parseInt(this.canvas.height));
			var n = t.getContext("2d");
			n.clearRect(0, 0, t.width, t.height);
			var r = [],
				i = this.tempPsLib.imgData.data;
			for (var s = 0, o = i.length; s < o; s++) r[i[s]] ? r[i[s]]++ : r[i[s]] = 1;
			n.beginPath(), n.moveTo(0, t.height);
			var u = 0;
			for (var s = 0; s < 255; s++) r[s] > u && (u = r[s]);
			for (var s = 0; s < 255; s++) {
				var a = r[s] || 0;
				a = t.height - a / u * .8 * t.height, n.lineTo(s / 256 * t.width, a, 1, 1)
			}
			n.lineTo(t.width + 10, t.height), n.fill()
		},
		ps: function(e) {
			if (e == "\u539f\u56fe" || e == "origin" || e == "") return this;
			var t = n.reflectEasy(e),
				r = t.call(this, this.canvas);
			return r
		},
		logTime: function(e) {},
		ctx: function(e) {
			var t = this.ctxContext;
			return t.putImageData(this.imgData, 0, 0), e.call(t), this.imgData = t.getImageData(0, 0, this.canvas.width, this.canvas.height), this
		},
		notify: function(e) {
			e == "readyStateOK" && (this.readyState = 1)
		},
		complete: function(e) {
			this.useWorker ? this.dorsyWorker.queue.push(["complete", e]) : e()
		},
		transform: function(t, n, r) {
			var i = window[e].dorsyMath(),
				s = this.ctxContext;
			s.putImageData(this.imgData, 0, 0);
			var o = document.createElement("canvas").getContext("2d"),
				u = [new i.Matrix([0, 0], "1*2"), new i.Matrix([0, this.canvas.height], "1*2"), new i.Matrix([this.canvas.width, 0], "1 * 2"), new i.Matrix([this.canvas.width, this.canvas.height], "1*2")],
				a = [],
				f = new i.Matrix(t, "2*2");
			for (var l = 0; l < u.length; l++) a.push(u[l].mutiply(f));
			var c = Math.max(a[0].data[0][0], a[1].data[0][0], a[2].data[0][0], a[3].data[0][0]),
				h = Math.min(a[0].data[0][0], a[1].data[0][0], a[2].data[0][0], a[3].data[0][0]),
				p = Math.max(a[0].data[0][1], a[1].data[0][1], a[2].data[0][1], a[3].data[0][1]),
				d = Math.min(a[0].data[0][1], a[1].data[0][1], a[2].data[0][1], a[3].data[0][1]),
				v = ~~ (c - h),
				m = ~~ (p - d);
			return o.canvas.width = v, o.canvas.height = m, o.translate(-h, -d), o.transform.apply(o, t), o.drawImage(s.canvas, 0, 0), this.canvas.width = v, this.canvas.height = m, this.width = v, this.height = m, this.imgData = o.getImageData(0, 0, v, m), this
		},
		scale: function(e, t) {
			var t = t || e;
			return this.transform([e, 0, 0, t, 0, 0])
		},
		scaleTo: function(t, n) {
			var r = this,
				i = this.width,
				s = this.height,
				o, u;
			n || (n = t * s / i), t || (t = n * (i / s));
			if (t && n) return o = t / i, u = n / s, this.scale(o, u)
		},
		rotate: function(e) {
			var t = e / 180 * Math.PI,
				n = [Math.cos(t), Math.sin(t), -Math.sin(t), Math.cos(t), 0, 0];
			return this.transform(n)
		},
		moveTo: function(e, t) {
			return e = e || 0, t = t || 0, this.transform([1, 0, 0, 1, e, t])
		},
		clip: function(e, t, n, r) {
            //n is width , r is height;
			return this.ctxContext.putImageData(this.imgData, 0, 0), this.imgData = this.ctxContext.getImageData(e, t, n, r), this.context.canvas.width = n, this.context.canvas.height = r, this
		},
		Tools: function(e) {
			return n.tools(this.imgData, arguments)
		}
	}
})("psLib"), window.AlloyImage = window.$AI = window.psLib, function(e) {
	window[e].module("addLayer", function(e) {
		var t = {
			add: function(e, t, n, r, i, s, o, u) {
				var a = e.data,
					f = t.data,
					i = i || 0,
					s = s || 0,
					r = r || 1,
					o = o || !1,
					u = u || "RGB";
				/[RGB]+/.test(u) || (u = "RGB");
				var l = u.replace("R", "0").replace("G", "1").replace("B", "2"),
					c = 1,
					h, p = e.width,
					d = e.height,
					v = f.length,
					m = t.width,
					g = t.height,
					y = [l.indexOf("0") > -1, l.indexOf("1") > -1, l.indexOf("2") > -1],
					b = 4 * c,
					w, E, S, x, T, N, C, k, L, A, O, M = i,
					_ = i + m,
					D = s,
					P = s + g;
				if (M > p) return;
				M < 0 && (M = 0);
				if (_ < 0) return;
				_ > p && (_ = p);
				if (D > d) return;
				D < 0 && (D = 0);
				if (P < 0) return;
				P > d && (P = d);
				var H, B, j;
				for (var F = D; F < P; F++) {
					H = F * p, B = F - s, j = B * m;
					for (var I = M; I < _; I++) {
						var q = I - i,
							R = (H + I) * 4,
							C = (j + q) * 4;
						for (var U = 0; U < 3; U++) {
							if (f[C + 3] == 0) break;
							a[R + 3] = f[C + 3];
							switch (n) {
							case "\u989c\u8272\u51cf\u6de1":
								y[U] && (h = a[R + U] + a[R + U] * f[C + U] / (255 - f[C + U]), a[R + U] = (1 - r) * a[R + U] + r * h);
								break;
							case "\u53d8\u6697":
								y[U] && (h = a[R + U] < f[C + U] ? a[R + U] : f[C + U], a[R + U] = (1 - r) * a[R + U] + r * h);
								break;
							case "\u53d8\u4eae":
								y[U] && (h = a[R + U] > f[C + U] ? a[R + U] : f[C + U], a[R + U] = (1 - r) * a[R + U] + r * h);
								break;
							case "\u6b63\u7247\u53e0\u5e95":
								y[U] && (h = ~~ (a[R + U] * f[C + U] / 255), a[R + U] = (1 - r) * a[R + U] + r * h);
								break;
							case "\u6ee4\u8272":
								y[U] && (h = ~~ (255 - (255 - a[R + U]) * (255 - f[C + U]) / 255), a[R + U] = (1 - r) * a[R + U] + r * h);
								break;
							case "\u53e0\u52a0":
								y[U] && (a[R + U] <= 127.5 ? h = a[R + U] * f[C + U] / 127.5 : h = 255 - (255 - a[R + U]) * (255 - f[C + U]) / 127.5, a[R + U] = (1 - r) * a[R + U] + r * h);
								break;
							case "\u5f3a\u5149":
								y[U] && (f[C + U] <= 127.5 ? h = a[R + U] * f[C + U] / 127.5 : h = a[R + U] + (255 - a[R + U]) * (f[C + U] - 127.5) / 127.5, a[R + U] = (1 - r) * a[R + U] + r * h);
								break;
							case "\u5dee\u503c":
								y[U] && (h = a[R + U] > f[C + U] ? a[R + U] - f[C + U] : f[C + U] - a[R + U], a[R + U] = (1 - r) * a[R + U] + r * h);
								break;
							case "\u6392\u9664":
								y[U] && (h = a[R + U] + f[C + U] - a[R + U] * f[C + U] / 127.5, a[R + U] = (1 - r) * a[R + U] + r * h);
								break;
							case "\u70b9\u5149":
								y[U] && (a[R + U] < 2 * f[C + U] - 255 ? h = 2 * f[C + U] - 255 : a[R + U] < 2 * f[C + U] ? h = a[R + U] : h = 2 * f[C + U], a[R + U] = (1 - r) * a[R + U] + r * h);
								break;
							case "\u989c\u8272\u52a0\u6df1":
								y[U] && (h = 255 - 255 * (255 - a[R + U]) / f[C + U], a[R + U] = (1 - r) * a[R + U] + r * h);
								break;
							case "\u7ebf\u6027\u52a0\u6df1":
								if (y[U]) {
									var z = a[R + U] + f[C + U];
									h = z > 255 ? z - 255 : 0, a[R + U] = (1 - r) * a[R + U] + r * h
								}
								break;
							case "\u7ebf\u6027\u51cf\u6de1":
								if (y[U]) {
									var z = a[R + U] + f[C + U];
									h = z > 255 ? 255 : z, a[R + U] = (1 - r) * a[R + U] + r * h
								}
								break;
							case "\u67d4\u5149":
								y[U] && (f[C + U] < 127.5 ? h = ((2 * f[C + U] - 255) * (255 - a[R + U]) / 65025 + 1) * a[R + U] : h = (2 * f[C + U] - 255) * (Math.sqrt(a[R + U] / 255) - a[R + U] / 255) + a[R + U], a[R + U] = (1 - r) * a[R + U] + r * h);
								break;
							case "\u4eae\u5149":
								y[U] && (f[C + U] < 127.5 ? h = (1 - (255 - a[R + U]) / (2 * f[C + U])) * 255 : h = a[R + U] / (2 * (1 - f[C + U] / 255)), a[R + U] = (1 - r) * a[R + U] + r * h);
								break;
							case "\u7ebf\u6027\u5149":
								if (y[U]) {
									var z = a[R + U] + 2 * f[C + U] - 255;
									h = z > 255 ? 255 : z, a[R + U] = (1 - r) * a[R + U] + r * h
								}
								break;
							case "\u5b9e\u8272\u6df7\u5408":
								y[U] && (f[C + U] < 255 - a[R + U] ? h = 0 : h = 255, a[R + U] = (1 - r) * a[R + U] + r * h);
								break;
							default:
								y[U] && (h = f[C + U], a[R + U] = (1 - r) * a[R + U] + r * h)
							}
						}
					}
				}
				return e
			}
		};
		return t
	})
}("psLib"), function(e) {
	window[e].module("applyMatrix", function(e) {
		var t = {
			process: function(t, n) {
				var r = n || .6,
					i = t.data,
					s = t.width,
					o = t.height,
					u = new e.lib.dorsyMath.Matrix([-2, -4, -4, -4, -2, -4, 0, 8, 0, -4, -4, 8, 24, 8, -4, -4, 0, 8, 0, -4, -2, -4, -4, -4, -2], 25, 1),
					a = [];
				for (var f = 0, l = i.length; f < l; f += 4) {
					var c = f / 4,
						h = parseInt(c / s),
						p = c % s;
					if (h == 0 || p == 0) continue;
					var d = [
						[],
						[],
						[]
					];
					for (var v = -2; v < 3; v++) {
						var m = h + v;
						for (var g = -2; g < 3; g++) {
							var y = p + g,
								b = (m * s + y) * 4;
							for (var w = 0; w < 3; w++) {
								var E = b + w;
								d[w].push(i[E])
							}
						}
					}
					var S = new e.lib.dorsyMath.Matrix(d, 3, matrixSize),
						x = S.mutiply(u);
					for (var w = 0; w < 3; w++) a[f + w] = x.data[w];
					a[f + 4] = i[f + 4]
				}
				for (var f = 0, l = i.length; f < l; f++) i[f] = a[f] || i[f];
				return t
			}
		};
		return t
	})
}("psLib"), function(e) {
	window[e].module("config", function(e) {
		var t = {
			Alteration: {
				"\u4eae\u5ea6": "brightness",
				"\u8272\u76f8/\u9971\u548c\u5ea6\u8c03\u8282": "setHSI",
				"\u66f2\u7ebf": "curve",
				"gamma\u8c03\u8282": "gamma",
				"\u53ef\u9009\u989c\u8272": "selectiveColor"
			},
			Filter: {
				"\u7070\u5ea6\u5904\u7406": "toGray",
				"\u53cd\u8272": "toReverse",
				"\u7070\u5ea6\u9608\u503c": "toThresh",
				"\u9ad8\u65af\u6a21\u7cca": "gaussBlur",
				"\u6d6e\u96d5\u6548\u679c": "embossment",
				"\u67e5\u627e\u8fb9\u7f18": "borderline",
				"\u9a6c\u8d5b\u514b": "mosaic",
				"\u6cb9\u753b": "oilPainting",
				"\u8150\u8680": "corrode",
				"\u9510\u5316": "sharp",
				"\u6dfb\u52a0\u6742\u8272": "noise",
				"\u6697\u89d2": "darkCorner",
				"\u55b7\u70b9": "dotted",
				"\u964d\u566a": "denoise",
				"\u68d5\u8910\u8272": "sepia",
				"\u8272\u8c03\u5206\u79bb": "posterize"
			},
			ComEffect: {
				"\u7f8e\u80a4": "softenFace",
				"\u7d20\u63cf": "sketch",
				"\u81ea\u7136\u589e\u5f3a": "softEnhancement",
				"\u7d2b\u8c03": "purpleStyle",
				"\u67d4\u7126": "soften",
				"\u590d\u53e4": "vintage",
				"\u9ed1\u767d": "gray",
				"\u4efflomo": "lomo",
				"\u4eae\u767d\u589e\u5f3a": "strongEnhancement",
				"\u7070\u767d": "strongGray",
				"\u7070\u8272": "lightGray",
				"\u6696\u79cb": "warmAutumn",
				"\u6728\u96d5": "carveStyle",
				"\u7c97\u7cd9": "rough"
			}
		},
			n = function() {
				var e = {};
				for (var n in t) {
					if (n == "ComEffect") continue;
					for (var r in t[n]) e[r] = n, e[t[n][r]] = n
				}
				return e
			}(),
			r = {
				getModuleName: function(r) {
					var i;
					if (i = n[r]) {
						var s = t[i][r] || r;
						return {
							spaceName: i,
							actName: s
						}
					}
					e.destroySelf("AI_ERROR:\u8c03\u7528AI\u4e0d\u5b58\u5728\u7684\u65b9\u6cd5" + r)
				},
				getEasyFun: function(e) {
					return {
						spaceName: "ComEffect",
						actName: t.ComEffect[e] || e
					}
				},
				getConfig: function() {
					return t
				}
			};
		return r
	})
}("psLib"), function(e) {
	window[e].module("dorsyMath", function(e) {
		var t = {
			FFT1: function(e) {
				function o() {
					r++;
					var e = n / Math.pow(2, r),
						t = n / e;
					for (var i = 0; i < e; i++) u(i * t, (i + 1) * t - 1, r);
					e > 1 && o()
				}
				function u(r, s, o) {
					var u = Math.pow(2, o - 1);
					for (var a = r, f = 0; a <= s - u; a++) {
						var l = a + u,
							c = f * n / Math.pow(2, o),
							h = c + n / 4;
						e[a] instanceof t.C || (e[a] = new t.C(e[a])), e[l] instanceof t.C || (e[l] = new t.C(e[l]));
						var p = e[a].plus(e[l].mutiply(i[c])),
							d = e[a].plus(e[l].mutiply(i[h]));
						e[a] = p, e[l] = d, f++
					}
				}
				var n = e.length,
					r = 0,
					i = [];
				for (var s = 0; s < n; s++) i[s] = this.exp(-2 * Math.PI * s / n);
				return o(), e
			},
			DFT: function() {},
			Matrix: function(e, t, n) {
				var r = [];
				if (t) {
					if (isNaN(t)) var i = /(\d+)\s*\*/.exec(t)[1],
						s = /\*\s*(\d+)/.exec(t)[1];
					else i = t, s = n;
					if (e[0] && e[0][0]) for (var o = 0; o < i; o++) {
						r[o] = [];
						for (var u = 0; u < s; u++) r[o][u] = e[o][u] || 0
					} else for (var o = 0; o < i; o++) {
						r[o] = [];
						for (var u = 0; u < s; u++) {
							var a = o * s + u;
							r[o][u] = e[o * s + u] || 0
						}
					}
					this.m = i, this.n = s
				} else this.m = e.length, this.n = e[0].length;
				this.data = r
			},
			C: function(e, t) {
				this.r = e || 0, this.i = t || 0
			},
			exp: function(e, n) {
				e = e || 0, n = n || 1;
				var r = new t.C;
				return r.r = n * Math.cos(e), r.i = n * Math.sin(e), r
			},
			lagrange: function(e, t) {
				function r(t, r) {
					var i = 1,
						s = 1;
					for (var o = 0; o < n; o++) o != r && (i *= e[r] - e[o], s *= t - e[o]);
					var u = s / i;
					return u
				}
				var n = e.length,
					i = function(e) {
						var i = 0;
						for (var s = 0; s < n; s++) {
							var o = r(e, s);
							i += t[s] * o
						}
						return i
					};
				return i
			},
			applyMatrix: function(n, r, i) {
				i = i || 0;
				var s = n.data,
					o = n.width,
					u = n.height,
					a = r.length,
					f = new t.Matrix(r, a, 1),
					l = [],
					c = -(Math.sqrt(a) - 1) / 2;
				for (var h = 0, p = s.length; h < p; h += 4) {
					var d = h / 4,
						v = parseInt(d / o),
						m = d % o;
					if (v == 0 || m == 0) continue;
					var g = [
						[],
						[],
						[]
					];
					for (var y = c; y <= -c; y++) {
						var b = v + y;
						for (var w = c; w <= -c; w++) {
							var E = m + w,
								S = (b * o + E) * 4;
							for (var x = 0; x < 3; x++) {
								var T = S + x;
								g[x].push(s[T])
							}
						}
					}
					var N = new e.lib.dorsyMath.Matrix(g, 3, a),
						C = N.mutiply(f);
					for (var x = 0; x < 3; x++) l[h + x] = C.data[x];
					l[h + 4] = s[h + 4]
				}
				for (var h = 0, p = s.length; h < p; h++) l[h] && (s[h] = l[h] < i ? l[h] : s[h]);
				return n
			},
			RGBToHSI: function(e, t, n) {
				var r = (e - t + e - n) / 2 / Math.sqrt((e - t) * (e - t) + (e - n) * (t - n)) || 0;
				r = Math.acos(r);
				var i = n > t ? 2 * Math.PI - r : r;
				if (e + t + n > 0) var s = 1 - 3 * Math.min(e, t, n) / (e + t + n);
				else var s = 0;
				var o = (e + t + n) / 3;
				return i > 2 * Math.PI && (i = 2 * Math.PI), i < 0 && (i = 0), {
					H: i,
					S: s,
					I: o
				}
			},
			HSIToRGB: function(e, t, n) {
				e < 0 ? (e %= 2 * Math.PI, e += 2 * Math.PI) : e %= 2 * Math.PI;
				if (e <= Math.PI * 2 / 3) var r = n * (1 - t),
					i = n * (1 + t * Math.cos(e) / Math.cos(Math.PI / 3 - e)),
					s = 3 * n - (i + r);
				else if (e <= Math.PI * 4 / 3) {
					e -= Math.PI * 2 / 3;
					var i = n * (1 - t),
						s = n * (1 + t * Math.cos(e) / Math.cos(Math.PI / 3 - e)),
						r = 3 * n - (s + i)
				} else {
					e -= Math.PI * 4 / 3;
					var s = n * (1 - t),
						r = n * (1 + t * Math.cos(e) / Math.cos(Math.PI / 3 - e)),
						i = 3 * n - (s + r)
				}
				return {
					R: i,
					G: s,
					B: r
				}
			},
			applyInHSI: function(e, t) {
				var n = ["R", "Y", "G", "C", "B", "M"],
					r = e.data,
					i = Math.PI / 6,
					s = Math.PI / 3;
				for (var o = 0, u = r.length; o < u; o += 4) {
					var a = this.RGBToHSI(r[o], r[o + 1], r[o + 2]),
						f = a.H + i,
						l = ~~ (f / s),
						c = n[l % 6];
					t(a, c, r[o + 3]), a.S > 1 && (a.S = 1), a.S < 0 && (a.S = 0);
					var h = this.HSIToRGB(a.H, a.S, a.I);
					r[o] = h.R, r[o + 1] = h.G, r[o + 2] = h.B
				}
			},
			applyInCoordinate: function(e, t) {},
			distance: function(e, n) {
				n = n || [0, 0], e = new t.C(e[0], e[1]), n = new t.C(n[0], n[1]);
				var r = e.minus(n);
				return r.distance()
			},
			xyToIFun: function(e) {
				return function(t, n, r) {
					return r = r || 0, (n * e + t) * 4 + r
				}
			},
			xyCal: function(e, t, n, r, i) {
				var s = this.xyToIFun(e.width),
					o = s(t, n, 0),
					u = e.data,
					a = r(u[o], u[o + 1], u[o + 2]);
				a && (u[o] = a[0], u[o + 1] = a[1], u[o + 2] = a[2]), i && (u[o + 3] = i(u[o + 3]))
			}
		};
		return t.Matrix.prototype = {
			plus: function(e) {
				if (this.m != e.m || this.n != e.n) throw new Error("\u77e9\u9635\u52a0\u6cd5\u884c\u5217\u4e0d\u5339\u914d");
				var n = new t.Matrix([], this.m, this.n);
				for (var r = 0; r < this.m; r++) for (var i = 0; i < this.n; i++) n.data[r][i] = this.data[r][i] + e.data[r][i];
				return n
			},
			minus: function(e) {
				if (this.m != e.m || this.n != e.n) throw new Error("\u77e9\u9635\u51cf\u6cd5\u6cd5\u884c\u5217\u4e0d\u5339\u914d");
				var n = new t.Matrix([], this.m, this.n);
				for (var r = 0; r < this.m; r++) for (var i = 0; i < this.n; i++) n.data[r][i] = this.data[r][i] - e.data[r][i];
				return n
			},
			mutiply: function(e) {
				if (this.n != e.m) throw new Error("\u77e9\u9635\u4e58\u6cd5\u884c\u5217\u4e0d\u5339\u914d");
				var n = new t.Matrix([], this.m, e.n);
				for (var r = 0; r < this.m; r++) for (var i = 0; i < e.n; i++) {
					var s = 0;
					for (var o = 0; o < this.n; o++) s += this.data[r][o] * e.data[o][i];
					n.data[r][i] = s
				}
				return n
			}
		}, t.C.prototype = {
			plus: function(e) {
				var n = new t.C;
				return n.r = this.r + e.r, n.i = this.i + e.i, n
			},
			minus: function(e) {
				var n = new t.C;
				return n.r = this.r - e.r, n.i = this.i - e.i, n
			},
			mutiply: function(e) {
				var n = new t.C;
				return n.r = this.r * e.r - this.i * e.i, n.i = this.r * e.i + this.i * e.r, n
			},
			divide: function(e) {
				var n = new t.C,
					r = e.mutiply(e.conjugated()),
					i = this.mutiply(e.conjugated());
				return n.r = i.r / r.r, n.i = i.i / r.r, n
			},
			conjugated: function() {
				var e = new t.C(this.r, -this.i);
				return e
			},
			distance: function() {
				return Math.sqrt(this.r * this.r + this.i * this.i)
			}
		}, t
	})
}("psLib"), function(e) {
	window[e].module("dorsyWorker", function(e) {
		var t = 200,
			n = function(n) {
				var r = new Worker(e.path);
				if (!r) throw new Error("\u4f7f\u7528worker\u65f6\uff0calloyimage\u6587\u4ef6\u76ee\u5f55\u6307\u5b9a\u51fa\u9519");
				var i = {
					queue: [],
					startWorker: function() {
						this.shiftAction()
					},
					shiftAction: function() {
						var e = this.queue.shift(),
							i = this;
						if (!e) {
							setTimeout(function() {
								e = i.queue.shift(), e || n.notify("readyStateOK")
							}, t);
							return
						}
						var s = e[0];
						if (s == "act") r.postMessage(["act", e[1], n.imgData, e[2]]);
						else if (s == "add") {
							function o() {
								if (e[1].readyState) {
									var i = [n.imgData, e[1].imgData].concat(e.slice(2));
									r.postMessage(["add", i])
								} else setTimeout(function() {
									o()
								}, t)
							}
							o()
						} else s == "show" ? (n.show(e[1], e[2], 1), this.shiftAction()) : s == "complete" ? (e[1] && e[1](), this.shiftAction()) : s == "clone" ? (n.clone(1), this.shiftAction()) : s == "save" ? (n.save(0, 1), this.shiftAction()) : s == "replace" && (n.replace(e[1], 1), this.shiftAction())
					},
					callback: function(e) {
						n.imgData = e, this.shiftAction()
					}
				};
				return r.onmessage = function(e) {
					i.callback(e.data)
				}, i
			};
		return n
	})
}("psLib"), function(e) {
	window[e].module("easy", function(t) {
		var n = {
			getFun: function(t) {
				var n = {
					softenFace: function() {
						var e = this.clone();
						return e.add(this.act("\u9ad8\u65af\u6a21\u7cca", 10), "\u6ee4\u8272").act("\u4eae\u5ea6", -10, 5)
					},
					sketch: function() {
						var e = this.clone();
						return this.add(e.act("\u53cd\u8272").act("\u9ad8\u65af\u6a21\u7cca", 8), "\u989c\u8272\u51cf\u6de1").act("toGray").act("\u9510\u5316", 1)
					},
					softEnhancement: function() {
						return this.act("\u66f2\u7ebf", [0, 190, 255], [0, 229, 255])
					},
					purpleStyle: function() {
						var e = this.clone();
						return this.add(e.act("\u9ad8\u65af\u6a21\u7cca", 3), "\u6b63\u7247\u53e0\u5e95", "RG")
					},
					soften: function() {
						var e = this.clone();
						return this.add(e.act("\u9ad8\u65af\u6a21\u7cca", 6), "\u53d8\u6697")
					},
					vintage: function() {
						var t = this.clone();
						return this.act("\u7070\u5ea6\u5904\u7406").add(window[e](this.canvas.width, this.canvas.height, "#808080").act("\u6dfb\u52a0\u6742\u8272").act("\u9ad8\u65af\u6a21\u7cca", 4).act("\u8272\u76f8/\u9971\u548c\u5ea6\u8c03\u8282", 32, 19, 0, !0), "\u53e0\u52a0")
					},
					gray: function() {
						return this.act("\u7070\u5ea6\u5904\u7406")
					},
					lomo: function() {
						var e = this.clone().add(this.clone(), "\u6ee4\u8272").add(this.clone(), "\u67d4\u5149");
						return e.add(this.clone().act("\u53cd\u8272"), "\u6b63\u5e38", "20%", "B").act("\u6697\u89d2", 6, 200)
					},
					strongEnhancement: function() {
						return this.clone().add(this.clone().act("\u66f2\u7ebf", [0, 50, 255], [0, 234, 255]), "\u67d4\u5149")
					},
					strongGray: function() {
						return this.act("\u7070\u5ea6\u5904\u7406").act("\u66f2\u7ebf", [0, 61, 69, 212, 255], [0, 111, 176, 237, 255])
					},
					lightGray: function() {
						return this.act("\u7070\u5ea6\u5904\u7406").act("\u66f2\u7ebf", [0, 60, 142, 194, 255], [0, 194, 240, 247, 255])
					},
					warmAutumn: function() {
						var e = this.clone().act("\u8272\u76f8/\u9971\u548c\u5ea6\u8c03\u8282", 36, 47, 8, !0).act("\u6697\u89d2", 6, 150);
						return this.add(e, "\u53e0\u52a0")
					},
					carveStyle: function() {
						var e = this.clone().act("\u9a6c\u8d5b\u514b").act("\u67e5\u627e\u8fb9\u7f18").act("\u6d6e\u96d5\u6548\u679c");
						return this.add(e, "\u7ebf\u6027\u5149")
					},
					rough: function() {
						return this.add(window[e](this.canvas.width, this.canvas.height, "#000").act("\u55b7\u70b9").act("\u53cd\u8272").act("\u6d6e\u96d5\u6548\u679c"), "\u53e0\u52a0")
					}
				};
				return n[t]
			}
		};
		return n
	})
}("psLib"), function(e) {
	window[e].module("Fix", function(e) {
		function t(e) {
			var t = e.naturalWidth,
				n = e.naturalHeight,
				r = document.createElement("canvas");
			r.width = 1, r.height = n;
			var i = r.getContext("2d");
			i.drawImage(e, 0, 0);
			var s = i.getImageData(0, 0, 1, n).data,
				o = 0,
				u = n,
				a = n;
			while (a > o) {
				var f = s[(a - 1) * 4 + 3];
				f === 0 ? u = a : o = a, a = u + o >> 1
			}
			var l = a / n;
			return l === 0 ? 1 : l
		}
		function n(e, n, r, i, s, o, u, a, f, l) {
			var c = t(n);
			e.drawImage(n, r * c, i * c, s * c, o * c, u, a, f, l)
		}
		function r(e, t, r, i) {
			var s = 0,
				o = 0,
				u = t.width,
				a = t.height,
				f = 0,
				l = 0;
			n(e, t, s, o, u, a, f, l, r, i)
		}
		var i = {
			drawImageIOS: r,
			drawImageIOSFix: n
		};
		return i
	})
}("psLib"), function(e) {
	window[e].module("Tools", function(e) {
		var t = {
			getColor: {
				process: function(t, n) {
					var r = e.lib.dorsyMath,
						i = r.xyToIFun(t.width),
						s, o = [0, 0, 0],
						u = 50,
						a = Math.PI * 2 / u,
						f, l = [];
					r.applyInHSI(t, function(e, t, n) {
						n > 128 && (f = parseInt(e.H / a), l[f] || (l[f] = []), l[f].push([e.S, e.I]))
					});
					var c = 3,
						h = 0,
						p = 0;
					for (var s = 0; s < u; s++) l[s] && l[s].length > h && (h = l[s].length, p = s);
					var d = 0,
						v, m = 0,
						g;
					for (var s = 0; s < l[p].length; s++) d += l[p][s][0], m += l[p][s][1];
					v = d / l[p].length, g = m / l[p].length;
					var y = p * a,
						b = r.HSIToRGB(y, v, g),
						w = "rgb(" + parseInt(b.R) + "," + parseInt(b.G) + "," + parseInt(b.B) + ")";
					return w
				}
			},
			toText: {
				process: function(t, n) {
					var r = t.data,
						i = t.width,
						s = t.height,
						o, u = n[0] || ".:;!#@",
						a = [],
						f = "";
					console.log(u);
					var l = e.lib.dorsyMath,
						c = l.xyToIFun(t.width),
						h, p = 255 / u.length,
						d;
					for (var v = 0; v < i; v += 1) {
						for (var m = 0; m < s; m += 1) h = c(v, m, 0), o = (r[h] + r[h + 1] + r[h + 2]) / 3, d = parseInt(o / p), f += u[d];
						f += "<br />"
					}
					return f
				}
			}
		};
		return t
	})
}("psLib"), function(e) {
	window[e].module("Alteration.brightness", function(e) {
		var t = {
			process: function(e, t) {
				var n = e.data,
					r = t[0] / 50,
					i = t[1] || 0,
					s = i / 50,
					o = Math.tan((45 + 44 * s) * Math.PI / 180);
				for (var u = 0, a = n.length; u < a; u += 4) for (var f = 0; f < 3; f++) n[u + f] = (n[u + f] - 127.5 * (1 - r)) * o + 127.5 * (1 + r);
				return e
			}
		};
		return t
	})
}("psLib"), function(e) {
	window[e].module("Alteration.curve", function(e) {
		var t = {
			process: function(t, n) {
				var r = e.lib.dorsyMath.lagrange(n[0], n[1]),
					i = t.data,
					s = t.width,
					o = t.height,
					u = n[2];
				/[RGB]+/.test(u) || (u = "RGB");
				var a = u.replace("R", "0").replace("G", "1").replace("B", "2"),
					f = [a.indexOf("0") > -1, a.indexOf("1") > -1, a.indexOf("2") > -1];
				for (var l = 0; l < s; l++) for (var c = 0; c < o; c++) {
					var h = c * s + l;
					for (var p = 0; p < 3; p++) {
						if (!f[p]) continue;
						i[h * 4 + p] = r(i[h * 4 + p])
					}
				}
				return t
			}
		};
		return t
	})
}("psLib"), function(e) {
	window[e].module("Alteration.gamma", function(e) {
		var t = {
			process: function(t, n) {
				var r = e.lib.dorsyMath,
					i = t.data,
					s = t.width,
					o = t.height,
					u;
				n[0] == undefined ? u = 10 : u = n[0];
				var a = (u + 100) / 200 * 2;
				for (var f = 0; f < s; f++) for (var l = 0; l < o; l++) r.xyCal(t, f, l, function(e, t, n) {
					return [Math.pow(e, a), Math.pow(t, a), Math.pow(n, a)]
				});
				return t
			}
		};
		return t
	})
}("psLib"), function(e) {
	window[e].module("Alteration.selectiveColor", function(e) {
		var t = {
			process: function(t, n) {
				var r = n[0],
					i = n[1],
					s = n[2],
					o = n[3],
					u = n[4],
					a = n[5] || 0,
					f = {
						red: "R",
						green: "G",
						blue: "B",
						"\u7ea2\u8272": "R",
						"\u7eff\u8272": "G",
						"\u84dd\u8272": "B"
					},
					l = {
						cyan: "R",
						magenta: "G",
						yellow: "B",
						"\u9752\u8272": "R",
						"\u6d0b\u7ea2": "G",
						"\u9ec4\u8272": "B"
					},
					c = function(e) {
						if (f[r]) return Math.max(e.R, e.G, e.B) == e[f[r]];
						if (l[r]) return Math.min(e.R, e.G, e.B) == e[l[r]];
						if (r == "black" || r == "\u9ed1\u8272") return Math.min(e.R, e.G, e.B) < 128;
						if (r == "white" || r == "\u767d\u8272") return Math.max(e.R, e.G, e.B) > 128;
						if (r == "\u4e2d\u6027\u8272") return !(Math.max(e.R, e.G, e.B) < 1 || Math.min(e.R, e.G, e.B) > 224)
					},
					h = 0,
					p = 0,
					d = 0,
					v = [i, s, o, u];
				for (var m = 0, g = t.width; m < g; m++) for (var y = 0, b = t.height; y < b; y++) e.lib.dorsyMath.xyCal(t, m, y, function(e, t, n) {
					var i = {
						R: e,
						G: t,
						B: n
					},
						s = [e, t, n],
						o = [];
					if (c(i)) {
						if (f[r]) {
							var h = f[r],
								p = e + t + n - Math.max(e, t, n) - Math.min(e, t, n);
							d = i[h] - p
						} else if (l[r]) {
							var m = l[r],
								p = e + t + n - Math.max(e, t, n) - Math.min(e, t, n);
							d = p - i[m]
						} else if (r == "black" || r == "\u9ed1\u8272") d = parseInt(127.5 - Math.max(e, t, n)) * 2;
						else if (r == "white" || r == "\u767d\u8272") d = parseInt(Math.min(e, t, n) - 127.5) * 2;
						else {
							if (r != "\u4e2d\u6027\u8272") return;
							d = 255 - (Math.abs(Math.max(e, t, n) - 127.5) + Math.abs(Math.min(e, t, n) - 127.5))
						}
						for (var g = 0; g < 3; g++) {
							var y = parseInt(d * (s[g] / 255)),
								b = s[g] - y,
								w = parseInt(d * (1 - s[g] / 255)),
								E = s[g] + w,
								S = v[g] + u + v[g] * u;
							if (a) {
								s[g] > 128 && (y = w);
								if (u > 0) var x = s[g] - u * y;
								else var x = s[g] - u * w;
								x > E && (x = E), x < b && (x = b), w = E - x, y = x - b, u < 0 && (y = w), v[g] > 0 ? x -= v[g] * y : x -= v[g] * w
							} else var x = d * -S + s[g];
							x > E && (x = E), x < b && (x = b), o[g] = x
						}
						return o
					}
				});
				return t
			}
		};
		return t
	})
}("psLib"), function(e) {
	window[e].module("Alteration.setHSI", function(e) {
		var t = {
			process: function(t, n) {
				n[0] = n[0] / 180 * Math.PI, n[1] = n[1] / 100 || 0, n[2] = n[2] / 100 * 255 || 0, n[3] = n[3] || !1;
				var r = n[4];
				/[RGBCMY]+/.test(r) || (r = "RGBCMY");
				var i = r.split(""),
					s = {};
				for (var o = 0; o < i.length; o++) s[i[o]] = 1;
				return e.lib.dorsyMath.applyInHSI(t, function(e, t) {
					if (!s[t]) return;
					n[3] ? (e.H = n[0], e.S = n[1], e.I += n[2]) : (e.H += n[0], e.S += n[1], e.I += n[2])
				}), t
			}
		};
		return t
	})
}("psLib"), function(e) {
	window[e].module("Filter.ImageEnhance", function(e) {
		var t = {
			process: function(e, t, n) {
				function f(e) {}
				var r = arg || .5,
					i = e.data,
					s = e.width,
					o = e.height,
					u = t || {
						x: 10,
						y: 10
					},
					a = n || {
						x: 50,
						y: 40
					};
				for (var l = 0, c = i.length; l < c; l += 4);
				return e.data = i, e
			}
		};
		return t
	})
}("psLib"), function(e) {
	window[e].module("Filter.corrode", function(e) {
		var t = {
			process: function(e, t) {
				var n = parseInt(t[0]) || 3,
					r = e.data,
					i = e.width,
					s = e.height,
					o = n * 2 + 1;
				for (var u = 0; u < i; u++) for (var a = 0; a < s; a++) {
					var f = parseInt(Math.random() * n * 2) - n,
						l = parseInt(Math.random() * n * 2) - n,
						c = a * i + u,
						h = (a + f) * i + u + l;
					for (var p = 0; p < 3; p++) r[c * 4 + p] = r[h * 4 + p]
				}
				return e
			}
		};
		return t
	})
}("psLib"), function(e) {
	window[e].module("Filter.darkCorner", function(e) {
		var t = {
			process: function(t, n) {
				function v(t, n, r) {
					var i = e.lib.dorsyMath.distance([t, n], [l, c]),
						o = (i - p) / (h - p);
					return o < 0 && (o = 0), d(o, 0, .02, .3, 1) * r * s / 255
				}
				var r = parseInt(n[0]) || 3,
					i = n[2] || "round",
					s = n[1] || 30,
					o = t.data,
					u = t.width,
					a = t.height,
					f = r * 2 + 1,
					l = u * 2 / 3,
					c = a * 1 / 2,
					h = e.lib.dorsyMath.distance([l, c]),
					p = h * (1 - r / 10),
					d = function(e, t, n, r, i) {
						return t * Math.pow(1 - e, 3) + 3 * n * e * Math.pow(1 - e, 2) + 3 * r * e * e * (1 - e) + i * Math.pow(e, 3)
					};
				for (var m = 0; m < u; m++) for (var g = 0; g < a; g++) {
					var y = g * u + m;
					for (var b = 0; b < 3; b++) {
						var w = v(m, g, o[y * 4 + b]);
						o[y * 4 + b] -= w
					}
				}
				return t
			}
		};
		return t
	})
}("psLib"), function(e) {
	window[e].module("Filter.dotted", function(e) {
		var t = {
			process: function(t, n) {
				var r = parseInt(n[0]) || 1,
					i = parseInt(n[1]) || 1,
					s = t.data,
					o = t.width,
					u = t.height,
					a = r * 2 + 1,
					f = [],
					l = i * i;
				for (var c = -r; c < r; c++) for (var h = -r; h < r; h++) c * c + h * h > l && f.push([c, h]);
				var p = e.lib.dorsyMath.xyToIFun(o);
				for (var c = 0, d = parseInt(o / a); c < d; c++) for (var h = 0, v = parseInt(u / a); h < v; h++) {
					var m = parseInt((c + .5) * a),
						g = parseInt((h + .5) * a);
					for (var y = 0; y < f.length; y++) {
						var b = m + f[y][0],
							w = g + f[y][1];
						s[p(b, w, 3)] = 225, s[p(b, w, 2)] = 225, s[p(b, w, 0)] = 225, s[p(b, w, 1)] = 225
					}
				}
				return t
			}
		};
		return t
	})
}("psLib"), function(e) {
	window[e].module("Filter.embossment", function(e) {
		var t = {
			process: function(e, t) {
				var n = e.data,
					r = e.width,
					i = e.height,
					s = [];
				for (var o = 0, u = n.length; o < u; o += 4) {
					var a = o / 4,
						f = parseInt(a / r),
						l = a % r,
						c = ((f - 1) * r + (l - 1)) * 4,
						h = (f + 1) * r * 4 + (l + 1) * 4;
					if (f == 0 || l == 0) continue;
					for (var p = 0; p < 3; p++) s[o + p] = n[c + p] - n[h + p] + 127.5;
					s[o + 4] = n[o + 4]
				}
				for (var o = 0, u = n.length; o < u; o++) n[o] = s[o] || n[o];
				return e
			}
		};
		return t
	})
}("psLib"), function(e) {
	window[e].module("Filter.gaussBlur", function(e) {
		var t = {
			process: function(e, t, n) {
				var r = e.data,
					i = e.width,
					s = e.height,
					o = [],
					u = 0,
					a, f, l, c, h, p, d, v, m, g;
				t = Math.floor(t) || 3, n = n || t / 3, p = 1 / (Math.sqrt(2 * Math.PI) * n), h = -1 / (2 * n * n);
				for (d = 0, a = -t; a <= t; a++, d++) c = p * Math.exp(h * a * a), o[d] = c, u += c;
				for (d = 0, g = o.length; d < g; d++) o[d] /= u;
				for (f = 0; f < s; f++) for (a = 0; a < i; a++) {
					l = c = h = p = 0, u = 0;
					for (v = -t; v <= t; v++) m = a + v, m >= 0 && m < i && (d = (f * i + m) * 4, l += r[d] * o[v + t], c += r[d + 1] * o[v + t], h += r[d + 2] * o[v + t], u += o[v + t]);
					d = (f * i + a) * 4, r[d] = l / u, r[d + 1] = c / u, r[d + 2] = h / u
				}
				for (a = 0; a < i; a++) for (f = 0; f < s; f++) {
					l = c = h = p = 0, u = 0;
					for (v = -t; v <= t; v++) m = f + v, m >= 0 && m < s && (d = (m * i + a) * 4, l += r[d] * o[v + t], c += r[d + 1] * o[v + t], h += r[d + 2] * o[v + t], u += o[v + t]);
					d = (f * i + a) * 4, r[d] = l / u, r[d + 1] = c / u, r[d + 2] = h / u
				}
				return e.data = r, e
			}
		};
		return t
	})
}("psLib"), function(e) {
	window[e].module("Filter.borderline", function(e) {
		var t = {
			process: function(t, n) {
				var r = [-2, -4, -4, -4, -2, -4, 0, 8, 0, -4, -4, 8, 24, 8, -4, -4, 0, 8, 0, -4, -2, -4, -4, -4, -2],
					i = [0, 1, 0, 1, -4, 1, 0, 1, 0],
					s = [];
				return e.lib.dorsyMath.applyMatrix(t, i, 250)
			}
		};
		return t
	})
}("psLib"), function(e) {
	window[e].module("Filter.mosaic", function(e) {
		var t = {
			process: function(e, t) {
				var n = parseInt(t[0]) || 3,
					r = e.data,
					i = e.width,
					s = e.height,
					o = n * 2 + 1;
				for (var u = 0, a = parseInt(i / o); u < a; u++) for (var f = 0, l = parseInt(s / o); f < l; f++) {
					var c = [],
						h = [0, 0, 0];
					for (var p = 0; p < o; p++) for (var d = 0; d < o; d++) {
						var v = (f * o + p) * i + u * o + d;
						h[0] += r[v * 4], h[1] += r[v * 4 + 1], h[2] += r[v * 4 + 2]
					}
					c[0] = h[0] / (o * o), c[1] = h[1] / (o * o), c[2] = h[2] / (o * o);
					for (var p = 0; p < o; p++) for (var d = 0; d < o; d++) {
						var v = (f * o + p) * i + u * o + d;
						r[v * 4] = c[0], r[v * 4 + 1] = c[1], r[v * 4 + 2] = c[2]
					}
				}
				return e
			}
		};
		return t
	})
}("psLib"), function(e) {
	window[e].module("Filter.noise", function(e) {
		var t = {
			process: function(e, t) {
				var n = parseInt(t[0]) || 100,
					r = e.data,
					i = e.width,
					s = e.height,
					o = n * 2 + 1;
				for (var u = 0; u < i; u++) for (var a = 0; a < s; a++) {
					var f = a * i + u;
					for (var l = 0; l < 3; l++) {
						var c = parseInt(Math.random() * n * 2) - n;
						r[f * 4 + l] += c
					}
				}
				return e
			}
		};
		return t
	})
}("psLib"), function(e) {
	window[e].module("Filter.oilPainting", function(e) {
		var t = {
			process: function(e, t) {
				var n = parseInt(t[0]) || 16,
					r = e.data,
					i = e.width,
					s = e.height,
					o = n * 2 + 1;
				for (var u = 0; u < i; u++) for (var a = 0; a < s; a++) {
					var f = a * i + u,
						l = 0;
					for (var c = 0; c < 3; c++) l += r[f * 4 + c];
					l /= 3;
					var h = parseInt(l / n) * n;
					for (var c = 0; c < 3; c++) r[f * 4 + c] = h
				}
				return e
			}
		};
		return t
	})
}("psLib"), function(e) {
	window[e].module("Filter.posterize", function(e) {
		var t = {
			process: function(t, n) {
				var r = e.lib.dorsyMath,
					i = t.data,
					s = t.width,
					o = t.height,
					u = n[0] || 20;
				u = u < 1 ? 1 : u > 255 ? 255 : u;
				var a = Math.floor(255 / u);
				for (var f = 0; f < s; f++) for (var l = 0; l < o; l++) r.xyCal(t, f, l, function(e, t, n) {
					return [Math.floor(e / a) * a, Math.floor(t / a) * a, Math.floor(n / a) * a]
				});
				return t
			}
		};
		return t
	})
}("psLib"), function(e) {
	window[e].module("Filter.sepia", function(e) {
		var t = {
			process: function(t) {
				var n = e.lib.dorsyMath,
					r = t.data,
					i = t.width,
					s = t.height;
				for (var o = 0; o < i; o++) for (var u = 0; u < s; u++) n.xyCal(t, o, u, function(e, t, n) {
					return [e * .393 + t * .769 + n * .189, e * .349 + t * .686 + n * .168, e * .272 + t * .534 + n * .131]
				});
				return t
			}
		};
		return t
	})
}("psLib"), function(e) {
	window[e].module("Filter.sharp", function(e) {
		var t = {
			process: function(e, t) {
				var n = t[0] || .6,
					r = e.data,
					i = e.width,
					s = e.height;
				for (var o = 0, u = r.length; o < u; o += 4) {
					var a = o / 4,
						f = parseInt(a / i),
						l = a % i;
					if (f == 0 || l == 0) continue;
					var c = ((f - 1) * i + (l - 1)) * 4,
						h = ((f - 1) * i + l) * 4,
						p = (a - 1) * 4;
					for (var d = 0; d < 3; d++) {
						var v = r[o + d] - (r[h + d] + r[p + d] + r[c + d]) / 3;
						r[o + d] += v * n
					}
				}
				return e
			}
		};
		return t
	})
}("psLib"), function(e) {
	window[e].module("Filter.toGray", function(e) {
		var t = {
			process: function(e) {
				var t = e.data;
				for (var n = 0, r = t.length; n < r; n += 4) {
					var i = parseInt(.299 * t[n] + .578 * t[n + 1] + .114 * t[n + 2]);
					t[n + 2] = t[n + 1] = t[n] = i
				}
				return e.data = t, e
			}
		};
		return t
	})
}("psLib"), function(e) {
	window[e].module("Filter.toReverse", function(e) {
		var t = {
			process: function(e) {
				var t = e.data;
				for (var n = 0, r = t.length; n < r; n += 4) t[n] = 255 - t[n], t[n + 1] = 255 - t[n + 1], t[n + 2] = 255 - t[n + 2];
				return e.data = t, e
			}
		};
		return t
	})
}("psLib"), function(e) {
	window[e].module("Filter.toThresh", function(e) {
		var t = {
			process: function(t, n) {
				t = e.reflect("toGray", t);
				var r = t.data,
					n = n[0] || 128;
				for (var i = 0, s = r.length; i < s; i++)(i + 1) % 4 && (r[i] = r[i] > n ? 255 : 0);
				return t.data = r, t
			}
		};
		return t
	})
}("psLib")