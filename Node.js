export default class Node{
    constructor (v,l,r){
        this.value = v;
        this.left = null;
        this.right = null;
    }

    setLeft(l){
        this.left = l;
    }

    setRight(r){
        this.right = r;
    }

    getLeft(){
        return this.left;
    }
    getRight(){
        return this.right;
    }
}