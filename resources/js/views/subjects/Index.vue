<template>
  <div class="py-5 px-4">
    <div class="max-w-6xl mx-auto">
      <div class="flex flex-col mt-5">
        <div class="mb-10" v-for="(value, key) in subjectList" :key="key">
          <h3 class="text-2xl text-gray-700">{{ value.title }}</h3>
          <div class="-mx-3 flex flex-wrap">
            <div class="w-1/6 px-3" v-for="(v, k) in value.children" :key="k">
              <div class="shadow rounded-lg w-full bg-white overflow-hidden w-full block mt-6 relative transform duration-300 hover:-translate-y-1 hover:shadow-lg">
                <a :href="'/subjects/'+v.id" class="flex flex-col items-center p-5">
                  <svg class="w-8 h-8 stroke-current text-teal-500" fill="none" viewBox="0 0 24 24">
                    <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path>
                  </svg>
                  <span class="mt-2">{{ v.title }}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getSubjectsTree } from "@/api/subject"

  export default {
    name: "subjects",
    data () {
      return {
        subjectList: []
      }
    },
    mounted() {
      this.getSubjects()
    },
    methods: {
      getSubjects() {
        getSubjectsTree()
          .then((res) => {
            this.subjectList = res
          })
      }
    }
  }
</script>
