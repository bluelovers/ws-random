/**
 * Created by user on 2018/11/22/022.
 */
const random_extra_1 = require("random-extra");
function randomSumFloat(size, sum, min, max) {
    return random_extra_1.default.dfSumFloat(size, sum, min, max)();
}
randomSumFloat.create = random_extra_1.default.dfSumFloat;
randomSumFloat.randomSumFloat = randomSumFloat;
randomSumFloat.default = randomSumFloat;
module.exports = randomSumFloat;
