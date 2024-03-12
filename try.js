const data = [
    {
        price : 1,
        note : "abc"
    },
    {
        price : 3,
        note : "xyz"
    },
    {
        price : 4,
        note : "pqr"
    },
    {
        price : 2,
        note : "mno"
    }
]

data.sort((a,b)=>(a.price - b.price))

console.log(data);
