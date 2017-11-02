import React, { Component } from 'react';
import $ from 'jquery';

class Container extends Component {
    constructor() {
        super();
        this.componentWillMount = this.componentWillMount.bind(this);
        this.jsX = [];
    }

    componentWillMount() {
        let blogs;
        $.ajax({
            url: 'http://' + document.domain + ':' + 7070 + '/getBlogs',
            type: 'GET',
            async: false,
            contentType: 'application/json',
            success: function (data) {
                console.log(data);
                blogs = data.blogs;
            }
        });
        console.log(blogs);
        for (let blog of blogs) {
            let title = blog['title'];
            let post = blog['post'];

            this.jsX.unshift(<p>{post}</p>)
            this.jsX.unshift(<h1>{title}</h1>)

        }
    }

    render() {
        return (
            <div className="container">
                <div className="demo">
                    {this.jsX}
                </div>
            </div>
        );
    }
}

export default Container;