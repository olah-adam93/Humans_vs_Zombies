const fs = require('fs');

// Load environment variables from .env file
require('dotenv').config({ path: 'src/environments/.env' });

// Configuration for development environment
const developmentConfig = {
  GAME_URL: 'http://localhost:5000/api/game',
  GOOGLE_MAPS_API_KEY: process.env['GOOGLE_MAPS_API_KEY'],
  production: false,
};

// Configuration for production environment
const productionConfig = {
  ...developmentConfig,
  production: true,
};

// File paths for environment files
const targetPathDev = './src/environments/environment.ts';
const targetPathProd = './src/environments/environment.prod.ts';

// Write environment configuration to files
writeEnvironmentConfig(targetPathDev, developmentConfig, 'development');
writeEnvironmentConfig(targetPathProd, productionConfig, 'production');

/**
 * Writes environment configuration to the specified file.
 * @param {string} filePath - Path to the target file.
 * @param {object} config - Environment configuration object.
 * @param {string} environment - Name of the environment (e.g., 'development', 'production').
 */
function writeEnvironmentConfig(
  filePath: string,
  config: {},
  environment: string
) {
  const fileContent = generateEnvironmentFileContent(config);
  fs.writeFile(filePath, fileContent, (err: any) => {
    if (err) {
      console.error(`Error writing ${environment} environment file: ${err}`);
    } else {
      console.log(
        `Angular environment.${environment}.ts file generated correctly at ${filePath}`
      );
    }
  });
}

/**
 * Generates the content for the environment file.
 * @param {object} config - Environment configuration object.
 * @returns {string} - Content of the environment file.
 */
function generateEnvironmentFileContent(config: any) {
  return `export const environment = {\n${formatObject(config)}\n};\n`;
}

/**
 * Formats an object as a string representation.
 * @param {object} obj - Object to be formatted.
 * @returns {string} - String representation of the object.
 */
function formatObject(obj: { [x: string]: any }) {
  return Object.keys(obj)
    .map((key) => `  ${key}: ${formatValue(obj[key])}`)
    .join(',\n');
}

/**
 * Formats a value as a string representation.
 * @param {*} value - Value to be formatted.
 * @returns {string} - String representation of the value.
 */
function formatValue(value: any) {
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
}
