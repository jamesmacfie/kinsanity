const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {},
      height: {
        header: 'var(--headerHeight)',
        body: 'calc(100vh - var(--headerHeight))',
      },
      margin: {
        negativeHeader: 'calc(-1 * var(--headerHeight))',
      },
      padding: {
        header: 'var(--headerHeight)',
      },
    },
  },
  plugins: [],
};
