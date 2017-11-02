import React, { Component } from 'react';
import $ from 'jquery';
import './Form.css';


class Form extends Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
    }

    

    render() {
        return (
            <div className="Form">
                <form onSubmit={this.submit}>
                    Title:<br />
                    <input id="title" type="text" name="firstname" placeholder="Title" />
                    <br />
                    Blog Post:<br />
                    <textarea id="post" rows="20" type="text" name="lastname" placeholder="Blog Post" />
                
                    <br /><br />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }

    submit(e) {
        e.preventDefault();

        let title = $('#title').val();
        let post = $('#post').val();

        let blog = {
            title: title,
            post: post
        };

        console.log(blog);

        $.ajax({
            url: 'http://'+document.domain+':'+7070+'/addBlog',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(blog),
            success: function (data) {
                console.log(data);
            }
        });
    }

}

export default Form;