import LinkedList, { NodeItem } from "./handler/linked-list";

type Direction = {
    traverse: 'right' | 'left'
}

export default class ImageSlider<T> extends LinkedList<T> {
    
    private app: HTMLElement | null;
    private node: NodeItem<T> | null;
    private nextDirection: Direction;
    private previousDirection: Direction;
    private sliderWith: number;

    constructor(container: HTMLElement) {
        super();
        this.app = container;
        this.node = null;

        this.nextDirection = {
            traverse: 'right',
        }
        this.previousDirection = {
            traverse: 'left',
        }

        this.sliderWith = 0;
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
            <div class="slider-content">
                ${this.content()}
            </div>
            <ul class="pagination-ls">
                ${this.pagination()}
            </ul>
            <button class="previous">
                <img src="https://img.icons8.com/ios-glyphs/90/FFFFFF/chevron-left.png" alt="chevron-left"/>
            </svg>
            </button>
            <button class="next">
                <img src="https://img.icons8.com/ios-glyphs/90/FFFFFF/chevron-right.png" alt="chevron-right"/>
            </svg>
            </button>
        `
    }

    public async actions(app: HTMLElement): Promise<void>  {
        
        const sliderContentEl = app.querySelector('.slider-content')!;        
        const sliderContentChildrens = sliderContentEl.children;

        sliderContentEl.setAttribute('style', `width: ${sliderContentChildrens.length * 100}%`)

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

        const sliderContentEl = app.querySelector('.slider-content')!;        
        const sliderContentChildrens = sliderContentEl.children;

        const paginationEl = app.querySelector('.pagination-ls')!;
        const paginateChildrens = paginationEl.children;


        // this.sliderWith = Math.max(0, this.sliderWith + 21)


        if(last === null) {
            this.node = revert;
        } else {
            this.node = last;
        }

        for(let i = 0; i < paginateChildrens.length; i++)
        {
            const child = paginateChildrens[i];
            const sliderContent = sliderContentChildrens[i];

            if( child instanceof HTMLLIElement && 
                sliderContent instanceof HTMLDivElement && 
                sliderContentEl instanceof HTMLDivElement
            ) {

                let nodeId = this.node?.id.toString();
                let paginationItem = child.dataset.value;
                let sliderContentItem = sliderContent.dataset.value;

                if(paginationItem == nodeId && sliderContentItem == nodeId)
                {
                    child?.classList.add('active');
                    sliderContent?.classList.add('active');

                    if(direction.traverse == "right") {
                        this.sliderWith += sliderContent.offsetWidth;
                        
                        if(this.sliderWith == sliderContentEl.offsetWidth) {
                            this.sliderWith = 0;
                        }
                        
                     
                    }

                    
                    if(direction.traverse == "left") {
                        this.sliderWith -= sliderContent.offsetWidth;

                        if(this.sliderWith < 0) {
                            this.sliderWith = sliderContentEl.offsetWidth - sliderContent.offsetWidth;
                        }
                    }

                    sliderContentEl.setAttribute('style', `width: ${sliderContentChildrens.length * 100}%;transition: all 700ms ease 0s; transform: translate3d(-${this.sliderWith}px, 0, 0`)

                    console.log(`${this.sliderWith} ${sliderContentEl.offsetWidth}`);
                    

                } else {
                    child?.classList.remove('active');
                    sliderContent?.classList.remove('active');
                }
            }

        }
    
    }


    public generateHTML(): HTMLDivElement {

        const divEl = document.createElement('div');
        
        if(this.node) {
            const nodeId = this.node.id;
            divEl.setAttribute('data-id', `${nodeId}`);
            divEl.innerHTML += this.node.value;
        }

        return divEl;
    }

    public pagination(): string {
        let node = this.head;
        let list = ``;
        
        while(node) {
          let active = this.head?.id === node?.id ? 'pagination-ls-item active' : 'pagination-ls-item';
          list += `<li class="${active}" data-value="${node.id}"><span></span></li>`;
          node = node.next;
        }
      
        return list;
    }

    public content(): string {
        let node = this.head;
        let content = ``;
        
        while(node) {
          let active = this.head?.id === node?.id ? 'content-item active' : 'content-item';
          content += `<div class="content-slide ${active}" data-value="${node.id}">${node?.value}</div>`;
          node = node.next;
        }

        console.log(node);
      
        return content;
        
    }

}