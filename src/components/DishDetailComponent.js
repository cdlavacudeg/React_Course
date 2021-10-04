import React, { Component } from 'react';
import { Card,CardImg,CardText,CardBody,CardTitle,Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Row, Label,Col} from 'reactstrap';
import {Control,LocalForm,Errors} from 'react-redux-form';
import {Link} from 'react-router-dom';

const maxLength=(len)=>(val)=>!(val)|| (val.length<=len);
const minLength=(len)=>(val)=>(val) && (val.length>=len);

class CommentForm extends Component{
    constructor(props){
        super(props);
        this.state={
            isModalOpen:false
        };
        this.toggleModal=this.toggleModal.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
          });
      }
    
    handleSubmit(values) {
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating,values.yourname,values.comment);
    }
    

    render(){
        return(
            <div>
            <Button outline onClick={this.toggleModal}> <span className="fa fa-pencil fa-lg">Submit Comment</span> </Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                
                <ModalHeader>Submit Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values)=>this.handleSubmit(values)}>
                        <Row className="form-group">
                            <Col>
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select model=".rating" type="select" name="rating" className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col>
                                <Label htmlFor="yourname">Your name</Label>
                                <Control.text model=".yourname" type="text" id="yourname" name="yourname" placeholder="Name" className="form-control"
                                validators={{
                                    minLength:minLength(3),maxLength:maxLength(15)
                                }}
                                />
                                <Errors className="text-danger"
                                model=".yourname"
                                show="touched"
                                messages={{
                                    minLength:'Must be geater than 2 characters',
                                    maxLength:'Must be 15 characters or less'
                                }}/>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col>
                                <Label htmlFor="comment">Comment</Label>
                                <Control.textarea model=".comment" type="textarea" id="comment" name="comment" rows="6" className="form-control"/>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col>
                                <Button type="submit" color="primary">
                                    Submit
                                </Button>
                            </Col>
                        </Row>
                    </LocalForm>
                </ModalBody>
            </Modal>
            
            </div>
        );
    }


}




function RenderDish({dish}){
        return(
            <Card>
                <CardImg top src={dish.image} alt={dish.name} />
                <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        );
}   

function RenderComment({comments,addComment,dishId}){
        if (comments!=null)
        {
            const comentsList=comments.map((comment)=>{
                return(
                    <li key={comment.id}>
                        {comment.comment} <br/>
                        --{comment.author} , {new Intl.DateTimeFormat('en-US',{year:'numeric',month:'short',day:'2-digit'}).format(new Date(Date.parse(comment.date)))}
                    </li>
                );
             });
        return(
            <div>
            {comentsList}  
            <CommentForm dishId={dishId} addComment={addComment}/>   
            </div>
            );
        }
        else {
            return (<div></div>);
        }
    }

const DishDetail=(props)=>{
    if (props.dish != null) {
    return (
    <div class="container">
        <div className="row">
            <Breadcrumb>
                <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
                <h3>{props.dish.name}</h3>
                <hr />
            </div>                
        </div>
        <div className="row">
            <div className="col-12 col-md-5 m-1">
                <RenderDish dish={props.dish}/>
            </div>
            <div className="col-12 col-md-5 m-1"><h4>Comments</h4> <ul className="list-unstyled">
                <RenderComment comments={props.comments} addComment={props.addComment}
                dishId={props.dish.id}/></ul></div>
        </div>
    </div>
    );
    }
}
    

export default DishDetail;