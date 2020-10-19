<template>
  <div class="py-5 px-4">
    <div class="max-w-6xl mx-auto">
      <div class="flex flex-wrap -mx-3">
        <div class="w-2/3 px-3">
          <div class="shadow rounded-lg w-full bg-white">
            <div class="px-5 py-3 flex items-center justify-between border-b border-gray-100">
              <div class="flex items-center pr-5">
                <div class="mr-3">
                  <select v-model="filterForm.subject_pid" class="form-select bg-gray-100 border-0 rounded-lg w-40 text-sm py-1 focus:shadow-none" @change="selectSubjectParent">
                    <option value="">全部科目</option>
                    <option v-for="(value, key) in subjectList" :key="key" :value="value.id">{{ value.title }}</option>
                  </select>
                </div>
                <div>
                  <select v-model="filterForm.subject_id" class="form-select bg-gray-100 border-0 rounded-lg w-40 text-sm py-1 focus:shadow-none text-sm" :class="[subjectSelected ? '' : 'text-gray-400 cursor-not-allowed']" :disabled="!subjectSelected" @change="selectSubject">
                    <option value="">全部科目</option>
                    <option v-for="(value, key) in activeSubject.childrenList" :key="key" :value="value.id">{{ value.title }}</option>
                  </select>
                </div>
              </div>
              <div>
                <select v-model="filterForm.order" class="form-select bg-gray-100 border-0 rounded-lg w-20 text-sm py-1 focus:shadow-none text-sm" @change="selectOrder">
                  <option value="new">最新</option>
                  <option value="hot">热门</option>
                  <option value="recommend">推荐</option>
                </select>
              </div>
            </div>
            <div class="flex flex-col pl-5" v-loading="isLoading" loading-custom-class="h-56">
              <div class="py-5 pr-5 border-b border-gray-100 flex cursor-pointer" v-for="(item, index) in articleList" :key="index">
                <div class="h-32 w-48">
                  <t-image class="h-full w-full" :src="item.cover_url" fit="cover" lazy/>
                </div>
                <div class="h-32 flex-1 flex flex-col justify-between min-w-0 ml-5">
                  <div class="flex flex-col">
                    <div class="flex items-center">
                      <div class="inline-flex items-center h-5 px-2 text-xs rounded-sm border border-teal-500 text-teal-500">{{ item.category.title }}</div>
                      <div class="ml-1 flex-1 truncate text-lg text-gray-900">{{ item.title }}</div>
                    </div>
                    <div class="mt-3 text-gray-500 h-10" style="text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;" :title="item.description">
                      {{ item.description }}
                    </div>
                  </div>
                  <div class="flex items-center">
                    <div class="flex flex-wrap">
                      <div class="flex items-center text-gray-400 mr-5">
                        <svg class="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span class="leading-none">{{ item.published_at }}</span>
                      </div>
                      <div class="flex items-center text-gray-400">
                        <svg class="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                        </svg>
                        <span class="leading-none">{{ item.view_count }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex justify-center py-5" v-if="total > 0">
              <t-pagination :total="total" :current="currentPage" @page-change="changePage"/>
            </div>
          </div>
          <empty-data :class="['shadow-none']" :show="isLoading === false && articleList.length === 0"/>
        </div>
        <div class="w-1/3 px-3">
          <div class="shadow rounded-lg w-full bg-white mb-5">
            <div class="pl-5 pr-2 py-3 flex items-center">
              <label class="flex-1">
                <input type="text" class="text-base focus:outline-none" placeholder="搜索资讯">
              </label>
              <div class="px-2 cursor-pointer">
                <svg class="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>
          </div>
          <div class="shadow rounded-lg w-full bg-white mb-5">
            <div class="py-3 px-5 border-b border-gray-100">
              <div class="flex items-center text-base leading-tight">
                <div class="h-3 w-1 bg-teal-500"></div>
                <div class="ml-2">热门</div>
              </div>
            </div>
            <div class="flex flex-col pr-5">
              <div class="flex items-center py-2 ml-5 border-b border-gray-100" v-for="(item, index) in hotArticleList" :key="index">
                <div class="text-xl font-serif pr-3" :class="[index > 2 ? 'text-gray-400' : 'text-teal-500']">{{ index < 9 ? '0' + (index + 1) : index + 1 }}</div>
                <div class="flex-1 min-w-0 flex-col cursor-pointer">
                  <div class="truncate">{{ item.title }}</div>
                  <div class="text-xs text-gray-400">{{ item.created_at }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import EmptyData from "@/components/common/EmptyData"
  import { getSubjectsTree } from "@/api/subject"
  import { getArticles, getHotArticles } from "@/api/article"

  export default {
    name: "articles.index",
    components: {
      EmptyData
    },
    data () {
      return {
        filterForm: {
          subject_pid: this.$route.query.subject_pid || '',
          subject_id: this.$route.query.subject_id || '',
          order: 'new'
        },
        subjectList: [],
        activeSubject: {},
        articleList: [],
        hotArticleList: [],
        currentPage: 1,
        total: 0,
        isLoading: null
      }
    },
    mounted() {
      this.getSubjectList()
      this.getArticleList()
      this.getHotArticleList()
    },
    computed: {
      subjectSelected() {
        return this.filterForm.subject_pid !== ""
      }
    },
    watch: {
      $route(to,from){
        this.filterForm.subject_pid = to.query.subject_pid || ''
        this.filterForm.subject_id = to.query.subject_id || ''
        this.currentPage = 1
        this.getArticleList()
      },
      subjectPid(val) {
        let index = this.subjectList.findIndex((item) => {
          return item.id == val
        })
        this.activeSubject = this.subjectList[index]
      }
    },
    methods: {
      getSubjectList() {
        getSubjectsTree()
          .then((res) => {
            this.subjectList = res
          })
      },
      getSubject(id) {
        getSubjectsShow(id)
          .then((res) => {
            this.activeSubject = res
          })
      },
      getArticleList() {
        this.isLoading = true

        let params = this.filterForm
        params.page = this.currentPage

        getArticles(params)
          .then((res) => {
            this.articleList = res.data
            this.total = res.meta.total
          })
          .finally(() => {
            this.isLoading = false
          })
      },
      getHotArticleList() {
        getHotArticles()
          .then((res) => {
            this.hotArticleList = res
          })
      },
      selectSubjectParent() {
        if (this.filterForm.subject_pid !== "") {
          let index = this.subjectList.findIndex((item) => {
            return item.id == this.filterForm.subject_pid
          })
          this.activeSubject = this.subjectList[index]
        }
        this.filterForm.subject_id = ""
        this.getArticleList()
      },
      selectSubject() {
        this.getArticleList()
      },
      selectOrder() {
        this.getArticleList()
      },
      changePage(page) {
        this.currentPage = page
        this.getArticleList()
      }
    }
  }
</script>
