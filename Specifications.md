# Cadastro de carro

**RF**
Deve ser possível cadastrar um carro.
Deve ser possível listar todas as categorias.

**RN**
Não deve ser possível cadastrar um carro com uma placa já existente.
Não deve ser possível alterar a placa de um carro já cadastrado.
O carro deve ser cadastrado com disponibilidade por padrão.
O usuário responsável pelo cadastro deve ser um usuário administrador.

# Listagem de carro

**RF**
Deve ser possível listar todos os carros disponíveis.
Deve ser possível listar todos os carros disponíveis pelo nome da categoria.
Deve ser possível listar todos os carros disponíveis pelo nome da marca.
Deve ser possível listar todos os carros disponíveis pelo nome da carro.

**RN**
O usuário não precisa estar logado no sistema.

# Cadastro de especificação do carro

**RF**
Deve ser possível cadastrar uma especificação para um carro.
Deve ser possível listar todas as especificações.
Deve ser possível todos os carros.

**RN**
Não deve ser possível cadastrar uma especificação para um carro não existente.
Não deve ser possível cadastrar uma especificação já existente para um mesmo carro.
O usuário responsável pelo cadastro deve ser um usuário administrador.

# Cadastro de imagens do carro

**RF**
Deve ser possível cadastrar a imagem do carro.
Deve ser possível listar todos os carros.

**RFN**
Utilizar o multer para upload dos arquivos.

**RN**
O usuário deve poder cadastrar mais de um imagem para o mesmo carro.
O usuário responsável pelo cadastro deve ser um usuário administrador.

# Aluguel de carro

**RF**
Deve ser possível criar um aluguel.
Deve ser possível

**RFN**

**RN**
O aluguel deve ter duração mínima de 24 horas.
Não deve ser possível criar um novo aluguel caso já exista um aberto para o mesmo usuário.
Não deve ser possível criar um novo aluguel caso já exista um aberto para o mesmo carro.
