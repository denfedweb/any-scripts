const state = reactive({
    inputValue: ''
});

function render(text){
    
    return  vNodeCreate(
                'div',
                { class: 'container' },
                [
                    vNodeCreate('h1', { title: 'this is title' }, 'Hello world!'),
                    vNodeCreate('div',{ class: 'description' }, [
                        vNodeCreate('img', { src: 'https://pluspng.com/img-png/nodejs-logo-png-nice-images-collection-node-js-desktop-wallpapers-370.png', style: 'width: 300px' }, []),
                        vNodeCreate('p', {}, 'JavaScript is cool!'),
                        vNodeCreate('input', { placeholder: 'enter text', oninput: 'state.inputValue = this.value' }, []),
                        vNodeCreate('p', { class: 'user-text' }, text)
                    ])
                ]
            );
}

let currentNode;

watchEffect(()=> {
    if(!currentNode){
        currentNode = render(state.inputValue);
        mountVNode(currentNode, document.getElementById('root')); 
    } else {
        const newNode = render(state.inputValue);
        patchVNodes(currentNode, newNode);
        currentNode = newNode;
    }
});

