(function (exports,L,covutils,c3) {
	'use strict';

	L = 'default' in L ? L['default'] : L;
	c3 = 'default' in c3 ? c3['default'] : c3;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
	  return typeof obj;
	} : function (obj) {
	  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	};

	var asyncGenerator = function () {
	  function AwaitValue(value) {
	    this.value = value;
	  }

	  function AsyncGenerator(gen) {
	    var front, back;

	    function send(key, arg) {
	      return new Promise(function (resolve, reject) {
	        var request = {
	          key: key,
	          arg: arg,
	          resolve: resolve,
	          reject: reject,
	          next: null
	        };

	        if (back) {
	          back = back.next = request;
	        } else {
	          front = back = request;
	          resume(key, arg);
	        }
	      });
	    }

	    function resume(key, arg) {
	      try {
	        var result = gen[key](arg);
	        var value = result.value;

	        if (value instanceof AwaitValue) {
	          Promise.resolve(value.value).then(function (arg) {
	            resume("next", arg);
	          }, function (arg) {
	            resume("throw", arg);
	          });
	        } else {
	          settle(result.done ? "return" : "normal", result.value);
	        }
	      } catch (err) {
	        settle("throw", err);
	      }
	    }

	    function settle(type, value) {
	      switch (type) {
	        case "return":
	          front.resolve({
	            value: value,
	            done: true
	          });
	          break;

	        case "throw":
	          front.reject(value);
	          break;

	        default:
	          front.resolve({
	            value: value,
	            done: false
	          });
	          break;
	      }

	      front = front.next;

	      if (front) {
	        resume(front.key, front.arg);
	      } else {
	        back = null;
	      }
	    }

	    this._invoke = send;

	    if (typeof gen.return !== "function") {
	      this.return = undefined;
	    }
	  }

	  if (typeof Symbol === "function" && Symbol.asyncIterator) {
	    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
	      return this;
	    };
	  }

	  AsyncGenerator.prototype.next = function (arg) {
	    return this._invoke("next", arg);
	  };

	  AsyncGenerator.prototype.throw = function (arg) {
	    return this._invoke("throw", arg);
	  };

	  AsyncGenerator.prototype.return = function (arg) {
	    return this._invoke("return", arg);
	  };

	  return {
	    wrap: function (fn) {
	      return function () {
	        return new AsyncGenerator(fn.apply(this, arguments));
	      };
	    },
	    await: function (value) {
	      return new AwaitValue(value);
	    }
	  };
	}();

	var classCallCheck = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

	var createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

	var defineProperty = function (obj, key, value) {
	  if (key in obj) {
	    Object.defineProperty(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	};

	var get = function get(object, property, receiver) {
	  if (object === null) object = Function.prototype;
	  var desc = Object.getOwnPropertyDescriptor(object, property);

	  if (desc === undefined) {
	    var parent = Object.getPrototypeOf(object);

	    if (parent === null) {
	      return undefined;
	    } else {
	      return get(parent, property, receiver);
	    }
	  } else if ("value" in desc) {
	    return desc.value;
	  } else {
	    var getter = desc.get;

	    if (getter === undefined) {
	      return undefined;
	    }

	    return getter.call(receiver);
	  }
	};

	var inherits = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	  }

	  subClass.prototype = Object.create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	};

	var possibleConstructorReturn = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return call && (typeof call === "object" || typeof call === "function") ? call : self;
	};

	var slicedToArray = function () {
	  function sliceIterator(arr, i) {
	    var _arr = [];
	    var _n = true;
	    var _d = false;
	    var _e = undefined;

	    try {
	      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
	        _arr.push(_s.value);

	        if (i && _arr.length === i) break;
	      }
	    } catch (err) {
	      _d = true;
	      _e = err;
	    } finally {
	      try {
	        if (!_n && _i["return"]) _i["return"]();
	      } finally {
	        if (_d) throw _e;
	      }
	    }

	    return _arr;
	  }

	  return function (arr, i) {
	    if (Array.isArray(arr)) {
	      return arr;
	    } else if (Symbol.iterator in Object(arr)) {
	      return sliceIterator(arr, i);
	    } else {
	      throw new TypeError("Invalid attempt to destructure non-iterable instance");
	    }
	  };
	}();

	var toConsumableArray = function (arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

	    return arr2;
	  } else {
	    return Array.from(arr);
	  }
	};

	/**
	 * Returns the first child element of parent (fall-back to document if not given)
	 * matching the given selector.
	 * 
	 * @private
	 */
	function $$(selector, parent) {
	  if (typeof parent === 'string') {
	    parent = $$(parent);
	  }
	  parent = parent || document;
	  return parent.querySelector(selector);
	}

	/**
	 * Returns all child elements of parent (fall-back to document if not given)
	 * matching the given selector as an array.
	 * 
	 * @private
	 */
	function $(selector, parent) {
	  if (typeof parent === 'string') {
	    parent = $$(parent);
	  }
	  parent = parent || document;
	  return [].concat(toConsumableArray(parent.querySelectorAll(selector)));
	}

	/**
	 * Turns an HTML string into a DOM element.
	 * The HTML markup must have a single root node not prepended by any whitespace.
	 * 
	 * @example 
	 * var s = '<li>text</li>'
	 * var el = C.HTML(s)
	 * document.body.appendChild(el)
	 * 
	 * @private
	 */
	function HTML(html) {
	  var div = document.createElement('div');
	  div.innerHTML = html;
	  var element = div.firstChild;
	  return element;
	}

	/**
	 * Inject HTML and CSS into the DOM.
	 * 
	 * @param html The html to inject at the end of the body element. Must have a single root node without surrounding whitespace.
	 * @param css The CSS styles to inject at the end of the head element.
	 * 
	 * @private
	 */
	function inject(html, css) {
	  // inject default template and CSS into DOM
	  if (html) {
	    document.body.appendChild(HTML(html));
	  }

	  if (css) {
	    var style = document.createElement('style');
	    style.type = 'text/css';
	    if (style.styleSheet) {
	      style.styleSheet.cssText = css;
	    } else {
	      style.appendChild(document.createTextNode(css));
	    }
	    document.head.appendChild(style);
	  }
	}

	/**
	 * @private
	 */
	function fromTemplate(id) {
	  var node = $$('#' + id);
	  // browsers without <template> support don't wrap everything in .content
	  if ('content' in node) {
	    node = node.content;
	  }
	  return document.importNode(node, true).children[0];
	}

	var DEFAULT_TEMPLATE_ID = 'template-coverage-parameter-discrete-legend';
	var DEFAULT_TEMPLATE = '<template id="' + DEFAULT_TEMPLATE_ID + '">\n  <div class="leaflet-coverage-control legend discrete-legend">\n    <div class="legend-title-container"><strong class="legend-title"></strong></div>\n    <div class="legend-palette discrete-legend-palette"></div>\n  </div>\n</template>';

	/**
	 * Displays a discrete palette legend for the parameter displayed by the given
	 * Coverage layer. Supports category parameters only at the moment.
	 * 
	 * @example <caption>Coverage data layer</caption>
	 * new C.DiscreteLegend(covLayer).addTo(map)
	 * // changing the palette of the layer automatically updates the legend 
	 * covLayer.palette = C.discretePalette(['red', 'blue'])
	 * 
	 * @example <caption>Fake layer</caption>
	 * var fakeLayer = {
	 *   parameter: {
	 *     observedProperty: {
	 *       label: { en: 'Land cover' },
	 *       categories: [{
	 *         label: { en: 'Land' }
	 *       }, {
	 *         label: { en: 'Water' }
	 *       }]
	 *     }
	 *   },
	 *   palette: C.directPalette(['gray', 'blue']) // CSS colors in category order
	 * }
	 * var legend = new C.DiscreteLegend(fakeLayer).addTo(map)
	 * 
	 * // change the palette and trigger a manual update
	 * fakeLayer.palette = C.discretePalette(['red', 'blue'])
	 * legend.update()
	 * 
	 * @extends {L.Control}
	 */
	var DiscreteLegend = function (_L$Control) {
	  inherits(DiscreteLegend, _L$Control);

	  /**
	   * Creates a discrete legend control.
	   * 
	   * @param {object} covLayer 
	   *   The coverage data layer, or any object with <code>palette</code>
	   *   and <code>parameter</code> properties.
	   *   If the object has <code>on</code>/<code>off</code> methods, then the legend will
	   *   listen for <code>"paletteChange"</code> events and update itself automatically.
	   *   If the layer fires a <code>"remove"</code> event, then the legend will remove itself
	   *   from the map. 
	   * @param {object} [options] Legend options.
	   * @param {string} [options.position='bottomright'] The initial position of the control (see Leaflet docs).
	   * @param {string} [options.language] A language tag, indicating the preferred language to use for labels.
	   * @param {string} [options.templateId] Uses the HTML element with the given id as template.
	   */
	  function DiscreteLegend(covLayer) {
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    classCallCheck(this, DiscreteLegend);

	    var _this = possibleConstructorReturn(this, (DiscreteLegend.__proto__ || Object.getPrototypeOf(DiscreteLegend)).call(this, { position: options.position || 'bottomright' }));

	    _this._covLayer = covLayer;
	    _this._templateId = options.templateId || DEFAULT_TEMPLATE_ID;
	    _this._language = options.language;

	    if (!options.templateId && document.getElementById(DEFAULT_TEMPLATE_ID) === null) {
	      inject(DEFAULT_TEMPLATE);
	    }

	    if (covLayer.on) {
	      _this._remove = function () {
	        return _this.remove();
	      };
	      _this._update = function () {
	        return _this._doUpdate(false);
	      };
	      covLayer.on('remove', _this._remove);
	    }
	    return _this;
	  }

	  /**
	   * Triggers a manual update of the legend.
	   * 
	   * Useful if the supplied coverage data layer is not a real layer
	   * and won't fire the necessary events for automatic updates.
	   */


	  createClass(DiscreteLegend, [{
	    key: 'update',
	    value: function update() {
	      this._doUpdate(true);
	    }
	  }, {
	    key: '_doUpdate',
	    value: function _doUpdate(fullUpdate) {
	      var el = this._el;

	      if (fullUpdate) {
	        var _param = this._covLayer.parameter;
	        // if requested language doesn't exist, use the returned one for all other labels
	        this._language = covutils.getLanguageTag(_param.observedProperty.label, this._language);
	        var title = covutils.getLanguageString(_param.observedProperty.label, this._language);
	        $$('.legend-title', el).innerHTML = title;
	      }

	      var palette = this._covLayer.palette;
	      var param = this._covLayer.parameter;

	      var html = '';
	      for (var i = 0; i < palette.steps; i++) {
	        var cat = covutils.getLanguageString(param.observedProperty.categories[i].label, this._language);
	        html += '\n        <i style="background:rgb(' + palette.red[i] + ', ' + palette.green[i] + ', ' + palette.blue[i] + ')"></i>\n        ' + cat + '\n        <br>';
	      }

	      $$('.legend-palette', el).innerHTML = html;
	    }

	    /**
	     * @override
	     * @ignore
	     */

	  }, {
	    key: 'onAdd',
	    value: function onAdd(map) {
	      this._map = map;

	      if (this._covLayer.on) {
	        this._covLayer.on('paletteChange', this._update);
	      }

	      this._el = fromTemplate(this._templateId);
	      this.update();
	      return this._el;
	    }

	    /**
	     * @override
	     * @ignore
	     */

	  }, {
	    key: 'onRemove',
	    value: function onRemove() {
	      if (this._covLayer.off) {
	        this._covLayer.off('remove', this._remove);
	        this._covLayer.off('paletteChange', this._update);
	      }
	    }
	  }]);
	  return DiscreteLegend;
	}(L.Control);

	var DEFAULT_TEMPLATE_ID$1 = 'template-coverage-parameter-continuous-legend';
	var DEFAULT_TEMPLATE$1 = '<template id="' + DEFAULT_TEMPLATE_ID$1 + '">\n  <div class="leaflet-coverage-control legend continuous-legend">\n    <div style="margin-bottom:3px" class="legend-title-container">\n      <strong class="legend-title"></strong>\n    </div>\n    <div style="display: inline-block; height: 144px; float:left">\n      <span style="height: 136px; width: 18px; display: block; margin-top: 9px;" class="legend-palette"></span>\n    </div>\n    <div style="display: inline-block; float:left; height:153px">\n      <table style="height: 100%;">\n        <tr><td style="vertical-align:top"><span class="legend-max"></span> <span class="legend-uom"></span></td></tr>\n        <tr><td><span class="legend-current"></span></td></tr>\n        <tr><td style="vertical-align:bottom"><span class="legend-min"></span> <span class="legend-uom"></span></td></tr>\n      </table>\n    </div>\n  </div>\n</template>';

	/**
	 * Displays a continuous legend for the parameter displayed by the given
	 * coverage data layer.
	 * 
	 * Note that this class should only be used if the palette is continuous
	 * by nature, typically having at least 100-200 color steps.
	 * If there are only a few color steps (e.g. 10), then this class
	 * will still show a continuous legend due to its rendering technique
	 * (CSS gradient based).
	 * 
	 * @example <caption>Coverage data layer</caption>
	 * new C.ContinuousLegend(covLayer).addTo(map)
	 * // changing the palette of the layer automatically updates the legend 
	 * covLayer.palette = C.linearPalette(['blue', 'red'])
	 * 
	 * @example <caption>Fake layer</caption>
	 * var fakeLayer = {
	 *   parameter: {
	 *     observedProperty: {
	 *       label: { en: 'Temperature' }
	 *     },
	 *     unit: {
	 *       symbol: { value: 'K' },
	 *       label: { en: 'Kelvin' }
	 *     }
	 *   },
	 *   palette: linearPalette(['#FFFFFF', '#000000']),
	 *   paletteExtent: [0, 10]
	 * }
	 * var legend = new C.ContinuousLegend(fakeLayer).addTo(map)
	 * 
	 * // change the palette and trigger a manual update
	 * fakeLayer.palette = C.linearPalette(['blue', 'red'])
	 * legend.update()
	 * 
	 * @extends {L.Control}
	 */
	var ContinuousLegend = function (_L$Control) {
	  inherits(ContinuousLegend, _L$Control);

	  /**
	   * Creates a continuous legend control.
	   * 
	   * @param {object} covLayer 
	   *   The coverage data layer, or any object with <code>palette</code>,
	   *   <code>paletteExtent</code>, and <code>parameter</code> properties.
	   *   If the object has <code>on</code>/<code>off</code> methods, then the legend will
	   *   listen for <code>"paletteChange"</code> and <code>"paletteExtentChange"</code>
	   *   events and update itself automatically.
	   *   If the layer fires a <code>"remove"</code> event, then the legend will remove itself
	   *   from the map. 
	   * @param {object} [options] Legend options.
	   * @param {string} [options.position='bottomright'] The initial position of the control (see Leaflet docs).
	   * @param {string} [options.language] A language tag, indicating the preferred language to use for labels.
	   * @param {string} [options.templateId] Uses the HTML element with the given id as template.
	   */
	  function ContinuousLegend(covLayer) {
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    classCallCheck(this, ContinuousLegend);

	    var _this = possibleConstructorReturn(this, (ContinuousLegend.__proto__ || Object.getPrototypeOf(ContinuousLegend)).call(this, { position: options.position || 'bottomright' }));

	    _this._covLayer = covLayer;
	    _this._templateId = options.templateId || DEFAULT_TEMPLATE_ID$1;
	    _this._language = options.language;

	    if (!options.templateId && document.getElementById(DEFAULT_TEMPLATE_ID$1) === null) {
	      inject(DEFAULT_TEMPLATE$1);
	    }

	    if (covLayer.on) {
	      _this._remove = function () {
	        return _this.remove();
	      };
	      _this._update = function () {
	        return _this._doUpdate(false);
	      };
	      covLayer.on('remove', _this._remove);
	    }
	    return _this;
	  }

	  /**
	   * Triggers a manual update of the legend.
	   * 
	   * Useful if the supplied coverage data layer is not a real layer
	   * and won't fire the necessary events for automatic updates.
	   */


	  createClass(ContinuousLegend, [{
	    key: 'update',
	    value: function update() {
	      this._doUpdate(true);
	    }
	  }, {
	    key: '_doUpdate',
	    value: function _doUpdate(fullUpdate) {
	      var el = this._el;

	      if (fullUpdate) {
	        var param = this._covLayer.parameter;
	        // if requested language doesn't exist, use the returned one for all other labels
	        var language = covutils.getLanguageTag(param.observedProperty.label, this._language);
	        var title = covutils.getLanguageString(param.observedProperty.label, language);
	        var unit = covutils.stringifyUnit(param.unit, language);
	        $$('.legend-title', el).innerHTML = title;
	        $('.legend-uom', el).forEach(function (u) {
	          return u.innerHTML = unit;
	        });
	      }

	      var palette = this._covLayer.palette;

	      var _covLayer$paletteExte = slicedToArray(this._covLayer.paletteExtent, 2),
	          low = _covLayer$paletteExte[0],
	          high = _covLayer$paletteExte[1];

	      $$('.legend-min', el).innerHTML = low.toFixed(2);
	      $$('.legend-max', el).innerHTML = high.toFixed(2);

	      var gradient = '';
	      for (var i = 0; i < palette.steps; i++) {
	        if (i > 0) gradient += ',';
	        gradient += 'rgb(' + palette.red[i] + ',' + palette.green[i] + ',' + palette.blue[i] + ')';
	      }

	      $$('.legend-palette', el).style.background = 'transparent linear-gradient(to top, ' + gradient + ') repeat scroll 0% 0%';
	    }

	    /**
	     * @override
	     * @ignore
	     */

	  }, {
	    key: 'onAdd',
	    value: function onAdd(map) {
	      this._map = map;

	      if (this._covLayer.on) {
	        this._covLayer.on('paletteChange', this._update);
	        this._covLayer.on('paletteExtentChange', this._update);
	      }

	      this._el = fromTemplate(this._templateId);
	      this.update();
	      return this._el;
	    }

	    /**
	     * @override
	     * @ignore
	     */

	  }, {
	    key: 'onRemove',
	    value: function onRemove() {
	      if (this._covLayer.off) {
	        this._covLayer.off('remove', this._remove);
	        this._covLayer.off('paletteChange', this._update);
	        this._covLayer.off('paletteExtentChange', this._update);
	      }
	    }
	  }]);
	  return ContinuousLegend;
	}(L.Control);

	/**
	 * Convenience function that returns a legend control
	 * based on the coverage parameter type.
	 * For categorical parameters this returns a {@link DiscreteLegend},
	 * otherwise a {@link ContinuousLegend} instance.
	 * 
	 * Note that custom HTML templates cannot be used with this function.
	 * If this is necessary, consider using the individual legend classes
	 * instead. 
	 * 
	 * @example <caption>Coverage data layer</caption>
	 * var legend = C.legend(covLayer).addTo(map)
	 * 
	 * @example <caption>Fake layer</caption>
	 * // see DiscreteLegend and ContinuousLegend docs
	 * 
	 * @param {object} layer The coverage data layer.
	 * @param {object} [options] Legend options.
	 * @param {string} [options.position='bottomright'] The initial position of the control (see Leaflet docs).
	 * @param {string} [options.language] A language tag, indicating the preferred language to use for labels.
	 * @return {DiscreteLegend|ContinuousLegend}
	 */
	function legend(layer) {
	  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	  options.position = options.position || 'bottomright';
	  if (layer.parameter.observedProperty.categories) {
	    return new DiscreteLegend(layer, options);
	  } else {
	    return new ContinuousLegend(layer, options);
	  }
	}

	var Evented = L.Evented.prototype;

	/**
	 * Wraps Leaflet's {@link L.Evented} for use within class expressions.
	 * 
	 * @see http://justinfagnani.com/2015/12/21/real-mixins-with-javascript-classes/
	 * 
	 * @param {class} base The base class.
	 * @return {class} The base class with Leaflet's {@link L.Evented}.
	 */
	function EventMixin(base) {
	  var clazz = function (_base) {
	    inherits(clazz, _base);

	    function clazz() {
	      classCallCheck(this, clazz);
	      return possibleConstructorReturn(this, (clazz.__proto__ || Object.getPrototypeOf(clazz)).apply(this, arguments));
	    }

	    return clazz;
	  }(base);
	  for (var key in Evented) {
	    clazz.prototype[key] = Evented[key];
	  }
	  return clazz;
	}

	var DEFAULT_TEMPLATE_ID$2 = 'template-coverage-timeaxis';
	var DEFAULT_TEMPLATE$2 = '<template id="' + DEFAULT_TEMPLATE_ID$2 + '">\n<div class="leaflet-coverage-control form-inline" style="clear:none">\n  <strong class="title">Time</strong><br>\n  <div class="form-group">\n    <select name="date" class="date form-control"></select>\n  </div>\n  <div class="form-group">\n    <select name="time" class="time form-control"></select>\n  </div>\n</div>\n</template>';

	/**
	 * The `change` event, signalling that a different time entry has been selected.
	 * 
	 * @typedef {L.Event} TimeAxis#change
	 * @property {Date} time The time that has been selected.
	 */

	/**
	 * Displays a simple date/time picker for a coverage data layer by grouping
	 * time steps into dates and times.
	 * 
	 * @example <caption>Coverage data layer</caption>
	 * new C.TimeAxis(covLayer).addTo(map)
	 * // Selecting a date/time automatically sets the 'time' property in the layer.
	 * // Similarly, when the layer fires an 'axisChange' event with {axis: 'time'}
	 * // the control reflects that change.
	 * 
	 * @example <caption>Fake layer</caption>
	 * var times = ['2000-01-01T00:00:00Z','2000-01-01T05:00:00Z'].map(s => new Date(s))
	 * var fakeLayer = {
	 *   timeSlices: times,
	 *   time: times[1] // select the second time step initially
	 * }
	 * var timeAxis = new C.TimeAxis(fakeLayer).addTo(map)
	 * 
	 * // change the time and trigger a manual update
	 * fakeLayer.time = times[0]
	 * timeAxis.update()
	 * 
	 * @extends {L.Control}
	 * @extends {EventMixin}
	 * 
	 * @emits {TimeAxis#change} when a different time entry has been selected
	 */
	var TimeAxis = function (_EventMixin) {
	  inherits(TimeAxis, _EventMixin);

	  /**
	   * Creates a time axis control.
	   * 
	   * @param {object} covLayer 
	   *   The coverage data layer, or any object with `timeSlices` and `time` properties.
	   *   If the object has `on`/`off` methods, then the control will
	   *   listen for `axisChange` events with `{axis: 'time'}` and update itself automatically.
	   *   If the layer fires a `remove` event, then the control will remove itself from the map.
	   * @param {object} [options] Control options.
	   * @param {string} [options.position='topleft'] The initial position of the control (see Leaflet docs).
	   * @param {string} [options.title='Time'] The label to show above the date/time picker.
	   * @param {string} [options.templateId] Element ID of an alternative HTML `<template>` element to use.
	   */
	  function TimeAxis(covLayer) {
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    classCallCheck(this, TimeAxis);

	    var _this = possibleConstructorReturn(this, (TimeAxis.__proto__ || Object.getPrototypeOf(TimeAxis)).call(this, { position: options.position || 'topleft' }));

	    _this._templateId = options.templateId || DEFAULT_TEMPLATE_ID$2;
	    _this._title = options.title || 'Time';
	    _this._covLayer = covLayer;

	    if (!options.templateId && document.getElementById(DEFAULT_TEMPLATE_ID$2) === null) {
	      inject(DEFAULT_TEMPLATE$2);
	    }

	    if (covLayer.on) {
	      _this._remove = function () {
	        return _this.remove();
	      };
	      covLayer.on('remove', _this._remove);

	      _this._axisListener = function (e) {
	        if (e.axis === 'time') _this.update();
	      };
	    }

	    var timeSlices = _this._covLayer.timeSlices;
	    var dateMap = new Map(); // UTC timestamp (representing the date only) -> array of Date objects
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;

	    try {
	      for (var _iterator = timeSlices[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	        var t = _step.value;

	        var dateTimestamp = new Date(Date.UTC(t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate())).getTime();
	        if (!dateMap.has(dateTimestamp)) {
	          dateMap.set(dateTimestamp, []);
	        }
	        dateMap.get(dateTimestamp).push(t);
	      }
	    } catch (err) {
	      _didIteratorError = true;
	      _iteratorError = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion && _iterator.return) {
	          _iterator.return();
	        }
	      } finally {
	        if (_didIteratorError) {
	          throw _iteratorError;
	        }
	      }
	    }

	    _this._dateMap = dateMap;
	    return _this;
	  }

	  /**
	   * @ignore
	   */


	  createClass(TimeAxis, [{
	    key: 'onAdd',
	    value: function onAdd(map) {
	      var _this2 = this;

	      this._map = map;

	      if (this._covLayer.on) {
	        this._covLayer.on('axisChange', this._axisListener);
	      }

	      var el = fromTemplate(this._templateId);
	      this._el = el;
	      L.DomEvent.disableClickPropagation(el);

	      if (this._title) {
	        $$('.title', el).innerHTML = this._title;
	      }

	      var _iteratorNormalCompletion2 = true;
	      var _didIteratorError2 = false;
	      var _iteratorError2 = undefined;

	      try {
	        for (var _iterator2 = this._dateMap.keys()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	          var dateTimestamp = _step2.value;

	          var dateStr = getUTCDateString(dateTimestamp);
	          $$('.date', el).appendChild(HTML('<option value="' + dateStr + '">' + dateStr + '</option>'));
	        }
	      } catch (err) {
	        _didIteratorError2 = true;
	        _iteratorError2 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion2 && _iterator2.return) {
	            _iterator2.return();
	          }
	        } finally {
	          if (_didIteratorError2) {
	            throw _iteratorError2;
	          }
	        }
	      }

	      $$('.date', el).disabled = this._dateMap.size === 1;

	      $$('.date', el).addEventListener('change', function (event) {
	        var dateTimestamp = getUTCTimestampDateOnly(event.target.value);
	        var timeSlice = _this2._dateMap.get(dateTimestamp)[0];
	        _this2._covLayer.time = timeSlice;
	        _this2._initTimeSelect(dateTimestamp);
	        _this2.fire('change', { time: timeSlice });
	      });
	      $$('.time', el).addEventListener('change', function (event) {
	        var dateStr = $$('.date', el).value;
	        var timeStr = event.target.value;
	        var time = new Date(dateStr + 'T' + timeStr);
	        _this2._covLayer.time = time;
	        _this2.fire('change', { time: time });
	      });

	      this.update();

	      return el;
	    }

	    /**
	     * @ignore
	     */

	  }, {
	    key: 'onRemove',
	    value: function onRemove() {
	      if (this._covLayer.off) {
	        this._covLayer.off('remove', this._remove);
	        this._covLayer.off('axisChange', this._axisListener);
	      }
	    }

	    /**
	     * Triggers a manual update of the date/time picker based on the
	     * `time` property of the layer.
	     * 
	     * Useful if the supplied coverage data layer is not a real layer
	     * and won't fire the necessary events for automatic updates.
	     */

	  }, {
	    key: 'update',
	    value: function update() {
	      var covTime = this._covLayer.time;
	      if (!covTime) return;
	      var el = this._el;
	      // selects the date set in the cov layer, populates the time select, and selects the time
	      var dateTimestamp = getUTCTimestampDateOnly(covTime.toISOString());
	      var dateStr = getUTCDateString(dateTimestamp);
	      $$('.date', el).value = dateStr;

	      this._initTimeSelect(dateTimestamp);

	      var timeStr = covTime.toISOString().substr(11);
	      $$('.time', el).value = timeStr;
	    }
	  }, {
	    key: '_initTimeSelect',
	    value: function _initTimeSelect(dateTimestamp) {
	      var el = this._el;
	      var timeSelect = $$('.time', el);
	      timeSelect.innerHTML = '';
	      var times = this._dateMap.get(dateTimestamp);
	      var _iteratorNormalCompletion3 = true;
	      var _didIteratorError3 = false;
	      var _iteratorError3 = undefined;

	      try {
	        for (var _iterator3 = times[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	          var timeSlice = _step3.value;

	          var timeStr = timeSlice.toISOString().substr(11);
	          timeSelect.appendChild(HTML('<option value="' + timeStr + '">' + timeStr + '</option>'));
	        }
	      } catch (err) {
	        _didIteratorError3 = true;
	        _iteratorError3 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion3 && _iterator3.return) {
	            _iterator3.return();
	          }
	        } finally {
	          if (_didIteratorError3) {
	            throw _iteratorError3;
	          }
	        }
	      }

	      timeSelect.disabled = times.length === 1;
	    }
	  }]);
	  return TimeAxis;
	}(EventMixin(L.Control));

	function getUTCTimestampDateOnly(dateStr) {
	  var year = parseInt(dateStr.substr(0, 4));
	  var month = parseInt(dateStr.substr(5, 2));
	  var day = parseInt(dateStr.substr(8, 2));
	  return Date.UTC(year, month - 1, day);
	}

	function getUTCDateString(timestamp) {
	  var iso = new Date(timestamp).toISOString();
	  var date = iso.substr(0, 10);
	  return date;
	}

	var DEFAULT_TEMPLATE_ID$3 = 'template-coverage-dropdown';
	var DEFAULT_TEMPLATE$3 = '<template id="' + DEFAULT_TEMPLATE_ID$3 + '">\n<div class="leaflet-coverage-control" style="clear:none">\n  <strong class="select-title"></strong><br>\n  <select class="form-control"></select>\n</div>\n</template>';

	/**
	 * The `change` event, signalling that a different dropdown element has been selected.
	 * 
	 * @typedef {L.Event} Dropdown#change
	 * @property {string} value The value of the selected item.
	 */

	/**
	 * An event-enabled dropdown control with optional title.
	 * 
	 * Used in {@link VerticalAxis}.
	 * 
	 * @extends {L.Control}
	 * @extends {EventMixin}
	 * 
	 * @emits {Dropdown#change} when a different dropdown element has been selected
	 */
	var Dropdown = function (_EventMixin) {
	  inherits(Dropdown, _EventMixin);

	  /**
	   * @param {Array<Object>} choices The dropdown items given as an array of `{value, label}` objects.
	   * @param {Object} [options] The options object.
	   * @param {string} [options.position='topleft'] The position of the control (one of the map corners).
	   *    Possible values are 'topleft', 'topright', 'bottomleft' or 'bottomright'.
	   * @param {string} [options.title] The dropdown title that is displayed above the dropdown.
	   * @param {string} [options.value] Value of the item that should be initially selected.
	   * @param {string} [options.templateId] Element ID of an alternative HTML `<template>` element to use.
	   */
	  function Dropdown(choices) {
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    classCallCheck(this, Dropdown);

	    var _this = possibleConstructorReturn(this, (Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).call(this, options.position ? { position: options.position } : { position: 'topleft' }));

	    _this._templateId = options.templateId || DEFAULT_TEMPLATE_ID$3;
	    _this._title = options.title || '';
	    _this._choices = choices;
	    _this._value = options.value || choices[0].value;

	    if (!options.templateId && document.getElementById(DEFAULT_TEMPLATE_ID$3) === null) {
	      inject(DEFAULT_TEMPLATE$3);
	    }
	    return _this;
	  }

	  /**
	   * @override
	   * @ignore
	   */


	  createClass(Dropdown, [{
	    key: 'onAdd',
	    value: function onAdd(map) {
	      var _this2 = this;

	      var el = fromTemplate(this._templateId);
	      this._el = el;

	      L.DomEvent.disableClickPropagation(el);

	      $$('.select-title', el).innerHTML = this._title;

	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = this._choices[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var _step$value = _step.value,
	              value = _step$value.value,
	              label = _step$value.label;

	          $$('select', el).appendChild(HTML('<option value="' + value + '">' + label + '</option>'));
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }

	      $$('select', el).disabled = this._choices.length <= 1;
	      this.value = this._value;

	      $$('select', el).addEventListener('change', function (event) {
	        _this2._value = event.target.value;
	        _this2.fire('change', { value: event.target.value });
	      });

	      return el;
	    }

	    /** 
	     * Returns the value of the currently selected item.
	     * 
	     * @type {string}
	     * 
	     * @example
	     * let current = dropdown.value
	     */

	  }, {
	    key: 'value',
	    get: function get() {
	      return this._value;
	    }

	    /** 
	     * Selects the item with the given value.
	     * 
	     * @type {string}
	     * 
	     * @example
	     * dropdown.value = 'foobar'
	     */
	    ,
	    set: function set(val) {
	      $$('select', this._el).value = val;
	    }
	  }]);
	  return Dropdown;
	}(EventMixin(L.Control));

	/**
	 * The `change` event, signalling that a different vertical coordinate value has been selected.
	 * 
	 * @typedef {L.Event} VerticalAxis#change
	 * @property {number} vertical The vertical coordinate value that has been selected.
	 */

	/**
	 * Displays a simple vertical coordinate dropdown selector for a coverage data layer.
	 * 
	 * @example <caption>Coverage data layer</caption>
	 * new C.VerticalAxis(covLayer).addTo(map)
	 * // Selecting a vertical coordinate automatically sets the 'vertical' property in the layer.
	 * // Similarly, when the layer fires an 'axisChange' event with {axis: 'vertical'}
	 * // the control reflects that change.
	 * 
	 * @example <caption>Fake layer</caption>
	 * var heights = [0,10,20,50,100,500,1000]
	 * var fakeLayer = {
	 *   verticalSlices: heights,
	 *   vertical: heights[1], // select the second height step initially
	 *   crsVerticalAxis: {
	 *     name: { 
	 *       en: 'Gravity-related height'
	 *     },
	 *     unit: {
	 *       symbol: 'm'
	 *     }
	 *   }
	 * }
	 * var verticalAxis = new C.VerticalAxis(fakeLayer).addTo(map)
	 * 
	 * // change the height and trigger a manual update
	 * fakeLayer.vertical = heights[0]
	 * verticalAxis.update()
	 * 
	 * @extends {L.Layer}
	 * 
	 * @emits {VerticalAxis#change} when a different entry has been selected
	 */
	var VerticalAxis = function (_L$Layer) {
	  inherits(VerticalAxis, _L$Layer);

	  /**
	   * Creates a vertical axis control.
	   * 
	   * @param {object} covLayer 
	   *   The coverage data layer, or any object with `verticalSlices`
	   *   and `vertical` properties, optionally `crsVerticalAxis` property.
	   *   If the object has `on`/`off` methods, then the control will
	   *   listen for `axisChange` events with `{axis: 'vertical'}`
	   *   and update itself automatically.
	   *   If the layer fires a `remove` event, then the control will remove itself
	   *   from the map.
	   * @param {object} [options] Control options.
	   * @param {string} [options.position='topleft'] The initial position of the control (see Leaflet docs).
	   * @param {string} [options.title='Vertical'] 
	   *   The label to show above the control if `covLayer.crsVerticalAxis.name` is missing.
	   * @param {string} [options.templateId] Element ID of an alternative HTML `<template>` element to use. 
	   */
	  function VerticalAxis(covLayer) {
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    classCallCheck(this, VerticalAxis);

	    var _this = possibleConstructorReturn(this, (VerticalAxis.__proto__ || Object.getPrototypeOf(VerticalAxis)).call(this));

	    _this._templateId = options.templateId;
	    _this._covLayer = covLayer;
	    _this._title = options.title || 'Vertical';
	    _this._position = options.position || 'topleft';

	    if (covLayer.on) {
	      _this._remove = function () {
	        return _this.remove();
	      };
	      covLayer.on('remove', _this._remove);

	      _this._axisListener = function (e) {
	        if (e.axis === 'vertical') _this.update();
	      };
	    }
	    return _this;
	  }

	  /**
	   * @ignore
	   * @override
	   */


	  createClass(VerticalAxis, [{
	    key: 'onAdd',
	    value: function onAdd(map) {
	      var _this2 = this;

	      this._map = map;

	      if (this._covLayer.on) {
	        this._covLayer.on('axisChange', this._axisListener);
	      }

	      var crsVertAxis = this._covLayer.crsVerticalAxis || {};
	      var title = crsVertAxis.name ? covutils.getLanguageString(crsVertAxis.name) : this._title;
	      var unit = covutils.stringifyUnit(crsVertAxis.unit);
	      if (unit) {
	        unit = ' ' + unit;
	      }

	      var choices = [];
	      var vals = this._covLayer.verticalSlices;
	      for (var i = 0; i < vals.length; i++) {
	        choices.push({
	          value: i.toString(),
	          label: vals[i] + unit
	        });
	      }

	      this._dropdown = new Dropdown(choices, {
	        templateId: this._templateId,
	        position: this._position,
	        title: title,
	        value: this._getVerticalIndex().toString()
	      }).on('change', function (event) {
	        var i = parseInt(event.value);
	        var val = _this2._covLayer.verticalSlices[i];
	        _this2._covLayer.vertical = val;
	        _this2.fire('change', { vertical: val });
	      }).addTo(map);
	    }

	    /**
	     * @ignore
	     * @override
	     */

	  }, {
	    key: 'onRemove',
	    value: function onRemove(map) {
	      this._dropdown.remove();
	      if (this._covLayer.off) {
	        this._covLayer.off('remove', this._remove);
	        this._covLayer.off('axisChange', this._axisListener);
	      }
	    }
	  }, {
	    key: '_getVerticalIndex',
	    value: function _getVerticalIndex() {
	      var vals = this._covLayer.verticalSlices;
	      var i = vals.indexOf(this._covLayer.vertical);
	      return i;
	    }

	    /**
	     * Triggers a manual update of the vertical axis control based on the
	     * `vertical` property of the layer.
	     * 
	     * Useful if the supplied coverage data layer is not a real layer
	     * and won't fire the necessary events for automatic updates.
	     */

	  }, {
	    key: 'update',
	    value: function update() {
	      var i = this._getVerticalIndex();
	      this._dropdown.value = i.toString();
	    }
	  }]);
	  return VerticalAxis;
	}(L.Layer);

	function interopDefault(ex) {
		return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var iota = createCommonjsModule(function (module) {
	"use strict"

	function iota(n) {
	  var result = new Array(n)
	  for(var i=0; i<n; ++i) {
	    result[i] = i
	  }
	  return result
	}

	module.exports = iota
	});

	var iota$1 = interopDefault(iota);


	var require$$1 = Object.freeze({
	  default: iota$1
	});

	var index = createCommonjsModule(function (module) {
	/*!
	 * Determine if an object is a Buffer
	 *
	 * @author   Feross Aboukhadijeh <https://feross.org>
	 * @license  MIT
	 */

	// The _isBuffer check is for Safari 5-7 support, because it's missing
	// Object.prototype.constructor. Remove this eventually
	module.exports = function (obj) {
	  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
	}

	function isBuffer (obj) {
	  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
	}

	// For Node v0.10 support. Remove this eventually.
	function isSlowBuffer (obj) {
	  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
	}
	});

	var index$1 = interopDefault(index);


	var require$$0 = Object.freeze({
	  default: index$1
	});

	var ndarray = createCommonjsModule(function (module) {
	var iota = interopDefault(require$$1)
	var isBuffer = interopDefault(require$$0)

	var hasTypedArrays  = ((typeof Float64Array) !== "undefined")

	function compare1st(a, b) {
	  return a[0] - b[0]
	}

	function order() {
	  var stride = this.stride
	  var terms = new Array(stride.length)
	  var i
	  for(i=0; i<terms.length; ++i) {
	    terms[i] = [Math.abs(stride[i]), i]
	  }
	  terms.sort(compare1st)
	  var result = new Array(terms.length)
	  for(i=0; i<result.length; ++i) {
	    result[i] = terms[i][1]
	  }
	  return result
	}

	function compileConstructor(dtype, dimension) {
	  var className = ["View", dimension, "d", dtype].join("")
	  if(dimension < 0) {
	    className = "View_Nil" + dtype
	  }
	  var useGetters = (dtype === "generic")

	  if(dimension === -1) {
	    //Special case for trivial arrays
	    var code =
	      "function "+className+"(a){this.data=a;};\
var proto="+className+".prototype;\
proto.dtype='"+dtype+"';\
proto.index=function(){return -1};\
proto.size=0;\
proto.dimension=-1;\
proto.shape=proto.stride=proto.order=[];\
proto.lo=proto.hi=proto.transpose=proto.step=\
function(){return new "+className+"(this.data);};\
proto.get=proto.set=function(){};\
proto.pick=function(){return null};\
return function construct_"+className+"(a){return new "+className+"(a);}"
	    var procedure = new Function(code)
	    return procedure()
	  } else if(dimension === 0) {
	    //Special case for 0d arrays
	    var code =
	      "function "+className+"(a,d) {\
this.data = a;\
this.offset = d\
};\
var proto="+className+".prototype;\
proto.dtype='"+dtype+"';\
proto.index=function(){return this.offset};\
proto.dimension=0;\
proto.size=1;\
proto.shape=\
proto.stride=\
proto.order=[];\
proto.lo=\
proto.hi=\
proto.transpose=\
proto.step=function "+className+"_copy() {\
return new "+className+"(this.data,this.offset)\
};\
proto.pick=function "+className+"_pick(){\
return TrivialArray(this.data);\
};\
proto.valueOf=proto.get=function "+className+"_get(){\
return "+(useGetters ? "this.data.get(this.offset)" : "this.data[this.offset]")+
	"};\
proto.set=function "+className+"_set(v){\
return "+(useGetters ? "this.data.set(this.offset,v)" : "this.data[this.offset]=v")+"\
};\
return function construct_"+className+"(a,b,c,d){return new "+className+"(a,d)}"
	    var procedure = new Function("TrivialArray", code)
	    return procedure(CACHED_CONSTRUCTORS[dtype][0])
	  }

	  var code = ["'use strict'"]

	  //Create constructor for view
	  var indices = iota(dimension)
	  var args = indices.map(function(i) { return "i"+i })
	  var index_str = "this.offset+" + indices.map(function(i) {
	        return "this.stride[" + i + "]*i" + i
	      }).join("+")
	  var shapeArg = indices.map(function(i) {
	      return "b"+i
	    }).join(",")
	  var strideArg = indices.map(function(i) {
	      return "c"+i
	    }).join(",")
	  code.push(
	    "function "+className+"(a," + shapeArg + "," + strideArg + ",d){this.data=a",
	      "this.shape=[" + shapeArg + "]",
	      "this.stride=[" + strideArg + "]",
	      "this.offset=d|0}",
	    "var proto="+className+".prototype",
	    "proto.dtype='"+dtype+"'",
	    "proto.dimension="+dimension)

	  //view.size:
	  code.push("Object.defineProperty(proto,'size',{get:function "+className+"_size(){\
return "+indices.map(function(i) { return "this.shape["+i+"]" }).join("*"),
	"}})")

	  //view.order:
	  if(dimension === 1) {
	    code.push("proto.order=[0]")
	  } else {
	    code.push("Object.defineProperty(proto,'order',{get:")
	    if(dimension < 4) {
	      code.push("function "+className+"_order(){")
	      if(dimension === 2) {
	        code.push("return (Math.abs(this.stride[0])>Math.abs(this.stride[1]))?[1,0]:[0,1]}})")
	      } else if(dimension === 3) {
	        code.push(
	"var s0=Math.abs(this.stride[0]),s1=Math.abs(this.stride[1]),s2=Math.abs(this.stride[2]);\
if(s0>s1){\
if(s1>s2){\
return [2,1,0];\
}else if(s0>s2){\
return [1,2,0];\
}else{\
return [1,0,2];\
}\
}else if(s0>s2){\
return [2,0,1];\
}else if(s2>s1){\
return [0,1,2];\
}else{\
return [0,2,1];\
}}})")
	      }
	    } else {
	      code.push("ORDER})")
	    }
	  }

	  //view.set(i0, ..., v):
	  code.push(
	"proto.set=function "+className+"_set("+args.join(",")+",v){")
	  if(useGetters) {
	    code.push("return this.data.set("+index_str+",v)}")
	  } else {
	    code.push("return this.data["+index_str+"]=v}")
	  }

	  //view.get(i0, ...):
	  code.push("proto.get=function "+className+"_get("+args.join(",")+"){")
	  if(useGetters) {
	    code.push("return this.data.get("+index_str+")}")
	  } else {
	    code.push("return this.data["+index_str+"]}")
	  }

	  //view.index:
	  code.push(
	    "proto.index=function "+className+"_index(", args.join(), "){return "+index_str+"}")

	  //view.hi():
	  code.push("proto.hi=function "+className+"_hi("+args.join(",")+"){return new "+className+"(this.data,"+
	    indices.map(function(i) {
	      return ["(typeof i",i,"!=='number'||i",i,"<0)?this.shape[", i, "]:i", i,"|0"].join("")
	    }).join(",")+","+
	    indices.map(function(i) {
	      return "this.stride["+i + "]"
	    }).join(",")+",this.offset)}")

	  //view.lo():
	  var a_vars = indices.map(function(i) { return "a"+i+"=this.shape["+i+"]" })
	  var c_vars = indices.map(function(i) { return "c"+i+"=this.stride["+i+"]" })
	  code.push("proto.lo=function "+className+"_lo("+args.join(",")+"){var b=this.offset,d=0,"+a_vars.join(",")+","+c_vars.join(","))
	  for(var i=0; i<dimension; ++i) {
	    code.push(
	"if(typeof i"+i+"==='number'&&i"+i+">=0){\
d=i"+i+"|0;\
b+=c"+i+"*d;\
a"+i+"-=d}")
	  }
	  code.push("return new "+className+"(this.data,"+
	    indices.map(function(i) {
	      return "a"+i
	    }).join(",")+","+
	    indices.map(function(i) {
	      return "c"+i
	    }).join(",")+",b)}")

	  //view.step():
	  code.push("proto.step=function "+className+"_step("+args.join(",")+"){var "+
	    indices.map(function(i) {
	      return "a"+i+"=this.shape["+i+"]"
	    }).join(",")+","+
	    indices.map(function(i) {
	      return "b"+i+"=this.stride["+i+"]"
	    }).join(",")+",c=this.offset,d=0,ceil=Math.ceil")
	  for(var i=0; i<dimension; ++i) {
	    code.push(
	"if(typeof i"+i+"==='number'){\
d=i"+i+"|0;\
if(d<0){\
c+=b"+i+"*(a"+i+"-1);\
a"+i+"=ceil(-a"+i+"/d)\
}else{\
a"+i+"=ceil(a"+i+"/d)\
}\
b"+i+"*=d\
}")
	  }
	  code.push("return new "+className+"(this.data,"+
	    indices.map(function(i) {
	      return "a" + i
	    }).join(",")+","+
	    indices.map(function(i) {
	      return "b" + i
	    }).join(",")+",c)}")

	  //view.transpose():
	  var tShape = new Array(dimension)
	  var tStride = new Array(dimension)
	  for(var i=0; i<dimension; ++i) {
	    tShape[i] = "a[i"+i+"]"
	    tStride[i] = "b[i"+i+"]"
	  }
	  code.push("proto.transpose=function "+className+"_transpose("+args+"){"+
	    args.map(function(n,idx) { return n + "=(" + n + "===undefined?" + idx + ":" + n + "|0)"}).join(";"),
	    "var a=this.shape,b=this.stride;return new "+className+"(this.data,"+tShape.join(",")+","+tStride.join(",")+",this.offset)}")

	  //view.pick():
	  code.push("proto.pick=function "+className+"_pick("+args+"){var a=[],b=[],c=this.offset")
	  for(var i=0; i<dimension; ++i) {
	    code.push("if(typeof i"+i+"==='number'&&i"+i+">=0){c=(c+this.stride["+i+"]*i"+i+")|0}else{a.push(this.shape["+i+"]);b.push(this.stride["+i+"])}")
	  }
	  code.push("var ctor=CTOR_LIST[a.length+1];return ctor(this.data,a,b,c)}")

	  //Add return statement
	  code.push("return function construct_"+className+"(data,shape,stride,offset){return new "+className+"(data,"+
	    indices.map(function(i) {
	      return "shape["+i+"]"
	    }).join(",")+","+
	    indices.map(function(i) {
	      return "stride["+i+"]"
	    }).join(",")+",offset)}")

	  //Compile procedure
	  var procedure = new Function("CTOR_LIST", "ORDER", code.join("\n"))
	  return procedure(CACHED_CONSTRUCTORS[dtype], order)
	}

	function arrayDType(data) {
	  if(isBuffer(data)) {
	    return "buffer"
	  }
	  if(hasTypedArrays) {
	    switch(Object.prototype.toString.call(data)) {
	      case "[object Float64Array]":
	        return "float64"
	      case "[object Float32Array]":
	        return "float32"
	      case "[object Int8Array]":
	        return "int8"
	      case "[object Int16Array]":
	        return "int16"
	      case "[object Int32Array]":
	        return "int32"
	      case "[object Uint8Array]":
	        return "uint8"
	      case "[object Uint16Array]":
	        return "uint16"
	      case "[object Uint32Array]":
	        return "uint32"
	      case "[object Uint8ClampedArray]":
	        return "uint8_clamped"
	      case "[object BigInt64Array]":
	        return "bigint64"
	      case "[object BigUint64Array]":
	        return "biguint64"
	    }
	  }
	  if(Array.isArray(data)) {
	    return "array"
	  }
	  return "generic"
	}

	var CACHED_CONSTRUCTORS = {
	  "float32":[],
	  "float64":[],
	  "int8":[],
	  "int16":[],
	  "int32":[],
	  "uint8":[],
	  "uint16":[],
	  "uint32":[],
	  "array":[],
	  "uint8_clamped":[],
	  "bigint64": [],
	  "biguint64": [],
	  "buffer":[],
	  "generic":[]
	}

	;(function() {
	  for(var id in CACHED_CONSTRUCTORS) {
	    CACHED_CONSTRUCTORS[id].push(compileConstructor(id, -1))
	  }
	});

	function wrappedNDArrayCtor(data, shape, stride, offset) {
	  if(data === undefined) {
	    var ctor = CACHED_CONSTRUCTORS.array[0]
	    return ctor([])
	  } else if(typeof data === "number") {
	    data = [data]
	  }
	  if(shape === undefined) {
	    shape = [ data.length ]
	  }
	  var d = shape.length
	  if(stride === undefined) {
	    stride = new Array(d)
	    for(var i=d-1, sz=1; i>=0; --i) {
	      stride[i] = sz
	      sz *= shape[i]
	    }
	  }
	  if(offset === undefined) {
	    offset = 0
	    for(var i=0; i<d; ++i) {
	      if(stride[i] < 0) {
	        offset -= (shape[i]-1)*stride[i]
	      }
	    }
	  }
	  var dtype = arrayDType(data)
	  var ctor_list = CACHED_CONSTRUCTORS[dtype]
	  while(ctor_list.length <= d+1) {
	    ctor_list.push(compileConstructor(dtype, ctor_list.length-1))
	  }
	  var ctor = ctor_list[d+1]
	  return ctor(data, shape, stride, offset)
	}

	module.exports = wrappedNDArrayCtor
	});

	var ndarray$1 = interopDefault(ndarray);

	/**
	 * The `change` event, signalling that a different vertical coordinate value has been selected.
	 * 
	 * @typedef {Object} Palette
	 * @property {number} steps The number of colors in the palette.
	 * @property {Array<number>} red Array of integers in [0,255] of length `steps`.
	 * @property {Array<number>} green Array of integers in [0,255] of length `steps`.
	 * @property {Array<number>} blue Array of integers in [0,255] of length `steps`.
	 */

	/**
	 * Returns a linearly interpolated palette out of CSS colors.
	 * 
	 * @example
	 * var grayscale = C.linearPalette(['#FFFFFF', '#000000'])
	 * var rainbow = C.linearPalette(['#0000FF', '#00FFFF', '#00FF00', '#FFFF00', '#FF0000'])
	 * 
	 * @param {Array<string>} colors An array of CSS colors.
	 * @param {number} [steps=256] The number of palette colors to generate.
	 * @return {Palette}
	 */
	function linearPalette(colors) {
	  var steps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 256;

	  if (steps === 1) {
	    // work-around, a gradient with 1 pixel becomes black otherwise
	    return directPalette([colors[0]]);
	  }
	  // draw the gradient in a canvas
	  var canvas = document.createElement('canvas');
	  canvas.width = steps;
	  canvas.height = 1;
	  var ctx = canvas.getContext('2d');
	  var gradient = ctx.createLinearGradient(0, 0, steps - 1, 0);
	  var num = colors.length;
	  for (var i = 0; i < num; i++) {
	    gradient.addColorStop(i / (num - 1), colors[i]);
	  }
	  ctx.fillStyle = gradient;
	  ctx.fillRect(0, 0, steps, 1);

	  // now read back values into arrays
	  var red = new Uint8Array(steps);
	  var green = new Uint8Array(steps);
	  var blue = new Uint8Array(steps);

	  var pix = ctx.getImageData(0, 0, steps, 1).data;
	  for (var _i = 0, j = 0; _i < pix.length; _i += 4, j++) {
	    red[j] = pix[_i];
	    green[j] = pix[_i + 1];
	    blue[j] = pix[_i + 2];
	  }

	  return {
	    steps: red.length,
	    red: red,
	    green: green,
	    blue: blue
	  };
	}

	/**
	 * Converts an array of CSS colors to a palette of the same size.
	 * 
	 * @example
	 * var bw = C.directPalette(['#000000', '#FFFFFF'])
	 * // bw.steps == 2
	 * 
	 * @param {Array<string>} colors An array of CSS colors.
	 * @return {Palette}
	 */
	function directPalette(colors) {
	  var canvas = document.createElement('canvas');
	  canvas.width = 1;
	  canvas.height = 1;
	  var ctx = canvas.getContext('2d');

	  var steps = colors.length;

	  var red = new Uint8Array(steps);
	  var green = new Uint8Array(steps);
	  var blue = new Uint8Array(steps);

	  for (var i = 0; i < colors.length; i++) {
	    ctx.fillStyle = colors[i];
	    ctx.fillRect(0, 0, 1, 1);
	    var pix = ctx.getImageData(0, 0, 1, 1).data;
	    red[i] = pix[0];
	    green[i] = pix[1];
	    blue[i] = pix[2];
	  }

	  return {
	    steps: red.length,
	    red: red,
	    green: green,
	    blue: blue
	  };
	}

	/**
	 * Converts any CSS color to an `{r,g,b}` object.
	 * 
	 * @param {string} cssColor The CSS color
	 * @return {Object} An object with r,g,b members with each a number in [0,255].
	 * 
	 * @example
	 * let rgb = cssToRGB('white') // {r: 255, g: 255, b: 255}
	 */
	function cssToRGB(cssColor) {
	  var palette = directPalette([cssColor]);
	  return {
	    r: palette.red[0],
	    g: palette.green[0],
	    b: palette.blue[0]
	  };
	}

	/**
	 * Create a palette from a description object.
	 * 
	 * Currently, two forms are supported:
	 * 
	 * {
	 *   "colors": ["red", "blue", ..]
	 *   "interpolation": "linear",
	 *   "steps": 200
	 * }
	 * 
	 * {
	 *   "colors": ["red", "blue", ..]
	 * }
	 * 
	 * @return {Palette}
	 */
	function paletteFromObject(paletteSpec) {
	  if (!paletteSpec) {
	    return;
	  }
	  var colors = paletteSpec.colors;
	  var palette = void 0;
	  if (paletteSpec.interpolation === 'linear') {
	    palette = linearPalette(colors, paletteSpec.steps);
	  } else {
	    palette = directPalette(colors);
	  }
	  return palette;
	}

	/**
	 * Linearly scales a value to a given palette and value extent.
	 * 
	 * @example
	 * var value = 20
	 * var grayscale = C.linearPalette(['#FFFFFF', '#000000'], 50) // 50 steps
	 * var scaled = C.scale(value, grayscale, [0,100])
	 * // scaled == 10
	 * 
	 * @param {number} val The value to scale.
	 * @param {object} palette The palette onto which the value is scaled.
	 * @param {Array} extent The lower and upper bound within which the value is scaled,
	 *   typically the value extent of a legend.
	 * @return {number} The scaled value.
	 * 
	 * @private
	 */
	function scale(val, palette, extent) {
	  // scale val to [0,paletteSize-1] using the palette extent
	  // (IDL bytscl formula: http://www.exelisvis.com/docs/BYTSCL.html)
	  var scaled = Math.trunc((palette.steps - 1 + 0.9999) * (val - extent[0]) / (extent[1] - extent[0]));
	  return scaled;
	}

	/**
	 * Return enlarged extent if start and end are the same value,
	 * otherwise return unchanged.
	 * 
	 * @param {Array<number>} extent The extent [min,max] to enlarge.
	 * @param {number} [amount] The ratio by which to extend on each side.
	 * @return {Array<number>} The enlarged extent.
	 * 
	 * @private
	 */
	function enlargeExtentIfEqual(extent) {
	  var amount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.1;

	  if (extent[0] === extent[1]) {
	    var buffer = extent[0] * amount;
	    return [extent[0] - buffer, extent[1] + buffer];
	  } else {
	    return extent;
	  }
	}

	/**
	 * Manages palettes under common names.
	 *  
	 * @example
	 * var palettes = new C.PaletteManager({defaultSteps: 10})
	 * palettes.addLinear('grayscale', ['#FFFFFF', '#000000']) // 10 steps
	 * palettes.addLinear('grayscalehd', ['#FFFFFF', '#000000'], {steps: 200}) // high-resolution palette
	 * palettes.add('breweroranges3', ['#fee6ce', '#fdae6b', '#e6550d']) // palette of those 3 colors
	 * palettes.add('mycustom', {red: [0,255], green: [0,0], blue: [10,20]}) // different syntax
	 */
	var PaletteManager = function () {

	  /**
	   * @param {Integer} defaultSteps The default number of steps when adding palettes with addLinear().
	   */
	  function PaletteManager() {
	    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	        _ref$defaultSteps = _ref.defaultSteps,
	        defaultSteps = _ref$defaultSteps === undefined ? 256 : _ref$defaultSteps;

	    classCallCheck(this, PaletteManager);

	    this._defaultSteps = defaultSteps;
	    this._palettes = new Map();
	  }

	  /**
	   * Store a supplied generic palette under the given name.
	   * 
	   * @example
	   * var palettes = new C.PaletteManager()
	   * palettes.add('breweroranges3', ['#fee6ce', '#fdae6b', '#e6550d']) // palette of those 3 colors
	   * palettes.add('mycustom', {red: [0,255], green: [0,0], blue: [10,20]}) // different syntax
	   * 
	   * @param {string} name The unique name of the palette.
	   * @param {Palette|Array<string>} palette A palette object or an array of CSS colors.
	   */


	  createClass(PaletteManager, [{
	    key: 'add',
	    value: function add(name, palette) {
	      if (Array.isArray(palette)) {
	        palette = directPalette(palette);
	      }

	      if (![palette.red, palette.green, palette.blue].every(function (arr) {
	        return arr.length === palette.red.length;
	      })) {
	        throw new Error('The red, green, blue arrays of the palette must be of equal lengths');
	      }
	      if (!(palette.red instanceof Uint8Array)) {
	        palette.red = _asUint8Array(palette.red);
	        palette.green = _asUint8Array(palette.green);
	        palette.blue = _asUint8Array(palette.blue);
	      }
	      palette.steps = palette.red.length; // for convenience in clients
	      this._palettes.set(name, palette);
	    }

	    /**
	     * Store a linear palette under the given name created with the given CSS color specifications.
	     * 
	     * @example
	     * var palettes = new C.PaletteManager()
	     * palettes.addLinear('grayscale', ['#FFFFFF', '#000000']) // 10 steps
	     * palettes.addLinear('grayscalehd', ['#FFFFFF', '#000000'], {steps: 200})
	     * 
	     * @param {String} name The unique name of the palette
	     * @param {Array<string>} colors An array of CSS color specifications
	     * @param {number} steps Use a different number of steps than the default of this manager.
	     */

	  }, {
	    key: 'addLinear',
	    value: function addLinear(name, colors) {
	      var _ref2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
	          steps = _ref2.steps;

	      this.add(name, linearPalette(colors, steps ? steps : this._defaultSteps));
	    }

	    /**
	     * Return the palette stored under the given name, or throw an error if not found.
	     * The palette is an object with properties steps, red, green, and blue.
	     * Each of the color arrays is an Uint8Array of length steps.
	     * 
	     * @param {string} name The unique name of the palette
	     * @returns {Palette}
	     */

	  }, {
	    key: 'get',
	    value: function get(name) {
	      var palette = this._palettes.get(name);
	      if (palette === undefined) {
	        throw new Error('Palette "' + name + '" not found');
	      }
	      return palette;
	    }
	  }, {
	    key: Symbol.iterator,
	    get: function get() {
	      return this._palettes[Symbol.iterator];
	    }
	  }]);
	  return PaletteManager;
	}();

	function _asUint8Array(arr) {
	  var ta = new Uint8Array(arr.length);
	  for (var i = 0; i < arr.length; i++) {
	    var val = arr[i];
	    if (val < 0 || val > 255) {
	      throw new Error('Array value must be within [0,255], but is: ' + val);
	    }
	    ta[i] = val;
	  }
	  return ta;
	}

	var DEFAULT_CONTINUOUS_PALETTE = function DEFAULT_CONTINUOUS_PALETTE() {
	  return linearPalette(['#deebf7', '#3182bd']);
	}; // blues
	var DEFAULT_CATEGORICAL_PALETTE = function DEFAULT_CATEGORICAL_PALETTE(n) {
	  if (n > 12) {
	    throw new Error('not enough built-in categorical colors, must supply custom colors');
	  }
	  return directPalette(['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99', '#e31a1c', '#fdbf6f', '#ff7f00', '#cab2d6', '#6a3d9a', '#ffff99', '#b15928'].slice(0, n));
	};

	/**
	 * The `paletteChange` event, signalling that the palette has changed.
	 * 
	 * @typedef {L.Event} PaletteMixin#paletteChange
	 */

	/**
	 * The `paletteExtentChange` event, signalling that the palette extent has changed.
	 * 
	 * @typedef {L.Event} PaletteMixin#paletteExtentChange
	 */

	/**
	 * A mixin that encapsulates the palette logic of a coverage layer,
	 * supporting categorical and continuous coverage parameters.
	 * 
	 * The following functions/properties are supplied:
	 * 
	 * - initializePalette() - to be called once data has been loaded so that computePaletteExtent can be called
	 * - get/set palette
	 * - get/set paletteExtent
	 * - setPaletteExtent(extent) - like set paletteExtent, but returns a Promise to know when calculations etc. are done
	 * - getPaletteIndex(val) - returns the color index for the given value
	 * 
	 * The base class must supply the following functions/properties:
	 * 
	 * - options.palette (optional)
	 * - options.paletteExtent (optional) - initial value that computePaletteExtent is called with
	 * - parameter
	 * - redraw()
	 * - computePaletteExtent(extent) - returns a Promise with the computed extent; gets called when .paletteExtent is set to a string value
	 * - canUsePalette() (optional) - if this method exists and returns false, then .palette returns undefined
	 * 
	 * @param {class} base The base class.
	 * @return {class} The base class with PaletteMixin.
	 */
	function PaletteMixin(base) {
	  return function (_base) {
	    inherits(_class, _base);

	    function _class() {
	      classCallCheck(this, _class);
	      return possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
	    }

	    createClass(_class, [{
	      key: 'initializePalette',
	      value: function initializePalette() {
	        var _this2 = this;

	        var options = this.options;
	        var parameter = this.parameter;
	        if (!parameter) {
	          return Promise.resolve();
	        }
	        var categories = parameter.observedProperty.categories;

	        if (categories) {
	          this._initCategoryIdxMap();
	        }

	        if (this._palette) {
	          // do nothing, already set
	        } else if (options.palette) {
	          this._palette = options.palette;
	        } else if (parameter.preferredPalette) {
	          this._palette = paletteFromObject(parameter.preferredPalette);
	        } else if (categories) {
	          if (categories.every(function (cat) {
	            return cat.preferredColor;
	          })) {
	            this._palette = directPalette(categories.map(function (cat) {
	              return cat.preferredColor;
	            }));
	          } else {
	            this._palette = DEFAULT_CATEGORICAL_PALETTE(categories.length);
	          }
	        } else {
	          this._palette = DEFAULT_CONTINUOUS_PALETTE();
	        }

	        if (categories && categories.length !== this._palette.steps) {
	          throw new Error('Categorical palettes must match the number of categories of the parameter');
	        }

	        this._paletteExtent = this._paletteExtent || options.paletteExtent;

	        if (options.hasOwnProperty('extendMax')) {
	          this._extendMax = options.extendMax;
	        } else {
	          this._extendMax = false;
	        }

	        if (options.hasOwnProperty('extendMin')) {
	          this._extendMin = options.extendMin;
	        } else {
	          this._extendMin = false;
	        }

	        if (this.parameter.categoryEncoding) {
	          // categorical parameter, does not depend on palette extent
	          var valIdxMap = this._categoryIdxMap;
	          var max = valIdxMap.length - 1;
	          this.getPaletteIndex = function (val) {
	            if (val === null || val < 0 || val > max) return;
	            var idx = valIdxMap[val];
	            if (idx === 255) return;
	            return idx;
	          };
	        }

	        if (!this.canUsePalette || this.canUsePalette()) {
	          return this.setPaletteExtent(this._paletteExtent, true).then(function () {
	            return _this2._updatePaletteIndexFn();
	          });
	        } else {
	          return Promise.resolve();
	        }
	      }
	    }, {
	      key: '_updatePaletteIndexFn',
	      value: function _updatePaletteIndexFn() {
	        var _this3 = this;

	        if (!this.parameter.categoryEncoding) {
	          // continuous parameter
	          var palette = this.palette;
	          var extent = this.paletteExtent;
	          this.getPaletteIndex = function (val) {
	            if (val === null) return;
	            if (val > extent[1]) {
	              if (_this3._extendMax) {
	                return palette.steps - 1;
	              } else {
	                return;
	              }
	            }
	            if (val < extent[0]) {
	              if (_this3._extendMin) {
	                return 0;
	              } else {
	                return;
	              }
	            }
	            var idx = scale(val, palette, extent);
	            return idx;
	          };
	        }
	      }
	    }, {
	      key: 'setPaletteExtent',
	      value: function setPaletteExtent(extent, skipRedraw) {
	        var _this4 = this;

	        if (this.parameter.observedProperty.categories) {
	          return Promise.resolve();
	        }

	        var oldExtent = this.paletteExtent;
	        var hasChanged = function hasChanged(newExtent) {
	          if (!Array.isArray(oldExtent)) return true;
	          if (oldExtent[0] !== newExtent[0] || oldExtent[1] !== newExtent[1]) return true;
	          return false;
	        };
	        var res = Array.isArray(extent) ? Promise.resolve(extent) : this.computePaletteExtent(extent);
	        return res.then(function (newExtent) {
	          // ignore invalid extents (may come from using ParameterSync)
	          if (Array.isArray(newExtent) && isNaN(newExtent[0])) return;
	          if (!hasChanged(newExtent)) return;
	          _this4._paletteExtent = newExtent;
	          _this4._updatePaletteIndexFn();
	          if (!skipRedraw) {
	            _this4.redraw();
	          }
	          _this4.fire('paletteExtentChange');
	        });
	      }

	      /**
	       * Sets up a lookup table from categorical range value to palette index.
	       */

	    }, {
	      key: '_initCategoryIdxMap',
	      value: function _initCategoryIdxMap() {
	        var param = this.parameter;
	        if (!param.categoryEncoding) return;

	        // categorical parameter with integer encoding
	        // Note: The palette order is equal to the categories array order.
	        var max = -Infinity;
	        var min = Infinity;
	        var categories = param.observedProperty.categories;
	        var encoding = param.categoryEncoding;
	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;

	        try {
	          for (var _iterator = categories[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var _category = _step.value;

	            if (encoding.has(_category.id)) {
	              var _iteratorNormalCompletion3 = true;
	              var _didIteratorError3 = false;
	              var _iteratorError3 = undefined;

	              try {
	                for (var _iterator3 = encoding.get(_category.id)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	                  var _val = _step3.value;

	                  max = Math.max(max, _val);
	                  min = Math.min(min, _val);
	                }
	              } catch (err) {
	                _didIteratorError3 = true;
	                _iteratorError3 = err;
	              } finally {
	                try {
	                  if (!_iteratorNormalCompletion3 && _iterator3.return) {
	                    _iterator3.return();
	                  }
	                } finally {
	                  if (_didIteratorError3) {
	                    throw _iteratorError3;
	                  }
	                }
	              }
	            }
	          }
	        } catch (err) {
	          _didIteratorError = true;
	          _iteratorError = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion && _iterator.return) {
	              _iterator.return();
	            }
	          } finally {
	            if (_didIteratorError) {
	              throw _iteratorError;
	            }
	          }
	        }

	        var valIdxMap = void 0;
	        if (categories.length < 256) {
	          if (max > 10000 || min < 0) {
	            // TODO implement fallback to Map implementation
	            throw new Error('category values too high (>10000) or low (<0)');
	          }
	          valIdxMap = new Uint8Array(max + 1);
	          for (var i = 0; i <= max; i++) {
	            // the above length < 256 check ensures that no palette index is ever 255
	            valIdxMap[i] = 255;
	          }

	          for (var idx = 0; idx < categories.length; idx++) {
	            var category = categories[idx];
	            if (encoding.has(category.id)) {
	              var _iteratorNormalCompletion2 = true;
	              var _didIteratorError2 = false;
	              var _iteratorError2 = undefined;

	              try {
	                for (var _iterator2 = param.categoryEncoding.get(category.id)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                  var val = _step2.value;

	                  valIdxMap[val] = idx;
	                }
	              } catch (err) {
	                _didIteratorError2 = true;
	                _iteratorError2 = err;
	              } finally {
	                try {
	                  if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                    _iterator2.return();
	                  }
	                } finally {
	                  if (_didIteratorError2) {
	                    throw _iteratorError2;
	                  }
	                }
	              }
	            }
	          }
	        } else {
	          throw new Error('Too many categories: ' + categories.length);
	        }
	        this._categoryIdxMap = valIdxMap;
	      }
	    }, {
	      key: 'palette',
	      get: function get() {
	        if (this.parameter && (!this.canUsePalette || this.canUsePalette())) {
	          return this._palette;
	        }
	      },
	      set: function set(p) {
	        this._palette = p;
	        this._updatePaletteIndexFn();
	        this.redraw();
	        this.fire('paletteChange');
	      }
	    }, {
	      key: 'paletteExtent',
	      set: function set(extent) {
	        this.setPaletteExtent(extent);
	      },
	      get: function get() {
	        return this._paletteExtent;
	      }
	    }]);
	    return _class;
	  }(base);
	}

	/**
	 * A mixin that encapsulates loading of a single coverage for use in layers.
	 * 
	 * The base class must supply the following functions/properties:
	 * 
	 * .coverage
	 * .parameter (optional)
	 * ._loadCoverageSubset() (optional)
	 * 
	 * The following functions/properties are supplied:
	 * 
	 * .domain (after calling load())
	 * .range (after calling load(); only if .parameter is set and ._loadCoverageSubset is undefined)
	 * 
	 * @param {class} base The base class.
	 * @return {class} The base class with CoverageMixin.
	 */
	function CoverageMixin(base) {
	  return function (_base) {
	    inherits(_class, _base);

	    function _class() {
	      classCallCheck(this, _class);
	      return possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
	    }

	    createClass(_class, [{
	      key: 'load',

	      /**
	       * Load all data without adding anything to the map.
	       * After loading is done, all functions and properties can be accessed (like getLatLng()).
	       */
	      value: function load() {
	        var _this2 = this;

	        this.fire('dataLoading'); // for supporting loading spinners

	        var promise = this.coverage.loadDomain().then(function (domain) {
	          _this2.domain = domain;
	          var _getHorizontalCRSComp = covutils.getHorizontalCRSComponents(domain);

	          var _getHorizontalCRSComp2 = slicedToArray(_getHorizontalCRSComp, 2);

	          _this2._projX = _getHorizontalCRSComp2[0];
	          _this2._projY = _getHorizontalCRSComp2[1];

	          return covutils.loadProjection(domain);
	        }).then(function (proj) {
	          _this2.projection = proj;
	        });
	        if (this._loadCoverageSubset) {
	          promise = promise.then(function () {
	            return _this2._loadCoverageSubset();
	          });
	        } else if (this.parameter) {
	          promise = promise.then(function () {
	            return _this2.coverage.loadRange(_this2.parameter.key);
	          }).then(function (range) {
	            _this2.range = range;
	          });
	        }

	        promise = promise.then(function () {
	          _this2.fire('dataLoad');
	        }).catch(function (e) {
	          console.error(e);
	          _this2.fire('error', e);
	          _this2.fire('dataLoad');
	        });
	        return promise;
	      }
	    }]);
	    return _class;
	  }(base);
	}

	/**
	 * Renderer for Coverages and Domains conforming to the `Grid` domain type of CovJSON.
	 * For Domain objects, a dummy parameter and range data is created.
	 * 
	 * @example
	 * var cov = ... // get Coverage data
	 * var layer = new C.Grid(cov, {
	 *   parameter: 'salinity',
	 *   time: new Date('2015-01-01T12:00:00Z'),
	 *   vertical: 50,
	 *   palette: C.linearPalette(['#FFFFFF', '#000000']),
	 *   paletteExtent: 'subset'
	 * })
	 * 
	 * @see https://covjson.org/domain-types/#grid
	 * 
	 * @emits {DataLayer#afterAdd} Layer is initialized and was added to the map
	 * @emits {DataLayer#dataLoading} Data loading has started
	 * @emits {DataLayer#dataLoad} Data loading has finished (also in case of errors)
	 * @emits {DataLayer#error} Error when loading data
	 * @emits {DataLayer#axisChange} Axis coordinate has changed (e.axis === 'time'|'vertical')
	 * @emits {PaletteMixin#paletteChange} Palette has changed
	 * @emits {PaletteMixin#paletteExtentChange} Palette extent has changed
	 * 
	 * @extends {L.GridLayer}
	 * @extends {CoverageMixin}
	 * @extends {PaletteMixin}
	 * @implements {DataLayer}
	 */
	var Grid = function (_PaletteMixin) {
	  inherits(Grid, _PaletteMixin);

	  /**
	   * The key of the parameter to display must be given in the 'parameter' options property,
	   * except when the coverage data object is a Domain object.
	   * 
	   * Optional time and vertical axis target values can be defined with the 'time' and
	   * 'vertical' options properties. The closest values on the respective axes are chosen.
	   * 
	   * @param {Coverage|Domain} cov The coverage or domain object to visualize.
	   * @param {Object} [options] The options object.
	   * @param {string} [options.parameter] The key of the parameter to display, not needed for domain objects.
	   * @param {Date} [options.time] The initial time slice to display, defaults to the first one.
	   * @param {number} [options.vertical] The initial vertical slice to display, defaults to the first one.
	   * @param {Palette} [options.palette] The initial color palette to use, the default depends on the parameter type.
	   * @param {string} [options.paletteExtent='subset'] The initial palette extent, one of 
	   *  `subset` (computed from data of current time/vertical slice),
	   *  `fov` (computed from data in map field of view; not implemented yet),
	   *  or specific: [-10,10].
	   * @param {boolean} [options.valueToColor] If present, the value is converted to a color using the given function,
	   *  and palette settings are ignored.  The returned color should be of the form `{r: 0, g: 0, b: 0, a: 1}`.
	   */
	  function Grid(cov) {
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    classCallCheck(this, Grid);

	    var _this = possibleConstructorReturn(this, (Grid.__proto__ || Object.getPrototypeOf(Grid)).call(this));

	    if (options.valueToColor) {
	      _this.valueToColor = options.valueToColor;
	    }

	    if (covutils.isDomain(cov)) {
	      cov = covutils.fromDomain(cov);
	      options.parameter = cov.parameters.keys().next().value;
	      delete options.keys;
	    }

	    if (!options.paletteExtent) {
	      options.paletteExtent = 'subset';
	    }

	    L.Util.setOptions(_this, options);

	    _this._cov = cov;
	    _this._param = cov.parameters.get(options.keys ? options.keys[0] : options.parameter);
	    _this._axesSubset = { // x and y are not subsetted
	      t: { coordPref: options.time ? options.time.toISOString() : undefined },
	      z: { coordPref: options.vertical }

	      /**
	       * The vertical reference system object, used by {@link VerticalAxis}.
	       * @type {Object}
	       */
	    };_this.crsVerticalAxis = undefined;
	    return _this;
	  }

	  /**
	   * @ignore
	   * @override
	   */


	  createClass(Grid, [{
	    key: 'onAdd',
	    value: function onAdd(map) {
	      var _this2 = this;

	      // "loading" and "load" events are provided by the underlying GridLayer class
	      this._map = map;

	      this.load().then(function () {
	        return _this2.initializePalette();
	      }).then(function () {
	        // used in controls/VerticalAxis.js
	        var vertRef = covutils.getReferenceObject(_this2.domain, 'z');
	        if (vertRef && vertRef.coordinates.length === 1) {
	          var vertRefSys = vertRef.system;
	          if (vertRefSys.cs && (vertRefSys.cs.csAxes || vertRefSys.cs.axes)) {
	            _this2.crsVerticalAxis = vertRefSys.cs.csAxes ? vertRefSys.cs.csAxes[0] : vertRefSys.cs.axes[0];
	          }
	        } else {
	          // TODO handle vertical axis part of 3D CRS
	        }
	      }).then(function () {
	        _this2._errored = false;
	        get(Grid.prototype.__proto__ || Object.getPrototypeOf(Grid.prototype), 'onAdd', _this2).call(_this2, map);
	        _this2.fire('afterAdd');
	      }).catch(function (e) {
	        _this2._errored = true;
	        console.log(e);
	        get(Grid.prototype.__proto__ || Object.getPrototypeOf(Grid.prototype), 'onAdd', _this2).call(_this2, map);
	      });
	    }

	    /**
	     * @ignore
	     * @override
	     */

	  }, {
	    key: 'onRemove',
	    value: function onRemove(map) {
	      delete this._map;
	      // TODO delete references to domain/range, caching logic should happen elsewhere
	      get(Grid.prototype.__proto__ || Object.getPrototypeOf(Grid.prototype), 'onRemove', this).call(this, map);
	    }

	    /**
	     * Returns the geographic bounds of the coverage.
	     * 
	     * For projected coverages this is an approximation based on unprojecting the four bounding box corners
	     * and fitting all four points into a geographic bounding box.
	     * 
	     * @returns {L.LatLngBounds}
	     */

	  }, {
	    key: 'getBounds',
	    value: function getBounds() {
	      var bbox = void 0;
	      if (this._cov.bbox) {
	        bbox = this._cov.bbox;
	      } else {
	        bbox = this._getDomainBbox();
	        var proj = this.projection;
	        // for projected CRSs this approximates the geographic bbox by unprojecting the projected bbox corners
	        // for geographic CRSs the result will be identical 
	        var p1 = proj.unproject({ x: bbox[0], y: bbox[1] });
	        var p2 = proj.unproject({ x: bbox[0], y: bbox[3] });
	        var p3 = proj.unproject({ x: bbox[2], y: bbox[1] });
	        var p4 = proj.unproject({ x: bbox[2], y: bbox[3] });
	        return L.latLngBounds([p1, p2, p3, p4]);
	      }
	      var southWest = L.latLng(bbox[1], bbox[0]);
	      var northEast = L.latLng(bbox[3], bbox[2]);
	      var bounds = L.latLngBounds(southWest, northEast);
	      return bounds;
	    }

	    /**
	     * Subsets the temporal and vertical axes based on the _axesSubset.*.coordPref property,
	     * which is regarded as a preference and does not have to exactly match a coordinate.
	     * 
	     * The return value is a promise that succeeds with an empty result and
	     * sets this._subsetCov to the subsetted coverage.
	     * The subsetting always fixes a single time and vertical slice, choosing the first
	     * axis value if no preference was given.
	     * 
	     * After calling this method, _axesSubset.*.idx and _axesSubset.*.coord have
	     * values from the actual axes.
	     */

	  }, {
	    key: '_loadCoverageSubset',
	    value: function _loadCoverageSubset() {
	      var _this3 = this;

	      var spec = {};
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = Object.keys(this._axesSubset)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var axis = _step.value;

	          var ax = this._axesSubset[axis];
	          if (!this.domain.axes.has(axis)) {
	            continue;
	          }
	          if (ax.coordPref == undefined) {
	            // == also handles null
	            spec[axis] = { target: this.domain.axes.get(axis).values[0] };
	          } else {
	            spec[axis] = { target: ax.coordPref };
	          }
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }

	      this.fire('dataLoading'); // for supporting loading spinners
	      return this._cov.subsetByValue(spec).then(function (subsetCov) {
	        _this3._subsetCov = subsetCov;
	        //  the goal is to avoid reloading data when approximating palette extent via subsetting
	        //  but: memory has to be freed when the layer is removed from the map
	        //      -> therefore cacheRanges is set on subsetCov whose reference is removed on onRemove
	        subsetCov.cacheRanges = true;
	        return Promise.all([subsetCov.loadDomain(), subsetCov.loadRange(_this3._param.key)]);
	      }).then(function (_ref) {
	        var _ref2 = slicedToArray(_ref, 2),
	            subsetDomain = _ref2[0],
	            subsetRange = _ref2[1];

	        _this3._subsetDomain = subsetDomain;
	        _this3._subsetRange = subsetRange;
	        _this3.fire('dataLoad');
	      }).catch(function (e) {
	        _this3.fire('dataLoad');
	        throw e;
	      });
	    }

	    /**
	     * The coverage object associated to this layer.
	     * 
	     * @type {Coverage}
	     */

	  }, {
	    key: 'computePaletteExtent',


	    /**
	     * See {@link PaletteMixin}.
	     * 
	     * @ignore
	     */
	    value: function computePaletteExtent(extent) {
	      var _this4 = this;

	      if (extent === 'subset') {
	        // scan the current subset for min/max values

	        var xlen = this._subsetRange.shape.get(this._projX);
	        var ylen = this._subsetRange.shape.get(this._projY);

	        // check if subsetted size is manageable
	        if (xlen * ylen < 1000 * 1000) {
	          extent = covutils.minMaxOfRange(this._subsetRange);
	          extent = enlargeExtentIfEqual(extent);
	          return Promise.resolve(extent);
	        } else {
	          var _subsetCov$subsetByIn;

	          // subset x and y to get a fast estimate of the palette extent
	          // since it is an estimate, the lower and upper bound needs a small buffer
	          // (to prevent out-of-bounds colours)
	          var xconstraint = { start: 0, stop: xlen, step: Math.max(Math.round(xlen / 1000), 1) };
	          var yconstraint = { start: 0, stop: ylen, step: Math.max(Math.round(ylen / 1000), 1) };

	          return this._subsetCov.subsetByIndex((_subsetCov$subsetByIn = {}, defineProperty(_subsetCov$subsetByIn, this._projX, xconstraint), defineProperty(_subsetCov$subsetByIn, this._projY, yconstraint), _subsetCov$subsetByIn)).then(function (subsetCov) {
	            return subsetCov.loadRange(_this4._param.key).then(function (subsetRange) {
	              var _minMaxOfRange = covutils.minMaxOfRange(subsetRange),
	                  _minMaxOfRange2 = slicedToArray(_minMaxOfRange, 2),
	                  min = _minMaxOfRange2[0],
	                  max = _minMaxOfRange2[1];

	              var buffer = (max - min) * 0.1; // 10% buffer on each side
	              extent = [min - buffer, max + buffer];
	              return extent;
	            });
	          });
	        }
	      } else if (extent === 'fov') {
	        // scan the values that are currently in field of view on the map for min/max
	        // this implies using the current subset
	        var bounds = this._map.getBounds();

	        // TODO implement
	        throw new Error('NOT IMPLEMENTED YET');
	      } else {
	        throw new Error('Unknown extent specification: ' + extent);
	      }
	    }

	    /**
	     * Return the displayed value at a given geographic position.
	     * If out of bounds, then undefined is returned, otherwise a number or null (for no data).
	     * 
	     * @param {L.LatLng} latlng
	     * @returns {number|null|undefined}
	     */

	  }, {
	    key: 'getValueAt',
	    value: function getValueAt(latlng) {
	      var _subsetRange$get;

	      var X = this.domain.axes.get(this._projX).values;
	      var Y = this.domain.axes.get(this._projY).values;
	      var bbox = this._getDomainBbox();

	      var lat = latlng.lat,
	          lng = latlng.lng;

	      var _projection$project = this.projection.project({ lat: lat, lon: lng }),
	          x = _projection$project.x,
	          y = _projection$project.y;

	      // we first check whether the tile pixel is outside the domain bounding box
	      // in that case we skip it as we do not want to extrapolate


	      if (x < bbox[0] || x > bbox[2] || y < bbox[1] || y > bbox[3]) {
	        return;
	      }

	      var iy = covutils.indexOfNearest(Y, y);
	      var ix = covutils.indexOfNearest(X, x);

	      return this._subsetRange.get((_subsetRange$get = {}, defineProperty(_subsetRange$get, this._projY, iy), defineProperty(_subsetRange$get, this._projX, ix), _subsetRange$get));
	    }

	    /**
	     * @ignore
	     * @override
	     * 
	     * @param {L.Point} coords The tile coordinates (with z being zoom level).
	     * @return {HTMLCanvasElement}
	     */

	  }, {
	    key: 'createTile',
	    value: function createTile(coords) {
	      var tile = L.DomUtil.create('canvas', 'leaflet-tile');

	      // setup tile width and height according to the options
	      var size = this.getTileSize();
	      tile.width = size.x;
	      tile.height = size.y;

	      this.drawTile(tile, coords);

	      return tile;
	    }

	    /**
	     * @ignore
	     * 
	     * @param {HTMLCanvasElement} The canvas to draw on.
	     * @param {L.Point} coords The tile coordinates (with z being zoom level).
	     */

	  }, {
	    key: 'drawTile',
	    value: function drawTile(canvas, coords) {
	      if (this._errored) return;

	      var ctx = canvas.getContext('2d');
	      var tileSize = this.getTileSize();

	      var imgData = ctx.getImageData(0, 0, tileSize.x, tileSize.y);
	      // Uint8ClampedArray, 1-dimensional, in order R,G,B,A,R,G,B,A,... row-major
	      var rgba = ndarray$1(imgData.data, [tileSize.y, tileSize.x, 4]);

	      var setPixel = void 0;
	      if (this.valueToColor) {
	        var valueToColor = this.valueToColor;
	        setPixel = function setPixel(tileY, tileX, val) {
	          var color = valueToColor(val);
	          if (color !== undefined && color !== null) {
	            rgba.set(tileY, tileX, 0, color.r);
	            rgba.set(tileY, tileX, 1, color.g);
	            rgba.set(tileY, tileX, 2, color.b);
	            rgba.set(tileY, tileX, 3, color.hasOwnProperty('a') ? color.a : 255);
	          }
	        };
	      } else {
	        var _palette = this.palette,
	            red = _palette.red,
	            green = _palette.green,
	            blue = _palette.blue;


	        var getPaletteIndex = this.getPaletteIndex;
	        setPixel = function setPixel(tileY, tileX, val) {
	          var idx = getPaletteIndex(val);
	          if (idx !== undefined) {
	            rgba.set(tileY, tileX, 0, red[idx]);
	            rgba.set(tileY, tileX, 1, green[idx]);
	            rgba.set(tileY, tileX, 2, blue[idx]);
	            rgba.set(tileY, tileX, 3, 255);
	          }
	        };
	      }

	      var vals = this._subsetRange.get;

	      if (this._isDomainUsingEllipsoidalCRS()) {
	        if (this._isRectilinearGeodeticMap()) {
	          // here we can apply heavy optimizations as the map CRS matches the domain CRS 
	          this._drawGeodeticCRSWithRectilinearMapProjection(setPixel, coords, vals);
	        } else {
	          // this is for any random map projection
	          // here we have to unproject each map pixel individually and find the matching domain index coordinates
	          this._drawGeodeticCRSWithAnyMapProjection(setPixel, coords, vals);
	        }
	      } else {
	        // here we have to unproject each map pixel individually, 
	        // project it into domain projection coordinates, and find the domain index coordinates
	        if (this._isRectilinearGeodeticMap()) {
	          this._drawProjectedCRSWithRectilinearMapProjection(setPixel, coords, vals);
	        } else {
	          this._drawProjectedCRSWithAnyMapProjection(setPixel, coords, vals);
	        }
	      }

	      ctx.putImageData(imgData, 0, 0);
	    }

	    /**
	     * Derives the bounding box of the x,y CRS axes in domain CRS coordinates.
	     * 
	     * @return {Array} [xmin,ymin,xmax,ymax]
	     */

	  }, {
	    key: '_getDomainBbox',
	    value: function _getDomainBbox() {
	      var extent = function extent(x, xBounds) {
	        var xend = x.length - 1;
	        var xmin = void 0,
	            xmax = void 0;
	        if (xBounds) {
	          var _ref3 = [xBounds.get(0)[0], xBounds.get(xend)[1]];
	          xmin = _ref3[0];
	          xmax = _ref3[1];
	        } else {
	          var _ref4 = [x[0], x[xend]];
	          xmin = _ref4[0];
	          xmax = _ref4[1];
	        }
	        var xDescending = xmin > xmax;
	        if (xDescending) {
	          var _ref5 = [xmax, xmin];
	          xmin = _ref5[0];
	          xmax = _ref5[1];
	        }
	        if (!xBounds && x.length > 1) {
	          if (xDescending) {
	            xmin -= (x[xend - 1] - x[xend]) / 2;
	            xmax += (x[0] - x[1]) / 2;
	          } else {
	            xmin -= (x[1] - x[0]) / 2;
	            xmax += (x[xend] - x[xend - 1]) / 2;
	          }
	        }
	        return [xmin, xmax];
	      };

	      var xAxis = this.domain.axes.get(this._projX);
	      var yAxis = this.domain.axes.get(this._projY);

	      var _extent = extent(xAxis.values, xAxis.bounds),
	          _extent2 = slicedToArray(_extent, 2),
	          xmin = _extent2[0],
	          xmax = _extent2[1];

	      var _extent3 = extent(yAxis.values, yAxis.bounds),
	          _extent4 = slicedToArray(_extent3, 2),
	          ymin = _extent4[0],
	          ymax = _extent4[1];

	      return [xmin, ymin, xmax, ymax];
	    }

	    /**
	     * Draws a geodetic rectilinear domain grid on a map with arbitrary projection.
	     * 
	     * @param {Function} setPixel A function with parameters (y,x,val) which 
	     *                            sets the color of a pixel on a tile.
	     * @param {L.Point} coords The tile coordinates.
	     * @param {function(idx: Object): number|null} vals Range value function.
	     */

	  }, {
	    key: '_drawGeodeticCRSWithAnyMapProjection',
	    value: function _drawGeodeticCRSWithAnyMapProjection(setPixel, coords, vals) {
	      // usable for any map projection, but computationally more intensive
	      // there are two hotspots in the loops: map.unproject and indexOfNearest

	      // Note that this function is slightly more specialized and optimized than _drawProjectedCRSWithAnyMapProjection().
	      // It targets the case when the domain is lat/lon, whereas _drawProjectedCRSWithAnyMapProjection() works
	      // with any projected CRS in the grid domain.

	      var tileSize = this.getTileSize();
	      var startX = coords.x * tileSize.x;
	      var startY = coords.y * tileSize.y;
	      var zoom = coords.z;

	      var map = this._map;
	      var x = this.domain.axes.get('x').values;
	      var y = this.domain.axes.get('y').values;
	      var bbox = this._getDomainBbox();

	      // a bit hacky
	      if (this._projX === 'y') {
	        bbox = [bbox[1], bbox[0], bbox[3], bbox[2]];
	      }

	      var lonRange = [bbox[0], bbox[0] + 360];

	      for (var tileX = 0; tileX < tileSize.x; tileX++) {
	        for (var tileY = 0; tileY < tileSize.y; tileY++) {
	          var _map$unproject = map.unproject(L.point(startX + tileX, startY + tileY), zoom),
	              lat = _map$unproject.lat,
	              lng = _map$unproject.lng;

	          // we first check whether the tile pixel is outside the domain bounding box
	          // in that case we skip it as we do not want to extrapolate


	          if (lat < bbox[1] || lat > bbox[3]) {
	            continue;
	          }

	          lng = wrapLongitude(lng, lonRange);
	          if (lng < bbox[0] || lng > bbox[2]) {
	            continue;
	          }

	          // now we find the closest grid cell using simple binary search
	          // for finding the closest latitude/longitude we use a simple binary search
	          // (as there is no discontinuity)
	          var iLat = covutils.indexOfNearest(y, lat);
	          var iLon = covutils.indexOfNearest(x, lng);

	          setPixel(tileY, tileX, vals({ y: iLat, x: iLon }));
	        }
	      }
	    }

	    /**
	     * Draws a domain with projected CRS on a map with arbitrary projection.
	     * 
	     * @param {Function} setPixel A function with parameters (y,x,val) which 
	     *                            sets the color of a pixel on a tile.
	     * @param {L.Point} coords The tile coordinates.
	     * @param {function(idx: Object): number|null} vals Range value function.
	     */

	  }, {
	    key: '_drawProjectedCRSWithAnyMapProjection',
	    value: function _drawProjectedCRSWithAnyMapProjection(setPixel, coords, vals) {
	      var map = this._map;
	      var X = this.domain.axes.get(this._projX).values;
	      var Y = this.domain.axes.get(this._projY).values;
	      var bbox = this._getDomainBbox();

	      var proj = this.projection;

	      var tileSize = this.getTileSize();
	      var startX = coords.x * tileSize.x;
	      var startY = coords.y * tileSize.y;
	      var zoom = coords.z;

	      for (var tileX = 0; tileX < tileSize.x; tileX++) {
	        for (var tileY = 0; tileY < tileSize.y; tileY++) {
	          var _map$unproject2 = map.unproject(L.point(startX + tileX, startY + tileY), zoom),
	              lat = _map$unproject2.lat,
	              lng = _map$unproject2.lng;

	          var _proj$project = proj.project({ lat: lat, lon: lng }),
	              x = _proj$project.x,
	              y = _proj$project.y;

	          // we first check whether the tile pixel is outside the domain bounding box
	          // in that case we skip it as we do not want to extrapolate


	          if (x < bbox[0] || x > bbox[2] || y < bbox[1] || y > bbox[3]) {
	            continue;
	          }

	          // now we find the closest grid cell using simple binary search
	          var iy = covutils.indexOfNearest(Y, y);
	          var ix = covutils.indexOfNearest(X, x);

	          setPixel(tileY, tileX, vals({ y: iy, x: ix }));
	        }
	      }
	    }

	    /**
	     * Draws a domain with projected CRS on a map with rectilinear lon/lat projection.
	     * 
	     * @param {Function} setPixel A function with parameters (y,x,val) which 
	     *                            sets the color of a pixel on a tile.
	     * @param {L.Point} coords The tile coordinates.
	     * @param {function(idx: Object): number|null} vals Range value function.
	     */

	  }, {
	    key: '_drawProjectedCRSWithRectilinearMapProjection',
	    value: function _drawProjectedCRSWithRectilinearMapProjection(setPixel, coords, vals) {
	      var map = this._map;
	      var X = this.domain.axes.get(this._projX).values;
	      var Y = this.domain.axes.get(this._projY).values;
	      var bbox = this._getDomainBbox();

	      var proj = this.projection;

	      var tileSize = this.getTileSize();
	      var startX = coords.x * tileSize.x;
	      var startY = coords.y * tileSize.y;
	      var zoom = coords.z;

	      // since the map projection is a rectilinear lat/lon grid,
	      // we only have to unproject the the first row and column to get the lat/lon coordinates of all tile pixels
	      var lons = new Float64Array(tileSize.x);
	      for (var tileX = 0; tileX < tileSize.x; tileX++) {
	        var _map$unproject3 = map.unproject(L.point(startX + tileX, startY), zoom),
	            lng = _map$unproject3.lng;

	        lons[tileX] = lng;
	      }
	      var lats = new Float64Array(tileSize.y);
	      for (var tileY = 0; tileY < tileSize.y; tileY++) {
	        var _map$unproject4 = map.unproject(L.point(startX, startY + tileY), zoom),
	            lat = _map$unproject4.lat;

	        lats[tileY] = lat;
	      }

	      for (var _tileX = 0; _tileX < tileSize.x; _tileX++) {
	        for (var _tileY = 0; _tileY < tileSize.y; _tileY++) {
	          var lat = lats[_tileY];
	          var lon = lons[_tileX];

	          var _proj$project2 = proj.project({ lat: lat, lon: lon }),
	              x = _proj$project2.x,
	              y = _proj$project2.y;

	          // we first check whether the tile pixel is outside the domain bounding box
	          // in that case we skip it as we do not want to extrapolate


	          if (x < bbox[0] || x > bbox[2] || y < bbox[1] || y > bbox[3]) {
	            continue;
	          }

	          // now we find the closest grid cell using simple binary search
	          var iy = covutils.indexOfNearest(Y, y);
	          var ix = covutils.indexOfNearest(X, x);

	          setPixel(_tileY, _tileX, vals({ y: iy, x: ix }));
	        }
	      }
	    }

	    /**
	     * Draws a geodetic rectilinear domain grid on a map whose grid is, or can be directly
	     * mapped to, a geodetic rectilinear grid.
	     * 
	     * @param {Function} setPixel A function with parameters (y,x,val) which 
	     *                            sets the color of a pixel on a tile.
	     * @param {L.Point} coords The tile coordinates.
	     * @param {function(idx: Object): number|null} vals Range value function.
	     */

	  }, {
	    key: '_drawGeodeticCRSWithRectilinearMapProjection',
	    value: function _drawGeodeticCRSWithRectilinearMapProjection(setPixel, coords, vals) {
	      // optimized version for map projections that are equal to a rectilinear geodetic grid
	      // this can be used when lat and lon can be computed independently for a given pixel

	      var map = this._map;
	      var x = this.domain.axes.get('x').values;
	      var y = this.domain.axes.get('y').values;
	      var bbox = this._getDomainBbox();

	      // a bit hacky
	      if (this._projX === 'y') {
	        bbox = [bbox[1], bbox[0], bbox[3], bbox[2]];
	      }

	      var lonRange = [bbox[0], bbox[0] + 360];

	      var tileSize = this.getTileSize();
	      var startX = coords.x * tileSize.x;
	      var startY = coords.y * tileSize.y;
	      var zoom = coords.z;

	      var latCache = new Float64Array(tileSize.y);
	      var iLatCache = new Uint32Array(tileSize.y);
	      for (var tileY = 0; tileY < tileSize.y; tileY++) {
	        var lat = map.unproject(L.point(startX, startY + tileY), zoom).lat;
	        latCache[tileY] = lat;
	        // find the index of the closest latitude in the grid using simple binary search
	        iLatCache[tileY] = covutils.indexOfNearest(y, lat);
	      }

	      for (var tileX = 0; tileX < tileSize.x; tileX++) {
	        var lon = map.unproject(L.point(startX + tileX, startY), zoom).lng;
	        lon = wrapLongitude(lon, lonRange);
	        if (lon < bbox[0] || lon > bbox[2]) {
	          continue;
	        }

	        // find the index of the closest longitude in the grid using simple binary search
	        // (as there is no discontinuity)
	        var iLon = covutils.indexOfNearest(x, lon);

	        for (var _tileY2 = 0; _tileY2 < tileSize.y; _tileY2++) {
	          // get geographic coordinates of tile pixel
	          var _lat = latCache[_tileY2];

	          // we first check whether the tile pixel is outside the domain bounding box
	          // in that case we skip it as we do not want to extrapolate
	          if (_lat < bbox[1] || _lat > bbox[3]) {
	            continue;
	          }

	          var iLat = iLatCache[_tileY2];

	          setPixel(_tileY2, tileX, vals({ y: iLat, x: iLon }));
	        }
	      }
	    }

	    /**
	     * Return true if the map projection grid can be mapped to a rectilinear
	     * geodetic grid. For that, it must satisfy:
	     * for all x, there is a longitude lon, for all y, unproject(x,y).lon = lon
	     * for all y, there is a latitude lat, for all x, unproject(x,y).lat = lat
	     * 
	     * Returns false if this is not the case or unknown.
	     */

	  }, {
	    key: '_isRectilinearGeodeticMap',
	    value: function _isRectilinearGeodeticMap() {
	      var crs = this._map.options.crs;
	      // these are the ones included in Leaflet
	      var recti = [L.CRS.EPSG3857, L.CRS.EPSG4326, L.CRS.EPSG3395, L.CRS.Simple];
	      var isRecti = recti.indexOf(crs) !== -1;
	      // TODO for unknown ones, how do we test that?
	      return isRecti;
	    }

	    /**
	     * Return whether the coverage domain is using a geodetic CRS with WGS84 datum.
	     */

	  }, {
	    key: '_isDomainUsingEllipsoidalCRS',
	    value: function _isDomainUsingEllipsoidalCRS() {
	      return this.domain.referencing.some(function (ref) {
	        return covutils.isEllipsoidalCRS(ref.system);
	      });
	    }

	    /**
	     * @ignore
	     * @override
	     */

	  }, {
	    key: 'redraw',
	    value: function redraw() {
	      // we check getContainer() to prevent errors when trying to redraw when the layer has not
	      // fully initialized yet
	      if (this.getContainer()) {
	        L.GridLayer.prototype.redraw.call(this);
	      }
	    }
	  }, {
	    key: 'coverage',
	    get: function get() {
	      return this._cov;
	    }

	    /**
	     * The parameter that is visualized.
	     * 
	     * @type {Parameter}
	     */

	  }, {
	    key: 'parameter',
	    get: function get() {
	      return this._param;
	    }

	    /**
	     * Sets the currently active time to the one closest to the given Date object.
	     * Throws an exception if there is no time axis.
	     * 
	     * @type {Date}
	     */

	  }, {
	    key: 'time',
	    set: function set(val) {
	      var _this5 = this;

	      if (!this.domain.axes.has('t')) {
	        throw new Error('No time axis found');
	      }
	      var old = this.time;
	      this._axesSubset.t.coordPref = val.toISOString();
	      this._loadCoverageSubset().then(function () {
	        if (old === _this5.time) return;
	        _this5.redraw();
	        _this5.fire('axisChange', { axis: 'time' });
	      });
	    }

	    /**
	     * The currently active time on the temporal axis as Date object, 
	     * or undefined if the grid has no time axis.
	     * 
	     * @type {Date|undefined}
	     */
	    ,
	    get: function get() {
	      if (this.domain.axes.has('t')) {
	        var time = this._subsetDomain.axes.get('t').values[0];
	        return new Date(time);
	      }
	    }

	    /**
	     * The time slices that make up the coverage, or undefined if the grid has no time axis .
	     * 
	     * @type {Array<Date>|undefined}
	     */

	  }, {
	    key: 'timeSlices',
	    get: function get() {
	      if (this.domain.axes.has('t')) {
	        return this.domain.axes.get('t').values.map(function (t) {
	          return new Date(t);
	        });
	      }
	    }

	    /**
	     * Sets the currently active vertical coordinate to the one closest to the given value.
	     * 
	     * @type {number}
	     */

	  }, {
	    key: 'vertical',
	    set: function set(val) {
	      var _this6 = this;

	      if (!this.domain.axes.has('z')) {
	        throw new Error('No vertical axis found');
	      }
	      var old = this.vertical;
	      this._axesSubset.z.coordPref = val;
	      this._loadCoverageSubset().then(function () {
	        if (old === _this6.vertical) return;
	        _this6.redraw();
	        _this6.fire('axisChange', { axis: 'vertical' });
	      });
	    }

	    /**
	     * The currently active vertical coordinate as a number, 
	     * or undefined if the grid has no vertical axis.
	     * 
	     * @type {number|undefined}
	     */
	    ,
	    get: function get() {
	      if (this.domain.axes.has('z')) {
	        var val = this._subsetDomain.axes.get('z').values[0];
	        return val;
	      }
	    }

	    /**
	     * The vertical slices that make up the coverage, or undefined if the grid has no vertical axis .
	     * 
	     * @type {Array<number>|undefined}
	     */

	  }, {
	    key: 'verticalSlices',
	    get: function get() {
	      if (this.domain.axes.has('z')) {
	        var vals = this.domain.axes.get('z').values;
	        if (ArrayBuffer.isView(vals)) {
	          // convert to plain Array to allow easier use
	          vals = [].concat(toConsumableArray(vals));
	        }
	        return vals;
	      }
	    }
	  }]);
	  return Grid;
	}(PaletteMixin(CoverageMixin(L.GridLayer)));

	function wrapLongitude(lon, range) {
	  return L.Util.wrapNum(lon, range, true);
	}

	/**
	 * A mixin that encapsulates the creation, update, and removal
	 * of a CircleMarker.
	 * 
	 * It provides the public methods `bindPopup`, `openPopup`, `closePopup`, and `redraw`.
	 * 
	 * See {@link Point} and {@link VerticalProfile} for usage.
	 * 
	 * @param {PointDataLayer} base The base class implementing the {@link PointDataLayer} interface.
	 * @return {class} The base class with CircleMarkerMixin.
	 */
	function CircleMarkerMixin(base) {
	  return function (_base) {
	    inherits(_class, _base);

	    function _class() {
	      classCallCheck(this, _class);
	      return possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
	    }

	    createClass(_class, [{
	      key: '_addMarker',
	      value: function _addMarker() {
	        var _this2 = this;

	        var val = this.getValue();
	        if (val === null && !this.showNoData) {
	          return;
	        }
	        var color = this._getColor(val);

	        var _ref = typeof color === 'string' ? cssToRGB(color) : color,
	            r = _ref.r,
	            g = _ref.g,
	            b = _ref.b;

	        var latlng = this.getLatLng();

	        var strokeBrightness = 0.7;

	        this._marker = L.circleMarker(latlng, {
	          fillColor: 'rgb(' + r + ',' + g + ',' + b + ')',
	          fillOpacity: 1,
	          radius: 5,
	          stroke: true,
	          opacity: 1,
	          weight: 1,
	          color: 'rgb(' + Math.round(r * strokeBrightness) + ',' + Math.round(g * strokeBrightness) + ',' + Math.round(b * strokeBrightness) + ')'
	        }).on('click', function (e) {
	          e.coverage = _this2.coverage;
	          _this2.fire('click', e);
	        }).addTo(this._map);

	        if (this._popup) {
	          var _marker;

	          (_marker = this._marker).bindPopup.apply(_marker, toConsumableArray(this._popup));
	        }
	      }
	    }, {
	      key: '_removeMarker',
	      value: function _removeMarker() {
	        if (this._marker) {
	          this._map.removeLayer(this._marker);
	          delete this._marker;
	        }
	      }
	    }, {
	      key: '__updateMarker',
	      value: function __updateMarker() {
	        var color = this._getColor(val);

	        var _ref2 = typeof color === 'string' ? cssToRGB(color) : color,
	            r = _ref2.r,
	            g = _ref2.g,
	            b = _ref2.b;

	        this._marker.options.color = 'rgb(' + r + ',' + g + ',' + b + ')';
	      }
	    }, {
	      key: 'bindPopup',
	      value: function bindPopup() {
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	          args[_key] = arguments[_key];
	        }

	        this._popup = args;
	        if (this._marker) {
	          var _marker2;

	          (_marker2 = this._marker).bindPopup.apply(_marker2, args);
	        }
	      }
	    }, {
	      key: 'openPopup',
	      value: function openPopup() {
	        this._marker.openPopup();
	        return this;
	      }
	    }, {
	      key: 'closePopup',
	      value: function closePopup() {
	        this._marker.closePopup();
	        return this;
	      }
	    }, {
	      key: 'redraw',
	      value: function redraw() {
	        if (this._marker) {
	          this.__updateMarker();
	          this._marker.redraw();
	        }
	      }
	    }]);
	    return _class;
	  }(base);
	}

	/** @ignore */
	var DEFAULT_COLOR = 'black';

	/**
	 * The `click` event, signalling that the point has been clicked.
	 * 
	 * @typedef {L.MouseEvent} Point#click
	 * @property {Coverage} coverage
	 * @property {L.LatLng} latlng The geographical point where the click event occured.
	 */

	/**
	 * Renderer for Coverages and Domains conforming to CovJSON domain type `Point`.
	 * 
	 * This will simply display a dot on the map and fire a click event when a user clicks on it.
	 * The dot either has a defined standard color, or it uses a palette if a parameter is chosen.
	 * 
	 * @example
	 * var cov = ... // get Coverage data
	 * var layer = new C.Point(cov, {
	 *   parameter: 'salinity',
	 *   defaultColor: 'black',
	 *   palette: C.linearPalette(['#FFFFFF', '#000000'])
	 * })
	 * 
	 * @see https://covjson.org/domain-types/#point
	 * 
	 * @emits {DataLayer#afterAdd} Layer is initialized and was added to the map
	 * @emits {DataLayer#dataLoading} Data loading has started
	 * @emits {DataLayer#dataLoad} Data loading has finished (also in case of errors)
	 * @emits {DataLayer#error} Error when loading data
	 * @emits {PaletteMixin#paletteChange} Palette has changed
	 * @emits {PaletteMixin#paletteExtentChange} Palette extent has changed
	 * @emits {Point#click} when the point was clicked
	 * 
	 * @extends {L.Layer}
	 * @extends {CoverageMixin}
	 * @extends {CircleMarkerMixin}
	 * @extends {PaletteMixin}
	 * @implements {DataLayer}
	 * @implements {PointDataLayer}
	 */
	var Point = function (_PaletteMixin) {
	  inherits(Point, _PaletteMixin);

	  /**
	   * @param {Coverage|Domain} cov The coverage or domain object to visualize.
	   * @param {Object} [options] The options object.
	   * @param {string} [options.parameter] The key of the parameter to display, not needed for domain objects.
	   * @param {Palette} [options.palette] The initial color palette to use, the default depends on the parameter type.
	   * @param {string} [options.paletteExtent='full'] The initial palette extent, either 'full' or specific: [-10,10].
	   * @param {string} [options.defaultColor='black'] The color to use for missing data or if no parameter is set.
	   * @param {boolean} [options.showNoData=false] Whether to draw the point if there is no data.
	   */
	  function Point(cov, options) {
	    classCallCheck(this, Point);

	    var _this = possibleConstructorReturn(this, (Point.__proto__ || Object.getPrototypeOf(Point)).call(this));

	    if (covutils.isDomain(cov)) {
	      cov = covutils.fromDomain(cov);
	      delete options.keys;
	      options.parameter = cov.parameters.keys().next().value;
	    }

	    if (!options.paletteExtent) {
	      options.paletteExtent = 'full';
	    }

	    L.Util.setOptions(_this, options);

	    _this._cov = cov;
	    var paramKey = options.keys ? options.keys[0] : options.parameter;
	    _this._param = paramKey ? cov.parameters.get(paramKey) : null;
	    _this._defaultColor = options.defaultColor || DEFAULT_COLOR;

	    /** @ignore */
	    _this.showNoData = options.showNoData; // if true, draw with default color
	    return _this;
	  }

	  /**
	   * @ignore
	   * @override
	   */


	  createClass(Point, [{
	    key: 'onAdd',
	    value: function onAdd(map) {
	      var _this2 = this;

	      this._map = map;

	      this.load().then(function () {
	        return _this2.initializePalette();
	      }).then(function () {
	        _this2._addMarker();
	        _this2.fire('afterAdd');
	      });
	    }

	    /**
	     * @ignore
	     * @override
	     */

	  }, {
	    key: 'onRemove',
	    value: function onRemove() {
	      this._removeMarker();
	    }

	    /**
	     * Returns the geographic bounds of the coverage, which is a degenerate box collapsed to a point.
	     * 
	     * @return {L.LatLngBounds}
	     */

	  }, {
	    key: 'getBounds',
	    value: function getBounds() {
	      return L.latLngBounds([this.getLatLng()]);
	    }

	    /**
	     * Returns the geographical position of the coverage.
	     * 
	     * @return {L.LatLng}
	     */

	  }, {
	    key: 'getLatLng',
	    value: function getLatLng() {
	      var x = this.domain.axes.get(this._projX).values[0];
	      var y = this.domain.axes.get(this._projY).values[0];
	      var latlng = this.projection.unproject({ x: x, y: y });
	      return L.latLng(latlng);
	    }

	    /**
	     * The coverage object associated to this layer.
	     * 
	     * @type {Coverage}
	     */

	  }, {
	    key: 'computePaletteExtent',


	    /**
	     * See {@link PaletteMixin}.
	     * 
	     * @ignore
	     */
	    value: function computePaletteExtent(extent) {
	      if (extent === 'full') {
	        if (!this.parameter) {
	          throw new Error('palette extent cannot be computed when no parameter has been chosen');
	        }

	        var val = this.getValue();
	        extent = enlargeExtentIfEqual([val, val]);
	        return Promise.resolve(extent);
	      } else {
	        throw new Error('Unknown extent specification: ' + extent);
	      }
	    }

	    /**
	     * Return the displayed value (number, or null for no-data),
	     * or undefined if no parameter is set.
	     * 
	     * @returns {number|null|undefined}
	     */

	  }, {
	    key: 'getValue',
	    value: function getValue() {
	      if (this._param) {
	        return this.range.get({});
	      }
	    }

	    /**
	     * Return the displayed value if within the given distance of the reference point.
	     * If out of bounds, then undefined is returned, otherwise a number or null (for no data).
	     * 
	     * @param {L.LatLng} latlng
	     * @param {number} maxDistance Maximum distance in meters between both points.
	     * @returns {number|null|undefined}
	     */

	  }, {
	    key: 'getValueAt',
	    value: function getValueAt(latlng, maxDistance) {
	      var point = this.getLatLng();
	      if (point.distanceTo(latlng) <= maxDistance) {
	        return this.getValue();
	      }
	    }
	  }, {
	    key: '_getColor',
	    value: function _getColor(val) {
	      if (val === null) {
	        // no-data
	        return this._defaultColor;
	      } else if (val === undefined) {
	        // not fixed to a param
	        return this._defaultColor;
	      } else {
	        // use a palette
	        var idx = this.getPaletteIndex(val);
	        var _palette = this.palette,
	            red = _palette.red,
	            green = _palette.green,
	            blue = _palette.blue;

	        return { r: red[idx], g: green[idx], b: blue[idx] };
	      }
	    }
	  }, {
	    key: 'coverage',
	    get: function get() {
	      return this._cov;
	    }

	    /**
	     * The parameter that is visualized.
	     * 
	     * @type {Parameter}
	     */

	  }, {
	    key: 'parameter',
	    get: function get() {
	      return this._param;
	    }
	  }]);
	  return Point;
	}(PaletteMixin(CircleMarkerMixin(CoverageMixin(L.Layer))));

	/**
	 * Renderer for Coverages and Domains conforming to the CovJSON domain type `Trajectory`.
	 * 
	 * Displays the trajectory as a path with coloured points using
	 * a given palette for a given parameter.
	 * 
	 * @example
	 * var cov = ... // get Coverage data
	 * var layer = new C.Trajectory(cov, {
	 *   parameter: 'salinity',
	 *   defaultColor: 'black',
	 *   palette: C.linearPalette(['#FFFFFF', '#000000'])
	 * })
	 * 
	 * @see https://covjson.org/domain-types/#trajectory
	 * 
	 * @emits {DataLayer#afterAdd} Layer is initialized and was added to the map
	 * @emits {DataLayer#dataLoading} Data loading has started
	 * @emits {DataLayer#dataLoad} Data loading has finished (also in case of errors)
	 * @emits {DataLayer#error} Error when loading data
	 * @emits {PaletteMixin#paletteChange} Palette has changed
	 * @emits {PaletteMixin#paletteExtentChange} Palette extent has changed
	 * @emits {Point#click} when a point was clicked
	 * 
	 * @extends {L.FeatureGroup}
	 * @extends {CoverageMixin}
	 * @extends {PaletteMixin}
	 * @implements {DataLayer}
	 * 
	 */
	var Trajectory = function (_PaletteMixin) {
	  inherits(Trajectory, _PaletteMixin);

	  // TODO FeatureGroup is not ideal since click events etc should not be blindly propagated
	  //    (we use it for now to have getBounds() which LayerGroup misses)

	  /**
	   * @param {Coverage|Domain} cov The coverage or domain object to visualize.
	   * @param {Object} [options] The options object.
	   * @param {string} [options.parameter] The key of the parameter to display, not needed for domain objects.
	   * @param {Palette} [options.palette] The initial color palette to use, the default depends on the parameter type.
	   * @param {string} [options.paletteExtent='full'] The initial palette extent, either 'full' or specific: [-10,10].
	   * @param {string} [options.defaultColor='black'] The color to use for missing data or if no parameter is set.
	   */
	  function Trajectory(cov, options) {
	    classCallCheck(this, Trajectory);

	    var _this = possibleConstructorReturn(this, (Trajectory.__proto__ || Object.getPrototypeOf(Trajectory)).call(this));

	    if (covutils.isDomain(cov)) {
	      cov = covutils.fromDomain(cov);
	      delete options.keys;
	      options.parameter = cov.parameters.keys().next().value;
	    }

	    if (!options.paletteExtent) {
	      options.paletteExtent = 'full';
	    }

	    L.Util.setOptions(_this, options);

	    _this._cov = cov;
	    var paramKey = options.keys ? options.keys[0] : options.parameter;
	    _this._param = paramKey ? cov.parameters.get(paramKey) : null;
	    _this._defaultColor = options.defaultColor || DEFAULT_COLOR;
	    return _this;
	  }

	  /**
	   * @ignore
	   * @override
	   */


	  createClass(Trajectory, [{
	    key: 'onAdd',
	    value: function onAdd(map) {
	      var _this2 = this;

	      this._map = map;

	      this.load().then(function () {
	        return _this2.initializePalette();
	      }).then(function () {
	        _this2._addTrajectoryLayers();
	        _this2.fire('afterAdd');
	      });
	    }

	    /**
	     * The coverage object associated to this layer.
	     * 
	     * @type {Coverage}
	     */

	  }, {
	    key: 'computePaletteExtent',


	    /**
	     * See {@link PaletteMixin}.
	     * 
	     * @ignore
	     */
	    value: function computePaletteExtent(extent) {
	      var range = this.range;

	      if (extent === 'full') {
	        // scan the whole range for min/max values

	      } else if (extent === 'fov') {
	        // scan the values that are currently in field of view on the map for min/max
	        var bounds = this._map.getBounds();

	        // TODO implement
	        throw new Error('NOT IMPLEMENTED YET');
	      } else {
	        throw new Error('Unknown extent specification: ' + extent);
	      }

	      extent = covutils.minMaxOfRange(range);
	      extent = enlargeExtentIfEqual(extent);
	      return Promise.resolve(extent);
	    }
	  }, {
	    key: '_addTrajectoryLayers',
	    value: function _addTrajectoryLayers() {
	      // add a Polyline in black, and coloured CircleMarker's for each domain point
	      var points = this.getLatLngs();
	      for (var i = 0; i < points.length; i++) {
	        var marker = new L.CircleMarker(points[i], {
	          color: this._getColor(this._getValue(i)),
	          opacity: 1,
	          fillOpacity: 1
	        });
	        this.addLayer(marker);
	      }

	      var polyline = L.polyline(points, {
	        color: 'black',
	        weight: 3
	      });

	      this.addLayer(polyline);
	    }

	    /**
	     * Returns the trajectory points as LatLng objects in the order they appear in the composite domain axis.
	     * 
	     * @return {Array<L.LatLng>}
	     */

	  }, {
	    key: 'getLatLngs',
	    value: function getLatLngs() {
	      var axis = this.domain.axes.get('composite');
	      var ix = axis.coordinates.indexOf(this._projX);
	      var iy = axis.coordinates.indexOf(this._projY);
	      var coords = [];
	      for (var i = 0; i < axis.values.length; i++) {
	        var x = axis.values[i][ix];
	        var y = axis.values[i][iy];
	        var latlng = this.projection.unproject({ x: x, y: y });
	        var coord = L.latLng(latlng);
	        coords.push(coord);
	      }
	      return coords;
	    }

	    /**
	     * Return the displayed value closest to the circle centre.
	     * If no point exists within the circle, undefined is returned,
	     * otherwise a number or null (for no-data).
	     * 
	     * @param {L.LatLng} latlng
	     * @param {number} maxDistance Maximum distance in meters between both points.
	     * @returns {number|null|undefined}
	     */

	  }, {
	    key: 'getValueAt',
	    value: function getValueAt(latlng, maxDistance) {
	      var points = this.getLatLngs();
	      var distances = points.map(function (p) {
	        return p.distanceTo(latlng);
	      });
	      var minDistance = Infinity;
	      var minIdx = void 0;
	      for (var i = 0; i < points.length; i++) {
	        var distance = distances[i];
	        if (distance <= maxDistance && distance < minDistance) {
	          minDistance = distance;
	          minIdx = i;
	        }
	      }
	      if (minIdx !== undefined) {
	        return this._getValue(minIdx);
	      }
	    }
	  }, {
	    key: '_getValue',
	    value: function _getValue(index) {
	      if (this._param) {
	        return this.range.get({ composite: index });
	      }
	    }

	    // NOTE: this returns a string, not an {r,g,b} object as in other classes!

	  }, {
	    key: '_getColor',
	    value: function _getColor(val) {
	      if (val === null) {
	        // no-data
	        return this._defaultColor;
	      } else if (val === undefined) {
	        // not fixed to a param
	        return this._defaultColor;
	      } else {
	        // use a palette
	        var idx = this.getPaletteIndex(val);
	        var _palette = this.palette,
	            red = _palette.red,
	            green = _palette.green,
	            blue = _palette.blue;

	        return 'rgb(' + red[idx] + ', ' + green[idx] + ', ' + blue[idx] + ')';
	      }
	    }

	    /**
	     * Redraw the layer.
	     */

	  }, {
	    key: 'redraw',
	    value: function redraw() {
	      this.clearLayers();
	      this._addTrajectoryLayers();
	    }
	  }, {
	    key: 'coverage',
	    get: function get() {
	      return this._cov;
	    }

	    /**
	     * The parameter that is visualized.
	     * 
	     * @type {Parameter}
	     */

	  }, {
	    key: 'parameter',
	    get: function get() {
	      return this._param;
	    }
	  }]);
	  return Trajectory;
	}(PaletteMixin(CoverageMixin(L.FeatureGroup)));

	// TODO nearly identical to VerticalProfile

	/**
	 * Renderer for Coverages conforming to the CovJSON domain type `PointSeries`.
	 * 
	 * This will simply display a dot on the map and fire a click event when a user clicks on it.
	 * The dot either has a defined standard color, or it uses a palette if a parameter is chosen.
	 * 
	 * @example
	 * var cov = ... // get Coverage data
	 * var layer = new C.PointSeries(cov, {
	 *   parameter: 'salinity',
	 *   time: new Date('2015-01-01T12:00:00Z'),
	 *   defaultColor: 'black',
	 *   palette: C.linearPalette(['#FFFFFF', '#000000'])
	 * })
	 * 
	 * @see https://covjson.org/domain-types/#pointseries
	 * 
	 * @emits {DataLayer#afterAdd} Layer is initialized and was added to the map
	 * @emits {DataLayer#dataLoading} Data loading has started
	 * @emits {DataLayer#dataLoad} Data loading has finished (also in case of errors)
	 * @emits {DataLayer#error} Error when loading data
	 * @emits {PaletteMixin#paletteChange} Palette has changed
	 * @emits {PaletteMixin#paletteExtentChange} Palette extent has changed
	 * @emits {Point#click} when the point was clicked
	 * 
	 * @extends {L.Layer}
	 * @extends {CoverageMixin}
	 * @extends {CircleMarkerMixin}
	 * @extends {PaletteMixin}
	 * @implements {DataLayer}
	 * @implements {PointDataLayer}
	 */
	var PointSeries = function (_PaletteMixin) {
	  inherits(PointSeries, _PaletteMixin);

	  /**
	   * An optional time axis target value can be defined with the 'time' property.
	   * The closest values on the time axis is chosen.
	   * 
	   * @param {Coverage|Domain} cov The coverage or domain object to visualize.
	   * @param {Object} [options] The options object.
	   * @param {string} [options.parameter] The key of the parameter to display, not needed for domain objects.
	   * @param {Date} [options.time] The initial time step to display.
	   * @param {Palette} [options.palette] The initial color palette to use, the default depends on the parameter type.
	   * @param {string} [options.paletteExtent='full'] The initial palette extent, either 'full' or specific: [-10,10].
	   * @param {string} [options.defaultColor='black'] The color to use for missing data or if no parameter is set.
	   * @param {boolean} [options.showNoData=false] Whether to draw the point if there is no data.
	   */
	  function PointSeries(cov, options) {
	    classCallCheck(this, PointSeries);

	    var _this = possibleConstructorReturn(this, (PointSeries.__proto__ || Object.getPrototypeOf(PointSeries)).call(this));

	    if (covutils.isDomain(cov)) {
	      cov = covutils.fromDomain(cov);
	      delete options.keys;
	      options.parameter = cov.parameters.keys().next().value;
	    }

	    if (!options.paletteExtent) {
	      options.paletteExtent = 'full';
	    }

	    L.Util.setOptions(_this, options);

	    _this._cov = cov;
	    var paramKey = options.keys ? options.keys[0] : options.parameter;
	    _this._param = paramKey ? cov.parameters.get(paramKey) : null;
	    _this._axesSubset = {
	      t: { coordPref: options.time }
	    };
	    _this._defaultColor = options.defaultColor || DEFAULT_COLOR;

	    /** @ignore */
	    _this.showNoData = options.showNoData; // if true, draw with default color
	    return _this;
	  }

	  /**
	   * @ignore
	   * @override
	   */


	  createClass(PointSeries, [{
	    key: 'onAdd',
	    value: function onAdd(map) {
	      var _this2 = this;

	      this._map = map;

	      this.load().then(function () {
	        return _this2.initializePalette();
	      }).then(function () {
	        _this2._addMarker();
	        _this2.fire('afterAdd');
	      });
	    }
	  }, {
	    key: '_loadCoverageSubset',
	    value: function _loadCoverageSubset() {
	      // adapted from Grid.js
	      var t = this._axesSubset.t;
	      if (t.coordPref == undefined) {
	        t.idx = t.coord = undefined;
	      } else {
	        var vals = this.domain.axes.get('t').values.map(function (v) {
	          return v.getTime();
	        });
	        t.idx = covutils.indexOfNearest(vals, t.coordPref.getTime());
	        t.coord = vals[t.idx];
	      }

	      // Note that we don't subset the coverage currently, since there is no real need for it
	    }

	    /**
	     * @ignore
	     * @override
	     */

	  }, {
	    key: 'onRemove',
	    value: function onRemove() {
	      this._removeMarker();
	    }

	    /**
	     * Returns the geographic bounds of the coverage, which is a degenerate box collapsed to a point.
	     * 
	     * @return {L.LatLngBounds}
	     */

	  }, {
	    key: 'getBounds',
	    value: function getBounds() {
	      return L.latLngBounds([this.getLatLng()]);
	    }

	    /**
	     * Returns the geographical position of the coverage.
	     * 
	     * @return {L.LatLng}
	     */

	  }, {
	    key: 'getLatLng',
	    value: function getLatLng() {
	      var x = this.domain.axes.get(this._projX).values[0];
	      var y = this.domain.axes.get(this._projY).values[0];
	      var latlng = this.projection.unproject({ x: x, y: y });
	      return L.latLng(latlng);
	    }

	    /**
	     * The coverage object associated to this layer.
	     * 
	     * @type {Coverage}
	     */

	  }, {
	    key: 'canUsePalette',


	    /**
	     * See {@link PaletteMixin}.
	     * 
	     * @ignore
	     */
	    value: function canUsePalette() {
	      return this.time !== undefined;
	    }

	    /**
	     * See {@link PaletteMixin}.
	     * 
	     * @ignore
	     */

	  }, {
	    key: 'computePaletteExtent',
	    value: function computePaletteExtent(extent) {
	      if (extent === 'full') {
	        if (!this.parameter) {
	          throw new Error('palette extent cannot be set when no parameter has been chosen');
	        }

	        extent = covutils.minMaxOfRange(this.range);
	        extent = enlargeExtentIfEqual(extent);
	        return Promise.resolve(extent);
	      } else {
	        throw new Error('Unknown extent specification: ' + extent);
	      }
	    }

	    /**
	     * Return the displayed value (number, or null for no-data),
	     * or undefined if not fixed to a t-coordinate or parameter.
	     * 
	     * @returns {number|null|undefined}
	     */

	  }, {
	    key: 'getValue',
	    value: function getValue() {
	      if (this._param && this._axesSubset.t.coord !== undefined) {
	        var val = this.range.get({ t: this._axesSubset.t.idx });
	        return val;
	      }
	    }

	    /**
	     * Return the displayed value if within the given distance of the reference point.
	     * If out of bounds, then undefined is returned, otherwise a number or null (for no data).
	     * 
	     * @param {L.LatLng} latlng
	     * @param {number} maxDistance Maximum distance in meters between both points.
	     * @returns {number|null|undefined}
	     */

	  }, {
	    key: 'getValueAt',
	    value: function getValueAt(latlng, maxDistance) {
	      var point = this.getLatLng();
	      if (point.distanceTo(latlng) <= maxDistance) {
	        return this.getValue();
	      }
	    }
	  }, {
	    key: '_getColor',
	    value: function _getColor() {
	      var val = this.getValue();
	      if (val === null) {
	        // no-data
	        return this._defaultColor;
	      } else if (val === undefined) {
	        // not fixed to a param or z-coordinate
	        return this._defaultColor;
	      } else {
	        // use a palette
	        var idx = this.getPaletteIndex(val);
	        var _palette = this.palette,
	            red = _palette.red,
	            green = _palette.green,
	            blue = _palette.blue;

	        return { r: red[idx], g: green[idx], b: blue[idx] };
	      }
	    }
	  }, {
	    key: 'coverage',
	    get: function get() {
	      return this._cov;
	    }

	    /**
	     * The parameter that is visualized.
	     * 
	     * @type {Parameter}
	     */

	  }, {
	    key: 'parameter',
	    get: function get() {
	      return this._param;
	    }

	    /**
	     * Sets the currently active time to the one closest to the given Date object.
	     * 
	     * @type {Date|undefined}
	     */

	  }, {
	    key: 'time',
	    set: function set(val) {
	      var old = this.time;
	      this._axesSubset.t.coordPref = val ? val.toISOString() : undefined;

	      this._loadCoverageSubset();
	      if (old === this.time) return;
	      this.redraw();
	      this.fire('axisChange', { axis: 'time' });
	    }

	    /**
	     * The currently active time on the temporal axis as Date object, 
	     * or undefined if no time is set.
	     * 
	     * @type {Date|undefined}
	     */
	    ,
	    get: function get() {
	      if (!this._axesSubset.t.coord) {
	        return;
	      }
	      var time = this.domain.axes.get('t').values[this._axesSubset.t.idx];
	      return new Date(time);
	    }

	    /**
	     * The time slices that make up the coverage.
	     * 
	     * @type {Array<Date>}
	     */

	  }, {
	    key: 'timeSlices',
	    get: function get() {
	      return this.domain.axes.get('t').values.map(function (t) {
	        return new Date(t);
	      });
	    }
	  }]);
	  return PointSeries;
	}(PaletteMixin(CircleMarkerMixin(CoverageMixin(L.Layer))));

	// 2016-02-23 Maik Riechert - adjust boilerplate to make it node compatible

	/**
	 * k-d Tree JavaScript - V 1.01
	 *
	 * https://github.com/ubilabs/kd-tree-javascript
	 *
	 * @author Mircea Pricop <pricop@ubilabs.net>, 2012
	 * @author Martin Kleppe <kleppe@ubilabs.net>, 2012
	 * @author Ubilabs http://ubilabs.net, 2012
	 * @license MIT License <http://www.opensource.org/licenses/mit-license.php>
	 */

	function Node(obj, dimension, parent) {
	  this.obj = obj;
	  this.left = null;
	  this.right = null;
	  this.parent = parent;
	  this.dimension = dimension;
	}

	function kdTree(points, metric, dimensions) {

	  var self = this;

	  function buildTree(points, depth, parent) {
	    var dim = depth % dimensions.length,
	        median,
	        node;

	    if (points.length === 0) {
	      return null;
	    }
	    if (points.length === 1) {
	      return new Node(points[0], dim, parent);
	    }

	    points.sort(function (a, b) {
	      return a[dimensions[dim]] - b[dimensions[dim]];
	    });

	    median = Math.floor(points.length / 2);
	    node = new Node(points[median], dim, parent);
	    node.left = buildTree(points.slice(0, median), depth + 1, node);
	    node.right = buildTree(points.slice(median + 1), depth + 1, node);

	    return node;
	  }

	  // Reloads a serialied tree
	  function loadTree(data) {
	    // Just need to restore the `parent` parameter
	    self.root = data;

	    function restoreParent(root) {
	      if (root.left) {
	        root.left.parent = root;
	        restoreParent(root.left);
	      }

	      if (root.right) {
	        root.right.parent = root;
	        restoreParent(root.right);
	      }
	    }

	    restoreParent(self.root);
	  }

	  // If points is not an array, assume we're loading a pre-built tree
	  if (!Array.isArray(points)) loadTree(points, metric, dimensions);else this.root = buildTree(points, 0, null);

	  // Convert to a JSON serializable structure; this just requires removing 
	  // the `parent` property
	  this.toJSON = function (src) {
	    if (!src) src = this.root;
	    var dest = new Node(src.obj, src.dimension, null);
	    if (src.left) dest.left = self.toJSON(src.left);
	    if (src.right) dest.right = self.toJSON(src.right);
	    return dest;
	  };

	  this.insert = function (point) {
	    function innerSearch(node, parent) {

	      if (node === null) {
	        return parent;
	      }

	      var dimension = dimensions[node.dimension];
	      if (point[dimension] < node.obj[dimension]) {
	        return innerSearch(node.left, node);
	      } else {
	        return innerSearch(node.right, node);
	      }
	    }

	    var insertPosition = innerSearch(this.root, null),
	        newNode,
	        dimension;

	    if (insertPosition === null) {
	      this.root = new Node(point, 0, null);
	      return;
	    }

	    newNode = new Node(point, (insertPosition.dimension + 1) % dimensions.length, insertPosition);
	    dimension = dimensions[insertPosition.dimension];

	    if (point[dimension] < insertPosition.obj[dimension]) {
	      insertPosition.left = newNode;
	    } else {
	      insertPosition.right = newNode;
	    }
	  };

	  this.remove = function (point) {
	    var node;

	    function nodeSearch(node) {
	      if (node === null) {
	        return null;
	      }

	      if (node.obj === point) {
	        return node;
	      }

	      var dimension = dimensions[node.dimension];

	      if (point[dimension] < node.obj[dimension]) {
	        return nodeSearch(node.left, node);
	      } else {
	        return nodeSearch(node.right, node);
	      }
	    }

	    function removeNode(node) {
	      var nextNode, nextObj, pDimension;

	      function findMin(node, dim) {
	        var dimension, own, left, right, min;

	        if (node === null) {
	          return null;
	        }

	        dimension = dimensions[dim];

	        if (node.dimension === dim) {
	          if (node.left !== null) {
	            return findMin(node.left, dim);
	          }
	          return node;
	        }

	        own = node.obj[dimension];
	        left = findMin(node.left, dim);
	        right = findMin(node.right, dim);
	        min = node;

	        if (left !== null && left.obj[dimension] < own) {
	          min = left;
	        }
	        if (right !== null && right.obj[dimension] < min.obj[dimension]) {
	          min = right;
	        }
	        return min;
	      }

	      if (node.left === null && node.right === null) {
	        if (node.parent === null) {
	          self.root = null;
	          return;
	        }

	        pDimension = dimensions[node.parent.dimension];

	        if (node.obj[pDimension] < node.parent.obj[pDimension]) {
	          node.parent.left = null;
	        } else {
	          node.parent.right = null;
	        }
	        return;
	      }

	      // If the right subtree is not empty, swap with the minimum element on the
	      // node's dimension. If it is empty, we swap the left and right subtrees and
	      // do the same.
	      if (node.right !== null) {
	        nextNode = findMin(node.right, node.dimension);
	        nextObj = nextNode.obj;
	        removeNode(nextNode);
	        node.obj = nextObj;
	      } else {
	        nextNode = findMin(node.left, node.dimension);
	        nextObj = nextNode.obj;
	        removeNode(nextNode);
	        node.right = node.left;
	        node.left = null;
	        node.obj = nextObj;
	      }
	    }

	    node = nodeSearch(self.root);

	    if (node === null) {
	      return;
	    }

	    removeNode(node);
	  };

	  this.nearest = function (point, maxNodes, maxDistance) {
	    var i, result, bestNodes;

	    bestNodes = new BinaryHeap(function (e) {
	      return -e[1];
	    });

	    function nearestSearch(node) {
	      var bestChild,
	          dimension = dimensions[node.dimension],
	          ownDistance = metric(point, node.obj),
	          linearPoint = {},
	          linearDistance,
	          otherChild,
	          i;

	      function saveNode(node, distance) {
	        bestNodes.push([node, distance]);
	        if (bestNodes.size() > maxNodes) {
	          bestNodes.pop();
	        }
	      }

	      for (i = 0; i < dimensions.length; i += 1) {
	        if (i === node.dimension) {
	          linearPoint[dimensions[i]] = point[dimensions[i]];
	        } else {
	          linearPoint[dimensions[i]] = node.obj[dimensions[i]];
	        }
	      }

	      linearDistance = metric(linearPoint, node.obj);

	      if (node.right === null && node.left === null) {
	        if (bestNodes.size() < maxNodes || ownDistance < bestNodes.peek()[1]) {
	          saveNode(node, ownDistance);
	        }
	        return;
	      }

	      if (node.right === null) {
	        bestChild = node.left;
	      } else if (node.left === null) {
	        bestChild = node.right;
	      } else {
	        if (point[dimension] < node.obj[dimension]) {
	          bestChild = node.left;
	        } else {
	          bestChild = node.right;
	        }
	      }

	      nearestSearch(bestChild);

	      if (bestNodes.size() < maxNodes || ownDistance < bestNodes.peek()[1]) {
	        saveNode(node, ownDistance);
	      }

	      if (bestNodes.size() < maxNodes || Math.abs(linearDistance) < bestNodes.peek()[1]) {
	        if (bestChild === node.left) {
	          otherChild = node.right;
	        } else {
	          otherChild = node.left;
	        }
	        if (otherChild !== null) {
	          nearestSearch(otherChild);
	        }
	      }
	    }

	    if (maxDistance) {
	      for (i = 0; i < maxNodes; i += 1) {
	        bestNodes.push([null, maxDistance]);
	      }
	    }

	    if (self.root) nearestSearch(self.root);

	    result = [];

	    for (i = 0; i < Math.min(maxNodes, bestNodes.content.length); i += 1) {
	      if (bestNodes.content[i][0]) {
	        result.push([bestNodes.content[i][0].obj, bestNodes.content[i][1]]);
	      }
	    }
	    return result;
	  };

	  this.balanceFactor = function () {
	    function height(node) {
	      if (node === null) {
	        return 0;
	      }
	      return Math.max(height(node.left), height(node.right)) + 1;
	    }

	    function count(node) {
	      if (node === null) {
	        return 0;
	      }
	      return count(node.left) + count(node.right) + 1;
	    }

	    return height(self.root) / (Math.log(count(self.root)) / Math.log(2));
	  };
	}

	// Binary heap implementation from:
	// http://eloquentjavascript.net/appendix2.html

	function BinaryHeap(scoreFunction) {
	  this.content = [];
	  this.scoreFunction = scoreFunction;
	}

	BinaryHeap.prototype = {
	  push: function push(element) {
	    // Add the new element to the end of the array.
	    this.content.push(element);
	    // Allow it to bubble up.
	    this.bubbleUp(this.content.length - 1);
	  },

	  pop: function pop() {
	    // Store the first element so we can return it later.
	    var result = this.content[0];
	    // Get the element at the end of the array.
	    var end = this.content.pop();
	    // If there are any elements left, put the end element at the
	    // start, and let it sink down.
	    if (this.content.length > 0) {
	      this.content[0] = end;
	      this.sinkDown(0);
	    }
	    return result;
	  },

	  peek: function peek() {
	    return this.content[0];
	  },

	  remove: function remove(node) {
	    var len = this.content.length;
	    // To remove a value, we must search through the array to find
	    // it.
	    for (var i = 0; i < len; i++) {
	      if (this.content[i] == node) {
	        // When it is found, the process seen in 'pop' is repeated
	        // to fill up the hole.
	        var end = this.content.pop();
	        if (i != len - 1) {
	          this.content[i] = end;
	          if (this.scoreFunction(end) < this.scoreFunction(node)) this.bubbleUp(i);else this.sinkDown(i);
	        }
	        return;
	      }
	    }
	    throw new Error("Node not found.");
	  },

	  size: function size() {
	    return this.content.length;
	  },

	  bubbleUp: function bubbleUp(n) {
	    // Fetch the element that has to be moved.
	    var element = this.content[n];
	    // When at 0, an element can not go up any further.
	    while (n > 0) {
	      // Compute the parent element's index, and fetch it.
	      var parentN = Math.floor((n + 1) / 2) - 1,
	          parent = this.content[parentN];
	      // Swap the elements if the parent is greater.
	      if (this.scoreFunction(element) < this.scoreFunction(parent)) {
	        this.content[parentN] = element;
	        this.content[n] = parent;
	        // Update 'n' to continue at the new position.
	        n = parentN;
	      }
	      // Found a parent that is less, no need to move it further.
	      else {
	          break;
	        }
	    }
	  },

	  sinkDown: function sinkDown(n) {
	    // Look up the target element and its score.
	    var length = this.content.length,
	        element = this.content[n],
	        elemScore = this.scoreFunction(element);

	    while (true) {
	      // Compute the indices of the child elements.
	      var child2N = (n + 1) * 2,
	          child1N = child2N - 1;
	      // This is used to store the new position of the element,
	      // if any.
	      var swap = null;
	      // If the first child exists (is inside the array)...
	      if (child1N < length) {
	        // Look it up and compute its score.
	        var child1 = this.content[child1N],
	            child1Score = this.scoreFunction(child1);
	        // If the score is less than our element's, we need to swap.
	        if (child1Score < elemScore) swap = child1N;
	      }
	      // Do the same checks for the other child.
	      if (child2N < length) {
	        var child2 = this.content[child2N],
	            child2Score = this.scoreFunction(child2);
	        if (child2Score < (swap == null ? elemScore : child1Score)) {
	          swap = child2N;
	        }
	      }

	      // If the element needs to be moved, swap it, and continue.
	      if (swap != null) {
	        this.content[n] = this.content[swap];
	        this.content[swap] = element;
	        n = swap;
	      }
	      // Otherwise, we are done.
	      else {
	          break;
	        }
	    }
	  }
	};

	/**
	 * A collection of points sharing the same parameters and coordinate referencing system.
	 * 
	 * @see https://covjson.org/domain-types/#point
	 * 
	 * @emits {DataLayer#afterAdd} Layer is initialized and was added to the map
	 * @emits {DataLayer#error} Error when loading data
	 * @emits {PaletteMixin#paletteChange} Palette has changed
	 * @emits {PaletteMixin#paletteExtentChange} Palette extent has changed
	 * @emits {Point#click} when the point was clicked
	 * 
	 * @extends {L.Layer}
	 * @extends {PaletteMixin} 
	 */
	var PointCollection = function (_PaletteMixin) {
	  inherits(PointCollection, _PaletteMixin);

	  /**
	   * @param {CoverageCollection} covcoll The coverage collection to visualize.
	   * @param {Object} [options] The options object.
	   * @param {string} [options.parameter] The key of the parameter to display.
	   * @param {Palette} [options.palette] The initial color palette to use, the default depends on the parameter type.
	   * @param {string} [options.paletteExtent='full'] The initial palette extent, either 'full', 'fov', or specific: [-10,10].
	   * @param {string} [options.defaultColor='black'] The color to use for missing data or if no parameter is set.
	   * @param {class} [options.pointClass=Point] The {@link PointDataLayer} class to use for the individual points.
	   * @param {function} [options.pointOptionsFn] A function that returns additional options to apply for each point class instance.  
	   */
	  function PointCollection(covcoll) {
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    classCallCheck(this, PointCollection);

	    // TODO how should we handle collection paging?

	    var _this = possibleConstructorReturn(this, (PointCollection.__proto__ || Object.getPrototypeOf(PointCollection)).call(this));

	    if (!options.paletteExtent) {
	      options.paletteExtent = 'full';
	    }

	    L.Util.setOptions(_this, options);

	    _this._covcoll = covcoll;
	    var paramKey = options.keys ? options.keys[0] : options.parameter;
	    _this._param = paramKey ? covcoll.parameters.get(paramKey) : null;
	    _this._defaultColor = options.defaultColor || DEFAULT_COLOR;
	    _this._pointClass = options.pointClass || Point;

	    _this._layerGroup = L.layerGroup();
	    _this._layers = [];
	    _this._kdtree = undefined;

	    _this.on('paletteChange', function () {
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = _this._layers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var layer = _step.value;

	          layer.palette = _this.palette;
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }
	    });
	    _this.on('paletteExtentChange', function () {
	      var _iteratorNormalCompletion2 = true;
	      var _didIteratorError2 = false;
	      var _iteratorError2 = undefined;

	      try {
	        for (var _iterator2 = _this._layers[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	          var layer = _step2.value;

	          layer.paletteExtent = _this.paletteExtent;
	        }
	      } catch (err) {
	        _didIteratorError2 = true;
	        _iteratorError2 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion2 && _iterator2.return) {
	            _iterator2.return();
	          }
	        } finally {
	          if (_didIteratorError2) {
	            throw _iteratorError2;
	          }
	        }
	      }
	    });
	    return _this;
	  }

	  /**
	   * @ignore
	   * @override
	   */


	  createClass(PointCollection, [{
	    key: 'onAdd',
	    value: function onAdd(map) {
	      this._map = map;
	      this._layerLoadCount = 0;
	      this._layerErrors = [];

	      var options = {
	        keys: this._param ? [this._param.key] : undefined,
	        defaultColor: this._defaultColor,
	        palette: this.palette,
	        paletteExtent: this.paletteExtent
	      };
	      if (this.options.pointOptionsFn) {
	        var opts = this.options.pointOptionsFn();
	        for (var key in opts) {
	          options[key] = opts[key];
	        }
	      }
	      var _iteratorNormalCompletion3 = true;
	      var _didIteratorError3 = false;
	      var _iteratorError3 = undefined;

	      try {
	        for (var _iterator3 = this._covcoll.coverages[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	          var cov = _step3.value;

	          var layer = new this._pointClass(cov, options);
	          this._attachListeners(layer, cov);
	          this._layerGroup.addLayer(layer);
	          this._layers.push(layer);
	          layer.load();
	          if (this._popupFn) {
	            var popup = this._popupFn(layer.coverage);
	            layer.bindPopup(popup);
	          }
	        }
	      } catch (err) {
	        _didIteratorError3 = true;
	        _iteratorError3 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion3 && _iterator3.return) {
	            _iterator3.return();
	          }
	        } finally {
	          if (_didIteratorError3) {
	            throw _iteratorError3;
	          }
	        }
	      }
	    }

	    /**
	     * @ignore
	     * @override
	     */

	  }, {
	    key: 'onRemove',
	    value: function onRemove(map) {
	      map.removeLayer(this._layerGroup);
	      this._layerGroup = L.layerGroup();
	      this._layers = [];
	    }

	    /**
	     * Binds a popup to each point instance.
	     * 
	     * @param {function(cov: Coverage):String|HTMLElement|L.Popup} fn Returns the popup for a given point coverage. 
	     */

	  }, {
	    key: 'bindPopupEach',
	    value: function bindPopupEach(fn) {
	      this._popupFn = fn;
	    }
	  }, {
	    key: '_attachListeners',
	    value: function _attachListeners(layer, cov) {
	      var _this2 = this;

	      layer.once('dataLoad', function () {
	        ++_this2._layerLoadCount;
	        _this2._fireIfOnAddDone();
	      }).once('error', function (e) {
	        _this2._layerErrors.push(e);
	      }).on('click', function (e) {
	        e.coverage = cov;
	        _this2.fire('click', e);
	      });
	    }
	  }, {
	    key: '_fireIfOnAddDone',
	    value: function _fireIfOnAddDone() {
	      var _this3 = this;

	      if (this._layerLoadCount === this._layers.length) {
	        if (this._layerErrors.length > 0) {
	          this.fire('error', { errors: this._layerErrors });
	        } else {
	          this._initKdtree();
	          this.initializePalette().then(function () {
	            _this3._layerGroup.addTo(_this3._map);
	            _this3.fire('afterAdd');
	          });
	        }
	      }
	    }
	  }, {
	    key: '_initKdtree',
	    value: function _initKdtree() {
	      var points = this._layers.map(function (layer) {
	        var point = layer.getLatLng();
	        point.layer = layer;
	        return point;
	      });
	      var distance = function distance(point1, point2) {
	        return L.LatLng.prototype.distanceTo.call(point1, point2);
	      };
	      var dimensions = ['lat', 'lng'];
	      this._kdtree = new kdTree(points, distance, dimensions);
	    }

	    /**
	     * Returns the geographic bounds of the coverage collection.
	     * 
	     * @return {L.LatLngBounds}
	     */

	  }, {
	    key: 'getBounds',
	    value: function getBounds() {
	      return L.latLngBounds(this._layers.map(function (layer) {
	        return layer.getLatLng();
	      }));
	    }

	    /**
	     * Return the displayed value of the point coverage closest to
	     * the given position and within the given maximum distance.
	     * If no coverage is found, undefined is returned, otherwise
	     * a number or null (no-data).
	     * 
	     * @param {L.LatLng} latlng reference position
	     * @param {number} maxDistance
	     *   Maximum distance in meters that the point coverage may be
	     *   apart from the given position.
	     * @return {number|null|undefined}
	     */

	  }, {
	    key: 'getValueAt',
	    value: function getValueAt(latlng, maxDistance) {
	      var points = this._kdtree.nearest(latlng, 1, maxDistance);
	      if (points.length > 0) {
	        var point = points[0][0];
	        var val = point.layer.getValue();
	        return val;
	      }
	    }

	    /**
	     * The parameter that is visualized.
	     * 
	     * @type {Parameter}
	     */

	  }, {
	    key: 'computePaletteExtent',


	    /**
	     * See {@link PaletteMixin}.
	     * 
	     * @ignore
	     */
	    value: function computePaletteExtent(extent) {
	      if (!this._param) {
	        throw new Error('palette extent cannot be set when no parameter has been chosen');
	      }

	      var layers = void 0;
	      if (extent === 'full') {
	        layers = this._layers;
	      } else if (extent === 'fov') {
	        var bounds = this._map.getBounds();
	        layers = this._layers.filter(function (layer) {
	          return bounds.contains(layer.getLatLng());
	        });
	      } else {
	        throw new Error('Unsupported: ' + extent);
	      }

	      var min = Infinity;
	      var max = -Infinity;
	      var _iteratorNormalCompletion4 = true;
	      var _didIteratorError4 = false;
	      var _iteratorError4 = undefined;

	      try {
	        for (var _iterator4 = layers[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	          var layer = _step4.value;

	          var val = layer.getValue();
	          if (val != null) {
	            min = Math.min(min, val);
	            max = Math.max(max, val);
	          }
	        }
	      } catch (err) {
	        _didIteratorError4 = true;
	        _iteratorError4 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion4 && _iterator4.return) {
	            _iterator4.return();
	          }
	        } finally {
	          if (_didIteratorError4) {
	            throw _iteratorError4;
	          }
	        }
	      }

	      extent = enlargeExtentIfEqual([min, max]);
	      return Promise.resolve(extent);
	    }

	    /**
	     * Redraw each point layer.
	     */

	  }, {
	    key: 'redraw',
	    value: function redraw() {
	      var _iteratorNormalCompletion5 = true;
	      var _didIteratorError5 = false;
	      var _iteratorError5 = undefined;

	      try {
	        for (var _iterator5 = this._layers[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
	          var layer = _step5.value;

	          layer.redraw();
	        }
	      } catch (err) {
	        _didIteratorError5 = true;
	        _iteratorError5 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion5 && _iterator5.return) {
	            _iterator5.return();
	          }
	        } finally {
	          if (_didIteratorError5) {
	            throw _iteratorError5;
	          }
	        }
	      }
	    }
	  }, {
	    key: 'parameter',
	    get: function get() {
	      return this._param;
	    }
	  }]);
	  return PointCollection;
	}(PaletteMixin(L.Layer));

	/**
	 * Renderer for Coverages conforming to the CovJSON domain type `VerticalProfile`.
	 * 
	 * This will simply display a dot on the map and fire a click event when a user clicks on it.
	 * The dot either has a defined standard color, or it uses
	 * a palette together with a target depth if a parameter is chosen.
	 * 
	 * @example
	 * var cov = ... // get Coverage data
	 * var layer = new C.VerticalProfile(cov, {
	 *   parameter: 'salinity',
	 *   vertical: 30,
	 *   defaultColor: 'black',
	 *   palette: C.linearPalette(['#FFFFFF', '#000000'])
	 * })
	 * 
	 * @see https://covjson.org/domain-types/#verticalprofile
	 * 
	 * @emits {DataLayer#afterAdd} Layer is initialized and was added to the map
	 * @emits {DataLayer#dataLoading} Data loading has started
	 * @emits {DataLayer#dataLoad} Data loading has finished (also in case of errors)
	 * @emits {DataLayer#error} Error when loading data
	 * @emits {DataLayer#axisChange} Axis coordinate has changed (e.axis === 'vertical')
	 * @emits {PaletteMixin#paletteChange} Palette has changed
	 * @emits {PaletteMixin#paletteExtentChange} Palette extent has changed
	 * @emits {Point#click} when the point was clicked
	 * 
	 * @extends {L.Layer}
	 * @extends {CoverageMixin}
	 * @extends {CircleMarkerMixin}
	 * @extends {PaletteMixin}
	 * @implements {DataLayer}
	 * @implements {PointDataLayer}
	 */
	var VerticalProfile = function (_PaletteMixin) {
	  inherits(VerticalProfile, _PaletteMixin);

	  /**
	   * An optional vertical axis target value can be defined with the 'vertical' property.
	   * The closest values on the vertical axis is chosen.
	   * 
	   * @param {Coverage|Domain} cov The coverage or domain object to visualize.
	   * @param {Object} [options] The options object.
	   * @param {string} [options.parameter] The key of the parameter to display, not needed for domain objects.
	   * @param {number} [options.vertical] The initial vertical slice to display.
	   * @param {Palette} [options.palette] The initial color palette to use, the default depends on the parameter type.
	   * @param {string} [options.paletteExtent='full'] The initial palette extent, either 'full' or specific: [-10,10].
	   * @param {string} [options.defaultColor='black'] The color to use for missing data or if no parameter is set.
	   * @param {boolean} [options.showNoData=false] Whether to draw the point if there is no data.
	   */
	  function VerticalProfile(cov, options) {
	    classCallCheck(this, VerticalProfile);

	    var _this = possibleConstructorReturn(this, (VerticalProfile.__proto__ || Object.getPrototypeOf(VerticalProfile)).call(this));

	    if (covutils.isDomain(cov)) {
	      cov = covutils.fromDomain(cov);
	      delete options.keys;
	      options.parameter = cov.parameters.keys().next().value;
	    }

	    if (!options.paletteExtent) {
	      options.paletteExtent = 'full';
	    }

	    L.Util.setOptions(_this, options);

	    _this._cov = cov;
	    var paramKey = options.keys ? options.keys[0] : options.parameter;
	    _this._param = paramKey ? cov.parameters.get(paramKey) : null;
	    _this._axesSubset = {
	      z: { coordPref: options.vertical }
	    };
	    _this._defaultColor = options.defaultColor || DEFAULT_COLOR;

	    /** @ignore */
	    _this.showNoData = options.showNoData; // if true, draw with default color
	    return _this;
	  }

	  /**
	   * @ignore
	   * @override
	   */


	  createClass(VerticalProfile, [{
	    key: 'onAdd',
	    value: function onAdd(map) {
	      var _this2 = this;

	      this._map = map;

	      this.load().then(function () {
	        return _this2.initializePalette();
	      }).then(function () {
	        _this2._addMarker();
	        _this2.fire('afterAdd');
	      });
	    }
	  }, {
	    key: '_loadCoverageSubset',
	    value: function _loadCoverageSubset() {
	      // adapted from Grid.js
	      var z = this._axesSubset.z;
	      if (z.coordPref == undefined) {
	        z.idx = z.coord = undefined;
	      } else {
	        var vals = this.domain.axes.get('z').values;
	        z.idx = covutils.indexOfNearest(vals, z.coordPref);
	        z.coord = vals[z.idx];
	      }

	      // Note that we don't subset the coverage currently, since there is no real need for it
	    }

	    /**
	     * @ignore
	     * @override
	     */

	  }, {
	    key: 'onRemove',
	    value: function onRemove() {
	      this._removeMarker();
	    }

	    /**
	     * Returns the geographic bounds of the coverage, which is a degenerate box collapsed to a point.
	     * 
	     * @return {L.LatLngBounds}
	     */

	  }, {
	    key: 'getBounds',
	    value: function getBounds() {
	      return L.latLngBounds([this.getLatLng()]);
	    }

	    /**
	     * Returns the geographical position of the coverage.
	     * 
	     * @return {L.LatLng}
	     */

	  }, {
	    key: 'getLatLng',
	    value: function getLatLng() {
	      var x = this.domain.axes.get(this._projX).values[0];
	      var y = this.domain.axes.get(this._projY).values[0];
	      var latlng = this.projection.unproject({ x: x, y: y });
	      return L.latLng(latlng);
	    }

	    /**
	     * The coverage object associated to this layer.
	     * 
	     * @type {Coverage}
	     */

	  }, {
	    key: 'canUsePalette',


	    /**
	     * See {@link PaletteMixin}.
	     * 
	     * @ignore
	     */
	    value: function canUsePalette() {
	      return this.vertical !== undefined;
	    }

	    /**
	     * See {@link PaletteMixin}.
	     * 
	     * @ignore
	     */

	  }, {
	    key: 'computePaletteExtent',
	    value: function computePaletteExtent(extent) {
	      if (extent === 'full') {
	        if (!this.parameter) {
	          throw new Error('palette extent cannot be set when no parameter has been chosen');
	        }

	        extent = covutils.minMaxOfRange(this.range);
	        extent = enlargeExtentIfEqual(extent);
	        return Promise.resolve(extent);
	      } else {
	        throw new Error('Unknown extent specification: ' + extent);
	      }
	    }

	    /**
	     * Return the displayed value (number, or null for no-data),
	     * or undefined if not fixed to a z-coordinate or parameter.
	     * 
	     * @returns {number|null|undefined}
	     */

	  }, {
	    key: 'getValue',
	    value: function getValue() {
	      if (this._param && this._axesSubset.z.coord !== undefined) {
	        var val = this.range.get({ z: this._axesSubset.z.idx });
	        return val;
	      }
	    }

	    /**
	     * Return the displayed value if within the given distance of the reference point.
	     * If out of bounds, then undefined is returned, otherwise a number or null (for no data).
	     * 
	     * @param {L.LatLng} latlng
	     * @param {number} maxDistance Maximum distance in meters between both points.
	     * @returns {number|null|undefined}
	     */

	  }, {
	    key: 'getValueAt',
	    value: function getValueAt(latlng, maxDistance) {
	      var point = this.getLatLng();
	      if (point.distanceTo(latlng) <= maxDistance) {
	        return this.getValue();
	      }
	    }
	  }, {
	    key: '_getColor',
	    value: function _getColor(val) {
	      if (val === null) {
	        // no-data
	        return this._defaultColor;
	      } else if (val === undefined) {
	        // not fixed to a param or z-coordinate
	        return this._defaultColor;
	      } else {
	        // use a palette
	        var idx = this.getPaletteIndex(val);
	        var _palette = this.palette,
	            red = _palette.red,
	            green = _palette.green,
	            blue = _palette.blue;

	        return { r: red[idx], g: green[idx], b: blue[idx] };
	      }
	    }
	  }, {
	    key: 'coverage',
	    get: function get() {
	      return this._cov;
	    }

	    /**
	     * The parameter that is visualized.
	     * 
	     * @type {Parameter}
	     */

	  }, {
	    key: 'parameter',
	    get: function get() {
	      return this._param;
	    }

	    /**
	     * The currently active vertical coordinate, or undefined if no coordinate is set.
	     * 
	     * @type {number|undefined}
	     */

	  }, {
	    key: 'vertical',
	    get: function get() {
	      return this._axesSubset.z.coord;
	    }

	    /**
	     * Sets the currently active vertical coordinate to the one closest to the given value.
	     * 
	     * @type {number|undefined}
	     */
	    ,
	    set: function set(val) {
	      this._axesSubset.z.coordPref = val;
	      this._loadCoverageSubset();
	      this.redraw();
	      this.fire('axisChange', { axis: 'vertical' });
	    }

	    /**
	     * The vertical slices that make up the coverage.
	     * 
	     * @type {Array<number>}
	     */

	  }, {
	    key: 'verticalSlices',
	    get: function get() {
	      var vals = this.domain.axes.get('z').values;
	      if (ArrayBuffer.isView(vals)) {
	        // convert to plain Array to allow easier use
	        vals = [].concat(toConsumableArray(vals));
	      }
	      return vals;
	    }
	  }]);
	  return VerticalProfile;
	}(PaletteMixin(CircleMarkerMixin(CoverageMixin(L.Layer))));

	/**
	 * A collection of vertical profiles sharing the same parameters and coordinate referencing system.
	 * 
	 * @see https://covjson.org/domain-types/#verticalprofile
	 * 
	 * @emits {DataLayer#afterAdd} Layer is initialized and was added to the map
	 * @emits {DataLayer#error} Error when loading data
	 * @emits {PaletteMixin#paletteChange} Palette has changed
	 * @emits {PaletteMixin#paletteExtentChange} Palette extent has changed
	 * @emits {Point#click} when the point was clicked
	 */
	var VerticalProfileCollection = function (_PointCollection) {
	  inherits(VerticalProfileCollection, _PointCollection);

	  /**
	   * @param {CoverageCollection} covcoll The coverage collection to visualize.
	   * @param {Object} [options] The options object.
	   * @param {string} [options.parameter] The key of the parameter to display.
	   * @param {Palette} [options.palette] The initial color palette to use, the default depends on the parameter type.
	   * @param {string} [options.paletteExtent='full'] The initial palette extent, either 'full', 'fov', or specific: [-10,10].
	   * @param {string} [options.defaultColor='black'] The color to use for missing data or if no parameter is set.  
	   */
	  function VerticalProfileCollection(covcoll, options) {
	    classCallCheck(this, VerticalProfileCollection);

	    options.pointClass = VerticalProfile;

	    // has to be after super() as it references 'this'    
	    var _this = possibleConstructorReturn(this, (VerticalProfileCollection.__proto__ || Object.getPrototypeOf(VerticalProfileCollection)).call(this, covcoll, options));

	    options.pointOptionsFn = function () {
	      return {
	        vertical: _this._vertical
	      };
	    };

	    _this._vertical = options.vertical;
	    return _this;
	  }

	  /**
	   * Sets the currently active vertical coordinate for all vertical profiles to the one closest to the given value.
	   * 
	   * @type {number|undefined}
	   */


	  createClass(VerticalProfileCollection, [{
	    key: 'canUsePalette',


	    /**
	     * See {@link PaletteMixin}.
	     * 
	     * @ignore
	     */
	    value: function canUsePalette() {
	      return this._vertical !== undefined;
	    }
	  }, {
	    key: 'vertical',
	    set: function set(val) {
	      this._vertical = val;
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = this._layers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var layer = _step.value;

	          layer.vertical = val;
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }
	    }
	  }]);
	  return VerticalProfileCollection;
	}(PointCollection);

	/** @ignore */
	var DEFAULT_COLOR$1 = 'black';

	/**
	 * The `click` event, signalling that a polygon has been clicked.
	 * 
	 * @typedef {L.MouseEvent} MultiPolygon#click
	 * @property {number} index The axis index of the polygon that was clicked.
	 * @property {L.LatLng} latlng The geographical point where the click event occured.
	 */

	/**
	 * Renderer for Coverages and Domains conforming to CovJSON domain type `MultiPolygon`.
	 *
	 * @example
	 * var cov = ... // get Coverage data
	 * var layer = new C.MultiPolygon(cov, {
	 *   parameter: 'salinity',
	 *   defaultColor: 'black',
	 *   palette: C.linearPalette(['#FFFFFF', '#000000'])
	 * })
	 * 
	 * @see https://covjson.org/domain-types/#multipolygon
	 * 
	 * @emits {DataLayer#afterAdd} Layer is initialized and was added to the map
	 * @emits {DataLayer#dataLoading} Data loading has started
	 * @emits {DataLayer#dataLoad} Data loading has finished (also in case of errors)
	 * @emits {DataLayer#error} Error when loading data
	 * @emits {PaletteMixin#paletteChange} Palette has changed
	 * @emits {PaletteMixin#paletteExtentChange} Palette extent has changed
	 * @emits {MultiPolygon#click} when a polygon was clicked
	 * 
	 * @extends {L.Layer}
	 * @extends {CoverageMixin}
	 * @extends {PaletteMixin}
	 * @implements {DataLayer}
	 */
	var MultiPolygon = function (_PaletteMixin) {
	  inherits(MultiPolygon, _PaletteMixin);

	  /**
	   * The key of the parameter to display can be given in the 'parameter' options property,
	   * it will be ignored if the coverage data object is a Domain object.
	   * 
	   * @param {Coverage|Domain} cov The coverage or domain object to visualize.
	   * @param {Object} [options] The options object.
	   * @param {string} [options.parameter] The key of the parameter to display, not needed for domain objects.
	   * @param {Palette} [options.palette] The initial color palette to use, the default depends on the parameter type.
	   * @param {string} [options.paletteExtent='full'] The initial palette extent, either 'full' or specific: [-10,10].
	   * @param {string} [options.defaultColor='black'] The color to use for missing data or if no parameter is set.
	   */
	  function MultiPolygon(cov, options) {
	    classCallCheck(this, MultiPolygon);

	    var _this = possibleConstructorReturn(this, (MultiPolygon.__proto__ || Object.getPrototypeOf(MultiPolygon)).call(this));

	    if (covutils.isDomain(cov)) {
	      cov = covutils.fromDomain(cov);
	      options.parameter = cov.parameters.keys().next().value;
	      delete options.keys;
	    }

	    if (!options.paletteExtent) {
	      options.paletteExtent = 'full';
	    }

	    L.Util.setOptions(_this, options);

	    _this._cov = cov;
	    var paramKey = options.keys ? options.keys[0] : options.parameter;
	    _this._param = paramKey ? cov.parameters.get(paramKey) : null;
	    _this._defaultColor = options.defaultColor || DEFAULT_COLOR$1;
	    return _this;
	  }

	  /**
	   * @ignore
	   * @override
	   */


	  createClass(MultiPolygon, [{
	    key: 'onAdd',
	    value: function onAdd(map) {
	      var _this2 = this;

	      this._map = map;

	      this.load().then(function () {
	        return _this2.initializePalette();
	      }).then(function () {
	        _this2._unproject();
	        _this2._addPolygons();
	        _this2._pointInPolygonPreprocess();
	        _this2.fire('afterAdd');
	      });
	    }
	  }, {
	    key: '_unproject',
	    value: function _unproject() {
	      var unproject = this.projection.unproject;
	      var axis = this.domain.axes.get('composite');
	      var ix = axis.coordinates.indexOf(this._projX);
	      var iy = axis.coordinates.indexOf(this._projY);

	      this._polygonsLonLat = axis.values.map(function (polygon) {
	        return polygon.map(function (ring) {
	          return ring.map(function (coords) {
	            var _unproject2 = unproject({ x: coords[ix], y: coords[iy] }),
	                lat = _unproject2.lat,
	                lon = _unproject2.lon;

	            return [lon, lat];
	          });
	        });
	      });
	    }

	    /**
	     * @ignore
	     * @override
	     */

	  }, {
	    key: 'onRemove',
	    value: function onRemove(map) {
	      this._removePolygons();
	    }

	    /**
	     * Returns the geographic bounds of the coverage.
	     * 
	     * @return {L.LatLngBounds}
	     */

	  }, {
	    key: 'getBounds',
	    value: function getBounds() {
	      return this._geojson.getBounds();
	    }

	    /**
	     * Returns the geographical center position of the coverage based on its bounding box.
	     * 
	     * @return {L.LatLng}
	     */

	  }, {
	    key: 'getLatLng',
	    value: function getLatLng() {
	      return this.getBounds().getCenter();
	    }

	    /**
	     * The coverage object associated to this layer.
	     * 
	     * @type {Coverage}
	     */

	  }, {
	    key: 'computePaletteExtent',


	    /**
	     * See {@link PaletteMixin}.
	     * 
	     * @ignore
	     */
	    value: function computePaletteExtent(extent) {
	      if (extent === 'full') {
	        if (!this.parameter) {
	          throw new Error('palette extent cannot be computed when no parameter has been chosen');
	        }

	        extent = covutils.minMaxOfRange(this.range);
	        extent = enlargeExtentIfEqual(extent);
	        return Promise.resolve(extent);
	      } else {
	        throw new Error('Unknown extent specification: ' + extent);
	      }
	    }
	  }, {
	    key: '_pointInPolygonPreprocess',
	    value: function _pointInPolygonPreprocess() {
	      var polygons = this._polygonsLonLat;
	      // TODO we assume spherical coordinates for now
	      var isCartesian = false;
	      // A bit evil since this modifies in-place, but nothing bad should happen.
	      polygons.forEach(function (p) {
	        return covutils.ensureClockwisePolygon(p, isCartesian);
	      });
	      this._pointInPolygons = covutils.getPointInPolygonsFn(polygons);
	    }
	  }, {
	    key: '_addPolygons',
	    value: function _addPolygons() {
	      var _this3 = this;

	      var polygons = this._polygonsLonLat;

	      var geojson = [];
	      for (var i = 0; i < polygons.length; i++) {
	        geojson.push({
	          "type": "Feature",
	          "properties": {
	            "index": i,
	            "color": this._getColor(this._getValue(i))
	          },
	          "geometry": {
	            "type": "Polygon",
	            "coordinates": polygons[i]
	          }
	        });
	      }

	      this._geojson = L.geoJson(geojson, {
	        style: function style(feature) {
	          return {
	            color: feature.properties.color,
	            fillOpacity: 1,
	            stroke: false
	          };
	        },
	        onEachFeature: function onEachFeature(feature, layer) {
	          layer.on('click', function (e) {
	            e.index = feature.properties.index;
	            _this3.fire('click', e);
	          });
	        }
	      });

	      this._geojson.addTo(this._map);
	    }
	  }, {
	    key: '_removePolygons',
	    value: function _removePolygons() {
	      this._map.removeLayer(this._geojson);
	      delete this._geojson;
	    }
	  }, {
	    key: '_getValue',
	    value: function _getValue(index) {
	      if (this._param) {
	        return this.range.get({ composite: index });
	      }
	    }

	    /**
	     * Return the displayed value at a given geographic position.
	     * If out of bounds, then undefined is returned, otherwise a number or null (for no data).
	     * 
	     * @param {L.LatLng} latlng
	     * @returns {number|null|undefined}
	     */

	  }, {
	    key: 'getValueAt',
	    value: function getValueAt(latlng) {
	      // TODO longitude wrapping
	      var i = this._pointInPolygons([latlng.lng, latlng.lat]);
	      if (i >= 0) {
	        return this._getValue(i);
	      }
	    }

	    // NOTE: this returns a string, not an {r,g,b} object as in other classes!

	  }, {
	    key: '_getColor',
	    value: function _getColor(val) {
	      if (val === null) {
	        // no-data
	        return this._defaultColor;
	      } else if (val === undefined) {
	        // not fixed to a param
	        return this._defaultColor;
	      } else {
	        // use a palette
	        var idx = this.getPaletteIndex(val);
	        var _palette = this.palette,
	            red = _palette.red,
	            green = _palette.green,
	            blue = _palette.blue;

	        return 'rgb(' + red[idx] + ', ' + green[idx] + ', ' + blue[idx] + ')';
	      }
	    }
	  }, {
	    key: '_updatePolygons',
	    value: function _updatePolygons() {
	      this._removePolygons();
	      this._addPolygons();
	    }

	    /**
	     * Redraw the layer.
	     */

	  }, {
	    key: 'redraw',
	    value: function redraw() {
	      this._updatePolygons();
	      this._geojson.redraw();
	    }
	  }, {
	    key: 'coverage',
	    get: function get() {
	      return this._cov;
	    }

	    /**
	     * The parameter that is visualized.
	     * 
	     * @type {Parameter}
	     */

	  }, {
	    key: 'parameter',
	    get: function get() {
	      return this._param;
	    }
	  }]);
	  return MultiPolygon;
	}(PaletteMixin(CoverageMixin(L.Layer)));

	// TODO nearly identical to VerticalProfile

	/**
	 * Renderer for Coverages conforming to the CovJSON domain type `PolygonSeries`.
	 * 
	 * @example
	 * var cov = ... // get Coverage data
	 * var layer = new C.PolygonSeries(cov, {
	 *   parameter: 'salinity',
	 *   time: new Date('2015-01-01T12:00:00Z'),
	 *   defaultColor: 'black',
	 *   palette: C.linearPalette(['#FFFFFF', '#000000'])
	 * })
	 * 
	 * @see https://covjson.org/domain-types/#polygonseries
	 * 
	 * @emits {DataLayer#afterAdd} Layer is initialized and was added to the map
	 * @emits {DataLayer#dataLoading} Data loading has started
	 * @emits {DataLayer#dataLoad} Data loading has finished (also in case of errors)
	 * @emits {DataLayer#error} Error when loading data
	 * @emits {DataLayer#axisChange} Axis coordinate has changed (e.axis === 'time')
	 * @emits {PaletteMixin#paletteChange} Palette has changed
	 * @emits {PaletteMixin#paletteExtentChange} Palette extent has changed
	 * @emits {Point#click} when the polygon was clicked
	 * 
	 * @extends {L.Layer}
	 * @extends {CoverageMixin}
	 * @extends {PaletteMixin}
	 * @implements {DataLayer}
	 */
	var PolygonSeries = function (_PaletteMixin) {
	  inherits(PolygonSeries, _PaletteMixin);

	  /**
	   * An optional time axis target value can be defined with the 'time' property.
	   * The closest values on the time axis is chosen.
	   * 
	   * @param {Coverage|Domain} cov The coverage or domain object to visualize.
	   * @param {Object} [options] The options object.
	   * @param {string} [options.parameter] The key of the parameter to display, not needed for domain objects.
	   * @param {Date} [options.time] The initial time step to display.
	   * @param {Palette} [options.palette] The initial color palette to use, the default depends on the parameter type.
	   * @param {string} [options.paletteExtent='full'] The initial palette extent, either 'full' or specific: [-10,10].
	   * @param {string} [options.defaultColor='black'] The color to use for missing data or if no parameter is set.
	   */
	  function PolygonSeries(cov, options) {
	    classCallCheck(this, PolygonSeries);

	    var _this = possibleConstructorReturn(this, (PolygonSeries.__proto__ || Object.getPrototypeOf(PolygonSeries)).call(this));

	    if (covutils.isDomain(cov)) {
	      cov = covutils.fromDomain(cov);
	      delete options.keys;
	      options.parameter = cov.parameters.keys().next().value;
	    }

	    if (!options.paletteExtent) {
	      options.paletteExtent = 'full';
	    }

	    L.Util.setOptions(_this, options);

	    _this._cov = cov;
	    var paramKey = options.keys ? options.keys[0] : options.parameter;
	    _this._param = paramKey ? cov.parameters.get(paramKey) : null;
	    _this._axesSubset = {
	      t: { coordPref: options.time }
	    };
	    _this._defaultColor = options.defaultColor || DEFAULT_COLOR;
	    return _this;
	  }

	  /**
	   * @ignore
	   * @override
	   */


	  createClass(PolygonSeries, [{
	    key: 'onAdd',
	    value: function onAdd(map) {
	      var _this2 = this;

	      this._map = map;

	      this.load().then(function () {
	        return _this2.initializePalette();
	      }).then(function () {
	        _this2._unproject();
	        _this2._addPolygon();
	        _this2._pointInPolygonPreprocess();
	        _this2.fire('afterAdd');
	      });
	    }
	  }, {
	    key: '_unproject',
	    value: function _unproject() {
	      var unproject = this.projection.unproject;
	      var axis = this.domain.axes.get('composite');
	      var ix = axis.coordinates.indexOf(this._projX);
	      var iy = axis.coordinates.indexOf(this._projY);

	      this._polygonLonLat = axis.values[0].map(function (ring) {
	        return ring.map(function (coords) {
	          var _unproject2 = unproject({ x: coords[ix], y: coords[iy] }),
	              lat = _unproject2.lat,
	              lon = _unproject2.lon;

	          return [lon, lat];
	        });
	      });
	    }
	  }, {
	    key: '_loadCoverageSubset',
	    value: function _loadCoverageSubset() {
	      // adapted from Grid.js
	      var t = this._axesSubset.t;
	      if (t.coordPref == undefined) {
	        t.idx = t.coord = undefined;
	      } else {
	        var vals = this.domain.axes.get('t').values.map(function (v) {
	          return v.getTime();
	        });
	        t.idx = covutils.indexOfNearest(vals, t.coordPref.getTime());
	        t.coord = vals[t.idx];
	      }

	      // Note that we don't subset the coverage currently, since there is no real need for it
	    }

	    /**
	     * @ignore
	     * @override
	     */

	  }, {
	    key: 'onRemove',
	    value: function onRemove() {
	      this._removePolygon();
	    }

	    /**
	     * Returns the geographic bounds of the coverage.
	     * 
	     * @return {L.LatLngBounds}
	     */

	  }, {
	    key: 'getBounds',
	    value: function getBounds() {
	      return this._geojson.getBounds();
	    }

	    /**
	     * Returns the geographical center position of the coverage based on its bounding box.
	     * 
	     * @return {L.LatLng}
	     */

	  }, {
	    key: 'getLatLng',
	    value: function getLatLng() {
	      return this.getBounds().getCenter();
	    }

	    /**
	     * @ignore
	     * @override
	     */

	  }, {
	    key: 'bindPopup',
	    value: function bindPopup() {
	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      this._popup = args;
	      if (this._geojson) {
	        var _geojson;

	        (_geojson = this._geojson).bindPopup.apply(_geojson, args);
	      }
	      return this;
	    }

	    /**
	     * @ignore
	     * @override
	     */

	  }, {
	    key: 'openPopup',
	    value: function openPopup() {
	      this._geojson.openPopup();
	      return this;
	    }

	    /**
	     * @ignore
	     * @override
	     */

	  }, {
	    key: 'closePopup',
	    value: function closePopup() {
	      this._geojson.closePopup();
	      return this;
	    }

	    /**
	     * The coverage object associated to this layer.
	     * 
	     * @type {Coverage}
	     */

	  }, {
	    key: 'canUsePalette',


	    /**
	     * See {@link PaletteMixin}.
	     * 
	     * @ignore
	     */
	    value: function canUsePalette() {
	      return this.time !== undefined;
	    }

	    /**
	     * See {@link PaletteMixin}.
	     * 
	     * @ignore
	     */

	  }, {
	    key: 'computePaletteExtent',
	    value: function computePaletteExtent(extent) {
	      if (extent === 'full') {
	        if (!this.parameter) {
	          throw new Error('palette extent cannot be computed when no parameter has been chosen');
	        }

	        extent = covutils.minMaxOfRange(this.range);
	        extent = enlargeExtentIfEqual(extent);
	        return Promise.resolve(extent);
	      } else {
	        throw new Error('Unknown extent specification: ' + extent);
	      }
	    }
	  }, {
	    key: '_pointInPolygonPreprocess',
	    value: function _pointInPolygonPreprocess() {
	      var polygon = this._polygonLonLat;
	      // TODO we assume spherical coordinates for now
	      var isCartesian = false;
	      // A bit evil since this modifies in-place, but nothing bad should happen.
	      covutils.ensureClockwisePolygon(polygon, isCartesian);
	      var pointInPolygons = covutils.getPointInPolygonsFn([polygon]);
	      this._pointInPolygon = function (point) {
	        return pointInPolygons(point) !== -1;
	      };
	    }
	  }, {
	    key: '_addPolygon',
	    value: function _addPolygon() {
	      var _this3 = this;

	      var polygon = this._polygonLonLat;

	      var geojson = {
	        "type": "Feature",
	        "properties": {
	          "color": this._getColor(this.getValue())
	        },
	        "geometry": {
	          "type": "Polygon",
	          "coordinates": polygon
	        }
	      };

	      this._geojson = L.geoJson(geojson, {
	        style: function style(feature) {
	          return {
	            color: feature.properties.color,
	            fillOpacity: 1,
	            stroke: false
	          };
	        },
	        onEachFeature: function onEachFeature(feature, layer) {
	          layer.on('click', function (e) {
	            return _this3.fire('click', e);
	          });
	        }
	      });

	      if (this._popup) {
	        var _geojson2;

	        (_geojson2 = this._geojson).bindPopup.apply(_geojson2, toConsumableArray(this._popup));
	      }

	      this._geojson.addTo(this._map);
	    }
	  }, {
	    key: '_removePolygon',
	    value: function _removePolygon() {
	      this._map.removeLayer(this._geojson);
	      delete this._geojson;
	    }

	    /**
	     * Return the displayed value (number, or null for no-data),
	     * or undefined if not fixed to a t-coordinate or parameter.
	     * 
	     * @returns {number|null|undefined}
	     */

	  }, {
	    key: 'getValue',
	    value: function getValue() {
	      if (this._param && this._axesSubset.t.coord !== undefined) {
	        var val = this.range.get({ t: this._axesSubset.t.idx });
	        return val;
	      }
	    }

	    /**
	     * Return the displayed value at a given geographic position.
	     * If out of bounds, then undefined is returned, otherwise a number or null (for no data).
	     * 
	     * @param {L.LatLng} latlng
	     * @returns {number|null|undefined}
	     */

	  }, {
	    key: 'getValueAt',
	    value: function getValueAt(latlng) {
	      if (!latlng) throw new Error('latlng parameter missing');

	      // TODO longitude wrapping
	      if (this._pointInPolygon([latlng.lng, latlng.lat])) {
	        return this.getValue();
	      }
	    }

	    // NOTE: this returns a string, not an {r,g,b} object as in other classes!

	  }, {
	    key: '_getColor',
	    value: function _getColor(val) {
	      if (val === null) {
	        // no-data
	        return this._defaultColor;
	      } else if (val === undefined) {
	        // not fixed to a param or z-coordinate
	        return this._defaultColor;
	      } else {
	        // use a palette
	        var idx = this.getPaletteIndex(val);
	        var _palette = this.palette,
	            red = _palette.red,
	            green = _palette.green,
	            blue = _palette.blue;

	        return 'rgb(' + red[idx] + ', ' + green[idx] + ', ' + blue[idx] + ')';
	      }
	    }
	  }, {
	    key: '_updatePolygon',
	    value: function _updatePolygon() {
	      this._removePolygon();
	      this._addPolygon();
	    }

	    /**
	     * Redraw the layer.
	     */

	  }, {
	    key: 'redraw',
	    value: function redraw() {
	      this._updatePolygon();
	      this._geojson.redraw();
	    }
	  }, {
	    key: 'coverage',
	    get: function get() {
	      return this._cov;
	    }

	    /**
	     * The parameter that is visualized.
	     * 
	     * @type {Parameter}
	     */

	  }, {
	    key: 'parameter',
	    get: function get() {
	      return this._param;
	    }

	    /**
	     * Sets the currently active time to the one closest to the given Date object.
	     * 
	     * @type {Date|undefined}
	     */

	  }, {
	    key: 'time',
	    set: function set(val) {
	      var old = this.time;
	      this._axesSubset.t.coordPref = val ? val.toISOString() : undefined;

	      this._loadCoverageSubset();
	      if (old === this.time) return;
	      this.redraw();
	      this.fire('axisChange', { axis: 'time' });
	    }

	    /**
	     * The currently active time on the temporal axis as Date object, 
	     * or undefined if no time is set.
	     * 
	     * @type {Date|undefined}
	     */
	    ,
	    get: function get() {
	      if (!this._axesSubset.t.coord) {
	        return;
	      }
	      var time = this.domain.axes.get('t').values[this._axesSubset.t.idx];
	      return new Date(time);
	    }

	    /**
	     * The time slices that make up the coverage.
	     * 
	     * @type {Array<Date>}
	     */

	  }, {
	    key: 'timeSlices',
	    get: function get() {
	      return this.domain.axes.get('t').values.map(function (t) {
	        return new Date(t);
	      });
	    }
	  }]);
	  return PolygonSeries;
	}(PaletteMixin(CoverageMixin(L.Layer)));

	var COVJSON_PREFIX = 'https://covjson.org/def/';
	var COVJSON_CORE_NS = COVJSON_PREFIX + 'core#';
	var COVJSON_DOMAINTYPES_NS = COVJSON_PREFIX + 'domainTypes#';
	/** @ignore */
	var COVJSON_POINT = COVJSON_DOMAINTYPES_NS + 'Point';
	/** @ignore */
	var COVJSON_POINTSERIES = COVJSON_DOMAINTYPES_NS + 'PointSeries';
	/** @ignore */
	var COVJSON_VERTICALPROFILE = COVJSON_DOMAINTYPES_NS + 'VerticalProfile';
	/** @ignore */
	var COVJSON_GRID = COVJSON_DOMAINTYPES_NS + 'Grid';
	/** @ignore */
	var COVJSON_TRAJECTORY = COVJSON_DOMAINTYPES_NS + 'Trajectory';
	/** @ignore */
	var COVJSON_POLYGONSERIES = COVJSON_DOMAINTYPES_NS + 'PolygonSeries';
	/** @ignore */
	var COVJSON_MULTIPOLYGON = COVJSON_DOMAINTYPES_NS + 'MultiPolygon';

	/** @ignore */
	var COVJSON_DATATYPE_TUPLE = COVJSON_CORE_NS + 'tuple';
	/** @ignore */
	var COVJSON_DATATYPE_POLYGON = COVJSON_CORE_NS + 'polygon';

	var _DOMAIN_LAYER_CLASSES;
	var _COLLECTION_LAYER_CLA;
	var DOMAIN_LAYER_CLASSES = (_DOMAIN_LAYER_CLASSES = {}, defineProperty(_DOMAIN_LAYER_CLASSES, COVJSON_GRID, Grid), defineProperty(_DOMAIN_LAYER_CLASSES, COVJSON_POINT, Point), defineProperty(_DOMAIN_LAYER_CLASSES, COVJSON_POINTSERIES, PointSeries), defineProperty(_DOMAIN_LAYER_CLASSES, COVJSON_VERTICALPROFILE, VerticalProfile), defineProperty(_DOMAIN_LAYER_CLASSES, COVJSON_TRAJECTORY, Trajectory), defineProperty(_DOMAIN_LAYER_CLASSES, COVJSON_MULTIPOLYGON, MultiPolygon), defineProperty(_DOMAIN_LAYER_CLASSES, COVJSON_POLYGONSERIES, PolygonSeries), _DOMAIN_LAYER_CLASSES);

	var COLLECTION_LAYER_CLASSES = (_COLLECTION_LAYER_CLA = {}, defineProperty(_COLLECTION_LAYER_CLA, COVJSON_POINT, PointCollection), defineProperty(_COLLECTION_LAYER_CLA, COVJSON_VERTICALPROFILE, VerticalProfileCollection), _COLLECTION_LAYER_CLA);

	/**
	 * Creates a layer for a given coverage data object or throws an error if no layer class could be found.
	 * 
	 * This is a convenience function over using {@link dataLayerClass} and manually
	 * instantiating the layer.
	 * 
	 * @example
	 * var cov = ...
	 * var layer = C.dataLayer(cov, {parameter: 'temperature'}).addTo(map)
	 *  
	 * @return {function} A function fn(cov, options) which returns a new layer for
	 *   the given coverage data object and which is initialized with the given layer options.
	 * @throws {Error} If no layer class could be found.
	 */
	function dataLayer(cov, options) {
	  var clazz = dataLayerClass(cov);
	  if (!clazz) {
	    var coll = cov.type === covutils.COVERAGECOLLECTION ? 'collection ' : '';
	    throw new Error('No ' + coll + 'layer class found for domainType=' + cov.domainType);
	  }
	  return new clazz(cov, options);
	}

	/**
	 * Return a layer class usable for the given coverage data object,
	 * or `undefined` if none was found.
	 * If multiple layers match, then an arbitrary one is returned.
	 *  
	 * @example
	 * var cov = ...
	 * var clazz = C.dataLayerClass(cov)
	 * if (clazz) {
	 *   var layer = new clazz(cov, {parameter: 'temperature'}).addTo(map)
	 * }
	 * 
	 * @param {object} cov The coverage data object.
	 * @return {class|undefined} The layer class.
	 */
	function dataLayerClass(cov) {
	  if ((cov.type === covutils.COVERAGE || cov.type === covutils.DOMAIN) && cov.domainType in DOMAIN_LAYER_CLASSES) {
	    return DOMAIN_LAYER_CLASSES[cov.domainType];
	  }
	  if (cov.type === covutils.COVERAGECOLLECTION && cov.domainType in COLLECTION_LAYER_CLASSES) {
	    return COLLECTION_LAYER_CLASSES[cov.domainType];
	  }
	}

	/**
	 * Default function that checks if two Parameter objects describe
	 * the same thing. No magic is applied here. Exact match or nothing.
	 */
	function defaultMatch(p1, p2) {
	  if (p1.id && p2.id && p1.id === p2.id) {
	    return true;
	  }
	  if (!p1.observedProperty.id || !p2.observedProperty.id) {
	    return false;
	  }
	  if (p1.observedProperty.id !== p2.observedProperty.id) {
	    return false;
	  }
	  if (p1.unit && p2.unit) {
	    if (p1.unit.id && p2.unit.id && p1.unit.id !== p2.unit.id) {
	      return false;
	    }
	    if (p1.unit.symbol && p2.unit.symbol && p1.unit.symbol !== p2.unit.symbol) {
	      return false;
	    }
	  } else if (p1.unit || p2.unit) {
	    // only one of both has units
	    return false;
	  }
	  if (p1.categories && p2.categories) {
	    if (p1.categories.length !== p2.categories.length) {
	      return false;
	    }
	    var idMissing = function idMissing(cat) {
	      return !cat.id;
	    };
	    if (p1.categories.some(idMissing) || p2.categories.some(idMissing)) {
	      return false;
	    }
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;

	    try {
	      var _loop = function _loop() {
	        var cat1 = _step.value;

	        if (!p2.categories.some(function (cat2) {
	          return cat1.id === cat2.id;
	        })) {
	          return {
	            v: false
	          };
	        }
	      };

	      for (var _iterator = p1.categories[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	        var _ret = _loop();

	        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	      }
	    } catch (err) {
	      _didIteratorError = true;
	      _iteratorError = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion && _iterator.return) {
	          _iterator.return();
	        }
	      } finally {
	        if (_didIteratorError) {
	          throw _iteratorError;
	        }
	      }
	    }
	  } else if (p1.categories || p2.categories) {
	    // only one of both has categories
	    return false;
	  }
	  return true;
	}

	/**
	 * Synchronizes visualization options of multiple renderer layers with matching Parameter
	 * and exposes a combined view of those options in form of a virtual layer object.
	 * 
	 * A common use case for this is to have equal palettes and only a single legend
	 * for multiple layers describing the same parameter.
	 * 
	 * Synchronizing visualization options means synchronizing certain common properties
	 * of the layer instances. For example, the palette extents of two layers can be
	 * synchronized by merging the extents of both. The logic for doing that has to
	 * be specified in terms of binary functions supplied in the constructor.
	 * 
	 * By default, a simple algorithm determines if two Parameter objects are equivalent
	 * by checking whether things like observedPropery have the same ID, units are the same,
	 * etc. This default algorithm can be replaced with a custom one. Such a custom
	 * algorithm could relate different vocabularies with each other or perform other checks.
	 * 
	 * @example
	 * let paramSync = new C.ParameterSync({
	 *   syncProperties: {
	 *     palette: (p1, p2) => p1,
	 *     paletteExtent: (e1, e2) => e1 && e2 ? [Math.min(e1[0], e2[0]), Math.max(e1[1], e2[1])] : null
	 *   }
	 * }).on('parameterAdd', e => {
	 *   // The virtual sync layer proxies the synced palette, paletteExtent, and parameter.
	 *   // The sync layer will fire a 'remove' event once all real layers for that parameter were removed.
	 *   let layer = e.syncLayer
	 *   if (layer.palette) {
	 *     C.legend(layer, {
	 *       position: 'bottomright'
	 *     }).addTo(map)
	 *   }
	 * })
	 * let layer = C.layerFactory()(cov).on('add', e => {
	 *   // Only add the layer to the ParameterSync instance once it has initialized.
	 *   // We can use the 'add' event for that.
	 *   paramSync.addLayer(e.target)
	 * })
	 */
	var ParameterSync = function (_EventMixin) {
	  inherits(ParameterSync, _EventMixin);

	  /**
	   * @param {Object} options
	   * @param {Object} options.syncProperties - 
	   *   An object that defines which properties shall be synchronized and how.
	   *   Each key is a property name where the value is a binary function that merges
	   *   the values of two such properties.
	   * @param {Function} [options.match] - 
	   *   Custom function that checks if two Parameter objects shall be equivalent.
	   *   The default function is simple and checks for identity of several properties.
	   */
	  function ParameterSync(options) {
	    classCallCheck(this, ParameterSync);

	    var _this = possibleConstructorReturn(this, (ParameterSync.__proto__ || Object.getPrototypeOf(ParameterSync)).call(this));

	    _this._syncProps = options.syncProperties || {};
	    _this._match = options.match || defaultMatch;
	    _this._paramLayers = new Map(); // Map (Parameter -> Set(Layer))
	    _this._layerListeners = new Map(); // Map (Layer -> Map(type -> listener))
	    _this._propSyncing = new Set(); // Set (property name) 
	    return _this;
	  }

	  /**
	   * Adds a layer that will be synchronized.
	   * 
	   * Synchronization stops automatically when the layer fires a 'remove' event.
	   * 
	   * @param {ILayer} layer - The layer to synchronize.
	   * @fires ParameterSync#parameterAdd - When a layer with a new parameter was added.
	   */


	  createClass(ParameterSync, [{
	    key: 'addLayer',
	    value: function addLayer(layer) {
	      var _this2 = this;

	      if (!layer.parameter) {
	        console.log('layer has no parameter, skipping parameter sync');
	        return;
	      }
	      var params = Array.from(this._paramLayers.keys());
	      var match = params.find(function (p) {
	        return _this2._match(p, layer.parameter);
	      });

	      var param = void 0;
	      if (!match) {
	        param = layer.parameter;
	        this._paramLayers.set(param, new Set([layer]));
	      } else {
	        param = match;
	        this._paramLayers.get(param).add(layer);
	        this._syncProperties(param);
	      }

	      this._registerLayerListeners(layer, param);

	      if (!match) {
	        /**
	         * Parameter Add event.
	         * 
	         * @event ParameterSync#parameterAdd
	         * @type {object}
	         * @property {SyncLayer} syncLayer - 
	         *   A virtual layer that proxies the synchronized properties for a single parameter.
	         *   If all layers of that parameter are removed, this layer fires a 'remove' event,
	         *   signalling that the parameter is not present anymore.
	         */
	        this.fire('parameterAdd', { syncLayer: new SyncLayer(param, this) });
	      }
	    }
	    /**
	     * Pause synchronization. This is useful when a property of
	     * many layers has to be set manually (like paletteExtent = 'fov') and
	     * the synchronization shall happen afterwards (see resume()).
	     */

	  }, {
	    key: 'pause',
	    value: function pause() {
	      this.paused = true;
	    }

	    /**
	     * Resumes synchronization.
	     * 
	     * @param {bool} [sync] If true, then all layers will be synchronized immediately.
	     */

	  }, {
	    key: 'resume',
	    value: function resume(sync) {
	      this.paused = false;
	      if (sync) {
	        var _iteratorNormalCompletion2 = true;
	        var _didIteratorError2 = false;
	        var _iteratorError2 = undefined;

	        try {
	          for (var _iterator2 = this._paramLayers.keys()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	            var param = _step2.value;

	            this._syncProperties(param);
	          }
	        } catch (err) {
	          _didIteratorError2 = true;
	          _iteratorError2 = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion2 && _iterator2.return) {
	              _iterator2.return();
	            }
	          } finally {
	            if (_didIteratorError2) {
	              throw _iteratorError2;
	            }
	          }
	        }
	      }
	    }
	  }, {
	    key: '_removeLayer',
	    value: function _removeLayer(layer, param) {
	      var _iteratorNormalCompletion3 = true;
	      var _didIteratorError3 = false;
	      var _iteratorError3 = undefined;

	      try {
	        for (var _iterator3 = this._layerListeners.get(layer)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	          var _step3$value = slicedToArray(_step3.value, 2),
	              type = _step3$value[0],
	              fn = _step3$value[1];

	          layer.off(type, fn);
	        }
	      } catch (err) {
	        _didIteratorError3 = true;
	        _iteratorError3 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion3 && _iterator3.return) {
	            _iterator3.return();
	          }
	        } finally {
	          if (_didIteratorError3) {
	            throw _iteratorError3;
	          }
	        }
	      }

	      this._layerListeners.delete(layer);
	      this._paramLayers.get(param).delete(layer);
	      if (this._paramLayers.get(param).size === 0) {
	        this._paramLayers.delete(param);
	        // underscore since the 'remove' event of the syncLayer should be used
	        // from the outside
	        this.fire('_parameterRemove', { param: param });
	      }
	    }
	  }, {
	    key: '_registerLayerListeners',
	    value: function _registerLayerListeners(layer, param) {
	      var _this3 = this;

	      var listeners = new Map([['remove', function () {
	        return _this3._removeLayer(layer, param);
	      }]]);
	      var _iteratorNormalCompletion4 = true;
	      var _didIteratorError4 = false;
	      var _iteratorError4 = undefined;

	      try {
	        var _loop2 = function _loop2() {
	          var prop = _step4.value;

	          var type = prop + 'Change'; // our convention is camel case
	          // TODO does it make sense to unify again, or should it just propagate unchanged?
	          listeners.set(type, function () {
	            return _this3._syncProperty(param, prop);
	          });
	        };

	        for (var _iterator4 = Object.keys(this._syncProps)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	          _loop2();
	        }
	      } catch (err) {
	        _didIteratorError4 = true;
	        _iteratorError4 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion4 && _iterator4.return) {
	            _iterator4.return();
	          }
	        } finally {
	          if (_didIteratorError4) {
	            throw _iteratorError4;
	          }
	        }
	      }

	      var _iteratorNormalCompletion5 = true;
	      var _didIteratorError5 = false;
	      var _iteratorError5 = undefined;

	      try {
	        for (var _iterator5 = listeners[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
	          var _step5$value = slicedToArray(_step5.value, 2),
	              type = _step5$value[0],
	              fn = _step5$value[1];

	          layer.on(type, fn);
	        }
	      } catch (err) {
	        _didIteratorError5 = true;
	        _iteratorError5 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion5 && _iterator5.return) {
	            _iterator5.return();
	          }
	        } finally {
	          if (_didIteratorError5) {
	            throw _iteratorError5;
	          }
	        }
	      }

	      this._layerListeners.set(layer, listeners);
	    }
	  }, {
	    key: '_syncProperties',
	    value: function _syncProperties(param) {
	      var _iteratorNormalCompletion6 = true;
	      var _didIteratorError6 = false;
	      var _iteratorError6 = undefined;

	      try {
	        for (var _iterator6 = Object.keys(this._syncProps)[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
	          var _prop = _step6.value;

	          this._syncProperty(param, _prop);
	        }
	      } catch (err) {
	        _didIteratorError6 = true;
	        _iteratorError6 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion6 && _iterator6.return) {
	            _iterator6.return();
	          }
	        } finally {
	          if (_didIteratorError6) {
	            throw _iteratorError6;
	          }
	        }
	      }
	    }
	  }, {
	    key: '_syncProperty',
	    value: function _syncProperty(param, prop) {
	      if (this.paused || this._propSyncing.has(prop)) {
	        return;
	      }
	      var propreduce = this._syncProps[prop];
	      var unified = [].concat(toConsumableArray(this._paramLayers.get(param))).map(function (l) {
	        return l[prop];
	      }).reduce(propreduce);
	      // While we unify properties, stop listening for changes to prevent a cycle.
	      this._propSyncing.add(prop);
	      var _iteratorNormalCompletion7 = true;
	      var _didIteratorError7 = false;
	      var _iteratorError7 = undefined;

	      try {
	        for (var _iterator7 = this._paramLayers.get(param)[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
	          var layer_ = _step7.value;

	          layer_[prop] = unified;
	        }
	      } catch (err) {
	        _didIteratorError7 = true;
	        _iteratorError7 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion7 && _iterator7.return) {
	            _iterator7.return();
	          }
	        } finally {
	          if (_didIteratorError7) {
	            throw _iteratorError7;
	          }
	        }
	      }

	      this._propSyncing.delete(prop);
	      this.fire('_syncPropChange', { param: param, prop: prop });
	    }
	  }]);
	  return ParameterSync;
	}(EventMixin(L.Class));

	var SyncLayer = function (_EventMixin2) {
	  inherits(SyncLayer, _EventMixin2);

	  function SyncLayer(param, paramSync) {
	    classCallCheck(this, SyncLayer);

	    var _this4 = possibleConstructorReturn(this, (SyncLayer.__proto__ || Object.getPrototypeOf(SyncLayer)).call(this));

	    _this4._param = param;
	    paramSync.on('_parameterRemove', function (e) {
	      if (e.param === param) {
	        _this4.fire('remove');
	      }
	    });
	    paramSync.on('_syncPropChange', function (e) {
	      if (e.param === param) {
	        _this4.fire(e.prop + 'Change');
	      }
	    });
	    var layers = function layers() {
	      return paramSync._paramLayers.get(param);
	    };
	    var _iteratorNormalCompletion8 = true;
	    var _didIteratorError8 = false;
	    var _iteratorError8 = undefined;

	    try {
	      var _loop3 = function _loop3() {
	        var prop = _step8.value;

	        Object.defineProperty(_this4, prop, {
	          get: function get() {
	            return layers().values().next().value[prop];
	          },
	          set: function set(v) {
	            paramSync._propSyncing.add(prop);
	            var _iteratorNormalCompletion9 = true;
	            var _didIteratorError9 = false;
	            var _iteratorError9 = undefined;

	            try {
	              for (var _iterator9 = layers()[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
	                var layer = _step9.value;

	                layer[prop] = v;
	              }
	            } catch (err) {
	              _didIteratorError9 = true;
	              _iteratorError9 = err;
	            } finally {
	              try {
	                if (!_iteratorNormalCompletion9 && _iterator9.return) {
	                  _iterator9.return();
	                }
	              } finally {
	                if (_didIteratorError9) {
	                  throw _iteratorError9;
	                }
	              }
	            }

	            paramSync._propSyncing.delete(prop);
	            _this4.fire(prop + 'Change');
	          },
	          enumerable: true
	        });
	      };

	      for (var _iterator8 = Object.keys(paramSync._syncProps)[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
	        _loop3();
	      }
	    } catch (err) {
	      _didIteratorError8 = true;
	      _iteratorError8 = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion8 && _iterator8.return) {
	          _iterator8.return();
	        }
	      } finally {
	        if (_didIteratorError8) {
	          throw _iteratorError8;
	        }
	      }
	    }

	    return _this4;
	  }

	  createClass(SyncLayer, [{
	    key: 'parameter',
	    get: function get() {
	      return this._param;
	    }
	  }]);
	  return SyncLayer;
	}(EventMixin(L.Class));

	/**
	 * Displays a popup with an interactive plot showing the data
	 * of the vertical profile coverage.
	 * 
	 * @example
	 * layer.bindPopup(new C.VerticalProfilePlot(coverage))
	 */
	var VerticalProfilePlot = function (_L$Popup) {
	  inherits(VerticalProfilePlot, _L$Popup);

	  /**
	   * Creates a vertical profile plot popup.
	   * 
	   * @param {Coverage|Array<Coverage>} coverage The vertical profile coverage to visualize.
	   *   If an array of vertical profile coverages is given, then the vertical reference systems
	   *   are assumed to be identical.
	   * @param {object} [options] Popup options. See also http://leafletjs.com/reference.html#popup-options.
	   * @param {Array|Array<Array>} [options.parameters] The parameters to display.
	   *   For a single coverage, an array of parameter keys, each parameter is accessible in a drop down.
	   *   The default for a single coverage is to display all parameters.
	   *   For multiple coverages, an array of parameter key groups, each group is accessible in a drop down.
	   *   Each group array is ordered as the coverage array and determines which parameter of each coverage
	   *   is displayed in a single plot. In each group, at least one item must be defined.
	   *   The default for multiple coverages is to display all parameters and treat each one as a separate group.
	   * @param {string} [options.language] A language tag, indicating the preferred language to use for labels.
	   * @param {string} [options.precision=4] The number of significant digits to display.
	   */
	  function VerticalProfilePlot(coverage) {
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    classCallCheck(this, VerticalProfilePlot);

	    options.maxWidth = options.maxWidth || 350;

	    var _this = possibleConstructorReturn(this, (VerticalProfilePlot.__proto__ || Object.getPrototypeOf(VerticalProfilePlot)).call(this, options));

	    _this._covs = Array.isArray(coverage) ? coverage : [coverage];
	    _this._language = options.language;
	    _this._precision = options.precision || 4;

	    _this._labels = options.labels ? options.labels : new Array(_this._covs.length);

	    if (options.parameters) {
	      options.parameters = options.keys;
	    }

	    var keyGroups = [];
	    if (!options.keys) {
	      // treat all parameters of all coverages as separate
	      for (var i = 0; i < _this._covs.length; i++) {
	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;

	        try {
	          for (var _iterator = _this._covs[i].parameters.keys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var key = _step.value;

	            var group = new Array(_this._covs.length);
	            group[i] = key;
	            keyGroups.push(group);
	          }
	        } catch (err) {
	          _didIteratorError = true;
	          _iteratorError = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion && _iterator.return) {
	              _iterator.return();
	            }
	          } finally {
	            if (_didIteratorError) {
	              throw _iteratorError;
	            }
	          }
	        }
	      }
	    } else if (!Array.isArray(options.keys[0])) {
	      // short-cut for a single coverage, acts as parameter selector
	      keyGroups = options.keys.map(function (key) {
	        return [key];
	      });
	    } else {
	      // user defines which parameters to display and how to group them
	      keyGroups = options.keys;
	    }

	    // filter out groups which only contain null/undefined keys
	    keyGroups = keyGroups.filter(function (group) {
	      return !group.every(function (key) {
	        return !key;
	      });
	    });

	    if (keyGroups.some(function (group) {
	      return group.length !== _this._covs.length;
	    })) {
	      throw new Error('Length of each parameter group must match number of coverages');
	    }

	    // 2D array of parameter key groups, where each inner array is ordered like the coverages array
	    _this._paramKeyGroups = keyGroups;

	    // Map from coverage to param keys
	    _this._paramKeys = new Map();

	    var _loop = function _loop(_i) {
	      var keys = _this._paramKeyGroups.map(function (group) {
	        return group[_i];
	      }).filter(function (key) {
	        return key;
	      });
	      _this._paramKeys.set(_this._covs[_i], keys);
	    };

	    for (var _i = 0; _i < _this._covs.length; _i++) {
	      _loop(_i);
	    }
	    return _this;
	  }

	  /**
	   * @ignore
	   */


	  createClass(VerticalProfilePlot, [{
	    key: 'onAdd',
	    value: function onAdd(map) {
	      var _this2 = this;

	      get(VerticalProfilePlot.prototype.__proto__ || Object.getPrototypeOf(VerticalProfilePlot.prototype), 'onAdd', this).call(this, map);
	      map.fire('dataloading');
	      var domainPromise = Promise.all(this._covs.map(function (cov) {
	        return cov.loadDomain();
	      }));
	      var rangePromise = Promise.all(this._covs.map(function (cov) {
	        return cov.loadRanges(_this2._paramKeys.get(cov));
	      }));
	      Promise.all([domainPromise, rangePromise]).then(function (_ref) {
	        var _ref2 = slicedToArray(_ref, 2),
	            domains = _ref2[0],
	            ranges = _ref2[1];

	        _this2._domains = domains;
	        _this2._ranges = ranges;
	        _this2._addPlotToPopup();
	        _this2.fire('dataLoad');
	        _this2.fire('afterAdd');
	        map.fire('dataload');
	      }).catch(function (e) {
	        console.error(e);
	        _this2.fire('error', e);
	        map.fire('dataload');
	      });
	    }
	  }, {
	    key: '_addPlotToPopup',
	    value: function _addPlotToPopup() {
	      var _this3 = this;

	      // display first parameter group
	      var paramKeyGroup = this._paramKeyGroups[0];
	      var plot = this._getPlotElement(paramKeyGroup);

	      var el = document.createElement('div');

	      // display dropdown if multiple parameter groups
	      if (this._paramKeyGroups.length > 1) {
	        var select = document.createElement('select');

	        var _iteratorNormalCompletion2 = true;
	        var _didIteratorError2 = false;
	        var _iteratorError2 = undefined;

	        try {
	          for (var _iterator2 = this._paramKeyGroups.map(function (v, i) {
	            return [v, i];
	          })[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	            var _step2$value = slicedToArray(_step2.value, 2),
	                _paramKeyGroup = _step2$value[0],
	                i = _step2$value[1];

	            var refParam = this._getRefParam(_paramKeyGroup);
	            var option = document.createElement('option');
	            option.value = i;
	            option.text = covutils.getLanguageString(refParam.observedProperty.label, this._language);
	            select.appendChild(option);
	          }
	        } catch (err) {
	          _didIteratorError2 = true;
	          _iteratorError2 = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion2 && _iterator2.return) {
	              _iterator2.return();
	            }
	          } finally {
	            if (_didIteratorError2) {
	              throw _iteratorError2;
	            }
	          }
	        }

	        select.addEventListener('change', function () {
	          el.removeChild(plot);
	          var group = _this3._paramKeyGroups[parseInt(select.value)];
	          plot = _this3._getPlotElement(group);
	          el.appendChild(plot);
	        });

	        el.appendChild(select);
	      }

	      el.appendChild(plot);
	      this.setContent(el);
	    }
	  }, {
	    key: '_getRefParam',
	    value: function _getRefParam(paramKeyGroup) {
	      // use first defined parameter as representative for the group
	      var covsWithParamKey = zip(this._covs, paramKeyGroup);

	      var _covsWithParamKey$fil = slicedToArray(covsWithParamKey.filter(function (_ref3) {
	        var _ref4 = slicedToArray(_ref3, 2),
	            key = _ref4[1];

	        return key;
	      })[0], 2),
	          refCov = _covsWithParamKey$fil[0],
	          refParamKey = _covsWithParamKey$fil[1];

	      var refParam = refCov.parameters.get(refParamKey);
	      return refParam;
	    }
	  }, {
	    key: '_getPlotElement',
	    value: function _getPlotElement(paramKeyGroup) {
	      var _this4 = this;

	      var refDomain = this._domains[0];
	      var covsWithParamKey = zip(this._covs, paramKeyGroup);

	      var refParam = this._getRefParam(paramKeyGroup);

	      // axis labels
	      var zName = 'Vertical';
	      var zUnit = '';

	      var vertRef = covutils.getReferenceObject(refDomain, 'z');
	      if (vertRef && vertRef.coordinates.length === 1) {
	        var vertSrs = vertRef.system;
	        if (vertSrs.cs && (vertSrs.cs.axes || vertSrs.cs.csAxes)) {
	          var ax = vertSrs.cs.axes ? vertSrs.cs.axes[0] : vertSrs.cs.csAxes[0];
	          zUnit = covutils.stringifyUnit(ax.unit, this._language);
	          if (ax.name) {
	            zName = covutils.getLanguageString(ax.name, this._language);
	          }
	        }
	      }

	      var xLabel = zName;
	      if (zUnit) {
	        xLabel += ' (' + zUnit + ')';
	      }

	      var unit = covutils.stringifyUnit(refParam.unit, this._language);
	      var obsPropLabel = covutils.getLanguageString(refParam.observedProperty.label, this._language);

	      // http://c3js.org/samples/simple_xy_multiple.html

	      // axis values
	      var xs = {};
	      var columns = [];
	      var names = {};

	      for (var i = 0; i < this._covs.length; i++) {
	        var paramKey = covsWithParamKey[i][1];
	        if (!paramKey) {
	          continue;
	        }

	        var xname = 'x' + i;
	        var yname = refParam.key + i;

	        names[yname] = this._labels[i] ? this._labels[i] : obsPropLabel;

	        xs[yname] = xname;

	        var zVals = this._domains[i].axes.get('z').values;
	        var vals = this._ranges[i].get(paramKey);
	        var x = [xname];
	        var y = [yname];
	        for (var j = 0; j < zVals.length; j++) {
	          var val = vals.get({ z: j });
	          if (val === null) {
	            continue;
	          }
	          var z = zVals[j];
	          x.push(z);
	          y.push(val);
	        }

	        columns.push(x);
	        columns.push(y);
	      }

	      var width = 350;
	      var height = 300;

	      var el = document.createElement('div');

	      // work-around, otherwise popup is too small
	      el.style.width = width + 'px';
	      el.style.height = height + 'px';

	      c3.generate({
	        bindto: el,
	        data: {
	          xs: xs,
	          columns: columns,
	          names: names
	        },
	        axis: {
	          rotated: true,
	          x: {
	            tick: {
	              count: 10,
	              format: function format(x) {
	                return x.toPrecision(_this4._precision);
	              }
	            },
	            label: {
	              text: xLabel,
	              position: 'outer-center'
	            }
	          },
	          y: {
	            tick: {
	              count: 7,
	              format: function format(x) {
	                return x.toPrecision(_this4._precision);
	              }
	            },
	            label: {
	              text: obsPropLabel + (unit ? ' (' + unit + ')' : ''),
	              position: 'outer-middle'
	            }
	          }
	        },
	        grid: {
	          x: {
	            show: true
	          },
	          y: {
	            show: true
	          }
	        },
	        legend: {
	          show: this._covs.length > 1 ? true : false
	        },
	        tooltip: {
	          format: {
	            title: function title(d) {
	              return zName + ': ' + d.toPrecision(_this4._precision) + ' ' + zUnit;
	            },
	            value: function value(_value, ratio, id) {
	              return _value.toPrecision(_this4._precision) + ' ' + unit;
	            }
	          }
	        },
	        zoom: {
	          enabled: true,
	          rescale: true
	        },
	        size: {
	          height: height,
	          width: width
	        }
	      });

	      return el;
	    }
	  }]);
	  return VerticalProfilePlot;
	}(L.Popup);

	function zip(a, b) {
	  return a.map(function (e, i) {
	    return [a[i], b[i]];
	  });
	}

	// TODO DRY: nearly identical to VerticalProfilePlot

	/**
	 * Displays a popup with an interactive plot showing the data
	 * of a time series coverage (all axes fixed except time).
	 * 
	 * Examples are VerticalProfile or PointSeries coverages.
	 * 
	 * @example
	 * layer.bindPopup(new C.TimeSeriesPlot(coverage))
	 */
	var TimeSeriesPlot = function (_L$Popup) {
	  inherits(TimeSeriesPlot, _L$Popup);

	  /**
	   * Creates a time series plot popup.
	   * 
	   * @param {Coverage|Array<Coverage>} coverage The time series coverage to visualize.
	   *   If an array of time series coverages is given, then the reference systems
	   *   are assumed to be identical.
	   * @param {object} [options] Popup options. See also http://leafletjs.com/reference.html#popup-options.
	   * @param {Array|Array<Array>} [options.parameters] The parameters to display.
	   *   For a single coverage, an array of parameter keys, each parameter is accessible in a drop down.
	   *   The default for a single coverage is to display all parameters.
	   *   For multiple coverages, an array of parameter key groups, each group is accessible in a drop down.
	   *   Each group array is ordered as the coverage array and determines which parameter of each coverage
	   *   is displayed in a single plot. In each group, at least one item must be defined.
	   *   The default for multiple coverages is to display all parameters and treat each one as a separate group.
	   * @param {string} [options.language] A language tag, indicating the preferred language to use for labels.
	   * @param {string} [options.precision=4] The number of significant digits to display.
	   */
	  function TimeSeriesPlot(coverage) {
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    classCallCheck(this, TimeSeriesPlot);

	    options.maxWidth = options.maxWidth || 350;

	    var _this = possibleConstructorReturn(this, (TimeSeriesPlot.__proto__ || Object.getPrototypeOf(TimeSeriesPlot)).call(this, options));

	    _this._covs = Array.isArray(coverage) ? coverage : [coverage];
	    _this._language = options.language;
	    _this._precision = options.precision || 4;

	    _this._labels = options.labels ? options.labels : new Array(_this._covs.length);

	    if (options.parameters) {
	      options.parameters = options.keys;
	    }

	    var keyGroups = [];
	    if (!options.keys) {
	      // treat all parameters of all coverages as separate
	      for (var i = 0; i < _this._covs.length; i++) {
	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;

	        try {
	          for (var _iterator = _this._covs[i].parameters.keys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var key = _step.value;

	            var group = new Array(_this._covs.length);
	            group[i] = key;
	            keyGroups.push(group);
	          }
	        } catch (err) {
	          _didIteratorError = true;
	          _iteratorError = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion && _iterator.return) {
	              _iterator.return();
	            }
	          } finally {
	            if (_didIteratorError) {
	              throw _iteratorError;
	            }
	          }
	        }
	      }
	    } else if (!Array.isArray(options.keys[0])) {
	      // short-cut for a single coverage, acts as parameter selector
	      keyGroups = options.keys.map(function (key) {
	        return [key];
	      });
	    } else {
	      // user defines which parameters to display and how to group them
	      keyGroups = options.keys;
	    }

	    // filter out groups which only contain null/undefined keys
	    keyGroups = keyGroups.filter(function (group) {
	      return !group.every(function (key) {
	        return !key;
	      });
	    });

	    if (keyGroups.some(function (group) {
	      return group.length !== _this._covs.length;
	    })) {
	      throw new Error('Length of each parameter group must match number of coverages');
	    }

	    // 2D array of parameter key groups, where each inner array is ordered like the coverages array
	    _this._paramKeyGroups = keyGroups;

	    // Map from coverage to param keys
	    _this._paramKeys = new Map();

	    var _loop = function _loop(_i) {
	      var keys = _this._paramKeyGroups.map(function (group) {
	        return group[_i];
	      }).filter(function (key) {
	        return key;
	      });
	      _this._paramKeys.set(_this._covs[_i], keys);
	    };

	    for (var _i = 0; _i < _this._covs.length; _i++) {
	      _loop(_i);
	    }
	    return _this;
	  }

	  /**
	   * @ignore
	   */


	  createClass(TimeSeriesPlot, [{
	    key: 'onAdd',
	    value: function onAdd(map) {
	      var _this2 = this;

	      get(TimeSeriesPlot.prototype.__proto__ || Object.getPrototypeOf(TimeSeriesPlot.prototype), 'onAdd', this).call(this, map);
	      map.fire('dataloading');
	      var domainPromise = Promise.all(this._covs.map(function (cov) {
	        return cov.loadDomain();
	      }));
	      var rangePromise = Promise.all(this._covs.map(function (cov) {
	        return cov.loadRanges(_this2._paramKeys.get(cov));
	      }));
	      Promise.all([domainPromise, rangePromise]).then(function (_ref) {
	        var _ref2 = slicedToArray(_ref, 2),
	            domains = _ref2[0],
	            ranges = _ref2[1];

	        _this2._domains = domains;
	        _this2._ranges = ranges;
	        _this2._addPlotToPopup();
	        _this2.fire('dataLoad');
	        _this2.fire('afterAdd');
	        map.fire('dataload');
	      }).catch(function (e) {
	        console.error(e);
	        _this2.fire('error', e);
	        map.fire('dataload');
	      });
	    }
	  }, {
	    key: '_addPlotToPopup',
	    value: function _addPlotToPopup() {
	      var _this3 = this;

	      // display first parameter group
	      var paramKeyGroup = this._paramKeyGroups[0];
	      var plot = this._getPlotElement(paramKeyGroup);

	      var el = document.createElement('div');

	      // display dropdown if multiple parameter groups
	      if (this._paramKeyGroups.length > 1) {
	        var select = document.createElement('select');

	        var _iteratorNormalCompletion2 = true;
	        var _didIteratorError2 = false;
	        var _iteratorError2 = undefined;

	        try {
	          for (var _iterator2 = this._paramKeyGroups.map(function (v, i) {
	            return [v, i];
	          })[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	            var _step2$value = slicedToArray(_step2.value, 2),
	                _paramKeyGroup = _step2$value[0],
	                i = _step2$value[1];

	            var refParam = this._getRefParam(_paramKeyGroup);
	            var option = document.createElement('option');
	            option.value = i;
	            option.text = covutils.getLanguageString(refParam.observedProperty.label, this._language);
	            select.appendChild(option);
	          }
	        } catch (err) {
	          _didIteratorError2 = true;
	          _iteratorError2 = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion2 && _iterator2.return) {
	              _iterator2.return();
	            }
	          } finally {
	            if (_didIteratorError2) {
	              throw _iteratorError2;
	            }
	          }
	        }

	        select.addEventListener('change', function () {
	          el.removeChild(plot);
	          var group = _this3._paramKeyGroups[parseInt(select.value)];
	          plot = _this3._getPlotElement(group);
	          el.appendChild(plot);
	        });

	        el.appendChild(select);
	      }

	      el.appendChild(plot);
	      this.setContent(el);
	    }
	  }, {
	    key: '_getRefParam',
	    value: function _getRefParam(paramKeyGroup) {
	      // use first defined parameter as representative for the group
	      var covsWithParamKey = zip$1(this._covs, paramKeyGroup);

	      var _covsWithParamKey$fil = slicedToArray(covsWithParamKey.filter(function (_ref3) {
	        var _ref4 = slicedToArray(_ref3, 2),
	            key = _ref4[1];

	        return key;
	      })[0], 2),
	          refCov = _covsWithParamKey$fil[0],
	          refParamKey = _covsWithParamKey$fil[1];

	      var refParam = refCov.parameters.get(refParamKey);
	      return refParam;
	    }
	  }, {
	    key: '_getPlotElement',
	    value: function _getPlotElement(paramKeyGroup) {
	      var _this4 = this;

	      var refDomain = this._domains[0];
	      var covsWithParamKey = zip$1(this._covs, paramKeyGroup);

	      var refParam = this._getRefParam(paramKeyGroup);

	      // axis labels
	      var xLabel = 'Time';

	      var unit = covutils.stringifyUnit(refParam.unit, this._language);
	      var obsPropLabel = covutils.getLanguageString(refParam.observedProperty.label, this._language);

	      // http://c3js.org/samples/simple_xy_multiple.html

	      // axis values
	      var xs = {};
	      var columns = [];
	      var names = {};

	      for (var i = 0; i < this._covs.length; i++) {
	        var paramKey = covsWithParamKey[i][1];
	        if (!paramKey) {
	          continue;
	        }

	        var xname = 'x' + i;
	        var yname = refParam.key + i;

	        names[yname] = this._labels[i] ? this._labels[i] : obsPropLabel;

	        xs[yname] = xname;

	        var tVals = this._domains[i].axes.get('t').values;
	        var vals = this._ranges[i].get(paramKey);
	        var x = [xname];
	        var y = [yname];
	        for (var j = 0; j < tVals.length; j++) {
	          var val = vals.get({ t: j });
	          if (val === null) {
	            continue;
	          }
	          var t = new Date(tVals[j]);
	          x.push(t);
	          y.push(val);
	        }

	        columns.push(x);
	        columns.push(y);
	      }

	      var height = 300;

	      var el = document.createElement('div');

	      // work-around, otherwise popup is too small
	      el.style.width = this.options.maxWidth + 'px';
	      el.style.height = height + 'px';

	      c3.generate({
	        bindto: el,
	        data: {
	          xs: xs,
	          columns: columns,
	          names: names
	        },
	        axis: {
	          x: {
	            type: 'timeseries',
	            tick: {
	              format: this.options.timeFormat
	            },
	            label: {
	              text: xLabel,
	              position: 'outer-center'
	            }
	          },
	          y: {
	            tick: {
	              count: 7,
	              format: function format(x) {
	                return x.toPrecision(_this4._precision);
	              }
	            },
	            label: {
	              text: obsPropLabel + (unit ? ' (' + unit + ')' : ''),
	              position: 'outer-middle'
	            }
	          }
	        },
	        grid: {
	          x: {
	            show: true
	          },
	          y: {
	            show: true
	          }
	        },
	        legend: {
	          show: this._covs.length > 1 ? true : false
	        },
	        tooltip: {
	          format: {
	            value: function value(_value, ratio, id) {
	              return _value.toPrecision(_this4._precision) + ' ' + unit;
	            }
	          }
	        },
	        zoom: {
	          enabled: true,
	          rescale: true
	        },
	        size: {
	          height: height,
	          width: this.options.maxWidth
	        }
	      });

	      return el;
	    }
	  }]);
	  return TimeSeriesPlot;
	}(L.Popup);

	function zip$1(a, b) {
	  return a.map(function (e, i) {
	    return [a[i], b[i]];
	  });
	}

	/**
	 * Makes {@link L.Popup} draggable and proxies all {@link L.Draggable} events.
	 * 
	 * @example
	 * let DraggablePopup = DraggablePopupMixin(L.Popup)
	 * let popup = new DraggablePopup().setContent('I am draggable!')
	 * 
	 * @param {class} base The base class.
	 * @return {class} The base class with DraggablePopupMixin.
	 */
	function DraggablePopupMixin(base) {
	  return function (_base) {
	    inherits(_class, _base);

	    function _class() {
	      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	      var source = arguments[1];
	      classCallCheck(this, _class);

	      options.className = options.className || 'leaflet-popup-draggable';
	      return possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, options, source));
	    }

	    createClass(_class, [{
	      key: 'onAdd',
	      value: function onAdd(map) {
	        var _this2 = this;

	        get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'onAdd', this).call(this, map);
	        this._draggable = new L.Draggable(this._container, this._wrapper);
	        this._draggable.enable();
	        this._draggable.on('drag', function (e) {
	          // Popup.setContent() resets to the pre-drag position and doesn't use L.DomUtil.setPosition
	          // the code below works around that
	          var pos = L.DomUtil.getPosition(_this2._wrapper.parentNode);
	          var latlng = map.layerPointToLatLng(pos);
	          _this2.setLatLng(latlng);
	          _this2.fire('drag', e);
	        });
	        this._draggable.on('dragstart predrag dragend', function (e) {
	          return _this2.fire(e.type, e);
	        });
	      }
	    }, {
	      key: 'onRemove',
	      value: function onRemove(map) {
	        this._draggable.disable();
	        get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'onRemove', this).call(this, map);
	      }
	    }]);
	    return _class;
	  }(base);
	}

	/**
	 * A popup that contains the parameter values of the given coverage layers at the location of the popup.
	 * 
	 * The popup content is updated when one of the following occurs:
	 * - popup is added to a map
	 * - popup location is changed
	 * - coverage layer is added or removed
	 * - updateData() is called
	 * 
	 * @extends {L.Popup}
	 */
	var ValuePopup = function (_L$Popup) {
	  inherits(ValuePopup, _L$Popup);

	  /**
	   * @param {Object} [options] The options object.
	   * @param {number} [options.maxDistanceForPointsInPx=20]
	   *   The maximum distance in pixels from the popup location for which point-data values should be included.
	   * @param {Array<DataLayer>} [options.layers] An initial set of coverage data layers.
	   * @param {L.Layer} [source] Used to tag the popup with a reference to the Layer to which it refers.
	   */
	  function ValuePopup(options, source) {
	    classCallCheck(this, ValuePopup);

	    var _this = possibleConstructorReturn(this, (ValuePopup.__proto__ || Object.getPrototypeOf(ValuePopup)).call(this, options, source));

	    var layers = _this.options.layers || [];
	    _this._maxDistanceForPointsInPx = _this.options.maxDistanceForPointsInPx || 20;

	    /**
	     * The coverage data layers added to this popup.
	     * 
	     * @type {Set<DataLayer>}
	     */
	    _this.coverageLayers = new Set(layers.filter(function (layer) {
	      return layer.getValueAt;
	    }));
	    return _this;
	  }

	  /**
	   * @param {DataLayer} layer The data layer to add.
	   * @return {this}
	   */


	  createClass(ValuePopup, [{
	    key: 'addCoverageLayer',
	    value: function addCoverageLayer(layer) {
	      if (!layer.getValueAt) return this;
	      this.coverageLayers.add(layer);
	      this.updateData();
	      return this;
	    }

	    /**
	     * @param {DataLayer} layer The data layer to remove.
	     * @return {this}
	     */

	  }, {
	    key: 'removeCoverageLayer',
	    value: function removeCoverageLayer(layer) {
	      this.coverageLayers.delete(layer);
	      this.updateData();
	      return this;
	    }

	    /**
	     * @ignore
	     * @override
	     */

	  }, {
	    key: 'onAdd',
	    value: function onAdd(map) {
	      this._map = map;
	      get(ValuePopup.prototype.__proto__ || Object.getPrototypeOf(ValuePopup.prototype), 'onAdd', this).call(this, map);
	      this.updateData();
	    }

	    /**
	     * @ignore
	     * @override
	     */

	  }, {
	    key: 'onRemove',
	    value: function onRemove(map) {
	      get(ValuePopup.prototype.__proto__ || Object.getPrototypeOf(ValuePopup.prototype), 'onRemove', this).call(this, map);
	      this._map = null;
	    }

	    /**
	     * @ignore
	     * @override
	     */

	  }, {
	    key: 'setLatLng',
	    value: function setLatLng(latlng) {
	      get(ValuePopup.prototype.__proto__ || Object.getPrototypeOf(ValuePopup.prototype), 'setLatLng', this).call(this, latlng);
	      this.updateData();
	      return this;
	    }

	    /**
	     * Returns whether there is any non-missing coverage data at the current popup location.
	     * This function only works after the popup has been added to the map.
	     * 
	     * @return {boolean}
	     */

	  }, {
	    key: 'hasData',
	    value: function hasData() {
	      return this._hasData;
	    }

	    /**
	     * Updates the popup content from the data layers.
	     * Gets called automatically when `setLatLng` is called.
	     * 
	     * @return {this}
	     */

	  }, {
	    key: 'updateData',
	    value: function updateData() {
	      if (!this._map) return;
	      var html = '';

	      var latlng = this.getLatLng();

	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = this.coverageLayers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var layer = _step.value;

	          var maxDistance = getMetersPerPixel(this._map) * this._maxDistanceForPointsInPx;
	          var val = layer.getValueAt(latlng, maxDistance);
	          if (val == null) continue;
	          var param = layer.parameter;

	          var unit = !param.observedProperty.categories ? covutils.stringifyUnit(param.unit) : '';
	          if (param.categoryEncoding) {
	            var cat = covutils.getCategory(param, val);
	            val = covutils.getLanguageString(cat.label);
	          }
	          html += '<div><strong>' + covutils.getLanguageString(param.observedProperty.label) + '</strong>: ' + val + ' ' + unit + '</div>';
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }

	      if (!html) {
	        this._hasData = false;
	        html = 'No data.';
	      }
	      this._hasData = true;
	      this.setContent(html);
	      return this;
	    }
	  }]);
	  return ValuePopup;
	}(L.Popup);

	function getMetersPerPixel(map) {
	  // from L.Control.Scale
	  var bounds = map.getBounds();
	  var centerLat = bounds.getCenter().lat;
	  var halfWorldMeters = 6378137 * Math.PI * Math.cos(centerLat * Math.PI / 180);
	  var dist = halfWorldMeters * (bounds.getNorthEast().lng - bounds.getSouthWest().lng) / 180;
	  var size = map.getSize();
	  var perpx = dist / size.x;
	  return perpx;
	}

	/**
	 * Like {@link ValuePopup} but draggable and updates its content while dragging.
	 * 
	 * @extends {ValuePopup}
	 * @extends {DraggablePopupMixin}
	 */
	var DraggableValuePopup = function (_DraggablePopupMixin) {
	  inherits(DraggableValuePopup, _DraggablePopupMixin);

	  function DraggableValuePopup() {
	    classCallCheck(this, DraggableValuePopup);
	    return possibleConstructorReturn(this, (DraggableValuePopup.__proto__ || Object.getPrototypeOf(DraggableValuePopup)).apply(this, arguments));
	  }

	  return DraggableValuePopup;
	}(DraggablePopupMixin(ValuePopup));

	exports.legend = legend;
	exports.DiscreteLegend = DiscreteLegend;
	exports.ContinuousLegend = ContinuousLegend;
	exports.TimeAxis = TimeAxis;
	exports.VerticalAxis = VerticalAxis;
	exports.Dropdown = Dropdown;
	exports.Grid = Grid;
	exports.VerticalProfile = VerticalProfile;
	exports.Trajectory = Trajectory;
	exports.Point = Point;
	exports.PointSeries = PointSeries;
	exports.MultiPolygon = MultiPolygon;
	exports.PolygonSeries = PolygonSeries;
	exports.PointCollection = PointCollection;
	exports.VerticalProfileCollection = VerticalProfileCollection;
	exports.ParameterSync = ParameterSync;
	exports.PaletteMixin = PaletteMixin;
	exports.CoverageMixin = CoverageMixin;
	exports.CircleMarkerMixin = CircleMarkerMixin;
	exports.VerticalProfilePlot = VerticalProfilePlot;
	exports.TimeSeriesPlot = TimeSeriesPlot;
	exports.DraggableValuePopup = DraggableValuePopup;
	exports.ValuePopup = ValuePopup;
	exports.DraggablePopupMixin = DraggablePopupMixin;
	exports.dataLayer = dataLayer;
	exports.dataLayerClass = dataLayerClass;
	exports.linearPalette = linearPalette;
	exports.directPalette = directPalette;
	exports.cssToRGB = cssToRGB;
	exports.paletteFromObject = paletteFromObject;
	exports.scale = scale;
	exports.enlargeExtentIfEqual = enlargeExtentIfEqual;
	exports.PaletteManager = PaletteManager;
	exports.COVJSON_POINT = COVJSON_POINT;
	exports.COVJSON_POINTSERIES = COVJSON_POINTSERIES;
	exports.COVJSON_VERTICALPROFILE = COVJSON_VERTICALPROFILE;
	exports.COVJSON_GRID = COVJSON_GRID;
	exports.COVJSON_TRAJECTORY = COVJSON_TRAJECTORY;
	exports.COVJSON_POLYGONSERIES = COVJSON_POLYGONSERIES;
	exports.COVJSON_MULTIPOLYGON = COVJSON_MULTIPOLYGON;
	exports.COVJSON_DATATYPE_TUPLE = COVJSON_DATATYPE_TUPLE;
	exports.COVJSON_DATATYPE_POLYGON = COVJSON_DATATYPE_POLYGON;
	exports.COVERAGE = covutils.COVERAGE;
	exports.COVERAGECOLLECTION = covutils.COVERAGECOLLECTION;
	exports.DOMAIN = covutils.DOMAIN;

}((this.C = this.C || {}),L,CovUtils,this.c3 || {}));
//# sourceMappingURL=leaflet-coverage.src.js.map