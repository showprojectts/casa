export const ROOMS=[
{id:'sala',n:'Sala de estar',f:0,x:[-5,-1],z:[-4,1],c:'#c8a77a',d:'Espaço de convivência da família. Janelões deixam o sol entrar durante o dia e reduzem o uso de lâmpadas.',i:['Sofá','Mesa de centro','Painel de TV','Estante','Janelas amplas','Lâmpada LED']},
{id:'cozinha',n:'Cozinha',f:0,x:[-1,2],z:[-4,1],c:'#d6d3cd',d:'Preparo das refeições. Janelas na frente e nos fundos permitem ventilação cruzada e tiram o calor do fogão.',i:['Bancada com pia e fogão','Armários','Geladeira','Ilha','Escada para o 2º andar']},
{id:'servico',n:'Área de serviço',f:0,x:[2,4],z:[-4,1],c:'#b8c4cc',d:'Lavagem de roupas. A água da cisterna (chuva) pode abastecer o tanque e a limpeza.',i:['Máquina de lavar','Tanque','Cesto de roupas','Prateleira','Porta para o quintal']},
{id:'quarto1',n:'Quarto 1',f:1,x:[-5,-1.5],z:[-4,1],c:'#bfa07a',d:'Quarto do casal, com janela ampla para luz natural e sacada com jardineira que refresca o ambiente.',i:['Cama de casal','Guarda-roupa','Escrivaninha','Janela com sacada verde']},
{id:'banheiro',n:'Banheiro',f:1,x:[-1.5,.5],z:[-4,-1],c:'#cfe3ee',d:'Banheiro completo com descarga econômica de duas vazões, que economiza água em cada uso.',i:['Vaso com descarga econômica','Pia','Box de chuveiro','Janela de ventilação']},
{id:'corredor',n:'Corredor',f:1,x:[-1.5,.5],z:[-1,1],c:'#d8d2c4',d:'Circulação do 2º andar. Liga a escada, os quartos e o banheiro.',i:['Escada','Porta do Quarto 1','Porta do Quarto 2','Porta do banheiro']},
{id:'quarto2',n:'Quarto 2',f:1,x:[.5,4],z:[-4,1],c:'#bfa07a',d:'Quarto de hóspedes ou estudo, com janelas em lados opostos para ventilação cruzada.',i:['Cama','Guarda-roupa','Escrivaninha','Janelas frente e fundos']}]
export const INFO={
solar:['Painéis solares','Transformam a luz do sol em eletricidade limpa. Reduzem a conta de luz e as emissões de gás carbônico.','Seis painéis de 550 W somam cerca de 3,3 kWp e geram uns 400 kWh por mês, bem acima do consumo médio de uma casa brasileira (algo em torno de 160 kWh).'],
windows:['Janelas e iluminação natural','Janelas amplas trazem luz do sol e ventilação. Menos lâmpadas acesas de dia, menos energia gasta.','Quatro lâmpadas de 9 W apagadas durante 8 horas de luz do dia evitam cerca de 0,3 kWh por dia.'],
led:['Lâmpadas LED','Gastam até 80% menos energia que as incandescentes e duram muito mais.','Uma LED de 9 W dá a mesma luz de uma incandescente de 60 W: uns 85% menos potência.'],
tank:['Captação de chuva','A chuva do telhado escorre pela calha e pelos canos até o reservatório azul. A água fica guardada na cisterna para reúso.','Cada 1 mm de chuva sobre 1 m² de telhado rende 1 litro. Com uns 68 m² de telhado e 1.000 mm de chuva por ano, são cerca de 50 mil litros por ano, já descontando perdas. A cisterna da maquete guarda uns 2.400 litros.'],
horta:['Reuso da água e horta','A água da chuva armazenada irriga a horta e o jardim por tubulação. O composto da composteira nutre os canteiros.','Uma mangueira aberta por 15 minutos gasta quase 280 litros de água tratada. Com a chuva guardada, esse gasto some da conta.'],
desc:['Descarga econômica','Duas vazões: pouca água para resíduos líquidos e mais água para sólidos. Economiza milhares de litros por ano.','A descarga dupla usa 3 ou 6 litros, contra mais de 10 litros das antigas. Em uma casa com 4 pessoas isso pode poupar mais de 30 mil litros por ano.'],
bins:['Lixeira seletiva','Azul: PAPEL. Vermelha: PLÁSTICO. Verde: VIDRO. Amarela: METAL. Separar facilita a reciclagem.','Reciclar alumínio gasta cerca de 95% menos energia do que produzir do zero.'],
compost:['Composteira','Restos de frutas, verduras e folhas viram adubo natural. Menos lixo no aterro e terra mais fértil na horta.','Os restos orgânicos são quase metade do lixo de uma casa. Na composteira, viram adubo em cerca de 2 a 3 meses.'],
vent:['Ventilação cruzada','Aberturas em lados opostos criam correntes de ar que renovam e refrescam a casa sem ar-condicionado.','Um ventilador de teto usa cerca de 70 W; um ar-condicionado pequeno costuma passar de 700 W.'],
shade:['Beirais e sombreamento','O telhado e o beiral de madeira bloqueiam o sol forte de verão e deixam o sol baixo de inverno entrar.','O beiral da maquete avança 0,9 m: o sol alto do verão fica de fora e o sol baixo do inverno entra.'],
plants:['Vegetação','Árvores, jardineiras e a horta fazem sombra, liberam umidade e reduzem a temperatura ao redor da casa.']}

