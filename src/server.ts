import App from './app';
import 'dotenv/config';

const PORT = process.env.PORT || 5000;
const app = new App();

app.start(PORT);
