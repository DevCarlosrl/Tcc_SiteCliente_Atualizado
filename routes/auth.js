// routes/auth.js
// ... (imports existentes)
const passport = require('passport');

// ... (rotas de registrar e login com email/senha) ...

// ROTA INICIAL DE AUTENTICAÇÃO COM GOOGLE
// Quando o frontend chamar esta rota, o Passport redireciona para o Google
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email'] // O que estamos pedindo permissão para ver
}));

// ROTA DE CALLBACK (A URI de redirecionamento)
// O Google redireciona para cá após o usuário autorizar
router.get('/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
    // Neste ponto, o Passport já validou e encontrou/criou o usuário (req.user)

    // Agora, geramos o nosso próprio JWT para este usuário
    const payload = {
        user: {
            id: req.user.id,
        },
    };

    jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '5h' },
        (err, token) => {
            if (err) throw err;
            // Redireciona o usuário para uma página no frontend, enviando o token
            // Esta página será responsável por salvar o token e finalizar o login
            res.redirect(`http://localhost:3000/login-success?token=${token}`);
        }
    );
});

module.exports = router;