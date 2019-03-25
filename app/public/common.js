exports.createDrugRule = {
    name1: {
        required: true,
    },
    name2: {
        required: true,
    },
    factory: {
        required: true,
    },
    Indication: {
        required: true,
    },
    Dosage: {
        required: true,
    },
    Precautions: {
        required: true,
    },
    AdverseReactions: {
        required: true,
    },
    FormulationSpecification: {
        required: true,
    },
    AddDate: {
        required: true,
    },
    optiong: {
        required: true,
    },
};


const MESSAGE_ACTION = {
    READY: 'egg-ready'
}
module.exports = MESSAGE_ACTION;