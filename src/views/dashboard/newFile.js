import { mapGetters } from 'vuex';

export default {
    name: 'Dashboard',
    computed: {
        ...mapGetters([
            'name'
        ])
    }
};
