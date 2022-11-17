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
    customErr: ''
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
        if (this.customErr){
          this.errorMsg = this.customErr;
        } else {
          this.errorMsg = msg;
        }
        this.$refs.input.setCustomValidity('');
      } else {
        this.errorMsg = '';
      }
    },
    notErr(){
      this.setErrorMsg();
      return this.$refs.input.checkValidity();
    }
  }
};
