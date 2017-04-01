import dev_common from './dev_common';
import prod_common from './prod_common';

const ENV = process.env.NODE_ENV || 'development';

let config = null;

if (ENV === 'production') {
  config = prod_common;
} else {
  config = dev_common;
}

export default config;
