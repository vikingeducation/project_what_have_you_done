class Bill {
  constructor( bill_id ){
    this.bill_id = bill_id;
  }
  say_hello(){
    console.log( "Hello!!!" );
  }
}

module.exports = Bill;
