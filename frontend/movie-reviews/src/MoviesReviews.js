import React from 'react'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';



const useStyles = (theme => ({

    root: {

        width: 400,

    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
}));

class MoviesReviews extends React.Component {

    viewClickHandler() {
        this.props.history.push('/reviews/' + this.props.id)
    }

    reviewClickHandler() {
        this.props.history.push('/createreview/' + this.props.id)
    }

    seeReviewsClickHandler() {
        this.props.history.push('/listreviews/' + this.props.id)
    }

    render() {
        const { classes } = this.props;
        return (



            <div style= {{backgroundColor: "rgb(250, 196, 114)"}}>
                <div style= {{backgroundColor: "rgb(250, 196, 114)"}}>
                    <Card className={classes.root} style= {{backgroundColor: "rgb(266, 164, 57)"}}>
                        <CardActionArea>
                            <CardContent style= {{backgroundColor: "rgb(266, 164, 57)"}}>
                                <img src={this.props.image} id="productimage" className="card-img-top" alt="..." />
                                <Typography variant="h5" component="h2">
                                    {this.props.title}
                                </Typography>
                                <Typography className={classes.pos} color="textSecondary">
                                    Release Year: {this.props.year}
                                </Typography>
                            </CardContent>
                            <Button variant="outlined" color="secondary" type="submit" onClick={this.viewClickHandler.bind(this)} >
                                View
                        </Button>
                            <Button variant="outlined" color="secondary" type="submit" onClick={this.reviewClickHandler.bind(this)} >
                                Leave Review
                        </Button>
                            <Button variant="outlined" color="secondary" type="submit" onClick={this.seeReviewsClickHandler.bind(this)} >
                                See Reviews
                        </Button>

                        </CardActionArea>
                    </Card>

                </div>
             
               {/* <footer>

               </footer> */}

             

            </div>

        )
    }
}

export default compose(withRouter, withStyles(useStyles))(MoviesReviews)
