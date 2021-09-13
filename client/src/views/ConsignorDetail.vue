<template>
  <div>
    <v-card class="create-consignor">
      <v-card-title class="create-title">Consignor Detail</v-card-title>
      <div class="create-product">
        <validation-observer ref="observer" v-slot="{ invalid }">
          <form @submit.prevent="submit" id="create-consignor">
            <div class="pt-6 pb-6">ConsignorID: {{ id }}</div>
            <validation-provider
              v-slot="{ errors }"
              name="company"
              rules="required"
            >
              <v-text-field
                v-model="company"
                :error-messages="errors"
                label="Company Name"
                required
              ></v-text-field>
            </validation-provider>

            <v-row>
              <v-col md="4">
                <v-btn color="primary" :href="'/products/' + company"> Active Products </v-btn>
              </v-col>
              <v-col md="4">
                <v-btn color="primary" href="/payouts"> Upcoming Payout </v-btn>
              </v-col>
              <v-col md="4">
                <v-btn color="primary" href="/beforepayouts"> Sales History </v-btn>
              </v-col>
            </v-row>

            <v-row>
              <v-col md="6">
                <v-text-field
                  v-model="first"
                  label="First"
                  required
                ></v-text-field>
              </v-col>
              <v-col md="6">
                <v-text-field
                  v-model="last"
                  label="Last"
                  required
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col md="6">
                <validation-provider
                  v-slot="{ errors }"
                  name="email"
                  rules="required|email"
                >
                  <v-text-field
                    v-model="email"
                    :error-messages="errors"
                    label="E-mail"
                    required
                  ></v-text-field>
                </validation-provider>
              </v-col>
              <v-col md="6">
                <v-text-field
                  v-model="phone"
                  label="Phone"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-text-field
              v-model="stAddress1"
              label="Street Address1"
              required
            ></v-text-field>
            <v-text-field
              v-model="stAddress2"
              label="Street Address2"
            ></v-text-field>
            <v-row>
              <v-col md="4">
                <v-text-field
                  v-model="city"
                  label="City"
                  required
                ></v-text-field>
              </v-col>
              <v-col md="4">
                <v-text-field
                  v-model="state"
                  label="State"
                  required
                ></v-text-field>
              </v-col>
              <v-col md="4">
                <v-text-field v-model="zip" label="Zip" required></v-text-field>
              </v-col>
            </v-row>

            <div class="create-footer">
              <v-btn class="mr-4" type="submit" :disabled="invalid">
                Save
              </v-btn>
              <v-btn @click="clear"> Back </v-btn>
            </div>
          </form>
        </validation-observer>
      </div>
    </v-card>
    <div v-if="loading" class="text-center loading-button">
      <v-progress-circular
        :size="30"
        color="primary"
        indeterminate
      ></v-progress-circular>
      Adding Product...
    </div>
  </div>
</template>

<script>
import { required, digits, email, max, regex } from "vee-validate/dist/rules"
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate"
import consignorService from "../services/consignorService"

setInteractionMode("eager")

extend("digits", {
  ...digits,
  message: "{_field_} needs to be {length} digits. ({_value_})",
})

extend("required", {
  ...required,
  message: "{_field_} can not be empty",
})

extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters",
})

extend("regex", {
  ...regex,
  message: "{_field_} {_value_} does not match {regex}",
})

extend("email", {
  ...email,
  message: "Email must be valid",
})

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  created() {
    this.getConsignorById()
  },
  data: () => ({
    id: "",
    company: "",
    first: "",
    last: "",
    email: "",
    phone: "",
    stAddress1: "",
    stAddress2: "",
    city: "",
    state: "",
    zip: "",
    loading: false,
  }),

  methods: {
    async getConsignorById() {
      const consignorId = this.$route.params.id
      consignorService.getConsignorById(consignorId).then(res => {
        this.id = res.data[0].id
        this.company = res.data[0].qbCompany
        this.first = res.data[0].qbFirst
        this.last = res.data[0].qbLast
        this.email = res.data[0].qbEmail
        this.phone = res.data[0].qbPhone
        this.stAddress1 = res.data[0].qbStAddress1
        this.stAddress2 = res.data[0].qbStAddress2
        this.city = res.data[0].qbCity
        this.state = res.data[0].qbState
        this.zip = res.data[0].qbZip
      })
    },

    submit() {
      let company = this.company
      let first = this.first
      let last = this.last
      let email = this.email
      let phone = this.phone
      let stAddress1 = this.stAddress1
      let stAddress2 = this.stAddress2
      let city = this.city
      let state = this.state
      let zip = this.zip
      let id = this.id

      var data = {
        id: id,
        company: company,
        first: first,
        last: last,
        email: email,
        phone: phone,
        stAddress1: stAddress1,
        stAddress2: stAddress2,
        city: city,
        state: state,
        zip: zip,
      }

      this.loading = true

      consignorService
        .updateConsignor(data)
        .then(res => {
          if (res.code == 200) {
            alert("Successfully updated consignor!")
            this.loading = false
          } else {
            alert("Unfortunately, can't updated consignor!")
            this.loading = false
          }
        })
        .catch(error => {
          console.log(error)
          alert("Error is occured!")
        })
    },

    clear() {
      window.location.href = "/consignors"
    },
  },
}
</script>
