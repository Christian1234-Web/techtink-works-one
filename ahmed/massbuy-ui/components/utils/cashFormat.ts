export const cashFormat = (x: any, numb?: any) => {
  if(x){ 
    let number = x.replace(",","")
    if(numb){
      number = number * numb
    }
    return "₦"+Number(number).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } 
  return "₦0"
};