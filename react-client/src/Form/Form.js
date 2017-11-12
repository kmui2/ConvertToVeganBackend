import React, { Component } from 'react';
import $ from 'jquery';
import './Form.css';
import { Grid, Row, Col } from 'react-flexbox-grid';


class Form extends Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
    }

    

    render() {
        return (
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