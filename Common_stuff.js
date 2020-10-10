Object.defineProperties(Object.prototype, {
  log: {
    value() {
      if ("toConsole" in this) {
        this.toConsole();
      } else if (this instanceof Function) {
        console.log(this(...arguments));
      } else {
        console.log(this.valueOf());
      }
    },
  },
  getPrimitiveWrapper: {
    value() {
      return this;
    },
  },
  isObject: {
    get() {
      return Object.prototype.toString.call(this).slice(8, -1) === "Object";
    },
  },
  deepClone: {
    value() {
      const container = new Map();
      const clone = makeClone(this);
      container.clear();
      return clone;

      function makeClone(obj) {
        if (!obj.isObject) {
          return obj.valueOf();
        }

        if (Array.isArray(obj)) {
          const clone = [];
          container.set(obj, clone);

          return obj.reduce(
            (res, item) => [...res, container.get(item) ?? makeClone(item)],
            clone
          );
        } else {
          const clone = {};
          container.set(obj, clone);

          return Object.entries(obj).reduce(
            (res, [key, val]) => ({
              ...res,
              [key]: container.get(val) ?? makeClone(val),
            }),
            clone
          );
        }
      }
    },
  },
});

function flat(arr) {
  if (arr instanceof Array === false) {
    return [arr];
  }
  return arr.reduce((acc, item) => [...acc, ...flat(item)], []);
}
