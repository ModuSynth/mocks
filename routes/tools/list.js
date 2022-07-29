const tools = require("../../configuration/tools.json");

module.exports = {
    list(_request, response) {
        const results = {};
        Object.keys(tools).forEach(name => {
            const tool = tools[name];
            if (!(tool.category in results)) {
                results[tool.category] = [];
            }
            results[tool.category].push(name)
        });
        response.jsonp(results);
    }
}