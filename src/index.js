import Spider from './spider_ctrl/spider';

async function main() {
  try {
    await Spider.scratch();
  } catch (err) {
    console.log('main err is', err);
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
