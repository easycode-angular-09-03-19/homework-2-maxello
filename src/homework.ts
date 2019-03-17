//1
function addItemInfoDecorator(target: Object, method: string, descriptor: PropertyDescriptor) {
    let originalFunc = descriptor.value;
    
    descriptor.value = function () {    
        let origResult = originalFunc.apply(this);

        return Object.assign({
            date: new Date().toString(),
            info: `${this.name} - \$${this.price}`
        }, origResult);
    }
}

class Item {
    public price: number;
    public name: string;

    constructor(name: string, price: number) {
        this.name = name;
        this.price = price;
    }

    @addItemInfoDecorator
    public getItemInfo() {
        return {
            name: this.name, 
            price: this.price
        };
    }
}

let item = new Item('Apple', 100);
console.log(item.getItemInfo());

//2
function addUserType(type: string) {
    return function(targetClass) {
        return class {
            public type = type;
            createDate() {
                return new Date().toString();
            }
        }
    }
}

@addUserType('admin')
class User {

}

const user = new User();

//3
namespace USA {
    export interface INews {
        id: number;
        title: string;
        text: string;
        author: string;
    }

    export class NewsService {
        protected apiurl: string = 'https://news_api_usa_url'
        public getNews(): Promise<INews[] | any> {
            return new Promise<INews[]>((resolve: (data: INews[]) => void, reject: (err: any) => void) => {
                fetch(`${this.apiurl}/news`)
                    .then((response) => response.json())
                    .then((data: INews[]) => resolve(data))
                    .catch((err) => reject(err));
            });
        }
    }
}

namespace UKRAINE {
    // News api Ukraine
    export interface INews {
        uuid: string;
        title: string;
        body: string;
        author: string;
        date: string;
        imgUrl: string;
    }

    export class NewsService {
        protected apiurl: string = 'https://news_api_2_url'
        public getNews(): Promise<INews[] | any> {
            return new Promise<INews[]>((resolve: (data: INews[]) => void, reject: (err: any) => void) => {
                fetch(`${this.apiurl}/news`)
                    .then((response) => response.json())
                    .then((data: INews[]) => resolve(data))
                    .catch((err) => reject(err));
            });
        }
        public addToFavorite() {} // method add to favorites
    }
}

const ukrainianService = new UKRAINE.NewsService();
let ukrainianNews: UKRAINE.INews[];

ukrainianService.getNews()
    .then((items: UKRAINE.INews[]) => {
        ukrainianNews = items;
    });

//4
class Junior {
    public doTasks():void {
        console.log('Actions!!!');
    }
}

class Middle {
    public createApp():void {
        console.log('Creating!!!');
    }
}

class Senior implements Junior, Middle {
    public doTasks():void {}
    public createApp():void {}

    public createArchitecture():void {
        console.log('Building!!!');
    }
}

function applyMixin(targetClass, baseClasses) {
    baseClasses.forEach((baseClass) => {
        Object.getOwnPropertyNames(baseClass.prototype).forEach((propName) => {
            targetClass.prototype[propName] = baseClass.prototype[propName];
        });
    });
}

applyMixin(Senior, [Junior, Middle]);
