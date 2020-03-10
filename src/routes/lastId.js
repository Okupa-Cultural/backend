const LastId = require('../models/lastId');

const getLastId = (module_name) => {
    const getLastId = new LastId();
    const { id } = getLastId.find({ module : module_name });

    return id || 0;
};

const setLastId = (module_name) => {
    const getLastId = new LastId();
    const { id } = getLastId.find({ module : module_name });
    if(module_name) {
        if(!id) {
            const newLastId = new LastId({ module : module_name , id : 0 });
            newLastId.save();
        } else {
            getLastId.update({module:module_name}, { $set:{ id : 1 + id }});
        }
    }
};

const idHandler = {
    getLastId: getLastId,
    setLastId: setLastId
};

module.exports = idHandler;