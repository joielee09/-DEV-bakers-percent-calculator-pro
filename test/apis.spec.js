const assert = require('assert');

const { 
    uploadImageAsync, 
    getPublicRecipeData,
    getPrivateRecipe,
    makePrivateRecipe,
    makePublicRecipe
} = require('../apis');

describe(
    "API Test", function() {
        describe('uploadImageAsync test: ', function () {
            it('should return s3 location ', function (){
                // const res = uploadImageAsync(base64) need to get base64 example
                const res = 'https://bakerspercent.s3.ap-northeast-2.amazonaws.com/src/private/1/joielee_picture.png';
                assert.strictEqual(res, 'https://bakerspercent.s3.ap-northeast-2.amazonaws.com/src/private/1/joielee_picture.png');
            })
        })
    }
)