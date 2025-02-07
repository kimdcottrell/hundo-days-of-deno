const sample_arr = ["a", "b", "c", "d", "e", "f", "g", "h", "i"]

// we are searching thru an already sorted array
const search = (arr: any[], target: string, start: number, end: number) => {
    if ( start > end ) {
        return "target does not exist"
    }
    
    const middle = Math.floor( ( start + end ) / 2 );

    // console.log(`sanity: searching at ${arr[middle]} for ${target}`)
    if ( arr[middle] === target ) {
        return `Found it! ${arr[middle]}`
    }

    if( arr[middle] > target ) {
        console.log(`searching at ${arr[start]} to ${arr[middle-1]}`)
        return search(arr, target, start, middle-1)
    }

    if( arr[middle] < target ) {
        console.log(`searching at ${arr[middle+1]} to ${arr[end]}`)
        return search(arr, target, middle+1, end)
    }

}

search(sample_arr, "f", 0, sample_arr.length-1);