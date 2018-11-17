import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'cmbjstoggle',
  outputTargets:[
    {
      type: 'dist'
    },
    {
      type: 'www',
      serviceWorker: null
    }
  ],
};
