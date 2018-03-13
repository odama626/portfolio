import * as express from 'express';

const app = express();

const quotes = [
  'With iteration comes perfection',
  'hello world',
  'Technology, like art, is a soaring exercise of the human imagination.',
  '─=≡Σ((((╯°□°）╯',
  'Do you code in your dreams?',
  'Why sleep when you can code?'
]

app.get('/', (req, res) => {
  res.send("You shouldn't be here.<br><br>  (ノಠ益ಠ)ノ彡┻━┻");
});

app.get('/quote', (req, res) => {
  res.send(quotes[Math.random()*quotes.length | 0]);
})


export default app;