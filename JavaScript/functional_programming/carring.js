function add(x) {
    return function(y) {
      return x + y;
    };
  }
  
  const addWithThree = add(3);
  console.log(addWithThree(5)); // 8
  console.log(addWithThree(9)); // 12
  console.log(addWithThree(29)); // 32