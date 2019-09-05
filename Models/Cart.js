module.exports=function cart(oldCart){
    console.log("In cart model");
    this.items=oldCart.items || {} ;
    this.totalQty=oldCart.totalQty || 0;
    this.totalPrice=oldCart.totalPrice || 0;

    this.add=function(item, id){
       // console.log(item);
        var storedItem= this.items[id];
        if(!storedItem){
            storedItem=this.items[id]={item: item, qty:0, price:0};
           
        }
        storedItem.qty++;
        storedItem.price= storedItem.item.Price * storedItem.qty;
        this.totalQty++;
        this.totalPrice += parseInt(storedItem.item.Price);
    }


    this.generateArray= function(){
            var arr=[];
            for (var id in this.items){
                arr.push(this.items[id]);
            }
            return arr;
    };
};   