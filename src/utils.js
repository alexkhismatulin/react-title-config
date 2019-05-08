/* global window */
const matchPath = (pathname, candidate, exact) => {
  if (typeof candidate === 'string') {
    return exact === true
      ? candidate === pathname
      : pathname.slice(0, candidate.length) === candidate;
  }

  if (typeof candidate === 'function') {
    return candidate(pathname);
  }

  if (candidate instanceof RegExp) {
    return candidate.test(pathname);
  }

  throw new Error('react-title-config: path must be one of type string, function, array or RegExp!');
};

export const match = (config, params) => {
  const { pathname } = params;

  return config.reduce((memo, descriptor) => {
    if (memo) return memo;

    if (Array.isArray(descriptor.path)) {
      return descriptor.path.some(item => matchPath(pathname, item)) ? descriptor : memo;
    }

    return matchPath(pathname, descriptor.path, descriptor.exact) ? descriptor : memo;
  }, null);
};

export const getDefaultDescriptor = (defaultTitle) => {
  const title = defaultTitle || '';
  return { title, default: true };
};

export const queryParamsFromSearch = (search) => {
  const items = search.slice(1).split('&');

  if (items.length) {
    return items.reduce((memo, item) => {
      const [name, value] = item.split('=');
      return { ...memo, [name]: value === undefined ? true : value };
    }, {});
  }

  return {};
};

export const getTitle = (descriptor, params, extras) => {
  if (typeof descriptor.title === 'string') {
    return descriptor.title;
  }

  if (typeof descriptor.title === 'function') {
    // eslint-disable-next-line
    params.queryParams = queryParamsFromSearch(params.search);
    return descriptor.title(params, descriptor, extras);
  }

  throw new Error(`react-title-config: title for ${descriptor.path} is neither a string or a function!`);
};
