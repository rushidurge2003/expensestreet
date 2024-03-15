const data = [
    {
        mode: "a",
        price: 2,
    },
    {
        mode: "b",
        price: 3,
    },
    {
        mode: "a",
        price: 4,
    },
    {
        mode: "c",
        price: 2,
    },
    {
        mode: "b",
        price: 3,
    },
    {
        mode: "c",
        price: 5,
    }
]

const obj = {
    modea : {
        total : 0,
        per : 0
    },
    modeb : {
        total : 0,
        per : 0
    },
    modec : {
        total : 0,
        per : 0
    }
}

console.log(obj);

for (let i = 0; i < data.length; i++) {
    if (data[i].mode === "a") {
        obj.modea.total += data[i].price
        obj.modea.per = ((obj.modea.total/19)*100)
    }
    if (data[i].mode === "b") {
        obj.modeb.total += data[i].price
        obj.modeb.per = ((obj.modeb.total/19)*100)
    }
    if (data[i].mode === "c") {
        obj.modec.total += data[i].price
        obj.modec.per = ((obj.modec.total/19)*100)
    }
}

console.log("after",obj);

    // const obj = [
    //     {
    //         mode: "a",
    //         total: 0
    //     },
    //     {
    //         mode: "b",
    //         total: 0
    //     },
    //     {
    //         mode: "c",
    //         total: 0
    //     }
    // ]