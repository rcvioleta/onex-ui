<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ref, reactive, onMounted } from 'vue'

// Component Imports
// import HelloWorld from './components/HelloWorld.vue'

import questions from './questions'

const doneChecking = ref(false)
const answers = ref({})

// Lifecycle Hooks
onMounted(() => {
  questions.map(({ id: questionId }) => {
    answers.value[questionId] = {
      choiceId: null,
      correct: false,
    }
  })
})

// Event Handlers
const storeAnswer = (questionId, choiceId) => {
  answers.value[questionId] = {
    ...answers.value[questionId],
    choiceId,
  }
}

const checkAnswers = () => {
  const values = Object.values(answers.value)

  if (values.some(({ choiceId }) => choiceId === null)) {
    return alert('You need to answer all questions!')
  }

  Object.keys(answers.value).forEach((qid) => {
    const idx = questions.findIndex(({ id }) => +qid === id)

    if (idx !== -1) {
      const choice = questions[idx].choices.filter((c) => c.id === answers.value[qid].choiceId)
      answers.value[qid] = {
        ...answers.value[qid],
        correct: choice[0].correct,
      }
    }
  })

  doneChecking.value = true

  console.log('answers', answers.value)
}
</script>

<template>
  <!-- <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView /> -->
  <div class="wrapper">
    <ul>
      <li v-for="question in questions" :key="question.id" style="margin-bottom: 20px">
        <span>{{ question.description }}</span>
        <div v-for="choice in question.choices" :key="choice.id" class="choice">
          <input
            :id="choice.id"
            type="radio"
            :name="question.id"
            :value="choice.id"
            @click="storeAnswer(question.id, choice.id)"
          />
          <label :for="choice.id">{{ choice.text }}</label>
        </div>
        <template v-if="doneChecking">
          <div v-if="answers[question.id]?.correct">Your answer is correct!</div>
          <div v-else>Wrong answer!</div>
        </template>
      </li>
    </ul>

    <div style="margin-top: 1rem; text-align: center">
      <button type="button" @click="checkAnswers">Submit</button>
    </div>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

.choice {
  display: flex;
  gap: 15px;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
