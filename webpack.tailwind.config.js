/**
 * As our first step, we'll pull in the user's webpack.mix.js
 * file. Based on what the user requests in that file,
 * a generic config object will be constructed for us.
 */
let mix = require('./node_modules/laravel-mix/src/index');

let ComponentFactory = require('./node_modules/laravel-mix/src/components/ComponentFactory');

new ComponentFactory().installAll();

require('./webpack.tailwind.mix');

/**
 * Just in case the user needs to hook into this point
 * in the build process, we'll make an announcement.
 */

let Manifest = require('./node_modules/laravel-mix/src/Manifest');
Mix.dispatch('init', Mix);
Mix.manifest = new Manifest('tailwind-mix-manifest.json');

/**
 * Now that we know which build tasks are required by the
 * user, we can dynamically create a configuration object
 * for Webpack. And that's all there is to it. Simple!
 */

let WebpackConfig = require('./node_modules/laravel-mix/src/builder/WebpackConfig');

module.exports = new WebpackConfig().build();
