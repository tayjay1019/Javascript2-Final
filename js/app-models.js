var Appointment = function(){
    return {
        name: '',
        stylist: '',
        gender: '',
        type: '',
        date: '',
        time: 0,
    }
};

// creates an array with extra methods for our Review Collections
const ReviewCollection = function(arr){
    // Load array if provided.
    // Load empty array if one was not provided.
    if(!Array.isArray(arr)){
        arr = [];
    }

    // Methods for using the collection.
    arr.add = function(review){
        return arr.push(review);
    };

    arr.remove = function(review){
        return arr.splice(arr.findReview(review), 1);
    };

    arr.contains = function(review){
        return this.findReview(review) >= 0;
    };

    // Internal function for finding reviews.
    // Assumes all reviews have an id.
    arr.findReview = function(review){
        return arr.findIndex(function(item){
            return item.id == review.id;
        });
    };

    // return array with added collection methods
    return arr;
}



// -----------------------------------------------------

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCMz82dgqUfO3BIW28cmYHNk1fdsQaVAIw",
    authDomain: "fir-demo-ec6c5.firebaseapp.com",
    projectId: "fir-demo-ec6c5",
    storageBucket: "fir-demo-ec6c5.appspot.com",
    messagingSenderId: "624745547924",
    appId: "1:624745547924:web:b7086cf8a2753fd14e4c81"
};


firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();