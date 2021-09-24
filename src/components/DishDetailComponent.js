import React,{Component} from "react";
import { Card,CardImg,CardText,CardBody,CardTitle } from 'reactstrap';
class DishDetail extends Component{
   

    renderComment(comments){

        if (comments!=null){
        const comentsList=comments.map((comment)=>{
            return(
                <li key={comment.id}>
                    {comment.comment} <br/>
                    --{comment.author} , {new Intl.DateTimeFormat('en-US',{year:'numeric',month:'short',day:'2-digit'}).format(new Date(Date.parse(comment.date)))}
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
        if (this.props.dish == null) return <div></div>;
        
        return(
            <div class="container">
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
            </div>
        );

    }

}


export default DishDetail;