import React, { Component } from 'react';
import $ from 'jquery';

class Container extends Component {
    constructor () {
        super();
        this.componentWillMount = this.componentWillMount.bind(this);
        this.jsX = [];
    }

    componentWillMount() {
        let blogs;
        $.ajax({
            url: 'http://'+document.domain+':'+7070+'/getBlogs',
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
                    <h1>You Blog</h1>

                    <p>I often find myself designing a website where the footer must rest at the bottom of the page, even if the content above it is too short to push it to the bottom of the viewport naturally.</p>

                    <p>However, if the content is taller than the user’s viewport, then the footer should disappear from view as it would normally, resting at the bottom of the page (not fixed to the viewport).</p>
                </div>
            </div>
        );
    }
}

export default Container;