const data = [
    {
        price : 1,
        note : "abc",
        date : "2021-08-11T07:24:30.087+0000"
    },
    {
        price : 3,
        note : "xyz",
        date : "2021-08-09T07:24:30.087+0000"
    },
    {
        price : 4,
        note : "pqr",
        date : "2021-08-12T07:24:30.087+0000"
    },
    {
        price : 2,
        note : "mno",
        date : "2021-08-10T07:24:30.087+0000"
    }
]

const data1 = [
    {
        price : 11,
        note : "abc",
        date : "2021-08-28T07:24:30.087+0000"
    },
    {
        price : 31,
        note : "xyz",
        date : "2021-08-28T07:24:30.087+0000"
    },
    {
        price : 41,
        note : "pqr",
        date : "2021-08-25T07:24:30.087+0000"
    },
    {
        price : 21,
        note : "mno",
        date : "2021-08-19T07:24:30.087+0000"
    }
]


const alldata = [...data,...data1]

alldata.sort((a,b)=>(new Date(a.date) - new Date(b.date)))

console.log(alldata);
