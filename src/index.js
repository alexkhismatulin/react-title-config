/* global window document */
import React from 'react';
import PropTypes from 'prop-types';

import {
  match,
  getTitle,
  getDefaultDescriptor,
} from './utils';

const TitleConfig = (props) => {
  const { config, defaultTitle, prefix, ...extras } = props;

  if (!Array.isArray(config)) {
    throw new Error('react-title-config: config is not an Array!');
  }

  const { location } = window;

  const params = {
    hash: location.hash,
    href: location.href,
    search: location.search,
    pathname: location.pathname,
  };

  const descriptor = match(config, params) || getDefaultDescriptor(defaultTitle);

  if (descriptor) {
    const title = getTitle(descriptor, params, extras);
    document.title = (title && !descriptor.skipPrefix && !descriptor.default) ? prefix + title : title;
  }

  return null;
};

TitleConfig.defaultProps = {
  prefix: '',
  defaultTitle: '',
};

TitleConfig.propTypes = {
  prefix: PropTypes.string,
  defaultTitle: PropTypes.string,
  config: PropTypes.arrayOf(PropTypes.shape({
    exact: PropTypes.bool,
    skipPrefix: PropTypes.bool,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    path: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.instanceOf(RegExp),
      PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.instanceOf(RegExp)])),
    ]).isRequired,
  })).isRequired,
};

export default TitleConfig;
