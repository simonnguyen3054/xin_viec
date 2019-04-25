import React, { Component } from "react";
import PropTypes from "prop-types";
import { _createPost } from "../services/feedService";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import SendIcon from "@material-ui/icons/Send";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import Input from "@material-ui/core/Input";
import MaskedInput from "react-text-mask";
import MenuItem from "@material-ui/core/MenuItem";
import Chip from "@material-ui/core/Chip";

const styles = {
  PostToolBar: {
    alignItems: "center",
    justifyContent: "space-between"
  },

  dialog: {
    margin: "auto",
    maxWidth: 900
  },

  textField: {
    padding: 10
  },

  fontSize: {
    fontSize: 20
  },

  selectInput: {
    margin: 10
  }
};

const Transition = props => {
  return <Slide direction="up" {...props} />;
};

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postContent: "",
      location: "",
      locationChoices: [
        { label: "", value: "" },
        { label: "San Jose", value: "San Jose" },
        { label: "San Mateo", value: "San Mateo" },
        { label: "San Francisco", value: "San Francisco" },
        { label: "Santa Rosa", value: "Santa Rosa" },
        { label: "Oakland", value: "Oakland" },
        { label: "Pleasanton", value: "Pleasanton" }
      ],
      experience: "",
      experienceChoices: [
        { label: "", value: "" },
        { label: "0-2 năm", value: "0-2 năm" },
        { label: "2-4 năm", value: "2-4 năm" },
        { label: "4-6 năm", value: "4-6 năm" },
        { label: "6-10 năm", value: "6-10 năm" },
        { label: "10 năm hơn", value: "10 năm hơn" }
      ],
      salary: "",
      salaryChoices: [
        { label: "", value: "" },
        { label: "$1000-$3000/tháng", value: "$1000-$3000/tháng" },
        { label: "$3000-$5000/tháng", value: "$3000-$5000/tháng" },
        { label: "$5000-$7000/tháng", value: "$5000-$7000/tháng" },
        { label: "$7000-$10000/tháng", value: "$5000-$7000/tháng" },
        { label: "Có thể thương lượng", value: "Có thể thương lượng" }
      ],
      phoneNumber: "",
      fullName: ""
    };
  }

  handlePostContentChange = postContent => event => {
    this.setState({ [postContent]: event.target.value });
  };

  handleLocationChange = location => event => {
    this.setState({ [location]: event.target.value });
  };

  handleExperienceChange = experience => event => {
    this.setState({ [experience]: event.target.value });
  };

  handleSalaryChange = salary => event => {
    this.setState({ [salary]: event.target.value });
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  handlePhoneNumberChange = phoneNumber => event => {
    this.setState({ [phoneNumber]: event.target.value });
  };

  handleFullNameChange = fullName => event => {
    this.setState({ [fullName]: event.target.value });
  };

  createPost = (event) => {
    event.preventDefault();
    const {postContent, salary, experience, location, fullName, phoneNumber} = this.state;
    const job_id = this.props.jobID;
    _createPost(fullName, job_id, phoneNumber, postContent, location, experience, salary).then(resJson => {
        console.log(resJson);
      })

    //close dilalog
    this.props.PostCloseHandling();
    this.setState({
      postContent: "",
      location: "",
      experience: "",
      salary: "",
      phoneNumber: "",
      fullName: ""
    })
  }

  handlePostValidation = (postContent, location, experience, salary, fullName, phoneNumber) => {

    const validatePost = {
      postContent,
      location,
      experience,
      salary,
      fullName,
      phoneNumber
    }
    let isDataValid = false;

    if (Object.keys(validatePost).every((k) => {
      return validatePost[k] ? true : false
    })) {
      isDataValid = true;
    }

    return isDataValid;
  }

  render() {
    const { classes } = this.props;
    const { postContent, location, experience, salary, fullName, phoneNumber } = this.state;

    return (
      <div>
        <Dialog
          className={classes.dialog}
          fullScreen
          open={this.props.PostOpen}
          onClose={this.props.PostOpenHandling}
          TransitionComponent={Transition}
        >
          <AppBar position="static" color="default">
            <Toolbar className={classes.PostToolBar}>
              <IconButton
                color="inherit"
                onClick={this.props.PostCloseHandling}
                aria-label="Close"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" color="inherit">
                Đăng Tin
              </Typography>
              {this.handlePostValidation(postContent, location, experience, salary, fullName, phoneNumber) ?
                <IconButton color="secondary" onClick={this.createPost}>
                  <SendIcon />
                </IconButton>
                :
                <IconButton disabled color="inherit" onClick={this.createPost}>
                   <SendIcon />
                </IconButton>
              }
            </Toolbar>
          </AppBar>

          <TextField
            autoFocus
            id="post-content"
            multiline
            InputProps={{
              classes: {
                input: classes.fontSize
              }
            }}
            required
            rows="5"
            value={this.state.postContent}
            onChange={this.handlePostContentChange("postContent")}
            className={classes.textField}
            placeholder="Thông tin của người xin việc."
            margin="normal"
            helperText="Để được tuyển dụng nhanh, bạn nên mô tả chi tiếc về bản thân mình cho công việc bạn đang tìm kiếm, như kỹ năng hay kinh nghiệm."
          />

          <TextField
            id="fullname"
            value={this.state.fullName}
            onChange={this.handleFullNameChange("fullName")}
            label="Họ và Tên"
            margin="dense"
            className={classes.selectInput}
          />
          <TextField
            label="Số Phone"
            value={this.state.phoneNumber}
            onChange={this.handlePhoneNumberChange("phoneNumber")}
            id="formatted-phone-number"
            margin="dense"
            className={classes.selectInput}
          />
          <FormControl className={classes.selectInput}>
            <InputLabel htmlFor="post-location">Khu Vực Gần</InputLabel>
            <NativeSelect
              value={this.state.location}
              onChange={this.handleLocationChange("location")}
              input={<Input name="location" id="post-location" />}
            >
              {this.state.locationChoices.map(choice => {
                return (
                  <option key={choice.value} value={choice.value}>
                    {choice.label}
                  </option>
                );
              })}
            </NativeSelect>
          </FormControl>
          <FormControl className={classes.selectInput}>
            <InputLabel htmlFor="post-experience">Kinh Nghiệm</InputLabel>
            <NativeSelect
              value={this.state.experience}
              onChange={this.handleExperienceChange("experience")}
              input={<Input name="experience" id="post-experience" />}
            >
              {this.state.experienceChoices.map(choice => {
                return (
                  <option key={choice.value} value={choice.value}>
                    {choice.label}
                  </option>
                );
              })}
            </NativeSelect>
          </FormControl>
          <FormControl className={classes.selectInput}>
            <InputLabel htmlFor="post-salary">Lương Bổng</InputLabel>
            <NativeSelect
              value={this.state.salary}
              onChange={this.handleSalaryChange("salary")}
              input={<Input name="salary" id="post-salary" />}
            >
              {this.state.salaryChoices.map((choice, i) => {
                return (
                  <option key={i} value={choice.value}>
                    {choice.label}
                  </option>
                );
              })}
            </NativeSelect>
          </FormControl>
        </Dialog>
      </div>
    );
  }
}

Post.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Post);
