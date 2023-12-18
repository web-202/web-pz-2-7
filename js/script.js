'use strict'

function createScene(){
    let scene = document.createElement('div')
    scene.className = 'game_container';
    return scene;
}

function createStartScene(){
    let button = document.createElement('button');
    let p = document.createElement('p');
    let scene = createScene();

    p.innerHTML = 'Моя перша гра';
    button.className = 'button';
    button.innerHTML = 'Почати гру!';
    document.body.append(scene);

    scene.append(p);
    scene.append(button);
}

createStartScene();

$(document).ready(function(){
    $("button").click(function(){
        window.location.href ='game.html'
    });
});