<template>
    <div>
        <label v-if="label">{{ label }}</label>
        <span>123</span>
        <input :disabled="disabled"
               :type="type"
               :focus="focus"
               :value="value"
               :placeholder="placeholder"
               @input="input($event.target.value)"
        />
    </div>
</template>

<script>
  export default {
    name: "FormInput",
    status: "ready",
    release: "0.0.1",
	data() {
	  return {
		hello: 'Hello World',
	  };
	},
	props: {
      type: {
        type: String,
        default: "text",
        validator: value => {
		  return value.match(/(text|number|email|password)/)
        }
      },
	  value: {
		type: String,
		default: "",
	  },
	  placeholder: {
		type: String,
		default: "",
	  },
	  label: {
		type: String,
		default: "",
	  },
	  id: {
		type: String,
		default: "",
	  },
	  disabled: {
		type: Boolean,
		default: false,
	  },
	  focus: {
		type: Boolean,
		default: false,
	  },
    },
    methods: {
	  input(value) {
		this.$emit("change", value)
	  },
    },
	mounted() {

	}
  };
</script>

<style lang="stylus">
    input[type=text]
        background #b4cc1b

    input[type=number]
        background aqua

    input[type=password]
        border-width 3px
</style>