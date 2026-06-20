const PROMPT_CATEGORIES = [
  { id: "all", label: "Todos" },
  { id: "analise", label: "Análise jurídica" },
  { id: "documentos", label: "Documentos" },
  { id: "lgpd", label: "LGPD" },
  { id: "cliente", label: "Cliente" },
  { id: "operacoes", label: "Operações" },
  { id: "conteudo", label: "Conteúdo" },
];

const PROMPTS = [
  {
    id: "p01",
    title: "Triagem jurídica inicial de caso",
    category: "analise",
    level: "medio",
    purpose: "Organizar fatos, pedidos, documentos e riscos antes da primeira avaliação técnica.",
    inputs: ["relato do cliente", "documentos recebidos", "prazo conhecido", "area juridica provavel"],
    prompt: `Atue como assistente juridico de triagem para um escritorio brasileiro.

Objetivo: organizar as informacoes iniciais do caso sem concluir tese juridica antes da revisao humana.

Contexto:
- Area provavel: [AREA]
- Relato do cliente: [RELATO]
- Documentos recebidos: [DOCUMENTOS]
- Prazos informados: [PRAZOS]

Tarefa:
1. Separe fatos narrados, documentos existentes, lacunas e pontos que dependem de prova.
2. Liste perguntas objetivas para completar a triagem.
3. Identifique riscos imediatos, inclusive prazo, competencia, prescricao ou decadencia quando aplicavel.
4. Sugira proximos passos internos para o advogado responsavel.

Regras:
- Nao invente fatos, datas, jurisprudencia ou dispositivos.
- Marque como "a conferir" qualquer ponto que dependa de fonte oficial.
- Se faltar informacao essencial, pare e peça complementacao.

Formato de saida:
- Resumo executivo
- Quadro fatos/provas/lacunas/riscos
- Perguntas ao cliente
- Providencias recomendadas
- Alertas de revisao humana`,
  },
  {
    id: "p02",
    title: "Mapa de argumentos para peça",
    category: "analise",
    level: "alto",
    purpose: "Transformar documentos e tese inicial em uma estrutura argumentativa revisável.",
    inputs: ["tipo de peca", "tese preliminar", "fatos provados", "documentos", "pedidos"],
    prompt: `Atue como arquiteto de argumentacao juridica.

Objetivo: criar um mapa de argumentos para [TIPO DE PECA], sem redigir a peca final.

Insumos:
- Tese preliminar: [TESE]
- Fatos relevantes: [FATOS]
- Documentos/provas: [PROVAS]
- Pedidos pretendidos: [PEDIDOS]
- Pontos sensiveis: [RISCOS]

Entregue:
1. Tese central em uma frase.
2. Estrutura logica dos argumentos em ordem de forca.
3. Fatos que sustentam cada argumento.
4. Provas associadas e lacunas probatorias.
5. Contra-argumentos provaveis da outra parte.
6. Pontos que exigem pesquisa de lei ou jurisprudencia em fonte oficial.

Restricoes:
- Nao cite precedentes especificos sem eles terem sido fornecidos.
- Nao trate hipotese como fato.
- Nao escreva pedidos definitivos sem validar competencia, prazo e rito.`,
  },
  {
    id: "p03",
    title: "Revisão crítica de contrato",
    category: "documentos",
    level: "alto",
    purpose: "Localizar riscos, ambiguidades, omissões e pontos de renegociação em uma minuta.",
    inputs: ["minuta do contrato", "perfil das partes", "objetivo comercial", "jurisdicao", "pontos inegociaveis"],
    prompt: `Atue como revisor juridico de contratos no Brasil.

Objetivo: revisar a minuta abaixo com foco em risco pratico, clareza operacional e protecao da parte [PARTE REPRESENTADA].

Minuta:
[COLAR CONTRATO]

Contexto:
- Parte representada: [PARTE]
- Objetivo comercial: [OBJETIVO]
- Pontos inegociaveis: [PONTOS]

Analise:
1. Clausulas criticas e motivo do risco.
2. Ambiguidades ou termos vagos.
3. Obrigações sem prazo, metrica, responsavel ou consequencia.
4. Lacunas sobre pagamento, confidencialidade, rescisao, responsabilidade, dados pessoais e solucao de conflitos.
5. Sugestao de redacao alternativa para os pontos mais sensiveis.

Regras:
- Nao reescreva o contrato inteiro.
- Diferencie risco juridico, risco comercial e risco operacional.
- Indique o que depende de validacao pelo advogado responsavel.`,
  },
  {
    id: "p04",
    title: "Checklist de documentos para ajuizamento",
    category: "documentos",
    level: "baixo",
    purpose: "Gerar uma lista de documentos e dados faltantes antes de iniciar uma ação.",
    inputs: ["tipo de acao", "relato", "documentos existentes", "parte autora", "parte re"],
    prompt: `Crie um checklist de documentos para avaliar o ajuizamento de [TIPO DE ACAO].

Dados disponiveis:
- Relato: [RELATO]
- Documentos ja existentes: [DOCUMENTOS]
- Parte autora: [AUTOR]
- Parte re: [REU]

Saida esperada:
- Documentos indispensaveis
- Documentos recomendaveis
- Dados cadastrais necessarios
- Provas que podem fortalecer a tese
- Pontos de urgencia
- Perguntas para o cliente

Nao presuma que um documento existe. Quando nao houver confirmacao, marque como "solicitar".`,
  },
  {
    id: "p05",
    title: "Análise LGPD de fluxo de dados",
    category: "lgpd",
    level: "alto",
    purpose: "Mapear dados pessoais, finalidade, base legal, riscos e controles de um processo.",
    inputs: ["descricao do processo", "categorias de dados", "titulares", "ferramentas", "terceiros"],
    prompt: `Atue como especialista em LGPD e governanca de dados.

Objetivo: analisar o fluxo [NOME DO FLUXO] e identificar riscos, bases legais possiveis e controles recomendados.

Contexto:
- Processo: [DESCRICAO]
- Dados tratados: [DADOS]
- Titulares: [TITULARES]
- Sistemas e ferramentas: [FERRAMENTAS]
- Terceiros envolvidos: [TERCEIROS]

Entregue:
1. Mapa resumido do ciclo de vida dos dados.
2. Finalidades declaradas e possiveis bases legais a validar.
3. Dados sensiveis ou dados de criancas/adolescentes, se houver.
4. Riscos de minimizacao, transparencia, seguranca, retencao e compartilhamento.
5. Controles recomendados por prioridade.
6. Perguntas para completar o diagnostico.

Regras:
- Nao declare conformidade final.
- Indique tudo que exigir avaliacao juridica ou tecnica adicional.
- Se o fluxo envolver IA, destaque riscos de entrada de dados em ferramentas externas.`,
  },
  {
    id: "p06",
    title: "Resposta inicial a titular de dados",
    category: "lgpd",
    level: "medio",
    purpose: "Preparar uma resposta preliminar, sóbria e revisável a uma solicitação LGPD.",
    inputs: ["tipo de solicitacao", "canal", "identificacao do titular", "prazo", "politica interna"],
    prompt: `Redija uma minuta preliminar de resposta a titular de dados, em linguagem clara e institucional.

Solicitacao recebida:
[SOLICITACAO]

Contexto:
- Canal: [CANAL]
- Identificacao confirmada? [SIM/NAO]
- Politica interna aplicavel: [POLITICA]
- Prazo interno: [PRAZO]

Entregue:
- Resposta ao titular
- Checklist interno antes do envio
- Pontos que dependem de validacao juridica
- Riscos de responder sem confirmar identidade ou escopo

Regras:
- Nao prometa providencia que a organizacao ainda nao confirmou.
- Nao exponha dados pessoais na resposta.
- Mantenha tom objetivo, humano e sem linguagem defensiva.`,
  },
  {
    id: "p07",
    title: "Resumo executivo para cliente",
    category: "cliente",
    level: "medio",
    purpose: "Converter análise técnica em comunicação clara para cliente não jurídico.",
    inputs: ["analise juridica", "perfil do cliente", "decisao esperada", "riscos"],
    prompt: `Transforme a analise abaixo em um resumo executivo para cliente.

Analise tecnica:
[ANALISE]

Perfil do cliente:
[PERFIL]

Objetivo da comunicacao:
[OBJETIVO]

Formato:
1. O que aconteceu
2. O que isso significa
3. Opcoes disponiveis
4. Riscos de cada opcao
5. Recomendacao preliminar para validacao
6. Proximos passos

Tom:
- claro, direto e profissional;
- sem juridiquês desnecessario;
- sem prometer resultado;
- com alertas proporcionais ao risco.`,
  },
  {
    id: "p08",
    title: "Mensagem de WhatsApp profissional",
    category: "cliente",
    level: "baixo",
    purpose: "Gerar uma mensagem curta, educada e juridicamente prudente.",
    inputs: ["situacao", "cliente", "acao desejada", "prazo"],
    prompt: `Crie uma mensagem de WhatsApp para cliente com tom profissional, humano e objetivo.

Situacao:
[SITUACAO]

Acao desejada:
[ACAO]

Prazo ou urgencia:
[PRAZO]

Regras:
- Maximo de 900 caracteres.
- Nao use emojis.
- Nao prometa resultado juridico.
- Se houver pendencia do cliente, explique exatamente o que ele deve enviar.
- Termine com uma chamada de acao clara.`,
  },
  {
    id: "p09",
    title: "Plano de automação supervisionada",
    category: "operacoes",
    level: "alto",
    purpose: "Avaliar se uma rotina jurídica pode ser automatizada com controle humano.",
    inputs: ["rotina", "entradas", "sistemas", "risco", "saida esperada"],
    prompt: `Atue como consultor de automacao juridica supervisionada.

Rotina a avaliar:
[ROTINA]

Entradas:
[ENTRADAS]

Sistemas envolvidos:
[SISTEMAS]

Saida esperada:
[SAIDA]

Analise:
1. O que pode ser automatizado com baixo risco.
2. O que deve permanecer sob revisao humana.
3. Dados sensiveis ou sigilosos envolvidos.
4. Pontos de falha e como mitigar.
5. Checklist de aprovacao antes de colocar em producao.
6. Modelo de fluxo em etapas.

Restricao: nao recomende automacao para protocolo, envio externo ou decisao juridica sem etapa de aprovacao humana.`,
  },
  {
    id: "p10",
    title: "SOP de rotina de escritório",
    category: "operacoes",
    level: "medio",
    purpose: "Transformar uma tarefa recorrente em procedimento operacional padronizado.",
    inputs: ["rotina", "responsaveis", "ferramentas", "prazos", "criterios de aceite"],
    prompt: `Crie um procedimento operacional padrao para a rotina [ROTINA].

Contexto:
- Responsaveis: [RESPONSAVEIS]
- Ferramentas: [FERRAMENTAS]
- Frequencia: [FREQUENCIA]
- Critérios de aceite: [CRITERIOS]

Entregue:
- Objetivo da rotina
- Quando usar
- Entradas necessarias
- Passo a passo
- Pontos de controle
- Erros comuns
- Quando escalar para advogado responsavel
- Checklist final

Use linguagem operacional, precisa e facil de treinar.`,
  },
  {
    id: "p11",
    title: "Pesquisa jurídica com matriz de fontes",
    category: "analise",
    level: "alto",
    purpose: "Planejar pesquisa sem aceitar fontes aparentes ou citações não verificadas.",
    inputs: ["pergunta juridica", "jurisdicao", "periodo", "tribunal", "contexto fatico"],
    prompt: `Monte um plano de pesquisa juridica para responder a seguinte pergunta:
[PERGUNTA]

Contexto fatico:
[CONTEXTO]

Recorte:
- Jurisdicao: [JURISDICAO]
- Tribunal ou orgao: [TRIBUNAL]
- Periodo: [PERIODO]

Entregue:
1. Termos de busca principais e alternativos.
2. Fontes oficiais prioritarias.
3. Criterios para aceitar ou rejeitar resultados.
4. Matriz para registrar achados: fonte, tese, trecho relevante, data, aplicabilidade e risco.
5. Perguntas que a pesquisa precisa responder.

Regra critica: nao apresente conclusao final sem resultados verificados em fonte oficial fornecida ou consultada pelo advogado.`,
  },
  {
    id: "p12",
    title: "Roteiro de reunião com cliente",
    category: "cliente",
    level: "baixo",
    purpose: "Preparar perguntas e pauta para reunião de diagnóstico.",
    inputs: ["tema", "objetivo", "perfil do cliente", "documentos conhecidos"],
    prompt: `Crie um roteiro de reuniao juridica para diagnosticar [TEMA].

Objetivo da reuniao:
[OBJETIVO]

Perfil do cliente:
[PERFIL]

Documentos ja conhecidos:
[DOCUMENTOS]

Saida:
- Abertura da reuniao em linguagem simples
- Perguntas essenciais por bloco
- Documentos a solicitar
- Alertas de confidencialidade e expectativa
- Proximos passos possiveis

Evite perguntas duplicadas. Organize a conversa para reduzir ansiedade do cliente e coletar fatos verificaveis.`,
  },
  {
    id: "p13",
    title: "Calendário editorial jurídico ético",
    category: "conteudo",
    level: "medio",
    purpose: "Planejar conteúdos de autoridade sem promessa de resultado ou captação indevida.",
    inputs: ["tema", "publico", "canais", "frequencia", "restricoes"],
    prompt: `Crie um calendario editorial juridico para [PERIODO], respeitando sobriedade profissional e regras eticas.

Tema central:
[TEMA]

Publico:
[PUBLICO]

Canais:
[CANAIS]

Entregue:
- Pilares editoriais
- Ideias de posts por semana
- Objetivo de cada conteudo
- Formato sugerido
- Alertas eticos
- Chamadas para acao discretas e informativas

Regras:
- Nao usar promessa de resultado.
- Nao gerar urgencia artificial.
- Nao expor cliente ou caso concreto sem autorizacao.
- Evitar linguagem sensacionalista.`,
  },
  {
    id: "p14",
    title: "Revisão ética de post jurídico",
    category: "conteudo",
    level: "medio",
    purpose: "Avaliar se um texto de marketing jurídico está sóbrio e seguro.",
    inputs: ["rascunho", "canal", "publico", "objetivo"],
    prompt: `Revise o texto abaixo sob a perspectiva de comunicacao juridica etica.

Texto:
[TEXTO]

Canal:
[CANAL]

Objetivo:
[OBJETIVO]

Analise:
1. Pontos de risco etico ou reputacional.
2. Trechos que podem soar como promessa de resultado.
3. Linguagem excessivamente comercial ou alarmista.
4. Ajustes para clareza, sobriedade e autoridade.
5. Versao reescrita.

Nao transforme o conteudo em anuncio agressivo. Mantenha tom tecnico, humano e elegante.`,
  },
  {
    id: "p15",
    title: "Comparador de versões contratuais",
    category: "documentos",
    level: "alto",
    purpose: "Comparar duas versões de uma cláusula ou contrato e destacar impacto jurídico.",
    inputs: ["versao anterior", "versao nova", "parte representada", "objetivo"],
    prompt: `Compare duas versoes de texto contratual e explique o impacto das mudancas.

Parte representada:
[PARTE]

Versao anterior:
[VERSAO_ANTERIOR]

Versao nova:
[VERSAO_NOVA]

Entregue:
- Mudancas materiais
- Mudancas apenas redacionais
- Riscos novos ou reduzidos
- Impacto para a parte representada
- Pontos que exigem negociacao
- Sugestao de redacao alternativa, se necessario

Nao presuma intencao das partes. Analise apenas o texto fornecido e marque lacunas.`,
  },
  {
    id: "p16",
    title: "Plano de resposta a incidente",
    category: "lgpd",
    level: "alto",
    purpose: "Estruturar as primeiras ações diante de possível incidente com dados pessoais.",
    inputs: ["descricao do incidente", "dados afetados", "titulares", "sistemas", "hora da descoberta"],
    prompt: `Atue como apoio juridico-operacional em possivel incidente de seguranca envolvendo dados pessoais.

Descricao:
[INCIDENTE]

Dados possivelmente afetados:
[DADOS]

Titulares:
[TITULARES]

Sistemas envolvidos:
[SISTEMAS]

Hora/data de descoberta:
[DATA_HORA]

Entregue:
1. Acoes imediatas nas proximas 24 horas.
2. Informacoes que precisam ser confirmadas.
3. Evidencias a preservar.
4. Riscos para titulares e organizacao.
5. Pontos para avaliar comunicacao a ANPD e titulares.
6. Minuta de registro interno do incidente.

Regras:
- Nao conclua que houve incidente sem apuracao.
- Nao recomende comunicacao externa sem validacao juridica.
- Priorize contencao, evidencia, governanca e registro.`,
  },
];
