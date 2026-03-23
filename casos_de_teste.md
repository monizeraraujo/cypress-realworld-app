CASOS DE TESTE - REAL WORLD APP

Caso de Teste 1.0: Login com Sucesso

Título: Realizar o login com credenciais válidas.
Pré-condição: Estar na tela de login(http://localhost:3000/signin) e inserir usuário já cadastrado.
Passos:
Inserir um usuário válido encontrado em yarn list:dev:users no campo "Username" (Elda_Ankunding92)
Inserir a senha padrão "s3cret" no campo "Password".
Clicar no botão "Sign In".
Resultado Esperado: O sistema deve autenticar o usuário e redirecionar para a página inicial exibindo informações da conta como nome do usuário, saldo, menu lateral e feed de atividades.



Caso de Teste 2.0: Login com credenciais inválidas. 

Título: Validar mensagens de erro ao tentar login com dados incorretos. 
Pré-condição: Estar na tela de login(http://localhost:3000/signin).
Passos:
Inserir um usuário inválido no campo "Username".
Inserir a senha padrão "s3cret" no campo "Password".
Clicar no botão "Sign In".
Inserir um usuário válido no campo "Username" (Elda_Ankunding92)
Inserir uma senha incorreta no campo "Password" (senha123)
Clicar no botão "Sign In". 
Resultado Esperado: Espera-se que após o clique no botão a página exiba a mensagem de erro "Username or password is invalid".



Caso de Teste 3.0: Registro de novo usuário com sucesso. 

Título: Validar cadastro do usuário preenchendo todas as informações solicitadas.
Pré-condição: Estar na tela de Sign Up (http://localhost:3000/signup)
Passos:
Inserir um dado no campo "Firstname".
Inserir um dado no campo "Lastname".
Inserir um dado no campo "Username". 
Inserir um dado no campo "Password" com pelo menos 4 caracteres.
Inserir um dado no campo "Confirm Password" que seja idêntico ao campo "Password".
Clicar no botão "Sign Up".
Resultado Esperado: Espera-se que após o clique no botão a página seja redirecionada para a página de login, e na página de login após o teste com as credenciais cadastradas, deve-se conseguir prosseguir para passos seguintes.



Caso de Teste 4.0: Registro de novo usuário com erro.

Título: Validar cadastro do usuário não preenchendo todas as informações solicitadas.
Pré-condição: Estar na tela de Sign Up (http://localhost:3000/signup)
Passos:
Inserir um dado no campo "Firstname".
Inserir um dado no campo "Lastname".
Não inserir um dado no campo "Username". 
Inserir um dado no campo "Password" com pelo menos 4 caracteres.
Inserir um dado no campo "Confirm Password" que seja idêntico ao campo "Password".
Clicar no botão "Sign Up".
Resultado Esperado: Espera-se que o usuário não consiga clicar no botão até que o dado "Username" seja preenchido, e é esperado que apareça a mensagem "Username is required" em baixo do campo que deve ser preenchido.