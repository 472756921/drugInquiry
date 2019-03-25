'use strict';
module.exports = app => {


    app.messenger.once('all_ready', data => {
        console.log(data);
    });


    app.messenger.on('spider', data => {
    });
};