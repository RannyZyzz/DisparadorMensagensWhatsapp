 # Disparador de Mensagens Whatsapp
Este é um aplicativo móvel construído com Expo e React Native, utilizando TypeScript, que demonstra um fluxo de autenticação completo, incluindo login, primeiro acesso (registro), recuperação de senha e um painel com uma WebView que efetua o disparo das mensagens.

### Funcionalidades
* Tela de Login: Permite que usuários existentes façam login com seu email e senha.

* Primeiro Acesso (Registro):

    * Permite que novos usuários se registrem informando um email.

    * Simula o envio de um código de verificação para o email fornecido.

    * Permite a validação do código no aplicativo.

    * Permite que o usuário defina uma senha após a validação bem-sucedida.

* Recuperação de Senha: O fluxo de "Primeiro Acesso" é reutilizado para a recuperação de senha, permitindo que usuários que esqueceram sua senha redefinam-na após a verificação do código.

* Dashboard:

    * Exibe uma mensagem de boas-vindas com o email do usuário logado.

    * Contém uma WebView que carrega uma URL externa (https://n8n.rannyzyzz.com.br/webhook/f0cea945-1b5c-4e26-b53f-2fdd955a11f6).

    * Botão de "Sair" para realizar o logout.

* Armazenamento Local: Utiliza AsyncStorage para armazenar os dados do usuário (email e senha simuladamente "hasheada") localmente no dispositivo.

### Estrutura do Projeto
```
my-auth-app/
├── App.tsx             # Componente principal da aplicação e configuração de navegação
├── package.json        # Dependências e scripts do projeto
├── tsconfig.json       # Configurações do TypeScript
├── app.json            # Configurações do Expo
├── types/
│   └── types.ts        # Definições de tipos TypeScript (UserData)
├── utils/
│   └── auth.ts         # Funções de autenticação e gerenciamento de usuário (simuladas)
└── screens/
    ├── DashboardScreen.tsx   # Tela do painel com a WebView
    ├── FirstAccessScreen.tsx # Tela para registro e recuperação de senha
    └── LoginScreen.tsx       # Tela de login
```

### Configuração e Execução
Para configurar e executar este projeto em sua máquina local, siga os passos abaixo:

#### Pré-requisitos
* Node.js (versão LTS recomendada)

* npm ou Yarn

* Expo CLI (instalado globalmente: npm install -g expo-cli ou yarn global add expo-cli)

* Aplicativo Expo Go (no seu dispositivo móvel para testes mais fáceis)

#### Passos para a instalação
1. Instale as dependências:
```
npm install install
```

2. Inicie o servidor de desenvolvimento Expo:
```
npx expo start
```

* Isso abrirá o Metro Bundler no seu navegador e exibirá um código QR no terminal.

#### Executando no seu dispositivo
1. Abra o aplicativo Expo Go no seu smartphone.

2. Escaneie o código QR exibido no terminal ou no navegador.

3. O aplicativo será carregado no seu dispositivo.

4. Executando em um simulador/emulador
    * No Metro Bundler (terminal), pressione a para abrir um emulador Android ou i para abrir um simulador iOS (requer Xcode instalado para iOS).

### Como Usar o Aplicativo
#### Primeiro Acesso / Registro
1. Na tela de Login, clique em "Primeiro Acesso / Esqueceu a Senha?".

2. Insira um endereço de email e clique em "Enviar Código".

3. Um Alert será exibido com um código de 4 dígitos simulado (este código também será exibido no console do terminal).

4. Insira o código no campo "Código" e clique em "Validar Código".

5. Após a validação, você será levado à tela para definir sua Nova Senha e Confirmar Nova Senha.

6. Insira e confirme sua senha e clique em "Definir Senha". Você será redirecionado para a tela de Login.

#### Login
1. Na tela de Login, insira o email e a senha que você definiu no processo de Primeiro Acesso.

2. Clique em "Entrar".

3. Se as credenciais estiverem corretas, você será direcionado para o Dashboard.

#### Recuperar Senha
* O processo de recuperação de senha é idêntico ao de "Primeiro Acesso". Se você inserir um email que já possui uma senha registrada, o novo código permitirá que você sobrescreva a senha existente.

#### Dashboard
* Após o login, a tela do Dashboard exibirá o email do usuário logado e uma WebView carregando o conteúdo de https://n8n.rannyzyzz.com.br/webhook/f0cea945-1b5c-4e26-b53f-2fdd955a11f6.

* Para sair, clique no botão "Sair" no canto superior direito e o redirecionará para a tela de Login.

#### Licença
Este projeto é de código aberto e está disponível sob a Licença MIT
