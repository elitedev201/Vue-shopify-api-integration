<template>
  <v-footer>
    <div class="d-flex justify-space-between tc-footer-layout">
      <span
        >COPYRIGHT &copy; {{ new Date().getFullYear() }}
        <a
          href="https://tacoma-consignment.myshopify.com/"
          class="text-decoration-none"
          >Tacoma Consignment Portal</a
        ><span class="d-none d-md-inline">, All rights Reserved</span></span
      >
    </div>
  </v-footer>
</template>

<script>
export default {
  name: "AppFooter",
}
</script>
