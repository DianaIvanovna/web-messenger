const {JSDOM} = require('jsdom')

const {window} = new JSDOM('<div id="app"><div class="root"></div></div>', {
    urk: "http://localhost:3000"
});

global.window = window;
global.document = window.document;


require.extensions['.scss'] = function() {
    module.exports = () =>({})
}
require.extensions['.png'] = function(){ return null; }
