<template>
  <div class="markdown-body" ref="markdown-it-vue-container"></div>
</template>

<script>
import MarkdownIt from 'markdown-it'
import MarkdownItAttrs from 'markdown-it-attrs'
import MarkdownItEmoji from 'markdown-it-emoji/light'
import MarkdownItSubscript from 'markdown-it-sub'
import MarkdownItSuperscript from 'markdown-it-sup'
import MarkdownItFootnote from 'markdown-it-footnote'
import MarkdownItDeflist from 'markdown-it-deflist'
import MarkdownItAbbreviation from 'markdown-it-abbr'
import MarkdownItInsert from 'markdown-it-ins'
import MarkdownItMark from 'markdown-it-mark'
import MarkdownItKatex from 'markdown-it-katex'
import MarkdownItTasklists from 'markdown-it-task-lists'
// import MarkdownItIcons from 'markdown-it-icons'
import MarkdownItHighlight from 'markdown-it-highlight'
import MarkdownItLatex from 'markdown-it-latex'
import MarkdownItContainer from 'markdown-it-container'
import MarkdownItGithubToc from 'markdown-it-github-toc'
import MarkdownItSourceMap from 'markdown-it-source-map'
// import MarkdownItEcharts from 'markdown-it-vue/src/markdown-it-plugin-echarts'
import MarkdownItMermaid from 'markdown-it-vue/src/markdown-it-plugin-mermaid'
import MarkdownItFlowchart from 'markdown-it-vue/src/markdown-it-plugin-flowchart'
// import 'github-markdown-css'
// import '../assets/styles/github-markdown.css'
import 'markdown-it-latex/dist/index.css'
//import 'markdown-it-icons/dist/index.css'
import 'markdown-it-highlight/dist/index.css'
// import echarts from 'echarts'
import mermaid from 'mermaid'
import flowchart from 'flowchart.js'
export default {
  name: 'markdown-it-vue',
  props: {
    content: {
      type: String
    }
  },
  watch: {
    content: {
      immediate: true,
      handler (val) {
        this.$nextTick(() => {
          this.$refs['markdown-it-vue-container'].innerHTML = this.md.render(val)
          // render echarts
          // document.querySelectorAll('.md-echarts').forEach(element => {
          //   try {
          //     let options = JSON.parse(element.textContent)
          //     let chart = echarts.init(element)
          //     chart.setOption(options)
          //   } catch (e) {
          //     element.outerHTML = `<pre>echarts complains: ${e}</pre>`
          //   }
          // })
          // render mermaid
          mermaid.init(undefined, document.querySelectorAll('.mermaid'))
          // render flowchart
          // document.querySelectorAll('.md-flowchart').forEach(element => {
          //   try {
          //     let code = element.textContent
          //     let chart = flowchart.parse(code)
          //     element.textContent = ''
          //     chart.drawSVG(element)
          //   } catch (e) {
          //     element.outerHTML = `<pre>flowchart complains: ${e}</pre>`
          //   }
          // })
        })
      }
    }
  },
  data () {
    let md = new MarkdownIt({
      html: true // WARNING: dangerous, use only trusted sources!
    }).use(MarkdownItEmoji)
      .use(MarkdownItSubscript)
      .use(MarkdownItSuperscript)
      .use(MarkdownItFootnote)
      .use(MarkdownItDeflist)
      .use(MarkdownItAbbreviation)
      .use(MarkdownItInsert)
      .use(MarkdownItMark)
      .use(MarkdownItKatex, {throwOnError: false, errorColor: '#cc0000'})
      .use(MarkdownItTasklists, {enabled: this.taskLists})
      //.use(MarkdownItIcons, 'font-awesome')
      .use(MarkdownItHighlight)
      .use(MarkdownItLatex)
      .use(MarkdownItContainer, 'success')
      .use(MarkdownItContainer, 'info')
      .use(MarkdownItContainer, 'warning')
      .use(MarkdownItContainer, 'danger')
      .use(MarkdownItContainer, 'lead')
      .use(MarkdownItContainer, 'text-center')
      .use(MarkdownItContainer, 'heading')
      .use(MarkdownItContainer, 'container')
      .use(MarkdownItContainer, 'card')
      .use(MarkdownItAttrs)
      .use(MarkdownItGithubToc, {
        tocFirstLevel: 2,
        tocLastLevel: 3,
        tocClassName: 'toc',
        anchorLinkSymbol: '',
        anchorLinkSpace: false,
        anchorClassName: 'anchor',
        anchorLinkSymbolClassName: 'octicon octicon-link'
      })
      .use(MarkdownItSourceMap)
      .use(MarkdownItMermaid)
      // .use(MarkdownItEcharts)
      //.use(MarkdownItFlowchart)
    return {
      md: md
    }
  }
}
</script>
