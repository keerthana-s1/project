import {HttpClient} from '@angular/common/http'
import { Injectable } from '@angular/core'

@Injectable()
export  class ApiService {
    messages 
    users
    bookmarks
    favbookmarks
    privbookmarks
    categories
    catspec
    ip
    constructor(private http: HttpClient) {}

    

    getMessages() {
        this.http.get('http://localhost:3000/posts').subscribe(res => {
            this.messages= JSON.stringify(res)
            this.messages= JSON.parse(this.messages)
            console.log(this.messages)
        })
    }
    getBMs() {
        this.http.get('http://localhost:3000/all').subscribe(res => {
            this.bookmarks= res
        
        })
        
    }

    getFavBMs() {
        this.http.get('http://localhost:3000/fav').subscribe(res => {
            this.favbookmarks= res
            console.log(this.favbookmarks)
        })
    }

    getPrivBMs() {
       return this.http.get('http://localhost:3000/priv')
    }

    getCat() {
       return this.http.get('http://localhost:3000/cat')
    }

    getBMnames() {
        return this.http.get('http://localhost:3000/bmnames')
     }
    getTag() {
        return this.http.get('http://localhost:3000/tag')
     }

    getCatspecs(id) {
         return this.http.get('http://localhost:3000/cat/'+ id )
     }

     getBMUpdate(id) {
        return this.http.get('http://localhost:3000/update/'+ id )
    }

     getTagspecs(id) {
        return this.http.get('http://localhost:3000/tag/'+ id )
    }
    getSingle(id) {
        return this.http.get('http://localhost:3000/name/'+ id )
    }

    getUsers() {
        this.http.get('http://localhost:3000/users').subscribe(res => {
            this.users= res
            //console.log(this.messages)
        })
    }
    getHomeUser() {
       return this.http.get('http://localhost:3000/home')
    }

    addBM(BMdata) {
        this.http.post<any>('http://localhost:3000/newBM',BMdata).subscribe(res => {
             console.log(res)
             //localStorage.setItem(this.TOKEN_KEY,res.token)
         })
     }

     UpdateBM(BMdata) {
        this.http.post<any>('http://localhost:3000/update',BMdata).subscribe(res => {
             console.log(res)
             //localStorage.setItem(this.TOKEN_KEY,res.token)
         })
     }

     changeStat(BMdata) {
        this.http.post<any>('http://localhost:3000/change',BMdata).subscribe(res => {
             console.log(res)
             //localStorage.setItem(this.TOKEN_KEY,res.token)
         })
     }

     changeVisStat(BMdata) {
        this.http.post<any>('http://localhost:3000/changevis',BMdata).subscribe(res => {
             console.log(res)
             //localStorage.setItem(this.TOKEN_KEY,res.token)
         })
     }
     delBM(BMdata) {
        this.http.post<any>('http://localhost:3000/delete',BMdata).subscribe(res => {
             console.log(res)
             //localStorage.setItem(this.TOKEN_KEY,res.token)
         })
     }

    
}