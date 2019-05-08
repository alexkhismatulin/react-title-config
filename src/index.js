/* global document */
import React from 'react';
import PropTypes from 'prop-types';

import {
  match,
  getTitle,
  getDefaultDescriptor,
} from './utils';

const TitleConfig = (props) => {
  const {
    config, defaultTitle, prefix, ...extras
  } = props;
  const descriptor = match(config) || getDefaultDescriptor(defaultTitle);

  if (descriptor) {
    const title = getTitle(descriptor, extras);
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