// Os 4 grupos obrigatórios do Projeto Síntese (mesma ordem do quadro)
export const CATS=[
{id:'energia',n:'Energia',c:'#d9971a',items:['solar','heater','windows','led','ev']},
{id:'agua',n:'Água',c:'#2b7bb9',items:['tank','horta','cinza','desc']},
{id:'residuos',n:'Resíduos',c:'#5a8f3c',items:['bins','compost']},
{id:'conforto',n:'Conforto térmico',c:'#c0566f',items:['vent','shade','plants']},
{id:'extras',n:'Entrada e acesso',c:'#6b7a8f',items:['rampa','numero','correio','sensor']}]
export const catOf=id=>CATS.find(k=>k.items.includes(id))

// Para onde a câmera voa quando o item é escolhido no menu
export const FOCUS={
solar:{pos:[7,12,15],tgt:[-.5,5.6,-1.5]},
windows:{pos:[-4,4.2,15],tgt:[-1,3,1]},
led:{pos:[1,2,13],tgt:[-.5,3,-2],cut:true,lights:true},
tank:{pos:[15,6,6],tgt:[6,2.6,-2.2]},
horta:{pos:[6,6.5,12],tgt:[4,.5,3.2]},
desc:{pos:[-.7,5.6,9],tgt:[-.7,3.9,-3.6],cut:true},
bins:{pos:[8,3.6,13],tgt:[8,.8,5.8]},
compost:{pos:[16,5,3],tgt:[8.8,1,-4]},
vent:{pos:[12,7,14],tgt:[0,2.5,-1],cut:true,vent:true},
shade:{pos:[6,5,10],tgt:[1.2,3.2,1.5]},
plants:{pos:[-9,4,12],tgt:[-4,2,3]}}

// Conceito científico de cada item (edite conforme o que a turma estudou no trimestre)
const SCI={
solar:'Efeito fotovoltaico: a luz do sol libera elétrons nas células de silício e gera corrente elétrica (energia solar vira energia elétrica).',
windows:'A luz visível atravessa o vidro, e parte da radiação infravermelha (calor) também entra. Por isso o beiral controla quanto sol chega às janelas.',
led:'Diodo emissor de luz: a corrente passa por um semicondutor e produz luz direto, sem esquentar um filamento. Perde menos energia em forma de calor.',
tank:'Ciclo da água e gravidade: a chuva escorre pelo telhado e desce pelos tubos até a cisterna sem precisar de bomba.',
horta:'Reaproveitamento da água do ciclo hidrológico: o solo e as plantas devolvem a água ao ar por evapotranspiração.',
desc:'Volume e pressão: a descarga dupla libera 3 L ou 6 L, usando só o volume necessário para cada tipo de resíduo.',
bins:'Reciclagem e conservação da matéria: os materiais voltam como matéria-prima, e separar por tipo evita contaminação e poupa energia.',
compost:'Decomposição: bactérias e fungos (decompositores) quebram a matéria orgânica e devolvem os nutrientes ao solo em forma de húmus.',
vent:'Convecção e diferença de pressão: o ar quente é menos denso e sobe, saindo pelas aberturas, enquanto o ar fresco entra e renova o ambiente.',
shade:'Transferência de calor por radiação: o beiral barra o sol alto do verão e deixa entrar o sol baixo do inverno. Use o controle de hora do dia e o sol de inverno.',
plants:'Evapotranspiração e sombra: as plantas liberam vapor de água e absorvem radiação, o que refresca o ambiente ao redor.'}
for(const k in SCI){INFO[k][2]=INFO[k][2]||'';INFO[k][3]=SCI[k]}

