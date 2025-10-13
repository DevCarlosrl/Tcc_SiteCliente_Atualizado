        $(document).ready(function(){
            $('#phone').mask('(00) 00000-0000');
            $('#cpf').mask('000.000.000-00');
        });

        function togglePasswordVisibility() {
            const passwordField = document.getElementById('senha');
            const toggleIcon = document.getElementById('toggle-password');
            if (passwordField.type === 'password') {
                passwordField.type = 'text';
                toggleIcon.textContent = '👁️';
            } else {
                passwordField.type = 'password';
                toggleIcon.textContent = '😑';
            }
        }