import express, { Application } from 'express';
import bodyParser from 'body-parser'
import cors from 'cors'
import foodRoutes from './routes/food';
import { errorHandler } from './middlewares';
import { setupSwagger } from './docs'

const app: Application = express();
const port: string | number = process.env.PORT || 5001

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/foods', foodRoutes);

app.get('/', (_, res) => {
    res.send({
        status: 'ok',
        message: 'Welcome to Wok & wakis food API'
    });
});

// Swagger docs
setupSwagger(app);

app.use(errorHandler);


app.listen(port, () => console.log(`Server running on port ${port}`))

export default app;