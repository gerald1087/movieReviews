import React from 'react';
import axios from 'axios';
import AuthHeader from './components/AuthHeader'
import Footer from './layouts/Footer'


import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const useStyles = (theme => ({

    root: {

        width: 500,
        height: 900,

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

class Movie extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        let movieId = this.props.match.params.id
        axios.get("http://localhost:3005/api/movie_reviews/" + movieId)
            .then(({ data }) => {
                this.setState(data);
            })
    }

    render() {

        const { classes } = this.props;
        return (


            <div>
                <header>
                    <AuthHeader />
                </header>
                <div>
                    <Card className={classes.root}>
                        <CardActionArea>
                            <CardContent>
                                <img src={this.state.image} id="productimage" className="card-img-top" alt="..." />
                                <Typography variant="h5" component="h2">
                                    {this.state.title}
                                </Typography>
                                <Typography className={classes.pos} color="textSecondary">
                                    Release Year: {this.state.year}
                                </Typography>
                            </CardContent>
                            <Button variant="outlined" color="secondary" type="submit" onClick={(event) => this.handleClick(event)} >
                                Buy Now!
                        </Button>
                        </CardActionArea>
                    </Card>
                    <div>
                    </div>
                </div>
                <footer>
                    <Footer />
                </footer>
            </div>
        )
    }
}

export default withStyles(useStyles)(Movie)
