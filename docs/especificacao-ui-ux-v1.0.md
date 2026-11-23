# 🍰 Cardápio Digital com Carrinho — Especificação de UI/UX & Produto (v1.0)

![Status](https://img.shields.io/badge/Status-Aprovado%20para%20Desenvolvimento-brightgreen)
![Versão](https://img.shields.io/badge/Vers%C3%A3o-1.0-blue)
![Marca](https://img.shields.io/badge/Marca-Bianca%20Bonfim%20Confeitaria-EE9BB5)
![Foco](https://img.shields.io/badge/Layout-Mobile--First-3B2219)

> **Resumo Executivo:** Diretrizes visuais (baseadas no Brand Book oficial), arquitetura de informação, wireframes descritivos, padrões de personalização, estados de tela e passagem de bastão (*Handoff*) para o desenvolvimento do Cardápio Digital em React + Vite + Tailwind CSS.

---

## 📑 Sumário

1. [Identidade Visual e Design System](#-1-identidade-visual-e-design-system)
2. [Arquitetura de Informação e Jornada](#-2-arquitetura-de-informação-e-jornada-do-usuário)
3. [Wireframes Descritivos das Telas](#-3-wireframes-descritivos-das-telas)
4. [Estados de Tela e Casos de Borda](#-4-estados-de-tela-e-casos-de-borda-edge-cases)
5. [Passagem de Bastão (Handoff)](#-5-contexto-para-o-próximo-gem)

---

## 🎨 1. Identidade Visual e Design System

* **Marca:** Bianca Bonfim Confeitaria
* **Slogan:** *"Confeitaria artesanal com sabor de verdade."*
* **Tom de Voz:** Acolhedor, elegante e artesanal (*Warm, Welcoming, Elegant*).

### 1.1 Paleta de Cores e Acessibilidade (WCAG AA)

| Token (Tailwind sugerido) | Nome Oficial | HEX | Uso Principal na Interface | Regra de Contraste |
| :--- | :--- | :--- | :--- | :--- |
| `bg-chalk` | **Chalk White** | `#F9F6EE` | Fundo geral da página e áreas de respiro | Base clara principal |
| `bg-surface` | *Off-White Card* | `#FFFFFF` | Fundo dos cards de produto, modais e barra do carrinho | Sutil separação sobre `#F9F6EE` |
| `text-cocoa` / `bg-cocoa` | **Cocoa Brown** | `#3B2219` | Títulos, textos principais, preços e botões primários (CTAs) | Contraste > 13:1 sobre `#F9F6EE` (AAA) |
| `text-cocoa-muted` | *Cocoa Suave* | `#6E5247` | Descrições de produtos, textos auxiliares e placeholders | Contraste > 6:1 sobre `#FFFFFF` (AA) |
| `border-gold` / `text-gold` | **Antique Gold** | `#D4AF37` | Bordas finas decorativas, ícones de destaque e selo *Mais Pedido* | **Nunca** usar como texto pequeno em fundo claro |
| `bg-cotton` | **Cotton Candy** | `#EE9BB5` | Selo *Lançamento*, detalhes delicados e tags ativas | Usar sempre com texto em `#3B2219` |
| `status-open` | *Verde Aberto* | `#2E7D32` | Indicador de **Loja Aberta** / CTA WhatsApp (`#25D366`) | Contraste garantido com texto branco |
| `status-closed` | *Âmbar Fechado* | `#B45309` | Banner de aviso **Loja Fechada** (acolhedor, sem tom de erro) | Fundo `#FEF3C7` com texto `#78350F` |

### 1.2 Tipografia (Google Fonts)

* **Fonte Primária (`font-display`):** **Playfair Display SC**
  * *Uso:* Nome da marca, títulos de seções (*Pronta Entrega*, *Sob Demanda*, *Seu Pedido*) e cabeçalho de modais.
  * *Escala:* `20px` (mobile) / `24px` (desktop), peso `600`, `tracking-wide`.
* **Fonte Secundária (`font-sans`):** **Montserrat**
  * *Uso:* Todo texto funcional, nomes de produtos, descrições, preços, botões, filtros e formulários.
  * *Nome do Produto:* `15px–16px`, peso `600` (`SemiBold`), cor `#3B2219`.
  * *Descrição:* `13px`, peso `400` (`Regular`), cor `#6E5247`, máximo de 2 linhas no card (`line-clamp-2`).
  * *Preço:* `15px–16px`, peso `700` (`Bold`), cor `#3B2219`.
  * *Botões e Badges:* `13px–14px`, peso `600` (`SemiBold`).

### 1.3 Logo e Estilo de Componentes

* **Logo no Cabeçalho:** Centralizada no topo, respeitando a **largura mínima de `152px`** e área de respiro proporcional ao redor (evitando ícones colados nas laterais no mobile).
* **Geometria (Estilo Bento):** Cantos arredondados (`rounded-2xl` / `16px` nos cards e fotos; `rounded-xl` / `12px` em botões e inputs; `rounded-full` em badges e pílulas de filtro).
* **Tatilidade Dourada (*Gilded Tactility*):** Cards brancos (`#FFFFFF`) com borda sutil `1px solid rgba(212, 175, 55, 0.28)` e sombra suave (`shadow-sm`).

---

## 🗺️ 2. Arquitetura de Informação e Jornada do Usuário

### Fluxo Principal (Caminho Feliz)
1. **Acesso:** Cliente abre o link e visualiza imediatamente o **Status da Loja** (Aberta/Fechada) e a vitrine.
2. **Descoberta:** Alterna entre **Pronta Entrega** e **Sob Demanda** e filtra por categoria (*Todos, Bolos, Tortas, Pães, Doces*).
3. **Escolha e Personalização:** Toca no produto → abre o **Modal de Personalização** (ou adiciona direto se não houver personalizações) → escolhe opções e quantidade → adiciona ao carrinho.
4. **Revisão:** Toca na **Barra Fixa do Carrinho** → revisa itens, vê subtotal estimado (+ aviso claro caso haja item *Sob consulta*) → preenche dados opcionais (Nome, Retirada/Entrega, Observações).
5. **Finalização:** Toca em **"Enviar Pedido no WhatsApp"** → dispara log anônimo silencioso → abre o WhatsApp com a mensagem formatada por blocos.

### Fluxo Livre (Sem Barreira)
* A qualquer momento, o cliente pode acionar o **Botão Flutuante do WhatsApp** ("Falar com a confeiteira") para tirar dúvidas ou pedir algo fora do padrão sem montar carrinho.

---

## 📱 3. Wireframes Descritivos das Telas

### Tela 1: Vitrine Principal (*Home*)
*Mobile:* Coluna única (`100%` com padding `16px`). *Desktop:* Grid de 2 ou 3 colunas (`max-w-5xl` centralizado).

1. **Banner de Status da Loja (Topo)**
   * **Aberta:** Faixa discreta verde suave (`#ECFDF5`, texto `#065F46`): `● Aberta agora • Atendimento hoje das 09h às 18h`.
   * **Fechada (por horário ou `Forcar_Fechado = SIM`):** Faixa âmbar (`#FEF3C7`, texto `#78350F`): `🕒 Fechada no momento — {Mensagem_Fechado}`. **Nunca bloqueia navegação nem o envio de pedidos.**
2. **Cabeçalho da Marca**
   * Logo **Bianca Bonfim Confeitaria** centralizada (`min-width: 152px`).
   * Slogan abaixo: *"Confeitaria artesanal com sabor de verdade."*
3. **Seletor Principal de Modalidade (*Segmented Control* fixo ao rolar / *sticky*)**
   * **📦 Pronta Entrega** *(ativo: fundo `#3B2219`, texto `#F9F6EE`)* — Microtexto: *"Disponíveis hoje para retirada ou entrega rápida."*
   * **🎂 Sob Demanda** *(inativo: fundo `#FFFFFF`, texto `#3B2219`, borda `#D4AF37`/30)* — Microtexto: *"Feitos especialmente para sua festa ou evento. Encomende com antecedência."*
4. **Barra de Filtros por Categoria**
   * Rolagem horizontal suave com pílulas: `Todos`, `Bolos`, `Tortas`, `Pães`, `Doces`.
5. **Cards de Produto**
   * *Mobile:* Horizontal (foto quadrada `96x96px` arredondada à esquerda + textos à direita). *Desktop:* Card vertical em grid.
   * *Selos (sobre a foto):* **Mais Pedido** (`#D4AF37` / texto `#3B2219` / ⭐) e **Lançamento** (`#EE9BB5` / texto `#3B2219` / ✨).
   * *Variações de Estado:*
     * **Preço Fixo:** `R$ 45,00` + botão `+ Adicionar` ou `Personalizar`.
     * **Sob Consulta (RN02):** Badge `Sob consulta` (botão permanece ativo).
     * **Esgotado (RN01 — visível):** Foto em `grayscale opacity-70`, selo `Esgotado hoje`, botão desabilitado `Indisponível` (não abre modal).
     * **Oculto (RN01 — falta prolongada):** Não é renderizado na vitrine.
6. **Elementos Flutuantes no Rodapé**
   * **Atalho WhatsApp:** Botão flutuante no canto inferior direito (`Falar no WhatsApp`). Sobe automaticamente `72px` quando a barra do carrinho estiver ativa.
   * **Barra Fixa do Carrinho (≥ 1 item):** Fundo `#3B2219`, texto `#F9F6EE`. Esquerda: badge `#D4AF37` com quantidade + `Ver carrinho`. Direita: subtotal estimado (ex.: `R$ 90,00` ou `R$ 90,00 + sob consulta`).

---

### Tela 2: Modal / Bottom Sheet de Personalização
*Mobile:* Bottom Sheet (até 90% da altura da tela, com botão `X` fixo). *Desktop:* Modal centralizado (`max-w-lg`).

1. **Cabeçalho Visual:** Foto grande do produto (`16:10`), nome, descrição completa e preço base (ou *"Sob consulta — valor combinado no WhatsApp"*).
2. **Grupos de Personalização (3 Padrões de Seleção):**
   Cada grupo exibe **Título** + **Badge de Regra** (ex.: `Obrigatório • Escolha 1`, `Opcional • Escolha até 2`, `Opcional`).
   * **Padrão A — Escolha Binária (2 opções):** Ex.: *Uva vs. Morango*, *Chocolate vs. Leite Ninho*, *Cobertura à parte: Sim / Não*.
     * *Componente:* **Botões de Rádio (`radio`)** com círculo preenchido em `#3B2219`.
   * **Padrão B — Escolha Única (3+ opções):** Ex.: *Massa (Chocolate, Red Velvet, Cenoura, Limão, Baunilha)*.
     * *Componente:* **Caixas de Seleção Única** (ao marcar uma opção, a anterior é desmarcada automaticamente).
   * **Padrão C — Múltipla Escolha (com ou sem limite):** Ex.: *Recheio (1 ou 2)* ou *Adicionais (livres: cobertura extra, velas, docinhos, sacola reforçada)*.
     * *Componente:* **Caixas de Seleção Múltipla (`checkbox`)** com contador dinâmico (ex.: `1/2 selecionados`). Ao atingir o máximo, as opções não marcadas ficam suavemente desabilitadas.
   * *Preço Adicional:* Alinhado à direita (`+ R$ 12,00` em `#3B2219`; oculto se `0.00`).
3. **Observação do Item (Opcional):** Campo de texto curto (*"Ex.: escrita no topo, sem canela..."*).
4. **Rodapé Fixo:** Seletor de quantidade `[-] 1 [+]` + Botão `Adicionar • R$ XX,XX` (ou `Adicionar • Sob consulta`). Caso falte opção obrigatória, o botão fica esmaecido com o aviso *"Selecione as opções obrigatórias acima"*.

---

### Tela 3: Carrinho Único e Finalização (Drawer / Tela Cheia)
*Mobile:* Tela deslizante. *Desktop:* Gaveta lateral direita.

1. **Cabeçalho:** Título `Seu Pedido`, ação `Limpar` (com confirmação simples) e botão `X`.
2. **Itens Agrupados:** Subtítulos internos `📦 Pronta Entrega` e `🎂 Sob Encomenda` (quando houver itens de ambos os tipos), listando personalizações, preço/sob consulta, controle `[-] qtd [+]` e ícone de remoção.
3. **Resumo Financeiro Transparente:**
   * *Somente preço fixo:* `Subtotal estimado: R$ 135,00`
   * *Misto (fixo + sob consulta):* `Subtotal dos itens tabelados: R$ 90,00` + caixa informativa (`#F9F6EE` com borda `#D4AF37`): *"ℹ️ Seu pedido inclui itens **Sob consulta**. O valor final desses itens será combinado diretamente com a confeiteira no WhatsApp."*
   * *Somente sob consulta:* `Valor final a combinar com a confeiteira no WhatsApp.`
4. **Dados do Pedido (Fluxo Livre — 100% Opcionais):**
   * *Seu Nome (opcional)*
   * *Modalidade (opcional):* Cartões `🏪 Retirada no local` | `🛵 Entrega (taxa a combinar no WhatsApp)`
   * *Observações gerais (opcional):* Data desejada, horário aproximado ou recado.
5. **CTA Final Fixo:** Botão `#25D366` (hover `#1EBE5D`, texto branco): **`Enviar Pedido no WhatsApp`**. Microtexto abaixo: *"Você revisará a mensagem antes de enviar. Nenhum dado pessoal é salvo neste site."*

#### Prévia da Mensagem no WhatsApp (RF06 & RN03)
```text
Olá, Bianca Bonfim Confeitaria! Gostaria de fazer um pedido:

👤 *Cliente:* [Nome ou "Não informado"]
🚚 *Modalidade:* [Retirada / Entrega (taxa a combinar) / A combinar]

📦 *PRONTA ENTREGA*
• 2x Bolo de Cenoura com Brigadeiro — R$ 90,00
  ↳ Cobertura à parte: Sim (+ R$ 5,00)

🎂 *SOB ENCOMENDA*
• 1x Bolo Personalizado — Sob consulta
  ↳ Massa: Red Velvet | Recheio: Ninho, Nutella
  ↳ Obs: Para sábado às 16h

💰 *Subtotal estimado:* R$ 95,00 (+ itens sob consulta a combinar)
📝 *Observações:* [Texto ou omitir linha se vazio]
```

---

## 🛡️ 4. Estados de Tela e Casos de Borda (*Edge Cases*)

| Estado | Quando Ocorre | Comportamento Visual e Texto |
| :--- | :--- | :--- |
| **Loading (*Skeleton*)** | Leitura inicial do Google Sheets | Cabeçalho com logo + 4 cards fantasmas pulsando em `#EFECE3`. |
| **Erro de Conexão** | Queda de internet ou falha na planilha | Ícone delicado + *"Ops! Não conseguimos abrir o cardápio agora."* + botão **`Tentar novamente`** + botão **`Chamar direto no WhatsApp`**. |
| **Estado Vazio (Filtro)** | Categoria sem produtos ativos | *"Nenhuma opção disponível nesta categoria hoje."* + atalho **`Ver opções Sob Demanda`** (ou `Limpar filtros`). |
| **Estado Vazio (Carrinho)** | Carrinho aberto sem itens | Ícone minimalista de sacola + *"Seu carrinho ainda está vazio. Que tal escolher um doce artesanal?"* + botão **`Explorar cardápio`**. |
| **Fallback de Imagem** | `URL_Foto` vazio ou link quebrado | Contêiner `#F9F6EE` com borda `#D4AF37`/30 e marca simplificada centralizada em baixa opacidade. |
| **Feedback (*Toast*)** | Item adicionado ao carrinho | Notificação breve (`2.5s`): `✓ Adicionado ao carrinho` (`#3B2219` / texto `#F9F6EE`). |

---

## 📦 5. CONTEXTO PARA O PRÓXIMO GEM

> **PASSAGEM DE BASTÃO — UI/UX & Produto → Engenheiro de Software**
>
> * **Projeto:** Cardápio Digital com Carrinho — **Bianca Bonfim Confeitaria** (*"Confeitaria artesanal com sabor de verdade."*).
> * **Stack:** React + Vite + Tailwind CSS, hospedado no GitHub Pages, lendo Google Sheets e gravando log anônimo via Google Apps Script.
> * **Identidade Visual (Brand Book):**
>   * **Paleta HEX:** Fundo `#F9F6EE` (Chalk White), Cards `#FFFFFF`, Primária/Textos/CTAs `#3B2219` (Cocoa Brown), Texto Secundário `#6E5247`, Detalhes/Bordas `#D4AF37` (Antique Gold), Selos/Acentos `#EE9BB5` (Cotton Candy — sempre com texto `#3B2219`), WhatsApp CTA `#25D366`.
>   * **Tipografia (Google Fonts):** `Playfair Display SC` (títulos/seções) e `Montserrat` (corpo, preços, botões, inputs).
>   * **Logo:** Largura mínima `152px` no cabeçalho com respiro generoso. Bordas arredondadas (`rounded-2xl` nos cards/fotos).
> * **Telas e Componentes Aprovados:**
>   1. **Vitrine (Home):** Banner de Status (`Aberta`/`Fechada` no fuso `America/Cuiaba`, não bloqueante), cabeçalho com logo/slogan, abas *sticky* (`Pronta Entrega` / `Sob Demanda`), filtros horizontais por categoria, cards de produto (`Mais Pedido`, `Lançamento`, preço fixo, `Sob consulta`, `Esgotado` visível/esmaecido e `Oculto` não renderizado), barra fixa do carrinho no rodapé e botão flutuante do WhatsApp.
>   2. **Modal/Bottom Sheet de Personalização:** 3 padrões — Rádio (2 opções), Seleção Única em caixas (3+ opções, máx. 1) e Múltipla Escolha em checkboxes (com limite configurável ou ilimitado) + observação do item + seletor de quantidade.
>   3. **Carrinho Único & Checkout Livre:** Agrupamento visual (*Pronta Entrega* vs *Sob Encomenda*), subtotal transparente (`Subtotal + aviso de itens sob consulta combinados no WhatsApp`), campos 100% opcionais (Nome, Retirada/Entrega, Observações), disparo do log anônimo e redirecionamento para `wa.me` formatado.
>   4. **Estados Obrigatórios:** Skeleton loading, erro de conexão (tentar novamente + WhatsApp), empty states (filtro e carrinho), fallback visual para fotos ausentes/quebradas e toast de confirmação.
> * **Ajustes de Planilha a Alinhar antes de Codar:**
>   * Na aba `Produtos`, a coluna `Disponivel` deve suportar 3 estados: `SIM`, `ESGOTADO` (visível/esmaecido) e `OCULTO` (não renderizado).
>   * Na aba `Personalizacoes`, adicionar metadados de seleção por grupo (ex.: `Tipo_Selecao`: `UNICA` ou `MULTIPLA`, `Min_Opcoes`, `Max_Opcoes`) para renderizar rádio, caixa de seleção única ou múltipla com limite.
> * **Pedido do Usuário para o Engenheiro de Software:** Preparar a estrutura do repositório e criar a *branch* no GitHub para versionar os arquivos de especificação (`especificacao-cardapio-v1.1.md` e `especificacao-ui-ux-v1.0.md`) e iniciar o desenvolvimento da aplicação.
