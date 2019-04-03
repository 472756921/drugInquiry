exports.createDrugRule = {
    name1: {
        required: true,
        type: 'string'
    },
    name2: {
        required: true,
        type: 'string'
    },
    name3: {
        required: true,
        type: 'string'
    },
    name4: {
        required: true,
        type: 'string'
    },
    factory: {
        required: true,
        type: 'string'
    },
    Indication: {
        required: true,
        type: 'string'
    },
    Dosage: {
        required: true,
        type: 'string'
    },
    Precautions: {
        required: true,
        type: 'string'
    },
    AdverseReactions: {
        required: true,
        type: 'string'
    },
    FormulationSpecification: {
        required: true,
        type: 'string'
    },
};

exports.MESSAGE_ACTION = {
    READY: 'egg-ready'
};