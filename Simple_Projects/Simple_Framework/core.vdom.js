function vNodeCreate(tag, props, children) {
    return {
        tag, 
        props,
        children
    }
}

function mountVNode(vnode, container) { 
    const el = document.createElement(vnode.tag);

    for(const key in vnode.props){
        el.setAttribute(key, vnode.props[key]);
    }

    if(typeof vnode.children === 'string'){
        el.textContent = vnode.children;
    } else {
        vnode.children.forEach(ch => {
            mountVNode(ch, el);
        });
    }

    container.appendChild(el);

    vnode.$el = el;
}

function unmountVNode(vnode) { 
    vnode.$el.parentNode.removeChild(vnode.$el);
}

function patchVNodes(n1, n2) { 
    if(n1.tag !== n2.tag){
        mountVNode(n2, n1.$el.parentNode);
        unmountVNode(n1);
    } else {
        n2.$el = n1.$el;

        if(typeof n2.children === 'string'){
            n2.$el.textContent = n2.children;
        } else {
            while(n2.$el.attributes.length > 0) {
                n2.$el.removeAttribute(n2.$el.attributes[0].name);
            }

            for(const key in n2.props){
                n2.$el.setAttribute(key, n2.props[key]);
            }

            if(typeof n1.children === 'string'){
                n2.$el.textContent = null;
                n2.children.forEach(ch => {
                    mountVNode(ch, n2.$el);
                })
            } else {
                const commandLength = Math.min(n1.children.length, n2.children.length);

                for(let i = 0; i < commandLength; i++){
                    patchVNodes(n1.children[i], n2.children[i]);
                }

                if(n1.children.length > n2.children.length){
                    n1.children.slice(n2.children.length).forEach(ch => {
                        unmountVNode(ch);
                    });
                } else if(n2.children.length > n1.children.length){
                    n2.children.slice(n1.children.length).forEach(ch => {
                        mountVNode(ch);
                    });
                }
            }
        }
    }
 }