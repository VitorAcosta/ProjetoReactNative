class No{
  constructor(valor){
    this.valor = valor;
    this.proximo = null;
    this.anterior = null;
  }
}

export default class LDDE{
  constructor(){
    this.primeiro = null;
    this.ultimo = null;
    this.n = 0;
  }

  insere(valor){
    let novoNo = new No(valor);
    if(!novoNo){
      return false;
    }

    let noAnterior = null;
    let noAtual = this.primeiro;

    /**
     * Foi notado um bug no javascript onde décimos, se comparado com unidades retornaria
     * no 'noAtual.valor < valor' o resultado FALSE. Ao invés de transformar os dados somente para Int ou Float,
     * decidiu-se realizar a comparação de outra maneira, igualmente eficiente.
     */
    while(noAtual != null && (noAtual.valor - valor) < 0){
      noAnterior = noAtual;
      noAtual = noAtual.proximo;
    }

    if(noAnterior){ //Caso já possua elementos na lista
      noAnterior.proximo = novoNo;
      novoNo.anterior = noAnterior;
    }
    else{
      this.primeiro = novoNo;
    }

    if(noAtual){
      noAtual.anterior = novoNo}
    else{
      this.ultimo = novoNo;
    }

    novoNo.proximo = noAtual;
    this.n++;
    return true;
  }
  
  busca(valor){
        let temp = this.primeiro;
        for(let i=0; i < this.n; i++) {
            if (temp.valor == valor)
                return [true,i];
            temp = temp.proximo;
        }
        return [false,-1];
  }

  remove(valor){
    let atual = this.primeiro;
    let anterior = null;

    for(let i=0; i < this.n && atual.valor != valor; i++) {
        anterior = atual;
        atual = atual.proximo;
    }
    if(!atual || atual.valor != valor){
        return [false,'O valor a ser removido não existe.'];
    }

    if(anterior){
        anterior.proximo = atual.proximo;
    }
    else{
        this.primeiro = atual.proximo;
    }

    if(atual.proximo){
        atual.proximo.anterior = atual.anterior;
    }
    else{
        this.ultimo = anterior;
    }
    this.n--;
    return [true,'Valor removido com sucesso'];
  }

  imprime(){
    let temp = this.primeiro;
    for(var i = 0; i < this.n; i++){
      console.log(temp.valor);
      temp = temp.proximo;
    }
    console.log("\n");
  }

  transformaArray(){
    let temp = this.primeiro;
    var array = [];
    for(var i = 0; i < this.n; i++){
      array.push([(temp.anterior)?true:false, temp.valor, (temp.proximo)?true:false]);
      temp = temp.proximo;
    }
    return array;
  }
}