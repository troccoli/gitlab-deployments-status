<template>
    <div>
        <v-menu v-if="showIt"
                v-model="fromDateMenu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
        >
            <template v-slot:activator="{ on }">
                <v-text-field
                        readonly
                        :value="fromDateDisp"
                        v-on="on"
                ></v-text-field>
            </template>
            <v-date-picker
                    locale="en-in"
                    :max="maxDate"
                    v-model="fromDateVal"
                    landscape
                    @change="emitNewDate"
                    @input="fromDateMenu = false"
            ></v-date-picker>
        </v-menu>
        <v-skeleton-loader v-else ref="skeleton" type="text" :boilerplate="!loading"/>
    </div>
</template>

<script>
  import moment from 'moment';

  export default {
    name    : "EnvironmentDate",
    props: {
      showIt: {
        type: Boolean,
      },
      loading: {
        type: Boolean,
      },
    },
    data() {
      return {
        fromDateMenu: false,
        fromDateVal: (new Date()).toISOString().split('T')[0],
        maxDate: (new Date()).toISOString().split('T')[0],
      };
    },
    computed: {
      fromDateDisp() {
        return moment(this.fromDateVal).format('ddd, ll');
      }
    },
    methods: {
      emitNewDate() {
        this.$emit("update-date", this.fromDateVal);
      }
    }
  }
</script>

<style scoped>
    .v-input {
        font-size: 0.85rem;
    }
</style>
