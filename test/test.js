import test from 'ava';
import rq from 'request-promise';
import util from './../src/util/util';

test.skip('json', async t => {
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

test('timeReg', async t => {
  try {
    const timeStr = '2017-03-29 11:56:05【懂球号】- 绿茵抒情诗';
    const result = util.formatTime(timeStr);
    console.log('result--->', result);
    const time = new Date(result).toISOString();
    console.log('time----->', time);
  } catch (err) {
    console.log(err);
    t.falsy(false);
  }
});
