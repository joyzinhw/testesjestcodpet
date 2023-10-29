module.exports = {
  // ... outras configurações do Jest

  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/',
  ], // Se você tiver um arquivo de configuração, inclua-o aqui
  // ... outras configurações do Jest
};
