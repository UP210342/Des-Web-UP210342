//function getUsers(callback) {
  //  setTimeout(() => {
    //    const users = [
      //      { name: "rogelio", years: 22 },
        //    { name: "Luis", years: 30 }
        //];

        //callback(users);
    //}, 2000);
//}



function getUserswithPromise() {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            const users = [
                { name: "rogelio", years: 22 },
                { name: "Luis", years: 30 }
            ];

            resolve(users);
        }, 2000);
    });

    return promise;
}



//function getInfo(name, callback) {
//    setTimeout(() => {
//        let error = null;
//        const saludo = "Hola " + name + ", Como estás???";
//
//        if (name === "rogelio") {
//            error = new Error("Está mal");
//        }
//
//        callback(saludo, error);
//    }, 5000);
//}



function getInfowithPromise(name) {
    setTimeout(() => {
        return new Promise((resolve, reject) => {
            let error = null;
            const saludo = "Hola " + name + ", Como estás???";

            if (name === "rogelio") {
                error = new Error("Está mal");
            }

            callback(saludo, error);
        }, 5000);
    });
};



//getUsers((users) => {
    //for (let i = 0; i < users.length; i++) {
  //      getInfo(users[i].name, (saludo, error) => {
//            if (error != null) {
            //    console.log("Existe un error", error)
          //  } else {
        //        console.log(saludo);
      //      }
    //    });
  //  }
//})



getUserswithPromise()
    .then((users) => {
        let newResponses = [];
        for (let i = 0; i < users.length; i++) {
            newResponses.push(getInfowithPromise(users[i].name))
        }
        console.log(newResponses);
        return Promise.all(newResponses);
    })
    .then((info) => {
        console.log(info);
    })
    .catch((error) => {
        console.log("error en la promesa", error)
    });

getInfowithPromise()
    .then((users) => {
        let newResponses = [];
        for (let i = 0; i < users.length; i++) {
            getInfowithPromise(users[i].name)
                .then((saludo) => {
                    console.log(saludo);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    });