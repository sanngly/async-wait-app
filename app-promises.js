const users = [{
    id: 10,
    name: 'Souvick Mitra',
    schoolId: 201
}, {
    id: 21,
    name: 'Subhankar Mitra',
    schoolId: 201
}, {
    id: 31,
    name: 'Abhishek Ghosh',
    schoolId: 273
}, {
    id: 41,
    name: 'Punam Gupta',
    schoolId: 300
}];
const grades = [{
    id: 11,
    schoolId: 300,
    grade: 85
}, {
    id: 12,
    schoolId: 273,
    grade: 80
}, {
    id: 13,
    schoolId: 201,
    grade: 90
}];

const getUser = (id) => {
    return new Promise((resolve, reject) => {
        const user = users.find((user) => {
            return user.id === id;
        });
        if (user) {
            resolve(user);
        } else {
            console.log(`Unable to find user with the id of ${id}`);
        }
    });
};

const getGrades = (schoolId) => {
    return new Promise((resolve, reject) => {
        resolve(grades.filter((grade) => grade.schoolId === schoolId))
    });
};

const getStatus = (userId) => {
    let user;
    return getUser(userId).then((tempUser) => {
        user = tempUser;
        return getGrades(user.schoolId);
    }).then((grades) => {
        let average = 0;
        if (grades.length > 0) {
            average =  grades.map((grade) => grade.grade).reduce((a,b) => a + b) / grades.length
        }
        return `${user.name} has ${average} % in tha class`;        
        //console.log(average);
    });
};


// async await

/* () => {
    return new Promise((resolve, reject) => {
        return 'Mike';
    });
}; 
const getStatusAlt = async (userId) => {
    throw new Error('This is an error occured.');
    return 'Mike'; 
}; */

const getStatusAlt = async (userId) => {
    const user = await getUser(userId);
    const grades = await getGrades(user.schoolId);
    let average = 0;
    if (grades.length > 0) {
        average =  grades.map((grade) => grade.grade).reduce((a,b) => a + b) / grades.length
    }
    return `${user.name} has ${average} % in tha class`;
    //console.log(user,grades);
};

getStatusAlt(41).then((status) => {
    console.log(status)
}).catch((err) => {
    console.log(err);
});

//console.log(getStatusAlt(2));

/* getUser(21).then((user) => {
    console.log(user);
}).catch((err) => {
    console.log(err)
});

getGrades(201).then((grades) => {
    console.log(grades);
}).catch((err) => {
    console.log(err);
}); */

/* getStatus(11111).then((status) => {
    console.log(status);
}).catch((err) => {
    console.log(err);
}); */