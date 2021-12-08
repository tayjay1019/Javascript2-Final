// Include Firebase plugin
Vue.use(Vuefire);

// Create the router instance and pass the `routes` option
const router = new VueRouter({
    routes: [
        { path: '/', component: HomePage }, // default page
        { name: 'home', path: '/home', component: HomePage },
        { name: 'reviews', path: '/reviews', component: ReviewsPage },
        { name: 'book', path: '/book', component: BookPage },
    ],
});

// Initialize App
const app = new Vue({
    // el: the DOM element to be replaced with a Vue instance
    el: '#app',
    // router: router, // same as...
    router,
    // data: all the data for the app
    data: {
        newAppointment: {
            appointment: new Appointment(),
        },
        appointments: [], // placeholder until firebase data is loaded
        addAppointmentModal: false, // show/hide modal
        searchResults: new ReviewCollection(),
        reviews: new ReviewCollection(),
        bookshelf: 'store',
    },
    firestore: {
        // bind as an array by default
        appointments: db.collection('appointments'),
    },

    // methods: usually "events" triggered by v-on:
    methods: {
        addAppointment(){

            // add appointment to firebase
            db.collection('appointments')
                .add(this.newAppointment.appointment)
                .then((docRef) => {
                    console.log("Document added", docRef);

                    // clear the form
                    this.newAppointment.appointment = new Appointment();

                    // close the modal
                    this.addAppointmentModal = false;
                })
                .catch((error) => {
                    console.log("Error adding document", error);
                    alert('Error!');
                })
        },
        // change "page" by setting books array
        display(bookshelf){
            this.bookshelf = bookshelf;

            switch(this.bookshelf){
                case 'store':
                    this.reviews = this.searchResults;
                    break;
                case 'bookmarks':
                    this.books = this.bookmarks;
                    break;
                case 'favorites':
                    this.books = this.favorites;
                    break;
            }

        },
        // LOAD REVIEWS

    },

    // computed: values that are updated and cached if dependencies change
    computed: {

    },
    mounted: function() {

    },

});