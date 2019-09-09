//1. Understanding merge sort
    //21, 1, 26, 45, 29, 28, 2, 9, 16, 49, 39, 27, 43, 34, 46, 40
    //21, 1
    //[16, 49, 39, 27, 43, 34, 46, 40]
    //21 and 1
    //[1, 21, 26, 45] and [2, 9, 28, 29]

//2. Understanding quicksort
    //The pivot could have been 14 or 17
    //14, 17, 13, 15, 19, 10, 3, 16, 9, 12 
    //Last item as pivot
        //First partitioning (on 12): 10, 3, 9, 12, 14, 17, 13, 15, 19, 16
        //Second partitioning (on 9 and 16): 3, 9, 10, 12, 14, 13, 15, 16, 17, 19
    //First item as pivot
        //First partitioning (on 14): 13, 12, 14, 17, 15, 19, 10, 3, 16, 9
        //Second partitioning (on 13 and 17): 12, 13, 14, 15, 10, 3, 16, 9, 17, 19
    
//3. Implementing quicksort

    const numstr = '89 30 25 32 72 70 51 42 25 24 53 55 78 50 13 40 48 32 26 2 14 33 45 72 56 44 21 88 27 68 15 62 93 98 73 28 16 46 87 28 65 38 67 16 85 63 23 69 64 91 9 70 81 27 97 82 6 88 3 7 46 13 11 64 76 31 26 38 28 13 17 69 90 1 6 7 64 43 9 73 80 98 46 27 22 87 49 83 6 39 42 51 54 84 34 53 78 40 14 5'

    function arrayify(str) {
        const arr = str.split(' ');
        arr.forEach((item, i) => {
            arr[i] = parseInt(item);
        })
        return arr;
    }

    const numArr = arrayify(numstr);

    function swap(array, i, j) {
        const tmp = array[i];
        array[i] = array[j];
        array[j] = tmp;
    };    

    function partition(array, start, end) {
        const pivot = array[end - 1];
        let i = start;
        for (let j = start; j < end - 1; j++) {
            if (array[j] <= pivot) {
                swap(array, j, i);
                i++;
            }
        }
        swap(array, end-1, i);
        return i;
    };

    function qSort(array, start = 0, end = array.length) {
        if (start >= end) {
            return array;
        }
        const middle = partition(array, start, end);
        array = qSort(array, start, middle);
        array = qSort(array, middle + 1, end);
        return array;
    }

    //console.log(qSort(numArr));

//4. Implementing merge sort

    function merge(left, right, array) {
        let leftIndex = 0;
        let rightIndex = 0;
        let outputIndex = 0;
        while (leftIndex < left.length && rightIndex < right.length) {
            if (left[leftIndex] < right[rightIndex]) {
                array[outputIndex++] = left[leftIndex++];
            }
            else {
                array[outputIndex++] = right[rightIndex++];
            }
        }

        for (let i = leftIndex; i < left.length; i++) {
            array[outputIndex++] = left[i];
        }

        for (let i = rightIndex; i < right.length; i++) {
            array[outputIndex++] = right[i];
        }
        return array;
    };

    function mSort(array) {
        if (array.length <= 1) {
            return array;
        }
        const mid = Math.floor(array.length / 2);
        let left = array.slice(0, mid);
        let right = array.slice(mid, array.length);

        left = mSort(left);
        right = mSort(right);
        return merge(left, right, array);
    }

    //console.log(mSort(numArr));

//5. Sorting a linked list using merge sort

//6. Bucket sort

    function bucketSort(array, bucketSize) {
        if (array.length === 0) {
        return array;
        }
    
        // Determine minimum and maximum values
        var i;
        var minValue = array[0];
        var maxValue = array[0];
        for (i = 1; i < array.length; i++) {
            if (array[i] < minValue) {
                minValue = array[i];
            } else if (array[i] > maxValue) {
                maxValue = array[i];
            }
        }
    
        // Initialise buckets
        var DEFAULT_BUCKET_SIZE = 5;
        bucketSize = bucketSize || DEFAULT_BUCKET_SIZE;
        var bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
        var buckets = new Array(bucketCount);
        for (i = 0; i < buckets.length; i++) {
            buckets[i] = [];
        }
    
        // Distribute input array values into buckets
        for (i = 0; i < array.length; i++) {
            buckets[Math.floor((array[i] - minValue) / bucketSize)].push(array[i]);
        }
    
        // Sort buckets and place back into input array
        array.length = 0;
        for (i = 0; i < buckets.length; i++) {
            insertionSort(buckets[i]);
            for (var j = 0; j < buckets[i].length; j++) {
                array.push(buckets[i][j]);
            }
        }
    
        return array;
    }

//7. Sort in place

    function randomSort(arr) {
        let temp;
        let randomIndex;
        for (let i = 0; i < arr.length; i++) {
            randomIndex = Math.floor(Math.random()*arr.length);
            temp = arr[i];
            arr[i] = arr[randomIndex];
            arr[randomIndex] = temp;
        }
        return arr;
    }

    console.log(randomSort([1, 2, 3, 4, 5, 6, 7, 8]));

//8. Sort books

    function sortBooks(arr) {
        if (arr.length <= 1) {
        return arr;
        }
    
        const middle = Math.floor(arr.length / 2);
        let left = arr.slice(0, middle);
        let right = arr.slice(middle, arr.length);
    
        left = sortBooks(left);
        right = sortBooks(right);
        return merge(left, right, arr);
    }

    const books = [
        'Harry Potter and the Sorcerors Stone',
        'Harry Potter and the Chamber of Secrets',
        'Harry Potter and the Prizoner of Azkaban',
        'Harry Potter and the Goblet of Fire',
        'Harry Potter and the Order of the Pheonix',
        'Harry Potter and the Half Blood Prince',
        'Harry Potter and the Beathly Hallows'
    ];

    console.log(sortBooks(books));