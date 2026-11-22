# 🍰 Cardápio Digital com Carrinho — Especificação Técnica (MVP v1.1)

![Status](https://img.shields.io/badge/Status-Aprovado%20para%20UI%2FUX-brightgreen)
![Versão](https://img.shields.io/badge/Vers%C3%A3o-1.1-blue)
![Infraestrutura](https://img.shields.io/badge/Custo%20de%20Infra-R%24%200%2C00-success)
![Privacidade](https://img.shields.io/badge/LGPD-Log%20100%25%20An%C3%B4nimo-informational)

> **Resumo Executivo:** Especificação técnica, arquitetura *Serverless* custo zero e modelagem de dados para o Cardápio Digital da confeitaria (Pronta Entrega e Sob Demanda), gerenciado integralmente via Google Sheets e integrado ao WhatsApp.

---

## 📑 Sumário

1. [Visão Geral](#-1-visão-geral)
2. [Especificação de Requisitos](#-2-especificação-de-requisitos)
3. [Arquitetura do Sistema](#-3-arquitetura-do-sistema-custo-zero)
4. [Stack Tecnológica](#-4-stack-tecnológica)
5. [Modelagem de Dados (Google Sheets)](#-5-modelagem-de-dados-google-sheets)
6. [Roadmap de Fases](#-6-roadmap-de-fases)
7. [Passagem de Bastão (Handoff)](#-7-passagem-de-bastão-handoff)

---

## 🎯 1. Visão Geral

Aplicação web responsiva (*mobile-first*) de **Cardápio Digital com Carrinho de Compras** voltada para confeitaria (bolos, tortas, pães e doces — à pronta entrega e sob demanda).

* **Público Externo (Clientes):** Visualizam produtos, personalizam itens, montam o carrinho e finalizam o pedido diretamente no WhatsApp — sem necessidade de cadastro ou login.
* **Público Interno (Equipe):** Gerencia catálogo, disponibilidade, preços, horários de atendimento e acompanha métricas gerenciais diretamente no **Google Sheets**.
* **Restrição Orçamentária:** Operação **100% gratuita** (camadas gratuitas de hospedagem, dados e imagens) no MVP, com base preparada para evoluir para plataformas de delivery e gateways de pagamento.

---

## 📋 2. Especificação de Requisitos

### 2.1 Requisitos Funcionais (RF)

| ID | Requisito | Descrição |
| :--- | :--- | :--- |
| **RF01** | **Exibição de Catálogo** | Listar produtos ativos da planilha com foto, nome, descrição, preço e categoria (*Pronta Entrega* ou *Sob Demanda*). |
| **RF02** | **Filtros e Destaques** | Permitir filtrar por categoria, tipo (*Pronta Entrega* / *Sob Demanda*) e exibir selos de destaque (*Mais Pedido*, *Lançamento*). |
| **RF03** | **Personalização de Itens** | Permitir adicionar opções/adicionais tanto em pronta entrega quanto sob demanda (ex.: massa, peso, formato, recheio, cobertura). |
| **RF04** | **Carrinho Único** | Permitir adicionar, remover e alterar quantidades de ambos os tipos no mesmo carrinho, calculando o subtotal estimado. |
| **RF05** | **Fluxo Livre (Sem Impedimento)** | Permitir que o cliente preencha tudo (nome, retirada/entrega, observações), preencha parcialmente ou clique em um atalho direto para o WhatsApp sem montar carrinho. |
| **RF06** | **Mensagem WhatsApp** | Formatar automaticamente o pedido em blocos visuais separados (*Pronta Entrega* e *Sob Encomenda*), indicando retirada ou entrega (taxa a combinar), e abrir `wa.me` usando o número da aba `Configuracoes`. |
| **RF07** | **Status da Loja (Aviso Inteligente)** | Ler horários e chave de emergência da aba `Configuracoes` para exibir se a confeitaria está **Aberta** ou **Fechada**, sem bloquear o cardápio nem o envio de pedidos. |
| **RF08** | **Registro Anônimo (Log)** | Ao finalizar o pedido, enviar silenciosamente para o Google Apps Script os dados anônimos da intenção de pedido (resumo e itens) para alimentar o `Dashboard`. |

### 2.2 Requisitos Não Funcionais (RNF)

* **RNF01 — Custo Zero:** Hospedagem, leitura de dados, gravação de logs, painel analítico e armazenamento de imagens devem operar exclusivamente em camadas gratuitas.
* **RNF02 — Privacidade / LGPD:** Nenhum dado pessoal (nome, telefone, endereço) pode ser salvo em banco de dados, planilha ou *cookies* de rastreamento. Dados pessoais trafegam apenas na mensagem do WhatsApp.
* **RNF03 — Performance Mobile:** Carregamento ágil em redes 4G, imagens otimizadas (`.webp` ou `.jpg` leve) e persistência temporária do carrinho no navegador (`localStorage`).
* **RNF04 — Fuso Horário Fixo:** A verificação de loja aberta/fechada deve utilizar sempre o fuso horário local da confeitaria (`America/Cuiaba`), independentemente do relógio do celular do cliente.
* **RNF05 — Manutenibilidade:** A equipe deve alterar preços, disponibilidade, horários, feriados e WhatsApp direto no Google Sheets, sem depender de código ou novo deploy.

### 2.3 Regras de Negócio (RN)

> [!IMPORTANT]
> * **RN01 (Disponibilidade Manual):** Produtos com `Disponivel = NÃO` ficam ocultos ou sinalizados como "Esgotado" (conforme definição de UI).
> * **RN02 (Preços sob Consulta):** Itens sob demanda altamente personalizados podem exibir *"Sob consulta"* quando o campo `Preco` estiver vazio.
> * **RN03 (Separação Visual no WhatsApp):** Carrinhos mistos devem agrupar os itens em duas seções distintas na mensagem (*📦 Pronta Entrega* e *🎂 Sob Encomenda*) para evitar erros na cozinha.
> * **RN04 (Chave de Emergência):** Se `Forcar_Fechado = SIM` na aba `Configuracoes`, o cardápio exibe imediatamente o aviso de fechado, sobrepondo o horário normal do dia.

---

## 🏗️ 3. Arquitetura do Sistema (Custo Zero)

A solução adota uma arquitetura **Serverless / Estática**, eliminando custos de servidor e facilitando a manutenção:

    [ Equipe ] ──(Edita catálogo/horários)──► [ Google Sheets ] ◄──(Lê catálogo/status)── [ Front-end React ]
                                                     ▲                                            │
                                                     │ (Grava Log Anônimo via POST)               │ (Abre wa.me com pedido)
                                                     └─────── [ Google Apps Script ] ◄────────────┤
                                                                                                  ▼
                                                                                          [ WhatsApp Cliente ]

* **Leitura (Mão Única):** O front-end consome os dados públicos das abas `Produtos`, `Personalizacoes` e `Configuracoes` em tempo real.
* **Envio do Pedido:** O front-end formata a mensagem e redireciona para `https://wa.me/<WhatsApp_Numero>?text=...`.
* **Escrita de Métricas:** No mesmo clique, uma requisição assíncrona envia os dados anônimos para o **Google Apps Script**, que grava nas abas `Log_Pedidos_Anonimo` e `Log_Itens_Anonimo`.
* **Imagens:** Hospedadas na pasta `/imagens` do repositório público no GitHub e referenciadas por URL na planilha.

---

## 🛠️ 4. Stack Tecnológica

| Camada | Tecnologia | Justificativa Técnica |
| :--- | :--- | :--- |
| **Front-end** | **React + Vite + Tailwind CSS** | Gerencia com segurança filtros, personalizações, carrinho misto e status de horário. Leve para mobile e preparado para plugar gateways de pagamento no futuro sem refazer o projeto. |
| **Hospedagem** | **GitHub Pages** | Centraliza código-fonte, imagens e hospedagem gratuita em uma única conta do GitHub. |
| **Base de Dados & BI** | **Google Sheets** | Custo zero, edição simples pela equipe sem painel administrativo/login e geração nativa de gráficos (`Dashboard`). |
| **API de Escrita (Log)** | **Google Apps Script** | Nativo do Google Sheets, gratuito e dispensa servidor back-end para gravar os logs anônimos. |
| **Hospedagem de Imagens** | **GitHub (Repositório Público)** | Custo zero, controle total dos arquivos e entrega rápida via URL direta. |

---

## 🗄️ 5. Modelagem de Dados (Google Sheets)

A planilha é composta por **6 abas** que separam a rotina da equipe, o registro automático e a visão gerencial.

### 1. Aba `Produtos` *(Editada pela equipe)*
| Coluna | Exemplo | Obrigatório | Função |
| :--- | :--- | :---: | :--- |
| `ID` | `BOL-001` | Sim | Código único (SKU pronto para futuro delivery/iFood) |
| `Nome` | `Bolo de Cenoura com Brigadeiro` | Sim | Nome exibido no cardápio |
| `Tipo` | `Pronta Entrega` ou `Sob Demanda` | Sim | Filtro e agrupamento na mensagem do WhatsApp |
| `Categoria` | `Bolos`, `Tortas`, `Pães`, `Doces` | Sim | Organização visual do cardápio |
| `Descricao` | `Massa fofinha com cobertura...` | Não | Detalhes do produto |
| `Preco` | `45.00` *(ou vazio se sob consulta)* | Não | Valor base do item |
| `Disponivel` | `SIM` ou `NÃO` | Sim | Controle manual de vitrine |
| `Destaque` | `Mais Pedido`, `Lançamento` ou vazio | Não | Selo visual de destaque |
| `URL_Foto` | `https://raw.githubusercontent.com/...` | Não | Link direto da imagem no GitHub |
| `IDs_Personalizacao` | `MASSA, RECHEIO` | Não | Vincula grupos da Aba `Personalizacoes` |

### 2. Aba `Personalizacoes` *(Editada pela equipe)*
| Coluna | Exemplo | Função |
| :--- | :--- | :--- |
| `Grupo_ID` | `MASSA`, `RECHEIO`, `PESO`, `ADICIONAL` | Agrupa opções vinculadas à Aba `Produtos` |
| `Titulo_Grupo` | `Escolha a Massa` | Título exibido para o cliente |
| `Opcao` | `Chocolate 50%` | Nome da escolha |
| `Preco_Adicional` | `0.00` ou `12.00` | Valor somado ao item |
| `Disponivel` | `SIM` ou `NÃO` | Permite desativar um sabor em falta |

### 3. Aba `Configuracoes` *(Editada pela equipe)*
| Chave | Valor (Exemplo) | Função |
| :--- | :--- | :--- |
| `WhatsApp_Numero` | `5565999999999` | Número de destino dos pedidos (com DDI e DDD) |
| `Forcar_Fechado` | `NÃO` *(ou `SIM`)* | Chave de emergência para feriados, folgas ou cozinha lotada |
| `Mensagem_Fechado` | `Fechado no momento. Envie seu pedido e responderemos assim que abrirmos!` | Texto do banner fora do horário |
| `Horario_Seg` | `09:00-18:00` *(ou `FECHADO`)* | Horário de Segunda-feira |
| `Horario_Ter` | `09:00-18:00` | Horário de Terça-feira |
| `Horario_Qua` | `09:00-18:00` | Horário de Quarta-feira |
| `Horario_Qui` | `09:00-18:00` | Horário de Quinta-feira |
| `Horario_Sex` | `09:00-18:00` | Horário de Sexta-feira |
| `Horario_Sab` | `09:00-15:00` | Horário de Sábado |
| `Horario_Dom` | `FECHADO` | Horário de Domingo |

### 4. Aba `Log_Pedidos_Anonimo` *(Automática — 1 linha por intenção de pedido)*
| Coluna | Exemplo | Função |
| :--- | :--- | :--- |
| `Data` | `22/11/2026` | Agrupamento diário e mensal |
| `Hora` | `18:30` | Identificação de horários de pico |
| `Dia_Semana` | `Domingo` | Identificação de dias mais movimentados |
| `Modalidade` | `Retirada`, `Entrega` ou `Não Informado` | Mede demanda por delivery |
| `Status_Loja` | `Aberta` ou `Fechada` | Mede pedidos recebidos fora do expediente |
| `Qtd_Itens` | `3` | Volume médio de itens por pedido |
| `Valor_Estimado` | `145.00` | Faturamento potencial e ticket médio |

### 5. Aba `Log_Itens_Anonimo` *(Automática — 1 linha por item do carrinho)*
> [!NOTE]
> Separar o log por item permite ao Google Sheets gerar automaticamente o **Ranking de Produtos Mais Pedidos** e o comparativo **Pronta Entrega vs. Sob Demanda** sem fórmulas complexas.

| Coluna | Exemplo | Função |
| :--- | :--- | :--- |
| `Data` | `22/11/2026` | Filtro por período |
| `ID_Produto` | `BOL-001` | Chave exata do produto |
| `Nome_Produto` | `Bolo de Cenoura com Brigadeiro` | Rótulo para os gráficos |
| `Tipo` | `Pronta Entrega` ou `Sob Demanda` | Comparativo entre modalidades |
| `Quantidade` | `2` | Soma de unidades pedidas |
| `Subtotal` | `90.00` | Receita estimada por produto |

### 6. Aba `Dashboard` *(Automática — Somente leitura gerencial)*
* **Cartões de Resumo (KPIs):** Total de intenções de pedido, Valor total estimado, Ticket médio estimado e % de pedidos com a loja fechada.
* **Top 10 Produtos Mais Pedidos:** Gráfico de barras horizontais (por quantidade e por receita estimada).
* **Pronta Entrega vs. Sob Demanda:** Gráfico de pizza com a participação de cada modelo.
* **Retirada vs. Entrega:** Gráfico de pizza para acompanhar a adoção do delivery.
* **Mapa de Demanda:** Gráfico de colunas por dia da semana e horário de pico.

---

## 🗺️ 6. Roadmap de Fases

- [x] **Fase 1 — Arquitetura e Especificação (Concluída):** Requisitos, stack custo zero, modelagem da planilha (6 abas) e regras de negócio.
- [ ] **Fase 2 — UI/UX & Produto (Próximo Passo):** Jornada do usuário, arquitetura de informação, wireframes e identidade visual.
- [ ] **Fase 3 — Desenvolvimento & Deploy:** Criação do template da planilha + Google Apps Script, desenvolvimento em React/Vite/Tailwind e publicação no GitHub Pages.
- [ ] **Fase 4 — Evolução (Médio/Longo Prazo):** Integração operacional com plataformas de delivery (usando os SKUs) e futura migração para banco de dados + gateway de pagamento.

---

## 📦 7. Passagem de Bastão (Handoff)

> **CONTEXTO PARA O PRÓXIMO GEM (Especialista em UI/UX & Produto)**
>
> * **Projeto:** Cardápio Digital com Carrinho de Compras para Confeitaria (Pronta Entrega e Sob Demanda).
> * **Público:** Clientes finais (*mobile-first*, compra rápida sem cadastro/login). A equipe gerencia tudo no Google Sheets.
> * **Restrições:** Custo zero, sem login/cadastro (fora do escopo LGPD no MVP), envio de pedidos via WhatsApp.
> * **Stack definida:** React + Vite + Tailwind CSS, hospedado no GitHub Pages, lendo Google Sheets e imagens do GitHub.
> * **Requisitos-chave de UX:**
>   1. Banner/Indicador de Status da Loja (Aberta / Fechada) no topo, lido da aba `Configuracoes`, sem bloquear o cliente.
>   2. Navegação clara entre *Pronta Entrega* e *Sob Demanda*, com filtros por categoria e selos de *Mais Pedido* / *Lançamento*.
>   3. Modal/tela de personalização (massa, recheio, peso, adicionais) para pronta entrega e sob demanda.
>   4. Carrinho único para ambos os tipos (separação visual ocorre na mensagem do WhatsApp).
>   5. Fluxo livre (sem barreiras): preenchimento total, parcial ou atalho direto para o WhatsApp sem montar carrinho.
> * **Próximo passo esperado:** Definir a jornada do usuário, arquitetura de informação, fluxo de telas (wireframes descritivos) e diretrizes visuais para o Engenheiro de Software.
