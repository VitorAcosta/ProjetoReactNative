export default class Fila{
    constructor(){
        this.fila = [];
        this.begin = 0;
        this.end = 0;
        this.tamanho = 8; 
        //Inicialização do vetor.
        for(let i=0; i < this.tamanho; i++){
            this.fila[i] = " ";
        }
    }

    enfileira(numero){
        if((this.end+1)%(this.tamanho) === this.begin){
            return false;
        }
        
        this.fila[this.end] = numero;
        this.imprime();

        this.end = (this.end+1) % (this.tamanho);
        
        return true;
    }

    desinfileira(){
        if(this.begin === this.end){
            return [false, this.fila[0]];
        }
        let temp = this.fila[this.begin];
        this.fila[this.begin] = " ";
        this.begin = (this.begin + 1) % (this.tamanho);
        return [true,temp];
    }

    busca(valor){
        for(var j = 0; j < this.tamanho; j++){
          if(this.fila[j] === valor){
            return j;
          }
        }
        return -1;
    }

    limpa(){
        for(let i=0; i < this.tamanho; i++){
            this.fila[i] = " ";
        }
        this.begin = this.end;
    }

    imprime(){
        for(var i = this.begin; i != this.end; i=(i + 1) % (this.tamanho)){
            console.log(this.fila[i]);
        }
        console.log('Fim Impressão');
    }
}