$('.second_screen').hide();
$('.third_screen').hide();
let block,randomArr=[],randomArrForOneImg=[],check=1;

//click on button 'Почати гру'
document.querySelector('.start_game').onclick=()=>{
    $('.first_screen').hide();
    $('.second_screen').show();
}
document.querySelector('.btn_restart ').onclick=()=> location.reload();
document.querySelector('.back ').onclick=()=> location.reload();

//cecle for build game field 
function severalRandom(min, max, num) {
    let i, arr = [], res = [];
    for (i = min; i <= max; i++ ) arr.push(i);
    for (i = 0; i < num; i++) res.push(arr.splice(Math.floor(Math.random() * (arr.length)), 1)[0])
    return res;
}
randomArr=severalRandom(1,25,25);
randomArrForOneImg=severalRandom(1,25,25);

    // cecle for build game field 
for(let i=0;i<25;i++){
    if(i===0||i%5===0){
    block=document.createElement('tr');
    let a=i;
    block.innerHTML=(
        `<td'><img class='img_group img${randomArr[a]}' id=${a} draggable="true" src="./img/${randomArr[a++]}.png" alt=""></td>
        <td'><img class='img_group img${randomArr[a]}' id=${a} draggable="true" src="./img/${randomArr[a++]}.png" alt=""></td>
        <td'><img class='img_group img${randomArr[a]}' id=${a} draggable="true" src="./img/${randomArr[a++]}.png" alt=""></td>
        <td'><img class='img_group img${randomArr[a]}' id=${a} draggable="true" src="./img/${randomArr[a++]}.png" alt=""></td>
        <td'><img class='img_group img${randomArr[a]}' id=${a} draggable="true" src="./img/${randomArr[a++]}.png" alt=""></td>`)
        a=0;
        document.querySelector('.game_field').appendChild(block);
    }
}

    //drag and drop function
    const dragAndDrop=()=>{
        const blockWithImage= document.querySelector('.block_with_img');
        const imgGroup=document.querySelectorAll('.img_group');
        blockWithImage.innerHTML=(`<img class='img i${check}' draggable='true' src="./img/${randomArrForOneImg[check]}.png" alt="">`);
        const img=document.querySelector(`.i${check}`);

        const dragStart=function(){
            console.log('dragstart');
            setTimeout(()=>{
                this.classList.add('hide');
            },0)
        }

        const dragEnd=function() {this.classList.remove('hide'); }

        const dragOver=(event)=> event.preventDefault();

        const dragEnter=function(){
            if(this.classList.contains(`img${randomArrForOneImg[check]}`)){
                this.classList.add('hovered_true');
            }
            else{
                this.classList.add('hovered_false');
            } 
        }

        const dragLeave=function(){
            console.log("leave")
            this.classList.remove('hovered_false');
            this.classList.remove('hovered_true');
        }

        const dragDrop=function(){
            if(this.classList.contains(`img${randomArrForOneImg[check]}`)){
                this.classList.add('drop_true');
                blockWithImage.innerHTML=(`<img class='img i${check} '  draggable='true' src="./img/${randomArrForOneImg[++check]}.png" alt="">`);
                if(check==11 ) alert("Вітаюю ви виграли!!!")
            }
            else{
                this.classList.add('hovered_false');
                alert("Невірний вибір")
                this.classList.remove('hovered_false');     
            }
        }
        imgGroup.forEach((imgOne)=>{
            imgOne.addEventListener('dragover',dragOver);
            imgOne.addEventListener('dragenter',dragEnter);
            imgOne.addEventListener('dragleave',dragLeave);
            imgOne.addEventListener('drop',dragDrop);
        })
        img.addEventListener('dragstart',dragStart);
        img.addEventListener('dragend',dragEnd);
    }
    dragAndDrop()
