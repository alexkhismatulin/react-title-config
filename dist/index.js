'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

require('react');
var PropTypes = _interopDefault(require('prop-types'));

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* global window */
var matchPath = function matchPath(pathname, candidate, exact) {
  if (typeof candidate === 'string') {
    return exact === true ? candidate === pathname : pathname.slice(0, candidate.length) === candidate;
  }

  if (typeof candidate === 'function') {
    return matchPath(pathname, candidate(pathname));
  }

  if (candidate instanceof RegExp) {
    return candidate.test(pathname);
  }

  throw new Error('ReactTitleConfig: path must be one of type string, function, array or RegExp!');
};

var match = function match(config) {
  var pathname = window.location.pathname;


  return config.reduce(function (memo, descriptor) {
    if (memo) return memo;

    if (Array.isArray(descriptor.path)) {
      return descriptor.path.some(function (item) {
        return matchPath(pathname, item);
      }) ? descriptor : memo;
    }

    return matchPath(pathname, descriptor.path, descriptor.exact) ? descriptor : memo;
  }, null);
};

var getDefaultDescriptor = function getDefaultDescriptor(defaultTitle) {
  var title = defaultTitle || '';
  return { title: title, default: true };
};

var queryParamsFromUrl = function queryParamsFromUrl() {
  var items = window.location.search.slice(1).split('&');

  if (items.length) {
    return items.reduce(function (memo, item) {
      var _item$split = item.split('='),
          _item$split2 = _slicedToArray(_item$split, 2),
          name = _item$split2[0],
          value = _item$split2[1];

      return _extends({}, memo, _defineProperty({}, name, value === undefined ? true : value));
    }, {});
  }

  return {};
};

var getTitle = function getTitle(descriptor, extras) {
  if (typeof descriptor.title === 'string') {
    return descriptor.title;
  }

  if (typeof descriptor.title === 'function') {
    var params = {
      queryParams: queryParamsFromUrl()
    };

    return descriptor.title(params, descriptor, extras);
  }

  throw new Error('ReactTitleConfig: title for ' + descriptor.path + ' is neither a string or a function!');
};

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var TitleConfig = function TitleConfig(props) {
  var config = props.config,
      defaultTitle = props.defaultTitle,
      prefix = props.prefix,
      extras = _objectWithoutProperties(props, ['config', 'defaultTitle', 'prefix']);

  var descriptor = match(config) || getDefaultDescriptor(defaultTitle);

  if (descriptor) {
    var title = getTitle(descriptor, extras);
    document.title = title && !descriptor.skipPrefix && !descriptor.default ? prefix + title : title;
  }

  return null;
};

TitleConfig.defaultProps = {
  prefix: '',
  defaultTitle: ''
};

TitleConfig.propTypes = {
  prefix: PropTypes.string,
  defaultTitle: PropTypes.string,
  config: PropTypes.arrayOf(PropTypes.shape({
    exact: PropTypes.bool,
    skipPrefix: PropTypes.bool,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    path: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.instanceOf(RegExp), PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.instanceOf(RegExp)]))]).isRequired
  })).isRequired
};

module.exports = TitleConfig;
//# sourceMappingURL=index.js.map
