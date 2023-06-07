//import { add } from "./utils"
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const inputFieldEl = document.getElementById("text-input")
const addToCartBtn = document.getElementById("add-to-cart-btn")
const shoppingListEl = document.getElementById("shopping-list")

//databases URL from firebase
const appSettings = {
    databaseURL: "https://realtime-database-eb9e5-default-rtdb.firebaseio.com/"
}


const app = initializeApp(appSettings)
const database = getDatabase(app)
const itemsInDatabase = ref(database, "shopping-list")

onValue(itemsInDatabase, (snapshot) => {
    const shoppingListArr = Object.values(snapshot.val())

    clearShoppingItems()

    for (const shoppingListItem of shoppingListArr) {
       appendShoppingListItems(shoppingListItem)
    }
})


addToCartBtn.addEventListener("click", () => {
    const inputValue = inputFieldEl.value
    push(itemsInDatabase, inputValue)
    clearInputField()
})

function clearShoppingItems() {
    shoppingListEl.innerHTML = ''
}

function clearInputField() {
    inputFieldEl.value = ''
}

function appendShoppingListItems(inputItem){
    shoppingListEl.innerHTML += `<li>${inputItem}</li>`
}