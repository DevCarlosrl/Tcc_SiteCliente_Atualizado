// servidor.js
// ... (imports existentes)
const passport = require('passport');
const passportSetup = require('./config/passport-setup'); // Importa a configuração

// ...

// Middlewares
app.use(cors());
app.use(express.json());
app.use(passport.initialize()); // Inicializa o Passport

// ... (conexão com o MongoDB)

// Usa as rotas de autenticação
app.use('/api/auth', authRoutes);

// ... (inicia o servidor)