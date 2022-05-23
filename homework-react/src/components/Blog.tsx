import React from 'react';
import Post from './Post';

class Blog extends React.Component{
    render () {
        let array = [];
        let i : number = 0;
        while(i < 5){
            let random : number = Math.floor(Math.random() * 100);
            array.push(<Post id={random}></Post>)
            i += 1;
        }
        return array; 
    }
}

export default Blog;
