# Requisitos  

- Servidor Local Apache e MySQL (Sugestão: [XAMPP](https://www.apachefriends.org/pt_br/download.html))
- [Node.js](https://nodejs.org/en/download) (versão LTS recomendada)
- [Git](https://git-scm.com/downloads)

# Instalação e Execução

## 2. Clone o repositório
Primeiro, clone o repositório do projeto para o seu computador (ou baixe o repositório pelo GitHub):  

    git clone https://github.com/jesse-barbosa/monyra.git
    cd monyra

## 3. Importe o banco

- 3.1 Primeiro, ligue os servidor Apache e MySQL no XAMPP
- 3.3 Acesse o painel PhpMyAdmin: Digite "localhost/" no endereço de pesquisa do seu navegador
- 3.4 - Crie um novo banco de dados com o nome "monyra"
- 3.5 - Clique na opção de importar
- 3.6 - Importe o arquivo SQL localizado na pasta "banco" do projeto

## 4. Instale as dependências  
Instale todas as dependências necessárias usando npm ou yarn.  

Usando npm:

    npm install

## 5. Inicie o Expo  
Você pode iniciar o projeto diretamente com o comando:  

    npx expo start

## 6. Baixe o aplicativo Expo Go no seu celular  
Para visualizar o aplicativo no dispositivo, você precisará do aplicativo Expo Go.  

- [Baixe o Expo Go para Android](https://play.google.com/store/apps/details?id=host.exp.exponent)  
- [Baixe o Expo Go para iOS](https://apps.apple.com/app/expo-go/id982107779)  

## 7. Execute o aplicativo no seu dispositivo  
Após iniciar o Expo, um QR Code será gerado no terminal ou na janela do navegador que abrirá automaticamente.  

1. Abra o aplicativo Expo Go no seu dispositivo.  
2. Escaneie o QR Code exibido para carregar o aplicativo.  

Agora o aplicativo React Native deve rodar no seu dispositivo

Se encontrar algum problema ou tiver dúvidas, consulte a [documentação oficial do Expo](https://docs.expo.dev/).
