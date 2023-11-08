<script lang="ts" setup>
import { ref, type Ref } from 'vue'

// local refs
const passwordLength: Ref<number> = ref(8)
const minPasswordLength: Ref<number> = ref(4)
const maxPasswordLength: Ref<number> = ref(21)
const includeNumber: Ref<boolean> = ref(true)
const includeLowercase: Ref<boolean> = ref(true)
const includeUppercase: Ref<boolean> = ref(true)
const includeSymbols: Ref<boolean> = ref(true)
let generatedPassword: Ref<string | undefined> = ref('')
const isCopied: Ref<boolean> = ref(false)

// local variables
let password = ''
let selectedChars = ''

// functions
const generateRandomPassword = () => {
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz'
  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const numberChars = '0123456789'
  const symbolChars = '!@#$%^&*()-_=+[]{}|;:\'",.<>?/`~'

  selectedChars =
    (includeLowercase.value ? lowercaseChars : '') +
    (includeUppercase.value ? uppercaseChars : '') +
    (includeNumber.value ? numberChars : '') +
    (includeSymbols.value ? symbolChars : '')

  password = ''
  if (selectedChars) {
    for (let i = 0; i < passwordLength.value; i++) {
      let randomIndex = Math.floor(Math.random() * selectedChars.length)
      password += selectedChars[randomIndex]
    }
    return password
  } else {
    return 'Select atleast one password condition!'
  }
}

const getPassword = () => {
  generatedPassword.value = generateRandomPassword()
  isCopied.value = false
  return generatedPassword.value
}

const copyToClipboard = () => {
  const el: HTMLTextAreaElement = document.createElement('textarea')!
  el.value = generatedPassword.value!
  document.body.appendChild(el)
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)

  // Optionally, you can show a notification or perform other actions on successful copy
  isCopied.value = true
}

getPassword()
</script>

<template>
  <div
    class="md:w-1/2 w-full flex flex-col h-full px-5 py-10 md:p-10 lg:p-20 justify-center gap-6 bg-gray-700 text-lg"
  >
    <div>
      <div
        type="text"
        @click="copyToClipboard"
        :class="[{ 'text-red-400 text-sm': selectedChars == '' }]"
        class="p-3 rounded-lg peer w-full group/clip bg-gray-800 text-emerald-400 self-center flex justify-between hover:border hover:border-emerald-400"
      >
        <p>{{ generatedPassword }}</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6 group-hover/clip:block fill-gray-400"
          viewBox="0 0 24 24"
        >
          <path
            d="M6.9998 6V3C6.9998 2.44772 7.44752 2 7.9998 2H19.9998C20.5521 2 20.9998 2.44772 20.9998 3V17C20.9998 17.5523 20.5521 18 19.9998 18H16.9998V20.9991C16.9998 21.5519 16.5499 22 15.993 22H4.00666C3.45059 22 3 21.5554 3 20.9991L3.0026 7.00087C3.0027 6.44811 3.45264 6 4.00942 6H6.9998ZM5.00242 8L5.00019 20H14.9998V8H5.00242ZM8.9998 6H16.9998V16H18.9998V4H8.9998V6Z"
          ></path>
        </svg>
      </div>
      <p
        v-if="generatedPassword && !isCopied && selectedChars"
        class="text-white text-sm text-right w-full py-2 peer-hover:block"
      >
        Copy to clipboard
      </p>
      <p
        v-if="isCopied && selectedChars"
        class="text-white text-sm text-right w-full py-2 peer-hover:block hidden"
      >
        Copied: {{ generatedPassword }}
      </p>
    </div>

    <div class="flex flex-col text-gray-300 w-full gap-0">
      <label for="passwordLength">Password Length</label>
      <div class="flex w-full justify-between gap-5">
        <input
          id="passwordLength"
          class="in-range:border-emerald-400 accent-emerald-400 w-full"
          type="range"
          :min="minPasswordLength"
          :max="maxPasswordLength"
          step="1"
          v-model="passwordLength"
        />
        <p>{{ passwordLength }}</p>
      </div>
    </div>

    <div class="flex flex-col text-gray-300 w-full gap-1">
      <div class="flex w-full justify-between gap-5">
        <label for="passwordLength">Number [0-9]</label>

        <div class="flex items-center cursor-pointer">
          <input
            id="passwordLength"
            class="accent-emerald-400 w-6 h-6"
            type="checkbox"
            :checked="includeNumber"
            v-model="includeNumber"
          />
        </div>

        <!-- <p>{{ includeNumber }}</p> -->
      </div>
    </div>

    <div class="flex flex-col text-gray-300 w-full gap-1">
      <div class="flex w-full justify-between gap-5">
        <label for="lowerCase">Lowercase [a-z]</label>

        <div class="flex items-center cursor-pointer">
          <input
            id="lowerCase"
            class="accent-emerald-400 w-6 h-6"
            type="checkbox"
            :checked="includeLowercase"
            v-model="includeLowercase"
          />
        </div>

        <!-- <p>{{ includeLowercase }}</p> -->
      </div>
    </div>

    <div class="flex flex-col text-gray-300 w-full gap-1">
      <div class="flex w-full justify-between gap-5">
        <label for="upperCase">Uppercase [A-Z]</label>

        <div class="flex items-center cursor-pointer">
          <input
            id="upperCase"
            class="accent-emerald-400 w-6 h-6"
            type="checkbox"
            :checked="includeUppercase"
            v-model="includeUppercase"
          />
        </div>
        <!-- <p>{{ includeUppercase }}</p> -->
      </div>
    </div>

    <div class="flex flex-col text-gray-300 w-full gap-1">
      <div class="flex w-full justify-between gap-5">
        <label for="symbols">Symbols [!@#$%^&*()-+]</label>

        <div class="flex items-center cursor-pointer">
          <input
            id="symbols"
            class="accent-emerald-400 w-6 h-6"
            type="checkbox"
            :checked="includeSymbols"
            v-model="includeSymbols"
          />
        </div>
        <!-- <p>{{ includeSymbols }}</p> -->
      </div>
    </div>

    <button
      class="bg-emerald-500 p-3 my-5 self-center w-fit rounded-lg text-white tracking-wide font-semibold"
      @click="getPassword()"
    >
      Generate Passwords
    </button>
  </div>
</template>
