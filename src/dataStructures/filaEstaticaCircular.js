export default class Fila{
    constructor(){
        this.fila = [];
        this.begin = 0;
        this.end = 0;
        this.tamanho = 10; //Max+1
    }

    enfileira(numero){
        if((this.end+1)%(this.tamanho) === this.begin){
            return false;
        }
        this.fila[this.end] = numero;

        this.end = (this.end+1) % (this.tamanho);
        
        return true;
    }

    desinfileira(){
        if(this.begin === this.end){
            return [false, this.fila[0]];
        }
        let temp = this.fila[this.begin];
        this.begin = (this.begin + 1) % (this.tamanho);
        return [true,temp];
    }

    imprime(){
        for(var i = this.begin; i != this.end; i=(i + 1) % (this.tamanho)){
            console.log(this.fila[i]);
        }
        console.log('Fim Impressão');
    }
}