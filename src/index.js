const createDoc = require('./createDoc');
const express = require('express');

module.exports = (options) => {

  const router = express();

  router.use((req, res, next) => {
    createDoc(options, (err, api) => {
      if (err) {
        console.log(err.stack||err);
        res.sendStatus(500);
        return false
      }

      const parsedApi = {
        data: JSON.parse(api.data),
        project: JSON.parse(api.project)
      };

      res.locals.__apidoc = {
        parsedApi
      };

      next()

    })
  });

  router.use((req, res, next) => {
    const data = res.locals.__apidoc.parsedApi.data;
    // const slicedUrl = req.path.slice(router.mountpath.length+1);
    // console.log(router.mountpath);
    // console.log(slicedUrl);
    const found = data.find(item => item.url == req.path);
    if (!found) return res.sendStatus(404);

    try {
      res.json(
        JSON.parse(found.success.examples[0].content)
      );
    } catch(e){
      res.json({
        error: 'TARGET_API_HAS_NO_MOCK_DATA'
      })
    }

  });

  return router
};