export const textLength = (x: any) => {  
    if(x > 10){ 
      return (x?.itemName).slice(0, 10)+"...";
    } 
    return x?.itemName
  };