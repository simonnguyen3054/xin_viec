import React, { Component } from "react";
import {
  _loadPosts,
  _loadPostDetail,
  _loadPostItem
} from "../services/feedService";
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
import { Helmet } from "react-helmet";

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
    marginLeft: 10,
    color: "#3f51b5"
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

  headerTypoGraphy: {
    textAlign: "center",
    marginTop: 25
  },

  Card: {
    marginTop: 15,
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
    return _loadPostDetail(post_id).then(([postItemJSON, postsJSON]) => {
      this.setState({
        postItem: postItemJSON,
        posts: postsJSON
      });
    });
  }

  //handle params on change
  componentDidUpdate(prevProps) {
    const { post_id } = this.props.match.params;

    //parse fb button
    window.FB.XFBML.parse();

    if (prevProps.match.params.post_id !== this.props.match.params.post_id) {
      return _loadPostItem(post_id).then(resultingJSON => {
        this.setState({ postItem: resultingJSON });
        this.moveToTop();
      });
    }
  }

  handleFBShareDialog = (url, title, description, image) => {
    window.FB.ui(
      {
        method: "share_open_graph",
        action_type: "og.shares",
        action_properties: JSON.stringify({
          object: {
            "og:url": url,
            "og:title": title,
            "og:description": description,
            "og:image": image
          }
        })
      },
      function(response) {}
    );
  };

  handleDateFormat = date => {
    const formattedDate = date.substring(0, 10);
    return formattedDate;
  };

  moveToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

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

        {this.state.postItem.map(item => {
          return (
            <Card key={item.id}>
              <Helmet>
                <meta
                  property="og:url"
                  content={"http://www.viecconnect.com/" + item.id}
                />
                <meta property="og:type" content="article" />
                <meta
                  property="og:title"
                  content={item.username}
                />
                <meta
                  property="og:description"
                  content={item.post_content}
                />
                <meta
                  property="og:image"
                  content={item.job_avatar}
                />
              </Helmet>
              <CardActions className={classes.postHeader}>
                <Link to="/">
                  <IconButton className={classes.backIcon} color="default">
                    <ArrowBackIosIcon />
                  </IconButton>
                </Link>

                <div className={classes.headerIcons}>
                  {/* <IconButton
                    onClick={() => {
                      this.handleFBShareDialog(
                        `http://www.viecconnect.com/posts/${item.id}`,
                        item.username,
                        item.post_content,
                        item.job_avatar
                      );
                    }}
                    className={classes.callIcon}
                  >
                    <i
                      style={{ width: "24px", height: "29px" }}
                      className="fab fa-facebook-square"
                    />
                  </IconButton> */}

                  <div className="fb-share-button" data-href={`http://www.viecconnect.com//posts/${item.id}`} data-layout="button" data-size="small"><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse" className="fb-xfbml-parse-ignore">Share</a></div>

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
              <CardHeader
                title={item.username}
                subheader={this.handleDateFormat(item.post_date)}
              />
              <CardContent>
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
          variant="h6"
          className={classes.headerTypoGraphy}
          color="textSecondary"
        >
          Tin Khác
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
                <CardActionArea>
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
