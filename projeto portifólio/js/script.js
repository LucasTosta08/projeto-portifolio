document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('cadastroForm');
    const cadastroSection = document.getElementById('cadastroSection');
    const perfilSection = document.getElementById('perfilSection');
    const perfilDadosDiv = document.getElementById('perfilDados');
    const editarCadastroButton = document.getElementById('editarCadastro');

    // Mapa de nomes de campos (para exibição mais amigável)
    const nomeCampos = {
        nome: 'Nome Completo',
        email: 'E-mail',
        senha: 'Senha', // Não será exibido
        confirmarSenha: 'Confirmar Senha', // Não será exibido
        areaAtuacao: 'Área de Atuação',
        linkedin: 'LinkedIn',
        portfolio: 'Portfólio',
        github: "Github"
    };


    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Validação (certifique-se de que as senhas coincidem)
        const senha = document.getElementById('senha').value;
        const confirmarSenha = document.getElementById('confirmarSenha').value;
        if (senha !== confirmarSenha) {
            alert('As senhas não coincidem!');
            return;
        }

        const formData = new FormData(form);

        // --- Exibição do Perfil ---
        cadastroSection.style.display = 'none'; // Oculta o formulário
        perfilSection.style.display = 'block';  // Exibe a seção de perfil

        perfilDadosDiv.innerHTML = ''; // Limpa conteúdo anterior

        // Itera sobre os dados e adiciona ao perfil
        for (const [key, value] of formData.entries()) {
            // Não exibe senhas!
            if (key !== 'senha' && key !== 'confirmarSenha' && value.trim() !== "") {
                const p = document.createElement('p');
                //Usa o nome amigável, ou o 'name' do input se não houver
                p.innerHTML = `<strong>${nomeCampos[key] || key}:</strong> ${value}`;
                perfilDadosDiv.appendChild(p);
            }
        }

        // --- SIMULAÇÃO (Remover na versão final com backend) ---
        console.log('Dados do formulário (simulação):', Object.fromEntries(formData));
        // alert('Cadastro realizado com sucesso! (Simulação)'); //Removi o alert

        // --- (Código para Fetch API - comentado, para backend real) ---
        /*
        fetch('/api/cadastrar', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log('Sucesso:', data);
            // Aqui você lidaria com a resposta do servidor
            // Ex: redirecionar para página de perfil, exibir mensagem de sucesso, etc.
            // form.reset(); //NÃO resetar o form se for usar o Fetch
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao cadastrar. Tente novamente.');
        });
        */
    });

    editarCadastroButton.addEventListener('click', function() {
        perfilSection.style.display = 'none'; // Ocultar seção do perfil
        cadastroSection.style.display = 'block'; // Mostrar formulário
        form.reset(); //Resetar os campos
    });
});