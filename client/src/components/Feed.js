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
          label: "Làm Nail"
        },
        {
          img: "/assets/images/hau_ban.jpeg",
          label: "Hầu Bàn"
        },
        {
          img: "/assets/images/cooking.jpeg",
          label: "Phụ Bếp"
        }
      ],
      open: false
    };
  }

  componentDidMount() {
    return _loadPosts().then(resultingJSON =>
      this.setState({ posts: resultingJSON })
    );
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handlePhoneNumberFormat = (phoneNumber) => {
    return `tel: ${phoneNumber}`
  }

  handleDateFormat = (date) => {
    const formattedDate = date.substring(0, 9);
    return formattedDate
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              Xin Việc
            </Typography>
          </Toolbar>
        </AppBar>

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
                  <a href={this.handlePhoneNumberFormat()}>
                    <Icon>call</Icon>
                  </a>
                </IconButton>
              }
              title={post.username}
              subheader={this.handleDateFormat(post.post_date)}
            />
            <CardContent>
              <Typography component="p">
                {post.post_content}
              </Typography>
            </CardContent>
            <CardActions className={classes.tags}>
              <Chip className={classes.chips} label={"Khu Vực Gần: " + post.job_location} />
              <Chip className={classes.chips} label={"Kinh Nghiệm: " + post.experience} />
              <Chip
                className={classes.chips}
                label={"Lương Bổng: " + post.salary}
              />
            </CardActions>
          </Card>
          )
      })}

        {/* <Card className={classes.Card}>
          <CardHeader
            avatar={
              <Avatar
                aria-label="Làm Nail"
                alt="nail"
                src="/assets/images/hau_ban.jpeg"
              />
            }
            action={
              <IconButton>
                <a href="tel: 111-111-1111">
                  <Icon>call</Icon>
                </a>
              </IconButton>
            }
            title="Simon Nguyen"
            subheader="September 14, 2016"
          />
          <CardContent>
            <Typography component="p">
              This impressive paella is a perfect party dish and a fun meal to
              cook together with your guests. Add 1 cup of frozen peas along
              with the mussels, if you like.
            </Typography>
          </CardContent>
          <CardActions className={classes.tags}>
            <Chip className={classes.chips} label="Khu Vực: San Mateo" />
            <Chip className={classes.chips} label="Kinh Nghiệm: 1-2 năm" />
            <Chip
              className={classes.chips}
              label="Lương Bổng: $800-1000/tháng"
            />
          </CardActions>
        </Card>

        <Card className={classes.Card}>
          <CardHeader
            avatar={
              <Avatar
                aria-label="Làm Nail"
                alt="nail"
                src="/assets/images/hau_ban.jpeg"
              />
            }
            action={
              <IconButton>
                <a href="tel: 111-111-1111">
                  <Icon>call</Icon>
                </a>
              </IconButton>
            }
            title="Simon Nguyen"
            subheader="September 14, 2016"
          />
          <CardContent>
            <Typography component="p">
              This impressive paella is a perfect party dish and a fun meal to
              cook together with your guests. Add 1 cup of frozen peas along
              with the mussels, if you like.
            </Typography>
          </CardContent>
          <CardActions className={classes.tags}>
            <Chip className={classes.chips} label="Khu Vực: San Mateo" />
            <Chip className={classes.chips} label="Kinh Nghiệm: 1-2 năm" />
            <Chip
              className={classes.chips}
              label="Lương Bổng: $800-1000/tháng"
            />
          </CardActions>
        </Card>

        <Card className={classes.Card}>
          <CardHeader
            avatar={
              <Avatar
                aria-label="Làm Nail"
                alt="nail"
                src="/assets/images/hau_ban.jpeg"
              />
            }
            action={
              <IconButton>
                <a href="tel: 111-111-1111">
                  <Icon>call</Icon>
                </a>
              </IconButton>
            }
            title="Simon Nguyen"
            subheader="September 14, 2016"
          />
          <CardContent>
            <Typography component="p">
              This impressive paella is a perfect party dish and a fun meal to
              cook together with your guests. Add 1 cup of frozen peas along
              with the mussels, if you like.
            </Typography>
          </CardContent>
          <CardActions className={classes.tags}>
            <Chip className={classes.chips} label="Khu Vực: San Mateo" />
            <Chip className={classes.chips} label="Kinh Nghiệm: 1-2 năm" />
            <Chip
              className={classes.chips}
              label="Lương Bổng: $800-1000/tháng"
            />
          </CardActions>
        </Card> */}

        <Post
          PostOpen={this.state.open}
          PostOpenHandling={this.handleClickOpen}
          PostCloseHandling={this.handleClose}
        />
      </div>
    );
  }
}

Feed.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Feed);
