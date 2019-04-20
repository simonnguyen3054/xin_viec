import React, { Component } from "react";
import Post from "./Post";
import { _loadPostItem } from "../services/feedService";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import CardContent from "@material-ui/core/CardContent";
import { Card } from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

const styles = {
  root: {
    flexGrow: 1
  },

  appBar: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    minHeight: 60
  },

  media: {
    height: 250
  }
};

class PostItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postItem: []
    };
  }

  componentDidMount() {
    const { post_id } = this.props.match.params;
    return _loadPostItem(post_id).then(resultingJSON =>
      { debugger
      this.setState({ postItem: resultingJSON })
      }
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" color="primary">
          <Toolbar className={classes.appBar}>
            <Typography variant="h6" color="inherit">
              <span>ViecConnect</span>
            </Typography>
            <Typography variant="subtitle2" color="inherit">
              Kết nói việc làm trong cộng đồng.
            </Typography>
          </Toolbar>
        </AppBar>

        <Card>
          <IconButton className={classes.backIcon} color="secondary">
            <ArrowBackIosIcon />
          </IconButton>
          <CardMedia
            className={classes.media}
            image="https://s3-us-west-1.amazonaws.com/acceptmycrypto/dealsImages/acceptmycrypto/sample-deal-images/cooking.jpeg"
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Lizard
            </Typography>
            <Typography component="p">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  }
}

PostItem.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PostItem);
