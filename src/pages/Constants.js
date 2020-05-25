import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import logo from '../../assets/logo.png';
import lddePic from '../../assets/LDDE.png';
import filaPic from '../../assets/FILA.png';

export const cardInfo = [
  {
    id: '1',
    title: 'Bem-vindo!',
    subtitle: 'Projeto: Estruturas de Dados e Mobile',
    text: 'O projeto visa apresentar e simular o funcionamento de diversas estruturas de dados.\n\n'
    +'Descubra mais, arraste para o lado!',
    image: logo,
    btnOn: false,
    textBtn: ''
  },
  {
    id: '2',
    title: 'LDDE',
    subtitle: 'Lista Dinâmica Duplamente Encadeada',
    text: 'Trata-se de uma estrutura linear dinâmica de números reais ou inteiros, ordenados de forma crescente.\n'+
    'Cada elemento pertencente a ela possui uma referência do próximo elemento e também do anterior.',
    image: lddePic,
    btnOn: true,
    textBtn: 'Descubra mais',
    toScreen: 'ldde'
  },
  {
    id:'3',
    title: 'Fila Estática Circular',
    subtitle: '',
    text: 'A fila estática circular é um vetor de tamanho definido, estático.\n'
    +'É chamada de circular pois o último valor da fila terá como próximo valor o primeiro, '
    +'e o primeiro terá como valor anterior o último, gerando um “círculo”.',
    image: filaPic,
    btnOn: true,
    textBtn: 'Descubra mais',
    toScreen: 'fce'
  } 
];

export {windowWidth, windowHeight};

