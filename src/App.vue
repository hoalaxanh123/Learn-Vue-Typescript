<script setup lang="ts">
import TheHeader from "@/components/TheHeader.vue";
import EntryEditor from "./components/EntryEditor.vue";
import EntryCard from "@/components/EntryCard.vue";
import type Entry from "./types/Entry";
import { ref } from "vue";

const postList = ref<Array<Entry>>([]);

const handleSubmitForm = (entry: Entry) => {
  postList.value.unshift(entry);
};
</script>

<template>
  <main class="container m-auto p-10">
    <TheHeader />
    <EntryEditor @@create-post="handleSubmitForm" />
    <ul>
      <li>
        <Transition name="bounce" v-for="entry in postList" :key="entry.id"
          ><EntryCard :entry="entry"
        /></Transition>
      </li>
    </ul>
  </main>
</template>

<style></style>
