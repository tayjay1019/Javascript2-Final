const HomePage = Vue.component('HomePage', {
    props: {},

    template: `
        <div class="home page">
            <h2>About Us</h2>
            
            <p>Thomas Joseph Studio I was founded back when dirt was invented in order to keep the owner (Thomas)
            out of trouble and able to make money after leaving beauty school.  The shop no longer exists,
             but he can still be found somewhere in the area, still cutting hair.</p>
             
             <div id="salon"></div>
        </div>
    `,
});

const ReviewsPage = Vue.component('ReviewsPage', {
    props: {},
    data(){
      return {
          searchResults: new ReviewCollection(),
          reviews: new ReviewCollection(),
          bookshelf: 'store',
      }
    },

    methods: {

        searchReviews() {
            // prepare and perform search
            // clear results
            this.searchResults = new ReviewCollection();

            // display message
            this.searching = true;

            // build request arguments

            // TODO: build ajax request arguments
            // yelp API url that causes issues
            //let url = 'https://api.yelp.com/v3/businesses/thomas-joseph-studio-san-diego/reviews'
            let url = 'http://localhost:8010/proxy/businesses/thomas-joseph-studio-san-diego/reviews'
            let config = {
                params: {
                    maxResults: 3,
                    filter: 'partial'
                },
                headers: {
                    "Authorization": 'bearer -RwRIRsSRKYqNgKgkEp9YGW_nbcET-yQxOBkHohUd1OzJeLxizu0glwCeT45Rj2PJSyK2aJbXSJh_OExJ_d81sH7Anu8_5ywdECRKraGRCx4wi9mlbw1c0uLvnSVYXYx'
                }
            }

            // have to let tyler get back to me to make this block of code work

            axios.get(url, config)
                // successful response from api (status 200)
                .then((response) => {
                    console.log('Success', response);

                    if(response.data.reviews){
                        // set search results to data from api
                        // using my custom collection
                        //this.searchResults = new BookCollection(response.data.items);

                        // without custom collection
                        this.searchResults = response.data.reviews;
                    }
                })
                .catch((error) => {
                    console.error(error);
                })
                .finally(() => {
                    // remove searching message
                    this.searching = false;

                })

        },


    },

    mounted: function() {
        // perform default search
        this.searchReviews();
    },

    template: `
        <div class="reviews page">
            <h2>Reviews</h2>
            <div>
                 <b-tabs content-class="mt-3">
                        <b-tab title="Thomas" active><p>Reviews for Thomas</p>
                            <b-row>
                                <review v-for="review in searchResults" :key="review.id" :review="review"></review>
                            </b-row>
                        </b-tab>
                        <b-tab title="Scott"><p>Reviews for Scott</p>
                            <b-row>
                                <review v-for="review in searchResults" :key="review.id" :review="review"></review>
                            </b-row>
                        </b-tab>
                        <b-tab title="Leslie"><p>Reviews for Leslie</p>
                            <b-row>
                                <review v-for="review in searchResults" :key="review.id" :review="review"></review>
                            </b-row>
                        </b-tab>
                </b-tabs>
            </div>
        </div>
    `,

});

const BookPage = Vue.component('BookPage', {
    props: {},
    data(){
        return  {
            newAppointment: {
                appointment: new Appointment(),
            },
            appointments: [], // placeholder until firebase data is loaded
            addAppointmentModal: false, // show/hide modal

        }
    },

    template: `
        <div class="book page">
            <h2>Booking Appointments</h2>
            <div>
                <b-button @click="addAppointmentModal = !addAppointmentModal" variant="outline-light"><i class="fas fa-plus"></i> New Appt</b-button>
                <div id="myCalendar">
                
                </div>
            </div>
            
            <!-- Modal Component -->
            <b-modal v-model="addAppointmentModal" title="New Appointment"
             header-bg-variant="primary" header-text-variant="light"
             ok-title="Add Appointment" @ok="addAppointment">

                <b-tabs content-class="mt-3">
                    <b-tab title="Name" active>
                        <b-form-group label="Name:" label-for="name">
                            <b-form-input
                                    id="name"
                                    v-model="newAppointment.appointment.name"
                                 required
                            ></b-form-input>
                        </b-form-group>

                        <b-form-group label="Stylist:" label-for="stylist">
                            <b-form-dropdown id="stylist" v-model="newAppointment.appointment.stylist" required>
                                <b-dropdown-item>Thomas</b-dropdown-item>
                                <b-dropdown-item>Scott</b-dropdown-item>
                                <b-dropdown-item>Leslie</b-dropdown-item>
                            </b-form-dropdown>
                        </b-form-group>

                        <b-form-group label="Gender:" label-for="gender">
                            <b-form-input id="gender" v-model="newAppointment.appointment.gender" required></b-form-input>
                        </b-form-group>

                        <b-form-group label="Cut type:" label-for="type">
                            <b-form-dropdown id="type" v-model="newAppointment.appointment.type" required>
                                <b-dropdown-item>Haircut</b-dropdown-item>
                                <b-dropdown-item>Color</b-dropdown-item>
                                <b-dropdown-item>Cut/Color</b-dropdown-item>
                                <b-dropdown-item>Highlight</b-dropdown-item>
                            </b-form-dropdown>
                        </b-form-group>

                    </b-tab>

                </b-tabs>
            </b-modal>
        </div>
        
    `,

});