export const dataFEC = [
    {
        title: 'Definição',
        extraContent: '',
        content: '\tEssa estrutura baseia-se em um vetor, com tamanho estático e com o comportamento de uma fila.\n\n '+ 
        'Isso é suas operações seguem o princípio FIFO (First In First Out),'+
        'ou seja, obedece a ordem de chegada e o primeiro valor a ser inserido na fila,'+
        'será também o primeiro a sair.\n\n',
        pseudocode:''
    },
    {
        title:'Método de inserção (enfileirar)',
        extraContent: '➥ Tempo: O(1)\n',
        content: 'A inserção de valores na fila sempre será feita no último índice possível, representado'+
        ' no pseudocódigo como a variável "fimFila".\n\n',
        
        pseudocode: 'função enfileira: logico\n\n'+
        '\tvar numero: inteiro\n'+
        '\tinicio\n\n'+
        '\tse (fimFila + 1) MOD (tamanho) = inicioFila então\n'+
        '\t\tenfileira ← FALSO\n\n'+
        '\tfila[fimFila] ← numero\n'+
        '\tfimFila ← (fimFila+1) MOD (tamanho)\n'+
        '\tenfileira ← VERDADEIRO\n\n'+
        '\tfimEnfileira\n\n'
        
    },
    {
        title: 'Método de remoção (desenfileirar)',
        extraContent: '➥ Tempo: O(1)\n',
        content: ' A remoção de valores da fila, sempre será realizada a partir do primeiro elemento da estrutura,'+
        ' representado no pseudocódigo como a variável "inicioFila".\n\n'+
        'função desinfileira: logico,inteiro\n\n',
        pseudocode: '\tvar temp: inteiro\n'+
        '\tinicio\n\n'+
        '\tse inicioFila = fimFila então\n'+
        '\t\tdesinfileira ← FALSO,-1\n\n'+
        '\ttemp ← fila[inicioFila]\n'+
        '\tinicioFila ← (inicioFila+1) MOD (tamanho)\n'+
        '\tdesinfileira ← VERDADEIRO, temp\n\n'+
        '\tfimDesinfileira\n\n\n'
    },
    {
        title: 'Método de busca',
        extraContent: '➥ Tempo: O(n)\n',
        content: 'A função busca tem como objetivo verificar se o valor inserido pelo usuário pertence ao vetor.'+
        ' A verificação é feita percorrendo todo o vetor, de ponta a ponta, '+
        'e comparando se cada valor é igual ao inserido pelo usuário.\n\n',
        pseudocode:'função busca: inteiro\n\n'+
        '\tvar j: inteiro\n'+
        '\tinicio\n\n'+
        '\tpara cada j ← 0, j < tamanho, j ← j+1 então\n'+
        '\t\tse fila[j] = valor então\n\n'+
        '\t\tbusca ← j\n'+
        '\tbusca ← -1\n\n'+
        '\tfimBusca\n'
    }
];
export const dataLDDE = [
    {
        title: 'Definição',
        extraContent: '',
        content: '\tA estrutura baseia-se em nós, onde cada nó de uma LDDE, além da informação principal,'+
        ' guarda também dois ponteiros, para o próximo nó da lista e para o nó anterior.\n\tNessa perspectiva,'+
        ' cada elemento pode tanto encontrar elementos anteriores como posteriores.\n\n',
        pseudoExists: false,
        pseudocode:''
    },
    {
        title:'Método de inserção',
        extraContent: '➥ Tempo: O(n)\n',
        content: 'A inserção de valores na lista é de forma ordenada, logo, para inserir qualquer '+
        'novo valor, é necessário percorrer os nós, até encontrar uma posição válida.\n',
        pseudoExists: true,
        pseudocode: 'função insere: logico\n\n'+
        '\tvar valor: inteiro\n'+
        '\tinicio\n\n'+
        '\tvar novoNo: instancia de classe\n'+
        '\tnovoNo ← new No(valor)\n\n'+
        '\tse novoNo = NULL então\n'+
            '\t\tinsere ← FALSO\n\n'+
        '\tvar noAnterior, noAtual\n'+
        '\tnoAnterior ← NULL\n'+
        '\tnoAtual ← primeiro\n\n'+
        '\tenquanto noAtual ≠ NULL e ((noAtual.valor - valor) < 0) então\n'+
           '\t\tnoAnterior ← noAtual\n'+
            '\t\tnoAtual ← noAtual.proximo\n\n'+
        '\tse noAnterior ≠ NULL então\n'+
            '\t\tnoAnterior.proximo ← novoNo\n'+
            '\t\tnovoNo.anterior ← noAnterior\n'+
        '\tse não\n' +
            '\t\tprimeiro ← novoNo\n\n'+
    
        '\tse noAtual ≠ NULL então\n'+
           '\t\tnoAtual.anterior ← novoNo\n'+
        '\tse não\n'+
           '\t\tultimo ← novoNo\n\n'+
        '\tnovoNo.proximo ← noAtual\n'+
        '\tn ← n+1\n'+
       '\tinsere ← VERDADEIRO\n\n'+
       '\tfimInsere\n'        
    },
    {
        title: 'Método de remoção',
        extraContent: '➥ Tempo: O(n)\n',
        content: 'Para remover itens da LDDE, o processo envolve percorrer todos os nós à procura'+
        ' do nó que possui o valor igual ao que o usuário deseja deletar.'+
        '\n\tCaso esse valor seja encontrado, o valor é excluído e as referências atualizadas.\n\n',
        pseudoExists: true,
        pseudocode: 
        'função remove: logico\n\n'+
        '\tvar valor, i: inteiro\n'+
        '\tvar atual, anterior\n'+
        '\tinicio\n\n'+
        '\tatual ← primeiro\n'+
        '\tanterior ← NULL\n\n'+
        '\tpara cada i ← 0, i < n e atual.valor ≠ valor, i ← i+1 então\n'+
            '\t\tanterior ← atual\n'+
            '\t\tatual ← atual.proximo\n\n'+        
        '\tse atual = NULL ou atual.valor ≠ valor então\n'+
            '\t\tremove ← FALSO\n\n'+
        '\tse anterior ≠ NULL então\n'+
            '\t\tanterior.proximo ← atual.proximo\n'+
        '\tse não\n'+
            '\t\tprimeiro ← atual.proximo\n\n'+
        '\tse atual.proximo ≠ NULL então\n'+
            '\t\tatual.proximo.anterior←atual.anterior\n'+
        '\tse não\n'+
           '\t\tultimo ← anterior\n\n'+
        '\tn ← n-1\n'+
        '\tremove ← VERDADEIRO\n\n'+
        '\tfimRemove\n'
    },
    {
        title: 'Método de busca',
        extraContent: '➥ Tempo: O(n)\n',
        content: 'Para buscar um valor na LDDE, a verificação é feita percorrendo toda a lista'+
        ' acessando os endereços de cada nó, de ponta a ponta, e comparando se cada valor do nó é igual ao inserido pelo usuário.\n\n',
        pseudoExists: true,
        pseudocode:'função busca: inteiro\n\n'+
        '\tvar temp\n'+
        '\tvar valor, i: inteiro\n'+
        '\tinicio\n\n'+
        '\ttemp ← primeiro\n\n'+
        '\tpara cada i ← 0, i < n, i ← i+1 então\n'+
            '\t\tse temp.valor = valor então\n'+
            '\t\tbusca ← i\n'+
            '\t\ttemp ← temp.proximo\n\n'+
        '\tbusca ← -1\n\n'+
        '\tfimBusca\n'
    }
];