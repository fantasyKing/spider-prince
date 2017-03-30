import test from 'ava';
import rq from 'request-promise';

test('json', async t => {
  const options = {
    method: 'GET',
    uri: 'http://www.dongqiudi.com/archives/1?page=0',
    json: true
  };
  try {
    const result = await rq(options);
    console.log('result', result);
    t.truthy(result);
  } catch (err) {
    t.falsy(err);
  }
});
