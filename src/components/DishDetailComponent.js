import React from 'react';
import { Card,CardImg,CardText,CardBody,CardTitle } from 'reactstrap';

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

function RenderComment({comments}){
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
        return comentsList;
        }
        else {
            return (<div></div>);
        }
    }

const DishDetail=(props)=>{
    if (props.dish == null) return (<div></div>);
    return (
    <div class="container">
        <div className="row">
            <div className="col-12 col-md-5 m-1">
                <RenderDish dish={props.dish}/>
            </div>
            <div className="col-12 col-md-5 m-1"><h4>Comments</h4> <ul className="list-unstyled">
                <RenderComment comments={props.dish.comments}/></ul></div>
        
        </div>
    </div>
    );
}
    

export default DishDetail;