# Requisitos  

- Servidor Local Apache e MySQL (Sugestão: [XAMPP](https://www.apachefriends.org/pt_br/download.html))
- [Node.js](https://nodejs.org/en/download) (versão LTS recomendada)
- [Git](https://git-scm.com/downloads)

# Instalação e Execução

## 1. Clone o repositório
Primeiro, clone o repositório do projeto (ou baixe o repositório pelo GitHub) dentro da pasta htdocs:

    git clone https://github.com/jesse-barbosa/monyra.git

## 2. Importe o banco

- 2.1 Primeiro, ligue os servidor Apache e MySQL no XAMPP
- 2.2 Acesse o painel PhpMyAdmin: Digite "localhost/" no endereço de pesquisa do seu navegador
- 2.3 - Crie um novo banco de dados com o nome "dbmonyra"
- 2.4 - Clique na opção de importar
- 2.5 - Importe o arquivo SQL localizado na pasta "banco" do projeto

## 3. Instale as dependências  
Instale todas as dependências necessárias usando npm ou yarn.  

Usando npm:

    cd monyra
    npm install

## 4. Inicie o Expo  
Você pode iniciar o projeto diretamente com o comando:  

    npx expo start

## 5. Baixe o aplicativo Expo Go no seu celular  
Para visualizar o aplicativo no dispositivo, você precisará do aplicativo Expo Go.  

- [Baixe o Expo Go para Android](https://play.google.com/store/apps/details?id=host.exp.exponent)  
- [Baixe o Expo Go para iOS](https://apps.apple.com/app/expo-go/id982107779)  

## 6. Execute o aplicativo no seu dispositivo  
Após iniciar o Expo, um QR Code será gerado no terminal ou na janela do navegador que abrirá automaticamente.  

6.1 Abra o aplicativo Expo Go no seu dispositivo.
6.2 Escaneie o QR Code exibido para carregar o aplicativo.

Agora o aplicativo React Native deve rodar no seu dispositivo

Se encontrar algum problema ou tiver dúvidas, consulte a [documentação oficial do Expo](https://docs.expo.dev/).
