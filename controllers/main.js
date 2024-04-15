const { getData, endpoints} = require('../AppModules/api');
const {staticFile} = require('../AppModules/http-utils')
const {config, makeRatingFile}= require('../AppModules/rating')

async function mainRouteController(res,publicUrl,extname) {
    const data = await getData(endpoints.games);
    console.log(data);

    await makeRatingFile(config.PATH_TO_RATING_FILE, data);


    res.statusCode = 200;
    staticFile(res,publicUrl,extname);
}


module.exports = mainRouteController;