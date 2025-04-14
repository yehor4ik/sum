import { defineStore } from 'pinia'

interface TagsState {
  tags: string[]
}

export const useTagsStore = defineStore('tags', {
  state: (): TagsState => ({
    tags: [],
  }),
  
  actions: {
    addTag(tag: string) {
      if (!this.tags.includes(tag)) {
        this.tags.push(tag)
      }
    },
    
    removeTag(tag: string) {
      this.tags = this.tags.filter((t: string) => t !== tag)
    },
  },
  
  persist: true,
}) 