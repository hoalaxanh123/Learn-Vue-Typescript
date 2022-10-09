<script lang="ts" setup>
import EmojiField from "@/components/EmojiField.vue";
import ArrowCircleRight from "@/assets/icons/arrow-circle-right.svg";
import { ref, computed, onMounted } from "vue";
import type { Emoji } from "@/types/Emoji";
import type Entry from "@/types/Entry";

const content = ref<string>("");
const emoji = ref<Emoji | null>(null);

// Constants
const MAX_CHAR = 280;

// Emits
const emit = defineEmits<{
  (e: "@createPost", payload: Entry): void;
}>();

// Data
const charCount = computed<number>(() => content.value.length);
const enableSummitBtn = computed<boolean>(() => {
  if (content.value && emoji.value) {
    return true;
  }
  return false;
});
const EntryData = computed<Entry>(() => {
  return {
    id: Math.random(),
    author: 1,
    createAt: new Date(),
    body: content.value,
    emoji: emoji.value,
  };
});

// Template ref
const textArea = ref<HTMLTextAreaElement | null>(null);
onMounted(() => {
  textArea.value?.focus();
});

// Functions
const handleTextChange = (e: Event) => {
  const textArea = e.target as HTMLTextAreaElement;
  if (textArea.value.length >= MAX_CHAR) {
    content.value = textArea.value.substring(0, MAX_CHAR);
  }
};

const handleSubmit = () => {
  emit("@createPost", EntryData.value);

  content.value = "";
  emoji.value = null;
};
</script>
<template>
  <form class="entry-form" @submit.prevent="handleSubmit">
    <textarea
      v-model="content"
      @keydown="handleTextChange"
      @keyup="handleTextChange"
      @change="handleTextChange"
      @focusout="handleTextChange"
      placeholder="New Journal Entry for danielkelly_io"
      ref="textArea"
    ></textarea>
    <EmojiField v-model="emoji" />
    <div class="entry-form-footer">
      <span>{{ charCount }} / {{ MAX_CHAR }}</span>
      <button :disabled="!enableSummitBtn">
        Remember <ArrowCircleRight width="20" />
      </button>
    </div>
  </form>
</template>
