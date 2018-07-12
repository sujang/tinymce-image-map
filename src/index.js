import plugin from "./plugin";

const polyfills = document.createElement('script');
polyfills.async = false;
polyfills.src = './polyfills.js';
document.head.appendChild(polyfills);

tinymce.PluginManager.add("tinymceImageMap", plugin);