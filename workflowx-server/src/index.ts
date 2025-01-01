import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import projectRouter from './routes/project.routes';
import taskRouter from './routes/task.routes';
import searchRouter from './routes/search.routes';
import userRouter from './routes/user.routes';
import teamRouter from './routes/teams.routes';


dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/api/projects', projectRouter);
app.use('/api/tasks', taskRouter);
app.use('/api/search', searchRouter);
app.use('/api/users', userRouter);
app.use('/api/teams', teamRouter);

const port = Number(process.env.PORT) || 5001;


app.listen(port, "0.0.0.0", () => {
    console.log(`Server is running on port ${port}`);
});