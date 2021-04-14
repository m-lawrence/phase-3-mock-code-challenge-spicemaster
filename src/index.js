const url = 'http://localhost:3000/spiceblends'
const detailDiv = document.querySelector('div#spice-blend-detail')

function renderDisplayBlend(blendObj) {
  
    detailDiv.dataset.id = blendObj.id
    const detailImg = detailDiv.querySelector('img.detail-image')
    const detailTitle = detailDiv.querySelector('h2.title')
    const detailIngredientsDiv = detailDiv.querySelector('div.ingredients-container')
    const detailIngredientLi = document.createElement('li')
    const detailIngredientsUl =detailIngredientsDiv.querySelector('ul.ingredients-list')

    detailImg.src = blendObj.image
    detailImg.alt = blendObj.title 
    detailTitle.textContent = blendObj.title

    // blendObj.ingredients.forEach(ingredient => {
    //     detailIngredientLi.textContent = ingredient.name
    //     detailIngredientsUl.append(detailIngredientLi)
    // })

}

function getDisplayBlend() {
    fetch(`${url}`)
        .then(response => response.json())
        .then(blendsArr => {
            renderDisplayBlend(blendsArr[0])
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
})

// function renderAllBlends() {
//     fetch(`${url}`)
//         .then(response => response.json())
//         .then(blendsArr => {
//             blendsArr.forEach(blend => {
//                 renderOneBlend(blend)
//             })
//         })
// }



// renderAllBlends()
getDisplayBlend()