import * as express from 'express';
import * as Mailgun from 'mailgun-js';
import * as bodyParser from 'body-parser';
import * as sanitize from 'mongo-sanitize';

const mailgun = Mailgun({apiKey: ENV.MAILGUN_KEY, domain: ENV.DOMAIN});

const app = express();

app.use(bodyParser.json())

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
});

app.post('/contact', (req, res) => {
  const body = sanitize(req.body);
  const data = {
    from: "info@adamsparks.me",
    to: "wave@adamsparks.me",
    subject: "Email from Portfolio Site",
    text: (
`Name: ${body.name}
Email: ${body.email}
Comment: ${body.comment}
`
    )
  }
  mailgun.messages().send(data, (error, body) => {
    console.log(error, body);
    res.status(error? 500 : 200).json(body.message);
  });
})


export default app;