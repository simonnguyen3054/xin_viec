import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
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

//formatting phone number
const phoneNumberFormatHandling = (props) => {
  const { inputRef, ...other } = props;
  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}


class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "",
      locationChoices: [
        { label: "", value: "" },
        { label: "San Jose", value: "San Jose" },
        { label: "San Mateo", value: "San Mateo" },
        { label: "San Francisco", value: "San Francisco" }
      ],
      experience: "",
      experienceChoices: [
        { label: "", value: "" },
        { label: "0-2 năm", value: "0-2 năm" },
        { label: "2-4 năm", value: "2-4 năm" },
        { label: "4-6 năm", value: "4-6 năm" }
      ],
      salary: "",
      salaryChoices: [
        { label: "", value: "" },
        { label: "$1000-$3000/tháng", value: "$1000-$3000/tháng" },
        { label: "$3000-$5000/tháng", value: "$3000-$5000/tháng" },
        { label: "$5000-$7000/tháng", value: "$5000-$7000/tháng" }
      ],
      phoneNumber: "(  )    -    "
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
  };

  handlePhoneNumberChange = phoneNumber => event => {
    this.setState({ [phoneNumber]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Dialog
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
              <Button color="inherit" onClick={this.props.PostCloseHandling}>
                Share
              </Button>
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
            rows="10"
            value={this.state.postContent}
            onChange={this.handlePostContentChange("postContent")}
            className={classes.textField}
            placeholder="Rao tin công việc bạn đang tìm kiếm."
            margin="normal"
            helperText="Để được tuyển dụng nhanh, bạn nên mô tả chi tiếc về bản thân mình cho công việc bạn đang tìm kiếm, như kỹ năng hay kinh nghiệm."
          />

          <TextField
            id="fullname"
            required
            label="Họ và Tên"
            margin="dense"
            className={classes.selectInput}
          />
          <FormControl className={classes.selectInput}>
            <InputLabel htmlFor="formatted-phone-number">
              Số Phone
            </InputLabel>
            <Input
              required
              value={this.state.phoneNumber}
              onChange={this.handlePhoneNumberChange("phoneNumber")}
              id="formatted-phone-number"
              inputComponent={phoneNumberFormatHandling}
            />
          </FormControl>
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
              {this.state.salaryChoices.map(choice => {
                return (
                  <option key={choice.value} value={choice.value}>
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
