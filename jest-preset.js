const { mixinJestConfig } = require('@bluelovers/jest-config');

/**
 * // @type { import('@jest/types').Config.InitialOptions }
 * @type { import('ts-jest').InitialOptionsTsJest }
 */
const jestConfig = mixinJestConfig({}, true, {
	file: __filename,
});

jestConfig.setupFilesAfterEnv.push("jest-extended/all");

module.exports = jestConfig;
