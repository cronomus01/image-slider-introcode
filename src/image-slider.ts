import LinkedList, { NodeItem } from "./handler/linked-list";

type Direction = {
    turn: 'turn-right' | 'turn-left',
    set: 'set-right' | 'set-left',
    traverse: 'right' | 'left'
}

export default class ImageSlider<T> extends LinkedList<T> {
    
    private app: HTMLElement | null;
    private node: NodeItem<T> | null;
    private nextDirection: Direction;
    private previousDirection: Direction;

    constructor(container: HTMLElement) {
        super();
        this.app = container;
        this.node = null;

        this.nextDirection = {
            turn: 'turn-right',
            set: 'set-right',
            traverse: 'right',
        }
        this.previousDirection = {
            turn: 'turn-left',
            set: 'set-left',
            traverse: 'left',
        }
    }

    public async load(): Promise<void> {
        if(this.head) this.node = this.head;

        if(this.app)
        {
            await this.generate();
            await this.actions(this.app);
        } else {
            throw new Error('Error no #slider element');
        }
    }

    public async save(images: Array<T>) {

        if(!images) {
            throw new Error('No image directory has been passed');
        }

        if(images.length === 0) {
            throw new Error('Please add an image on the array');  
        }

        for(const item of images) {
            this.prepend(item);
        }
    }

    public async generate(): Promise<void> {
        
        const app = this.app;

        if(!app) {
            return console.log('Error no #slider element');
        }

        app.innerHTML = `
            <div class="slider-cloud"></div>
            <ul class="list-ul">
                <img class="image" data-id="${this.node?.id}" src="${this.node?.value}" />
            </ul>
            <ul class="pagination-ls">
                ${this.pagination()}
            </ul>
            <button class="previous">
                <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256.02 298.93">
                <path class="cls-1" d="m222.5,100.5c-7-1-28-25-28-25,0,0,40-4,12-34L63,150H0L207,0l48.5,53.5c1,4-26,48-33,47Z"/>
                <path class="cls-1" d="m207.77,298.93L0,150l63-.33,144.06,107.76c27.84-30.14-12.18-33.94-12.18-33.94,0,0,20.88-24.11,27.87-25.14s34.22,42.82,33.24,46.83"/>
            </svg>
            </button>
            <button class="next">
                <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256.02 298.93">
                <path class="cls-1" d="m222.5,100.5c-7-1-28-25-28-25,0,0,40-4,12-34L63,150H0L207,0l48.5,53.5c1,4-26,48-33,47Z"/>
                <path class="cls-1" d="m207.77,298.93L0,150l63-.33,144.06,107.76c27.84-30.14-12.18-33.94-12.18-33.94,0,0,20.88-24.11,27.87-25.14s34.22,42.82,33.24,46.83"/>
            </svg>
            </button>
        `
    }

    public async actions(app: HTMLElement): Promise<void>  {
        
        const next = app.querySelector<HTMLButtonElement>('.next')!;
        const previous = app.querySelector<HTMLButtonElement>('.previous')!;

        next.addEventListener('click', () => {
            this.move(this.node?.next!, this.head!, this.nextDirection)
        });

        previous.addEventListener('click', () => {
            this.move(this.node?.prev!, this.tail!, this.previousDirection)
        });

        this.keypressed();
    }

    public keypressed() {

        document.onkeydown = (e) => {

            switch(e.key) {
                case 'ArrowRight':
                    this.move(this.node?.next!, this.head!, this.nextDirection)
                    break;
                case 'ArrowLeft':
                    this.move(this.node?.prev!, this.tail!, this.previousDirection)
                    break;
            }
           
        } 
    }

    public async move(last: NodeItem<T>, revert: NodeItem<T>, direction: Direction) {
        const app = this.app;

        if(!this.node) return;

        if(!app) {
            throw new Error('Error no #slider element');
        }

        const ulListEl = app.querySelector('.list-ul')!;        
        const ulChildrens = ulListEl.children;

        const paginationEl = app.querySelector('.pagination-ls')!;
        const paginateChildrens = paginationEl.children;

        if(ulChildrens.length < 2)
        {
            if(last === null) {
                this.node = revert;
            } else {
                this.node = last;
            }
    
            for(let i = 0; i < paginateChildrens.length; i++)
            {
                const child = paginateChildrens[i];

                if(child instanceof HTMLLIElement) {

                    const nodeId = this.node?.id.toString();
                    const listId = child.dataset.value;

                    if(listId === nodeId)
                    {
                        child?.classList.add('active');
                
                    } else {
                        child?.classList.remove('active');
                    }
                }

            }
       
            const image = this.generateImage(direction);

            if(direction.traverse == 'right') ulListEl.append(image);
            if(direction.traverse == 'left') ulListEl.prepend(image);

            await this.animation(image, direction);
            await this.removeSibling(image, ulListEl, direction);
        }
    }


    public generateImage(direction: Direction): HTMLImageElement {

        const imgEl = document.createElement('img');
        
        if(this.node) {

            const nodeValue = this.node?.value;
            const nodeId = this.node.id;
            
            imgEl.setAttribute('src', `${nodeValue}`);
            imgEl.setAttribute('data-id', `${nodeId}`);
            imgEl.classList.add(direction.set);
    
        }

        return imgEl;
    }

    public async animation(image: HTMLImageElement, direction: Direction) {
        setTimeout(() => {
            image.classList.add(direction.turn);

            if(direction.traverse == 'right') {
                image.previousElementSibling?.classList.add('traverse-left');
            }

            if(direction.traverse == 'left') {
                image.nextElementSibling?.classList.add('traverse-right');
            }
        }, 100)
    }

    public async removeSibling(image: HTMLImageElement, parent: Element, direction: Direction) {
        setTimeout(() => {
            image.classList.remove(direction.turn);
            image.classList.add('image');
            image.classList.remove(direction.set);

            if(direction.traverse == 'right') {
                parent.removeChild(image.previousElementSibling!);
            }

            if(direction.traverse == 'left') {
                parent.removeChild(image.nextElementSibling!);
            }
        }, 600)
    }

    public previous() {
        console.log('previous');
    }

    public pagination(): string {
        let node = this.head;
        let list = ``;
        
        while(node) {
          let active = this.head?.id === node?.id ? 'pagination-ls-item active' : 'pagination-ls-item';
          list += `<li class="${active}" data-value="${node?.id}"><span></span></li>`;
          node = node.next;
        }
      
        return list;
    }

}