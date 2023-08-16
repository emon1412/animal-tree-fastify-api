/* eslint-disable */
module.exports = function (w) {
  return {
    autoDetect: true,
    files: [
      'src/*.ts',
      'src/libs/*.ts',
      'src/routeHandlers/*.ts',
      'src/dataAccessors/*.ts',
      'src/services/*.ts',
      'src/useCases/*.ts',
      'src/routes/*.ts',
      'src/schema/*.ts',
    ],
    tests: [
      'tests/unit/**/*.unit.ts', // unit tests only
    ],
    testFramework: 'jest',
    compilers: {
      '**/*.ts': w.compilers.typeScript({
        sourceMap: false, // must disable sourceMap
        module: 'commonjs',
      })
    },
    env: {
      type: 'node'
    }
  };
};