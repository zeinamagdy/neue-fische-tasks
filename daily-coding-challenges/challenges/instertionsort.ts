// for i from 1 to length(arr) - 1:
//   current = arr[i]
//   j = i - 1
//   while j >= 0 and arr[j] > current:
//     arr[j+1] = arr[j]
//     j = j - 1
//   arr[j+1] = current

const insertionSort = (arr: number[]): void => {
  // Start at index 1 (second element)
  for (let i = 1; i < arr.length; i++) {
    let current = arr[i];
    let j = i - 1;

    while (j >= 0 && arr[j]! > current!) {
      arr[j + 1]?arr[j]:null; 
      j--;
    }
    arr[j + 1]?  current :null;
  }
};

