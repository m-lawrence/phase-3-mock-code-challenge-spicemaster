const url = 'http://localhost:3000/spiceblends'
const detailDiv = document.querySelector('div#spice-blend-detail')

function renderDisplayBlend(blendObj) {
  
    detailDiv.dataset.id = blendObj.id
    const detailImg = detailDiv.querySelector('img.detail-image')
    const detailTitle = detailDiv.querySelector('h2.title')
    const detailIngredientsDiv = detailDiv.querySelector('div.ingredients-container')
    const detailIngredientsUl = detailIngredientsDiv.querySelector('ul.ingredients-list')

    detailImg.src = blendObj.image
    detailImg.alt = blendObj.title 
    detailTitle.textContent = blendObj.title
   
    blendObj.ingredients.forEach(ingredient => {
        const detailIngredientLi = document.createElement('li')
        detailIngredientLi.textContent = ingredient.name
        detailIngredientsUl.append(detailIngredientLi)
    })
    

}

function getDisplayBlend() {
    fetch(`${url}/1`)
        .then(response => response.json())
        .then(blendsObj => {
            renderDisplayBlend(blendsObj)
        })
}

const titleForm = document.querySelector('form#update-form')

titleForm.addEventListener('submit', event => {
    event.preventDefault()

    const newTitle = detailDiv.querySelector('h2.title')
    const title = event.target.title.value
    newTitle.textContent = `${title}`

    fetch(`${url}/${detailDiv.dataset.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title })
    })
})

const ingredientForm = document.querySelector('form#ingredient-form')

ingredientForm.addEventListener('submit', event => {
    event.preventDefault()
    const newIngredientLi = document.createElement('li')
    const ingredientsUl = document.querySelector('ul.ingredients-list')
    
    newIngredientLi.textContent = event.target.name.value

    ingredientsUl.append(newIngredientLi)

    fetch('http://localhost:3000/ingredients', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( {name: newIngredientLi.textContent, spiceblendId: detailDiv.dataset.id } )
    })
})

function renderOneImg(spiceObj) {
    const allSpicesDiv = document.querySelector('div#spice-images')
    const spiceImg = document.createElement('img')
    spiceImg.classList.add('spice-pic')

    spiceImg.dataset.id = spiceObj.id
    spiceImg.src = spiceObj.image
    spiceImg.alt = spiceObj.title

    allSpicesDiv.append(spiceImg)
}

function renderAllBlends() {
    fetch(`${url}`)
        .then(response => response.json())
        .then(blendsArr => {
            blendsArr.forEach(blend => {
                renderOneImg(blend)
            })
        })
}

function renderOneIngredient(ingredient) {
    const detailIngredientLi = document.createElement('li')

    detailIngredientLi.textContent = ingredient.name 
    
    const detailIngredientsUl = document.querySelector('ul.ingredients-list')
    if (detailDiv.dataset.id === ingredient.spiceblendId) {
        detailIngredientsUl.append(detailIngredientLi)
    }
}

function getIngredients() {
    fetch('http://localhost:3000/ingredients')
        .then(response => response.json())
        .then(ingredientsArr => {
            ingredientsArr.forEach(ingredient => {
                renderOneIngredient(ingredient)
            })
        })
}

const imgDiv = document.querySelector('div#spice-images')

imgDiv.addEventListener('click', event => {


    fetch(`http://localhost:3000/spiceblends/${event.target.dataset.id}`)
        .then(response => response.json())
        .then(blendObj => {
            renderClickedBlend(blendObj)
        })
  
})

function renderClickedBlend(blendObj) {
    detailDiv.dataset.id = blendObj.id
    const clickedDetailImg = detailDiv.querySelector('img.detail-image')
    const clickedDetailTitle = detailDiv.querySelector('h2.title')
    const clickedDetailIngredientsDiv = detailDiv.querySelector('div.ingredients-container')
    const clickedDetailIngredientsUl = clickedDetailIngredientsDiv.querySelector('ul.ingredients-list')

    clickedDetailIngredientsUl.innerHTML = ''
    clickedDetailImg.src = blendObj.image
    clickedDetailImg.alt = blendObj.title 
    clickedDetailTitle.textContent = blendObj.title
   
    blendObj.ingredients.forEach(ingredient => {
        const clickedDetailIngredientLi = document.createElement('li')
        clickedDetailIngredientLi.textContent = ingredient.name
        clickedDetailIngredientsUl.append(clickedDetailIngredientLi)
    })

}



renderAllBlends()
getDisplayBlend()
getIngredients()