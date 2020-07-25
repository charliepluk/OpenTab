export function syncStringToArray(syncString) {
  var customerOrderString = syncString;
  //var reducedArray = syncStringToArray(customerOrderString);
  var char = ",\n";
  var i = 0;
  var j = 0;
  var customerOrderArray = [];
  var count = 0;

  //takes each line from the customerOrderString, parses it into a JSON obj and pushes it into the array
  while ((j = customerOrderString.indexOf(char, i)) !== -1) {
    customerOrderArray.push(JSON.parse(customerOrderString.substring(i, j)));
    count++;
    i = j + 1;
  }

  //condenses the customerOrderArray into an array where the same items merge into a single object with the proper quantity
  var arrLength = customerOrderArray.length;
  var reducedArray = [];
  var completedIDs = [];
  var currentID = 0;
  var checkedAgainstID = 0;
  var countItem = 0;
  for (i = 0; i < arrLength; i++) {
    checkedAgainstID = customerOrderArray[i].itemID;
    if (!completedIDs.includes(checkedAgainstID)) {
      completedIDs.push(checkedAgainstID);
      for (j = 0; j < arrLength; j++) {
        currentID = customerOrderArray[j].itemID;
        if (checkedAgainstID == currentID) {
          countItem = countItem + customerOrderArray[j].quantity;
        }
      }
      //create object with proper quantity for item (checkedAgainstID)
      var condensedItem = {
        itemID: checkedAgainstID,
        itemName: customerOrderArray[i].itemName,
        quantity: countItem,
        itemPrice: customerOrderArray[i].itemPrice,
        totalPrice: countItem * customerOrderArray[i].itemPrice,
      };
      reducedArray.push(condensedItem);
      countItem = 0;
    }
  }

  return reducedArray;
}
