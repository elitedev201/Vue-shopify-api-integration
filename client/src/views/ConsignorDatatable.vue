<template>
  <v-card>
    <v-card-title>
      Consignors
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="consignorList" :search="search">
      <!-- product -->
      <template #[`item.id`]="{ item }">
        <a :href="'/consignor/' + item.id" class="custom-link"
          ><span class="text-no-wrap">{{item.id}}</span
        ></a>
      </template>
      <template #[`item.qbCompany`]="{ item }">
        <div class="d-flex align-center">
          <a :href="'/consignor/' + item.id" class="custom-link"
            ><span class="text-no-wrap">{{item.qbCompany}}</span
          ></a>
        </div>
      </template>
      <template #[`item.qbStAddress1`]="{ item }">
        <a :href="'/consignor/' + item.id" class="custom-link"
          ><span class="text-no-wrap">{{item.qbStAddress1}}</span
        ></a>
      </template>
      <template #[`item.qbStAddress2`]="{ item }">
        <a :href="'/consignor/' + item.id" class="custom-link"
          ><span class="text-no-wrap">{{item.qbStAddress2}}</span
        ></a>
      </template>
      <template #[`item.qbCity`]="{ item }">
        <a :href="'/consignor/' + item.id" class="custom-link"
          ><span class="text-no-wrap">{{item.qbCity}}</span
        ></a>
      </template>
      <template #[`item.qbState`]="{ item }">
        <a :href="'/consignor/' + item.id" class="custom-link"
          ><span class="text-no-wrap">{{item.qbState}}</span
        ></a>
      </template>
       <template #[`item.qbZip`]="{ item }">
        <a :href="'/consignor/' + item.id" class="custom-link"
          ><span class="text-no-wrap">{{item.qbZip}}</span
        ></a>
      </template>
       <template #[`item.qbPhone`]="{ item }">
        <a :href="'/consignor/' + item.id" class="custom-link"
          ><span class="text-no-wrap">{{item.qbPhone}}</span
        ></a>
      </template>
       <template #[`item.qbEmail`]="{ item }">
        <a :href="'/consignor/' + item.id" class="custom-link"
          ><span class="text-no-wrap">{{item.qbEmail}}</span
        ></a>
      </template>
      <template #[`item.actions`]="{ item }">
        <span class="text-no-wrap">
          <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        </span>
      </template>
    </v-data-table>

    <!-- dialog -->
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title>
          Are you sure you want to delete this item?
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDelete">
            Cancel
          </v-btn>
          <v-btn color="blue darken-1" text @click="deleteItemConfirm">
            OK
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import consignorService from "../services/consignorService"

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    search: "",
    headers: [
      { text: "ID", value: "id" },
      { text: "Company", value: "qbCompany" },
      { text: "StAddress1", value: "qbStAddress1" },
      { text: "StAddress2", value: "qbStAddress2" },
      { text: "City", value: "qbCity" },
      { text: "State", value: "qbState" },
      { text: "Zip", value: "qbZip" },
      { text: "Phone", value: "qbPhone" },
      { text: "Email", value: "qbEmail" },
      { text: "Action", value: "actions", sortable: false },
    ],
    consignorList: [],
    editedIndex: -1,
    editedItem: {},
    defaultItem: {},
  }),
  watch: {
    dialog(val) {
      // eslint-disable-next-line no-unused-expressions
      val || this.close()
    },
    dialogDelete(val) {
      // eslint-disable-next-line no-unused-expressions
      val || this.closeDelete()
    },
  },
  created() {
    this.getConsignors()
  },

  methods: {
    async getConsignors() {
      consignorService.getConsignors().then(res => {
        this.consignorList = res.data
      })
    },

    clear() {
      this.$refs.observer.reset()
      this.close()
    },

    deleteItem(item) {
      this.editedIndex = this.consignorList.indexOf(item)
      this.editedItem = { ...item }
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      // this.productList.splice(this.editedIndex, 1)
      let consignor_id = this.editedItem.id
      consignorService
        .deleteConsignor(consignor_id)
        .then(res => {
          if (res.code == 200) {
            alert("Successfully deleted consignor!")
            this.getConsignors()
          } else {
            alert("Unfortunately, can't delete consignor!")
          }
        })
        .catch(error => {
          console.log(error)
          alert("Error is occured!")
        })
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = { ...this.defaultItem }
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = { ...this.defaultItem }
        this.editedIndex = -1
      })
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.productList[this.editedIndex], this.editedItem)
      } else {
        this.consignorList.push(this.editedItem)
      }
      this.close()
    },
  },
}
</script>
