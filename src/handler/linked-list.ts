export type NodeItem<T> = {
    id: number
    value: T
    next: NodeItem<T> | null,
    prev: NodeItem<T> | null
}

export default class LinkedList<T> {
    head: NodeItem<T> | null;
    tail: NodeItem<T> | null;
    length: number;

    constructor() {
        this.tail = this.head = null;
        this.length = 0;
    }

    /**
     * 
     * @returns True when the list is empty.
     */
    public empty(): boolean {
        return this.length === 0;
    }

    /**
     * 
     * @returns The length of the List
     */
    public size(): number {
        return this.length;
    }

    /**
     * prepend
     * append
     * print
     * insertAt
     * removeAt(index)
     * removeOn(value)
     * search
     * reverse
     */

    public prepend(item: T): NodeItem<T> | void {

        const node: NodeItem<T> = {
            id: this.length,
            value: item,
            next: null,
            prev: null,
        }

        if(!this.empty() && this.head) {
            // assing next prepend value to become node
            node.next = this.head;

            // assing the current head value previous to the new node;
            this.head.prev = node;
        }

        if(this.head && !this.tail)
        {
            this.tail = this.head.next;
        }

        // assigng the node to become the tail

        if(!this.tail && this.empty())
        {
            this.tail = node;
        }

        this.head = node;
        this.length++

        return node;
    }

    public append(item: T): NodeItem<T> | void {
        
        const node: NodeItem<T> = {value: item, next: null, prev: null}



        if(this.empty()) {
            this.head = node;
            this.tail = this.head = node;
        } else {

            let prev: NodeItem<T> | null = this.head;

            if(prev)
            {
                while(prev.next) {
                    prev = prev.next;
                }

                // assign node to previous node
                node.prev = prev;

                // assign previous node to next node
                prev.next = node

                // assign the tail if the the list is not empty
                this.tail = node.prev?.next;
            }
        }

        this.length++;
    }

    public search(item: T) {
        if(this.empty()) {
            return -1;
        } else {
            let curr = this.head;

            while(curr && curr.value !== item) {
                curr = curr.next;
            }

            if(curr)
            {
                return curr;
            }

            return -1;
        }
    }

    public insertAt (item: T, index: number) {

        const node: NodeItem<T> = {value: item, next: null}

        if(this.empty()) this.head = node;

        if(index === 0) this.prepend(node.value);

        if(index > 0) {

            let prev = this.head;

            for(let i = 0; i < index - 1; i++) {
                if(prev) prev = prev.next;                
            }

            if(prev) {
                node.next = prev.next;
                prev.next = node
            };
        }
    }

    public reverse() {
        if(this.empty()) return console.log('List is empty')

        // current pointer;
        let prev = null;
        let curr = this.head;

 

        // my implementation
        for(let i = 0; i < this.size(); i++) {

            let next: NodeItem<T> | null;

            // console.log(curr);

            if(curr) {
                
                next = curr.next;
                  // point to the previous
                curr.next = prev;

                // point the previous to curr
                prev = curr;
                // point the current value to next;
                curr = next;

                // reverse previous value
                prev.prev = curr;

                // console.log(`${prev.value} ${curr?.value} ${next?.value}`);
            }
        }

        this.tail = this.head;
        this.head = prev;
    }

    public print(): string {
        if(this.empty() && this.length === 0) return 'List is empty';
        
        let curr: NodeItem<T> | null = this.head;

        let listValues: string  = '';

        while(curr)
        {
            console.log(curr);
            if(curr.next) {
                listValues += `${curr.value} -> `
            } else {
                listValues += `${curr.value}`
            }
            curr = curr.next;
        }

        return listValues;
    }

    public getHead(): NodeItem<T> | null {
        return this.head;
    }

    public getTail(): NodeItem<T> | null {
        return this.tail;
    }

}