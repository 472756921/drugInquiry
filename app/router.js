'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app;

    router.get('/', controller.home.index);
    router.get('/user/info', controller.user.info);

    // 爬虫
    router.get('/spider/getInfo', controller.spider.getInfo);

    // fda 管理
    router.get('/drug/fda', controller.drug.listFDA);
    router.put('/drug/fda', controller.drug.updateFDA);



    // 疾病管理
    router.get('/disease/list', controller.disease.list);
    router.put('/disease/put', controller.disease.update);
    router.post('/disease/add', controller.disease.add);
    router.delete('/disease/del', controller.disease.del);

    // 药品管理
    router.get('/drug/listAdmin', controller.drug.listAdmin);
    router.get('/drug/list', controller.drug.list);
    router.get('/drug/find', controller.drug.find);
    router.post('/drug/add', controller.drug.add);
    router.delete('/drug/del', controller.drug.del);
    router.put('/drug/put', controller.drug.update);

    // 用户管理
    router.get('/admin/list', controller.admin.list);

};