export default {
  props: {
    info: {
      type: String,
      default: '',
    },
    rules: {
      type: Object,
      default(){
        return null;
      }
    },
    rd: Boolean,
    dd: Boolean,
    icon: {
      type: Array,
      default(){
        return [];
      }
    },
  },
  data(){
    return {
      errorMsg: ''
    };
  },
  watch: {
    modelValue(){
      this.$nextTick(()=>{
        this.setErrorMsg();
      });
    }
  },
  mounted(){
    this.setErrorMsg();
  },
  methods: {
    setErrorMsg(){
      const msg = this.$refs.input.validationMessage;
      if (msg){
        this.errorMsg = msg;
        this.$refs.input.setCustomValidity('');
      } else {
        this.errorMsg = '';
      }
    }
  }
};
