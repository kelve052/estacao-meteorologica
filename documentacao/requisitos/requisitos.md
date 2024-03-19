# ESTACOES METERIOLOGICAS REQUISITOS

## Requisitos Funcionais Obrigatórios
| IDENTIFICADOR | NOME | REGRA DE NEGOCIO |
|:---:|:---:|:---:|
|RF-001 | Cadastro DE Usuário| O sistema deve permitir o cadastro de novos usuarios incluindo informações como e-mail, nome e senha.
|RF-002 | Cadatro de estações|  O sistema deve permitir o cadastro de novas estações incluindo informações como nome, endereço, coordenada e IP.
|RF-003 | Buscar estações| Os usuários devem poder buscar informações detalhadas de determinada estação sobre uma estação como temperatura, Umidade, pluviosidade.
|RF-004 | Atualização de Informações da estação| Usuários autorizados devem poder atualizar as informações de um estação existente, como nome, endereço, coordenada e IP.

## Requisitos Funcionais Desejáveis:
| IDENTIFICADOR | NOME | REGRA DE NEGOCIO |
|:---:|:---:|:---:|
|RFD-001 | Favoritar Estações| O sistema deve permitir que o usuário possa favoritar sua estações preferidas, em uma janela onde possa encontrar de forma rapida sua estações favoritas.
|RFD-002 | Listagem de Localização  |   Oferecer um mecanismo para listar a localização de uma estação em tempo real ou obter históricos de eventos de localização.
|RFD-003 | Desativação/Ativação de Estações  |  Deve ser possível desativar temporariamente ou ativar uma estação. Estações desativados não devem ser incluídos na busca de estações ativas.

## Requisitos Não Funcionais:
| IDENTIFICADOR | NOME | REGRA DE NEGOCIO |
|:---:|:---:|:---:|
|RNF-001 | Conexão com internet | É necessário ter uma conexão com a internet boa para que o site possa fluir com melhor qualidade e maior velociade de entrega.
|RNF-002 | Conexão com sensores | Necessário uma boa conexão com os sensores climáticos para ter uma leitura mais rapida dos resultados climáticos.
|RNF-003 | Funcionamento em dispositivos |  O site poderá ser utilizado pelo celulares e computadores que tenha conexão com a internet.
|RNF-004 | Tratamento de dados | Os resultados que serão apresentados para o cliente serão médias dos resultados recebidos dentro do tempo que foi solicitado a visualização.
