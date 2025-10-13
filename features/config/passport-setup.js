// config/passport-setup.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User'); // Importa seu modelo de usuário

passport.use(
    new GoogleStrategy({
        // Opções para a estratégia do Google
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/api/auth/google/callback' // A mesma URI de redirecionamento
    }, async (accessToken, refreshToken, profile, done) => {
        // Esta função é chamada após o Google nos retornar o perfil do usuário
        try {
            // Verifica se o usuário já existe no seu banco de dados
            let currentUser = await User.findOne({ email: profile.emails[0].value });

            if (currentUser) {
                // Se já existe, passa o usuário para a próxima etapa
                done(null, currentUser);
            } else {
                // Se não existe, cria um novo usuário no seu banco
                const newUser = await new User({
                    // Você pode adicionar mais campos se quiser (nome, foto, etc.)
                    // googleId: profile.id, 
                    email: profile.emails[0].value,
                    // Não temos senha, pois o login é via Google
                }).save();
                done(null, newUser);
            }
        } catch (error) {
            done(error, null);
        }
    })
);