(() => {
	'use strict';
	var e = {
			d: (t, n) => {
				for (var r in n)
					e.o(n, r) &&
						!e.o(t, r) &&
						Object.defineProperty(t, r, { enumerable: !0, get: n[r] });
			},
			o: (e, t) => Object.prototype.hasOwnProperty.call(e, t),
			r: (e) => {
				'undefined' != typeof Symbol &&
					Symbol.toStringTag &&
					Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
					Object.defineProperty(e, '__esModule', { value: !0 });
			},
		},
		t = {};
	e.r(t),
		e.d(t, {
			Il: () => ln,
			c3: () => pn,
			S$: () => dn,
			Ts: () => Qt,
			pB: () => Jt,
			i8: () => Pn,
			WH: () => nn,
			ly: () => rn,
			nC: () => Mn,
			QB: () => On,
			Ew: () => Un,
			Tk: () => en,
			eV: () => xn,
			_F: () => kn,
			dA: () => Ln,
			KJ: () => tn,
			jJ: () => on,
			_E: () => Rn,
			lp: () => Dn,
		});
	var n =
		'undefined' != typeof globalThis
			? globalThis
			: 'undefined' != typeof window
			? window
			: 'undefined' != typeof global
			? global
			: 'undefined' != typeof self
			? self
			: {};
	function r(e) {
		return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, 'default')
			? e.default
			: e;
	}
	var i = { exports: {} };
	!(function (e) {
		var t = Object.prototype.hasOwnProperty,
			n = '~';
		function r() {}
		function i(e, t, n) {
			(this.fn = e), (this.context = t), (this.once = n || !1);
		}
		function a(e, t, r, a, s) {
			if ('function' != typeof r)
				throw new TypeError('The listener must be a function');
			var o = new i(r, a || e, s),
				u = n ? n + t : t;
			return (
				e._events[u]
					? e._events[u].fn
						? (e._events[u] = [e._events[u], o])
						: e._events[u].push(o)
					: ((e._events[u] = o), e._eventsCount++),
				e
			);
		}
		function s(e, t) {
			0 == --e._eventsCount ? (e._events = new r()) : delete e._events[t];
		}
		function o() {
			(this._events = new r()), (this._eventsCount = 0);
		}
		Object.create &&
			((r.prototype = Object.create(null)), new r().__proto__ || (n = !1)),
			(o.prototype.eventNames = function () {
				var e,
					r,
					i = [];
				if (0 === this._eventsCount) return i;
				for (r in (e = this._events)) t.call(e, r) && i.push(n ? r.slice(1) : r);
				return Object.getOwnPropertySymbols
					? i.concat(Object.getOwnPropertySymbols(e))
					: i;
			}),
			(o.prototype.listeners = function (e) {
				var t = n ? n + e : e,
					r = this._events[t];
				if (!r) return [];
				if (r.fn) return [r.fn];
				for (var i = 0, a = r.length, s = new Array(a); i < a; i++)
					s[i] = r[i].fn;
				return s;
			}),
			(o.prototype.listenerCount = function (e) {
				var t = n ? n + e : e,
					r = this._events[t];
				return r ? (r.fn ? 1 : r.length) : 0;
			}),
			(o.prototype.emit = function (e, t, r, i, a, s) {
				var o = n ? n + e : e;
				if (!this._events[o]) return !1;
				var u,
					l,
					c = this._events[o],
					d = arguments.length;
				if (c.fn) {
					switch ((c.once && this.removeListener(e, c.fn, void 0, !0), d)) {
						case 1:
							return c.fn.call(c.context), !0;
						case 2:
							return c.fn.call(c.context, t), !0;
						case 3:
							return c.fn.call(c.context, t, r), !0;
						case 4:
							return c.fn.call(c.context, t, r, i), !0;
						case 5:
							return c.fn.call(c.context, t, r, i, a), !0;
						case 6:
							return c.fn.call(c.context, t, r, i, a, s), !0;
					}
					for (l = 1, u = new Array(d - 1); l < d; l++) u[l - 1] = arguments[l];
					c.fn.apply(c.context, u);
				} else {
					var p,
						h = c.length;
					for (l = 0; l < h; l++)
						switch (
							(c[l].once && this.removeListener(e, c[l].fn, void 0, !0), d)
						) {
							case 1:
								c[l].fn.call(c[l].context);
								break;
							case 2:
								c[l].fn.call(c[l].context, t);
								break;
							case 3:
								c[l].fn.call(c[l].context, t, r);
								break;
							case 4:
								c[l].fn.call(c[l].context, t, r, i);
								break;
							default:
								if (!u)
									for (p = 1, u = new Array(d - 1); p < d; p++)
										u[p - 1] = arguments[p];
								c[l].fn.apply(c[l].context, u);
						}
				}
				return !0;
			}),
			(o.prototype.on = function (e, t, n) {
				return a(this, e, t, n, !1);
			}),
			(o.prototype.once = function (e, t, n) {
				return a(this, e, t, n, !0);
			}),
			(o.prototype.removeListener = function (e, t, r, i) {
				var a = n ? n + e : e;
				if (!this._events[a]) return this;
				if (!t) return s(this, a), this;
				var o = this._events[a];
				if (o.fn)
					o.fn !== t || (i && !o.once) || (r && o.context !== r) || s(this, a);
				else {
					for (var u = 0, l = [], c = o.length; u < c; u++)
						(o[u].fn !== t ||
							(i && !o[u].once) ||
							(r && o[u].context !== r)) &&
							l.push(o[u]);
					l.length ? (this._events[a] = 1 === l.length ? l[0] : l) : s(this, a);
				}
				return this;
			}),
			(o.prototype.removeAllListeners = function (e) {
				var t;
				return (
					e
						? ((t = n ? n + e : e), this._events[t] && s(this, t))
						: ((this._events = new r()), (this._eventsCount = 0)),
					this
				);
			}),
			(o.prototype.off = o.prototype.removeListener),
			(o.prototype.addListener = o.prototype.on),
			(o.prefixed = n),
			(o.EventEmitter = o),
			(e.exports = o);
	})(i);
	var a,
		s,
		o = r(i.exports);
	!(function (e) {
		(e.assertEqual = (e) => e),
			(e.assertIs = function (e) {}),
			(e.assertNever = function (e) {
				throw new Error();
			}),
			(e.arrayToEnum = (e) => {
				const t = {};
				for (const n of e) t[n] = n;
				return t;
			}),
			(e.getValidEnumValues = (t) => {
				const n = e.objectKeys(t).filter((e) => 'number' != typeof t[t[e]]),
					r = {};
				for (const e of n) r[e] = t[e];
				return e.objectValues(r);
			}),
			(e.objectValues = (t) =>
				e.objectKeys(t).map(function (e) {
					return t[e];
				})),
			(e.objectKeys =
				'function' == typeof Object.keys
					? (e) => Object.keys(e)
					: (e) => {
							const t = [];
							for (const n in e)
								Object.prototype.hasOwnProperty.call(e, n) && t.push(n);
							return t;
					  }),
			(e.find = (e, t) => {
				for (const n of e) if (t(n)) return n;
			}),
			(e.isInteger =
				'function' == typeof Number.isInteger
					? (e) => Number.isInteger(e)
					: (e) => 'number' == typeof e && isFinite(e) && Math.floor(e) === e),
			(e.joinValues = function (e, t = ' | ') {
				return e.map((e) => ('string' == typeof e ? `'${e}'` : e)).join(t);
			}),
			(e.jsonStringifyReplacer = (e, t) =>
				'bigint' == typeof t ? t.toString() : t);
	})(a || (a = {})),
		(function (e) {
			e.mergeShapes = (e, t) => ({ ...e, ...t });
		})(s || (s = {}));
	const u = a.arrayToEnum([
			'string',
			'nan',
			'number',
			'integer',
			'float',
			'boolean',
			'date',
			'bigint',
			'symbol',
			'function',
			'undefined',
			'null',
			'array',
			'object',
			'unknown',
			'promise',
			'void',
			'never',
			'map',
			'set',
		]),
		l = (e) => {
			switch (typeof e) {
				case 'undefined':
					return u.undefined;
				case 'string':
					return u.string;
				case 'number':
					return isNaN(e) ? u.nan : u.number;
				case 'boolean':
					return u.boolean;
				case 'function':
					return u.function;
				case 'bigint':
					return u.bigint;
				case 'symbol':
					return u.symbol;
				case 'object':
					return Array.isArray(e)
						? u.array
						: null === e
						? u.null
						: e.then &&
						  'function' == typeof e.then &&
						  e.catch &&
						  'function' == typeof e.catch
						? u.promise
						: 'undefined' != typeof Map && e instanceof Map
						? u.map
						: 'undefined' != typeof Set && e instanceof Set
						? u.set
						: 'undefined' != typeof Date && e instanceof Date
						? u.date
						: u.object;
				default:
					return u.unknown;
			}
		},
		c = a.arrayToEnum([
			'invalid_type',
			'invalid_literal',
			'custom',
			'invalid_union',
			'invalid_union_discriminator',
			'invalid_enum_value',
			'unrecognized_keys',
			'invalid_arguments',
			'invalid_return_type',
			'invalid_date',
			'invalid_string',
			'too_small',
			'too_big',
			'invalid_intersection_types',
			'not_multiple_of',
			'not_finite',
		]);
	class d extends Error {
		constructor(e) {
			super(),
				(this.issues = []),
				(this.addIssue = (e) => {
					this.issues = [...this.issues, e];
				}),
				(this.addIssues = (e = []) => {
					this.issues = [...this.issues, ...e];
				});
			const t = new.target.prototype;
			Object.setPrototypeOf ? Object.setPrototypeOf(this, t) : (this.__proto__ = t),
				(this.name = 'ZodError'),
				(this.issues = e);
		}
		get errors() {
			return this.issues;
		}
		format(e) {
			const t =
					e ||
					function (e) {
						return e.message;
					},
				n = { _errors: [] },
				r = (e) => {
					for (const i of e.issues)
						if ('invalid_union' === i.code) i.unionErrors.map(r);
						else if ('invalid_return_type' === i.code) r(i.returnTypeError);
						else if ('invalid_arguments' === i.code) r(i.argumentsError);
						else if (0 === i.path.length) n._errors.push(t(i));
						else {
							let e = n,
								r = 0;
							for (; r < i.path.length; ) {
								const n = i.path[r];
								r === i.path.length - 1
									? ((e[n] = e[n] || { _errors: [] }),
									  e[n]._errors.push(t(i)))
									: (e[n] = e[n] || { _errors: [] }),
									(e = e[n]),
									r++;
							}
						}
				};
			return r(this), n;
		}
		static assert(e) {
			if (!(e instanceof d)) throw new Error(`Not a ZodError: ${e}`);
		}
		toString() {
			return this.message;
		}
		get message() {
			return JSON.stringify(this.issues, a.jsonStringifyReplacer, 2);
		}
		get isEmpty() {
			return 0 === this.issues.length;
		}
		flatten(e = (e) => e.message) {
			const t = {},
				n = [];
			for (const r of this.issues)
				r.path.length > 0
					? ((t[r.path[0]] = t[r.path[0]] || []), t[r.path[0]].push(e(r)))
					: n.push(e(r));
			return { formErrors: n, fieldErrors: t };
		}
		get formErrors() {
			return this.flatten();
		}
	}
	d.create = (e) => new d(e);
	const p = (e, t) => {
		let n;
		switch (e.code) {
			case c.invalid_type:
				n =
					e.received === u.undefined
						? 'Required'
						: `Expected ${e.expected}, received ${e.received}`;
				break;
			case c.invalid_literal:
				n = `Invalid literal value, expected ${JSON.stringify(
					e.expected,
					a.jsonStringifyReplacer
				)}`;
				break;
			case c.unrecognized_keys:
				n = `Unrecognized key(s) in object: ${a.joinValues(e.keys, ', ')}`;
				break;
			case c.invalid_union:
				n = 'Invalid input';
				break;
			case c.invalid_union_discriminator:
				n = `Invalid discriminator value. Expected ${a.joinValues(e.options)}`;
				break;
			case c.invalid_enum_value:
				n = `Invalid enum value. Expected ${a.joinValues(e.options)}, received '${
					e.received
				}'`;
				break;
			case c.invalid_arguments:
				n = 'Invalid function arguments';
				break;
			case c.invalid_return_type:
				n = 'Invalid function return type';
				break;
			case c.invalid_date:
				n = 'Invalid date';
				break;
			case c.invalid_string:
				'object' == typeof e.validation
					? 'includes' in e.validation
						? ((n = `Invalid input: must include "${e.validation.includes}"`),
						  'number' == typeof e.validation.position &&
								(n = `${n} at one or more positions greater than or equal to ${e.validation.position}`))
						: 'startsWith' in e.validation
						? (n = `Invalid input: must start with "${e.validation.startsWith}"`)
						: 'endsWith' in e.validation
						? (n = `Invalid input: must end with "${e.validation.endsWith}"`)
						: a.assertNever(e.validation)
					: (n =
							'regex' !== e.validation
								? `Invalid ${e.validation}`
								: 'Invalid');
				break;
			case c.too_small:
				n =
					'array' === e.type
						? `Array must contain ${
								e.exact
									? 'exactly'
									: e.inclusive
									? 'at least'
									: 'more than'
						  } ${e.minimum} element(s)`
						: 'string' === e.type
						? `String must contain ${
								e.exact ? 'exactly' : e.inclusive ? 'at least' : 'over'
						  } ${e.minimum} character(s)`
						: 'number' === e.type
						? `Number must be ${
								e.exact
									? 'exactly equal to '
									: e.inclusive
									? 'greater than or equal to '
									: 'greater than '
						  }${e.minimum}`
						: 'date' === e.type
						? `Date must be ${
								e.exact
									? 'exactly equal to '
									: e.inclusive
									? 'greater than or equal to '
									: 'greater than '
						  }${new Date(Number(e.minimum))}`
						: 'Invalid input';
				break;
			case c.too_big:
				n =
					'array' === e.type
						? `Array must contain ${
								e.exact
									? 'exactly'
									: e.inclusive
									? 'at most'
									: 'less than'
						  } ${e.maximum} element(s)`
						: 'string' === e.type
						? `String must contain ${
								e.exact ? 'exactly' : e.inclusive ? 'at most' : 'under'
						  } ${e.maximum} character(s)`
						: 'number' === e.type
						? `Number must be ${
								e.exact
									? 'exactly'
									: e.inclusive
									? 'less than or equal to'
									: 'less than'
						  } ${e.maximum}`
						: 'bigint' === e.type
						? `BigInt must be ${
								e.exact
									? 'exactly'
									: e.inclusive
									? 'less than or equal to'
									: 'less than'
						  } ${e.maximum}`
						: 'date' === e.type
						? `Date must be ${
								e.exact
									? 'exactly'
									: e.inclusive
									? 'smaller than or equal to'
									: 'smaller than'
						  } ${new Date(Number(e.maximum))}`
						: 'Invalid input';
				break;
			case c.custom:
				n = 'Invalid input';
				break;
			case c.invalid_intersection_types:
				n = 'Intersection results could not be merged';
				break;
			case c.not_multiple_of:
				n = `Number must be a multiple of ${e.multipleOf}`;
				break;
			case c.not_finite:
				n = 'Number must be finite';
				break;
			default:
				(n = t.defaultError), a.assertNever(e);
		}
		return { message: n };
	};
	let h = p;
	function f() {
		return h;
	}
	const m = (e) => {
		const { data: t, path: n, errorMaps: r, issueData: i } = e,
			a = [...n, ...(i.path || [])],
			s = { ...i, path: a };
		if (void 0 !== i.message) return { ...i, path: a, message: i.message };
		let o = '';
		const u = r
			.filter((e) => !!e)
			.slice()
			.reverse();
		for (const e of u) o = e(s, { data: t, defaultError: o }).message;
		return { ...i, path: a, message: o };
	};
	function _(e, t) {
		const n = f(),
			r = m({
				issueData: t,
				data: e.data,
				path: e.path,
				errorMaps: [
					e.common.contextualErrorMap,
					e.schemaErrorMap,
					n,
					n === p ? void 0 : p,
				].filter((e) => !!e),
			});
		e.common.issues.push(r);
	}
	class v {
		constructor() {
			this.value = 'valid';
		}
		dirty() {
			'valid' === this.value && (this.value = 'dirty');
		}
		abort() {
			'aborted' !== this.value && (this.value = 'aborted');
		}
		static mergeArray(e, t) {
			const n = [];
			for (const r of t) {
				if ('aborted' === r.status) return g;
				'dirty' === r.status && e.dirty(), n.push(r.value);
			}
			return { status: e.value, value: n };
		}
		static async mergeObjectAsync(e, t) {
			const n = [];
			for (const e of t) {
				const t = await e.key,
					r = await e.value;
				n.push({ key: t, value: r });
			}
			return v.mergeObjectSync(e, n);
		}
		static mergeObjectSync(e, t) {
			const n = {};
			for (const r of t) {
				const { key: t, value: i } = r;
				if ('aborted' === t.status) return g;
				if ('aborted' === i.status) return g;
				'dirty' === t.status && e.dirty(),
					'dirty' === i.status && e.dirty(),
					'__proto__' === t.value ||
						(void 0 === i.value && !r.alwaysSet) ||
						(n[t.value] = i.value);
			}
			return { status: e.value, value: n };
		}
	}
	const g = Object.freeze({ status: 'aborted' }),
		y = (e) => ({ status: 'dirty', value: e }),
		E = (e) => ({ status: 'valid', value: e }),
		b = (e) => 'aborted' === e.status,
		T = (e) => 'dirty' === e.status,
		N = (e) => 'valid' === e.status,
		w = (e) => 'undefined' != typeof Promise && e instanceof Promise;
	function A(e, t, n, r) {
		if ('a' === n && !r)
			throw new TypeError('Private accessor was defined without a getter');
		if ('function' == typeof t ? e !== t || !r : !t.has(e))
			throw new TypeError(
				'Cannot read private member from an object whose class did not declare it'
			);
		return 'm' === n ? r : 'a' === n ? r.call(e) : r ? r.value : t.get(e);
	}
	function I(e, t, n, r, i) {
		if ('m' === r) throw new TypeError('Private method is not writable');
		if ('a' === r && !i)
			throw new TypeError('Private accessor was defined without a setter');
		if ('function' == typeof t ? e !== t || !i : !t.has(e))
			throw new TypeError(
				'Cannot write private member to an object whose class did not declare it'
			);
		return 'a' === r ? i.call(e, n) : i ? (i.value = n) : t.set(e, n), n;
	}
	var S, O, C;
	'function' == typeof SuppressedError && SuppressedError,
		(function (e) {
			(e.errToObj = (e) => ('string' == typeof e ? { message: e } : e || {})),
				(e.toString = (e) =>
					'string' == typeof e ? e : null == e ? void 0 : e.message);
		})(S || (S = {}));
	class x {
		constructor(e, t, n, r) {
			(this._cachedPath = []),
				(this.parent = e),
				(this.data = t),
				(this._path = n),
				(this._key = r);
		}
		get path() {
			return (
				this._cachedPath.length ||
					(this._key instanceof Array
						? this._cachedPath.push(...this._path, ...this._key)
						: this._cachedPath.push(...this._path, this._key)),
				this._cachedPath
			);
		}
	}
	const D = (e, t) => {
		if (N(t)) return { success: !0, data: t.value };
		if (!e.common.issues.length)
			throw new Error('Validation failed but no issues detected.');
		return {
			success: !1,
			get error() {
				if (this._error) return this._error;
				const t = new d(e.common.issues);
				return (this._error = t), this._error;
			},
		};
	};
	function R(e) {
		if (!e) return {};
		const {
			errorMap: t,
			invalid_type_error: n,
			required_error: r,
			description: i,
		} = e;
		if (t && (n || r))
			throw new Error(
				'Can\'t use "invalid_type_error" or "required_error" in conjunction with custom error map.'
			);
		return t
			? { errorMap: t, description: i }
			: {
					errorMap: (t, i) => {
						var a, s;
						const { message: o } = e;
						return 'invalid_enum_value' === t.code
							? { message: null != o ? o : i.defaultError }
							: void 0 === i.data
							? {
									message:
										null !== (a = null != o ? o : r) && void 0 !== a
											? a
											: i.defaultError,
							  }
							: 'invalid_type' !== t.code
							? { message: i.defaultError }
							: {
									message:
										null !== (s = null != o ? o : n) && void 0 !== s
											? s
											: i.defaultError,
							  };
					},
					description: i,
			  };
	}
	class k {
		constructor(e) {
			(this.spa = this.safeParseAsync),
				(this._def = e),
				(this.parse = this.parse.bind(this)),
				(this.safeParse = this.safeParse.bind(this)),
				(this.parseAsync = this.parseAsync.bind(this)),
				(this.safeParseAsync = this.safeParseAsync.bind(this)),
				(this.spa = this.spa.bind(this)),
				(this.refine = this.refine.bind(this)),
				(this.refinement = this.refinement.bind(this)),
				(this.superRefine = this.superRefine.bind(this)),
				(this.optional = this.optional.bind(this)),
				(this.nullable = this.nullable.bind(this)),
				(this.nullish = this.nullish.bind(this)),
				(this.array = this.array.bind(this)),
				(this.promise = this.promise.bind(this)),
				(this.or = this.or.bind(this)),
				(this.and = this.and.bind(this)),
				(this.transform = this.transform.bind(this)),
				(this.brand = this.brand.bind(this)),
				(this.default = this.default.bind(this)),
				(this.catch = this.catch.bind(this)),
				(this.describe = this.describe.bind(this)),
				(this.pipe = this.pipe.bind(this)),
				(this.readonly = this.readonly.bind(this)),
				(this.isNullable = this.isNullable.bind(this)),
				(this.isOptional = this.isOptional.bind(this));
		}
		get description() {
			return this._def.description;
		}
		_getType(e) {
			return l(e.data);
		}
		_getOrReturnCtx(e, t) {
			return (
				t || {
					common: e.parent.common,
					data: e.data,
					parsedType: l(e.data),
					schemaErrorMap: this._def.errorMap,
					path: e.path,
					parent: e.parent,
				}
			);
		}
		_processInputParams(e) {
			return {
				status: new v(),
				ctx: {
					common: e.parent.common,
					data: e.data,
					parsedType: l(e.data),
					schemaErrorMap: this._def.errorMap,
					path: e.path,
					parent: e.parent,
				},
			};
		}
		_parseSync(e) {
			const t = this._parse(e);
			if (w(t)) throw new Error('Synchronous parse encountered promise.');
			return t;
		}
		_parseAsync(e) {
			const t = this._parse(e);
			return Promise.resolve(t);
		}
		parse(e, t) {
			const n = this.safeParse(e, t);
			if (n.success) return n.data;
			throw n.error;
		}
		safeParse(e, t) {
			var n;
			const r = {
					common: {
						issues: [],
						async:
							null !== (n = null == t ? void 0 : t.async) &&
							void 0 !== n &&
							n,
						contextualErrorMap: null == t ? void 0 : t.errorMap,
					},
					path: (null == t ? void 0 : t.path) || [],
					schemaErrorMap: this._def.errorMap,
					parent: null,
					data: e,
					parsedType: l(e),
				},
				i = this._parseSync({ data: e, path: r.path, parent: r });
			return D(r, i);
		}
		async parseAsync(e, t) {
			const n = await this.safeParseAsync(e, t);
			if (n.success) return n.data;
			throw n.error;
		}
		async safeParseAsync(e, t) {
			const n = {
					common: {
						issues: [],
						contextualErrorMap: null == t ? void 0 : t.errorMap,
						async: !0,
					},
					path: (null == t ? void 0 : t.path) || [],
					schemaErrorMap: this._def.errorMap,
					parent: null,
					data: e,
					parsedType: l(e),
				},
				r = this._parse({ data: e, path: n.path, parent: n }),
				i = await (w(r) ? r : Promise.resolve(r));
			return D(n, i);
		}
		refine(e, t) {
			const n = (e) =>
				'string' == typeof t || void 0 === t
					? { message: t }
					: 'function' == typeof t
					? t(e)
					: t;
			return this._refinement((t, r) => {
				const i = e(t),
					a = () => r.addIssue({ code: c.custom, ...n(t) });
				return 'undefined' != typeof Promise && i instanceof Promise
					? i.then((e) => !!e || (a(), !1))
					: !!i || (a(), !1);
			});
		}
		refinement(e, t) {
			return this._refinement(
				(n, r) => !!e(n) || (r.addIssue('function' == typeof t ? t(n, r) : t), !1)
			);
		}
		_refinement(e) {
			return new Se({
				schema: this,
				typeName: je.ZodEffects,
				effect: { type: 'refinement', refinement: e },
			});
		}
		superRefine(e) {
			return this._refinement(e);
		}
		optional() {
			return Oe.create(this, this._def);
		}
		nullable() {
			return Ce.create(this, this._def);
		}
		nullish() {
			return this.nullable().optional();
		}
		array() {
			return ue.create(this, this._def);
		}
		promise() {
			return Ie.create(this, this._def);
		}
		or(e) {
			return de.create([this, e], this._def);
		}
		and(e) {
			return me.create(this, e, this._def);
		}
		transform(e) {
			return new Se({
				...R(this._def),
				schema: this,
				typeName: je.ZodEffects,
				effect: { type: 'transform', transform: e },
			});
		}
		default(e) {
			const t = 'function' == typeof e ? e : () => e;
			return new xe({
				...R(this._def),
				innerType: this,
				defaultValue: t,
				typeName: je.ZodDefault,
			});
		}
		brand() {
			return new Pe({ typeName: je.ZodBranded, type: this, ...R(this._def) });
		}
		catch(e) {
			const t = 'function' == typeof e ? e : () => e;
			return new De({
				...R(this._def),
				innerType: this,
				catchValue: t,
				typeName: je.ZodCatch,
			});
		}
		describe(e) {
			return new (0, this.constructor)({ ...this._def, description: e });
		}
		pipe(e) {
			return Le.create(this, e);
		}
		readonly() {
			return Ue.create(this);
		}
		isOptional() {
			return this.safeParse(void 0).success;
		}
		isNullable() {
			return this.safeParse(null).success;
		}
	}
	const P = /^c[^\s-]{8,}$/i,
		L = /^[0-9a-z]+$/,
		U = /^[0-9A-HJKMNP-TV-Z]{26}$/,
		M =
			/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i,
		Z = /^[a-z0-9_-]{21}$/i,
		j =
			/^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/,
		B =
			/^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
	let G;
	const V =
			/^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
		H =
			/^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/,
		K = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/,
		F =
			'((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))',
		q = new RegExp(`^${F}$`);
	function $(e) {
		let t = '([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d';
		return (
			e.precision
				? (t = `${t}\\.\\d{${e.precision}}`)
				: null == e.precision && (t = `${t}(\\.\\d+)?`),
			t
		);
	}
	function Y(e) {
		let t = `${F}T${$(e)}`;
		const n = [];
		return (
			n.push(e.local ? 'Z?' : 'Z'),
			e.offset && n.push('([+-]\\d{2}:?\\d{2})'),
			(t = `${t}(${n.join('|')})`),
			new RegExp(`^${t}$`)
		);
	}
	class z extends k {
		_parse(e) {
			if (
				(this._def.coerce && (e.data = String(e.data)),
				this._getType(e) !== u.string)
			) {
				const t = this._getOrReturnCtx(e);
				return (
					_(t, {
						code: c.invalid_type,
						expected: u.string,
						received: t.parsedType,
					}),
					g
				);
			}
			const t = new v();
			let n;
			for (const s of this._def.checks)
				if ('min' === s.kind)
					e.data.length < s.value &&
						((n = this._getOrReturnCtx(e, n)),
						_(n, {
							code: c.too_small,
							minimum: s.value,
							type: 'string',
							inclusive: !0,
							exact: !1,
							message: s.message,
						}),
						t.dirty());
				else if ('max' === s.kind)
					e.data.length > s.value &&
						((n = this._getOrReturnCtx(e, n)),
						_(n, {
							code: c.too_big,
							maximum: s.value,
							type: 'string',
							inclusive: !0,
							exact: !1,
							message: s.message,
						}),
						t.dirty());
				else if ('length' === s.kind) {
					const r = e.data.length > s.value,
						i = e.data.length < s.value;
					(r || i) &&
						((n = this._getOrReturnCtx(e, n)),
						r
							? _(n, {
									code: c.too_big,
									maximum: s.value,
									type: 'string',
									inclusive: !0,
									exact: !0,
									message: s.message,
							  })
							: i &&
							  _(n, {
									code: c.too_small,
									minimum: s.value,
									type: 'string',
									inclusive: !0,
									exact: !0,
									message: s.message,
							  }),
						t.dirty());
				} else if ('email' === s.kind)
					B.test(e.data) ||
						((n = this._getOrReturnCtx(e, n)),
						_(n, {
							validation: 'email',
							code: c.invalid_string,
							message: s.message,
						}),
						t.dirty());
				else if ('emoji' === s.kind)
					G ||
						(G = new RegExp(
							'^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$',
							'u'
						)),
						G.test(e.data) ||
							((n = this._getOrReturnCtx(e, n)),
							_(n, {
								validation: 'emoji',
								code: c.invalid_string,
								message: s.message,
							}),
							t.dirty());
				else if ('uuid' === s.kind)
					M.test(e.data) ||
						((n = this._getOrReturnCtx(e, n)),
						_(n, {
							validation: 'uuid',
							code: c.invalid_string,
							message: s.message,
						}),
						t.dirty());
				else if ('nanoid' === s.kind)
					Z.test(e.data) ||
						((n = this._getOrReturnCtx(e, n)),
						_(n, {
							validation: 'nanoid',
							code: c.invalid_string,
							message: s.message,
						}),
						t.dirty());
				else if ('cuid' === s.kind)
					P.test(e.data) ||
						((n = this._getOrReturnCtx(e, n)),
						_(n, {
							validation: 'cuid',
							code: c.invalid_string,
							message: s.message,
						}),
						t.dirty());
				else if ('cuid2' === s.kind)
					L.test(e.data) ||
						((n = this._getOrReturnCtx(e, n)),
						_(n, {
							validation: 'cuid2',
							code: c.invalid_string,
							message: s.message,
						}),
						t.dirty());
				else if ('ulid' === s.kind)
					U.test(e.data) ||
						((n = this._getOrReturnCtx(e, n)),
						_(n, {
							validation: 'ulid',
							code: c.invalid_string,
							message: s.message,
						}),
						t.dirty());
				else if ('url' === s.kind)
					try {
						new URL(e.data);
					} catch (r) {
						(n = this._getOrReturnCtx(e, n)),
							_(n, {
								validation: 'url',
								code: c.invalid_string,
								message: s.message,
							}),
							t.dirty();
					}
				else
					'regex' === s.kind
						? ((s.regex.lastIndex = 0),
						  s.regex.test(e.data) ||
								((n = this._getOrReturnCtx(e, n)),
								_(n, {
									validation: 'regex',
									code: c.invalid_string,
									message: s.message,
								}),
								t.dirty()))
						: 'trim' === s.kind
						? (e.data = e.data.trim())
						: 'includes' === s.kind
						? e.data.includes(s.value, s.position) ||
						  ((n = this._getOrReturnCtx(e, n)),
						  _(n, {
								code: c.invalid_string,
								validation: { includes: s.value, position: s.position },
								message: s.message,
						  }),
						  t.dirty())
						: 'toLowerCase' === s.kind
						? (e.data = e.data.toLowerCase())
						: 'toUpperCase' === s.kind
						? (e.data = e.data.toUpperCase())
						: 'startsWith' === s.kind
						? e.data.startsWith(s.value) ||
						  ((n = this._getOrReturnCtx(e, n)),
						  _(n, {
								code: c.invalid_string,
								validation: { startsWith: s.value },
								message: s.message,
						  }),
						  t.dirty())
						: 'endsWith' === s.kind
						? e.data.endsWith(s.value) ||
						  ((n = this._getOrReturnCtx(e, n)),
						  _(n, {
								code: c.invalid_string,
								validation: { endsWith: s.value },
								message: s.message,
						  }),
						  t.dirty())
						: 'datetime' === s.kind
						? Y(s).test(e.data) ||
						  ((n = this._getOrReturnCtx(e, n)),
						  _(n, {
								code: c.invalid_string,
								validation: 'datetime',
								message: s.message,
						  }),
						  t.dirty())
						: 'date' === s.kind
						? q.test(e.data) ||
						  ((n = this._getOrReturnCtx(e, n)),
						  _(n, {
								code: c.invalid_string,
								validation: 'date',
								message: s.message,
						  }),
						  t.dirty())
						: 'time' === s.kind
						? new RegExp(`^${$(s)}$`).test(e.data) ||
						  ((n = this._getOrReturnCtx(e, n)),
						  _(n, {
								code: c.invalid_string,
								validation: 'time',
								message: s.message,
						  }),
						  t.dirty())
						: 'duration' === s.kind
						? j.test(e.data) ||
						  ((n = this._getOrReturnCtx(e, n)),
						  _(n, {
								validation: 'duration',
								code: c.invalid_string,
								message: s.message,
						  }),
						  t.dirty())
						: 'ip' === s.kind
						? ((r = e.data),
						  (('v4' !== (i = s.version) && i) || !V.test(r)) &&
								(('v6' !== i && i) || !H.test(r)) &&
								((n = this._getOrReturnCtx(e, n)),
								_(n, {
									validation: 'ip',
									code: c.invalid_string,
									message: s.message,
								}),
								t.dirty()))
						: 'base64' === s.kind
						? K.test(e.data) ||
						  ((n = this._getOrReturnCtx(e, n)),
						  _(n, {
								validation: 'base64',
								code: c.invalid_string,
								message: s.message,
						  }),
						  t.dirty())
						: a.assertNever(s);
			var r, i;
			return { status: t.value, value: e.data };
		}
		_regex(e, t, n) {
			return this.refinement((t) => e.test(t), {
				validation: t,
				code: c.invalid_string,
				...S.errToObj(n),
			});
		}
		_addCheck(e) {
			return new z({ ...this._def, checks: [...this._def.checks, e] });
		}
		email(e) {
			return this._addCheck({ kind: 'email', ...S.errToObj(e) });
		}
		url(e) {
			return this._addCheck({ kind: 'url', ...S.errToObj(e) });
		}
		emoji(e) {
			return this._addCheck({ kind: 'emoji', ...S.errToObj(e) });
		}
		uuid(e) {
			return this._addCheck({ kind: 'uuid', ...S.errToObj(e) });
		}
		nanoid(e) {
			return this._addCheck({ kind: 'nanoid', ...S.errToObj(e) });
		}
		cuid(e) {
			return this._addCheck({ kind: 'cuid', ...S.errToObj(e) });
		}
		cuid2(e) {
			return this._addCheck({ kind: 'cuid2', ...S.errToObj(e) });
		}
		ulid(e) {
			return this._addCheck({ kind: 'ulid', ...S.errToObj(e) });
		}
		base64(e) {
			return this._addCheck({ kind: 'base64', ...S.errToObj(e) });
		}
		ip(e) {
			return this._addCheck({ kind: 'ip', ...S.errToObj(e) });
		}
		datetime(e) {
			var t, n;
			return 'string' == typeof e
				? this._addCheck({
						kind: 'datetime',
						precision: null,
						offset: !1,
						local: !1,
						message: e,
				  })
				: this._addCheck({
						kind: 'datetime',
						precision:
							void 0 === (null == e ? void 0 : e.precision)
								? null
								: null == e
								? void 0
								: e.precision,
						offset:
							null !== (t = null == e ? void 0 : e.offset) &&
							void 0 !== t &&
							t,
						local:
							null !== (n = null == e ? void 0 : e.local) &&
							void 0 !== n &&
							n,
						...S.errToObj(null == e ? void 0 : e.message),
				  });
		}
		date(e) {
			return this._addCheck({ kind: 'date', message: e });
		}
		time(e) {
			return 'string' == typeof e
				? this._addCheck({ kind: 'time', precision: null, message: e })
				: this._addCheck({
						kind: 'time',
						precision:
							void 0 === (null == e ? void 0 : e.precision)
								? null
								: null == e
								? void 0
								: e.precision,
						...S.errToObj(null == e ? void 0 : e.message),
				  });
		}
		duration(e) {
			return this._addCheck({ kind: 'duration', ...S.errToObj(e) });
		}
		regex(e, t) {
			return this._addCheck({ kind: 'regex', regex: e, ...S.errToObj(t) });
		}
		includes(e, t) {
			return this._addCheck({
				kind: 'includes',
				value: e,
				position: null == t ? void 0 : t.position,
				...S.errToObj(null == t ? void 0 : t.message),
			});
		}
		startsWith(e, t) {
			return this._addCheck({ kind: 'startsWith', value: e, ...S.errToObj(t) });
		}
		endsWith(e, t) {
			return this._addCheck({ kind: 'endsWith', value: e, ...S.errToObj(t) });
		}
		min(e, t) {
			return this._addCheck({ kind: 'min', value: e, ...S.errToObj(t) });
		}
		max(e, t) {
			return this._addCheck({ kind: 'max', value: e, ...S.errToObj(t) });
		}
		length(e, t) {
			return this._addCheck({ kind: 'length', value: e, ...S.errToObj(t) });
		}
		nonempty(e) {
			return this.min(1, S.errToObj(e));
		}
		trim() {
			return new z({
				...this._def,
				checks: [...this._def.checks, { kind: 'trim' }],
			});
		}
		toLowerCase() {
			return new z({
				...this._def,
				checks: [...this._def.checks, { kind: 'toLowerCase' }],
			});
		}
		toUpperCase() {
			return new z({
				...this._def,
				checks: [...this._def.checks, { kind: 'toUpperCase' }],
			});
		}
		get isDatetime() {
			return !!this._def.checks.find((e) => 'datetime' === e.kind);
		}
		get isDate() {
			return !!this._def.checks.find((e) => 'date' === e.kind);
		}
		get isTime() {
			return !!this._def.checks.find((e) => 'time' === e.kind);
		}
		get isDuration() {
			return !!this._def.checks.find((e) => 'duration' === e.kind);
		}
		get isEmail() {
			return !!this._def.checks.find((e) => 'email' === e.kind);
		}
		get isURL() {
			return !!this._def.checks.find((e) => 'url' === e.kind);
		}
		get isEmoji() {
			return !!this._def.checks.find((e) => 'emoji' === e.kind);
		}
		get isUUID() {
			return !!this._def.checks.find((e) => 'uuid' === e.kind);
		}
		get isNANOID() {
			return !!this._def.checks.find((e) => 'nanoid' === e.kind);
		}
		get isCUID() {
			return !!this._def.checks.find((e) => 'cuid' === e.kind);
		}
		get isCUID2() {
			return !!this._def.checks.find((e) => 'cuid2' === e.kind);
		}
		get isULID() {
			return !!this._def.checks.find((e) => 'ulid' === e.kind);
		}
		get isIP() {
			return !!this._def.checks.find((e) => 'ip' === e.kind);
		}
		get isBase64() {
			return !!this._def.checks.find((e) => 'base64' === e.kind);
		}
		get minLength() {
			let e = null;
			for (const t of this._def.checks)
				'min' === t.kind && (null === e || t.value > e) && (e = t.value);
			return e;
		}
		get maxLength() {
			let e = null;
			for (const t of this._def.checks)
				'max' === t.kind && (null === e || t.value < e) && (e = t.value);
			return e;
		}
	}
	function W(e, t) {
		const n = (e.toString().split('.')[1] || '').length,
			r = (t.toString().split('.')[1] || '').length,
			i = n > r ? n : r;
		return (
			(parseInt(e.toFixed(i).replace('.', '')) %
				parseInt(t.toFixed(i).replace('.', ''))) /
			Math.pow(10, i)
		);
	}
	z.create = (e) => {
		var t;
		return new z({
			checks: [],
			typeName: je.ZodString,
			coerce: null !== (t = null == e ? void 0 : e.coerce) && void 0 !== t && t,
			...R(e),
		});
	};
	class X extends k {
		constructor() {
			super(...arguments),
				(this.min = this.gte),
				(this.max = this.lte),
				(this.step = this.multipleOf);
		}
		_parse(e) {
			if (
				(this._def.coerce && (e.data = Number(e.data)),
				this._getType(e) !== u.number)
			) {
				const t = this._getOrReturnCtx(e);
				return (
					_(t, {
						code: c.invalid_type,
						expected: u.number,
						received: t.parsedType,
					}),
					g
				);
			}
			let t;
			const n = new v();
			for (const r of this._def.checks)
				'int' === r.kind
					? a.isInteger(e.data) ||
					  ((t = this._getOrReturnCtx(e, t)),
					  _(t, {
							code: c.invalid_type,
							expected: 'integer',
							received: 'float',
							message: r.message,
					  }),
					  n.dirty())
					: 'min' === r.kind
					? (r.inclusive ? e.data < r.value : e.data <= r.value) &&
					  ((t = this._getOrReturnCtx(e, t)),
					  _(t, {
							code: c.too_small,
							minimum: r.value,
							type: 'number',
							inclusive: r.inclusive,
							exact: !1,
							message: r.message,
					  }),
					  n.dirty())
					: 'max' === r.kind
					? (r.inclusive ? e.data > r.value : e.data >= r.value) &&
					  ((t = this._getOrReturnCtx(e, t)),
					  _(t, {
							code: c.too_big,
							maximum: r.value,
							type: 'number',
							inclusive: r.inclusive,
							exact: !1,
							message: r.message,
					  }),
					  n.dirty())
					: 'multipleOf' === r.kind
					? 0 !== W(e.data, r.value) &&
					  ((t = this._getOrReturnCtx(e, t)),
					  _(t, {
							code: c.not_multiple_of,
							multipleOf: r.value,
							message: r.message,
					  }),
					  n.dirty())
					: 'finite' === r.kind
					? Number.isFinite(e.data) ||
					  ((t = this._getOrReturnCtx(e, t)),
					  _(t, { code: c.not_finite, message: r.message }),
					  n.dirty())
					: a.assertNever(r);
			return { status: n.value, value: e.data };
		}
		gte(e, t) {
			return this.setLimit('min', e, !0, S.toString(t));
		}
		gt(e, t) {
			return this.setLimit('min', e, !1, S.toString(t));
		}
		lte(e, t) {
			return this.setLimit('max', e, !0, S.toString(t));
		}
		lt(e, t) {
			return this.setLimit('max', e, !1, S.toString(t));
		}
		setLimit(e, t, n, r) {
			return new X({
				...this._def,
				checks: [
					...this._def.checks,
					{ kind: e, value: t, inclusive: n, message: S.toString(r) },
				],
			});
		}
		_addCheck(e) {
			return new X({ ...this._def, checks: [...this._def.checks, e] });
		}
		int(e) {
			return this._addCheck({ kind: 'int', message: S.toString(e) });
		}
		positive(e) {
			return this._addCheck({
				kind: 'min',
				value: 0,
				inclusive: !1,
				message: S.toString(e),
			});
		}
		negative(e) {
			return this._addCheck({
				kind: 'max',
				value: 0,
				inclusive: !1,
				message: S.toString(e),
			});
		}
		nonpositive(e) {
			return this._addCheck({
				kind: 'max',
				value: 0,
				inclusive: !0,
				message: S.toString(e),
			});
		}
		nonnegative(e) {
			return this._addCheck({
				kind: 'min',
				value: 0,
				inclusive: !0,
				message: S.toString(e),
			});
		}
		multipleOf(e, t) {
			return this._addCheck({
				kind: 'multipleOf',
				value: e,
				message: S.toString(t),
			});
		}
		finite(e) {
			return this._addCheck({ kind: 'finite', message: S.toString(e) });
		}
		safe(e) {
			return this._addCheck({
				kind: 'min',
				inclusive: !0,
				value: Number.MIN_SAFE_INTEGER,
				message: S.toString(e),
			})._addCheck({
				kind: 'max',
				inclusive: !0,
				value: Number.MAX_SAFE_INTEGER,
				message: S.toString(e),
			});
		}
		get minValue() {
			let e = null;
			for (const t of this._def.checks)
				'min' === t.kind && (null === e || t.value > e) && (e = t.value);
			return e;
		}
		get maxValue() {
			let e = null;
			for (const t of this._def.checks)
				'max' === t.kind && (null === e || t.value < e) && (e = t.value);
			return e;
		}
		get isInt() {
			return !!this._def.checks.find(
				(e) =>
					'int' === e.kind || ('multipleOf' === e.kind && a.isInteger(e.value))
			);
		}
		get isFinite() {
			let e = null,
				t = null;
			for (const n of this._def.checks) {
				if ('finite' === n.kind || 'int' === n.kind || 'multipleOf' === n.kind)
					return !0;
				'min' === n.kind
					? (null === t || n.value > t) && (t = n.value)
					: 'max' === n.kind && (null === e || n.value < e) && (e = n.value);
			}
			return Number.isFinite(t) && Number.isFinite(e);
		}
	}
	X.create = (e) =>
		new X({
			checks: [],
			typeName: je.ZodNumber,
			coerce: (null == e ? void 0 : e.coerce) || !1,
			...R(e),
		});
	class J extends k {
		constructor() {
			super(...arguments), (this.min = this.gte), (this.max = this.lte);
		}
		_parse(e) {
			if (
				(this._def.coerce && (e.data = BigInt(e.data)),
				this._getType(e) !== u.bigint)
			) {
				const t = this._getOrReturnCtx(e);
				return (
					_(t, {
						code: c.invalid_type,
						expected: u.bigint,
						received: t.parsedType,
					}),
					g
				);
			}
			let t;
			const n = new v();
			for (const r of this._def.checks)
				'min' === r.kind
					? (r.inclusive ? e.data < r.value : e.data <= r.value) &&
					  ((t = this._getOrReturnCtx(e, t)),
					  _(t, {
							code: c.too_small,
							type: 'bigint',
							minimum: r.value,
							inclusive: r.inclusive,
							message: r.message,
					  }),
					  n.dirty())
					: 'max' === r.kind
					? (r.inclusive ? e.data > r.value : e.data >= r.value) &&
					  ((t = this._getOrReturnCtx(e, t)),
					  _(t, {
							code: c.too_big,
							type: 'bigint',
							maximum: r.value,
							inclusive: r.inclusive,
							message: r.message,
					  }),
					  n.dirty())
					: 'multipleOf' === r.kind
					? e.data % r.value !== BigInt(0) &&
					  ((t = this._getOrReturnCtx(e, t)),
					  _(t, {
							code: c.not_multiple_of,
							multipleOf: r.value,
							message: r.message,
					  }),
					  n.dirty())
					: a.assertNever(r);
			return { status: n.value, value: e.data };
		}
		gte(e, t) {
			return this.setLimit('min', e, !0, S.toString(t));
		}
		gt(e, t) {
			return this.setLimit('min', e, !1, S.toString(t));
		}
		lte(e, t) {
			return this.setLimit('max', e, !0, S.toString(t));
		}
		lt(e, t) {
			return this.setLimit('max', e, !1, S.toString(t));
		}
		setLimit(e, t, n, r) {
			return new J({
				...this._def,
				checks: [
					...this._def.checks,
					{ kind: e, value: t, inclusive: n, message: S.toString(r) },
				],
			});
		}
		_addCheck(e) {
			return new J({ ...this._def, checks: [...this._def.checks, e] });
		}
		positive(e) {
			return this._addCheck({
				kind: 'min',
				value: BigInt(0),
				inclusive: !1,
				message: S.toString(e),
			});
		}
		negative(e) {
			return this._addCheck({
				kind: 'max',
				value: BigInt(0),
				inclusive: !1,
				message: S.toString(e),
			});
		}
		nonpositive(e) {
			return this._addCheck({
				kind: 'max',
				value: BigInt(0),
				inclusive: !0,
				message: S.toString(e),
			});
		}
		nonnegative(e) {
			return this._addCheck({
				kind: 'min',
				value: BigInt(0),
				inclusive: !0,
				message: S.toString(e),
			});
		}
		multipleOf(e, t) {
			return this._addCheck({
				kind: 'multipleOf',
				value: e,
				message: S.toString(t),
			});
		}
		get minValue() {
			let e = null;
			for (const t of this._def.checks)
				'min' === t.kind && (null === e || t.value > e) && (e = t.value);
			return e;
		}
		get maxValue() {
			let e = null;
			for (const t of this._def.checks)
				'max' === t.kind && (null === e || t.value < e) && (e = t.value);
			return e;
		}
	}
	J.create = (e) => {
		var t;
		return new J({
			checks: [],
			typeName: je.ZodBigInt,
			coerce: null !== (t = null == e ? void 0 : e.coerce) && void 0 !== t && t,
			...R(e),
		});
	};
	class Q extends k {
		_parse(e) {
			if (
				(this._def.coerce && (e.data = Boolean(e.data)),
				this._getType(e) !== u.boolean)
			) {
				const t = this._getOrReturnCtx(e);
				return (
					_(t, {
						code: c.invalid_type,
						expected: u.boolean,
						received: t.parsedType,
					}),
					g
				);
			}
			return E(e.data);
		}
	}
	Q.create = (e) =>
		new Q({
			typeName: je.ZodBoolean,
			coerce: (null == e ? void 0 : e.coerce) || !1,
			...R(e),
		});
	class ee extends k {
		_parse(e) {
			if (
				(this._def.coerce && (e.data = new Date(e.data)),
				this._getType(e) !== u.date)
			) {
				const t = this._getOrReturnCtx(e);
				return (
					_(t, {
						code: c.invalid_type,
						expected: u.date,
						received: t.parsedType,
					}),
					g
				);
			}
			if (isNaN(e.data.getTime()))
				return _(this._getOrReturnCtx(e), { code: c.invalid_date }), g;
			const t = new v();
			let n;
			for (const r of this._def.checks)
				'min' === r.kind
					? e.data.getTime() < r.value &&
					  ((n = this._getOrReturnCtx(e, n)),
					  _(n, {
							code: c.too_small,
							message: r.message,
							inclusive: !0,
							exact: !1,
							minimum: r.value,
							type: 'date',
					  }),
					  t.dirty())
					: 'max' === r.kind
					? e.data.getTime() > r.value &&
					  ((n = this._getOrReturnCtx(e, n)),
					  _(n, {
							code: c.too_big,
							message: r.message,
							inclusive: !0,
							exact: !1,
							maximum: r.value,
							type: 'date',
					  }),
					  t.dirty())
					: a.assertNever(r);
			return { status: t.value, value: new Date(e.data.getTime()) };
		}
		_addCheck(e) {
			return new ee({ ...this._def, checks: [...this._def.checks, e] });
		}
		min(e, t) {
			return this._addCheck({
				kind: 'min',
				value: e.getTime(),
				message: S.toString(t),
			});
		}
		max(e, t) {
			return this._addCheck({
				kind: 'max',
				value: e.getTime(),
				message: S.toString(t),
			});
		}
		get minDate() {
			let e = null;
			for (const t of this._def.checks)
				'min' === t.kind && (null === e || t.value > e) && (e = t.value);
			return null != e ? new Date(e) : null;
		}
		get maxDate() {
			let e = null;
			for (const t of this._def.checks)
				'max' === t.kind && (null === e || t.value < e) && (e = t.value);
			return null != e ? new Date(e) : null;
		}
	}
	ee.create = (e) =>
		new ee({
			checks: [],
			coerce: (null == e ? void 0 : e.coerce) || !1,
			typeName: je.ZodDate,
			...R(e),
		});
	class te extends k {
		_parse(e) {
			if (this._getType(e) !== u.symbol) {
				const t = this._getOrReturnCtx(e);
				return (
					_(t, {
						code: c.invalid_type,
						expected: u.symbol,
						received: t.parsedType,
					}),
					g
				);
			}
			return E(e.data);
		}
	}
	te.create = (e) => new te({ typeName: je.ZodSymbol, ...R(e) });
	class ne extends k {
		_parse(e) {
			if (this._getType(e) !== u.undefined) {
				const t = this._getOrReturnCtx(e);
				return (
					_(t, {
						code: c.invalid_type,
						expected: u.undefined,
						received: t.parsedType,
					}),
					g
				);
			}
			return E(e.data);
		}
	}
	ne.create = (e) => new ne({ typeName: je.ZodUndefined, ...R(e) });
	class re extends k {
		_parse(e) {
			if (this._getType(e) !== u.null) {
				const t = this._getOrReturnCtx(e);
				return (
					_(t, {
						code: c.invalid_type,
						expected: u.null,
						received: t.parsedType,
					}),
					g
				);
			}
			return E(e.data);
		}
	}
	re.create = (e) => new re({ typeName: je.ZodNull, ...R(e) });
	class ie extends k {
		constructor() {
			super(...arguments), (this._any = !0);
		}
		_parse(e) {
			return E(e.data);
		}
	}
	ie.create = (e) => new ie({ typeName: je.ZodAny, ...R(e) });
	class ae extends k {
		constructor() {
			super(...arguments), (this._unknown = !0);
		}
		_parse(e) {
			return E(e.data);
		}
	}
	ae.create = (e) => new ae({ typeName: je.ZodUnknown, ...R(e) });
	class se extends k {
		_parse(e) {
			const t = this._getOrReturnCtx(e);
			return (
				_(t, { code: c.invalid_type, expected: u.never, received: t.parsedType }),
				g
			);
		}
	}
	se.create = (e) => new se({ typeName: je.ZodNever, ...R(e) });
	class oe extends k {
		_parse(e) {
			if (this._getType(e) !== u.undefined) {
				const t = this._getOrReturnCtx(e);
				return (
					_(t, {
						code: c.invalid_type,
						expected: u.void,
						received: t.parsedType,
					}),
					g
				);
			}
			return E(e.data);
		}
	}
	oe.create = (e) => new oe({ typeName: je.ZodVoid, ...R(e) });
	class ue extends k {
		_parse(e) {
			const { ctx: t, status: n } = this._processInputParams(e),
				r = this._def;
			if (t.parsedType !== u.array)
				return (
					_(t, {
						code: c.invalid_type,
						expected: u.array,
						received: t.parsedType,
					}),
					g
				);
			if (null !== r.exactLength) {
				const e = t.data.length > r.exactLength.value,
					i = t.data.length < r.exactLength.value;
				(e || i) &&
					(_(t, {
						code: e ? c.too_big : c.too_small,
						minimum: i ? r.exactLength.value : void 0,
						maximum: e ? r.exactLength.value : void 0,
						type: 'array',
						inclusive: !0,
						exact: !0,
						message: r.exactLength.message,
					}),
					n.dirty());
			}
			if (
				(null !== r.minLength &&
					t.data.length < r.minLength.value &&
					(_(t, {
						code: c.too_small,
						minimum: r.minLength.value,
						type: 'array',
						inclusive: !0,
						exact: !1,
						message: r.minLength.message,
					}),
					n.dirty()),
				null !== r.maxLength &&
					t.data.length > r.maxLength.value &&
					(_(t, {
						code: c.too_big,
						maximum: r.maxLength.value,
						type: 'array',
						inclusive: !0,
						exact: !1,
						message: r.maxLength.message,
					}),
					n.dirty()),
				t.common.async)
			)
				return Promise.all(
					[...t.data].map((e, n) => r.type._parseAsync(new x(t, e, t.path, n)))
				).then((e) => v.mergeArray(n, e));
			const i = [...t.data].map((e, n) =>
				r.type._parseSync(new x(t, e, t.path, n))
			);
			return v.mergeArray(n, i);
		}
		get element() {
			return this._def.type;
		}
		min(e, t) {
			return new ue({
				...this._def,
				minLength: { value: e, message: S.toString(t) },
			});
		}
		max(e, t) {
			return new ue({
				...this._def,
				maxLength: { value: e, message: S.toString(t) },
			});
		}
		length(e, t) {
			return new ue({
				...this._def,
				exactLength: { value: e, message: S.toString(t) },
			});
		}
		nonempty(e) {
			return this.min(1, e);
		}
	}
	function le(e) {
		if (e instanceof ce) {
			const t = {};
			for (const n in e.shape) {
				const r = e.shape[n];
				t[n] = Oe.create(le(r));
			}
			return new ce({ ...e._def, shape: () => t });
		}
		return e instanceof ue
			? new ue({ ...e._def, type: le(e.element) })
			: e instanceof Oe
			? Oe.create(le(e.unwrap()))
			: e instanceof Ce
			? Ce.create(le(e.unwrap()))
			: e instanceof _e
			? _e.create(e.items.map((e) => le(e)))
			: e;
	}
	ue.create = (e, t) =>
		new ue({
			type: e,
			minLength: null,
			maxLength: null,
			exactLength: null,
			typeName: je.ZodArray,
			...R(t),
		});
	class ce extends k {
		constructor() {
			super(...arguments),
				(this._cached = null),
				(this.nonstrict = this.passthrough),
				(this.augment = this.extend);
		}
		_getCached() {
			if (null !== this._cached) return this._cached;
			const e = this._def.shape(),
				t = a.objectKeys(e);
			return (this._cached = { shape: e, keys: t });
		}
		_parse(e) {
			if (this._getType(e) !== u.object) {
				const t = this._getOrReturnCtx(e);
				return (
					_(t, {
						code: c.invalid_type,
						expected: u.object,
						received: t.parsedType,
					}),
					g
				);
			}
			const { status: t, ctx: n } = this._processInputParams(e),
				{ shape: r, keys: i } = this._getCached(),
				a = [];
			if (!(this._def.catchall instanceof se && 'strip' === this._def.unknownKeys))
				for (const e in n.data) i.includes(e) || a.push(e);
			const s = [];
			for (const e of i) {
				const t = r[e],
					i = n.data[e];
				s.push({
					key: { status: 'valid', value: e },
					value: t._parse(new x(n, i, n.path, e)),
					alwaysSet: e in n.data,
				});
			}
			if (this._def.catchall instanceof se) {
				const e = this._def.unknownKeys;
				if ('passthrough' === e)
					for (const e of a)
						s.push({
							key: { status: 'valid', value: e },
							value: { status: 'valid', value: n.data[e] },
						});
				else if ('strict' === e)
					a.length > 0 &&
						(_(n, { code: c.unrecognized_keys, keys: a }), t.dirty());
				else if ('strip' !== e)
					throw new Error(
						'Internal ZodObject error: invalid unknownKeys value.'
					);
			} else {
				const e = this._def.catchall;
				for (const t of a) {
					const r = n.data[t];
					s.push({
						key: { status: 'valid', value: t },
						value: e._parse(new x(n, r, n.path, t)),
						alwaysSet: t in n.data,
					});
				}
			}
			return n.common.async
				? Promise.resolve()
						.then(async () => {
							const e = [];
							for (const t of s) {
								const n = await t.key,
									r = await t.value;
								e.push({ key: n, value: r, alwaysSet: t.alwaysSet });
							}
							return e;
						})
						.then((e) => v.mergeObjectSync(t, e))
				: v.mergeObjectSync(t, s);
		}
		get shape() {
			return this._def.shape();
		}
		strict(e) {
			return (
				S.errToObj,
				new ce({
					...this._def,
					unknownKeys: 'strict',
					...(void 0 !== e
						? {
								errorMap: (t, n) => {
									var r, i, a, s;
									const o =
										null !==
											(a =
												null === (i = (r = this._def).errorMap) ||
												void 0 === i
													? void 0
													: i.call(r, t, n).message) &&
										void 0 !== a
											? a
											: n.defaultError;
									return 'unrecognized_keys' === t.code
										? {
												message:
													null !==
														(s = S.errToObj(e).message) &&
													void 0 !== s
														? s
														: o,
										  }
										: { message: o };
								},
						  }
						: {}),
				})
			);
		}
		strip() {
			return new ce({ ...this._def, unknownKeys: 'strip' });
		}
		passthrough() {
			return new ce({ ...this._def, unknownKeys: 'passthrough' });
		}
		extend(e) {
			return new ce({
				...this._def,
				shape: () => ({ ...this._def.shape(), ...e }),
			});
		}
		merge(e) {
			return new ce({
				unknownKeys: e._def.unknownKeys,
				catchall: e._def.catchall,
				shape: () => ({ ...this._def.shape(), ...e._def.shape() }),
				typeName: je.ZodObject,
			});
		}
		setKey(e, t) {
			return this.augment({ [e]: t });
		}
		catchall(e) {
			return new ce({ ...this._def, catchall: e });
		}
		pick(e) {
			const t = {};
			return (
				a.objectKeys(e).forEach((n) => {
					e[n] && this.shape[n] && (t[n] = this.shape[n]);
				}),
				new ce({ ...this._def, shape: () => t })
			);
		}
		omit(e) {
			const t = {};
			return (
				a.objectKeys(this.shape).forEach((n) => {
					e[n] || (t[n] = this.shape[n]);
				}),
				new ce({ ...this._def, shape: () => t })
			);
		}
		deepPartial() {
			return le(this);
		}
		partial(e) {
			const t = {};
			return (
				a.objectKeys(this.shape).forEach((n) => {
					const r = this.shape[n];
					e && !e[n] ? (t[n] = r) : (t[n] = r.optional());
				}),
				new ce({ ...this._def, shape: () => t })
			);
		}
		required(e) {
			const t = {};
			return (
				a.objectKeys(this.shape).forEach((n) => {
					if (e && !e[n]) t[n] = this.shape[n];
					else {
						let e = this.shape[n];
						for (; e instanceof Oe; ) e = e._def.innerType;
						t[n] = e;
					}
				}),
				new ce({ ...this._def, shape: () => t })
			);
		}
		keyof() {
			return Ne(a.objectKeys(this.shape));
		}
	}
	(ce.create = (e, t) =>
		new ce({
			shape: () => e,
			unknownKeys: 'strip',
			catchall: se.create(),
			typeName: je.ZodObject,
			...R(t),
		})),
		(ce.strictCreate = (e, t) =>
			new ce({
				shape: () => e,
				unknownKeys: 'strict',
				catchall: se.create(),
				typeName: je.ZodObject,
				...R(t),
			})),
		(ce.lazycreate = (e, t) =>
			new ce({
				shape: e,
				unknownKeys: 'strip',
				catchall: se.create(),
				typeName: je.ZodObject,
				...R(t),
			}));
	class de extends k {
		_parse(e) {
			const { ctx: t } = this._processInputParams(e),
				n = this._def.options;
			if (t.common.async)
				return Promise.all(
					n.map(async (e) => {
						const n = {
							...t,
							common: { ...t.common, issues: [] },
							parent: null,
						};
						return {
							result: await e._parseAsync({
								data: t.data,
								path: t.path,
								parent: n,
							}),
							ctx: n,
						};
					})
				).then(function (e) {
					for (const t of e) if ('valid' === t.result.status) return t.result;
					for (const n of e)
						if ('dirty' === n.result.status)
							return t.common.issues.push(...n.ctx.common.issues), n.result;
					const n = e.map((e) => new d(e.ctx.common.issues));
					return _(t, { code: c.invalid_union, unionErrors: n }), g;
				});
			{
				let e;
				const r = [];
				for (const i of n) {
					const n = { ...t, common: { ...t.common, issues: [] }, parent: null },
						a = i._parseSync({ data: t.data, path: t.path, parent: n });
					if ('valid' === a.status) return a;
					'dirty' !== a.status || e || (e = { result: a, ctx: n }),
						n.common.issues.length && r.push(n.common.issues);
				}
				if (e) return t.common.issues.push(...e.ctx.common.issues), e.result;
				const i = r.map((e) => new d(e));
				return _(t, { code: c.invalid_union, unionErrors: i }), g;
			}
		}
		get options() {
			return this._def.options;
		}
	}
	de.create = (e, t) => new de({ options: e, typeName: je.ZodUnion, ...R(t) });
	const pe = (e) =>
		e instanceof be
			? pe(e.schema)
			: e instanceof Se
			? pe(e.innerType())
			: e instanceof Te
			? [e.value]
			: e instanceof we
			? e.options
			: e instanceof Ae
			? a.objectValues(e.enum)
			: e instanceof xe
			? pe(e._def.innerType)
			: e instanceof ne
			? [void 0]
			: e instanceof re
			? [null]
			: e instanceof Oe
			? [void 0, ...pe(e.unwrap())]
			: e instanceof Ce
			? [null, ...pe(e.unwrap())]
			: e instanceof Pe || e instanceof Ue
			? pe(e.unwrap())
			: e instanceof De
			? pe(e._def.innerType)
			: [];
	class he extends k {
		_parse(e) {
			const { ctx: t } = this._processInputParams(e);
			if (t.parsedType !== u.object)
				return (
					_(t, {
						code: c.invalid_type,
						expected: u.object,
						received: t.parsedType,
					}),
					g
				);
			const n = this.discriminator,
				r = t.data[n],
				i = this.optionsMap.get(r);
			return i
				? t.common.async
					? i._parseAsync({ data: t.data, path: t.path, parent: t })
					: i._parseSync({ data: t.data, path: t.path, parent: t })
				: (_(t, {
						code: c.invalid_union_discriminator,
						options: Array.from(this.optionsMap.keys()),
						path: [n],
				  }),
				  g);
		}
		get discriminator() {
			return this._def.discriminator;
		}
		get options() {
			return this._def.options;
		}
		get optionsMap() {
			return this._def.optionsMap;
		}
		static create(e, t, n) {
			const r = new Map();
			for (const n of t) {
				const t = pe(n.shape[e]);
				if (!t.length)
					throw new Error(
						`A discriminator value for key \`${e}\` could not be extracted from all schema options`
					);
				for (const i of t) {
					if (r.has(i))
						throw new Error(
							`Discriminator property ${String(
								e
							)} has duplicate value ${String(i)}`
						);
					r.set(i, n);
				}
			}
			return new he({
				typeName: je.ZodDiscriminatedUnion,
				discriminator: e,
				options: t,
				optionsMap: r,
				...R(n),
			});
		}
	}
	function fe(e, t) {
		const n = l(e),
			r = l(t);
		if (e === t) return { valid: !0, data: e };
		if (n === u.object && r === u.object) {
			const n = a.objectKeys(t),
				r = a.objectKeys(e).filter((e) => -1 !== n.indexOf(e)),
				i = { ...e, ...t };
			for (const n of r) {
				const r = fe(e[n], t[n]);
				if (!r.valid) return { valid: !1 };
				i[n] = r.data;
			}
			return { valid: !0, data: i };
		}
		if (n === u.array && r === u.array) {
			if (e.length !== t.length) return { valid: !1 };
			const n = [];
			for (let r = 0; r < e.length; r++) {
				const i = fe(e[r], t[r]);
				if (!i.valid) return { valid: !1 };
				n.push(i.data);
			}
			return { valid: !0, data: n };
		}
		return n === u.date && r === u.date && +e == +t
			? { valid: !0, data: e }
			: { valid: !1 };
	}
	class me extends k {
		_parse(e) {
			const { status: t, ctx: n } = this._processInputParams(e),
				r = (e, r) => {
					if (b(e) || b(r)) return g;
					const i = fe(e.value, r.value);
					return i.valid
						? ((T(e) || T(r)) && t.dirty(),
						  { status: t.value, value: i.data })
						: (_(n, { code: c.invalid_intersection_types }), g);
				};
			return n.common.async
				? Promise.all([
						this._def.left._parseAsync({
							data: n.data,
							path: n.path,
							parent: n,
						}),
						this._def.right._parseAsync({
							data: n.data,
							path: n.path,
							parent: n,
						}),
				  ]).then(([e, t]) => r(e, t))
				: r(
						this._def.left._parseSync({
							data: n.data,
							path: n.path,
							parent: n,
						}),
						this._def.right._parseSync({
							data: n.data,
							path: n.path,
							parent: n,
						})
				  );
		}
	}
	me.create = (e, t, n) =>
		new me({ left: e, right: t, typeName: je.ZodIntersection, ...R(n) });
	class _e extends k {
		_parse(e) {
			const { status: t, ctx: n } = this._processInputParams(e);
			if (n.parsedType !== u.array)
				return (
					_(n, {
						code: c.invalid_type,
						expected: u.array,
						received: n.parsedType,
					}),
					g
				);
			if (n.data.length < this._def.items.length)
				return (
					_(n, {
						code: c.too_small,
						minimum: this._def.items.length,
						inclusive: !0,
						exact: !1,
						type: 'array',
					}),
					g
				);
			!this._def.rest &&
				n.data.length > this._def.items.length &&
				(_(n, {
					code: c.too_big,
					maximum: this._def.items.length,
					inclusive: !0,
					exact: !1,
					type: 'array',
				}),
				t.dirty());
			const r = [...n.data]
				.map((e, t) => {
					const r = this._def.items[t] || this._def.rest;
					return r ? r._parse(new x(n, e, n.path, t)) : null;
				})
				.filter((e) => !!e);
			return n.common.async
				? Promise.all(r).then((e) => v.mergeArray(t, e))
				: v.mergeArray(t, r);
		}
		get items() {
			return this._def.items;
		}
		rest(e) {
			return new _e({ ...this._def, rest: e });
		}
	}
	_e.create = (e, t) => {
		if (!Array.isArray(e))
			throw new Error('You must pass an array of schemas to z.tuple([ ... ])');
		return new _e({ items: e, typeName: je.ZodTuple, rest: null, ...R(t) });
	};
	class ve extends k {
		get keySchema() {
			return this._def.keyType;
		}
		get valueSchema() {
			return this._def.valueType;
		}
		_parse(e) {
			const { status: t, ctx: n } = this._processInputParams(e);
			if (n.parsedType !== u.object)
				return (
					_(n, {
						code: c.invalid_type,
						expected: u.object,
						received: n.parsedType,
					}),
					g
				);
			const r = [],
				i = this._def.keyType,
				a = this._def.valueType;
			for (const e in n.data)
				r.push({
					key: i._parse(new x(n, e, n.path, e)),
					value: a._parse(new x(n, n.data[e], n.path, e)),
					alwaysSet: e in n.data,
				});
			return n.common.async ? v.mergeObjectAsync(t, r) : v.mergeObjectSync(t, r);
		}
		get element() {
			return this._def.valueType;
		}
		static create(e, t, n) {
			return new ve(
				t instanceof k
					? { keyType: e, valueType: t, typeName: je.ZodRecord, ...R(n) }
					: {
							keyType: z.create(),
							valueType: e,
							typeName: je.ZodRecord,
							...R(t),
					  }
			);
		}
	}
	class ge extends k {
		get keySchema() {
			return this._def.keyType;
		}
		get valueSchema() {
			return this._def.valueType;
		}
		_parse(e) {
			const { status: t, ctx: n } = this._processInputParams(e);
			if (n.parsedType !== u.map)
				return (
					_(n, {
						code: c.invalid_type,
						expected: u.map,
						received: n.parsedType,
					}),
					g
				);
			const r = this._def.keyType,
				i = this._def.valueType,
				a = [...n.data.entries()].map(([e, t], a) => ({
					key: r._parse(new x(n, e, n.path, [a, 'key'])),
					value: i._parse(new x(n, t, n.path, [a, 'value'])),
				}));
			if (n.common.async) {
				const e = new Map();
				return Promise.resolve().then(async () => {
					for (const n of a) {
						const r = await n.key,
							i = await n.value;
						if ('aborted' === r.status || 'aborted' === i.status) return g;
						('dirty' !== r.status && 'dirty' !== i.status) || t.dirty(),
							e.set(r.value, i.value);
					}
					return { status: t.value, value: e };
				});
			}
			{
				const e = new Map();
				for (const n of a) {
					const r = n.key,
						i = n.value;
					if ('aborted' === r.status || 'aborted' === i.status) return g;
					('dirty' !== r.status && 'dirty' !== i.status) || t.dirty(),
						e.set(r.value, i.value);
				}
				return { status: t.value, value: e };
			}
		}
	}
	ge.create = (e, t, n) =>
		new ge({ valueType: t, keyType: e, typeName: je.ZodMap, ...R(n) });
	class ye extends k {
		_parse(e) {
			const { status: t, ctx: n } = this._processInputParams(e);
			if (n.parsedType !== u.set)
				return (
					_(n, {
						code: c.invalid_type,
						expected: u.set,
						received: n.parsedType,
					}),
					g
				);
			const r = this._def;
			null !== r.minSize &&
				n.data.size < r.minSize.value &&
				(_(n, {
					code: c.too_small,
					minimum: r.minSize.value,
					type: 'set',
					inclusive: !0,
					exact: !1,
					message: r.minSize.message,
				}),
				t.dirty()),
				null !== r.maxSize &&
					n.data.size > r.maxSize.value &&
					(_(n, {
						code: c.too_big,
						maximum: r.maxSize.value,
						type: 'set',
						inclusive: !0,
						exact: !1,
						message: r.maxSize.message,
					}),
					t.dirty());
			const i = this._def.valueType;
			function a(e) {
				const n = new Set();
				for (const r of e) {
					if ('aborted' === r.status) return g;
					'dirty' === r.status && t.dirty(), n.add(r.value);
				}
				return { status: t.value, value: n };
			}
			const s = [...n.data.values()].map((e, t) =>
				i._parse(new x(n, e, n.path, t))
			);
			return n.common.async ? Promise.all(s).then((e) => a(e)) : a(s);
		}
		min(e, t) {
			return new ye({
				...this._def,
				minSize: { value: e, message: S.toString(t) },
			});
		}
		max(e, t) {
			return new ye({
				...this._def,
				maxSize: { value: e, message: S.toString(t) },
			});
		}
		size(e, t) {
			return this.min(e, t).max(e, t);
		}
		nonempty(e) {
			return this.min(1, e);
		}
	}
	ye.create = (e, t) =>
		new ye({
			valueType: e,
			minSize: null,
			maxSize: null,
			typeName: je.ZodSet,
			...R(t),
		});
	class Ee extends k {
		constructor() {
			super(...arguments), (this.validate = this.implement);
		}
		_parse(e) {
			const { ctx: t } = this._processInputParams(e);
			if (t.parsedType !== u.function)
				return (
					_(t, {
						code: c.invalid_type,
						expected: u.function,
						received: t.parsedType,
					}),
					g
				);
			function n(e, n) {
				return m({
					data: e,
					path: t.path,
					errorMaps: [
						t.common.contextualErrorMap,
						t.schemaErrorMap,
						f(),
						p,
					].filter((e) => !!e),
					issueData: { code: c.invalid_arguments, argumentsError: n },
				});
			}
			function r(e, n) {
				return m({
					data: e,
					path: t.path,
					errorMaps: [
						t.common.contextualErrorMap,
						t.schemaErrorMap,
						f(),
						p,
					].filter((e) => !!e),
					issueData: { code: c.invalid_return_type, returnTypeError: n },
				});
			}
			const i = { errorMap: t.common.contextualErrorMap },
				a = t.data;
			if (this._def.returns instanceof Ie) {
				const e = this;
				return E(async function (...t) {
					const s = new d([]),
						o = await e._def.args.parseAsync(t, i).catch((e) => {
							throw (s.addIssue(n(t, e)), s);
						}),
						u = await Reflect.apply(a, this, o);
					return await e._def.returns._def.type.parseAsync(u, i).catch((e) => {
						throw (s.addIssue(r(u, e)), s);
					});
				});
			}
			{
				const e = this;
				return E(function (...t) {
					const s = e._def.args.safeParse(t, i);
					if (!s.success) throw new d([n(t, s.error)]);
					const o = Reflect.apply(a, this, s.data),
						u = e._def.returns.safeParse(o, i);
					if (!u.success) throw new d([r(o, u.error)]);
					return u.data;
				});
			}
		}
		parameters() {
			return this._def.args;
		}
		returnType() {
			return this._def.returns;
		}
		args(...e) {
			return new Ee({ ...this._def, args: _e.create(e).rest(ae.create()) });
		}
		returns(e) {
			return new Ee({ ...this._def, returns: e });
		}
		implement(e) {
			return this.parse(e);
		}
		strictImplement(e) {
			return this.parse(e);
		}
		static create(e, t, n) {
			return new Ee({
				args: e || _e.create([]).rest(ae.create()),
				returns: t || ae.create(),
				typeName: je.ZodFunction,
				...R(n),
			});
		}
	}
	class be extends k {
		get schema() {
			return this._def.getter();
		}
		_parse(e) {
			const { ctx: t } = this._processInputParams(e);
			return this._def.getter()._parse({ data: t.data, path: t.path, parent: t });
		}
	}
	be.create = (e, t) => new be({ getter: e, typeName: je.ZodLazy, ...R(t) });
	class Te extends k {
		_parse(e) {
			if (e.data !== this._def.value) {
				const t = this._getOrReturnCtx(e);
				return (
					_(t, {
						received: t.data,
						code: c.invalid_literal,
						expected: this._def.value,
					}),
					g
				);
			}
			return { status: 'valid', value: e.data };
		}
		get value() {
			return this._def.value;
		}
	}
	function Ne(e, t) {
		return new we({ values: e, typeName: je.ZodEnum, ...R(t) });
	}
	Te.create = (e, t) => new Te({ value: e, typeName: je.ZodLiteral, ...R(t) });
	class we extends k {
		constructor() {
			super(...arguments), O.set(this, void 0);
		}
		_parse(e) {
			if ('string' != typeof e.data) {
				const t = this._getOrReturnCtx(e),
					n = this._def.values;
				return (
					_(t, {
						expected: a.joinValues(n),
						received: t.parsedType,
						code: c.invalid_type,
					}),
					g
				);
			}
			if (
				(A(this, O, 'f') || I(this, O, new Set(this._def.values), 'f'),
				!A(this, O, 'f').has(e.data))
			) {
				const t = this._getOrReturnCtx(e),
					n = this._def.values;
				return (
					_(t, { received: t.data, code: c.invalid_enum_value, options: n }), g
				);
			}
			return E(e.data);
		}
		get options() {
			return this._def.values;
		}
		get enum() {
			const e = {};
			for (const t of this._def.values) e[t] = t;
			return e;
		}
		get Values() {
			const e = {};
			for (const t of this._def.values) e[t] = t;
			return e;
		}
		get Enum() {
			const e = {};
			for (const t of this._def.values) e[t] = t;
			return e;
		}
		extract(e, t = this._def) {
			return we.create(e, { ...this._def, ...t });
		}
		exclude(e, t = this._def) {
			return we.create(
				this.options.filter((t) => !e.includes(t)),
				{ ...this._def, ...t }
			);
		}
	}
	(O = new WeakMap()), (we.create = Ne);
	class Ae extends k {
		constructor() {
			super(...arguments), C.set(this, void 0);
		}
		_parse(e) {
			const t = a.getValidEnumValues(this._def.values),
				n = this._getOrReturnCtx(e);
			if (n.parsedType !== u.string && n.parsedType !== u.number) {
				const e = a.objectValues(t);
				return (
					_(n, {
						expected: a.joinValues(e),
						received: n.parsedType,
						code: c.invalid_type,
					}),
					g
				);
			}
			if (
				(A(this, C, 'f') ||
					I(this, C, new Set(a.getValidEnumValues(this._def.values)), 'f'),
				!A(this, C, 'f').has(e.data))
			) {
				const e = a.objectValues(t);
				return (
					_(n, { received: n.data, code: c.invalid_enum_value, options: e }), g
				);
			}
			return E(e.data);
		}
		get enum() {
			return this._def.values;
		}
	}
	(C = new WeakMap()),
		(Ae.create = (e, t) =>
			new Ae({ values: e, typeName: je.ZodNativeEnum, ...R(t) }));
	class Ie extends k {
		unwrap() {
			return this._def.type;
		}
		_parse(e) {
			const { ctx: t } = this._processInputParams(e);
			if (t.parsedType !== u.promise && !1 === t.common.async)
				return (
					_(t, {
						code: c.invalid_type,
						expected: u.promise,
						received: t.parsedType,
					}),
					g
				);
			const n = t.parsedType === u.promise ? t.data : Promise.resolve(t.data);
			return E(
				n.then((e) =>
					this._def.type.parseAsync(e, {
						path: t.path,
						errorMap: t.common.contextualErrorMap,
					})
				)
			);
		}
	}
	Ie.create = (e, t) => new Ie({ type: e, typeName: je.ZodPromise, ...R(t) });
	class Se extends k {
		innerType() {
			return this._def.schema;
		}
		sourceType() {
			return this._def.schema._def.typeName === je.ZodEffects
				? this._def.schema.sourceType()
				: this._def.schema;
		}
		_parse(e) {
			const { status: t, ctx: n } = this._processInputParams(e),
				r = this._def.effect || null,
				i = {
					addIssue: (e) => {
						_(n, e), e.fatal ? t.abort() : t.dirty();
					},
					get path() {
						return n.path;
					},
				};
			if (((i.addIssue = i.addIssue.bind(i)), 'preprocess' === r.type)) {
				const e = r.transform(n.data, i);
				if (n.common.async)
					return Promise.resolve(e).then(async (e) => {
						if ('aborted' === t.value) return g;
						const r = await this._def.schema._parseAsync({
							data: e,
							path: n.path,
							parent: n,
						});
						return 'aborted' === r.status
							? g
							: 'dirty' === r.status || 'dirty' === t.value
							? y(r.value)
							: r;
					});
				{
					if ('aborted' === t.value) return g;
					const r = this._def.schema._parseSync({
						data: e,
						path: n.path,
						parent: n,
					});
					return 'aborted' === r.status
						? g
						: 'dirty' === r.status || 'dirty' === t.value
						? y(r.value)
						: r;
				}
			}
			if ('refinement' === r.type) {
				const e = (e) => {
					const t = r.refinement(e, i);
					if (n.common.async) return Promise.resolve(t);
					if (t instanceof Promise)
						throw new Error(
							'Async refinement encountered during synchronous parse operation. Use .parseAsync instead.'
						);
					return e;
				};
				if (!1 === n.common.async) {
					const r = this._def.schema._parseSync({
						data: n.data,
						path: n.path,
						parent: n,
					});
					return 'aborted' === r.status
						? g
						: ('dirty' === r.status && t.dirty(),
						  e(r.value),
						  { status: t.value, value: r.value });
				}
				return this._def.schema
					._parseAsync({ data: n.data, path: n.path, parent: n })
					.then((n) =>
						'aborted' === n.status
							? g
							: ('dirty' === n.status && t.dirty(),
							  e(n.value).then(() => ({
									status: t.value,
									value: n.value,
							  })))
					);
			}
			if ('transform' === r.type) {
				if (!1 === n.common.async) {
					const e = this._def.schema._parseSync({
						data: n.data,
						path: n.path,
						parent: n,
					});
					if (!N(e)) return e;
					const a = r.transform(e.value, i);
					if (a instanceof Promise)
						throw new Error(
							'Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.'
						);
					return { status: t.value, value: a };
				}
				return this._def.schema
					._parseAsync({ data: n.data, path: n.path, parent: n })
					.then((e) =>
						N(e)
							? Promise.resolve(r.transform(e.value, i)).then((e) => ({
									status: t.value,
									value: e,
							  }))
							: e
					);
			}
			a.assertNever(r);
		}
	}
	(Se.create = (e, t, n) =>
		new Se({ schema: e, typeName: je.ZodEffects, effect: t, ...R(n) })),
		(Se.createWithPreprocess = (e, t, n) =>
			new Se({
				schema: t,
				effect: { type: 'preprocess', transform: e },
				typeName: je.ZodEffects,
				...R(n),
			}));
	class Oe extends k {
		_parse(e) {
			return this._getType(e) === u.undefined
				? E(void 0)
				: this._def.innerType._parse(e);
		}
		unwrap() {
			return this._def.innerType;
		}
	}
	Oe.create = (e, t) => new Oe({ innerType: e, typeName: je.ZodOptional, ...R(t) });
	class Ce extends k {
		_parse(e) {
			return this._getType(e) === u.null ? E(null) : this._def.innerType._parse(e);
		}
		unwrap() {
			return this._def.innerType;
		}
	}
	Ce.create = (e, t) => new Ce({ innerType: e, typeName: je.ZodNullable, ...R(t) });
	class xe extends k {
		_parse(e) {
			const { ctx: t } = this._processInputParams(e);
			let n = t.data;
			return (
				t.parsedType === u.undefined && (n = this._def.defaultValue()),
				this._def.innerType._parse({ data: n, path: t.path, parent: t })
			);
		}
		removeDefault() {
			return this._def.innerType;
		}
	}
	xe.create = (e, t) =>
		new xe({
			innerType: e,
			typeName: je.ZodDefault,
			defaultValue: 'function' == typeof t.default ? t.default : () => t.default,
			...R(t),
		});
	class De extends k {
		_parse(e) {
			const { ctx: t } = this._processInputParams(e),
				n = { ...t, common: { ...t.common, issues: [] } },
				r = this._def.innerType._parse({
					data: n.data,
					path: n.path,
					parent: { ...n },
				});
			return w(r)
				? r.then((e) => ({
						status: 'valid',
						value:
							'valid' === e.status
								? e.value
								: this._def.catchValue({
										get error() {
											return new d(n.common.issues);
										},
										input: n.data,
								  }),
				  }))
				: {
						status: 'valid',
						value:
							'valid' === r.status
								? r.value
								: this._def.catchValue({
										get error() {
											return new d(n.common.issues);
										},
										input: n.data,
								  }),
				  };
		}
		removeCatch() {
			return this._def.innerType;
		}
	}
	De.create = (e, t) =>
		new De({
			innerType: e,
			typeName: je.ZodCatch,
			catchValue: 'function' == typeof t.catch ? t.catch : () => t.catch,
			...R(t),
		});
	class Re extends k {
		_parse(e) {
			if (this._getType(e) !== u.nan) {
				const t = this._getOrReturnCtx(e);
				return (
					_(t, {
						code: c.invalid_type,
						expected: u.nan,
						received: t.parsedType,
					}),
					g
				);
			}
			return { status: 'valid', value: e.data };
		}
	}
	Re.create = (e) => new Re({ typeName: je.ZodNaN, ...R(e) });
	const ke = Symbol('zod_brand');
	class Pe extends k {
		_parse(e) {
			const { ctx: t } = this._processInputParams(e),
				n = t.data;
			return this._def.type._parse({ data: n, path: t.path, parent: t });
		}
		unwrap() {
			return this._def.type;
		}
	}
	class Le extends k {
		_parse(e) {
			const { status: t, ctx: n } = this._processInputParams(e);
			if (n.common.async)
				return (async () => {
					const e = await this._def.in._parseAsync({
						data: n.data,
						path: n.path,
						parent: n,
					});
					return 'aborted' === e.status
						? g
						: 'dirty' === e.status
						? (t.dirty(), y(e.value))
						: this._def.out._parseAsync({
								data: e.value,
								path: n.path,
								parent: n,
						  });
				})();
			{
				const e = this._def.in._parseSync({
					data: n.data,
					path: n.path,
					parent: n,
				});
				return 'aborted' === e.status
					? g
					: 'dirty' === e.status
					? (t.dirty(), { status: 'dirty', value: e.value })
					: this._def.out._parseSync({
							data: e.value,
							path: n.path,
							parent: n,
					  });
			}
		}
		static create(e, t) {
			return new Le({ in: e, out: t, typeName: je.ZodPipeline });
		}
	}
	class Ue extends k {
		_parse(e) {
			const t = this._def.innerType._parse(e);
			return N(t) && (t.value = Object.freeze(t.value)), t;
		}
		unwrap() {
			return this._def.innerType;
		}
	}
	function Me(e, t = {}, n) {
		return e
			? ie.create().superRefine((r, i) => {
					var a, s;
					if (!e(r)) {
						const e =
								'function' == typeof t
									? t(r)
									: 'string' == typeof t
									? { message: t }
									: t,
							o =
								null ===
									(s =
										null !== (a = e.fatal) && void 0 !== a ? a : n) ||
								void 0 === s ||
								s,
							u = 'string' == typeof e ? { message: e } : e;
						i.addIssue({ code: 'custom', ...u, fatal: o });
					}
			  })
			: ie.create();
	}
	Ue.create = (e, t) => new Ue({ innerType: e, typeName: je.ZodReadonly, ...R(t) });
	const Ze = { object: ce.lazycreate };
	var je;
	!(function (e) {
		(e.ZodString = 'ZodString'),
			(e.ZodNumber = 'ZodNumber'),
			(e.ZodNaN = 'ZodNaN'),
			(e.ZodBigInt = 'ZodBigInt'),
			(e.ZodBoolean = 'ZodBoolean'),
			(e.ZodDate = 'ZodDate'),
			(e.ZodSymbol = 'ZodSymbol'),
			(e.ZodUndefined = 'ZodUndefined'),
			(e.ZodNull = 'ZodNull'),
			(e.ZodAny = 'ZodAny'),
			(e.ZodUnknown = 'ZodUnknown'),
			(e.ZodNever = 'ZodNever'),
			(e.ZodVoid = 'ZodVoid'),
			(e.ZodArray = 'ZodArray'),
			(e.ZodObject = 'ZodObject'),
			(e.ZodUnion = 'ZodUnion'),
			(e.ZodDiscriminatedUnion = 'ZodDiscriminatedUnion'),
			(e.ZodIntersection = 'ZodIntersection'),
			(e.ZodTuple = 'ZodTuple'),
			(e.ZodRecord = 'ZodRecord'),
			(e.ZodMap = 'ZodMap'),
			(e.ZodSet = 'ZodSet'),
			(e.ZodFunction = 'ZodFunction'),
			(e.ZodLazy = 'ZodLazy'),
			(e.ZodLiteral = 'ZodLiteral'),
			(e.ZodEnum = 'ZodEnum'),
			(e.ZodEffects = 'ZodEffects'),
			(e.ZodNativeEnum = 'ZodNativeEnum'),
			(e.ZodOptional = 'ZodOptional'),
			(e.ZodNullable = 'ZodNullable'),
			(e.ZodDefault = 'ZodDefault'),
			(e.ZodCatch = 'ZodCatch'),
			(e.ZodPromise = 'ZodPromise'),
			(e.ZodBranded = 'ZodBranded'),
			(e.ZodPipeline = 'ZodPipeline'),
			(e.ZodReadonly = 'ZodReadonly');
	})(je || (je = {}));
	const Be = z.create,
		Ge = X.create,
		Ve = Re.create,
		He = J.create,
		Ke = Q.create,
		Fe = ee.create,
		qe = te.create,
		$e = ne.create,
		Ye = re.create,
		ze = ie.create,
		We = ae.create,
		Xe = se.create,
		Je = oe.create,
		Qe = ue.create,
		et = ce.create,
		tt = ce.strictCreate,
		nt = de.create,
		rt = he.create,
		it = me.create,
		at = _e.create,
		st = ve.create,
		ot = ge.create,
		ut = ye.create,
		lt = Ee.create,
		ct = be.create,
		dt = Te.create,
		pt = we.create,
		ht = Ae.create,
		ft = Ie.create,
		mt = Se.create,
		_t = Oe.create,
		vt = Ce.create,
		gt = Se.createWithPreprocess,
		yt = Le.create,
		Et = {
			string: (e) => z.create({ ...e, coerce: !0 }),
			number: (e) => X.create({ ...e, coerce: !0 }),
			boolean: (e) => Q.create({ ...e, coerce: !0 }),
			bigint: (e) => J.create({ ...e, coerce: !0 }),
			date: (e) => ee.create({ ...e, coerce: !0 }),
		},
		bt = g;
	var Tt = Object.freeze({
			__proto__: null,
			defaultErrorMap: p,
			setErrorMap: function (e) {
				h = e;
			},
			getErrorMap: f,
			makeIssue: m,
			EMPTY_PATH: [],
			addIssueToContext: _,
			ParseStatus: v,
			INVALID: g,
			DIRTY: y,
			OK: E,
			isAborted: b,
			isDirty: T,
			isValid: N,
			isAsync: w,
			get util() {
				return a;
			},
			get objectUtil() {
				return s;
			},
			ZodParsedType: u,
			getParsedType: l,
			ZodType: k,
			datetimeRegex: Y,
			ZodString: z,
			ZodNumber: X,
			ZodBigInt: J,
			ZodBoolean: Q,
			ZodDate: ee,
			ZodSymbol: te,
			ZodUndefined: ne,
			ZodNull: re,
			ZodAny: ie,
			ZodUnknown: ae,
			ZodNever: se,
			ZodVoid: oe,
			ZodArray: ue,
			ZodObject: ce,
			ZodUnion: de,
			ZodDiscriminatedUnion: he,
			ZodIntersection: me,
			ZodTuple: _e,
			ZodRecord: ve,
			ZodMap: ge,
			ZodSet: ye,
			ZodFunction: Ee,
			ZodLazy: be,
			ZodLiteral: Te,
			ZodEnum: we,
			ZodNativeEnum: Ae,
			ZodPromise: Ie,
			ZodEffects: Se,
			ZodTransformer: Se,
			ZodOptional: Oe,
			ZodNullable: Ce,
			ZodDefault: xe,
			ZodCatch: De,
			ZodNaN: Re,
			BRAND: ke,
			ZodBranded: Pe,
			ZodPipeline: Le,
			ZodReadonly: Ue,
			custom: Me,
			Schema: k,
			ZodSchema: k,
			late: Ze,
			get ZodFirstPartyTypeKind() {
				return je;
			},
			coerce: Et,
			any: ze,
			array: Qe,
			bigint: He,
			boolean: Ke,
			date: Fe,
			discriminatedUnion: rt,
			effect: mt,
			enum: pt,
			function: lt,
			instanceof: (e, t = { message: `Input not instance of ${e.name}` }) =>
				Me((t) => t instanceof e, t),
			intersection: it,
			lazy: ct,
			literal: dt,
			map: ot,
			nan: Ve,
			nativeEnum: ht,
			never: Xe,
			null: Ye,
			nullable: vt,
			number: Ge,
			object: et,
			oboolean: () => Ke().optional(),
			onumber: () => Ge().optional(),
			optional: _t,
			ostring: () => Be().optional(),
			pipeline: yt,
			preprocess: gt,
			promise: ft,
			record: st,
			set: ut,
			strictObject: tt,
			string: Be,
			symbol: qe,
			transformer: mt,
			tuple: at,
			undefined: $e,
			union: nt,
			unknown: We,
			void: Je,
			NEVER: bt,
			ZodIssueCode: c,
			quotelessJson: (e) =>
				JSON.stringify(e, null, 2).replace(/"([^"]+)":/g, '$1:'),
			ZodError: d,
		}),
		Nt = { exports: {} };
	!(function (e) {
		var t = (function (e) {
			var n = 1e7,
				r = 7,
				i = 9007199254740992,
				a = h(i),
				s = '0123456789abcdefghijklmnopqrstuvwxyz',
				o = 'function' == typeof BigInt;
			function u(e, t, n, r) {
				return void 0 === e
					? u[0]
					: void 0 === t || (10 == +t && !n)
					? X(e)
					: q(e, t, n, r);
			}
			function l(e, t) {
				(this.value = e), (this.sign = t), (this.isSmall = !1);
			}
			function c(e) {
				(this.value = e), (this.sign = e < 0), (this.isSmall = !0);
			}
			function d(e) {
				this.value = e;
			}
			function p(e) {
				return -i < e && e < i;
			}
			function h(e) {
				return e < 1e7
					? [e]
					: e < 1e14
					? [e % 1e7, Math.floor(e / 1e7)]
					: [e % 1e7, Math.floor(e / 1e7) % 1e7, Math.floor(e / 1e14)];
			}
			function f(e) {
				m(e);
				var t = e.length;
				if (t < 4 && D(e, a) < 0)
					switch (t) {
						case 0:
							return 0;
						case 1:
							return e[0];
						case 2:
							return e[0] + e[1] * n;
						default:
							return e[0] + (e[1] + e[2] * n) * n;
					}
				return e;
			}
			function m(e) {
				for (var t = e.length; 0 === e[--t]; );
				e.length = t + 1;
			}
			function _(e) {
				for (var t = new Array(e), n = -1; ++n < e; ) t[n] = 0;
				return t;
			}
			function v(e) {
				return e > 0 ? Math.floor(e) : Math.ceil(e);
			}
			function g(e, t) {
				var r,
					i,
					a = e.length,
					s = t.length,
					o = new Array(a),
					u = 0,
					l = n;
				for (i = 0; i < s; i++)
					(u = (r = e[i] + t[i] + u) >= l ? 1 : 0), (o[i] = r - u * l);
				for (; i < a; ) (u = (r = e[i] + u) === l ? 1 : 0), (o[i++] = r - u * l);
				return u > 0 && o.push(u), o;
			}
			function y(e, t) {
				return e.length >= t.length ? g(e, t) : g(t, e);
			}
			function E(e, t) {
				var r,
					i,
					a = e.length,
					s = new Array(a),
					o = n;
				for (i = 0; i < a; i++)
					(r = e[i] - o + t),
						(t = Math.floor(r / o)),
						(s[i] = r - t * o),
						(t += 1);
				for (; t > 0; ) (s[i++] = t % o), (t = Math.floor(t / o));
				return s;
			}
			function b(e, t) {
				var r,
					i,
					a = e.length,
					s = t.length,
					o = new Array(a),
					u = 0,
					l = n;
				for (r = 0; r < s; r++)
					(i = e[r] - u - t[r]) < 0 ? ((i += l), (u = 1)) : (u = 0), (o[r] = i);
				for (r = s; r < a; r++) {
					if (!((i = e[r] - u) < 0)) {
						o[r++] = i;
						break;
					}
					(i += l), (o[r] = i);
				}
				for (; r < a; r++) o[r] = e[r];
				return m(o), o;
			}
			function T(e, t, r) {
				var i,
					a,
					s = e.length,
					o = new Array(s),
					u = -t,
					d = n;
				for (i = 0; i < s; i++)
					(a = e[i] + u),
						(u = Math.floor(a / d)),
						(a %= d),
						(o[i] = a < 0 ? a + d : a);
				return 'number' == typeof (o = f(o))
					? (r && (o = -o), new c(o))
					: new l(o, r);
			}
			function N(e, t) {
				var r,
					i,
					a,
					s,
					o = e.length,
					u = t.length,
					l = _(o + u),
					c = n;
				for (a = 0; a < o; ++a) {
					s = e[a];
					for (var d = 0; d < u; ++d)
						(r = s * t[d] + l[a + d]),
							(i = Math.floor(r / c)),
							(l[a + d] = r - i * c),
							(l[a + d + 1] += i);
				}
				return m(l), l;
			}
			function w(e, t) {
				var r,
					i,
					a = e.length,
					s = new Array(a),
					o = n,
					u = 0;
				for (i = 0; i < a; i++)
					(r = e[i] * t + u), (u = Math.floor(r / o)), (s[i] = r - u * o);
				for (; u > 0; ) (s[i++] = u % o), (u = Math.floor(u / o));
				return s;
			}
			function A(e, t) {
				for (var n = []; t-- > 0; ) n.push(0);
				return n.concat(e);
			}
			function I(e, t) {
				var n = Math.max(e.length, t.length);
				if (n <= 30) return N(e, t);
				n = Math.ceil(n / 2);
				var r = e.slice(n),
					i = e.slice(0, n),
					a = t.slice(n),
					s = t.slice(0, n),
					o = I(i, s),
					u = I(r, a),
					l = I(y(i, r), y(s, a)),
					c = y(y(o, A(b(b(l, o), u), n)), A(u, 2 * n));
				return m(c), c;
			}
			function S(e, t, r) {
				return new l(e < n ? w(t, e) : N(t, h(e)), r);
			}
			function O(e) {
				var t,
					r,
					i,
					a,
					s = e.length,
					o = _(s + s),
					u = n;
				for (i = 0; i < s; i++) {
					r = 0 - (a = e[i]) * a;
					for (var l = i; l < s; l++)
						(t = a * e[l] * 2 + o[i + l] + r),
							(r = Math.floor(t / u)),
							(o[i + l] = t - r * u);
					o[i + s] = r;
				}
				return m(o), o;
			}
			function C(e, t) {
				var r,
					i,
					a,
					s,
					o = e.length,
					u = _(o),
					l = n;
				for (a = 0, r = o - 1; r >= 0; --r)
					(a = (s = a * l + e[r]) - (i = v(s / t)) * t), (u[r] = 0 | i);
				return [u, 0 | a];
			}
			function x(e, t) {
				var r,
					i = X(t);
				if (o) return [new d(e.value / i.value), new d(e.value % i.value)];
				var a,
					s = e.value,
					p = i.value;
				if (0 === p) throw new Error('Cannot divide by zero');
				if (e.isSmall)
					return i.isSmall ? [new c(v(s / p)), new c(s % p)] : [u[0], e];
				if (i.isSmall) {
					if (1 === p) return [e, u[0]];
					if (-1 == p) return [e.negate(), u[0]];
					var g = Math.abs(p);
					if (g < n) {
						a = f((r = C(s, g))[0]);
						var y = r[1];
						return (
							e.sign && (y = -y),
							'number' == typeof a
								? (e.sign !== i.sign && (a = -a), [new c(a), new c(y)])
								: [new l(a, e.sign !== i.sign), new c(y)]
						);
					}
					p = h(g);
				}
				var E = D(s, p);
				if (-1 === E) return [u[0], e];
				if (0 === E) return [u[e.sign === i.sign ? 1 : -1], u[0]];
				(r =
					s.length + p.length <= 200
						? (function (e, t) {
								var r,
									i,
									a,
									s,
									o,
									u,
									l,
									c = e.length,
									d = t.length,
									p = n,
									h = _(t.length),
									m = t[d - 1],
									v = Math.ceil(p / (2 * m)),
									g = w(e, v),
									y = w(t, v);
								for (
									g.length <= c && g.push(0),
										y.push(0),
										m = y[d - 1],
										i = c - d;
									i >= 0;
									i--
								) {
									for (
										r = p - 1,
											g[i + d] !== m &&
												(r = Math.floor(
													(g[i + d] * p + g[i + d - 1]) / m
												)),
											a = 0,
											s = 0,
											u = y.length,
											o = 0;
										o < u;
										o++
									)
										(a += r * y[o]),
											(l = Math.floor(a / p)),
											(s += g[i + o] - (a - l * p)),
											(a = l),
											s < 0
												? ((g[i + o] = s + p), (s = -1))
												: ((g[i + o] = s), (s = 0));
									for (; 0 !== s; ) {
										for (r -= 1, a = 0, o = 0; o < u; o++)
											(a += g[i + o] - p + y[o]) < 0
												? ((g[i + o] = a + p), (a = 0))
												: ((g[i + o] = a), (a = 1));
										s += a;
									}
									h[i] = r;
								}
								return (g = C(g, v)[0]), [f(h), f(g)];
						  })(s, p)
						: (function (e, t) {
								for (
									var r,
										i,
										a,
										s,
										o,
										u = e.length,
										l = t.length,
										c = [],
										d = [],
										p = n;
									u;

								)
									if ((d.unshift(e[--u]), m(d), D(d, t) < 0)) c.push(0);
									else {
										(a = d[(i = d.length) - 1] * p + d[i - 2]),
											(s = t[l - 1] * p + t[l - 2]),
											i > l && (a = (a + 1) * p),
											(r = Math.ceil(a / s));
										do {
											if (D((o = w(t, r)), d) <= 0) break;
											r--;
										} while (r);
										c.push(r), (d = b(d, o));
									}
								return c.reverse(), [f(c), f(d)];
						  })(s, p)),
					(a = r[0]);
				var T = e.sign !== i.sign,
					N = r[1],
					A = e.sign;
				return (
					'number' == typeof a
						? (T && (a = -a), (a = new c(a)))
						: (a = new l(a, T)),
					'number' == typeof N
						? (A && (N = -N), (N = new c(N)))
						: (N = new l(N, A)),
					[a, N]
				);
			}
			function D(e, t) {
				if (e.length !== t.length) return e.length > t.length ? 1 : -1;
				for (var n = e.length - 1; n >= 0; n--)
					if (e[n] !== t[n]) return e[n] > t[n] ? 1 : -1;
				return 0;
			}
			function R(e) {
				var t = e.abs();
				return (
					!t.isUnit() &&
					(!!(t.equals(2) || t.equals(3) || t.equals(5)) ||
						(!(t.isEven() || t.isDivisibleBy(3) || t.isDivisibleBy(5)) &&
							(!!t.lesser(49) || void 0)))
				);
			}
			function k(e, n) {
				for (var r, i, a, s = e.prev(), o = s, u = 0; o.isEven(); )
					(o = o.divide(2)), u++;
				e: for (i = 0; i < n.length; i++)
					if (
						!e.lesser(n[i]) &&
						!(a = t(n[i]).modPow(o, e)).isUnit() &&
						!a.equals(s)
					) {
						for (r = u - 1; 0 != r; r--) {
							if ((a = a.square().mod(e)).isUnit()) return !1;
							if (a.equals(s)) continue e;
						}
						return !1;
					}
				return !0;
			}
			(l.prototype = Object.create(u.prototype)),
				(c.prototype = Object.create(u.prototype)),
				(d.prototype = Object.create(u.prototype)),
				(l.prototype.add = function (e) {
					var t = X(e);
					if (this.sign !== t.sign) return this.subtract(t.negate());
					var n = this.value,
						r = t.value;
					return t.isSmall
						? new l(E(n, Math.abs(r)), this.sign)
						: new l(y(n, r), this.sign);
				}),
				(l.prototype.plus = l.prototype.add),
				(c.prototype.add = function (e) {
					var t = X(e),
						n = this.value;
					if (n < 0 !== t.sign) return this.subtract(t.negate());
					var r = t.value;
					if (t.isSmall) {
						if (p(n + r)) return new c(n + r);
						r = h(Math.abs(r));
					}
					return new l(E(r, Math.abs(n)), n < 0);
				}),
				(c.prototype.plus = c.prototype.add),
				(d.prototype.add = function (e) {
					return new d(this.value + X(e).value);
				}),
				(d.prototype.plus = d.prototype.add),
				(l.prototype.subtract = function (e) {
					var t = X(e);
					if (this.sign !== t.sign) return this.add(t.negate());
					var n = this.value,
						r = t.value;
					return t.isSmall
						? T(n, Math.abs(r), this.sign)
						: (function (e, t, n) {
								var r;
								return (
									D(e, t) >= 0
										? (r = b(e, t))
										: ((r = b(t, e)), (n = !n)),
									'number' == typeof (r = f(r))
										? (n && (r = -r), new c(r))
										: new l(r, n)
								);
						  })(n, r, this.sign);
				}),
				(l.prototype.minus = l.prototype.subtract),
				(c.prototype.subtract = function (e) {
					var t = X(e),
						n = this.value;
					if (n < 0 !== t.sign) return this.add(t.negate());
					var r = t.value;
					return t.isSmall ? new c(n - r) : T(r, Math.abs(n), n >= 0);
				}),
				(c.prototype.minus = c.prototype.subtract),
				(d.prototype.subtract = function (e) {
					return new d(this.value - X(e).value);
				}),
				(d.prototype.minus = d.prototype.subtract),
				(l.prototype.negate = function () {
					return new l(this.value, !this.sign);
				}),
				(c.prototype.negate = function () {
					var e = this.sign,
						t = new c(-this.value);
					return (t.sign = !e), t;
				}),
				(d.prototype.negate = function () {
					return new d(-this.value);
				}),
				(l.prototype.abs = function () {
					return new l(this.value, !1);
				}),
				(c.prototype.abs = function () {
					return new c(Math.abs(this.value));
				}),
				(d.prototype.abs = function () {
					return new d(this.value >= 0 ? this.value : -this.value);
				}),
				(l.prototype.multiply = function (e) {
					var t,
						r,
						i,
						a = X(e),
						s = this.value,
						o = a.value,
						c = this.sign !== a.sign;
					if (a.isSmall) {
						if (0 === o) return u[0];
						if (1 === o) return this;
						if (-1 === o) return this.negate();
						if ((t = Math.abs(o)) < n) return new l(w(s, t), c);
						o = h(t);
					}
					return new l(
						-0.012 * (r = s.length) - 0.012 * (i = o.length) + 15e-6 * r * i >
						0
							? I(s, o)
							: N(s, o),
						c
					);
				}),
				(l.prototype.times = l.prototype.multiply),
				(c.prototype._multiplyBySmall = function (e) {
					return p(e.value * this.value)
						? new c(e.value * this.value)
						: S(
								Math.abs(e.value),
								h(Math.abs(this.value)),
								this.sign !== e.sign
						  );
				}),
				(l.prototype._multiplyBySmall = function (e) {
					return 0 === e.value
						? u[0]
						: 1 === e.value
						? this
						: -1 === e.value
						? this.negate()
						: S(Math.abs(e.value), this.value, this.sign !== e.sign);
				}),
				(c.prototype.multiply = function (e) {
					return X(e)._multiplyBySmall(this);
				}),
				(c.prototype.times = c.prototype.multiply),
				(d.prototype.multiply = function (e) {
					return new d(this.value * X(e).value);
				}),
				(d.prototype.times = d.prototype.multiply),
				(l.prototype.square = function () {
					return new l(O(this.value), !1);
				}),
				(c.prototype.square = function () {
					var e = this.value * this.value;
					return p(e) ? new c(e) : new l(O(h(Math.abs(this.value))), !1);
				}),
				(d.prototype.square = function (e) {
					return new d(this.value * this.value);
				}),
				(l.prototype.divmod = function (e) {
					var t = x(this, e);
					return { quotient: t[0], remainder: t[1] };
				}),
				(d.prototype.divmod = c.prototype.divmod = l.prototype.divmod),
				(l.prototype.divide = function (e) {
					return x(this, e)[0];
				}),
				(d.prototype.over = d.prototype.divide =
					function (e) {
						return new d(this.value / X(e).value);
					}),
				(c.prototype.over =
					c.prototype.divide =
					l.prototype.over =
						l.prototype.divide),
				(l.prototype.mod = function (e) {
					return x(this, e)[1];
				}),
				(d.prototype.mod = d.prototype.remainder =
					function (e) {
						return new d(this.value % X(e).value);
					}),
				(c.prototype.remainder =
					c.prototype.mod =
					l.prototype.remainder =
						l.prototype.mod),
				(l.prototype.pow = function (e) {
					var t,
						n,
						r,
						i = X(e),
						a = this.value,
						s = i.value;
					if (0 === s) return u[1];
					if (0 === a) return u[0];
					if (1 === a) return u[1];
					if (-1 === a) return i.isEven() ? u[1] : u[-1];
					if (i.sign) return u[0];
					if (!i.isSmall)
						throw new Error(
							'The exponent ' + i.toString() + ' is too large.'
						);
					if (this.isSmall && p((t = Math.pow(a, s)))) return new c(v(t));
					for (n = this, r = u[1]; !0 & s && ((r = r.times(n)), --s), 0 !== s; )
						(s /= 2), (n = n.square());
					return r;
				}),
				(c.prototype.pow = l.prototype.pow),
				(d.prototype.pow = function (e) {
					var t = X(e),
						n = this.value,
						r = t.value,
						i = BigInt(0),
						a = BigInt(1),
						s = BigInt(2);
					if (r === i) return u[1];
					if (n === i) return u[0];
					if (n === a) return u[1];
					if (n === BigInt(-1)) return t.isEven() ? u[1] : u[-1];
					if (t.isNegative()) return new d(i);
					for (
						var o = this, l = u[1];
						(r & a) === a && ((l = l.times(o)), --r), r !== i;

					)
						(r /= s), (o = o.square());
					return l;
				}),
				(l.prototype.modPow = function (e, t) {
					if (((e = X(e)), (t = X(t)).isZero()))
						throw new Error('Cannot take modPow with modulus 0');
					var n = u[1],
						r = this.mod(t);
					for (
						e.isNegative() && ((e = e.multiply(u[-1])), (r = r.modInv(t)));
						e.isPositive();

					) {
						if (r.isZero()) return u[0];
						e.isOdd() && (n = n.multiply(r).mod(t)),
							(e = e.divide(2)),
							(r = r.square().mod(t));
					}
					return n;
				}),
				(d.prototype.modPow = c.prototype.modPow = l.prototype.modPow),
				(l.prototype.compareAbs = function (e) {
					var t = X(e),
						n = this.value,
						r = t.value;
					return t.isSmall ? 1 : D(n, r);
				}),
				(c.prototype.compareAbs = function (e) {
					var t = X(e),
						n = Math.abs(this.value),
						r = t.value;
					return t.isSmall
						? n === (r = Math.abs(r))
							? 0
							: n > r
							? 1
							: -1
						: -1;
				}),
				(d.prototype.compareAbs = function (e) {
					var t = this.value,
						n = X(e).value;
					return (t = t >= 0 ? t : -t) === (n = n >= 0 ? n : -n)
						? 0
						: t > n
						? 1
						: -1;
				}),
				(l.prototype.compare = function (e) {
					if (e === 1 / 0) return -1;
					if (e === -1 / 0) return 1;
					var t = X(e),
						n = this.value,
						r = t.value;
					return this.sign !== t.sign
						? t.sign
							? 1
							: -1
						: t.isSmall
						? this.sign
							? -1
							: 1
						: D(n, r) * (this.sign ? -1 : 1);
				}),
				(l.prototype.compareTo = l.prototype.compare),
				(c.prototype.compare = function (e) {
					if (e === 1 / 0) return -1;
					if (e === -1 / 0) return 1;
					var t = X(e),
						n = this.value,
						r = t.value;
					return t.isSmall
						? n == r
							? 0
							: n > r
							? 1
							: -1
						: n < 0 !== t.sign
						? n < 0
							? -1
							: 1
						: n < 0
						? 1
						: -1;
				}),
				(c.prototype.compareTo = c.prototype.compare),
				(d.prototype.compare = function (e) {
					if (e === 1 / 0) return -1;
					if (e === -1 / 0) return 1;
					var t = this.value,
						n = X(e).value;
					return t === n ? 0 : t > n ? 1 : -1;
				}),
				(d.prototype.compareTo = d.prototype.compare),
				(l.prototype.equals = function (e) {
					return 0 === this.compare(e);
				}),
				(d.prototype.eq =
					d.prototype.equals =
					c.prototype.eq =
					c.prototype.equals =
					l.prototype.eq =
						l.prototype.equals),
				(l.prototype.notEquals = function (e) {
					return 0 !== this.compare(e);
				}),
				(d.prototype.neq =
					d.prototype.notEquals =
					c.prototype.neq =
					c.prototype.notEquals =
					l.prototype.neq =
						l.prototype.notEquals),
				(l.prototype.greater = function (e) {
					return this.compare(e) > 0;
				}),
				(d.prototype.gt =
					d.prototype.greater =
					c.prototype.gt =
					c.prototype.greater =
					l.prototype.gt =
						l.prototype.greater),
				(l.prototype.lesser = function (e) {
					return this.compare(e) < 0;
				}),
				(d.prototype.lt =
					d.prototype.lesser =
					c.prototype.lt =
					c.prototype.lesser =
					l.prototype.lt =
						l.prototype.lesser),
				(l.prototype.greaterOrEquals = function (e) {
					return this.compare(e) >= 0;
				}),
				(d.prototype.geq =
					d.prototype.greaterOrEquals =
					c.prototype.geq =
					c.prototype.greaterOrEquals =
					l.prototype.geq =
						l.prototype.greaterOrEquals),
				(l.prototype.lesserOrEquals = function (e) {
					return this.compare(e) <= 0;
				}),
				(d.prototype.leq =
					d.prototype.lesserOrEquals =
					c.prototype.leq =
					c.prototype.lesserOrEquals =
					l.prototype.leq =
						l.prototype.lesserOrEquals),
				(l.prototype.isEven = function () {
					return !(1 & this.value[0]);
				}),
				(c.prototype.isEven = function () {
					return !(1 & this.value);
				}),
				(d.prototype.isEven = function () {
					return (this.value & BigInt(1)) === BigInt(0);
				}),
				(l.prototype.isOdd = function () {
					return !(1 & ~this.value[0]);
				}),
				(c.prototype.isOdd = function () {
					return !(1 & ~this.value);
				}),
				(d.prototype.isOdd = function () {
					return (this.value & BigInt(1)) === BigInt(1);
				}),
				(l.prototype.isPositive = function () {
					return !this.sign;
				}),
				(c.prototype.isPositive = function () {
					return this.value > 0;
				}),
				(d.prototype.isPositive = c.prototype.isPositive),
				(l.prototype.isNegative = function () {
					return this.sign;
				}),
				(c.prototype.isNegative = function () {
					return this.value < 0;
				}),
				(d.prototype.isNegative = c.prototype.isNegative),
				(l.prototype.isUnit = function () {
					return !1;
				}),
				(c.prototype.isUnit = function () {
					return 1 === Math.abs(this.value);
				}),
				(d.prototype.isUnit = function () {
					return this.abs().value === BigInt(1);
				}),
				(l.prototype.isZero = function () {
					return !1;
				}),
				(c.prototype.isZero = function () {
					return 0 === this.value;
				}),
				(d.prototype.isZero = function () {
					return this.value === BigInt(0);
				}),
				(l.prototype.isDivisibleBy = function (e) {
					var t = X(e);
					return (
						!t.isZero() &&
						(!!t.isUnit() ||
							(0 === t.compareAbs(2)
								? this.isEven()
								: this.mod(t).isZero()))
					);
				}),
				(d.prototype.isDivisibleBy = c.prototype.isDivisibleBy =
					l.prototype.isDivisibleBy),
				(l.prototype.isPrime = function (n) {
					var r = R(this);
					if (r !== e) return r;
					var i = this.abs(),
						a = i.bitLength();
					if (a <= 64)
						return k(i, [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37]);
					for (
						var s = Math.log(2) * a.toJSNumber(),
							o = Math.ceil(!0 === n ? 2 * Math.pow(s, 2) : s),
							u = [],
							l = 0;
						l < o;
						l++
					)
						u.push(t(l + 2));
					return k(i, u);
				}),
				(d.prototype.isPrime = c.prototype.isPrime = l.prototype.isPrime),
				(l.prototype.isProbablePrime = function (n, r) {
					var i = R(this);
					if (i !== e) return i;
					for (
						var a = this.abs(), s = n === e ? 5 : n, o = [], u = 0;
						u < s;
						u++
					)
						o.push(t.randBetween(2, a.minus(2), r));
					return k(a, o);
				}),
				(d.prototype.isProbablePrime = c.prototype.isProbablePrime =
					l.prototype.isProbablePrime),
				(l.prototype.modInv = function (e) {
					for (
						var n, r, i, a = t.zero, s = t.one, o = X(e), u = this.abs();
						!u.isZero();

					)
						(n = o.divide(u)),
							(r = a),
							(i = o),
							(a = s),
							(o = u),
							(s = r.subtract(n.multiply(s))),
							(u = i.subtract(n.multiply(u)));
					if (!o.isUnit())
						throw new Error(
							this.toString() + ' and ' + e.toString() + ' are not co-prime'
						);
					return (
						-1 === a.compare(0) && (a = a.add(e)),
						this.isNegative() ? a.negate() : a
					);
				}),
				(d.prototype.modInv = c.prototype.modInv = l.prototype.modInv),
				(l.prototype.next = function () {
					var e = this.value;
					return this.sign ? T(e, 1, this.sign) : new l(E(e, 1), this.sign);
				}),
				(c.prototype.next = function () {
					var e = this.value;
					return e + 1 < i ? new c(e + 1) : new l(a, !1);
				}),
				(d.prototype.next = function () {
					return new d(this.value + BigInt(1));
				}),
				(l.prototype.prev = function () {
					var e = this.value;
					return this.sign ? new l(E(e, 1), !0) : T(e, 1, this.sign);
				}),
				(c.prototype.prev = function () {
					var e = this.value;
					return e - 1 > -i ? new c(e - 1) : new l(a, !0);
				}),
				(d.prototype.prev = function () {
					return new d(this.value - BigInt(1));
				});
			for (var P = [1]; 2 * P[P.length - 1] <= n; ) P.push(2 * P[P.length - 1]);
			var L = P.length,
				U = P[L - 1];
			function M(e) {
				return Math.abs(e) <= n;
			}
			function Z(e, n, r) {
				n = X(n);
				for (
					var i = e.isNegative(),
						a = n.isNegative(),
						s = i ? e.not() : e,
						o = a ? n.not() : n,
						u = 0,
						l = 0,
						c = null,
						d = null,
						p = [];
					!s.isZero() || !o.isZero();

				)
					(u = (c = x(s, U))[1].toJSNumber()),
						i && (u = U - 1 - u),
						(l = (d = x(o, U))[1].toJSNumber()),
						a && (l = U - 1 - l),
						(s = c[0]),
						(o = d[0]),
						p.push(r(u, l));
				for (
					var h = 0 !== r(i ? 1 : 0, a ? 1 : 0) ? t(-1) : t(0),
						f = p.length - 1;
					f >= 0;
					f -= 1
				)
					h = h.multiply(U).add(t(p[f]));
				return h;
			}
			(l.prototype.shiftLeft = function (e) {
				var t = X(e).toJSNumber();
				if (!M(t)) throw new Error(String(t) + ' is too large for shifting.');
				if (t < 0) return this.shiftRight(-t);
				var n = this;
				if (n.isZero()) return n;
				for (; t >= L; ) (n = n.multiply(U)), (t -= L - 1);
				return n.multiply(P[t]);
			}),
				(d.prototype.shiftLeft = c.prototype.shiftLeft = l.prototype.shiftLeft),
				(l.prototype.shiftRight = function (e) {
					var t,
						n = X(e).toJSNumber();
					if (!M(n)) throw new Error(String(n) + ' is too large for shifting.');
					if (n < 0) return this.shiftLeft(-n);
					for (var r = this; n >= L; ) {
						if (r.isZero() || (r.isNegative() && r.isUnit())) return r;
						(r = (t = x(r, U))[1].isNegative() ? t[0].prev() : t[0]),
							(n -= L - 1);
					}
					return (t = x(r, P[n]))[1].isNegative() ? t[0].prev() : t[0];
				}),
				(d.prototype.shiftRight = c.prototype.shiftRight =
					l.prototype.shiftRight),
				(l.prototype.not = function () {
					return this.negate().prev();
				}),
				(d.prototype.not = c.prototype.not = l.prototype.not),
				(l.prototype.and = function (e) {
					return Z(this, e, function (e, t) {
						return e & t;
					});
				}),
				(d.prototype.and = c.prototype.and = l.prototype.and),
				(l.prototype.or = function (e) {
					return Z(this, e, function (e, t) {
						return e | t;
					});
				}),
				(d.prototype.or = c.prototype.or = l.prototype.or),
				(l.prototype.xor = function (e) {
					return Z(this, e, function (e, t) {
						return e ^ t;
					});
				}),
				(d.prototype.xor = c.prototype.xor = l.prototype.xor);
			var j = 1 << 30,
				B = ((n & -n) * (n & -n)) | j;
			function G(e) {
				var t = e.value,
					r =
						'number' == typeof t
							? t | j
							: 'bigint' == typeof t
							? t | BigInt(j)
							: (t[0] + t[1] * n) | B;
				return r & -r;
			}
			function V(e, n) {
				if (n.compareTo(e) <= 0) {
					var r = V(e, n.square(n)),
						i = r.p,
						a = r.e,
						s = i.multiply(n);
					return s.compareTo(e) <= 0
						? { p: s, e: 2 * a + 1 }
						: { p: i, e: 2 * a };
				}
				return { p: t(1), e: 0 };
			}
			function H(e, t) {
				return (e = X(e)), (t = X(t)), e.greater(t) ? e : t;
			}
			function K(e, t) {
				return (e = X(e)), (t = X(t)), e.lesser(t) ? e : t;
			}
			function F(e, t) {
				if (((e = X(e).abs()), (t = X(t).abs()), e.equals(t))) return e;
				if (e.isZero()) return t;
				if (t.isZero()) return e;
				for (var n, r, i = u[1]; e.isEven() && t.isEven(); )
					(n = K(G(e), G(t))),
						(e = e.divide(n)),
						(t = t.divide(n)),
						(i = i.multiply(n));
				for (; e.isEven(); ) e = e.divide(G(e));
				do {
					for (; t.isEven(); ) t = t.divide(G(t));
					e.greater(t) && ((r = t), (t = e), (e = r)), (t = t.subtract(e));
				} while (!t.isZero());
				return i.isUnit() ? e : e.multiply(i);
			}
			(l.prototype.bitLength = function () {
				var e = this;
				return (
					e.compareTo(t(0)) < 0 && (e = e.negate().subtract(t(1))),
					0 === e.compareTo(t(0)) ? t(0) : t(V(e, t(2)).e).add(t(1))
				);
			}),
				(d.prototype.bitLength = c.prototype.bitLength = l.prototype.bitLength);
			var q = function (e, t, n, r) {
				(n = n || s),
					(e = String(e)),
					r || ((e = e.toLowerCase()), (n = n.toLowerCase()));
				var i,
					a = e.length,
					o = Math.abs(t),
					u = {};
				for (i = 0; i < n.length; i++) u[n[i]] = i;
				for (i = 0; i < a; i++)
					if ('-' !== (d = e[i]) && d in u && u[d] >= o) {
						if ('1' === d && 1 === o) continue;
						throw new Error(d + ' is not a valid digit in base ' + t + '.');
					}
				t = X(t);
				var l = [],
					c = '-' === e[0];
				for (i = c ? 1 : 0; i < e.length; i++) {
					var d;
					if ((d = e[i]) in u) l.push(X(u[d]));
					else {
						if ('<' !== d) throw new Error(d + ' is not a valid character');
						var p = i;
						do {
							i++;
						} while ('>' !== e[i] && i < e.length);
						l.push(X(e.slice(p + 1, i)));
					}
				}
				return $(l, t, c);
			};
			function $(e, t, n) {
				var r,
					i = u[0],
					a = u[1];
				for (r = e.length - 1; r >= 0; r--)
					(i = i.add(e[r].times(a))), (a = a.times(t));
				return n ? i.negate() : i;
			}
			function Y(e, n) {
				if ((n = t(n)).isZero()) {
					if (e.isZero()) return { value: [0], isNegative: !1 };
					throw new Error('Cannot convert nonzero numbers to base 0.');
				}
				if (n.equals(-1)) {
					if (e.isZero()) return { value: [0], isNegative: !1 };
					if (e.isNegative())
						return {
							value: [].concat.apply(
								[],
								Array.apply(null, Array(-e.toJSNumber())).map(
									Array.prototype.valueOf,
									[1, 0]
								)
							),
							isNegative: !1,
						};
					var r = Array.apply(null, Array(e.toJSNumber() - 1)).map(
						Array.prototype.valueOf,
						[0, 1]
					);
					return (
						r.unshift([1]), { value: [].concat.apply([], r), isNegative: !1 }
					);
				}
				var i = !1;
				if (
					(e.isNegative() && n.isPositive() && ((i = !0), (e = e.abs())),
					n.isUnit())
				)
					return e.isZero()
						? { value: [0], isNegative: !1 }
						: {
								value: Array.apply(null, Array(e.toJSNumber())).map(
									Number.prototype.valueOf,
									1
								),
								isNegative: i,
						  };
				for (var a, s = [], o = e; o.isNegative() || o.compareAbs(n) >= 0; ) {
					(a = o.divmod(n)), (o = a.quotient);
					var u = a.remainder;
					u.isNegative() && ((u = n.minus(u).abs()), (o = o.next())),
						s.push(u.toJSNumber());
				}
				return s.push(o.toJSNumber()), { value: s.reverse(), isNegative: i };
			}
			function z(e, t, n) {
				var r = Y(e, t);
				return (
					(r.isNegative ? '-' : '') +
					r.value
						.map(function (e) {
							return (function (e, t) {
								return e < (t = t || s).length ? t[e] : '<' + e + '>';
							})(e, n);
						})
						.join('')
				);
			}
			function W(e) {
				if (p(+e)) {
					var t = +e;
					if (t === v(t)) return o ? new d(BigInt(t)) : new c(t);
					throw new Error('Invalid integer: ' + e);
				}
				var n = '-' === e[0];
				n && (e = e.slice(1));
				var i = e.split(/e/i);
				if (i.length > 2) throw new Error('Invalid integer: ' + i.join('e'));
				if (2 === i.length) {
					var a = i[1];
					if (('+' === a[0] && (a = a.slice(1)), (a = +a) !== v(a) || !p(a)))
						throw new Error(
							'Invalid integer: ' + a + ' is not a valid exponent.'
						);
					var s = i[0],
						u = s.indexOf('.');
					if (
						(u >= 0 &&
							((a -= s.length - u - 1),
							(s = s.slice(0, u) + s.slice(u + 1))),
						a < 0)
					)
						throw new Error(
							'Cannot include negative exponent part for integers'
						);
					e = s += new Array(a + 1).join('0');
				}
				if (!/^([0-9][0-9]*)$/.test(e)) throw new Error('Invalid integer: ' + e);
				if (o) return new d(BigInt(n ? '-' + e : e));
				for (var h = [], f = e.length, _ = r, g = f - _; f > 0; )
					h.push(+e.slice(g, f)), (g -= _) < 0 && (g = 0), (f -= _);
				return m(h), new l(h, n);
			}
			function X(e) {
				return 'number' == typeof e
					? (function (e) {
							if (o) return new d(BigInt(e));
							if (p(e)) {
								if (e !== v(e))
									throw new Error(e + ' is not an integer.');
								return new c(e);
							}
							return W(e.toString());
					  })(e)
					: 'string' == typeof e
					? W(e)
					: 'bigint' == typeof e
					? new d(e)
					: e;
			}
			(l.prototype.toArray = function (e) {
				return Y(this, e);
			}),
				(c.prototype.toArray = function (e) {
					return Y(this, e);
				}),
				(d.prototype.toArray = function (e) {
					return Y(this, e);
				}),
				(l.prototype.toString = function (t, n) {
					if ((t === e && (t = 10), 10 !== t || n)) return z(this, t, n);
					for (
						var r, i = this.value, a = i.length, s = String(i[--a]);
						--a >= 0;

					)
						(r = String(i[a])), (s += '0000000'.slice(r.length) + r);
					return (this.sign ? '-' : '') + s;
				}),
				(c.prototype.toString = function (t, n) {
					return (
						t === e && (t = 10),
						10 != t || n ? z(this, t, n) : String(this.value)
					);
				}),
				(d.prototype.toString = c.prototype.toString),
				(d.prototype.toJSON =
					l.prototype.toJSON =
					c.prototype.toJSON =
						function () {
							return this.toString();
						}),
				(l.prototype.valueOf = function () {
					return parseInt(this.toString(), 10);
				}),
				(l.prototype.toJSNumber = l.prototype.valueOf),
				(c.prototype.valueOf = function () {
					return this.value;
				}),
				(c.prototype.toJSNumber = c.prototype.valueOf),
				(d.prototype.valueOf = d.prototype.toJSNumber =
					function () {
						return parseInt(this.toString(), 10);
					});
			for (var J = 0; J < 1e3; J++) (u[J] = X(J)), J > 0 && (u[-J] = X(-J));
			return (
				(u.one = u[1]),
				(u.zero = u[0]),
				(u.minusOne = u[-1]),
				(u.max = H),
				(u.min = K),
				(u.gcd = F),
				(u.lcm = function (e, t) {
					return (
						(e = X(e).abs()), (t = X(t).abs()), e.divide(F(e, t)).multiply(t)
					);
				}),
				(u.isInstance = function (e) {
					return e instanceof l || e instanceof c || e instanceof d;
				}),
				(u.randBetween = function (e, t, r) {
					(e = X(e)), (t = X(t));
					var i = r || Math.random,
						a = K(e, t),
						s = H(e, t).subtract(a).add(1);
					if (s.isSmall) return a.add(Math.floor(i() * s));
					for (
						var o = Y(s, n).value, l = [], c = !0, d = 0;
						d < o.length;
						d++
					) {
						var p = c ? o[d] + (d + 1 < o.length ? o[d + 1] / n : 0) : n,
							h = v(i() * p);
						l.push(h), h < o[d] && (c = !1);
					}
					return a.add(u.fromArray(l, n, !1));
				}),
				(u.fromArray = function (e, t, n) {
					return $(e.map(X), X(t || 10), n);
				}),
				u
			);
		})();
		e.hasOwnProperty('exports') && (e.exports = t);
	})(Nt);
	var wt = r(Nt.exports);
	function At(e, t, n) {
		let r = 0;
		for (let i = 0; i < n; i++) {
			const n = e[t + i];
			if (void 0 === n) break;
			r += n * 16 ** i;
		}
		return r;
	}
	function It(e) {
		const t = [];
		for (let n = 0; n < e.length; n++) {
			let r = Number(e[n]);
			for (let e = 0; r || e < t.length; e++)
				(r += 10 * (t[e] || 0)), (t[e] = r % 16), (r = (r - t[e]) / 16);
		}
		return t;
	}
	class St {
		static fromString(e) {
			return new St(
				(function (e) {
					const t = It(e),
						n = Array(4);
					for (let e = 0; e < 4; e++) n[3 - e] = At(t, 4 * e, 4);
					return n;
				})(e),
				e
			);
		}
		static fromBit(e) {
			const t = Array(4),
				n = Math.floor(e / 16);
			for (let r = 0; r < 4; r++) t[3 - r] = r === n ? 1 << (e - 16 * n) : 0;
			return new St(t);
		}
		constructor(e, t) {
			(this.parts = e), (this.str = t);
		}
		and({ parts: e }) {
			return new St(this.parts.map((t, n) => t & e[n]));
		}
		or({ parts: e }) {
			return new St(this.parts.map((t, n) => t | e[n]));
		}
		xor({ parts: e }) {
			return new St(this.parts.map((t, n) => t ^ e[n]));
		}
		not() {
			return new St(this.parts.map((e) => ~e));
		}
		equals({ parts: e }) {
			return this.parts.every((t, n) => t === e[n]);
		}
		toString() {
			if (null != this.str) return this.str;
			const e = new Array(16);
			return (
				this.parts.forEach((t, n) => {
					const r = It(t.toString());
					for (let t = 0; t < 4; t++) e[t + 4 * n] = r[3 - t] || 0;
				}),
				(this.str = wt.fromArray(e, 16).toString())
			);
		}
		toJSON() {
			return this.toString();
		}
	}
	const Ot = (function () {
		try {
			return BigInt, !0;
		} catch (e) {
			return !1;
		}
	})();
	Ot &&
		null == BigInt.prototype.toJSON &&
		(BigInt.prototype.toJSON = function () {
			return this.toString();
		});
	const Ct = {},
		xt = Ot
			? function (e) {
					return BigInt(e);
			  }
			: function (e) {
					return e instanceof St
						? e
						: ('number' == typeof e && (e = e.toString()),
						  null != Ct[e] || (Ct[e] = St.fromString(e)),
						  Ct[e]);
			  },
		Dt = xt(0),
		Rt = Ot
			? function (e = Dt, t = Dt) {
					return e & t;
			  }
			: function (e = Dt, t = Dt) {
					return e.and(t);
			  },
		kt = Ot
			? function (e = Dt, t = Dt) {
					return e | t;
			  }
			: function (e = Dt, t = Dt) {
					return e.or(t);
			  },
		Pt = Ot
			? function (e = Dt, t = Dt) {
					return e ^ t;
			  }
			: function (e = Dt, t = Dt) {
					return e.xor(t);
			  },
		Lt = Ot
			? function (e, t) {
					return e === t;
			  }
			: function (e, t) {
					return null == e || null == t ? e == t : e.equals(t);
			  };
	var Ut,
		Mt,
		Zt,
		jt,
		Bt,
		Gt = {
			combine: function (...e) {
				let t = e[0];
				for (let n = 1; n < e.length; n++) t = kt(t, e[n]);
				return t;
			},
			add: function (e, t) {
				return t === Dt ? e : kt(e, t);
			},
			remove: function (e, t) {
				return t === Dt ? e : Pt(e, Rt(e, t));
			},
			filter: Rt,
			invert: Ot
				? function (e = Dt) {
						return ~e;
				  }
				: function (e = Dt) {
						return e.not();
				  },
			has: function (e, t) {
				return Lt(Rt(e, t), t);
			},
			hasAny: function (e, t) {
				return !Lt(Rt(e, t), Dt);
			},
			equals: Lt,
			deserialize: xt,
			getFlag: Ot
				? function (e) {
						return BigInt(1) << BigInt(e);
				  }
				: function (e) {
						return St.fromBit(e);
				  },
		};
	function Vt(e) {
		return gt((t) => {
			var n;
			const [r] =
				null !== (n = Object.entries(e).find(([, e]) => e === t)) && void 0 !== n
					? n
					: [];
			return null != t && void 0 === r ? e.UNHANDLED : t;
		}, Be().or(Ge()));
	}
	!(function (e) {
		(e[(e.CLOSE_NORMAL = 1e3)] = 'CLOSE_NORMAL'),
			(e[(e.CLOSE_UNSUPPORTED = 1003)] = 'CLOSE_UNSUPPORTED'),
			(e[(e.CLOSE_ABNORMAL = 1006)] = 'CLOSE_ABNORMAL'),
			(e[(e.INVALID_CLIENTID = 4e3)] = 'INVALID_CLIENTID'),
			(e[(e.INVALID_ORIGIN = 4001)] = 'INVALID_ORIGIN'),
			(e[(e.RATELIMITED = 4002)] = 'RATELIMITED'),
			(e[(e.TOKEN_REVOKED = 4003)] = 'TOKEN_REVOKED'),
			(e[(e.INVALID_VERSION = 4004)] = 'INVALID_VERSION'),
			(e[(e.INVALID_ENCODING = 4005)] = 'INVALID_ENCODING');
	})(Ut || (Ut = {})),
		(function (e) {
			(e[(e.INVALID_PAYLOAD = 4e3)] = 'INVALID_PAYLOAD'),
				(e[(e.INVALID_COMMAND = 4002)] = 'INVALID_COMMAND'),
				(e[(e.INVALID_EVENT = 4004)] = 'INVALID_EVENT'),
				(e[(e.INVALID_PERMISSIONS = 4006)] = 'INVALID_PERMISSIONS');
		})(Mt || (Mt = {})),
		(function (e) {
			(e.LANDSCAPE = 'landscape'), (e.PORTRAIT = 'portrait');
		})(Zt || (Zt = {})),
		((Bt = jt || (jt = {})).MOBILE = 'mobile'),
		(Bt.DESKTOP = 'desktop'),
		Object.freeze({
			CREATE_INSTANT_INVITE: Gt.getFlag(0),
			ADMINISTRATOR: Gt.getFlag(3),
		});
	const Ht = Tt.object({ image_url: Tt.string() }),
		Kt = Tt.object({ mediaUrl: Tt.string().max(1024) }),
		Ft = Tt.object({ access_token: Tt.union([Tt.string(), Tt.null()]).optional() }),
		qt = Tt.object({
			access_token: Tt.string(),
			user: Tt.object({
				username: Tt.string(),
				discriminator: Tt.string(),
				id: Tt.string(),
				avatar: Tt.union([Tt.string(), Tt.null()]).optional(),
				public_flags: Tt.number(),
				global_name: Tt.union([Tt.string(), Tt.null()]).optional(),
			}),
			scopes: Tt.array(
				(function (e) {
					const t = Me().transform((t) => {
						const n = e.safeParse(t);
						return n.success ? n.data : e._def.defaultValue();
					});
					return (t.overlayType = e), t;
				})(
					Tt.enum([
						'identify',
						'email',
						'connections',
						'guilds',
						'guilds.join',
						'guilds.members.read',
						'gdm.join',
						'bot',
						'rpc',
						'rpc.notifications.read',
						'rpc.voice.read',
						'rpc.voice.write',
						'rpc.video.read',
						'rpc.video.write',
						'rpc.screenshare.read',
						'rpc.screenshare.write',
						'rpc.activities.write',
						'webhook.incoming',
						'messages.read',
						'applications.builds.upload',
						'applications.builds.read',
						'applications.commands',
						'applications.commands.permissions.update',
						'applications.commands.update',
						'applications.store.update',
						'applications.entitlements',
						'activities.read',
						'activities.write',
						'relationships.read',
						'relationships.write',
						'voice',
						'dm_channels.read',
						'role_connections.write',
						'presences.read',
						'presences.write',
						'openid',
						'dm_channels.messages.read',
						'dm_channels.messages.write',
						'gateway.connect',
						'account.global_name.update',
						'payment_sources.country_code',
					])
						.or(Tt.literal(-1))
						.default(-1)
				)
			),
			expires: Tt.string(),
			application: Tt.object({
				description: Tt.string(),
				icon: Tt.union([Tt.string(), Tt.null()]).optional(),
				id: Tt.string(),
				rpc_origins: Tt.array(Tt.string()).optional(),
				name: Tt.string(),
			}),
		}),
		$t = Tt.object({
			participants: Tt.array(
				Tt.object({
					id: Tt.string(),
					username: Tt.string(),
					global_name: Tt.union([Tt.string(), Tt.null()]).optional(),
					discriminator: Tt.string(),
					avatar: Tt.union([Tt.string(), Tt.null()]).optional(),
					flags: Tt.number(),
					bot: Tt.boolean(),
					avatar_decoration_data: Tt.union([
						Tt.object({ asset: Tt.string(), skuId: Tt.string().optional() }),
						Tt.null(),
					]).optional(),
					premium_type: Tt.union([Tt.number(), Tt.null()]).optional(),
					nickname: Tt.string().optional(),
				})
			),
		});
	var Yt;
	!(function (e) {
		(e.INITIATE_IMAGE_UPLOAD = 'INITIATE_IMAGE_UPLOAD'),
			(e.OPEN_SHARE_MOMENT_DIALOG = 'OPEN_SHARE_MOMENT_DIALOG'),
			(e.AUTHENTICATE = 'AUTHENTICATE'),
			(e.GET_ACTIVITY_INSTANCE_CONNECTED_PARTICIPANTS =
				'GET_ACTIVITY_INSTANCE_CONNECTED_PARTICIPANTS');
	})(Yt || (Yt = {}));
	const zt = Tt.object({}).optional().nullable(),
		Wt = Tt.void(),
		Xt = {
			[Yt.INITIATE_IMAGE_UPLOAD]: { request: Wt, response: Ht },
			[Yt.OPEN_SHARE_MOMENT_DIALOG]: { request: Kt, response: zt },
			[Yt.AUTHENTICATE]: { request: Ft, response: qt },
			[Yt.GET_ACTIVITY_INSTANCE_CONNECTED_PARTICIPANTS]: {
				request: Wt,
				response: $t,
			},
		},
		Jt = 'DISPATCH';
	var Qt;
	!(function (e) {
		(e.AUTHORIZE = 'AUTHORIZE'),
			(e.AUTHENTICATE = 'AUTHENTICATE'),
			(e.GET_GUILDS = 'GET_GUILDS'),
			(e.GET_GUILD = 'GET_GUILD'),
			(e.GET_CHANNEL = 'GET_CHANNEL'),
			(e.GET_CHANNELS = 'GET_CHANNELS'),
			(e.SELECT_VOICE_CHANNEL = 'SELECT_VOICE_CHANNEL'),
			(e.SELECT_TEXT_CHANNEL = 'SELECT_TEXT_CHANNEL'),
			(e.SUBSCRIBE = 'SUBSCRIBE'),
			(e.UNSUBSCRIBE = 'UNSUBSCRIBE'),
			(e.CAPTURE_SHORTCUT = 'CAPTURE_SHORTCUT'),
			(e.SET_CERTIFIED_DEVICES = 'SET_CERTIFIED_DEVICES'),
			(e.SET_ACTIVITY = 'SET_ACTIVITY'),
			(e.GET_SKUS = 'GET_SKUS'),
			(e.GET_ENTITLEMENTS = 'GET_ENTITLEMENTS'),
			(e.GET_SKUS_EMBEDDED = 'GET_SKUS_EMBEDDED'),
			(e.GET_ENTITLEMENTS_EMBEDDED = 'GET_ENTITLEMENTS_EMBEDDED'),
			(e.START_PURCHASE = 'START_PURCHASE'),
			(e.SET_CONFIG = 'SET_CONFIG'),
			(e.SEND_ANALYTICS_EVENT = 'SEND_ANALYTICS_EVENT'),
			(e.USER_SETTINGS_GET_LOCALE = 'USER_SETTINGS_GET_LOCALE'),
			(e.OPEN_EXTERNAL_LINK = 'OPEN_EXTERNAL_LINK'),
			(e.ENCOURAGE_HW_ACCELERATION = 'ENCOURAGE_HW_ACCELERATION'),
			(e.CAPTURE_LOG = 'CAPTURE_LOG'),
			(e.SET_ORIENTATION_LOCK_STATE = 'SET_ORIENTATION_LOCK_STATE'),
			(e.OPEN_INVITE_DIALOG = 'OPEN_INVITE_DIALOG'),
			(e.GET_PLATFORM_BEHAVIORS = 'GET_PLATFORM_BEHAVIORS'),
			(e.GET_CHANNEL_PERMISSIONS = 'GET_CHANNEL_PERMISSIONS'),
			(e.OPEN_SHARE_MOMENT_DIALOG = 'OPEN_SHARE_MOMENT_DIALOG'),
			(e.INITIATE_IMAGE_UPLOAD = 'INITIATE_IMAGE_UPLOAD'),
			(e.GET_ACTIVITY_INSTANCE_CONNECTED_PARTICIPANTS =
				'GET_ACTIVITY_INSTANCE_CONNECTED_PARTICIPANTS');
	})(Qt || (Qt = {}));
	const en = et({ cmd: Be(), data: We(), evt: Ye(), nonce: Be() }).passthrough(),
		tn =
			(Vt(
				Object.assign(
					Object.assign(
						{},
						qt.shape.scopes.element.overlayType._def.innerType.options[0]
							.Values
					),
					{ UNHANDLED: -1 }
				)
			),
			et({
				id: Be(),
				username: Be(),
				discriminator: Be(),
				global_name: Be().optional().nullable(),
				avatar: Be().optional().nullable(),
				avatar_decoration_data: et({
					asset: Be(),
					sku_id: Be().optional(),
				}).nullable(),
				bot: Ke(),
				flags: Ge().optional().nullable(),
				premium_type: Ge().optional().nullable(),
			})),
		nn = et({
			user: tn,
			nick: Be().optional().nullable(),
			roles: Qe(Be()),
			joined_at: Be(),
			deaf: Ke(),
			mute: Ke(),
		}),
		rn = et({
			user_id: Be(),
			nick: Be().optional().nullable(),
			guild_id: Be(),
			avatar: Be().optional().nullable(),
			avatar_decoration_data: et({
				asset: Be(),
				sku_id: Be().optional().nullable(),
			})
				.optional()
				.nullable(),
			color_string: Be().optional().nullable(),
		}),
		an = et({
			id: Be(),
			name: Be().optional().nullable(),
			roles: Qe(Be()).optional().nullable(),
			user: tn.optional().nullable(),
			require_colons: Ke().optional().nullable(),
			managed: Ke().optional().nullable(),
			animated: Ke().optional().nullable(),
			available: Ke().optional().nullable(),
		}),
		sn = et({
			mute: Ke(),
			deaf: Ke(),
			self_mute: Ke(),
			self_deaf: Ke(),
			suppress: Ke(),
		}),
		on = et({ mute: Ke(), nick: Be(), user: tn, voice_state: sn, volume: Ge() }),
		un = Vt({
			UNHANDLED: -1,
			IDLE: 'idle',
			DND: 'dnd',
			ONLINE: 'online',
			OFFLINE: 'offline',
		}),
		ln = et({
			name: Be(),
			type: Ge(),
			url: Be().optional().nullable(),
			created_at: Ge().optional().nullable(),
			timestamps: et({ start: Ge(), end: Ge() }).partial().optional().nullable(),
			application_id: Be().optional().nullable(),
			details: Be().optional().nullable(),
			state: Be().optional().nullable(),
			emoji: an.optional().nullable(),
			party: et({
				id: Be().optional().nullable(),
				size: Qe(Ge()).optional().nullable(),
			})
				.optional()
				.nullable(),
			assets: et({
				large_image: Be().nullable(),
				large_text: Be().nullable(),
				small_image: Be().nullable(),
				small_text: Be().nullable(),
			})
				.partial()
				.optional()
				.nullable(),
			secrets: et({ join: Be(), match: Be() }).partial().optional().nullable(),
			instance: Ke().optional().nullable(),
			flags: Ge().optional().nullable(),
		}),
		cn = et({
			id: Be(),
			type: Vt({ UNHANDLED: -1, ROLE: 0, MEMBER: 1 }),
			allow: Be(),
			deny: Be(),
		}),
		dn = {
			UNHANDLED: -1,
			DM: 1,
			GROUP_DM: 3,
			GUILD_TEXT: 0,
			GUILD_VOICE: 2,
			GUILD_CATEGORY: 4,
			GUILD_ANNOUNCEMENT: 5,
			GUILD_STORE: 6,
			ANNOUNCEMENT_THREAD: 10,
			PUBLIC_THREAD: 11,
			PRIVATE_THREAD: 12,
			GUILD_STAGE_VOICE: 13,
			GUILD_DIRECTORY: 14,
			GUILD_FORUM: 15,
		},
		pn = et({
			id: Be(),
			type: Vt(dn),
			guild_id: Be().optional().nullable(),
			position: Ge().optional().nullable(),
			permission_overwrites: Qe(cn).optional().nullable(),
			name: Be().optional().nullable(),
			topic: Be().optional().nullable(),
			nsfw: Ke().optional().nullable(),
			last_message_id: Be().optional().nullable(),
			bitrate: Ge().optional().nullable(),
			user_limit: Ge().optional().nullable(),
			rate_limit_per_user: Ge().optional().nullable(),
			recipients: Qe(tn).optional().nullable(),
			icon: Be().optional().nullable(),
			owner_id: Be().optional().nullable(),
			application_id: Be().optional().nullable(),
			parent_id: Be().optional().nullable(),
			last_pin_timestamp: Be().optional().nullable(),
		}),
		hn = et({
			user: tn,
			guild_id: Be(),
			status: un,
			activities: Qe(ln),
			client_status: et({ desktop: un, mobile: un, web: un }).partial(),
		}),
		fn = et({
			id: Be(),
			name: Be(),
			color: Ge(),
			hoist: Ke(),
			position: Ge(),
			permissions: Be(),
			managed: Ke(),
			mentionable: Ke(),
		}),
		mn =
			(et({
				id: Be(),
				name: Be(),
				owner_id: Be(),
				icon: Be().nullable(),
				icon_hash: Be().optional().nullable(),
				splash: Be().nullable(),
				discovery_splash: Be().nullable(),
				owner: Ke().optional().nullable(),
				permissions: Be().optional().nullable(),
				region: Be(),
				afk_channel_id: Be().nullable(),
				afk_timeout: Ge(),
				widget_enabled: Ke().optional().nullable(),
				widget_channel_id: Be().optional().nullable(),
				verification_level: Ge(),
				default_message_notifications: Ge(),
				explicit_content_filter: Ge(),
				roles: Qe(fn),
				emojis: Qe(an),
				features: Qe(Be()),
				mfa_level: Ge(),
				application_id: Be().nullable(),
				system_channel_id: Be().nullable(),
				system_channel_flags: Ge(),
				rules_channel_id: Be().nullable(),
				joined_at: Be().optional().nullable(),
				large: Ke().optional().nullable(),
				unavailable: Ke().optional().nullable(),
				member_count: Ge().optional().nullable(),
				voice_states: Qe(sn).optional().nullable(),
				members: Qe(nn).optional().nullable(),
				channels: Qe(pn).optional().nullable(),
				presences: Qe(hn).optional().nullable(),
				max_presences: Ge().optional().nullable(),
				max_members: Ge().optional().nullable(),
				vanity_url_code: Be().nullable(),
				description: Be().nullable(),
				banner: Be().nullable(),
				premium_tier: Ge(),
				premium_subscription_count: Ge().optional().nullable(),
				preferred_locale: Be(),
				public_updates_channel_id: Be().nullable(),
				max_video_channel_users: Ge().optional().nullable(),
				approximate_member_count: Ge().optional().nullable(),
				approximate_presence_count: Ge().optional().nullable(),
			}),
			et({ id: Be(), guild_id: Be(), type: Ge(), name: Be() })),
		_n = et({
			id: Be(),
			filename: Be(),
			size: Ge(),
			url: Be(),
			proxy_url: Be(),
			height: Ge().optional().nullable(),
			width: Ge().optional().nullable(),
		}),
		vn = et({
			text: Be(),
			icon_url: Be().optional().nullable(),
			proxy_icon_url: Be().optional().nullable(),
		}),
		gn = et({
			url: Be().optional().nullable(),
			proxy_url: Be().optional().nullable(),
			height: Ge().optional().nullable(),
			width: Ge().optional().nullable(),
		}),
		yn = gn.omit({ proxy_url: !0 }),
		En = et({ name: Be().optional().nullable(), url: Be().optional().nullable() }),
		bn = et({
			name: Be().optional().nullable(),
			url: Be().optional().nullable(),
			icon_url: Be().optional().nullable(),
			proxy_icon_url: Be().optional().nullable(),
		}),
		Tn = et({ name: Be(), value: Be(), inline: Ke() }),
		Nn = et({
			title: Be().optional().nullable(),
			type: Be().optional().nullable(),
			description: Be().optional().nullable(),
			url: Be().optional().nullable(),
			timestamp: Be().optional().nullable(),
			color: Ge().optional().nullable(),
			footer: vn.optional().nullable(),
			image: gn.optional().nullable(),
			thumbnail: gn.optional().nullable(),
			video: yn.optional().nullable(),
			provider: En.optional().nullable(),
			author: bn.optional().nullable(),
			fields: Qe(Tn).optional().nullable(),
		}),
		wn = et({ count: Ge(), me: Ke(), emoji: an }),
		An = et({ type: Ge(), party_id: Be().optional().nullable() }),
		In = et({
			id: Be(),
			cover_image: Be().optional().nullable(),
			description: Be(),
			icon: Be().optional().nullable(),
			name: Be(),
		}),
		Sn = et({
			message_id: Be().optional().nullable(),
			channel_id: Be().optional().nullable(),
			guild_id: Be().optional().nullable(),
		}),
		On = et({
			id: Be(),
			channel_id: Be(),
			guild_id: Be().optional().nullable(),
			author: tn.optional().nullable(),
			member: nn.optional().nullable(),
			content: Be(),
			timestamp: Be(),
			edited_timestamp: Be().optional().nullable(),
			tts: Ke(),
			mention_everyone: Ke(),
			mentions: Qe(tn),
			mention_roles: Qe(Be()),
			mention_channels: Qe(mn),
			attachments: Qe(_n),
			embeds: Qe(Nn),
			reactions: Qe(wn).optional().nullable(),
			nonce: nt([Be(), Ge()]).optional().nullable(),
			pinned: Ke(),
			webhook_id: Be().optional().nullable(),
			type: Ge(),
			activity: An.optional().nullable(),
			application: In.optional().nullable(),
			message_reference: Sn.optional().nullable(),
			flags: Ge().optional().nullable(),
			stickers: Qe(We()).optional().nullable(),
			referenced_message: We().optional().nullable(),
		}),
		Cn = et({ id: Be(), name: Be() }),
		xn = et({
			type: Vt({
				UNHANDLED: -1,
				KEYBOARD_KEY: 0,
				MOUSE_BUTTON: 1,
				KEYBOARD_MODIFIER_KEY: 2,
				GAMEPAD_BUTTON: 3,
			}),
			code: Ge(),
			name: Be(),
		}),
		Dn = et({
			type: Vt({
				UNHANDLED: -1,
				PUSH_TO_TALK: 'PUSH_TO_TALK',
				VOICE_ACTIVITY: 'VOICE_ACTIVITY',
			}),
			auto_threshold: Ke(),
			threshold: Ge(),
			shortcut: Qe(xn),
			delay: Ge(),
		}),
		Rn = et({ device_id: Be(), volume: Ge(), available_devices: Qe(Cn) }),
		kn =
			(et({
				type: Vt({
					UNHANDLED: -1,
					AUDIO_INPUT: 'AUDIO_INPUT',
					AUDIO_OUTPUT: 'AUDIO_OUTPUT',
					VIDEO_INPUT: 'VIDEO_INPUT',
				}),
				id: Be(),
				vendor: et({ name: Be(), url: Be() }),
				model: et({ name: Be(), url: Be() }),
				related: Qe(Be()),
				echo_cancellation: Ke().optional().nullable(),
				noise_suppression: Ke().optional().nullable(),
				automatic_gain_control: Ke().optional().nullable(),
				hardware_mute: Ke().optional().nullable(),
			}),
			et({
				id: Be(),
				name: Be(),
				type: Vt({
					UNHANDLED: -1,
					APPLICATION: 1,
					DLC: 2,
					CONSUMABLE: 3,
					BUNDLE: 4,
					SUBSCRIPTION: 5,
				}),
				price: et({ amount: Ge(), currency: Be() }),
				application_id: Be(),
				flags: Ge(),
				release_date: Be().nullable(),
			})),
		Pn = et({
			id: Be(),
			sku_id: Be(),
			application_id: Be(),
			user_id: Be(),
			gift_code_flags: Ge(),
			type: Vt({
				UNHANDLED: -1,
				PURCHASE: 1,
				PREMIUM_SUBSCRIPTION: 2,
				DEVELOPER_GIFT: 3,
				TEST_MODE_PURCHASE: 4,
				FREE_PURCHASE: 5,
				USER_GIFT: 6,
				PREMIUM_PURCHASE: 7,
			}),
			gifter_user_id: Be().optional().nullable(),
			branches: Qe(Be()).optional().nullable(),
			starts_at: Be().optional().nullable(),
			ends_at: Be().optional().nullable(),
			parent_id: Be().optional().nullable(),
			consumed: Ke().optional().nullable(),
			deleted: Ke().optional().nullable(),
			gift_code_batch_id: Be().optional().nullable(),
		}),
		Ln =
			(Vt({ UNHANDLED: -1, UNLOCKED: 1, PORTRAIT: 2, LANDSCAPE: 3 }),
			Vt({ UNHANDLED: -1, NOMINAL: 0, FAIR: 1, SERIOUS: 2, CRITICAL: 3 })),
		Un = { UNHANDLED: -1, PORTRAIT: 0, LANDSCAPE: 1 },
		Mn = (Vt(Un), { UNHANDLED: -1, FOCUSED: 0, PIP: 1, GRID: 2 }),
		Zn = (Vt(Mn), 'ERROR');
	var jn;
	!(function (e) {
		(e.READY = 'READY'),
			(e.VOICE_STATE_UPDATE = 'VOICE_STATE_UPDATE'),
			(e.SPEAKING_START = 'SPEAKING_START'),
			(e.SPEAKING_STOP = 'SPEAKING_STOP'),
			(e.ACTIVITY_LAYOUT_MODE_UPDATE = 'ACTIVITY_LAYOUT_MODE_UPDATE'),
			(e.ORIENTATION_UPDATE = 'ORIENTATION_UPDATE'),
			(e.CURRENT_USER_UPDATE = 'CURRENT_USER_UPDATE'),
			(e.CURRENT_GUILD_MEMBER_UPDATE = 'CURRENT_GUILD_MEMBER_UPDATE'),
			(e.ENTITLEMENT_CREATE = 'ENTITLEMENT_CREATE'),
			(e.THERMAL_STATE_UPDATE = 'THERMAL_STATE_UPDATE'),
			(e.ACTIVITY_INSTANCE_PARTICIPANTS_UPDATE =
				'ACTIVITY_INSTANCE_PARTICIPANTS_UPDATE');
	})(jn || (jn = {}));
	const Bn = en.extend({
			evt: ht(jn),
			nonce: Be().nullable(),
			cmd: dt(Jt),
			data: et({}).passthrough(),
		}),
		Gn = en.extend({
			evt: dt(Zn),
			data: et({ code: Ge(), message: Be().optional() }).passthrough(),
			cmd: ht(Qt),
			nonce: Be().nullable(),
		}),
		Vn = Bn.extend({ evt: Be() }),
		Hn = nt([Bn, Vn, Gn]),
		Kn = {
			[jn.READY]: {
				payload: Bn.extend({
					evt: dt(jn.READY),
					data: et({
						v: Ge(),
						config: et({
							cdn_host: Be().optional(),
							api_endpoint: Be(),
							environment: Be(),
						}),
						user: et({
							id: Be(),
							username: Be(),
							discriminator: Be(),
							avatar: Be().optional(),
						}).optional(),
					}),
				}),
			},
			[jn.VOICE_STATE_UPDATE]: {
				payload: Bn.extend({ evt: dt(jn.VOICE_STATE_UPDATE), data: on }),
				subscribeArgs: et({ channel_id: Be() }),
			},
			[jn.SPEAKING_START]: {
				payload: Bn.extend({
					evt: dt(jn.SPEAKING_START),
					data: et({
						lobby_id: Be().optional(),
						channel_id: Be().optional(),
						user_id: Be(),
					}),
				}),
				subscribeArgs: et({
					lobby_id: Be().nullable().optional(),
					channel_id: Be().nullable().optional(),
				}),
			},
			[jn.SPEAKING_STOP]: {
				payload: Bn.extend({
					evt: dt(jn.SPEAKING_STOP),
					data: et({
						lobby_id: Be().optional(),
						channel_id: Be().optional(),
						user_id: Be(),
					}),
				}),
				subscribeArgs: et({
					lobby_id: Be().nullable().optional(),
					channel_id: Be().nullable().optional(),
				}),
			},
			[jn.ACTIVITY_LAYOUT_MODE_UPDATE]: {
				payload: Bn.extend({
					evt: dt(jn.ACTIVITY_LAYOUT_MODE_UPDATE),
					data: et({ layout_mode: Vt(Mn) }),
				}),
			},
			[jn.ORIENTATION_UPDATE]: {
				payload: Bn.extend({
					evt: dt(jn.ORIENTATION_UPDATE),
					data: et({ screen_orientation: Vt(Un), orientation: ht(Zt) }),
				}),
			},
			[jn.CURRENT_USER_UPDATE]: {
				payload: Bn.extend({ evt: dt(jn.CURRENT_USER_UPDATE), data: tn }),
			},
			[jn.CURRENT_GUILD_MEMBER_UPDATE]: {
				payload: Bn.extend({ evt: dt(jn.CURRENT_GUILD_MEMBER_UPDATE), data: rn }),
				subscribeArgs: et({ guild_id: Be() }),
			},
			[jn.ENTITLEMENT_CREATE]: {
				payload: Bn.extend({
					evt: dt(jn.ENTITLEMENT_CREATE),
					data: et({ entitlement: Pn }),
				}),
			},
			[jn.THERMAL_STATE_UPDATE]: {
				payload: Bn.extend({
					evt: dt(jn.THERMAL_STATE_UPDATE),
					data: et({ thermal_state: Ln }),
				}),
			},
			[jn.ACTIVITY_INSTANCE_PARTICIPANTS_UPDATE]: {
				payload: Bn.extend({
					evt: dt(jn.ACTIVITY_INSTANCE_PARTICIPANTS_UPDATE),
					data: et({ participants: $t.shape.participants }),
				}),
			},
		},
		Fn = et({}).nullable(),
		qn = et({ code: Be() }),
		$n = et({ guilds: Qe(et({ id: Be(), name: Be() })) }),
		Yn = et({ id: Be(), name: Be(), icon_url: Be().optional(), members: Qe(nn) }),
		zn = et({
			id: Be(),
			type: Vt(dn),
			guild_id: Be().optional().nullable(),
			name: Be().optional().nullable(),
			topic: Be().optional().nullable(),
			bitrate: Ge().optional().nullable(),
			user_limit: Ge().optional().nullable(),
			position: Ge().optional().nullable(),
			voice_states: Qe(on),
			messages: Qe(On),
		}),
		Wn = et({ channels: Qe(pn) }),
		Xn = (zn.nullable(), zn.nullable()),
		Jn = zn.nullable(),
		Qn =
			(et({
				input: Rn,
				output: Rn,
				mode: Dn,
				automatic_gain_control: Ke(),
				echo_cancellation: Ke(),
				noise_suppression: Ke(),
				qos: Ke(),
				silence_warning: Ke(),
				deaf: Ke(),
				mute: Ke(),
			}),
			et({ evt: Be() })),
		er = et({ shortcut: xn }),
		tr = ln,
		nr = et({ skus: Qe(kn) }),
		rr = et({ entitlements: Qe(Pn) }),
		ir = Qe(Pn).nullable(),
		ar = et({ use_interactive_pip: Ke() }),
		sr = et({ locale: Be() }),
		or = et({ enabled: Ke() }),
		ur = et({ permissions: He().or(Be()) }),
		lr = et({ iosKeyboardResizesView: _t(Ke()) }),
		cr = en.extend({ cmd: ht(Qt), evt: Ye() });
	function dr({ cmd: e, data: t }) {
		switch (e) {
			case Qt.AUTHORIZE:
				return qn.parse(t);
			case Qt.CAPTURE_SHORTCUT:
				return er.parse(t);
			case Qt.ENCOURAGE_HW_ACCELERATION:
				return or.parse(t);
			case Qt.GET_CHANNEL:
				return zn.parse(t);
			case Qt.GET_CHANNELS:
				return Wn.parse(t);
			case Qt.GET_CHANNEL_PERMISSIONS:
				return ur.parse(t);
			case Qt.GET_GUILD:
				return Yn.parse(t);
			case Qt.GET_GUILDS:
				return $n.parse(t);
			case Qt.GET_PLATFORM_BEHAVIORS:
				return lr.parse(t);
			case Qt.GET_CHANNEL:
				return zn.parse(t);
			case Qt.SELECT_TEXT_CHANNEL:
				return Jn.parse(t);
			case Qt.SELECT_VOICE_CHANNEL:
				return Xn.parse(t);
			case Qt.SET_ACTIVITY:
				return tr.parse(t);
			case Qt.GET_SKUS_EMBEDDED:
				return nr.parse(t);
			case Qt.GET_ENTITLEMENTS_EMBEDDED:
				return rr.parse(t);
			case Qt.SET_CONFIG:
				return ar.parse(t);
			case Qt.START_PURCHASE:
				return ir.parse(t);
			case Qt.SUBSCRIBE:
			case Qt.UNSUBSCRIBE:
				return Qn.parse(t);
			case Qt.USER_SETTINGS_GET_LOCALE:
				return sr.parse(t);
			case Qt.OPEN_EXTERNAL_LINK:
			case Qt.SET_ORIENTATION_LOCK_STATE:
			case Qt.SET_CERTIFIED_DEVICES:
			case Qt.SEND_ANALYTICS_EVENT:
			case Qt.OPEN_INVITE_DIALOG:
			case Qt.CAPTURE_LOG:
			case Qt.GET_SKUS:
			case Qt.GET_ENTITLEMENTS:
				return Fn.parse(t);
			case Qt.AUTHENTICATE:
			case Qt.INITIATE_IMAGE_UPLOAD:
			case Qt.OPEN_SHARE_MOMENT_DIALOG:
			case Qt.GET_ACTIVITY_INSTANCE_CONNECTED_PARTICIPANTS:
				const { response: n } = Xt[e];
				return n.parse(t);
			default:
				!(function (e, t) {
					throw t;
				})(0, new Error(`Unrecognized command ${e}`));
		}
	}
	et({ frame_id: Be(), platform: ht(jt).optional().nullable() }),
		et({
			v: dt(1),
			encoding: dt('json').optional(),
			client_id: Be(),
			frame_id: Be(),
		});
	const pr = et({ code: Ge(), message: Be().optional() }),
		hr = et({
			evt: Be().nullable(),
			nonce: Be().nullable(),
			data: We().nullable(),
			cmd: Be(),
		}).passthrough();
	function fr(e, t, n, r = () => {}) {
		const i = en.extend({ cmd: dt(t), data: n });
		return async (n) => {
			const a = await e({ cmd: t, args: n, transfer: r(n) });
			return i.parse(a).data;
		};
	}
	function mr(e, t = () => {}) {
		const n = Xt[e].response,
			r = en.extend({ cmd: dt(e), data: n });
		return (n) => async (i) => {
			const a = await n({ cmd: e, args: i, transfer: t(i) });
			return r.parse(a).data;
		};
	}
	const _r = mr(Yt.AUTHENTICATE),
		vr = (e) => fr(e, Qt.AUTHORIZE, qn),
		gr = (e) => fr(e, Qt.CAPTURE_LOG, Fn),
		yr = (e) => fr(e, Qt.ENCOURAGE_HW_ACCELERATION, or),
		Er = (e) => fr(e, Qt.GET_ENTITLEMENTS_EMBEDDED, rr),
		br = (e) => fr(e, Qt.GET_SKUS_EMBEDDED, nr),
		Tr = (e) => fr(e, Qt.GET_CHANNEL_PERMISSIONS, ur),
		Nr = (e) => fr(e, Qt.GET_PLATFORM_BEHAVIORS, lr),
		wr = (e) => fr(e, Qt.OPEN_EXTERNAL_LINK, Fn),
		Ar = (e) => fr(e, Qt.OPEN_INVITE_DIALOG, Fn),
		Ir = mr(Yt.OPEN_SHARE_MOMENT_DIALOG);
	ln.pick({
		state: !0,
		details: !0,
		timestamps: !0,
		assets: !0,
		party: !0,
		secrets: !0,
		instance: !0,
		type: !0,
	})
		.extend({
			type: ln.shape.type.optional(),
			instance: ln.shape.instance.optional(),
		})
		.nullable();
	const Sr = (e) => fr(e, Qt.SET_ACTIVITY, tr),
		Or = (e) => fr(e, Qt.SET_CONFIG, ar),
		Cr = (e) => ({
			lock_state: e.lock_state,
			picture_in_picture_lock_state: e.picture_in_picture_lock_state,
		}),
		xr = (e) =>
			(function ({
				sendCommand: e,
				cmd: t,
				response: n,
				fallbackTransform: r,
				transferTransform: i = () => {},
			}) {
				const a = en.extend({ cmd: dt(t), data: n });
				return async (n) => {
					try {
						const r = await e({ cmd: t, args: n, transfer: i(n) });
						return a.parse(r).data;
					} catch (s) {
						if (s.code === Mt.INVALID_PAYLOAD) {
							const s = r(n),
								o = await e({ cmd: t, args: s, transfer: i(s) });
							return a.parse(o).data;
						}
						throw s;
					}
				};
			})({
				sendCommand: e,
				cmd: Qt.SET_ORIENTATION_LOCK_STATE,
				response: Fn,
				fallbackTransform: Cr,
			}),
		Dr = (e) => fr(e, Qt.START_PURCHASE, ir),
		Rr = (e) => fr(e, Qt.USER_SETTINGS_GET_LOCALE, sr),
		kr = mr(Yt.INITIATE_IMAGE_UPLOAD),
		Pr = (e) => fr(e, Qt.GET_CHANNEL, zn),
		Lr = mr(Yt.GET_ACTIVITY_INSTANCE_CONNECTED_PARTICIPANTS);
	class Ur extends Error {
		constructor(e, t = '') {
			super(t),
				(this.code = e),
				(this.message = t),
				(this.name = 'Discord SDK Error');
		}
	}
	const Mr = ['log', 'warn', 'debug', 'info', 'error'];
	var Zr,
		jr = {
			randomUUID:
				'undefined' != typeof crypto &&
				crypto.randomUUID &&
				crypto.randomUUID.bind(crypto),
		},
		Br = new Uint8Array(16);
	function Gr() {
		if (
			!Zr &&
			!(Zr =
				'undefined' != typeof crypto &&
				crypto.getRandomValues &&
				crypto.getRandomValues.bind(crypto))
		)
			throw new Error(
				'crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported'
			);
		return Zr(Br);
	}
	for (var Vr, Hr = [], Kr = 0; Kr < 256; ++Kr)
		Hr.push((Kr + 256).toString(16).slice(1));
	function Fr(e, t, n) {
		if (jr.randomUUID && !t && !e) return jr.randomUUID();
		var r = (e = e || {}).random || (e.rng || Gr)();
		if (((r[6] = (15 & r[6]) | 64), (r[8] = (63 & r[8]) | 128), t)) {
			n = n || 0;
			for (var i = 0; i < 16; ++i) t[n + i] = r[i];
			return t;
		}
		return (function (e, t = 0) {
			return (
				Hr[e[t + 0]] +
				Hr[e[t + 1]] +
				Hr[e[t + 2]] +
				Hr[e[t + 3]] +
				'-' +
				Hr[e[t + 4]] +
				Hr[e[t + 5]] +
				'-' +
				Hr[e[t + 6]] +
				Hr[e[t + 7]] +
				'-' +
				Hr[e[t + 8]] +
				Hr[e[t + 9]] +
				'-' +
				Hr[e[t + 10]] +
				Hr[e[t + 11]] +
				Hr[e[t + 12]] +
				Hr[e[t + 13]] +
				Hr[e[t + 14]] +
				Hr[e[t + 15]]
			).toLowerCase();
		})(r);
	}
	!(function (e) {
		(e[(e.HANDSHAKE = 0)] = 'HANDSHAKE'),
			(e[(e.FRAME = 1)] = 'FRAME'),
			(e[(e.CLOSE = 2)] = 'CLOSE'),
			(e[(e.HELLO = 3)] = 'HELLO');
	})(Vr || (Vr = {}));
	const qr = new Set(
		'undefined' == typeof window
			? []
			: [
					window.location.origin,
					'https://discord.com',
					'https://discordapp.com',
					'https://ptb.discord.com',
					'https://ptb.discordapp.com',
					'https://canary.discord.com',
					'https://canary.discordapp.com',
					'https://staging.discord.co',
					'http://localhost:3333',
					'https://pax.discord.com',
					'null',
			  ]
	);
	var $r,
		Yr = 1e9,
		zr = !0,
		Wr = '[DecimalError] ',
		Xr = Wr + 'Invalid argument: ',
		Jr = Wr + 'Exponent out of range: ',
		Qr = Math.floor,
		ei = Math.pow,
		ti = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,
		ni = 1e7,
		ri = 7,
		ii = 9007199254740991,
		ai = Qr(ii / ri),
		si = {};
	function oi(e, t) {
		var n,
			r,
			i,
			a,
			s,
			o,
			u,
			l,
			c = e.constructor,
			d = c.precision;
		if (!e.s || !t.s) return t.s || (t = new c(e)), zr ? vi(t, d) : t;
		if (((u = e.d), (l = t.d), (s = e.e), (i = t.e), (u = u.slice()), (a = s - i))) {
			for (
				a < 0
					? ((r = u), (a = -a), (o = l.length))
					: ((r = l), (i = s), (o = u.length)),
					a > (o = (s = Math.ceil(d / ri)) > o ? s + 1 : o + 1) &&
						((a = o), (r.length = 1)),
					r.reverse();
				a--;

			)
				r.push(0);
			r.reverse();
		}
		for (
			(o = u.length) - (a = l.length) < 0 && ((a = o), (r = l), (l = u), (u = r)),
				n = 0;
			a;

		)
			(n = ((u[--a] = u[a] + l[a] + n) / ni) | 0), (u[a] %= ni);
		for (n && (u.unshift(n), ++i), o = u.length; 0 == u[--o]; ) u.pop();
		return (t.d = u), (t.e = i), zr ? vi(t, d) : t;
	}
	function ui(e, t, n) {
		if (e !== ~~e || e < t || e > n) throw Error(Xr + e);
	}
	function li(e) {
		var t,
			n,
			r,
			i = e.length - 1,
			a = '',
			s = e[0];
		if (i > 0) {
			for (a += s, t = 1; t < i; t++)
				(r = e[t] + ''), (n = ri - r.length) && (a += fi(n)), (a += r);
			(s = e[t]), (n = ri - (r = s + '').length) && (a += fi(n));
		} else if (0 === s) return '0';
		for (; s % 10 == 0; ) s /= 10;
		return a + s;
	}
	(si.absoluteValue = si.abs =
		function () {
			var e = new this.constructor(this);
			return e.s && (e.s = 1), e;
		}),
		(si.comparedTo = si.cmp =
			function (e) {
				var t,
					n,
					r,
					i,
					a = this;
				if (((e = new a.constructor(e)), a.s !== e.s)) return a.s || -e.s;
				if (a.e !== e.e) return (a.e > e.e) ^ (a.s < 0) ? 1 : -1;
				for (t = 0, n = (r = a.d.length) < (i = e.d.length) ? r : i; t < n; ++t)
					if (a.d[t] !== e.d[t]) return (a.d[t] > e.d[t]) ^ (a.s < 0) ? 1 : -1;
				return r === i ? 0 : (r > i) ^ (a.s < 0) ? 1 : -1;
			}),
		(si.decimalPlaces = si.dp =
			function () {
				var e = this,
					t = e.d.length - 1,
					n = (t - e.e) * ri;
				if ((t = e.d[t])) for (; t % 10 == 0; t /= 10) n--;
				return n < 0 ? 0 : n;
			}),
		(si.dividedBy = si.div =
			function (e) {
				return ci(this, new this.constructor(e));
			}),
		(si.dividedToIntegerBy = si.idiv =
			function (e) {
				var t = this.constructor;
				return vi(ci(this, new t(e), 0, 1), t.precision);
			}),
		(si.equals = si.eq =
			function (e) {
				return !this.cmp(e);
			}),
		(si.exponent = function () {
			return pi(this);
		}),
		(si.greaterThan = si.gt =
			function (e) {
				return this.cmp(e) > 0;
			}),
		(si.greaterThanOrEqualTo = si.gte =
			function (e) {
				return this.cmp(e) >= 0;
			}),
		(si.isInteger = si.isint =
			function () {
				return this.e > this.d.length - 2;
			}),
		(si.isNegative = si.isneg =
			function () {
				return this.s < 0;
			}),
		(si.isPositive = si.ispos =
			function () {
				return this.s > 0;
			}),
		(si.isZero = function () {
			return 0 === this.s;
		}),
		(si.lessThan = si.lt =
			function (e) {
				return this.cmp(e) < 0;
			}),
		(si.lessThanOrEqualTo = si.lte =
			function (e) {
				return this.cmp(e) < 1;
			}),
		(si.logarithm = si.log =
			function (e) {
				var t,
					n = this,
					r = n.constructor,
					i = r.precision,
					a = i + 5;
				if (void 0 === e) e = new r(10);
				else if ((e = new r(e)).s < 1 || e.eq($r)) throw Error(Wr + 'NaN');
				if (n.s < 1) throw Error(Wr + (n.s ? 'NaN' : '-Infinity'));
				return n.eq($r)
					? new r(0)
					: ((zr = !1), (t = ci(mi(n, a), mi(e, a), a)), (zr = !0), vi(t, i));
			}),
		(si.minus = si.sub =
			function (e) {
				var t = this;
				return (
					(e = new t.constructor(e)),
					t.s == e.s ? gi(t, e) : oi(t, ((e.s = -e.s), e))
				);
			}),
		(si.modulo = si.mod =
			function (e) {
				var t,
					n = this,
					r = n.constructor,
					i = r.precision;
				if (!(e = new r(e)).s) throw Error(Wr + 'NaN');
				return n.s
					? ((zr = !1), (t = ci(n, e, 0, 1).times(e)), (zr = !0), n.minus(t))
					: vi(new r(n), i);
			}),
		(si.naturalExponential = si.exp =
			function () {
				return di(this);
			}),
		(si.naturalLogarithm = si.ln =
			function () {
				return mi(this);
			}),
		(si.negated = si.neg =
			function () {
				var e = new this.constructor(this);
				return (e.s = -e.s || 0), e;
			}),
		(si.plus = si.add =
			function (e) {
				var t = this;
				return (
					(e = new t.constructor(e)),
					t.s == e.s ? oi(t, e) : gi(t, ((e.s = -e.s), e))
				);
			}),
		(si.precision = si.sd =
			function (e) {
				var t,
					n,
					r,
					i = this;
				if (void 0 !== e && e !== !!e && 1 !== e && 0 !== e) throw Error(Xr + e);
				if (
					((t = pi(i) + 1), (n = (r = i.d.length - 1) * ri + 1), (r = i.d[r]))
				) {
					for (; r % 10 == 0; r /= 10) n--;
					for (r = i.d[0]; r >= 10; r /= 10) n++;
				}
				return e && t > n ? t : n;
			}),
		(si.squareRoot = si.sqrt =
			function () {
				var e,
					t,
					n,
					r,
					i,
					a,
					s,
					o = this,
					u = o.constructor;
				if (o.s < 1) {
					if (!o.s) return new u(0);
					throw Error(Wr + 'NaN');
				}
				for (
					e = pi(o),
						zr = !1,
						0 == (i = Math.sqrt(+o)) || i == 1 / 0
							? (((t = li(o.d)).length + e) % 2 == 0 && (t += '0'),
							  (i = Math.sqrt(t)),
							  (e = Qr((e + 1) / 2) - (e < 0 || e % 2)),
							  (r = new u(
									(t =
										i == 1 / 0
											? '5e' + e
											: (t = i.toExponential()).slice(
													0,
													t.indexOf('e') + 1
											  ) + e)
							  )))
							: (r = new u(i.toString())),
						i = s = (n = u.precision) + 3;
					;

				)
					if (
						((r = (a = r).plus(ci(o, a, s + 2)).times(0.5)),
						li(a.d).slice(0, s) === (t = li(r.d)).slice(0, s))
					) {
						if (((t = t.slice(s - 3, s + 1)), i == s && '4999' == t)) {
							if ((vi(a, n + 1, 0), a.times(a).eq(o))) {
								r = a;
								break;
							}
						} else if ('9999' != t) break;
						s += 4;
					}
				return (zr = !0), vi(r, n);
			}),
		(si.times = si.mul =
			function (e) {
				var t,
					n,
					r,
					i,
					a,
					s,
					o,
					u,
					l,
					c = this,
					d = c.constructor,
					p = c.d,
					h = (e = new d(e)).d;
				if (!c.s || !e.s) return new d(0);
				for (
					e.s *= c.s,
						n = c.e + e.e,
						(u = p.length) < (l = h.length) &&
							((a = p), (p = h), (h = a), (s = u), (u = l), (l = s)),
						a = [],
						r = s = u + l;
					r--;

				)
					a.push(0);
				for (r = l; --r >= 0; ) {
					for (t = 0, i = u + r; i > r; )
						(o = a[i] + h[r] * p[i - r - 1] + t),
							(a[i--] = o % ni | 0),
							(t = (o / ni) | 0);
					a[i] = (a[i] + t) % ni | 0;
				}
				for (; !a[--s]; ) a.pop();
				return (
					t ? ++n : a.shift(), (e.d = a), (e.e = n), zr ? vi(e, d.precision) : e
				);
			}),
		(si.toDecimalPlaces = si.todp =
			function (e, t) {
				var n = this,
					r = n.constructor;
				return (
					(n = new r(n)),
					void 0 === e
						? n
						: (ui(e, 0, Yr),
						  void 0 === t ? (t = r.rounding) : ui(t, 0, 8),
						  vi(n, e + pi(n) + 1, t))
				);
			}),
		(si.toExponential = function (e, t) {
			var n,
				r = this,
				i = r.constructor;
			return (
				void 0 === e
					? (n = yi(r, !0))
					: (ui(e, 0, Yr),
					  void 0 === t ? (t = i.rounding) : ui(t, 0, 8),
					  (n = yi((r = vi(new i(r), e + 1, t)), !0, e + 1))),
				n
			);
		}),
		(si.toFixed = function (e, t) {
			var n,
				r,
				i = this,
				a = i.constructor;
			return void 0 === e
				? yi(i)
				: (ui(e, 0, Yr),
				  void 0 === t ? (t = a.rounding) : ui(t, 0, 8),
				  (n = yi((r = vi(new a(i), e + pi(i) + 1, t)).abs(), !1, e + pi(r) + 1)),
				  i.isneg() && !i.isZero() ? '-' + n : n);
		}),
		(si.toInteger = si.toint =
			function () {
				var e = this,
					t = e.constructor;
				return vi(new t(e), pi(e) + 1, t.rounding);
			}),
		(si.toNumber = function () {
			return +this;
		}),
		(si.toPower = si.pow =
			function (e) {
				var t,
					n,
					r,
					i,
					a,
					s,
					o = this,
					u = o.constructor,
					l = +(e = new u(e));
				if (!e.s) return new u($r);
				if (!(o = new u(o)).s) {
					if (e.s < 1) throw Error(Wr + 'Infinity');
					return o;
				}
				if (o.eq($r)) return o;
				if (((r = u.precision), e.eq($r))) return vi(o, r);
				if (((s = (t = e.e) >= (n = e.d.length - 1)), (a = o.s), s)) {
					if ((n = l < 0 ? -l : l) <= ii) {
						for (
							i = new u($r), t = Math.ceil(r / ri + 4), zr = !1;
							n % 2 && Ei((i = i.times(o)).d, t), 0 !== (n = Qr(n / 2));

						)
							Ei((o = o.times(o)).d, t);
						return (zr = !0), e.s < 0 ? new u($r).div(i) : vi(i, r);
					}
				} else if (a < 0) throw Error(Wr + 'NaN');
				return (
					(a = a < 0 && 1 & e.d[Math.max(t, n)] ? -1 : 1),
					(o.s = 1),
					(zr = !1),
					(i = e.times(mi(o, r + 12))),
					(zr = !0),
					((i = di(i)).s = a),
					i
				);
			}),
		(si.toPrecision = function (e, t) {
			var n,
				r,
				i = this,
				a = i.constructor;
			return (
				void 0 === e
					? (r = yi(i, (n = pi(i)) <= a.toExpNeg || n >= a.toExpPos))
					: (ui(e, 1, Yr),
					  void 0 === t ? (t = a.rounding) : ui(t, 0, 8),
					  (r = yi(
							(i = vi(new a(i), e, t)),
							e <= (n = pi(i)) || n <= a.toExpNeg,
							e
					  ))),
				r
			);
		}),
		(si.toSignificantDigits = si.tosd =
			function (e, t) {
				var n = this.constructor;
				return (
					void 0 === e
						? ((e = n.precision), (t = n.rounding))
						: (ui(e, 1, Yr), void 0 === t ? (t = n.rounding) : ui(t, 0, 8)),
					vi(new n(this), e, t)
				);
			}),
		(si.toString =
			si.valueOf =
			si.val =
			si.toJSON =
			si[Symbol.for('nodejs.util.inspect.custom')] =
				function () {
					var e = this,
						t = pi(e),
						n = e.constructor;
					return yi(e, t <= n.toExpNeg || t >= n.toExpPos);
				});
	var ci = (function () {
		function e(e, t) {
			var n,
				r = 0,
				i = e.length;
			for (e = e.slice(); i--; )
				(n = e[i] * t + r), (e[i] = n % ni | 0), (r = (n / ni) | 0);
			return r && e.unshift(r), e;
		}
		function t(e, t, n, r) {
			var i, a;
			if (n != r) a = n > r ? 1 : -1;
			else
				for (i = a = 0; i < n; i++)
					if (e[i] != t[i]) {
						a = e[i] > t[i] ? 1 : -1;
						break;
					}
			return a;
		}
		function n(e, t, n) {
			for (var r = 0; n--; )
				(e[n] -= r), (r = e[n] < t[n] ? 1 : 0), (e[n] = r * ni + e[n] - t[n]);
			for (; !e[0] && e.length > 1; ) e.shift();
		}
		return function (r, i, a, s) {
			var o,
				u,
				l,
				c,
				d,
				p,
				h,
				f,
				m,
				_,
				v,
				g,
				y,
				E,
				b,
				T,
				N,
				w,
				A = r.constructor,
				I = r.s == i.s ? 1 : -1,
				S = r.d,
				O = i.d;
			if (!r.s) return new A(r);
			if (!i.s) throw Error(Wr + 'Division by zero');
			for (
				u = r.e - i.e,
					N = O.length,
					b = S.length,
					f = (h = new A(I)).d = [],
					l = 0;
				O[l] == (S[l] || 0);

			)
				++l;
			if (
				(O[l] > (S[l] || 0) && --u,
				(g = null == a ? (a = A.precision) : s ? a + (pi(r) - pi(i)) + 1 : a) < 0)
			)
				return new A(0);
			if (((g = (g / ri + 2) | 0), (l = 0), 1 == N))
				for (c = 0, O = O[0], g++; (l < b || c) && g--; l++)
					(y = c * ni + (S[l] || 0)), (f[l] = (y / O) | 0), (c = y % O | 0);
			else {
				for (
					(c = (ni / (O[0] + 1)) | 0) > 1 &&
						((O = e(O, c)), (S = e(S, c)), (N = O.length), (b = S.length)),
						E = N,
						_ = (m = S.slice(0, N)).length;
					_ < N;

				)
					m[_++] = 0;
				(w = O.slice()).unshift(0), (T = O[0]), O[1] >= ni / 2 && ++T;
				do {
					(c = 0),
						(o = t(O, m, N, _)) < 0
							? ((v = m[0]),
							  N != _ && (v = v * ni + (m[1] || 0)),
							  (c = (v / T) | 0) > 1
									? (c >= ni && (c = ni - 1),
									  1 ==
											(o = t(
												(d = e(O, c)),
												m,
												(p = d.length),
												(_ = m.length)
											)) && (c--, n(d, N < p ? w : O, p)))
									: (0 == c && (o = c = 1), (d = O.slice())),
							  (p = d.length) < _ && d.unshift(0),
							  n(m, d, _),
							  -1 == o &&
									(o = t(O, m, N, (_ = m.length))) < 1 &&
									(c++, n(m, N < _ ? w : O, _)),
							  (_ = m.length))
							: 0 === o && (c++, (m = [0])),
						(f[l++] = c),
						o && m[0] ? (m[_++] = S[E] || 0) : ((m = [S[E]]), (_ = 1));
				} while ((E++ < b || void 0 !== m[0]) && g--);
			}
			return f[0] || f.shift(), (h.e = u), vi(h, s ? a + pi(h) + 1 : a);
		};
	})();
	function di(e, t) {
		var n,
			r,
			i,
			a,
			s,
			o = 0,
			u = 0,
			l = e.constructor,
			c = l.precision;
		if (pi(e) > 16) throw Error(Jr + pi(e));
		if (!e.s) return new l($r);
		for (
			null == t ? ((zr = !1), (s = c)) : (s = t), a = new l(0.03125);
			e.abs().gte(0.1);

		)
			(e = e.times(a)), (u += 5);
		for (
			s += ((Math.log(ei(2, u)) / Math.LN10) * 2 + 5) | 0,
				n = r = i = new l($r),
				l.precision = s;
			;

		) {
			if (
				((r = vi(r.times(e), s)),
				(n = n.times(++o)),
				li((a = i.plus(ci(r, n, s))).d).slice(0, s) === li(i.d).slice(0, s))
			) {
				for (; u--; ) i = vi(i.times(i), s);
				return (l.precision = c), null == t ? ((zr = !0), vi(i, c)) : i;
			}
			i = a;
		}
	}
	function pi(e) {
		for (var t = e.e * ri, n = e.d[0]; n >= 10; n /= 10) t++;
		return t;
	}
	function hi(e, t, n) {
		if (t > e.LN10.sd())
			throw (
				((zr = !0),
				n && (e.precision = n),
				Error(Wr + 'LN10 precision limit exceeded'))
			);
		return vi(new e(e.LN10), t);
	}
	function fi(e) {
		for (var t = ''; e--; ) t += '0';
		return t;
	}
	function mi(e, t) {
		var n,
			r,
			i,
			a,
			s,
			o,
			u,
			l,
			c,
			d = 1,
			p = e,
			h = p.d,
			f = p.constructor,
			m = f.precision;
		if (p.s < 1) throw Error(Wr + (p.s ? 'NaN' : '-Infinity'));
		if (p.eq($r)) return new f(0);
		if ((null == t ? ((zr = !1), (l = m)) : (l = t), p.eq(10)))
			return null == t && (zr = !0), hi(f, l);
		if (
			((l += 10),
			(f.precision = l),
			(r = (n = li(h)).charAt(0)),
			(a = pi(p)),
			!(Math.abs(a) < 15e14))
		)
			return (
				(u = hi(f, l + 2, m).times(a + '')),
				(p = mi(new f(r + '.' + n.slice(1)), l - 10).plus(u)),
				(f.precision = m),
				null == t ? ((zr = !0), vi(p, m)) : p
			);
		for (; (r < 7 && 1 != r) || (1 == r && n.charAt(1) > 3); )
			(r = (n = li((p = p.times(e)).d)).charAt(0)), d++;
		for (
			a = pi(p),
				r > 1 ? ((p = new f('0.' + n)), a++) : (p = new f(r + '.' + n.slice(1))),
				o = s = p = ci(p.minus($r), p.plus($r), l),
				c = vi(p.times(p), l),
				i = 3;
			;

		) {
			if (
				((s = vi(s.times(c), l)),
				li((u = o.plus(ci(s, new f(i), l))).d).slice(0, l) ===
					li(o.d).slice(0, l))
			)
				return (
					(o = o.times(2)),
					0 !== a && (o = o.plus(hi(f, l + 2, m).times(a + ''))),
					(o = ci(o, new f(d), l)),
					(f.precision = m),
					null == t ? ((zr = !0), vi(o, m)) : o
				);
			(o = u), (i += 2);
		}
	}
	function _i(e, t) {
		var n, r, i;
		for (
			(n = t.indexOf('.')) > -1 && (t = t.replace('.', '')),
				(r = t.search(/e/i)) > 0
					? (n < 0 && (n = r), (n += +t.slice(r + 1)), (t = t.substring(0, r)))
					: n < 0 && (n = t.length),
				r = 0;
			48 === t.charCodeAt(r);

		)
			++r;
		for (i = t.length; 48 === t.charCodeAt(i - 1); ) --i;
		if ((t = t.slice(r, i))) {
			if (
				((i -= r),
				(n = n - r - 1),
				(e.e = Qr(n / ri)),
				(e.d = []),
				(r = (n + 1) % ri),
				n < 0 && (r += ri),
				r < i)
			) {
				for (r && e.d.push(+t.slice(0, r)), i -= ri; r < i; )
					e.d.push(+t.slice(r, (r += ri)));
				(t = t.slice(r)), (r = ri - t.length);
			} else r -= i;
			for (; r--; ) t += '0';
			if ((e.d.push(+t), zr && (e.e > ai || e.e < -ai))) throw Error(Jr + n);
		} else (e.s = 0), (e.e = 0), (e.d = [0]);
		return e;
	}
	function vi(e, t, n) {
		var r,
			i,
			a,
			s,
			o,
			u,
			l,
			c,
			d = e.d;
		for (s = 1, a = d[0]; a >= 10; a /= 10) s++;
		if ((r = t - s) < 0) (r += ri), (i = t), (l = d[(c = 0)]);
		else {
			if ((c = Math.ceil((r + 1) / ri)) >= (a = d.length)) return e;
			for (l = a = d[c], s = 1; a >= 10; a /= 10) s++;
			i = (r %= ri) - ri + s;
		}
		if (
			(void 0 !== n &&
				((o = (l / (a = ei(10, s - i - 1))) % 10 | 0),
				(u = t < 0 || void 0 !== d[c + 1] || l % a),
				(u =
					n < 4
						? (o || u) && (0 == n || n == (e.s < 0 ? 3 : 2))
						: o > 5 ||
						  (5 == o &&
								(4 == n ||
									u ||
									(6 == n &&
										(r > 0
											? i > 0
												? l / ei(10, s - i)
												: 0
											: d[c - 1]) %
											10 &
											1) ||
									n == (e.s < 0 ? 8 : 7))))),
			t < 1 || !d[0])
		)
			return (
				u
					? ((a = pi(e)),
					  (d.length = 1),
					  (t = t - a - 1),
					  (d[0] = ei(10, (ri - (t % ri)) % ri)),
					  (e.e = Qr(-t / ri) || 0))
					: ((d.length = 1), (d[0] = e.e = e.s = 0)),
				e
			);
		if (
			(0 == r
				? ((d.length = c), (a = 1), c--)
				: ((d.length = c + 1),
				  (a = ei(10, ri - r)),
				  (d[c] = i > 0 ? ((l / ei(10, s - i)) % ei(10, i) | 0) * a : 0)),
			u)
		)
			for (;;) {
				if (0 == c) {
					(d[0] += a) == ni && ((d[0] = 1), ++e.e);
					break;
				}
				if (((d[c] += a), d[c] != ni)) break;
				(d[c--] = 0), (a = 1);
			}
		for (r = d.length; 0 === d[--r]; ) d.pop();
		if (zr && (e.e > ai || e.e < -ai)) throw Error(Jr + pi(e));
		return e;
	}
	function gi(e, t) {
		var n,
			r,
			i,
			a,
			s,
			o,
			u,
			l,
			c,
			d,
			p = e.constructor,
			h = p.precision;
		if (!e.s || !t.s) return t.s ? (t.s = -t.s) : (t = new p(e)), zr ? vi(t, h) : t;
		if (((u = e.d), (d = t.d), (r = t.e), (l = e.e), (u = u.slice()), (s = l - r))) {
			for (
				(c = s < 0)
					? ((n = u), (s = -s), (o = d.length))
					: ((n = d), (r = l), (o = u.length)),
					s > (i = Math.max(Math.ceil(h / ri), o) + 2) &&
						((s = i), (n.length = 1)),
					n.reverse(),
					i = s;
				i--;

			)
				n.push(0);
			n.reverse();
		} else {
			for ((c = (i = u.length) < (o = d.length)) && (o = i), i = 0; i < o; i++)
				if (u[i] != d[i]) {
					c = u[i] < d[i];
					break;
				}
			s = 0;
		}
		for (
			c && ((n = u), (u = d), (d = n), (t.s = -t.s)),
				o = u.length,
				i = d.length - o;
			i > 0;
			--i
		)
			u[o++] = 0;
		for (i = d.length; i > s; ) {
			if (u[--i] < d[i]) {
				for (a = i; a && 0 === u[--a]; ) u[a] = ni - 1;
				--u[a], (u[i] += ni);
			}
			u[i] -= d[i];
		}
		for (; 0 === u[--o]; ) u.pop();
		for (; 0 === u[0]; u.shift()) --r;
		return u[0] ? ((t.d = u), (t.e = r), zr ? vi(t, h) : t) : new p(0);
	}
	function yi(e, t, n) {
		var r,
			i = pi(e),
			a = li(e.d),
			s = a.length;
		return (
			t
				? (n && (r = n - s) > 0
						? (a = a.charAt(0) + '.' + a.slice(1) + fi(r))
						: s > 1 && (a = a.charAt(0) + '.' + a.slice(1)),
				  (a = a + (i < 0 ? 'e' : 'e+') + i))
				: i < 0
				? ((a = '0.' + fi(-i - 1) + a), n && (r = n - s) > 0 && (a += fi(r)))
				: i >= s
				? ((a += fi(i + 1 - s)),
				  n && (r = n - i - 1) > 0 && (a = a + '.' + fi(r)))
				: ((r = i + 1) < s && (a = a.slice(0, r) + '.' + a.slice(r)),
				  n && (r = n - s) > 0 && (i + 1 === s && (a += '.'), (a += fi(r)))),
			e.s < 0 ? '-' + a : a
		);
	}
	function Ei(e, t) {
		if (e.length > t) return (e.length = t), !0;
	}
	function bi(e) {
		if (!e || 'object' != typeof e) throw Error(Wr + 'Object expected');
		var t,
			n,
			r,
			i = [
				'precision',
				1,
				Yr,
				'rounding',
				0,
				8,
				'toExpNeg',
				-1 / 0,
				0,
				'toExpPos',
				0,
				1 / 0,
			];
		for (t = 0; t < i.length; t += 3)
			if (void 0 !== (r = e[(n = i[t])])) {
				if (!(Qr(r) === r && r >= i[t + 1] && r <= i[t + 2]))
					throw Error(Xr + n + ': ' + r);
				this[n] = r;
			}
		if (void 0 !== (r = e[(n = 'LN10')])) {
			if (r != Math.LN10) throw Error(Xr + n + ': ' + r);
			this[n] = new this(r);
		}
		return this;
	}
	var Ti,
		Ni = (function e(t) {
			var n, r, i;
			function a(e) {
				var t = this;
				if (!(t instanceof a)) return new a(e);
				if (((t.constructor = a), e instanceof a))
					return (
						(t.s = e.s), (t.e = e.e), void (t.d = (e = e.d) ? e.slice() : e)
					);
				if ('number' == typeof e) {
					if (0 * e != 0) throw Error(Xr + e);
					if (e > 0) t.s = 1;
					else {
						if (!(e < 0)) return (t.s = 0), (t.e = 0), void (t.d = [0]);
						(e = -e), (t.s = -1);
					}
					return e === ~~e && e < 1e7
						? ((t.e = 0), void (t.d = [e]))
						: _i(t, e.toString());
				}
				if ('string' != typeof e) throw Error(Xr + e);
				if (
					(45 === e.charCodeAt(0) ? ((e = e.slice(1)), (t.s = -1)) : (t.s = 1),
					!ti.test(e))
				)
					throw Error(Xr + e);
				_i(t, e);
			}
			if (
				((a.prototype = si),
				(a.ROUND_UP = 0),
				(a.ROUND_DOWN = 1),
				(a.ROUND_CEIL = 2),
				(a.ROUND_FLOOR = 3),
				(a.ROUND_HALF_UP = 4),
				(a.ROUND_HALF_DOWN = 5),
				(a.ROUND_HALF_EVEN = 6),
				(a.ROUND_HALF_CEIL = 7),
				(a.ROUND_HALF_FLOOR = 8),
				(a.clone = e),
				(a.config = a.set = bi),
				void 0 === t && (t = {}),
				t)
			)
				for (
					i = ['precision', 'rounding', 'toExpNeg', 'toExpPos', 'LN10'], n = 0;
					n < i.length;

				)
					t.hasOwnProperty((r = i[n++])) || (t[r] = this[r]);
			return a.config(t), a;
		})({
			precision: 20,
			rounding: 4,
			toExpNeg: -7,
			toExpPos: 21,
			LN10: '2.302585092994045684017991454684364207601101488628772976033327900967572609677352480235997205089598298341967784042286',
		});
	($r = new Ni(1)),
		(function (e) {
			(e.AED = 'aed'),
				(e.AFN = 'afn'),
				(e.ALL = 'all'),
				(e.AMD = 'amd'),
				(e.ANG = 'ang'),
				(e.AOA = 'aoa'),
				(e.ARS = 'ars'),
				(e.AUD = 'aud'),
				(e.AWG = 'awg'),
				(e.AZN = 'azn'),
				(e.BAM = 'bam'),
				(e.BBD = 'bbd'),
				(e.BDT = 'bdt'),
				(e.BGN = 'bgn'),
				(e.BHD = 'bhd'),
				(e.BIF = 'bif'),
				(e.BMD = 'bmd'),
				(e.BND = 'bnd'),
				(e.BOB = 'bob'),
				(e.BOV = 'bov'),
				(e.BRL = 'brl'),
				(e.BSD = 'bsd'),
				(e.BTN = 'btn'),
				(e.BWP = 'bwp'),
				(e.BYN = 'byn'),
				(e.BYR = 'byr'),
				(e.BZD = 'bzd'),
				(e.CAD = 'cad'),
				(e.CDF = 'cdf'),
				(e.CHE = 'che'),
				(e.CHF = 'chf'),
				(e.CHW = 'chw'),
				(e.CLF = 'clf'),
				(e.CLP = 'clp'),
				(e.CNY = 'cny'),
				(e.COP = 'cop'),
				(e.COU = 'cou'),
				(e.CRC = 'crc'),
				(e.CUC = 'cuc'),
				(e.CUP = 'cup'),
				(e.CVE = 'cve'),
				(e.CZK = 'czk'),
				(e.DJF = 'djf'),
				(e.DKK = 'dkk'),
				(e.DOP = 'dop'),
				(e.DZD = 'dzd'),
				(e.EGP = 'egp'),
				(e.ERN = 'ern'),
				(e.ETB = 'etb'),
				(e.EUR = 'eur'),
				(e.FJD = 'fjd'),
				(e.FKP = 'fkp'),
				(e.GBP = 'gbp'),
				(e.GEL = 'gel'),
				(e.GHS = 'ghs'),
				(e.GIP = 'gip'),
				(e.GMD = 'gmd'),
				(e.GNF = 'gnf'),
				(e.GTQ = 'gtq'),
				(e.GYD = 'gyd'),
				(e.HKD = 'hkd'),
				(e.HNL = 'hnl'),
				(e.HRK = 'hrk'),
				(e.HTG = 'htg'),
				(e.HUF = 'huf'),
				(e.IDR = 'idr'),
				(e.ILS = 'ils'),
				(e.INR = 'inr'),
				(e.IQD = 'iqd'),
				(e.IRR = 'irr'),
				(e.ISK = 'isk'),
				(e.JMD = 'jmd'),
				(e.JOD = 'jod'),
				(e.JPY = 'jpy'),
				(e.KES = 'kes'),
				(e.KGS = 'kgs'),
				(e.KHR = 'khr'),
				(e.KMF = 'kmf'),
				(e.KPW = 'kpw'),
				(e.KRW = 'krw'),
				(e.KWD = 'kwd'),
				(e.KYD = 'kyd'),
				(e.KZT = 'kzt'),
				(e.LAK = 'lak'),
				(e.LBP = 'lbp'),
				(e.LKR = 'lkr'),
				(e.LRD = 'lrd'),
				(e.LSL = 'lsl'),
				(e.LTL = 'ltl'),
				(e.LVL = 'lvl'),
				(e.LYD = 'lyd'),
				(e.MAD = 'mad'),
				(e.MDL = 'mdl'),
				(e.MGA = 'mga'),
				(e.MKD = 'mkd'),
				(e.MMK = 'mmk'),
				(e.MNT = 'mnt'),
				(e.MOP = 'mop'),
				(e.MRO = 'mro'),
				(e.MUR = 'mur'),
				(e.MVR = 'mvr'),
				(e.MWK = 'mwk'),
				(e.MXN = 'mxn'),
				(e.MXV = 'mxv'),
				(e.MYR = 'myr'),
				(e.MZN = 'mzn'),
				(e.NAD = 'nad'),
				(e.NGN = 'ngn'),
				(e.NIO = 'nio'),
				(e.NOK = 'nok'),
				(e.NPR = 'npr'),
				(e.NZD = 'nzd'),
				(e.OMR = 'omr'),
				(e.PAB = 'pab'),
				(e.PEN = 'pen'),
				(e.PGK = 'pgk'),
				(e.PHP = 'php'),
				(e.PKR = 'pkr'),
				(e.PLN = 'pln'),
				(e.PYG = 'pyg'),
				(e.QAR = 'qar'),
				(e.RON = 'ron'),
				(e.RSD = 'rsd'),
				(e.RUB = 'rub'),
				(e.RWF = 'rwf'),
				(e.SAR = 'sar'),
				(e.SBD = 'sbd'),
				(e.SCR = 'scr'),
				(e.SDG = 'sdg'),
				(e.SEK = 'sek'),
				(e.SGD = 'sgd'),
				(e.SHP = 'shp'),
				(e.SLL = 'sll'),
				(e.SOS = 'sos'),
				(e.SRD = 'srd'),
				(e.SSP = 'ssp'),
				(e.STD = 'std'),
				(e.SVC = 'svc'),
				(e.SYP = 'syp'),
				(e.SZL = 'szl'),
				(e.THB = 'thb'),
				(e.TJS = 'tjs'),
				(e.TMT = 'tmt'),
				(e.TND = 'tnd'),
				(e.TOP = 'top'),
				(e.TRY = 'try'),
				(e.TTD = 'ttd'),
				(e.TWD = 'twd'),
				(e.TZS = 'tzs'),
				(e.UAH = 'uah'),
				(e.UGX = 'ugx'),
				(e.USD = 'usd'),
				(e.USN = 'usn'),
				(e.USS = 'uss'),
				(e.UYI = 'uyi'),
				(e.UYU = 'uyu'),
				(e.UZS = 'uzs'),
				(e.VEF = 'vef'),
				(e.VND = 'vnd'),
				(e.VUV = 'vuv'),
				(e.WST = 'wst'),
				(e.XAF = 'xaf'),
				(e.XAG = 'xag'),
				(e.XAU = 'xau'),
				(e.XBA = 'xba'),
				(e.XBB = 'xbb'),
				(e.XBC = 'xbc'),
				(e.XBD = 'xbd'),
				(e.XCD = 'xcd'),
				(e.XDR = 'xdr'),
				(e.XFU = 'xfu'),
				(e.XOF = 'xof'),
				(e.XPD = 'xpd'),
				(e.XPF = 'xpf'),
				(e.XPT = 'xpt'),
				(e.XSU = 'xsu'),
				(e.XTS = 'xts'),
				(e.XUA = 'xua'),
				(e.YER = 'yer'),
				(e.ZAR = 'zar'),
				(e.ZMW = 'zmw'),
				(e.ZWL = 'zwl');
		})(Ti || (Ti = {})),
		Ti.AED,
		Ti.AFN,
		Ti.ALL,
		Ti.AMD,
		Ti.ANG,
		Ti.AOA,
		Ti.ARS,
		Ti.AUD,
		Ti.AWG,
		Ti.AZN,
		Ti.BAM,
		Ti.BBD,
		Ti.BDT,
		Ti.BGN,
		Ti.BHD,
		Ti.BIF,
		Ti.BMD,
		Ti.BND,
		Ti.BOB,
		Ti.BOV,
		Ti.BRL,
		Ti.BSD,
		Ti.BTN,
		Ti.BWP,
		Ti.BYR,
		Ti.BYN,
		Ti.BZD,
		Ti.CAD,
		Ti.CDF,
		Ti.CHE,
		Ti.CHF,
		Ti.CHW,
		Ti.CLF,
		Ti.CLP,
		Ti.CNY,
		Ti.COP,
		Ti.COU,
		Ti.CRC,
		Ti.CUC,
		Ti.CUP,
		Ti.CVE,
		Ti.CZK,
		Ti.DJF,
		Ti.DKK,
		Ti.DOP,
		Ti.DZD,
		Ti.EGP,
		Ti.ERN,
		Ti.ETB,
		Ti.EUR,
		Ti.FJD,
		Ti.FKP,
		Ti.GBP,
		Ti.GEL,
		Ti.GHS,
		Ti.GIP,
		Ti.GMD,
		Ti.GNF,
		Ti.GTQ,
		Ti.GYD,
		Ti.HKD,
		Ti.HNL,
		Ti.HRK,
		Ti.HTG,
		Ti.HUF,
		Ti.IDR,
		Ti.ILS,
		Ti.INR,
		Ti.IQD,
		Ti.IRR,
		Ti.ISK,
		Ti.JMD,
		Ti.JOD,
		Ti.JPY,
		Ti.KES,
		Ti.KGS,
		Ti.KHR,
		Ti.KMF,
		Ti.KPW,
		Ti.KRW,
		Ti.KWD,
		Ti.KYD,
		Ti.KZT,
		Ti.LAK,
		Ti.LBP,
		Ti.LKR,
		Ti.LRD,
		Ti.LSL,
		Ti.LTL,
		Ti.LVL,
		Ti.LYD,
		Ti.MAD,
		Ti.MDL,
		Ti.MGA,
		Ti.MKD,
		Ti.MMK,
		Ti.MNT,
		Ti.MOP,
		Ti.MRO,
		Ti.MUR,
		Ti.MVR,
		Ti.MWK,
		Ti.MXN,
		Ti.MXV,
		Ti.MYR,
		Ti.MZN,
		Ti.NAD,
		Ti.NGN,
		Ti.NIO,
		Ti.NOK,
		Ti.NPR,
		Ti.NZD,
		Ti.OMR,
		Ti.PAB,
		Ti.PEN,
		Ti.PGK,
		Ti.PHP,
		Ti.PKR,
		Ti.PLN,
		Ti.PYG,
		Ti.QAR,
		Ti.RON,
		Ti.RSD,
		Ti.RUB,
		Ti.RWF,
		Ti.SAR,
		Ti.SBD,
		Ti.SCR,
		Ti.SDG,
		Ti.SEK,
		Ti.SGD,
		Ti.SHP,
		Ti.SLL,
		Ti.SOS,
		Ti.SRD,
		Ti.SSP,
		Ti.STD,
		Ti.SVC,
		Ti.SYP,
		Ti.SZL,
		Ti.THB,
		Ti.TJS,
		Ti.TMT,
		Ti.TND,
		Ti.TOP,
		Ti.TRY,
		Ti.TTD,
		Ti.TWD,
		Ti.TZS,
		Ti.UAH,
		Ti.UGX,
		Ti.USD,
		Ti.USN,
		Ti.USS,
		Ti.UYI,
		Ti.UYU,
		Ti.UZS,
		Ti.VEF,
		Ti.VND,
		Ti.VUV,
		Ti.WST,
		Ti.XAF,
		Ti.XAG,
		Ti.XAU,
		Ti.XBA,
		Ti.XBB,
		Ti.XBC,
		Ti.XBD,
		Ti.XCD,
		Ti.XDR,
		Ti.XFU,
		Ti.XOF,
		Ti.XPD,
		Ti.XPF,
		Ti.XPT,
		Ti.XSU,
		Ti.XTS,
		Ti.XUA,
		Ti.YER,
		Ti.ZAR,
		Ti.ZMW,
		Ti.ZWL;
	var wi = { exports: {} };
	!(function (e, t) {
		var r = '__lodash_hash_undefined__',
			i = 1,
			a = 2,
			s = 1 / 0,
			o = 9007199254740991,
			u = '[object Arguments]',
			l = '[object Array]',
			c = '[object Boolean]',
			d = '[object Date]',
			p = '[object Error]',
			h = '[object Function]',
			f = '[object GeneratorFunction]',
			m = '[object Map]',
			_ = '[object Number]',
			v = '[object Object]',
			g = '[object Promise]',
			y = '[object RegExp]',
			E = '[object Set]',
			b = '[object String]',
			T = '[object Symbol]',
			N = '[object WeakMap]',
			w = '[object ArrayBuffer]',
			A = '[object DataView]',
			I = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
			S = /^\w*$/,
			O = /^\./,
			C =
				/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
			x = /\\(\\)?/g,
			D = /^\[object .+?Constructor\]$/,
			R = /^(?:0|[1-9]\d*)$/,
			k = {};
		(k['[object Float32Array]'] =
			k['[object Float64Array]'] =
			k['[object Int8Array]'] =
			k['[object Int16Array]'] =
			k['[object Int32Array]'] =
			k['[object Uint8Array]'] =
			k['[object Uint8ClampedArray]'] =
			k['[object Uint16Array]'] =
			k['[object Uint32Array]'] =
				!0),
			(k[u] =
				k[l] =
				k[w] =
				k[c] =
				k[A] =
				k[d] =
				k[p] =
				k[h] =
				k[m] =
				k[_] =
				k[v] =
				k[y] =
				k[E] =
				k[b] =
				k[N] =
					!1);
		var P = 'object' == typeof n && n && n.Object === Object && n,
			L = 'object' == typeof self && self && self.Object === Object && self,
			U = P || L || Function('return this')(),
			M = t && !t.nodeType && t,
			Z = M && e && !e.nodeType && e,
			j = Z && Z.exports === M && P.process,
			B = (function () {
				try {
					return j && j.binding('util');
				} catch (e) {}
			})(),
			G = B && B.isTypedArray;
		function V(e, t) {
			for (var n = -1, r = e ? e.length : 0; ++n < r && !1 !== t(e[n], n, e); );
			return e;
		}
		function H(e, t) {
			for (var n = -1, r = e ? e.length : 0; ++n < r; )
				if (t(e[n], n, e)) return !0;
			return !1;
		}
		function K(e) {
			var t = !1;
			if (null != e && 'function' != typeof e.toString)
				try {
					t = !!(e + '');
				} catch (e) {}
			return t;
		}
		function F(e) {
			var t = -1,
				n = Array(e.size);
			return (
				e.forEach(function (e, r) {
					n[++t] = [r, e];
				}),
				n
			);
		}
		function q(e, t) {
			return function (n) {
				return e(t(n));
			};
		}
		function $(e) {
			var t = -1,
				n = Array(e.size);
			return (
				e.forEach(function (e) {
					n[++t] = e;
				}),
				n
			);
		}
		var Y,
			z = Array.prototype,
			W = Function.prototype,
			X = Object.prototype,
			J = U['__core-js_shared__'],
			Q = (Y = /[^.]+$/.exec((J && J.keys && J.keys.IE_PROTO) || ''))
				? 'Symbol(src)_1.' + Y
				: '',
			ee = W.toString,
			te = X.hasOwnProperty,
			ne = X.toString,
			re = RegExp(
				'^' +
					ee
						.call(te)
						.replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
						.replace(
							/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
							'$1.*?'
						) +
					'$'
			),
			ie = U.Symbol,
			ae = U.Uint8Array,
			se = q(Object.getPrototypeOf, Object),
			oe = Object.create,
			ue = X.propertyIsEnumerable,
			le = z.splice,
			ce = q(Object.keys, Object),
			de = Ze(U, 'DataView'),
			pe = Ze(U, 'Map'),
			he = Ze(U, 'Promise'),
			fe = Ze(U, 'Set'),
			me = Ze(U, 'WeakMap'),
			_e = Ze(Object, 'create'),
			ve = qe(de),
			ge = qe(pe),
			ye = qe(he),
			Ee = qe(fe),
			be = qe(me),
			Te = ie ? ie.prototype : void 0,
			Ne = Te ? Te.valueOf : void 0,
			we = Te ? Te.toString : void 0;
		function Ae(e) {
			var t = -1,
				n = e ? e.length : 0;
			for (this.clear(); ++t < n; ) {
				var r = e[t];
				this.set(r[0], r[1]);
			}
		}
		function Ie(e) {
			var t = -1,
				n = e ? e.length : 0;
			for (this.clear(); ++t < n; ) {
				var r = e[t];
				this.set(r[0], r[1]);
			}
		}
		function Se(e) {
			var t = -1,
				n = e ? e.length : 0;
			for (this.clear(); ++t < n; ) {
				var r = e[t];
				this.set(r[0], r[1]);
			}
		}
		function Oe(e) {
			var t = -1,
				n = e ? e.length : 0;
			for (this.__data__ = new Se(); ++t < n; ) this.add(e[t]);
		}
		function Ce(e) {
			this.__data__ = new Ie(e);
		}
		function xe(e, t) {
			for (var n = e.length; n--; ) if (Ye(e[n][0], t)) return n;
			return -1;
		}
		(Ae.prototype.clear = function () {
			this.__data__ = _e ? _e(null) : {};
		}),
			(Ae.prototype.delete = function (e) {
				return this.has(e) && delete this.__data__[e];
			}),
			(Ae.prototype.get = function (e) {
				var t = this.__data__;
				if (_e) {
					var n = t[e];
					return n === r ? void 0 : n;
				}
				return te.call(t, e) ? t[e] : void 0;
			}),
			(Ae.prototype.has = function (e) {
				var t = this.__data__;
				return _e ? void 0 !== t[e] : te.call(t, e);
			}),
			(Ae.prototype.set = function (e, t) {
				return (this.__data__[e] = _e && void 0 === t ? r : t), this;
			}),
			(Ie.prototype.clear = function () {
				this.__data__ = [];
			}),
			(Ie.prototype.delete = function (e) {
				var t = this.__data__,
					n = xe(t, e);
				return !(n < 0 || (n == t.length - 1 ? t.pop() : le.call(t, n, 1), 0));
			}),
			(Ie.prototype.get = function (e) {
				var t = this.__data__,
					n = xe(t, e);
				return n < 0 ? void 0 : t[n][1];
			}),
			(Ie.prototype.has = function (e) {
				return xe(this.__data__, e) > -1;
			}),
			(Ie.prototype.set = function (e, t) {
				var n = this.__data__,
					r = xe(n, e);
				return r < 0 ? n.push([e, t]) : (n[r][1] = t), this;
			}),
			(Se.prototype.clear = function () {
				this.__data__ = {
					hash: new Ae(),
					map: new (pe || Ie)(),
					string: new Ae(),
				};
			}),
			(Se.prototype.delete = function (e) {
				return Me(this, e).delete(e);
			}),
			(Se.prototype.get = function (e) {
				return Me(this, e).get(e);
			}),
			(Se.prototype.has = function (e) {
				return Me(this, e).has(e);
			}),
			(Se.prototype.set = function (e, t) {
				return Me(this, e).set(e, t), this;
			}),
			(Oe.prototype.add = Oe.prototype.push =
				function (e) {
					return this.__data__.set(e, r), this;
				}),
			(Oe.prototype.has = function (e) {
				return this.__data__.has(e);
			}),
			(Ce.prototype.clear = function () {
				this.__data__ = new Ie();
			}),
			(Ce.prototype.delete = function (e) {
				return this.__data__.delete(e);
			}),
			(Ce.prototype.get = function (e) {
				return this.__data__.get(e);
			}),
			(Ce.prototype.has = function (e) {
				return this.__data__.has(e);
			}),
			(Ce.prototype.set = function (e, t) {
				var n = this.__data__;
				if (n instanceof Ie) {
					var r = n.__data__;
					if (!pe || r.length < 199) return r.push([e, t]), this;
					n = this.__data__ = new Se(r);
				}
				return n.set(e, t), this;
			});
		function De(e, t) {
			return (
				e &&
				(function (e, t, n) {
					for (var r = -1, i = Object(e), a = n(e), s = a.length; s--; ) {
						var o = a[++r];
						if (!1 === t(i[o], o, i)) break;
					}
					return e;
				})(e, t, at)
			);
		}
		function Re(e, t) {
			for (var n = 0, r = (t = Ge(t, e) ? [t] : Le(t)).length; null != e && n < r; )
				e = e[Fe(t[n++])];
			return n && n == r ? e : void 0;
		}
		function ke(e, t) {
			return null != e && t in Object(e);
		}
		function Pe(e, t, n, r, s) {
			return (
				e === t ||
				(null == e || null == t || (!et(e) && !tt(t))
					? e != e && t != t
					: (function (e, t, n, r, s, o) {
							var h = We(e),
								f = We(t),
								g = l,
								N = l;
							h || (g = (g = je(e)) == u ? v : g),
								f || (N = (N = je(t)) == u ? v : N);
							var I = g == v && !K(e),
								S = N == v && !K(t),
								O = g == N;
							if (O && !I)
								return (
									o || (o = new Ce()),
									h || it(e)
										? Ue(e, t, n, r, s, o)
										: (function (e, t, n, r, s, o, u) {
												switch (n) {
													case A:
														if (
															e.byteLength !=
																t.byteLength ||
															e.byteOffset != t.byteOffset
														)
															return !1;
														(e = e.buffer), (t = t.buffer);
													case w:
														return !(
															e.byteLength !=
																t.byteLength ||
															!r(new ae(e), new ae(t))
														);
													case c:
													case d:
													case _:
														return Ye(+e, +t);
													case p:
														return (
															e.name == t.name &&
															e.message == t.message
														);
													case y:
													case b:
														return e == t + '';
													case m:
														var l = F;
													case E:
														var h = o & a;
														if (
															(l || (l = $),
															e.size != t.size && !h)
														)
															return !1;
														var f = u.get(e);
														if (f) return f == t;
														(o |= i), u.set(e, t);
														var v = Ue(
															l(e),
															l(t),
															r,
															s,
															o,
															u
														);
														return u.delete(e), v;
													case T:
														if (Ne)
															return (
																Ne.call(e) == Ne.call(t)
															);
												}
												return !1;
										  })(e, t, g, n, r, s, o)
								);
							if (!(s & a)) {
								var C = I && te.call(e, '__wrapped__'),
									x = S && te.call(t, '__wrapped__');
								if (C || x) {
									var D = C ? e.value() : e,
										R = x ? t.value() : t;
									return o || (o = new Ce()), n(D, R, r, s, o);
								}
							}
							return (
								!!O &&
								(o || (o = new Ce()),
								(function (e, t, n, r, i, s) {
									var o = i & a,
										u = at(e),
										l = u.length;
									if (l != at(t).length && !o) return !1;
									for (var c = l; c--; ) {
										var d = u[c];
										if (!(o ? d in t : te.call(t, d))) return !1;
									}
									var p = s.get(e);
									if (p && s.get(t)) return p == t;
									var h = !0;
									s.set(e, t), s.set(t, e);
									for (var f = o; ++c < l; ) {
										var m = e[(d = u[c])],
											_ = t[d];
										if (r)
											var v = o
												? r(_, m, d, t, e, s)
												: r(m, _, d, e, t, s);
										if (
											!(void 0 === v
												? m === _ || n(m, _, r, i, s)
												: v)
										) {
											h = !1;
											break;
										}
										f || (f = 'constructor' == d);
									}
									if (h && !f) {
										var g = e.constructor,
											y = t.constructor;
										g == y ||
											!('constructor' in e) ||
											!('constructor' in t) ||
											('function' == typeof g &&
												g instanceof g &&
												'function' == typeof y &&
												y instanceof y) ||
											(h = !1);
									}
									return s.delete(e), s.delete(t), h;
								})(e, t, n, r, s, o))
							);
					  })(e, t, Pe, n, r, s))
			);
		}
		function Le(e) {
			return We(e) ? e : Ke(e);
		}
		function Ue(e, t, n, r, s, o) {
			var u = s & a,
				l = e.length,
				c = t.length;
			if (l != c && !(u && c > l)) return !1;
			var d = o.get(e);
			if (d && o.get(t)) return d == t;
			var p = -1,
				h = !0,
				f = s & i ? new Oe() : void 0;
			for (o.set(e, t), o.set(t, e); ++p < l; ) {
				var m = e[p],
					_ = t[p];
				if (r) var v = u ? r(_, m, p, t, e, o) : r(m, _, p, e, t, o);
				if (void 0 !== v) {
					if (v) continue;
					h = !1;
					break;
				}
				if (f) {
					if (
						!H(t, function (e, t) {
							if (!f.has(t) && (m === e || n(m, e, r, s, o)))
								return f.add(t);
						})
					) {
						h = !1;
						break;
					}
				} else if (m !== _ && !n(m, _, r, s, o)) {
					h = !1;
					break;
				}
			}
			return o.delete(e), o.delete(t), h;
		}
		function Me(e, t) {
			var n,
				r,
				i = e.__data__;
			return (
				'string' == (r = typeof (n = t)) ||
				'number' == r ||
				'symbol' == r ||
				'boolean' == r
					? '__proto__' !== n
					: null === n
			)
				? i['string' == typeof t ? 'string' : 'hash']
				: i.map;
		}
		function Ze(e, t) {
			var n = (function (e, t) {
				return null == e ? void 0 : e[t];
			})(e, t);
			return (function (e) {
				return (
					!(!et(e) || ((t = e), Q && Q in t)) &&
					(Je(e) || K(e) ? re : D).test(qe(e))
				);
				var t;
			})(n)
				? n
				: void 0;
		}
		var je = function (e) {
			return ne.call(e);
		};
		function Be(e, t) {
			return (
				!!(t = null == t ? o : t) &&
				('number' == typeof e || R.test(e)) &&
				e > -1 &&
				e % 1 == 0 &&
				e < t
			);
		}
		function Ge(e, t) {
			if (We(e)) return !1;
			var n = typeof e;
			return (
				!(
					'number' != n &&
					'symbol' != n &&
					'boolean' != n &&
					null != e &&
					!nt(e)
				) ||
				S.test(e) ||
				!I.test(e) ||
				(null != t && e in Object(t))
			);
		}
		function Ve(e) {
			return e == e && !et(e);
		}
		function He(e, t) {
			return function (n) {
				return null != n && n[e] === t && (void 0 !== t || e in Object(n));
			};
		}
		((de && je(new de(new ArrayBuffer(1))) != A) ||
			(pe && je(new pe()) != m) ||
			(he && je(he.resolve()) != g) ||
			(fe && je(new fe()) != E) ||
			(me && je(new me()) != N)) &&
			(je = function (e) {
				var t = ne.call(e),
					n = t == v ? e.constructor : void 0,
					r = n ? qe(n) : void 0;
				if (r)
					switch (r) {
						case ve:
							return A;
						case ge:
							return m;
						case ye:
							return g;
						case Ee:
							return E;
						case be:
							return N;
					}
				return t;
			});
		var Ke = $e(function (e) {
			var t;
			e =
				null == (t = e)
					? ''
					: (function (e) {
							if ('string' == typeof e) return e;
							if (nt(e)) return we ? we.call(e) : '';
							var t = e + '';
							return '0' == t && 1 / e == -s ? '-0' : t;
					  })(t);
			var n = [];
			return (
				O.test(e) && n.push(''),
				e.replace(C, function (e, t, r, i) {
					n.push(r ? i.replace(x, '$1') : t || e);
				}),
				n
			);
		});
		function Fe(e) {
			if ('string' == typeof e || nt(e)) return e;
			var t = e + '';
			return '0' == t && 1 / e == -s ? '-0' : t;
		}
		function qe(e) {
			if (null != e) {
				try {
					return ee.call(e);
				} catch (e) {}
				try {
					return e + '';
				} catch (e) {}
			}
			return '';
		}
		function $e(e, t) {
			if ('function' != typeof e || (t && 'function' != typeof t))
				throw new TypeError('Expected a function');
			var n = function () {
				var r = arguments,
					i = t ? t.apply(this, r) : r[0],
					a = n.cache;
				if (a.has(i)) return a.get(i);
				var s = e.apply(this, r);
				return (n.cache = a.set(i, s)), s;
			};
			return (n.cache = new ($e.Cache || Se)()), n;
		}
		function Ye(e, t) {
			return e === t || (e != e && t != t);
		}
		function ze(e) {
			return (
				(function (e) {
					return tt(e) && Xe(e);
				})(e) &&
				te.call(e, 'callee') &&
				(!ue.call(e, 'callee') || ne.call(e) == u)
			);
		}
		$e.Cache = Se;
		var We = Array.isArray;
		function Xe(e) {
			return null != e && Qe(e.length) && !Je(e);
		}
		function Je(e) {
			var t = et(e) ? ne.call(e) : '';
			return t == h || t == f;
		}
		function Qe(e) {
			return 'number' == typeof e && e > -1 && e % 1 == 0 && e <= o;
		}
		function et(e) {
			var t = typeof e;
			return !!e && ('object' == t || 'function' == t);
		}
		function tt(e) {
			return !!e && 'object' == typeof e;
		}
		function nt(e) {
			return 'symbol' == typeof e || (tt(e) && ne.call(e) == T);
		}
		var rt,
			it = G
				? ((rt = G),
				  function (e) {
						return rt(e);
				  })
				: function (e) {
						return tt(e) && Qe(e.length) && !!k[ne.call(e)];
				  };
		function at(e) {
			return Xe(e)
				? (function (e, t) {
						var n =
								We(e) || ze(e)
									? (function (e, t) {
											for (var n = -1, r = Array(e); ++n < e; )
												r[n] = t(n);
											return r;
									  })(e.length, String)
									: [],
							r = n.length,
							i = !!r;
						for (var a in e)
							(!t && !te.call(e, a)) ||
								(i && ('length' == a || Be(a, r))) ||
								n.push(a);
						return n;
				  })(e)
				: (function (e) {
						if (
							((n = (t = e) && t.constructor),
							t !== (('function' == typeof n && n.prototype) || X))
						)
							return ce(e);
						var t,
							n,
							r = [];
						for (var i in Object(e))
							te.call(e, i) && 'constructor' != i && r.push(i);
						return r;
				  })(e);
		}
		function st(e) {
			return e;
		}
		e.exports = function (e, t, n) {
			var r,
				s,
				o,
				u,
				l,
				c,
				d = We(e) || it(e);
			if (
				((t =
					'function' == typeof (s = t)
						? s
						: null == s
						? st
						: 'object' == typeof s
						? We(s)
							? (function (e, t) {
									return Ge(e) && Ve(t)
										? He(Fe(e), t)
										: function (n) {
												var r = (function (e, t, n) {
													var r = null == e ? void 0 : Re(e, t);
													return void 0 === r ? void 0 : r;
												})(n, e);
												return void 0 === r && r === t
													? (function (e, t) {
															return (
																null != e &&
																(function (e, t, n) {
																	for (
																		var r,
																			i = -1,
																			a = (t = Ge(
																				t,
																				e
																			)
																				? [t]
																				: Le(t))
																				.length;
																		++i < a;

																	) {
																		var s = Fe(t[i]);
																		if (
																			!(r =
																				null !=
																					e &&
																				n(e, s))
																		)
																			break;
																		e = e[s];
																	}
																	return (
																		r ||
																		(!!(a = e
																			? e.length
																			: 0) &&
																			Qe(a) &&
																			Be(s, a) &&
																			(We(e) ||
																				ze(e)))
																	);
																})(e, t, ke)
															);
													  })(n, e)
													: Pe(t, r, void 0, i | a);
										  };
							  })(s[0], s[1])
							: ((u = (function (e) {
									for (var t = at(e), n = t.length; n--; ) {
										var r = t[n],
											i = e[r];
										t[n] = [r, i, Ve(i)];
									}
									return t;
							  })((o = s))),
							  1 == u.length && u[0][2]
									? He(u[0][0], u[0][1])
									: function (e) {
											return (
												e === o ||
												(function (e, t, n, r) {
													var s = n.length,
														o = s;
													if (null == e) return !o;
													for (e = Object(e); s--; ) {
														var u = n[s];
														if (
															u[2]
																? u[1] !== e[u[0]]
																: !(u[0] in e)
														)
															return !1;
													}
													for (; ++s < o; ) {
														var l = (u = n[s])[0],
															c = e[l],
															d = u[1];
														if (u[2]) {
															if (void 0 === c && !(l in e))
																return !1;
														} else {
															var p,
																h = new Ce();
															if (
																!(void 0 === p
																	? Pe(
																			d,
																			c,
																			r,
																			i | a,
																			h
																	  )
																	: p)
															)
																return !1;
														}
													}
													return !0;
												})(e, 0, u)
											);
									  })
						: Ge((l = s))
						? ((c = Fe(l)),
						  function (e) {
								return null == e ? void 0 : e[c];
						  })
						: (function (e) {
								return function (t) {
									return Re(t, e);
								};
						  })(l)),
				null == n)
			)
				if (d || et(e)) {
					var p = e.constructor;
					n = d
						? We(e)
							? new p()
							: []
						: Je(p) && et((r = se(e)))
						? oe(r)
						: {};
				} else n = {};
			return (
				(d ? V : De)(e, function (e, r, i) {
					return t(n, e, r, i);
				}),
				n
			);
		};
	})(wi, wi.exports),
		'function' == typeof SuppressedError && SuppressedError;
	const { Ts: Ai } = t,
		Ii = '1238711061784559677',
		Si = new (class {
			getTransfer(e) {
				var t;
				switch (e.cmd) {
					case Qt.SUBSCRIBE:
					case Qt.UNSUBSCRIBE:
						return;
					default:
						return null !== (t = e.transfer) && void 0 !== t ? t : void 0;
				}
			}
			constructor(e, t) {
				var n;
				if (
					((this.source = null),
					(this.sourceOrigin = ''),
					(this.eventBus = new o()),
					(this.pendingCommands = new Map()),
					(this.sendCommand = (e) => {
						var t;
						if (null == this.source)
							throw new Error(
								'Attempting to send message before initialization'
							);
						const n = Fr();
						return (
							null === (t = this.source) ||
								void 0 === t ||
								t.postMessage(
									[
										Vr.FRAME,
										Object.assign(Object.assign({}, e), { nonce: n }),
									],
									this.sourceOrigin,
									this.getTransfer(e)
								),
							new Promise((e, t) => {
								this.pendingCommands.set(n, { resolve: e, reject: t });
							})
						);
					}),
					(this.commands =
						((n = this.sendCommand),
						{
							authenticate: _r(n),
							authorize: vr(n),
							captureLog: gr(n),
							encourageHardwareAcceleration: yr(n),
							getChannel: Pr(n),
							getChannelPermissions: Tr(n),
							getEntitlements: Er(n),
							getPlatformBehaviors: Nr(n),
							getSkus: br(n),
							openExternalLink: wr(n),
							openInviteDialog: Ar(n),
							openShareMomentDialog: Ir(n),
							setActivity: Sr(n),
							setConfig: Or(n),
							setOrientationLockState: xr(n),
							startPurchase: Dr(n),
							userSettingsGetLocale: Rr(n),
							initiateImageUpload: kr(n),
							getInstanceConnectedParticipants: Lr(n),
						})),
					(this.handleMessage = (e) => {
						if (!qr.has(e.origin)) return;
						const t = e.data;
						if (!Array.isArray(t)) return;
						const [n, r] = t;
						switch (n) {
							case Vr.HELLO:
								return;
							case Vr.CLOSE:
								return this.handleClose(r);
							case Vr.HANDSHAKE:
								return this.handleHandshake();
							case Vr.FRAME:
								return this.handleFrame(r);
							default:
								throw new Error('Invalid message format');
						}
					}),
					(this.isReady = !1),
					(this.clientId = e),
					(this.configuration =
						null != t ? t : { disableConsoleLogOverride: !1 }),
					'undefined' != typeof window &&
						window.addEventListener('message', this.handleMessage),
					'undefined' == typeof window)
				)
					return (
						(this.frameId = ''),
						(this.instanceId = ''),
						(this.platform = jt.DESKTOP),
						(this.guildId = null),
						void (this.channelId = null)
					);
				const r = new URLSearchParams(this._getSearch()),
					i = r.get('frame_id');
				if (!i) throw new Error('frame_id query param is not defined');
				this.frameId = i;
				const a = r.get('instance_id');
				if (!a) throw new Error('instance_id query param is not defined');
				this.instanceId = a;
				const s = r.get('platform');
				if (!s) throw new Error('platform query param is not defined');
				if (s !== jt.DESKTOP && s !== jt.MOBILE)
					throw new Error(
						`Invalid query param "platform" of "${s}". Valid values are "${jt.DESKTOP}" or "${jt.MOBILE}"`
					);
				var u;
				(this.platform = s),
					(this.guildId = r.get('guild_id')),
					(this.channelId = r.get('channel_id')),
					([this.source, this.sourceOrigin] = [
						null !== (u = window.parent.opener) && void 0 !== u
							? u
							: window.parent,
						document.referrer ? document.referrer : '*',
					]),
					this.addOnReadyListener(),
					this.handshake();
			}
			close(e, t) {
				var n;
				window.removeEventListener('message', this.handleMessage);
				const r = Fr();
				null === (n = this.source) ||
					void 0 === n ||
					n.postMessage(
						[Vr.CLOSE, { code: e, message: t, nonce: r }],
						this.sourceOrigin
					);
			}
			async subscribe(e, t, ...n) {
				const [r] = n,
					i = this.eventBus.listenerCount(e),
					a = this.eventBus.on(e, t);
				return (
					Object.values(jn).includes(e) &&
						e !== jn.READY &&
						0 === i &&
						(await this.sendCommand({ cmd: Qt.SUBSCRIBE, args: r, evt: e })),
					a
				);
			}
			async unsubscribe(e, t, ...n) {
				const [r] = n;
				return (
					e !== jn.READY &&
						1 === this.eventBus.listenerCount(e) &&
						(await this.sendCommand({
							cmd: Qt.UNSUBSCRIBE,
							evt: e,
							args: r,
						})),
					this.eventBus.off(e, t)
				);
			}
			async ready() {
				this.isReady ||
					(await new Promise((e) => {
						this.eventBus.once(jn.READY, e);
					}));
			}
			handshake() {
				var e;
				null === (e = this.source) ||
					void 0 === e ||
					e.postMessage(
						[
							Vr.HANDSHAKE,
							{
								v: 1,
								encoding: 'json',
								client_id: this.clientId,
								frame_id: this.frameId,
							},
						],
						this.sourceOrigin
					);
			}
			addOnReadyListener() {
				this.eventBus.once(jn.READY, () => {
					this.overrideConsoleLogging(), (this.isReady = !0);
				});
			}
			overrideConsoleLogging() {
				if (this.configuration.disableConsoleLogOverride) return;
				const e = (e, t) => {
					this.commands.captureLog({ level: e, message: t });
				};
				Mr.forEach((t) => {
					!(function (e, t, n) {
						const r = e[t],
							i = e;
						r &&
							(e[t] = function () {
								const e = [].slice.call(arguments),
									a = '' + e.join(' ');
								n(t, a), r.apply(i, e);
							});
					})(console, t, e);
				});
			}
			handleClose(e) {
				pr.parse(e);
			}
			handleHandshake() {}
			handleFrame(e) {
				var t, n;
				let r;
				try {
					r = (function (e) {
						const t = hr.parse(e);
						return null != t.evt
							? t.evt === Zn
								? Gn.parse(t)
								: (function (e) {
										const t = e.evt;
										if (!(t in jn))
											throw new Error(
												`Unrecognized event type ${e.evt}`
											);
										return Kn[t].payload.parse(e);
								  })(Hn.parse(t))
							: (function (e) {
									return Object.assign(Object.assign({}, e), {
										data: dr(e),
									});
							  })(cr.passthrough().parse(t));
					})(e);
				} catch (t) {
					return console.error('Failed to parse', e), void console.error(t);
				}
				if ('DISPATCH' === r.cmd) this.eventBus.emit(r.evt, r.data);
				else {
					if (r.evt === Zn) {
						if (null != r.nonce)
							return (
								null === (t = this.pendingCommands.get(r.nonce)) ||
									void 0 === t ||
									t.reject(r.data),
								void this.pendingCommands.delete(r.nonce)
							);
						this.eventBus.emit('error', new Ur(r.data.code, r.data.message));
					}
					if (null == r.nonce) return void console.error('Missing nonce', e);
					null === (n = this.pendingCommands.get(r.nonce)) ||
						void 0 === n ||
						n.resolve(r),
						this.pendingCommands.delete(r.nonce);
				}
			}
			_getSearch() {
				return 'undefined' == typeof window ? '' : window.location.search;
			}
		})(Ii);
	(async () => {
		try {
			let e = await (async function () {
				let e = null;
				console.log('DiscordSDK is setting up'),
					await Si.ready(),
					console.log('DiscordSDK is ready');
				const { code: t } = await Si.commands.authorize({
					client_id: Ii,
					response_type: 'code',
					state: '',
					prompt: 'none',
					scope: ['identify', 'guilds'],
				});
				console.log('Authorization is successful');
				const n = await fetch('/api/token', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ code: t }),
				});
				console.log('Token is fetched');
				const { access_token: r } = await n.json();
				if (
					((e = await Si.commands.authenticate({ access_token: r })),
					console.log('Authentication is successful'),
					null == e)
				)
					throw new Error('Authenticate command failed');
				return e;
			})();
			console.log('DiscordSDK is set up');
			const t = await Si.commands.getChannel({ channel_id: Si.channelId });
			document.getElementById('channel-name').innerText = t.name;
			const n = await fetch('https://discord.com/api/v10/users/@me/guilds', {
					headers: {
						Authorization: `Bearer ${e.access_token}`,
						'Content-Type': 'application/json',
					},
				}),
				r = (await n.json()).find((e) => e.id === Si.guildId),
				i = document.createElement('img');
			i.setAttribute(
				'src',
				`https://cdn.discordapp.com/icons/${r.id}/${r.icon}.webp?size=128`
			),
				document.getElementById('guild-icon').appendChild(i);
		} catch (e) {
			console.error(e);
		}
	})();
})();
