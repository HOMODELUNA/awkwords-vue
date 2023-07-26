<script setup lang="ts">
import { ref, type ComputedRef } from 'vue'
import * as core from "./core"
defineProps<{
  subpatterns: Map<string, string[]>,
  message: string
}>()
const pattern = ref("CV(CV)N")
const patname = ref("")
const patcontent = ref("")
const subpatterns = ref(new Map([
  ["V", "aiueo".split("")],
  ["C", "pbtdkghmnfvszcjwlry".split("")],
  ["N", "mn".split("")]
]))

const num_to_generate = ref("20")
const generated = ref(["click", "to", "generate"])
function on_generate(event: Event) {
  generated.value = core.generate_many(
    Math.floor(parseInt(num_to_generate.value)),
    core.pattern_tree(pattern.value) as core.PatternTree,
    subpatterns.value
  )
}
function removeSubpattern(k: string) {
  var new_sub = subpatterns.value
  new_sub.delete(k)
  subpatterns.value = new_sub
}

function addSubpattern(k: string, v: string) {
  var new_sub = subpatterns.value
  new_sub.set(k, v.split('/'))
  subpatterns.value = new_sub
}


function copyToClip(contentArray: string[], message: string | null = null) {
  var contents = contentArray.join("\n")
  const textarea = document.createElement('textarea');
  textarea.value = contents;
  document.body.appendChild(textarea);
  textarea.select();
  if (document.execCommand('copy')) {
    document.execCommand('copy');
  }
  document.body.removeChild(textarea);
  if (message == null) {
    alert("复制成功");
  } else {
    alert(message);
  }
}

</script>

<template>
  <div class="greetings">
    <h1 class="green"> Awkwords (vue)</h1>
    <h2 class="green">Pattern: {{ pattern }}</h2>
    <input v-model="pattern" placeholder="{{pattern}}">
    <h2 class="green">Subpatterns</h2>
    <ul>
      <li v-for="[k, v] of subpatterns" :key="k"><button @click="removeSubpattern(k)">移除</button> <b>{{ k }}</b>: {{
        v.join('/') }}</li>
    </ul>
  </div>
  <table>
    <tr>
      <td> </td>
      <td>模式名(单个字母)</td>
      <td>字母(以'/'分隔)</td>
    </tr>
    <tr>
      <td><button @click="addSubpattern(patname, patcontent)">添加</button></td>
      <td><input v-model="patname" placeholder="单个字母"></td>
      <td><input v-model="patcontent" placeholder="多个字符,以'/'隔开'" /></td>
    </tr>
  </table>
  <p>生成数量: <input v-model="num_to_generate" placeholder="{{ num_to_generate }}" /></p>
  <p><button @click="on_generate">生成</button> <button @click="copyToClip(generated)">复制到剪贴板</button></p>
  <h2 class="green">生成的词汇</h2>
  <p>{{ generated.join(" ") }}</p>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {

  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
