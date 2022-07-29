const tools = require("../../configuration/tools.json");
const uuid = require("uuid");
const _ = require("lodash");

function createPorts(numberOfPorts) {
    return _.fill(Array(numberOfPorts), 0).map((_v, k) => ({ id: uuid.v4(), index: k }));
}

module.exports = {
    /**
     * This route creates an empty node from a given type only, filling the blanks
     * with the default values for the corresponding tool.inputs, outputs, parameters
     * and dimensions depend on the tool the user is trying to create.
     * 
     * eg {"type": "OscillatorNode"}
     * 
     * To know the available types, please refer to the configuration/tools.json file.
     * The keys in the JSON object at the top-level are the available tools.
     */
    route(db) {
        return async(request, response) => {
            const tool = tools[request.body.type];
            const result = {
                id: request.body.id,
                x: request.body.x,
                y: request.body.y,
                type: request.body.type,
                inputs: createPorts(tool.inputs),
                outputs: createPorts(tool.outputs),
                height: tool.dimensions.height,
                width: tool.dimensions.width,
                params: tool.params.map(param => {
                    return {
                        name: param.name,
                        value: param.value,
                        inputs:createPorts(param.inputs),
                        type: param.type
                    };
                })
            }
            db.get("nodes").insert(result).value();
            await db.write();
            response.jsonp(result);
        }
    }
}