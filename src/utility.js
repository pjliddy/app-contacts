export function areEqual(obj1, obj2) {
  return Object.keys(obj1).every((key) => obj2.hasOwnProperty(key) && (obj1[key] === obj2[key]));
}

/*
  Object.keys(obj1) => array of key strings
  .every( ) iterates through each key and checks if:
    a) each key in obj1 is a property (not inherited) in (hasOwnProperty())
    b) and the value of each key is the same in obj1 and obj2
*/
