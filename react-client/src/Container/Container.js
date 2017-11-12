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
        this.addMore = this.addMore.bind(this);
        this.removeIngredient = this.removeIngredient.bind(this);
        
        let id = this.guid();
        this.postsJsx = [<Row id={id} className="center-xs center-md center-lg center-sm">
        <Col xs={9} sm={7} md={3} lg={3}>
            <input id="post" className="postForm" type="text" name="lastname" placeholder="Vegan Ingredient" />
        </Col>
        <Col xs={1} sm={1} md={1} lg={1}>
        <a onClick={()=>{this.removeIngredient(id)}} class="btn-floating btn-mini waves-effect waves-light red"><i class="material-icons">block</i></a>
        </Col>
        </Row>];
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
            let posts = blog['post'];
            let id = blog['id'];
            console.log(id);

            let postsJsx = [];
            for (let post of posts) {
                console.log(post)
                postsJsx.push(<h6>{post}</h6>);
            }

            this.jsX.push(
                <div id={id} className="col-xs-6 col-sm-4 col-md-3 col-lg-3">
                    <div className="blog">
                        <div className="card horizontal">
                            <div className="card-stacked">
                                <div className="card-content">
                                    <h5>{title}</h5>
                                    {postsJsx}</div>
                                <div className="card-action">
                                    <a type="button" className="waves-effect waves-light btn red" onClick={() => { this.delete(id) }}>Delete</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            )


        }
    }

    addMore() {
        let id = this.guid();
    //     $('#addmore').append(`                            <div id="${id}" class="center-xs center-md center-lg center-sm">
    //     <div class="col-xs-9 col-sm-7 col-md-3 col-lg-3">
    //         <input id="post" class="postForm" type="text" name="lastname" placeholder="Vegan Ingredient" />
    //     </div>
    //     <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1">
    //     <a onclick="$('#${id}').remove()" class="btn-floating btn-mini waves-effect waves-light red"><i class="material-icons">block</i></a>
    //     </div>
    // </div>`);
        this.postsJsx.push(<Row id={id} className="center-xs center-md center-lg center-sm">
        <Col xs={9} sm={7} md={3} lg={3}>
            <input id="post" className="postForm" type="text" name="lastname" placeholder="Vegan Ingredient" />
        </Col>
        <Col xs={1} sm={1} md={1} lg={1}>
        <a onClick={()=>{this.removeIngredient(id)}} class="btn-floating btn-mini waves-effect waves-light red"><i class="material-icons">block</i></a>
        </Col>
        </Row>)
        
        console.log("addmore")
        this.forceUpdate();
    }

    delete(id) {
        console.log(id);



        $.ajax({
            url: 'http://' + document.domain + ':' + 7070 + '/deleteBlog',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ id }),
            success: function (data) {
                $('#' + id).remove();
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
        let posts = [];
        let elements = document.getElementsByClassName('postForm');
        console.log(elements);
        for (let element of elements) {
            console.log(element)
            posts.push(element.value);
            element.value = '';
        }
        let id = this.guid();
        console.log(posts);

        // this.setState({ title, post });
        // let jsX = this.jsX;

        let blog = {
            title: title,
            post: posts,
            id: id
        };

        console.log(blog);


        let postsJsx = [];
        for (let post of posts) {
            console.log(post)
            postsJsx.push(<h6>{post}</h6>);
        }

        console.log(postsJsx)


        function success(data) {

            $('#title').val('');
            this.jsX.unshift(
                <div id={id} className="col-xs-6 col-sm-4 col-md-3 col-lg-3">
                    <div className="blog">
                        <div className="card horizontal">
                            <div className="card-stacked">
                                <div className="card-content">
                                    <h5>{title}</h5>
                                    {postsJsx}</div>
                                <div className="card-action">
                                    <a type="button" className="waves-effect waves-light btn red" onClick={() => { this.delete(id) }}>Delete</a>
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

    removeIngredient(id) {
        $('#'+id).remove();
    }

    render() {
        return (
            <div className="container-class">

                <div className="Form">
                    <form onSubmit={this.submit}>
                        <Row className="center-xs center-md center-lg center-sm">
                            <Col xs={10} sm={8} md={4} lg={4}>
                                NonVegan Ingrediant:<br />
                                <input id="title" type="text" name="firstname" placeholder="NonVegan" />
                                <br />
                            </Col>
                        </Row>
                        <Row className="center-xs center-md center-lg center-sm">
                            <Col xs={10} sm={8} md={4} lg={4}>
                                Convert to:<br />
                            </Col>
                        </Row>
                        <div id="addmore">
                            {this.postsJsx}
                        </div>
                        <br />
                        <a type="button" className="waves-effect waves-light btn green" onClick={this.addMore}>Add More Options</a>
                        <br /><br />
                        <input className="waves-effect waves-light btn blue" type="submit" value="Submit" />
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