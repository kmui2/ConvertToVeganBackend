import React, { Component } from 'react';
import $ from 'jquery';
import { Grid, Row, Col } from 'react-flexbox-grid';
import './Container.css';

class Container extends Component {
    constructor() {
        super();
        this.componentWillMount = this.componentWillMount.bind(this);
        this.jsX = [];
        this.submit = this.submit.bind(this);
        this.state = { title: '', post: '' };
        this.guid = this.guid.bind(this);
        this.delete = this.delete.bind(this);
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
        for (let blog of blogs.reverse()) {
            console.log(blog);
            let title = blog['title'];
            let post = blog['post'];
            let id = blog['id'];
            console.log(id);

            this.jsX.push(
                <div id={id} className="col-xs-6 col-sm-4 col-md-3 col-lg-3">
                    <div className="blog">
                        <div className="card horizontal">
                            <div className="card-stacked">
                                <div className="card-content">
                                    <h5>{title}</h5>
                                    <h6>{post}</h6></div>
                                <div className="card-action">
                                    <a type="button" className="waves-effect waves-light btn red" onClick={()=>{this.delete(id)}}>Delete</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            )


        }
    }

    delete(id) {
        console.log(id);


        
        $.ajax({
            url: 'http://' + document.domain + ':' + 7070 + '/deleteBlog',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({id}),
            success: function (data) {
                $('#'+id).remove();
                console.log(data);
            }
        });
    }

    guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return 'id-' + s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

    submit(e) {
        e.preventDefault();

        let title = $('#title').val();
        let post = $('#post').val();
        let id = this.guid();

        this.setState({ title, post });
        // let jsX = this.jsX;

        let blog = {
            title: title,
            post: post,
            id: id
        };

        console.log(blog);
        
        function success(data) {

            $('#title').val('');
            $('#post').val('');
            this.jsX.unshift(
                <div id={id} className="col-xs-6 col-sm-4 col-md-3 col-lg-3">
                    <div  className="blog">
                        <div className="card horizontal">
                            <div className="card-stacked">
                                <div className="card-content">
                                    <h5>{title}</h5>
                                    <h6>{post}</h6></div>
                                <div className="card-action">
                                    <a type="button" className="waves-effect waves-light btn red" onClick={()=>{this.delete(id)}}>Delete</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
            console.log(data);
            $('#title').focus();
            this.forceUpdate();
        }

        success = success.bind(this);


        $.ajax({
            url: 'http://' + document.domain + ':' + 7070 + '/addBlog',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(blog),
            success: success
        });
    }

    render() {
        return (
            <div className="container-class">

                <div className="Form">
                    <form onSubmit={this.submit}>
                        <Row className="center-xs center-md center-lg center-sm">
                            <Col >
                                NonVegan Ingrediant:<br />
                                <input id="title" type="text" name="firstname" placeholder="NonVegan" />
                                <br />
                            </Col>
                        </Row>
                        <Row className="center-xs center-md center-lg center-sm">
                            <Col>
                                Convert to:<br />
                                <input id="post" type="text" name="lastname" placeholder="Vegan Ingredient" />

                                <br /><br />
                                <input className="waves-effect waves-light btn" type="submit" value="Submit" />
                            </Col>
                        </Row>
                    </form>
                </div>
                <div className="demo">
                    <Row>
                        {this.jsX}
                    </Row>
                </div>
            </div>
        );
    }
}

export default Container;