export const MOSTRAR_SOBRE=false // troque para true para mostrar o botão "Sobre o projeto" no menu
export const MOSTRAR_COMO_USAR=false // true mostra o quadro "Como usar" no fim do menu
export const GRUPO=[] // coloque aqui os nomes do grupo, ex.: ['Nome 1','Nome 2']
export const PROJETO={
titulo:'Projeto Síntese: Casa do Futuro 2.0',
objetivo:'Aplicar os conceitos científicos estudados ao longo do trimestre.',
metodologia:'Produção, idealização e confecção de uma Casa 2.0.',
produto:'Em grupo, uma maquete (aqui em 3D) de uma casa 2.0 com pelo menos 2 quartos, 1 banheiro, 1 sala, 1 área de serviço e 1 cozinha.',
orientacao:'Fachada principal voltada para o norte: os painéis solares e as janelas grandes pegam o sol da manhã até o fim da tarde.'}

export const NUM_CASA='20' // número da casa na placa da entrada

INFO.heater=['Aquecedor solar de água','Um coletor no telhado esquenta a água com o sol e guarda no reservatório térmico (boiler). Assim o chuveiro elétrico trabalha bem menos.','Um chuveiro elétrico de 5.500 W gasta cerca de 0,9 kWh em um banho de 10 minutos. O coletor solar substitui boa parte disso (estimativa).','Radiação, condução e convecção: a superfície escura absorve a radiação do sol e passa o calor para a água. A água quente, menos densa, sobe até o reservatório (termossifão).']
INFO.ev=['Carro elétrico (recarga solar)','O carregador da garagem recebe a energia dos painéis solares. De dia o carro "abastece" com o sol e não emite gás carbônico pelo escapamento.','Um carro elétrico gasta uns 15 kWh a cada 100 km. Dos cerca de 400 kWh mensais dos painéis, sobrando uns 240 kWh depois do consumo da casa, dá para rodar uns 1.600 km por mês (estimativa).','Conservação de energia: a energia solar vira energia elétrica, fica guardada como energia química na bateria e depois vira energia de movimento no motor.']
INFO.cinza=['Reúso da água da máquina','A água cinza da máquina de lavar passa por um filtro e vai para uma caixa de reúso. Ela serve para irrigar o jardim e lavar o quintal, mas não é potável.','Uma máquina de lavar usa cerca de 100 a 150 litros por ciclo. Reaproveitar 3 ciclos por semana rende perto de 20 mil litros por ano (estimativa).','Filtração e separação de misturas: o filtro retém fiapos e sujeira, e o solo do jardim completa a limpeza da água.']
INFO.rampa=['Rampa de acesso','Rampa suave com corrimão na entrada, para cadeira de rodas, carrinho de bebê e idosos chegarem à porta sem degraus.','A norma de acessibilidade (NBR 9050) aceita no máximo 8,33% de inclinação. A rampa da maquete tem cerca de 6%.','Plano inclinado: quanto mais suave a inclinação, menor a força para subir, porque a mesma altura é vencida em uma distância maior.']
INFO.numero=['Número da casa','Placa com o número ao lado da porta, para entregas, correio e emergências encontrarem a casa rápido.','','Comunicação visual: contraste e tamanho dos algarismos ajudam a leitura à distância.']
FOCUS.heater={pos:[6,11,6],tgt:[0,5.6,-4.2]}
FOCUS.ev={pos:[-14,4,9],tgt:[-7.5,.8,4.5]}
FOCUS.cinza={pos:[11,5,2],tgt:[4.6,.3,0]}
FOCUS.rampa={pos:[-4.5,2.4,9],tgt:[-1.6,.4,1.8]}
FOCUS.numero={pos:[-3,2.2,7],tgt:[-1,1.6,1]}

INFO.correio=['Caixa de correio','Caixa na entrada, perto do portão, para a correspondência não molhar nem se perder e a entrega ficar fácil.','','Reaproveitamento de materiais: fazer a caixa com metal ou madeira reaproveitados evita extrair e processar matéria-prima nova.']
INFO.sensor=['Luz do jardim com sensor','Luminárias LED baixas no caminho que acendem só quando o sensor de presença detecta alguém e apagam sozinhas.','Uma LED de 5 W acesa 10 horas por noite gasta 1,5 kWh por mês. Com sensor, ligada só uns 15 minutos por noite, gasta cerca de 0,04 kWh por mês (estimativa).','Sensor infravermelho passivo (PIR): detecta a variação da radiação infravermelha emitida pelo calor do corpo e fecha um circuito que liga a luz.']
FOCUS.correio={pos:[2,2.6,11.5],tgt:[-.4,.9,6.9]}
FOCUS.sensor={pos:[-6,2.6,10],tgt:[-1.6,.3,5.1]}
