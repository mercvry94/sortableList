const draggable_list = document.getElementById('draggable-list');
const check = document.getElementById('check');

const highestScorers = [
    "LeBron James", 
    "Kareem Abdul-Jabbar",
    "Karl Malone",
    "Kobe Bryant",
    "Michael Jordan",
    "Dirk Nowitzki",
    "Wilt Chamberlain",
    "Shaquille O'Neal",
    "Carmelo Anthony",
    "Moses Malone"
];

//Store List Items 
const listItems = [];

let dragStartIndex;

createList();

//Insert List Items into DOM
function createList() {
    [...highestScorers]
    .map(a => ({ value: a, sort: Math.random()}))
    .sort((a,b)=> a.sort - b.sort)
    .map(a => a.value)
    .forEach((person, index) => {
            const listItem = document.createElement('li');

            listItem.setAttribute('data-index', index);

            listItem.innerHTML = `
                <span class="number">${index + 1}</span>
                <div class="draggable" draggable="true">
                    <p class="person-name">${person}</p>
                    <i class="fas fa-grip-lines"></i>
                </div>
            `;

            listItems.push(listItem);
            draggable_list.appendChild(listItem);
        });
    addEventListeners();
}

function dragStart(){
   // console.log('Event: ', 'dragstart')\
   dragStartIndex = +this.closest('li').getAttribute('data-index')

}

function dragEnter(){
   // console.log('Event: ', 'dragenter')
   this.classList.add('over');
}

function dragLeave(){
    //console.log('Event: ', 'dragleave')
    this.classList.remove('over');
}

function dragOver(e){
    e.preventDefault();
   
}

function dragDrop(){
    //console.log('Event: ', 'drop')
    const dragEndIndex = +this.getAttribute('data-index');
    swapItems(dragStartIndex, dragEndIndex);
    
    this.classList.remove('over');
}

//Swap List Items that are drag and drop
function swapItems(fromIndex, toIndex) {
    const itemOne = listItems[fromIndex].querySelector('.draggable');
    const itemTwo = listItems[toIndex].querySelector('.draggable');

    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);

}

//Check the order of list items
function checkOrder(){
    listItems.forEach((listItem, index) => {
        const personName = listItem.querySelector('.draggable').innerText.trim()

        if(personName !== highestScorers[index]){
            listItem.classList.add('wrong')
        } else {
            listItem.classList.remove('wrong');
            listItem.classList.add('right');
        }
    })

}
function addEventListeners(){
    const draggables = document.querySelectorAll('.draggable');
    const dragListItems = document.querySelectorAll('.draggable-list li');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart)
    })

    dragListItems.forEach(item => {
        item.addEventListener('dragover', dragOver)
        item.addEventListener('drop', dragDrop)
        item.addEventListener('dragenter', dragEnter)
        item.addEventListener('dragleave', dragLeave)
    })
}

check.addEventListener('click', checkOrder);