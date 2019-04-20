import React, { Component } from "react";
import Post from "./Post";
import { _loadPosts } from "../services/feedService";
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

const styles = {
  root: {
    flexGrow: 1
  },

  appBar: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start"
  },

  header: {
    margin: 20,
    textAlign: "center"
  },

  paper: {
    marginTop: 10,
    marginBottom: 10
  },
  paper_icon: {
    margin: "auto",
    marginBottom: 10,
    width: 50,
    height: 50
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
  Card: {
    marginTop: 10,
    borderRadius: 0
  }
};

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      job_avatars: [
        {
          img: "/assets/images/nail_avatar.jpeg",
          label: "Nail",
          job_id: 1
        },
        {
          img: "/assets/images/hau_ban.jpeg",
          label: "Server",
          job_id: 2
        },
        {
          img: "/assets/images/cooking.jpeg",
          label: "Cook",
          job_id: 3
        }
      ],
      open: false,
      job_id: null
    };
  }

  componentDidMount() {
    return _loadPosts().then(resultingJSON =>
      this.setState({ posts: resultingJSON })
    );
  }

  componentDidUpdate() {
    return _loadPosts().then(resultingJSON =>
      this.setState({ posts: resultingJSON })
    );
  }

  handleClickOpen = event => {
    const job_id = event.currentTarget.getAttribute("data-jobid");
    this.setState({ open: true, job_id });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleDateFormat = date => {
    const formattedDate = date.substring(0, 10);
    return formattedDate;
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
              Kết nói việc làm trong cộng động.
            </Typography>
          </Toolbar>
        </AppBar>

        <Typography className={classes.header} variant="h6" color="textSecondary">
          Bạn muốn xin việc gì?
        </Typography>

        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={16}
          className={classes.paper}
        >
          {this.state.job_avatars.map((job, i) => {
            return (
              <Grid item key={i}>
                <Avatar
                  alt="nail"
                  src={job.img}
                  className={classes.paper_icon}
                />
                <Button
                  onClick={this.handleClickOpen}
                  color="secondary"
                  variant="outlined"
                  data-jobid={job.job_id}
                >
                  {job.label}
                </Button>
              </Grid>
            );
          })}
        </Grid>

        <Divider />

        {this.state.posts.map(post => {
          return (
            <Card className={classes.Card}>
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
            </Card>
          );
        })}
        <Post
          PostOpen={this.state.open}
          PostOpenHandling={this.handleClickOpen}
          PostCloseHandling={this.handleClose}
          jobID={this.state.job_id}
        />
      </div>
    );
  }
}

Feed.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Feed);
