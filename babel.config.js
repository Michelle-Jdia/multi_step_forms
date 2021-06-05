const presets = [
    ['@babel/env', {
      targets: {
        edge: '17',
        ie: '11',
        firefox: '50',
        chrome: '64',
        safari: '11.1'
      },
  
      useBuiltIns: "entry"
    }]
  ];
  
  const plugins = [
    ["@babel/plugin-proposal-decorators",{"decoratorsBeforeExport":true}],
    ["@babel/plugin-proposal-class-properties"],
    ["@babel/transform-runtime"]];
return {
    presets,
    plugins
};