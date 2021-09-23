import React,{Component} from "react";
import { Card,CardImg,CardText,CardBody,CardTitle } from 'reactstrap';
class DishDetail extends Component{
   

    renderComment(comments){

        if (comments!=null){
        const comentsList=comments.map((comment)=>{
            return(
                <li key={comment.id}>
                    {comment.comment} <br/>
                    --{comment.author} ,{comment.date}
                </li>
                
            );
        });
        return comentsList
        }
        else {
            return (<div></div>)
        }
    }

    render(){
        
        return(
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                        <Card>
                            <CardImg top src={this.props.dish.image} alt={this.props.dish.name} />
                            <CardBody>
                            <CardTitle>{this.props.dish.name}</CardTitle>
                            <CardText>{this.props.dish.description}</CardText>
                            </CardBody>
                        </Card>
                </div>
                <div className="col-12 col-md-5 m-1"><h4>Comments</h4> <ul className="list-unstyled">{this.renderComment(this.props.dish.comments)}</ul></div>
                
            </div>
        );

    }

}


export default DishDetail;