const html = `<nui-code
 class="-full"
 lang="html|不指定则自动检测"
 :code="Str代码字符串"
 :wrap="false| 代码换行">
 <div>#slot</div>
</nui-code>`;

const js = `import formatCode from './format';
export default {
  name: 'NuiCode',
  props: {
    lang: {
      type: String,
      default: ''
    },
    code: {
      type: String,
      default: ''
    },
    wrap: Boolean,
  },
  computed: {
    codeObj(){
      return formatCode(this.code,this.lang);
    }
  }
};`;

const json = `{
  "title": "JSOn 数据",
  "description": "超长文本换行超长文本换行超长文本换行，超长文本换行超长文本换行，超长文本换行超长文本换行超长文本换行，超长文本换行。",
  "type": "object",
  "properties": {
    "_id": {
      "description": "超长文本换行超长文本换行超长文本换行，超长文本换行超长文本换行，超长文本换行超长文本换行超长文本换行，超长文本换行。"
    },
    "cid": {
      "description": "说明",
      "type": "number",
      "minimum": 1
    },
    "pid": {
      "description": "说明",
      "type": "number",
      "minimum": 1
    }
  },
  "required": ["cid"]
}`;


export default {
  html,
  js,
  json
};