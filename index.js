import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const inputFieldEl = document.getElementById("text-input")
const addToCartBtn = document.getElementById("add-to-cart-btn")
const shoppingListEl = document.getElementById("shopping-list")

//databases URL from firebase
const appSettings = {
    databaseURL: "https://realtime-database-eb9e5-default-rtdb.firebaseio.com/"
}


const app = initializeApp(appSettings)
const database = getDatabase(app)
const itemsInDatabase = ref(database, "shoppingList")

onValue(itemsInDatabase, (snapshot) => {
    if(snapshot.exists()) {
        //turning objects into arrays
        const shoppingListArr = Object.entries(snapshot.val())
    
        clearShoppingItems()

        //loop through shoppingListArr from database
        for (let shoppingListItem of shoppingListArr) {
            let currentItem = shoppingListItem
           appendShoppingListItems(currentItem)
        }
    } else {
        shoppingListEl.textContent = "No shopping list found"
    }
})


addToCartBtn.addEventListener("click", () => {
    const inputValue = inputFieldEl.value
    push(itemsInDatabase, inputValue)
    clearInputFieldEl()
})

function clearShoppingItems() {
    shoppingListEl.innerHTML = ''
}

function clearInputFieldEl() {
    inputFieldEl.value = ''
}

function appendShoppingListItems(item){
    let newEl = document.createElement('li')
    let itemID = item[0]
    let itemValue = item[1]
 
    itemValue = itemValue.charAt(0).toUpperCase() + itemValue.slice(1)
    newEl.textContent = itemValue

    newEl.addEventListener('click', () => {
        let exactIdLocationInDatabase = ref(database, `shoppingList/${itemID}`)
        remove(exactIdLocationInDatabase)
    })
    shoppingListEl.append(newEl)
}