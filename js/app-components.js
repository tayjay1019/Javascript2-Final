Vue.component('appointment', {
    props: {
        appointment: {type: Object, required: true},
    },

    data: function(){
        return {
            showDetails: false,
        };
    },

    computed: {


    },

    methods: {

        remove(){
            // remove appointment
            db.collection('appointments').doc(this.appointment.id)
                .delete()
                .catch((error) => {
                    // TODO: handle error
                });
        },

    },

    template: `
        
        <b-card class="recipe mb-3" :header="appointment.name" header-bg-variant="primary" header-text-variant="white">
            <b-card-text>
                <b-row class="bottom-divider">
                    <b-col md="6" class="d-flex flex-column">
                  
                        <div class="description">{{appointment.stylist}}</div>
                        
                        <div class="buttons mt-auto d-flex flex-row justify-content-around">
                            <b-button size="sm" variant="outline-primary" @click="like"><i class="fas fa-thumbs-up"></i> Like It</b-button>
                            <b-button size="sm" variant="outline-primary"><i class="fab fa-pinterest"></i></i> Pin It</b-button>
                            <b-button size="sm" variant="outline-primary"><i class="fas fa-share-alt"></i> Share It</b-button>
                            <b-button size="sm" variant="outline-primary" @click="remove"><i class="fas fa-trash"></i> Trash It</b-button>
                            
                        </div>
                    </b-col>
                    
                    
                </b-row>
                <b-row>
                    <b-col md="6" class="md-col-divider">
                        <h5>Type of appointment</h5>
                        <ul>
                            <li>{{appointment.type}}</li>
                        </ul>
                    </b-col>
                    <b-col md="6">
                        <h5>Length of appointment</h5>
                        <ol>
                            <li>{{appointment.time}}</li>
                        </ol>
                    </b-col>
                </b-row>
            </b-card-text>
        </b-card>
       
    `,

});

Vue.component('navigation', {
    props: {

    },

    methods: {

    },

    template: `
        <ul class="list-unstyled components">
            <li><router-link to="/home">Home</router-link></li>
            <li><router-link to="/reviews">Reviews</router-link></li>
            <li><router-link to="/book">Book Appointments</router-link></li>
        </ul>
    `,

});

Vue.component('review', {
    props: {
        review: {type: Object, required: true},
    },

    data: function(){
        return {
            showDetails: false,
        };
    },

    computed: {

    },

    methods: {
        displayDetails(){
            this.showDetails = true;
        },

    },

    //TODO: fix the formating for the individual reviews
    template:`
        <!--<b-col class="shelf" lg="2" md="3" sm="4" cols="6">
            <b-container fluid class="book-details">
                    <b-row>
                        <b-col sm="8" class="text-left col-details">
                            <dl>
                                <template v-if="review.user.name">
                                    <dt>User</dt>
                                    <dd>{{review.user.name}}</dd>
                                </template>
                                
                                <template v-if="review.rating">
                                    <dt>Rating</dt>
                                    <dd>{{review.rating}}</dd>
                                </template>
                                
                                <template v-if="review.time_created">
                                    <dt>Posted</dt>
                                    <dd>{{review.time_created}}</dd>
                                </template>
                                
                                <template v-if="review.text">
                                    <dt></dt>
                                    <dd>{{review.text}}</dd>
                                </template>                                  
                            </dl>
                        </b-col>
                    </b-row>
                </b-container>
        </b-col>-->
        
        <div class="card mb-3">
            <div class="card-body">
                <div class="card-title">
                    <span>By: {{review.user.name}}  </span>
                    <span>Score: {{review.rating}}</span>
                </div>
                <p class="card-text">{{review.text}}</p>
            </div>
        </div>
        `,

});