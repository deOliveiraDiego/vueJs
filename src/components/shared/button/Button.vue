<template>
  <button @click="clicked()" class="btn" :class="btnStyle" :type="type">{{ title }}</button>
</template>

<script>
export default {
  props: {
    type: {
      required: true,
      type: String
    },

    title: {
      required: true,
      type: String
    },

    confirm: {
      required: false,
      default: false,
      type: Boolean
    },

    styleBtn: {
      required: false,
      default: 'default',
      type: String
    }
  },

  methods: {
    clicked() {
      if (this.confirm) {
        if (confirm("Confirma?")) {
          this.$emit("newClick");
        }
        return;
      }
      this.$emit("newClick");
    }
  },

  computed: {
    btnStyle() {
      if(this.styleBtn == 'default') return 'btn-default';
      if(this.styleBtn == 'danger') return 'btn-danger'
    }
  }
};
</script>

<style scoped>
.btn {
  display: inline-block;
  padding: 10px;
  border-radius: 3px;
  margin: 10px;
  font-size: 1.2em;
}

.btn-danger {
  background: firebrick;
  color: white;
}

.btn-default {
  background: darkcyan;
  color: white;
}
</style>
