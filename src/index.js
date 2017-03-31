import Spider from './spider_ctrl/spider';

async function main(period) {
  let timer = null;
  period = period || process.env.PERIOD || 2; // 默认两小时重复一次
  try {
    timer = setInterval(async () => {
      try {
        await Spider.scratch();
      } catch (err) {
        console.log('setInterval err is', err);
      }
    }, period * 1000 * 60 * 60);
  } catch (err) {
    console.log('main err is', err);
    clearInterval(timer);
  }
}

process.on('uncaughtException', err => {
  console.log('uncatchd exception =', err.message, err.stack);
  process.exit(0);
});

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
});

process.on('SIGINT', () => {
  console.log('spider exit');
  process.exit(0);
});

main();
