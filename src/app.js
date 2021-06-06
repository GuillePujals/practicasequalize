const express = require('express');
const path = require('path');

const indexRouter = require('./routes/index');

const moviesRoutes = require('./routes/moviesRoutes');
const genresRoutes = require('./routes/genresRoutes');
const app = express();

//Para que llegue la información por body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// view engine setup
app.set('views', path.resolve(__dirname, './views'));
app.set('view engine', 'ejs');

//Para usar métodos put y delete
const methodOverride = require ('method-override');
app.use (methodOverride ('_method'));

app.use(express.static(path.resolve(__dirname, '../public')));

app.use('/', indexRouter);
app.use('/movies',moviesRoutes);
app.use(genresRoutes);

app.listen('3001', () => console.log('Servidor corriendo en el puerto 3001'));
