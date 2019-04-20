import React, { Component } from "react";
import { _loadPosts, _loadPostItem } from "../services/feedService";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import CardContent from "@material-ui/core/CardContent";
import { Card } from "@material-ui/core";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import CardMedia from "@material-ui/core/CardMedia";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import CardActionArea from "@material-ui/core/CardActionArea";

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

  postHeader: {
    display: "flex",
    justifyContent: "space-between"
  },

  headerIcons: {
    display: "flex",
    alignItems: "center"
  },

  callIcon: {
    marginLeft: 10
  },

  media: {
    height: 250
  },

  tags: {
    marginBottom: 10,
    display: "flex",
    flexWrap: "wrap"
  },

  chips: {
    marginRight: 10,
    marginBottom: 10
  },

  header: {
    marginTop: 50,
    marginBottom: 20,
    textAlign: "center"
  },

  Card: {
    marginTop: 10,
    borderRadius: 0
  },

  cardActionAreaLink: {
    textDecoration: "none"
  }

};

class PostItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postItem: [],
      posts: []
    };
  }

  componentDidMount() {
    const { post_id } = this.props.match.params;
    _loadPostItem(post_id).then(resultingJSON =>
      this.setState({ postItem: resultingJSON })
    );

    _loadPosts().then(resultingJSON =>
      this.setState({ posts: resultingJSON })
    );
  }

  static getDerivedStateFromProps(nextProps, prevState) {
  //   if (nextProps.match.params.product !== prevState.currentProductId){
  //      const currentProductId = nextProps.match.params.product
  //      const result = productlist.products.filter(obj => {

  //        return obj.id === currentProductId;

  //      })
  //     return {

  //        product: result[0],
  //        currentId: currentProductId,
  //        result

  //      }
  //  }
  debugger
   return null;
 }

  handleDateFormat = date => {
    const formattedDate = date.substring(0, 10);
    return formattedDate;
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        {this.state.postItem.map(item => {
          return (
            <Helmet key={item.id}>
              <meta
                property="og:url"
                content={"http://www.viecconnect.com//posts/" + item.id}
              />
              <meta property="og:type" content="article" />
              <meta property="og:title" content={item.username} />
              <meta property="og:description" content={item.post_content} />
              <meta property="og:image" content={item.job_avatar} />
              <meta property="og:locale" content="vi_VN" />
              <meta property="fb:app_id" content="587150191805387" />
            </Helmet>
          );
        })}
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

        {this.state.postItem.map(item => {
          return (
            <Card key={item.id}>
              <CardActions className={classes.postHeader}>
                <Link to="/">
                  <IconButton className={classes.backIcon} color="default">
                    <ArrowBackIosIcon />
                  </IconButton>
                </Link>

                <div className={classes.headerIcons}>
                  <div
                    className="fb-share-button"
                    data-href={"http://www.viecconnect.com//posts/" + item.id}
                    data-layout="button"
                    data-size="small"
                  >
                    <a
                      target="_blank"
                      href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse"
                      className="fb-xfbml-parse-ignore"
                    >
                      Share
                    </a>
                  </div>

                  <IconButton className={classes.callIcon}>
                    <a href={"tel: " + item.phone_number}>
                      <Icon>call</Icon>
                    </a>
                  </IconButton>
                </div>
              </CardActions>

              <CardMedia
                className={classes.media}
                image={item.job_avatar}
                title={item.job_name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {item.username}
                </Typography>
                <Typography component="p">{item.post_content}</Typography>
              </CardContent>
              <CardActions className={classes.tags}>
                <Chip
                  className={classes.chips}
                  label={"Khu Vực Gần: " + item.job_location}
                />
                <Chip
                  className={classes.chips}
                  label={"Kinh Nghiệm: " + item.experience}
                />
                <Chip
                  className={classes.chips}
                  label={"Lương Bổng: " + item.salary}
                />
              </CardActions>
            </Card>
          );
        })}

        <Typography
          className={classes.header}
          variant="h6"
          color="textSecondary"
        >
          Nhân sự khác đang cần việc
          </Typography>
          {this.state.posts.map(post => {
          return (
            <Card key={post.post_id} className={classes.Card}>
              <CardHeader
                avatar={
                  <Avatar
                    aria-label={post.job_name}
                    alt={post.job_name}
                    src={post.job_avatar}
                  />
                }
                action={
                  <IconButton>
                    <a href={"tel: " + post.phone_number}>
                      <Icon>call</Icon>
                    </a>
                  </IconButton>
                }
                title={post.username}
                subheader={this.handleDateFormat(post.post_date)}
              />

              <Link
                className={classes.cardActionAreaLink}
                to={"/posts/" + post.post_id}
              >
                <CardActionArea onClick={this.reRoutePostItem}>
                  <CardContent>
                    <Typography component="p">{post.post_content}</Typography>
                  </CardContent>

                  <CardActions className={classes.tags}>
                    <Chip
                      className={classes.chips}
                      label={"Khu Vực Gần: " + post.job_location}
                    />
                    <Chip
                      className={classes.chips}
                      label={"Kinh Nghiệm: " + post.experience}
                    />
                    <Chip
                      className={classes.chips}
                      label={"Lương Bổng: " + post.salary}
                    />
                  </CardActions>
                </CardActionArea>
              </Link>
            </Card>
          );
        })}
      </div>
    );
  }
}

PostItem.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PostItem);
